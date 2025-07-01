"use client";

import Container from "@/components/global/container";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

function CommunityTermsComponent() {
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
                        Community Terms of Service
                    </motion.h1>
                    <Separator className="my-8 w-24 bg-amber-500" />
                    <motion.p
                        className="text-xl text-center max-w-3xl text-muted-foreground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        Guidelines and rules for using Cheetah AI's community features
                    </motion.p>
                </div>
            </Container>

            {/* Content Section */}
            <Container delay={0.2} className="mt-16">
                <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert prose-headings:font-heading prose-headings:text-foreground prose-p:text-muted-foreground">
                    <h2>Introduction</h2>
                    <p>
                        Welcome to the Cheetah AI community! These Community Terms of Service ("Community Terms") govern your access to and use of the community features, forums, and public spaces provided by Cheetah AI ("we," "our," or "us").
                    </p>
                    <p>
                        By accessing or using our community features, you agree to be bound by these Community Terms. If you do not agree to these terms, please do not use our community features.
                    </p>

                    <h2>Community Membership</h2>
                    <p>
                        To participate in our community, you must:
                    </p>
                    <ul>
                        <li>Be at least 18 years old or have parental consent</li>
                        <li>Create an account with accurate information</li>
                        <li>Keep your account credentials secure</li>
                        <li>Notify us of any unauthorized use of your account</li>
                    </ul>

                    <h2>Community Guidelines</h2>
                    <p>
                        Our community is built on respect, collaboration, and knowledge sharing. When participating in our community, you agree to:
                    </p>
                    <ul>
                        <li>Be respectful and courteous to other community members</li>
                        <li>Provide constructive feedback and contributions</li>
                        <li>Share knowledge and help others when possible</li>
                        <li>Follow moderator instructions and community announcements</li>
                        <li>Report inappropriate content or behavior</li>
                    </ul>

                    <h2>Prohibited Conduct</h2>
                    <p>
                        The following behaviors are prohibited in our community:
                    </p>
                    <ul>
                        <li>Harassment, bullying, or intimidation of any kind</li>
                        <li>Hate speech, discriminatory remarks, or offensive content</li>
                        <li>Spamming, flooding, or disruptive behavior</li>
                        <li>Posting illegal, harmful, or infringing content</li>
                        <li>Impersonating others or misrepresenting your affiliation</li>
                        <li>Commercial solicitation without prior approval</li>
                        <li>Distributing malware or engaging in hacking activities</li>
                        <li>Violating the privacy of others</li>
                    </ul>

                    <h2>Content Ownership and Licensing</h2>
                    <p>
                        You retain ownership of the content you post in our community. However, by posting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, and distribute your content in connection with our services.
                    </p>
                    <p>
                        You represent and warrant that you have all necessary rights to the content you post and that your content does not infringe on the rights of any third party.
                    </p>

                    <h2>Moderation and Enforcement</h2>
                    <p>
                        We reserve the right to moderate our community and enforce these Community Terms at our discretion. This may include:
                    </p>
                    <ul>
                        <li>Removing content that violates these terms</li>
                        <li>Issuing warnings to users who violate these terms</li>
                        <li>Temporarily or permanently suspending accounts</li>
                        <li>Restricting access to certain community features</li>
                        <li>Taking any other action we deem appropriate</li>
                    </ul>

                    <h2>Reporting Violations</h2>
                    <p>
                        If you encounter content or behavior that violates these Community Terms, please report it to us immediately by:
                    </p>
                    <ul>
                        <li>Using the reporting feature within the community</li>
                        <li>Emailing us at <a href="mailto:community@cheetah.ai" className="text-amber-500 hover:text-amber-600 transition-colors">community@cheetah.ai</a></li>
                    </ul>

                    <h2>Changes to Community Terms</h2>
                    <p>
                        We may update these Community Terms from time to time. We will notify you of any changes by posting the new terms on our website. Your continued use of our community features after such changes constitutes your acceptance of the new terms.
                    </p>

                    <h2>Termination</h2>
                    <p>
                        We reserve the right to terminate or suspend your access to our community features at any time, without prior notice or liability, for any reason, including without limitation if you breach these Community Terms.
                    </p>

                    <h2>Contact Us</h2>
                    <p>
                        If you have any questions about these Community Terms, please contact us at:
                    </p>
                    <p>
                        Email: <a href="mailto:community@cheetah.ai" className="text-amber-500 hover:text-amber-600 transition-colors">community@cheetah.ai</a>
                    </p>

                    <p className="text-sm text-muted-foreground mt-12">
                        Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                </div>
            </Container>
        </div>
    );
}

export default function CommunityTermsPage() {
    return <CommunityTermsComponent />
};