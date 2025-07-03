const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const session = require('express-session');
const passport = require('./config/passport');
const { requestLogger, responseTime, errorHandler, notFound } = require('./middleware/validation');
require('dotenv').config();

const app = express();

// Request logging and timing
app.use(requestLogger);
app.use(responseTime);

// Security middleware
app.use(helmet());

// Rate limiting - DISABLED FOR TESTING
// const generalLimiter = rateLimit({
//     windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 5 * 60 * 1000, // 5 minutes
//     max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 500, // 500 requests per 5 minutes
//     message: 'Too many requests from this IP, please try again later.',
//     standardHeaders: true,
//     legacyHeaders: false,
// });

// More restrictive rate limiting for auth endpoints - DISABLED FOR TESTING
// const authLimiter = rateLimit({
//     windowMs: parseInt(process.env.AUTH_RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
//     max: parseInt(process.env.AUTH_RATE_LIMIT_MAX_ATTEMPTS) || 20, // 20 login attempts per 15 minutes
//     message: 'Too many authentication attempts from this IP, please try again later.',
//     standardHeaders: true,
//     legacyHeaders: false,
//     skipSuccessfulRequests: true, // Don't count successful requests
// });

// Apply general rate limiting to all routes - DISABLED FOR TESTING
// app.use(generalLimiter);

// CORS configuration
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-session-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cheetah')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/auth')); // authLimiter removed for testing
app.use('/api/user', require('./routes/user'));
app.use('/api/subscription', require('./routes/subscription'));
app.use('/api/dashboard', require('./routes/dashboard'));

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use(notFound);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
