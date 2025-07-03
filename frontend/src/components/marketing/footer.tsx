import Link from "next/link";
import Container from "../global/container";
import Icons from "../global/icons";

const Footer = () => {
    return (
        <footer className="flex flex-col relative items-center justify-center border-t border-foreground/5 pt-16 pb-8 px-6 lg:px-8 w-full max-w-6xl mx-auto lg:pt-32">
            <div className="grid gap-8 xl:grid-cols-3 xl:gap-8 w-full">
                <Container>
                    <div className="flex flex-col items-start justify-start md:max-w-[200px]">
                        <div className="flex items-center gap-2">
                            <Icons.icon className="w-auto h-5" />
                            <span className="text-base md:text-lg font-medium text-foreground">
                                Cheetah&nbsp;AI
                            </span>
                        </div>
                        <p className="text-muted-foreground mt-4 text-sm text-start">
                            AI-powered platform that accelerates your development workflow.
                        </p>
                    </div>
                </Container>

                <div className="md:grid md:grid-cols-2 md:gap-8">
                    <Container delay={0.1} className="h-auto">
                        <h3 className="text-base font-medium text-foreground">
                            Product
                        </h3>
                        <ul className="mt-4 text-sm text-muted-foreground space-y-4">
                            <li className="mt-2">
                                <Link href="/agent" className="link hover:text-foreground transition-all duration-300">
                                    Agent
                                </Link>
                            </li>
                            <li className="mt-2">
                                <Link href="/chat" className="link hover:text-foreground transition-all duration-300">
                                    Chat
                                </Link>
                            </li>
                            <li className="mt-2">
                                <Link href="/next-edit" className="link hover:text-foreground transition-all duration-300">
                                    Next Edit
                                </Link>
                            </li>
                            <li className="mt-2">
                                <Link href="/completions" className="link hover:text-foreground transition-all duration-300">
                                    Completions
                                </Link>
                            </li>
                            <li className="mt-2">
                                <Link href="/slack" className="link hover:text-foreground transition-all duration-300">
                                    Slack
                                </Link>
                            </li>
                            <li className="mt-2">
                                <Link href="/pricing" className="link hover:text-foreground transition-all duration-300">
                                    Pricing
                                </Link>
                            </li>
                        </ul>
                    </Container>

                    <div className="mt-10 md:mt-0 flex flex-col">
                        <h3 className="text-base font-medium text-foreground">
                            Resources
                        </h3>
                        <ul className="mt-4 text-sm text-muted-foreground space-y-4">
                            <li className="mt-2">
                                <Link href="/docs" className="link hover:text-foreground transition-all duration-300">
                                    Docs
                                </Link>
                            </li>
                            <li className="mt-2">
                                <Link href="/blog" className="link hover:text-foreground transition-all duration-300">
                                    Blog
                                </Link>
                            </li>
                            <li className="mt-2">
                                <Link href="/privacy-security" className="link hover:text-foreground transition-all duration-300">
                                    Privacy & Security
                                </Link>
                            </li>
                            <li className="mt-2">
                                <Link href="/trust-center" className="link hover:text-foreground transition-all duration-300">
                                    Trust Center
                                </Link>
                            </li>
                            <li className="mt-2">
                                <Link href="/status-page" className="link hover:text-foreground transition-all duration-300">
                                    Status Page
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="md:grid md:grid-cols-2 md:gap-8">
                    <Container delay={0.3} className="h-auto">
                        <h3 className="text-base font-medium text-foreground">
                            Company
                        </h3>
                        <ul className="mt-4 text-sm text-muted-foreground space-y-4">
                            <li className="mt-2">
                                <Link href="/careers" className="link hover:text-foreground transition-all duration-300">
                                    Careers
                                </Link>
                            </li>
                            <li className="mt-2">
                                <Link href="/press-inquiries" className="link hover:text-foreground transition-all duration-300">
                                    Press Inquiries
                                </Link>
                            </li>
                            <li className="mt-2">
                                <Link href="/contact-sales" className="link hover:text-foreground transition-all duration-300">
                                    Contact Sales
                                </Link>
                            </li>
                            <li className="mt-2">
                                <Link href="/contact" className="link hover:text-foreground transition-all duration-300">
                                    Contact Support
                                </Link>
                            </li>
                        </ul>
                    </Container>

                    <div className="mt-10 md:mt-0 flex flex-col">
                        <h3 className="text-base font-medium text-foreground">
                            Legal
                        </h3>
                        <ul className="mt-4 text-sm text-muted-foreground space-y-4">
                            <li className="mt-2">
                                <Link href="/cookie-policy" className="link hover:text-foreground transition-all duration-300">
                                    Cookie Policy
                                </Link>
                            </li>
                            <li className="mt-2">
                                <Link href="/privacy-policy" className="link hover:text-foreground transition-all duration-300">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li className="mt-2">
                                <Link href="/community-terms-of-service" className="link hover:text-foreground transition-all duration-300">
                                    Community Terms of Service
                                </Link>
                            </li>
                            <li className="mt-2">
                                <Link href="/professional-terms-of-service" className="link hover:text-foreground transition-all duration-300">
                                    Professional Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <Container delay={0.5} className="w-full relative mt-12 lg:mt-20">
                <div className="mt-8 md:flex md:items-center justify-center footer w-full">
                    <p className="text-sm text-muted-foreground mt-8 md:mt-0">
                        &copy; {new Date().getFullYear()} Cheetah AI. All rights reserved.
                    </p>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
