# Financial Task Management System

A full-stack web application for managing financial tasks with user authentication and task creation features.

## 🚀 Features

- **User Authentication**: Secure login with JWT tokens
- **Task Management**: Create and manage financial tasks
- **Modern UI**: Responsive React frontend with beautiful design
- **RESTful API**: Node.js/Express backend with MongoDB
- **Docker Support**: Containerized deployment ready

## 📁 Project Structure

```
Project_Software_Deployment/
├── backend/                 # Node.js/Express API server
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── models/          # Database schemas
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   └── __tests__/       # Unit tests
│   ├── Dockerfile           # Docker configuration
│   └── package.json
├── frontend/                # React frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   └── pages/          # Page components
│   └── package.json
└── README.md
```

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Jest** - Testing framework

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **CSS3** - Styling

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account
- Git

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```
   Server will run on `http://localhost:3000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   Frontend will run on `http://localhost:3001`

## 🔐 Authentication

### Test Credentials
- **Email**: `user@example.com`
- **Password**: `password`

### API Endpoints

#### Authentication
- `POST /api/auth/login` - User login

#### Tasks
- `POST /api/tasks` - Create new task
- `GET /api/test` - Test API connection

## 🧪 Testing

Run backend tests:
```bash
cd backend
npm test
```

## 🐳 Docker Deployment

Build and run with Docker:
```bash
cd backend
docker build -t financial-app .
docker run -p 3000:3000 financial-app
```

## 📝 API Documentation

### Login Request
```json
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password"
}
```

### Login Response
```json
{
  "success": true,
  "token": "jwt-token-here",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "Test User"
  }
}
```

### Create Task Request
```json
POST /api/tasks
{
  "title": "Buy groceries",
  "description": "Weekly grocery shopping",
  "amount": 150.00,
  "category": "Food",
  "type": "expense"
}
```

## 🎨 Frontend Features

- **Responsive Design**: Works on desktop and mobile
- **Modern UI**: Clean and intuitive interface
- **Form Validation**: Client-side validation
- **Error Handling**: User-friendly error messages
- **Loading States**: Visual feedback during API calls

## 🔧 Development

### Backend Development
- MVC architecture
- Middleware for CORS and logging
- Error handling middleware
- Unit tests with Jest

### Frontend Development
- Component-based architecture
- State management with React hooks
- CSS modules for styling
- Hot reload with Vite

## 📦 Dependencies

### Backend Dependencies
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `jsonwebtoken` - JWT authentication
- `bcryptjs` - Password hashing
- `cors` - Cross-origin resource sharing
- `helmet` - Security middleware
- `morgan` - HTTP request logger

### Frontend Dependencies
- `react` - UI library
- `vite` - Build tool
- `react-dom` - DOM rendering

## 🚀 Deployment

The application is ready for deployment with:
- Docker containerization
- Environment variable support
- Production-ready configuration
- MongoDB Atlas integration

## 👥 Team

This project was developed as part of a software deployment course, implementing modern web development practices and deployment strategies.

## 📄 License

This project is for educational purposes.
