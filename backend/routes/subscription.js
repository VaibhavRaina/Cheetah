const express = require('express');
const { body } = require('express-validator');
const User = require('../models/User');
const { authenticate } = require('../middleware/auth');
const { handleValidationErrors } = require('../middleware/validation');
const {
    createResponse,
    calculateSubscriptionEndDate,
    isSubscriptionActive
} = require('../utils/helpers');
const emailService = require('../utils/emailService');

const router = express.Router();

// Plan configurations
const PLAN_CONFIGS = {
    community: {
        id: 'community',
        name: 'Community',
        price: 0,
        messages: 50,
        features: ['basic', 'community'],
        isDefault: true
    },
    developer: {
        id: 'developer',
        name: 'Developer',
        price: 50,
        messages: 600,
        features: ['basic', 'team', 'soc2']
    },
    pro: {
        id: 'pro',
        name: 'Pro',
        price: 100,
        messages: 1500,
        features: ['basic', 'team', 'soc2', 'advanced', 'priority']
    },
    max: {
        id: 'max',
        name: 'Max',
        price: 250,
        messages: 4500,
        features: ['basic', 'team', 'soc2', 'advanced', 'priority', 'custom']
    },
    enterprise: {
        id: 'enterprise',
        name: 'Enterprise',
        price: 'custom',
        messages: -1, // unlimited
        features: ['all']
    }
};

// @route   GET /api/subscription/plans
// @desc    Get available subscription plans
// @access  Public
router.get('/plans', (req, res) => {
    try {
        const plans = Object.values(PLAN_CONFIGS).map(plan => ({
            ...plan,
            recommended: plan.id === 'pro' // Mark Pro as recommended
        }));

        res.json(
            createResponse(
                true,
                'Subscription plans retrieved successfully',
                { plans }
            )
        );
    } catch (error) {
        console.error('Get plans error:', error);
        res.status(500).json(
            createResponse(false, 'Server error retrieving plans')
        );
    }
});

// @route   GET /api/subscription/current
// @desc    Get current user subscription
// @access  Private
router.get('/current', authenticate, (req, res) => {
    try {
        const user = req.user;
        const planConfig = PLAN_CONFIGS[user.plan] || PLAN_CONFIGS.community;
        const planLimits = user.getPlanLimits();

        const subscriptionData = {
            plan: {
                id: user.plan,
                name: planConfig.name,
                price: planConfig.price,
                features: planConfig.features
            },
            usage: {
                messages: {
                    used: user.usage.messagesUsed,
                    limit: planLimits.messages === -1 ? 'unlimited' : planLimits.messages,
                    remaining: planLimits.messages === -1 ? 'unlimited' : Math.max(0, planLimits.messages - user.usage.messagesUsed),
                    resetDate: user.usage.resetDate,
                    percentage: planLimits.messages === -1 ? 0 : Math.min(100, (user.usage.messagesUsed / planLimits.messages) * 100)
                }
            },
            subscription: {
                status: user.subscription.status,
                currentPeriodStart: user.subscription.currentPeriodStart,
                currentPeriodEnd: user.subscription.currentPeriodEnd,
                cancelAtPeriodEnd: user.subscription.cancelAtPeriodEnd,
                isActive: isSubscriptionActive(user.subscription)
            },
            billing: {
                stripeCustomerId: user.subscription.stripeCustomerId,
                hasPaymentMethod: !!user.subscription.stripeCustomerId
            }
        };

        res.json(
            createResponse(
                true,
                'Current subscription retrieved successfully',
                subscriptionData
            )
        );

    } catch (error) {
        console.error('Get current subscription error:', error);
        res.status(500).json(
            createResponse(false, 'Server error retrieving subscription')
        );
    }
});

// @route   POST /api/subscription/change-plan
// @desc    Change subscription plan
// @access  Private
router.post('/change-plan', [
    body('planId')
        .isIn(['community', 'developer', 'pro', 'max', 'enterprise'])
        .withMessage('Invalid plan ID'),
    body('billingCycle')
        .optional()
        .isIn(['monthly', 'yearly'])
        .withMessage('Billing cycle must be monthly or yearly')
], handleValidationErrors, authenticate, async (req, res) => {
    try {
        const { planId, billingCycle = 'monthly' } = req.body;
        const user = req.user;

        // Check if already on this plan
        if (user.plan === planId) {
            return res.status(400).json(
                createResponse(false, 'You are already on this plan')
            );
        }

        const newPlanConfig = PLAN_CONFIGS[planId];
        const currentPlanConfig = PLAN_CONFIGS[user.plan];

        if (!newPlanConfig) {
            return res.status(400).json(
                createResponse(false, 'Invalid plan')
            );
        }

        // For enterprise plans, return contact info
        if (planId === 'enterprise') {
            return res.json(
                createResponse(
                    true,
                    'Please contact our sales team for enterprise plans',
                    {
                        contactRequired: true,
                        salesEmail: 'sales@cheetah.com',
                        salesPhone: '+1-555-0123'
                    }
                )
            );
        }

        // Handle downgrade to free plan
        if (planId === 'community') {
            user.plan = planId;
            user.subscription.status = 'active';
            user.subscription.cancelAtPeriodEnd = false;

            // Reset usage limits
            const planLimits = user.getPlanLimits();
            user.usage.messagesLimit = planLimits.messages;

            await user.save();

            return res.json(
                createResponse(
                    true,
                    'Successfully downgraded to Community plan',
                    {
                        plan: newPlanConfig,
                        effectiveImmediately: true
                    }
                )
            );
        }

        // For paid plans, this would normally integrate with Stripe
        // For now, we'll simulate the upgrade
        const now = new Date();
        const periodEnd = calculateSubscriptionEndDate(now, billingCycle);

        user.plan = planId;
        user.subscription.status = 'active';
        user.subscription.currentPeriodStart = now;
        user.subscription.currentPeriodEnd = periodEnd;
        user.subscription.cancelAtPeriodEnd = false;

        // Update usage limits
        const planLimits = user.getPlanLimits();
        user.usage.messagesLimit = planLimits.messages === -1 ? 999999 : planLimits.messages;

        await user.save();

        // Send premium purchase email
        const subscriptionDetails = {
            plan: newPlanConfig.name,
            price: newPlanConfig.price,
            billingCycle: billingCycle,
            messages: newPlanConfig.messages,
            currentPeriodStart: now,
            currentPeriodEnd: periodEnd,
            status: 'active',
            subscriptionId: user.subscription.stripeSubscriptionId || 'N/A'
        };

        const emailResult = await emailService.sendPremiumPurchaseEmail(user, subscriptionDetails);
        if (emailResult.success) {
            console.log('Premium purchase email sent successfully:', emailResult.messageId);
        } else {
            console.error('Failed to send premium purchase email:', emailResult.error);
        }

        // In a real implementation, you would:
        // 1. Create or update Stripe subscription
        // 2. Handle prorations
        // 3. Update payment method if needed

        res.json(
            createResponse(
                true,
                `Successfully upgraded to ${newPlanConfig.name} plan`,
                {
                    plan: newPlanConfig,
                    billingCycle,
                    nextBillingDate: periodEnd,
                    // In real implementation, include payment details
                    paymentRequired: newPlanConfig.price > 0
                }
            )
        );

    } catch (error) {
        console.error('Change plan error:', error);
        res.status(500).json(
            createResponse(false, 'Server error changing subscription plan')
        );
    }
});

// @route   POST /api/subscription/cancel
// @desc    Cancel subscription
// @access  Private
router.post('/cancel', [
    body('reason')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('Reason must be less than 500 characters'),
    body('feedback')
        .optional()
        .trim()
        .isLength({ max: 1000 })
        .withMessage('Feedback must be less than 1000 characters')
], handleValidationErrors, authenticate, async (req, res) => {
    try {
        const { reason, feedback } = req.body;
        const user = req.user;

        // Can't cancel community plan
        if (user.plan === 'community') {
            return res.status(400).json(
                createResponse(false, 'Cannot cancel Community plan')
            );
        }

        // Set to cancel at period end
        user.subscription.cancelAtPeriodEnd = true;

        // Log cancellation reason (in a real app, you might store this in a separate collection)
        console.log('Subscription cancelled:', {
            userId: user._id,
            plan: user.plan,
            reason,
            feedback,
            cancelDate: new Date(),
            periodEnd: user.subscription.currentPeriodEnd
        });

        await user.save();

        // Send premium cancellation email
        const cancellationDetails = {
            plan: PLAN_CONFIGS[user.plan].name,
            cancellationDate: new Date(),
            accessUntil: user.subscription.currentPeriodEnd,
            reason: reason || 'Not specified',
            refundStatus: 'No refund applicable',
            subscriptionId: user.subscription.stripeSubscriptionId || 'N/A'
        };

        const emailResult = await emailService.sendPremiumCancellationEmail(user, cancellationDetails);
        if (emailResult.success) {
            console.log('Premium cancellation email sent successfully:', emailResult.messageId);
        } else {
            console.error('Failed to send premium cancellation email:', emailResult.error);
        }

        // In a real implementation, you would:
        // 1. Update Stripe subscription to cancel at period end
        // 2. Store cancellation feedback
        // 3. Potentially offer retention incentives

        res.json(
            createResponse(
                true,
                'Subscription will be cancelled at the end of your current billing period',
                {
                    cancelAtPeriodEnd: true,
                    activeUntil: user.subscription.currentPeriodEnd,
                    canReactivate: true
                }
            )
        );

    } catch (error) {
        console.error('Cancel subscription error:', error);
        res.status(500).json(
            createResponse(false, 'Server error cancelling subscription')
        );
    }
});

// @route   POST /api/subscription/reactivate
// @desc    Reactivate cancelled subscription
// @access  Private
router.post('/reactivate', authenticate, async (req, res) => {
    try {
        const user = req.user;

        if (!user.subscription.cancelAtPeriodEnd) {
            return res.status(400).json(
                createResponse(false, 'Subscription is not scheduled for cancellation')
            );
        }

        // Check if subscription is still active
        if (!isSubscriptionActive(user.subscription)) {
            return res.status(400).json(
                createResponse(false, 'Subscription has already expired. Please start a new subscription.')
            );
        }

        // Reactivate subscription
        user.subscription.cancelAtPeriodEnd = false;
        await user.save();

        // In a real implementation, you would:
        // 1. Update Stripe subscription to continue
        // 2. Send reactivation confirmation email

        res.json(
            createResponse(
                true,
                'Subscription reactivated successfully',
                {
                    cancelAtPeriodEnd: false,
                    nextBillingDate: user.subscription.currentPeriodEnd
                }
            )
        );

    } catch (error) {
        console.error('Reactivate subscription error:', error);
        res.status(500).json(
            createResponse(false, 'Server error reactivating subscription')
        );
    }
});

// @route   GET /api/subscription/billing-history
// @desc    Get billing history
// @access  Private
router.get('/billing-history', authenticate, async (req, res) => {
    try {
        const user = req.user;

        // In a real implementation, this would fetch from Stripe or your billing database
        // For now, return mock data based on subscription info
        const mockBillingHistory = [];

        if (user.subscription.currentPeriodStart) {
            const planConfig = PLAN_CONFIGS[user.plan];

            mockBillingHistory.push({
                id: `inv_${Date.now()}`,
                date: user.subscription.currentPeriodStart,
                description: `${planConfig.name} Plan - Monthly`,
                amount: planConfig.price,
                status: 'paid',
                downloadUrl: null // In real implementation, provide PDF download
            });
        }

        res.json(
            createResponse(
                true,
                'Billing history retrieved successfully',
                {
                    invoices: mockBillingHistory,
                    hasMore: false
                }
            )
        );

    } catch (error) {
        console.error('Get billing history error:', error);
        res.status(500).json(
            createResponse(false, 'Server error retrieving billing history')
        );
    }
});

// @route   POST /api/subscription/add-payment-method
// @desc    Add payment method (Stripe integration placeholder)
// @access  Private
router.post('/add-payment-method', [
    body('paymentMethodId')
        .notEmpty()
        .withMessage('Payment method ID is required')
], handleValidationErrors, authenticate, async (req, res) => {
    try {
        const { paymentMethodId } = req.body;
        const user = req.user;

        // In a real implementation, this would:
        // 1. Attach payment method to Stripe customer
        // 2. Set as default payment method
        // 3. Update user record with Stripe customer ID

        // For now, just simulate success
        user.subscription.stripeCustomerId = `cus_${Date.now()}`;
        await user.save();

        res.json(
            createResponse(
                true,
                'Payment method added successfully',
                {
                    hasPaymentMethod: true
                }
            )
        );

    } catch (error) {
        console.error('Add payment method error:', error);
        res.status(500).json(
            createResponse(false, 'Server error adding payment method')
        );
    }
});

// @route   DELETE /api/subscription/payment-method
// @desc    Remove payment method
// @access  Private
router.delete('/payment-method', authenticate, async (req, res) => {
    try {
        const user = req.user;

        // Check if user has active paid subscription
        if (user.plan !== 'community' && user.subscription.status === 'active') {
            return res.status(400).json(
                createResponse(false, 'Cannot remove payment method while on a paid plan. Please downgrade to Community plan first.')
            );
        }

        // In a real implementation, this would:
        // 1. Detach payment method from Stripe customer
        // 2. Update user record

        user.subscription.stripeCustomerId = null;
        await user.save();

        res.json(
            createResponse(
                true,
                'Payment method removed successfully',
                {
                    hasPaymentMethod: false
                }
            )
        );

    } catch (error) {
        console.error('Remove payment method error:', error);
        res.status(500).json(
            createResponse(false, 'Server error removing payment method')
        );
    }
});

module.exports = router;
