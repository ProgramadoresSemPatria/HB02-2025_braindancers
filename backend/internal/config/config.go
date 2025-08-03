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
}

type APIConfig struct {
	Port string
}

func init() {
	viper.SetDefault("api.port", "9090")
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
	}

	return nil
}

func GetServerPort() string {
	if cfg == nil {
		log.Fatal("Configuration is not initialized")
	}
	return cfg.API.Port
}
