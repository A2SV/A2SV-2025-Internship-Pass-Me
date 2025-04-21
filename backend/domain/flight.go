package domain

import (
	"time"
)

type BilingualQA struct {
	QuestionAmh string `bson:"question_amh" json:"questionAmh"` 
	QuestionEng string `bson:"question_eng" json:"questionEng"`
	AnswerAmh   string `bson:"answer_amh" json:"answerAmh"`     
	AnswerEng   string `bson:"answer_eng" json:"answerEng"`     
}

type InputQA struct {
	Question string `json:"question"`
	Answer   string `json:"answer"`
}

type CreateFlightRequest struct {
	Title       string    `json:"title"`        
	FromCountry string    `json:"from_country"` 
	ToCountry   string    `json:"to_country"`   
	QA          []InputQA `json:"qa"`           
	Date        time.Time `json:"date"`         
}

type Flight struct {
	ID          string    `bson:"_id,omitempty" json:"id"`
	Title       string    `bson:"title" json:"title"`             
	FromCountry string    `bson:"from_country" json:"from_country"` 
	ToCountry   string    `bson:"to_country" json:"to_country"`   
	Date        time.Time `bson:"date" json:"date"`
	UserID      string    `bson:"user_id" json:"user_id"`
	QA          []BilingualQA `bson:"qa" json:"qa"` 
}

type FlightRepository interface {
	CreateFlight(flight *Flight) error
	GetFlightByID(id string) (*Flight, error)
	DeleteFlight(id string) error
	GetFlightsByUserID(userID string) ([]Flight, error)
}

type FlightUseCase interface {
	AddFlight(inputData *CreateFlightRequest, userID string) (*Flight, error)
	FetchFlightByID(id string) (*Flight, error)
	DeleteFlight(id string) error
	FetchFlightsByUserID(userID string) ([]Flight, error)
}