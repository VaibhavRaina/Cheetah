import "@/styles/globals.css";
import { cn } from "@/lib/cn";
import { generateMetadata } from "@/utils/metadata";
import { base, heading, subheading } from "@/constants/fonts";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/auth-context";
import React from "react";

export const metadata = generateMetadata();

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={cn(base.variable, heading.variable, subheading.variable, "scroll-smooth")} suppressHydrationWarning>
            <body
                suppressHydrationWarning
                className={cn(
                    "min-h-screen bg-background font-base antialiased",
                    base.variable,
                    heading.variable,
                    subheading.variable,
                )}
            >
                <ThemeProvider
                    attribute="class"
                >
                    <AuthProvider>
                        <Toaster richColors theme="dark" position="top-right" />
                        {children}
                    </AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
};
