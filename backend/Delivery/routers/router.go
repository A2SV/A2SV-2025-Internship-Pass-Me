package routers

import (
    "github.com/A2SV/A2SV-2025-Internship-Pass-Me/Delivery/controllers"
    "github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
    r := gin.Default()

    r.POST("/register", controllers.Register)
    r.POST("/login", controllers.Login)

    return r
}
