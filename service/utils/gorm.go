package utils

import (
	"fmt"
	"service/configs"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func gormDSN(config configs.DBConfig) string {
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Jakarta", config.Host, config.User, config.Password, config.DBName, config.Port)
	return dsn
}

func NewGormPostgres(config configs.DBConfig) (*gorm.DB, error) {
	dsn := gormDSN(config)
	return gorm.Open(postgres.Open(dsn), &gorm.Config{})
}

func CloseGormPostgres(db *gorm.DB) error {
	dbInstance, err := db.DB()
	if err != nil {
		return err
	}
	return dbInstance.Close()
}
