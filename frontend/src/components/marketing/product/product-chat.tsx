"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Container from "@/components/global/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Search, Zap, FileText } from "lucide-react";

const ProductChat = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const features = [
        {
            icon: Search,
            title: "Discovery",
            description: "Chat reveals its sources to show you what influenced its answers."
        },
        {
            icon: Zap,
            title: "Focus",
            description: "Select code blocks, files, or entire folders to refine context."
        },
        {
            icon: MessageSquare,
            title: "Apply",
            description: "Cheetah adapts the code to fit, then puts it where it belongs."
        },
        {
            icon: FileText,
            title: "Third-party docs",
            description: "300+ packages of external documentation built right in."
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
                        Chat
                    </Badge>
                    <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
                        Ask me anything for your code
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                        Get instant answers that would typically require you to search documentation,
                        interrupt teammates, or open a ticket. Chat gets you unblocked, fast.
                    </p>
                </motion.div>

                {/* Hero Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative mb-20"
                >
                    <div className="relative rounded-xl lg:rounded-2xl shadow-xl bg-card/90 backdrop-blur-lg p-6 max-w-5xl mx-auto">
                        <div className="absolute top-1/4 left-1/2 -z-10 bg-gradient-to-r from-accent/40 to-accent/20 w-3/4 -translate-x-1/2 h-1/2 -translate-y-1/2 blur-[4rem] lg:blur-[8rem]"></div>
                        <div className="rounded-lg lg:rounded-xl shadow-inner bg-card overflow-hidden">
                            <div className="bg-muted/30 p-5 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-destructive/60"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500/60"></div>
                                    <span className="ml-4 text-sm text-muted-foreground">Cheetah AI Chat</span>
                                </div>
                            </div>
                            <div className="p-8 space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                                        <MessageSquare className="w-4 h-4 text-accent" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-muted-foreground mb-2">You</p>
                                        <p className="text-foreground">How does the authentication middleware work in this project?</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                                        <span className="text-xs font-bold text-primary">AI</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-muted-foreground mb-2">Cheetah AI</p>
                                        <div className="space-y-3">
                                            <p className="text-foreground">The authentication middleware in your project uses JWT tokens for user verification. Here's how it works:</p>
                                            <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm shadow-sm">
                                                <code>middleware/auth.js: Validates JWT tokens and protects routes</code>
                                            </div>
                                        </div>
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
                            Get up to speed
                        </h3>
                        <p className="text-lg text-muted-foreground mb-8">
                            Dive into any task with confidence. Quickly find out how a component works,
                            investigate a bug, or work with a new API.
                        </p>
                        <div className="relative rounded-xl shadow-lg bg-card/80 backdrop-blur-sm overflow-hidden">
                            <div className="p-6">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-accent"></div>
                                        <span className="text-sm text-muted-foreground">Understanding component structure</span>
                                    </div>
                                    <div className="bg-muted/30 rounded-lg p-4">
                                        <code className="text-sm text-foreground">
                                            // UserProfile component analysis<br />
                                            // Dependencies: React, PropTypes<br />
                                            // Props: user, onUpdate, isEditable
                                        </code>
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
                            Stay in the flow
                        </h3>
                        <p className="text-lg text-muted-foreground mb-8">
                            Uncover details about your codebase and dependencies without interrupting
                            your team or searching docs.
                        </p>
                        <div className="relative rounded-xl shadow-lg bg-card/80 backdrop-blur-sm overflow-hidden">
                            <div className="p-6">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                        <span className="text-sm text-muted-foreground">Code applied successfully</span>
                                    </div>
                                    <div className="bg-green-500/10 rounded-lg p-4 shadow-sm">
                                        <p className="text-sm text-green-700 dark:text-green-400">
                                            ✓ Updated 3 files with new authentication logic
                                        </p>
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
                        <Card key={index} className="p-8 shadow-lg bg-card/70 backdrop-blur-sm hover:bg-card/90 hover:shadow-xl transition-all duration-300">
                            <feature.icon className="w-8 h-8 text-accent mb-6" />
                            <h4 className="text-lg font-semibold text-foreground mb-3">
                                {feature.title}
                            </h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {feature.description}
                            </p>
                        </Card>
                    ))}
                </motion.div>
            </Container>
        </section>
    );
};

export default ProductChat;