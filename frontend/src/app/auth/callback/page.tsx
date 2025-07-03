"use client";

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { useToast } from '@/hooks/use-toast';

export default function AuthCallback() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login } = useAuth();
    const { toast } = useToast();

    useEffect(() => {
        const token = searchParams.get('token');
        const error = searchParams.get('error');
        const success = searchParams.get('success');

        if (token && success === 'true') {
            // Successful OAuth login
            login(token);
            toast({
                title: "Success",
                description: "You have been logged in successfully!",
            });
            router.push('/dashboard');
        } else if (error) {
            // OAuth error
            toast({
                title: "Authentication Error",
                description: "There was an error during authentication. Please try again.",
                variant: "destructive",
            });
            router.push('/signup');
        } else {
            // Invalid callback
            router.push('/signup');
        }
    }, [searchParams, login, toast, router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto mb-4"></div>
                <p className="text-muted-foreground">Completing authentication...</p>
            </div>
        </div>
    );
}
