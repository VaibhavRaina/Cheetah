"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    CreditCard,
    ArrowLeft,
    MessageSquare,
    Plus,
    Minus,
    Zap,
    History,
    Calculator,
    CheckCircle,
    Clock,
    AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { rechargeAPI } from "@/lib/api";
import Cookies from 'js-cookie';
import { useToast } from "@/hooks/use-toast";

interface RechargeConfig {
    pricing: {
        pricePerPack: number;
        messagesPerPack: number;
        minMessages: number;
        maxMessages: number;
        increment: number;
    };
    currentBalance: number;
    totalPurchased: number;
    lastRechargeDate: string | null;
}

interface PriceCalculation {
    messages: number;
    totalPrice: number;
    numberOfPacks: number;
    pricePerPack: number;
    messagesPerPack: number;
}

interface RechargeHistory {
    amount: number;
    price: number;
    date: string;
    transactionId: string;
    status: 'completed' | 'pending' | 'failed';
}

const RechargePage = () => {
    const router = useRouter();
    const { toast } = useToast();
    const [config, setConfig] = useState<RechargeConfig | null>(null);
    const [loading, setLoading] = useState(true);
    const [purchasing, setPurchasing] = useState(false);
    const [messages, setMessages] = useState(100);
    const [priceCalculation, setPriceCalculation] = useState<PriceCalculation | null>(null);
    const [history, setHistory] = useState<RechargeHistory[]>([]);
    const [historyLoading, setHistoryLoading] = useState(false);

    useEffect(() => {
        fetchConfig();
        fetchHistory();
    }, []);

    useEffect(() => {
        if (messages >= 100) {
            calculatePrice();
        }
    }, [messages]);

    const fetchConfig = async () => {
        try {
            setLoading(true);
            const token = Cookies.get('auth_token');

            if (!token) {
                router.push('/signup');
                return;
            }

            const response = await rechargeAPI.getConfig();
            setConfig(response.data);
        } catch (err) {
            console.error('Error fetching recharge config:', err);
            toast({
                title: "Error",
                description: "Failed to load recharge configuration",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const fetchHistory = async () => {
        try {
            setHistoryLoading(true);
            const response = await rechargeAPI.getHistory();
            setHistory(response.data.history || []);
        } catch (err) {
            console.error('Error fetching recharge history:', err);
        } finally {
            setHistoryLoading(false);
        }
    };

    const calculatePrice = async () => {
        try {
            const response = await rechargeAPI.calculatePrice(messages);
            setPriceCalculation(response.data);
        } catch (err) {
            console.error('Error calculating price:', err);
        }
    };

    const handlePurchase = async () => {
        if (!priceCalculation) return;

        try {
            setPurchasing(true);
            const response = await rechargeAPI.purchaseRecharge(messages);

            if (response.success) {
                toast({
                    title: "Recharge Successful!",
                    description: `${messages} messages added to your account for $${priceCalculation.totalPrice}`,
                });

                // Refresh data
                await fetchConfig();
                await fetchHistory();

                // Reset form
                setMessages(100);
            } else {
                throw new Error(response.message || 'Purchase failed');
            }
        } catch (error) {
            console.error('Purchase error:', error);
            toast({
                title: "Purchase Failed",
                description: error instanceof Error ? error.message : "Failed to complete purchase",
                variant: "destructive",
            });
        } finally {
            setPurchasing(false);
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed':
                return <CheckCircle className="w-4 h-4 text-green-500" />;
            case 'pending':
                return <Clock className="w-4 h-4 text-yellow-500" />;
            case 'failed':
                return <AlertCircle className="w-4 h-4 text-red-500" />;
            default:
                return <Clock className="w-4 h-4" />;
        }
    };

    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case 'completed':
                return 'default';
            case 'pending':
                return 'secondary';
            case 'failed':
                return 'destructive';
            default:
                return 'secondary';
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
                    <p className="text-muted-foreground">Loading recharge options...</p>
                </motion.div>
            </div>
        );
    }

    if (!config) return null;

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8 max-w-6xl">
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
                            onClick={() => router.push('/dashboard/billing')}
                            className="gap-2"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Billing
                        </Button>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-foreground mb-2">Message Recharge</h1>
                            <p className="text-muted-foreground">Purchase additional messages for any plan</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-muted-foreground">Current Balance</p>
                            <p className="text-2xl font-bold text-accent">{config.currentBalance} messages</p>
                        </div>
                    </div>
                </motion.div>

                <Tabs defaultValue="purchase" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="purchase">Purchase Messages</TabsTrigger>
                        <TabsTrigger value="history">Recharge History</TabsTrigger>
                    </TabsList>

                    {/* Purchase Tab */}
                    <TabsContent value="purchase" className="space-y-6">
                        <div className="grid lg:grid-cols-2 gap-6">
                            {/* Purchase Form */}
                            <Card className="p-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-accent/20 rounded-lg">
                                        <Zap className="w-5 h-5 text-accent" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-foreground">Recharge Messages</h3>
                                        <p className="text-sm text-muted-foreground">Add messages to any plan</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {/* Message Selector */}
                                    <div className="space-y-3">
                                        <Label htmlFor="messages">Number of Messages</Label>
                                        <div className="flex items-center gap-3">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setMessages(Math.max(100, messages - 100))}
                                                disabled={messages <= 100}
                                            >
                                                <Minus className="w-4 h-4" />
                                            </Button>
                                            <Input
                                                id="messages"
                                                type="number"
                                                value={messages}
                                                onChange={(e) => {
                                                    const value = parseInt(e.target.value) || 100;
                                                    const roundedValue = Math.round(value / 100) * 100;
                                                    setMessages(Math.max(100, Math.min(1000, roundedValue)));
                                                }}
                                                min={100}
                                                max={1000}
                                                step={100}
                                                className="text-center"
                                            />
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setMessages(Math.min(1000, messages + 100))}
                                                disabled={messages >= 1000}
                                            >
                                                <Plus className="w-4 h-4" />
                                            </Button>
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            Minimum: {config.pricing.minMessages} messages • Maximum: {config.pricing.maxMessages} messages
                                        </p>
                                    </div>

                                    {/* Quick Select Buttons */}
                                    <div className="grid grid-cols-3 gap-2">
                                        {[100, 300, 500].map((amount) => (
                                            <Button
                                                key={amount}
                                                variant={messages === amount ? "default" : "outline"}
                                                size="sm"
                                                onClick={() => setMessages(amount)}
                                            >
                                                {amount} msgs
                                            </Button>
                                        ))}
                                    </div>

                                    {/* Price Display */}
                                    {priceCalculation && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="p-4 bg-accent/5 rounded-lg border border-accent/20"
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm text-muted-foreground">Total Price</span>
                                                <span className="text-2xl font-bold text-foreground">${priceCalculation.totalPrice}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-muted-foreground">Number of packs</span>
                                                <span className="text-foreground">{priceCalculation.numberOfPacks} × ${priceCalculation.pricePerPack}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm mt-1">
                                                <span className="text-muted-foreground">Price per message</span>
                                                <span className="text-foreground">${(priceCalculation.totalPrice / priceCalculation.messages).toFixed(2)}</span>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Purchase Button */}
                                    <Button
                                        onClick={handlePurchase}
                                        disabled={purchasing || !priceCalculation || messages < 100}
                                        className="w-full"
                                        size="lg"
                                    >
                                        {purchasing ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <CreditCard className="w-4 h-4 mr-2" />
                                                Purchase {messages} Messages for ${priceCalculation?.totalPrice || 0}
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </Card>

                            {/* Pricing Info */}
                            <Card className="p-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-blue-500/20 rounded-lg">
                                        <Calculator className="w-5 h-5 text-blue-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-foreground">Pricing Information</h3>
                                        <p className="text-sm text-muted-foreground">How our recharge system works</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="p-4 bg-gradient-to-r from-accent/10 to-accent/5 rounded-lg border border-accent/20">
                                        <div className="flex items-center gap-2 mb-2">
                                            <MessageSquare className="w-4 h-4 text-accent" />
                                            <span className="font-medium text-foreground">Base Package</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground mb-1">
                                            {config.pricing.messagesPerPack} messages for ${config.pricing.pricePerPack}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Simple pack-based pricing
                                        </p>
                                    </div>

                                    <div className="p-4 bg-card rounded-lg border">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Plus className="w-4 h-4 text-green-500" />
                                            <span className="font-medium text-foreground">Pack-Based Pricing</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground mb-1">
                                            Every {config.pricing.messagesPerPack} messages = ${config.pricing.pricePerPack}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Simple and consistent pricing
                                        </p>
                                    </div>

                                    <div className="pt-4 border-t">
                                        <h4 className="font-medium text-foreground mb-2">Key Features</h4>
                                        <ul className="space-y-1 text-sm text-muted-foreground">
                                            <li>• Works with any plan</li>
                                            <li>• Messages never expire</li>
                                            <li>• Used after plan messages</li>
                                            <li>• Instant activation</li>
                                        </ul>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Current Balance Summary */}
                        <Card className="p-6 bg-gradient-to-r from-accent/5 to-accent/10 border-accent/20">
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-foreground mb-1">{config.currentBalance}</div>
                                    <div className="text-sm text-muted-foreground">Current Balance</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-foreground mb-1">{config.totalPurchased}</div>
                                    <div className="text-sm text-muted-foreground">Total Purchased</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-foreground mb-1">
                                        {config.lastRechargeDate ?
                                            new Date(config.lastRechargeDate).toLocaleDateString() :
                                            'Never'
                                        }
                                    </div>
                                    <div className="text-sm text-muted-foreground">Last Recharge</div>
                                </div>
                            </div>
                        </Card>
                    </TabsContent>

                    {/* History Tab */}
                    <TabsContent value="history" className="space-y-6">
                        <Card className="p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-purple-500/20 rounded-lg">
                                    <History className="w-5 h-5 text-purple-500" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-foreground">Recharge History</h3>
                                    <p className="text-sm text-muted-foreground">Your message purchase history</p>
                                </div>
                            </div>

                            {historyLoading ? (
                                <div className="text-center py-8">
                                    <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                                    <p className="text-sm text-muted-foreground">Loading history...</p>
                                </div>
                            ) : history.length > 0 ? (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Messages</TableHead>
                                            <TableHead>Price</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Transaction ID</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {history.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    {new Date(item.date).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <MessageSquare className="w-4 h-4 text-accent" />
                                                        {item.amount}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="font-medium">${item.price}</TableCell>
                                                <TableCell>
                                                    <Badge variant={getStatusBadgeVariant(item.status)} className="gap-1">
                                                        {getStatusIcon(item.status)}
                                                        {item.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="font-mono text-sm text-muted-foreground">
                                                    {item.transactionId}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            ) : (
                                <div className="text-center py-8">
                                    <MessageSquare className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                                    <h4 className="text-lg font-medium text-foreground mb-2">No Recharge History</h4>
                                    <p className="text-muted-foreground">You haven't purchased any message recharges yet.</p>
                                </div>
                            )}
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default RechargePage;