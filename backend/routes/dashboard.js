const express = require('express');
const User = require('../models/User');
const { authenticate, authorize } = require('../middleware/auth');
const {
    createResponse,
    isSubscriptionActive
} = require('../utils/helpers');

const router = express.Router();

// @route   GET /api/dashboard/overview
// @desc    Get dashboard overview data
// @access  Private
router.get('/overview', authenticate, async (req, res) => {
    try {
        const user = req.user;
        const planLimits = user.getPlanLimits();

        // Calculate usage statistics including recharge balance
        const rechargeBalance = user.recharge ? user.recharge.balance : 0;
        const totalAvailable = planLimits.messages === -1 ? -1 : planLimits.messages + rechargeBalance;
        const messageUsagePercentage = totalAvailable === -1 ? 0 :
            Math.min(100, (user.usage.messagesUsed / totalAvailable) * 100);

        // Get recent activity (mock data for now)
        const recentActivity = [
            {
                id: 1,
                type: 'message',
                description: 'Used AI completion',
                timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
                details: 'Generated code completion for React component'
            },
            {
                id: 2,
                type: 'feature',
                description: 'Accessed advanced features',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
                details: 'Used team collaboration features'
            },
            {
                id: 3,
                type: 'login',
                description: 'Logged in',
                timestamp: user.lastLogin,
                details: 'Successful login from web browser'
            }
        ];

        const overviewData = {
            user: {
                name: user.name,
                email: user.email,
                plan: user.plan,
                joinDate: user.createdAt,
                lastLogin: user.lastLogin,
                emailVerified: user.isEmailVerified
            },
            usage: {
                messages: {
                    used: user.usage.messagesUsed,
                    limit: totalAvailable === -1 ? 'unlimited' : totalAvailable,
                    remaining: totalAvailable === -1 ? 'unlimited' :
                        Math.max(0, totalAvailable - user.usage.messagesUsed),
                    percentage: messageUsagePercentage,
                    resetDate: user.usage.resetDate,
                    planLimit: planLimits.messages === -1 ? 'unlimited' : planLimits.messages,
                    rechargeBalance: rechargeBalance
                }
            },
            subscription: {
                plan: user.plan,
                status: user.subscription.status,
                isActive: isSubscriptionActive(user.subscription),
                currentPeriodEnd: user.subscription.currentPeriodEnd,
                cancelAtPeriodEnd: user.subscription.cancelAtPeriodEnd,
                hasPaymentMethod: !!user.subscription.stripeCustomerId
            },
            features: {
                available: planLimits.features,
                canUseTeamFeatures: user.canUseFeature('team'),
                canUseAdvancedFeatures: user.canUseFeature('advanced'),
                canUsePrioritySupport: user.canUseFeature('priority')
            },
            recentActivity: recentActivity.slice(0, 5), // Last 5 activities
            notifications: {
                unread: 0, // Would be calculated from actual notifications
                hasWarnings: messageUsagePercentage > 80,
                messages: messageUsagePercentage > 80 ?
                    [`You've used ${messageUsagePercentage.toFixed(0)}% of your monthly message limit`] : []
            }
        };

        res.json(
            createResponse(
                true,
                'Dashboard overview retrieved successfully',
                overviewData
            )
        );

    } catch (error) {
        console.error('Get dashboard overview error:', error);
        res.status(500).json(
            createResponse(false, 'Server error retrieving dashboard overview')
        );
    }
});

// @route   GET /api/dashboard/stats
// @desc    Get detailed user statistics
// @access  Private
router.get('/stats', authenticate, async (req, res) => {
    try {
        const user = req.user;
        const { period = '30d' } = req.query; // 7d, 30d, 90d, 1y

        // In a real implementation, you would track and store detailed usage statistics
        // For now, we'll provide mock data based on the period
        const mockStats = {
            '7d': {
                messagesUsed: Math.min(user.usage.messagesUsed, 10),
                averageDaily: Math.min(user.usage.messagesUsed / 7, 2),
                peakDay: 'Yesterday',
                growthRate: 15
            },
            '30d': {
                messagesUsed: user.usage.messagesUsed,
                averageDaily: user.usage.messagesUsed / 30,
                peakDay: 'Last week',
                growthRate: 23
            },
            '90d': {
                messagesUsed: Math.min(user.usage.messagesUsed * 2.5, 500),
                averageDaily: (user.usage.messagesUsed * 2.5) / 90,
                peakDay: 'Last month',
                growthRate: 18
            },
            '1y': {
                messagesUsed: Math.min(user.usage.messagesUsed * 8, 2000),
                averageDaily: (user.usage.messagesUsed * 8) / 365,
                peakDay: 'Q3 2024',
                growthRate: 45
            }
        };

        const selectedStats = mockStats[period] || mockStats['30d'];
        const planLimits = user.getPlanLimits();

        const statsData = {
            period,
            usage: {
                messages: {
                    total: selectedStats.messagesUsed,
                    average: selectedStats.averageDaily,
                    peak: selectedStats.peakDay,
                    limit: planLimits.messages === -1 ? 'unlimited' : planLimits.messages,
                    percentage: planLimits.messages === -1 ? 0 :
                        (selectedStats.messagesUsed / planLimits.messages) * 100
                },
                features: {
                    mostUsed: ['completions', 'chat', 'context-engine'],
                    leastUsed: user.canUseFeature('advanced') ? ['advanced-analytics'] : ['team-features']
                }
            },
            performance: {
                growthRate: selectedStats.growthRate,
                efficiency: 85, // Mock efficiency score
                satisfaction: 4.2 // Mock satisfaction rating
            },
            recommendations: generateRecommendations(user, selectedStats)
        };

        res.json(
            createResponse(
                true,
                'User statistics retrieved successfully',
                statsData
            )
        );

    } catch (error) {
        console.error('Get dashboard stats error:', error);
        res.status(500).json(
            createResponse(false, 'Server error retrieving user statistics')
        );
    }
});

// @route   GET /api/dashboard/notifications
// @desc    Get user notifications
// @access  Private
router.get('/notifications', authenticate, async (req, res) => {
    try {
        const user = req.user;
        const { page = 1, limit = 10, unreadOnly = false } = req.query;

        // In a real implementation, you would have a Notification model
        // For now, generate mock notifications based on user state
        const mockNotifications = [];

        // Usage warnings
        const planLimits = user.getPlanLimits();
        const usagePercentage = planLimits.messages === -1 ? 0 :
            (user.usage.messagesUsed / planLimits.messages) * 100;

        if (usagePercentage > 80) {
            mockNotifications.push({
                id: 'usage_warning',
                type: 'warning',
                title: 'Usage Alert',
                message: `You've used ${usagePercentage.toFixed(0)}% of your monthly message limit`,
                timestamp: new Date(),
                read: false,
                action: {
                    type: 'upgrade',
                    text: 'Upgrade Plan',
                    url: '/dashboard/subscription'
                }
            });
        }

        // Email verification reminder
        if (!user.isEmailVerified) {
            mockNotifications.push({
                id: 'email_verification',
                type: 'info',
                title: 'Verify Your Email',
                message: 'Please verify your email address to unlock all features',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
                read: false,
                action: {
                    type: 'verify',
                    text: 'Verify Now',
                    url: '/verify-email'
                }
            });
        }

        // Subscription renewal reminder
        if (user.subscription.currentPeriodEnd &&
            new Date(user.subscription.currentPeriodEnd) - new Date() < 7 * 24 * 60 * 60 * 1000) {
            mockNotifications.push({
                id: 'renewal_reminder',
                type: 'info',
                title: 'Subscription Renewal',
                message: 'Your subscription will renew soon',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
                read: true,
                action: {
                    type: 'manage',
                    text: 'Manage Subscription',
                    url: '/dashboard/subscription'
                }
            });
        }

        // Welcome message for new users
        const daysSinceJoin = (new Date() - new Date(user.createdAt)) / (1000 * 60 * 60 * 24);
        if (daysSinceJoin < 7) {
            mockNotifications.push({
                id: 'welcome',
                type: 'success',
                title: 'Welcome to Cheetah!',
                message: 'Thanks for joining! Explore our features and let us know if you need help.',
                timestamp: user.createdAt,
                read: daysSinceJoin > 1,
                action: {
                    type: 'explore',
                    text: 'Get Started',
                    url: '/docs'
                }
            });
        }

        // Filter and paginate
        let filteredNotifications = mockNotifications;
        if (unreadOnly === 'true') {
            filteredNotifications = mockNotifications.filter(n => !n.read);
        }

        const startIndex = (parseInt(page) - 1) * parseInt(limit);
        const paginatedNotifications = filteredNotifications.slice(startIndex, startIndex + parseInt(limit));

        const notificationsData = {
            notifications: paginatedNotifications,
            pagination: {
                total: filteredNotifications.length,
                page: parseInt(page),
                limit: parseInt(limit),
                hasMore: filteredNotifications.length > startIndex + parseInt(limit)
            },
            summary: {
                total: mockNotifications.length,
                unread: mockNotifications.filter(n => !n.read).length
            }
        };

        res.json(
            createResponse(
                true,
                'Notifications retrieved successfully',
                notificationsData
            )
        );

    } catch (error) {
        console.error('Get notifications error:', error);
        res.status(500).json(
            createResponse(false, 'Server error retrieving notifications')
        );
    }
});

// @route   PUT /api/dashboard/notifications/:id/read
// @desc    Mark notification as read
// @access  Private
router.put('/notifications/:id/read', authenticate, async (req, res) => {
    try {
        const { id } = req.params;

        // In a real implementation, you would update the notification in the database
        // For now, just return success
        res.json(
            createResponse(
                true,
                'Notification marked as read',
                { notificationId: id }
            )
        );

    } catch (error) {
        console.error('Mark notification read error:', error);
        res.status(500).json(
            createResponse(false, 'Server error marking notification as read')
        );
    }
});

// @route   GET /api/dashboard/activity
// @desc    Get user activity log
// @access  Private
router.get('/activity', authenticate, async (req, res) => {
    try {
        const user = req.user;
        const { page = 1, limit = 20, type } = req.query;

        // In a real implementation, you would have an Activity model
        // For now, generate mock activity data
        const mockActivities = [
            {
                id: 1,
                type: 'auth',
                action: 'login',
                description: 'Logged in successfully',
                timestamp: user.lastLogin,
                metadata: {
                    ip: '192.168.1.1',
                    userAgent: 'Chrome/91.0'
                }
            },
            {
                id: 2,
                type: 'subscription',
                action: 'plan_change',
                description: `Upgraded to ${user.plan} plan`,
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 7 days ago
                metadata: {
                    previousPlan: 'community',
                    newPlan: user.plan
                }
            },
            {
                id: 3,
                type: 'usage',
                action: 'message_sent',
                description: 'Used AI completion feature',
                timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
                metadata: {
                    feature: 'completion',
                    tokensUsed: 150
                }
            },
            {
                id: 4,
                type: 'profile',
                action: 'profile_update',
                description: 'Updated profile information',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 48 hours ago
                metadata: {
                    fields: ['name', 'preferences']
                }
            }
        ];

        // Filter by type if specified
        let filteredActivities = mockActivities;
        if (type) {
            filteredActivities = mockActivities.filter(activity => activity.type === type);
        }

        // Paginate
        const startIndex = (parseInt(page) - 1) * parseInt(limit);
        const paginatedActivities = filteredActivities.slice(startIndex, startIndex + parseInt(limit));

        const activityData = {
            activities: paginatedActivities,
            pagination: {
                total: filteredActivities.length,
                page: parseInt(page),
                limit: parseInt(limit),
                hasMore: filteredActivities.length > startIndex + parseInt(limit)
            },
            types: ['auth', 'subscription', 'usage', 'profile', 'security']
        };

        res.json(
            createResponse(
                true,
                'Activity log retrieved successfully',
                activityData
            )
        );

    } catch (error) {
        console.error('Get activity error:', error);
        res.status(500).json(
            createResponse(false, 'Server error retrieving activity log')
        );
    }
});

// Helper function to generate recommendations
function generateRecommendations(user, stats) {
    const recommendations = [];
    const planLimits = user.getPlanLimits();

    // Usage-based recommendations
    if (planLimits.messages !== -1 && stats.messagesUsed / planLimits.messages > 0.8) {
        recommendations.push({
            type: 'upgrade',
            title: 'Consider Upgrading',
            description: 'You\'re using most of your message limit. Upgrade for more capacity.',
            action: 'upgrade_plan',
            priority: 'high'
        });
    }

    // Feature recommendations
    if (user.plan === 'community' && stats.messagesUsed > 30) {
        recommendations.push({
            type: 'feature',
            title: 'Unlock Team Features',
            description: 'Try team collaboration features with a Developer plan.',
            action: 'explore_features',
            priority: 'medium'
        });
    }

    // Efficiency recommendations
    if (stats.averageDaily < 2 && user.plan !== 'community') {
        recommendations.push({
            type: 'usage',
            title: 'Maximize Your Plan',
            description: 'You have unused capacity. Try exploring more features.',
            action: 'explore_docs',
            priority: 'low'
        });
    }

    return recommendations;
}

module.exports = router;
