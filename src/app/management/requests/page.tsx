'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

export default function ManagementRequestsPage() {
    const router = useRouter();

    // Mock data for room transfer requests
    const [transferRequests, setTransferRequests] = useState([
        {
            id: 'TR-001',
            studentName: 'Nguyễn Văn A',
            mssv: '21748020',
            reason: 'Muốn chuyển sang phòng có điều hòa',
            daySent: '10/11/2024',
            status: 'Đang duyệt',
        },
        {
            id: 'TR-002',
            studentName: 'Trần Thị B',
            mssv: '22711005',
            reason: 'Xung đột với bạn cùng phòng',
            daySent: '08/11/2024',
            status: 'Đang duyệt',
        },
        {
            id: 'TR-003',
            studentName: 'Lê Văn C',
            mssv: '20799123',
            reason: 'Phòng hiện tại quá xa khu vực học tập',
            daySent: '05/11/2024',
            status: 'Đã duyệt',
        },
    ]);

    // Mock data for leave requests
    const [leaveRequests, setLeaveRequests] = useState([
        {
            id: 'LR-001',
            studentName: 'Phạm Văn D',
            mssv: '21700001',
            reason: 'Tốt nghiệp sớm, cần trả phòng',
            daySent: '12/11/2024',
            status: 'Đang duyệt',
        },
        {
            id: 'LR-002',
            studentName: 'Hoàng Thị E',
            mssv: '22711010',
            reason: 'Chuyển trường',
            daySent: '11/11/2024',
            status: 'Đã duyệt',
        },
        {
            id: 'LR-003',
            studentName: 'Võ Văn F',
            mssv: '21748025',
            reason: 'Hoàn cảnh gia đình',
            daySent: '09/11/2024',
            status: 'Từ chối',
        },
    ]);

    const handleDeleteTransfer = (id: string) => {
        setTransferRequests(prev => prev.filter(req => req.id !== id));
        toast.success('Đã xóa yêu cầu chuyển phòng!', {
            duration: 2000,
            icon: '✅',
        });
    };

    const handleDeleteLeave = (id: string) => {
        setLeaveRequests(prev => prev.filter(req => req.id !== id));
        toast.success('Đã xóa yêu cầu trả phòng!', {
            duration: 2000,
            icon: '✅',
        });
    };

    const handleEditTransfer = (id: string) => {
        router.push(`/management/requests/processTransfer?id=${id}`);
    };

    const handleEditLeave = (id: string) => {
        router.push(`/management/requests/processLeave?id=${id}`);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Đã duyệt':
                return 'bg-green-100 text-green-800';
            case 'Từ chối':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-yellow-100 text-yellow-800';
        }
    };

    return (
        <div className="space-y-6">
            <Toaster position="top-right" />
            
            {/* Breadcrumb */}
            <nav className="flex text-sm text-gray-500">
                <Link href="/management/dashboard" className="hover:text-primary">Dashboard</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-medium">Yêu cầu</span>
            </nav>

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-900">Quản lý Yêu cầu</h1>
            </div>

            {/* Room Transfer Requests Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                    <h2 className="font-bold text-gray-900 text-lg">Yêu cầu Chuyển phòng</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sinh viên</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ngày gửi</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lý do</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {transferRequests.map((request) => (
                                <tr key={request.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{request.studentName}</p>
                                            <p className="text-xs text-gray-500">MSSV: {request.mssv}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.daySent}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{request.reason}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(request.status)}`}>
                                            {request.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => handleEditTransfer(request.id)}
                                                className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded"
                                                title="Sửa"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleDeleteTransfer(request.id)}
                                                className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded"
                                                title="Xóa"
                                            >
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

            {/* Leave Requests Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                    <h2 className="font-bold text-gray-900 text-lg">Yêu cầu Trả phòng</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sinh viên</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ngày gửi</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lý do</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {leaveRequests.map((request) => (
                                <tr key={request.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{request.studentName}</p>
                                            <p className="text-xs text-gray-500">MSSV: {request.mssv}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.daySent}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{request.reason}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(request.status)}`}>
                                            {request.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => handleEditLeave(request.id)}
                                                className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded"
                                                title="Sửa"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleDeleteLeave(request.id)}
                                                className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded"
                                                title="Xóa"
                                            >
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
    );
}


