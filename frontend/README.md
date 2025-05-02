# React + TypeScript + Vite

Description

This is a backend authentication service built with NestJS and TypeScript, providing user authentication and authorization functionalities. It includes endpoints for user signup, sign-in, token refresh, password change, forgot password, and password reset. The service uses MongoDB as the database, JWT for authentication, and Nodemailer for email functionalities.

Features





User registration (SignUp) and login (SignIn)



JWT-based authentication with refresh tokens



Password management (change, forgot, and reset password)



MongoDB integration with Mongoose



Email notifications using Nodemailer



Input validation using class-validator and class-transformer



API security with AuthGuard

Prerequisites

Before running the project, ensure you have the following installed:





Node.js (v18 or higher)



MongoDB (local or cloud instance)



npm or yarn



A configured email service (e.g., Gmail) for Nodemailer

Installation





Clone the repository:

git clone <repository-url>
cd backend



Install dependencies:

npm install



Set up environment variables: Create a .env file in the root directory and add the following:

MONGODB_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
JWT_REFRESH_SECRET=<your-jwt-refresh-secret>
EMAIL_USER=<your-email-address>
EMAIL_PASS=<your-email-password-or-app-password>



Start the MongoDB server (if running locally):

mongod

Scripts

The following scripts are available in package.json:





Build the project:

npm run build



Start the application (production):

npm run start:prod



Run in development mode (with watch):

npm run start:dev



Run tests:

npm run test



Run tests with coverage:

npm run test:cov



Run end-to-end tests:

npm run test:e2e



Format code (using Prettier):

npm run format



Lint code (using ESLint):

npm run lint

API Endpoints

The following endpoints are available under the /auth route:







Method



Endpoint



Description



Authentication





POST



/auth/SignUp



Register a new user



None





POST



/auth/SignIn



Log in a user



AuthGuard





POST



/auth/Refresh-token



Refresh JWT token



None





POST



/auth/change-password



Change user password



None





POST



/auth/fogot-password



Request password reset



None





PUT



/auth/reset-password



Reset user password



None




})
```
