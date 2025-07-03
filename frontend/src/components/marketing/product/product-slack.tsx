"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Container from "@/components/global/container";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Users, Clock, Lightbulb } from "lucide-react";

const ProductSlack = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="py-20 lg:py-32 bg-muted/20">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <Badge variant="secondary" className="mb-4 bg-accent/10 text-accent border-accent/20">
                        Slack
                    </Badge>
                    <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
                        Keep the{" "}
                        <span className="block lg:inline">conversation moving</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                        Everything you need to get answers quickly, bring new people up to speed,
                        or make decisions in the moment.
                    </p>
                </motion.div>

                {/* Hero Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative mb-20"
                >
                    <div className="relative rounded-xl lg:rounded-2xl border border-border p-4 backdrop-blur-lg max-w-6xl mx-auto">
                        <div className="absolute top-1/4 left-1/2 -z-10 bg-gradient-to-r from-accent/40 to-accent/20 w-3/4 -translate-x-1/2 h-1/2 -translate-y-1/2 blur-[4rem] lg:blur-[8rem]"></div>
                        <div className="rounded-lg lg:rounded-xl border border-border bg-card overflow-hidden">
                            {/* Slack Header */}
                            <div className="bg-slate-800 text-white p-4 border-b border-border">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 bg-accent rounded flex items-center justify-center">
                                            <span className="text-xs font-bold text-background">#</span>
                                        </div>
                                        <span className="font-medium">development</span>
                                        <Badge variant="outline" className="text-xs bg-slate-700 border-slate-600">
                                            12 members
                                        </Badge>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Users className="w-4 h-4 text-slate-400" />
                                        <MessageSquare className="w-4 h-4 text-slate-400" />
                                    </div>
                                </div>
                            </div>

                            {/* Slack Messages */}
                            <div className="p-8 space-y-6 bg-white dark:bg-gray-50">
                                {/* Message 1 */}
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded bg-blue-500 flex items-center justify-center text-white text-sm font-medium">
                                        A
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-medium text-gray-900">Alex Chen</span>
                                            <span className="text-xs text-gray-500">2:34 PM</span>
                                        </div>
                                        <p className="text-gray-900">
                                            Hey team, can someone help me understand how the new authentication flow works?
                                            I'm trying to integrate it into the mobile app.
                                        </p>
                                    </div>
                                </div>

                                {/* Cheetah AI Response */}
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded bg-accent flex items-center justify-center">
                                        <span className="text-xs font-bold text-background">AI</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-medium text-gray-900">Cheetah AI</span>
                                            <Badge variant="outline" className="text-xs border-gray-300 text-gray-600">BOT</Badge>
                                            <span className="text-xs text-gray-500">2:34 PM</span>
                                        </div>
                                        <div className="space-y-3">
                                            <p className="text-gray-900">
                                                I can help with that! The new authentication flow uses JWT tokens with refresh token rotation. Here's how it works:
                                            </p>
                                            <div className="bg-gray-100 rounded-lg p-3 border border-gray-200">
                                                <div className="font-mono text-sm space-y-1">
                                                    <div className="text-green-600">✓ POST /api/auth/login</div>
                                                    <div className="text-blue-600">→ Returns access_token + refresh_token</div>
                                                    <div className="text-purple-600">→ Access token expires in 15min</div>
                                                    <div className="text-orange-600">→ Use refresh token to get new access token</div>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-600">
                                                📁 Check out <code className="bg-gray-100 px-1 rounded text-gray-800">src/auth/mobile-integration.md</code> for mobile-specific implementation details.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Follow-up message */}
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded bg-green-500 flex items-center justify-center text-white text-sm font-medium">
                                        S
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-medium text-gray-900">Sarah Kim</span>
                                            <span className="text-xs text-gray-500">2:36 PM</span>
                                        </div>
                                        <p className="text-gray-900">
                                            Perfect! That's exactly what I needed. The mobile integration docs are super helpful 🙌
                                        </p>
                                    </div>
                                </div>

                                {/* Reaction bar */}
                                <div className="flex items-center gap-2 ml-12">
                                    <div className="flex items-center gap-1 bg-gray-100 rounded-full px-2 py-1 text-xs">
                                        <span>👍</span>
                                        <span className="text-gray-600">3</span>
                                    </div>
                                    <div className="flex items-center gap-1 bg-gray-100 rounded-full px-2 py-1 text-xs">
                                        <span>🚀</span>
                                        <span className="text-gray-600">2</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Benefits Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    <div className="text-center">
                        <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <Clock className="w-6 h-6 text-accent" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-2">Instant Answers</h3>
                        <p className="text-sm text-muted-foreground">
                            Get immediate responses to technical questions without waiting for team members
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <Users className="w-6 h-6 text-accent" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-2">Team Onboarding</h3>
                        <p className="text-sm text-muted-foreground">
                            Help new team members get up to speed with contextual code explanations
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <Lightbulb className="w-6 h-6 text-accent" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-2">Smart Decisions</h3>
                        <p className="text-sm text-muted-foreground">
                            Make informed technical decisions with AI-powered insights and recommendations
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <MessageSquare className="w-6 h-6 text-accent" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-2">Context Aware</h3>
                        <p className="text-sm text-muted-foreground">
                            AI understands your codebase context and provides relevant, accurate responses
                        </p>
                    </div>
                </motion.div>
            </Container>
        </section>
    );
};

export default ProductSlack;