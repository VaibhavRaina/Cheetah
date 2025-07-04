const brevo = require('@getbrevo/brevo');
require('dotenv').config();

// Initialize Brevo API client
const apiInstance = new brevo.TransactionalEmailsApi();
const apiKey = apiInstance.authentications['apiKey'];
apiKey.apiKey = process.env.BREVO_API_KEY;

// Debug API key (remove sensitive parts)
if (process.env.BREVO_API_KEY) {
    console.log('Brevo API Key configured:', process.env.BREVO_API_KEY.substring(0, 20) + '...');
} else {
    console.error('BREVO_API_KEY is not set in environment variables');
}

// Email service class
class EmailService {
    constructor() {
        this.fromEmail = process.env.BREVO_FROM_EMAIL || 'noreply@cheetah.com';
        this.fromName = process.env.BREVO_FROM_NAME || 'Cheetah Team';
        this.supportEmail = process.env.SUPPORT_EMAIL || 'cheetahai69@gmail.com';
    }

    // Send welcome email for new user registration
    async sendWelcomeEmail(user) {
        try {
            const sendSmtpEmail = new brevo.SendSmtpEmail();

            sendSmtpEmail.sender = {
                email: this.fromEmail,
                name: this.fromName
            };

            sendSmtpEmail.to = [{
                email: user.email,
                name: user.name
            }];

            sendSmtpEmail.subject = "Welcome to Cheetah! 🚀";

            sendSmtpEmail.htmlContent = `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <title>Welcome to Cheetah</title>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
                        .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
                        .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>Welcome to Cheetah! 🚀</h1>
                        </div>
                        <div class="content">
                            <h2>Hello ${user.name}!</h2>
                            <p>We're thrilled to have you join our community! Your account has been successfully created and you're ready to start your journey with Cheetah.</p>
                            
                            <h3>Your Account Details:</h3>
                            <ul>
                                <li><strong>Name:</strong> ${user.name}</li>
                                <li><strong>Email:</strong> ${user.email}</li>
                                <li><strong>Current Plan:</strong> ${user.plan || 'Community'}</li>
                                <li><strong>Registration Date:</strong> ${new Date(user.createdAt).toLocaleDateString()}</li>
                            </ul>
                            
                            <p>You're currently on our <strong>${user.plan || 'Community'}</strong> plan. You can upgrade anytime to access more features and increase your message limits.</p>
                            
                            <div style="text-align: center;">
                                <a href="${process.env.FRONTEND_URL}/dashboard" class="button">Go to Dashboard</a>
                            </div>
                            
                            <h3>What's Next?</h3>
                            <ul>
                                <li>Explore your dashboard and familiarize yourself with the interface</li>
                                <li>Try out our AI-powered features</li>
                                <li>Join our community for tips and updates</li>
                                <li>Upgrade to a premium plan for enhanced features</li>
                            </ul>
                            
                            <p>If you have any questions or need assistance, don't hesitate to reach out to our support team.</p>
                        </div>
                        <div class="footer">
                            <p>Thank you for choosing Cheetah!</p>
                            <p>Best regards,<br>The Cheetah Team</p>
                        </div>
                    </div>
                </body>
                </html>
            `;

            sendSmtpEmail.textContent = `
                Welcome to Cheetah! 🚀
                
                Hello ${user.name}!
                
                We're thrilled to have you join our community! Your account has been successfully created and you're ready to start your journey with Cheetah.
                
                Your Account Details:
                - Name: ${user.name}
                - Email: ${user.email}
                - Current Plan: ${user.plan || 'Community'}
                - Registration Date: ${new Date(user.createdAt).toLocaleDateString()}
                
                You're currently on our ${user.plan || 'Community'} plan. You can upgrade anytime to access more features and increase your message limits.
                
                What's Next?
                - Explore your dashboard and familiarize yourself with the interface
                - Try out our AI-powered features
                - Join our community for tips and updates
                - Upgrade to a premium plan for enhanced features
                
                If you have any questions or need assistance, don't hesitate to reach out to our support team.
                
                Visit your dashboard: ${process.env.FRONTEND_URL}/dashboard
                
                Thank you for choosing Cheetah!
                
                Best regards,
                The Cheetah Team
            `;

            const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
            console.log('Welcome email sent successfully:', result);
            return { success: true, messageId: result.messageId };
        } catch (error) {
            console.error('Error sending welcome email:', error);
            if (error.response && error.response.body) {
                console.error('Brevo API Error Details:', error.response.body);
            }
            return { success: false, error: error.message || 'Failed to send welcome email' };
        }
    }

    // Send premium purchase confirmation email
    async sendPremiumPurchaseEmail(user, subscriptionDetails) {
        try {
            const sendSmtpEmail = new brevo.SendSmtpEmail();

            sendSmtpEmail.sender = {
                email: this.fromEmail,
                name: this.fromName
            };

            sendSmtpEmail.to = [{
                email: user.email,
                name: user.name
            }];

            sendSmtpEmail.subject = `Premium Plan Activated - Welcome to ${subscriptionDetails.plan}! 🎉`;

            const planFeatures = this.getPlanFeatures(subscriptionDetails.plan);

            sendSmtpEmail.htmlContent = `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <title>Premium Plan Activated</title>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
                        .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
                        .button { display: inline-block; padding: 12px 30px; background: #28a745; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                        .info-box { background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745; }
                        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>🎉 Premium Plan Activated!</h1>
                        </div>
                        <div class="content">
                            <h2>Congratulations ${user.name}!</h2>
                            <p>Your premium subscription has been successfully activated. You now have access to all the enhanced features and increased limits.</p>
                            
                            <div class="info-box">
                                <h3>📋 Subscription Details:</h3>
                                <ul>
                                    <li><strong>Plan:</strong> ${subscriptionDetails.plan}</li>
                                    <li><strong>Price:</strong> $${subscriptionDetails.price}/${subscriptionDetails.billingCycle}</li>
                                    <li><strong>Message Limit:</strong> ${subscriptionDetails.messages === -1 ? 'Unlimited' : subscriptionDetails.messages} messages</li>
                                    <li><strong>Start Date:</strong> ${new Date(subscriptionDetails.currentPeriodStart).toLocaleDateString()}</li>
                                    <li><strong>Next Billing:</strong> ${new Date(subscriptionDetails.currentPeriodEnd).toLocaleDateString()}</li>
                                    <li><strong>Status:</strong> ${subscriptionDetails.status}</li>
                                    <li><strong>Subscription ID:</strong> ${subscriptionDetails.subscriptionId || 'N/A'}</li>
                                </ul>
                            </div>
                            
                            <h3>🚀 What's Included in Your ${subscriptionDetails.plan} Plan:</h3>
                            <ul>
                                ${planFeatures.map(feature => `<li>${feature}</li>`).join('')}
                            </ul>
                            
                            <div style="text-align: center;">
                                <a href="${process.env.FRONTEND_URL}/dashboard" class="button">Access Your Dashboard</a>
                            </div>
                            
                            <p><strong>Important:</strong> Your subscription will automatically renew on ${new Date(subscriptionDetails.currentPeriodEnd).toLocaleDateString()} unless you cancel before then.</p>
                            
                            <p>Thank you for upgrading to premium! We're committed to providing you with the best experience possible.</p>
                        </div>
                        <div class="footer">
                            <p>Questions about your subscription? Contact our support team.</p>
                            <p>Best regards,<br>The Cheetah Team</p>
                        </div>
                    </div>
                </body>
                </html>
            `;

            const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
            console.log('Premium purchase email sent successfully:', result);
            return { success: true, messageId: result.messageId };
        } catch (error) {
            console.error('Error sending premium purchase email:', error);
            if (error.response && error.response.body) {
                console.error('Brevo API Error Details:', error.response.body);
            }
            return { success: false, error: error.message || 'Failed to send premium purchase email' };
        }
    }

    // Send premium cancellation email
    async sendPremiumCancellationEmail(user, cancellationDetails) {
        try {
            const sendSmtpEmail = new brevo.SendSmtpEmail();

            sendSmtpEmail.sender = {
                email: this.fromEmail,
                name: this.fromName
            };

            sendSmtpEmail.to = [{
                email: user.email,
                name: user.name
            }];

            sendSmtpEmail.subject = "Premium Subscription Cancelled - We're Sorry to See You Go";

            sendSmtpEmail.htmlContent = `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <title>Subscription Cancelled</title>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background: linear-gradient(135deg, #dc3545 0%, #c82333 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
                        .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
                        .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                        .info-box { background: #f8d7da; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc3545; }
                        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>Subscription Cancelled</h1>
                        </div>
                        <div class="content">
                            <h2>We're Sorry to See You Go, ${user.name}</h2>
                            <p>Your premium subscription has been cancelled as requested. We appreciate the time you spent with us and hope you'll consider rejoining in the future.</p>
                            
                            <div class="info-box">
                                <h3>📋 Cancellation Details:</h3>
                                <ul>
                                    <li><strong>Cancelled Plan:</strong> ${cancellationDetails.plan}</li>
                                    <li><strong>Cancellation Date:</strong> ${new Date(cancellationDetails.cancellationDate).toLocaleDateString()}</li>
                                    <li><strong>Access Until:</strong> ${new Date(cancellationDetails.accessUntil).toLocaleDateString()}</li>
                                    <li><strong>Reason:</strong> ${cancellationDetails.reason || 'Not specified'}</li>
                                    <li><strong>Refund Status:</strong> ${cancellationDetails.refundStatus || 'No refund applicable'}</li>
                                    <li><strong>Subscription ID:</strong> ${cancellationDetails.subscriptionId || 'N/A'}</li>
                                </ul>
                            </div>
                            
                            <p><strong>Important:</strong> You'll continue to have access to premium features until ${new Date(cancellationDetails.accessUntil).toLocaleDateString()}. After this date, your account will be moved to our Community plan.</p>
                            
                            <h3>What Happens Next:</h3>
                            <ul>
                                <li>Your premium features remain active until ${new Date(cancellationDetails.accessUntil).toLocaleDateString()}</li>
                                <li>No further charges will be made to your payment method</li>
                                <li>You'll automatically be moved to our Community plan</li>
                                <li>Your account data and settings will be preserved</li>
                            </ul>
                            
                            <div style="text-align: center;">
                                <a href="${process.env.FRONTEND_URL}/dashboard" class="button">Access Your Dashboard</a>
                            </div>
                            
                            <p>We'd love to hear your feedback about your experience. If there's anything we could have done better, please don't hesitate to reach out.</p>
                            
                            <p>Thank you for being part of the Cheetah community!</p>
                        </div>
                        <div class="footer">
                            <p>Want to reactivate? You can upgrade anytime from your dashboard.</p>
                            <p>Best regards,<br>The Cheetah Team</p>
                        </div>
                    </div>
                </body>
                </html>
            `;

            const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
            console.log('Premium cancellation email sent successfully:', result);
            return { success: true, messageId: result.messageId };
        } catch (error) {
            console.error('Error sending premium cancellation email:', error);
            if (error.response && error.response.body) {
                console.error('Brevo API Error Details:', error.response.body);
            }
            return { success: false, error: error.message || 'Failed to send premium cancellation email' };
        }
    }

    // Send support form submission to admin and confirmation to user
    async sendSupportFormSubmission(formData) {
        try {
            // Send to admin
            const adminEmail = new brevo.SendSmtpEmail();
            adminEmail.sender = {
                email: this.fromEmail,
                name: this.fromName
            };
            adminEmail.to = [{
                email: this.supportEmail,
                name: 'Cheetah Support Team'
            }];
            adminEmail.subject = `New Support Request - ${formData.subject}`;
            adminEmail.htmlContent = `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <title>New Support Request</title>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background: #667eea; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
                        .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
                        .info-box { background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2196f3; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>🎫 New Support Request</h1>
                        </div>
                        <div class="content">
                            <div class="info-box">
                                <h3>📋 Request Details:</h3>
                                <ul>
                                    <li><strong>Name:</strong> ${formData.name}</li>
                                    <li><strong>Email:</strong> ${formData.email}</li>
                                    <li><strong>Subject:</strong> ${formData.subject}</li>
                                    <li><strong>Priority:</strong> ${formData.priority || 'Normal'}</li>
                                    <li><strong>Category:</strong> ${formData.category || 'General'}</li>
                                    <li><strong>Submitted:</strong> ${new Date().toLocaleString()}</li>
                                </ul>
                            </div>
                            
                            <h3>📝 Message:</h3>
                            <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #ddd;">
                                ${formData.message.replace(/\n/g, '<br>')}
                            </div>
                            
                            <p><strong>Please respond to this support request as soon as possible.</strong></p>
                        </div>
                    </div>
                </body>
                </html>
            `;

            // Send confirmation to user
            const userEmail = new brevo.SendSmtpEmail();
            userEmail.sender = {
                email: this.fromEmail,
                name: this.fromName
            };
            userEmail.to = [{
                email: formData.email,
                name: formData.name
            }];
            userEmail.subject = `Support Request Received - ${formData.subject}`;
            userEmail.htmlContent = `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <title>Support Request Confirmation</title>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background: #28a745; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
                        .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
                        .info-box { background: #d4edda; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>✅ Support Request Received</h1>
                        </div>
                        <div class="content">
                            <h2>Thank you, ${formData.name}!</h2>
                            <p>We've received your support request and our team will get back to you as soon as possible.</p>
                            
                            <div class="info-box">
                                <h3>📋 Your Request Details:</h3>
                                <ul>
                                    <li><strong>Subject:</strong> ${formData.subject}</li>
                                    <li><strong>Priority:</strong> ${formData.priority || 'Normal'}</li>
                                    <li><strong>Category:</strong> ${formData.category || 'General'}</li>
                                    <li><strong>Submitted:</strong> ${new Date().toLocaleString()}</li>
                                </ul>
                            </div>
                            
                            <h3>📝 Your Message:</h3>
                            <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #ddd;">
                                ${formData.message.replace(/\n/g, '<br>')}
                            </div>
                            
                            <p><strong>What's Next?</strong></p>
                            <ul>
                                <li>Our support team will review your request</li>
                                <li>We'll respond within 24-48 hours</li>
                                <li>For urgent matters, we may contact you directly</li>
                            </ul>
                            
                            <p>If you need to add more information to your request, please reply to this email.</p>
                        </div>
                    </div>
                </body>
                </html>
            `;

            const [adminResult, userResult] = await Promise.all([
                apiInstance.sendTransacEmail(adminEmail),
                apiInstance.sendTransacEmail(userEmail)
            ]);

            console.log('Support form emails sent successfully');
            return {
                success: true,
                adminMessageId: adminResult.messageId,
                userMessageId: userResult.messageId
            };
        } catch (error) {
            console.error('Error sending support form emails:', error);
            if (error.response && error.response.body) {
                console.error('Brevo API Error Details:', error.response.body);
            }
            return { success: false, error: error.message || 'Failed to send emails' };
        }
    }

    // Send contact sales form submission to admin and confirmation to user
    async sendContactSalesFormSubmission(formData) {
        try {
            // Send to admin
            const adminEmail = new brevo.SendSmtpEmail();
            adminEmail.sender = {
                email: this.fromEmail,
                name: this.fromName
            };
            adminEmail.to = [{
                email: this.supportEmail,
                name: 'Cheetah Sales Team'
            }];
            adminEmail.subject = `New Sales Inquiry - ${formData.company || formData.name}`;
            adminEmail.htmlContent = `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <title>New Sales Inquiry</title>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background: #ffc107; color: #212529; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
                        .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
                        .info-box { background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>💼 New Sales Inquiry</h1>
                        </div>
                        <div class="content">
                            <div class="info-box">
                                <h3>📋 Contact Details:</h3>
                                <ul>
                                    <li><strong>Name:</strong> ${formData.name}</li>
                                    <li><strong>Email:</strong> ${formData.email}</li>
                                    <li><strong>Company:</strong> ${formData.company || 'Not provided'}</li>
                                    <li><strong>Phone:</strong> ${formData.phone || 'Not provided'}</li>
                                    <li><strong>Job Title:</strong> ${formData.jobTitle || 'Not provided'}</li>
                                    <li><strong>Company Size:</strong> ${formData.companySize || 'Not provided'}</li>
                                    <li><strong>Interest Level:</strong> ${formData.interestLevel || 'Not specified'}</li>
                                    <li><strong>Budget:</strong> ${formData.budget || 'Not specified'}</li>
                                    <li><strong>Timeline:</strong> ${formData.timeline || 'Not specified'}</li>
                                    <li><strong>Submitted:</strong> ${new Date().toLocaleString()}</li>
                                </ul>
                            </div>
                            
                            <h3>📝 Message:</h3>
                            <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #ddd;">
                                ${formData.message.replace(/\n/g, '<br>')}
                            </div>
                            
                            <p><strong>Please follow up with this sales inquiry promptly.</strong></p>
                        </div>
                    </div>
                </body>
                </html>
            `;

            // Send confirmation to user
            const userEmail = new brevo.SendSmtpEmail();
            userEmail.sender = {
                email: this.fromEmail,
                name: this.fromName
            };
            userEmail.to = [{
                email: formData.email,
                name: formData.name
            }];
            userEmail.subject = "Thank you for your interest in Cheetah Enterprise";
            userEmail.htmlContent = `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <title>Sales Inquiry Confirmation</title>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background: #28a745; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
                        .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
                        .info-box { background: #d4edda; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>✅ Thank You for Your Interest!</h1>
                        </div>
                        <div class="content">
                            <h2>Hello ${formData.name}!</h2>
                            <p>Thank you for your interest in Cheetah Enterprise. We've received your inquiry and our sales team will contact you shortly to discuss how we can help your ${formData.company || 'organization'} achieve its goals.</p>
                            
                            <div class="info-box">
                                <h3>📋 Your Inquiry Details:</h3>
                                <ul>
                                    <li><strong>Company:</strong> ${formData.company || 'Not provided'}</li>
                                    <li><strong>Contact Email:</strong> ${formData.email}</li>
                                    <li><strong>Phone:</strong> ${formData.phone || 'Not provided'}</li>
                                    <li><strong>Interest Level:</strong> ${formData.interestLevel || 'Not specified'}</li>
                                    <li><strong>Timeline:</strong> ${formData.timeline || 'Not specified'}</li>
                                    <li><strong>Submitted:</strong> ${new Date().toLocaleString()}</li>
                                </ul>
                            </div>
                            
                            <h3>📝 Your Message:</h3>
                            <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #ddd;">
                                ${formData.message.replace(/\n/g, '<br>')}
                            </div>
                            
                            <h3>🚀 What's Next?</h3>
                            <ul>
                                <li>Our sales team will review your requirements</li>
                                <li>We'll contact you within 24 hours to schedule a consultation</li>
                                <li>We'll provide a customized solution tailored to your needs</li>
                                <li>We'll discuss pricing and implementation timeline</li>
                            </ul>
                            
                            <p>In the meantime, feel free to explore our platform and try our Community plan to get a feel for what Cheetah can do for your organization.</p>
                            
                            <p>We're excited to potentially work with you!</p>
                        </div>
                    </div>
                </body>
                </html>
            `;

            const [adminResult, userResult] = await Promise.all([
                apiInstance.sendTransacEmail(adminEmail),
                apiInstance.sendTransacEmail(userEmail)
            ]);

            console.log('Contact sales form emails sent successfully');
            return {
                success: true,
                adminMessageId: adminResult.messageId,
                userMessageId: userResult.messageId
            };
        } catch (error) {
            console.error('Error sending contact sales form emails:', error);
            if (error.response && error.response.body) {
                console.error('Brevo API Error Details:', error.response.body);
            }
            return { success: false, error: error.message || 'Failed to send contact sales emails' };
        }
    }

    // Helper method to get plan features
    getPlanFeatures(plan) {
        const features = {
            developer: [
                '600 messages per month',
                'Priority support',
                'Team collaboration features',
                'Advanced analytics',
                'API access'
            ],
            pro: [
                '1,500 messages per month',
                'Priority support',
                'Team collaboration features',
                'Advanced analytics',
                'API access',
                'Custom integrations',
                'SOC2 compliance'
            ],
            max: [
                '4,500 messages per month',
                'Priority support',
                'Team collaboration features',
                'Advanced analytics',
                'API access',
                'Custom integrations',
                'SOC2 compliance',
                'Dedicated account manager',
                'Custom workflows'
            ],
            enterprise: [
                'Unlimited messages',
                '24/7 dedicated support',
                'Advanced team collaboration',
                'Custom analytics and reporting',
                'Full API access',
                'Custom integrations',
                'SOC2 compliance',
                'Dedicated account manager',
                'Custom workflows',
                'On-premise deployment options',
                'SLA guarantees'
            ]
        };

        return features[plan] || features.developer;
    }
}

module.exports = new EmailService();
