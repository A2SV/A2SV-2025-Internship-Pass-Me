package usecases

import (
	"fmt" 
	"log" 
	"time"

	"github.com/A2SV/A2SV-2025-Internship-Pass-Me/Infrastructure"
	"github.com/A2SV/A2SV-2025-Internship-Pass-Me/domain"
)

type FlightUseCase interface {
	AddFlight(inputData *domain.CreateFlightRequest, userID string) (*domain.Flight, error)
	FetchFlightByID(id string) (*domain.Flight, error)
	DeleteFlight(id string) error
	FetchFlightsByUserID(userID string) ([]domain.Flight, error)
}

type flightUseCase struct {
	flightRepo domain.FlightRepository
}

// create a new instance of flight use case
func NewFlightUseCase(repo domain.FlightRepository) FlightUseCase {
	return &flightUseCase{
		flightRepo: repo,
	}
}

// AddFlight takes input data, translates, creates the final Flight object, and saves it.
func (uc *flightUseCase) AddFlight(inputData *domain.CreateFlightRequest, userID string) (*domain.Flight, error) {
	flight := &domain.Flight{
		UserID: userID,
	}

	log.Printf("Original Title: %s", inputData.Title)
	translatedTitle, err := Infrastructure.TranslateText(inputData.Title, "am_to_en")
	if err != nil {
		log.Printf("Error translating Title: %v", err)
		return nil, fmt.Errorf("failed to translate title: %w", err)
	}
	log.Printf("Translated Title: %s", translatedTitle)
	flight.Title = translatedTitle 

	log.Printf("Original FromCountry: %s", inputData.FromCountry)
	translatedFromCountry, err := Infrastructure.TranslateText(inputData.FromCountry, "am_to_en")
	if err != nil {
		log.Printf("Error translating FromCountry: %v", err)
		return nil, fmt.Errorf("failed to translate from_country: %w", err)
	}
	log.Printf("Translated FromCountry: %s", translatedFromCountry)
	flight.FromCountry = translatedFromCountry 

	log.Printf("Original ToCountry: %s", inputData.ToCountry)
	translatedToCountry, err := Infrastructure.TranslateText(inputData.ToCountry, "am_to_en")
	if err != nil {
		log.Printf("Error translating ToCountry: %v", err)
		return nil, fmt.Errorf("failed to translate to_country: %w", err)
	}
	log.Printf("Translated ToCountry: %s", translatedToCountry)
	flight.ToCountry = translatedToCountry 

	if len(inputData.QA) == 0 {
		log.Println("Warning: No QA pairs provided in the request.")
	}

	flight.QA = make([]domain.BilingualQA, len(inputData.QA))

	for i, inputQA := range inputData.QA {
		// Store original Amharic
		flight.QA[i].QuestionAmh = inputQA.Question
		flight.QA[i].AnswerAmh = inputQA.Answer

		// Translate Question
		log.Printf("Original Question %d: %s", i, inputQA.Question)
		translatedQuestion, err := Infrastructure.TranslateText(inputQA.Question, "am_to_en")
		if err != nil {
			log.Printf("Error translating Question %d: %v", i, err)
			return nil, fmt.Errorf("failed to translate question %d: %w", i, err)
		}
		log.Printf("Translated Question %d: %s", i, translatedQuestion)
		flight.QA[i].QuestionEng = translatedQuestion

		// Translate Answer
		log.Printf("Original Answer %d: %s", i, inputQA.Answer)
		translatedAnswer, err := Infrastructure.TranslateText(inputQA.Answer, "am_to_en")
		if err != nil {
			log.Printf("Error translating Answer %d: %v", i, err)
			return nil, fmt.Errorf("failed to translate answer %d: %w", i, err)
		}
		log.Printf("Translated Answer %d: %s", i, translatedAnswer)
		flight.QA[i].AnswerEng = translatedAnswer
	}

	if inputData.Date.IsZero() {
		flight.Date = time.Now().UTC() 
	} else {
		flight.Date = inputData.Date.UTC() 
	}

	log.Printf("Flight object before saving: %+v", flight)
	err = uc.flightRepo.CreateFlight(flight)
	if err != nil {
		log.Printf("Error saving flight to repository: %v", err)
		return nil, fmt.Errorf("failed to create flight record: %w", err)
	}

	log.Printf("Flight created successfully with ID: %s", flight.ID)
	return flight, nil
}

// retrieves a flight by its ID (no changes needed)
func (uc *flightUseCase) FetchFlightByID(id string) (*domain.Flight, error) {
	return uc.flightRepo.GetFlightByID(id)
}

// removes a flight by its ID (no changes needed)
func (uc *flightUseCase) DeleteFlight(id string) error {
	return uc.flightRepo.DeleteFlight(id)
}

// retrieves all flights for a specific user (no changes needed)
func (uc *flightUseCase) FetchFlightsByUserID(userID string) ([]domain.Flight, error) {
	return uc.flightRepo.GetFlightsByUserID(userID)
}