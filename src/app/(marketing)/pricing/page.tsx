import { PLANS } from "@/constants";
import Container from "@/components/global/container";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";

export const metadata = {
    title: "Pricing | Cheetah AI",
    description: "Find the perfect Cheetah AI plan for your needs",
};

export default function PricingPage() {
    return (
        <section className="py-16 md:py-24">
            <Container>
                <div className="flex flex-col items-center justify-center max-w-3xl mx-auto">
                    <div className="text-center space-y-4">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-medium !leading-snug">
                            Simple pricing.
                        </h1>
                        <p className="text-sm uppercase tracking-wider text-accent-foreground/70 font-medium">
                            Pay for what matters. Enjoy everything else.
                        </p>
                    </div>
                </div>
            </Container>

            <div className="max-w-7xl mx-auto mt-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
                    {PLANS.map((plan) => (
                        <div
                            key={plan.id}
                            className="flex flex-col rounded-2xl border border-foreground/10 bg-background overflow-hidden"
                        >
                            <div className="p-6 pb-0">
                                <h3 className="uppercase font-medium text-sm text-foreground/70">
                                    {plan.id === "community" ? "Community" : plan.id === "developer" ? "Developer" : "Teams"}
                                </h3>
                                <div className="mt-4 flex items-baseline">
                                    <h2 className="font-heading text-4xl font-medium">
                                        {plan.id === "community"
                                            ? "Free"
                                            : plan.id === "developer"
                                                ? "$50"
                                                : "Enterprise"}
                                    </h2>
                                    {plan.id === "developer" && <span className="ml-2 text-base">/month</span>}
                                </div>
                                <p className="mt-2 text-sm text-foreground/70">{plan.desc}</p>
                            </div>

                            <div className="p-6 space-y-6 flex-1 flex flex-col">
                                <div>
                                    <h4 className="font-medium">Plan Highlights</h4>
                                    <ul className="mt-4 space-y-3">
                                        {plan.features.map((feature, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <CheckIcon className="h-5 w-5 flex-shrink-0 text-primary" />
                                                <span className="text-sm">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="mt-auto pt-6">
                                    <Button
                                        variant={plan.id === "developer" ? "default" : "outline"}
                                        size="lg"
                                        className="w-full"
                                    >
                                        {plan.buttonText}
                                    </Button>
                                    {plan.id === "developer" && (
                                        <p className="text-xs text-center mt-3 text-muted-foreground">
                                            Need more messages? See plans below.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Container>
                <div className="mt-20 max-w-3xl mx-auto">
                    <h2 className="text-2xl font-heading font-medium mb-8">Frequently asked questions</h2>
                    <div className="space-y-6">
                        <div className="pb-6 border-b border-foreground/10">
                            <h3 className="font-medium mb-2">What is a user message?</h3>
                            <p className="text-sm text-foreground/70">
                                User messages are the prompts or requests you send to Cheetah AI. Each plan includes a set number of
                                messages per month, with the option to purchase additional message packs as needed.
                            </p>
                        </div>
                        <div className="pb-6 border-b border-foreground/10">
                            <h3 className="font-medium mb-2">Are User Messages Pooled?</h3>
                            <p className="text-sm text-foreground/70">
                                Yes, all user messages are pooled across your team members for maximum flexibility in how you use your
                                allocation.
                            </p>
                        </div>
                        <div className="pb-6 border-b border-foreground/10">
                            <h3 className="font-medium mb-2">What happens if I run out of user messages?</h3>
                            <p className="text-sm text-foreground/70">
                                You can purchase additional message packs at any time. These are automatically added to your account and
                                will be available immediately.
                            </p>
                        </div>
                        <div className="pb-6 border-b border-foreground/10">
                            <h3 className="font-medium mb-2">Do you train on my data?</h3>
                            <p className="text-sm text-foreground/70">
                                We only train on data from the Community plan. For Developer, Teams, and Enterprise plans,
                                we never train on your data, ensuring your code and intellectual property remain completely private.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-medium mb-2">How are you handling Security & Compliance?</h3>
                            <p className="text-sm text-foreground/70">
                                We take security seriously with SOC 2 Type II compliance on all paid plans. Enterprise plans include
                                additional security features like SSO integration, OIDC, SCIM support, and comprehensive security reports.
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
} 