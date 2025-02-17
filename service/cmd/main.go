package main

import (
	"log"
	"service/cmd/api"
	"service/configs"
	"service/utils"

	"gorm.io/gorm"
)

func main() {
	db, err := utils.NewGormPostgres(configs.Envs.DBConfig)
	if err != nil {
		log.Fatal(err)
	}
	initStorage(db)
	defer utils.CloseGormPostgres(db)

	server := api.NewAPIServer(configs.Envs.Port, db)
	if err := server.Run(); err != nil {
		log.Fatal(err)
	}

}

func initStorage(db *gorm.DB) {
	dbInstance, err := db.DB()
	if err != nil {
		log.Fatal(err)
	}
	err = dbInstance.Ping()
	if err != nil {
		log.Fatal(err)
	}

	log.Println("DB: Successfully connected!")
}
