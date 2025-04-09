package Repositories

import (
    "context"
    "log"
    "github.com/A2SV/A2SV-2025-Internship-Pass-Me/Domain"
    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
    "go.mongodb.org/mongo-driver/bson"
)

var userCollection *mongo.Collection

func ConnectDB() {
    clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")
    client, err := mongo.Connect(context.TODO(), clientOptions)
    if err != nil {
        log.Fatal(err)
    }

    userCollection = client.Database("translator_app").Collection("users")
}

func CreateUser(user Domain.User) error {
    _, err := userCollection.InsertOne(context.TODO(), user)
    return err
}

func FindUserByEmail(email string) (Domain.User, error) {
    var user Domain.User
    err := userCollection.FindOne(context.TODO(), bson.M{"email": email}).Decode(&user)
    return user, err
}
