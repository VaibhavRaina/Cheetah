# OAuth Setup Guide

This guide will help you set up Google and GitHub OAuth for the Cheetah application.

## Prerequisites

1. Google Cloud Console account
2. GitHub account
3. Backend server running on localhost:5000
4. Frontend server running on localhost:3000

## Google OAuth Setup

### 1. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API

### 2. Configure OAuth Consent Screen

1. Navigate to "APIs & Services" > "OAuth consent screen"
2. Choose "External" user type
3. Fill in the required information:
   - App name: "Cheetah AI"
   - User support email: your email
   - Developer contact information: your email
4. Add scopes: `userinfo.email`, `userinfo.profile`
5. Add test users if needed

### 3. Create OAuth Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Application type: "Web application"
4. Name: "Cheetah Web Client"
5. Authorized redirect URIs:
   - `http://localhost:5000/api/auth/google/callback`
6. Save and copy the Client ID and Client Secret

## GitHub OAuth Setup

### 1. Create GitHub OAuth App

1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Click "New OAuth App"
3. Fill in the details:
   - Application name: "Cheetah AI"
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:5000/api/auth/github/callback`
4. Click "Register application"
5. Copy the Client ID and generate a Client Secret

## Environment Configuration

### Backend (.env)

Create a `.env` file in the backend directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/cheetah

# JWT
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# Session
SESSION_SECRET=your-session-secret-here

# Frontend URL
FRONTEND_URL=http://localhost:3000

# OAuth - Google
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here

# OAuth - GitHub
GITHUB_CLIENT_ID=your-github-client-id-here
GITHUB_CLIENT_SECRET=your-github-client-secret-here

# Environment
NODE_ENV=development
PORT=5000

# Security
BCRYPT_SALT_ROUNDS=12
```

### Frontend (.env.local)

Create a `.env.local` file in the frontend directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Running the Application

1. Start MongoDB (if using local instance)
2. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```
3. Start the frontend server:
   ```bash
   cd frontend
   npm run dev
   ```

## Testing OAuth

1. Navigate to `http://localhost:3000/signup`
2. Click "Continue with Google" or "Continue with GitHub"
3. Complete the OAuth flow
4. You should be redirected to the dashboard

## Troubleshooting

### Common Issues

1. **Redirect URI mismatch**: Ensure the callback URLs in your OAuth apps match exactly
2. **CORS errors**: Make sure FRONTEND_URL is set correctly in backend .env
3. **Session issues**: Verify SESSION_SECRET is set in backend .env
4. **MongoDB connection**: Check if MongoDB is running and connection string is correct

### Debug Tips

1. Check browser console for errors
2. Check backend server logs
3. Verify OAuth app settings in Google/GitHub
4. Test API endpoints directly using tools like Postman

## Security Notes

- Never commit .env files to version control
- Use strong, unique secrets for JWT_SECRET and SESSION_SECRET
- In production, use HTTPS URLs for all OAuth callbacks
- Regularly rotate OAuth secrets
- Consider using environment-specific OAuth apps for staging/production
