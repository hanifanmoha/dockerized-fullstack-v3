package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"sweepservice/pkg"

	"github.com/joho/godotenv"
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

type DBConfig struct {
	Host     string
	Port     string
	User     string
	Password string
	DBName   string
}

type Config struct {
	Port     string
	DBConfig DBConfig
}

// Layer 3: Repository

type PostgreDB struct {
	db *gorm.DB
}

func (p *PostgreDB) InitDB(config DBConfig) {
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Jakarta", config.Host, config.User, config.Password, config.DBName, config.Port)
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

func (p *PostgreDB) UpdateCategory(category Category) (Category, error) {
	result := p.db.Save(&category)
	if result.Error != nil {
		return Category{}, result.Error
	}
	return category, nil
}

func (p *PostgreDB) DeleteCategory(id int) error {
	result := p.db.Delete(&Category{}, id)
	if result.Error != nil {
		return result.Error
	}
	return nil
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

func (p *PostgreDB) UpdateMenu(menu Menu) (Menu, error) {
	result := p.db.Save(&menu)
	if result.Error != nil {
		return Menu{}, result.Error
	}
	return menu, nil
}

func (p *PostgreDB) DeleteMenu(id int) error {
	result := p.db.Delete(&Menu{}, id)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (p *PostgreDB) DeleteMenuByCategory(categoryID int) error {
	result := p.db.Delete(&Menu{}, "category_id = ?", categoryID)
	if result.Error != nil {
		return result.Error
	}
	return nil
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

func (s *Service) UpdateCategory(category Category) (Category, error) {
	category, err := s.postgreDB.UpdateCategory(category)
	return category, err
}

func (s *Service) DeleteCategory(id int) error {
	// TODO: Transaction
	_, err := s.GetCategory(id)
	if err != nil {
		err = errors.New("failed to get category")
		return err
	}
	err = s.postgreDB.DeleteMenuByCategory(id)
	if err != nil {
		err = errors.New("failed to delete category")
		return err
	}
	err = s.postgreDB.DeleteCategory(id)
	return err
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

func (s *Service) UpdateMenu(menu Menu) (Menu, error) {
	category, err := s.GetCategory(menu.CategoryID)
	if err != nil {
		err = errors.New("failed to get category")
		return Menu{}, err
	}
	menu, err = s.postgreDB.UpdateMenu(menu)
	if err != nil {
		err = errors.New("failed to update menu")
		return Menu{}, err
	}
	menu.Category = category
	return menu, nil
}

func (s *Service) DeleteMenu(id int) error {
	_, err := s.GetMenu(id)
	if err != nil {
		err = errors.New("failed to get menu")
		return err
	}
	err = s.postgreDB.DeleteMenu(id)
	return err
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
	h.router.HandleFunc("PUT /categories/{categoryID}", h.UpdateCategory)
	h.router.HandleFunc("DELETE /categories/{categoryID}", h.DeleteCategory)

	// Menu
	h.router.HandleFunc("GET /menus", h.GetMenus)
	h.router.HandleFunc("GET /menus/{menuID}", h.GetMenu)
	h.router.HandleFunc("POST /menus", h.SaveMenu)
	h.router.HandleFunc("PUT /menus/{menuID}", h.UpdateMenu)
	h.router.HandleFunc("DELETE /menus/{menuID}", h.DeleteMenu)
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

func (h *Handler) UpdateCategory(w http.ResponseWriter, r *http.Request) {
	categoryIDStr := r.PathValue("categoryID")
	categoryID, err := strconv.Atoi(categoryIDStr)
	if err != nil {
		pkg.NewErrorResponse(w, "Invalid category ID", err.Error())
		return
	}

	category := Category{}
	err = json.NewDecoder(r.Body).Decode(&category)
	if err != nil {
		pkg.NewErrorResponse(w, "Failed to decode category", err.Error())
		return
	}
	category.ID = categoryID
	category, err = h.service.UpdateCategory(category)
	if err != nil {
		pkg.NewErrorResponse(w, "Failed to update category", err.Error())
		return
	}
	pkg.NewSuccessResponse(w, "Success", category)
}

func (h *Handler) DeleteCategory(w http.ResponseWriter, r *http.Request) {
	categoryIDStr := r.PathValue("categoryID")
	categoryID, err := strconv.Atoi(categoryIDStr)
	if err != nil {
		pkg.NewErrorResponse(w, "Invalid category ID", err.Error())
		return
	}
	err = h.service.DeleteCategory(categoryID)
	if err != nil {
		pkg.NewErrorResponse(w, "Failed to delete category", err.Error())
		return
	}
	pkg.NewSuccessResponse(w, "Success", categoryID)
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

func (h *Handler) UpdateMenu(w http.ResponseWriter, r *http.Request) {
	menuIDStr := r.PathValue("menuID")
	menuID, err := strconv.Atoi(menuIDStr)
	if err != nil {
		pkg.NewErrorResponse(w, "Invalid menu ID", err.Error())
		return
	}
	menu := Menu{}
	err = json.NewDecoder(r.Body).Decode(&menu)
	if err != nil {
		pkg.NewErrorResponse(w, "Failed to decode menu", err.Error())
		return
	}
	menu.ID = menuID
	menu, err = h.service.UpdateMenu(menu)
	if err != nil {
		pkg.NewErrorResponse(w, "Failed to update menu", err.Error())
		return
	}
	pkg.NewSuccessResponse(w, "Success", menu)
}

func (h *Handler) DeleteMenu(w http.ResponseWriter, r *http.Request) {
	menuIDStr := r.PathValue("menuID")
	menuID, err := strconv.Atoi(menuIDStr)
	if err != nil {
		pkg.NewErrorResponse(w, "Invalid menu ID", err.Error())
		return
	}
	err = h.service.DeleteMenu(menuID)
	if err != nil {
		pkg.NewErrorResponse(w, "Failed to delete menu", err.Error())
		return
	}
	pkg.NewSuccessResponse(w, "Success", menuID)
}

// Init Config

func GetEnv(key string, defaultValue string) string {
	env := os.Getenv(key)
	if env == "" {
		return defaultValue
	}
	return env
}

func InitConfig() Config {
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Println("Failed to load .env file", err)
		fmt.Println("Using default config")
	}

	fmt.Println("GREETING : ", GetEnv("GREETING", "No Env Loaded!"))

	return Config{
		Port: GetEnv("SERVER_PORT", "3001"),
		DBConfig: DBConfig{
			Host:     GetEnv("DB_HOST", "localhost"),
			Port:     GetEnv("DB_PORT", "5432"),
			User:     GetEnv("DB_USER", "adminresto"),
			Password: GetEnv("DB_PASSWORD", "passresto"),
			DBName:   GetEnv("DB_NAME", "restodb"),
		},
	}
}

func main() {
	config := InitConfig()
	router := http.NewServeMux()

	// TODOS: Init Config

	postgreDB := PostgreDB{}
	postgreDB.InitDB(config.DBConfig)
	service := Service{postgreDB: &postgreDB}
	handler := Handler{router: router, service: &service}
	handler.InitRouter()

	server := http.Server{
		Addr:    fmt.Sprintf(":%s", config.Port),
		Handler: router,
	}

	log.Println("Server is running on port 3001")
	server.ListenAndServe()
}
