const express = require('express');
const { body } = require('express-validator');
const User = require('../models/User');
const { authenticate } = require('../middleware/auth');
const { handleValidationErrors } = require('../middleware/validation');
const {
    createResponse,
    generateTransactionId
} = require('../utils/helpers');

const router = express.Router();

// Recharge configuration
const RECHARGE_CONFIG = {
    basePrice: 30, // $30 for 10 messages
    baseMessages: 10,
    pricePerMessage: 3, // $3 per message
    minMessages: 10,
    maxMessages: 1000
};

// @route   GET /api/recharge/config
// @desc    Get recharge configuration and pricing
// @access  Private
router.get('/config', authenticate, (req, res) => {
    try {
        const user = req.user;

        res.json(
            createResponse(
                true,
                'Recharge configuration retrieved successfully',
                {
                    pricing: {
                        basePrice: RECHARGE_CONFIG.basePrice,
                        baseMessages: RECHARGE_CONFIG.baseMessages,
                        pricePerMessage: RECHARGE_CONFIG.pricePerMessage,
                        minMessages: RECHARGE_CONFIG.minMessages,
                        maxMessages: RECHARGE_CONFIG.maxMessages
                    },
                    currentBalance: user.recharge?.balance || 0,
                    totalPurchased: user.recharge?.totalPurchased || 0,
                    lastRechargeDate: user.recharge?.lastRechargeDate || null
                }
            )
        );
    } catch (error) {
        console.error('Get recharge config error:', error);
        res.status(500).json(
            createResponse(false, 'Server error retrieving recharge configuration')
        );
    }
});

// @route   POST /api/recharge/calculate
// @desc    Calculate price for a given number of messages
// @access  Private
router.post('/calculate', [
    body('messages')
        .isInt({ min: 1, max: 1000 })
        .withMessage('Messages must be between 1 and 1000')
], handleValidationErrors, authenticate, (req, res) => {
    try {
        const { messages } = req.body;

        // Calculate price based on quantity
        let totalPrice;
        if (messages <= RECHARGE_CONFIG.baseMessages) {
            totalPrice = RECHARGE_CONFIG.basePrice;
        } else {
            // Base price for first 10 messages, then $3 per additional message
            const additionalMessages = messages - RECHARGE_CONFIG.baseMessages;
            totalPrice = RECHARGE_CONFIG.basePrice + (additionalMessages * RECHARGE_CONFIG.pricePerMessage);
        }

        res.json(
            createResponse(
                true,
                'Price calculated successfully',
                {
                    messages,
                    totalPrice,
                    pricePerMessage: totalPrice / messages,
                    savings: messages > RECHARGE_CONFIG.baseMessages ?
                        (messages * RECHARGE_CONFIG.pricePerMessage) - totalPrice : 0
                }
            )
        );
    } catch (error) {
        console.error('Calculate recharge price error:', error);
        res.status(500).json(
            createResponse(false, 'Server error calculating price')
        );
    }
});

// @route   POST /api/recharge/purchase
// @desc    Purchase message recharge
// @access  Private
router.post('/purchase', [
    body('messages')
        .isInt({ min: 10, max: 1000 })
        .withMessage('Messages must be between 10 and 1000'),
    body('paymentMethodId')
        .optional()
        .isString()
        .withMessage('Payment method ID must be a string')
], handleValidationErrors, authenticate, async (req, res) => {
    try {
        const { messages, paymentMethodId } = req.body;
        const user = req.user;

        // Calculate price
        let totalPrice;
        if (messages <= RECHARGE_CONFIG.baseMessages) {
            totalPrice = RECHARGE_CONFIG.basePrice;
        } else {
            const additionalMessages = messages - RECHARGE_CONFIG.baseMessages;
            totalPrice = RECHARGE_CONFIG.basePrice + (additionalMessages * RECHARGE_CONFIG.pricePerMessage);
        }

        // Generate transaction ID
        const transactionId = generateTransactionId('recharge');

        // In a real implementation, you would:
        // 1. Process payment with Stripe
        // 2. Handle payment failures
        // 3. Send confirmation email

        // For now, simulate successful payment
        const now = new Date();

        // Initialize recharge object if it doesn't exist
        if (!user.recharge) {
            user.recharge = {
                balance: 0,
                totalPurchased: 0,
                lastRechargeDate: null,
                rechargeHistory: []
            };
        }

        // Update user's recharge balance
        user.recharge.balance += messages;
        user.recharge.totalPurchased += messages;
        user.recharge.lastRechargeDate = now;

        // Add to recharge history
        user.recharge.rechargeHistory.push({
            amount: messages,
            price: totalPrice,
            date: now,
            transactionId: transactionId,
            status: 'completed'
        });

        // Add to general transactions
        user.transactions.push({
            id: transactionId,
            type: 'recharge',
            description: `Message recharge - ${messages} messages`,
            amount: totalPrice,
            currency: 'USD',
            date: now,
            status: 'completed',
            metadata: {
                messages: messages,
                pricePerMessage: totalPrice / messages
            }
        });

        await user.save();

        res.json(
            createResponse(
                true,
                'Recharge completed successfully',
                {
                    transactionId,
                    messages,
                    totalPrice,
                    newBalance: user.recharge.balance,
                    totalPurchased: user.recharge.totalPurchased
                }
            )
        );

    } catch (error) {
        console.error('Purchase recharge error:', error);
        res.status(500).json(
            createResponse(false, 'Server error processing recharge')
        );
    }
});

// @route   GET /api/recharge/history
// @desc    Get recharge history
// @access  Private
router.get('/history', authenticate, async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const user = await User.findById(req.user.id).select('+recharge');

        if (!user) {
            return res.status(404).json(createResponse(false, 'User not found'));
        }

        const rechargeHistory = user.recharge?.rechargeHistory || [];
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + parseInt(limit);

        const paginatedHistory = rechargeHistory
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(startIndex, endIndex);

        res.json(
            createResponse(
                true,
                'Recharge history retrieved successfully',
                {
                    history: paginatedHistory,
                    pagination: {
                        currentPage: parseInt(page),
                        totalPages: Math.ceil(rechargeHistory.length / limit),
                        totalItems: rechargeHistory.length,
                        itemsPerPage: parseInt(limit)
                    },
                    summary: {
                        currentBalance: user.recharge?.balance || 0,
                        totalPurchased: user.recharge?.totalPurchased || 0,
                        totalSpent: rechargeHistory.reduce((sum, item) => sum + item.price, 0)
                    }
                }
            )
        );

    } catch (error) {
        console.error('Get recharge history error:', error);
        res.status(500).json(
            createResponse(false, 'Server error retrieving recharge history')
        );
    }
});

// @route   GET /api/recharge/balance
// @desc    Get current recharge balance
// @access  Private
router.get('/balance', authenticate, (req, res) => {
    try {
        const user = req.user;
        const planLimits = user.getPlanLimits();

        res.json(
            createResponse(
                true,
                'Recharge balance retrieved successfully',
                {
                    rechargeBalance: user.recharge?.balance || 0,
                    planMessages: planLimits.messages,
                    messagesUsed: user.usage.messagesUsed,
                    totalAvailable: planLimits.messages === -1 ? 'unlimited' :
                        planLimits.messages + (user.recharge?.balance || 0),
                    canPurchaseMore: true
                }
            )
        );
    } catch (error) {
        console.error('Get recharge balance error:', error);
        res.status(500).json(
            createResponse(false, 'Server error retrieving recharge balance')
        );
    }
});

module.exports = router;