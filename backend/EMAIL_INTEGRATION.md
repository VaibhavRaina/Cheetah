# Email Integration with Brevo

This document explains the email integration setup using Brevo (formerly Sendinblue) for the Cheetah application.

## Features Implemented

### 1. Welcome Email
- **Trigger**: When a new user registers
- **Recipients**: New user
- **Content**: Welcome message with account details, current plan info, and next steps
- **Template**: HTML and text versions included

### 2. Premium Purchase Confirmation
- **Trigger**: When a user upgrades to a premium plan
- **Recipients**: User who purchased premium
- **Content**: Subscription details, plan features, billing information, and access instructions
- **Template**: Includes all subscription details and features

### 3. Premium Cancellation Confirmation
- **Trigger**: When a user cancels their premium subscription
- **Recipients**: User who cancelled
- **Content**: Cancellation details, access until date, and feedback acknowledgment
- **Template**: Professional cancellation confirmation with retention messaging

### 4. Support Form Submissions
- **Trigger**: When someone submits the contact/support form
- **Recipients**: 
  - Admin: cheetahai69@gmail.com (notification)
  - User: Confirmation email
- **Content**: Complete form submission details including priority, category, and message
- **Template**: Structured admin notification and user confirmation

### 5. Contact Sales Form Submissions
- **Trigger**: When someone submits the contact sales form
- **Recipients**: 
  - Admin: cheetahai69@gmail.com (notification)
  - User: Confirmation email
- **Content**: Complete inquiry details including company info, budget, timeline, and requirements
- **Template**: Sales inquiry format with all relevant business information

## API Endpoints

### Contact Support
```
POST /api/contact
```
**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Need help with setup",
  "message": "I am having trouble setting up my account...",
  "priority": "Normal", // Optional: Low, Normal, High, Urgent
  "category": "Technical" // Optional: General, Technical, Billing, Feature Request, Bug Report
}
```

### Contact Sales
```
POST /api/contact/sales
```
**Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@company.com",
  "company": "ABC Corp",
  "phone": "+1-555-123-4567",
  "jobTitle": "CTO",
  "companySize": "51-200",
  "interestLevel": "Ready to Buy",
  "budget": "$10,000 - $50,000",
  "timeline": "Within 1 month",
  "message": "We are interested in your enterprise solution..."
}
```

## Environment Variables

Make sure these are set in your `.env` file:

```env
# Brevo Configuration
BREVO_API_KEY=your_brevo_api_key_here
BREVO_FROM_EMAIL=noreply@cheetahai.co
BREVO_FROM_NAME=Cheetah AI

# Support Email
SUPPORT_EMAIL=cheetahai69@gmail.com

# Frontend URL (for email links)
FRONTEND_URL=http://localhost:3000
```

## Testing

Run the email test script to verify everything is working:

```bash
node test-email.js
```

This will test all email types with sample data.

## Email Templates

All emails include:
- Professional HTML templates with responsive design
- Plain text fallbacks
- Consistent branding
- Clear call-to-action buttons
- Complete information display
- Contact information for support

## Error Handling

The email service includes comprehensive error handling:
- Graceful failure (application continues if email fails)
- Detailed error logging
- Success/failure status returns
- Retry mechanisms for transient failures

## Integration Points

### User Registration
- File: `routes/auth.js`
- Function: Registration handler
- Email: Welcome email sent after successful registration

### Subscription Management
- File: `routes/subscription.js`
- Functions: Plan upgrade and cancellation handlers
- Emails: Premium purchase and cancellation confirmations

### Contact Forms
- File: `routes/contact.js`
- Functions: Support and sales form handlers
- Emails: Admin notifications and user confirmations

## Email Service Structure

```
utils/emailService.js
├── sendWelcomeEmail()
├── sendPremiumPurchaseEmail()
├── sendPremiumCancellationEmail()
├── sendSupportFormSubmission()
├── sendContactSalesFormSubmission()
└── getPlanFeatures() // Helper method
```

## Brevo Configuration

1. Sign up for Brevo account
2. Generate API key from account settings
3. Configure sender email and name
4. Set up domain authentication (recommended)
5. Configure SMTP settings if needed

## Frontend Integration

Make sure your frontend forms post to the correct endpoints:
- Support form: `POST /api/contact`
- Sales form: `POST /api/contact/sales`

Both endpoints handle validation and send appropriate emails.

## Monitoring

Monitor email delivery through:
- Brevo dashboard
- Application logs
- Email delivery webhooks (if configured)
- Error tracking in your monitoring system

## Security

- All user input is validated and sanitized
- Email templates prevent XSS attacks
- Rate limiting applied to form submissions
- API key stored securely in environment variables
