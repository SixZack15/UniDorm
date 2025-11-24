'use client';

import Link from 'next/link';

export default function ManagementDashboardPage() {
    // Mock data for room transfer requests
    const transferRequests = [
        {
            id: 'TR-001',
            studentName: 'Nguyễn Văn A',
            mssv: '21748020',
            currentRoom: 'A.304',
            desiredRoom: 'B.201',
            reason: 'Muốn chuyển sang phòng có điều hòa',
            daySent: '10/11/2024',
            status: 'Đang duyệt',
        },
        {
            id: 'TR-002',
            studentName: 'Trần Thị B',
            mssv: '22711005',
            currentRoom: 'A.205',
            desiredRoom: 'A.304',
            reason: 'Xung đột với bạn cùng phòng',
            daySent: '08/11/2024',
            status: 'Đang duyệt',
        },
    ];

    // Mock data for leave requests
    const leaveRequests = [
        {
            id: 'LR-001',
            studentName: 'Lê Văn C',
            mssv: '20799123',
            room: 'B.102',
            leaveDate: '15/12/2024',
            reason: 'Tốt nghiệp sớm, cần trả phòng',
            daySent: '12/11/2024',
            status: 'Đang duyệt',
        },
        {
            id: 'LR-002',
            studentName: 'Phạm Văn D',
            mssv: '21700001',
            room: 'A.205',
            leaveDate: '20/12/2024',
            reason: 'Chuyển trường',
            daySent: '11/11/2024',
            status: 'Đã duyệt',
        },
    ];

    return (
        <div className="space-y-6">
            {/* Breadcrumb */}
            <nav className="flex text-sm text-gray-500">
                <span className="text-gray-900 font-medium">Dashboard</span>
            </nav>

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Tổng quan Quản lý Phòng</h1>
                    <p className="text-gray-500 mt-1">Chào mừng trở lại, Ban Quản lý phòng!</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-xs text-gray-500 uppercase font-bold mb-2">Yêu cầu chuyển phòng</p>
                    <p className="text-3xl font-bold text-blue-600">{transferRequests.length}</p>
                    <p className="text-sm text-gray-500 mt-1">Đang chờ xử lý</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-xs text-gray-500 uppercase font-bold mb-2">Yêu cầu trả phòng</p>
                    <p className="text-3xl font-bold text-orange-600">{leaveRequests.length}</p>
                    <p className="text-sm text-gray-500 mt-1">Đang chờ xử lý</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-xs text-gray-500 uppercase font-bold mb-2">Tổng số phòng</p>
                    <p className="text-3xl font-bold text-gray-900">200</p>
                    <p className="text-sm text-gray-500 mt-1">Phòng đang hoạt động</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-xs text-gray-500 uppercase font-bold mb-2">Tỷ lệ lấp đầy</p>
                    <p className="text-3xl font-bold text-green-600">75%</p>
                    <p className="text-sm text-gray-500 mt-1">1200/1600 giường</p>
                </div>
            </div>

            {/* Room Transfer Requests */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                    <h2 className="font-bold text-gray-900">Yêu cầu Chuyển phòng</h2>
                    <Link href="/management/requests" className="text-sm text-primary hover:underline">
                        Xem tất cả
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sinh viên</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phòng hiện tại</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phòng mong muốn</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ngày gửi</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {transferRequests.map((request) => (
                                <tr key={request.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{request.studentName}</p>
                                            <p className="text-xs text-gray-500">{request.mssv}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.currentRoom}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{request.desiredRoom}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.daySent}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                            {request.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Leave Requests */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                    <h2 className="font-bold text-gray-900">Yêu cầu Trả phòng</h2>
                    <Link href="/management/requests" className="text-sm text-primary hover:underline">
                        Xem tất cả
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sinh viên</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phòng</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ngày trả</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ngày gửi</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {leaveRequests.map((request) => (
                                <tr key={request.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{request.studentName}</p>
                                            <p className="text-xs text-gray-500">{request.mssv}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.room}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{request.leaveDate}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.daySent}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            request.status === 'Đã duyệt' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {request.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

