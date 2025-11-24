'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { subscriptionStorage, RoomSubscription } from '@/utils/subscriptionStorage';
import Link from 'next/link';
import { Home, CheckCircle, FileText, Shield, AlertCircle } from 'lucide-react';

export default function ConfirmStayPage() {
    const router = useRouter();
    const [subscription, setSubscription] = useState<RoomSubscription | null>(null);
    const [agreed, setAgreed] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const sub = subscriptionStorage.getSubscription();
        if (sub) {
            setSubscription(sub);
        } else {
            // If no subscription, redirect to dashboard
            router.push('/dashboard');
        }
    }, [router]);

    const handleConfirm = () => {
        if (!agreed) {
            toast.error('Vui lòng đồng ý với các điều khoản và nội quy KTX!');
            return;
        }
        
        setIsSubmitting(true);

        // Simulate API call/Processing
        setTimeout(() => {
            // In a real app, this would update the backend status to 'CHECKED_IN'
            toast.success('Xác nhận nhận phòng thành công! Chào mừng bạn đến với UniDorm.', {
                duration: 4000,
                icon: '🎉',
            });
            
            setTimeout(() => {
                router.push('/dashboard');
            }, 2000);
        }, 1500);
    };

    if (!subscription) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Toaster position="top-right" />
            
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-3">
                        <Home className="w-8 h-8 text-primary" />
                        Xác Nhận Nhận Phòng
                    </h1>
                    <p className="mt-2 text-gray-600">Vui lòng kiểm tra thông tin và xác nhận các điều khoản trước khi nhận phòng.</p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    {/* Room Info Section */}
                    <div className="bg-primary/5 p-6 border-b border-primary/10">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-primary" />
                            Thông tin phòng đăng ký
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Loại phòng</p>
                                <p className="text-xl font-bold text-gray-900">{subscription.roomName}</p>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {subscription.amenities.map((amenity, idx) => (
                                        <span key={idx} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-gray-800 border border-gray-200 shadow-sm">
                                            {amenity}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Chi phí</p>
                                <p className="text-xl font-bold text-primary">{subscription.price.toLocaleString('vi-VN')} VND<span className="text-sm font-normal text-gray-500">/tháng</span></p>
                                <p className="text-sm text-gray-500 mt-1">Mã hồ sơ: <span className="font-mono font-medium">{subscription.registrationId}</span></p>
                            </div>
                        </div>
                    </div>

                    {/* Terms & Conditions */}
                    <div className="p-8">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-gray-600" />
                            Điều khoản & Nội quy
                        </h2>
                        
                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 h-64 overflow-y-auto mb-6 text-sm text-gray-600 space-y-4 custom-scrollbar">
                            <p className="font-bold text-gray-900">1. Quy định chung</p>
                            <p>Sinh viên phải tuân thủ nghiêm ngặt các quy định về giờ giấc, vệ sinh và an ninh trật tự trong khu vực ký túc xá. Không được phép đưa người lạ vào phòng khi chưa có sự đồng ý của Ban Quản Lý.</p>
                            
                            <p className="font-bold text-gray-900">2. Bảo quản tài sản</p>
                            <p>Sinh viên có trách nhiệm bảo quản tài sản cá nhân và tài sản chung của phòng. Mọi hư hỏng do lỗi chủ quan sẽ phải bồi thường theo quy định hiện hành.</p>
                            
                            <p className="font-bold text-gray-900">3. An toàn phòng cháy chữa cháy</p>
                            <p>Nghiêm cấm việc nấu ăn trong phòng (trừ khu vực được cho phép), sử dụng các thiết bị điện không đảm bảo an toàn, tàng trữ chất dễ cháy nổ.</p>
                            
                            <p className="font-bold text-gray-900">4. Thanh toán phí</p>
                            <p>Phí lưu trú và các khoản phí dịch vụ (điện, nước, internet) phải được thanh toán đúng hạn hàng tháng. Chậm thanh toán quá 15 ngày sẽ bị xem xét chấm dứt hợp đồng.</p>
                            
                            <p className="font-bold text-gray-900">5. Cam kết</p>
                            <p>Tôi cam kết đã đọc, hiểu và sẽ thực hiện đúng các nội quy, quy định của Ký túc xá UniDorm. Tôi chịu hoàn toàn trách nhiệm trước pháp luật và nhà trường nếu vi phạm.</p>
                        </div>

                        {/* Agreement Checkbox */}
                        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100 mb-8">
                            <div className="flex items-center h-5">
                                <input
                                    id="agreement"
                                    name="agreement"
                                    type="checkbox"
                                    checked={agreed}
                                    onChange={(e) => setAgreed(e.target.checked)}
                                    className="h-5 w-5 text-primary border-gray-300 rounded focus:ring-primary cursor-pointer"
                                />
                            </div>
                            <div className="ml-2 text-sm">
                                <label htmlFor="agreement" className="font-medium text-gray-900 cursor-pointer select-none">
                                    Tôi xác nhận đã đọc kỹ và đồng ý với các điều khoản trên
                                </label>
                                <p className="text-gray-500 mt-1">Bằng việc đánh dấu vào ô này, bạn chính thức xác nhận việc nhận phòng và tuân thủ nội quy.</p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-end pt-4 border-t border-gray-100">
                            <Link 
                                href="/profile"
                                className="px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-colors text-center"
                            >
                                Quay lại
                            </Link>
                            <button
                                onClick={handleConfirm}
                                disabled={isSubmitting || !agreed}
                                className={`px-8 py-3 rounded-xl font-bold text-white shadow-lg flex items-center justify-center gap-2 transition-all ${
                                    isSubmitting || !agreed 
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : 'bg-primary hover:bg-red-700 hover:shadow-xl transform hover:-translate-y-0.5'
                                }`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Đang xử lý...
                                    </>
                                ) : (
                                    <>
                                        <Shield className="w-5 h-5" />
                                        Xác nhận vào ở
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className="mt-6 flex items-start gap-3 text-sm text-gray-500 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                    <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                    <p>Lưu ý: Sau khi xác nhận, bạn sẽ chính thức trở thành cư dân của UniDorm. Vui lòng liên hệ Ban Quản Lý tại tầng trệt để nhận chìa khóa phòng và thẻ ra vào.</p>
                </div>
            </div>
        </div>
    );
}
