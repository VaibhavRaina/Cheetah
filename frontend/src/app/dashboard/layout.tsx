import DashboardNavbar from "@/components/dashboard/navbar";
import React from 'react';

interface Props {
    children: React.ReactNode
}

const DashboardLayout = ({ children }: Props) => {
    return (
        <>
            <DashboardNavbar />
            <main className="min-h-screen">
                {children}
            </main>
        </>
    );
};

export default DashboardLayout;
