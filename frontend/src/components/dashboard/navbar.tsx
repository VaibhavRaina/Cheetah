"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    User,
    Settings,
    LogOut,
    Bell,
    HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NAV_LINKS } from "@/constants";
import { PLANS } from "@/constants/plans";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import Icons from "@/components/global/icons";
import Wrapper from "@/components/global/wrapper";
import DashboardMobileMenu from "./mobile-menu";

const DashboardNavbar = () => {
    const { user, logout } = useAuth();
    const { toast } = useToast();
    const router = useRouter();

    if (!user) {
        return null; // or a loading skeleton
    }

    const currentPlan = PLANS.find(plan => plan.id === user.plan) || PLANS[0];

    const handleLogout = async () => {
        try {
            await logout();
            toast({
                title: "Logged out",
                description: "You have been successfully logged out.",
            });
            router.push('/signup');
        } catch (error) {
            console.error('Logout error:', error);
            toast({
                title: "Error",
                description: "Failed to logout. Please try again.",
                variant: "destructive",
            });
        }
    };

    // Get plan display name and styling based on plan type
    const getPlanDisplay = (plan: typeof currentPlan) => {
        switch (plan.id) {
            case "community":
                return {
                    name: "Community Plan",
                    bgColor: "bg-gradient-to-r from-green-50 to-emerald-50",
                    textColor: "text-green-700",
                    borderColor: "border-green-200",
                    dotColor: "bg-green-500"
                };
            case "developer":
                return {
                    name: "Developer Plan",
                    bgColor: "bg-gradient-to-r from-blue-50 to-indigo-50",
                    textColor: "text-blue-700",
                    borderColor: "border-blue-200",
                    dotColor: "bg-blue-500"
                };
            case "enterprise":
                return {
                    name: "Enterprise Plan",
                    bgColor: "bg-gradient-to-r from-purple-50 to-violet-50",
                    textColor: "text-purple-700",
                    borderColor: "border-purple-200",
                    dotColor: "bg-purple-500"
                };
            default:
                return {
                    name: "Free Plan",
                    bgColor: "bg-gradient-to-r from-gray-50 to-slate-50",
                    textColor: "text-gray-700",
                    borderColor: "border-gray-200",
                    dotColor: "bg-gray-500"
                };
        }
    };

    const planDisplay = getPlanDisplay(currentPlan);

    return (
        <header className="sticky top-0 w-full h-16 bg-background/80 backdrop-blur-sm z-50 text-black">
            <div className="w-full mx-auto lg:max-w-screen-xl lg:mx-auto px-4 md:px-6 lg:px-8 h-full">
                <div className="flex items-center h-full relative">
                    {/* Logo and Plan Badge */}
                    <div className="flex items-center mr-auto">
                        <Link href="/" className="flex items-center gap-2">
                            <Icons.icon className="w-6" />
                            <span className="text-xl font-semibold hidden sm:block">
                                Cheetah&nbsp;AI
                            </span>
                        </Link>
                        {/* Plan Badge */}
                        <div className={`ml-3 px-3 py-1.5 ${planDisplay.bgColor} ${planDisplay.textColor} text-xs font-medium rounded-lg border ${planDisplay.borderColor} hidden md:flex items-center gap-2 shadow-sm`}>
                            <div className={`w-2 h-2 ${planDisplay.dotColor} rounded-full`}></div>
                            <span>{planDisplay.name}</span>
                        </div>
                    </div>

                    {/* Navigation Links - Absolutely Centered */}
                    <div className="hidden lg:flex items-center absolute left-1/2 transform -translate-x-1/2">
                        <ul className="flex items-center gap-8">
                            {NAV_LINKS.map((link, index) => (
                                <li key={index} className="text-sm font-medium hover:text-primary transition-colors">
                                    <Link href={link.href}>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right side - Notifications and User Menu (Desktop) */}
                    <div className="hidden lg:flex items-center gap-4">
                        {/* Notifications */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="relative">
                                    <Bell className="h-5 w-5" />
                                    <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-80" align="end">
                                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <div className="p-4 text-sm text-muted-foreground">
                                    No new notifications
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* User Profile Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={user.avatar || undefined} alt={user.name} />
                                        <AvatarFallback className="bg-accent text-accent-foreground">
                                            {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuLabel>
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">{user.name}</p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            {user.email}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="cursor-pointer text-red-600 focus:text-red-600"
                                    onClick={handleLogout}
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {/* Mobile Menu */}
                    <DashboardMobileMenu />
                </div>
            </div>
        </header>
    );
};

export default DashboardNavbar;
