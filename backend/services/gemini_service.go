package services

import (
	"context"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/google/generative-ai-go/genai"
	"google.golang.org/api/option"

	"github.com/ProgramadoresSemPatria/HB02-2025_braindancers/models"
)

type GeminiService struct{}

func NewGeminiService() *GeminiService {
	return &GeminiService{}
}

func (s *GeminiService) GetFashionTip(ctx context.Context, tags []string, colors []string, apiKey string) (*models.GeminiSugestion, error) {
	client, err := genai.NewClient(ctx, option.WithAPIKey(apiKey))
	if err != nil {
		return nil, fmt.Errorf("Failed to create gemini client: %w", err)
	}

	defer client.Close()

	model := client.GenerativeModel("gemini-1.5-pro-latest")
	prompt := fmt.Sprintf(
		`You are an AI fashion assistant. Analyze the following clothing items and colors and provide one concise styling suggestion.
		Detected items: %s. Detected colors: %s.
		IMPORTANT: Respond ONLY with a valid JSON object in the format: {"suggestion": "Your suggestion here.", "why": "Your reason here."}`,
		strings.Join(tags, ", "), strings.Join(colors, ", "),
	)

	resp, err := model.GenerateContent(ctx, genai.Text(prompt))
	if err != nil {
		return nil, fmt.Errorf("Failed to generate content: %w", err)
	}

	geminiOutput := fmt.Sprint(resp.Candidates[0].Content.Parts[0])
	jsonString := strings.TrimSpace(geminiOutput)
	if strings.HasPrefix(jsonString, "```json") {
		jsonString = strings.TrimPrefix(jsonString, "```json")
		jsonString = strings.TrimSuffix(jsonString, "```")
	}

	var suggestion models.GeminiSugestion
	if err := json.Unmarshal([]byte(jsonString), &suggestion); err != nil {
		return nil, fmt.Errorf("Failed to unmarshal gemini response: %w", err)
	}

	return &suggestion, nil
}
