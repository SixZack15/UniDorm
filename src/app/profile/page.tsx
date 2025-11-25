'use client';

import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { subscriptionStorage, RoomSubscription, PaymentExtension, ChangeRoomRequest, EndContractRequest } from '@/utils/subscriptionStorage';

export default function ProfilePage() {
    // State for cancel confirmation modal
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [isCancelling, setIsCancelling] = useState(false);
    
    // State for subscription data from localStorage
    const [subscription, setSubscription] = useState<RoomSubscription | null>(null);
    const [hasSubscription, setHasSubscription] = useState(false);
    const [paymentExtension, setPaymentExtension] = useState<PaymentExtension | null>(null);
    const [changeRoomRequest, setChangeRoomRequest] = useState<ChangeRoomRequest | null>(null);
    const [endContractRequest, setEndContractRequest] = useState<EndContractRequest | null>(null);

    // Load subscription from localStorage on mount
    useEffect(() => {
        const loadedSubscription = subscriptionStorage.getSubscription();
        setSubscription(loadedSubscription);
        setHasSubscription(loadedSubscription !== null);

        const loadedExtension = subscriptionStorage.getPaymentExtension();
        if (loadedExtension) {
            setPaymentExtension(loadedExtension);
        }

        const loadedChangeRoom = subscriptionStorage.getChangeRoomRequest();
        if (loadedChangeRoom) {
            setChangeRoomRequest(loadedChangeRoom);
        }

        const loadedEndContract = subscriptionStorage.getEndContractRequest();
        if (loadedEndContract) {
            setEndContractRequest(loadedEndContract);
        }
    }, []);

    // Handler for cancel subscription
    const handleCancelSubscription = () => {
        setIsCancelling(true);
        
        setTimeout(() => {
            subscriptionStorage.removeSubscription();
            subscriptionStorage.removeChangeRoomRequest();
            subscriptionStorage.removeEndContractRequest();
            setSubscription(null);
            setHasSubscription(false);
            setPaymentExtension(null);
            setChangeRoomRequest(null);
            setEndContractRequest(null);
            setIsCancelling(false);
            setShowCancelModal(false);
            
            toast.success('Đã hủy đăng ký phòng thành công!', {
                duration: 4000,
                icon: '✅',
            });
        }, 1500);
    };

    const handleCancelChangeRoom = () => {
        if (confirm('Bạn có chắc chắn muốn hủy yêu cầu chuyển phòng?')) {
            subscriptionStorage.removeChangeRoomRequest();
            setChangeRoomRequest(null);
            toast.success('Đã hủy yêu cầu chuyển phòng');
        }
    };

    const handleCancelEndContract = () => {
        if (confirm('Bạn có chắc chắn muốn hủy yêu cầu trả phòng?')) {
            subscriptionStorage.removeEndContractRequest();
            setEndContractRequest(null);
            toast.success('Đã hủy yêu cầu trả phòng');
        }
    };

    const handleSaveChanges = () => {
        toast.success('Đã lưu thay đổi thành công!', {
            duration: 2000,
            icon: '✅',
        });
        setTimeout(() => {
            window.location.href = '/dashboard';
        }, 2000);
    };

    // Mock Data
    const [user, setUser] = useState({
        fullName: 'Nguyễn Văn A',
        mssv: '21748020',
        vluEmail: 'van.a@vanlanguni.vn',
        faculty: 'Công Nghệ Thông Tin',
        class: 'K27-CNTT1',
        status: 'Đang ở KTX',
        phone: '0901234567',
        personalEmail: 'nguyenvana@gmail.com',
        address: '123 Đường số 5, Phường 7, Gò Vấp, TP.HCM',
        emergencyName: 'Nguyễn Văn Ba',
        emergencyRelationship: 'Cha',
        emergencyPhone: '0988777666',
    });

    return (
        <div className="space-y-6">
            {/* Breadcrumb */}
            <nav className="flex text-sm text-gray-500">
                <a href="/dashboard" className="hover:text-primary">Trang chủ</a>
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-medium">Hồ sơ cá nhân</span>
            </nav>

            {/* Room Registration Info Card */}
            {hasSubscription && subscription ? (
                <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-2xl shadow-lg border-2 border-red-200 overflow-hidden">
                    <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                    Thông tin đăng ký phòng
                                </h2>
                                <p className="text-sm text-gray-600">Mã hồ sơ: <span className="font-mono font-semibold text-primary">{subscription.registrationId}</span></p>
                            </div>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${
                                subscription.registrationStatus === 'Chờ duyệt' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' :
                                subscription.registrationStatus === 'Đang ở' ? 'bg-green-100 text-green-800 border-green-300' :
                                subscription.registrationStatus === 'Từ chối' ? 'bg-red-100 text-red-800 border-red-300' :
                                'bg-gray-100 text-gray-800 border-gray-300'
                            }`}>
                                <span className={`w-2 h-2 rounded-full mr-2 ${
                                    subscription.registrationStatus === 'Chờ duyệt' ? 'bg-yellow-500 animate-pulse' :
                                    subscription.registrationStatus === 'Đang ở' ? 'bg-green-500' :
                                    subscription.registrationStatus === 'Từ chối' ? 'bg-red-500' :
                                    'bg-gray-500'
                                }`}></span>
                                {subscription.registrationStatus}
                            </span>
                        </div>

                        <div className="bg-white rounded-xl p-5 mb-4 shadow-sm border border-red-100">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Loại phòng đăng ký</p>
                                    <p className="text-base font-bold text-gray-900">{subscription.roomName}</p>
                                    <div className="flex flex-wrap gap-1.5 mt-2">
                                        {subscription.amenities.map((amenity, idx) => (
                                            <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                                {amenity}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Mức phí dự kiến</p>
                                    <p className="text-2xl font-bold text-primary">{subscription.price.toLocaleString('vi-VN')} <span className="text-sm font-normal text-gray-500">VND/tháng</span></p>
                                    <p className="text-xs text-gray-500 mt-1">Ngày nộp hồ sơ: <span className="font-medium text-gray-700">{subscription.submittedDate}</span></p>
                                </div>
                            </div>
                            
                            {/* Registration Status from Admin */}
                            <div className="mt-4 pt-4 border-t border-gray-200">
                                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Trạng thái xử lý</p>
                                <div className="flex items-center gap-2">
                                    <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-bold ${
                                        subscription.registrationStatus === 'Đang ở' ? 'bg-green-100 text-green-800 border border-green-300' :
                                        subscription.registrationStatus === 'Chờ duyệt' ? 'bg-yellow-100 text-yellow-800 border border-yellow-300' :
                                        subscription.registrationStatus === 'Từ chối' ? 'bg-red-100 text-red-800 border border-red-300' :
                                        'bg-gray-100 text-gray-800 border border-gray-300'
                                    }`}>
                                        {subscription.registrationStatus === 'Đang ở' && '🏠'}
                                        {subscription.registrationStatus === 'Chờ duyệt' && '⏳'}
                                        {subscription.registrationStatus === 'Từ chối' && '❌'}
                                        {' '}{subscription.registrationStatus}
                                    </span>
                                    {subscription.registrationStatus === 'Chờ duyệt' && (
                                        <span className="text-xs text-gray-600 italic">Đang chờ BQL xét duyệt</span>
                                    )}
                                    {subscription.registrationStatus === 'Đang ở' && (
                                        <span className="text-xs text-green-700 font-medium">✓ Đã được phê duyệt</span>
                                    )}
                                    {subscription.registrationStatus === 'Từ chối' && (
                                        <span className="text-xs text-red-700 font-medium">Hồ sơ không đạt yêu cầu</span>
                                    )}
                                </div>
                            </div>

                            {/* Payment Extension Status */}
                            {paymentExtension && (
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Trạng thái gia hạn</p>
                                    <div className="flex items-center gap-2">
                                        <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-bold ${
                                            paymentExtension.status === 'Đã duyệt' ? 'bg-green-100 text-green-800 border border-green-300' :
                                            paymentExtension.status === 'Đang đợi' ? 'bg-yellow-100 text-yellow-800 border border-yellow-300' :
                                            paymentExtension.status === 'Từ chối' ? 'bg-red-100 text-red-800 border border-red-300' :
                                            'bg-gray-100 text-gray-800 border border-gray-300'
                                        }`}>
                                            {paymentExtension.status}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            {subscription.registrationStatus === 'Đang ở' ? (
                                <>
                                    <a 
                                        href="/finance/pay"
                                        className="flex-1 flex justify-center items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl shadow-md hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 transition-all font-semibold text-sm group"
                                    >
                                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                        </svg>
                                        Thanh toán ngay
                                    </a>
                                    <a 
                                        href="/rooms/confirmStay"
                                        className="flex-1 flex justify-center items-center gap-2 px-6 py-3 bg-white text-primary border-2 border-primary rounded-xl shadow-md hover:bg-red-50 focus:outline-none focus:ring-4 focus:ring-red-100 transition-all font-semibold text-sm group"
                                    >
                                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Xác nhận vào ở
                                    </a>
                                    <a 
                                        href="/profile/contract"
                                        className="flex-1 flex justify-center items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 border border-gray-300 rounded-xl shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all font-semibold text-sm group"
                                    >
                                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        Xem hợp đồng
                                    </a>
                                    <a 
                                        href="/rooms/extendPayment"
                                        className="flex-1 flex justify-center items-center gap-2 px-6 py-3 bg-yellow-50 text-yellow-700 border border-yellow-300 rounded-xl shadow-sm hover:bg-yellow-100 focus:outline-none focus:ring-4 focus:ring-yellow-100 transition-all font-semibold text-sm group"
                                    >
                                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Xin gia hạn / Giảm phí
                                    </a>
                                    <a 
                                        href="/requests/changeRoom"
                                        className="flex-1 flex justify-center items-center gap-2 px-6 py-3 bg-blue-50 text-blue-700 border border-blue-300 rounded-xl shadow-sm hover:bg-blue-100 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all font-semibold text-sm group"
                                    >
                                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                        </svg>
                                        Xin chuyển phòng
                                    </a>
                                    <a 
                                        href="/requests/endContract"
                                        className="flex-1 flex justify-center items-center gap-2 px-6 py-3 bg-red-50 text-red-700 border border-red-300 rounded-xl shadow-sm hover:bg-red-100 focus:outline-none focus:ring-4 focus:ring-red-100 transition-all font-semibold text-sm group"
                                    >
                                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        Xin trả phòng
                                    </a>
                                </>
                            ) : (
                                <>
                                    <a 
                                        href="/profile/updateRoomRegister"
                                        className="flex-1 flex justify-center items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl shadow-md hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 transition-all font-semibold text-sm group"
                                    >
                                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        Cập nhật đăng ký phòng
                                    </a>
                                    <button 
                                        onClick={() => setShowCancelModal(true)}
                                        className="px-6 py-3 bg-white text-red-600 border-2 border-red-300 rounded-xl hover:bg-red-50 hover:border-red-400 focus:outline-none focus:ring-4 focus:ring-red-200 transition-all font-medium text-sm flex items-center justify-center gap-2 group"
                                    >
                                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        Hủy đăng ký
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl shadow-lg border-2 border-gray-200 overflow-hidden">
                    <div className="p-6 text-center">
                        <div className="flex flex-col items-center justify-center py-8">
                            <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Chưa có đăng ký phòng</h3>
                            <p className="text-gray-600 mb-6 max-w-md">
                                Bạn chưa đăng ký phòng ký túc xá. Hãy chọn loại phòng phù hợp và hoàn tất đăng ký ngay!
                            </p>
                            <a 
                                href="/rooms"
                                className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-xl shadow-md hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 transition-all font-semibold group"
                            >
                                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Đăng ký phòng ngay
                            </a>
                        </div>
                    </div>
                </div>
            )}

            <Toaster position="top-right" />

            {/* Other Requests Status */}
            {(changeRoomRequest || endContractRequest) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {changeRoomRequest && (
                        <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <svg className="w-24 h-24 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                    </svg>
                                </span>
                                Yêu cầu chuyển phòng
                            </h3>
                            <div className="space-y-3 relative z-10">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase">Phòng mong muốn</p>
                                    <p className="font-medium text-gray-900">{changeRoomRequest.desiredRoom}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase">Trạng thái</p>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${
                                        changeRoomRequest.status === 'Đã duyệt' ? 'bg-green-100 text-green-800' :
                                        changeRoomRequest.status === 'Đang đợi' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                    }`}>
                                        {changeRoomRequest.status}
                                    </span>
                                </div>
                                <div className="pt-4 flex gap-3">
                                    <a href="/requests/changeRoom" className="text-sm font-medium text-blue-600 hover:text-blue-800">Chỉnh sửa</a>
                                    <button onClick={handleCancelChangeRoom} className="text-sm font-medium text-red-600 hover:text-red-800">Hủy yêu cầu</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {endContractRequest && (
                        <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <svg className="w-24 h-24 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span className="p-2 bg-red-100 rounded-lg text-red-600">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                </span>
                                Yêu cầu trả phòng
                            </h3>
                            <div className="space-y-3 relative z-10">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase">Ngày trả dự kiến</p>
                                    <p className="font-medium text-gray-900">{endContractRequest.leaveDate}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase">Trạng thái</p>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${
                                        endContractRequest.status === 'Đã duyệt' ? 'bg-green-100 text-green-800' :
                                        endContractRequest.status === 'Đang đợi' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                    }`}>
                                        {endContractRequest.status}
                                    </span>
                                </div>
                                <div className="pt-4 flex gap-3">
                                    <a href="/requests/endContract" className="text-sm font-medium text-blue-600 hover:text-blue-800">Chỉnh sửa</a>
                                    <button onClick={handleCancelEndContract} className="text-sm font-medium text-red-600 hover:text-red-800">Hủy yêu cầu</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* LEFT COLUMN: Identity Card (Col 1-3) */}
                <div className="lg:col-span-4 xl:col-span-3">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center sticky top-24">
                        <div className="relative mb-4">
                            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-4xl font-bold text-gray-400 border-4 border-white shadow-lg">
                                {/* Placeholder for Avatar */}
                                {user.fullName.charAt(0)}
                            </div>
                            <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full hover:bg-primary-dark transition-colors shadow-md" title="Tải ảnh đại diện">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </button>
                        </div>

                        <h2 className="text-xl font-bold text-gray-900">{user.fullName}</h2>
                        <p className="text-gray-500 font-mono text-sm mt-1">{user.mssv}</p>

                        <div className="mt-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                {user.status}
                            </span>
                        </div>

                        <div className="w-full border-t border-gray-100 my-6"></div>

                        <div className="w-full text-left space-y-3 text-sm">
                            <div>
                                <p className="text-gray-500 text-xs uppercase tracking-wider">Ngày vào</p>
                                <p className="font-medium text-gray-900">15/08/2024</p>
                            </div>
                            <div>
                                <p className="text-gray-500 text-xs uppercase tracking-wider">Phòng hiện tại</p>
                                <p className="font-medium text-gray-900">A.304 (Khu A)</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Profile Form (Col 4-12) */}
                <div className="lg:col-span-8 xl:col-span-9">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                            <h3 className="font-bold text-gray-900 text-lg">THÔNG TIN TÀI KHOẢN</h3>
                        </div>

                        <div className="p-6 space-y-8">

                            {/* Section 1: Academic Info */}
                            <section>
                                <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">
                                    1. Thông tin học vấn <span className="text-gray-400 font-normal normal-case ml-2">(Không thể chỉnh sửa)</span>
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Mã số sinh viên</label>
                                        <input
                                            type="text"
                                            value={user.mssv}
                                            disabled
                                            className="block w-full rounded-md border-gray-300 bg-gray-100 text-gray-500 shadow-sm focus:border-primary focus:ring-primary sm:text-sm cursor-not-allowed"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email VLU</label>
                                        <input
                                            type="text"
                                            value={user.vluEmail}
                                            disabled
                                            className="block w-full rounded-md border-gray-300 bg-gray-100 text-gray-500 shadow-sm focus:border-primary focus:ring-primary sm:text-sm cursor-not-allowed"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Khoa / Viện</label>
                                        <input
                                            type="text"
                                            value={user.faculty}
                                            disabled
                                            className="block w-full rounded-md border-gray-300 bg-gray-100 text-gray-500 shadow-sm focus:border-primary focus:ring-primary sm:text-sm cursor-not-allowed"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Lớp</label>
                                        <input
                                            type="text"
                                            value={user.class}
                                            disabled
                                            className="block w-full rounded-md border-gray-300 bg-gray-100 text-gray-500 shadow-sm focus:border-primary focus:ring-primary sm:text-sm cursor-not-allowed"
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* Section 2: Personal Contact */}
                            <section>
                                <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">
                                    2. Thông tin cá nhân <span className="text-gray-400 font-normal normal-case ml-2">(Có thể chỉnh sửa)</span>
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại <span className="text-red-500">*</span></label>
                                        <input
                                            type="tel"
                                            defaultValue={user.phone}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email cá nhân</label>
                                        <input
                                            type="email"
                                            defaultValue={user.personalEmail}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ thường trú</label>
                                        <input
                                            type="text"
                                            defaultValue={user.address}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* Section 3: Emergency Contact */}
                            <section>
                                <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">
                                    3. Liên hệ khẩn cấp <span className="text-gray-400 font-normal normal-case ml-2">(Bắt buộc)</span>
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Họ tên người thân</label>
                                        <input
                                            type="text"
                                            defaultValue={user.emergencyName}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Mối quan hệ</label>
                                        <select
                                            defaultValue={user.emergencyRelationship}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                        >
                                            <option>Cha</option>
                                            <option>Mẹ</option>
                                            <option>Anh/Chị/Em</option>
                                            <option>Khác</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Số ĐT người thân</label>
                                        <input
                                            type="tel"
                                            defaultValue={user.emergencyPhone}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                        />
                                    </div>
                                    <div className="flex items-end">
                                        <div className="flex items-center h-10">
                                            <input
                                                id="same-address"
                                                name="same-address"
                                                type="checkbox"
                                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                            />
                                            <label htmlFor="same-address" className="ml-2 block text-sm text-gray-900">
                                                Địa chỉ giống thường trú
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Actions */}
                            <div className="flex items-center justify-between gap-4 pt-6 border-t border-gray-100">
                                <button
                                    onClick={() => {
                                        localStorage.removeItem('userRole');
                                        toast.success('Đã đăng xuất thành công!', {
                                            duration: 2000,
                                            icon: '✅',
                                        });
                                        setTimeout(() => {
                                            window.location.href = '/';
                                        }, 2000);
                                    }}
                                    className="px-4 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                    Đăng xuất
                                </button>
                                <div className="flex gap-4">
                                    <button className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                                        Đổi mật khẩu
                                    </button>
                                    <button onClick={handleSaveChanges} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                                        Lưu thay đổi
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>

            {/* Cancel Confirmation Modal */}
            {showCancelModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all">
                        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-red-100">
                            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                            Xác nhận hủy đăng ký
                        </h3>
                        <p className="text-gray-600 text-center mb-6">
                            Bạn có chắc chắn muốn hủy đăng ký phòng <strong>{subscription?.roomName}</strong>? Hành động này không thể hoàn tác.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowCancelModal(false)}
                                disabled={isCancelling}
                                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all disabled:opacity-50"
                            >
                                Không, giữ lại
                            </button>
                            <button
                                onClick={handleCancelSubscription}
                                disabled={isCancelling}
                                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {isCancelling ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Đang xử lý...
                                    </>
                                ) : (
                                    'Có, hủy đăng ký'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
