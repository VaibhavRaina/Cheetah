// Test script to verify message usage with recharge balance works correctly
const User = require('./models/User');
const mongoose = require('mongoose');
require('dotenv').config();

async function testMessageUsageWithRecharge() {
    console.log('🔍 Testing Message Usage with Recharge Balance...\n');

    try {
        // Connect to database
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kiro-saas');
        console.log('📦 Connected to MongoDB');

        // Find the test user (Vaibhav Raina)
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

        // Get plan limits
        const planLimits = user.getPlanLimits();
        console.log(`📊 Plan message limit: ${planLimits.messages}`);

        // Test hasMessagesRemaining method
        const hasMessages = user.hasMessagesRemaining();
        console.log(`📊 Has messages remaining: ${hasMessages}`);

        if (hasMessages) {
            console.log('\n✅ User should be able to send messages!');

            // Calculate total available
            const rechargeBalance = user.recharge?.balance || 0;
            const totalAvailable = planLimits.messages + rechargeBalance;
            const rechargeUsed = user.recharge ? Math.max(0, (user.recharge.totalPurchased || 0) - (user.recharge.balance || 0)) : 0;
            const totalUsed = user.usage.messagesUsed + rechargeUsed;

            console.log(`📈 Total available: ${totalAvailable} (${planLimits.messages} plan + ${rechargeBalance} recharge)`);
            console.log(`📈 Total used: ${totalUsed}`);
            console.log(`📈 Remaining: ${totalAvailable - totalUsed}`);

            // Test what happens when user tries to send a message
            console.log('\n🧪 Testing message increment...');

            try {
                // Save original state
                const originalMessagesUsed = user.usage.messagesUsed;
                const originalRechargeBalance = user.recharge?.balance || 0;

                console.log(`Before: messagesUsed=${originalMessagesUsed}, rechargeBalance=${originalRechargeBalance}`);

                // Try to increment message usage
                await user.incrementMessageUsage();

                // Refetch user to see changes
                user = await User.findById(user._id);

                const newMessagesUsed = user.usage.messagesUsed;
                const newRechargeBalance = user.recharge?.balance || 0;

                console.log(`After: messagesUsed=${newMessagesUsed}, rechargeBalance=${newRechargeBalance}`);

                if (originalMessagesUsed >= planLimits.messages) {
                    // Should have used recharge balance
                    if (newRechargeBalance === originalRechargeBalance - 1 && newMessagesUsed === originalMessagesUsed) {
                        console.log('✅ Correctly used recharge balance without incrementing messagesUsed');
                    } else {
                        console.log('❌ Recharge balance logic not working correctly');
                    }
                } else {
                    // Should have incremented messagesUsed
                    if (newMessagesUsed === originalMessagesUsed + 1 && newRechargeBalance === originalRechargeBalance) {
                        console.log('✅ Correctly incremented messagesUsed within plan limit');
                    } else {
                        console.log('❌ Plan message usage logic not working correctly');
                    }
                }

            } catch (error) {
                console.log(`❌ Error during message increment: ${error.message}`);
            }

        } else {
            console.log('\n❌ User has no messages remaining - this should not happen with recharge balance!');
        }

        console.log('\n✅ Message usage test completed!');

    } catch (error) {
        console.error('❌ Test failed:', error);
    } finally {
        await mongoose.disconnect();
        console.log('📦 Disconnected from MongoDB');
    }
}

// Run the test
testMessageUsageWithRecharge()
    .then(() => {
        console.log('\n🎉 Test completed successfully!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('❌ Test failed:', error);
        process.exit(1);
    });