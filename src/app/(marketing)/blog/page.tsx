import Container from "@/components/global/container";
import { Separator } from "@/components/ui/separator";

const BlogPage = () => {
    return (
        <Container>
            <div className="flex flex-col items-center justify-center min-h-screen py-20">
                <h1 className="text-4xl font-bold">Blog</h1>
                <Separator className="my-8" />
                <p className="text-lg text-center max-w-2xl">
                    Our blog is coming soon! We are working hard to bring you the latest news, updates, and insights about Cheetah and the world of code analysis. Stay tuned for more information.
                </p>
            </div>
        </Container>
    );
};

export default BlogPage; 