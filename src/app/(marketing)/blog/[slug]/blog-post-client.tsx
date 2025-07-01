"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Container from "@/components/global/container";
import Wrapper from "@/components/global/wrapper";
import { BlogPost, BLOG_POSTS } from "@/constants/blog";
import BlogSidebar from "@/components/blog/blog-sidebar";
import BlogBreadcrumb, { getPostBreadcrumbs } from "@/components/blog/blog-breadcrumb";
import { formatBlogDate } from "@/utils/date";
import { ArrowLeft, Calendar, Clock, Tag, Share2, BookOpen, ChevronRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface BlogPostClientProps {
    post: BlogPost;
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
    const relatedPosts = BLOG_POSTS
        .filter(p => p.id !== post.id && p.category === post.category)
        .slice(0, 3);

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
                {/* Back Button and Breadcrumb */}
                <Container>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-4"
                    >
                        <BlogBreadcrumb items={getPostBreadcrumbs(post.category, post.title)} />
                        <Link href="/blog">
                            <Button variant="ghost" className="p-0">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Blog
                            </Button>
                        </Link>
                    </motion.div>
                </Container>

                {/* Hero Image */}
                <Container delay={0.2}>
                    <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-8">
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    </div>
                </Container>

                {/* Article Header */}
                <Container delay={0.3}>
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-6">
                            <Badge variant="secondary" className="mb-4">
                                {post.category}
                            </Badge>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold !leading-tight mb-4">
                                {post.title}
                            </h1>
                            <p className="text-lg md:text-xl text-muted-foreground mb-6">
                                {post.excerpt}
                            </p>
                        </div>

                        {/* Article Meta */}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 pb-8 border-b border-border">
                            <div className="flex items-center gap-4">
                                <Avatar className="w-12 h-12">
                                    <AvatarImage src={post.author.avatar} alt={post.author.name} />
                                    <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-medium">{post.author.name}</p>
                                    <p className="text-sm text-muted-foreground">{post.author.bio}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    <span>{formatBlogDate(post.date)}</span>
                                </div>
                                <div className="flex items-center">
                                    <Clock className="w-4 h-4 mr-2" />
                                    <span>{post.readTime}</span>
                                </div>
                                <Button variant="outline" size="sm">
                                    <Share2 className="w-4 h-4 mr-2" />
                                    Share
                                </Button>
                            </div>
                        </div>
                    </div>
                </Container>

                {/* Article Content */}
                <Container delay={0.4}>
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Main Content */}
                            <div className="lg:col-span-2">
                                <div className="prose prose-lg dark:prose-invert max-w-none">
                                    <ReactMarkdown
                                        components={{
                                            code({ inline, className, children, ...props }: any) {
                                                const match = /language-(\w+)/.exec(className || '');
                                                return !inline && match ? (
                                                    <SyntaxHighlighter
                                                        style={oneDark}
                                                        language={match[1]}
                                                        PreTag="div"
                                                        {...props}
                                                    >
                                                        {String(children).replace(/\n$/, '')}
                                                    </SyntaxHighlighter>
                                                ) : (
                                                    <code className={className} {...props}>
                                                        {children}
                                                    </code>
                                                );
                                            }
                                        }}
                                    >
                                        {post.content}
                                    </ReactMarkdown>

                                    {/* Tags */}
                                    <div className="mt-8 pt-6 border-t border-border">
                                        <div className="flex flex-wrap gap-2">
                                            {post.tags.map((tag) => (
                                                <Badge key={tag} variant="outline" className="flex items-center">
                                                    <Tag className="w-3 h-3 mr-1" />
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-8">
                                    <BlogSidebar currentPost={post} />
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>

                {/* Author Bio */}
                <Container delay={0.6}>
                    <div className="max-w-4xl mx-auto">
                        <Separator className="mb-8" />
                        <div className="bg-accent/5 rounded-xl p-6 mb-12">
                            <div className="flex items-start gap-4">
                                <Avatar className="w-16 h-16">
                                    <AvatarImage src={post.author.avatar} alt={post.author.name} />
                                    <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">About {post.author.name}</h3>
                                    <p className="text-muted-foreground">{post.author.bio}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <Container delay={0.7}>
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {relatedPosts.map((relatedPost, index) => (
                                    <motion.div
                                        key={relatedPost.id}
                                        className="group"
                                        variants={fadeInAnimationVariants}
                                        initial="initial"
                                        whileInView="animate"
                                        viewport={{ once: true }}
                                        custom={index}
                                    >
                                        <Link href={`/blog/${relatedPost.slug}`}>
                                            <div className="rounded-xl overflow-hidden border border-border h-full flex flex-col hover:shadow-lg transition-shadow">
                                                <div className="relative h-48 overflow-hidden">
                                                    <Image
                                                        src={relatedPost.image}
                                                        alt={relatedPost.title}
                                                        fill
                                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                                    />
                                                </div>
                                                <div className="p-4 flex flex-col flex-grow">
                                                    <Badge variant="secondary" className="w-fit mb-2">
                                                        {relatedPost.category}
                                                    </Badge>
                                                    <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                                        {relatedPost.title}
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-grow">
                                                        {relatedPost.excerpt}
                                                    </p>
                                                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                                                        <span>{relatedPost.readTime}</span>
                                                        <span className="flex items-center">
                                                            Read more <ChevronRight className="w-3 h-3 ml-1" />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </Container>
                )}

                {/* Newsletter CTA */}
                <Container delay={0.8}>
                    <div className="max-w-4xl mx-auto mt-16">
                        <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-2xl p-8 text-center">
                            <BookOpen className="w-12 h-12 mx-auto mb-4 text-accent" />
                            <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
                            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                                Subscribe to our newsletter for the latest insights on AI development,
                                exclusive content, and product updates.
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
