package services

import (
	"errors"
	"os"
	"strings"
	"time"

	"github.com/ProgramadoresSemPatria/HB02-2025_braindancers/models"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

var jwtSecret = []byte(os.Getenv("JWT_SECRET"))

type Claims struct {
	UserID string `json:"user_id"`
	jwt.StandardClaims
}

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(bytes), err
}

func VerifyPassword(hashedPassword, password string) error {
	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
}

func GenerateToken(user models.User) (string, int64, error) {
	expiration := time.Now().Add(24 * time.Hour)
	claims := &Claims{
		UserID: user.ID.String(),
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expiration.Unix(),
			IssuedAt:  time.Now().Unix(),
			Subject:   user.ID.String(),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtSecret)
	return tokenString, expiration.Unix(), err
}

func CreateUser(c *gin.Context, input models.RegisterInput) (map[string]interface{}, error) {
	if !strings.Contains(input.Email, "@") {
		return nil, errors.New("Invalid e-mail format!!")
	}
	if len(input.Password) < 8 {
		return nil, errors.New("Password must contain at least 8 characters!!")
	}

	db := c.MustGet("db").(*gorm.DB)

	var existing models.User
	if err := db.Where("email = ?", input.Email).First(&existing).Error; err == nil {
		return nil, errors.New("E-mail already registered")
	}

	hashedPassword, err := HashPassword(input.Password)
	if err != nil {
		return nil, errors.New("Failed to hash password!")
	}

	user := models.User{
		Name:     input.Name,
		Email:    input.Email,
		Password: hashedPassword,
	}

	if err := db.Create(&user).Error; err != nil {
		return nil, errors.New("Failed to create user!!")
	}

	token, exp, err := GenerateToken(user)
	if err != nil {
		return nil, errors.New("Failed to generate Token!!")
	}

	return map[string]interface{}{
		"user":       models.FilteredResponse(user),
		"token":      token,
		"expires_at": exp,
	}, nil
}

func Login(c *gin.Context, input models.SignInInput) (map[string]interface{}, error) {
	db := c.MustGet("db").(*gorm.DB)

	var user models.User
	if err := db.Where("email = ?", input.Email).First(&user).Error; err != nil {
		return nil, errors.New("Invalid credentials!!")
	}

	if err := VerifyPassword(user.Password, input.Password); err != nil {
		return nil, errors.New("Invalid credentials!!")
	}

	token, exp, err := GenerateToken(user)
	if err != nil {
		return nil, errors.New("Failed to generate Token!!")
	}

	return map[string]interface{}{
		"user":       models.FilteredResponse(user),
		"token":      token,
		"expires_at": exp,
	}, nil
}

func GetUserProfile(c *gin.Context) (models.User, error) {
	userID := c.MustGet("userID").(string)
	if _, err := uuid.Parse(userID); err != nil {
		return models.User{}, errors.New("invalid user ID")
	}

	db := c.MustGet("db").(*gorm.DB)
	var user models.User
	if err := db.First(&user, "id = ?", userID).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return models.User{}, errors.New("user not found")
		}
		return models.User{}, errors.New("internal server error")
	}

	return user, nil
}
