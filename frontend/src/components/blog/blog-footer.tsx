"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BLOG_CATEGORIES } from "@/constants/blog";
import { ArrowRight, BookOpen, Search, Rss, Mail } from "lucide-react";

interface BlogFooterProps {
    className?: string;
}

export default function BlogFooter({ className = "" }: BlogFooterProps) {
    const featuredCategories = BLOG_CATEGORIES
        .filter(cat => cat.id !== "all")
        .slice(0, 4);

    return (
        <div className={`bg-muted/30 ${className}`}>
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Blog Navigation */}
                    <div>
                        <h3 className="font-semibold mb-4">Blog</h3>
                        <div className="space-y-2">
                            <Link href="/blog" className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
                                <BookOpen className="w-4 h-4 mr-2" />
                                All Articles
                            </Link>
                            <Link href="/blog/search" className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
                                <Search className="w-4 h-4 mr-2" />
                                Search Blog
                            </Link>
                            <Link href="#" className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
                                <Rss className="w-4 h-4 mr-2" />
                                RSS Feed
                            </Link>
                        </div>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="font-semibold mb-4">Categories</h3>
                        <div className="space-y-2">
                            {featuredCategories.map((category) => (
                                <Link
                                    key={category.id}
                                    href={`/blog/category/${category.id}`}
                                    className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                    {category.name} ({category.count})
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="font-semibold mb-4">Company</h3>
                        <div className="space-y-2">
                            <Link href="/about" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                                About Us
                            </Link>
                            <Link href="/careers" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                                Careers
                            </Link>
                            <Link href="/contact" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                                Contact
                            </Link>
                            <Link href="/press-inquiries" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                                Press
                            </Link>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="font-semibold mb-4">Stay Updated</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Get the latest articles and insights delivered to your inbox.
                        </p>
                        <Button asChild size="sm" className="w-full">
                            <Link href="/signup">
                                <Mail className="w-4 h-4 mr-2" />
                                Subscribe
                            </Link>
                        </Button>
                    </div>
                </div>

                <Separator className="my-8" />

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="text-sm text-muted-foreground">
                        © 2025 Cheetah. All rights reserved.
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                        <Link href="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/cookie-policy" className="text-muted-foreground hover:text-primary transition-colors">
                            Cookie Policy
                        </Link>
                        <Link href="/professional-terms-of-service" className="text-muted-foreground hover:text-primary transition-colors">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
