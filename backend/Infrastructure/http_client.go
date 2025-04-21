package infrastructure

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
)

type TranslationRequest struct {
	Text      string `json:"text"`
	Direction string `json:"direction"`
}

type TranslationResponse struct {
	TranslatedText string `json:"translated"`
	Error          string `json:"error"`
}

func TranslateText(text, direction string) (string, error) {
	reqBody, err := json.Marshal(TranslationRequest{
		Text:      text,
		Direction: direction,
	})
	if err != nil {
		return "", fmt.Errorf("failed to marshal translation request: %w", err)
	}

	translationURL := "http://localhost:5000/translate"
	resp, err := http.Post(translationURL, "application/json", bytes.NewBuffer(reqBody))
	if err != nil {
		return "", fmt.Errorf("failed to POST to translation service at %s: %w", translationURL, err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		bodyBytes, _ := io.ReadAll(resp.Body)
		return "", fmt.Errorf("translation service returned non-OK status %d: %s", resp.StatusCode, string(bodyBytes))
	}

	var res TranslationResponse
	if err := json.NewDecoder(resp.Body).Decode(&res); err != nil {
		return "", fmt.Errorf("failed to decode translation response: %w", err)
	}

	if res.Error != "" {
		return "", errors.New(res.Error)
	}

	if res.TranslatedText == "" && res.Error == "" {
		log.Printf("Warning: Translation resulted in an empty string for input: %s", text)
	}

	return res.TranslatedText, nil
}
