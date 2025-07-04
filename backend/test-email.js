// Test file to verify email integration
const emailService = require('./utils/emailService');

// Test user data
const testUser = {
    name: 'Test User',
    email: 'test@example.com',
    plan: 'pro',
    createdAt: new Date(),
    _id: '507f1f77bcf86cd799439011'
};

// Test subscription data
const testSubscription = {
    plan: 'Pro',
    price: 100,
    billingCycle: 'monthly',
    messages: 1500,
    currentPeriodStart: new Date(),
    currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    status: 'active',
    subscriptionId: 'sub_1234567890'
};

// Test cancellation data
const testCancellation = {
    plan: 'Pro',
    cancellationDate: new Date(),
    accessUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    reason: 'Cost concerns',
    refundStatus: 'No refund applicable',
    subscriptionId: 'sub_1234567890'
};

// Test contact form data
const testContactForm = {
    name: 'John Doe',
    email: 'john@example.com',
    subject: 'Need help with setup',
    message: 'I am having trouble setting up my account. Can you please help?',
    priority: 'Normal',
    category: 'Technical'
};

// Test contact sales form data
const testContactSalesForm = {
    name: 'Jane Smith',
    email: 'jane@company.com',
    company: 'ABC Corp',
    phone: '+1-555-123-4567',
    jobTitle: 'CTO',
    companySize: '51-200',
    interestLevel: 'Ready to Buy',
    budget: '$10,000 - $50,000',
    timeline: 'Within 1 month',
    message: 'We are interested in your enterprise solution for our team of 100 developers.'
};

async function testEmailService() {
    console.log('Testing email service...\n');

    try {
        // Test 1: Welcome email
        console.log('1. Testing welcome email...');
        const welcomeResult = await emailService.sendWelcomeEmail(testUser);
        console.log('Welcome email result:', welcomeResult);
        console.log('');

        // Test 2: Premium purchase email
        console.log('2. Testing premium purchase email...');
        const purchaseResult = await emailService.sendPremiumPurchaseEmail(testUser, testSubscription);
        console.log('Premium purchase email result:', purchaseResult);
        console.log('');

        // Test 3: Premium cancellation email
        console.log('3. Testing premium cancellation email...');
        const cancellationResult = await emailService.sendPremiumCancellationEmail(testUser, testCancellation);
        console.log('Premium cancellation email result:', cancellationResult);
        console.log('');

        // Test 4: Support form submission
        console.log('4. Testing support form submission...');
        const supportResult = await emailService.sendSupportFormSubmission(testContactForm);
        console.log('Support form submission result:', supportResult);
        console.log('');

        // Test 5: Contact sales form submission
        console.log('5. Testing contact sales form submission...');
        const salesResult = await emailService.sendContactSalesFormSubmission(testContactSalesForm);
        console.log('Contact sales form submission result:', salesResult);
        console.log('');

        console.log('All email tests completed!');

    } catch (error) {
        console.error('Error testing email service:', error);
    }
}

// Run tests if this file is executed directly
if (require.main === module) {
    testEmailService();
}

module.exports = { testEmailService };
