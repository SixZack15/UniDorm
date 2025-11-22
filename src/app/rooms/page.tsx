'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RoomsPage() {
    const [activeTab, setActiveTab] = useState<'list' | 'records'>('list');

    // Mock Data for Rooms
    const rooms = [
        {
            id: 1,
            name: 'Phòng Dịch Vụ (4 Giường)',
            price: 1200000,
            capacity: 4,
            available: 15,
            amenities: ['Máy lạnh', 'Tủ lạnh', 'WC Riêng'],
            imageColor: 'bg-blue-100',
        },
        {
            id: 2,
            name: 'Phòng Tiêu Chuẩn (6 Giường)',
            price: 800000,
            capacity: 6,
            available: 50,
            amenities: ['Quạt trần', 'Tủ cá nhân', 'WC Chung tầng'],
            imageColor: 'bg-green-100',
        },
        {
            id: 3,
            name: 'Phòng Cơ Bản (8 Giường)',
            price: 500000,
            capacity: 8,
            available: 120,
            amenities: ['Quạt trần', 'WC Chung tầng'],
            imageColor: 'bg-yellow-100',
        },
        {
            id: 4,
            name: 'Phòng Cơ Bản (10 Giường)',
            price: 450000,
            capacity: 10,
            available: 5,
            amenities: ['Quạt trần', 'WC Chung tầng'],
            imageColor: 'bg-orange-100',
            isLowStock: true,
        },
    ];

    // Mock Data for Applications
    const applications = [
        {
            id: 'REG-2024-001',
            date: '20/11/2025',
            roomType: 'Phòng Tiêu Chuẩn (6 Giường)',
            status: 'PENDING',
            statusLabel: 'Chờ duyệt',
            statusColor: 'bg-yellow-100 text-yellow-800',
        },
        {
            id: 'REG-2023-099',
            date: '15/08/2024',
            roomType: 'Phòng Cơ Bản (8 Giường)',
            status: 'APPROVED',
            statusLabel: 'Đã duyệt',
            statusColor: 'bg-green-100 text-green-800',
        },
    ];

    return (
        <div className="space-y-6">
            {/* Breadcrumb */}
            <nav className="flex text-sm text-gray-500">
                <Link href="/dashboard" className="hover:text-primary">Trang chủ</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-medium">Đăng ký lưu trú</span>
            </nav>

            {/* Context Banner */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-md flex items-start">
                <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className="ml-3">
                    <p className="text-sm text-blue-700">
                        Chào <span className="font-bold">Nguyễn Văn A</span>! Hệ thống tự động hiển thị danh sách phòng dành cho <span className="font-bold">NAM (Khu A)</span>.
                    </p>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    <button
                        onClick={() => setActiveTab('list')}
                        className={`${activeTab === 'list'
                                ? 'border-primary text-primary'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        DANH SÁCH PHÒNG TRỐNG
                    </button>
                    <button
                        onClick={() => setActiveTab('records')}
                        className={`${activeTab === 'records'
                                ? 'border-primary text-primary'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        THEO DÕI HỒ SƠ
                        <span className="bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">1</span>
                    </button>
                </nav>
            </div>

            {/* Content */}
            {activeTab === 'list' ? (
                <div className="space-y-6">
                    {/* Filters */}
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                            <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                </svg>
                                Lọc theo:
                            </div>
                            <select className="block w-full md:w-auto rounded-md border-gray-300 py-1.5 text-base focus:border-primary focus:outline-none focus:ring-primary sm:text-sm">
                                <option>Tất cả số giường</option>
                                <option>4 Giường</option>
                                <option>6 Giường</option>
                                <option>8 Giường</option>
                            </select>
                            <select className="block w-full md:w-auto rounded-md border-gray-300 py-1.5 text-base focus:border-primary focus:outline-none focus:ring-primary sm:text-sm">
                                <option>Mức giá</option>
                                <option>Dưới 500k</option>
                                <option>500k - 1tr</option>
                                <option>Trên 1tr</option>
                            </select>
                            <select className="block w-full md:w-auto rounded-md border-gray-300 py-1.5 text-base focus:border-primary focus:outline-none focus:ring-primary sm:text-sm">
                                <option>Tiện nghi</option>
                                <option>Máy lạnh</option>
                                <option>Quạt trần</option>
                            </select>
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Tìm kiếm..."
                                className="block w-full rounded-md border-gray-300 pr-10 focus:border-primary focus:ring-primary sm:text-sm"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Room Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {rooms.map((room) => (
                            <div key={room.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                                {/* Image Placeholder */}
                                <div className={`h-48 w-full ${room.imageColor} flex items-center justify-center relative`}>
                                    <span className="text-gray-400 font-medium">[ IMAGE PLACEHOLDER ]</span>
                                    {room.isLowStock && (
                                        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                                            Sắp hết
                                        </span>
                                    )}
                                </div>

                                <div className="p-5 flex-grow flex flex-col">
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">{room.name}</h3>
                                    <p className="text-primary font-bold text-xl mb-4">
                                        {room.price.toLocaleString('vi-VN')} <span className="text-sm font-normal text-gray-500">VND/tháng</span>
                                    </p>

                                    <div className="space-y-2 mb-6 flex-grow">
                                        <div className="flex flex-wrap gap-2">
                                            {room.amenities.map((item, idx) => (
                                                <span key={idx} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                        <p className="text-sm text-gray-600 mt-2">
                                            Trạng thái: <span className="font-medium text-gray-900">Còn {room.available} chỗ</span>
                                        </p>
                                    </div>

                                    <button className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors">
                                        ĐĂNG KÝ NGAY
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center mt-8">
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
                            <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                                2
                            </a>
                            <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                                3
                            </a>
                            <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                <span className="sr-only">Next</span>
                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </nav>
                    </div>

                    {/* Quick Guide */}
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Hướng dẫn đăng ký nhanh</h3>
                        <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
                            <li>Chọn loại phòng phù hợp với nhu cầu và tài chính.</li>
                            <li>Nhấn nút <strong>Đăng ký ngay</strong> và kiểm tra lại thông tin cá nhân.</li>
                            <li>Theo dõi kết quả xét duyệt tại Tab <strong>"Theo dõi hồ sơ"</strong>.</li>
                        </ol>
                    </div>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Application Records */}
                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                        <ul className="divide-y divide-gray-200">
                            {applications.map((app) => (
                                <li key={app.id}>
                                    <div className="px-4 py-4 sm:px-6">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-medium text-primary truncate">
                                                Mã hồ sơ: {app.id}
                                            </p>
                                            <div className="ml-2 flex-shrink-0 flex">
                                                <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${app.statusColor}`}>
                                                    {app.statusLabel}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-2 sm:flex sm:justify-between">
                                            <div className="sm:flex">
                                                <p className="flex items-center text-sm text-gray-500">
                                                    <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                    </svg>
                                                    {app.roomType}
                                                </p>
                                            </div>
                                            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                                <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <p>
                                                    Ngày đăng ký: <time dateTime={app.date}>{app.date}</time>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
