# Rate Limiting Configuration Updated

## 🔧 Changes Made

### **General API Requests**
- **Window**: 5 minutes (300,000ms)
- **Max Requests**: 500 per 5 minutes
- **Applies to**: All API endpoints except auth

### **Authentication Requests**
- **Window**: 15 minutes (900,000ms)
- **Max Attempts**: 20 per 15 minutes
- **Applies to**: `/api/auth/*` endpoints only
- **Smart Feature**: Doesn't count successful requests against the limit

## 📊 Before vs After

| Type | Before | After |
|------|--------|-------|
| General | 100 requests/15min | 500 requests/5min |
| Auth | Same as general | 20 attempts/15min |
| User Experience | Very restrictive | User-friendly |

## 🎯 Benefits

1. **Multiple Account Testing**: Users can try different OAuth accounts without hitting limits
2. **Development Friendly**: Much higher limits for testing
3. **Smart Auth Limiting**: Only failed auth attempts count against the limit
4. **Faster Reset**: General limits reset every 5 minutes instead of 15

## 🔒 Security Features Maintained

- **Auth Protection**: Still protects against brute force attacks
- **DDoS Protection**: High general limits but still reasonable
- **IP-based Tracking**: Prevents abuse from single sources
- **Graceful Degradation**: Clear error messages when limits hit

## 🚀 How It Works Now

### For Regular Users:
- Can make 500 API calls every 5 minutes (very generous)
- Can try OAuth login up to 20 times every 15 minutes
- Successful logins don't count against auth limit

### For Developers:
- No more "too many requests" errors during normal development
- Can test multiple OAuth flows without issues
- Reasonable protection against actual attacks

The rate limiting is now much more user-friendly while maintaining security! 🎉
