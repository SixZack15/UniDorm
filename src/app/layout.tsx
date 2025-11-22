import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'UniDorm',
    description: 'University Dormitory Management System',
};

import { Shell } from '@/components/layout/Shell';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Shell>{children}</Shell>
            </body>
        </html>
    );
}
