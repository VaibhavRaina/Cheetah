import DashboardNavbar from "@/components/dashboard/navbar";
import ProtectedRoute from "@/components/auth/protected-route";
import React from 'react';

interface Props {
    children: React.ReactNode
}

const DashboardLayout = ({ children }: Props) => {
    return (
        <ProtectedRoute>
            <DashboardNavbar />
            <main className="min-h-screen">
                {children}
            </main>
        </ProtectedRoute>
    );
};

export default DashboardLayout;
