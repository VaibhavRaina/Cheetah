// Test script to verify recharge balance is used when plan limit is reached
const User = require('./models/User');
const mongoose = require('mongoose');
require('dotenv').config();

async function testRechargeUsage() {
    console.log('🔍 Testing Recharge Balance Usage...\n');

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

        const planLimits = user.getPlanLimits();
        console.log(`📊 Plan limit: ${planLimits.messages}`);
        console.log(`📊 Messages used: ${user.usage?.messagesUsed || 0}`);
        console.log(`📊 Recharge balance: ${user.recharge?.balance || 0}`);

        // Test multiple message increments to see the transition from plan to recharge
        for (let i = 0; i < 15; i++) {
            const beforeMessagesUsed = user.usage.messagesUsed;
            const beforeRechargeBalance = user.recharge?.balance || 0;

            try {
                await user.incrementMessageUsage();
                user = await User.findById(user._id); // Refetch to see changes

                const afterMessagesUsed = user.usage.messagesUsed;
                const afterRechargeBalance = user.recharge?.balance || 0;

                console.log(`Message ${i + 1}:`);
                console.log(`  Before: plan=${beforeMessagesUsed}, recharge=${beforeRechargeBalance}`);
                console.log(`  After:  plan=${afterMessagesUsed}, recharge=${afterRechargeBalance}`);

                if (beforeMessagesUsed >= planLimits.messages) {
                    // Should use recharge balance
                    if (afterRechargeBalance === beforeRechargeBalance - 1 && afterMessagesUsed === beforeMessagesUsed) {
                        console.log(`  ✅ Correctly used recharge balance`);
                    } else {
                        console.log(`  ❌ Recharge balance not used correctly`);
                    }
                } else {
                    // Should increment plan messages
                    if (afterMessagesUsed === beforeMessagesUsed + 1 && afterRechargeBalance === beforeRechargeBalance) {
                        console.log(`  ✅ Correctly used plan message`);
                    } else {
                        console.log(`  ❌ Plan message not used correctly`);
                    }
                }

                // Check if user still has messages
                const hasMessages = user.hasMessagesRemaining();
                console.log(`  Has messages remaining: ${hasMessages}`);

                if (!hasMessages) {
                    console.log(`  🛑 No more messages available, stopping test`);
                    break;
                }

            } catch (error) {
                console.log(`  ❌ Error: ${error.message}`);
                break;
            }

            console.log(''); // Empty line for readability
        }

        console.log('\n✅ Recharge usage test completed!');

    } catch (error) {
        console.error('❌ Test failed:', error);
    } finally {
        await mongoose.disconnect();
        console.log('📦 Disconnected from MongoDB');
    }
}

// Run the test
testRechargeUsage()
    .then(() => {
        console.log('\n🎉 Test completed successfully!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('❌ Test failed:', error);
        process.exit(1);
    });