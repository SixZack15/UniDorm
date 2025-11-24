'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { subscriptionStorage, RoomSubscription } from '@/utils/subscriptionStorage';
import { Clock, DollarSign, FileText, ArrowLeft, Send, AlertCircle } from 'lucide-react';

export default function ExtendPaymentPage() {
    const router = useRouter();
    const [subscription, setSubscription] = useState<RoomSubscription | null>(null);
    const [formData, setFormData] = useState({
        reason: '',
        extensionDate: '',
        reductionAmount: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const sub = subscriptionStorage.getSubscription();
        if (sub) {
            setSubscription(sub);
        } else {
            router.push('/dashboard');
        }
    }, [router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.reason.trim()) {
            toast.error('Vui lòng nhập lý do!');
            return;
        }

        if (!formData.extensionDate && !formData.reductionAmount) {
            toast.error('Vui lòng chọn ít nhất một yêu cầu (Gia hạn hoặc Giảm phí)!');
            return;
        }

        setIsSubmitting(true);

        // Save to localStorage
        const extension = {
            id: `EXT-${Date.now()}`,
            reason: formData.reason,
            extensionDate: formData.extensionDate,
            reductionAmount: formData.reductionAmount,
            status: 'Đang đợi' as const,
            submittedDate: new Date().toLocaleDateString('vi-VN'),
        };

        subscriptionStorage.savePaymentExtension(extension);

        // Simulate API call
        setTimeout(() => {
            toast.success('Đã gửi yêu cầu thành công! Ban Quản Lý sẽ phản hồi sớm nhất.', {
                duration: 4000,
                icon: '📨',
            });
            
            setTimeout(() => {
                router.push('/profile');
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
            
            <div className="max-w-2xl mx-auto">
                <div className="mb-6">
                    <Link href="/profile" className="inline-flex items-center text-gray-600 hover:text-primary transition-colors">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Quay lại hồ sơ
                    </Link>
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="bg-primary/5 p-6 border-b border-primary/10">
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <Clock className="w-8 h-8 text-primary" />
                            Xin Gia Hạn / Giảm Phí
                        </h1>
                        <p className="mt-2 text-gray-600">Gửi yêu cầu hỗ trợ về việc thanh toán phí lưu trú.</p>
                    </div>

                    <div className="p-8">
                        {/* Current Info */}
                        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 mb-8 flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <div className="text-sm text-blue-800">
                                <p className="font-bold mb-1">Thông tin hiện tại:</p>
                                <p>Phòng: <span className="font-semibold">{subscription.roomName}</span></p>
                                <p>Mức phí: <span className="font-semibold">{subscription.price.toLocaleString('vi-VN')} VND/tháng</span></p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Reason */}
                            <div>
                                <label htmlFor="reason" className="block text-sm font-bold text-gray-700 mb-2">
                                    Lý do xin gia hạn/giảm phí <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute top-3 left-3 text-gray-400">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <textarea
                                        id="reason"
                                        name="reason"
                                        rows={4}
                                        value={formData.reason}
                                        onChange={handleChange}
                                        placeholder="Vui lòng trình bày rõ lý do (VD: Hoàn cảnh gia đình khó khăn, chưa nhận được trợ cấp...)"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Extension Date */}
                                <div>
                                    <label htmlFor="extensionDate" className="block text-sm font-bold text-gray-700 mb-2">
                                        Xin gia hạn đến ngày
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                            <Clock className="w-5 h-5" />
                                        </div>
                                        <input
                                            type="date"
                                            id="extensionDate"
                                            name="extensionDate"
                                            value={formData.extensionDate}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1 italic">Để trống nếu không muốn xin gia hạn.</p>
                                </div>

                                {/* Reduction Amount */}
                                <div>
                                    <label htmlFor="reductionAmount" className="block text-sm font-bold text-gray-700 mb-2">
                                        Số tiền xin giảm (VND)
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                            <DollarSign className="w-5 h-5" />
                                        </div>
                                        <input
                                            type="number"
                                            id="reductionAmount"
                                            name="reductionAmount"
                                            value={formData.reductionAmount}
                                            onChange={handleChange}
                                            placeholder="VD: 500000"
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1 italic">Để trống nếu không muốn xin giảm phí.</p>
                                </div>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full flex justify-center items-center gap-2 px-6 py-4 bg-primary text-white rounded-xl shadow-lg hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 transition-all font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Đang gửi yêu cầu...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            Gửi Yêu Cầu
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
