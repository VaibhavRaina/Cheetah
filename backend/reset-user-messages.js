// Script to reset user message usage for testing
const User = require('./models/User');
const mongoose = require('mongoose');
require('dotenv').config();

async function resetUserMessages() {
    console.log('🔄 Resetting user message usage for testing...\n');

    try {
        // Connect to database
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kiro-saas');
        console.log('📦 Connected to MongoDB');

        // Find the test user
        let user = await User.findOne({ email: 'vaibhavraina12345@gmail.com' });
        if (!user) {
            console.log('❌ Test user not found.');
            return;
        }

        console.log(`✅ Found test user: ${user.email}`);
        console.log(`📊 Current plan: ${user.plan}`);
        console.log(`📊 Messages used: ${user.usage?.messagesUsed || 0}`);
        console.log(`📊 Recharge balance: ${user.recharge?.balance || 0}`);
        console.log(`📊 Recharge total purchased: ${user.recharge?.totalPurchased || 0}`);

        // Reset message usage to plan limit - 10 (so user has 10 messages left in plan)
        const planLimits = user.getPlanLimits();
        const newMessagesUsed = Math.max(0, planLimits.messages - 10);

        user.usage.messagesUsed = newMessagesUsed;

        // Set next reset date to next month
        const nextMonth = new Date();
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        nextMonth.setDate(1);
        user.usage.resetDate = nextMonth;

        await user.save();

        console.log(`\n✅ Reset complete!`);
        console.log(`📊 New messages used: ${user.usage.messagesUsed}`);
        console.log(`📊 Messages remaining in plan: ${planLimits.messages - user.usage.messagesUsed}`);
        console.log(`📊 Recharge balance: ${user.recharge?.balance || 0}`);
        console.log(`📊 Total available: ${(planLimits.messages - user.usage.messagesUsed) + (user.recharge?.balance || 0)}`);

        // Test hasMessagesRemaining
        const hasMessages = user.hasMessagesRemaining();
        console.log(`📊 Has messages remaining: ${hasMessages}`);

    } catch (error) {
        console.error('❌ Reset failed:', error);
    } finally {
        await mongoose.disconnect();
        console.log('📦 Disconnected from MongoDB');
    }
}

// Run the reset
resetUserMessages()
    .then(() => {
        console.log('\n🎉 Reset completed successfully!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('❌ Reset failed:', error);
        process.exit(1);
    });