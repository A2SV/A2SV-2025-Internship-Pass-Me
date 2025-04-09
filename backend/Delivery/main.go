package main

import (
    "github.com/A2SV/A2SV-2025-Internship-Pass-Me/Delivery/routers"
    "github.com/A2SV/A2SV-2025-Internship-Pass-Me/Repositories"
)

func main() {
    Repositories.ConnectDB() 
    r := routers.SetupRouter()
    r.Run(":8080")
}
