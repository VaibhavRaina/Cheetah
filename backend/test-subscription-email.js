const emailService = require('./utils/emailService');
require('dotenv').config();

// Test user data
const testUser = {
    _id: '507f1f77bcf86cd799439011',
    name: 'Test User',
    email: 'test@example.com',
    plan: 'community',
    createdAt: new Date(),
    subscription: {
        status: 'active',
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        cancelAtPeriodEnd: false,
        stripeSubscriptionId: 'sub_test123'
    }
};

// Test subscription details
const subscriptionDetails = {
    plan: 'Pro',
    price: 100,
    billingCycle: 'monthly',
    messages: 1500,
    currentPeriodStart: new Date(),
    currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    status: 'active',
    subscriptionId: 'sub_test123',
    previousPlan: 'Community'
};

async function testSubscriptionEmails() {
    console.log('🚀 Testing subscription email functionality...\n');

    try {
        // Test premium purchase email
        console.log('1. Testing premium purchase email...');
        const purchaseResult = await emailService.sendPremiumPurchaseEmail(testUser, subscriptionDetails);

        if (purchaseResult.success) {
            console.log('✅ Premium purchase email sent successfully!');
            console.log('   Message ID:', purchaseResult.messageId);
        } else {
            console.log('❌ Premium purchase email failed:');
            console.log('   Error:', purchaseResult.error);
        }

        console.log('\n2. Testing premium cancellation email...');
        const cancellationDetails = {
            plan: 'Pro',
            cancellationDate: new Date(),
            accessUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            reason: 'Testing cancellation email',
            refundStatus: 'No refund applicable',
            subscriptionId: 'sub_test123',
            feedback: 'Just testing the email system'
        };

        const cancelResult = await emailService.sendPremiumCancellationEmail(testUser, cancellationDetails);

        if (cancelResult.success) {
            console.log('✅ Premium cancellation email sent successfully!');
            console.log('   Message ID:', cancelResult.messageId);
        } else {
            console.log('❌ Premium cancellation email failed:');
            console.log('   Error:', cancelResult.error);
        }

        console.log('\n3. Testing plan downgrade email...');
        const downgradeDetails = {
            previousPlan: 'Pro',
            newPlan: 'Community',
            downgradeDate: new Date(),
            newLimits: {
                messages: 50
            },
            effectiveImmediately: true
        };

        const downgradeResult = await emailService.sendPlanDowngradeEmail(testUser, downgradeDetails);

        if (downgradeResult.success) {
            console.log('✅ Plan downgrade email sent successfully!');
            console.log('   Message ID:', downgradeResult.messageId);
        } else {
            console.log('❌ Plan downgrade email failed:');
            console.log('   Error:', downgradeResult.error);
        }

        console.log('\n4. Testing premium reactivation email...');
        const reactivationDetails = {
            plan: 'Pro',
            reactivationDate: new Date(),
            nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            subscriptionId: 'sub_test123'
        };

        const reactivationResult = await emailService.sendPremiumReactivationEmail(testUser, reactivationDetails);

        if (reactivationResult.success) {
            console.log('✅ Premium reactivation email sent successfully!');
            console.log('   Message ID:', reactivationResult.messageId);
        } else {
            console.log('❌ Premium reactivation email failed:');
            console.log('   Error:', reactivationResult.error);
        }

        console.log('\n📊 Email Testing Summary:');
        console.log('- Premium Purchase Email:', purchaseResult.success ? '✅ Success' : '❌ Failed');
        console.log('- Premium Cancellation Email:', cancelResult.success ? '✅ Success' : '❌ Failed');
        console.log('- Plan Downgrade Email:', downgradeResult.success ? '✅ Success' : '❌ Failed');
        console.log('- Premium Reactivation Email:', reactivationResult.success ? '✅ Success' : '❌ Failed');

    } catch (error) {
        console.error('❌ Test failed with error:', error);
    }
}

// Run the test
testSubscriptionEmails().then(() => {
    console.log('\n✅ Email test completed!');
    process.exit(0);
}).catch(error => {
    console.error('❌ Test failed:', error);
    process.exit(1);
});
