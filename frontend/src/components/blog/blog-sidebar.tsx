"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BLOG_POSTS, BLOG_CATEGORIES, BlogPost } from "@/constants/blog";
import TableOfContents from "./table-of-contents";
import { Calendar, Clock, ArrowRight, TrendingUp, Hash, BookOpen } from "lucide-react";

interface BlogSidebarProps {
    currentPost?: BlogPost;
    currentCategory?: string;
    className?: string;
}

export default function BlogSidebar({ currentPost, currentCategory, className = "" }: BlogSidebarProps) {
    // Get related posts (same category, excluding current post)
    const relatedPosts = BLOG_POSTS
        .filter(post =>
            currentPost ?
                (post.id !== currentPost.id && post.category === currentPost.category) :
                (currentCategory && currentCategory !== "all" ? post.category === currentCategory : true)
        )
        .slice(0, 3);

    // Get recent posts (excluding current post)
    const recentPosts = BLOG_POSTS
        .filter(post => currentPost ? post.id !== currentPost.id : true)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 4);

    // Get popular categories
    const popularCategories = BLOG_CATEGORIES
        .filter(cat => cat.id !== "all")
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

    return (
        <div className={`space-y-6 ${className}`}>
            {/* Table of Contents (for individual posts) */}
            {currentPost && (
                <TableOfContents content={currentPost.content} />
            )}

            {/* Categories */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <Hash className="w-5 h-5" />
                        Categories
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {popularCategories.map((category) => (
                        <Link key={category.id} href={`/blog/category/${category.id}`}>
                            <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors group">
                                <div>
                                    <p className="font-medium group-hover:text-primary transition-colors">
                                        {category.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {category.description}
                                    </p>
                                </div>
                                <Badge variant="secondary" className="text-xs">
                                    {category.count}
                                </Badge>
                            </div>
                        </Link>
                    ))}
                    <Separator className="my-3" />
                    <Link href="/blog">
                        <Button variant="outline" size="sm" className="w-full">
                            <BookOpen className="w-4 h-4 mr-2" />
                            View All Posts
                        </Button>
                    </Link>
                </CardContent>
            </Card>

            {/* Related Posts (if viewing a specific post) */}
            {currentPost && relatedPosts.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <TrendingUp className="w-5 h-5" />
                            Related Articles
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {relatedPosts.map((post) => (
                            <Link key={post.id} href={`/blog/${post.slug}`}>
                                <div className="flex gap-3 p-2 rounded-lg hover:bg-muted transition-colors group">
                                    <div className="w-16 h-16 relative rounded-lg overflow-hidden flex-shrink-0">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                                            {post.title}
                                        </h4>
                                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                                            <Calendar className="w-3 h-3" />
                                            {post.date}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </CardContent>
                </Card>
            )}

            {/* Recent Posts */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <Clock className="w-5 h-5" />
                        Recent Articles
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {recentPosts.map((post) => (
                        <Link key={post.id} href={`/blog/${post.slug}`}>
                            <div className="flex gap-3 p-2 rounded-lg hover:bg-muted transition-colors group">
                                <div className="w-16 h-16 relative rounded-lg overflow-hidden flex-shrink-0">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                                        {post.title}
                                    </h4>
                                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {post.date}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {post.readTime}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card className="bg-primary/5 border-primary/10">
                <CardHeader>
                    <CardTitle className="text-lg">Stay Updated</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                        Get the latest articles and insights delivered to your inbox.
                    </p>
                    <Button asChild className="w-full">
                        <Link href="/signup">
                            Subscribe to Newsletter
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
