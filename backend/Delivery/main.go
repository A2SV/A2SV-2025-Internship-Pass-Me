package main

import (
	"context"
	"log"
	"os"

	"github.com/A2SV/A2SV-2025-Internship-Pass-Me/Delivery/controllers"
	"github.com/A2SV/A2SV-2025-Internship-Pass-Me/Delivery/routers"
	repositories "github.com/A2SV/A2SV-2025-Internship-Pass-Me/repositories"
	usecases "github.com/A2SV/A2SV-2025-Internship-Pass-Me/usecases"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	// Load environment variables from .env file
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}

	// Get MongoDB URI from the environment variables
	mongoURI := os.Getenv("MONGO_URI")
	if mongoURI == "" {
		log.Fatal("MONGO_URI is not set in the .env file")
	}

	// Connect to MongoDB
	client, err := mongo.Connect(context.Background(), options.Client().ApplyURI(mongoURI))
	if err != nil {
		log.Fatal(err)
	}
	defer client.Disconnect(context.Background())

	// Select the database
	db := client.Database("passme")

	flightRepo := repositories.NewFlightRepository(db)
	userRepo := repositories.NewUserRepository(db)

	flightUC := usecases.NewFlightUseCase(flightRepo)
	userUC := usecases.NewUserUseCase(userRepo)

	flightController := controllers.NewFlightController(flightUC)
	userController := controllers.NewUserController(userUC)

	// Set up the Gin router
	r := gin.Default()

	routers.SetupUserRoutes(r, userController)
	routers.SetupFlightRoutes(r, flightController)

	log.Println("Server is running at :8080")
	if err := r.Run(":8080"); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
