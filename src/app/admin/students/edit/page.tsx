'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import StudentForm from '@/components/StudentForm';

export default function EditStudentPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const studentId = searchParams.get('id') || undefined;
    
    const [checkInStatus, setCheckInStatus] = useState<'CHECKED_IN' | 'CHECKED_OUT'>('CHECKED_IN');

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
        </div>
    );
}
