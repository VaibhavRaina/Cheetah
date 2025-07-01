import { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogCategoryClient from "./blog-category-client";
import { BLOG_CATEGORIES, BLOG_POSTS } from "@/constants/blog";

export async function generateStaticParams() {
    return BLOG_CATEGORIES.map((category) => ({
        category: category.id,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
    const { category } = await params;
    const categoryData = BLOG_CATEGORIES.find(c => c.id === category);

    if (!categoryData) {
        return {
            title: "Category Not Found - Cheetah Blog",
        };
    }

    return {
        title: `${categoryData.name} - Cheetah Blog`,
        description: categoryData.description,
    };
}

export default async function BlogCategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params;
    const categoryData = BLOG_CATEGORIES.find(c => c.id === category);

    if (!categoryData) {
        notFound();
    }

    const posts = category === 'all'
        ? BLOG_POSTS
        : BLOG_POSTS.filter(post => post.category === category);

    return <BlogCategoryClient category={categoryData} posts={posts} />;
}
