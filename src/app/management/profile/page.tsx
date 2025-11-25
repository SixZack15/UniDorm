'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';

export default function ManagementProfilePage() {
    const router = useRouter();

    // Mock Data - Management profile
    const [user, setUser] = useState({
        fullName: 'Nguyễn Văn Quản Lý',
        employeeId: 'MGT001',
        vluEmail: 'quanly@vanlanguni.vn',
        department: 'Ban Quản Lý Phòng',
        position: 'Quản lý phòng',
        status: 'Đang hoạt động',
        phone: '0901234567',
        personalEmail: 'quanly@gmail.com',
        address: '123 Đường số 5, Phường 7, Gò Vấp, TP.HCM',
        emergencyName: 'Nguyễn Văn Ba',
        emergencyRelationship: 'Người thân',
        emergencyPhone: '0988777666',
    });

    const handleLogout = () => {
        localStorage.removeItem('userRole');
        toast.success('Đã đăng xuất thành công!', {
            duration: 2000,
            icon: '✅',
        });
        setTimeout(() => {
            router.push('/');
        }, 2000);
    };

    const handleSaveChanges = () => {
        toast.success('Đã lưu thay đổi thành công!', {
            duration: 2000,
            icon: '✅',
        });
        setTimeout(() => {
            router.push('/management/dashboard');
        }, 2000);
    };

    return (
        <div className="space-y-6">
            <Toaster position="top-right" />
            
            {/* Breadcrumb */}
            <nav className="flex text-sm text-gray-500">
                <Link href="/management/dashboard" className="hover:text-primary">Trang chủ</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-medium">Hồ sơ quản lý</span>
            </nav>

            <div className="grid grid-cols-1 lg:col-span-12 gap-8">
                {/* LEFT COLUMN: Identity Card */}
                <div className="lg:col-span-4 xl:col-span-3">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center sticky top-24">
                        <div className="relative mb-4">
                            <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center text-4xl font-bold text-primary border-4 border-white shadow-lg">
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
                        <p className="text-gray-500 font-mono text-sm mt-1">{user.employeeId}</p>

                        <div className="mt-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                {user.status}
                            </span>
                        </div>

                        <div className="w-full border-t border-gray-100 my-6"></div>

                        <div className="w-full text-left space-y-3 text-sm">
                            <div>
                                <p className="text-gray-500 text-xs uppercase tracking-wider">Phòng ban</p>
                                <p className="font-medium text-gray-900">{user.department}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 text-xs uppercase tracking-wider">Chức vụ</p>
                                <p className="font-medium text-gray-900">{user.position}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Profile Form */}
                <div className="lg:col-span-8 xl:col-span-9">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                            <h3 className="font-bold text-gray-900 text-lg">THÔNG TIN TÀI KHOẢN QUẢN LÝ</h3>
                        </div>

                        <div className="p-6 space-y-8">
                            {/* Section 1: Employee Info */}
                            <section>
                                <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">
                                    1. Thông tin nhân viên <span className="text-gray-400 font-normal normal-case ml-2">(Không thể chỉnh sửa)</span>
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Mã nhân viên</label>
                                        <input
                                            type="text"
                                            value={user.employeeId}
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
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phòng ban</label>
                                        <input
                                            type="text"
                                            value={user.department}
                                            disabled
                                            className="block w-full rounded-md border-gray-300 bg-gray-100 text-gray-500 shadow-sm focus:border-primary focus:ring-primary sm:text-sm cursor-not-allowed"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Chức vụ</label>
                                        <input
                                            type="text"
                                            value={user.position}
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

                            {/* Actions */}
                            <div className="flex items-center justify-between gap-4 pt-6 border-t border-gray-100">
                                <button
                                    onClick={handleLogout}
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
        </div>
    );
}


