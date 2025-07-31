package models

import (
	"time"

	"github.com/google/uuid"
)

type Chat struct {
	ID           uuid.UUID `json:"id" gorm:"type:uuid;primaryKey;"`
	Title        string    `json:"title" gorm:"not null"`
	LastActivity time.Time `json:"last_activity"`
	UserID       uuid.UUID `json:"user_id" gorm:"type:uuid;not null;index"`
	User         User      `json:"user" gorm:"foreignKey:UserID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	UpdatedAt    time.Time `json:"updated_at" gorm:"autoCreateTime"`
	CreatedAt    time.Time `json:"created_at" gorm:"autoUpdateTime"`
}

type ChatInput struct {
	Title string `json:"title" binding:"required"`
}
