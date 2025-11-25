'use client';

import Link from 'next/link';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function RoomMasterPage() {
    // Mock Data
    const rooms = [
        {
            id: 'A.101',
            building: 'Khu A',
            type: '8 Giường',
            price: '600.000',
            gender: 'NAM',
            currentOccupancy: 4,
            maxCapacity: 8,
            status: 'AVAILABLE',
            statusLabel: 'SẴN SÀNG',
            statusColor: 'bg-green-100 text-green-800',
        },
        {
            id: 'A.102',
            building: 'Khu A',
            type: '8 Giường',
            price: '600.000',
            gender: 'NAM',
            currentOccupancy: 8,
            maxCapacity: 8,
            status: 'FULL',
            statusLabel: 'ĐÃ ĐẦY',
            statusColor: 'bg-gray-100 text-gray-800',
        },
        {
            id: 'B.201',
            building: 'Khu B',
            type: '4 Giường (DV)',
            price: '1.200.000',
            gender: 'NỮ',
            currentOccupancy: 2,
            maxCapacity: 4,
            status: 'AVAILABLE',
            statusLabel: 'SẴN SÀNG',
            statusColor: 'bg-green-100 text-green-800',
        },
        {
            id: 'B.205',
            building: 'Khu B',
            type: '4 Giường (DV)',
            price: '1.200.000',
            gender: 'NỮ',
            currentOccupancy: 0,
            maxCapacity: 4,
            status: 'MAINTENANCE',
            statusLabel: 'BẢO TRÌ',
            statusColor: 'bg-orange-100 text-orange-800',
        },
    ];

    const calculatePercentage = (current: number, max: number) => {
        return Math.round((current / max) * 100);
    };

    return (
        <div className="space-y-6">
            <Toaster position="top-right" />
            {/* Breadcrumb */}
            <nav className="flex text-sm text-gray-500">
                <Link href="/dashboard" className="hover:text-primary">Trang chủ</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-medium">Quản lý phòng</span>
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-medium">Danh sách phòng</span>
            </nav>

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-900">Quản lý Danh sách Phòng</h1>
            </div>

            {/* Stats & Alerts */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-xs text-gray-500 uppercase font-bold">Tổng số phòng</p>
                    <p className="text-2xl font-bold text-gray-900">200</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-xs text-gray-500 uppercase font-bold">Tổng sức chứa</p>
                    <p className="text-2xl font-bold text-gray-900">1600</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-xs text-gray-500 uppercase font-bold">Đang ở</p>
                    <div className="flex items-baseline gap-2">
                        <p className="text-2xl font-bold text-blue-600">1200</p>
                        <span className="text-sm text-gray-500">(75%)</span>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-xs text-gray-500 uppercase font-bold">Phòng trống</p>
                    <p className="text-2xl font-bold text-green-600">400</p>
                </div>
            </div>


            {/* Toolbar */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-4 justify-between items-center">
                <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto">
                    <div className="relative w-full md:w-64">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Tìm kiếm Mã phòng..."
                            className="block w-full pl-10 rounded-md border-gray-300 focus:border-primary focus:ring-primary sm:text-sm"
                        />
                    </div>

                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                        <select className="block w-full md:w-auto rounded-md border-gray-300 py-1.5 text-base focus:border-primary focus:outline-none focus:ring-primary sm:text-sm">
                            <option>Tất cả Tòa nhà</option>
                            <option>Khu A</option>
                            <option>Khu B</option>
                        </select>
                        <select className="block w-full md:w-auto rounded-md border-gray-300 py-1.5 text-base focus:border-primary focus:outline-none focus:ring-primary sm:text-sm">
                            <option>Tất cả Loại phòng</option>
                            <option>8 Giường</option>
                            <option>6 Giường</option>
                            <option>4 Giường (DV)</option>
                        </select>
                        <select className="block w-full md:w-auto rounded-md border-gray-300 py-1.5 text-base focus:border-primary focus:outline-none focus:ring-primary sm:text-sm">
                            <option>Tất cả Trạng thái</option>
                            <option>Sẵn sàng</option>
                            <option>Đã đầy</option>
                            <option>Bảo trì</option>
                        </select>
                    </div>
                </div>

                <div className="flex gap-3 w-full lg:w-auto">
                    <Link
                        href="/admin/rooms/add"
                        className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-lg shadow-sm transition-colors text-sm"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        THÊM PHÒNG
                    </Link>
                </div>
            </div>

            {/* Data Grid (Desktop) */}
            <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã Phòng</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tòa</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loại / Giá</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giới tính</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sức chứa</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {rooms.map((room) => (
                                <tr key={room.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{room.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{room.building}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{room.type}</div>
                                        <div className="text-xs text-gray-500">{room.price} đ</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${room.gender === 'NAM' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'}`}>
                                            {room.gender}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap align-middle">
                                        <div className="w-full max-w-[100px]">
                                            <div className="flex justify-between text-xs mb-1">
                                                <span className="font-medium">{room.currentOccupancy}/{room.maxCapacity}</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                <div
                                                    className={`h-2.5 rounded-full ${room.currentOccupancy === room.maxCapacity ? 'bg-red-500' : 'bg-green-500'}`}
                                                    style={{ width: `${calculatePercentage(room.currentOccupancy, room.maxCapacity)}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${room.statusColor}`}>
                                            {room.statusLabel}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end gap-2">
                                            <Link
                                                href={`/admin/rooms/add?id=${room.id}`}
                                                className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded"
                                                title="Sửa"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </Link>
                                            {room.currentOccupancy > 0 ? (
                                                <button className="text-gray-400 cursor-not-allowed p-1" title="Không thể xóa phòng đang có người ở" disabled>
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => {
                                                        toast.success('Đã xóa phòng thành công!', {
                                                            duration: 2000,
                                                            icon: '✅',
                                                        });
                                                    }}
                                                    className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded"
                                                    title="Xóa"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Hiển thị <span className="font-medium">1</span> đến <span className="font-medium">4</span> trong số <span className="font-medium">200</span> kết quả
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-700">Hiển thị:</span>
                            <select className="block w-full rounded-md border-gray-300 py-1 text-base focus:border-primary focus:outline-none focus:ring-primary sm:text-sm">
                                <option>20</option>
                                <option>50</option>
                                <option>100</option>
                            </select>
                            <span className="text-sm text-gray-700">dòng/trang</span>
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
                                <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                                    2
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
                {rooms.map((room) => (
                    <div key={room.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg">{room.id} <span className="text-sm font-normal text-gray-500">({room.gender})</span></h3>
                                <p className="text-sm text-gray-500">{room.type} - {room.price} đ</p>
                            </div>
                            <span className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${room.statusColor}`}>
                                {room.statusLabel}
                            </span>
                        </div>

                        <div className="my-3">
                            <div className="flex justify-between text-xs mb-1">
                                <span className="text-gray-500">Sức chứa:</span>
                                <span className="font-medium">{room.currentOccupancy}/{room.maxCapacity}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                    className={`h-2.5 rounded-full ${room.currentOccupancy === room.maxCapacity ? 'bg-red-500' : 'bg-green-500'}`}
                                    style={{ width: `${calculatePercentage(room.currentOccupancy, room.maxCapacity)}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="flex gap-2 pt-2 border-t border-gray-100">
                            <Link
                                href={`/admin/rooms/add?id=${room.id}`}
                                className="flex-1 bg-gray-50 text-gray-700 hover:bg-gray-100 font-medium py-2 px-4 rounded-lg text-sm transition-colors flex items-center justify-center gap-1"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Sửa
                            </Link>
                            {room.currentOccupancy > 0 ? (
                                <button className="flex-1 bg-gray-100 text-gray-400 cursor-not-allowed font-medium py-2 px-4 rounded-lg text-sm transition-colors flex items-center justify-center gap-1" disabled>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Xóa
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        toast.success('Đã xóa phòng thành công!', {
                                            duration: 2000,
                                            icon: '✅',
                                        });
                                    }}
                                    className="flex-1 bg-red-50 text-red-600 hover:bg-red-100 font-medium py-2 px-4 rounded-lg text-sm transition-colors flex items-center justify-center gap-1"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Xóa
                                </button>
                            )}
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
