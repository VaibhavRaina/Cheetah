// Test script to verify transaction API endpoints
const User = require('./models/User');
const { generateTransactionId, createTransaction } = require('./utils/helpers');

async function testTransactionSystem() {
    console.log('🧪 Testing Transaction System...\n');

    try {
        // Find a test user (or create one)
        let user = await User.findOne({ email: { $not: /@placeholder\.local$/ } });
        if (!user) {
            console.log('❌ No test user found. Please create a user first.');
            return;
        }

        console.log(`✅ Using test user: ${user.email}`);

        // Test transaction creation
        const transactionId = generateTransactionId();
        const transaction = createTransaction({
            type: 'upgrade',
            description: 'Test upgrade from Community to Developer',
            amount: 50,
            fromPlan: 'Community',
            toPlan: 'Developer',
            metadata: {
                testTransaction: true,
                timestamp: new Date().toISOString()
            }
        });

        console.log('✅ Generated transaction:', {
            id: transactionId,
            type: transaction.type,
            description: transaction.description,
            amount: transaction.amount
        });

        // Add transaction to user
        if (!user.transactions) {
            user.transactions = [];
        }
        user.transactions.push({ ...transaction, id: transactionId });
        await user.save();

        console.log('✅ Transaction added to user successfully');

        // Test fetching transactions
        const userWithTransactions = await User.findById(user._id).select('transactions');
        console.log(`✅ User now has ${userWithTransactions.transactions.length} transactions`);

        // Display last few transactions
        const recentTransactions = userWithTransactions.transactions.slice(-3);
        console.log('\n📊 Recent transactions:');
        recentTransactions.forEach((t, index) => {
            console.log(`${index + 1}. ${t.type.toUpperCase()} - ${t.description} - $${t.amount} (${t.status})`);
        });

        console.log('\n🎉 Transaction system test completed successfully!');

    } catch (error) {
        console.error('❌ Transaction system test failed:', error);
    }
}

// Run the test
testTransactionSystem()
    .then(() => {
        console.log('\n✅ Test completed');
        process.exit(0);
    })
    .catch(error => {
        console.error('❌ Test failed:', error);
        process.exit(1);
    });
