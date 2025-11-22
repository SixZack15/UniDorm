'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function RequestsPage() {
    // Mock Data
    const requests = [
        {
            id: 'CP-2025-001',
            type: 'Xin Chuyển Phòng',
            date: '22/11/2025',
            reason: 'Phòng ồn, muốn đổi sang khu yên tĩnh hơn để học tập.',
            status: 'PENDING',
            statusLabel: 'Chờ duyệt',
            statusColor: 'bg-yellow-100 text-yellow-800',
        },
        {
            id: 'TP-2025-002',
            type: 'Xin Trả Phòng',
            date: '10/01/2025',
            reason: 'Kết thúc kỳ thực tập, về quê.',
            status: 'APPROVED',
            statusLabel: 'Đã duyệt',
            statusColor: 'bg-green-100 text-green-800',
        },
        {
            id: 'GH-2024-88',
            type: 'Gia hạn Hợp đồng',
            date: '15/12/2024',
            reason: 'Gia hạn thêm 1 kỳ học.',
            status: 'REJECTED',
            statusLabel: 'Từ chối',
            statusColor: 'bg-red-100 text-red-800',
        },
    ];

    return (
        <div className="space-y-6">
            {/* Breadcrumb */}
            <nav className="flex text-sm text-gray-500">
                <Link href="/dashboard" className="hover:text-primary">Trang chủ</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-medium">Hồ sơ & Thủ tục hành chính</span>
            </nav>

            {/* Header & Actions */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Quản lý Yêu cầu & Hồ sơ</h1>
                    <p className="text-sm text-gray-500 mt-1">Tạo và theo dõi trạng thái các thủ tục hành chính.</p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <Link
                        href="/requests/create?type=move"
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-4 rounded-lg shadow-sm transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        XIN CHUYỂN PHÒNG
                    </Link>
                    <Link
                        href="/requests/create?type=checkout"
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-red-200 text-red-600 hover:bg-red-50 font-bold py-2.5 px-4 rounded-lg shadow-sm transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        XIN TRẢ PHÒNG
                    </Link>
                </div>
            </div>

            {/* Request List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <h2 className="font-bold text-gray-900">LỊCH SỬ HỒ SƠ</h2>
                    <div className="flex gap-2 w-full md:w-auto">
                        <select className="block w-full md:w-auto rounded-md border-gray-300 py-1.5 text-base focus:border-primary focus:outline-none focus:ring-primary sm:text-sm">
                            <option>Tất cả trạng thái</option>
                            <option>Chờ duyệt</option>
                            <option>Đã duyệt</option>
                            <option>Từ chối</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Tìm kiếm hồ sơ..."
                            className="block w-full md:w-64 rounded-md border-gray-300 focus:border-primary focus:ring-primary sm:text-sm"
                        />
                    </div>
                </div>

                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loại hồ sơ</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày gửi</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lý do / Ghi chú</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {requests.map((req) => (
                                <tr key={req.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{req.type}</div>
                                        <div className="text-xs text-gray-500">{req.id}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {req.date}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                                        {req.reason}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${req.statusColor}`}>
                                            {req.statusLabel}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        {req.status === 'PENDING' ? (
                                            <div className="flex justify-end gap-3">
                                                <button className="text-primary hover:text-primary-dark flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                    </svg>
                                                    Sửa
                                                </button>
                                                <button className="text-red-600 hover:text-red-900 flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                    Hủy
                                                </button>
                                            </div>
                                        ) : (
                                            <button className="text-gray-600 hover:text-primary">Xem chi tiết</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden">
                    <ul className="divide-y divide-gray-200">
                        {requests.map((req) => (
                            <li key={req.id} className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-900">{req.type}</h3>
                                        <p className="text-xs text-gray-500">{req.id}</p>
                                    </div>
                                    <span className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${req.statusColor}`}>
                                        {req.statusLabel}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500 mb-1">Ngày gửi: {req.date}</p>
                                <p className="text-sm text-gray-700 mb-3 line-clamp-2">{req.reason}</p>

                                <div className="flex justify-end gap-3 pt-2 border-t border-gray-50">
                                    {req.status === 'PENDING' ? (
                                        <>
                                            <button className="text-sm font-medium text-primary hover:text-primary-dark">Cập nhật</button>
                                            <button className="text-sm font-medium text-red-600 hover:text-red-900">Hủy hồ sơ</button>
                                        </>
                                    ) : (
                                        <button className="text-sm font-medium text-gray-600 hover:text-primary">Xem chi tiết</button>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Pagination */}
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Hiển thị <span className="font-medium">1</span> đến <span className="font-medium">3</span> trong số <span className="font-medium">3</span> kết quả
                            </p>
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

            {/* Important Note */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-yellow-800">Lưu ý quan trọng</h3>
                        <div className="mt-2 text-sm text-yellow-700">
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Bạn chỉ có thể <strong>"Cập nhật"</strong> hoặc <strong>"Hủy"</strong> khi hồ sơ đang ở trạng thái <strong>"Chờ duyệt"</strong>.</li>
                                <li>Hồ sơ <strong>"Đã duyệt"</strong> không thể hoàn tác. Vui lòng liên hệ Ban Quản Lý nếu có sai sót.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
