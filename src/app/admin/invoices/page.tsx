'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function AdminInvoicesPage() {
    // Mock Data for Invoices/Receipts
    const invoices = [
        {
            id: '4235-aadfs-435',
            room: 'A.304', // Note: Wireframe had swapped labels, mapping correctly here
            student: 'Nguyễn Văn Tèo',
            amount: '99.999.999',
            status: 'UNPAID',
            statusLabel: 'Chưa đóng',
            statusColor: 'bg-red-100 text-red-800',
        },
        {
            id: '5555-xyz-888',
            room: 'B.205',
            student: 'Trần Thị B',
            amount: '500.000',
            status: 'PAID',
            statusLabel: 'Đã đóng',
            statusColor: 'bg-green-100 text-green-800',
        },
        {
            id: '6666-abc-123',
            room: 'C.101',
            student: 'Lê Văn C',
            amount: '1.200.000',
            status: 'UNPAID',
            statusLabel: 'Chưa đóng',
            statusColor: 'bg-red-100 text-red-800',
        },
        {
            id: '7777-def-456',
            room: 'A.202',
            student: 'Phạm Thị D',
            amount: '450.000',
            status: 'PAID',
            statusLabel: 'Đã đóng',
            statusColor: 'bg-green-100 text-green-800',
        },
        {
            id: '8888-ghi-789',
            room: 'B.303',
            student: 'Hoàng Văn E',
            amount: '3.000.000',
            status: 'UNPAID',
            statusLabel: 'Chưa đóng',
            statusColor: 'bg-red-100 text-red-800',
        },
    ];

    return (
        <div className="space-y-6">
            {/* Breadcrumb */}
            <nav className="flex text-sm text-gray-500">
                <Link href="/admin/dashboard" className="hover:text-primary">Trang chính</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-medium">Tài Chính</span>
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-medium">Hóa đơn & Thu chi</span>
            </nav>

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-900">Quản lý Hóa đơn</h1>
            </div>

            {/* Action Buttons (Row 1) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-3 bg-white border-2 border-dashed border-primary text-primary hover:bg-blue-50 font-bold py-4 px-6 rounded-xl shadow-sm transition-all group">
                    <div className="bg-blue-100 p-2 rounded-full group-hover:bg-blue-200 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <span className="text-lg">TẠO HÓA ĐƠN RIÊNG</span>
                </button>

                <button className="flex items-center justify-center gap-3 bg-primary text-white hover:bg-primary-dark font-bold py-4 px-6 rounded-xl shadow-md transition-all group">
                    <div className="bg-white/20 p-2 rounded-full group-hover:bg-white/30 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                    </div>
                    <span className="text-lg">TẠO NHIỀU HÓA ĐƠN</span>
                </button>
            </div>

            {/* Filters & Search (Row 2) */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="relative w-full md:w-96">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        className="block w-full pl-10 rounded-md border-gray-300 focus:border-primary focus:ring-primary sm:text-sm py-2"
                    />
                </div>

                <div className="flex flex-wrap gap-2 w-full md:w-auto">
                    <select className="block w-full md:w-auto rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary focus:outline-none focus:ring-primary sm:text-sm">
                        <option>Lọc theo tòa</option>
                        <option>Tòa A</option>
                        <option>Tòa B</option>
                        <option>Tòa C</option>
                    </select>
                    <select className="block w-full md:w-auto rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary focus:outline-none focus:ring-primary sm:text-sm">
                        <option>Tầng</option>
                        <option>Tầng 1</option>
                        <option>Tầng 2</option>
                        <option>Tầng 3</option>
                    </select>
                    <select className="block w-full md:w-auto rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary focus:outline-none focus:ring-primary sm:text-sm">
                        <option>Giới tính</option>
                        <option>Nam</option>
                        <option>Nữ</option>
                    </select>
                </div>
            </div>

            {/* Data Grid */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phòng</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sinh Viên</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số Tiền</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Thao Tác</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {invoices.map((inv) => (
                                <tr key={inv.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{inv.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{inv.room}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{inv.student}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{inv.amount} VND</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${inv.statusColor}`}>
                                            {inv.statusLabel}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                        <div className="flex flex-col gap-2 items-center">
                                            <div className="flex gap-2">
                                                <button className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1 rounded text-xs font-bold transition-colors">
                                                    Sửa
                                                </button>
                                                <button className="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1 rounded text-xs font-bold transition-colors">
                                                    Xóa
                                                </button>
                                            </div>
                                            <button className="text-gray-500 hover:text-gray-700 text-xs hover:underline">
                                                Thông báo
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Card List */}
                <div className="md:hidden">
                    {invoices.map((inv) => (
                        <div key={inv.id} className="border-b border-gray-100 p-4 last:border-b-0">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <span className="text-xs text-gray-500 block">Mã: {inv.id}</span>
                                    <h3 className="font-bold text-gray-900">{inv.student}</h3>
                                </div>
                                <span className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${inv.statusColor}`}>
                                    {inv.statusLabel}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                                <div>
                                    <span className="block text-gray-500 text-xs">Phòng</span>
                                    <span className="font-medium">{inv.room}</span>
                                </div>
                                <div>
                                    <span className="block text-gray-500 text-xs">Số tiền</span>
                                    <span className="font-bold text-gray-900">{inv.amount}</span>
                                </div>
                            </div>

                            <div className="flex gap-2 pt-2 border-t border-gray-50">
                                <button className="flex-1 bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium py-2 px-3 rounded text-sm transition-colors">
                                    Sửa
                                </button>
                                <button className="flex-1 bg-red-50 text-red-600 hover:bg-red-100 font-medium py-2 px-3 rounded text-sm transition-colors">
                                    Xóa
                                </button>
                                <button className="flex-1 bg-gray-100 text-gray-600 hover:bg-gray-200 font-medium py-2 px-3 rounded text-sm transition-colors">
                                    Thông báo
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Hiển thị <span className="font-medium">1</span> đến <span className="font-medium">5</span> trong số <span className="font-medium">20</span> kết quả
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">Hiển thị</span>
                                <select className="border-gray-300 rounded text-sm py-1">
                                    <option>10</option>
                                    <option>20</option>
                                    <option>50</option>
                                </select>
                                <span className="text-sm text-gray-600">dòng/trang</span>
                            </div>
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-red-600 hover:bg-red-50">
                                    <span className="sr-only">Trước</span>
                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                                    1 / 20
                                </span>
                                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-red-600 hover:bg-red-50">
                                    <span className="sr-only">Sau</span>
                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </nav>
                        </div>
                    </div>
                    {/* Mobile Pagination */}
                    <div className="flex items-center justify-between w-full sm:hidden">
                        <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-red-600 bg-white hover:bg-red-50">
                            &lt;
                        </button>
                        <span className="text-sm text-gray-700">1 / 20</span>
                        <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-red-600 bg-white hover:bg-red-50">
                            &gt;
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
