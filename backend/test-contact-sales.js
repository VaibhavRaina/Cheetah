const emailService = require('./utils/emailService');

// Test the contact sales form submission
async function testContactSalesForm() {
    console.log('Testing contact sales form submission...');

    const testFormData = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        company: 'Test Company Inc.',
        phone: '+1-555-123-4567',
        jobTitle: 'CTO',
        companySize: '51-200',
        interestLevel: 'Ready to Buy',
        budget: '$10,000 - $50,000',
        timeline: 'Within 1 month',
        message: 'We are interested in implementing CheetahAI for our development team. We need enterprise features and would like to schedule a demo.'
    };

    try {
        const result = await emailService.sendContactSalesFormSubmission(testFormData);

        if (result.success) {
            console.log('✅ Contact sales form test PASSED');
            console.log('Admin Message ID:', result.adminMessageId);
            console.log('User Message ID:', result.userMessageId);
        } else {
            console.log('❌ Contact sales form test FAILED');
            console.log('Error:', result.error);
        }
    } catch (error) {
        console.log('❌ Contact sales form test FAILED with exception');
        console.error('Error:', error);
    }
}

// Run the test
testContactSalesForm();