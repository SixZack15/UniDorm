'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp, Bell } from 'lucide-react';

export default function NotificationsPage() {
    const [feeNoticeOpen, setFeeNoticeOpen] = useState(false);
    const [paymentReminderOpen, setPaymentReminderOpen] = useState(false);

    // Mock data for fee notices
    const feeNotices = [
        {
            id: 1,
            title: 'Phiếu báo phí tháng 11/2024',
            amount: 1500000,
            dueDate: '15/11/2024',
            status: 'Chưa thanh toán',
            description: 'Phí phòng và tiện ích tháng 11/2024',
        },
        {
            id: 2,
            title: 'Phiếu báo phí tháng 10/2024',
            amount: 1500000,
            dueDate: '15/10/2024',
            status: 'Đã thanh toán',
            description: 'Phí phòng và tiện ích tháng 10/2024',
        },
    ];

    // Mock data for payment reminders
    const paymentReminders = [
        {
            id: 1,
            title: 'Nhắc nhở đóng phí tháng 11/2024',
            message: 'Hạn chót thanh toán là ngày 15/11/2024. Vui lòng thanh toán đúng hạn để tránh phát sinh phí phạt.',
            date: '10/11/2024',
            priority: 'high',
        },
        {
            id: 2,
            title: 'Nhắc nhở đóng phí tháng 12/2024',
            message: 'Hạn chót thanh toán là ngày 15/12/2024. Vui lòng chuẩn bị số tiền cần thanh toán.',
            date: '01/12/2024',
            priority: 'medium',
        },
    ];

    return (
        <div className="space-y-6">
            {/* Breadcrumb */}
            <nav className="flex text-sm text-gray-500">
                <Link href="/dashboard" className="hover:text-primary">Trang chủ</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-medium">Thông báo</span>
            </nav>

            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                        <Bell className="w-8 h-8 text-primary" />
                        Thông báo
                    </h1>
                    <p className="text-gray-500 mt-1">Xem tất cả thông báo và nhắc nhở của bạn</p>
                </div>
            </div>

            {/* Fee Notice Dropdown */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <button
                    onClick={() => setFeeNoticeOpen(!feeNoticeOpen)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <div className="text-left">
                            <h2 className="font-bold text-gray-900">Thông tin báo phí</h2>
                            <p className="text-sm text-gray-500">{feeNotices.length} phiếu báo phí</p>
                        </div>
                    </div>
                    {feeNoticeOpen ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                </button>

                {feeNoticeOpen && (
                    <div className="border-t border-gray-100">
                        <div className="p-6 space-y-4">
                            {feeNotices.map((notice) => (
                                <div
                                    key={notice.id}
                                    className="p-4 rounded-xl border border-gray-200 hover:border-primary hover:shadow-md transition-all"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-1">{notice.title}</h3>
                                            <p className="text-sm text-gray-600">{notice.description}</p>
                                        </div>
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                notice.status === 'Đã thanh toán'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                            }`}
                                        >
                                            {notice.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                                        <div>
                                            <p className="text-xs text-gray-500">Số tiền</p>
                                            <p className="text-lg font-bold text-gray-900">
                                                {notice.amount.toLocaleString('vi-VN')} VND
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-gray-500">Hạn thanh toán</p>
                                            <p className="text-sm font-medium text-gray-900">{notice.dueDate}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Payment Reminder Dropdown */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <button
                    onClick={() => setPaymentReminderOpen(!paymentReminderOpen)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="text-left">
                            <h2 className="font-bold text-gray-900">Thông báo nhắc nhở đóng phí</h2>
                            <p className="text-sm text-gray-500">{paymentReminders.length} thông báo</p>
                        </div>
                    </div>
                    {paymentReminderOpen ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                </button>

                {paymentReminderOpen && (
                    <div className="border-t border-gray-100">
                        <div className="p-6 space-y-4">
                            {paymentReminders.map((reminder) => (
                                <div
                                    key={reminder.id}
                                    className={`p-4 rounded-xl border ${
                                        reminder.priority === 'high'
                                            ? 'border-red-200 bg-red-50'
                                            : 'border-yellow-200 bg-yellow-50'
                                    } hover:shadow-md transition-all`}
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="font-bold text-gray-900">{reminder.title}</h3>
                                        <span
                                            className={`px-2 py-1 rounded text-xs font-medium ${
                                                reminder.priority === 'high'
                                                    ? 'bg-red-100 text-red-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                            }`}
                                        >
                                            {reminder.priority === 'high' ? 'Quan trọng' : 'Thông thường'}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-700 mb-3">{reminder.message}</p>
                                    <p className="text-xs text-gray-500">Ngày gửi: {reminder.date}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

