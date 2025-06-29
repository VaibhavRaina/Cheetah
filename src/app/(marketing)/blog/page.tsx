"use client";

import Container from "@/components/global/container";
import { MagicCard } from "@/components/ui/magic-card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Search, ChevronRight, BookOpen, Calendar, Clock, Tag } from "lucide-react";

// Mock blog data
const blogPosts = [
    {
        id: 1,
        title: "Building Modern Development Workflows with AI Assistants",
        excerpt: "Discover how AI-powered tools are revolutionizing the way developers write code, debug issues, and collaborate on projects.",
        image: "https://images.unsplash.com/photo-1573164574511-73c773193279?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3",
        category: "Development",
        author: "Alex Johnson",
        date: "May 15, 2023",
        readTime: "8 min read",
        tags: ["AI", "Development", "Productivity"]
    },
    {
        id: 2,
        title: "The Future of Code Review: Human Expertise + Machine Intelligence",
        excerpt: "How combining human knowledge with AI-powered code analysis can lead to better quality, faster reviews, and improved developer experience.",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
        category: "Best Practices",
        author: "Sarah Chen",
        date: "April 28, 2023",
        readTime: "6 min read",
        tags: ["Code Review", "Best Practices", "Collaboration"]
    },
    {
        id: 3,
        title: "5 Ways Cheetah AI Accelerates Your Development Workflow",
        excerpt: "Learn how our platform helps developers write better code faster, with less cognitive overhead and more creative freedom.",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
        category: "Product",
        author: "Michael Rodriguez",
        date: "April 10, 2023",
        readTime: "5 min read",
        tags: ["Cheetah", "Features", "Productivity"]
    }
];

// Featured categories
const categories = [
    "All Categories",
    "Development",
    "Best Practices",
    "Product Updates",
    "Innovation",
    "Tutorials"
];

const BlogPage = () => {
    return (
        <div className="min-h-screen py-20">
            {/* Hero Section */}
            <Container>
                <div className="flex flex-col items-center justify-center">
                    <motion.h1
                        className="text-5xl md:text-6xl font-bold text-center bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        The Cheetah Blog
                    </motion.h1>
                    <Separator className="my-8 w-24 bg-blue-500/40" />
                    <motion.p
                        className="text-xl text-center max-w-3xl text-muted-foreground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Insights, tutorials, and updates from the world of AI-powered development.
                        Stay current with the latest trends, best practices, and Cheetah product news.
                    </motion.p>

                    {/* Search Bar */}
                    <motion.div
                        className="mt-12 w-full max-w-2xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search articles..."
                                className="pl-10 py-6 rounded-full border-blue-500/20"
                            />
                            <Button className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full">
                                Search
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </Container>

            {/* Categories */}
            <Container delay={0.1} className="mt-16">
                <div className="flex flex-wrap justify-center gap-3">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.3 + (index * 0.05) }}
                        >
                            <Button
                                variant={index === 0 ? "default" : "outline"}
                                className="rounded-full"
                            >
                                {category}
                            </Button>
                        </motion.div>
                    ))}
                </div>
            </Container>

            {/* Featured Post */}
            <Container delay={0.2} className="mt-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    className="relative"
                >
                    <MagicCard className="w-full">
                        <div className="relative w-full rounded-xl overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent z-10" />

                            <img
                                src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
                                alt="Featured Blog Post"
                                className="w-full h-[500px] object-cover transition-transform duration-300 group-hover:scale-105"
                            />

                            <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                                <Badge className="mb-3" variant="secondary">Featured</Badge>
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                    The Evolution of Developer Experience in 2023
                                </h2>
                                <p className="text-white/80 mb-6 max-w-3xl">
                                    How AI-powered tools like Cheetah are transforming the way developers work,
                                    collaborate, and solve complex problems in modern software engineering.
                                </p>
                                <div className="flex flex-wrap gap-4 text-white/70 mb-6">
                                    <div className="flex items-center">
                                        <Calendar className="h-4 w-4 mr-2" />
                                        <span>June 12, 2023</span>
                                    </div>
                                    <div className="flex items-center">
                                        <BookOpen className="h-4 w-4 mr-2" />
                                        <span>By Thomas Wright</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="h-4 w-4 mr-2" />
                                        <span>10 min read</span>
                                    </div>
                                </div>
                                <Button size="lg">
                                    Read Article <ChevronRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </MagicCard>
                </motion.div>
            </Container>

            {/* Blog Grid */}
            <Container delay={0.3} className="mt-24">
                <h2 className="text-3xl font-bold mb-12">Latest Articles</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post, index) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
                            className="group"
                        >
                            <div className="rounded-xl overflow-hidden border border-border h-full flex flex-col">
                                <div className="relative h-48 overflow-hidden">
                                    <div className="absolute top-4 left-4 z-10">
                                        <Badge variant="secondary">{post.category}</Badge>
                                    </div>
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
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
                                            <span>{post.date}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Clock className="h-3 w-3 mr-1" />
                                            <span>{post.readTime}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-6 pb-6 pt-2 border-t border-border mt-auto">
                                    <div className="flex gap-2 flex-wrap">
                                        {post.tags.map(tag => (
                                            <div key={tag} className="flex items-center text-xs text-muted-foreground">
                                                <Tag className="h-3 w-3 mr-1" />
                                                {tag}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="flex justify-center mt-12">
                    <Button variant="outline" size="lg">
                        Load More Articles
                    </Button>
                </div>
            </Container>

            {/* Newsletter */}
            <Container delay={0.4} className="mt-32 mb-16">
                <motion.div
                    className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-8 md:p-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                >
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay in the Loop</h2>
                            <p className="text-muted-foreground mb-6">
                                Subscribe to our newsletter to get the latest articles, product updates,
                                and exclusive content delivered straight to your inbox.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Input
                                placeholder="Your email address"
                                type="email"
                                className="flex-grow"
                            />
                            <Button>
                                Subscribe
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </Container>
        </div>
    );
};

export default BlogPage; 