'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function FinancePage() {
    const [activeTab, setActiveTab] = useState<'unpaid' | 'history'>('unpaid');
    const [expandedInvoice, setExpandedInvoice] = useState<string | null>(null);

    // Mock Data
    const unpaidInvoices = [
        {
            id: 'INV-2025-11-A304',
            month: '11/2025',
            title: 'Phí KTX Tháng 11',
            dueDate: '15/11/2025',
            totalAmount: 540000,
            status: 'PENDING',
            breakdown: [
                { item: 'Tiền phòng cơ bản', amount: 500000 },
                { item: 'Tiền điện (20kw x 2.000đ)', amount: 40000 },
                { item: 'Tiền nước (Khoán)', amount: 0 },
            ],
        },
    ];

    const historyInvoices = [
        {
            id: 'INV-2025-10-A304',
            month: '10/2025',
            title: 'Phí KTX Tháng 10',
            paidDate: '15/10/2025',
            method: 'VNPAY - QR',
            totalAmount: 540000,
            status: 'PAID',
        },
        {
            id: 'INV-2025-09-A304',
            month: '09/2025',
            title: 'Phí KTX Tháng 09',
            paidDate: '15/09/2025',
            method: 'Chuyển khoản',
            totalAmount: 540000,
            status: 'PAID',
        },
    ];

    const toggleExpand = (id: string) => {
        if (expandedInvoice === id) {
            setExpandedInvoice(null);
        } else {
            setExpandedInvoice(id);
        }
    };

    return (
        <div className="space-y-6">
            {/* Breadcrumb */}
            <nav className="flex text-sm text-gray-500">
                <Link href="/dashboard" className="hover:text-primary">Trang chủ</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-medium">Tài chính & Thanh toán</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* LEFT COLUMN: Wallet & Summary (Col 1-4) */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Summary Card */}
                    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 border-t-4 border-t-red-500">
                        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Số dư cần thanh toán</h2>
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-extrabold text-gray-900">540.000</span>
                            <span className="text-sm font-medium text-gray-500">VND</span>
                        </div>
                        <p className="text-sm text-red-600 font-medium mt-1">Hạn chót: 15/11/2025</p>

                        <div className="mt-6">
                            <button className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-lg shadow-md shadow-red-100 transition-colors flex items-center justify-center gap-2">
                                THANH TOÁN TẤT CẢ
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                        </div>
                    </section>

                    {/* Payment Methods Info */}
                    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h3 className="font-bold text-gray-900 mb-4">Phương thức thanh toán</h3>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center text-pink-600">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 14.5V12m0 0V8.832c0-1.184.917-2.132 2.08-2.132 3.01 0 2.16 4.437 3 5.086.851.656 2.346.545 2.965 2.035.618 1.49-.026 3.326-1.517 3.326H9.5a1 1 0 01-1-1v-2a1 1 0 011-1h2.5zM7 14H5v4m6-6v6m-6 0h2" />
                                    </svg>
                                </div>
                                Quét mã QR (Momo/ZaloPay)
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                    </svg>
                                </div>
                                Thẻ ATM Nội địa / Visa
                            </li>
                        </ul>
                    </section>

                    {/* Support Links */}
                    <section className="bg-gray-50 rounded-2xl border border-gray-200 p-6">
                        <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase">Hỗ trợ tài chính</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="text-gray-600 hover:text-primary hover:underline">Hướng dẫn thanh toán</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-primary hover:underline">Báo lỗi thanh toán</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-primary hover:underline">Xin gia hạn đóng phí</a></li>
                        </ul>
                    </section>
                </div>

                {/* RIGHT COLUMN: Invoices & History (Col 5-12) */}
                <div className="lg:col-span-8">

                    {/* Tabs */}
                    <div className="border-b border-gray-200 mb-6">
                        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                            <button
                                onClick={() => setActiveTab('unpaid')}
                                className={`${activeTab === 'unpaid'
                                        ? 'border-primary text-primary'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                            >
                                KHOẢN CẦN ĐÓNG
                                <span className="ml-2 bg-red-100 text-red-600 py-0.5 px-2 rounded-full text-xs">1</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('history')}
                                className={`${activeTab === 'history'
                                        ? 'border-primary text-primary'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                            >
                                LỊCH SỬ GIAO DỊCH
                            </button>
                        </nav>
                    </div>

                    {/* Content */}
                    {activeTab === 'unpaid' ? (
                        <div className="space-y-4">
                            {unpaidInvoices.map((inv) => (
                                <div key={inv.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                    <div className="p-6">
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="text-lg font-bold text-gray-900">{inv.title}</h3>
                                                    <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-0.5 rounded">CHỜ THANH TOÁN</span>
                                                </div>
                                                <p className="text-sm text-gray-500">Mã: {inv.id}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-2xl font-bold text-gray-900">{inv.totalAmount.toLocaleString('vi-VN')} đ</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 mb-6">
                                            <button
                                                onClick={() => toggleExpand(inv.id)}
                                                className="text-sm text-primary hover:text-primary-dark font-medium flex items-center gap-1"
                                            >
                                                {expandedInvoice === inv.id ? 'Thu gọn' : 'Xem chi tiết phí'}
                                                <svg className={`w-4 h-4 transform transition-transform ${expandedInvoice === inv.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>
                                        </div>

                                        {/* Expanded Details (FR-57) */}
                                        {expandedInvoice === inv.id && (
                                            <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-100 text-sm">
                                                <h4 className="font-bold text-gray-700 mb-2">Chi tiết tháng {inv.month}</h4>
                                                <ul className="space-y-2">
                                                    {inv.breakdown.map((item, idx) => (
                                                        <li key={idx} className="flex justify-between text-gray-600">
                                                            <span>{item.item}</span>
                                                            <span className="font-medium">{item.amount.toLocaleString('vi-VN')} đ</span>
                                                        </li>
                                                    ))}
                                                    <li className="flex justify-between text-gray-900 font-bold pt-2 border-t border-gray-200 mt-2">
                                                        <span>Tổng cộng</span>
                                                        <span>{inv.totalAmount.toLocaleString('vi-VN')} đ</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        )}

                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4" />
                                                <span className="text-sm text-gray-700 font-medium">Chọn thanh toán</span>
                                            </label>
                                            <button className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-6 rounded-lg shadow-sm transition-colors text-sm">
                                                Thanh toán
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tháng</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nội dung</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng tiền</th>
                                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {historyInvoices.map((inv) => (
                                            <tr key={inv.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                                    {inv.month}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{inv.title}</div>
                                                    <div className="text-xs text-gray-500">Ngày đóng: {inv.paidDate}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-bold text-gray-900">{inv.totalAmount.toLocaleString('vi-VN')} đ</div>
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                                        Đã thanh toán
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <div className="flex justify-end gap-3">
                                                        <button className="text-gray-600 hover:text-primary flex items-center gap-1" title="Xem biên lai">
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            </svg>
                                                        </button>
                                                        <button className="text-gray-600 hover:text-primary flex items-center gap-1" title="Tải về">
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
