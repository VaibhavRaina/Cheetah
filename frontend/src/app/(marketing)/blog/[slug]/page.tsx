import { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostClient from "./blog-post-client";
import { BLOG_POSTS } from "@/constants/blog";

export async function generateStaticParams() {
    return BLOG_POSTS.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = BLOG_POSTS.find(p => p.slug === slug);

    if (!post) {
        return {
            title: "Post Not Found - Cheetah Blog",
        };
    }

    return {
        title: `${post.title} - Cheetah Blog`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: [post.image],
            type: 'article',
            publishedTime: post.date,
            authors: [post.author.name],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            images: [post.image],
        },
    };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = BLOG_POSTS.find(p => p.slug === params.slug);

    if (!post) {
        notFound();
    }

    return <BlogPostClient post={post} />;
}
