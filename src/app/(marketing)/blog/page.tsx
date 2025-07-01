"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Wrapper from "@/components/global/wrapper";
import Container from "@/components/global/container";
import { MagicCard } from "@/components/ui/magic-card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Search, ChevronRight, BookOpen, Calendar, Clock, Tag } from "lucide-react";
import { BLOG_POSTS, BLOG_CATEGORIES } from "@/constants/blog";
import { formatBlogDateShort } from "@/utils/date";

function BlogComponent() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    const featuredPost = BLOG_POSTS.find(post => post.featured) || BLOG_POSTS[0];

    const filteredPosts = BLOG_POSTS
        .filter(post => !post.featured)
        .filter(post => selectedCategory === "all" || post.category === selectedCategory)
        .filter(post =>
            searchQuery === "" ||
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        .slice(0, 6);

    const fadeInAnimationVariants = {
        initial: {
            opacity: 0,
            y: 100
        },
        animate: (index: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.05 * index,
            }
        })
    };

    return (
        <Wrapper className="py-20 relative">
            {/* Hero Section */}
            <Container>
                <div className="flex flex-col items-center justify-center">
                    <motion.h1
                        className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent pb-4"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        The Cheetah Blog
                    </motion.h1>
                    <Separator className="my-8 w-24 bg-accent/40" />
                    <motion.p
                        className="text-lg md:text-xl text-center max-w-3xl text-muted-foreground"
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
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 py-6 rounded-full border-accent/20"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && searchQuery.trim()) {
                                        window.location.href = `/blog/search?q=${encodeURIComponent(searchQuery.trim())}`;
                                    }
                                }}
                            />
                            <Button
                                className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full"
                                onClick={() => {
                                    if (searchQuery.trim()) {
                                        window.location.href = `/blog/search?q=${encodeURIComponent(searchQuery.trim())}`;
                                    }
                                }}
                            >
                                Search
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </Container>

            {/* Categories */}
            <Container delay={0.3}>
                <motion.div
                    className="mt-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <div className="flex flex-wrap justify-center gap-3">
                        {BLOG_CATEGORIES.map((category, index) => (
                            <motion.div
                                key={category.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.3 + (index * 0.05) }}
                            >
                                <Link href={`/blog/category/${category.id}`}>
                                    <Button
                                        variant={selectedCategory === category.id ? "default" : "outline"}
                                        className="rounded-full"
                                        onClick={() => setSelectedCategory(category.id)}
                                    >
                                        {category.name}
                                    </Button>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </Container>

            {/* Featured Post */}
            <Container delay={0.5}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    className="relative mt-16"
                >
                    <MagicCard className="w-full">
                        <Link href={`/blog/${featuredPost.slug}`}>
                            <div className="relative w-full rounded-xl overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent z-10" />

                                <Image
                                    src={featuredPost.image}
                                    alt={featuredPost.title}
                                    width={1200}
                                    height={500}
                                    className="w-full h-[500px] object-cover transition-transform duration-300 group-hover:scale-105"
                                />

                                <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                                    <Badge className="mb-3" variant="secondary">Featured</Badge>
                                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                        {featuredPost.title}
                                    </h2>
                                    <p className="text-white/80 mb-6 max-w-3xl">
                                        {featuredPost.excerpt}
                                    </p>
                                    <div className="flex flex-wrap gap-4 text-white/70 mb-6">
                                        <div className="flex items-center">
                                            <Calendar className="h-4 w-4 mr-2" />
                                            <span>{formatBlogDateShort(featuredPost.date)}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <BookOpen className="h-4 w-4 mr-2" />
                                            <span>By {featuredPost.author.name}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Clock className="h-4 w-4 mr-2" />
                                            <span>{featuredPost.readTime}</span>
                                        </div>
                                    </div>
                                    <Button size="lg">
                                        Read Article <ChevronRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </Link>
                    </MagicCard>
                </motion.div>
            </Container>

            {/* Blog Grid */}
            <Container delay={0.6}>
                <motion.div
                    className="mt-24"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <h2 className="text-3xl font-bold mb-12">Latest Articles</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    <div className="flex justify-center mt-12">
                        <Link href="/blog/category/all">
                            <Button variant="outline" size="lg">
                                View All Articles
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </Container>

            {/* Newsletter */}
            <Container delay={0.8}>
                <motion.div
                    className="mt-32 mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                >
                    <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="max-w-xl">
                            <h3 className="text-2xl font-bold">Stay Ahead of the Curve</h3>
                            <p className="text-muted-foreground mt-2">
                                Subscribe to our newsletter for the latest insights on AI development,
                                exclusive content, and product updates.
                            </p>
                        </div>
                        <div className="w-full max-w-md flex gap-2">
                            <Input placeholder="Enter your email" className="py-6" />
                            <Button>Subscribe</Button>
                        </div>
                    </div>
                </motion.div>
            </Container>
        </Wrapper>
    );
};

export default function BlogPage() {
    return <BlogComponent />;
}; 