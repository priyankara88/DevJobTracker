
# Backend Authentication Service

## Description

This is a backend authentication service built with **NestJS** and **TypeScript**, providing user authentication and authorization functionalities. It includes endpoints for:

- User signup and sign-in
- Token refresh
- Password change
- Forgot password
- Password reset

The service uses **MongoDB** as the database, **JWT** for authentication, and **Nodemailer** for email functionalities.

## Features

- ✅ User registration (SignUp) and login (SignIn)
- 🔐 JWT-based authentication with refresh tokens
- 🔄 Password management (change, forgot, and reset password)
- 🗃️ MongoDB integration with Mongoose
- 📧 Email notifications using Nodemailer
- 🛡️ Input validation using class-validator and class-transformer
- 🚨 API security with AuthGuard

## Prerequisites

Make sure you have the following installed:

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn
- A configured email service (e.g., Gmail) for Nodemailer

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd backend
