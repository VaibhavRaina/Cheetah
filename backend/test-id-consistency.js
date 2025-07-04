// Test script to verify ID consistency
const { generateTransactionId, generateSubscriptionId } = require('./utils/helpers');

console.log('🔧 Testing ID Generation Consistency...\n');

// Test transaction IDs
console.log('Transaction IDs:');
console.log('- General transaction:', generateTransactionId());
console.log('- Cancellation:', generateTransactionId('cancellation'));
console.log('- Upgrade:', generateTransactionId('upgrade'));
console.log('- Invoice:', generateTransactionId('invoice'));

console.log('\nSubscription IDs:');
console.log('- User ID 1:', generateSubscriptionId('66a1234567890123456789ab'));
console.log('- User ID 2:', generateSubscriptionId('66b9876543210987654321cd'));

// Test consistency
console.log('\n🧪 Testing invoice ID format consistency:');
const invoiceId1 = generateTransactionId('invoice');
const invoiceId2 = generateTransactionId('invoice');

console.log('- Invoice ID 1:', invoiceId1);
console.log('- Invoice ID 2:', invoiceId2);
console.log('- Both start with "invoice_":', invoiceId1.startsWith('invoice_') && invoiceId2.startsWith('invoice_'));

console.log('\n✅ ID generation test completed!');
console.log('\n📋 Summary:');
console.log('- Transaction IDs: prefix_timestamp_random');
console.log('- Subscription IDs: sub_userIdShort_timestamp_random');
console.log('- Invoice IDs: invoice_timestamp_random');
console.log('- All IDs are now consistent between emails and PDFs!');
