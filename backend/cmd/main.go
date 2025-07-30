package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/ProgramadoresSemPatria/HB02-2025_braindancers/internal/config"
	"github.com/ProgramadoresSemPatria/HB02-2025_braindancers/internal/storage/connection"
	"github.com/ProgramadoresSemPatria/HB02-2025_braindancers/internal/storage/migrations"
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

	r := gin.Default()
	r.Use(func(c *gin.Context) {
		c.Set("db", db)
		c.Next()
	})

	fmt.Println("Listening on Port", port)
	http.ListenAndServe(":"+port, r)
}
