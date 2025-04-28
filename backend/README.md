# PassMe Backend

This repository contains the backend service for the PassMe application, written in Go. It handles user authentication, flight data management, and provides APIs for the frontend application(s). The overall goal of PassMe is to assist travelers in communicating with airport officials by providing contextual, translated answers to common questions.

**Note:** This backend focuses on user/flight data management and authentication. AI processing (transcription, response generation, TTS) appears to be handled by a separate Python service (`app.py`).

## Features

*   User Registration and Login (JWT-based Authentication)
*   Password Hashing (bcrypt)
*   User Profile Management (Get Profile, Change Username, Change Password)
*   Flight CRUD Operations (Create, Read, Delete Flights associated with a user)
*   Contextual storage of Flight Information including Q&A pairs.
*   RESTful API endpoints built with Gin.

## Technology Stack

*   **Language:** Go (Golang)
*   **Web Framework:** Gin-Gonic
*   **Database:** MongoDB (using the official Go driver)
*   **Authentication:** JSON Web Tokens (JWT) via `golang-jwt/jwt/v4`
*   **Password Hashing:** `golang.org/x/crypto/bcrypt`
*   **Configuration:** `godotenv` (for local development)
*   **Testing:** Go standard library `testing`, `testify/assert`, `testify/mock`, `testify/suite`

## Prerequisites

*   **Go:** ([https://go.dev/doc/install](https://go.dev/doc/install))
*   **MongoDB:** A running MongoDB instance (local, Docker, or cloud like MongoDB Atlas).
*   **Git:** For cloning the repository.

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/A2SV/A2SV-2025-Internship-Pass-Me.git
    ```

2.  **Install Dependencies:**
    ```bash
    go mod tidy
    ```

## Configuration

The application uses environment variables for configuration. For local development, create a `.env` file.
# For local MongoDB: mongodb://localhost:27017
# For Atlas: mongodb+srv://<username>:<password>@<cluster-address>/<db-name>?retryWrites=true&w=majority
MONGO_URI="your_mongodb_connection_string"

# Testing
This project includes unit tests for controllers, use cases, infrastructure components, and routers, as well as integration tests for repositories.
Prerequisites for Testing:
Ensure the MONGO_URI environment variable is set correctly.
Run all tests:
go test ./...
Bash
Run tests with coverage:
go test -cover ./...

# API endpoints for the PassMe backend service.

**Base URL:** `https://passme-translator.onrender.com`

---

## Authentication

Most endpoints require authentication using a JSON Web Token (JWT). Obtain a token by using the `/login` endpoint. Include the token in the `Authorization` header for protected requests:

`Authorization: Bearer <your_jwt_token>`

---

## User Endpoints

### 1. Register a New User

Registers a new user account.

*   **Endpoint:** `POST /register`
*   **Request Body:** `application/json`
    ```json
    {
      "username": "testuser",
      "email": "test@example.com",
      "password": "securepassword"
    }
    ```
*   **Success Response (201 Created):** `application/json`
    ```json
    {
      "message": "User registered successfully",
      "user": {
        "id": "507f1f77bcf86cd799439011", // Example User ID
        "username": "testuser",
        "email": "test@example.com"
      }
    }
    ```
*   **Error Responses:**
    *   `400 Bad Request`: Missing fields, invalid input, email/username already exists.

### 2. Login a User

Authenticates a user and returns a JWT token.

*   **Endpoint:** `POST /login`
*   **Request Body:** `application/json`
    ```json
    {
      "email": "test@example.com",
      "password": "securepassword"
    }
    ```
*   **Success Response (200 OK):** `application/json`
    ```json
    {
      "message": "Login successful",
      "token": "<jwt_token>",
      "user": {
        "id": "507f1f77bcf86cd799439011", // Example User ID
        "username": "testuser",
        "email": "test@example.com"
      }
    }
    ```
*   **Error Responses:**
    *   `400 Bad Request`: Missing fields, invalid input.
    *   `401 Unauthorized`: Invalid email or password.

### 3. Get Profile Details

Retrieves the profile information for the authenticated user.

*   **Endpoint:** `GET /profile/`
*   **Authentication:** Required (Bearer Token)
*   **Success Response (200 OK):** `application/json`
    ```json
    {
      "about": "This app helps users schedule flights and translate queries",
      "email": "test@gmail.com",
      "username": "test"
    }
    ```
*   **Error Responses:**
    *   `401 Unauthorized`: Missing or invalid token.
    *   `500 Internal Server Error`: Failed to fetch profile (e.g., user not found after authentication).

### 4. Change Username

Updates the username for the authenticated user.

*   **Endpoint:** `PUT /profile/username`
*   **Authentication:** Required (Bearer Token)
*   **Request Body:** `application/json`
    ```json
    {
      "new_username": "newusername"
    }
    ```
*   **Success Response (200 OK):** `application/json`
    ```json
    {
      "message": "Username updated successfully"
    }
    ```
*   **Error Responses:**
    *   `400 Bad Request`: Missing `new_username`, username already taken.
    *   `401 Unauthorized`: Missing or invalid token.

### 5. Change Password

Updates the password for the authenticated user. Requires the old password for verification.

*   **Endpoint:** `PUT /profile/password`
*   **Authentication:** Required (Bearer Token)
*   **Request Body:** `application/json`
    ```json
    {
      "old_password": "password123",
      "new_password": "newpassword123",
      "confirm_password": "newpassword123"
    }
    ```
*   **Success Response (200 OK):** `application/json`
    ```json
    {
      "message": "Password updated successfully"
    }
    ```
*   **Error Responses:**
    *   `400 Bad Request`: Missing fields, passwords don't match, incorrect old password.
    *   `401 Unauthorized`: Missing or invalid token.

---

## Flight Endpoints

### 6. Create a Flight

Creates a new flight record associated with the authenticated user.

*   **Endpoint:** `POST /flights`
*   **Authentication:** Required (Bearer Token)
*   **Request Body:** `application/json`
    ```json
    {
      "title": "ስራ", // Purpose/Title of the flight
      "from_country": "ኢትዮጵያ",
      "to_country": "እንግሊዝ",
      "date": "2025-04-22T00:00:00Z", // Optional, defaults to current time if omitted
      "language": "amharic", // Target language for translations
      "qa": [ // Exactly 5 Question/Answer pairs expected
        {"question": "ወደ የት እየተጓዙ ነው?", "answer": "እንግሊዝ"},
        {"question": "የጉብኝትዎ አላማ ምንድነው?", "answer": "ለስራ"},
        {"question": "ለምን ያህል ጊዜ መቆየት ትፈልጋላችሁ?", "answer": "ሶስት ሳምንት እቆያለሁ"},
        {"question": "የመመለሻ ቲኬት አለዎት?", "answer": "አዎን, ከእኔ ጋር ነው"},
        {"question": "ብቻዎን ነው የምትጓዙት ወይስ ከሌሎች ጋር?", "answer": "ብቻዬን ነኝ"}
      ]
    }
    ```
*   **Success Response (200 OK):** `application/json`
    ```json
    {
      "message": "Flight created successfully",
      "flight": {
        "id": "FL123", // Example Flight ID assigned by backend
        "title": "ስራ",
        "from_country": "ኢትዮጵያ",
        "to_country": "እንግሊዝ",
        "date": "2025-04-22T00:00:00Z",
        "user_id": "507f1f77bcf86cd799439011", // User ID from token
        "language": "amharic",
        "qa": [
          {"question": "ወደ የት እየተጓዙ ነው?", "answer": "እንግሊዝ"},
          // ... other QA pairs ...
          {"question": "ብቻዎን ነው የምትጓዙት ወይስ ከሌሎች ጋር?", "answer": "ብቻዬን ነኝ"}
        ]
      }
    }
    ```
*   **Error Responses:**
    *   `400 Bad Request`: Missing required fields, incorrect number of QA pairs, invalid JSON.
    *   `401 Unauthorized`: Missing or invalid token.
    *   `500 Internal Server Error`: Failed to save flight.

### 7. Get All Flights for User

Retrieves a list of all flights associated with the authenticated user.

*   **Endpoint:** `GET /flights`
*   **Authentication:** Required (Bearer Token)
*   **Success Response (200 OK):** `application/json` (Array of flight objects)
    ```json
    [
      {
        "id": "FL123",
        "title": "ስራ",
        "from_country": "ኢትዮጵያ",
        "to_country": "እንግሊዝ",
        "language": "amharic",
        "date": "2025-04-22T00:00:00Z",
        "user_id": "507f1f77bcf86cd799439011",
        "qa": [
          {"question": "ወደ የት እየተጓዙ ነው?", "answer": "እንግሊዝ"},
          // ... other QA pairs ...
        ]
      },
      // ... potentially more flight objects ...
    ]
    ```
*   **Error Responses:**
    *   `401 Unauthorized`: Missing or invalid token.
    *   `500 Internal Server Error`: Failed to retrieve flights.

### 8. Get a Flight by ID

Retrieves the details of a specific flight by its ID. The flight must belong to the authenticated user.

*   **Endpoint:** `GET /flights/{id}`
    *   Replace `{id}` with the actual Flight ID.
*   **Authentication:** Required (Bearer Token)
*   **Success Response (200 OK):** `application/json` (Single flight object)
    ```json
    {
      "id": "FL123",
      "title": "ስራ",
      "from_country": "ኢትዮጵያ",
      "to_country": "እንግሊዝ",
      "language": "amharic",
      "date": "2025-04-22T00:00:00Z",
      "user_id": "507f1f77bcf86cd799439011",
      "qa": [
        {"question": "ወደ የት እየተጓዙ ነው?", "answer": "እንግሊዝ"},
        // ... other QA pairs ...
      ]
    }
    ```
*   **Error Responses:**
    *   `401 Unauthorized`: Missing or invalid token.
    *   `403 Forbidden`: User does not own this flight.
    *   `404 Not Found`: Flight with the given ID not found.

### 9. Delete a Flight

Deletes a specific flight by its ID. The flight must belong to the authenticated user.

*   **Endpoint:** `DELETE /flights/{id}`
    *   Replace `{id}` with the actual Flight ID.
*   **Authentication:** Required (Bearer Token)
*   **Success Response (200 OK):** `application/json`
    ```json
    {
      "message": "Flight deleted successfully"
    }
    ```
*   **Error Responses:**
    *   `401 Unauthorized`: Missing or invalid token.
    *   `403 Forbidden`: User does not own this flight.
    *   `404 Not Found`: Flight with the given ID not found.
    *   `500 Internal Server Error`: Failed to delete flight.

---

## AI & Translation Endpoints

**(Note:** These appear to be handled by separate services based on the provided URLs and descriptions.)*

### 10. Chat with AI via Voice (Conceptual - Requires Separate Service)

Processes an audio recording of an officer's question against a specific flight context.

*   **Conceptual Endpoint:** `POST /chat-ai` (Handled by the Python/Flask service)
*   **Request Type:** `multipart/form-data`
*   **Form Data:**
    *   `flight_id`: (string) ID of the flight context to use.
    *   `audio`: (file) The audio file (e.g., `.m4a`, `.mp3`, `.wav`) containing the officer's question.
*   **Example Success Response:** `application/json`
    ```json
    {
        // Structure may vary based on actual Python service implementation
        "ai_reply": "1. Officer Question (English): How long are you going to stay?\n2. Answer (English): I will stay for three weeks.\n3. Officer Question (Amharic): ለምን ያህል ጊዜ መቆየት ትፈልጋላችሁ?\n4. Answer (Amharic): ሶስት ሳምንት እቆያለሁ።\n5. Pronunciation in Amharic letters: አይ ዋል ስቴይ ፎር ስሪ ዊክስ",
        "tts_audio_url": "http://<ngrok_or_public_url>/static/audio/<generated_uuid>.mp3"
    }
    ```
*   **Note:** This endpoint may require the Python service to be running and potentially exposed via Ngrok or another public URL if run locally. Deployment limitations were mentioned.

### 11. Manual Translation (Conceptual - Requires Separate Service)

Provides translation and pronunciation for manually entered text.

*   **Conceptual Endpoint:** `POST https://translator-api-3etv.onrender.com/manual-answer` (Points to a different Render service)
*   **Request Body:** `application/json`
    ```json
    {
      "input": "እባኮትን ወደ መንገድ መነሻ ቦታ እንዴት መሄድ እችላለሁ?" // Example Amharic input
    }
    ```
*   **Example Success Response:** `application/json`
    ```json
    {
      "Translation": "How can I get to the departure gate?",
      "Pronunciation": "ሃው ካን አይ ጌት ቱ ዘ ዲፓርቸር ጌት?",
      "audio": "<base64_encoded_audio_string>"
    }
    ```

---
