package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// Model

type Category struct {
	ID   int
	Name string
}

type Menu struct {
	ID          int
	Name        string
	Description string
	Price       float64
	CategoryID  int

	Category Category
}

// Layer 3: Repository

type PostgreDB struct {
	db *gorm.DB
}

func (p *PostgreDB) InitDB() {
	dsn := "host=localhost user=adminresto password=passresto dbname=restodb port=5432 sslmode=disable TimeZone=Asia/Jakarta"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
	p.db = db
}

func (p *PostgreDB) GetCategories() []Category {
	var categories []Category
	p.db.Find(&categories)
	return categories
}

func (p *PostgreDB) GetCategory(id int) Category {
	var category Category
	p.db.First(&category, id)
	return category
}

func (p *PostgreDB) GetMenus() []Menu {
	var menus []Menu
	p.db.Preload("Category").Find(&menus)
	return menus
}

func (p *PostgreDB) GetMenu(id int) Menu {
	var menu Menu
	p.db.Preload("Category").First(&menu, id)
	return menu
}

func (p *PostgreDB) GetMenusByCategory(categoryID int) []Menu {
	var menus []Menu
	p.db.Preload("Category").Where("category_id = ?", categoryID).Find(&menus)
	return menus
}

// Layer 2: Service

type Service struct {
	postgreDB *PostgreDB
}

func (s *Service) GetCategories() []Category {
	categories := s.postgreDB.GetCategories()
	return categories
}

func (s *Service) GetCategory(id int) Category {
	category := s.postgreDB.GetCategory(id)
	return category
}

func (s *Service) GetMenus() []Menu {
	// handle preload category
	menus := s.postgreDB.GetMenus()
	return menus
}

func (s *Service) GetMenu(id int) Menu {
	menu := s.postgreDB.GetMenu(id)
	menu.Category = s.GetCategory(menu.CategoryID)
	return menu
}

func (s *Service) GetMenusByCategory(categoryID int) []Menu {
	menus := s.postgreDB.GetMenusByCategory(categoryID)
	return menus
}

// Layer 1: Handler

type Handler struct {
	router  *http.ServeMux
	service *Service
}

func (h *Handler) InitRouter() {
	h.router.HandleFunc("GET /", h.GetIndex)
	h.router.HandleFunc("GET /categories", h.GetCategories)
	h.router.HandleFunc("GET /categories/{categoryID}/menus", h.GetMenusByCategory)
	h.router.HandleFunc("GET /menus", h.GetMenus)

}

func (h *Handler) GetIndex(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello, World!")
}

func (h *Handler) GetCategories(w http.ResponseWriter, r *http.Request) {
	categories := h.service.GetCategories()
	json.NewEncoder(w).Encode(categories)
}

func (h *Handler) GetMenus(w http.ResponseWriter, r *http.Request) {
	menus := h.service.GetMenus()
	json.NewEncoder(w).Encode(menus)
}

func (h *Handler) GetMenusByCategory(w http.ResponseWriter, r *http.Request) {
	categoryIDStr := r.PathValue("categoryID")
	categoryID, err := strconv.Atoi(categoryIDStr)
	if err != nil {
		http.Error(w, "Invalid category ID", http.StatusBadRequest)
		return
	}
	menus := h.service.GetMenusByCategory(categoryID)
	json.NewEncoder(w).Encode(menus)
}

func main() {

	router := http.NewServeMux()

	postgreDB := PostgreDB{}
	postgreDB.InitDB()
	service := Service{postgreDB: &postgreDB}
	handler := Handler{router: router, service: &service}
	handler.InitRouter()

	server := http.Server{
		Addr:    ":3001",
		Handler: router,
	}

	log.Println("Server is running on port 3001")
	server.ListenAndServe()
}
