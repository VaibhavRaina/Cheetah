"use client";

import Container from "@/components/global/container";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

function CookiePolicyComponent() {
    return (
        <div className="min-h-screen py-20">
            {/* Hero Section */}
            <Container>
                <div className="flex flex-col items-center justify-center">
                    <motion.h1
                        className="text-5xl md:text-6xl font-bold text-center bg-gradient-to-r from-amber-500 to-orange-700 bg-clip-text text-transparent"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Cookie Policy
                    </motion.h1>
                    <Separator className="my-8 w-24 bg-amber-500" />
                    <motion.p
                        className="text-xl text-center max-w-3xl text-muted-foreground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        How we use cookies to improve your experience with Cheetah AI
                    </motion.p>
                </div>
            </Container>

            {/* Content Section */}
            <Container delay={0.2} className="mt-16">
                <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert prose-headings:font-heading prose-headings:text-foreground prose-p:text-muted-foreground">
                    <h2>What Are Cookies</h2>
                    <p>
                        Cookies are small text files that are placed on your computer or mobile device when you visit a website.
                        They are widely used to make websites work more efficiently and provide information to the owners of the site.
                    </p>

                    <h2>How We Use Cookies</h2>
                    <p>
                        At Cheetah AI, we use cookies for several purposes, including:
                    </p>
                    <ul>
                        <li><strong>Essential cookies:</strong> These are necessary for the website to function properly and cannot be switched off in our systems.</li>
                        <li><strong>Performance cookies:</strong> These help us understand how visitors interact with our website by collecting and reporting information anonymously.</li>
                        <li><strong>Functional cookies:</strong> These enable the website to provide enhanced functionality and personalization.</li>
                        <li><strong>Targeting cookies:</strong> These may be set through our site by our advertising partners to build a profile of your interests.</li>
                    </ul>

                    <h2>Types of Cookies We Use</h2>

                    <h3>Essential Cookies</h3>
                    <p>
                        These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in, or filling in forms.
                    </p>

                    <h3>Performance Cookies</h3>
                    <p>
                        These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site.
                    </p>

                    <h3>Functional Cookies</h3>
                    <p>
                        These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.
                    </p>

                    <h3>Targeting Cookies</h3>
                    <p>
                        These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites.
                    </p>

                    <h2>Managing Cookies</h2>
                    <p>
                        Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set, visit <a href="https://www.allaboutcookies.org" className="text-amber-500 hover:text-amber-600 transition-colors">www.allaboutcookies.org</a>.
                    </p>

                    <p>
                        You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, please note that some parts of this website may become inaccessible or not function properly.
                    </p>

                    <h2>Changes to Our Cookie Policy</h2>
                    <p>
                        We may update our Cookie Policy from time to time. Any changes we make to our Cookie Policy in the future will be posted on this page and, where appropriate, notified to you by email.
                    </p>

                    <h2>Contact Us</h2>
                    <p>
                        If you have any questions about our Cookie Policy, please contact us at:
                    </p>
                    <p>
                        Email: <a href="mailto:privacy@cheetah.ai" className="text-amber-500 hover:text-amber-600 transition-colors">privacy@cheetah.ai</a>
                    </p>

                    <p className="text-sm text-muted-foreground mt-12">
                        Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                </div>
            </Container>
        </div>
    );
}

export default function CookiePolicyPage() {
    return <CookiePolicyComponent />
};