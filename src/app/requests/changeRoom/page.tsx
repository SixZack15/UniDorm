'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { subscriptionStorage, ROOM_TYPES } from '@/utils/subscriptionStorage';
import { RefreshCw, AlertTriangle, ArrowLeft, Send } from 'lucide-react';

export default function ChangeRoomPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        reason: '',
        desiredRoom: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        // Check if user has a subscription
        const sub = subscriptionStorage.getSubscription();
        if (!sub) {
            toast.error('Bạn chưa đăng ký phòng nào!');
            router.push('/dashboard');
            return;
        }

        // Check if there is an existing request
        const existingRequest = subscriptionStorage.getChangeRoomRequest();
        if (existingRequest) {
            setFormData({
                reason: existingRequest.reason,
                desiredRoom: existingRequest.desiredRoom,
            });
        }
    }, [router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.reason.trim()) {
            toast.error('Vui lòng nhập lý do!');
            return;
        }

        if (!formData.desiredRoom) {
            toast.error('Vui lòng chọn loại phòng mong muốn!');
            return;
        }

        setIsSubmitting(true);

        // Save to localStorage
        const request = {
            id: `REQ-CR-${Date.now()}`,
            reason: formData.reason,
            desiredRoom: formData.desiredRoom,
            status: 'Đang đợi' as const,
            submittedDate: new Date().toLocaleDateString('vi-VN'),
        };

        subscriptionStorage.saveChangeRoomRequest(request);

        // Simulate API call
        setTimeout(() => {
            toast.success('Đã gửi yêu cầu chuyển phòng thành công!', {
                duration: 4000,
                icon: '🔄',
            });
            
            setTimeout(() => {
                router.push('/profile');
            }, 2000);
        }, 1500);
    };

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
                            <RefreshCw className="w-8 h-8 text-primary" />
                            Xin Chuyển Phòng
                        </h1>
                        <p className="mt-2 text-gray-600">Gửi yêu cầu chuyển sang loại phòng khác hoặc phòng cụ thể.</p>
                    </div>

                    <div className="p-8">
                        {/* Conditions */}
                        <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-100 mb-8">
                            <h3 className="font-bold text-yellow-800 flex items-center gap-2 mb-2">
                                <AlertTriangle className="w-5 h-5" />
                                Điều kiện chuyển phòng:
                            </h3>
                            <ul className="list-disc list-inside text-sm text-yellow-700 space-y-1">
                                <li>Đã ở tối thiểu 1 tháng tại phòng hiện tại.</li>
                                <li>Không nợ phí lưu trú hoặc các khoản phạt.</li>
                                <li>Phòng muốn chuyển đến còn chỗ trống.</li>
                                <li>Phí chuyển phòng: <strong>50.000 VND</strong> (trừ vào tài khoản).</li>
                            </ul>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Desired Room */}
                            <div>
                                <label htmlFor="desiredRoom" className="block text-sm font-bold text-gray-700 mb-2">
                                    Loại phòng mong muốn <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="desiredRoom"
                                    name="desiredRoom"
                                    value={formData.desiredRoom}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                                    required
                                >
                                    <option value="">-- Chọn loại phòng --</option>
                                    {ROOM_TYPES.map(room => (
                                        <option key={room.id} value={room.name}>
                                            {room.name} - {room.price.toLocaleString('vi-VN')} VND
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Reason */}
                            <div>
                                <label htmlFor="reason" className="block text-sm font-bold text-gray-700 mb-2">
                                    Lý do chuyển phòng <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="reason"
                                    name="reason"
                                    rows={4}
                                    value={formData.reason}
                                    onChange={handleChange}
                                    placeholder="Vui lòng trình bày rõ lý do (VD: Ồn ào, muốn ở cùng bạn, giá phòng không phù hợp...)"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                                    required
                                />
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
