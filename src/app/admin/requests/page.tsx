'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { subscriptionStorage, PaymentExtension } from '@/utils/subscriptionStorage';

export default function AdminRequestsPage() {
    const [requests, setRequests] = useState<PaymentExtension[]>([]);

    useEffect(() => {
        // Load from localStorage
        const extension = subscriptionStorage.getPaymentExtension();
        
        // If no data in localStorage, use mock data
        if (!extension) {
            setRequests([
                {
                    id: 'EXT-001',
                    reason: 'Hoàn cảnh gia đình khó khăn, chưa nhận được trợ cấp từ nhà nước',
                    extensionDate: '2024-12-15',
                    reductionAmount: '500000',
                    status: 'Đang đợi',
                    submittedDate: '10/11/2024',
                },
                {
                    id: 'EXT-002',
                    reason: 'Xin gia hạn thanh toán do vấn đề tài chính tạm thời',
                    extensionDate: '2024-12-20',
                    reductionAmount: '',
                    status: 'Đang đợi',
                    submittedDate: '08/11/2024',
                },
                {
                    id: 'EXT-003',
                    reason: 'Xin giảm phí do hoàn cảnh đặc biệt',
                    extensionDate: '',
                    reductionAmount: '300000',
                    status: 'Đã duyệt',
                    submittedDate: '05/11/2024',
                },
            ]);
        } else {
            // Convert single extension to array format
            setRequests([extension]);
        }
    }, []);

    const handleProcess = (requestId: string) => {
        setRequests(prev => prev.map(req => {
            if (req.id === requestId) {
                const updated = { ...req, status: 'Đã duyệt' as const };
                // Update localStorage if it exists
                if (subscriptionStorage.getPaymentExtension()?.id === requestId) {
                    subscriptionStorage.savePaymentExtension(updated);
                }
                return updated;
            }
            return req;
        }));
        
        toast.success('Đã duyệt yêu cầu thành công!', {
            duration: 3000,
            icon: '✅',
        });
    };

    const handleReject = (requestId: string) => {
        setRequests(prev => prev.map(req => {
            if (req.id === requestId) {
                const updated = { ...req, status: 'Từ chối' as const };
                // Update localStorage if it exists
                if (subscriptionStorage.getPaymentExtension()?.id === requestId) {
                    subscriptionStorage.savePaymentExtension(updated);
                }
                return updated;
            }
            return req;
        }));
        
        toast.success('Đã từ chối yêu cầu.', {
            duration: 3000,
            icon: '✅',
        });
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
                <Link href="/admin/dashboard" className="hover:text-primary">Trang chủ</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-medium">Yêu cầu gia hạn/giảm phí</span>
            </nav>

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-900">Quản lý Yêu cầu Gia hạn/Giảm phí</h1>
            </div>

            {/* Requests List */}
            <div className="space-y-4">
                {requests.map((request) => (
                    <div
                        key={request.id}
                        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
                    >
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="font-bold text-gray-900">Yêu cầu #{request.id}</h3>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(request.status)}`}>
                                        {request.status}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">
                                    <span className="font-medium">Ngày gửi:</span> {request.submittedDate}
                                </p>
                            </div>
                            {request.status === 'Đang đợi' && (
                                <button
                                    onClick={() => handleProcess(request.id)}
                                    className="px-4 py-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg shadow-sm transition-colors"
                                >
                                    Xử lý yêu cầu
                                </button>
                            )}
                            {request.status === 'Đang đợi' && (
                                <button
                                    onClick={() => handleReject(request.id)}
                                    className="px-4 py-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg shadow-sm transition-colors"
                                >
                                    Từ chối
                                </button>
                            )}
                        </div>

                        <div className="border-t border-gray-100 pt-4 space-y-3">
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">Lý do</p>
                                <p className="text-sm text-gray-900">{request.reason}</p>
                            </div>

                            {request.extensionDate && (
                                <div>
                                    <p className="text-xs text-gray-500 uppercase mb-1">Xin gia hạn đến ngày</p>
                                    <p className="text-sm text-gray-900 font-medium">{request.extensionDate}</p>
                                </div>
                            )}

                            {request.reductionAmount && (
                                <div>
                                    <p className="text-xs text-gray-500 uppercase mb-1">Số tiền xin giảm</p>
                                    <p className="text-sm text-gray-900 font-medium">
                                        {parseInt(request.reductionAmount).toLocaleString('vi-VN')} VND
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {requests.length === 0 && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                        <p className="text-gray-500">Chưa có yêu cầu nào</p>
                    </div>
                )}
            </div>
        </div>
    );
}

