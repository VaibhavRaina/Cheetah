"use client";

import Container from "@/components/global/container";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

function ProfessionalTermsComponent() {
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
                        Professional Terms of Service
                    </motion.h1>
                    <Separator className="my-8 w-24 bg-amber-500" />
                    <motion.p
                        className="text-xl text-center max-w-3xl text-muted-foreground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        Terms governing professional and paid services provided by Cheetah AI
                    </motion.p>
                </div>
            </Container>

            {/* Content Section */}
            <Container delay={0.2} className="mt-16">
                <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert prose-headings:font-heading prose-headings:text-foreground prose-p:text-muted-foreground">
                    <div className="bg-muted/30 p-6 rounded-lg mb-8">
                        <p className="text-sm text-muted-foreground mb-2">Effective Date: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                        <p className="text-sm text-muted-foreground">
                            These Terms of Service govern your use of CheetahAI's AI-powered development tools and services.
                        </p>
                    </div>

                    <h2>1. Acceptance of Terms</h2>
                    <p>
                        By accessing or using CheetahAI's services, website, or applications (collectively, the "Services"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you may not access the Services.
                    </p>
                    <p>
                        If you are using our Services on behalf of an organization, you represent and warrant that you have the authority to bind that organization to these Terms, and your agreement to these Terms will be treated as the agreement of the organization.
                    </p>

                    <h2>2. Service Description</h2>
                    <p>
                        CheetahAI provides AI-powered development tools and services designed to enhance developer productivity and code quality. Our Services include:
                    </p>
                    <ul>
                        <li>AI-powered code completion and suggestions</li>
                        <li>Code analysis and optimization recommendations</li>
                        <li>Automated documentation generation</li>
                        <li>Code review and quality assessment tools</li>
                        <li>API access for integration with development environments</li>
                        <li>Enterprise solutions with custom configurations</li>
                        <li>Professional support and consulting services</li>
                    </ul>

                    <h2>Subscription and Billing</h2>
                    <h3>Subscription Plans</h3>
                    <p>
                        We offer various subscription plans with different features and pricing. The specific features included in each plan are described on our pricing page. We reserve the right to modify, terminate, or otherwise amend our offered subscription plans.
                    </p>

                    <h3>Billing and Payment</h3>
                    <p>
                        You agree to pay all fees associated with your subscription plan. Unless otherwise specified:
                    </p>
                    <ul>
                        <li>All fees are quoted in US Dollars</li>
                        <li>Payments are due in advance of the billing period</li>
                        <li>Subscription fees are non-refundable except as required by law or as explicitly stated in these terms</li>
                        <li>You are responsible for all taxes applicable to your subscription</li>
                    </ul>

                    <h3>Subscription Term and Renewal</h3>
                    <p>
                        Your subscription will automatically renew at the end of each billing period unless you cancel it before the renewal date. You can cancel your subscription at any time through your account settings or by contacting our support team.
                    </p>

                    <h2>API Usage and Limitations</h2>
                    <p>
                        If your subscription includes API access, the following terms apply:
                    </p>
                    <ul>
                        <li>API usage is subject to rate limits as specified in our documentation</li>
                        <li>You may not share your API credentials with third parties</li>
                        <li>You are responsible for all activities that occur under your API credentials</li>
                        <li>We reserve the right to modify our API at any time</li>
                        <li>We may suspend or terminate your API access if we detect abuse or violations of these terms</li>
                    </ul>

                    <h2>Data Processing and Security</h2>
                    <p>
                        When you use our Professional Services, we may process data on your behalf. Our data processing activities are governed by our Privacy Policy and, where applicable, by a Data Processing Agreement.
                    </p>
                    <p>
                        We implement reasonable security measures to protect your data, but you are responsible for:
                    </p>
                    <ul>
                        <li>Maintaining the security of your account credentials</li>
                        <li>Configuring your usage of the Professional Services in a manner that appropriately secures your data</li>
                        <li>Ensuring that your use of the Professional Services complies with applicable laws and regulations</li>
                    </ul>

                    <h2>Intellectual Property</h2>
                    <h3>Our Intellectual Property</h3>
                    <p>
                        The Professional Services, including all software, designs, text, graphics, and other content, are owned by Cheetah AI or our licensors and are protected by intellectual property laws. We grant you a limited, non-exclusive, non-transferable license to use the Professional Services in accordance with these Professional Terms.
                    </p>

                    <h3>Your Content</h3>
                    <p>
                        You retain all rights to your content that you upload, submit, or otherwise make available through the Professional Services. By using our Professional Services, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, and distribute your content solely for the purpose of providing the Professional Services to you.
                    </p>

                    <h2>Confidentiality</h2>
                    <p>
                        Each party agrees to keep confidential any non-public information disclosed by the other party in connection with the Professional Services, whether disclosed orally or in writing, that is designated as confidential or that reasonably should be understood to be confidential given the nature of the information and the circumstances of disclosure.
                    </p>

                    <h2>Warranties and Disclaimers</h2>
                    <p>
                        We provide the Professional Services on an "as is" and "as available" basis. To the maximum extent permitted by law, we disclaim all warranties, express or implied, including implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
                    </p>
                    <p>
                        We do not warrant that the Professional Services will be uninterrupted, error-free, or completely secure, or that any data will be completely accurate or reliable.
                    </p>

                    <h2>Limitation of Liability</h2>
                    <p>
                        To the maximum extent permitted by law, in no event will Cheetah AI be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of or inability to use the Professional Services.
                    </p>
                    <p>
                        Our total liability for any claims arising under these Professional Terms shall not exceed the amount paid by you to Cheetah AI for the Professional Services during the 12 months preceding the event giving rise to the liability.
                    </p>

                    <h2>Termination</h2>
                    <p>
                        We may terminate or suspend your access to the Professional Services immediately, without prior notice or liability, for any reason, including without limitation if you breach these Professional Terms.
                    </p>
                    <p>
                        Upon termination, your right to use the Professional Services will immediately cease. All provisions of these Professional Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
                    </p>

                    <h2>Changes to Professional Terms</h2>
                    <p>
                        We may update these Professional Terms from time to time. We will notify you of any changes by posting the new terms on our website and updating the "Last updated" date. Your continued use of the Professional Services after such changes constitutes your acceptance of the new terms.
                    </p>

                    <h2>Governing Law and Dispute Resolution</h2>
                    <p>
                        These Professional Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
                    </p>
                    <p>
                        Any dispute arising from or relating to these Professional Terms shall be resolved through binding arbitration in accordance with the rules of [Arbitration Association] in [City, State/Country].
                    </p>

                    <h2>Contact Us</h2>
                    <p>
                        If you have any questions about these Professional Terms, please contact us at:
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

export default function ProfessionalTermsPage() {
    return <ProfessionalTermsComponent />
};