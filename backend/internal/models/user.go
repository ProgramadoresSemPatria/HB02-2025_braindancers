package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type InpuStruct struct {
	Name     string `json:"name" binding:"required"`
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type SignInInput struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type UserResponse struct {
	ID        uuid.UUID `json:"id,omitempty"`
	Name      string    `json:"name,omitempty"`
	Email     string    `json:"email,omitempty"`
	UpdatedAt time.Time `json:"updated_at"`
	CreatedAt time.Time `json:"created_at"`
}

type User struct {
	ID        uuid.UUID `json:"id" gorm:"type:uuid;primaryKey;"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Password  string    `json:"password"`
	UpdatedAt time.Time `json:"created_at"`
	CreatedAt time.Time `json:"updated_at"`
}

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

func FilteredResponse(user User) UserResponse {
	return UserResponse{
		ID:        user.ID,
		Email:     user.Email,
		Name:      user.Name,
		CreatedAt: user.CreatedAt,
		UpdatedAt: user.UpdatedAt,
	}
}

func (u *User) BeforeCreate(d *gorm.DB) (err error) {
	u.ID = uuid.New()
	return
}
