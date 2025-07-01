"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { BLOG_CATEGORIES } from "@/constants/blog";

interface BlogBreadcrumbProps {
    items: {
        label: string;
        href?: string;
    }[];
    className?: string;
}

export default function BlogBreadcrumb({ items, className = "" }: BlogBreadcrumbProps) {
    return (
        <nav className={`flex items-center space-x-1 text-sm text-muted-foreground ${className}`}>
            <Link href="/" className="hover:text-primary transition-colors">
                <Home className="w-4 h-4" />
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/blog" className="hover:text-primary transition-colors">
                Blog
            </Link>

            {items.map((item, index) => (
                <div key={index} className="flex items-center space-x-1">
                    <ChevronRight className="w-4 h-4" />
                    {item.href ? (
                        <Link href={item.href} className="hover:text-primary transition-colors">
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-foreground font-medium">{item.label}</span>
                    )}
                </div>
            ))}
        </nav>
    );
}

// Helper function to generate breadcrumbs for category pages
export function getCategoryBreadcrumbs(categoryId: string) {
    const category = BLOG_CATEGORIES.find(cat => cat.id === categoryId);
    if (!category || category.id === "all") {
        return [];
    }

    return [
        { label: category.name }
    ];
}

// Helper function to generate breadcrumbs for blog posts
export function getPostBreadcrumbs(categoryId: string, postTitle: string) {
    const category = BLOG_CATEGORIES.find(cat => cat.id === categoryId);
    const breadcrumbs = [];

    if (category && category.id !== "all") {
        breadcrumbs.push({
            label: category.name,
            href: `/blog/category/${category.id}`
        });
    }

    breadcrumbs.push({
        label: postTitle
    });

    return breadcrumbs;
}
