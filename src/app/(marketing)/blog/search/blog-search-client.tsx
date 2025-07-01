"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Wrapper from "@/components/global/wrapper";
import Container from "@/components/global/container";
import { MagicCard } from "@/components/ui/magic-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Search, Grid, List, Calendar, Clock, Tag, ArrowLeft, Filter } from "lucide-react";
import { BLOG_POSTS, BLOG_CATEGORIES } from "@/constants/blog";
import { formatBlogDateShort } from "@/utils/date";

type ViewMode = "grid" | "list";

interface BlogSearchClientProps {
    initialQuery: string;
    initialCategory: string;
}

export default function BlogSearchClient({ initialQuery, initialCategory }: BlogSearchClientProps) {
    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [viewMode, setViewMode] = useState<ViewMode>("grid");
    const [showFilters, setShowFilters] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    // Update URL when search parameters change
    useEffect(() => {
        const params = new URLSearchParams();
        if (searchQuery) params.set("q", searchQuery);
        if (selectedCategory !== "all") params.set("category", selectedCategory);

        const newUrl = params.toString() ? `/blog/search?${params.toString()}` : "/blog/search";
        router.replace(newUrl, { scroll: false });
    }, [searchQuery, selectedCategory, router]);

    const filteredPosts = BLOG_POSTS.filter(post => {
        const matchesSearch = searchQuery === "" ||
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
            post.author.name.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    const resultsCount = filteredPosts.length;
    const categoryCount = BLOG_CATEGORIES.find(cat => cat.id === selectedCategory)?.count || 0;

    const fadeInAnimationVariants = {
        initial: { opacity: 0, y: 50 },
        animate: (index: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.05 * index,
                duration: 0.5
            }
        })
    };

    return (
        <Wrapper className="py-20 relative">
            <Container>
                <div className="flex flex-col">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <Link
                            href="/blog"
                            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-4"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Blog
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Search Blog
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Find articles, tutorials, and insights about AI-powered development
                        </p>
                    </motion.div>

                    {/* Search and Filters */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mb-8"
                    >
                        <div className="flex flex-col lg:flex-row gap-4 mb-6">
                            {/* Search Input */}
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search articles, tutorials, tips..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 h-12 text-base"
                                />
                            </div>

                            {/* Mobile Filter Toggle */}
                            <Button
                                variant="outline"
                                onClick={() => setShowFilters(!showFilters)}
                                className="lg:hidden h-12"
                            >
                                <Filter className="w-4 h-4 mr-2" />
                                Filters
                            </Button>

                            {/* View Mode Toggle */}
                            <div className="hidden lg:flex border rounded-lg p-1">
                                <Button
                                    variant={viewMode === "grid" ? "default" : "ghost"}
                                    size="sm"
                                    onClick={() => setViewMode("grid")}
                                    className="h-8"
                                >
                                    <Grid className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant={viewMode === "list" ? "default" : "ghost"}
                                    size="sm"
                                    onClick={() => setViewMode("list")}
                                    className="h-8"
                                >
                                    <List className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Categories Filter */}
                        <div className={`${showFilters ? "block" : "hidden"} lg:block`}>
                            <div className="flex flex-wrap gap-2">
                                {BLOG_CATEGORIES.map((category) => (
                                    <Button
                                        key={category.id}
                                        variant={selectedCategory === category.id ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setSelectedCategory(category.id)}
                                        className="flex items-center gap-2"
                                    >
                                        {category.name}
                                        <Badge variant="secondary" className="text-xs">
                                            {category.count}
                                        </Badge>
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Results Summary */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mb-8"
                    >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="text-muted-foreground">
                                {searchQuery ? (
                                    <span>
                                        Found <strong>{resultsCount}</strong> results for{" "}
                                        <strong>"{searchQuery}"</strong>
                                        {selectedCategory !== "all" && (
                                            <> in <strong>{BLOG_CATEGORIES.find(c => c.id === selectedCategory)?.name}</strong></>
                                        )}
                                    </span>
                                ) : (
                                    <span>
                                        {selectedCategory === "all" ? (
                                            <>Showing <strong>{resultsCount}</strong> articles</>
                                        ) : (
                                            <>Showing <strong>{resultsCount}</strong> articles in <strong>{BLOG_CATEGORIES.find(c => c.id === selectedCategory)?.name}</strong></>
                                        )}
                                    </span>
                                )}
                            </div>

                            {/* View Mode Toggle for Mobile */}
                            <div className="flex lg:hidden border rounded-lg p-1 w-fit">
                                <Button
                                    variant={viewMode === "grid" ? "default" : "ghost"}
                                    size="sm"
                                    onClick={() => setViewMode("grid")}
                                    className="h-8"
                                >
                                    <Grid className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant={viewMode === "list" ? "default" : "ghost"}
                                    size="sm"
                                    onClick={() => setViewMode("list")}
                                    className="h-8"
                                >
                                    <List className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Results */}
                    {filteredPosts.length > 0 ? (
                        <div className={`${viewMode === "grid"
                                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                                : "flex flex-col gap-6"
                            }`}>
                            {filteredPosts.map((post, index) => (
                                <motion.div
                                    key={post.id}
                                    custom={index}
                                    initial="initial"
                                    whileInView="animate"
                                    viewport={{ once: true }}
                                    variants={fadeInAnimationVariants}
                                >
                                    {viewMode === "grid" ? (
                                        <MagicCard className="group cursor-pointer h-full">
                                            <Link href={`/blog/${post.slug}`} className="block h-full">
                                                <div className="relative aspect-video mb-4 overflow-hidden rounded-lg">
                                                    <Image
                                                        src={post.image}
                                                        alt={post.title}
                                                        fill
                                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                                    />
                                                </div>
                                                <div className="p-6">
                                                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                                        <Badge variant="secondary">
                                                            {BLOG_CATEGORIES.find(c => c.id === post.category)?.name}
                                                        </Badge>
                                                        <div className="flex items-center gap-1">
                                                            <Calendar className="w-3 h-3" />
                                                            {formatBlogDateShort(post.date)}
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Clock className="w-3 h-3" />
                                                            {post.readTime}
                                                        </div>
                                                    </div>
                                                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                                                        {post.title}
                                                    </h3>
                                                    <p className="text-muted-foreground mb-4 line-clamp-3">
                                                        {post.excerpt}
                                                    </p>
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <Image
                                                                src={post.author.avatar}
                                                                alt={post.author.name}
                                                                width={24}
                                                                height={24}
                                                                className="rounded-full"
                                                            />
                                                            <span className="text-sm text-muted-foreground">
                                                                {post.author.name}
                                                            </span>
                                                        </div>
                                                        <div className="flex flex-wrap gap-1">
                                                            {post.tags.slice(0, 2).map((tag) => (
                                                                <Badge key={tag} variant="outline" className="text-xs">
                                                                    {tag}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </MagicCard>
                                    ) : (
                                        <MagicCard className="group cursor-pointer">
                                            <Link href={`/blog/${post.slug}`} className="block">
                                                <div className="flex flex-col lg:flex-row gap-6 p-6">
                                                    <div className="lg:w-80 lg:flex-shrink-0">
                                                        <div className="relative aspect-video overflow-hidden rounded-lg">
                                                            <Image
                                                                src={post.image}
                                                                alt={post.title}
                                                                fill
                                                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                                            <Badge variant="secondary">
                                                                {BLOG_CATEGORIES.find(c => c.id === post.category)?.name}
                                                            </Badge>
                                                            <div className="flex items-center gap-1">
                                                                <Calendar className="w-3 h-3" />
                                                                {formatBlogDateShort(post.date)}
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <Clock className="w-3 h-3" />
                                                                {post.readTime}
                                                            </div>
                                                        </div>
                                                        <h3 className="text-2xl font-semibold mb-3 group-hover:text-primary transition-colors">
                                                            {post.title}
                                                        </h3>
                                                        <p className="text-muted-foreground mb-4 line-clamp-3">
                                                            {post.excerpt}
                                                        </p>
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-2">
                                                                <Image
                                                                    src={post.author.avatar}
                                                                    alt={post.author.name}
                                                                    width={32}
                                                                    height={32}
                                                                    className="rounded-full"
                                                                />
                                                                <div>
                                                                    <p className="text-sm font-medium">{post.author.name}</p>
                                                                    <p className="text-xs text-muted-foreground">{post.author.bio}</p>
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-wrap gap-1">
                                                                {post.tags.slice(0, 3).map((tag) => (
                                                                    <Badge key={tag} variant="outline" className="text-xs">
                                                                        {tag}
                                                                    </Badge>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </MagicCard>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="text-center py-12"
                        >
                            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-muted">
                                <Search className="w-8 h-8 text-muted-foreground" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                            <p className="text-muted-foreground mb-6">
                                {searchQuery ? (
                                    <>Try searching with different keywords or browse all articles</>
                                ) : (
                                    <>No articles available in this category</>
                                )}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                {searchQuery && (
                                    <Button
                                        variant="outline"
                                        onClick={() => setSearchQuery("")}
                                    >
                                        Clear search
                                    </Button>
                                )}
                                {selectedCategory !== "all" && (
                                    <Button
                                        variant="outline"
                                        onClick={() => setSelectedCategory("all")}
                                    >
                                        Show all categories
                                    </Button>
                                )}
                                <Button asChild>
                                    <Link href="/blog">
                                        Browse all articles
                                    </Link>
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </div>
            </Container>
        </Wrapper>
    );
}
