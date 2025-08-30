# Task Manager - Backend

This repository contains the backend for a Task Manager application, developed in TypeScript. It includes key functionalities such as user management, authentication, email sending, and more. The project utilizes popular dependencies to ensure a robust and scalable solution.

## Features
- **Authentication and Authorization** using JSON Web Tokens (JWT).
- **Password encryption** with bcrypt.
- **Data validation** using express-validator.
- **Task management** with CRUD operations (Create, Read, Update, Delete).
- **Email sending** using nodemailer.
- **CORS handling** for external access control.
- **HTTP request logging** with Morgan.
- **MongoDB connection** via Mongoose.

## Prerequisites
- Node.js (v14 or higher).
- npm or yarn as a package manager.

## Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/alfonso-ramos/UpTask-backend
   ```
2. Navigate to the project directory:
   ```bash
   cd UpTask-backend
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
   or if you use yarn:
   ```bash
   yarn install
   ```

## Configuration
Create a `.env` file in the root of the project with the following environment variables:
```env
DATABASE_URL=Your MongoDB URL
FRONTEND_URL=Your Frontend URL # Example: http://localhost:5173

# Variables for your mailsender connection
SMTP_HOST=mailsender host
SMTP_PORT=mailsender port
SMTP_USER=mailsender user
SMTP_PASS=mailsender password

JWT_SECRET=JSON Web Token Secret.
```

## Usage
### Development
Run the server in development mode:
```bash
npm run dev
```

### Production
1. Compile the TypeScript code to JavaScript:
   ```bash
   npm run build
   ```
2. Start the server:
   ```bash
   npm start
   ```

## Available Scripts
- `npm run build`: Compiles TypeScript to JavaScript.
- `npm start`: Starts the server in production mode.
- `npm run dev`: Starts the server in development mode using nodemon.
- `npm run dev:api`: Starts the server in development mode for the API using nodemon.

## Dependencies
- **bcrypt**: For password encryption.
- **cors**: For CORS configuration.
- **express**: Server framework.
- **express-validator**: For input data validation.
- **jsonwebtoken**: For handling JWTs.
- **morgan**: For HTTP request logging.
- **nodemailer**: For sending emails.
- **dotenv**: For managing environment variables.
- **mongoose**: For connecting to and managing MongoDB.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

