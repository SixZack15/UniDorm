'use client';

import { useState } from 'react';

export default function ProfilePage() {
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
                            <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-100">
                                <button className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                                    Đổi mật khẩu
                                </button>
                                <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                                    Lưu thay đổi
                                </button>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
