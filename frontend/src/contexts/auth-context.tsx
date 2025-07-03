"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import Cookies from 'js-cookie';
import { authAPI } from '@/lib/api';

interface User {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
    plan: string;
    subscription: {
        status: string;
        currentPeriodEnd?: Date;
        cancelAtPeriodEnd?: boolean;
    };
    usage: {
        messagesUsed: number;
        messagesLimit: number;
        resetDate: Date;
    };
    preferences: {
        emailNotifications: boolean;
        marketingEmails: boolean;
        theme: string;
    };
    isEmailVerified: boolean;
    lastLogin: Date;
    createdAt: Date;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (token: string) => void;
    logout: () => void;
    updateUser: (userData: Partial<User>) => void;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Initialize auth state
    useEffect(() => {
        const initAuth = async () => {
            const token = Cookies.get('auth_token');
            if (token) {
                try {
                    const response = await authAPI.getCurrentUser();
                    if (response.success) {
                        setUser(response.data.user);
                    } else {
                        Cookies.remove('auth_token');
                    }
                } catch (error) {
                    console.error('Failed to get current user:', error);
                    Cookies.remove('auth_token');
                }
            }
            setLoading(false);
        };

        initAuth();
    }, []);

    const refreshUser = useCallback(async () => {
        try {
            const response = await authAPI.getCurrentUser();
            if (response.success) {
                setUser(response.data.user);
            }
        } catch (error) {
            console.error('Failed to refresh user:', error);
        }
    }, []);

    const login = useCallback((token: string) => {
        Cookies.set('auth_token', token, { expires: 7 }); // 7 days
        refreshUser();
    }, [refreshUser]);

    const logout = useCallback(async () => {
        try {
            await authAPI.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            Cookies.remove('auth_token');
            setUser(null);
        }
    }, []);

    const updateUser = useCallback((userData: Partial<User>) => {
        setUser(prev => prev ? { ...prev, ...userData } : null);
    }, []);

    const value: AuthContextType = {
        user,
        loading,
        login,
        logout,
        updateUser,
        refreshUser,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
