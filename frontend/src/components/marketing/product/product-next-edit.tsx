"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Container from "@/components/global/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, RotateCcw, FileX, Download } from "lucide-react";

const ProductNextEdit = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const features = [
        {
            icon: ArrowRight,
            title: "Progressive",
            description: "Jump to the next edit with a keystroke."
        },
        {
            icon: RotateCcw,
            title: "Cross-file",
            description: "Make edits across multiple lines or entirely different files."
        },
        {
            icon: FileX,
            title: "Clean-up",
            description: "Find and delete unused or non-functioning code."
        },
        {
            icon: Download,
            title: "Easy imports",
            description: "Grab any SDK, function, or API without breaking your flow."
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
                        Next Edit
                    </Badge>
                    <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
                        Turn-by-turn directions for your work
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                        Even small changes ripple through a codebase. Next Edit guides you through
                        associated updates across your code, tests and docs.
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
                            <div className="bg-muted/30 p-4 border-b border-border">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-destructive/60"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500/60"></div>
                                        <span className="ml-4 text-sm text-muted-foreground">Next Edit - Refactoring Guide</span>
                                    </div>
                                    <Badge variant="outline" className="text-xs">
                                        Step 2 of 5
                                    </Badge>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 p-3 bg-accent/10 rounded-lg border border-accent/20">
                                        <ArrowRight className="w-5 h-5 text-accent" />
                                        <div>
                                            <p className="font-medium text-foreground">Update import statement</p>
                                            <p className="text-sm text-muted-foreground">src/components/UserProfile.tsx</p>
                                        </div>
                                    </div>
                                    <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-destructive">-</span>
                                            <code className="text-destructive/80">import {`{ UserData }`} from '../types/user'</code>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-green-500">+</span>
                                            <code className="text-green-600">import {`{ UserProfile }`} from '../types/profile'</code>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between pt-4">
                                        <p className="text-sm text-muted-foreground">3 more files need similar updates</p>
                                        <div className="flex gap-2">
                                            <button className="px-3 py-1 text-xs bg-muted hover:bg-muted/80 rounded-md transition-colors">
                                                Skip
                                            </button>
                                            <button className="px-3 py-1 text-xs bg-accent text-accent-foreground hover:bg-accent/90 rounded-md transition-colors">
                                                Apply & Next
                                            </button>
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
                            Make complex changes simple
                        </h3>
                        <p className="text-lg text-muted-foreground mb-8">
                            Refactors, dependency upgrades, and schema changes are rife with repetitive work.
                            Ditch find-and-replace for step-by-step guidance.
                        </p>
                        <div className="relative rounded-xl border border-border overflow-hidden">
                            <div className="bg-card p-4">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                        <span className="text-sm text-muted-foreground">Dependency upgrade in progress</span>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                                            <span className="text-sm">package.json</span>
                                            <Badge variant="outline" className="text-xs">Updated</Badge>
                                        </div>
                                        <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                                            <span className="text-sm">src/api/client.ts</span>
                                            <Badge variant="outline" className="text-xs">Pending</Badge>
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
                            Keep less in your head
                        </h3>
                        <p className="text-lg text-muted-foreground mb-8">
                            Fly through changes without having to keep the tedious details of
                            multi-step changes in your head.
                        </p>
                        <div className="relative rounded-xl border border-border overflow-hidden">
                            <div className="bg-card p-4">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-accent"></div>
                                        <span className="text-sm text-muted-foreground">Smart diff analysis</span>
                                    </div>
                                    <div className="bg-muted/30 rounded-lg p-3 font-mono text-xs">
                                        <div className="text-muted-foreground mb-1">@@ -15,7 +15,7 @@</div>
                                        <div className="text-destructive">- const API_URL = 'v1/users'</div>
                                        <div className="text-green-600">+ const API_URL = 'v2/users'</div>
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

export default ProductNextEdit;