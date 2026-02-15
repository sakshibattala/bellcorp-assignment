# Bellcorp Event Management Application

Bellcorp is a full-stack event management application that allows users to browse events, register for events, and manage their registrations. The project is divided into two main parts:

1. **Client**: The frontend application built using **React**, **Vite**, and **TailwindCSS**.
   - **Live URL**: [Bellcorp Client](https://bellcorp-assignment-six.vercel.app/login)
2. **Server**: The backend server built using **Node.js**, **Express.js**, and **MongoDB**.
   - **Live URL**: [Bellcorp Server](https://bellcorp-assignment.onrender.com/)

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
  - [Client Setup](#client-setup)
  - [Server Setup](#server-setup)
- [Environment Variables](#environment-variables)
- [Technologies Used](#technologies-used)
- [License](#license)

---

## Features

- **User Authentication**: Users can sign up and log in to access personalized features.
- **Event Browsing**: Users can browse events with filters like search, category, location, and date range.
- **Event Registration**: Users can register for events and view their registered events.
- **Dashboard**: Users can view their registered events, categorized into upcoming and past events.
- **Responsive Design**: Fully responsive design using TailwindCSS.
- **Protected Routes**: Certain routes are protected and require authentication to access.
- **Database Seeding**: Preloaded event data for testing and development.

---

## Project Structure

```
Bellcorp/
├── client/               # Frontend application
│   ├── .env              # Environment variables for the client
│   ├── .gitignore        # Files and directories to ignore in Git
│   ├── eslint.config.js  # ESLint configuration
│   ├── index.html        # Main HTML file
│   ├── package.json      # Project dependencies and scripts
│   ├── README.md         # Client documentation
│   ├── vite.config.js    # Vite configuration
│   ├── public/           # Static assets
│   └── src/              # Source code
│       ├── App.jsx       # Main application component
│       ├── index.css     # Global styles
│       ├── main.jsx      # Entry point for the React app
│       ├── components/   # Reusable components
│       ├── context/      # Context API for global state management
│       └── pages/        # Application pages
├── server/               # Backend server
│   ├── .env              # Environment variables for the server
│   ├── package.json      # Project dependencies and scripts
│   ├── README.md         # Server documentation
│   ├── server.js         # Main entry point for the server
│   ├── controllers/      # Contains route controllers
│   ├── middlewares/      # Middleware functions
│   ├── models/           # Mongoose models
│   ├── routes/           # API route definitions
│   ├── seed/             # Database seeding scripts
│   └── utils/            # Utility functions
└── README.md             # Root project documentation
```

---

## Setup Instructions

### Prerequisites

Make sure you have the following installed on your system:

- **Node.js** (v18 or later)
- **npm** (comes with Node.js)
- **MongoDB** (local or cloud-based, e.g., MongoDB Atlas)

### Clone the Repository

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Bellcorp
   ```

---

### Client Setup

1. Navigate to the `client` directory:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `client` directory and add the following environment variable:

   ```env
   VITE_BASE_URL=http://localhost:3000
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. The client will start on `http://localhost:5173`.

---

### Server Setup

1. Navigate to the `server` directory:

   ```bash
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

5. The server will start on `http://localhost:3000`.

---

## Environment Variables

### Client

The client requires the following environment variable to be set in the `client/.env` file:

- `VITE_BASE_URL`: The base URL of the backend server (e.g., `http://localhost:3000`).

### Server

The server requires the following environment variables to be set in the `server/.env` file:

- `PORT`: The port on which the server will run (default: `3000`).
- `MONGODB_URI`: MongoDB connection string.
- `JWT_SECRET_KEY`: Secret key for signing JSON Web Tokens (JWT).

---

## Technologies Used

### Frontend (Client)

- **React**: Frontend library for building user interfaces.
- **Vite**: Fast build tool for modern web projects.
- **React Router**: For client-side routing.
- **TailwindCSS**: Utility-first CSS framework for styling.
- **Axios**: For making HTTP requests.
- **React Toastify**: For displaying toast notifications.
- **React Loader Spinner**: For loading spinners.

### Backend (Server)

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
