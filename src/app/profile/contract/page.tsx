'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { subscriptionStorage, RoomSubscription } from '@/utils/subscriptionStorage';
import { FileText, Calendar, User, Home, Download, ArrowLeft, Printer } from 'lucide-react';

export default function ContractPage() {
    const router = useRouter();
    const [subscription, setSubscription] = useState<RoomSubscription | null>(null);
    const [dates, setDates] = useState<{ start: Date; end: Date } | null>(null);

    useEffect(() => {
        const sub = subscriptionStorage.getSubscription();
        if (sub) {
            setSubscription(sub);
            
            // Parse submittedDate (DD/MM/YYYY) or use Date.now()
            let startDate = new Date();
            if (sub.submittedDate) {
                const parts = sub.submittedDate.split('/');
                if (parts.length === 3) {
                    // Note: Month is 0-indexed in JS Date
                    startDate = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
                }
            }
            
            // Calculate end date (30 days ahead)
            const endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + 30);
            
            setDates({ start: startDate, end: endDate });
        } else {
            // Mock data if no subscription found (for demonstration)
            const mockStart = new Date();
            const mockEnd = new Date();
            mockEnd.setDate(mockStart.getDate() + 30);
            
            setDates({ start: mockStart, end: mockEnd });
            
            setSubscription({
                id: 'MOCK-123',
                registrationId: 'REG-MOCK-001',
                roomType: 'Phòng 4 người (Máy lạnh)',
                roomName: 'Phòng 4 người (Máy lạnh)',
                price: 1500000,
                amenities: ['Máy lạnh', 'Wifi', 'WC riêng'],
                status: 'APPROVED',
                statusLabel: 'Đã duyệt',
                submittedDate: mockStart.toLocaleDateString('vi-VN'),
                studentName: 'Nguyễn Văn A',
                phoneNumber: '0901234567',
                parentName: 'Trần Thị B',
                parentPhoneNumber: '0987654321',
                registrationStatus: 'Đang ở'
            });
        }
    }, []);

    if (!subscription || !dates) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 print:bg-white print:p-0">
            {/* Navigation - Hidden when printing */}
            <div className="max-w-4xl mx-auto mb-6 print:hidden">
                <Link href="/profile" className="inline-flex items-center text-gray-600 hover:text-primary transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Quay lại hồ sơ
                </Link>
            </div>

            <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200 print:shadow-none print:border-none">
                {/* Header */}
                <div className="bg-primary text-white p-8 text-center print:bg-white print:text-black print:border-b print:border-gray-300">
                    <div className="flex justify-center mb-4 print:hidden">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                            <FileText className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold uppercase tracking-wide">Hợp Đồng Thuê Chỗ Ở Ký Túc Xá</h1>
                    <p className="mt-2 opacity-90 print:text-gray-600">Số: {subscription.registrationId}/HĐ-KTX</p>
                </div>

                <div className="p-8 md:p-12 space-y-8">
                    {/* Parties Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2 flex items-center gap-2">
                                <Home className="w-5 h-5 text-primary" />
                                Bên Cho Thuê (Bên A)
                            </h3>
                            <div className="text-sm space-y-2 text-gray-600">
                                <p><span className="font-semibold text-gray-900">Đơn vị:</span> Ban Quản Lý Ký Túc Xá UniDorm</p>
                                <p><span className="font-semibold text-gray-900">Đại diện:</span> Ông Trần Văn Quản Lý</p>
                                <p><span className="font-semibold text-gray-900">Chức vụ:</span> Trưởng Ban Quản Lý</p>
                                <p><span className="font-semibold text-gray-900">Địa chỉ:</span> Khu A, Đại học Văn Lang</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2 flex items-center gap-2">
                                <User className="w-5 h-5 text-primary" />
                                Bên Thuê (Bên B)
                            </h3>
                            <div className="text-sm space-y-2 text-gray-600">
                                <p><span className="font-semibold text-gray-900">Họ và tên:</span> {subscription.studentName}</p>
                                <p><span className="font-semibold text-gray-900">Số điện thoại:</span> {subscription.phoneNumber}</p>
                                <p><span className="font-semibold text-gray-900">Người giám hộ:</span> {subscription.parentName}</p>
                                <p><span className="font-semibold text-gray-900">SĐT Người giám hộ:</span> {subscription.parentPhoneNumber}</p>
                            </div>
                        </div>
                    </div>

                    {/* Contract Details */}
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 print:bg-white print:border-gray-300">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-primary" />
                            Chi Tiết Hợp Đồng
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Loại phòng</p>
                                <p className="font-bold text-gray-900 text-lg">{subscription.roomName}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Giá thuê</p>
                                <p className="font-bold text-primary text-lg">{subscription.price.toLocaleString('vi-VN')} VND/tháng</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Ngày bắt đầu</p>
                                <p className="font-medium text-gray-900">{formatDate(dates.start)}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Ngày kết thúc (Dự kiến)</p>
                                <p className="font-medium text-gray-900">{formatDate(dates.end)}</p>
                            </div>
                            <div className="md:col-span-2">
                                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Tiện nghi bao gồm</p>
                                <div className="flex flex-wrap gap-2">
                                    {subscription.amenities.map((item, idx) => (
                                        <span key={idx} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-gray-800 border border-gray-200">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Terms */}
                    <div className="text-sm text-gray-600 space-y-4 text-justify">
                        <h4 className="font-bold text-gray-900">Điều 1: Trách nhiệm của Bên A</h4>
                        <p>Bên A có trách nhiệm bàn giao chỗ ở cùng các trang thiết bị đi kèm trong tình trạng sử dụng tốt. Đảm bảo an ninh trật tự, điện nước sinh hoạt cho Bên B.</p>
                        
                        <h4 className="font-bold text-gray-900">Điều 2: Trách nhiệm của Bên B</h4>
                        <p>Bên B cam kết sử dụng chỗ ở đúng mục đích, giữ gìn vệ sinh chung và bảo quản tài sản. Thanh toán tiền thuê và các chi phí dịch vụ đúng hạn.</p>
                        
                        <h4 className="font-bold text-gray-900">Điều 3: Chấm dứt hợp đồng</h4>
                        <p>Hợp đồng này có hiệu lực kể từ ngày ký. Một trong hai bên có quyền chấm dứt hợp đồng trước thời hạn nhưng phải thông báo bằng văn bản cho bên kia trước ít nhất 15 ngày.</p>
                    </div>

                    {/* Signatures */}
                    <div className="grid grid-cols-2 gap-8 pt-8 mt-8 border-t border-gray-200">
                        <div className="text-center">
                            <p className="font-bold text-gray-900 mb-16">Đại diện Bên A</p>
                            <p className="text-sm text-gray-500">(Ký và ghi rõ họ tên)</p>
                        </div>
                        <div className="text-center">
                            <p className="font-bold text-gray-900 mb-16">Đại diện Bên B</p>
                            <p className="font-bold text-gray-900">{subscription.studentName}</p>
                        </div>
                    </div>
                </div>

                {/* Footer Actions - Hidden when printing */}
                <div className="bg-gray-50 px-8 py-6 border-t border-gray-200 flex justify-end gap-4 print:hidden">
                    <button 
                        onClick={() => window.print()}
                        className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium shadow-sm"
                    >
                        <Printer className="w-4 h-4" />
                        In hợp đồng
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-red-700 transition-colors font-medium shadow-sm">
                        <Download className="w-4 h-4" />
                        Tải xuống PDF
                    </button>
                </div>
            </div>
        </div>
    );
}
