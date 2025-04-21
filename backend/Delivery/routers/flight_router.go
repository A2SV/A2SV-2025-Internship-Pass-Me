package routers

import (
	"github.com/gin-gonic/gin"
	"github.com/A2SV/A2SV-2025-Internship-Pass-Me/Delivery/controllers"
	 "github.com/A2SV/A2SV-2025-Internship-Pass-Me/Infrastructure"
)

func SetupFlightRoutes(router *gin.Engine, controller *controllers.FlightController) {
	flights := router.Group("/flights")
	flights.Use(Infrastructure.AuthMiddleware())
	{
		flights.POST("", controller.CreateFlight)

		flights.GET("", controller.GetUserFlights)

		flights.GET("/:id", controller.GetFlightByID)

		flights.DELETE("/:id", controller.DeleteFlight)
	}
}
