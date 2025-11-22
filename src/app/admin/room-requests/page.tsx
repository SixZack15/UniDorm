'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function RoomRequestsPage() {
    const [activeTab, setActiveTab] = useState<'MOVE' | 'EXIT'>('MOVE');

    // Mock Data for Move Requests
    const moveRequests = [
        {
            id: 'REQ-M01',
            studentId: '21748020',
            studentName: 'Nguyễn Văn A',
            currentRoom: 'A.304',
            desiredRoom: 'Khu B (4 Giường)',
            reason: 'Gần bạn cùng lớp',
            status: 'PENDING',
            date: '22/11/2025',
        },
        {
            id: 'REQ-M02',
            studentId: '22711005',
            studentName: 'Trần Văn B',
            currentRoom: 'A.101',
            desiredRoom: 'A.102 (Cụ thể)',
            reason: 'Phòng hiện tại ồn ào',
            status: 'PENDING',
            date: '21/11/2025',
        },
        {
            id: 'REQ-M03',
            studentId: '20799123',
            studentName: 'Phạm Văn D',
            currentRoom: 'B.201',
            desiredRoom: 'Bất kỳ (Giá rẻ hơn)',
            reason: 'Tài chính yếu',
            status: 'PENDING',
            date: '20/11/2025',
        },
    ];

    // Mock Data for Exit Requests
    const exitRequests = [
        {
            id: 'REQ-E01',
            studentId: '21700001',
            studentName: 'Lê Văn C',
            room: 'B.205',
            exitDate: '25/11/2025',
            reason: 'Tốt nghiệp',
            status: 'PENDING',
        },
        {
            id: 'REQ-E02',
            studentId: '22700002',
            studentName: 'Hoàng Thị E',
            room: 'A.305',
            exitDate: '30/11/2025',
            reason: 'Về quê thực tập',
            status: 'PENDING',
        },
    ];

    return (
        <div className="space-y-6">
            {/* Breadcrumb */}
            <nav className="flex text-sm text-gray-500">
                <Link href="/admin/dashboard" className="hover:text-primary">Trang chủ</Link>
                <span className="mx-2">/</span>
                <Link href="/admin/rooms" className="hover:text-primary">Quản lý phòng</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-medium">Xử lý yêu cầu</span>
            </nav>

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-900">Xử lý Yêu cầu Lưu trú</h1>
            </div>

            {/* Control Panel */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Tabs */}
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex" aria-label="Tabs">
                        <button
                            onClick={() => setActiveTab('MOVE')}
                            className={`${activeTab === 'MOVE'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                } w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm flex items-center justify-center gap-2`}
                        >
                            Yêu cầu Chuyển Phòng
                            <span className="bg-blue-100 text-blue-600 py-0.5 px-2 rounded-full text-xs">{moveRequests.length}</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('EXIT')}
                            className={`${activeTab === 'EXIT'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                } w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm flex items-center justify-center gap-2`}
                        >
                            Yêu cầu Trả Phòng
                            <span className="bg-orange-100 text-orange-600 py-0.5 px-2 rounded-full text-xs">{exitRequests.length}</span>
                        </button>
                    </nav>
                </div>

                {/* Toolbar */}
                <div className="p-4 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50">
                    <div className="relative w-full md:w-96">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Tìm kiếm MSSV..."
                            className="block w-full pl-10 rounded-md border-gray-300 focus:border-primary focus:ring-primary sm:text-sm"
                        />
                    </div>

                    <div className="flex gap-3 w-full md:w-auto">
                        <select className="block w-full md:w-auto rounded-md border-gray-300 py-1.5 text-base focus:border-primary focus:outline-none focus:ring-primary sm:text-sm">
                            <option>Trạng thái: Chờ xử lý</option>
                            <option>Trạng thái: Đã duyệt</option>
                            <option>Trạng thái: Từ chối</option>
                        </select>

                        {activeTab === 'EXIT' && (
                            <button className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg shadow-sm transition-colors text-sm whitespace-nowrap">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                TẠO TRẢ PHÒNG
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Content */}
            {activeTab === 'MOVE' ? (
                /* Move Requests Grid */
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4" />
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MSSV</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Họ tên</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Từ phòng</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sang phòng (Mong muốn)</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lý do</th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {moveRequests.map((req) => (
                                    <tr key={req.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4" />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{req.studentId}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{req.studentName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{req.currentRoom}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">{req.desiredRoom}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate" title={req.reason}>{req.reason}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end gap-2">
                                                <button className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded" title="Yêu cầu bổ sung">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </button>
                                                <button className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded" title="Từ chối">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                                <button className="text-green-600 hover:text-green-900 p-1 hover:bg-green-50 rounded" title="Duyệt & Xếp phòng">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card List (Move) */}
                    <div className="md:hidden p-4 space-y-4">
                        {moveRequests.map((req) => (
                            <div key={req.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-bold text-gray-900">{req.studentName} <span className="text-gray-500 font-normal">({req.studentId})</span></h3>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded p-3 my-3 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Từ phòng:</span>
                                        <span className="font-medium">{req.currentRoom}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Sang phòng:</span>
                                        <span className="font-bold text-primary">{req.desiredRoom}</span>
                                    </div>
                                    <div className="text-sm">
                                        <span className="text-gray-500 block mb-1">Lý do:</span>
                                        <p className="text-gray-900 italic">"{req.reason}"</p>
                                    </div>
                                </div>

                                <div className="flex gap-2 pt-2">
                                    <button className="bg-gray-100 text-gray-600 hover:bg-gray-200 p-2 rounded-lg">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </button>
                                    <button className="flex-1 bg-red-50 text-red-600 hover:bg-red-100 font-bold py-2 px-4 rounded-lg text-sm transition-colors">
                                        TỪ CHỐI
                                    </button>
                                    <button className="flex-1 bg-green-50 text-green-700 hover:bg-green-100 font-bold py-2 px-4 rounded-lg text-sm transition-colors">
                                        DUYỆT
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                /* Exit Requests Grid */
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
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
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày rời (Dự kiến)</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lý do</th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {exitRequests.map((req) => (
                                    <tr key={req.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4" />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{req.studentId}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{req.studentName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{req.room}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-orange-600">{req.exitDate}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{req.reason}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button className="text-green-600 hover:text-green-900 font-bold flex items-center justify-end gap-1 ml-auto">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                Xác nhận Trả phòng
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card List (Exit) */}
                    <div className="md:hidden p-4 space-y-4">
                        {exitRequests.map((req) => (
                            <div key={req.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-bold text-gray-900">{req.studentName} <span className="text-gray-500 font-normal">({req.studentId})</span></h3>
                                        <p className="text-sm text-gray-500">Phòng: {req.room}</p>
                                    </div>
                                </div>

                                <div className="bg-orange-50 rounded p-3 my-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Ngày rời:</span>
                                        <span className="font-bold text-orange-700">{req.exitDate}</span>
                                    </div>
                                    <div className="text-sm mt-1">
                                        <span className="text-gray-500">Lý do:</span>
                                        <span className="ml-2 text-gray-900">{req.reason}</span>
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <button className="w-full bg-green-50 text-green-700 hover:bg-green-100 font-bold py-2 px-4 rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        XÁC NHẬN TRẢ PHÒNG
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
