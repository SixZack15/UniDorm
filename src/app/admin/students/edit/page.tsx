'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import StudentForm from '@/components/StudentForm';
import { subscriptionStorage, RoomSubscription, RegistrationStatus } from '@/utils/subscriptionStorage';

export default function EditStudentPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const studentId = searchParams.get('id') || undefined;
    
    const [checkInStatus, setCheckInStatus] = useState<'CHECKED_IN' | 'CHECKED_OUT'>('CHECKED_IN');
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

    const handleCheckIn = () => {
        setCheckInStatus('CHECKED_IN');
        toast.success('Đã cập nhật trạng thái Check-in thành công!', {
            duration: 2000,
            icon: '✅',
        });
        setTimeout(() => {
            router.back();
        }, 1500);
    };

    const handleCheckOut = () => {
        setCheckInStatus('CHECKED_OUT');
        toast.success('Đã cập nhật trạng thái Checkout thành công!', {
            duration: 2000,
            icon: '✅',
        });
        setTimeout(() => {
            router.back();
        }, 1500);
    };

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

    return (
        <div className="space-y-6">
            <Toaster position="top-right" />
            
            {/* Student Form */}
            <StudentForm studentId={studentId} isEdit={true} />

            {/* Check-in/Checkout Management Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                    <h2 className="text-xl font-bold text-white">Quản lý Check-in/Checkout</h2>
                    <p className="text-blue-100 text-sm mt-1">Cập nhật trạng thái check-in của sinh viên</p>
                </div>

                <div className="p-6">
                    {/* Current Status Display */}
                    <div className="mb-6 p-5 bg-gray-50 rounded-lg border-2 border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-2">Trạng thái hiện tại:</p>
                                <div className="flex items-center gap-3">
                                    <span className={`px-4 py-2 inline-flex text-base font-bold rounded-lg ${
                                        checkInStatus === 'CHECKED_IN' 
                                            ? 'bg-blue-100 text-blue-800 border-2 border-blue-300' 
                                            : 'bg-gray-100 text-gray-800 border-2 border-gray-300'
                                    }`}>
                                        {checkInStatus === 'CHECKED_IN' ? 'Đang check in' : 'Đã checkout'}
                                    </span>
                                    {checkInStatus === 'CHECKED_IN' ? (
                                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    ) : (
                                        <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-4">
                        <h3 className="text-base font-semibold text-gray-900">Cập nhật trạng thái:</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Check-in Button */}
                            <button
                                onClick={handleCheckIn}
                                disabled={checkInStatus === 'CHECKED_IN'}
                                className={`group relative p-5 rounded-xl border-2 transition-all ${
                                    checkInStatus === 'CHECKED_IN'
                                        ? 'border-blue-300 bg-blue-50 cursor-not-allowed opacity-60'
                                        : 'border-blue-500 bg-white hover:bg-blue-50 hover:shadow-lg transform hover:scale-105'
                                }`}
                            >
                                <div className="flex flex-col items-center gap-3">
                                    <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
                                        checkInStatus === 'CHECKED_IN' ? 'bg-blue-200' : 'bg-blue-100 group-hover:bg-blue-200'
                                    }`}>
                                        <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                        </svg>
                                    </div>
                                    <div className="text-center">
                                        <h4 className="text-lg font-bold text-gray-900">Check-in</h4>
                                        <p className="text-xs text-gray-600 mt-1">Đánh dấu sinh viên đang ở KTX</p>
                                    </div>
                                    {checkInStatus === 'CHECKED_IN' && (
                                        <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                                            Đang áp dụng
                                        </span>
                                    )}
                                </div>
                            </button>

                            {/* Checkout Button */}
                            <button
                                onClick={handleCheckOut}
                                disabled={checkInStatus === 'CHECKED_OUT'}
                                className={`group relative p-5 rounded-xl border-2 transition-all ${
                                    checkInStatus === 'CHECKED_OUT'
                                        ? 'border-gray-300 bg-gray-50 cursor-not-allowed opacity-60'
                                        : 'border-gray-400 bg-white hover:bg-gray-50 hover:shadow-lg transform hover:scale-105'
                                }`}
                            >
                                <div className="flex flex-col items-center gap-3">
                                    <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
                                        checkInStatus === 'CHECKED_OUT' ? 'bg-gray-200' : 'bg-gray-100 group-hover:bg-gray-200'
                                    }`}>
                                        <svg className="w-7 h-7 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                    </div>
                                    <div className="text-center">
                                        <h4 className="text-lg font-bold text-gray-900">Checkout</h4>
                                        <p className="text-xs text-gray-600 mt-1">Đánh dấu sinh viên đã rời KTX</p>
                                    </div>
                                    {checkInStatus === 'CHECKED_OUT' && (
                                        <span className="text-xs font-semibold text-gray-600 bg-gray-200 px-3 py-1 rounded-full">
                                            Đang áp dụng
                                        </span>
                                    )}
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Info Box */}
                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex gap-3">
                            <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div className="text-sm text-blue-800">
                                <p className="font-semibold mb-1">Lưu ý:</p>
                                <ul className="list-disc list-inside space-y-1 text-blue-700">
                                    <li>Trạng thái sẽ được cập nhật ngay lập tức</li>
                                    <li>Bạn sẽ được chuyển về trang danh sách sau khi cập nhật</li>
                                    <li>Thao tác này chỉ mang tính demo, không lưu vào database</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Room Subscription Processing Section */}
            {subscription && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="bg-gradient-to-r from-primary to-red-700 px-6 py-4">
                        <h2 className="text-xl font-bold text-white">Xử Lý Đăng Ký Phòng</h2>
                        <p className="text-red-100 text-sm mt-1">Cập nhật trạng thái hồ sơ đăng ký phòng</p>
                    </div>

                    <div className="p-6">
                        {/* Student Information */}
                        <div className="mb-6 p-5 bg-gray-50 rounded-lg border border-gray-200">
                            <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Thông tin đăng ký
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                        {/* Status Selection */}
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
                        <div className="mb-6 bg-gray-50 rounded-xl p-4 border border-gray-200">
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

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={handleDelete}
                                className="flex-1 flex justify-center items-center gap-2 px-6 py-3 bg-white text-gray-700 border-2 border-gray-300 rounded-xl hover:bg-red-50 hover:text-red-600 hover:border-red-300 focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all font-semibold"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Xóa hồ sơ
                            </button>

                            <button
                                onClick={handleReject}
                                className="flex-1 flex justify-center items-center gap-2 px-6 py-3 bg-white text-red-600 border-2 border-red-300 rounded-xl hover:bg-red-50 hover:border-red-400 focus:outline-none focus:ring-4 focus:ring-red-200 transition-all font-semibold"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Từ chối nhanh
                            </button>

                            <button
                                onClick={handleStatusUpdate}
                                disabled={isProcessing}
                                className="flex-1 flex justify-center items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl shadow-lg hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 transition-all font-bold disabled:opacity-50 disabled:cursor-not-allowed"
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
            )}
        </div>
    );
}
