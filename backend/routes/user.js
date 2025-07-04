const express = require('express');
const { body } = require('express-validator');
const User = require('../models/User');
const { authenticate, authorize } = require('../middleware/auth');
const { handleValidationErrors } = require('../middleware/validation');
const {
    formatUserResponse,
    createResponse,
    sanitizeInput,
    paginate,
    generatePaginationMeta
} = require('../utils/helpers');
const emailService = require('../utils/emailService');

const router = express.Router();

// @route   GET /api/user/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', authenticate, (req, res) => {
    try {
        const userResponse = formatUserResponse(req.user);

        res.json(
            createResponse(
                true,
                'Profile retrieved successfully',
                { user: userResponse }
            )
        );
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json(
            createResponse(false, 'Server error retrieving profile')
        );
    }
});

// @route   PUT /api/user/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', [
    body('name')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Name must be between 2 and 50 characters')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('Name can only contain letters and spaces'),
    body('avatar')
        .optional()
        .isURL()
        .withMessage('Avatar must be a valid URL'),
    body('preferences.emailNotifications')
        .optional()
        .isBoolean()
        .withMessage('Email notifications preference must be a boolean'),
    body('preferences.marketingEmails')
        .optional()
        .isBoolean()
        .withMessage('Marketing emails preference must be a boolean'),
    body('preferences.theme')
        .optional()
        .isIn(['light', 'dark', 'system'])
        .withMessage('Theme must be light, dark, or system')
], handleValidationErrors, authenticate, async (req, res) => {
    try {
        const { name, avatar, preferences } = req.body;
        const user = req.user;

        // Update fields if provided
        if (name) {
            user.name = sanitizeInput(name);
        }

        if (avatar) {
            user.avatar = sanitizeInput(avatar);
        }

        if (preferences) {
            if (preferences.emailNotifications !== undefined) {
                user.preferences.emailNotifications = preferences.emailNotifications;
            }
            if (preferences.marketingEmails !== undefined) {
                user.preferences.marketingEmails = preferences.marketingEmails;
            }
            if (preferences.theme !== undefined) {
                user.preferences.theme = preferences.theme;
            }
        }

        await user.save();

        const userResponse = formatUserResponse(user);

        res.json(
            createResponse(
                true,
                'Profile updated successfully',
                { user: userResponse }
            )
        );

    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json(
            createResponse(false, 'Server error updating profile')
        );
    }
});

// @route   GET /api/user/usage
// @desc    Get user usage statistics
// @access  Private
router.get('/usage', authenticate, (req, res) => {
    try {
        const user = req.user;
        const planLimits = user.getPlanLimits();

        const usageData = {
            plan: user.plan,
            messages: {
                used: user.usage.messagesUsed,
                limit: planLimits.messages === -1 ? 'unlimited' : planLimits.messages,
                remaining: planLimits.messages === -1 ? 'unlimited' : Math.max(0, planLimits.messages - user.usage.messagesUsed),
                resetDate: user.usage.resetDate,
                percentage: planLimits.messages === -1 ? 0 : Math.min(100, (user.usage.messagesUsed / planLimits.messages) * 100)
            },
            features: planLimits.features,
            subscription: {
                status: user.subscription.status,
                currentPeriodStart: user.subscription.currentPeriodStart,
                currentPeriodEnd: user.subscription.currentPeriodEnd,
                cancelAtPeriodEnd: user.subscription.cancelAtPeriodEnd
            }
        };

        res.json(
            createResponse(
                true,
                'Usage data retrieved successfully',
                usageData
            )
        );

    } catch (error) {
        console.error('Get usage error:', error);
        res.status(500).json(
            createResponse(false, 'Server error retrieving usage data')
        );
    }
});

// @route   POST /api/user/increment-message-usage
// @desc    Increment user message usage
// @access  Private
router.post('/increment-message-usage', authenticate, async (req, res) => {
    try {
        const user = req.user;

        // Check if user has messages remaining
        if (!user.hasMessagesRemaining()) {
            const limits = user.getPlanLimits();
            return res.status(429).json(
                createResponse(
                    false,
                    'Message limit exceeded for your current plan',
                    {
                        usage: {
                            used: user.usage.messagesUsed,
                            limit: limits.messages,
                            resetDate: user.usage.resetDate
                        },
                        upgradeRequired: true
                    }
                )
            );
        }

        // Increment usage
        await user.incrementMessageUsage();

        const planLimits = user.getPlanLimits();
        const usageData = {
            used: user.usage.messagesUsed,
            limit: planLimits.messages === -1 ? 'unlimited' : planLimits.messages,
            remaining: planLimits.messages === -1 ? 'unlimited' : Math.max(0, planLimits.messages - user.usage.messagesUsed),
            resetDate: user.usage.resetDate
        };

        res.json(
            createResponse(
                true,
                'Message usage incremented successfully',
                usageData
            )
        );

    } catch (error) {
        console.error('Increment usage error:', error);
        res.status(500).json(
            createResponse(false, 'Server error incrementing usage')
        );
    }
});

// @route   DELETE /api/user/account
// @desc    Delete user account
// @access  Private
router.delete('/account', [
    body('password')
        .notEmpty()
        .withMessage('Password is required to delete account'),
    body('confirmation')
        .equals('DELETE')
        .withMessage('Please type DELETE to confirm account deletion')
], handleValidationErrors, authenticate, async (req, res) => {
    try {
        const { password } = req.body;

        // Get user with password
        const user = await User.findById(req.user._id).select('+password');

        // Verify password
        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            return res.status(400).json(
                createResponse(false, 'Incorrect password')
            );
        }

        // Instead of deleting, deactivate the account
        user.isActive = false;
        user.email = `deleted_${Date.now()}_${user.email}`;
        await user.save();

        res.json(
            createResponse(true, 'Account deleted successfully')
        );

    } catch (error) {
        console.error('Delete account error:', error);
        res.status(500).json(
            createResponse(false, 'Server error deleting account')
        );
    }
});

// Admin routes

// @route   GET /api/user/admin/users
// @desc    Get all users (admin only)
// @access  Private/Admin
router.get('/admin/users', authenticate, authorize('admin'), async (req, res) => {
    try {
        const { page = 1, limit = 10, search, plan, status } = req.query;
        const { skip, limit: limitNum, page: pageNum } = paginate(page, limit);

        // Build query
        const query = {};

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }

        if (plan) {
            query.plan = plan;
        }

        if (status) {
            query.isActive = status === 'active';
        }

        // Get users
        const users = await User.find(query)
            .select('-password -emailVerificationToken -passwordResetToken')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNum);

        const total = await User.countDocuments(query);
        const paginationMeta = generatePaginationMeta(total, pageNum, limitNum);

        res.json(
            createResponse(
                true,
                'Users retrieved successfully',
                users,
                paginationMeta
            )
        );

    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json(
            createResponse(false, 'Server error retrieving users')
        );
    }
});

// @route   GET /api/user/admin/users/:id
// @desc    Get user by ID (admin only)
// @access  Private/Admin
router.get('/admin/users/:id', authenticate, authorize('admin'), async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .select('-password -emailVerificationToken -passwordResetToken');

        if (!user) {
            return res.status(404).json(
                createResponse(false, 'User not found')
            );
        }

        res.json(
            createResponse(
                true,
                'User retrieved successfully',
                { user }
            )
        );

    } catch (error) {
        console.error('Get user by ID error:', error);
        res.status(500).json(
            createResponse(false, 'Server error retrieving user')
        );
    }
});

// @route   PUT /api/user/admin/users/:id
// @desc    Update user (admin only)
// @access  Private/Admin
router.put('/admin/users/:id', [
    body('plan')
        .optional()
        .isIn(['community', 'developer', 'pro', 'max', 'enterprise'])
        .withMessage('Invalid plan'),
    body('isActive')
        .optional()
        .isBoolean()
        .withMessage('isActive must be a boolean'),
    body('role')
        .optional()
        .isIn(['user', 'admin'])
        .withMessage('Role must be user or admin')
], handleValidationErrors, authenticate, authorize('admin'), async (req, res) => {
    try {
        const { plan, isActive, role, subscription } = req.body;

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json(
                createResponse(false, 'User not found')
            );
        }

        // Update fields if provided
        if (plan !== undefined) {
            user.plan = plan;

            // Update usage limits based on new plan
            const planLimits = user.getPlanLimits();
            user.usage.messagesLimit = planLimits.messages === -1 ? 999999 : planLimits.messages;
        }

        if (isActive !== undefined) {
            user.isActive = isActive;
        }

        if (role !== undefined) {
            user.role = role;
        }

        if (subscription) {
            if (subscription.status !== undefined) {
                user.subscription.status = subscription.status;
            }
            if (subscription.currentPeriodEnd !== undefined) {
                user.subscription.currentPeriodEnd = new Date(subscription.currentPeriodEnd);
            }
        }

        await user.save();

        const userResponse = formatUserResponse(user);

        res.json(
            createResponse(
                true,
                'User updated successfully',
                { user: userResponse }
            )
        );

    } catch (error) {
        console.error('Update user error:', error);
        res.status(500).json(
            createResponse(false, 'Server error updating user')
        );
    }
});

// @route   GET /api/user/admin/stats
// @desc    Get user statistics (admin only)
// @access  Private/Admin
router.get('/admin/stats', authenticate, authorize('admin'), async (req, res) => {
    try {
        const [
            totalUsers,
            activeUsers,
            verifiedUsers,
            planStats,
            recentUsers
        ] = await Promise.all([
            User.countDocuments({}),
            User.countDocuments({ isActive: true }),
            User.countDocuments({ isEmailVerified: true }),
            User.aggregate([
                {
                    $group: {
                        _id: '$plan',
                        count: { $sum: 1 }
                    }
                }
            ]),
            User.find({})
                .select('name email plan createdAt')
                .sort({ createdAt: -1 })
                .limit(10)
        ]);

        const stats = {
            users: {
                total: totalUsers,
                active: activeUsers,
                verified: verifiedUsers,
                inactive: totalUsers - activeUsers
            },
            plans: planStats.reduce((acc, item) => {
                acc[item._id] = item.count;
                return acc;
            }, {}),
            recent: recentUsers
        };

        res.json(
            createResponse(
                true,
                'User statistics retrieved successfully',
                stats
            )
        );

    } catch (error) {
        console.error('Get user stats error:', error);
        res.status(500).json(
            createResponse(false, 'Server error retrieving user statistics')
        );
    }
});

// @route   PUT /api/user/plan
// @desc    Update user plan and reset usage
// @access  Private
router.put('/plan', [
    authenticate,
    body('planId')
        .isIn(['community', 'developer', 'pro', 'max', 'enterprise'])
        .withMessage('Invalid plan ID'),
    handleValidationErrors
], async (req, res) => {
    try {
        const { planId } = req.body;
        const user = await User.findById(req.user.id).select('+usage +subscription +usageHistory');

        if (!user) {
            return res.status(404).json(createResponse(false, 'User not found'));
        }

        // Get plan configuration
        const getPlanConfig = (plan) => {
            const PLAN_CONFIGS = {
                community: { id: 'community', name: 'Community', messages: 50, price: 0 },
                developer: { id: 'developer', name: 'Developer', messages: 600, price: 50 },
                pro: { id: 'pro', name: 'Pro', messages: 1500, price: 100 },
                max: { id: 'max', name: 'Max', messages: 4500, price: 250 },
                enterprise: { id: 'enterprise', name: 'Enterprise', messages: -1, price: 'custom' }
            };
            return PLAN_CONFIGS[plan] || PLAN_CONFIGS.community;
        };

        const planConfig = getPlanConfig(planId);
        const previousPlan = user.plan;
        const previousPlanConfig = getPlanConfig(previousPlan);

        // Update user plan
        user.plan = planId;

        // Reset usage tracking
        if (!user.usage) {
            user.usage = {};
        }
        user.usage.messagesUsed = 0;
        user.usage.messagesLimit = planConfig.messages;
        user.usage.resetDate = new Date();

        // Update subscription
        if (!user.subscription) {
            user.subscription = {};
        }
        user.subscription.plan = planId;
        user.subscription.status = 'active';

        // Set billing cycle and dates
        const now = new Date();

        if (planId === 'community') {
            user.subscription.billingCycle = 'monthly';
            user.subscription.currentPeriodStart = null;
            user.subscription.currentPeriodEnd = null;
            user.subscription.endDate = null; // Community plan never expires
            user.subscription.messagesRemaining = planConfig.messages;
            user.subscription.status = 'active'; // Community is always "active"
        } else {
            user.subscription.billingCycle = 'monthly';
            user.subscription.currentPeriodStart = now;

            // Set next billing date to same day next month
            const nextMonth = new Date(now);
            nextMonth.setMonth(nextMonth.getMonth() + 1);
            user.subscription.currentPeriodEnd = nextMonth;
            user.subscription.endDate = nextMonth;
            user.subscription.messagesRemaining = planConfig.messages;
            user.subscription.status = 'active';
        }

        // Clear usage history (optional - you might want to keep it for analytics)
        user.usageHistory = [];

        await user.save();

        // Send email notification for plan changes
        try {
            if (planId === 'community' && previousPlan !== 'community') {
                // Send downgrade email
                const downgradeDetails = {
                    previousPlan: previousPlanConfig.name,
                    newPlan: planConfig.name,
                    downgradeDate: new Date(),
                    newLimits: {
                        messages: planConfig.messages
                    },
                    effectiveImmediately: true
                };

                const emailResult = await emailService.sendPlanDowngradeEmail(user, downgradeDetails);
                if (emailResult.success) {
                    console.log('Plan downgrade email sent successfully:', emailResult.messageId);
                } else {
                    console.error('Failed to send plan downgrade email:', emailResult.error);
                }
            } else if (planId !== 'community' && previousPlan !== planId) {
                // Send premium purchase/upgrade email
                const subscriptionDetails = {
                    plan: planConfig.name,
                    price: planConfig.price,
                    billingCycle: user.subscription.billingCycle,
                    messages: planConfig.messages,
                    currentPeriodStart: user.subscription.currentPeriodStart,
                    currentPeriodEnd: user.subscription.currentPeriodEnd,
                    status: user.subscription.status,
                    subscriptionId: user.subscription.stripeSubscriptionId || 'N/A',
                    previousPlan: previousPlanConfig.name
                };

                const emailResult = await emailService.sendPremiumPurchaseEmail(user, subscriptionDetails);
                if (emailResult.success) {
                    console.log('Premium purchase email sent successfully:', emailResult.messageId);
                } else {
                    console.error('Failed to send premium purchase email:', emailResult.error);
                }
            }
        } catch (emailError) {
            console.error('Error sending plan change email:', emailError);
            // Continue with the plan change even if email fails
        }

        // Return updated user data
        const updatedUser = formatUserResponse(user);

        res.json(createResponse(
            true,
            `Plan successfully updated to ${planConfig.name}`,
            {
                user: updatedUser,
                plan: {
                    id: planConfig.id,
                    name: planConfig.name,
                    messagesLimit: planConfig.messages,
                    messagesUsed: 0,
                    messagesRemaining: planConfig.messages
                }
            }
        ));

    } catch (error) {
        console.error('Update plan error:', error);
        res.status(500).json(createResponse(false, 'Server error updating plan'));
    }
});

// Cancel subscription and downgrade to community plan
router.put('/cancel-subscription', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json(createResponse(false, 'User not found'));
        }

        // Check if user has a paid plan to cancel
        if (user.plan === 'community') {
            return res.status(400).json(createResponse(false, 'You are already on the community plan'));
        }

        // Store current plan info for response
        const currentPlan = user.plan;
        const currentPlanConfig = {
            community: { id: 'community', name: 'Community', messages: 50, price: 0 },
            developer: { id: 'developer', name: 'Developer', messages: 600, price: 50 },
            pro: { id: 'pro', name: 'Pro', messages: 1500, price: 100 },
            max: { id: 'max', name: 'Max', messages: 4500, price: 250 },
            enterprise: { id: 'enterprise', name: 'Enterprise', messages: -1, price: 'custom' }
        };

        const planConfig = currentPlanConfig[currentPlan] || currentPlanConfig.community;

        // Downgrade to community plan
        user.plan = 'community';

        // Reset usage tracking to community limits
        if (!user.usage) {
            user.usage = {};
        }
        user.usage.messagesUsed = Math.min(user.usage.messagesUsed, 50); // Cap at community limit
        user.usage.messagesLimit = 50;
        user.usage.resetDate = new Date();

        // Update subscription
        if (!user.subscription) {
            user.subscription = {};
        }
        user.subscription.plan = 'community';
        user.subscription.status = 'inactive';
        user.subscription.currentPeriodStart = null;
        user.subscription.currentPeriodEnd = null;
        user.subscription.endDate = null;
        user.subscription.billingCycle = 'monthly';
        user.subscription.messagesRemaining = 50;
        user.subscription.cancelAtPeriodEnd = false;

        // Clear any Stripe-related fields (if using Stripe)
        user.subscription.stripeCustomerId = undefined;
        user.subscription.stripeSubscriptionId = undefined;

        await user.save();

        // Send cancellation email
        try {
            const cancellationDetails = {
                plan: planConfig.name,
                cancellationDate: new Date(),
                accessUntil: new Date(), // Immediate cancellation
                reason: 'User requested cancellation',
                refundStatus: 'No refund applicable',
                subscriptionId: user.subscription.stripeSubscriptionId || 'N/A',
                feedback: 'No feedback provided'
            };

            const emailResult = await emailService.sendPremiumCancellationEmail(user, cancellationDetails);
            if (emailResult.success) {
                console.log('Premium cancellation email sent successfully:', emailResult.messageId);
            } else {
                console.error('Failed to send premium cancellation email:', emailResult.error);
            }
        } catch (emailError) {
            console.error('Error sending premium cancellation email:', emailError);
            // Continue with the cancellation even if email fails
        }

        // Return updated user data
        const updatedUser = formatUserResponse(user);

        res.json(createResponse(
            true,
            `Subscription cancelled successfully. You have been downgraded to the Community plan.`,
            {
                user: updatedUser,
                previousPlan: currentPlan,
                newPlan: {
                    id: 'community',
                    name: 'Community',
                    messagesLimit: 50,
                    messagesUsed: user.usage.messagesUsed,
                    messagesRemaining: 50 - user.usage.messagesUsed
                }
            }
        ));

    } catch (error) {
        console.error('Cancel subscription error:', error);
        res.status(500).json(createResponse(false, 'Server error cancelling subscription'));
    }
});

module.exports = router;
