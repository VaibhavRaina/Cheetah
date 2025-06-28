import { PLANS } from "@/constants";
import Container from "@/components/global/container";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib";

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
                <div className="flex flex-col md:flex-row gap-6 px-4 items-stretch">
                    {PLANS.map((plan, idx) => (
                        <div
                            key={plan.id}
                            className={cn(
                                "flex flex-col rounded-2xl border border-foreground/10 bg-background overflow-hidden flex-1 relative",
                                idx === 1 ? "md:-mt-8 md:mb-8 z-10 shadow-lg" : "md:mt-8"
                            )}
                        >
                            <div className="p-6">
                                <h3 className="uppercase font-medium text-sm text-foreground/70">
                                    {plan.id === "community" ? "COMMUNITY" : plan.id === "developer" ? "DEVELOPER" : "TEAMS"}
                                </h3>
                                <div className="mt-4 flex items-baseline">
                                    <h2 className={cn(
                                        "font-heading text-4xl font-medium",
                                        idx === 1 && "text-5xl"
                                    )}>
                                        {plan.id === "community"
                                            ? "Free"
                                            : plan.id === "developer"
                                                ? "$50"
                                                : "Enterprise"}
                                    </h2>
                                    {plan.id === "developer" && <span className="ml-2 text-base">/month</span>}
                                </div>
                                <p className="mt-2 text-sm text-foreground/70">{plan.desc}</p>

                                <div className="h-px w-full bg-foreground/10 my-6"></div>

                                <div>
                                    <h4 className="uppercase font-medium text-sm text-foreground/70 mb-4">
                                        {idx === 1 ? "Plan Highlights" : "Plan Highlights"}
                                    </h4>
                                    <ul className="space-y-3">
                                        {plan.features.map((feature, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <CheckIcon className="h-5 w-5 flex-shrink-0 text-primary mt-0.5" />
                                                <span className="text-sm">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-auto p-6 pt-8">
                                <Button
                                    variant={plan.id === "developer" ? "accent" : "outline"}
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
                    ))}
                </div>
            </div>

            {/* Pricing Comparison Table */}
            <div className="mt-24 mb-12 w-full mx-auto lg:max-w-screen-xl lg:mx-auto px-4 md:px-12">
                <h2 className="text-2xl font-heading font-medium mb-8 text-center">Compare Plans</h2>
                <div className="w-full overflow-x-auto rounded-xl border border-foreground/10">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="text-center bg-foreground/5">
                                <th className="p-4 border-b border-foreground/10"></th>
                                <th className="p-4 border-b border-foreground/10">
                                    <div className="flex flex-col items-center">
                                        <span className="text-xl font-medium">$0</span>
                                        <span className="text-sm text-muted-foreground">/month</span>
                                        <span className="uppercase text-xs font-semibold mt-2 tracking-wider text-muted-foreground">Community</span>
                                    </div>
                                </th>
                                <th className="p-4 border-b border-foreground/10 relative">
                                    <div className="flex flex-col items-center">
                                        <span className="text-xl font-medium">$50</span>
                                        <span className="text-sm text-muted-foreground">/month</span>
                                        <span className="uppercase text-xs font-semibold mt-2 tracking-wider text-muted-foreground">Developer</span>
                                        <div className="absolute -top-6 left-0 right-0 mx-auto">
                                            <div className="bg-accent/80 text-accent-foreground text-xs py-1 px-3 rounded-sm text-center mx-auto w-max">
                                                14 DAY FREE TRIAL
                                            </div>
                                        </div>
                                    </div>
                                </th>
                                <th className="p-4 border-b border-foreground/10">
                                    <div className="flex flex-col items-center">
                                        <span className="text-xl font-medium">$100</span>
                                        <span className="text-sm text-muted-foreground">/month</span>
                                        <span className="uppercase text-xs font-semibold mt-2 tracking-wider text-muted-foreground">Pro</span>
                                    </div>
                                </th>
                                <th className="p-4 border-b border-foreground/10">
                                    <div className="flex flex-col items-center">
                                        <span className="text-xl font-medium">$250</span>
                                        <span className="text-sm text-muted-foreground">/month</span>
                                        <span className="uppercase text-xs font-semibold mt-2 tracking-wider text-muted-foreground">Max</span>
                                    </div>
                                </th>
                                <th className="p-4 border-b border-foreground/10">
                                    <div className="flex flex-col items-center">
                                        <span className="text-xl font-medium">Custom</span>
                                        <span className="uppercase text-xs font-semibold mt-2 tracking-wider text-muted-foreground">Enterprise</span>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="text-center hover:bg-foreground/[0.02]">
                                <td className="p-4 border-b border-foreground/10 text-left font-medium text-sm">
                                    <div className="flex items-center gap-2">
                                        <span>Included User Messages</span>
                                    </div>
                                </td>
                                <td className="p-4 border-b border-foreground/10">50</td>
                                <td className="p-4 border-b border-foreground/10 bg-foreground/[0.01]">600</td>
                                <td className="p-4 border-b border-foreground/10">1500</td>
                                <td className="p-4 border-b border-foreground/10">4500</td>
                                <td className="p-4 border-b border-foreground/10">Unlimited</td>
                            </tr>
                            <tr className="text-center hover:bg-foreground/[0.02]">
                                <td className="p-4 border-b border-foreground/10 text-left font-medium text-sm">
                                    <div className="flex items-center gap-2">
                                        <span>Additional User Messages</span>
                                    </div>
                                </td>
                                <td className="p-4 border-b border-foreground/10">$30/300</td>
                                <td className="p-4 border-b border-foreground/10 bg-foreground/[0.01]">$30/300</td>
                                <td className="p-4 border-b border-foreground/10">$30/300</td>
                                <td className="p-4 border-b border-foreground/10">$30/300</td>
                                <td className="p-4 border-b border-foreground/10">Custom</td>
                            </tr>
                            <tr className="text-center hover:bg-foreground/[0.02]">
                                <td className="p-4 border-b border-foreground/10 text-left font-medium text-sm">
                                    <div className="flex items-center gap-2">
                                        <span>Chat & Agents</span>
                                    </div>
                                </td>
                                <td className="p-4 border-b border-foreground/10">
                                    <CheckIcon className="h-5 w-5 mx-auto text-primary" />
                                </td>
                                <td className="p-4 border-b border-foreground/10 bg-foreground/[0.01]">
                                    <CheckIcon className="h-5 w-5 mx-auto text-primary" />
                                </td>
                                <td className="p-4 border-b border-foreground/10">
                                    <CheckIcon className="h-5 w-5 mx-auto text-primary" />
                                </td>
                                <td className="p-4 border-b border-foreground/10">
                                    <CheckIcon className="h-5 w-5 mx-auto text-primary" />
                                </td>
                                <td className="p-4 border-b border-foreground/10">
                                    <CheckIcon className="h-5 w-5 mx-auto text-primary" />
                                </td>
                            </tr>
                            <tr className="text-center hover:bg-foreground/[0.02]">
                                <td className="p-4 border-b border-foreground/10 text-left font-medium text-sm">
                                    <div className="flex items-center gap-2">
                                        <span>Context Engine</span>
                                    </div>
                                </td>
                                <td className="p-4 border-b border-foreground/10">
                                    <CheckIcon className="h-5 w-5 mx-auto text-primary" />
                                </td>
                                <td className="p-4 border-b border-foreground/10 bg-foreground/[0.01]">
                                    <CheckIcon className="h-5 w-5 mx-auto text-primary" />
                                </td>
                                <td className="p-4 border-b border-foreground/10">
                                    <CheckIcon className="h-5 w-5 mx-auto text-primary" />
                                </td>
                                <td className="p-4 border-b border-foreground/10">
                                    <CheckIcon className="h-5 w-5 mx-auto text-primary" />
                                </td>
                                <td className="p-4 border-b border-foreground/10">
                                    <CheckIcon className="h-5 w-5 mx-auto text-primary" />
                                </td>
                            </tr>
                            <tr className="text-center hover:bg-foreground/[0.02]">
                                <td className="p-4 border-b border-foreground/10 text-left font-medium text-sm">
                                    <div className="flex items-center gap-2">
                                        <span>MCP & Native Tools</span>
                                    </div>
                                </td>
                                <td className="p-4 border-b border-foreground/10">
                                    <CheckIcon className="h-5 w-5 mx-auto text-primary" />
                                </td>
                                <td className="p-4 border-b border-foreground/10 bg-foreground/[0.01]">
                                    <CheckIcon className="h-5 w-5 mx-auto text-primary" />
                                </td>
                                <td className="p-4 border-b border-foreground/10">
                                    <CheckIcon className="h-5 w-5 mx-auto text-primary" />
                                </td>
                                <td className="p-4 border-b border-foreground/10">
                                    <CheckIcon className="h-5 w-5 mx-auto text-primary" />
                                </td>
                                <td className="p-4 border-b border-foreground/10">
                                    <CheckIcon className="h-5 w-5 mx-auto text-primary" />
                                </td>
                            </tr>
                            <tr className="text-center hover:bg-foreground/[0.02]">
                                <td className="p-4 border-b border-foreground/10 text-left font-medium text-sm">
                                    <div className="flex items-center gap-2">
                                        <span>Next Edits & Completions</span>
                                    </div>
                                </td>
                                <td className="p-4 border-b border-foreground/10">
                                    <CheckIcon className="h-5 w-5 mx-auto text-primary" />
                                </td>
                                <td className="p-4 border-b border-foreground/10 bg-foreground/[0.01]">
                                    <CheckIcon className="h-5 w-5 mx-auto text-primary" />
                                </td>
                                <td className="p-4 border-b border-foreground/10">
                                    <CheckIcon className="h-5 w-5 mx-auto text-primary" />
                                </td>
                                <td className="p-4 border-b border-foreground/10">
                                    <CheckIcon className="h-5 w-5 mx-auto text-primary" />
                                </td>
                                <td className="p-4 border-b border-foreground/10">
                                    <CheckIcon className="h-5 w-5 mx-auto text-primary" />
                                </td>
                            </tr>
                            <tr className="text-center hover:bg-foreground/[0.02]">
                                <td className="p-4 border-b border-foreground/10 text-left font-medium text-sm">
                                    <div className="flex items-center gap-2">
                                        <span>Team Management</span>
                                    </div>
                                </td>
                                <td className="p-4 border-b border-foreground/10">
                                    <span className="inline-flex items-center justify-center w-5 h-5 mx-auto text-muted-foreground">✕</span>
                                </td>
                                <td className="p-4 border-b border-foreground/10 bg-foreground/[0.01]">
                                    <CheckIcon className="h-5 w-5 mx-auto text-primary" />
                                </td>
                                <td className="p-4 border-b border-foreground/10">
                                    <CheckIcon className="h-5 w-5 mx-auto text-primary" />
                                </td>
                                <td className="p-4 border-b border-foreground/10">
                                    <CheckIcon className="h-5 w-5 mx-auto text-primary" />
                                </td>
                                <td className="p-4 border-b border-foreground/10">
                                    <CheckIcon className="h-5 w-5 mx-auto text-primary" />
                                </td>
                            </tr>
                            <tr className="text-center hover:bg-foreground/[0.02]">
                                <td className="p-4 border-b border-foreground/10 text-left font-medium text-sm">
                                    <div className="flex items-center gap-2">
                                        <span>SOC 2 Type II</span>
                                    </div>
                                </td>
                                <td className="p-4 border-b border-foreground/10">
                                    <CheckIcon className="h-5 w-5 mx-auto text-primary" />
                                </td>
                                <td className="p-4 border-b border-foreground/10 bg-foreground/[0.01]">
                                    <CheckIcon className="h-5 w-5 mx-auto text-primary" />
                                </td>
                                <td className="p-4 border-b border-foreground/10">
                                    <CheckIcon className="h-5 w-5 mx-auto text-primary" />
                                </td>
                                <td className="p-4 border-b border-foreground/10">
                                    <CheckIcon className="h-5 w-5 mx-auto text-primary" />
                                </td>
                                <td className="p-4 border-b border-foreground/10">
                                    <CheckIcon className="h-5 w-5 mx-auto text-primary" />
                                </td>
                            </tr>
                            <tr className="text-center hover:bg-foreground/[0.02]">
                                <td className="p-4 border-b border-foreground/10 text-left font-medium text-sm">
                                    <div className="flex items-center gap-2">
                                        <span>Support</span>
                                    </div>
                                </td>
                                <td className="p-4 border-b border-foreground/10">Community</td>
                                <td className="p-4 border-b border-foreground/10 bg-foreground/[0.01]">Community</td>
                                <td className="p-4 border-b border-foreground/10">Community & email</td>
                                <td className="p-4 border-b border-foreground/10">Community & email</td>
                                <td className="p-4 border-b border-foreground/10">Dedicated</td>
                            </tr>
                            <tr className="text-center hover:bg-foreground/[0.02]">
                                <td className="p-4 border-b border-foreground/10 text-left font-medium text-sm">
                                    <div className="flex items-center gap-2">
                                        <span>AI Training</span>
                                    </div>
                                </td>
                                <td className="p-4 border-b border-foreground/10">Allowed</td>
                                <td className="p-4 border-b border-foreground/10 bg-foreground/[0.01]">Never</td>
                                <td className="p-4 border-b border-foreground/10">Never</td>
                                <td className="p-4 border-b border-foreground/10">Never</td>
                                <td className="p-4 border-b border-foreground/10">Never</td>
                            </tr>
                            <tr className="text-center">
                                <td className="p-4"></td>
                                <td className="p-4 py-6">
                                    <Button variant="outline" className="w-full">Install now</Button>
                                </td>
                                <td className="p-4 py-6 bg-foreground/[0.01]">
                                    <Button variant="accent" className="w-full">Install now</Button>
                                </td>
                                <td className="p-4 py-6">
                                    <Button variant="outline" className="w-full">Install now</Button>
                                </td>
                                <td className="p-4 py-6">
                                    <Button variant="outline" className="w-full">Install now</Button>
                                </td>
                                <td className="p-4 py-6">
                                    <Button variant="outline" className="w-full">Contact sales</Button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
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

            <div className="mt-20 max-w-3xl mx-auto">
                <h2 className="text-2xl font-heading font-medium mb-8">VSCode Extension</h2>
                <div className="space-y-6">
                    <div className="pb-6 border-b border-foreground/10">
                        <h3 className="mt-3 text-lg font-semibold">VSCode Extension</h3>
                        <p className="mt-1 text-sm text-muted-foreground">Add support to your favorite IDE</p>
                    </div>
                    <div className="mt-8">
                        <Button variant="accent" className="w-full">Install now</Button>
                    </div>
                </div>
            </div>
        </section>
    );
} 