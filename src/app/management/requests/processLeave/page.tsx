'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';

export default function ProcessLeavePage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const requestId = searchParams.get('id');

    // Mock data from profile page
    const [studentData] = useState({
        fullName: 'Phạm Văn D',
        mssv: '21700001',
        vluEmail: 'van.d@vanlanguni.vn',
        faculty: 'Kiến Trúc',
        class: 'K27-KT1',
        phone: '0999888777',
        personalEmail: 'phamvand@gmail.com',
        gender: 'Nam',
        birthdate: '2003-08-20',
        address: '456 Đường số 10, Phường 5, Quận 3, TP.HCM',
        emergencyName: 'Phạm Văn E',
        emergencyRelationship: 'Cha',
        emergencyPhone: '0988777666',
    });

    const [formData, setFormData] = useState({
        reason: 'Tốt nghiệp sớm, cần trả phòng',
        status: 'đang duyệt',
    });

    useEffect(() => {
        // Load request data based on ID if needed
        if (requestId) {
            // In a real app, fetch request data here
        }
    }, [requestId]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success('Đã cập nhật trạng thái yêu cầu thành công!', {
            duration: 3000,
            icon: '✅',
        });
        setTimeout(() => {
            router.push('/management/requests');
        }, 1500);
    };

    return (
        <div className="space-y-6">
            <Toaster position="top-right" />
            
            {/* Breadcrumb */}
            <nav className="flex text-sm text-gray-500">
                <Link href="/management/requests" className="hover:text-primary">Yêu cầu</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-medium">Xử lý yêu cầu trả phòng</span>
            </nav>

            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/management/requests" className="text-gray-600 hover:text-primary transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Xử lý Yêu cầu Trả phòng</h1>
            </div>

            {/* Form Panel */}
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
                {/* Student Information Panel */}
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Thông tin Sinh viên</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">Họ và Tên</label>
                            <p className="text-sm font-medium text-gray-900">{studentData.fullName}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">MSSV</label>
                            <p className="text-sm font-medium text-gray-900">{studentData.mssv}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">Giới tính</label>
                            <p className="text-sm font-medium text-gray-900">{studentData.gender}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">Ngày sinh</label>
                            <p className="text-sm font-medium text-gray-900">{studentData.birthdate}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">Khoa</label>
                            <p className="text-sm font-medium text-gray-900">{studentData.faculty}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">Lớp</label>
                            <p className="text-sm font-medium text-gray-900">{studentData.class}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">SĐT</label>
                            <p className="text-sm font-medium text-gray-900">{studentData.phone}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                            <p className="text-sm font-medium text-gray-900">{studentData.personalEmail}</p>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-500 mb-1">Địa chỉ</label>
                            <p className="text-sm font-medium text-gray-900">{studentData.address}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">Người thân</label>
                            <p className="text-sm font-medium text-gray-900">{studentData.emergencyName} ({studentData.emergencyRelationship})</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">SĐT người thân</label>
                            <p className="text-sm font-medium text-gray-900">{studentData.emergencyPhone}</p>
                        </div>
                    </div>
                </div>

                {/* Reason */}
                <div>
                    <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
                        Lý do yêu cầu <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="reason"
                        name="reason"
                        value={formData.reason}
                        onChange={handleChange}
                        rows={4}
                        required
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    />
                </div>

                {/* Status Dropdown */}
                <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                        Trạng thái <span className="text-red-500">*</span>
                    </label>
                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    >
                        <option value="đang duyệt">Đang duyệt</option>
                        <option value="đã duyệt">Đã duyệt</option>
                        <option value="từ chối">Từ chối</option>
                    </select>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-100">
                    <Link
                        href="/management/requests"
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                        Hủy
                    </Link>
                    <button
                        type="submit"
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                        Xác nhận
                    </button>
                </div>
            </form>
        </div>
    );
}


