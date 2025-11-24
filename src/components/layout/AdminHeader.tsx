'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function AdminHeader({ onMenuClick }: { onMenuClick: () => void }) {
    const router = useRouter();

    const handleProfileClick = () => {
        router.push('/admin/profile');
    };

    return (
        <header className="bg-red-900 text-white shadow-md fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-4 justify-between">
            {/* Left: Hamburger (Mobile) & Logo */}
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="lg:hidden p-2 hover:bg-white/10 rounded-full transition-colors"
                    aria-label="Toggle Menu"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                <Link href="/admin/dashboard" className="text-xl font-bold tracking-tight flex items-center gap-2">
                    <span className="bg-white text-red-900 px-2 py-1 rounded text-sm font-extrabold">VLU</span>
                    <span>DORM ADMIN</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-6 ml-8 text-sm font-medium">
                    <Link href="/admin/dashboard" className="hover:text-white/80 transition-colors">Dashboard</Link>
                    <Link href="/admin/students" className="hover:text-white/80 transition-colors">Students</Link>
                    <Link href="/admin/rooms" className="hover:text-white/80 transition-colors">Rooms</Link>
                    <Link href="/admin/finance" className="hover:text-white/80 transition-colors">Finance</Link>
                    <Link href="/admin/reports" className="hover:text-white/80 transition-colors">Reports</Link>
                    <Link href="/admin/settings" className="bg-white/20 px-3 py-1 rounded hover:bg-white/30 transition-colors">ADMIN</Link>
                </nav>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-white/10 rounded-full transition-colors relative">
                    <span className="sr-only">Notifications</span>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full"></span>
                </button>

                <button
                    onClick={handleProfileClick}
                    className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold hover:bg-white/30 transition-colors cursor-pointer"
                    title="Profile"
                >
                    A
                </button>
            </div>
        </header>
    );
}
