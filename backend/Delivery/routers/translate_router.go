package routers

import (
    "github.com/A2SV/A2SV-2025-Internship-Pass-Me/Delivery/controllers"
    "github.com/A2SV/A2SV-2025-Internship-Pass-Me/usecases"
    "github.com/gin-gonic/gin"
)

func TranslateRouter(r *gin.Engine) {
    translateUseCase := usecases.NewTranslateUseCase()
    translateController := controllers.NewTranslateController(translateUseCase)

    r.POST("/translate", translateController.Translate)
}
