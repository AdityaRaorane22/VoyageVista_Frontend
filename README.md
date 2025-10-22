# VoyageVista Frontend

**VoyageVista** is a modern, interactive travel planning web application frontend built with **React.js**. It provides users with personalized itineraries, suggested trips, user profile management, and seamless integration with the VoyageVista backend API.

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Folder Structure](#folder-structure)  
- [Getting Started](#getting-started)  
- [Environment Variables](#environment-variables)  
- [Available Scripts](#available-scripts)  
- [Usage](#usage)  
- [Contributing](#contributing)  

---

## Features

- User authentication (Signup/Login)  
- Interactive Dashboard displaying itineraries and suggested trips  
- Itinerary Builder for personalized trip plans  
- Suggested Trips powered by AI integration  
- User profile management  
- Contact form for user queries  
- Responsive design for desktop and mobile  

---

## Tech Stack

- **Frontend:** React.js, Context API for state management  
- **Backend Integration:** FastAPI backend (via REST API)  
- **Styling:** CSS modules / custom CSS  
- **Environment Management:** `.env` files  

---

## Folder Structure



src
├── components
│ └── Navbar.js
├── context
│ └── UserContext.js
├── pages
│ ├── Contact_Us.js
│ ├── Dashboard.js
│ ├── Home.js
│ ├── ItineraryBuilder.js
│ ├── Login.js
│ ├── Pricing.js
│ ├── Profile.js
│ ├── Signup.js
│ └── SuggestedTrips.js
├── App.js
└── index.js
.env
.gitignore
package-lock.json
package.json


---

## Getting Started

Follow these steps to run the frontend locally:

### 1. Clone the repository

```bash
git clone https://github.com/AdityaRaorane22/VoyageVista_Frontend.git
cd VoyageVista_Frontend

2. Install dependencies
npm install

3. Create a .env file

Create a .env file in the root folder and add your backend URL:

REACT_APP_BACKEND_URL=https://voyagevista-backend.onrender.com


Make sure your backend is deployed and accessible at this URL.

4. Run the development server
npm start


The app will run at http://localhost:3000 by default.



Available Scripts

npm start – Runs the app in development mode

npm run build – Builds the app for production



Usage

Visit /signup to create a new account.

Login via /login to access your dashboard.

Build a custom itinerary using /ItineraryBuilder.

View AI-powered suggested trips on /SuggestedTrips.

Manage your profile on /Profile.

Contact support via /Contact_Us.



Contributing

Fork the repository

Create a new branch: git checkout -b feature/your-feature

Commit your changes: git commit -m "Add feature"

Push to branch: git push origin feature/your-feature

Create a Pull Request