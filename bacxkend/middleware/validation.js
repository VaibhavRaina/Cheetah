const { validationResult } = require('express-validator');

// Validation error handler middleware
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const extractedErrors = errors.array().map(err => ({
            field: err.path || err.param,
            message: err.msg,
            value: err.value
        }));

        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: extractedErrors
        });
    }

    next();
};

// Custom error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error('Error:', {
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
        url: req.url,
        method: req.method,
        ip: req.ip,
        userAgent: req.get('User-Agent')
    });

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map(error => ({
            field: error.path,
            message: error.message
        }));

        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors
        });
    }

    // Mongoose duplicate key error
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        const value = err.keyValue[field];

        return res.status(400).json({
            success: false,
            message: `${field} '${value}' already exists`
        });
    }

    // Mongoose CastError (invalid ObjectId)
    if (err.name === 'CastError') {
        return res.status(400).json({
            success: false,
            message: 'Invalid ID format'
        });
    }

    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            success: false,
            message: 'Invalid token'
        });
    }

    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            success: false,
            message: 'Token expired'
        });
    }

    // Default error
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';

    res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

// Not found middleware
const notFound = (req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`
    });
};

// Request logging middleware
const requestLogger = (req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
        console.log(`${new Date().toISOString()} - ${req.method} ${req.url} - IP: ${req.ip}`);
    }
    next();
};

// Response time middleware
const responseTime = (req, res, next) => {
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;
        if (process.env.NODE_ENV === 'development') {
            console.log(`${req.method} ${req.url} - ${res.statusCode} - ${duration}ms`);
        }
    });

    next();
};

module.exports = {
    handleValidationErrors,
    errorHandler,
    notFound,
    requestLogger,
    responseTime
};
