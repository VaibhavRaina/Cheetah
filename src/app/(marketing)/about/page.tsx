import Container from "@/components/global/container";
import { Separator } from "@/components/ui/separator";

const AboutPage = () => {
    return (
        <Container>
            <div className="flex flex-col items-center justify-center min-h-screen py-20">
                <h1 className="text-4xl font-bold">About Us</h1>
                <Separator className="my-8" />
                <p className="text-lg text-center max-w-2xl">
                    Welcome to Cheetah, where we redefine the way you analyze and understand code. Our mission is to provide developers with the most powerful and intuitive tools to enhance their productivity and code quality.
                </p>
                <p className="text-lg text-center max-w-2xl mt-4">
                    Our team is composed of passionate engineers, designers, and data scientists who are dedicated to solving the challenges that developers face every day. We believe in the power of automation and artificial intelligence to augment human capabilities, and we are committed to building a product that is both innovative and easy to use.
                </p>
                <p className="text-lg text-center max-w-2xl mt-4">
                    Thank you for choosing Cheetah. We are excited to have you on this journey with us.
                </p>
            </div>
        </Container>
    );
};

export default AboutPage; 