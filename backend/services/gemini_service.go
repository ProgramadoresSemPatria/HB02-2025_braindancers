package services

import (
	"context"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/ProgramadoresSemPatria/HB02-2025_braindancers/models"
	"github.com/google/generative-ai-go/genai"
	"google.golang.org/api/option"
)

var prompts = map[string]string{
	"en": `You are an AI fashion stylist tasked with analyzing an image to identify ONLY clothing items and their colors, then providing a styling suggestion. Follow these instructions PRECISELY:

1. **STRICTLY Identify ONLY Clothing Items**:
   - Detect ONLY actual clothing items (e.g., "Black shirt", "Blue jeans", "Red dress", "White sneakers", "Brown jacket", "Black pants", "White blouse").
   - NEVER include: body parts (thigh, waist, knee, arm, leg, hand, foot, etc.), hair (blond, long hair, short hair, etc.), makeup, jewelry, accessories, background elements, or abstract concepts (beauty, fashion, model, photo shoot, etc.).
   - NEVER include: "Beauty", "Fashion", "Model", "Photo shoot", "Thigh", "Waist", "Knee", "Blond", "Long hair", "Short hair", "Makeup", "Jewelry", "Accessories".
   - If no actual clothing is detected, return: {"identified_clothes": [], "colors": [], "suggestion": "No clothing items detected in the image.", "why": "No clothing items were visible in the provided image."}

2. **Extract Colors from Clothing ONLY**:
   - For each identified clothing item, extract its dominant color as a hex code (e.g., "#000000" for black).
   - Only include colors that correspond to actual clothing items.
   - Do not include colors from skin, hair, background, or non-clothing elements.

3. **Generate Styling Suggestion**:
   - Provide a practical clothing styling suggestion using simple color names, not hex codes.
   - Base suggestions only on the detected clothing items and their colors.
   - Include a brief explanation of why the suggestion works.

4. **Output Format**:
   - Return a JSON object with:
     - "identified_clothes": Array of ONLY clothing item names (no body parts, hair, or abstract concepts).
     - "colors": Array of hex codes corresponding to each clothing item.
     - "suggestion": Styling suggestion using simple color names.
     - "why": Explanation of the suggestion.
   - Example:
     {
       "identified_clothes": ["Black shirt", "Blue jeans"],
       "colors": ["#000000", "#3a5a9a"],
       "suggestion": "Pair the black shirt with a white jacket.",
       "why": "The white jacket contrasts with the black shirt for a sharp look."
     }

CRITICAL: Focus ONLY on clothing items. Ignore all body parts, hair, makeup, accessories, and background elements. If you cannot identify any actual clothing items, return empty arrays with the "No clothing items detected" message.

IMPORTANT: Respond ONLY with a valid JSON object in the exact format specified above. Do not include any additional text, markdown formatting, or explanations outside the JSON.`,

	"pt": `Você é um estilista de IA encarregado de analisar uma imagem para identificar APENAS peças de vestuário e suas cores, e então fornecer uma sugestão de estilo. Siga estas instruções PRECISAMENTE:

1. **Identifique ESTRITAMENTE APENAS Peças de Vestuário**:
   - Detecte APENAS itens de vestuário reais (ex: "Camisa preta", "Calça jeans azul").
   - **IMPORTANTE: Os nomes das peçase e nomes das cores devem estar em português.**
   - NUNCA inclua: partes do corpo, cabelo, maquiagem, joias, acessórios, etc.
   - Se nenhuma peça de roupa for detectada, retorne: {"identified_clothes": [], "colors": [], "suggestion": "Nenhuma peça de roupa foi detectada na imagem.", "why": "Nenhuma peça de roupa estava visível na imagem fornecida."}

2. **Extraia Cores APENAS das Roupas**:
   - Para cada peça de roupa identificada, extraia sua cor dominante como um código hexadecimal (ex: "#000000" para preto).

3. **Gere Sugestão de Estilo**:
   - Forneça uma sugestão prática de estilo de roupa usando nomes de cores simples, não códigos hexadecimais.
   - **IMPORTANTE: A sugestão e a explicação devem ser geradas em português.**
   - Baseie as sugestões apenas nas peças de roupa detectadas e suas cores.

4. **Formato de Saída**:
   - Retorne um objeto JSON com "identified_clothes", "colors", "suggestion", e "why".
   - Exemplo em português:
     {
       "identified_clothes": ["Blazer bege", "Calça bege"],
       "colors": ["#d2b48c", "#d2b48c"],
       "suggestion": "Para adicionar um toque de contraste, considere acessórios em tons neutros como preto ou branco.",
       "why": "Manter um esquema de cores consistentes alonga a silhueta e cria um visual polido."
     }

CRÍTICO: Foque APENAS em peças de vestuário. Ignore todas as partes do corpo, cabelo, maquiagem, acessórios e elementos de fundo. Se você não conseguir identificar nenhuma peça de roupa real, retorne arrays vazios com a mensagem "Nenhuma peça de roupa detectada".

IMPORTANTE: Responda APENAS com um objeto JSON válido no formato exato especificado acima. Não inclua nenhum texto adicional, formatação de markdown ou explicações fora do JSON.`,
}

type GeminiService struct{}

func NewGeminiService() *GeminiService {
	return &GeminiService{}
}

func (s *GeminiService) AnalyzeFashionImage(ctx context.Context, imageData []byte, apiKey string, language string) (*models.FashionResponse, error) {
	client, err := genai.NewClient(ctx, option.WithAPIKey(apiKey))
	if err != nil {
		return nil, fmt.Errorf("failed to create gemini client: %w", err)
	}
	defer client.Close()

	model := client.GenerativeModel("gemini-1.5-pro-latest")
	model.SetTemperature(0.1)

	prompt, ok := prompts[language]
	if !ok {
		prompt = prompts["en"]
	}

	imagePart := genai.ImageData("image/jpeg", imageData)

	resp, err := model.GenerateContent(ctx, imagePart, genai.Text(prompt))
	if err != nil {
		return nil, fmt.Errorf("failed to generate content: %w", err)
	}

	if len(resp.Candidates) == 0 || len(resp.Candidates[0].Content.Parts) == 0 {
		return nil, fmt.Errorf("no response generated from gemini")
	}

	geminiOutput := fmt.Sprint(resp.Candidates[0].Content.Parts[0])
	jsonString := strings.TrimSpace(geminiOutput)

	if strings.HasPrefix(jsonString, "```json") {
		jsonString = strings.TrimPrefix(jsonString, "```json")
		jsonString = strings.TrimSuffix(jsonString, "```")
		jsonString = strings.TrimSpace(jsonString)
	}

	jsonString = strings.Trim(jsonString, "`")
	jsonString = strings.TrimSpace(jsonString)

	var fashionResponse models.FashionResponse
	if err := json.Unmarshal([]byte(jsonString), &fashionResponse); err != nil {
		return nil, fmt.Errorf("failed to unmarshal gemini response: %w, response: %s", err, jsonString)
	}

	return &fashionResponse, nil
}
