import { Metadata } from "next";
import Wrapper from "@/components/global/wrapper";
import Container from "@/components/global/container";

export const metadata: Metadata = {
    title: "Cancellation Policy - Cheetah AI",
    description: "Learn about Cheetah AI's cancellation policy and how to cancel your subscription.",
};

export default function CancellationPolicyPage() {
    return (
        <Wrapper className="py-20">
            <Container>
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Cancellation Policy
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Information about canceling your Cheetah AI subscription
                        </p>
                    </div>

                    <div className="prose prose-gray dark:prose-invert max-w-none">
                        <div className="space-y-8">
                            <section>
                                <h2 className="text-2xl font-semibold mb-4">Subscription Cancellation</h2>
                                <p className="text-muted-foreground mb-4">
                                    You may cancel your Cheetah AI subscription at any time through your account dashboard or by contacting our support team.
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                                    <li>Cancellations can be processed immediately through your dashboard</li>
                                    <li>You will retain access to premium features until the end of your current billing period</li>
                                    <li>No partial refunds are provided for unused portions of the billing period</li>
                                    <li>Your account will automatically downgrade to the free Community plan after cancellation</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold mb-4">How to Cancel</h2>
                                <div className="space-y-4 text-muted-foreground">
                                    <div>
                                        <h3 className="text-lg font-medium text-foreground mb-2">Through Your Dashboard:</h3>
                                        <ol className="list-decimal pl-6 space-y-1">
                                            <li>Log in to your Cheetah AI account</li>
                                            <li>Navigate to Settings → Subscription</li>
                                            <li>Click "Cancel Subscription"</li>
                                            <li>Follow the prompts to confirm cancellation</li>
                                        </ol>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium text-foreground mb-2">Contact Support:</h3>
                                        <p>Email us at <a href="mailto:support@cheetahai.co" className="text-accent hover:underline">support@cheetahai.co</a> with your cancellation request.</p>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold mb-4">Refund Policy</h2>
                                <div className="space-y-4 text-muted-foreground">
                                    <div className="bg-white dark:bg-white border border-red-200 dark:border-red-300 rounded-lg p-4">
                                        <h3 className="text-lg font-medium text-red-600 dark:text-red-600 mb-2">Important: No Refund Policy</h3>
                                        <p className="text-red-500 dark:text-red-500">
                                            CheetahAI operates a strict no-refund policy. All subscription payments are final and non-refundable.
                                        </p>
                                    </div>

                                    <h3 className="text-lg font-medium text-foreground">Exceptions to No-Refund Policy</h3>
                                    <p>
                                        Refunds will only be considered in the following circumstances:
                                    </p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li><strong>Service Outages:</strong> Extended service unavailability due to technical issues on our end</li>
                                        <li><strong>Billing Errors:</strong> Incorrect charges or duplicate payments caused by our billing system</li>
                                        <li><strong>Service Defects:</strong> Major functionality failures that prevent normal use of our services</li>
                                        <li><strong>Legal Requirements:</strong> Where refunds are mandated by applicable consumer protection laws</li>
                                    </ul>

                                    <h3 className="text-lg font-medium text-foreground">What This Means</h3>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>No refunds for change of mind or dissatisfaction with features</li>
                                        <li>No partial refunds for unused portions of subscription periods</li>
                                        <li>No refunds for account suspensions due to terms of service violations</li>
                                        <li>Refunds are only provided when the issue originates from CheetahAI's systems or services</li>
                                    </ul>

                                    <p className="text-sm bg-muted/50 p-3 rounded">
                                        <strong>Recommendation:</strong> We encourage you to try our free tier or contact our sales team for a demo before subscribing to ensure our services meet your needs.
                                    </p>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold mb-4">Data Retention</h2>
                                <p className="text-muted-foreground mb-4">
                                    After cancellation:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                                    <li>Your account data will be preserved for 90 days in case you decide to reactivate</li>
                                    <li>You can reactivate your subscription at any time during this period</li>
                                    <li>After 90 days, premium features and data may be permanently deleted</li>
                                    <li>Basic account information will be retained as required by law</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                                <p className="text-muted-foreground">
                                    If you have any questions about our cancellation policy or need assistance with canceling your subscription, please contact our support team:
                                </p>
                                <div className="mt-4 space-y-2 text-muted-foreground">
                                    <p>Email: <a href="mailto:support@cheetahai.co" className="text-accent hover:underline">support@cheetahai.co</a></p>
                                    <p>Response time: Within 24 hours</p>
                                </div>
                            </section>

                            <section className="border-t pt-8">
                                <p className="text-sm text-muted-foreground">
                                    This cancellation policy was last updated on {new Date().toLocaleDateString()}. We reserve the right to modify this policy at any time with notice to our users.
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </Container>
        </Wrapper>
    );
}