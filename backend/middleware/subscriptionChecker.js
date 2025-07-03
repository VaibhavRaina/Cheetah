const User = require('../models/User');

// Check and update expired subscriptions
const checkExpiredSubscriptions = async () => {
    try {
        const now = new Date();

        // Find users with expired subscriptions
        const expiredUsers = await User.find({
            'subscription.status': 'active',
            'subscription.currentPeriodEnd': { $lt: now },
            'plan': { $ne: 'community' } // Don't check community users
        });

        console.log(`Found ${expiredUsers.length} expired subscriptions to process`);

        for (const user of expiredUsers) {
            console.log(`Processing expired subscription for user: ${user.email}`);

            // Downgrade to community plan
            user.plan = 'community';
            user.subscription.status = 'inactive';
            user.subscription.plan = 'community';
            user.subscription.currentPeriodEnd = null;
            user.subscription.cancelAtPeriodEnd = false;

            // Reset usage to community limits
            user.usage.messagesLimit = 50;
            user.usage.messagesUsed = Math.min(user.usage.messagesUsed, 50); // Cap at community limit

            // Set next reset date to next month
            const nextMonth = new Date();
            nextMonth.setMonth(nextMonth.getMonth() + 1);
            nextMonth.setDate(1);
            user.usage.resetDate = nextMonth;

            await user.save();
            console.log(`Successfully downgraded user ${user.email} to community plan`);
        }

        return {
            success: true,
            processedCount: expiredUsers.length
        };
    } catch (error) {
        console.error('Error checking expired subscriptions:', error);
        return {
            success: false,
            error: error.message
        };
    }
};

// Middleware to check subscription on each request
const checkUserSubscription = async (req, res, next) => {
    try {
        if (req.user && req.user.id) {
            const user = await User.findById(req.user.id);

            if (user && user.plan !== 'community') {
                const now = new Date();
                const subscriptionEndDate = user.subscription.currentPeriodEnd;

                // Check if subscription has expired
                if (subscriptionEndDate && new Date(subscriptionEndDate) <= now) {
                    console.log(`Subscription expired for user: ${user.email}, downgrading to community`);

                    // Downgrade to community plan
                    user.plan = 'community';
                    user.subscription.status = 'inactive';
                    user.subscription.plan = 'community';
                    user.subscription.currentPeriodEnd = null;
                    user.subscription.cancelAtPeriodEnd = false;

                    // Reset usage to community limits
                    user.usage.messagesLimit = 50;
                    user.usage.messagesUsed = Math.min(user.usage.messagesUsed, 50);

                    // Set next reset date to next month
                    const nextMonth = new Date();
                    nextMonth.setMonth(nextMonth.getMonth() + 1);
                    nextMonth.setDate(1);
                    user.usage.resetDate = nextMonth;

                    await user.save();

                    // Update the request user object
                    req.user = { ...req.user, plan: 'community' };
                }
            }
        }

        next();
    } catch (error) {
        console.error('Error checking user subscription:', error);
        // Don't block the request, just continue
        next();
    }
};

module.exports = {
    checkExpiredSubscriptions,
    checkUserSubscription
};
