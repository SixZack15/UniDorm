'use client';

import Link from 'next/link';

export function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={onClose}
                />
            )}

            {/* Drawer */}
            <aside
                className={`fixed top-0 left-0 bottom-0 w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden shadow-2xl ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="h-16 flex items-center px-4 border-b border-gray-100">
                    <span className="text-xl font-bold text-primary">Menu</span>
                    <button onClick={onClose} className="ml-auto p-2 text-gray-500 hover:text-gray-700">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <nav className="p-4 space-y-2">
                    <Link href="/dashboard" onClick={onClose} className="block px-4 py-3 rounded-lg hover:bg-red-50 text-gray-700 hover:text-primary font-medium transition-colors">
                        Dashboard
                    </Link>
                    <Link href="/rooms" onClick={onClose} className="block px-4 py-3 rounded-lg hover:bg-red-50 text-gray-700 hover:text-primary font-medium transition-colors">
                        My Room
                    </Link>
                    <Link href="/finance" onClick={onClose} className="block px-4 py-3 rounded-lg hover:bg-red-50 text-gray-700 hover:text-primary font-medium transition-colors">
                        Finance & Fees
                    </Link>
                    <Link href="/requests" onClick={onClose} className="block px-4 py-3 rounded-lg hover:bg-red-50 text-gray-700 hover:text-primary font-medium transition-colors">
                        Requests
                    </Link>
                    <div className="border-t border-gray-100 my-2 pt-2">
                        <Link href="/profile" onClick={onClose} className="block px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-600 font-medium transition-colors">
                            Settings
                        </Link>
                        <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-red-50 text-red-600 font-medium transition-colors">
                            Sign Out
                        </button>
                    </div>
                </nav>
            </aside>
        </>
    );
}
