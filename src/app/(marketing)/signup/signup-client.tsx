"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Check } from "lucide-react";

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
        <div className="min-h-screen grid lg:grid-cols-2 bg-background">
            {/* Marketing Panel */}
            <div className="hidden lg:flex flex-col justify-center px-16 py-12 space-y-8">
                <div className="space-y-4 max-w-md">
                    <h1 className="text-4xl font-extrabold leading-tight">
                        Create an account to start your Developer Journey
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Agent, completions, chat, and instructions powered by Cheetah's context engine for the most accurate code assistance.
                    </p>
                </div>
                <ul className="space-y-3 max-w-md">
                    {[
                        "No credit card required",
                        "Use the full power of Cheetah, no limits or restrictions",
                        "Get help, share feedback, and join the community on Discord",
                        "We don't train on your data",
                    ].map((item) => (
                        <li key={item} className="flex items-start gap-3">
                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent/50">
                                <Check className="h-4 w-4 text-accent-foreground" />
                            </span>
                            <span className="text-base">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Sign-up Card */}
            <div className="flex items-center justify-center px-4 py-12">
                <Card className="w-full max-w-[420px] p-8 space-y-6 shadow-xl border-border/60">
                    <div className="space-y-2 text-center">
                        <Image
                            src="/icons/icon-dark.png"
                            alt="Logo"
                            width={48}
                            height={48}
                            className="mx-auto"
                        />
                        <h2 className="text-2xl font-semibold">Create your account</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full hover:bg-accent hover:text-accent-foreground"
                            size="lg"
                        >
                            <Image
                                src="/images/mcp-servers/google drive.png"
                                alt="Google"
                                width={20}
                                height={20}
                                className="mr-2"
                            />
                            Continue with Google
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            className="w-full hover:bg-accent hover:text-accent-foreground"
                            size="lg"
                        >
                            <Image
                                src="/images/mcp-servers/github.png"
                                alt="GitHub"
                                width={20}
                                height={20}
                                className="mr-2"
                            />
                            Continue with GitHub
                        </Button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card px-2 text-muted-foreground">or</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Input
                                type="email"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full"
                                required
                            />
                            <Button
                                type="submit"
                                className="w-full bg-primary hover:bg-primary/90"
                                size="lg"
                                disabled={isLoading}
                            >
                                {isLoading ? "Loading..." : "Continue"}
                            </Button>
                        </div>
                    </form>

                    <p className="text-center text-sm text-muted-foreground">
                        By creating an account, you agree to the{" "}
                        <a href="/terms" className="link font-medium text-primary">
                            Enterprise Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="/privacy" className="link font-medium text-primary">
                            Privacy Policy
                        </a>
                    </p>
                </Card>
            </div>
        </div>
    );
} 