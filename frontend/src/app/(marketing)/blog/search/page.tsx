import { Metadata } from "next";
import BlogSearchClient from "./blog-search-client";

export const metadata: Metadata = {
    title: "Search Blog - Cheetah",
    description: "Search through our collection of articles and tutorials about AI-powered development",
};

export default async function BlogSearchPage({
    searchParams
}: {
    searchParams: Promise<{ q?: string, category?: string }>
}) {
    const { q, category } = await searchParams;
    return <BlogSearchClient initialQuery={q || ""} initialCategory={category || "all"} />;
}
