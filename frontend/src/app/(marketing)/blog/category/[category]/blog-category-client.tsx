"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Container from "@/components/global/container";
import Wrapper from "@/components/global/wrapper";
import { BlogPost, BlogCategory, BLOG_CATEGORIES } from "@/constants/blog";
import { ArrowLeft, Calendar, Clock, Tag, Search, Grid, List } from "lucide-react";
import { useState } from "react";
import { formatBlogDateShort } from "@/utils/date";

interface BlogCategoryClientProps {
    category: BlogCategory;
    posts: BlogPost[];
}

export default function BlogCategoryClient({ category, posts }: BlogCategoryClientProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const fadeInAnimationVariants = {
        initial: {
            opacity: 0,
            y: 50
        },
        animate: (index: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.1 * index,
                duration: 0.5
            }
        })
    };

    return (
        <div className="min-h-screen bg-background">
            <Wrapper className="py-20">
                {/* Header */}
                <Container>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link href="/blog">
                            <Button variant="ghost" className="mb-8">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Blog
                            </Button>
                        </Link>
                    </motion.div>
                </Container>

                {/* Category Header */}
                <Container delay={0.2}>
                    <div className="text-center mb-12">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
                            {category.name}
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
                            {category.description}
                        </p>
                        <Badge variant="secondary" className="text-sm">
                            {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
                        </Badge>
                    </div>
                </Container>

                {/* Categories Navigation */}
                <Container delay={0.3}>
                    <div className="flex flex-wrap justify-center gap-3 mb-8">
                        {BLOG_CATEGORIES.map((cat) => (
                            <Link key={cat.id} href={`/blog/category/${cat.id}`}>
                                <Button
                                    variant={cat.id === category.id ? "default" : "outline"}
                                    className="rounded-full"
                                >
                                    {cat.name}
                                </Button>
                            </Link>
                        ))}
                    </div>
                </Container>

                {/* Search and Controls */}
                <Container delay={0.4}>
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-12">
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant={viewMode === 'grid' ? "default" : "outline"}
                                size="sm"
                                onClick={() => setViewMode('grid')}
                            >
                                <Grid className="w-4 h-4" />
                            </Button>
                            <Button
                                variant={viewMode === 'list' ? "default" : "outline"}
                                size="sm"
                                onClick={() => setViewMode('list')}
                            >
                                <List className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </Container>

                {/* Posts Grid/List */}
                <Container delay={0.5}>
                    {filteredPosts.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground text-lg">No articles found matching your search.</p>
                        </div>
                    ) : (
                        <div className={
                            viewMode === 'grid'
                                ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                                : "space-y-8"
                        }>
                            {filteredPosts.map((post, index) => (
                                <motion.div
                                    key={post.id}
                                    className="group"
                                    variants={fadeInAnimationVariants}
                                    initial="initial"
                                    whileInView="animate"
                                    viewport={{ once: true }}
                                    custom={index}
                                >
                                    <Link href={`/blog/${post.slug}`}>
                                        {viewMode === 'grid' ? (
                                            // Grid View
                                            <div className="rounded-xl overflow-hidden border border-border h-full flex flex-col hover:shadow-lg transition-shadow">
                                                <div className="relative h-48 overflow-hidden">
                                                    <div className="absolute top-4 left-4 z-10">
                                                        <Badge variant="secondary">{post.category}</Badge>
                                                    </div>
                                                    <Image
                                                        src={post.image}
                                                        alt={post.title}
                                                        fill
                                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                                    />
                                                </div>
                                                <div className="p-6 flex flex-col flex-grow">
                                                    <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                                                        {post.title}
                                                    </h3>
                                                    <p className="text-muted-foreground mb-4 line-clamp-3 flex-grow">
                                                        {post.excerpt}
                                                    </p>
                                                    <div className="flex items-center justify-between text-sm text-muted-foreground mt-4">
                                                        <div className="flex items-center">
                                                            <Calendar className="h-3 w-3 mr-1" />
                                                            <span>{formatBlogDateShort(post.date)}</span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <Clock className="h-3 w-3 mr-1" />
                                                            <span>{post.readTime}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="px-6 pb-6 pt-2 border-t border-border mt-auto">
                                                    <div className="flex gap-2 flex-wrap">
                                                        {post.tags.slice(0, 3).map(tag => (
                                                            <div key={tag} className="flex items-center text-xs text-muted-foreground">
                                                                <Tag className="h-3 w-3 mr-1" />
                                                                {tag}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            // List View
                                            <div className="flex gap-6 p-6 rounded-xl border border-border hover:shadow-lg transition-shadow">
                                                <div className="relative w-48 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                                                    <Image
                                                        src={post.image}
                                                        alt={post.title}
                                                        fill
                                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                                    />
                                                    <div className="absolute top-2 left-2">
                                                        <Badge variant="secondary" className="text-xs">{post.category}</Badge>
                                                    </div>
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                                        {post.title}
                                                    </h3>
                                                    <p className="text-muted-foreground mb-4 line-clamp-2">
                                                        {post.excerpt}
                                                    </p>
                                                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                                        <div className="flex items-center">
                                                            <Calendar className="h-3 w-3 mr-1" />
                                                            <span>{formatBlogDateShort(post.date)}</span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <Clock className="h-3 w-3 mr-1" />
                                                            <span>{post.readTime}</span>
                                                        </div>
                                                        <span>By {post.author.name}</span>
                                                    </div>
                                                    <div className="flex gap-2 flex-wrap">
                                                        {post.tags.slice(0, 4).map(tag => (
                                                            <Badge key={tag} variant="outline" className="text-xs">
                                                                {tag}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </Container>

                {/* Load More */}
                {filteredPosts.length > 9 && (
                    <Container delay={0.6}>
                        <div className="flex justify-center mt-12">
                            <Button variant="outline" size="lg">
                                Load More Articles
                            </Button>
                        </div>
                    </Container>
                )}

                {/* Newsletter CTA */}
                <Container delay={0.7}>
                    <div className="mt-24">
                        <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-2xl p-8 md:p-12 text-center">
                            <h3 className="text-2xl font-bold mb-4">Stay Updated with {category.name}</h3>
                            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                                Subscribe to our newsletter to get the latest {category.name.toLowerCase()} articles
                                and insights delivered to your inbox.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-4 py-2 rounded-lg border border-border bg-background"
                                />
                                <Button>Subscribe</Button>
                            </div>
                        </div>
                    </div>
                </Container>
            </Wrapper>
        </div>
    );
}
