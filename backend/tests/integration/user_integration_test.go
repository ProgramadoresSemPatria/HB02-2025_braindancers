package integration

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/ProgramadoresSemPatria/HB02-2025_braindancers/controlers"
	"github.com/ProgramadoresSemPatria/HB02-2025_braindancers/middleware"
	"github.com/ProgramadoresSemPatria/HB02-2025_braindancers/models"
	"github.com/ProgramadoresSemPatria/HB02-2025_braindancers/services"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func setupUserRouter(t *testing.T) (*gin.Engine, *gorm.DB) {
	t.Helper()

	db, err := gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
	if err != nil {
		t.Fatalf("failed to open DB: %v", err)
	}

	err = db.AutoMigrate(&models.User{})
	if err != nil {
		t.Fatalf("failed to migrate DB: %v", err)
	}

	router := gin.Default()
	router.Use(func(c *gin.Context) {
		c.Set("db", db)
	})
	router.POST("/create", controlers.CreateUserHandler)
	router.POST("/login", controlers.LoginHandler)
	router.GET("/profile", middleware.AuthMiddleware(), controlers.ProfileHandler)

	return router, db
}

func createTestUser(t *testing.T, db *gorm.DB, email, password string, verified bool) {
	t.Helper()

	hashedPassword, err := services.HashPassword(password)
	if err != nil {
		t.Fatalf("failed to hash password: %v", err)
	}

	user := models.User{Name: "Test User", Email: email, Password: hashedPassword}
	if err := db.Create(&user).Error; err != nil {
		t.Fatalf("failed to create test user: %v", err)
	}
}

func loginUser(t *testing.T, router *gin.Engine, email, password string) string {
	t.Helper()

	body, err := json.Marshal(models.SignInInput{Email: email, Password: password})
	if err != nil {
		t.Fatalf("failed to marshal login input: %v", err)
	}

	req, err := http.NewRequest("POST", "/login", bytes.NewBuffer(body))
	if err != nil {
		t.Fatalf("failed to create login request: %v", err)
	}
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Fatalf("login failed with code %d", w.Code)
	}

	var resp map[string]interface{}
	err = json.Unmarshal(w.Body.Bytes(), &resp)
	if err != nil {
		t.Fatalf("failed to parse login response: %v", err)
	}

	token, ok := resp["token"].(string)
	if !ok || token == "" {
		t.Fatalf("token not found or invalid in response: %v", resp)
	}

	return token
}

func TestCreateUserHandler(t *testing.T) {
	router, db := setupUserRouter(t)

	userInput := models.RegisterInput{
		Name:     "Test User",
		Email:    "test@example.com",
		Password: "password123",
	}
	body, err := json.Marshal(userInput)
	if err != nil {
		t.Fatalf("failed to marshal input: %v", err)
	}

	req, err := http.NewRequest("POST", "/create", bytes.NewBuffer(body))
	if err != nil {
		t.Fatalf("failed to create request: %v", err)
	}

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusCreated, w.Code)

	var user models.User
	err = db.Where("email = ?", userInput.Email).First(&user).Error
	assert.NoError(t, err)
	assert.NotEmpty(t, user.ID)
}

func TestCreateUserBadRequest(t *testing.T) {
	router, _ := setupUserRouter(t)

	body := []byte(`{"email": "test@example.com"}`)
	req, err := http.NewRequest("POST", "/create", bytes.NewBuffer(body))
	if err != nil {
		t.Fatalf("failed to create request: %v", err)
	}

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusBadRequest, w.Code)
}

func TestLoginHandler(t *testing.T) {
	router, db := setupUserRouter(t)
	createTestUser(t, db, "test@example.com", "password123", true)

	t.Run("Valid login", func(t *testing.T) {
		body, _ := json.Marshal(models.SignInInput{Email: "test@example.com", Password: "password123"})
		req, _ := http.NewRequest("POST", "/login", bytes.NewBuffer(body))
		req.Header.Set("Content-Type", "application/json")
		w := httptest.NewRecorder()
		router.ServeHTTP(w, req)

		assert.Equal(t, http.StatusOK, w.Code)

		var resp map[string]interface{}
		err := json.Unmarshal(w.Body.Bytes(), &resp)
		assert.NoError(t, err)

		token, ok := resp["token"].(string)
		assert.True(t, ok)
		assert.NotEmpty(t, token)
	})

	t.Run("Invalid password", func(t *testing.T) {
		body, _ := json.Marshal(models.SignInInput{Email: "test@example.com", Password: "wrong"})
		req, _ := http.NewRequest("POST", "/login", bytes.NewBuffer(body))
		req.Header.Set("Content-Type", "application/json")
		w := httptest.NewRecorder()
		router.ServeHTTP(w, req)

		assert.Equal(t, http.StatusUnauthorized, w.Code)
	})

	t.Run("Non-existent user", func(t *testing.T) {
		body, _ := json.Marshal(models.SignInInput{Email: "nouser@example.com", Password: "secret"})
		req, _ := http.NewRequest("POST", "/login", bytes.NewBuffer(body))
		req.Header.Set("Content-Type", "application/json")
		w := httptest.NewRecorder()
		router.ServeHTTP(w, req)

		assert.Equal(t, http.StatusUnauthorized, w.Code)
	})
}

func TestProfileHandler(t *testing.T) {
	router, db := setupUserRouter(t)
	createTestUser(t, db, "test@example.com", "password123", true)

	token := loginUser(t, router, "test@example.com", "password123")

	reqProfile, err := http.NewRequest("GET", "/profile", nil)
	if err != nil {
		t.Fatalf("failed to create profile request: %v", err)
	}
	reqProfile.Header.Set("Authorization", "Bearer "+token)

	w := httptest.NewRecorder()
	router.ServeHTTP(w, reqProfile)

	assert.Equal(t, http.StatusOK, w.Code)
}

func TestAuthMiddleware(t *testing.T) {
	router, _ := setupUserRouter(t)

	t.Run("Missing token", func(t *testing.T) {
		req, _ := http.NewRequest("GET", "/profile", nil)
		w := httptest.NewRecorder()
		router.ServeHTTP(w, req)

		assert.Equal(t, http.StatusUnauthorized, w.Code)
	})

	t.Run("Invalid token", func(t *testing.T) {
		req, _ := http.NewRequest("GET", "/profile", nil)
		req.Header.Set("Authorization", "Bearer invalid-token")
		w := httptest.NewRecorder()
		router.ServeHTTP(w, req)

		assert.Equal(t, http.StatusUnauthorized, w.Code)
	})
}
