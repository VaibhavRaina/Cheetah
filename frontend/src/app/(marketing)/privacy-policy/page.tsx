"use client";

import Container from "@/components/global/container";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

function PrivacyPolicyComponent() {
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
                        Privacy Policy
                    </motion.h1>
                    <Separator className="my-8 w-24 bg-amber-500" />
                    <motion.p
                        className="text-xl text-center max-w-3xl text-muted-foreground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        How we collect, use, and protect your information at Cheetah AI
                    </motion.p>
                </div>
            </Container>

            {/* Content Section */}
            <Container delay={0.2} className="mt-16">
                <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert prose-headings:font-heading prose-headings:text-foreground prose-p:text-muted-foreground">
                    <div className="bg-muted/30 p-6 rounded-lg mb-8">
                        <p className="text-sm text-muted-foreground mb-2">Effective Date: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                        <p className="text-sm text-muted-foreground">
                            This Privacy Policy describes how CheetahAI ("we," "our," or "us") collects, uses, and shares your personal information when you use our AI-powered development tools and services.
                        </p>
                    </div>

                    <h2>1. Introduction</h2>
                    <p>
                        At CheetahAI, we are committed to protecting your privacy and ensuring the security of your personal information.
                        This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our
                        AI-powered development tools, website, and related services (collectively, the "Services").
                    </p>
                    <p>
                        By using our Services, you consent to the data practices described in this Privacy Policy.
                        If you do not agree with the practices described in this policy, please do not use our Services.
                    </p>

                    <h2>2. Information We Collect</h2>
                    <p>
                        We collect information you provide directly to us, information we obtain automatically when you use our Services, and information from third-party sources.
                    </p>

                    <h3>Information You Provide to Us</h3>
                    <ul>
                        <li><strong>Account Information:</strong> Name, email address, username, and password when you create an account</li>
                        <li><strong>Profile Information:</strong> Optional profile details, preferences, and settings</li>
                        <li><strong>Payment Information:</strong> Billing details and payment method information (processed securely by our payment processors)</li>
                        <li><strong>Communications:</strong> Messages, feedback, and support requests you send to us</li>
                        <li><strong>Code and Content:</strong> Source code, documentation, and other content you input into our AI tools</li>
                    </ul>

                    <h3>Information We Collect Automatically</h3>
                    <ul>
                        <li><strong>Usage Data:</strong> How you interact with our Services, features used, time spent, and usage patterns</li>
                        <li><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers</li>
                        <li><strong>Log Data:</strong> Server logs, error reports, and performance metrics</li>
                        <li><strong>Cookies and Tracking:</strong> Information collected through cookies and similar technologies</li>
                    </ul>

                    <h2>3. How We Use Your Information</h2>
                    <p>
                        We use the information we collect for the following purposes:
                    </p>
                    <ul>
                        <li><strong>Provide and Improve Services:</strong> To operate, maintain, and enhance our AI development tools</li>
                        <li><strong>Account Management:</strong> To create and manage your account, authenticate users, and provide customer support</li>
                        <li><strong>AI Model Training:</strong> To improve our AI models and algorithms (using anonymized and aggregated data only)</li>
                        <li><strong>Communication:</strong> To send service updates, security alerts, and respond to your inquiries</li>
                        <li><strong>Payment Processing:</strong> To process subscription payments and manage billing</li>
                        <li><strong>Security and Compliance:</strong> To detect fraud, ensure security, and comply with legal obligations</li>
                        <li><strong>Analytics:</strong> To understand usage patterns and improve user experience</li>
                    </ul>

                    <h3>Code Processing and AI Training</h3>
                    <p>
                        <strong>Important:</strong> We do not use your private code or proprietary content to train our AI models.
                        Your code remains private and is only processed to provide you with AI-powered suggestions and assistance.
                        We may use anonymized, aggregated usage patterns to improve our services.
                    </p>

                    <h2>Data Security</h2>
                    <p>
                        We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
                    </p>

                    <h2>Data Retention</h2>
                    <p>
                        We will only retain your personal data for as long as reasonably necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, regulatory, tax, accounting or reporting requirements.
                    </p>

                    <h2>Your Legal Rights</h2>
                    <p>
                        Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
                    </p>
                    <ul>
                        <li>Request access to your personal data</li>
                        <li>Request correction of your personal data</li>
                        <li>Request erasure of your personal data</li>
                        <li>Object to processing of your personal data</li>
                        <li>Request restriction of processing your personal data</li>
                        <li>Request transfer of your personal data</li>
                        <li>Right to withdraw consent</li>
                    </ul>

                    <h2>International Transfers</h2>
                    <p>
                        We may share your personal data within our group of companies and with external third parties, which may involve transferring your data outside the European Economic Area (EEA).
                    </p>
                    <p>
                        Whenever we transfer your personal data out of the EEA, we ensure a similar degree of protection is afforded to it by ensuring at least one of the following safeguards is implemented:
                    </p>
                    <ul>
                        <li>We will only transfer your personal data to countries that have been deemed to provide an adequate level of protection for personal data by the European Commission.</li>
                        <li>Where we use certain service providers, we may use specific contracts approved by the European Commission which give personal data the same protection it has in Europe.</li>
                    </ul>

                    <h2>Changes to This Privacy Policy</h2>
                    <p>
                        We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page.
                    </p>

                    <h2>Contact Us</h2>
                    <p>
                        If you have any questions about this privacy policy or our privacy practices, please contact us at:
                    </p>
                    <p>
                        Email: <a href="mailto:support@cheetahai.co" className="text-amber-500 hover:text-amber-600 transition-colors">support@cheetahai.co</a>
                    </p>

                    <p className="text-sm text-muted-foreground mt-12">
                        Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                </div>
            </Container>
        </div>
    );
}

export default function PrivacyPolicyPage() {
    return <PrivacyPolicyComponent />
};