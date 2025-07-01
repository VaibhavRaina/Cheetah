"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Container from "@/components/global/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, MessageCircle, Zap, Link } from "lucide-react";

const ProductCompletions = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const features = [
        {
            icon: Code,
            title: "Knows your code",
            description: "Completions reflect your code, dependencies, idioms and best practices."
        },
        {
            icon: MessageCircle,
            title: "In-line prompts",
            description: "Write a comment using natural language and completions will implement it."
        },
        {
            icon: Zap,
            title: "Lightning fast",
            description: "You think fast. Cheetah does, too. You'll never wait for your editor to catch up with you."
        },
        {
            icon: Link,
            title: "Chat aware",
            description: "Completions pick up where your chat left off so continuity is never an issue."
        }
    ];

    return (
        <section ref={ref} className="py-20 lg:py-32">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <Badge variant="secondary" className="mb-4 bg-accent/10 text-accent border-accent/20">
                        Completions
                    </Badge>
                    <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
                        The code you need, when you need it
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                        Write better code faster with personalized in-line completions that truly understand
                        your codebase, dependencies, and external APIs.
                    </p>
                </motion.div>

                {/* Hero Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative mb-20"
                >
                    <div className="relative rounded-xl lg:rounded-2xl border border-border p-4 backdrop-blur-lg max-w-5xl mx-auto">
                        <div className="absolute top-1/4 left-1/2 -z-10 bg-gradient-to-r from-accent/40 to-accent/20 w-3/4 -translate-x-1/2 h-1/2 -translate-y-1/2 blur-[4rem] lg:blur-[8rem]"></div>
                        <div className="rounded-lg lg:rounded-xl border border-border bg-card overflow-hidden">
                            <div className="bg-muted/30 p-4 border-b border-border">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-destructive/60"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500/60"></div>
                                    <span className="ml-4 text-sm text-muted-foreground">editor.tsx - Smart Completions</span>
                                </div>
                            </div>
                            <div className="p-6 bg-slate-900 text-green-400 font-mono text-sm">
                                <div className="space-y-2">
                                    <div className="text-gray-400">// Create a user authentication function</div>
                                    <div className="flex items-center">
                                        <span className="text-blue-400">const</span>
                                        <span className="ml-2">authenticateUser = </span>
                                        <span className="text-yellow-400">async</span>
                                        <span className="ml-1">(email, password) =&gt; {`{`}</span>
                                    </div>
                                    <div className="ml-4 space-y-1">
                                        <div className="flex items-center">
                                            <span className="text-purple-400">try</span>
                                            <span className="ml-1">{`{`}</span>
                                        </div>
                                        <div className="ml-4 space-y-1">
                                            <div className="bg-accent/20 border border-accent/30 rounded px-2 py-1 inline-block">
                                                <span className="text-accent">const response = await fetch('/api/auth/login', {`{`}</span>
                                            </div>
                                            <div className="ml-4 text-gray-300">
                                                method: 'POST',<br />
                                                headers: {`{ 'Content-Type': 'application/json' }`},<br />
                                                body: JSON.stringify({`{ email, password }`})
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-gray-500 text-xs mt-4">
                                        ⚡ Cheetah AI suggestion - Press Tab to accept
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Two Column Section */}
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                            Blaze through tasks
                        </h3>
                        <p className="text-lg text-muted-foreground mb-8">
                            Completions are fast — you'll never worry about speed. Get complex snippets,
                            tests, or entire functions in an instant.
                        </p>
                        <div className="relative rounded-xl border border-border overflow-hidden">
                            <div className="bg-card p-4">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                        <span className="text-sm text-muted-foreground">Function generated in 0.2s</span>
                                    </div>
                                    <div className="bg-muted/30 rounded-lg p-3 font-mono text-sm">
                                        <div className="text-green-600">✓ Generated complete test suite</div>
                                        <div className="text-muted-foreground mt-1">
                                            • 5 test cases<br />
                                            • Edge case handling<br />
                                            • Mock implementations
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                            Reduce cognitive load
                        </h3>
                        <p className="text-lg text-muted-foreground mb-8">
                            Keeping classes, APIs, and schemas in your head is hard. Completions bring
                            them all to your fingertips.
                        </p>
                        <div className="relative rounded-xl border border-border overflow-hidden">
                            <div className="bg-card p-4">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                        <span className="text-sm text-muted-foreground">Context-aware suggestions</span>
                                    </div>
                                    <div className="bg-muted/30 rounded-lg p-3 font-mono text-sm">
                                        <div className="text-blue-600">user.</div>
                                        <div className="ml-4 text-muted-foreground">
                                            • profile.avatar<br />
                                            • preferences.theme<br />
                                            • permissions.canEdit
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Features Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {features.map((feature, index) => (
                        <Card key={index} className="p-6 border-border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors duration-300">
                            <feature.icon className="w-8 h-8 text-accent mb-4" />
                            <h4 className="text-lg font-semibold text-foreground mb-2">
                                {feature.title}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                                {feature.description}
                            </p>
                        </Card>
                    ))}
                </motion.div>
            </Container>
        </section>
    );
};

export default ProductCompletions;