const emailService = require('./utils/emailService');
require('dotenv').config();

console.log('Testing User Plan Email Notifications...\n');

// Test user object
const testUser = {
    name: 'Test User',
    email: 'test@example.com',
    plan: 'developer'
};

async function testPlanChangeEmails() {
    console.log('🔄 Testing Plan Change Email Notifications...\n');

    try {
        // Test 1: Plan Upgrade Email
        console.log('1. Testing Plan Upgrade Email (Community -> Developer)...');
        const upgradeDetails = {
            plan: 'Developer',
            price: 50,
            billingCycle: 'monthly',
            messages: 600,
            currentPeriodStart: new Date(),
            currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
            status: 'active',
            subscriptionId: 'sub_test_123',
            previousPlan: 'Community'
        };

        const upgradeResult = await emailService.sendPremiumPurchaseEmail(testUser, upgradeDetails);
        console.log('✅ Plan upgrade email result:', upgradeResult.success ? 'SUCCESS' : 'FAILED');
        if (upgradeResult.messageId) {
            console.log('   Message ID:', upgradeResult.messageId);
        }
        if (!upgradeResult.success) {
            console.log('   Error:', upgradeResult.error);
        }
        console.log();

        // Test 2: Plan Downgrade Email
        console.log('2. Testing Plan Downgrade Email (Developer -> Community)...');
        const downgradeDetails = {
            previousPlan: 'Developer',
            newPlan: 'Community',
            downgradeDate: new Date(),
            newLimits: {
                messages: 50
            },
            effectiveImmediately: true
        };

        const downgradeResult = await emailService.sendPlanDowngradeEmail(testUser, downgradeDetails);
        console.log('✅ Plan downgrade email result:', downgradeResult.success ? 'SUCCESS' : 'FAILED');
        if (downgradeResult.messageId) {
            console.log('   Message ID:', downgradeResult.messageId);
        }
        if (!downgradeResult.success) {
            console.log('   Error:', downgradeResult.error);
        }
        console.log();

        // Test 3: Plan Cancellation Email
        console.log('3. Testing Plan Cancellation Email...');
        const cancellationDetails = {
            plan: 'Developer',
            cancellationDate: new Date(),
            accessUntil: new Date(),
            reason: 'User requested cancellation',
            refundStatus: 'No refund applicable',
            subscriptionId: 'sub_test_123',
            feedback: 'No feedback provided'
        };

        const cancellationResult = await emailService.sendPremiumCancellationEmail(testUser, cancellationDetails);
        console.log('✅ Plan cancellation email result:', cancellationResult.success ? 'SUCCESS' : 'FAILED');
        if (cancellationResult.messageId) {
            console.log('   Message ID:', cancellationResult.messageId);
        }
        if (!cancellationResult.success) {
            console.log('   Error:', cancellationResult.error);
        }
        console.log();

        console.log('📧 All user plan email tests completed!');
        console.log('✅ If all tests show SUCCESS, the email notifications are working properly.');
        console.log('📬 Check your email inbox for the test messages.');

    } catch (error) {
        console.error('❌ Error during email testing:', error);
    }
}

// Run the test
testPlanChangeEmails();
