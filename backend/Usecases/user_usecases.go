package Usecases

import (
    "github.com/A2SV/A2SV-2025-Internship-Pass-Me/Domain"
    "github.com/A2SV/A2SV-2025-Internship-Pass-Me/Infrastructure"
    "github.com/A2SV/A2SV-2025-Internship-Pass-Me/Repositories"
)

func RegisterUser(user Domain.User) error {
    hashedPassword, err := Infrastructure.HashPassword(user.Password)
    if err != nil {
        return err
    }

    user.Password = hashedPassword
    return Repositories.CreateUser(user)
}

func LoginUser(email, password string) (string, error) {
    user, err := Repositories.FindUserByEmail(email)
    if err != nil {
        return "", err
    }

    if !Infrastructure.CheckPasswordHash(password, user.Password) {
        return "", err 
    }

    return Infrastructure.GenerateJWT(user.Email)
}
