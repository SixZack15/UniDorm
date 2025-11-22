'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function AdminReportsPage() {
    // Mock Data for KPIs
    const kpis = {
        revenue: '1.800.000.000đ',
        debt: '200.000.000đ',
        collectionRate: '90%',
    };

    // Mock Data for Table
    const reportData = [
        { item: 'Tiền nước', plan: '100.000.000đ', actual: '90.000.000đ' },
        { item: 'Tiền điện', plan: '100.000.000đ', actual: '90.000.000đ' },
        { item: 'Phí phòng', plan: '1.800.000.000đ', actual: '1.620.000.000đ' },
        { item: 'TỔNG', plan: '2.000.000.000đ', actual: '1.800.000.000đ', isTotal: true },
    ];

    return (
        <div className="space-y-6">
            {/* Breadcrumb */}
            <nav className="flex text-sm text-gray-500">
                <Link href="/admin/dashboard" className="hover:text-primary">Trang chính</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-medium">Báo cáo</span>
            </nav>

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-900">Báo cáo Thống kê</h1>
            </div>

            {/* Control Panel */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column: Report Selection */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Chọn loại báo cáo</label>
                            <select className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2.5">
                                <option>Báo cáo Doanh thu</option>
                                <option>Báo cáo Công nợ</option>
                                <option>Báo cáo Tình trạng phòng</option>
                            </select>
                        </div>
                        <button className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-lg shadow-md transition-colors flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            LẬP BÁO CÁO
                        </button>
                    </div>

                    {/* Right Column: Date & Export */}
                    <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row gap-4 items-end">
                            <div className="w-full">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Kỳ báo cáo</label>
                                <div className="flex gap-2">
                                    <select className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2.5">
                                        <option>Tháng 11</option>
                                        <option>Tháng 10</option>
                                        <option>Tháng 9</option>
                                    </select>
                                    <select className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2.5">
                                        <option>2025</option>
                                        <option>2024</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Xuất dữ liệu</label>
                            <div className="flex gap-2">
                                <button className="flex-1 flex items-center justify-center gap-2 bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 font-bold py-2.5 px-4 rounded-lg transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Excel
                                </button>
                                <button className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 font-bold py-2.5 px-4 rounded-lg transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                    PDF
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* KPI Section */}
            <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center">
                    <span className="px-3 bg-gray-50 text-lg font-medium text-gray-900">-- Chi Tiết --</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
                    <dt className="text-sm font-medium text-gray-500 uppercase tracking-wider">Tổng doanh thu</dt>
                    <dd className="mt-2 text-3xl font-extrabold text-primary">{kpis.revenue}</dd>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
                    <dt className="text-sm font-medium text-gray-500 uppercase tracking-wider">Nợ cần thu</dt>
                    <dd className="mt-2 text-3xl font-extrabold text-red-600">{kpis.debt}</dd>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
                    <dt className="text-sm font-medium text-gray-500 uppercase tracking-wider">Tỷ lệ thu được</dt>
                    <dd className="mt-2 text-3xl font-extrabold text-green-600">{kpis.collectionRate}</dd>
                </div>
            </div>

            {/* Visualization Section */}
            <div className="relative mt-8">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center">
                    <span className="px-3 bg-gray-50 text-lg font-medium text-gray-900">-- Biểu Đồ --</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Chart Container */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-gray-900">Biểu đồ tăng trưởng</h3>
                        <select className="text-sm border-gray-300 rounded-md focus:ring-primary focus:border-primary">
                            <option>Loại cần xem: Tất cả</option>
                            <option>Điện</option>
                            <option>Nước</option>
                            <option>Phí phòng</option>
                        </select>
                    </div>
                    <div className="h-64 flex items-end justify-between gap-2 px-4 pb-4 border-b border-l border-gray-200 relative">
                        {/* Mock Chart Bars/Lines */}
                        <div className="w-full h-full absolute inset-0 flex items-center justify-center text-gray-400 text-sm italic">
                            [Biểu đồ trực quan hóa dữ liệu sẽ hiển thị ở đây]
                            <br />
                            (Sử dụng thư viện như Recharts hoặc Chart.js)
                        </div>
                        {/* Simple CSS Bars for visual effect */}
                        <div className="w-1/6 bg-blue-100 h-1/3 rounded-t relative group">
                            <div className="absolute bottom-0 w-full bg-blue-500 h-1/2 rounded-t transition-all group-hover:h-3/4"></div>
                        </div>
                        <div className="w-1/6 bg-blue-100 h-1/2 rounded-t relative group">
                            <div className="absolute bottom-0 w-full bg-blue-500 h-2/3 rounded-t transition-all group-hover:h-full"></div>
                        </div>
                        <div className="w-1/6 bg-blue-100 h-2/3 rounded-t relative group">
                            <div className="absolute bottom-0 w-full bg-blue-500 h-1/2 rounded-t transition-all group-hover:h-3/4"></div>
                        </div>
                        <div className="w-1/6 bg-blue-100 h-3/4 rounded-t relative group">
                            <div className="absolute bottom-0 w-full bg-blue-500 h-2/3 rounded-t transition-all group-hover:h-full"></div>
                        </div>
                        <div className="w-1/6 bg-blue-100 h-full rounded-t relative group">
                            <div className="absolute bottom-0 w-full bg-blue-500 h-3/4 rounded-t transition-all group-hover:h-5/6"></div>
                        </div>
                    </div>
                </div>

                {/* Data Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                    <div className="p-4 border-b border-gray-200 bg-gray-50">
                        <h3 className="text-lg font-bold text-gray-900">Chi tiết số liệu</h3>
                    </div>
                    <div className="overflow-x-auto flex-grow">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-white">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khoản</th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Kế hoạch</th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Thực tế</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {reportData.map((row, index) => (
                                    <tr key={index} className={row.isTotal ? 'bg-gray-50 font-bold' : 'hover:bg-gray-50'}>
                                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${row.isTotal ? 'text-gray-900' : 'text-gray-500'}`}>
                                            {row.item}
                                        </td>
                                        <td className={`px-6 py-4 whitespace-nowrap text-sm text-right ${row.isTotal ? 'text-gray-900' : 'text-gray-900'}`}>
                                            {row.plan}
                                        </td>
                                        <td className={`px-6 py-4 whitespace-nowrap text-sm text-right ${row.isTotal ? 'text-primary' : 'text-gray-900'}`}>
                                            {row.actual}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-auto">
                        <div className="flex-1 flex justify-between sm:hidden">
                            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                Trước
                            </button>
                            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                Sau
                            </button>
                        </div>
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Hiển thị <span className="font-medium">1</span> đến <span className="font-medium">4</span> trong số <span className="font-medium">4</span> kết quả
                                </p>
                            </div>
                            <div>
                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                    <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-red-600 hover:bg-red-50">
                                        <span className="sr-only">Trước</span>
                                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                    <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                                        1
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
                    </div>
                </div>
            </div>
        </div>
    );
}
