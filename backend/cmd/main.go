package main

import (
	"fmt"
	"log"
	"os"
	"time"

	"github.com/ProgramadoresSemPatria/HB02-2025_braindancers/controlers"
	"github.com/ProgramadoresSemPatria/HB02-2025_braindancers/internal/config"
	"github.com/ProgramadoresSemPatria/HB02-2025_braindancers/internal/storage/connection"
	"github.com/ProgramadoresSemPatria/HB02-2025_braindancers/internal/storage/migrations"
	"github.com/ProgramadoresSemPatria/HB02-2025_braindancers/services"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	_ = godotenv.Load()

	port := os.Getenv("PORT")
	if port == "" {
		port = "9090"
	}

	if err := config.Load(); err != nil {
		panic(fmt.Sprintf("Failed to load configuration: %v", err))
	}

	db, err := connection.OpenConnection()
	if err != nil {
		panic(err)
	}

	migrations.RunMigration(db)

	geminiAPIKey := os.Getenv("GEMINI_API_KEY")
	if geminiAPIKey == "" {

		log.Fatal("GEMINI_API_KEY environment variable not set.")
	}

	geminiService := services.NewGeminiService()

	r := gin.Default()
	r.Use(func(c *gin.Context) {
		c.Set("db", db)
		c.Next()
	})

	corsOrigin := os.Getenv("CORS")
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{corsOrigin},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization", "X-Requested-With", "Access-Control-Allow-Headers"},
		ExposeHeaders:    []string{"Content-Length", "Authorization"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	uploadController := controlers.NewUploadController(geminiService, geminiAPIKey)

	r.POST("/upload", uploadController.HandleUpload)

	fmt.Println("Listening on Port", port)
	r.Run(":" + port)
}
