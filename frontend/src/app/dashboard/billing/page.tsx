"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    CreditCard,
    Calendar,
    Download,
    ArrowLeft,
    MessageSquare,
    TrendingUp,
    Clock,
    CheckCircle,
    AlertCircle,
    FileText,
    DollarSign,
    Activity,
    Zap,
    Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { billingAPI, userAPI } from "@/lib/api";
import Cookies from 'js-cookie';
import { useToast } from "@/hooks/use-toast";

interface BillingData {
    customer: {
        name: string;
        email: string;
    };
    creditBalance: number;
    currentPlan: {
        name: string;
        messagesLimit: number;
        messagesUsed: number;
        price: number;
        billingCycle: string;
        nextBillingDate: string | null;
        daysUntilRenewal: number | null;
        status: string;
    };
    recharge?: {
        balance: number;
        totalPurchased: number;
        lastRechargeDate: string | null;
    };
    usageHistory: Array<{
        date: string;
        messages: number;
    }>;
    invoices: Array<{
        id: string;
        date: string;
        amount: number;
        status: 'paid' | 'pending' | 'overdue';
        downloadUrl?: string;
    }>;
}

interface Transaction {
    id: string;
    type: 'upgrade' | 'downgrade' | 'cancellation' | 'payment' | 'refund';
    amount: number;
    description: string;
    date: string;
    status: 'completed' | 'pending' | 'failed';
    fromPlan?: string;
    toPlan?: string;
    metadata?: Record<string, any>;
}

interface TransactionData {
    transactions: Transaction[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
    };
    summary: {
        totalAmount: number;
        typeBreakdown: Record<string, number>;
    };
}

const BillingPage = () => {
    const router = useRouter();
    const { toast } = useToast();
    const [billingData, setBillingData] = useState<BillingData | null>(null);
    const [transactionData, setTransactionData] = useState<TransactionData | null>(null);
    const [loading, setLoading] = useState(true);
    const [transactionLoading, setTransactionLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchBillingData();
        fetchTransactionData();
    }, []);

    const fetchBillingData = async () => {
        try {
            setLoading(true);
            const token = Cookies.get('auth_token');

            if (!token) {
                router.push('/signup');
                return;
            }

            const response = await billingAPI.getBillingOverview();
            setBillingData(response.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const fetchTransactionData = async (page: number = 1, limit: number = 10, type?: string) => {
        try {
            setTransactionLoading(true);
            const response = await userAPI.getTransactions(page, limit, type);
            setTransactionData(response.data);
        } catch (err) {
            console.error('Error fetching transactions:', err);
            // Don't set error state for transaction fetch failure
        } finally {
            setTransactionLoading(false);
        }
    };

    const downloadInvoice = async (invoiceId: string) => {
        try {
            const blob = await billingAPI.downloadInvoice(invoiceId);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = `invoice-${invoiceId}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (err) {
            console.error('Error downloading invoice:', err);
        }
    };

    // Handle subscription cancellation
    const handleCancelSubscription = async () => {
        if (billingData?.currentPlan.name === 'Community') {
            toast({
                title: "No subscription to cancel",
                description: "You are already on the community plan.",
                variant: "destructive",
            });
            return;
        }

        try {
            // Show loading state
            toast({
                title: "Cancelling subscription...",
                description: "Please wait while we process your cancellation.",
            });

            // Call API to cancel subscription
            const response = await userAPI.cancelSubscription();

            if (response.success) {
                // Refresh billing data
                await fetchBillingData();

                toast({
                    title: "Subscription cancelled successfully!",
                    description: "You have been downgraded to the Community plan. You can upgrade again at any time.",
                });
            } else {
                throw new Error(response.message || 'Failed to cancel subscription');
            }
        } catch (error) {
            console.error('Cancel subscription error:', error);
            toast({
                title: "Error cancelling subscription",
                description: error instanceof Error ? error.message : "Failed to cancel subscription. Please try again.",
                variant: "destructive",
            });
        }
    };

    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case 'paid':
                return 'default';
            case 'pending':
                return 'secondary';
            case 'overdue':
                return 'destructive';
            default:
                return 'secondary';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'paid':
                return <CheckCircle className="w-4 h-4" />;
            case 'pending':
                return <Clock className="w-4 h-4" />;
            case 'overdue':
                return <AlertCircle className="w-4 h-4" />;
            default:
                return <Clock className="w-4 h-4" />;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading billing information...</p>
                </motion.div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
                    <h2 className="text-lg font-semibold text-foreground mb-2">Error Loading Billing Data</h2>
                    <p className="text-muted-foreground mb-4">{error}</p>
                    <Button onClick={() => fetchBillingData()}>Try Again</Button>
                </motion.div>
            </div>
        );
    }

    if (!billingData) return null;

    const usagePercentage = (billingData.currentPlan.messagesUsed / billingData.currentPlan.messagesLimit) * 100;

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => router.push('/dashboard')}
                            className="gap-2"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Dashboard
                        </Button>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-foreground mb-2">Billing & Usage</h1>
                            <p className="text-muted-foreground">Manage your account billing and view usage history</p>
                        </div>
                    </div>
                </motion.div>

                {/* Account Information */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-8"
                >
                    <Card className="p-6 bg-gradient-to-r from-accent/5 to-accent/10 border-accent/20">
                        <h2 className="text-xl font-semibold text-foreground mb-4">Account Information</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Customer name</label>
                                <p className="text-foreground font-medium">{billingData.customer.name}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Contact email</label>
                                <p className="text-foreground font-medium">{billingData.customer.email}</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 mt-6">
                            <div className="flex items-center gap-2 p-4 bg-card rounded-lg border">
                                <MessageSquare className="w-5 h-5 text-accent" />
                                <div>
                                    <span className="text-sm text-muted-foreground block">Plan Messages Remaining</span>
                                    <span className="font-semibold text-foreground">{billingData.creditBalance} Messages</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 p-4 bg-card rounded-lg border">
                                <Zap className="w-5 h-5 text-green-500" />
                                <div>
                                    <span className="text-sm text-muted-foreground block">Recharge Balance</span>
                                    <span className="font-semibold text-foreground">{billingData.recharge?.balance || 0} Messages</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4">
                            <Button
                                onClick={() => router.push('/dashboard/recharge')}
                                variant="outline"
                                className="gap-2"
                            >
                                <Plus className="w-4 h-4" />
                                Recharge Messages
                            </Button>
                        </div>
                    </Card>
                </motion.div>

                {/* Main Content Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Tabs defaultValue="overview" className="space-y-6">
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="usage">Usage History</TabsTrigger>
                            <TabsTrigger value="transactions">Transactions</TabsTrigger>
                            <TabsTrigger value="invoices">Invoice History</TabsTrigger>
                        </TabsList>

                        {/* Overview Tab */}
                        <TabsContent value="overview" className="space-y-6">
                            <div className="grid lg:grid-cols-2 gap-6">
                                {/* Current Plan */}
                                <Card className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold text-foreground">Current Plan</h3>
                                        <Badge variant="secondary">{billingData.currentPlan.name}</Badge>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-muted-foreground">Monthly Price</span>
                                            <span className="font-semibold text-foreground">${billingData.currentPlan.price}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-muted-foreground">Next Billing Date</span>
                                            <span className="font-medium text-foreground">
                                                {(() => {
                                                    if (billingData.currentPlan.name === 'Community' || !billingData.currentPlan.nextBillingDate) {
                                                        return '∞';
                                                    }

                                                    const billingDate = new Date(billingData.currentPlan.nextBillingDate);
                                                    const now = new Date();

                                                    if (billingDate <= now) {
                                                        return 'Expired';
                                                    }

                                                    return billingDate.toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    });
                                                })()}
                                            </span>
                                        </div>

                                        {/* Show subscription status for non-community plans */}
                                        {billingData.currentPlan.name !== 'Community' && (
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-muted-foreground">Status</span>
                                                <Badge
                                                    variant={billingData.currentPlan.status === 'active' ? 'default' : 'destructive'}
                                                    className={billingData.currentPlan.status === 'active' ? 'bg-green-100 text-green-700' : ''}
                                                >
                                                    {billingData.currentPlan.status === 'active' ? 'Active' : 'Inactive'}
                                                </Badge>
                                            </div>
                                        )}

                                    </div>
                                </Card>

                                {/* Usage Overview */}
                                <Card className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold text-foreground">Current Usage</h3>
                                        <Activity className="w-5 h-5 text-accent" />
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm text-muted-foreground">Messages Used</span>
                                                <span className="text-sm font-medium text-foreground">
                                                    {billingData.currentPlan.messagesUsed} / {billingData.currentPlan.messagesLimit}
                                                </span>
                                            </div>
                                            <Progress value={usagePercentage} className="h-2" />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-muted-foreground">Billing Period</span>
                                            <span className="font-medium text-foreground">{billingData.currentPlan.billingCycle}</span>
                                        </div>

                                    </div>
                                </Card>
                            </div>

                            {/* Quick Stats */}
                            <div className="grid md:grid-cols-3 gap-4">
                                <Card className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-accent/20 rounded-lg">
                                            <MessageSquare className="w-5 h-5 text-accent" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Total Messages</p>
                                            <p className="text-xl font-bold text-foreground">{billingData.currentPlan.messagesUsed}</p>
                                        </div>
                                    </div>
                                </Card>

                                <Card className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-green-500/20 rounded-lg">
                                            <TrendingUp className="w-5 h-5 text-green-500" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Credits Remaining</p>
                                            <p className="text-xl font-bold text-foreground">{billingData.creditBalance}</p>
                                        </div>
                                    </div>
                                </Card>

                                <Card className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-500/20 rounded-lg">
                                            <Calendar className="w-5 h-5 text-blue-500" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Days Until Renewal</p>
                                            <p className="text-xl font-bold text-foreground">
                                                {(() => {
                                                    if (billingData.currentPlan.name === 'Community' || !billingData.currentPlan.nextBillingDate) {
                                                        return '∞';
                                                    }

                                                    if (billingData.currentPlan.daysUntilRenewal !== null) {
                                                        return billingData.currentPlan.daysUntilRenewal;
                                                    }

                                                    // Fallback calculation
                                                    const billingDate = new Date(billingData.currentPlan.nextBillingDate);
                                                    const now = new Date();
                                                    const timeDiff = billingDate.getTime() - now.getTime();
                                                    const daysLeft = Math.max(0, Math.ceil(timeDiff / (1000 * 60 * 60 * 24)));

                                                    return daysLeft;
                                                })()}
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </TabsContent>

                        {/* Usage History Tab */}
                        <TabsContent value="usage" className="space-y-6">
                            <Card className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold text-foreground">Usage History</h3>
                                    <Badge variant="outline" className="text-accent border-accent/20">
                                        Current billing period
                                    </Badge>
                                </div>

                                {billingData.usageHistory && billingData.usageHistory.length > 0 ? (
                                    <div className="space-y-6">
                                        {/* Chart Container */}
                                        <div className="relative bg-gradient-to-br from-card to-card/50 rounded-lg p-6 border">
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="text-sm font-medium text-muted-foreground">User Message</span>
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                                                    <span>Messages per day</span>
                                                </div>
                                            </div>

                                            {/* Y-axis labels and chart */}
                                            <div className="relative">
                                                {/* Y-axis */}
                                                <div className="absolute left-0 top-0 h-64 flex flex-col justify-between text-xs text-muted-foreground">
                                                    {(() => {
                                                        const maxMessages = Math.max(...billingData.usageHistory.map(d => d.messages));
                                                        const steps = 4;
                                                        const stepValue = Math.ceil(maxMessages / steps);
                                                        return Array.from({ length: steps + 1 }, (_, i) => (
                                                            <span key={i} className="text-right pr-2">
                                                                {maxMessages - (i * stepValue)}
                                                            </span>
                                                        ));
                                                    })()}
                                                </div>

                                                {/* Chart area */}
                                                <div className="ml-8 relative">
                                                    {/* Grid lines */}
                                                    <div className="absolute inset-0 flex flex-col justify-between">
                                                        {Array.from({ length: 5 }, (_, i) => (
                                                            <div key={i} className="h-px bg-muted/30"></div>
                                                        ))}
                                                    </div>

                                                    {/* Bars */}
                                                    <div className="flex items-end justify-between h-64 relative">
                                                        {billingData.usageHistory.slice(-30).map((day, index) => {
                                                            const maxMessages = Math.max(...billingData.usageHistory.map(d => d.messages));
                                                            const height = maxMessages > 0 ? (day.messages / maxMessages) * 100 : 0;
                                                            const hasData = day.messages > 0;

                                                            return (
                                                                <div key={day.date} className="flex flex-col items-center group relative">
                                                                    {/* Tooltip */}
                                                                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                                                        <div className="bg-foreground text-background text-xs px-3 py-2 rounded-lg shadow-lg">
                                                                            <div className="font-medium">{new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                                                                            <div className="text-center">{day.messages} messages</div>
                                                                        </div>
                                                                    </div>

                                                                    {/* Bar */}
                                                                    <motion.div
                                                                        initial={{ height: 0, opacity: 0 }}
                                                                        animate={{ height: `${height}%`, opacity: 1 }}
                                                                        transition={{
                                                                            delay: index * 0.02,
                                                                            duration: 0.8,
                                                                            ease: [0.23, 1, 0.320, 1]
                                                                        }}
                                                                        className={`w-4 rounded-t-sm transition-all duration-200 ${hasData
                                                                            ? 'bg-gradient-to-t from-accent to-accent/80 hover:from-accent/80 hover:to-accent shadow-sm'
                                                                            : 'bg-muted/20'
                                                                            }`}
                                                                        style={{ minHeight: hasData ? '4px' : '2px' }}
                                                                    />
                                                                </div>
                                                            );
                                                        })}
                                                    </div>

                                                    {/* X-axis labels */}
                                                    <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
                                                        {billingData.usageHistory.slice(-30).map((day, index) => {
                                                            // Show only every 5th date to avoid crowding
                                                            if (index % 5 === 0 || index === billingData.usageHistory.slice(-30).length - 1) {
                                                                return (
                                                                    <span key={day.date} className="transform -rotate-45 origin-bottom-left">
                                                                        {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                                    </span>
                                                                );
                                                            }
                                                            return <span key={day.date}></span>;
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Stats */}
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="bg-card rounded-lg p-4 border">
                                                <div className="text-sm text-muted-foreground mb-1">Total Messages</div>
                                                <div className="text-2xl font-bold text-foreground">
                                                    {billingData.usageHistory.reduce((sum, day) => sum + day.messages, 0)}
                                                </div>
                                            </div>
                                            <div className="bg-card rounded-lg p-4 border">
                                                <div className="text-sm text-muted-foreground mb-1">Peak Day</div>
                                                <div className="text-2xl font-bold text-foreground">
                                                    {billingData.usageHistory.length > 0 ?
                                                        Math.max(...billingData.usageHistory.map(d => d.messages)) :
                                                        0
                                                    }
                                                </div>
                                            </div>
                                            <div className="bg-card rounded-lg p-4 border">
                                                <div className="text-sm text-muted-foreground mb-1">Average/Day</div>
                                                <div className="text-2xl font-bold text-foreground">
                                                    {billingData.usageHistory.length > 0 ?
                                                        Math.round(billingData.usageHistory.reduce((sum, day) => sum + day.messages, 0) / billingData.usageHistory.length) :
                                                        0
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <div className="mx-auto w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mb-4">
                                            <Activity className="w-8 h-8 text-muted-foreground" />
                                        </div>
                                        <h4 className="text-lg font-medium text-foreground mb-2">No usage data available</h4>
                                        <p className="text-sm text-muted-foreground">Start using Cheetah AI to see your usage history</p>
                                    </div>
                                )}
                            </Card>
                        </TabsContent>

                        {/* Transaction History Tab */}
                        <TabsContent value="transactions" className="space-y-6">
                            <Card className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-foreground">Transaction History</h3>
                                    {transactionData && transactionData.pagination && (
                                        <Badge variant="secondary">
                                            {transactionData.pagination.totalItems} transactions
                                        </Badge>
                                    )}
                                </div>

                                {transactionLoading ? (
                                    <div className="flex justify-center items-center py-12">
                                        <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                ) : !transactionData || !transactionData.transactions || transactionData.transactions.length === 0 ? (
                                    <div className="text-center py-12">
                                        <Activity className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                                        <p className="text-lg text-muted-foreground">No transactions yet</p>
                                        <p className="text-sm text-muted-foreground">Your plan changes and payments will appear here</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {/* Transaction Summary */}
                                        {transactionData && transactionData.summary && transactionData.pagination && (
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                                <div className="bg-muted/50 rounded-lg p-4">
                                                    <div className="flex items-center gap-2">
                                                        <DollarSign className="w-5 h-5 text-green-600" />
                                                        <span className="text-sm font-medium">Total Amount</span>
                                                    </div>
                                                    <p className="text-2xl font-bold text-foreground mt-2">
                                                        ${transactionData.summary.totalAmount.toFixed(2)}
                                                    </p>
                                                </div>
                                                <div className="bg-muted/50 rounded-lg p-4">
                                                    <div className="flex items-center gap-2">
                                                        <TrendingUp className="w-5 h-5 text-blue-600" />
                                                        <span className="text-sm font-medium">Total Transactions</span>
                                                    </div>
                                                    <p className="text-2xl font-bold text-foreground mt-2">
                                                        {transactionData.pagination.totalItems}
                                                    </p>
                                                </div>
                                                <div className="bg-muted/50 rounded-lg p-4">
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="w-5 h-5 text-orange-600" />
                                                        <span className="text-sm font-medium">This Month</span>
                                                    </div>
                                                    <p className="text-2xl font-bold text-foreground mt-2">
                                                        {transactionData.transactions.filter(t =>
                                                            new Date(t.date).getMonth() === new Date().getMonth() &&
                                                            new Date(t.date).getFullYear() === new Date().getFullYear()
                                                        ).length}
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        {/* Transaction List */}
                                        {transactionData && transactionData.transactions && transactionData.transactions.length > 0 && (
                                            <div className="overflow-x-auto">
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow>
                                                            <TableHead>Date</TableHead>
                                                            <TableHead>Type</TableHead>
                                                            <TableHead>Description</TableHead>
                                                            <TableHead>Amount</TableHead>
                                                            <TableHead>Status</TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {transactionData.transactions.map((transaction, index) => (
                                                            <motion.tr
                                                                key={transaction.id}
                                                                initial={{ opacity: 0, y: 10 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                transition={{ delay: index * 0.05 }}
                                                                className="border-b"
                                                            >
                                                                <TableCell>
                                                                    <div className="flex flex-col">
                                                                        <span className="text-sm font-medium">
                                                                            {new Date(transaction.date).toLocaleDateString()}
                                                                        </span>
                                                                        <span className="text-xs text-muted-foreground">
                                                                            {new Date(transaction.date).toLocaleTimeString()}
                                                                        </span>
                                                                    </div>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Badge
                                                                        variant={
                                                                            transaction.type === 'upgrade' ? 'default' :
                                                                                transaction.type === 'downgrade' ? 'secondary' :
                                                                                    transaction.type === 'cancellation' ? 'destructive' :
                                                                                        transaction.type === 'payment' ? 'default' :
                                                                                            'outline'
                                                                        }
                                                                        className="capitalize"
                                                                    >
                                                                        {transaction.type}
                                                                    </Badge>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <div className="flex flex-col">
                                                                        <span className="text-sm font-medium">
                                                                            {transaction.description}
                                                                        </span>
                                                                        {transaction.fromPlan && transaction.toPlan && (
                                                                            <span className="text-xs text-muted-foreground">
                                                                                {transaction.fromPlan} → {transaction.toPlan}
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <span className={`font-medium ${transaction.amount > 0 ? 'text-green-600' :
                                                                        transaction.amount < 0 ? 'text-red-600' :
                                                                            'text-muted-foreground'
                                                                        }`}>
                                                                        {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                                                                    </span>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Badge
                                                                        variant={
                                                                            transaction.status === 'completed' ? 'default' :
                                                                                transaction.status === 'pending' ? 'secondary' :
                                                                                    'destructive'
                                                                        }
                                                                        className="gap-1"
                                                                    >
                                                                        {transaction.status === 'completed' && <CheckCircle className="w-3 h-3" />}
                                                                        {transaction.status === 'pending' && <Clock className="w-3 h-3" />}
                                                                        {transaction.status === 'failed' && <AlertCircle className="w-3 h-3" />}
                                                                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                                                                    </Badge>
                                                                </TableCell>
                                                            </motion.tr>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        )}

                                        {/* Pagination (if needed) */}
                                        {transactionData && transactionData.pagination && transactionData.pagination.totalPages > 1 && (
                                            <div className="flex justify-center items-center gap-2 mt-6">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => fetchTransactionData(transactionData.pagination.currentPage - 1)}
                                                    disabled={transactionData.pagination.currentPage === 1}
                                                >
                                                    Previous
                                                </Button>
                                                <span className="text-sm text-muted-foreground">
                                                    Page {transactionData.pagination.currentPage} of {transactionData.pagination.totalPages}
                                                </span>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => fetchTransactionData(transactionData.pagination.currentPage + 1)}
                                                    disabled={transactionData.pagination.currentPage === transactionData.pagination.totalPages}
                                                >
                                                    Next
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </Card>
                        </TabsContent>

                        {/* Invoice History Tab */}
                        <TabsContent value="invoices" className="space-y-6">
                            <Card className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-foreground">Invoices</h3>
                                    {billingData.invoices.length === 0 && (
                                        <Badge variant="secondary">No invoices</Badge>
                                    )}
                                </div>

                                {billingData.invoices.length === 0 ? (
                                    <div className="text-center py-12">
                                        <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                                        <p className="text-lg text-muted-foreground">No unpaid invoices at this time</p>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Date</TableHead>
                                                    <TableHead>Amount</TableHead>
                                                    <TableHead>Status</TableHead>
                                                    <TableHead>Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {billingData.invoices.map((invoice, index) => (
                                                    <motion.tr
                                                        key={invoice.id}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: index * 0.05 }}
                                                        className="border-b"
                                                    >
                                                        <TableCell>
                                                            {new Date(invoice.date).toLocaleDateString()}
                                                        </TableCell>
                                                        <TableCell className="font-medium">
                                                            ${invoice.amount.toFixed(2)}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Badge
                                                                variant={getStatusBadgeVariant(invoice.status)}
                                                                className="gap-1"
                                                            >
                                                                {getStatusIcon(invoice.status)}
                                                                {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => downloadInvoice(invoice.id)}
                                                                className="gap-2"
                                                            >
                                                                <Download className="w-4 h-4" />
                                                                Download
                                                            </Button>
                                                        </TableCell>
                                                    </motion.tr>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                )}
                            </Card>
                        </TabsContent>
                    </Tabs>
                </motion.div>
            </div>
        </div>
    );
};

export default BillingPage;
