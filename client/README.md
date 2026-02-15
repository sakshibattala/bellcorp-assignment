# Bellcorp Client

This is the frontend client for the Bellcorp Event Management application. It is built using **React**, **Vite**, and **TailwindCSS**. The client provides a user-friendly interface for users to browse events, register for events, and manage their registrations.

---

## Table of Contents

- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Features](#features)
- [Pages](#pages)
- [Components](#components)
- [Technologies Used](#technologies-used)

---

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone <repository-url>
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

   Replace `http://localhost:3000` with the base URL of your backend server if it's hosted elsewhere.

4. Start the development server:

   ```bash
   npm run dev
   ```

5. The client will start on `http://localhost:5173` (or the port specified by Vite).

---

## Environment Variables

The client requires the following environment variable to be set in the `.env` file:

- `VITE_BASE_URL`: The base URL of the backend server (e.g., `http://localhost:3000`).

---

## Project Structure

```
client/
├── .env                  # Environment variables
├── .gitignore            # Files and directories to ignore in Git
├── eslint.config.js      # ESLint configuration
├── index.html            # Main HTML file
├── package.json          # Project dependencies and scripts
├── README.md             # Project documentation
├── vite.config.js        # Vite configuration
├── public/               # Static assets
└── src/                  # Source code
    ├── App.jsx           # Main application component
    ├── index.css         # Global styles
    ├── main.jsx          # Entry point for the React app
    ├── components/       # Reusable components
    │   ├── EventCard.jsx
    │   ├── EventDetails.jsx
    │   ├── Loader.jsx
    │   ├── Navbar.jsx
    │   ├── ProtectedRoute.jsx
    │   └── RegisteredEventDetails.jsx
    ├── context/          # Context API for global state management
    │   └── AuthContext.jsx
    ├── pages/            # Application pages
        ├── Dashboard.jsx
        ├── Home.jsx
        ├── Login.jsx
        └── Signup.jsx
```

---

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in development mode. Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

---

## Features

- **User Authentication**: Users can sign up and log in to access personalized features.
- **Event Browsing**: Users can browse events with filters like search, category, location, and date range.
- **Event Registration**: Users can register for events and view their registered events.
- **Dashboard**: Users can view their registered events, categorized into upcoming and past events.
- **Responsive Design**: Fully responsive design using TailwindCSS.
- **Protected Routes**: Certain routes are protected and require authentication to access.

---

## Pages

### 1. **Login**

- **Path**: `/login`
- **Description**: Allows users to log in to their accounts.
- **Features**:
  - Email and password input fields.
  - Redirects to the events page upon successful login.

### 2. **Signup**

- **Path**: `/signup`
- **Description**: Allows users to create a new account.
- **Features**:
  - Name, email, and password input fields.
  - Redirects to the events page upon successful signup.

### 3. **Events (Home)**

- **Path**: `/events`
- **Description**: Displays a list of events with filters and search functionality.
- **Features**:
  - Filter events by category, location, and date range.
  - Search events by name.
  - View event details and register for events.

### 4. **Dashboard**

- **Path**: `/dashboard`
- **Description**: Displays the user's registered events.
- **Features**:
  - Categorizes events into upcoming and past events.
  - Allows users to cancel their registrations.

---

## Components

### 1. **Navbar**

- Displays navigation links for the app.
- Provides login, signup, and logout functionality.
- Includes a responsive mobile menu.

### 2. **EventCard**

- Displays a single event's details such as name, location, date, and capacity.
- Allows users to view event details or see if they are already registered.

### 3. **EventDetails**

- Displays detailed information about a selected event.
- Allows users to register for the event if seats are available.

### 4. **Loader**

- Displays a loading spinner while data is being fetched.

### 5. **ProtectedRoute**

- Protects routes that require authentication.
- Redirects unauthenticated users to the login page.

### 6. **RegisteredEventDetails**

- Displays details of a registered event.
- Allows users to cancel their registration.

---

## Technologies Used

- **React**: Frontend library for building user interfaces.
- **Vite**: Fast build tool for modern web projects.
- **React Router**: For client-side routing.
- **TailwindCSS**: Utility-first CSS framework for styling.
- **Axios**: For making HTTP requests.
- **React Toastify**: For displaying toast notifications.
- **React Loader Spinner**: For loading spinners.

---

## License

This project is licensed under the ISC License.
