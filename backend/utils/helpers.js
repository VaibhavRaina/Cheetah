const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Generate JWT token
const generateToken = (payload, expiresIn = process.env.JWT_EXPIRE || '30d') => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

// Generate random token for email verification, password reset, etc.
const generateRandomToken = (length = 32) => {
    return crypto.randomBytes(length).toString('hex');
};

// Create hash for tokens
const createHash = (token) => {
    return crypto.createHash('sha256').update(token).digest('hex');
};

// Generate secure password
const generateSecurePassword = (length = 12) => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
};

// Validate password strength
const validatePasswordStrength = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?]/.test(password);

    const errors = [];

    if (password.length < minLength) {
        errors.push(`Password must be at least ${minLength} characters long`);
    }

    if (!hasUpperCase) {
        errors.push('Password must contain at least one uppercase letter');
    }

    if (!hasLowerCase) {
        errors.push('Password must contain at least one lowercase letter');
    }

    if (!hasNumbers) {
        errors.push('Password must contain at least one number');
    }

    if (!hasSpecialChar) {
        errors.push('Password must contain at least one special character');
    }

    return {
        isValid: errors.length === 0,
        errors,
        strength: calculatePasswordStrength(password)
    };
};

// Calculate password strength score
const calculatePasswordStrength = (password) => {
    let score = 0;

    // Length
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (password.length >= 16) score += 1;

    // Character types
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    // Patterns
    if (!/(.)\1{2,}/.test(password)) score += 1; // No repeated characters
    if (!/123|abc|qwe/i.test(password)) score += 1; // No common sequences

    if (score < 3) return 'weak';
    if (score < 6) return 'medium';
    if (score < 8) return 'strong';
    return 'very_strong';
};

// Format user data for response (remove sensitive fields)
const formatUserResponse = (user) => {
    const userObj = user.toObject ? user.toObject() : user;

    // Remove sensitive fields
    delete userObj.password;
    delete userObj.emailVerificationToken;
    delete userObj.emailVerificationExpires;
    delete userObj.passwordResetToken;
    delete userObj.passwordResetExpires;
    delete userObj.loginAttempts;
    delete userObj.lockUntil;

    return userObj;
};

// Generate email verification URL
const generateEmailVerificationUrl = (token) => {
    const baseUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    return `${baseUrl}/verify-email?token=${token}`;
};

// Generate password reset URL
const generatePasswordResetUrl = (token) => {
    const baseUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    return `${baseUrl}/reset-password?token=${token}`;
};

// Sanitize user input
const sanitizeInput = (input) => {
    if (typeof input !== 'string') return input;

    return input
        .trim()
        .replace(/[<>]/g, '') // Remove potential HTML tags
        .substring(0, 1000); // Limit length
};

// Generate API response format
const createResponse = (success, message, data = null, meta = null) => {
    const response = {
        success,
        message,
        timestamp: new Date().toISOString()
    };

    if (data !== null) {
        response.data = data;
    }

    if (meta !== null) {
        response.meta = meta;
    }

    return response;
};

// Pagination helper
const paginate = (page = 1, limit = 10) => {
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    const skip = (pageNum - 1) * limitNum;

    return {
        skip,
        limit: limitNum,
        page: pageNum
    };
};

// Generate pagination metadata
const generatePaginationMeta = (total, page, limit) => {
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return {
        total,
        page,
        limit,
        totalPages,
        hasNextPage,
        hasPrevPage,
        nextPage: hasNextPage ? page + 1 : null,
        prevPage: hasPrevPage ? page - 1 : null
    };
};

// Email validation
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Phone number validation (basic)
const isValidPhone = (phone) => {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
};

// URL validation
const isValidUrl = (url) => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

// Generate unique filename
const generateUniqueFilename = (originalName) => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2);
    const extension = originalName.split('.').pop();
    return `${timestamp}_${random}.${extension}`;
};

// Calculate subscription end date
const calculateSubscriptionEndDate = (startDate, billingCycle = 'monthly') => {
    const start = new Date(startDate);

    if (billingCycle === 'monthly') {
        return new Date(start.getFullYear(), start.getMonth() + 1, start.getDate());
    } else if (billingCycle === 'yearly') {
        return new Date(start.getFullYear() + 1, start.getMonth(), start.getDate());
    }

    return start;
};

// Check if subscription is active
const isSubscriptionActive = (subscription) => {
    if (!subscription) return false;

    const now = new Date();
    const endDate = new Date(subscription.currentPeriodEnd);

    return subscription.status === 'active' && endDate > now;
};

// Calculate usage statistics for different periods
const calculateUsageStats = (usageHistory, period = 'daily') => {
    const now = new Date();
    let startDate;

    switch (period) {
        case 'weekly':
            startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            break;
        case 'monthly':
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            break;
        default: // daily
            startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    const filteredUsage = usageHistory.filter(usage =>
        new Date(usage.date) >= startDate
    );

    const totalMessages = filteredUsage.reduce((sum, day) => sum + day.messages, 0);
    const averagePerDay = filteredUsage.length > 0 ? totalMessages / filteredUsage.length : 0;
    const peakUsage = Math.max(...filteredUsage.map(day => day.messages), 0);

    return {
        period,
        totalMessages,
        averagePerDay: Math.round(averagePerDay),
        peakUsage,
        data: filteredUsage
    };
};

// Generate invoice data structure
const generateInvoiceData = (user, amount, items = []) => {
    const invoiceId = `INV-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    return {
        id: invoiceId,
        date: new Date(),
        amount,
        status: 'pending',
        customer: {
            name: user.name,
            email: user.email,
            id: user._id
        },
        items,
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        currency: 'USD'
    };
};

// Create and save invoice to user account
const createInvoice = (user, amount, description = '', items = []) => {
    const invoiceId = `INV-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const invoice = {
        id: invoiceId,
        date: new Date(),
        amount,
        status: 'pending',
        description,
        items,
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        currency: 'USD'
    };

    return invoice;
};

const PDFDocument = require('pdfkit');

// Generate PDF invoice
const generateInvoicePDF = async (invoice, user) => {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument({ margin: 50 });
            const buffers = [];

            doc.on('data', buffers.push.bind(buffers));
            doc.on('end', () => {
                const pdfBuffer = Buffer.concat(buffers);
                resolve(pdfBuffer);
            });

            // Header
            doc.fontSize(20).text('INVOICE', 50, 50);
            doc.fontSize(10).text('Cheetah AI Platform', 50, 80);

            // Invoice details
            doc.fontSize(12).text(`Invoice ID: ${invoice.id}`, 50, 120);
            doc.text(`Date: ${new Date(invoice.date).toLocaleDateString()}`, 50, 140);
            doc.text(`Status: ${invoice.status.toUpperCase()}`, 50, 160);

            // Customer details
            doc.text('Bill To:', 50, 200);
            doc.text(`${user.name}`, 50, 220);
            doc.text(`${user.email}`, 50, 240);

            // Invoice items
            doc.text('Description', 50, 300);
            doc.text('Amount', 400, 300);
            doc.moveTo(50, 320).lineTo(550, 320).stroke();

            let yPosition = 340;
            if (invoice.items && invoice.items.length > 0) {
                invoice.items.forEach(item => {
                    doc.text(item.description, 50, yPosition);
                    doc.text(`$${item.amount.toFixed(2)}`, 400, yPosition);
                    yPosition += 20;
                });
            } else {
                doc.text(invoice.description || 'Plan subscription', 50, yPosition);
                doc.text(`$${invoice.amount.toFixed(2)}`, 400, yPosition);
                yPosition += 20;
            }

            // Total
            doc.moveTo(50, yPosition + 10).lineTo(550, yPosition + 10).stroke();
            doc.fontSize(14).text('Total:', 300, yPosition + 30);
            doc.text(`$${invoice.amount.toFixed(2)}`, 400, yPosition + 30);

            // Footer
            doc.fontSize(8).text('Thank you for your business!', 50, yPosition + 80);
            doc.text('For questions about this invoice, please contact support@cheetahai.co', 50, yPosition + 100);

            doc.end();
        } catch (error) {
            reject(error);
        }
    });
};

// Generate transaction ID
const generateTransactionId = (type = 'txn') => {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    return `${type}_${timestamp}_${random}`;
};

// Create transaction record
const createTransaction = (type, description, amount, fromPlan = null, toPlan = null, metadata = {}) => {
    return {
        id: generateTransactionId(type),
        type,
        description,
        amount,
        currency: 'USD',
        fromPlan,
        toPlan,
        date: new Date(),
        status: 'completed',
        billingCycle: 'monthly',
        metadata
    };
};

module.exports = {
    generateToken,
    generateRandomToken,
    createHash,
    generateSecurePassword,
    validatePasswordStrength,
    calculatePasswordStrength,
    formatUserResponse,
    generateEmailVerificationUrl,
    generatePasswordResetUrl,
    sanitizeInput,
    createResponse,
    paginate,
    generatePaginationMeta,
    isValidEmail,
    isValidPhone,
    isValidUrl,
    generateUniqueFilename,
    calculateSubscriptionEndDate,
    isSubscriptionActive,
    calculateUsageStats,
    generateInvoiceData,
    createInvoice,
    generateInvoicePDF,
    generateTransactionId,
    createTransaction
};
