'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { AdminHeader } from './AdminHeader';
import { GuestHeader } from './GuestHeader';
import { Footer } from './Footer';
import { Sidebar } from './Sidebar';

export function Shell({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname();

    // Determine if we are in "Guest Mode" (Landing Page)
    const isGuest = pathname === '/';
    // Determine if we are in "Admin Mode"
    const isAdmin = pathname?.startsWith('/admin');

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans">
            {isGuest ? (
                <GuestHeader />
            ) : isAdmin ? (
                <>
                    <AdminHeader onMenuClick={() => setIsSidebarOpen(true)} />
                    <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
                </>
            ) : (
                <>
                    <Header onMenuClick={() => setIsSidebarOpen(true)} />
                    <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
                </>
            )}

            <main className="flex-grow pt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {children}
                </div>
            </main>

            <Footer />
        </div>
    );
}
