"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Container from "@/components/global/container";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download } from "lucide-react";

const ProductCTA = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="py-20 lg:py-32">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <div className="relative">
                        {/* Background glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-accent/30 to-accent/20 blur-3xl -z-10"></div>

                        <div className="relative bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-12 lg:p-16 max-w-4xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
                                    Get more out of every keystroke.
                                </h2>
                                <p className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                                    Install Cheetah AI and try it for free.
                                </p>

                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <Link href="/signup">
                                        <Button size="lg" variant="accent" className="group">
                                            Start Free Trial
                                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                                        </Button>
                                    </Link>
                                    <Link href="/docs">
                                        <Button size="lg" variant="outline" className="group">
                                            <Download className="w-4 h-4 mr-2" />
                                            View Documentation
                                        </Button>
                                    </Link>
                                </div>

                                <div className="mt-8 pt-8 border-t border-border">
                                    <p className="text-sm text-muted-foreground">
                                        No credit card required • Free 14-day trial • Cancel anytime
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </Container>
        </section>
    );
};

export default ProductCTA;