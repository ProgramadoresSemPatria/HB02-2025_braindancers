package controlers

import (
	"io"
	"log"
	"net/http"

	"github.com/ProgramadoresSemPatria/HB02-2025_braindancers/models"
	"github.com/ProgramadoresSemPatria/HB02-2025_braindancers/services"
	"github.com/gin-gonic/gin"
)

type UploadController struct {
	VisionService *services.VisionService
	GeminiService *services.GeminiService
	GeminiAPIKey  string
}

func NewUploadController(vs *services.VisionService, gs *services.GeminiService, apiKey string) *UploadController {
	return &UploadController{
		VisionService: vs,
		GeminiService: gs,
		GeminiAPIKey:  apiKey,
	}
}

func (ctrl *UploadController) HandleUpload(c *gin.Context) {
	fileHeader, err := c.FormFile("image")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Could not get image from form: " + err.Error()})
		return
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

	tags, colors, err := ctrl.VisionService.AnalyzeImage(c.Request.Context(), imageData)
	if err != nil {

		log.Printf("❌ Vision API Error: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Vision API error: " + err.Error()})
		return
	}

	suggestion, err := ctrl.GeminiService.GetFashionTip(c.Request.Context(), tags, colors, ctrl.GeminiAPIKey)
	if err != nil {

		log.Printf("❌ Gemini API Error: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gemini API error: " + err.Error()})
		return
	}

	response := models.FashionResponse{
		Tags:       tags,
		Colors:     colors,
		Suggestion: suggestion.Suggestion,
		Why:        suggestion.Why,
	}
	c.JSON(http.StatusOK, response)
}
