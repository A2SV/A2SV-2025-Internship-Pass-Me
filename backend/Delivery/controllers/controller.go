package controllers

import (
    "net/http"
    "github.com/A2SV/A2SV-2025-Internship-Pass-Me/Domain"
    "github.com/A2SV/A2SV-2025-Internship-Pass-Me/Infrastructure"
    "github.com/A2SV/A2SV-2025-Internship-Pass-Me/Repositories"
    "github.com/gin-gonic/gin"
)

func Register(c *gin.Context) {
    var user Domain.User
    if err := c.BindJSON(&user); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
        return
    }

    if user.Email == "" || user.Password == "" || user.Username == "" {
        c.JSON(http.StatusBadRequest, gin.H{"error": "All fields (username, email, password) are required"})
        return
    }

    hashedPassword, err := Infrastructure.HashPassword(user.Password)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Error hashing password"})
        return
    }

    user.Password = hashedPassword

    err = Repositories.CreateUser(user)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "User creation failed"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Registration successful"})
}


func Login(c *gin.Context) {
    var loginData struct {
        Email    string `json:"email"`
        Password string `json:"password"`
    }

    if err := c.BindJSON(&loginData); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
        return
    }

    if loginData.Email == "" || loginData.Password == "" {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Email and password are required"})
        return
    }

    user, err := Repositories.FindUserByEmail(loginData.Email)
    if err != nil || !Infrastructure.CheckPasswordHash(loginData.Password, user.Password) {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
        return
    }

    token, err := Infrastructure.GenerateJWT(user.Email)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"token": token})
}
