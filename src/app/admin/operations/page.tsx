'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function OperationsPage() {
    const [activeTab, setActiveTab] = useState<'OPERATIONS' | 'HISTORY'>('OPERATIONS');
    const [mobileTab, setMobileTab] = useState<'CHECKIN' | 'CHECKOUT'>('CHECKIN');

    // Mock Data for Check-in (Arrivals)
    const checkInList = [
        {
            id: 'CI-01',
            mssv: '21748020',
            name: 'Nguyễn Văn A',
            room: 'A.304',
            bed: '01',
            contractStatus: 'APPROVED',
        },
        {
            id: 'CI-02',
            mssv: '22711005',
            name: 'Trần Thị B',
            room: 'B.102',
            bed: '04',
            contractStatus: 'APPROVED',
        },
        {
            id: 'CI-03',
            mssv: '23700123',
            name: 'Lê Văn F',
            room: 'A.105',
            bed: '02',
            contractStatus: 'APPROVED',
        },
    ];

    // Mock Data for Check-out (Departures)
    const checkOutList = [
        {
            id: 'CO-01',
            mssv: '20799123',
            name: 'Lê Văn C',
            room: 'A.205',
            feesPaid: true,
            assetsChecked: true,
        },
        {
            id: 'CO-02',
            mssv: '20712345',
            name: 'Phạm Văn D',
            room: 'B.301',
            feesPaid: false,
            assetsChecked: true,
        },
    ];

    // Mock Data for History
    const historyList = [
        { time: '10:30 AM', type: 'CHECK-IN', student: 'Lê Văn D', room: 'A.101', staff: 'Admin1' },
        { time: '09:15 AM', type: 'CHECK-OUT', student: 'Phạm Văn E', room: 'B.202', staff: 'Admin1' },
        { time: '08:45 AM', type: 'CHECK-IN', student: 'Nguyễn Thị G', room: 'C.303', staff: 'Admin2' },
    ];

    return (
        <div className="space-y-6">
            {/* Breadcrumb */}
            <nav className="flex text-sm text-gray-500">
                <Link href="/admin/dashboard" className="hover:text-primary">Trang chủ</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-medium">Tác nghiệp Ra/Vào</span>
            </nav>

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-900">Quản lý Ra / Vào (Check-in/Out)</h1>
            </div>

            {/* Main Tabs (Desktop) */}
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    <button
                        onClick={() => setActiveTab('OPERATIONS')}
                        className={`${activeTab === 'OPERATIONS'
                                ? 'border-primary text-primary'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                        TÁC NGHIỆP HIỆN TẠI
                    </button>
                    <button
                        onClick={() => setActiveTab('HISTORY')}
                        className={`${activeTab === 'HISTORY'
                                ? 'border-primary text-primary'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                        LỊCH SỬ RA/VÀO
                    </button>
                </nav>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-lg">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <input
                    type="text"
                    placeholder="Tìm kiếm MSSV / Họ tên nhanh..."
                    className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2"
                />
            </div>

            {activeTab === 'OPERATIONS' ? (
                <>
                    {/* Mobile Tabs for Operations */}
                    <div className="md:hidden flex rounded-lg bg-gray-100 p-1 mb-4">
                        <button
                            onClick={() => setMobileTab('CHECKIN')}
                            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${mobileTab === 'CHECKIN' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-900'
                                }`}
                        >
                            CHỜ CHECK-IN
                        </button>
                        <button
                            onClick={() => setMobileTab('CHECKOUT')}
                            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${mobileTab === 'CHECKOUT' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-900'
                                }`}
                        >
                            CHỜ CHECK-OUT
                        </button>
                    </div>

                    {/* Split View */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Panel: Arrivals (Check-in) */}
                        <div className={`space-y-4 ${mobileTab === 'CHECKOUT' ? 'hidden md:block' : ''}`}>
                            <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg border border-blue-100">
                                <h2 className="font-bold text-blue-900 flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                    </svg>
                                    DANH SÁCH CHỜ CHECK-IN (Đến)
                                </h2>
                                <span className="bg-blue-200 text-blue-800 text-xs font-bold px-2 py-1 rounded-full">{checkInList.length}</span>
                            </div>

                            {checkInList.map((item) => (
                                <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-lg">{item.name}</h3>
                                            <p className="text-sm text-gray-500">MSSV: <span className="font-mono font-medium text-gray-700">{item.mssv}</span></p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-primary">{item.room}</div>
                                            <div className="text-xs text-gray-500">Giường {item.bed}</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 mb-4 text-sm text-green-600 bg-green-50 px-2 py-1 rounded w-fit">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Hợp đồng: Đã duyệt
                                    </div>

                                    <button className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                        </svg>
                                        XÁC NHẬN CHECK-IN
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Right Panel: Departures (Check-out) */}
                        <div className={`space-y-4 ${mobileTab === 'CHECKIN' ? 'hidden md:block' : ''}`}>
                            <div className="flex items-center justify-between bg-orange-50 p-3 rounded-lg border border-orange-100">
                                <h2 className="font-bold text-orange-900 flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    DANH SÁCH CHỜ CHECK-OUT (Đi)
                                </h2>
                                <span className="bg-orange-200 text-orange-800 text-xs font-bold px-2 py-1 rounded-full">{checkOutList.length}</span>
                            </div>

                            {checkOutList.map((item) => (
                                <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-lg">{item.name}</h3>
                                            <p className="text-sm text-gray-500">MSSV: <span className="font-mono font-medium text-gray-700">{item.mssv}</span></p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-gray-900">{item.room}</div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 mb-4">
                                        <div className={`flex items-center gap-2 text-sm px-2 py-1 rounded ${item.feesPaid ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                            {item.feesPaid ? (
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            ) : (
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            )}
                                            {item.feesPaid ? 'Công nợ: OK' : 'NỢ PHÍ'}
                                        </div>
                                        <div className={`flex items-center gap-2 text-sm px-2 py-1 rounded ${item.assetsChecked ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
                                            {item.assetsChecked ? (
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            ) : (
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            )}
                                            {item.assetsChecked ? 'Tài sản: OK' : 'Chưa kiểm tra'}
                                        </div>
                                    </div>

                                    <button
                                        disabled={!item.feesPaid}
                                        className={`w-full font-bold py-2 px-4 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 ${item.feesPaid
                                                ? 'bg-orange-600 hover:bg-orange-700 text-white'
                                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            }`}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        {item.feesPaid ? 'XÁC NHẬN CHECK-OUT' : 'VUI LÒNG THANH TOÁN'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                /* History Tab */
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-4 border-b border-gray-200">
                        <h3 className="text-lg font-bold text-gray-900">Lịch sử Gần đây</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thời gian</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loại</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sinh viên</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phòng</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Người thực hiện</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {historyList.map((log, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.time}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${log.type === 'CHECK-IN' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'
                                                }`}>
                                                {log.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{log.student}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.room}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.staff}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
