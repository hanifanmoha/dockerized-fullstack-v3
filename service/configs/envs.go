package configs

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

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

var Envs = initConfig()

func initConfig() Config {
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Println("Failed to load .env file", err)
	}

	envSource := GetEnv("ENV_SOURCE", "No Env Loaded!")
	fmt.Println("ENV_SOURCE : ", envSource)

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

func GetEnv(key string, defaultValue string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}

	return defaultValue
}
