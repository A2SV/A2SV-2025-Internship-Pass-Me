package controllers

import (
    "net/http"

    "github.com/A2SV/A2SV-2025-Internship-Pass-Me/usecases"
    "github.com/gin-gonic/gin"
)

type TranslateController struct {
    translateUseCase usecases.TranslateUseCase
}

func NewTranslateController(uc usecases.TranslateUseCase) *TranslateController {
    return &TranslateController{
        translateUseCase: uc,
    }
}

type TranslateRequest struct {
    Text     string `json:"text"`
    Direction string `json:"direction"`
}

func (tc *TranslateController) Translate(c *gin.Context) {
    var req TranslateRequest
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    translatedText, err := tc.translateUseCase.TranslateText(req.Text, req.Direction)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"translated_text": translatedText})
}
