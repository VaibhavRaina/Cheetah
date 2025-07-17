import Link from "next/link";
import Container from "../global/container";

const Footer = () => {
    return (
        <footer className="w-full border-t border-foreground/10">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
                {/* Main Footer Content */}
                <Container delay={0.1} className="w-full py-6">
                    <div className="flex flex-col items-center space-y-4">
                        {/* Navigation Links */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-8">
                            {/* Legal Links */}
                            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                                <Link
                                    href="/privacy-policy"
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                                >
                                    Privacy Policy
                                </Link>
                                <Link
                                    href="/professional-terms-of-service"
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                                >
                                    Terms of Service
                                </Link>
                                <Link
                                    href="/cancellation-policy"
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                                >
                                    Cancellation Policy
                                </Link>
                            </div>

                            {/* Separator */}
                            <div className="hidden sm:block w-px h-4 bg-border"></div>

                            {/* Contact Links */}
                            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                                <Link
                                    href="/contact"
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                                >
                                    Contact us
                                </Link>
                                <Link
                                    href="/contact-sales"
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                                >
                                    Contact Sales
                                </Link>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="flex items-center justify-center">
                            <Link
                                href="https://x.com/cheetahai"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                                aria-label="Follow us on X (Twitter)"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </Container>

                {/* Copyright Section */}
                <Container delay={0.3} className="w-full">
                    <div className="border-t border-foreground/5 py-3">
                        <div className="flex items-center justify-center">
                            <p className="text-xs text-muted-foreground/80">
                                &copy; {new Date().getFullYear()} Cheetah AI. All rights reserved.
                            </p>
                        </div>
                    </div>
                </Container>
            </div>
        </footer>
    );
};

export default Footer;
