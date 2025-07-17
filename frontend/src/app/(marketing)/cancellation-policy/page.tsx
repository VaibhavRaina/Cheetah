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
                                        <p>Email us at <a href="mailto:support@cheetah.ai" className="text-accent hover:underline">support@cheetah.ai</a> with your cancellation request.</p>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold mb-4">Refund Policy</h2>
                                <div className="space-y-4 text-muted-foreground">
                                    <p>
                                        We offer a 30-day money-back guarantee for new subscribers. If you're not satisfied with Cheetah AI within the first 30 days of your initial subscription, you may request a full refund.
                                    </p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>Refunds are only available for the first 30 days of your initial subscription</li>
                                        <li>Refunds do not apply to subscription renewals</li>
                                        <li>Refund requests must be submitted within 30 days of the original purchase</li>
                                        <li>Refunds will be processed within 5-10 business days</li>
                                    </ul>
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
                                    <p>Email: <a href="mailto:support@cheetah.ai" className="text-accent hover:underline">support@cheetah.ai</a></p>
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