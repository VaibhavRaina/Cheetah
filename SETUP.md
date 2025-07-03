# Cheetah AI - Setup Guide

## OAuth Setup Instructions

### 1. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Choose "Web application"
6. Add authorized redirect URIs:
   - `http://localhost:5000/api/auth/google/callback` (for development)
   - `https://yourdomain.com/api/auth/google/callback` (for production)
7. Copy the Client ID and Client Secret

### 2. GitHub OAuth Setup

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in the details:
   - Application name: `Cheetah AI`
   - Homepage URL: `http://localhost:3000` (for development)
   - Authorization callback URL: `http://localhost:5000/api/auth/github/callback`
4. Click "Register application"
5. Copy the Client ID and generate a Client Secret

### 3. Environment Variables Setup

Update your backend `.env` file with the OAuth credentials:

```env
# OAuth - Google
GOOGLE_CLIENT_ID=your-actual-google-client-id
GOOGLE_CLIENT_SECRET=your-actual-google-client-secret

# OAuth - GitHub
GITHUB_CLIENT_ID=your-actual-github-client-id
GITHUB_CLIENT_SECRET=your-actual-github-client-secret

# Make sure to also update these important secrets:
JWT_SECRET=your-super-secure-jwt-secret-at-least-32-characters-long
SESSION_SECRET=your-super-secure-session-secret-at-least-32-characters-long
```

## Quick Start (Development Mode)

### Prerequisites
- Node.js (v18 or later)
- MongoDB (running locally or MongoDB Atlas)
- Git

### 1. Start MongoDB
```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas connection string in .env
```

### 2. Start Backend
```bash
cd backend
npm install
npm run dev
```

### 3. Start Frontend
```bash
cd frontend
npm install
npm run dev
```

### 4. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Health Check: http://localhost:5000/api/health

## Testing OAuth (Development)

1. Go to http://localhost:3000/signup
2. Click "Continue with Google" or "Continue with GitHub"
3. Complete OAuth flow
4. You'll be redirected to the dashboard

## Important Security Notes

- Never commit real OAuth credentials to version control
- Use strong, unique secrets for JWT_SECRET and SESSION_SECRET
- In production, use HTTPS for all OAuth callbacks
- Consider using environment-specific .env files

## Troubleshooting

### Backend won't start
- Check that all required environment variables are set
- Verify MongoDB is running and accessible
- Check OAuth credentials are valid

### OAuth not working
- Verify callback URLs match exactly (including http/https)
- Check OAuth app is active in Google/GitHub
- Ensure credentials are correctly set in .env

### Database connection issues
- Check MongoDB connection string
- Verify database permissions
- Check network connectivity

## Production Deployment

1. Update environment variables for production
2. Use HTTPS for all URLs
3. Update OAuth app settings with production URLs
4. Set NODE_ENV=production
5. Use a production-ready session store (Redis recommended)
