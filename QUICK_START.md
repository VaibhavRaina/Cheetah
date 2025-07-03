# Quick OAuth Setup Guide

## 🚀 To get your application working immediately, follow these steps:

### Step 1: Google OAuth Setup (5 minutes)

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Create a new project** (or select existing)
3. **Enable Google+ API**:
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it
4. **Create OAuth credentials**:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Choose "Web application"
   - Add authorized redirect URI: `http://localhost:5000/api/auth/google/callback`
5. **Copy the credentials** and update your `.env` file

### Step 2: GitHub OAuth Setup (3 minutes)

1. **Go to GitHub Developer Settings**: https://github.com/settings/developers
2. **Click "New OAuth App"**
3. **Fill in the details**:
   - Application name: `Cheetah AI Dev`
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:5000/api/auth/github/callback`
4. **Register the application**
5. **Copy Client ID and generate Client Secret**

### Step 3: Update Environment Variables

Replace the test values in your `backend/.env` file:

```env
# Replace these with your actual credentials:
GOOGLE_CLIENT_ID=your-actual-google-client-id-here
GOOGLE_CLIENT_SECRET=your-actual-google-client-secret-here
GITHUB_CLIENT_ID=your-actual-github-client-id-here
GITHUB_CLIENT_SECRET=your-actual-github-client-secret-here

# Also update these for security:
JWT_SECRET=your-super-secure-jwt-secret-at-least-32-characters-long
SESSION_SECRET=your-super-secure-session-secret-at-least-32-characters-long
```

### Step 4: Restart Your Backend

```bash
cd backend
npm start
```

### Step 5: Test OAuth

1. Go to `http://localhost:3000/signup`
2. Click "Continue with Google" or "Continue with GitHub"
3. Complete the OAuth flow
4. You should be redirected to the dashboard!

---

## 🔧 Alternative: Use Traditional Email/Password (For Testing)

If you want to test without OAuth first, you can implement traditional registration:

1. Use the email field in the signup form
2. The backend already supports traditional email/password registration
3. Check the `/api/auth/register` endpoint

## 🛠️ Troubleshooting

- **"OAuth not configured"**: Update your .env with real credentials
- **"Invalid redirect URI"**: Make sure the callback URL matches exactly
- **"MongoDB connection error"**: Start MongoDB service or use MongoDB Atlas
- **Backend won't start**: Check all environment variables are set correctly

## 📞 Need Help?

The application is fully configured and ready to work once you add the OAuth credentials. The setup should take less than 10 minutes total.
