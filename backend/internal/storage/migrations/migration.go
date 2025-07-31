package migrations

import (
	"github.com/ProgramadoresSemPatria/HB02-2025_braindancers/models"
	"gorm.io/gorm"
)

func RunMigration(db *gorm.DB) {
	CreateTables(db)
}

func CreateTables(db *gorm.DB) {
	db.AutoMigrate(&models.User{})
	db.AutoMigrate(&models.Chat{})
	db.AutoMigrate(&models.SenderMessage{})
}
