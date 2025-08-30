# HD Notes - Full-stack Note-taking Application

A beautiful, full-stack note-taking application with OTP-based authentication and a stunning split-screen design.

## 🌟 Features

- **Beautiful UI**: Split-screen design with blue abstract background
- **Secure Authentication**: OTP-based signup/login with JWT sessions
- **Google OAuth**: Social login integration (ready to configure)
- **Notes Management**: Full CRUD operations for notes
- **Responsive Design**: Works perfectly on mobile and desktop
- **Real-time Feedback**: Toast notifications for all user actions

## 🚀 Tech Stack

### Frontend
- React 18 + TypeScript
- TailwindCSS for styling
- React Router for navigation
- React Query for state management
- Axios for API calls
- React Hot Toast for notifications

### Backend
- Node.js + Express + TypeScript
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- Rate limiting and security middleware

## 📁 Project Structure

```
project/
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── contexts/     # React contexts
│   │   ├── services/     # API services
│   │   └── ...
│   └── ...
└── backend/           # Node.js backend API
    ├── src/
    │   ├── controllers/  # Route controllers
    │   ├── models/      # Database models
    │   ├── routes/      # API routes
    │   ├── middleware/  # Custom middleware
    │   ├── services/    # Business logic services
    │   └── ...
    └── ...
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ installed
- MongoDB running locally or MongoDB Atlas account
- Git

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your configurations:
   ```env
   MONGODB_URI=mongodb://localhost:27017/hd-notes
   JWT_SECRET=your-super-secret-jwt-key-here
   FRONTEND_URL=http://localhost:3000
   PORT=5000
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

The backend will be running on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be running on `http://localhost:3000`

## 🔐 Authentication Flow

1. **Sign Up**: User enters name, date of birth, and email
2. **OTP Verification**: System sends 6-digit OTP to email (console logged in development)
3. **Account Creation**: User verifies OTP to complete registration
4. **Sign In**: Existing users can sign in with email + OTP
5. **Dashboard Access**: Authenticated users can manage their notes

## 📝 API Endpoints

### Authentication
- `POST /api/auth/signup` - Start signup process
- `POST /api/auth/verify-otp` - Verify OTP and create account
- `POST /api/auth/request-login-otp` - Request login OTP
- `POST /api/auth/login` - Login with email + OTP
- `GET /api/auth/google` - Google OAuth (placeholder)

### User
- `GET /api/user/me` - Get current user profile

### Notes
- `GET /api/notes` - Get user's notes
- `POST /api/notes` - Create new note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

## 🚀 Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Backend (Render/Heroku)
1. Push code to GitHub
2. Create new service on Render/Heroku
3. Set environment variables
4. Deploy

## 🔧 Development Notes

- OTP codes are logged to console in development mode
- MongoDB connection required for backend to start
- JWT tokens expire after 7 days
- Rate limiting: 100 requests per 15 minutes per IP
- All API responses include proper error handling

## 🎨 Design Credits

Design inspired by modern authentication flows with a focus on clean aesthetics and user experience.