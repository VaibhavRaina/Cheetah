import Container from "@/components/global/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const ContactPage = () => {
    return (
        <Container>
            <div className="flex flex-col items-center justify-center min-h-screen py-20">
                <h1 className="text-4xl font-bold">Contact Us</h1>
                <Separator className="my-8" />
                <p className="text-lg text-center max-w-2xl mb-8">
                    We would love to hear from you! Whether you have a question about our product, a suggestion for a new feature, or just want to say hello, feel free to reach out to us using the form below.
                </p>
                <form className="w-full max-w-lg">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <Label htmlFor="grid-first-name">
                                First Name
                            </Label>
                            <Input id="grid-first-name" type="text" placeholder="John" />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <Label htmlFor="grid-last-name">
                                Last Name
                            </Label>
                            <Input id="grid-last-name" type="text" placeholder="Doe" />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <Label htmlFor="grid-email">
                                Email
                            </Label>
                            <Input id="grid-email" type="email" placeholder="john.doe@example.com" />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <Label htmlFor="grid-message">
                                Message
                            </Label>
                            <Textarea id="grid-message" placeholder="Your message..." />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button type="submit">
                            Send Message
                        </Button>
                    </div>
                </form>
            </div>
        </Container>
    );
};

export default ContactPage; 