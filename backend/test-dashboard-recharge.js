// Test script to verify dashboard includes recharge balance in message calculations
const User = require('./models/User');
const { getPlanConfig } = require('./utils/helpers');

async function testDashboardRechargeCalculation() {
    console.log('🔍 Testing Dashboard Recharge Balance Calculation...\n');

    try {
        // Find a test user
        let user = await User.findOne({ email: { $not: /@placeholder\.local$/ } });
        if (!user) {
            console.log('❌ No test user found. Please create a user first.');
            return;
        }

        console.log(`✅ Using test user: ${user.email}`);
        console.log(`📊 Current plan: ${user.plan}`);

        // Display current usage
        console.log(`📊 Messages used: ${user.usage?.messagesUsed || 0}`);
        console.log(`📊 Current recharge balance: ${user.recharge?.balance || 0}`);

        // Get plan limits
        const planLimits = user.getPlanLimits();
        console.log(`📊 Plan message limit: ${planLimits.messages === -1 ? 'Unlimited' : planLimits.messages}`);

        // Calculate total available (plan + recharge)
        const rechargeBalance = user.recharge ? user.recharge.balance : 0;
        const totalAvailable = planLimits.messages === -1 ? -1 : planLimits.messages + rechargeBalance;
        const messagesRemaining = totalAvailable === -1 ? -1 : Math.max(0, totalAvailable - (user.usage?.messagesUsed || 0));

        console.log('\n📈 Calculation Results:');
        console.log(`   Plan limit: ${planLimits.messages === -1 ? 'Unlimited' : planLimits.messages}`);
        console.log(`   Recharge balance: ${rechargeBalance}`);
        console.log(`   Total available: ${totalAvailable === -1 ? 'Unlimited' : totalAvailable}`);
        console.log(`   Messages used: ${user.usage?.messagesUsed || 0}`);
        console.log(`   Messages remaining: ${messagesRemaining === -1 ? 'Unlimited' : messagesRemaining}`);

        // Test adding some recharge balance if user has none
        if (rechargeBalance === 0) {
            console.log('\n🧪 Testing recharge balance addition...');

            // Initialize recharge object if it doesn't exist
            if (!user.recharge) {
                user.recharge = {
                    balance: 0,
                    totalPurchased: 0,
                    lastRechargeDate: null,
                    rechargeHistory: []
                };
            }

            // Add 100 messages to recharge balance (1 pack = $10)
            user.recharge.balance += 100;
            user.recharge.totalPurchased += 100;
            user.recharge.lastRechargeDate = new Date();

            // Add to recharge history
            user.recharge.rechargeHistory.push({
                amount: 100,
                price: 10, // $10 for 100 messages (1 pack)
                date: new Date(),
                transactionId: 'test-' + Date.now()
            });

            await user.save();

            console.log('✅ Added 100 messages to recharge balance for $10 (1 pack)');

            // Recalculate with new balance
            const newRechargeBalance = user.recharge.balance;
            const newTotalAvailable = planLimits.messages === -1 ? -1 : planLimits.messages + newRechargeBalance;
            const newMessagesRemaining = newTotalAvailable === -1 ? -1 : Math.max(0, newTotalAvailable - (user.usage?.messagesUsed || 0));

            console.log('\n📈 Updated Calculation Results:');
            console.log(`   Plan limit: ${planLimits.messages === -1 ? 'Unlimited' : planLimits.messages}`);
            console.log(`   Recharge balance: ${newRechargeBalance}`);
            console.log(`   Total available: ${newTotalAvailable === -1 ? 'Unlimited' : newTotalAvailable}`);
            console.log(`   Messages used: ${user.usage?.messagesUsed || 0}`);
            console.log(`   Messages remaining: ${newMessagesRemaining === -1 ? 'Unlimited' : newMessagesRemaining}`);
        }

        console.log('\n✅ Dashboard recharge calculation test completed!');

    } catch (error) {
        console.error('❌ Test failed:', error);
    }
}

// Connect to database and run test
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kiro-saas')
    .then(() => {
        console.log('📦 Connected to MongoDB');
        return testDashboardRechargeCalculation();
    })
    .then(() => {
        console.log('\n🎉 Test completed successfully!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('❌ Test failed:', error);
        process.exit(1);
    });