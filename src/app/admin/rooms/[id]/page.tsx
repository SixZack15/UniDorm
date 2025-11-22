'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function RoomDetailPage({ params }: { params: { id: string } }) {
    // Mock Data for Room
    const room = {
        id: decodeURIComponent(params.id), // Handle potential encoding
        building: 'Khu A (Nam)',
        floor: 'Tầng 1',
        type: '8 Giường (Tiêu chuẩn)',
        price: '600.000',
        facilities: ['Quạt trần', 'Tủ cá nhân', 'WC Chung tầng'],
        currentOccupancy: 4,
        maxCapacity: 8,
        status: 'AVAILABLE',
        statusLabel: 'SẴN SÀNG',
        statusColor: 'bg-green-100 text-green-800',
    };

    // Mock Data for Residents
    const residents = [
        { bed: '01', mssv: '21748020', name: 'Nguyễn Văn A', checkIn: '15/08/2024', phone: '0901234567', status: 'ĐANG Ở', statusColor: 'bg-green-100 text-green-800' },
        { bed: '02', mssv: '22711005', name: 'Trần Văn B', checkIn: '15/08/2024', phone: '0912345678', status: 'ĐANG Ở', statusColor: 'bg-green-100 text-green-800' },
        { bed: '03', mssv: '21799123', name: 'Lê Văn C', checkIn: '20/08/2024', phone: '0988777666', status: 'ĐANG Ở', statusColor: 'bg-green-100 text-green-800' },
        { bed: '04', mssv: '20712345', name: 'Phạm Văn D', checkIn: '01/09/2024', phone: '0999888777', status: 'TẠM VẮNG', statusColor: 'bg-yellow-100 text-yellow-800' },
        { bed: '05', mssv: null, name: '-- TRỐNG --', checkIn: '--', phone: '--', status: 'TRỐNG', statusColor: 'bg-gray-100 text-gray-500' },
        { bed: '06', mssv: null, name: '-- TRỐNG --', checkIn: '--', phone: '--', status: 'TRỐNG', statusColor: 'bg-gray-100 text-gray-500' },
        { bed: '07', mssv: null, name: '-- TRỐNG --', checkIn: '--', phone: '--', status: 'TRỐNG', statusColor: 'bg-gray-100 text-gray-500' },
        { bed: '08', mssv: null, name: '-- TRỐNG --', checkIn: '--', phone: '--', status: 'TRỐNG', statusColor: 'bg-gray-100 text-gray-500' },
    ];

    const calculatePercentage = (current: number, max: number) => {
        return Math.round((current / max) * 100);
    };

    return (
        <div className="space-y-6">
            {/* Breadcrumb */}
            <nav className="flex text-sm text-gray-500">
                <Link href="/admin/dashboard" className="hover:text-primary">Trang chủ</Link>
                <span className="mx-2">/</span>
                <Link href="/admin/rooms" className="hover:text-primary">Quản lý phòng</Link>
                <span className="mx-2">/</span>
                <Link href="/admin/rooms" className="hover:text-primary">Danh sách phòng</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-medium">Chi tiết {room.id}</span>
            </nav>

            {/* Header with Back Button */}
            <div className="flex items-center gap-4">
                <Link href="/admin/rooms" className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Chi tiết Phòng</h1>
            </div>

            {/* Room Metadata Card (FR-48) */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <div className="flex items-center gap-3">
                        <h2 className="text-3xl font-bold text-gray-900">PHÒNG {room.id}</h2>
                        <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${room.statusColor}`}>
                            {room.statusLabel}
                        </span>
                    </div>
                    <button className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-lg shadow-sm transition-colors flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        CẬP NHẬT
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-3">
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-500">Khu vực:</span>
                            <span className="font-medium text-gray-900">{room.building} - {room.floor}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-500">Loại phòng:</span>
                            <span className="font-medium text-gray-900">{room.type}</span>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-500">Giá niêm yết:</span>
                            <span className="font-bold text-primary">{room.price} VND/tháng</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-500">Tiện ích:</span>
                            <span className="font-medium text-gray-900">{room.facilities.join(', ')}</span>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="flex justify-between items-end mb-2">
                        <span className="text-sm font-medium text-gray-700">Tình trạng sức chứa</span>
                        <span className="text-sm font-bold text-gray-900">{room.currentOccupancy} / {room.maxCapacity} Giường</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                        <div
                            className={`h-4 rounded-full transition-all duration-500 ${room.currentOccupancy === room.maxCapacity ? 'bg-red-500' : 'bg-green-500'}`}
                            style={{ width: `${calculatePercentage(room.currentOccupancy, room.maxCapacity)}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* Residents List Section (FR-49) */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
                    <h3 className="text-lg font-bold text-gray-900">DANH SÁCH SINH VIÊN LƯU TRÚ</h3>
                    <div className="relative w-full md:w-72">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Tìm SV trong phòng..."
                            className="block w-full pl-10 rounded-md border-gray-300 focus:border-primary focus:ring-primary sm:text-sm"
                        />
                    </div>
                </div>

                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giường</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MSSV</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Họ tên</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày vào</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SĐT</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {residents.map((resident) => (
                                <tr key={resident.bed} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{resident.bed}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{resident.mssv || '--'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{resident.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{resident.checkIn}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{resident.phone}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${resident.statusColor}`}>
                                            {resident.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        {resident.mssv ? (
                                            <div className="flex justify-end gap-2">
                                                <button className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded" title="Sửa thông tin">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </button>
                                                <button className="text-orange-600 hover:text-orange-900 p-1 hover:bg-orange-50 rounded" title="Ghi nhận vi phạm">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        ) : (
                                            <button className="text-green-600 hover:text-green-900 font-bold text-xs border border-dashed border-green-300 px-2 py-1 rounded hover:bg-green-50">
                                                + Thêm
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Card List */}
                <div className="md:hidden">
                    {residents.map((resident) => (
                        <div key={resident.bed} className="border-b border-gray-100 p-4 last:border-b-0">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <span className="text-xs font-bold text-gray-500 uppercase block">Giường {resident.bed}</span>
                                    <h4 className={`font-bold ${resident.mssv ? 'text-gray-900' : 'text-gray-400'}`}>{resident.name}</h4>
                                </div>
                                <span className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${resident.statusColor}`}>
                                    {resident.status}
                                </span>
                            </div>

                            {resident.mssv && (
                                <div className="text-sm text-gray-600 space-y-1 mb-3">
                                    <div className="flex justify-between">
                                        <span>MSSV:</span>
                                        <span className="font-medium">{resident.mssv}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Hợp đồng:</span>
                                        <span>{resident.checkIn} - ...</span>
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-2">
                                {resident.mssv ? (
                                    <>
                                        <button className="flex-1 bg-gray-50 text-gray-700 hover:bg-gray-100 font-medium py-1.5 px-3 rounded text-sm transition-colors flex items-center justify-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            Sửa
                                        </button>
                                        <button className="flex-1 bg-orange-50 text-orange-700 hover:bg-orange-100 font-medium py-1.5 px-3 rounded text-sm transition-colors flex items-center justify-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                            </svg>
                                            Báo vi phạm
                                        </button>
                                    </>
                                ) : (
                                    <button className="w-full border border-dashed border-green-300 text-green-600 hover:bg-green-50 font-medium py-2 rounded text-sm transition-colors">
                                        + Xếp sinh viên vào
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
