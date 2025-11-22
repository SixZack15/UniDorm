'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function SystemSettingsPage() {
    const [activeTab, setActiveTab] = useState<'USERS' | 'CONFIG'>('USERS');

    // Mock Data for Users
    const users = [
        {
            id: '01',
            email: 'admin_finance@vlu.edu.vn',
            name: 'Lê Thị Tài Chính',
            role: 'FINANCE_MANAGER',
            status: 'ACTIVE',
        },
        {
            id: '02',
            email: 'sv_21748020@vlu.edu.vn',
            name: 'Nguyễn Văn A',
            role: 'STUDENT',
            status: 'LOCKED',
        },
        {
            id: '03',
            email: 'manager_room@vlu.edu.vn',
            name: 'Phạm Quản Lý',
            role: 'ROOM_MANAGER',
            status: 'ACTIVE',
        },
    ];

    // Mock Data for Audit Logs
    const auditLogs = [
        {
            id: 1,
            time: '22/11 10:30 AM',
            user: 'SuAdmin',
            action: 'Update Giá Điện',
            detail: '2.000 -> 2.500',
        },
        {
            id: 2,
            time: '21/11 09:00 AM',
            user: 'Admin_Room',
            action: 'Khóa TK sv_227...',
            detail: 'Vi phạm nội quy',
        },
        {
            id: 3,
            time: '20/11 14:00 PM',
            user: 'Admin_Fin',
            action: 'Tạo User mới',
            detail: 'manager_room',
        },
    ];

    return (
        <div className="space-y-6">
            {/* Breadcrumb */}
            <nav className="flex text-sm text-gray-500">
                <Link href="/dashboard" className="hover:text-primary">Trang chủ</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-medium">Quản trị hệ thống</span>
            </nav>

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-900">Quản trị Hệ thống</h1>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    <button
                        onClick={() => setActiveTab('USERS')}
                        className={`${activeTab === 'USERS'
                                ? 'border-primary text-primary'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                        QUẢN LÝ TÀI KHOẢN & PHÂN QUYỀN
                    </button>
                    <button
                        onClick={() => setActiveTab('CONFIG')}
                        className={`${activeTab === 'CONFIG'
                                ? 'border-primary text-primary'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                        CẤU HÌNH HỆ THỐNG & LOGS
                    </button>
                </nav>
            </div>

            {/* Content */}
            {activeTab === 'USERS' ? (
                <div className="space-y-4">
                    {/* Toolbar */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <div className="relative w-full md:w-96">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Tìm kiếm email, tên..."
                                className="block w-full pl-10 rounded-md border-gray-300 focus:border-primary focus:ring-primary sm:text-sm"
                            />
                        </div>
                        <button className="w-full md:w-auto bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            THÊM TÀI KHOẢN
                        </button>
                    </div>

                    {/* User Table */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email / Username</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Họ tên</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vai trò</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {users.map((user) => (
                                        <tr key={user.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <select
                                                    defaultValue={user.role}
                                                    className="block w-full rounded-md border-gray-300 py-1 text-sm focus:border-primary focus:outline-none focus:ring-primary"
                                                >
                                                    <option value="STUDENT">Sinh viên</option>
                                                    <option value="ROOM_MANAGER">Quản lý Phòng</option>
                                                    <option value="FINANCE_MANAGER">Quản lý TC</option>
                                                    <option value="ADMIN">Admin</option>
                                                </select>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {user.status === 'ACTIVE' ? (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                                        Hoạt động
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                                        Đã khóa
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end gap-2">
                                                    {user.status === 'ACTIVE' ? (
                                                        <button className="text-yellow-600 hover:text-yellow-900 p-1 hover:bg-yellow-50 rounded" title="Khóa">
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                            </svg>
                                                        </button>
                                                    ) : (
                                                        <button className="text-green-600 hover:text-green-900 p-1 hover:bg-green-50 rounded" title="Mở Khóa">
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                                                            </svg>
                                                        </button>
                                                    )}
                                                    <button className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded" title="Xóa">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* System Config */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Cấu hình Chi phí & Thời gian</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Giá Điện (VND/kWh)</label>
                                <div className="flex gap-2">
                                    <input type="text" defaultValue="2.500" className="block w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary sm:text-sm" />
                                    <button className="text-primary hover:text-primary-dark font-medium text-sm">Sửa</button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Giá Nước (VND/m3)</label>
                                <div className="flex gap-2">
                                    <input type="text" defaultValue="15.000" className="block w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary sm:text-sm" />
                                    <button className="text-primary hover:text-primary-dark font-medium text-sm">Sửa</button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Giá Phòng Cơ bản (VND/tháng)</label>
                                <div className="flex gap-2">
                                    <input type="text" defaultValue="500.000" className="block w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary sm:text-sm" />
                                    <button className="text-primary hover:text-primary-dark font-medium text-sm">Sửa</button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Ngày chốt số liệu (Hàng tháng)</label>
                                <div className="flex gap-2">
                                    <input type="number" defaultValue="15" className="block w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary sm:text-sm" />
                                    <button className="text-primary hover:text-primary-dark font-medium text-sm">Sửa</button>
                                </div>
                            </div>

                            <div className="pt-4 mt-4 border-t border-gray-100">
                                <button className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-lg shadow-sm transition-colors">
                                    LƯU THAY ĐỔI
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Audit Log */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Nhật ký Hoạt động (Audit Log)</h2>
                        <div className="overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thời gian</th>
                                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Người dùng</th>
                                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {auditLogs.map((log) => (
                                        <tr key={log.id}>
                                            <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-500">{log.time}</td>
                                            <td className="px-4 py-3 whitespace-nowrap text-xs font-medium text-gray-900">{log.user}</td>
                                            <td className="px-4 py-3 text-xs text-gray-700">
                                                <div className="font-medium">{log.action}</div>
                                                <div className="text-gray-500">{log.detail}</div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
