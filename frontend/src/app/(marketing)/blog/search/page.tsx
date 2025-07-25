import { Metadata } from "next";
import BlogSearchClient from "./blog-search-client";

export const metadata: Metadata = {
    title: "Search Blog - Cheetah",
    description: "Search through our collection of articles and tutorials about AI-powered development",
};

// Force static generation for IC deployment
export const dynamic = 'force-static';

export default function BlogSearchPage() {
    return <BlogSearchClient initialQuery="" initialCategory="all" />;
}
