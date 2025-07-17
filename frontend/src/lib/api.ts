import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = Cookies.get('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Clear token and redirect to login
            Cookies.remove('auth_token');
            window.location.href = '/signup';
        }
        return Promise.reject(error);
    }
);

// Auth API functions
export const authAPI = {
    // OAuth login
    googleLogin: () => {
        window.location.href = `${API_BASE_URL}/auth/google`;
    },

    githubLogin: () => {
        window.location.href = `${API_BASE_URL}/auth/github`;
    },

    // Traditional auth (for later)
    register: async (userData: { name: string; email: string; password: string }) => {
        const response = await api.post('/auth/register', userData);
        return response.data;
    },

    login: async (credentials: { email: string; password: string }) => {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    },

    // Get current user
    getCurrentUser: async () => {
        const response = await api.get('/auth/me');
        return response.data;
    },

    // Logout
    logout: async () => {
        const response = await api.post('/auth/logout');
        Cookies.remove('auth_token');
        return response.data;
    },

    // Change password
    changePassword: async (passwords: { currentPassword: string; newPassword: string }) => {
        const response = await api.post('/auth/change-password', passwords);
        return response.data;
    },
};

// Dashboard API functions
export const dashboardAPI = {
    getOverview: async () => {
        const response = await api.get('/dashboard/overview');
        return response.data;
    },

    getStats: async () => {
        const response = await api.get('/dashboard/stats');
        return response.data;
    },

    getActivity: async () => {
        const response = await api.get('/dashboard/activity');
        return response.data;
    },
};

// User API functions
export const userAPI = {
    updateProfile: async (userData: { name?: string; email?: string }) => {
        const response = await api.put('/user/profile', userData);
        return response.data;
    },

    updatePreferences: async (preferences: any) => {
        const response = await api.put('/user/preferences', preferences);
        return response.data;
    },

    deleteAccount: async () => {
        const response = await api.delete('/user/account');
        return response.data;
    },

    updatePlan: async (planId: string) => {
        const response = await api.put('/user/plan', { planId });
        return response.data;
    },

    cancelSubscription: async () => {
        const response = await api.put('/user/cancel-subscription');
        return response.data;
    },

    getProfile: async () => {
        const response = await api.get('/user/profile');
        return response.data;
    },

    // Get transaction history
    getTransactions: async (page: number = 1, limit: number = 10, type?: string) => {
        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString()
        });
        if (type) params.append('type', type);

        const response = await api.get(`/user/transactions?${params}`);
        return response.data;
    },

    // Get billing history
    getBillingHistory: async (page: number = 1, limit: number = 10) => {
        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString()
        });

        const response = await api.get(`/user/billing-history?${params}`);
        return response.data;
    },
};

// Subscription API functions
export const subscriptionAPI = {
    getPlans: async () => {
        const response = await api.get('/subscription/plans');
        return response.data;
    },

    getCurrentSubscription: async () => {
        const response = await api.get('/subscription/current');
        return response.data;
    },

    createCheckout: async (planId: string) => {
        const response = await api.post('/subscription/create-checkout', { planId });
        return response.data;
    },

    cancelSubscription: async () => {
        const response = await api.post('/subscription/cancel');
        return response.data;
    },
};

// Billing API functions
export const billingAPI = {
    getBillingOverview: async () => {
        const response = await api.get('/billing/overview');
        return response.data;
    },

    getUsageStats: async (period: 'daily' | 'weekly' | 'monthly' = 'daily') => {
        const response = await api.get(`/billing/usage/${period}`);
        return response.data;
    },

    getInvoice: async (invoiceId: string) => {
        const response = await api.get(`/billing/invoices/${invoiceId}`);
        return response.data;
    },

    downloadInvoice: async (invoiceId: string) => {
        const response = await api.get(`/billing/invoices/${invoiceId}/download`, {
            responseType: 'blob'
        });
        return response.data;
    },

    recordUsage: async (messageCount: number = 1) => {
        const response = await api.post('/billing/usage/record', { messageCount });
        return response.data;
    },
};

// Recharge API functions
export const rechargeAPI = {
    getConfig: async () => {
        const response = await api.get('/recharge/config');
        return response.data;
    },

    calculatePrice: async (messages: number) => {
        const response = await api.post('/recharge/calculate', { messages });
        return response.data;
    },

    purchaseRecharge: async (messages: number, paymentMethodId?: string) => {
        const response = await api.post('/recharge/purchase', { messages, paymentMethodId });
        return response.data;
    },

    getHistory: async (page: number = 1, limit: number = 10) => {
        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString()
        });
        const response = await api.get(`/recharge/history?${params}`);
        return response.data;
    },

    getBalance: async () => {
        const response = await api.get('/recharge/balance');
        return response.data;
    },
};

// Contact API functions
export const contactAPI = {
    sendSalesInquiry: async (contactData: {
        name: string;
        email: string;
        company: string;
        phone?: string;
        jobTitle?: string;
        companySize?: string;
        interestLevel?: string;
        budget?: string;
        timeline?: string;
        message: string;
    }) => {
        const response = await api.post('/contact/sales', contactData);
        return response.data;
    },

    sendGeneralInquiry: async (contactData: {
        name: string;
        email: string;
        subject: string;
        message: string;
    }) => {
        const response = await api.post('/contact/general', contactData);
        return response.data;
    },
};

export default api;
