const express = require('express');
const User = require('../models/User');
const { authenticate } = require('../middleware/auth');
const {
    createResponse,
    calculateUsageStats,
    generateInvoiceData,
    generateInvoicePDF
} = require('../utils/helpers');

const router = express.Router();

// Get billing overview
router.get('/overview', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('+subscription +usageHistory +invoices +usage');

        if (!user) {
            return res.status(404).json(createResponse(false, 'User not found'));
        }

        // Calculate current billing period usage
        const currentDate = new Date();
        const billingPeriodStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const billingPeriodEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        // Get actual messages used from usage object
        const actualMessagesUsed = user.usage ? user.usage.messagesUsed : 0;

        // Calculate remaining messages
        const planConfig = getPlanConfig(user.subscription.plan);
        const messagesRemaining = planConfig.messages - actualMessagesUsed;

        // Calculate next billing date and days until renewal
        let nextBillingDate;
        let daysUntilRenewal;

        if (planConfig.id === 'community') {
            nextBillingDate = null; // Community plan never expires
            daysUntilRenewal = null; // Infinity symbol will be shown in frontend
        } else {
            // Use currentPeriodEnd instead of endDate for active subscriptions
            const billingDate = user.subscription.currentPeriodEnd || user.subscription.endDate;
            nextBillingDate = new Date(billingDate);

            // Calculate days until renewal
            const timeDiff = nextBillingDate.getTime() - currentDate.getTime();
            daysUntilRenewal = Math.max(0, Math.ceil(timeDiff / (1000 * 3600 * 24)));

            // If subscription has expired, set to null to trigger downgrade
            if (daysUntilRenewal <= 0 && user.subscription.status === 'active') {
                daysUntilRenewal = 0;
            }
        }

        // Generate last 30 days of usage history
        const usageHistory = [];
        for (let i = 29; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateString = date.toISOString().split('T')[0];

            const dayUsage = user.usageHistory.find(usage =>
                usage.date.toISOString().split('T')[0] === dateString
            );

            usageHistory.push({
                date: dateString,
                messages: dayUsage ? dayUsage.messages : 0
            });
        }

        // Get invoices
        const invoices = user.invoices || [];

        const billingData = {
            customer: {
                name: user.name,
                email: user.email
            },
            creditBalance: Math.max(0, messagesRemaining),
            currentPlan: {
                name: planConfig.name,
                messagesLimit: planConfig.messages,
                messagesUsed: actualMessagesUsed,
                price: planConfig.price,
                billingCycle: user.subscription.billingCycle || 'monthly',
                nextBillingDate: nextBillingDate ? nextBillingDate.toISOString() : null,
                daysUntilRenewal: daysUntilRenewal,
                status: user.subscription.status
            },
            usageHistory: usageHistory,
            invoices: invoices
        };

        res.json(createResponse(true, 'Billing data retrieved successfully', billingData));
    } catch (error) {
        console.error('Error fetching billing overview:', error);
        res.status(500).json(createResponse(false, 'Server error'));
    }
});

// Get usage statistics
router.get('/usage/:period', authenticate, async (req, res) => {
    try {
        const { period } = req.params; // 'daily', 'weekly', 'monthly'
        const user = await User.findById(req.user.id).select('+usageHistory +usage');

        if (!user) {
            return res.status(404).json(createResponse(false, 'User not found'));
        }

        const usageStats = calculateUsageStats(user.usageHistory, period);

        res.json(createResponse(true, 'Usage statistics retrieved successfully', usageStats));
    } catch (error) {
        console.error('Error fetching usage statistics:', error);
        res.status(500).json(createResponse(false, 'Server error'));
    }
});

// Get invoice details
router.get('/invoices/:invoiceId', authenticate, async (req, res) => {
    try {
        const { invoiceId } = req.params;
        const user = await User.findById(req.user.id).select('+invoices');

        if (!user) {
            return res.status(404).json(createResponse(false, 'User not found'));
        }

        const invoice = user.invoices.find(inv => inv.id === invoiceId);

        if (!invoice) {
            return res.status(404).json(createResponse(false, 'Invoice not found'));
        }

        res.json(createResponse(true, 'Invoice retrieved successfully', invoice));
    } catch (error) {
        console.error('Error fetching invoice:', error);
        res.status(500).json(createResponse(false, 'Server error'));
    }
});

// Download invoice
router.get('/invoices/:invoiceId/download', authenticate, async (req, res) => {
    try {
        const { invoiceId } = req.params;
        const user = await User.findById(req.user.id).select('+invoices');

        if (!user) {
            return res.status(404).json(createResponse(false, 'User not found'));
        }

        const invoice = user.invoices.find(inv => inv.id === invoiceId);

        if (!invoice) {
            return res.status(404).json(createResponse(false, 'Invoice not found'));
        }

        // Generate PDF invoice (you'll need to implement PDF generation)
        const invoicePDF = await generateInvoicePDF(invoice, user);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="invoice-${invoiceId}.pdf"`);
        res.send(invoicePDF);
    } catch (error) {
        console.error('Error downloading invoice:', error);
        res.status(500).json(createResponse(false, 'Server error'));
    }
});

// Update usage (called when user sends a message)
router.post('/usage/record', authenticate, async (req, res) => {
    try {
        const { messageCount = 1 } = req.body;
        const user = await User.findById(req.user.id).select('+usageHistory +subscription +usage');

        if (!user) {
            return res.status(404).json(createResponse(false, 'User not found'));
        }

        const today = new Date();
        const todayString = today.toISOString().split('T')[0];

        // Update usage tracking
        if (!user.usage) {
            user.usage = { messagesUsed: 0, messagesLimit: 50 };
        }
        user.usage.messagesUsed += messageCount;

        // Find or create today's usage record in history
        let todayUsage = user.usageHistory.find(usage =>
            usage.date.toISOString().split('T')[0] === todayString
        );

        if (todayUsage) {
            todayUsage.messages += messageCount;
        } else {
            user.usageHistory.push({
                date: today,
                messages: messageCount
            });
        }

        // Update remaining messages (legacy field for backward compatibility)
        if (user.subscription.messagesRemaining > 0) {
            user.subscription.messagesRemaining = Math.max(0, user.subscription.messagesRemaining - messageCount);
        }

        await user.save();

        res.json(createResponse(true, 'Usage recorded successfully', {
            messagesUsed: user.usage.messagesUsed,
            messagesRemaining: user.subscription.messagesRemaining,
            todayUsage: todayUsage ? todayUsage.messages : messageCount
        }));
    } catch (error) {
        console.error('Error recording usage:', error);
        res.status(500).json(createResponse(false, 'Server error'));
    }
});

// Get plan configurations
function getPlanConfig(planId) {
    const PLAN_CONFIGS = {
        community: {
            id: 'community',
            name: 'Community',
            price: 0,
            messages: 50,
            features: ['basic', 'community']
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
            messages: -1,
            features: ['all']
        }
    };

    return PLAN_CONFIGS[planId] || PLAN_CONFIGS.community;
}

module.exports = router;
