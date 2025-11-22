'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function RegistrationApprovalsPage() {
    const [activeTab, setActiveTab] = useState<'PENDING' | 'APPROVED' | 'REJECTED'>('PENDING');

    // Mock Data
    const registrations = [
        {
            id: 'REG-001',
            studentId: '21748020',
            studentName: 'Nguyễn Văn A',
            faculty: 'CNTT - Năm 3',
            roomType: 'Khu A - Dịch vụ (4 Giường)',
            date: '22/11/2025',
            status: 'PENDING',
            statusLabel: 'Chờ duyệt',
            statusColor: 'bg-yellow-100 text-yellow-800',
        },
        {
            id: 'REG-002',
            studentId: '22711005',
            studentName: 'Lê Thị B',
            faculty: 'Ngôn Ngữ Anh - Năm 2',
            roomType: 'Khu B - Chuẩn (8 Giường)',
            date: '21/11/2025',
            status: 'PENDING',
            statusLabel: 'Chờ duyệt',
            statusColor: 'bg-yellow-100 text-yellow-800',
        },
        {
            id: 'REG-003',
            studentId: '23799123',
            studentName: 'Trần Văn C',
            faculty: 'Xây Dựng - Năm 1',
            roomType: 'Khu A - Chuẩn (6 Giường)',
            date: '20/11/2025',
            status: 'PENDING',
            statusLabel: 'Chờ duyệt',
            statusColor: 'bg-yellow-100 text-yellow-800',
        },
        {
            id: 'REG-004',
            studentId: '21700001',
            studentName: 'Phạm Thị D',
            faculty: 'Kế Toán - Năm 3',
            roomType: 'Khu B - Dịch vụ (4 Giường)',
            date: '19/11/2025',
            status: 'PENDING',
            statusLabel: 'Chờ duyệt',
            statusColor: 'bg-yellow-100 text-yellow-800',
        },
    ];

    return (
        <div className="space-y-6">
            {/* Breadcrumb */}
            <nav className="flex text-sm text-gray-500">
                <Link href="/dashboard" className="hover:text-primary">Trang chủ</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-medium">Quản lý đăng ký</span>
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-medium">Xét duyệt hồ sơ</span>
            </nav>

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-900">Xét duyệt Đăng ký ở</h1>
            </div>

            {/* Control Panel */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Tabs */}
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex" aria-label="Tabs">
                        <button
                            onClick={() => setActiveTab('PENDING')}
                            className={`${activeTab === 'PENDING'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                } w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm flex items-center justify-center gap-2`}
                        >
                            Chờ duyệt
                            <span className="bg-yellow-100 text-yellow-800 py-0.5 px-2 rounded-full text-xs">4</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('APPROVED')}
                            className={`${activeTab === 'APPROVED'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                } w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm`}
                        >
                            Đã duyệt
                        </button>
                        <button
                            onClick={() => setActiveTab('REJECTED')}
                            className={`${activeTab === 'REJECTED'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                } w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm`}
                        >
                            Đã từ chối
                        </button>
                    </nav>
                </div>

                {/* Filters & Search */}
                <div className="p-4 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50">
                    <div className="relative w-full md:w-96">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Tìm kiếm MSSV, Họ tên..."
                            className="block w-full pl-10 rounded-md border-gray-300 focus:border-primary focus:ring-primary sm:text-sm"
                        />
                    </div>

                    <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                        <select className="block w-full md:w-auto rounded-md border-gray-300 py-1.5 text-base focus:border-primary focus:outline-none focus:ring-primary sm:text-sm">
                            <option>Tất cả Loại phòng</option>
                            <option>Khu A - Dịch vụ</option>
                            <option>Khu B - Chuẩn</option>
                        </select>
                        <select className="block w-full md:w-auto rounded-md border-gray-300 py-1.5 text-base focus:border-primary focus:outline-none focus:ring-primary sm:text-sm">
                            <option>Ngày gửi: Mới nhất</option>
                            <option>Ngày gửi: Cũ nhất</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Data Grid (Desktop) */}
            <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4" />
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MSSV</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Họ tên</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loại phòng yêu cầu</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày gửi</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {registrations.map((reg) => (
                                <tr key={reg.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4" />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{reg.studentId}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{reg.studentName}</div>
                                        <div className="text-xs text-gray-500">{reg.faculty}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{reg.roomType}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reg.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${reg.statusColor}`}>
                                            {reg.statusLabel}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end gap-2">
                                            <button className="text-green-600 hover:text-green-900 p-1 hover:bg-green-50 rounded" title="Duyệt">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </button>
                                            <button className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded" title="Từ chối">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination & Bulk Actions */}
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <button className="text-sm text-gray-600 hover:text-primary font-medium border border-gray-300 rounded px-3 py-1 hover:bg-gray-50">
                                Duyệt các mục đã chọn
                            </button>
                        </div>
                        <div>
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                    <span className="sr-only">Previous</span>
                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </a>
                                <a href="#" aria-current="page" className="z-10 bg-primary border-primary text-white relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                                    1
                                </a>
                                <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                    <span className="sr-only">Next</span>
                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                </a>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Card List */}
            <div className="md:hidden space-y-4">
                {registrations.map((reg) => (
                    <div key={reg.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className="font-bold text-gray-900">{reg.studentName} <span className="text-gray-500 font-normal">({reg.studentId})</span></h3>
                                <p className="text-xs text-gray-500">{reg.faculty}</p>
                            </div>
                        </div>

                        <div className="border-t border-b border-gray-100 py-2 my-2 space-y-1">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Yêu cầu:</span>
                                <span className="font-medium text-gray-900">{reg.roomType}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Ngày gửi:</span>
                                <span className="text-gray-900">{reg.date}</span>
                            </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                            <button className="flex-1 bg-red-50 text-red-600 hover:bg-red-100 font-bold py-2 px-4 rounded-lg text-sm transition-colors">
                                TỪ CHỐI
                            </button>
                            <button className="flex-1 bg-green-50 text-green-700 hover:bg-green-100 font-bold py-2 px-4 rounded-lg text-sm transition-colors">
                                DUYỆT
                            </button>
                        </div>
                    </div>
                ))}

                {/* Mobile Pagination */}
                <div className="flex justify-center pt-4">
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <a href="#" className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                            Trước
                        </a>
                        <a href="#" className="relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                            Sau
                        </a>
                    </nav>
                </div>
            </div>
        </div>
    );
}
