package models

import (
	"time"

	"github.com/google/uuid"
)

type ReceiverMessage struct {
	ID          uuid.UUID `json:"id" gorm:"type:uuid;primaryKey;"`
	MessageBody string    `json:"message_body" gorm:"not null"`
	ChatID      uuid.UUID `json:"chat_id" gorm:"type:uuid;not null; index"`
	Chat        Chat      `json:"chat" gorm:"foreignKey:ChatID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	UpdateAt    time.Time `json:"updated_at" gorm:"autoUpdateTime"`
	CreatedAt   time.Time `json:"created_at" gorm:"autoCreateTime"`
}
