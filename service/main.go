package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
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

var mockCategories = []Category{
	{ID: 1, Name: "Main Course"},
	{ID: 2, Name: "Beverage"},
	{ID: 3, Name: "Dessert"},
}

var mockMenus = []Menu{
	{ID: 1, Name: "Beef Steak", Price: 25.99, CategoryID: 1},
	{ID: 2, Name: "Grilled Salmon", Price: 22.99, CategoryID: 1},
	{ID: 3, Name: "Chicken Alfredo", Price: 18.99, CategoryID: 1},
	{ID: 4, Name: "Iced Tea", Price: 3.99, CategoryID: 2},
	{ID: 5, Name: "Fresh Orange Juice", Price: 4.99, CategoryID: 2},
	{ID: 6, Name: "Chocolate Cake with Ice Cream", Price: 6.99, CategoryID: 3},
	{ID: 7, Name: "Ice Cream Sundae", Price: 5.99, CategoryID: 3},
}

// Layer 2: Service

type Service struct{}

func (s *Service) GetCategories() []Category {
	return mockCategories
}

func (s *Service) GetCategory(id int) Category {
	for _, category := range mockCategories {
		if category.ID == id {
			return category
		}
	}
	return Category{}
}

func (s *Service) GetMenus() []Menu {
	for i, menu := range mockMenus {
		mockMenus[i].Category = s.GetCategory(menu.CategoryID)
	}
	return mockMenus
}

func (s *Service) GetMenusByCategory(categoryID int) []Menu {
	menus := []Menu{}
	for _, menu := range mockMenus {
		if menu.CategoryID == categoryID {
			menus = append(menus, menu)
		}
	}
	return menus
}

func (s *Service) GetMenu(id int) Menu {
	for _, menu := range mockMenus {
		if menu.ID == id {
			return menu
		}
	}
	return Menu{}
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
	service := Service{}

	handler := Handler{router: router, service: &service}
	handler.InitRouter()

	server := http.Server{
		Addr:    ":3001",
		Handler: router,
	}

	log.Println("Server is running on port 3001")
	server.ListenAndServe()
}
