import { Metadata } from "next";
import BlogFooter from "@/components/blog/blog-footer";

export const metadata: Metadata = {
    title: "Blog - Cheetah",
    description: "Insights, tutorials, and updates from the world of AI-powered development",
};

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background">
            {children}
            <BlogFooter />
        </div>
    );
}
