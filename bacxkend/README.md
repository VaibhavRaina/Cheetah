# Cheetah Backend API

A robust Node.js/Express backend with MongoDB for the Cheetah AI application, featuring comprehensive authentication, authorization, and subscription management.

## Features

- **Authentication & Authorization**
  - JWT-based authentication
  - Email verification
  - Password reset functionality
  - Account lockout protection
  - Role-based access control

- **User Management**
  - User profiles and preferences
  - Usage tracking and limits
  - Admin dashboard for user management

- **Subscription System**
  - Multiple plan tiers (Community, Developer, Pro, Max, Enterprise)
  - Usage-based billing
  - Plan upgrades/downgrades
  - Cancellation and reactivation

- **Security**
  - Helmet for security headers
  - Rate limiting
  - Input validation and sanitization
  - Password strength requirements
  - Account lockout after failed attempts

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - Database with Mongoose ODM
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **express-rate-limit** - Rate limiting
- **helmet** - Security headers
- **cors** - Cross-origin resource sharing

## Project Structure

```
bacxkend/
├── middleware/
│   ├── auth.js          # Authentication middleware
│   └── validation.js    # Validation & error handling
├── models/
│   └── User.js          # User data model
├── routes/
│   ├── auth.js          # Authentication routes
│   ├── user.js          # User management routes
│   ├── subscription.js  # Subscription routes
│   └── dashboard.js     # Dashboard routes
├── utils/
│   └── helpers.js       # Utility functions
├── .env                 # Environment variables
├── .gitignore          # Git ignore rules
├── package.json        # Dependencies
└── server.js           # Main server file
```

## Installation

1. **Clone the repository**
   ```bash
   cd bacxkend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Copy `.env` and update the values:
   ```bash
   cp .env .env.local
   ```
   
   Update the following variables in `.env`:
   ```env
   MONGODB_URI=mongodb://localhost:27017/cheetah
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   FRONTEND_URL=http://localhost:3000
   BREVO_API_KEY=your-brevo-api-key
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system.

5. **Run the server**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/register` | Register new user | Public |
| POST | `/login` | User login | Public |
| POST | `/verify-email` | Verify email address | Public |
| POST | `/forgot-password` | Request password reset | Public |
| POST | `/reset-password` | Reset password | Public |
| POST | `/resend-verification` | Resend verification email | Private |
| GET | `/me` | Get current user | Private |
| POST | `/logout` | User logout | Private |
| POST | `/change-password` | Change password | Private |

### User Routes (`/api/user`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/profile` | Get user profile | Private |
| PUT | `/profile` | Update user profile | Private |
| GET | `/usage` | Get usage statistics | Private |
| POST | `/increment-message-usage` | Increment message count | Private |
| DELETE | `/account` | Delete account | Private |
| GET | `/admin/users` | Get all users | Admin |
| GET | `/admin/users/:id` | Get user by ID | Admin |
| PUT | `/admin/users/:id` | Update user | Admin |
| GET | `/admin/stats` | Get user statistics | Admin |

### Subscription Routes (`/api/subscription`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/plans` | Get available plans | Public |
| GET | `/current` | Get current subscription | Private |
| POST | `/change-plan` | Change subscription plan | Private |
| POST | `/cancel` | Cancel subscription | Private |
| POST | `/reactivate` | Reactivate subscription | Private |
| GET | `/billing-history` | Get billing history | Private |
| POST | `/add-payment-method` | Add payment method | Private |
| DELETE | `/payment-method` | Remove payment method | Private |

### Dashboard Routes (`/api/dashboard`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/overview` | Get dashboard overview | Private |
| GET | `/stats` | Get detailed statistics | Private |
| GET | `/notifications` | Get notifications | Private |
| PUT | `/notifications/:id/read` | Mark notification as read | Private |
| GET | `/activity` | Get activity log | Private |

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Error Handling

All API responses follow a consistent format:

```json
{
  "success": true/false,
  "message": "Description of the result",
  "data": {}, // Response data (if applicable)
  "meta": {}, // Metadata like pagination (if applicable)
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Validation

Input validation is implemented using `express-validator`. All user inputs are sanitized and validated before processing.

## Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **Rate Limiting**: Prevents brute force attacks
- **Account Lockout**: Temporary lockout after failed login attempts
- **JWT Expiration**: Tokens expire after 30 days by default
- **Input Sanitization**: All inputs are sanitized
- **Security Headers**: Helmet middleware for security headers
- **CORS Configuration**: Properly configured CORS policy

## Usage Limits

Different plans have different usage limits:

- **Community**: 50 messages/month
- **Developer**: 600 messages/month
- **Pro**: 1,500 messages/month
- **Max**: 4,500 messages/month
- **Enterprise**: Unlimited

## Development

### Running Tests
```bash
npm test
```

### Code Formatting
The project follows standard JavaScript conventions.

### Environment Variables

Required environment variables:

- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT signing
- `FRONTEND_URL` - Frontend application URL
- `BREVO_API_KEY` - Brevo email service API key (optional)
- `NODE_ENV` - Environment (development/production)

## Deployment

For production deployment:

1. Set `NODE_ENV=production`
2. Use a strong `JWT_SECRET`
3. Configure proper CORS origins
4. Set up MongoDB with authentication
5. Configure rate limiting based on your needs
6. Set up SSL/TLS certificates
7. Use process managers like PM2

## Contributing

1. Follow the existing code structure
2. Add proper error handling
3. Include input validation
4. Update documentation
5. Test all endpoints

## Future Enhancements

- [ ] Integration with Stripe for payments
- [ ] Email service integration with Brevo
- [ ] File upload functionality
- [ ] Real-time notifications with WebSockets
- [ ] Advanced analytics and reporting
- [ ] API rate limiting per user plan
- [ ] Audit logging
- [ ] Two-factor authentication

## License

This project is licensed under the MIT License.
