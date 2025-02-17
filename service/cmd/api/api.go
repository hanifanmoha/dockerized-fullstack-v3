package api

import (
	"fmt"
	"log"
	"net/http"
	"service/services/category"
	"service/services/menu"

	"gorm.io/gorm"
)

type APIServer struct {
	addr string
	db   *gorm.DB
}

func NewAPIServer(port string, db *gorm.DB) *APIServer {
	return &APIServer{addr: fmt.Sprintf(":%s", port), db: db}
}

func (s *APIServer) Run() error {
	router := http.NewServeMux()

	categoryStore := category.NewStore(s.db)
	categoryHandler := category.NewHandler(categoryStore)
	categoryHandler.RegisterRoutes(router)

	menuStore := menu.NewStore(s.db)
	menuHandler := menu.NewHandler(menuStore)
	menuHandler.RegisterRoutes(router)

	server := http.Server{
		Addr:    s.addr,
		Handler: router,
	}
	log.Println("API Server is running on", s.addr)
	return server.ListenAndServe()
}
