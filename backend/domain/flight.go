package domain

import (
	"time"
)

type Flight struct {
	ID          string    `bson:"_id,omitempty" json:"id"`
	Title       string    `bson:"title" json:"title" binding:"required"`
	Source      string    `bson:"source" json:"source" binding:"required"`
	Destination string    `bson:"destination" json:"destination" binding:"required"`
	Date        time.Time `bson:"date" json:"date"`
	UserID      string    `bson:"user_id" json:"user_id"`
}

type FlightRepository interface {
	CreateFlight(flight *Flight) error
	GetFlightByID(id string) (*Flight, error)
	DeleteFlight(id string) error
	GetFlightsByUserID(userID string) ([]Flight, error)
}

type FlightUseCase interface {
	AddFlight(flight *Flight) error
	FetchFlightByID(id string) (*Flight, error)
	DeleteFlight(id string) error
	FetchFlightsByUserID(userID string) ([]Flight, error)
} 