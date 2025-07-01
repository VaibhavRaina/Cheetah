"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { MagicCard } from "@/components/ui/magic-card";
import { BlogPost, BLOG_CATEGORIES } from "@/constants/blog";
import { Calendar, Clock, User } from "lucide-react";
import { motion } from "framer-motion";
import { formatBlogDateShort } from "@/utils/date";

interface BlogPostCardProps {
    post: BlogPost;
    viewMode?: "grid" | "list";
    index?: number;
    className?: string;
}

export default function BlogPostCard({
    post,
    viewMode = "grid",
    index = 0,
    className = ""
}: BlogPostCardProps) {
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

    const categoryName = BLOG_CATEGORIES.find(cat => cat.id === post.category)?.name || post.category;

    if (viewMode === "list") {
        return (
            <motion.div
                custom={index}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={fadeInAnimationVariants}
                className={className}
            >
                <MagicCard className="group cursor-pointer hover:shadow-lg transition-shadow">
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
                                        {categoryName}
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
                                <h3 className="text-2xl font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
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
            </motion.div>
        );
    }

    return (
        <motion.div
            custom={index}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInAnimationVariants}
            className={className}
        >
            <MagicCard className="group cursor-pointer h-full hover:shadow-lg transition-shadow">
                <Link href={`/blog/${post.slug}`} className="block h-full">
                    <div className="relative aspect-video mb-4 overflow-hidden rounded-lg">
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {post.featured && (
                            <div className="absolute top-3 left-3">
                                <Badge className="bg-primary text-primary-foreground">
                                    Featured
                                </Badge>
                            </div>
                        )}
                    </div>
                    <div className="p-6">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <Badge variant="secondary">
                                {categoryName}
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
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
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
        </motion.div>
    );
}
