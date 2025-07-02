# Cheetah API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Response Format

All API responses follow this format:

```json
{
  "success": boolean,
  "message": "string",
  "data": object | null,
  "meta": object | null,
  "timestamp": "ISO 8601 string"
}
```

## Endpoints

### Authentication

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePassword123!"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePassword123!"
}
```

#### Get Current User
```http
GET /auth/me
Authorization: Bearer <token>
```

#### Verify Email
```http
POST /auth/verify-email
Content-Type: application/json

{
  "token": "verification-token-from-email"
}
```

#### Forgot Password
```http
POST /auth/forgot-password
Content-Type: application/json

{
  "email": "john@example.com"
}
```

#### Reset Password
```http
POST /auth/reset-password
Content-Type: application/json

{
  "token": "reset-token-from-email",
  "password": "NewSecurePassword123!"
}
```

### User Management

#### Get Profile
```http
GET /user/profile
Authorization: Bearer <token>
```

#### Update Profile
```http
PUT /user/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Smith",
  "avatar": "https://example.com/avatar.jpg",
  "preferences": {
    "emailNotifications": true,
    "marketingEmails": false,
    "theme": "dark"
  }
}
```

#### Get Usage Statistics
```http
GET /user/usage
Authorization: Bearer <token>
```

### Subscription Management

#### Get Available Plans
```http
GET /subscription/plans
```

#### Get Current Subscription
```http
GET /subscription/current
Authorization: Bearer <token>
```

#### Change Plan
```http
POST /subscription/change-plan
Authorization: Bearer <token>
Content-Type: application/json

{
  "planId": "pro",
  "billingCycle": "monthly"
}
```

#### Cancel Subscription
```http
POST /subscription/cancel
Authorization: Bearer <token>
Content-Type: application/json

{
  "reason": "Too expensive",
  "feedback": "Great service but out of my budget"
}
```

### Dashboard

#### Get Dashboard Overview
```http
GET /dashboard/overview
Authorization: Bearer <token>
```

#### Get User Statistics
```http
GET /dashboard/stats?period=30d
Authorization: Bearer <token>
```

#### Get Notifications
```http
GET /dashboard/notifications?page=1&limit=10&unreadOnly=false
Authorization: Bearer <token>
```

#### Get Activity Log
```http
GET /dashboard/activity?page=1&limit=20&type=auth
Authorization: Bearer <token>
```

## Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 423 | Locked (Account temporarily locked) |
| 429 | Too Many Requests |
| 500 | Internal Server Error |

## Rate Limiting

- 100 requests per 15 minutes per IP address
- Message usage limits based on subscription plan

## Plan Limits

| Plan | Monthly Messages | Features |
|------|------------------|----------|
| Community | 50 | Basic features |
| Developer | 600 | Team features, SOC 2 |
| Pro | 1,500 | Advanced features, Priority support |
| Max | 4,500 | Custom training, Dedicated support |
| Enterprise | Unlimited | All features |

## Status Codes

### Authentication Errors
- `AUTH_001`: Invalid credentials
- `AUTH_002`: Account locked
- `AUTH_003`: Email not verified
- `AUTH_004`: Token expired
- `AUTH_005`: Token invalid

### Validation Errors
- `VAL_001`: Missing required field
- `VAL_002`: Invalid email format
- `VAL_003`: Password too weak
- `VAL_004`: Invalid plan ID

### Usage Errors
- `USG_001`: Message limit exceeded
- `USG_002`: Feature not available on current plan
- `USG_003`: Subscription expired

## Examples

### Complete Registration Flow

1. **Register**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePassword123!"
  }'
```

2. **Verify Email** (use token from email)
```bash
curl -X POST http://localhost:5000/api/auth/verify-email \
  -H "Content-Type: application/json" \
  -d '{
    "token": "verification-token-here"
  }'
```

3. **Login**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePassword123!"
  }'
```

4. **Access Protected Route**
```bash
curl -X GET http://localhost:5000/api/dashboard/overview \
  -H "Authorization: Bearer your-jwt-token-here"
```

### Subscription Management Flow

1. **Get Available Plans**  
```bash
curl -X GET http://localhost:5000/api/subscription/plans
```

2. **Upgrade to Pro Plan**
```bash
curl -X POST http://localhost:5000/api/subscription/change-plan \
  -H "Authorization: Bearer your-jwt-token" \
  -H "Content-Type: application/json" \
  -d '{
    "planId": "pro",
    "billingCycle": "monthly"
  }'
```

3. **Check Usage**
```bash
curl -X GET http://localhost:5000/api/user/usage \
  -H "Authorization: Bearer your-jwt-token"
```

## Testing

You can test the API using tools like:
- Postman
- Insomnia  
- curl
- HTTPie

Import the provided Postman collection for easy testing of all endpoints.
