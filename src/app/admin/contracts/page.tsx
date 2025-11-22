'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ContractManagementPage() {
    const [activeTab, setActiveTab] = useState<'REQUESTS' | 'ALL'>('REQUESTS');

    // Mock Data
    const extensionRequests = [
        {
            id: 'EXT-001',
            studentId: '21748020',
            studentName: 'Nguyễn Văn A',
            room: 'A.304',
            currentExpiry: '15/06/2025',
            requestedExpiry: '15/01/2026',
            durationLabel: '+6 Tháng',
            reason: 'Còn lịch học quân sự',
            isDebt: false,
        },
        {
            id: 'EXT-002',
            studentId: '22711005',
            studentName: 'Trần Thị B',
            room: 'B.102',
            currentExpiry: '15/06/2025',
            requestedExpiry: '15/06/2026',
            durationLabel: '+12 Tháng',
            reason: 'Năm học mới',
            isDebt: true,
        },
        {
            id: 'EXT-003',
            studentId: '20799123',
            studentName: 'Lê Văn C',
            room: 'A.205',
            currentExpiry: '30/05/2025',
            requestedExpiry: '30/08/2025',
            durationLabel: '+3 Tháng',
            reason: 'Học hè',
            isDebt: false,
        },
    ];

    return (
        <div className="space-y-6">
            {/* Breadcrumb */}
            <nav className="flex text-sm text-gray-500">
                <Link href="/dashboard" className="hover:text-primary">Trang chủ</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-medium">Quản lý hợp đồng</span>
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-medium">Xử lý gia hạn</span>
            </nav>

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-900">Quản lý Gia hạn Hợp đồng</h1>
            </div>

            {/* Control Panel */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Tabs */}
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex" aria-label="Tabs">
                        <button
                            onClick={() => setActiveTab('REQUESTS')}
                            className={`${activeTab === 'REQUESTS'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                } w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm flex items-center justify-center gap-2`}
                        >
                            Yêu cầu gia hạn
                            <span className="bg-red-100 text-red-600 py-0.5 px-2 rounded-full text-xs">3</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('ALL')}
                            className={`${activeTab === 'ALL'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                } w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm`}
                        >
                            Danh sách hợp đồng
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
                            <option>Tất cả Tòa nhà</option>
                            <option>Khu A</option>
                            <option>Khu B</option>
                        </select>
                        <select className="block w-full md:w-auto rounded-md border-gray-300 py-1.5 text-base focus:border-primary focus:outline-none focus:ring-primary sm:text-sm">
                            <option>Tất cả Trạng thái nợ</option>
                            <option>Không nợ</option>
                            <option>Có nợ</option>
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
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phòng</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hạn cũ</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gia hạn đến</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lý do</th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Nợ?</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {extensionRequests.map((req) => (
                                <tr key={req.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4" />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{req.studentId}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{req.studentName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{req.room}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{req.currentExpiry}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-bold text-primary">{req.requestedExpiry}</div>
                                        <div className="text-xs text-gray-500">({req.durationLabel})</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate" title={req.reason}>
                                        {req.reason}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        {req.isDebt ? (
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-red-100 text-red-800">
                                                CÓ NỢ
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-green-100 text-green-800">
                                                KHÔNG
                                            </span>
                                        )}
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
                        <div className="flex gap-2">
                            <button className="text-sm text-gray-600 hover:text-primary font-medium border border-gray-300 rounded px-3 py-1 hover:bg-gray-50">
                                Duyệt các mục đã chọn
                            </button>
                            <button className="text-sm text-gray-600 hover:text-primary font-medium border border-gray-300 rounded px-3 py-1 hover:bg-gray-50">
                                Xuất danh sách Excel
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
                {extensionRequests.map((req) => (
                    <div key={req.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className="font-bold text-gray-900">{req.studentName} <span className="text-gray-500 font-normal">({req.studentId})</span></h3>
                                <p className="text-xs text-gray-500">Phòng: {req.room}</p>
                            </div>
                        </div>

                        <div className="bg-blue-50 rounded p-3 my-3">
                            <div className="flex items-center justify-between text-sm mb-1">
                                <span className="text-gray-500">Gia hạn đến:</span>
                                <span className="font-bold text-primary">{req.requestedExpiry}</span>
                            </div>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                                <span>Thời gian thêm:</span>
                                <span>{req.durationLabel}</span>
                            </div>
                        </div>

                        <div className="space-y-2 text-sm mb-4">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Lý do:</span>
                                <span className="text-gray-900">{req.reason}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500">Tài chính:</span>
                                {req.isDebt ? (
                                    <span className="text-red-600 font-bold flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                        CÒN NỢ PHÍ
                                    </span>
                                ) : (
                                    <span className="text-green-600 font-bold flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Đã đóng đủ
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-2 pt-2 border-t border-gray-100">
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
