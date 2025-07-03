# Cheetah AI - Full Stack Application

A modern full-stack application with React/Next.js frontend and Node.js/Express backend, featuring OAuth authentication, MongoDB integration, and subscription management.

## Features

### Authentication
- ✅ Google OAuth integration
- ✅ GitHub OAuth integration
- 🔄 Traditional email/password signup (coming soon)
- ✅ JWT-based authentication
- ✅ Protected routes
- ✅ User session management

### Dashboard
- ✅ User profile management
- ✅ Subscription status display
- ✅ Usage tracking
- ✅ Plan management
- ✅ Real-time user data

### Backend API
- ✅ RESTful API endpoints
- ✅ MongoDB integration with Mongoose
- ✅ Rate limiting
- ✅ Input validation
- ✅ Error handling
- ✅ CORS configuration

### Frontend
- ✅ Modern React with Next.js 15
- ✅ TypeScript throughout
- ✅ Tailwind CSS styling
- ✅ Framer Motion animations
- ✅ Radix UI components
- ✅ Responsive design

## Tech Stack

### Frontend
- **Framework**: Next.js 15 with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Animations**: Framer Motion
- **HTTP Client**: Axios
- **State Management**: React Context API

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: Passport.js with OAuth strategies
- **Security**: Helmet, CORS, bcryptjs
- **Validation**: express-validator
- **Session Management**: express-session

## Project Structure

```
cheetah/
├── backend/
│   ├── config/
│   │   └── passport.js          # OAuth strategies
│   ├── middleware/
│   │   ├── auth.js             # Authentication middleware
│   │   └── validation.js       # Request validation
│   ├── models/
│   │   └── User.js             # User model with OAuth support
│   ├── routes/
│   │   ├── auth.js             # Authentication routes
│   │   ├── dashboard.js        # Dashboard data routes
│   │   ├── subscription.js     # Subscription management
│   │   └── user.js             # User management
│   ├── utils/
│   │   └── helpers.js          # Utility functions
│   ├── server.js               # Express server setup
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── (marketing)/
│   │   │   │   └── signup/     # OAuth signup page
│   │   │   ├── auth/
│   │   │   │   └── callback/   # OAuth callback handler
│   │   │   └── dashboard/      # Protected dashboard
│   │   ├── components/
│   │   │   ├── auth/           # Authentication components
│   │   │   ├── dashboard/      # Dashboard components
│   │   │   └── ui/             # Reusable UI components
│   │   ├── contexts/
│   │   │   └── auth-context.tsx # Authentication state
│   │   ├── lib/
│   │   │   └── api.ts          # API client functions
│   │   └── types/              # TypeScript types
│   └── package.json
└── OAUTH_SETUP.md              # OAuth setup guide
```

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Google Cloud Console account
- GitHub account

### 1. Clone the Repository
```bash
git clone <repository-url>
cd cheetah
```

### 2. Set Up OAuth Applications
Follow the detailed guide in [OAUTH_SETUP.md](./OAUTH_SETUP.md) to create:
- Google OAuth application
- GitHub OAuth application

### 3. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/cheetah
JWT_SECRET=your-jwt-secret
SESSION_SECRET=your-session-secret
FRONTEND_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

Start the backend:
```bash
npm run dev
```

### 4. Frontend Setup
```bash
cd frontend
npm install --legacy-peer-deps
```

Create `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start the frontend:
```bash
npm run dev
```

### 5. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- Signup: http://localhost:3000/signup

## API Endpoints

### Authentication
- `GET /api/auth/google` - Initiate Google OAuth
- `GET /api/auth/github` - Initiate GitHub OAuth
- `GET /api/auth/google/callback` - Google OAuth callback
- `GET /api/auth/github/callback` - GitHub OAuth callback
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### Dashboard
- `GET /api/dashboard/overview` - Get dashboard overview
- `GET /api/dashboard/stats` - Get usage statistics
- `GET /api/dashboard/activity` - Get recent activity

### User Management
- `PUT /api/user/profile` - Update user profile
- `PUT /api/user/preferences` - Update preferences
- `DELETE /api/user/account` - Delete account

### Subscriptions
- `GET /api/subscription/plans` - Get available plans
- `GET /api/subscription/current` - Get current subscription
- `POST /api/subscription/create-checkout` - Create checkout session

## Authentication Flow

1. User clicks "Continue with Google/GitHub" on signup page
2. User is redirected to OAuth provider
3. After authorization, user is redirected to backend callback
4. Backend creates/updates user in database
5. Backend generates JWT token and redirects to frontend
6. Frontend stores token and redirects to dashboard
7. Protected routes verify JWT token via auth context

## Database Schema

### User Model
```javascript
{
  name: String,
  email: String,
  password: String (optional for OAuth users),
  googleId: String (optional),
  githubId: String (optional),
  avatar: String,
  plan: String (community, developer, pro, max, enterprise),
  subscription: {
    status: String,
    currentPeriodEnd: Date,
    cancelAtPeriodEnd: Boolean
  },
  usage: {
    messagesUsed: Number,
    messagesLimit: Number,
    resetDate: Date
  },
  preferences: {
    emailNotifications: Boolean,
    marketingEmails: Boolean,
    theme: String
  },
  isEmailVerified: Boolean,
  lastLogin: Date
}
```

## Features in Development

- [ ] Traditional email/password authentication
- [ ] Email verification system
- [ ] Password reset functionality
- [ ] Stripe payment integration
- [ ] Team collaboration features
- [ ] API usage analytics
- [ ] User settings page
- [ ] Admin dashboard

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Security

- All passwords are hashed with bcrypt
- JWT tokens expire after 7 days
- Rate limiting on all API endpoints
- Input validation and sanitization
- CORS protection
- Helmet security headers

## Deployment

### Backend Deployment
- Set production environment variables
- Use HTTPS for OAuth callbacks
- Configure MongoDB Atlas for production
- Set up proper logging and monitoring

### Frontend Deployment
- Update API URL for production
- Configure OAuth redirect URLs for production domain
- Enable HTTPS

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Check the [OAuth Setup Guide](./OAUTH_SETUP.md)
- Review API documentation
- Submit issues on GitHub
