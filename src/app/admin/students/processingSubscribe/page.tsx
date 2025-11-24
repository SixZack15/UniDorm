'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import { subscriptionStorage, RoomSubscription, RegistrationStatus } from '@/utils/subscriptionStorage';

export default function ProcessingSubscribePage() {
    const router = useRouter();
    const [subscription, setSubscription] = useState<RoomSubscription | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<RegistrationStatus>('Chờ duyệt');
    const [isProcessing, setIsProcessing] = useState(false);

    // Load subscription from localStorage
    useEffect(() => {
        const loadedSubscription = subscriptionStorage.getSubscription();
        if (loadedSubscription) {
            setSubscription(loadedSubscription);
            setSelectedStatus(loadedSubscription.registrationStatus);
        }
    }, []);

    const handleStatusUpdate = () => {
        if (!subscription) {
            toast.error('Không tìm thấy thông tin đăng ký!');
            return;
        }

        setIsProcessing(true);

        // Simulate processing delay
        setTimeout(() => {
            // Update status in localStorage
            subscriptionStorage.updateRegistrationStatus(selectedStatus);
            
            setIsProcessing(false);
            
            toast.success(`Đã cập nhật trạng thái thành: ${selectedStatus}`, {
                duration: 3000,
                icon: '✅',
                style: {
                    borderRadius: '10px',
                    background: '#10B981',
                    color: '#fff',
                },
            });

            // Redirect back to admin students page after 1.5s
            setTimeout(() => {
                router.push('/admin/students');
            }, 1500);
        }, 1000);
    };

    const handleReject = () => {
        setSelectedStatus('Từ chối');
        // Auto-submit after setting status
        setTimeout(() => {
            if (subscription) {
                subscriptionStorage.updateRegistrationStatus('Từ chối');
                toast.success('Đã từ chối hồ sơ đăng ký', {
                    duration: 3000,
                    icon: '❌',
                });
                setTimeout(() => {
                    router.push('/admin/students');
                }, 1500);
            }
        }, 100);
    };

    const handleDelete = () => {
        if (window.confirm('Bạn có chắc chắn muốn xóa hồ sơ này không? Dữ liệu sẽ bị xóa vĩnh viễn khỏi hệ thống.')) {
            subscriptionStorage.removeSubscription();
            toast.success('Đã xóa hồ sơ thành công', {
                icon: '🗑️',
            });
            setTimeout(() => {
                router.push('/admin/students');
            }, 1000);
        }
    };

    if (!subscription) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Không tìm thấy hồ sơ</h2>
                    <p className="text-gray-600 mb-6">Không có hồ sơ đăng ký nào trong hệ thống</p>
                    <Link
                        href="/admin/students"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-red-700 transition-colors font-semibold"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Quay lại
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <Toaster position="top-right" />

            {/* Breadcrumb */}
            <div className="max-w-4xl mx-auto mb-6">
                <nav className="flex items-center text-sm text-gray-600">
                    <Link href="/admin" className="hover:text-primary transition-colors">
                        Admin
                    </Link>
                    <span className="mx-2">/</span>
                    <Link href="/admin/students" className="hover:text-primary transition-colors">
                        Quản lý sinh viên
                    </Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-900 font-medium">Xử lý đăng ký</span>
                </nav>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Xử Lý Đăng Ký Phòng</h1>
                            <p className="text-sm text-gray-600">Cập nhật trạng thái hồ sơ đăng ký</p>
                        </div>
                    </div>
                </div>

                {/* Student Information Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Thông tin sinh viên
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Mã hồ sơ</p>
                            <p className="font-mono font-bold text-primary">{subscription.registrationId}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Ngày nộp</p>
                            <p className="font-medium text-gray-900">{subscription.submittedDate}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Họ và tên</p>
                            <p className="font-bold text-gray-900">{subscription.studentName}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Số điện thoại</p>
                            <p className="font-medium text-gray-900">{subscription.phoneNumber}</p>
                        </div>
                        <div className="md:col-span-2">
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Loại phòng đăng ký</p>
                            <div className="flex items-center gap-3">
                                <p className="font-bold text-gray-900">{subscription.roomName}</p>
                                <span className="text-primary font-bold">{subscription.price.toLocaleString('vi-VN')} VND/tháng</span>
                            </div>
                            <div className="flex flex-wrap gap-1.5 mt-2">
                                {subscription.amenities.map((amenity, idx) => (
                                    <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                        {amenity}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Status Selection Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                        Cập nhật trạng thái
                    </h2>

                    <div className="mb-6">
                        <label className="block text-sm font-bold text-gray-700 mb-3">
                            Trạng thái xử lý <span className="text-red-600">*</span>
                        </label>
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value as RegistrationStatus)}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-base font-medium bg-white"
                        >
                            <option value="Chờ duyệt">⏳ Chờ duyệt</option>
                            <option value="Đang ở">🏠 Đang ở (Đã phê duyệt)</option>
                            <option value="Từ chối">❌ Từ chối</option>
                        </select>
                    </div>

                    {/* Status Preview */}
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                        <p className="text-xs text-gray-600 uppercase tracking-wider mb-2">Xem trước trạng thái:</p>
                        <span className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-bold ${
                            selectedStatus === 'Đang ở' ? 'bg-green-100 text-green-800 border border-green-300' :
                            selectedStatus === 'Chờ duyệt' ? 'bg-yellow-100 text-yellow-800 border border-yellow-300' :
                            selectedStatus === 'Từ chối' ? 'bg-red-100 text-red-800 border border-red-300' :
                            'bg-gray-100 text-gray-800 border border-gray-300'
                        }`}>
                            {selectedStatus === 'Đang ở' && '🏠'}
                            {selectedStatus === 'Chờ duyệt' && '⏳'}
                            {selectedStatus === 'Từ chối' && '❌'}
                            {' '}{selectedStatus}
                        </span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={handleDelete}
                        className="flex-1 flex justify-center items-center gap-2 px-6 py-4 bg-white text-gray-700 border-2 border-gray-300 rounded-xl hover:bg-red-50 hover:text-red-600 hover:border-red-300 focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all font-semibold"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Xóa hồ sơ
                    </button>

                    <button
                        onClick={handleReject}
                        className="flex-1 flex justify-center items-center gap-2 px-6 py-4 bg-white text-red-600 border-2 border-red-300 rounded-xl hover:bg-red-50 hover:border-red-400 focus:outline-none focus:ring-4 focus:ring-red-200 transition-all font-semibold"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Từ chối nhanh
                    </button>

                    <button
                        onClick={handleStatusUpdate}
                        disabled={isProcessing}
                        className="flex-1 flex justify-center items-center gap-2 px-6 py-4 bg-primary text-white rounded-xl shadow-lg hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 transition-all font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isProcessing ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Đang xử lý...
                            </>
                        ) : (
                            <>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Xác nhận cập nhật
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
