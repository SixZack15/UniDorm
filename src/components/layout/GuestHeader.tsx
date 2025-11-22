'use client';

import Link from 'next/link';

export function GuestHeader() {
    return (
        <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-4 justify-between">
            {/* Left: Logo */}
            <div className="flex items-center gap-4">
                <Link href="/" className="text-xl font-bold tracking-tight flex items-center gap-2">
                    <span className="bg-primary text-white px-2 py-1 rounded text-sm font-extrabold">VLU</span>
                    <span className="text-primary">KTX</span>
                </Link>
            </div>

            {/* Right: Support */}
            <div className="flex items-center gap-4">
                <Link href="/support" className="text-sm font-medium text-gray-600 hover:text-primary flex items-center gap-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Hỗ trợ
                </Link>
            </div>
        </header>
    );
}
