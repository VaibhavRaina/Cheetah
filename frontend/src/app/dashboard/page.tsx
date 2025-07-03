"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    MessageSquare,
    Calendar,
    CreditCard,
    CheckCircle,
    Clock,
    ArrowRight,
    User,
    Settings,
    LogOut,
    Bell,
    HelpCircle,
    ChevronsUpDown,
    X,
    Users,
    Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Container from "@/components/global/container";
import Icons from "@/components/global/icons";
import { cn } from "@/lib";
import { PLANS } from "@/constants/plans";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import { dashboardAPI, userAPI } from "@/lib/api";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

export default function DashboardPage() {
    const { user, loading, logout, refreshUser } = useAuth();
    const { toast } = useToast();
    const router = useRouter();
    const [selectedPlan, setSelectedPlan] = useState("community");
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [pendingPlan, setPendingPlan] = useState<string | null>(null);
    const [showMoreFeatures, setShowMoreFeatures] = useState(false);
    const [confirmChange, setConfirmChange] = useState(false);
    const [dashboardData, setDashboardData] = useState<any>(null);

    // Redirect if not authenticated
    useEffect(() => {
        if (!loading && !user) {
            router.push('/signup');
        }
    }, [user, loading, router]);

    // Load dashboard data
    const loadDashboardData = useCallback(async () => {
        try {
            const response = await dashboardAPI.getOverview();
            if (response.success) {
                setDashboardData(response.data);
            }
        } catch (error) {
            console.error('Failed to load dashboard data:', error);
            // Use toast directly inside the function, not as a dependency
            toast({
                title: "Error",
                description: "Failed to load dashboard data",
                variant: "destructive",
            });
        }
    }, []); // Remove toast from dependencies

    useEffect(() => {
        if (user) {
            loadDashboardData();
        }
    }, [user, loadDashboardData]);

    const handleLogout = async () => {
        try {
            await logout();
            router.push('/signup');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    // Show loading if auth is initializing or user data is not available
    if (loading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    // Extended plans including the original ones from the dashboard
    const allPlans = [
        {
            id: "community",
            title: "Free",
            desc: "Perfect for getting started with essential features.",
            monthlyPrice: 0,
            annuallyPrice: 0,
            buttonText: "Download",
            features: [
                "Up to 50 user messages",
                "Context Engine",
                "MCP & Native Tools",
                "Unlimited Next Edits & Completions",
                "Community support",
                "Additional user messages $10/100",
                "AI training allowed"
            ],
            link: "#"
        },
        {
            id: "developer",
            title: "Developer Plan",
            desc: "For individuals or small teams that want to ship to production, fast.",
            monthlyPrice: 50,
            annuallyPrice: 500,
            buttonText: "Start Coding",
            features: [
                "Everything in community",
                "Up to 600 user messages",
                "Team management, up to 100 users",
                "SOC 2 type II",
                "Additional user messages $10/100",
                "No AI training allowed"
            ],
            link: "#"
        },
        {
            id: "pro",
            title: "Pro Plan",
            desc: "For growing teams that need more power and flexibility.",
            monthlyPrice: 100,
            annuallyPrice: 1000,
            buttonText: "Upgrade to Pro",
            features: [
                "Everything in developer",
                "Up to 1,500 user messages",
                "Advanced team management",
                "Priority support",
                "Custom integrations",
                "Advanced analytics",
                "No AI training allowed"
            ],
            link: "#"
        },
        {
            id: "max",
            title: "Max Plan",
            desc: "For large teams and organizations with high usage needs.",
            monthlyPrice: 250,
            annuallyPrice: 2500,
            buttonText: "Upgrade to Max",
            features: [
                "Everything in pro",
                "Up to 4,500 user messages",
                "Unlimited team members",
                "24/7 priority support",
                "Advanced security features",
                "Custom training",
                "Dedicated account manager",
                "No AI training allowed"
            ],
            link: "#"
        }
    ];

    // Get current plan details
    const getCurrentPlan = () => {
        return allPlans.find(plan => plan.id === user?.plan) || allPlans[0];
    };

    // Get pending plan details for confirmation
    const getPendingPlan = () => {
        return allPlans.find(plan => plan.id === pendingPlan) || null;
    };

    // Handle plan selection
    const handlePlanSelect = (planId: string) => {
        if (planId !== user?.plan) {
            setPendingPlan(planId);
            setShowConfirmDialog(true);
        }
        setSelectedPlan(planId);
    };

    // Handle plan change confirmation
    const handleConfirmPlanChange = async () => {
        if (pendingPlan && confirmChange) {
            try {
                // Show loading state
                toast({
                    title: "Updating plan...",
                    description: "Please wait while we update your plan.",
                });

                // Call API to update plan
                const response = await userAPI.updatePlan(pendingPlan);

                if (response.success) {
                    // Refresh user data and dashboard data
                    await refreshUser();
                    await loadDashboardData();

                    toast({
                        title: "Plan updated successfully!",
                        description: `Your plan has been changed to ${response.data.plan.name}. Usage has been reset.`,
                    });
                } else {
                    throw new Error(response.message || 'Failed to update plan');
                }

                setShowConfirmDialog(false);
                setPendingPlan(null);
                setConfirmChange(false);
            } catch (error) {
                console.error('Plan update error:', error);
                toast({
                    title: "Error updating plan",
                    description: error instanceof Error ? error.message : "Failed to update plan. Please try again.",
                    variant: "destructive",
                });

                // Reset to current plan
                setSelectedPlan(user?.plan || 'community');
            }
        }
    };

    // Handle cancel confirmation
    const handleCancelConfirmation = () => {
        setShowConfirmDialog(false);
        setPendingPlan(null);
        setConfirmChange(false);
        setSelectedPlan(user?.plan || 'community');
    };

    // Handle subscription cancellation
    const handleCancelSubscription = async () => {
        if (user?.plan === 'community') {
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
                // Refresh user data and dashboard data
                await refreshUser();
                await loadDashboardData();

                toast({
                    title: "Subscription cancelled successfully!",
                    description: `You have been downgraded to the Community plan. You can upgrade again at any time.`,
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

    const currentPlanData = getCurrentPlan();
    const pendingPlanData = getPendingPlan();

    return (
        <div className="min-h-screen bg-background">
            {/* Main Content */}
            <div className="p-6 md:p-8">
                <Container className="max-w-4xl mx-auto">
                    <motion.div
                        className="space-y-8"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Header */}
                        <motion.div variants={itemVariants}>
                            <h1 className="text-3xl font-semibold text-foreground mb-2">
                                Welcome, {user.name}
                            </h1>
                            <p className="text-muted-foreground">
                                Manage your subscription and billing details.
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={user.avatar || undefined} alt={user.name} />
                                    <AvatarFallback>
                                        {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="text-sm text-muted-foreground">
                                    {user.email} • {user.plan.charAt(0).toUpperCase() + user.plan.slice(1)} Plan
                                </div>
                            </div>
                        </motion.div>

                        {/* User Messages Section */}
                        <motion.div variants={itemVariants}>
                            <Card className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold text-foreground">User Messages</h2>
                                    <Link href="/dashboard/billing" className="text-sm text-blue-500 hover:underline">
                                        View usage
                                    </Link>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <MessageSquare className="h-5 w-5 text-muted-foreground" />
                                        <div>
                                            <div className="text-2xl font-semibold text-foreground">
                                                {Math.max(0, user.usage.messagesLimit - user.usage.messagesUsed)} available
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                {user.usage.messagesLimit === -1 ? 'Unlimited' : `${user.usage.messagesLimit} renew monthly`}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    {user.usage.messagesLimit !== -1 && (
                                        <div className="w-full bg-muted rounded-full h-2">
                                            <div
                                                className="bg-blue-500 h-2 rounded-full"
                                                style={{
                                                    width: `${Math.min(100, (user.usage.messagesUsed / user.usage.messagesLimit) * 100)}%`
                                                }}
                                            ></div>
                                        </div>
                                    )}

                                    <p className="text-sm text-muted-foreground">
                                        {user.usage.messagesLimit === -1
                                            ? `Used ${user.usage.messagesUsed} messages this month`
                                            : `Used ${user.usage.messagesUsed} of ${user.usage.messagesLimit} this month`
                                        }
                                    </p>

                                    {user.plan === 'community' && (
                                        <p className="text-sm text-muted-foreground mt-4">
                                            Upgrade your plan to get more messages and advanced features.
                                        </p>
                                    )}
                                </div>
                            </Card>
                        </motion.div>

                        {/* Billing Section */}
                        <motion.div variants={itemVariants}>
                            <Card className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold text-foreground">Billing</h2>
                                    <Link href="/dashboard/billing" className="text-sm text-blue-500 hover:underline">
                                        Payment history
                                    </Link>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Calendar className="h-5 w-5 text-muted-foreground" />
                                        <div>
                                            <div className="text-lg font-semibold text-foreground">
                                                {(() => {
                                                    if (user.subscription.currentPeriodEnd) {
                                                        const endDate = new Date(user.subscription.currentPeriodEnd);
                                                        const now = new Date();

                                                        // Check if subscription has expired
                                                        if (endDate <= now && user.plan !== 'community') {
                                                            return 'Subscription Expired';
                                                        }

                                                        return endDate.toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        });
                                                    }

                                                    if (user.plan === 'community') {
                                                        return '∞';
                                                    }

                                                    return 'No billing date';
                                                })()}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                {(() => {
                                                    if (user.plan === 'community') {
                                                        return 'Community Plan';
                                                    }

                                                    if (user.subscription.currentPeriodEnd) {
                                                        const endDate = new Date(user.subscription.currentPeriodEnd);
                                                        const now = new Date();

                                                        if (endDate <= now) {
                                                            return 'Subscription Expired';
                                                        }

                                                        const timeDiff = endDate.getTime() - now.getTime();
                                                        const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

                                                        if (daysLeft === 1) {
                                                            return 'Renews tomorrow';
                                                        } else if (daysLeft <= 7) {
                                                            return `Renews in ${daysLeft} days`;
                                                        } else {
                                                            return 'Next Billing Date';
                                                        }
                                                    }

                                                    return 'No active subscription';
                                                })()}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        {user.subscription.status === 'active' && user.plan !== 'community' ? (
                                            <>
                                                <p className="text-sm text-green-600 mb-4">
                                                    ✓ Active subscription - {user.plan.charAt(0).toUpperCase() + user.plan.slice(1)} Plan
                                                </p>
                                                {user.subscription.cancelAtPeriodEnd && (
                                                    <p className="text-sm text-yellow-600 mb-4">
                                                        ⚠️ Your subscription will cancel at the end of the current period
                                                    </p>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                <p className="text-sm text-muted-foreground mb-4">
                                                    {user.plan === 'community' ? 'Currently on free Community plan' : 'No active subscription'}
                                                </p>
                                            </>
                                        )}

                                    </div>
                                </div>
                            </Card>
                        </motion.div>

                        {/* Current Plan Section */}
                        <motion.div variants={itemVariants}>
                            <Card className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold text-foreground">Current plan</h2>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold text-foreground">{currentPlanData.title === "Free" ? "Community Plan" : currentPlanData.title}</h3>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <button
                                                    className={`text-sm hover:underline transition-colors ${user.plan === 'community'
                                                            ? 'text-muted-foreground cursor-not-allowed'
                                                            : 'text-red-600 hover:text-red-700'
                                                        }`}
                                                    disabled={user.plan === 'community'}
                                                >
                                                    {user.plan === 'community' ? 'No subscription to cancel' : 'Cancel subscription'}
                                                </button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Cancel your subscription?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        If you cancel your subscription, you will:
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <div className="space-y-2 text-sm text-muted-foreground px-6 pb-6">
                                                    <ul className="list-disc pl-5 space-y-1">
                                                        <li>Be downgraded to the Community plan immediately</li>
                                                        <li>Lose access to premium features</li>
                                                        <li>Have your message limit reduced to 50 per month</li>
                                                        <li>Keep any unused messages up to the community limit</li>
                                                        <li>No longer be charged for future billing periods</li>
                                                    </ul>
                                                </div>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Keep Subscription</AlertDialogCancel>
                                                    <AlertDialogAction
                                                        className="bg-red-600 hover:bg-red-700"
                                                        onClick={handleCancelSubscription}
                                                    >
                                                        Cancel Subscription
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>

                                    <div className="space-y-3">
                                        {currentPlanData.features.slice(0, showMoreFeatures ? currentPlanData.features.length : 3).map((feature, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <CheckCircle className="h-4 w-4 text-green-600" />
                                                <span className="text-sm text-foreground">{feature}</span>
                                            </div>
                                        ))}
                                        {currentPlanData.features.length > 3 && (
                                            <button
                                                className="text-sm text-accent hover:text-accent/80 hover:underline transition-colors"
                                                onClick={() => setShowMoreFeatures(!showMoreFeatures)}
                                            >
                                                {showMoreFeatures ? "Show less" : "Show more"}
                                            </button>
                                        )}
                                    </div>

                                    <div className="pt-4 border-t">
                                        <div className="text-sm text-muted-foreground">
                                            ${currentPlanData.monthlyPrice.toFixed(2)}/user/mo • 1 seat purchased
                                        </div>
                                        <div className="text-sm font-semibold text-foreground mt-1">
                                            Monthly total: ${currentPlanData.monthlyPrice.toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>

                        {/* Change Subscription Section */}
                        <motion.div variants={itemVariants}>
                            <Card className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold text-foreground">Change your subscription</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Switch plans or contact sales about Enterprise options
                                        </p>
                                    </div>

                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" className="border-accent text-accent hover:bg-accent/10">
                                                Change plan
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                            <DialogHeader>
                                                <DialogTitle className="text-xl font-semibold text-foreground">Choose a Plan</DialogTitle>
                                                <p className="text-sm text-muted-foreground">
                                                    Select the plan that best fits your needs. {" "}
                                                    <button className="text-accent hover:text-accent/80 hover:underline transition-colors">
                                                        View detailed plan information
                                                    </button>
                                                </p>
                                            </DialogHeader>

                                            <div className="space-y-4 mt-6">
                                                {allPlans.map((plan) => (
                                                    <div
                                                        key={plan.id}
                                                        className={cn(
                                                            "p-4 rounded-lg border-2 cursor-pointer transition-all",
                                                            selectedPlan === plan.id
                                                                ? "border-black bg-accent/10 shadow-md"
                                                                : "border-black hover:border-black/70 hover:bg-accent/5"
                                                        )}
                                                        onClick={() => handlePlanSelect(plan.id)}
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-3">
                                                                <div>
                                                                    <div className="flex items-center gap-2">
                                                                        <h3 className={`font-semibold ${plan.id === user?.plan ? 'text-blue-500' : 'text-black'}`}>
                                                                            {plan.title === "Free" ? "Community Plan" : plan.title}
                                                                        </h3>
                                                                        {plan.id === user?.plan && (
                                                                            <Badge className="bg-blue-100/60 text-blue-500 border-blue-100">
                                                                                ✓ Current
                                                                            </Badge>
                                                                        )}
                                                                        {plan.id !== "community" && (
                                                                            <Badge className="bg-green-100 text-green-600 border-green-200">
                                                                                <Users className="w-3 h-3 mr-1" />
                                                                                Teams
                                                                            </Badge>
                                                                        )}
                                                                    </div>
                                                                    <div className="text-sm font-medium text-foreground mt-1">
                                                                        {plan.id === 'community'
                                                                            ? '50 user messages/mo'
                                                                            : plan.id === 'developer'
                                                                                ? '600 user messages/mo'
                                                                                : plan.id === 'pro'
                                                                                    ? '1,500 user messages/mo'
                                                                                    : '4,500 user messages/mo'
                                                                        }
                                                                        {plan.id === 'community' && (
                                                                            <>
                                                                                <span className="ml-2 inline-flex items-center">
                                                                                    <span className="w-4 h-4 bg-blue-100/60 rounded-full flex items-center justify-center mr-1">
                                                                                        <span className="text-xs text-blue-500">i</span>
                                                                                    </span>
                                                                                    <span className="text-blue-500 text-xs">AI Training</span>
                                                                                </span>
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                    <div className="text-sm text-muted-foreground mt-1">
                                                                        {plan.id === 'community'
                                                                            ? 'Community Plan with 50 user messages per month.'
                                                                            : plan.id === 'developer'
                                                                                ? 'Developer Plan with 600 user messages per month.'
                                                                                : plan.id === 'pro'
                                                                                    ? 'Pro Plan with 1500 user messages per month.'
                                                                                    : 'Max Plan with 4500 user messages per month.'
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="text-right">
                                                                <div className="text-lg font-semibold text-foreground">
                                                                    {plan.monthlyPrice === 0 ? "Free" : `$${plan.monthlyPrice.toFixed(2)}/mo`}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}

                                                {/* Enterprise Section */}
                                                <div className="border-t border-border pt-4">
                                                    <div className="text-center text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
                                                        Enterprise Solutions
                                                    </div>

                                                    <div className="p-4 rounded-lg border-2 border-black hover:border-black/70 hover:bg-accent/5 transition-all">
                                                        <div className="flex items-center justify-between">
                                                            <div>
                                                                <h3 className="font-semibold text-black">Enterprise Plan</h3>
                                                                <div className="flex items-center gap-2 mt-1">
                                                                    <span className="text-sm font-medium text-foreground">Bespoke user messages limits</span>
                                                                    <Badge className="bg-accent/20 text-accent-foreground border-accent/30">
                                                                        <Users className="w-3 h-3 mr-1" />
                                                                        Teams
                                                                    </Badge>
                                                                </div>
                                                                <p className="text-sm text-muted-foreground mt-2">
                                                                    Enterprise plans including SSO, OIDC, SCIM, Slack integration,
                                                                    dedicated support, and volume discounts.
                                                                </p>
                                                            </div>
                                                            <Link href="/contact-sales">
                                                                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                                                                    Contact Us
                                                                </Button>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border">
                                                <DialogTrigger asChild>
                                                    <Button variant="outline" className="border-border hover:bg-accent/10 hover:text-accent">
                                                        Cancel
                                                    </Button>
                                                </DialogTrigger>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </Card>                    </motion.div>
                    </motion.div>
                </Container>
            </div>

            {/* Confirmation Dialog */}
            <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold text-foreground">Confirm Plan Change</DialogTitle>
                        <p className="text-sm text-muted-foreground">
                            Review your plan change.
                        </p>
                    </DialogHeader>

                    {pendingPlanData && (
                        <div className="space-y-4 mt-4">
                            {/* Selected Plan Card */}
                            <div className="p-4 rounded-lg border-2 border-accent bg-accent/10">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-semibold text-blue-500">
                                                {pendingPlanData.title === "Free" ? "Community Plan" : pendingPlanData.title}
                                            </h3>
                                            {pendingPlanData.id !== "community" && (
                                                <Badge className="bg-accent/20 text-accent-foreground border-accent/30">
                                                    <Users className="w-3 h-3 mr-1" />
                                                    Teams
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-lg font-semibold text-foreground">
                                            {pendingPlanData.monthlyPrice === 0 ? "Free" : `$${pendingPlanData.monthlyPrice.toFixed(2)}/mo`}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-2">
                                    <div className="text-sm font-medium text-foreground">
                                        {pendingPlanData.features[0]}
                                    </div>
                                    <div className="text-sm text-muted-foreground mt-1">
                                        {pendingPlanData.desc}
                                    </div>
                                </div>
                            </div>

                            {/* Confirmation Warning */}
                            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <div className="flex items-start space-x-2">
                                    <Checkbox
                                        id="confirm-change"
                                        checked={confirmChange}
                                        onCheckedChange={(checked) => setConfirmChange(checked as boolean)}
                                    />
                                    <label htmlFor="confirm-change" className="text-sm text-foreground cursor-pointer">
                                        I understand this change will take effect <strong>immediately</strong>, and I will lose any unused
                                        user messages from my monthly subscription, but any additional purchased user
                                        messages will remain.
                                    </label>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-3 mt-6">
                                <Button variant="outline" onClick={handleCancelConfirmation}>
                                    Back
                                </Button>
                                <Button
                                    className="bg-accent hover:bg-accent/90 text-accent-foreground"
                                    onClick={handleConfirmPlanChange}
                                    disabled={!confirmChange}
                                >
                                    Proceed to Payment
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
