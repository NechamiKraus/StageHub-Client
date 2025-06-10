
# Theater Management System – Client

This is the client-side web application for the Theater Management System, a platform designed to manage shows, practice sessions, and role-based user interactions in a performing arts organization.

🔗 This project communicates with the [Server-side API Repository](https://github.com/NechamiKraus/StageHub-Server) via HTTP requests. It must be run alongside the backend server.

## 📌 Project Overview

The client provides a modern and user-friendly interface for both general users and internal roles such as Directors, Coaches, Actors, and Providers.

### 🎟 Home Page (Public)
- Lists all upcoming shows pulled from the backend (/user/shows)
- Allows users to order tickets via a form that sends a request to /user/orderticket

### 👤 Personal Area
Once logged in, users are redirected to a Personal Area tailored to their role:

#### 🎬 Director
- ✅ View list of practices
- ✅ View list of coaches
- ✅ View list of actors
- ✅ View list of providers

#### 🏋️ Coach
- ✅ View assigned practices
- ✅ View subordinate coaches

#### 🎭 Actor
- ✅ View assigned practice
- ✅ View details about their coach

#### 🚚 Provider
- ✅ View the information and responsibilities relevant to their services

### 🔐 Authentication
- Each role logs in via a dedicated endpoint (e.g., /login/director, /login/actor)
- A JWT token is stored on successful login
- Token is used for authentication in subsequent API calls

## 🧱 Tech Stack
- React (with Hooks and Context for state management)
- React Router for page navigation
- Fetch / Axios for API communication
- CSS / Tailwind / Bootstrap for styling

## 🚀 Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure API base URL**
   Set your API base URL (e.g., http://localhost:3000) in a config file or .env.

3. **Run the development server**
   ```bash
   npm start
   ```
