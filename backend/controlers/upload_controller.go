package controlers

import (
	"io"
	"log"
	"net/http"

	"github.com/ProgramadoresSemPatria/HB02-2025_braindancers/services"
	"github.com/gin-gonic/gin"
)

type UploadController struct {
	FashionAnalysisService *services.GeminiService
	GeminiAPIKey           string
}

func NewUploadController(fas *services.GeminiService, apiKey string) *UploadController {
	return &UploadController{
		FashionAnalysisService: fas,
		GeminiAPIKey:           apiKey,
	}
}

func (ctrl *UploadController) HandleUpload(c *gin.Context) {
	fileHeader, err := c.FormFile("image")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Could not get image from form: " + err.Error()})
		return
	}

	language := c.PostForm("language")
	if language != "pt" {
		language = "en"
	}

	openedFile, err := fileHeader.Open()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not open uploaded file: " + err.Error()})
		return
	}
	defer openedFile.Close()

	imageData, err := io.ReadAll(openedFile)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not read image data: " + err.Error()})
		return
	}

	fashionResponse, err := ctrl.FashionAnalysisService.AnalyzeFashionImage(
		c.Request.Context(),
		imageData,
		ctrl.GeminiAPIKey,
		language,
	)
	if err != nil {
		log.Printf("❌ Fashion Analysis Error: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Fashion analysis error: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, fashionResponse)
}
