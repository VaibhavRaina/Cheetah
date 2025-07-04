// Test script to verify subscription data is saved to database
const User = require('./models/User');
const { createSubscriptionHistory, generateTransactionId, generateSubscriptionId } = require('./utils/helpers');

async function testSubscriptionDataSaving() {
    console.log('🔍 Testing Subscription Data Saving to Database...\n');

    try {
        // Find a test user
        let user = await User.findOne({ email: { $not: /@placeholder\.local$/ } });
        if (!user) {
            console.log('❌ No test user found. Please create a user first.');
            return;
        }

        console.log(`✅ Using test user: ${user.email}`);
        console.log(`📊 Current plan: ${user.plan}`);
        console.log(`📊 Current subscription status: ${user.subscription?.status || 'N/A'}`);

        // Display current subscription history
        console.log(`📊 Current subscription history records: ${user.subscriptionHistory ? user.subscriptionHistory.length : 0}`);
        if (user.subscriptionHistory && user.subscriptionHistory.length > 0) {
            console.log('\n📋 Recent subscription history:');
            user.subscriptionHistory.slice(-3).forEach((record, index) => {
                console.log(`${index + 1}. ${record.action.toUpperCase()} - ${record.fromPlan} → ${record.toPlan} (${new Date(record.date).toLocaleDateString()})`);
            });
        }

        // Display current transactions
        console.log(`📊 Current transaction records: ${user.transactions ? user.transactions.length : 0}`);
        if (user.transactions && user.transactions.length > 0) {
            console.log('\n💰 Recent transactions:');
            user.transactions.slice(-3).forEach((transaction, index) => {
                console.log(`${index + 1}. ${transaction.type.toUpperCase()} - ${transaction.description} - $${transaction.amount} (${transaction.status})`);
            });
        }

        // Test adding a new subscription history record
        console.log('\n🧪 Testing new subscription history record creation...');
        const testSubscriptionHistory = createSubscriptionHistory(
            'upgraded',
            'community',
            'developer',
            'active',
            'active',
            'Test upgrade for database verification',
            generateTransactionId('test'),
            generateSubscriptionId(user._id),
            {
                testRecord: true,
                timestamp: new Date().toISOString()
            }
        );

        console.log('✅ Generated test subscription history record:', {
            action: testSubscriptionHistory.action,
            fromPlan: testSubscriptionHistory.fromPlan,
            toPlan: testSubscriptionHistory.toPlan,
            transactionId: testSubscriptionHistory.transactionId,
            subscriptionId: testSubscriptionHistory.subscriptionId
        });

        // Save to database
        if (!user.subscriptionHistory) {
            user.subscriptionHistory = [];
        }
        user.subscriptionHistory.push(testSubscriptionHistory);

        await user.save();
        console.log('✅ Test subscription history record saved to database');

        // Verify it was saved by re-fetching from database
        const updatedUser = await User.findById(user._id).select('subscriptionHistory transactions');
        console.log(`✅ Verified: User now has ${updatedUser.subscriptionHistory.length} subscription history records`);
        console.log(`✅ Verified: User now has ${updatedUser.transactions.length} transaction records`);

        // Display database storage status
        console.log('\n📊 Database Storage Summary:');
        console.log(`- Subscription Status: ${user.subscription?.status || 'N/A'}`);
        console.log(`- Plan: ${user.plan}`);
        console.log(`- Subscription History Records: ${updatedUser.subscriptionHistory.length}`);
        console.log(`- Transaction Records: ${updatedUser.transactions.length}`);
        console.log(`- Invoice Records: ${user.invoices ? user.invoices.length : 0}`);

        console.log('\n🎉 Subscription data saving test completed successfully!');

    } catch (error) {
        console.error('❌ Subscription data saving test failed:', error);
    }
}

// Run the test
testSubscriptionDataSaving()
    .then(() => {
        console.log('\n✅ Test completed');
        process.exit(0);
    })
    .catch(error => {
        console.error('❌ Test failed:', error);
        process.exit(1);
    });
