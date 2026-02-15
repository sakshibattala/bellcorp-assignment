# Bellcorp Server

This is the backend server for the Bellcorp Event Management application. It is built using **Node.js**, **Express.js**, and **MongoDB**. The server provides APIs for user authentication, event management, and event registration.

---

## Table of Contents

- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Event Management](#event-management)
  - [Event Registration](#event-registration)
- [Middleware](#middleware)
- [Seeding the Database](#seeding-the-database)
- [Technologies Used](#technologies-used)

---

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `server` directory and add the following environment variables:
   ```env
   PORT=3000
   MONGODB_URI=<your_mongodb_connection_string>
   JWT_SECRET_KEY=<your_jwt_secret_key>
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. The server will start on `http://localhost:3000` (or the port specified in the `.env` file).

---

## Environment Variables

The server requires the following environment variables to be set in the `.env` file:

- `PORT`: The port on which the server will run (default: `3000`).
- `MONGODB_URI`: MongoDB connection string.
- `JWT_SECRET_KEY`: Secret key for signing JSON Web Tokens (JWT).

---

## Project Structure

```
server/
├── .env                  # Environment variables
├── package.json          # Project dependencies and scripts
├── server.js             # Main entry point for the server
├── controllers/          # Contains route controllers
│   ├── auth.controller.js
│   ├── event.controller.js
│   └── registration.controller.js
├── middlewares/          # Middleware functions
│   └── auth.js
├── models/               # Mongoose models
│   ├── event.model.js
│   ├── registration.model.js
│   └── user.model.js
├── routes/               # API route definitions
│   ├── auth.route.js
│   ├── event.route.js
│   └── registration.route.js
├── seed/                 # Database seeding scripts
│   ├── seed.js
│   └── events.js
└── utils/                # Utility functions
    ├── db.js
    ├── env.js
    └── helper.js
```

---

## API Endpoints

### Base URL

```
http://localhost:3000/
```

### Authentication

#### 1. **Signup**
- **Endpoint**: `/api/auth/signup`
- **Method**: `POST`
- **Description**: Registers a new user.
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  - **Success (201)**:
    ```json
    {
      "message": "Signup successful",
      "token": "<JWT_TOKEN>"
    }
    ```
  - **Error (400)**: Missing fields, invalid email format, or user already exists.
  - **Error (500)**: Internal server error.

#### 2. **Login**
- **Endpoint**: `/api/auth/login`
- **Method**: `POST`
- **Description**: Logs in an existing user.
- **Request Body**:
  ```json
  {
    "email": "johndoe@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  - **Success (200)**:
    ```json
    {
      "message": "Login success",
      "token": "<JWT_TOKEN>",
      "user": {
        "_id": "<USER_ID>",
        "name": "John Doe",
        "email": "johndoe@example.com",
        "createdAt": "<DATE>",
        "updatedAt": "<DATE>"
      }
    }
    ```
  - **Error (400)**: Missing fields, invalid credentials, or user doesn't exist.
  - **Error (500)**: Internal server error.

---

### Event Management

#### 1. **Get All Events**
- **Endpoint**: `/api/events`
- **Method**: `GET`
- **Description**: Fetches all events with optional filters.
- **Query Parameters**:
  - `search` (optional): Search by event name.
  - `category` (optional): Filter by category.
  - `location` (optional): Filter by location.
  - `startDate` (optional): Filter events starting from this date.
  - `endDate` (optional): Filter events ending before this date.
  - `page` (optional): Page number for pagination (default: `1`).
  - `limit` (optional): Number of events per page (default: `6`).
- **Response**:
  - **Success (200)**:
    ```json
    {
      "events": [
        {
          "_id": "<EVENT_ID>",
          "name": "Event Name",
          "organizer": "Organizer Name",
          "location": "Location",
          "date": "2026-03-15T00:00:00.000Z",
          "description": "Event Description",
          "capacity": 150,
          "category": "Technology",
          "createdAt": "<DATE>",
          "updatedAt": "<DATE>"
        }
      ],
      "totalPages": 5,
      "currentPage": 1
    }
    ```
  - **Error (500)**: Internal server error.

#### 2. **Get Event by ID**
- **Endpoint**: `/api/events/:id`
- **Method**: `POST`
- **Description**: Fetches details of a specific event by its ID.
- **Response**:
  - **Success (200)**:
    ```json
    {
      "event": {
        "_id": "<EVENT_ID>",
        "name": "Event Name",
        "organizer": "Organizer Name",
        "location": "Location",
        "date": "2026-03-15T00:00:00.000Z",
        "description": "Event Description",
        "capacity": 150,
        "category": "Technology",
        "createdAt": "<DATE>",
        "updatedAt": "<DATE>"
      }
    }
    ```
  - **Error (400)**: Event not found.
  - **Error (500)**: Internal server error.

---

### Event Registration

#### 1. **Register for an Event**
- **Endpoint**: `/api/registrations/:eventId`
- **Method**: `POST`
- **Description**: Registers the authenticated user for a specific event.
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <JWT_TOKEN>"
  }
  ```
- **Response**:
  - **Success (201)**:
    ```json
    {
      "message": "Registered successfully"
    }
    ```
  - **Error (400)**: Event not found, event is full, or already registered.
  - **Error (500)**: Internal server error.

#### 2. **Cancel Registration**
- **Endpoint**: `/api/registrations/:eventId`
- **Method**: `DELETE`
- **Description**: Cancels the authenticated user's registration for a specific event.
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <JWT_TOKEN>"
  }
  ```
- **Response**:
  - **Success (200)**:
    ```json
    {
      "message": "Event registration cancelled"
    }
    ```
  - **Error (400)**: Registration not found.
  - **Error (500)**: Internal server error.

#### 3. **Get User Registrations**
- **Endpoint**: `/api/registrations/me`
- **Method**: `GET`
- **Description**: Fetches all events the authenticated user has registered for.
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <JWT_TOKEN>"
  }
  ```
- **Response**:
  - **Success (200)**:
    ```json
    {
      "registrations": [
        {
          "_id": "<REGISTRATION_ID>",
          "userId": "<USER_ID>",
          "eventId": {
            "_id": "<EVENT_ID>",
            "name": "Event Name",
            "location": "Location",
            "date": "2026-03-15T00:00:00.000Z",
            "description": "Event Description",
            "capacity": 150,
            "category": "Technology"
          },
          "createdAt": "<DATE>",
          "updatedAt": "<DATE>"
        }
      ]
    }
    ```
  - **Error (500)**: Internal server error.

---

## Middleware

### **authMiddleware**
- **File**: [middlewares/auth.js](middlewares/auth.js)
- **Description**: Middleware to authenticate users using a JWT token.
- **How it works**:
  1. Extracts the `Authorization` header from the request.
  2. Verifies the JWT token using the secret key.
  3. Fetches the user from the database using the `userId` in the token.
  4. Attaches the user object to `req.user` for further use in the route handler.
- **Error Responses**:
  - **401**: Not authorized (missing or invalid token).
  - **401**: User not found.

---

## Seeding the Database

To seed the database with initial event data, run the following command:

```bash
node seed/seed.js
```

This will populate the database with sample events from the `seed/events.js` file.

---

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for building APIs.
- **MongoDB**: NoSQL database for storing application data.
- **Mongoose**: ODM for MongoDB.
- **JWT**: For authentication and authorization.
- **bcryptjs**: For password hashing.
- **dotenv**: For environment variable management.

---

## License

This project is licensed under the ISC License.