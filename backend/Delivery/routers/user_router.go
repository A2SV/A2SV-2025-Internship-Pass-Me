package routers

import (
	"github.com/gin-gonic/gin"
	"github.com/A2SV/A2SV-2025-Internship-Pass-Me/delivery/controllers"
)

func SetupUserRoutes(router *gin.Engine, controller *controllers.UserController) {
	router.POST("/register", controller.Register)
	router.POST("/login", controller.Login)
}
