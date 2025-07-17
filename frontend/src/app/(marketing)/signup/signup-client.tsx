"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/auth-context";
import { authAPI } from "@/lib/api";
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
    const [name, setName] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState<'email' | 'verification' | 'name'>('email');
    const [isLogin, setIsLogin] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const { toast } = useToast();
    const { user, loading, login } = useAuth();
    const router = useRouter();

    // Redirect if already authenticated
    useEffect(() => {
        if (!loading && user) {
            router.push('/dashboard');
        }
    }, [user, loading, router]);

    // Countdown timer for resend verification
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [countdown]);

    const handleGoogleLogin = () => {
        setIsLoading(true);
        authAPI.googleLogin();
    };

    const handleGitHubLogin = () => {
        setIsLoading(true);
        authAPI.githubLogin();
    };

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;

        setIsLoading(true);

        try {
            const response = await authAPI.sendVerificationCode(email);

            if (response.success) {
                setIsLogin(response.data.isExistingUser);
                setStep('verification');
                setCountdown(60); // 60 second countdown
                toast({
                    title: "Verification Code Sent",
                    description: `We've sent a verification code to ${email}. Please check your inbox.`,
                });
            } else {
                toast({
                    title: "Error",
                    description: response.message || "Failed to send verification code.",
                    variant: "destructive",
                });
            }
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.message || "Something went wrong. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerificationSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!verificationCode.trim()) return;

        setIsLoading(true);

        try {
            if (isLogin) {
                // Login flow
                const response = await authAPI.verifyCodeAndLogin({
                    email,
                    verificationCode
                });

                if (response.success) {
                    login(response.data.token);
                    toast({
                        title: "Welcome back!",
                        description: "You've been successfully logged in.",
                    });
                    router.push('/dashboard');
                } else {
                    toast({
                        title: "Invalid Code",
                        description: response.message || "Please check your verification code and try again.",
                        variant: "destructive",
                    });
                }
            } else {
                // Registration flow - need name first
                setStep('name');
            }
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.message || "Invalid verification code.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegistrationSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        setIsLoading(true);

        try {
            const response = await authAPI.verifyCodeAndRegister({
                email,
                verificationCode,
                name: name.trim()
            });

            if (response.success) {
                login(response.data.token);
                toast({
                    title: "Welcome to Cheetah!",
                    description: "Your account has been created successfully.",
                });
                router.push('/dashboard');
            } else {
                toast({
                    title: "Registration Failed",
                    description: response.message || "Please try again.",
                    variant: "destructive",
                });
            }
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.message || "Registration failed. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendCode = async () => {
        if (countdown > 0) return;

        setIsLoading(true);
        try {
            const response = await authAPI.sendVerificationCode(email);
            if (response.success) {
                setCountdown(60);
                toast({
                    title: "Code Resent",
                    description: "A new verification code has been sent to your email.",
                });
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to resend code. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleBackToEmail = () => {
        setStep('email');
        setVerificationCode('');
        setName('');
        setCountdown(0);
    };

    // Show loading if auth is initializing
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading...</p>
                </div>
            </div>
        );
    }

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

                                <motion.div
                                    className="space-y-3"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.8, duration: 0.5 }}
                                >
                                    {/* OAuth Buttons */}
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full hover:bg-accent/10 hover:text-accent-foreground transition-colors duration-200 h-11"
                                        size="lg"
                                        onClick={handleGoogleLogin}
                                        disabled={isLoading}
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
                                        onClick={handleGitHubLogin}
                                        disabled={isLoading}
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

                                    {/* Email Step */}
                                    {step === 'email' && (
                                        <form onSubmit={handleEmailSubmit} className="space-y-3">
                                            <Input
                                                type="email"
                                                placeholder="Enter your email address"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full transition-colors duration-200 focus:border-accent h-11"
                                                required
                                                disabled={isLoading}
                                            />
                                            <Button
                                                type="submit"
                                                className="w-full bg-accent hover:bg-accent/90 transition-colors duration-200 h-11"
                                                size="lg"
                                                disabled={isLoading || !email.trim()}
                                            >
                                                {isLoading ? "Sending code..." : "Continue"}
                                            </Button>
                                        </form>
                                    )}

                                    {/* Verification Step */}
                                    {step === 'verification' && (
                                        <div className="space-y-3">
                                            <div className="text-center text-sm text-muted-foreground">
                                                {isLogin ? "Welcome back!" : "Almost there!"} We've sent a verification code to:
                                                <div className="font-medium text-foreground mt-1">{email}</div>
                                            </div>
                                            <form onSubmit={handleVerificationSubmit} className="space-y-3">
                                                <Input
                                                    type="text"
                                                    placeholder="Enter 6-digit verification code"
                                                    value={verificationCode}
                                                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                                    className="w-full transition-colors duration-200 focus:border-accent h-11 text-center text-lg tracking-widest"
                                                    required
                                                    disabled={isLoading}
                                                    maxLength={6}
                                                />
                                                <Button
                                                    type="submit"
                                                    className="w-full bg-accent hover:bg-accent/90 transition-colors duration-200 h-11"
                                                    size="lg"
                                                    disabled={isLoading || verificationCode.length !== 6}
                                                >
                                                    {isLoading ? "Verifying..." : isLogin ? "Sign In" : "Verify Code"}
                                                </Button>
                                            </form>
                                            <div className="text-center space-y-2">
                                                <button
                                                    type="button"
                                                    onClick={handleResendCode}
                                                    disabled={countdown > 0 || isLoading}
                                                    className="text-sm text-accent hover:text-accent/80 disabled:text-muted-foreground disabled:cursor-not-allowed"
                                                >
                                                    {countdown > 0 ? `Resend code in ${countdown}s` : "Resend code"}
                                                </button>
                                                <div>
                                                    <button
                                                        type="button"
                                                        onClick={handleBackToEmail}
                                                        className="text-sm text-muted-foreground hover:text-foreground"
                                                    >
                                                        ← Change email address
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Name Step (for registration) */}
                                    {step === 'name' && (
                                        <div className="space-y-3">
                                            <div className="text-center text-sm text-muted-foreground">
                                                Great! Now let's create your account.
                                            </div>
                                            <form onSubmit={handleRegistrationSubmit} className="space-y-3">
                                                <Input
                                                    type="text"
                                                    placeholder="Enter your full name"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    className="w-full transition-colors duration-200 focus:border-accent h-11"
                                                    required
                                                    disabled={isLoading}
                                                />
                                                <Button
                                                    type="submit"
                                                    className="w-full bg-accent hover:bg-accent/90 transition-colors duration-200 h-11"
                                                    size="lg"
                                                    disabled={isLoading || !name.trim()}
                                                >
                                                    {isLoading ? "Creating account..." : "Create Account"}
                                                </Button>
                                            </form>
                                            <div className="text-center">
                                                <button
                                                    type="button"
                                                    onClick={handleBackToEmail}
                                                    className="text-sm text-muted-foreground hover:text-foreground"
                                                >
                                                    ← Start over
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>

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