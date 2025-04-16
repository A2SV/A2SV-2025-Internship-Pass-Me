package controllers

import (
	"net/http"
	"time"

	domain "github.com/A2SV/A2SV-2025-Internship-Pass-Me/domain"
	usecases "github.com/A2SV/A2SV-2025-Internship-Pass-Me/usecases"

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

// CreateFlight handles creating a new flight
func (fc *FlightController) CreateFlight(c *gin.Context) {
	var flight domain.Flight
	if err := c.ShouldBindJSON(&flight); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Validate required fields
	if flight.Title == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Title is required"})
		return
	}
	if flight.Source == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Source is required"})
		return
	}
	if flight.Destination == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Destination is required"})
		return
	}

	// Get user ID from the authenticated user
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		return
	}

	// Set the user ID for the flight
	flight.UserID = userID.(string)

	// Set default date if not provided
	if flight.Date.IsZero() {
		flight.Date = time.Now()
	}

	if err := fc.flightUseCase.AddFlight(&flight); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Flight created successfully",
		"flight": gin.H{
			"id":          flight.ID,
			"title":       flight.Title,
			"source":      flight.Source,
			"destination": flight.Destination,
			"date":        flight.Date,
			"user_id":     flight.UserID,
		},
	})
}

// GetFlightByID retrieves a flight by its ID and sends the response
func (fc *FlightController) GetFlightByID(c *gin.Context) {
	id := c.Param("id")

	// Get user ID from the authenticated user
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		return
	}

	flight, err := fc.flightUseCase.FetchFlightByID(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Flight not found"})
		return
	}

	// Check if the flight belongs to the authenticated user
	if flight.UserID != userID.(string) {
		c.JSON(http.StatusForbidden, gin.H{"error": "You don't have permission to access this flight"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"id":          flight.ID,
		"title":       flight.Title,
		"source":      flight.Source,
		"destination": flight.Destination,
		"date":        flight.Date,
		"user_id":     flight.UserID,
	})
}

// GetUserFlights retrieves all flights for the authenticated user
func (fc *FlightController) GetUserFlights(c *gin.Context) {
	// Get user ID from the authenticated user
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		return
	}

	flights, err := fc.flightUseCase.FetchFlightsByUserID(userID.(string))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, flights)
}

// DeleteFlight handles the deletion of a flight by its ID
func (fc *FlightController) DeleteFlight(c *gin.Context) {
	id := c.Param("id")

	// Get user ID from the authenticated user
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		return
	}

	// Check if the flight belongs to the authenticated user
	flight, err := fc.flightUseCase.FetchFlightByID(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Flight not found"})
		return
	}

	if flight.UserID != userID.(string) {
		c.JSON(http.StatusForbidden, gin.H{"error": "You don't have permission to delete this flight"})
		return
	}

	// Delete the flight
	if err := fc.flightUseCase.DeleteFlight(id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Flight deleted successfully"})
}