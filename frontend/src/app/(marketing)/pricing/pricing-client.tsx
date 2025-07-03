"use client"
import { PLANS } from "@/constants";
import Container from "@/components/global/container";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib";
import { motion } from "framer-motion";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const fadeInAnimationVariants = {
    initial: {
        opacity: 0,
        y: 100
    },
    animate: (index: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.05 * index,
        }
    })
}

const faqItems = [
    {
        question: "What is a user message?",
        answer: "User messages are the prompts or requests you send to Cheetah AI. Each plan includes a set number of messages per month, with the option to purchase additional message packs as needed."
    },
    {
        question: "Are User Messages Pooled?",
        answer: "Yes, all user messages are pooled across your team members for maximum flexibility in how you use your allocation."
    },
    {
        question: "What happens if I run out of user messages?",
        answer: "You can purchase additional message packs at any time. These are automatically added to your account and will be available immediately."
    },
    {
        question: "What is the free trial of Cheetah?",
        answer: "Our free trial gives you 14 days to test out all the features of our Developer plan, including up to 600 user messages. No credit card is required to start."
    },
    {
        question: "What happens at the end of the trial?",
        answer: "At the end of your trial, you will be automatically moved to our free Community plan. You can choose to upgrade to a paid plan at any time to retain access to premium features."
    },
    {
        question: "Do you train on my data on a paid plan?",
        answer: "Never. For Developer, Pro, Max, and Enterprise plans, we never train on your data, ensuring your code and intellectual property remain completely private."
    },
    {
        question: "Why do you train on my data on the community plan?",
        answer: "We train on data from the Community plan to improve our models and provide a better free service. This allows us to offer a robust free tier. To opt out of data training, you can upgrade to any paid plan."
    },
    {
        question: "How are you handling Security & Compliance?",
        answer: "We take security seriously with SOC 2 Type II compliance on all paid plans. Enterprise plans include additional security features like SSO integration, OIDC, SCIM support, and comprehensive security reports."
    },
    {
        question: "When do my Extra User Messages expire?",
        answer: "Extra user messages purchased as an add-on are valid for 90 days from the date of purchase. They do not expire as long as your subscription is active."
    }
];

export function PricingComponent() {
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
                <div className="flex flex-col md:flex-row gap-6 px-4">
                    {PLANS.map((plan, idx) => (
                        <motion.div
                            key={plan.id}
                            className={cn(
                                "flex flex-col rounded-2xl border bg-background overflow-hidden flex-1 relative w-full",
                                idx === 1
                                    ? "border-accent shadow-lg shadow-accent/20 md:-translate-y-8"
                                    : "border-foreground/10"
                            )}
                            variants={fadeInAnimationVariants}
                            initial="initial"
                            whileInView="animate"
                            viewport={{
                                once: true,
                            }}
                            custom={idx}
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
                                        Plan Highlights
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
                                    asChild={plan.buttonText === "Contact sales" || plan.buttonText === "Start free trial"}
                                >
                                    {plan.buttonText === "Contact sales" || plan.buttonText === "Start free trial" ? (
                                        <a href={plan.link}>{plan.buttonText}</a>
                                    ) : (
                                        plan.buttonText
                                    )}
                                </Button>
                                {plan.id === "developer" && (
                                    <p className="text-xs text-center mt-3 text-muted-foreground">
                                        Need more messages? <a href="#pricing-table" className="underline">See plans below.</a>
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Pricing Comparison Table */}
            <div id="pricing-table" className="mt-24 mb-12 w-full mx-auto lg:max-w-screen-xl lg:mx-auto px-4 md:px-12">
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
                                    <span className="text-2xl">✕</span>
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
                                <td className="p-4 border-b border-foreground/10">
                                    <span className="text-xs text-muted-foreground">Community</span>
                                </td>
                                <td className="p-4 border-b border-foreground/10 bg-foreground/[0.01]">
                                    <span className="text-xs text-muted-foreground">Community</span>
                                </td>
                                <td className="p-4 border-b border-foreground/10">
                                    <span className="text-xs text-muted-foreground">Community & email</span>
                                </td>
                                <td className="p-4 border-b border-foreground/10">
                                    <span className="text-xs text-muted-foreground">Community & email</span>
                                </td>
                                <td className="p-4 border-b border-foreground/10">
                                    <span className="text-xs text-muted-foreground">Dedicated</span>
                                </td>
                            </tr>
                            <tr className="text-center hover:bg-foreground/[0.02]">
                                <td className="p-4 border-b border-foreground/10 text-left font-medium text-sm">
                                    <div className="flex items-center gap-2">
                                        <span>AI Training</span>
                                    </div>
                                </td>
                                <td className="p-4 border-b border-foreground/10">
                                    <span className="text-xs text-muted-foreground">Allowed</span>
                                </td>
                                <td className="p-4 border-b border-foreground/10 bg-foreground/[0.01]">
                                    <span className="text-xs text-muted-foreground">Never</span>
                                </td>
                                <td className="p-4 border-b border-foreground/10">
                                    <span className="text-xs text-muted-foreground">Never</span>
                                </td>
                                <td className="p-4 border-b border-foreground/10">
                                    <span className="text-xs text-muted-foreground">Never</span>
                                </td>
                                <td className="p-4 border-b border-foreground/10">
                                    <span className="text-xs text-muted-foreground">Never</span>
                                </td>
                            </tr>
                            <tr className="text-center">
                                <td className="p-4 text-left font-medium text-sm"></td>
                                <td className="p-4">
                                    <Button variant="outline" size="sm" className="w-full max-w-[120px]">
                                        Install now
                                    </Button>
                                </td>
                                <td className="p-4 bg-foreground/[0.01]">
                                    <Button variant="default" size="sm" className="w-full max-w-[120px]" asChild>
                                        <a href="/dashboard">Install now</a>
                                    </Button>
                                </td>
                                <td className="p-4">
                                    <Button variant="outline" size="sm" className="w-full max-w-[120px]">
                                        Install now
                                    </Button>
                                </td>
                                <td className="p-4">
                                    <Button variant="outline" size="sm" className="w-full max-w-[120px]">
                                        Install now
                                    </Button>
                                </td>
                                <td className="p-4">
                                    <Button variant="outline" size="sm" className="w-full max-w-[120px]" asChild>
                                        <a href="/contact-sales">Contact sales</a>
                                    </Button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <Container>
                <div className="mt-20 max-w-3xl mx-auto">
                    <motion.h2
                        className="text-2xl font-heading font-medium mb-8 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        Frequently asked questions
                    </motion.h2>
                    <Accordion type="single" collapsible className="w-full">
                        {faqItems.map((item, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInAnimationVariants}
                                initial="initial"
                                whileInView="animate"
                                viewport={{ once: true }}
                                custom={index}
                            >
                                <AccordionItem value={`item-${index}`} className="border-foreground/10">
                                    <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                                    <AccordionContent className="text-foreground/70">
                                        {item.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            </motion.div>
                        ))}
                    </Accordion>
                </div>
            </Container>
        </section>
    );
} 