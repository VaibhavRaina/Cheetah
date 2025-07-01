const express = require('express');
const { body } = require('express-validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const User = require('../models/User');
const { authenticate, optionalAuth } = require('../middleware/auth');
const { handleValidationErrors } = require('../middleware/validation');
const {
  generateToken,
  generateRandomToken,
  createHash,
  validatePasswordStrength,
  formatUserResponse,
  generateEmailVerificationUrl,
  generatePasswordResetUrl,
  createResponse,
  sanitizeInput
} = require('../utils/helpers');

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .custom((password) => {
      const validation = validatePasswordStrength(password);
      if (!validation.isValid) {
        throw new Error(validation.errors.join(', '));
      }
      return true;
    })
], handleValidationErrors, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Sanitize input
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email.toLowerCase());

    // Check if user already exists
    const existingUser = await User.findOne({ email: sanitizedEmail });
    if (existingUser) {
      return res.status(400).json(
        createResponse(false, 'User with this email already exists')
      );
    }

    // Generate email verification token
    const emailVerificationToken = generateRandomToken();
    const hashedEmailToken = createHash(emailVerificationToken);

    // Create user
    const user = new User({
      name: sanitizedName,
      email: sanitizedEmail,
      password,
      emailVerificationToken: hashedEmailToken,
      emailVerificationExpires: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
    });

    await user.save();

    // Generate JWT token
    const token = generateToken({ id: user._id });

    // Generate verification URL
    const verificationUrl = generateEmailVerificationUrl(emailVerificationToken);

    // TODO: Send verification email using Brevo
    // For now, we'll log it (you can implement email sending later)
    console.log('Email verification URL:', verificationUrl);

    // Format user response
    const userResponse = formatUserResponse(user);

    res.status(201).json(
      createResponse(
        true,
        'User registered successfully. Please check your email to verify your account.',
        {
          user: userResponse,
          token,
          verificationUrl: process.env.NODE_ENV === 'development' ? verificationUrl : undefined
        }
      )
    );

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json(
      createResponse(false, 'Server error during registration')
    );
  }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
], handleValidationErrors, async (req, res) => {
  try {
    const { email, password } = req.body;
    const sanitizedEmail = sanitizeInput(email.toLowerCase());

    // Find user and include password
    const user = await User.findOne({ email: sanitizedEmail }).select('+password');
    
    if (!user) {
      return res.status(401).json(
        createResponse(false, 'Invalid email or password')
      );
    }

    // Check if account is locked
    if (user.isLocked) {
      return res.status(423).json(
        createResponse(false, 'Account is temporarily locked due to too many failed login attempts. Please try again later.')
      );
    }

    // Check if account is active
    if (!user.isActive) {
      return res.status(401).json(
        createResponse(false, 'Account has been deactivated. Please contact support.')
      );
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    
    if (!isPasswordValid) {
      // Increment login attempts
      await user.incLoginAttempts();
      
      return res.status(401).json(
        createResponse(false, 'Invalid email or password')
      );
    }

    // Reset login attempts on successful login
    if (user.loginAttempts && user.loginAttempts > 0) {
      await user.resetLoginAttempts();
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const token = generateToken({ id: user._id });

    // Format user response
    const userResponse = formatUserResponse(user);

    res.json(
      createResponse(
        true,
        'Login successful',
        {
          user: userResponse,
          token
        }
      )
    );

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json(
      createResponse(false, 'Server error during login')
    );
  }
});

// @route   POST /api/auth/verify-email
// @desc    Verify user email
// @access  Public
router.post('/verify-email', [
  body('token')
    .notEmpty()
    .withMessage('Verification token is required')
], handleValidationErrors, async (req, res) => {
  try {
    const { token } = req.body;
    
    // Hash the token to compare with database
    const hashedToken = createHash(token);

    // Find user with matching token and check expiration
    const user = await User.findOne({
      emailVerificationToken: hashedToken,
      emailVerificationExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json(
        createResponse(false, 'Invalid or expired verification token')
      );
    }

    // Update user
    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    // Generate new JWT token
    const newToken = generateToken({ id: user._id });

    // Format user response
    const userResponse = formatUserResponse(user);

    res.json(
      createResponse(
        true,
        'Email verified successfully',
        {
          user: userResponse,
          token: newToken
        }
      )
    );

  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json(
      createResponse(false, 'Server error during email verification')
    );
  }
});

// @route   POST /api/auth/forgot-password
// @desc    Send password reset email
// @access  Public
router.post('/forgot-password', [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email')
], handleValidationErrors, async (req, res) => {
  try {
    const { email } = req.body;
    const sanitizedEmail = sanitizeInput(email.toLowerCase());

    const user = await User.findOne({ email: sanitizedEmail });
    
    if (!user) {
      // Don't reveal if user exists or not for security
      return res.json(
        createResponse(true, 'If an account with that email exists, a password reset link has been sent.')
      );
    }

    // Generate reset token
    const resetToken = generateRandomToken();
    const hashedResetToken = createHash(resetToken);

    // Set reset token and expiration (1 hour)
    user.passwordResetToken = hashedResetToken;
    user.passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000);
    await user.save();

    // Generate reset URL
    const resetUrl = generatePasswordResetUrl(resetToken);

    // TODO: Send password reset email using Brevo
    console.log('Password reset URL:', resetUrl);

    res.json(
      createResponse(
        true,
        'If an account with that email exists, a password reset link has been sent.',
        {
          resetUrl: process.env.NODE_ENV === 'development' ? resetUrl : undefined
        }
      )
    );

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json(
      createResponse(false, 'Server error processing password reset request')
    );
  }
});

// @route   POST /api/auth/reset-password
// @desc    Reset password
// @access  Public
router.post('/reset-password', [
  body('token')
    .notEmpty()
    .withMessage('Reset token is required'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .custom((password) => {
      const validation = validatePasswordStrength(password);
      if (!validation.isValid) {
        throw new Error(validation.errors.join(', '));
      }
      return true;
    })
], handleValidationErrors, async (req, res) => {
  try {
    const { token, password } = req.body;
    
    // Hash the token to compare with database
    const hashedToken = createHash(token);

    // Find user with matching token and check expiration
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    }).select('+password');

    if (!user) {
      return res.status(400).json(
        createResponse(false, 'Invalid or expired reset token')
      );
    }

    // Update password
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    
    // Reset login attempts
    user.loginAttempts = 0;
    user.lockUntil = undefined;
    
    await user.save();

    // Generate new JWT token
    const newToken = generateToken({ id: user._id });

    // Format user response
    const userResponse = formatUserResponse(user);

    res.json(
      createResponse(
        true,
        'Password reset successfully',
        {
          user: userResponse,
          token: newToken
        }
      )
    );

  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json(
      createResponse(false, 'Server error during password reset')
    );
  }
});

// @route   POST /api/auth/resend-verification
// @desc    Resend email verification
// @access  Private
router.post('/resend-verification', authenticate, async (req, res) => {
  try {
    const user = req.user;

    if (user.isEmailVerified) {
      return res.status(400).json(
        createResponse(false, 'Email is already verified')
      );
    }

    // Generate new verification token
    const emailVerificationToken = generateRandomToken();
    const hashedEmailToken = createHash(emailVerificationToken);

    // Update user
    user.emailVerificationToken = hashedEmailToken;
    user.emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await user.save();

    // Generate verification URL
    const verificationUrl = generateEmailVerificationUrl(emailVerificationToken);

    // TODO: Send verification email using Brevo
    console.log('New email verification URL:', verificationUrl);

    res.json(
      createResponse(
        true,
        'Verification email sent successfully',
        {
          verificationUrl: process.env.NODE_ENV === 'development' ? verificationUrl : undefined
        }
      )
    );

  } catch (error) {
    console.error('Resend verification error:', error);
    res.status(500).json(
      createResponse(false, 'Server error sending verification email')
    );
  }
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', authenticate, (req, res) => {
  try {
    const userResponse = formatUserResponse(req.user);
    
    res.json(
      createResponse(
        true,
        'User data retrieved successfully',
        { user: userResponse }
      )
    );
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json(
      createResponse(false, 'Server error retrieving user data')
    );
  }
});

// @route   POST /api/auth/logout
// @desc    Logout user (if using token blacklisting, implement here)
// @access  Private
router.post('/logout', authenticate, (req, res) => {
  try {
    // If implementing token blacklisting, add token to blacklist here
    // For now, just return success (client should remove token)
    
    res.json(
      createResponse(true, 'Logged out successfully')
    );
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json(
      createResponse(false, 'Server error during logout')
    );
  }
});

// @route   POST /api/auth/change-password
// @desc    Change user password
// @access  Private
router.post('/change-password', [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 8 })
    .withMessage('New password must be at least 8 characters long')
    .custom((password) => {
      const validation = validatePasswordStrength(password);
      if (!validation.isValid) {
        throw new Error(validation.errors.join(', '));
      }
      return true;
    })
], handleValidationErrors, authenticate, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    // Get user with password
    const user = await User.findById(req.user._id).select('+password');
    
    // Verify current password
    const isCurrentPasswordValid = await user.comparePassword(currentPassword);
    
    if (!isCurrentPasswordValid) {
      return res.status(400).json(
        createResponse(false, 'Current password is incorrect')
      );
    }

    // Check if new password is different from current
    const isSamePassword = await user.comparePassword(newPassword);
    if (isSamePassword) {
      return res.status(400).json(
        createResponse(false, 'New password must be different from current password')
      );
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json(
      createResponse(true, 'Password changed successfully')
    );

  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json(
      createResponse(false, 'Server error changing password')
    );
  }
});

module.exports = router;
