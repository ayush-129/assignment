# Mentorship Platform

## Deployed URLs
- **Frontend**:[ [Your Deployed Frontend Link Here](#)](https://assignment-mentorship.onrender.com)
- **Backend**:[ [Your Deployed Backend Link Here](#)](https://assignment-h1j8.onrender.com)

## Overview
The Mentorship Platform connects mentors and mentees, allowing users to:
- Create profiles
- Discover mentors/mentees
- Send mentorship requests

## Technologies Used
- **Frontend**: HTML, CSS, JavaScript  
- **Backend**: Node.js, Express.js  
- **Database**: PostgreSQL (hosted on Render)  
- **Hosting**:  
  - Backend: Render  
  - Frontend: Render (Static Hosting)  

---

### Setup Instructions

To set up the Mentorship Platform, start by cloning the repository using the command `git clone <repository-url>` and navigate to the project directory with `cd <repository-name>`. For the backend setup, move to the `backend` folder using `cd backend`, then install the required dependencies with `npm install`. Create a `.env` file in the backend folder and include the following environment variables: `DATABASE_URL=<Your PostgreSQL URL>` and `PORT=5000`. Once done, start the backend server with `npm start`.

For the frontend setup, navigate to the `frontend` folder using `cd frontend`. Open the `config.js` file and update the `BACKEND_URL` variable with the URL of your deployed backend. Once both the backend and frontend are configured, you can deploy the application.

To deploy on Render, push the backend code to a GitHub repository and follow Render's deployment guide for Node.js apps. Similarly, push the frontend code to a GitHub repository and deploy it as a static site on Render. After deployment, use the deployed frontend URL to access the platform.
