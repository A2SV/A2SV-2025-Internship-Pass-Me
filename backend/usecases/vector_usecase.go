package usecases

import "github.com/A2SV/A2SV-2025-Internship-Pass-Me/domain"
import "github.com/A2SV/A2SV-2025-Internship-Pass-Me/repositories"

type VectorUsecase interface {
	StoreBatch(flightID string, pairs []domain.QAPair) error
	Search(query, flightID string) (map[string]interface{}, error)
}

type vectorUsecase struct {
	repo repositories.VectorRepository
}

func NewVectorUsecase(r repositories.VectorRepository) VectorUsecase {
	return &vectorUsecase{repo: r}
}

func (v *vectorUsecase) StoreBatch(flightID string, pairs []domain.QAPair) error {
	return v.repo.StoreEmbeddingBatch(flightID, pairs)
}

func (v *vectorUsecase) Search(query, flightID string) (map[string]interface{}, error) {
	return v.repo.SearchEmbedding(query, flightID)
}
