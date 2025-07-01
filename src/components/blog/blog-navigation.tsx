"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BLOG_CATEGORIES } from "@/constants/blog";
import { Search, Home, BookOpen, Grid, Hash } from "lucide-react";

interface BlogNavigationProps {
    currentCategory?: string;
    showSearch?: boolean;
    className?: string;
}

export default function BlogNavigation({
    currentCategory = "all",
    showSearch = true,
    className = ""
}: BlogNavigationProps) {
    const pathname = usePathname();

    const navigationItems = [
        {
            href: "/blog",
            label: "All Posts",
            icon: Home,
            active: pathname === "/blog"
        },
        {
            href: "/blog/search",
            label: "Search",
            icon: Search,
            active: pathname.startsWith("/blog/search")
        }
    ];

    return (
        <div className={`flex flex-col space-y-4 ${className}`}>
            {/* Main Navigation */}
            <div className="flex flex-wrap gap-2">
                {navigationItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link key={item.href} href={item.href}>
                            <Button
                                variant={item.active ? "default" : "outline"}
                                size="sm"
                                className="flex items-center gap-2"
                            >
                                <Icon className="w-4 h-4" />
                                {item.label}
                            </Button>
                        </Link>
                    );
                })}
            </div>

            {/* Categories */}
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Hash className="w-4 h-4" />
                    <span>Categories</span>
                </div>
                <div className="flex flex-wrap gap-2">
                    {BLOG_CATEGORIES.map((category) => {
                        const isActive = currentCategory === category.id ||
                            (pathname.includes(`/category/${category.id}`));

                        return (
                            <Link key={category.id} href={`/blog/category/${category.id}`}>
                                <Button
                                    variant={isActive ? "default" : "outline"}
                                    size="sm"
                                    className="flex items-center gap-2"
                                >
                                    {category.name}
                                    <Badge variant="secondary" className="text-xs">
                                        {category.count}
                                    </Badge>
                                </Button>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
