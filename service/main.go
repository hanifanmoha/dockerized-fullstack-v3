package main

import (
	"encoding/json"
	"errors"
	"log"
	"net/http"
	"strconv"
	"sweepservice/pkg"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// Model

type Category struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

type Menu struct {
	ID          int     `json:"id"`
	Name        string  `json:"name"`
	Description string  `json:"description"`
	Price       float64 `json:"price"`
	CategoryID  int     `json:"category_id"`

	Category Category `json:"category"`
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

func (p *PostgreDB) GetCategories() ([]Category, error) {
	var categories []Category
	err := p.db.Find(&categories).Error
	return categories, err
}

func (p *PostgreDB) GetCategory(id int) (Category, error) {
	var category Category
	err := p.db.First(&category, id).Error
	return category, err
}

func (p *PostgreDB) SaveCategory(category Category) (Category, error) {
	result := p.db.Create(&category)
	if result.Error != nil {
		return Category{}, result.Error
	}
	return category, nil
}

func (p *PostgreDB) GetMenus() ([]Menu, error) {
	var menus []Menu
	err := p.db.Preload("Category").Find(&menus).Error
	return menus, err
}

func (p *PostgreDB) GetMenu(id int) (Menu, error) {
	var menu Menu
	err := p.db.Preload("Category").First(&menu, id).Error
	return menu, err
}

func (p *PostgreDB) GetMenusByCategory(categoryID int) ([]Menu, error) {
	var menus []Menu
	err := p.db.Preload("Category").Where("category_id = ?", categoryID).Find(&menus).Error
	return menus, err
}

func (p *PostgreDB) SaveMenu(menu Menu) (Menu, error) {
	result := p.db.Create(&menu)
	if result.Error != nil {
		return Menu{}, result.Error
	}
	return menu, nil
}

// Layer 2: Service

type Service struct {
	postgreDB *PostgreDB
}

func (s *Service) GetCategories() ([]Category, error) {
	categories, err := s.postgreDB.GetCategories()
	return categories, err
}

func (s *Service) GetCategory(id int) (Category, error) {
	category, err := s.postgreDB.GetCategory(id)
	return category, err
}

func (s *Service) SaveCategory(category Category) (Category, error) {
	category, err := s.postgreDB.SaveCategory(category)
	return category, err
}

func (s *Service) GetMenus() ([]Menu, error) {
	// handle preload category
	menus, err := s.postgreDB.GetMenus()
	return menus, err
}

func (s *Service) GetMenu(id int) (Menu, error) {
	menu, err := s.postgreDB.GetMenu(id)
	category, err := s.GetCategory(menu.CategoryID)
	menu.Category = category
	return menu, err
}

func (s *Service) GetMenusByCategory(categoryID int) ([]Menu, error) {
	menus, err := s.postgreDB.GetMenusByCategory(categoryID)
	return menus, err
}

func (s *Service) SaveMenu(menu Menu) (Menu, error) {
	_, err := s.GetCategory(menu.CategoryID)
	if err != nil {
		err = errors.New("failed to get category")
		return Menu{}, err
	}
	menu, err = s.postgreDB.SaveMenu(menu)
	return menu, err
}

// Layer 1: Handler

type Handler struct {
	router  *http.ServeMux
	service *Service
}

func (h *Handler) InitRouter() {
	// Category
	h.router.HandleFunc("GET /categories", h.GetCategories)
	h.router.HandleFunc("GET /categories/{categoryID}", h.GetCategory)
	h.router.HandleFunc("GET /categories/{categoryID}/menus", h.GetMenusByCategory)
	h.router.HandleFunc("POST /categories", h.SaveCategory)

	// Menu
	h.router.HandleFunc("GET /menus", h.GetMenus)
	h.router.HandleFunc("GET /menus/{menuID}", h.GetMenu)
	h.router.HandleFunc("POST /menus", h.SaveMenu)
}

func (h *Handler) GetCategories(w http.ResponseWriter, r *http.Request) {
	categories, err := h.service.GetCategories()
	if err != nil {
		pkg.NewErrorResponse(w, "Failed to get categories", err.Error())
		return
	}
	pkg.NewSuccessResponse(w, "Success", categories)
}

func (h *Handler) GetCategory(w http.ResponseWriter, r *http.Request) {
	categoryIDStr := r.PathValue("categoryID")
	categoryID, err := strconv.Atoi(categoryIDStr)
	if err != nil {
		pkg.NewErrorResponse(w, "Invalid category ID", err.Error())
		return
	}
	category, err := h.service.GetCategory(categoryID)
	if err != nil {
		pkg.NewErrorResponse(w, "Failed to get category", err.Error())
		return
	}
	pkg.NewSuccessResponse(w, "Success", category)
}

func (h *Handler) SaveCategory(w http.ResponseWriter, r *http.Request) {
	category := Category{}
	err := json.NewDecoder(r.Body).Decode(&category)
	if err != nil {
		pkg.NewErrorResponse(w, "Failed to decode category", err.Error())
		return
	}
	category, err = h.service.SaveCategory(category)
	if err != nil {
		pkg.NewErrorResponse(w, "Failed to save category", err.Error())
		return
	}
	pkg.NewSuccessResponse(w, "Success", category)
}

func (h *Handler) GetMenus(w http.ResponseWriter, r *http.Request) {
	menus, err := h.service.GetMenus()
	if err != nil {
		pkg.NewErrorResponse(w, "Failed to get menus", err.Error())
		return
	}
	pkg.NewSuccessResponse(w, "Success", menus)
}

func (h *Handler) GetMenu(w http.ResponseWriter, r *http.Request) {
	menuIDStr := r.PathValue("menuID")
	menuID, err := strconv.Atoi(menuIDStr)
	if err != nil {
		pkg.NewErrorResponse(w, "Invalid menu ID", err.Error())
		return
	}
	menu, err := h.service.GetMenu(menuID)
	if err != nil {
		pkg.NewErrorResponse(w, "Failed to get menu", err.Error())
		return
	}
	pkg.NewSuccessResponse(w, "Success", menu)
}

func (h *Handler) GetMenusByCategory(w http.ResponseWriter, r *http.Request) {
	categoryIDStr := r.PathValue("categoryID")
	categoryID, err := strconv.Atoi(categoryIDStr)
	if err != nil {
		pkg.NewErrorResponse(w, "Invalid category ID", err.Error())
		return
	}
	menus, err := h.service.GetMenusByCategory(categoryID)
	if err != nil {
		pkg.NewErrorResponse(w, "Failed to get menus by category", err.Error())
		return
	}
	pkg.NewSuccessResponse(w, "Success", menus)
}

func (h *Handler) SaveMenu(w http.ResponseWriter, r *http.Request) {
	menu := Menu{}
	err := json.NewDecoder(r.Body).Decode(&menu)
	if err != nil {
		pkg.NewErrorResponse(w, "Failed to decode menu", err.Error())
		return
	}
	menu, err = h.service.SaveMenu(menu)
	if err != nil {
		pkg.NewErrorResponse(w, "Failed to save menu", err.Error())
		return
	}
	pkg.NewSuccessResponse(w, "Success", menu)
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
