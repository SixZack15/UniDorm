'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function AdminFinancePage() {
    // Mock Data for Invoices
    const invoices = [
        {
            id: 1,
            code: 'INV-11-A123',
            room: 'A.304',
            student: 'Nguyen van teo',
            amount: '450.000',
            status: 'PENDING',
            statusLabel: 'CHƯA THANH TOÁN',
            statusColor: 'bg-red-100 text-red-800',
        },
        {
            id: 2,
            code: 'INV-12-A123',
            room: 'B.305',
            student: 'KHAMMANH',
            amount: '300.000',
            status: 'PAID',
            statusLabel: 'ĐÃ THANH TOÁN',
            statusColor: 'bg-green-100 text-green-800',
        },
        {
            id: 3,
            code: 'INV-11-B101',
            room: 'B.101',
            student: 'Le Van C',
            amount: '450.000',
            status: 'PENDING',
            statusLabel: 'CHƯA THANH TOÁN',
            statusColor: 'bg-red-100 text-red-800',
        },
        {
            id: 4,
            code: 'INV-10-A202',
            room: 'A.202',
            student: 'Pham Thi D',
            amount: '450.000',
            status: 'PAID',
            statusLabel: 'ĐÃ THANH TOÁN',
            statusColor: 'bg-green-100 text-green-800',
        },
        {
            id: 5,
            code: 'INV-12-C303',
            room: 'C.303',
            student: 'Tran Van E',
            amount: '500.000',
            status: 'PENDING',
            statusLabel: 'CHƯA THANH TOÁN',
            statusColor: 'bg-red-100 text-red-800',
        },
    ];

    const stats = {
        period: 'Tháng 11/2025',
        totalReceivable: '2.000.000 VND',
        totalCollected: '1.300.000 VND',
        collectedPercentage: 65,
    };

    return (
        <div className="space-y-6">
            {/* Breadcrumb */}
            <nav className="flex text-sm text-gray-500">
                <Link href="/admin/dashboard" className="hover:text-primary">Trang chủ</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-medium">Tài chính</span>
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-medium">Quản lý phiếu báo phí</span>
            </nav>

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-900">Quản lý Phiếu báo phí</h1>
            </div>

            {/* Stats & Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Stats Card */}
                <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-sm font-bold text-gray-500 uppercase mb-4">THỐNG KÊ KỲ THU</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <p className="text-sm text-gray-500">Kỳ thu</p>
                            <p className="text-lg font-bold text-gray-900">{stats.period}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Tổng phải thu</p>
                            <p className="text-lg font-bold text-primary">{stats.totalReceivable}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Đã thu</p>
                            <div className="flex items-baseline gap-2">
                                <p className="text-lg font-bold text-green-600">{stats.totalCollected}</p>
                                <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                                    {stats.collectedPercentage}%
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
                        <div
                            className="bg-green-600 h-2.5 rounded-full"
                            style={{ width: `${stats.collectedPercentage}%` }}
                        ></div>
                    </div>
                </div>

                {/* Action Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-center items-center">
                    <button className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-lg shadow-md transition-colors flex items-center justify-center gap-2 mb-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        TẠO PHIẾU MỚI
                    </button>
                    <p className="text-xs text-gray-500 text-center">Tạo phiếu thu tiền điện, nước, hoặc phí phòng cho sinh viên.</p>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="relative w-full md:w-96">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Tìm kiếm mã phiếu, phòng, sinh viên..."
                        className="block w-full pl-10 rounded-md border-gray-300 focus:border-primary focus:ring-primary sm:text-sm py-2"
                    />
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                    <select className="block w-full md:w-auto rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary focus:outline-none focus:ring-primary sm:text-sm">
                        <option>Lọc: Tất cả Tòa</option>
                        <option>Tòa A</option>
                        <option>Tòa B</option>
                        <option>Tòa C</option>
                    </select>
                    <select className="block w-full md:w-auto rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary focus:outline-none focus:ring-primary sm:text-sm">
                        <option>Lọc: Tất cả Trạng thái</option>
                        <option>Chưa thanh toán</option>
                        <option>Đã thanh toán</option>
                    </select>
                </div>
            </div>

            {/* Invoices List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã Phiếu</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phòng</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sinh viên</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số tiền</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {invoices.map((inv) => (
                                <tr key={inv.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{inv.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{inv.code}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{inv.room}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{inv.student}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{inv.amount} VND</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${inv.statusColor}`}>
                                            {inv.statusLabel}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex flex-col gap-1 items-end">
                                            <button className="text-blue-600 hover:text-blue-900 text-xs font-bold hover:underline">Sửa</button>
                                            <button className="text-red-600 hover:text-red-900 text-xs font-bold hover:underline">Xóa</button>
                                            <button className="text-gray-600 hover:text-gray-900 text-xs font-bold hover:underline">Thông báo</button>
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
                                    <h3 className="font-bold text-gray-900">{inv.code}</h3>
                                    <span className="text-xs text-gray-500">ID: {inv.id}</span>
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
                                    <span className="block text-gray-500 text-xs">Sinh viên</span>
                                    <span className="font-medium">{inv.student}</span>
                                </div>
                                <div className="col-span-2">
                                    <span className="block text-gray-500 text-xs">Số tiền</span>
                                    <span className="font-bold text-gray-900">{inv.amount} VND</span>
                                </div>
                            </div>

                            <div className="flex gap-2 pt-2 border-t border-gray-50">
                                <button className="flex-1 bg-gray-50 text-blue-600 hover:bg-blue-50 font-medium py-1.5 px-3 rounded text-sm transition-colors">
                                    Sửa
                                </button>
                                <button className="flex-1 bg-gray-50 text-red-600 hover:bg-red-50 font-medium py-1.5 px-3 rounded text-sm transition-colors">
                                    Xóa
                                </button>
                                <button className="flex-1 bg-gray-50 text-gray-600 hover:bg-gray-100 font-medium py-1.5 px-3 rounded text-sm transition-colors">
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
                                Hiển thị <span className="font-medium">1</span> đến <span className="font-medium">5</span> trong số <span className="font-medium">230</span> kết quả
                            </p>
                        </div>
                        <div>
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                    <span className="sr-only">Trước</span>
                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Trước
                                </button>
                                <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                                    Trang 1 / 23
                                </span>
                                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                    <span className="sr-only">Sau</span>
                                    Sau
                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </nav>
                        </div>
                    </div>
                    {/* Mobile Pagination */}
                    <div className="flex items-center justify-between w-full sm:hidden">
                        <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                            Trước
                        </button>
                        <span className="text-sm text-gray-700">Trang 1/23</span>
                        <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                            Sau
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
