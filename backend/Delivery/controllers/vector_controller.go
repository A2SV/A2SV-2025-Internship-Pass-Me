package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/A2SV/A2SV-2025-Internship-Pass-Me/domain"
	"github.com/A2SV/A2SV-2025-Internship-Pass-Me/usecases"
)

type VectorController struct {
	Usecase usecases.VectorUsecase
}

func NewVectorController(uc usecases.VectorUsecase) *VectorController {
	return &VectorController{Usecase: uc}
}

func (vc *VectorController) StoreBatchHandler(c *gin.Context) {
	var req struct {
		QAPairs []struct {
			Question string `json:"question"`
			Answer   string `json:"answer"`
		} `json:"qa_pairs"`
		FlightID string `json:"flight_id"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON"})
		return
	}

	// Convert the request pairs to the domain structure (QAPair)
	var pairs []domain.QAPair
	for _, pair := range req.QAPairs {
		pairs = append(pairs, domain.QAPair{
			Question: pair.Question,
			Answer:   pair.Answer,
		})
	}

	err := vc.Usecase.StoreBatch(req.FlightID, pairs)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Batch stored successfully"})
}

func (vc *VectorController) SearchHandler(c *gin.Context) {
	var req struct {
		Query    string `json:"query"`
		FlightID string `json:"flight_id"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON"})
		return
	}

	result, err := vc.Usecase.Search(req.Query, req.FlightID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, result)
}
