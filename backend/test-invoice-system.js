// Test script to verify invoice system integration
const User = require('./models/User');
const { createInvoice, generateTransactionId } = require('./utils/helpers');

async function testInvoiceSystem() {
    console.log('🧪 Testing Invoice System Integration...\n');

    try {
        // Find a test user
        let user = await User.findOne({ email: { $not: /@placeholder\.local$/ } });
        if (!user) {
            console.log('❌ No test user found. Please create a user first.');
            return;
        }

        console.log(`✅ Using test user: ${user.email}`);
        console.log(`📊 Current plan: ${user.plan}`);
        console.log(`📊 Current invoices: ${user.invoices ? user.invoices.length : 0}`);

        // Test invoice creation
        const invoice = createInvoice(user, 50, 'Test Developer Plan Invoice', [
            {
                description: 'Developer Plan - Monthly',
                quantity: 1,
                amount: 50
            }
        ]);

        console.log('\n✅ Generated test invoice:', {
            id: invoice.id,
            amount: invoice.amount,
            description: invoice.description,
            status: invoice.status,
            dueDate: invoice.dueDate
        });

        // Add invoice to user
        if (!user.invoices) {
            user.invoices = [];
        }
        user.invoices.push(invoice);

        await user.save();
        console.log('✅ Invoice saved to user account');

        // Test fetching invoices
        const userWithInvoices = await User.findById(user._id).select('invoices');
        console.log(`✅ User now has ${userWithInvoices.invoices.length} invoices`);

        // Display recent invoices
        console.log('\n📋 Recent invoices:');
        userWithInvoices.invoices.slice(-3).forEach((inv, index) => {
            console.log(`${index + 1}. ${inv.id} - $${inv.amount} - ${inv.status} - ${new Date(inv.date).toLocaleDateString()}`);
        });

        // Test billing overview data structure
        console.log('\n📊 Testing billing overview data structure...');
        const billingOverview = {
            customer: {
                name: user.name,
                email: user.email
            },
            currentPlan: {
                name: user.plan.charAt(0).toUpperCase() + user.plan.slice(1),
                price: user.plan === 'community' ? 0 : user.plan === 'developer' ? 50 : 100,
                messagesLimit: user.usage ? user.usage.messagesLimit : 50,
                messagesUsed: user.usage ? user.usage.messagesUsed : 0
            },
            invoices: user.invoices || [],
            transactions: user.transactions || []
        };

        console.log('✅ Billing overview structure:', {
            customer: billingOverview.customer.name,
            currentPlan: billingOverview.currentPlan.name,
            invoiceCount: billingOverview.invoices.length,
            transactionCount: billingOverview.transactions.length
        });

        console.log('\n🎉 Invoice system integration test completed successfully!');

    } catch (error) {
        console.error('❌ Invoice system test failed:', error);
    }
}

// Run the test
testInvoiceSystem()
    .then(() => {
        console.log('\n✅ Test completed');
        process.exit(0);
    })
    .catch(error => {
        console.error('❌ Test failed:', error);
        process.exit(1);
    });
