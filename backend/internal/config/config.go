package config

import (
	"log"
	"os"

	"github.com/spf13/viper"
	"github.com/subosito/gotenv"
)

var cfg *config

type config struct {
	API APIConfig
	DB  DBConfig
}

type APIConfig struct {
	Port string
}

type DBConfig struct {
	Host     string
	Port     string
	User     string
	Password string
	Database string
	TimeZone string
}

func init() {
	viper.SetDefault("api.port", "9090")
	viper.SetDefault("database.port", "${DB_PORT}")
	viper.SetDefault("database.user", "${DB_USER}")
	viper.SetDefault("database.port", "${POSTGRES_PASSWORD}")
	viper.SetDefault("database.database", "${POSTGRES_DATABASE}")
	viper.SetDefault("database.timezone", "${POSTGRES_TIME_ZONE}")
}

func Load() error {
	if err := gotenv.Load(); err != nil {
		log.Println("No .env file found, relying on environment variables")
	}

	viper.SetConfigName("config")
	viper.SetConfigType("toml")
	viper.AddConfigPath("../config")
	viper.AutomaticEnv()

	if err := viper.ReadInConfig(); err != nil {
		if _, ok := err.(viper.ConfigFileNotFoundError); !ok {
			return err
		}
	}

	envPort := os.Getenv("PORT")
	if envPort == "" {
		envPort = "9090"
	}

	cfg = &config{
		API: APIConfig{
			Port: envPort,
		},
		DB: DBConfig{
			Host:     viper.GetString("database.host"),
			Port:     viper.GetString("database.port"),
			User:     viper.GetString("database.user"),
			Password: viper.GetString("database.password"),
			Database: viper.GetString("database.database"),
			TimeZone: viper.GetString("database.host"),
		},
	}

	log.Printf("Database config: %v", cfg.DB)
	return nil
}

func GetDB() DBConfig {
	if cfg == nil {
		log.Fatal("Configuration is not initialized!")
	}

	return cfg.DB
}

func GetServerPort() string {
	if cfg == nil {
		log.Fatal("Configuration is not initialized")
	}
	return cfg.API.Port
}
