const brevo = require('@getbrevo/brevo');
require('dotenv').config();

async function testBrevoConnection() {
    console.log('Testing Brevo API connection...');

    // Check if API key is loaded
    console.log('API Key from env:', process.env.BREVO_API_KEY ? 'Present' : 'Missing');

    if (!process.env.BREVO_API_KEY) {
        console.error('BREVO_API_KEY is not set in environment variables');
        return;
    }

    // Initialize Brevo API client
    const apiInstance = new brevo.TransactionalEmailsApi();
    const apiKey = apiInstance.authentications['apiKey'];
    apiKey.apiKey = process.env.BREVO_API_KEY;

    console.log('API Key configured (first 20 chars):', process.env.BREVO_API_KEY.substring(0, 20) + '...');

    try {
        // Test with a simple email
        const sendSmtpEmail = new brevo.SendSmtpEmail();

        sendSmtpEmail.sender = {
            email: process.env.BREVO_FROM_EMAIL || 'noreply@cheetahai.co',
            name: process.env.BREVO_FROM_NAME || 'Cheetah AI'
        };

        sendSmtpEmail.to = [{
            email: 'test@example.com',
            name: 'Test User'
        }];

        sendSmtpEmail.subject = "Test Email";
        sendSmtpEmail.htmlContent = "<html><body><h1>Test</h1></body></html>";

        console.log('Attempting to send test email...');
        const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log('✅ Brevo API connection successful!');
        console.log('Message ID:', result.messageId);

    } catch (error) {
        console.error('❌ Brevo API connection failed:');
        console.error('Error:', error.message);

        if (error.response) {
            console.error('Status Code:', error.response.statusCode);
            console.error('Response Body:', error.response.body);
        }

        // Common issues and solutions
        if (error.message.includes('unauthorized') || error.message.includes('Key not found')) {
            console.log('\n🔧 Troubleshooting:');
            console.log('1. Check if your Brevo API key is correct');
            console.log('2. Make sure the API key has the right permissions');
            console.log('3. Verify your Brevo account is active');
            console.log('4. Generate a new API key from Brevo dashboard');
        }
    }
}

// Run the test
testBrevoConnection();
