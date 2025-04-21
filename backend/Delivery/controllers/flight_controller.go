package controllers

import (
	"log"
	"net/http"

	domain "github.com/A2SV/A2SV-2025-Internship-Pass-Me/domain"
	usecases "github.com/A2SV/A2SV-2025-Internship-Pass-Me/usecases"
	"fmt"
	"github.com/gin-gonic/gin"
)

type FlightController struct {
	flightUseCase usecases.FlightUseCase 
}

func NewFlightController(uc usecases.FlightUseCase) *FlightController {
	return &FlightController{
		flightUseCase: uc,
	}
}

// CreateFlight handles creating a new flight with bilingual QA
func (fc *FlightController) CreateFlight(c *gin.Context) {
	var inputData domain.CreateFlightRequest
	if err := c.ShouldBindJSON(&inputData); err != nil {
		log.Printf("Error binding JSON: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body: " + err.Error()})
		return
	}

	if inputData.Title == "" || inputData.FromCountry == "" || inputData.ToCountry == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing required flight fields (title, from_country, to_country)"})
		return
	}

	if len(inputData.QA) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "At least one question-answer pair is required"})
	}
    
	for i, qa := range inputData.QA {
		if qa.Question == "" || qa.Answer == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Question and Answer cannot be empty for pair %d", i+1)})
			return
		}
	}


	userIDAny, exists := c.Get("user_id")
	if !exists {
		log.Println("Authentication error: user_id not found in context")
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		return
	}
	userID, ok := userIDAny.(string)
	if !ok {
		log.Println("Type assertion error: user_id in context is not a string")
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error processing user identity"})
		return
	}

	// Pass the validated input data and user ID to the use case
	createdFlight, err := fc.flightUseCase.AddFlight(&inputData, userID)
	if err != nil {
		log.Printf("Error calling AddFlight use case: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create flight: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Flight created successfully",
		"flight":  createdFlight, 
	})
}

func (fc *FlightController) GetFlightByID(c *gin.Context) {
	id := c.Param("id")

	userIDAny, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		return
	}
	userID := userIDAny.(string) 

	flight, err := fc.flightUseCase.FetchFlightByID(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Flight not found"})
		return
	}

	if flight.UserID != userID {
		c.JSON(http.StatusForbidden, gin.H{"error": "You don't have permission to access this flight"})
		return
	}

	c.JSON(http.StatusOK, flight) 
}

func (fc *FlightController) GetUserFlights(c *gin.Context) {
	userIDAny, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		return
	}
	userID := userIDAny.(string) 

	flights, err := fc.flightUseCase.FetchFlightsByUserID(userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch user flights: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, flights)
}

func (fc *FlightController) DeleteFlight(c *gin.Context) {
	id := c.Param("id")

	userIDAny, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		return
	}
	userID := userIDAny.(string) 

	flight, err := fc.flightUseCase.FetchFlightByID(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Flight not found"})
		return
	}

	if flight.UserID != userID {
		c.JSON(http.StatusForbidden, gin.H{"error": "You don't have permission to delete this flight"})
		return
	}

	if err := fc.flightUseCase.DeleteFlight(id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete flight: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Flight deleted successfully"})
}