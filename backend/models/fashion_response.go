package models

type FashionResponse struct {
	IdentifiedClothes []string `json:"identified_clothes"`
	Colors            []string `json:"colors"`
	Suggestion        string   `json:"suggestion"`
	Why               string   `json:"why"`
}
