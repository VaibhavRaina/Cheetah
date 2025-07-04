# Email Notification System - Documentation

## Overview

The Cheetah email notification system sends automatic emails for all subscription changes using Brevo (formerly Sendinblue) as the email service provider.

## Email Types

### 1. Subscription Emails

#### Premium Purchase/Upgrade Email
- **Trigger**: When user upgrades to a paid plan (Developer, Pro, Max)
- **Subject**: "Activated to [Plan Name] Plan - Welcome! 🎉" or "Upgraded to [Plan Name] Plan - Welcome! 🎉"
- **Content**: 
  - Congratulations message
  - Full subscription details (plan, price, billing cycle, message limits)
  - Plan features list
  - Important billing information
  - Dashboard access link

#### Premium Cancellation Email
- **Trigger**: When user cancels their paid subscription
- **Subject**: "Premium Subscription Cancelled - We're Sorry to See You Go"
- **Content**:
  - Cancellation confirmation
  - Cancellation details (plan, date, access until, reason, feedback)
  - What happens next
  - Option to reactivate before period ends

#### Plan Downgrade Email
- **Trigger**: When user downgrades to Community plan
- **Subject**: "Plan Changed - Now on Community Plan"
- **Content**:
  - Downgrade confirmation
  - Plan change details
  - New feature limitations
  - Option to upgrade again

#### Premium Reactivation Email
- **Trigger**: When user reactivates a cancelled subscription
- **Subject**: "Subscription Reactivated - Welcome Back! 🎉"
- **Content**:
  - Reactivation confirmation
  - Plan features restoration
  - Next billing information

### 2. Account Emails

#### Welcome Email
- **Trigger**: New user registration
- **Subject**: "Welcome to Cheetah! 🚀"
- **Content**:
  - Welcome message
  - Account details
  - Getting started guide

### 3. Support Emails

#### Contact Form Submission
- **To Admin**: New support request notification
- **To User**: Support request confirmation

## Email Configuration

### Environment Variables
```env
# Email Configuration (Brevo)
BREVO_API_KEY=xkeysib-[your-api-key]
BREVO_FROM_EMAIL=noreply@cheetahai.co
BREVO_FROM_NAME=Cheetah AI
SUPPORT_EMAIL=cheetahai69@gmail.com
FRONTEND_URL=http://localhost:3000
```

### Email Service Features
- **HTML and Text Content**: All emails include both HTML and plain text versions
- **Responsive Design**: Mobile-friendly email templates
- **Professional Styling**: Consistent branding and design
- **Error Handling**: Comprehensive error logging and graceful fallbacks
- **Message ID Tracking**: All emails return unique message IDs for tracking

## Implementation Details

### Email Service Location
- **File**: `backend/utils/emailService.js`
- **Service**: Brevo (Sendinblue) API
- **Rate Limits**: 1000 emails per hour (as per Brevo free tier)

### Subscription Route Integration
- **File**: `backend/routes/subscription.js`
- **Email Triggers**:
  - Plan change (upgrade/downgrade)
  - Subscription cancellation
  - Subscription reactivation

### Error Handling
- Email failures don't block subscription operations
- Detailed error logging for debugging
- Try-catch blocks around all email operations

## Troubleshooting

### If Users Aren't Receiving Emails

#### 1. Check Spam/Junk Folder
Most common issue - emails often end up in spam folder due to:
- New sending domain
- Automated email patterns
- User's email provider settings

**Solution**: Ask users to check spam folder and whitelist `noreply@cheetahai.co`

#### 2. Verify Email Address
- Ensure user registered with correct email address
- Check for typos in email field
- Verify email is active and receiving other emails

#### 3. Email Provider Blocks
Some email providers (especially corporate) block automated emails:
- Gmail: Usually works well
- Outlook/Hotmail: May delay or block
- Corporate emails: Often have strict filtering

#### 4. Brevo Account Status
Check Brevo dashboard for:
- API key validity
- Account status
- Daily/monthly sending limits
- Delivery statistics

#### 5. Server Logs
Check backend logs for:
```bash
# Success logs
Premium purchase email sent successfully: [message-id]

# Error logs
Failed to send premium purchase email: [error-details]
Error sending premium purchase email: [error-details]
```

#### 6. DNS/Domain Issues
Verify sending domain configuration:
- SPF records
- DKIM authentication
- Domain reputation

### Testing Email System

#### Manual Test Script
Run the test script to verify email functionality:
```bash
cd backend
node test-subscription-email.js
```

#### Expected Results
- All 4 email types should return success status
- Each email should get a unique message ID
- No error messages in console

#### Test Email Addresses
Use these for testing:
- `test@example.com` (for testing only)
- Your personal email (for real delivery testing)

### Common Error Messages

#### "BREVO_API_KEY is not set"
- Check `.env` file exists
- Verify API key is correctly set
- Restart server after changing environment variables

#### "Failed to send email: Invalid API key"
- API key expired or incorrect
- Check Brevo account status
- Generate new API key if needed

#### "Network error"
- Internet connectivity issues
- Brevo service outage
- Firewall blocking HTTPS requests

## Email Delivery Best Practices

### 1. Domain Reputation
- Use consistent sender domain
- Avoid spam trigger words
- Maintain low bounce rates

### 2. Email Content
- Clear, professional subject lines
- Balanced text-to-image ratio
- Include unsubscribe links (for marketing emails)

### 3. Sending Patterns
- Avoid sending bursts of emails
- Respect rate limits
- Monitor delivery statistics

### 4. User Experience
- Provide email confirmation pages
- Allow users to resend emails
- Clear instructions about checking spam folders

## Monitoring and Analytics

### Brevo Dashboard
Monitor email performance:
- Delivery rates
- Open rates
- Bounce rates
- Spam complaints

### Application Logs
Track email operations:
- Successful sends
- Failed attempts
- Error patterns

### User Feedback
Collect user reports about:
- Missing emails
- Spam folder issues
- Delivery delays

## Future Improvements

### 1. Email Templates
- More personalized content
- Dynamic content based on user data
- A/B testing for subject lines

### 2. Delivery Optimization
- Multiple email providers for redundancy
- Smart retry logic for failed sends
- Delivery time optimization

### 3. User Preferences
- Email notification settings
- Preferred email format (HTML/text)
- Frequency controls

### 4. Analytics
- Email engagement tracking
- Delivery success metrics
- User behavior analysis

## API Documentation

### Email Service Methods

#### `sendPremiumPurchaseEmail(user, subscriptionDetails)`
Sends confirmation email for plan upgrades/purchases.

**Parameters:**
- `user`: User object with name, email
- `subscriptionDetails`: Object with plan, price, billing cycle, etc.

**Returns:**
```javascript
{
  success: boolean,
  messageId: string
}
```

#### `sendPremiumCancellationEmail(user, cancellationDetails)`
Sends confirmation email for subscription cancellation.

#### `sendPlanDowngradeEmail(user, downgradeDetails)`
Sends confirmation email for plan downgrade.

#### `sendPremiumReactivationEmail(user, reactivationDetails)`
Sends confirmation email for subscription reactivation.

## Support

For email delivery issues:
1. Check troubleshooting guide above
2. Review server logs
3. Test with script: `node test-subscription-email.js`
4. Contact Brevo support if needed
5. Consider alternative email providers for critical issues
