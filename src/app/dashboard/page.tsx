'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';
import { subscriptionStorage, RoomSubscription } from '@/utils/subscriptionStorage';

export default function DashboardPage() {
    const [subscription, setSubscription] = useState<RoomSubscription | null>(null);
    const [hasSubscription, setHasSubscription] = useState(false);

    // Load subscription from localStorage on mount
    useEffect(() => {
        const loadedSubscription = subscriptionStorage.getSubscription();
        setSubscription(loadedSubscription);
        setHasSubscription(loadedSubscription !== null);
    }, []);

    // Calculate monthly bill (room price + utilities estimate)
    const calculateBill = () => {
        if (!subscription) return 0;
        const utilitiesEstimate = 40000; // Estimated utilities (water, electricity)
        return subscription.price + utilitiesEstimate;
    };

    // Calculate due date (15th of current month)
    const getDueDate = () => {
        const now = new Date();
        const dueDate = new Date(now.getFullYear(), now.getMonth(), 15);
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const daysLeft = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        
        return {
            dateString: `15/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`,
            daysLeft: daysLeft > 0 ? daysLeft : 0,
            isPastDue: daysLeft < 0
        };
    };

    const dueInfo = getDueDate();
    const monthlyBill = calculateBill();

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <Toaster/>

            {/* 1. Hero Section (Desktop: Col 1-8) */}
            <section className="lg:col-span-8 bg-white rounded-2xl shadow-sm p-6 border border-gray-100 flex flex-col justify-between relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-2xl font-bold text-gray-900">Xin chào, {subscription?.studentName || 'Sinh viên'}! 👋</h1>
                    {hasSubscription && subscription ? (
                        <p className="text-gray-500 mt-1">
                            Bạn đang ở: <span className="font-semibold text-primary">{subscription.roomName}</span>
                            {subscription.registrationStatus === 'Đang ở' && (
                                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                    Đã duyệt
                                </span>
                            )}
                            {subscription.registrationStatus === 'Chờ duyệt' && (
                                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                                    Chờ duyệt
                                </span>
                            )}
                            {subscription.registrationStatus === 'Từ chối' && (
                                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                    Từ chối
                                </span>
                            )}
                        </p>
                    ) : (
                        <p className="text-gray-500 mt-1">
                            Bạn chưa đăng ký phòng. 
                            <Link href="/rooms" className="text-primary font-semibold hover:underline ml-1">
                                Đăng ký ngay →
                            </Link>
                        </p>
                    )}
                </div>
                <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-red-50 to-transparent opacity-50 pointer-events-none"></div>
            </section>

            {/* 2. Finance Widget (Desktop: Col 9-12) - High Priority on Mobile */}
            {/* 2. Finance Widget (Desktop: Col 9-12) - High Priority on Mobile */}
            {hasSubscription && subscription && subscription.registrationStatus === 'Đang ở' ? (
                <section className="lg:col-span-4 bg-white rounded-2xl shadow-sm p-6 border border-gray-100 border-l-4 border-l-primary">
                    <div className="flex justify-between items-start mb-4">
                        <h2 className="font-bold text-gray-900">HÓA ĐƠN THÁNG {new Date().getMonth() + 1}</h2>
                        <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-full">CHƯA THANH TOÁN</span>
                    </div>
                    <div className="mb-6">
                        <p className="text-sm text-gray-500">Tổng tiền</p>
                        <p className="text-3xl font-extrabold text-gray-900">
                            {monthlyBill.toLocaleString('vi-VN')} <span className="text-sm font-medium text-gray-500">VND</span>
                        </p>
                        <div className="text-xs mt-2 space-y-1">
                            <p className="text-gray-600">• Phí phòng: {subscription.price.toLocaleString('vi-VN')} VND</p>
                            <p className="text-gray-600">• Điện nước (ước tính): 40,000 VND</p>
                        </div>
                        <p className={`text-xs mt-2 font-medium ${dueInfo.isPastDue ? 'text-red-700' : 'text-red-600'}`}>
                            {dueInfo.isPastDue ? (
                                `Quá hạn thanh toán!`
                            ) : (
                                `Hạn đóng: ${dueInfo.dateString} (Còn ${dueInfo.daysLeft} ngày)`
                            )}
                        </p>
                    </div>
                    <Link 
                        href="/finance/pay"
                        className="w-full flex justify-center items-center bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-lg transition-colors shadow-md shadow-red-200"
                    >
                        THANH TOÁN NGAY
                    </Link>
                </section>
            ) : hasSubscription && subscription && subscription.registrationStatus === 'Chờ duyệt' ? (
                <section className="lg:col-span-4 bg-yellow-50 rounded-2xl shadow-sm p-6 border border-yellow-200 flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center mb-3">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">Hồ sơ đang chờ duyệt</h3>
                    <p className="text-sm text-gray-600 mb-4">Ban quản lý đang xem xét hồ sơ đăng ký phòng của bạn.</p>
                    <Link 
                        href="/profile"
                        className="px-6 py-2 bg-white text-yellow-700 border border-yellow-300 rounded-lg hover:bg-yellow-100 transition-colors font-medium text-sm"
                    >
                        Xem chi tiết
                    </Link>
                </section>
            ) : hasSubscription && subscription && subscription.registrationStatus === 'Từ chối' ? (
                <section className="lg:col-span-4 bg-red-50 rounded-2xl shadow-sm p-6 border border-red-200 flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-3">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">Hồ sơ bị từ chối</h3>
                    <p className="text-sm text-gray-600 mb-4">Rất tiếc, hồ sơ đăng ký của bạn không được chấp nhận.</p>
                    <div className="flex gap-2">
                        <Link 
                            href="/profile"
                            className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
                        >
                            Xem chi tiết
                        </Link>
                        <Link 
                            href="/rooms"
                            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm"
                        >
                            Đăng ký lại
                        </Link>
                    </div>
                </section>
            ) : (
                <section className="lg:col-span-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-sm p-6 border border-gray-200 flex flex-col items-center justify-center text-center">
                    <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" />
                    </svg>
                    <h3 className="font-bold text-gray-900 mb-1">Chưa có hóa đơn</h3>
                    <p className="text-sm text-gray-600 mb-4">Đăng ký phòng để xem hóa đơn</p>
                    <Link 
                        href="/rooms"
                        className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm"
                    >
                        Đăng ký phòng
                    </Link>
                </section>
            )}

            {/* 3. Contract Widget (Desktop: Col 1-8) */}
            <section className="lg:col-span-8 bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-bold text-gray-900 flex items-center gap-2">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        HỢP ĐỒNG LƯU TRÚ
                    </h2>
                    <span className="text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm font-medium">Đang hoạt động</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Mã hợp đồng</p>
                        <p className="font-mono font-medium text-gray-900">HD-2024-A304-01</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Thời hạn (10 tháng)</p>
                        <p className="font-medium text-gray-900">15/08/2024 - 15/06/2025</p>
                    </div>
                </div>

                <div className="mt-6">
                    <div className="flex justify-between text-xs text-gray-500 mb-2">
                        <span>Tiến độ</span>
                        <span>60%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                </div>
            </section>

            {/* 4. Quick Actions (Desktop: Col 9-12) */}
            <section className="lg:col-span-4 bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                <h2 className="font-bold text-gray-900 mb-4">TIỆN ÍCH NHANH</h2>
                <div className="grid grid-cols-3 gap-4">
                    <Link href="/requests/create?type=incident" className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors group">
                        <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <span className="text-xs font-medium text-gray-600 text-center">Báo sự cố</span>
                    </Link>

                    <Link href="/requests/create?type=leave" className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors group">
                        <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <span className="text-xs font-medium text-gray-600 text-center">Xin nghỉ</span>
                    </Link>

                    <Link href="/history" className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors group">
                        <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <span className="text-xs font-medium text-gray-600 text-center">Lịch sử</span>
                    </Link>
                </div>
            </section>

            {/* 5. Notifications (Desktop: Col 1-8) */}
            <section className="lg:col-span-8 bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-bold text-gray-900">BẢNG TIN & THÔNG BÁO</h2>
                    <Link href="/notifications" className="text-sm text-primary hover:underline">Xem tất cả</Link>
                </div>

                <div className="space-y-4">
                    {/* Notification Item 1 */}
                    <div className="flex gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                        <div className="flex-shrink-0">
                            <div className="w-10 h-10 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-gray-900">[Nhắc nhở] Vui lòng đóng phí KTX Tháng 11</h3>
                            <p className="text-sm text-gray-600 mt-1">Hạn chót thanh toán là ngày 15/11. Vui lòng thanh toán đúng hạn để tránh phát sinh phí phạt.</p>
                            <p className="text-xs text-gray-400 mt-2">Ban Quản Lý • 2 giờ trước</p>
                        </div>
                    </div>

                    {/* Notification Item 2 */}
                    <div className="flex gap-4 p-4 rounded-xl bg-white border border-gray-100 hover:bg-gray-50 transition-colors">
                        <div className="flex-shrink-0">
                            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-gray-900">[Tin tức] Lịch cúp điện khu A để bảo trì</h3>
                            <p className="text-sm text-gray-600 mt-1">Khu A sẽ tạm ngừng cung cấp điện từ 8:00 - 12:00 ngày 20/11 để bảo trì hệ thống.</p>
                            <p className="text-xs text-gray-400 mt-2">Phòng Kỹ Thuật • Hôm qua</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Support Links (Desktop: Col 9-12) */}
            <section className="lg:col-span-4 bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                <h2 className="font-bold text-gray-900 mb-4">HỖ TRỢ SINH VIÊN</h2>
                <ul className="space-y-3">
                    <li>
                        <a href="#" className="flex items-center justify-between text-sm text-gray-600 hover:text-primary group">
                            <span>Hướng dẫn đăng ký tạm vắng</span>
                            <svg className="w-4 h-4 text-gray-400 group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-between text-sm text-gray-600 hover:text-primary group">
                            <span>Quy định về khách thăm</span>
                            <svg className="w-4 h-4 text-gray-400 group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-between text-sm text-gray-600 hover:text-primary group">
                            <span>Biểu mẫu đơn từ</span>
                            <svg className="w-4 h-4 text-gray-400 group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                    </li>
                </ul>

                <div className="mt-6 pt-6 border-t border-gray-100">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Liên hệ quản lý tòa A</h3>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                        <div>
                            <p className="text-sm font-bold text-gray-900">Mr. Bình</p>
                            <p className="text-xs text-gray-500">0909 000 111</p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
