'use client';

import RoomSubscribeForm from '@/components/RoomSubcribeForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function UpdateRoomRegisterPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 py-12 px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb Navigation */}
            <div className="max-w-4xl mx-auto mb-6">
                <nav className="flex items-center text-sm text-gray-600 mb-4">
                    <Link 
                        href="/dashboard" 
                        className="hover:text-primary transition-colors"
                    >
                        Trang chủ
                    </Link>
                    <span className="mx-2">/</span>
                    <Link 
                        href="/profile" 
                        className="hover:text-primary transition-colors"
                    >
                        Hồ sơ cá nhân
                    </Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-900 font-medium">Cập nhật đăng ký phòng</span>
                </nav>

                {/* Back Button */}
                <Link 
                    href="/profile"
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all shadow-sm"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Quay lại hồ sơ
                </Link>
            </div>

            {/* Page Header */}
            <div className="max-w-4xl mx-auto mb-8 text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Cập Nhật Đăng Ký Phòng Ký Túc Xá
                </h1>
                <p className="text-gray-600">
                    Vui lòng điền đầy đủ thông tin để cập nhật đăng ký phòng của bạn
                </p>
            </div>

            {/* Room Subscribe Form */}
            <div className="max-w-4xl mx-auto">
                <RoomSubscribeForm />
            </div>

            {/* Info Notice */}
            <div className="max-w-4xl mx-auto mt-8">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-blue-700">
                                <strong className="font-medium">Lưu ý:</strong> Đây là chức năng cập nhật đăng ký phòng. 
                                Thông tin của bạn sẽ được Ban Quản Lý xem xét và phê duyệt trong vòng 3-5 ngày làm việc.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
