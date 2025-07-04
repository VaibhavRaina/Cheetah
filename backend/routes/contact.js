const express = require('express');
const { body } = require('express-validator');
const { handleValidationErrors } = require('../middleware/validation');
const { createResponse } = require('../utils/helpers');
const emailService = require('../utils/emailService');

const router = express.Router();

// @route   POST /api/contact
// @desc    Handle contact/support form submissions
// @access  Public
router.post('/', [
    body('name')
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Name must be between 2 and 50 characters'),
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email address'),
    body('subject')
        .trim()
        .isLength({ min: 5, max: 100 })
        .withMessage('Subject must be between 5 and 100 characters'),
    body('message')
        .trim()
        .isLength({ min: 10, max: 2000 })
        .withMessage('Message must be between 10 and 2000 characters'),
    body('priority')
        .optional()
        .isIn(['Low', 'Normal', 'High', 'Urgent'])
        .withMessage('Priority must be one of: Low, Normal, High, Urgent'),
    body('category')
        .optional()
        .isIn(['General', 'Technical', 'Billing', 'Feature Request', 'Bug Report'])
        .withMessage('Category must be one of: General, Technical, Billing, Feature Request, Bug Report')
], handleValidationErrors, async (req, res) => {
    try {
        const { name, email, subject, message, priority, category } = req.body;

        // Prepare form data
        const formData = {
            name,
            email,
            subject,
            message,
            priority: priority || 'Normal',
            category: category || 'General'
        };

        // Send emails using Brevo
        const emailResult = await emailService.sendSupportFormSubmission(formData);

        if (emailResult.success) {
            res.json(createResponse(
                true,
                'Your support request has been submitted successfully. We will get back to you soon!',
                {
                    submittedAt: new Date().toISOString(),
                    messageId: emailResult.userMessageId
                }
            ));
        } else {
            console.error('Email sending failed:', emailResult.error);
            res.status(500).json(createResponse(
                false,
                'Your message was received but there was an issue sending the confirmation email. Our team will still review your request.'
            ));
        }

    } catch (error) {
        console.error('Contact form submission error:', error);
        res.status(500).json(createResponse(
            false,
            'There was an error processing your request. Please try again later.'
        ));
    }
});

// @route   POST /api/contact-sales
// @desc    Handle contact sales form submissions
// @access  Public
router.post('/sales', [
    body('name')
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Name must be between 2 and 50 characters'),
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email address'),
    body('company')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('Company name must be less than 100 characters'),
    body('phone')
        .optional()
        .trim()
        .matches(/^[\+]?[1-9]?[\d\s\-\(\)\.]{7,15}$/)
        .withMessage('Please provide a valid phone number'),
    body('jobTitle')
        .optional()
        .trim()
        .isLength({ max: 50 })
        .withMessage('Job title must be less than 50 characters'),
    body('companySize')
        .optional()
        .isIn(['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'])
        .withMessage('Company size must be one of: 1-10, 11-50, 51-200, 201-500, 501-1000, 1000+'),
    body('interestLevel')
        .optional()
        .isIn(['Exploring', 'Interested', 'Ready to Buy', 'Urgent'])
        .withMessage('Interest level must be one of: Exploring, Interested, Ready to Buy, Urgent'),
    body('budget')
        .optional()
        .isIn(['< $1,000', '$1,000 - $5,000', '$5,000 - $10,000', '$10,000 - $50,000', '$50,000+'])
        .withMessage('Budget must be one of: < $1,000, $1,000 - $5,000, $5,000 - $10,000, $10,000 - $50,000, $50,000+'),
    body('timeline')
        .optional()
        .isIn(['Immediate', 'Within 1 month', '1-3 months', '3-6 months', '6+ months'])
        .withMessage('Timeline must be one of: Immediate, Within 1 month, 1-3 months, 3-6 months, 6+ months'),
    body('message')
        .trim()
        .isLength({ min: 10, max: 2000 })
        .withMessage('Message must be between 10 and 2000 characters')
], handleValidationErrors, async (req, res) => {
    try {
        const {
            name,
            email,
            company,
            phone,
            jobTitle,
            companySize,
            interestLevel,
            budget,
            timeline,
            message
        } = req.body;

        // Prepare form data
        const formData = {
            name,
            email,
            company,
            phone,
            jobTitle,
            companySize,
            interestLevel,
            budget,
            timeline,
            message
        };

        // Send emails using Brevo
        const emailResult = await emailService.sendContactSalesFormSubmission(formData);

        if (emailResult.success) {
            res.json(createResponse(
                true,
                'Thank you for your interest! Our sales team will contact you within 24 hours.',
                {
                    submittedAt: new Date().toISOString(),
                    messageId: emailResult.userMessageId
                }
            ));
        } else {
            console.error('Email sending failed:', emailResult.error);
            res.status(500).json(createResponse(
                false,
                'Your inquiry was received but there was an issue sending the confirmation email. Our team will still review your request.'
            ));
        }

    } catch (error) {
        console.error('Contact sales form submission error:', error);
        res.status(500).json(createResponse(
            false,
            'There was an error processing your request. Please try again later.'
        ));
    }
});

module.exports = router;
