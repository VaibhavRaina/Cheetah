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
                    <h2>Introduction</h2>
                    <p>
                        At Cheetah AI, we respect your privacy and are committed to protecting your personal data.
                        This privacy policy will inform you about how we look after your personal data when you visit our website
                        and tell you about your privacy rights and how the law protects you.
                    </p>

                    <h2>Information We Collect</h2>
                    <p>
                        We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
                    </p>
                    <ul>
                        <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
                        <li><strong>Contact Data</strong> includes email address and telephone numbers.</li>
                        <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
                        <li><strong>Usage Data</strong> includes information about how you use our website, products and services.</li>
                        <li><strong>Marketing and Communications Data</strong> includes your preferences in receiving marketing from us and our third parties and your communication preferences.</li>
                    </ul>

                    <h2>How We Use Your Information</h2>
                    <p>
                        We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                    </p>
                    <ul>
                        <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                        <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                        <li>Where we need to comply with a legal obligation.</li>
                    </ul>

                    <h3>Purposes for which we will use your personal data</h3>
                    <p>
                        We have set out below a description of all the ways we plan to use your personal data:
                    </p>
                    <ul>
                        <li>To register you as a new customer</li>
                        <li>To process and deliver your order</li>
                        <li>To manage our relationship with you</li>
                        <li>To enable you to participate in a prize draw, competition or complete a survey</li>
                        <li>To administer and protect our business and this website</li>
                        <li>To deliver relevant website content and advertisements to you</li>
                        <li>To use data analytics to improve our website, products/services, marketing, customer relationships and experiences</li>
                        <li>To make suggestions and recommendations to you about goods or services that may be of interest to you</li>
                    </ul>

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

export default function PrivacyPolicyPage() {
    return <PrivacyPolicyComponent />
};