package routers

import (
	"github.com/gin-gonic/gin"
	"github.com/A2SV/A2SV-2025-Internship-Pass-Me/delivery/controllers"
)

func SetupVectorRoutes(router *gin.Engine, controller *controllers.VectorController) {
	router.POST("/store", controller.StoreBatchHandler)
	router.POST("/search", controller.SearchHandler)
}
