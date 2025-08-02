package models

type GeminiSugestion struct {
	Suggestion string `json:"suggestion"`
	Why        string `json:"why"`
}

type FashionResponse struct {
	Tags       []string `json:"tags"`
	Colors     []string `json:"colors"`
	Suggestion string   `json:"suggestion"`
	Why        string   `json:"why"`
}
