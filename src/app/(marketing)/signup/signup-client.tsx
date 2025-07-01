"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Check } from "lucide-react";
import Container from "@/components/global/container";
import { motion } from "framer-motion";

const fadeInAnimationVariants = {
    initial: {
        opacity: 0,
        y: 50
    },
    animate: (index: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.1 * index,
            duration: 0.5
        }
    })
}

const slideInFromLeft = {
    initial: {
        opacity: 0,
        x: -50
    },
    animate: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
}

const slideInFromRight = {
    initial: {
        opacity: 0,
        x: 50
    },
    animate: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
            delay: 0.2
        }
    }
}

export default function SignUpClient() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Add your signup logic here
            toast({
                title: "Success",
                description: "Check your email for verification link.",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
                <div className="min-h-screen grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    {/* Marketing Panel */}
                    <motion.div
                        className="flex flex-col justify-center space-y-6 lg:space-y-8"
                        variants={slideInFromLeft}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        <Container delay={0.3}>
                            <div className="space-y-4 max-w-lg">
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-medium !leading-snug">
                                    Create an account to start your{" "}
                                    <span className="text-accent">Developer Journey</span>
                                </h1>
                                <p className="text-base md:text-lg text-muted-foreground">
                                    Agent, completions, chat, and instructions powered by Cheetah's context engine for the most accurate code assistance.
                                </p>
                            </div>
                        </Container>

                        <Container delay={0.5}>
                            <ul className="space-y-3 max-w-lg">
                                {[
                                    "No credit card required",
                                    "Use the full power of Cheetah, no limits or restrictions",
                                    "Get help, share feedback, and join the community on Discord",
                                    "We don't train on your data",
                                ].map((item, index) => (
                                    <motion.li
                                        key={item}
                                        className="flex items-start gap-3"
                                        variants={fadeInAnimationVariants}
                                        initial="initial"
                                        whileInView="animate"
                                        viewport={{ once: true }}
                                        custom={index}
                                    >
                                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent/20 mt-0.5 flex-shrink-0">
                                            <Check className="h-3 w-3 text-accent" />
                                        </span>
                                        <span className="text-sm md:text-base">{item}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </Container>
                    </motion.div>

                    {/* Sign-up Card */}
                    <motion.div
                        className="flex items-center justify-center py-8 lg:py-12"
                        variants={slideInFromRight}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        <Container delay={0.4}>
                            <Card className="w-full max-w-[400px] p-6 space-y-5 shadow-lg border-border/50">
                                <motion.div
                                    className="space-y-3 text-center"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.6, duration: 0.4 }}
                                >
                                    <Image
                                        src="/icons/icon-dark.png"
                                        alt="Cheetah Logo"
                                        width={48}
                                        height={48}
                                        className="mx-auto"
                                    />
                                    <h2 className="text-xl font-semibold">Create your account</h2>
                                </motion.div>

                                <motion.form
                                    onSubmit={handleSubmit}
                                    className="space-y-3"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.8, duration: 0.5 }}
                                >
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full hover:bg-accent/10 hover:text-accent-foreground transition-colors duration-200 h-11"
                                        size="lg"
                                    >
                                        <Image
                                            src="/icons/google.svg"
                                            alt="Google"
                                            width={18}
                                            height={18}
                                            className="mr-2"
                                        />
                                        Continue with Google
                                    </Button>

                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full hover:bg-accent/10 hover:text-accent-foreground transition-colors duration-200 h-11"
                                        size="lg"
                                    >
                                        <Image
                                            src="/images/mcp-servers/github.png"
                                            alt="GitHub"
                                            width={18}
                                            height={18}
                                            className="mr-2"
                                        />
                                        Continue with GitHub
                                    </Button>

                                    <div className="relative my-4">
                                        <div className="absolute inset-0 flex items-center">
                                            <span className="w-full border-t border-border/50" />
                                        </div>
                                        <div className="relative flex justify-center text-xs uppercase">
                                            <span className="bg-card px-2 text-muted-foreground">or</span>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <Input
                                            type="email"
                                            placeholder="Enter your email address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full transition-colors duration-200 focus:border-accent h-11"
                                            required
                                        />
                                        <Button
                                            type="submit"
                                            className="w-full bg-accent hover:bg-accent/90 transition-colors duration-200 h-11"
                                            size="lg"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? "Creating account..." : "Continue"}
                                        </Button>
                                    </div>
                                </motion.form>

                                <motion.p
                                    className="text-center text-xs text-muted-foreground pt-2"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 1, duration: 0.4 }}
                                >
                                    By creating an account, you agree to the{" "}
                                    <a href="/professional-terms-of-service" className="font-medium text-accent hover:text-accent/80 transition-colors duration-200">
                                        Terms of Service
                                    </a>{" "}
                                    and{" "}
                                    <a href="/privacy-policy" className="font-medium text-accent hover:text-accent/80 transition-colors duration-200">
                                        Privacy Policy
                                    </a>
                                </motion.p>
                            </Card>
                        </Container>
                    </motion.div>
                </div>
            </div>
        </div>
    );
} 