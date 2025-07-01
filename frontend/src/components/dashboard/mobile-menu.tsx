"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NAV_LINKS } from "@/constants";
import { Menu, Settings, HelpCircle, LogOut, Bell } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const DashboardMobileMenu = () => {
    return (
        <Sheet>
            <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="h-6 w-6" />
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[300px] pt-12">
                <SheetHeader className="mb-8">
                    <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>

                <nav className="flex flex-col space-y-6">
                    {/* User Profile Section */}
                    <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src="https://github.com/shadcn.png" alt="@user" />
                            <AvatarFallback className="bg-accent text-accent-foreground">
                                JD
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <p className="text-sm font-medium leading-none">John Doe</p>
                            <p className="text-xs leading-none text-muted-foreground mt-1">
                                john.doe@example.com
                            </p>
                        </div>
                    </div>

                    {/* Notifications */}
                    <Button variant="ghost" className="justify-start p-3" asChild>
                        <Link href="/dashboard/notifications">
                            <Bell className="mr-3 h-5 w-5" />
                            <span>Notifications</span>
                            <span className="ml-auto w-2 h-2 bg-red-500 rounded-full"></span>
                        </Link>
                    </Button>

                    <Separator />

                    {/* Navigation Links */}
                    <div className="space-y-2">
                        {NAV_LINKS.map((link, index) => (
                            <Link
                                key={index}
                                href={link.href}
                                className="flex items-center p-3 text-base font-medium transition-colors hover:text-primary hover:bg-accent rounded-md"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <Separator />

                    {/* User Menu Items */}
                    <div className="space-y-2">
                        <Button variant="ghost" className="justify-start p-3 w-full" asChild>
                            <Link href="/dashboard/settings">
                                <Settings className="mr-3 h-5 w-5" />
                                <span>Settings</span>
                            </Link>
                        </Button>

                        <Button variant="ghost" className="justify-start p-3 w-full" asChild>
                            <Link href="/support">
                                <HelpCircle className="mr-3 h-5 w-5" />
                                <span>Support</span>
                            </Link>
                        </Button>

                        <Button variant="ghost" className="justify-start p-3 w-full text-red-600 hover:text-red-600 hover:bg-red-50" asChild>
                            <Link href="/logout">
                                <LogOut className="mr-3 h-5 w-5" />
                                <span>Log out</span>
                            </Link>
                        </Button>
                    </div>
                </nav>
            </SheetContent>
        </Sheet>
    );
};

export default DashboardMobileMenu;
