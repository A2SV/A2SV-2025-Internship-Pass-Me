package usecases

import (
    "github.com/A2SV/A2SV-2025-Internship-Pass-Me/Infrastructure"
)

type TranslateUseCase interface {
    TranslateText(text, direction string) (string, error)
}

type translateUseCase struct{}

func NewTranslateUseCase() TranslateUseCase {
    return &translateUseCase{}
}

func (uc *translateUseCase) TranslateText(text, direction string) (string, error) {
    return Infrastructure.TranslateText(text, direction)
}
