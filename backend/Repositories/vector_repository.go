package repositories

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	"github.com/A2SV/A2SV-2025-Internship-Pass-Me/domain"
)

type VectorRepository interface {
	StoreEmbeddingBatch(flightID string, pairs []domain.QAPair) error
	SearchEmbedding(query, flightID string) (map[string]interface{}, error)
}

type vectorRepo struct {
	flaskURL string
}

func NewVectorRepository() (VectorRepository, error) {
	err := godotenv.Load()
	if err != nil {
		return nil, fmt.Errorf("error loading .env file")
	}

	flaskURL := os.Getenv("FLASK_URL")
	if flaskURL == "" {
		return nil, fmt.Errorf("FLASK_URL not set in environment variables")
	}

	return &vectorRepo{flaskURL: flaskURL}, nil
}

func (v *vectorRepo) StoreEmbeddingBatch(flightID string, pairs []domain.QAPair) error {
	// Convert domain.QAPair to the format expected by the Flask app
	qaPairs := make([]map[string]string, len(pairs))
	for i, pair := range pairs {
		qaPairs[i] = map[string]string{
			"question": pair.Question,
			"answer":   pair.Answer,
		}
	}

	data := map[string]interface{}{
		"flight_id": flightID,
		"qa_pairs":  qaPairs,
	}

	body, err := json.Marshal(data)
	if err != nil {
		return fmt.Errorf("error marshaling data: %w", err)
	}

	resp, err := http.Post(fmt.Sprintf("%s/embed-and-store-batch", v.flaskURL), "application/json", bytes.NewBuffer(body))
	if err != nil {
		return fmt.Errorf("error making request: %w", err)
	}
	defer resp.Body.Close()

	responseBody, err := io.ReadAll(resp.Body)
	if err != nil {
		return fmt.Errorf("error reading response: %w", err)
	}

	if resp.StatusCode != http.StatusOK {
		var errorResponse map[string]string
		if err := json.Unmarshal(responseBody, &errorResponse); err == nil {
			if errMsg, ok := errorResponse["error"]; ok {
				return fmt.Errorf("flask error: %s", errMsg)
			}
		}
		return fmt.Errorf("flask error: %s", string(responseBody))
	}

	return nil
}

func (v *vectorRepo) SearchEmbedding(query, flightID string) (map[string]interface{}, error) {
	data := map[string]string{
		"query":     query,
		"flight_id": flightID,
	}

	body, err := json.Marshal(data)
	if err != nil {
		return nil, fmt.Errorf("error marshaling data: %w", err)
	}

	resp, err := http.Post(fmt.Sprintf("%s/search", v.flaskURL), "application/json", bytes.NewBuffer(body))
	if err != nil {
		return nil, fmt.Errorf("error making request: %w", err)
	}
	defer resp.Body.Close()

	responseBody, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("error reading response: %w", err)
	}

	var result map[string]interface{}
	if err := json.Unmarshal(responseBody, &result); err != nil {
		return nil, fmt.Errorf("error unmarshaling response: %w", err)
	}

	if resp.StatusCode == http.StatusNotFound {
		// Handle the case where no similar question was found
		if message, ok := result["message"].(string); ok {
			return nil, fmt.Errorf("no match found: %s", message)
		}
		return nil, fmt.Errorf("no match found")
	}

	if resp.StatusCode != http.StatusOK {
		if errMsg, ok := result["error"].(string); ok {
			return nil, fmt.Errorf("search failed: %s", errMsg)
		}
		return nil, fmt.Errorf("search failed with status code: %d", resp.StatusCode)
	}

	return result, nil
}
