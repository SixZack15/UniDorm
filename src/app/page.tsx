'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Toaster } from "react-hot-toast";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center">
            <Toaster/>
            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white rounded-2xl shadow-2xl overflow-hidden">

                {/* Left Column: Branding & Info (Col 1-7) */}
                <div className="hidden lg:block lg:col-span-7 bg-gradient-to-br from-primary to-primary-dark p-12 text-white relative overflow-hidden">
                    {/* Decorative Circles */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

                    <div className="relative z-10 h-full flex flex-col justify-between">
                        <div>
                            <h2 className="text-4xl font-extrabold mb-4">WELCOME TO VLU DORMITORY</h2>
                            <p className="text-lg text-white/90">
                                Hệ thống quản lý ký túc xá hiện đại, tiện lợi và an toàn dành cho sinh viên Văn Lang.
                            </p>
                        </div>

                        {/* Illustration Placeholder */}
                        <div className="flex-grow flex items-center justify-center my-8">
                            <div className="w-full max-w-md aspect-video bg-white/20 rounded-lg flex items-center justify-center border-2 border-dashed border-white/30">
                                <span className="font-bold text-white/50">[ Campus Illustration / Photo ]</span>
                            </div>
                        </div>

                        <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                                </svg>
                                Thông báo mới nhất
                            </h3>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-start gap-2">
                                    <span className="bg-yellow-400 w-2 h-2 rounded-full mt-1.5 flex-shrink-0"></span>
                                    <span>Hạn đóng phí KTX tháng 10: <strong>15/10/2025</strong></span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="bg-yellow-400 w-2 h-2 rounded-full mt-1.5 flex-shrink-0"></span>
                                    <span>Lịch bảo trì hệ thống nước khu A: <strong>20/10/2025</strong></span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Right Column: Login Form (Col 8-12) */}
                <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-center">
                    <div className="mb-8 text-center lg:text-left">
                        <h1 className="text-2xl font-bold text-gray-900">ĐĂNG NHẬP HỆ THỐNG</h1>
                        <p className="text-gray-500 mt-2">Vui lòng đăng nhập để tiếp tục</p>
                    </div>

                    <form className="space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                Tên đăng nhập / Email VLU
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3"
                                    placeholder="mssv@vanlanguni.vn"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Mật khẩu
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    className="focus:ring-primary focus:border-primary block w-full pl-10 pr-10 sm:text-sm border-gray-300 rounded-md py-3"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-end">
                            <div className="text-sm">
                                <a href="#" className="font-medium text-primary hover:text-primary-dark">
                                    Quên mật khẩu?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                type="button"
                                onClick={() => {
                                    localStorage.setItem('userRole', 'STUDENT');
                                    window.location.href = '/dashboard';
                                }}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                            >
                                Login to Student
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">
                                    HOẶC
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 space-y-3">
                            <button
                                type="button"
                                onClick={() => {
                                    localStorage.setItem('userRole', 'ADMIN');
                                    window.location.href = '/admin/dashboard';
                                }}
                                className="w-full flex justify-center items-center gap-3 py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                            >
                                <svg className="h-5 w-5" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                Login to Admin
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    localStorage.setItem('userRole', 'MANAGEMENT');
                                    window.location.href = '/management/dashboard';
                                }}
                                className="w-full flex justify-center items-center gap-3 py-3 px-4 border border-primary rounded-md shadow-sm bg-primary/10 text-sm font-medium text-primary hover:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                            >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                Login to Ban Quản lý phòng
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
