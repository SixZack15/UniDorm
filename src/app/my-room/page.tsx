'use client';

import Link from 'next/link';

export default function MyRoomPage() {
    // Mock Data
    const room = {
        number: 'A.304',
        building: 'Khu A',
        floor: 3,
        type: '8 Sinh viên (Nam)',
        bedNumber: '02',
        bedPosition: 'Tầng dưới',
        price: 600000,
        status: 'CHECKED_IN',
        amenities: {
            ac: false,
            wifi: true,
            wc: true,
            cabinet: true,
        },
    };

    const contract = {
        code: '2024-A-304-002',
        startDate: '15/08/2024',
        endDate: '15/06/2025',
        status: 'ACTIVE',
        checkInDate: '15/08/2024',
    };

    const roommates = [
        { name: 'Trần Văn B', role: 'Trưởng phòng', phone: '0909xxxxxx', isMe: false },
        { name: 'Nguyễn Văn A', role: 'Thành viên', phone: '0901xxxxxx', isMe: true },
        { name: 'Lê Văn C', role: 'Thành viên', phone: '217xxxx', isMe: false },
        { name: 'Phạm Văn D', role: 'Thành viên', phone: '217xxxx', isMe: false },
    ];

    return (
        <div className="space-y-6">
            {/* Breadcrumb */}
            <nav className="flex text-sm text-gray-500">
                <Link href="/dashboard" className="hover:text-primary">Trang chủ</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-medium">Quản lý phòng ở</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* LEFT COLUMN: Room & Community (Col 1-8) */}
                <div className="lg:col-span-8 space-y-8">

                    {/* Room Status Card (FR-52) */}
                    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="h-48 bg-gray-200 relative">
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium">
                                [ IMAGE: Room Layout/Photo ]
                            </div>
                            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm">
                                <h2 className="text-xl font-bold text-gray-900">PHÒNG {room.number} ({room.building})</h2>
                                <p className="text-sm text-gray-600">{room.type}</p>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-6 border-b border-gray-100">
                                <div>
                                    <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Vị trí của bạn</p>
                                    <p className="text-2xl font-bold text-primary">Giường số {room.bedNumber} <span className="text-base font-normal text-gray-600">({room.bedPosition})</span></p>
                                </div>
                                <div className="mt-4 md:mt-0 text-right">
                                    <p className="text-sm text-gray-500 mb-1">Trạng thái</p>
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                        ĐÃ CHECK-IN
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-500">Giá niêm yết</p>
                                    <p className="font-medium text-gray-900">{room.price.toLocaleString('vi-VN')} VND/tháng</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Tầng</p>
                                    <p className="font-medium text-gray-900">{room.floor}</p>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-100">
                                <h3 className="text-sm font-bold text-gray-900 mb-3">TIỆN ÍCH PHÒNG</h3>
                                <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <span className={room.amenities.ac ? 'text-green-600' : 'text-gray-400'}>
                                            {room.amenities.ac ? '✓' : '✕'}
                                        </span>
                                        Máy lạnh
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={room.amenities.wifi ? 'text-green-600' : 'text-gray-400'}>
                                            {room.amenities.wifi ? '✓' : '✕'}
                                        </span>
                                        Wifi tốc độ cao
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={room.amenities.wc ? 'text-green-600' : 'text-gray-400'}>
                                            {room.amenities.wc ? '✓' : '✕'}
                                        </span>
                                        WC khép kín
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={room.amenities.cabinet ? 'text-green-600' : 'text-gray-400'}>
                                            {room.amenities.cabinet ? '✓' : '✕'}
                                        </span>
                                        Tủ cá nhân
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Roommate List (FR-52) */}
                    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            DANH SÁCH BẠN CÙNG PHÒNG
                        </h3>
                        <div className="overflow-hidden">
                            <ul className="divide-y divide-gray-100">
                                {roommates.map((mate, index) => (
                                    <li key={index} className="py-3 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                                                {index + 1}
                                            </div>
                                            <div>
                                                <p className={`text-sm font-medium ${mate.isMe ? 'text-primary' : 'text-gray-900'}`}>
                                                    {mate.name} {mate.isMe && '(Bạn)'}
                                                </p>
                                                <p className="text-xs text-gray-500">{mate.role}</p>
                                            </div>
                                        </div>
                                        <span className="text-sm text-gray-600 font-mono">{mate.phone}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>

                </div>

                {/* RIGHT COLUMN: Contract & Actions (Col 9-12) */}
                <div className="lg:col-span-4 space-y-8">

                    {/* Contract Management (FR-23) */}
                    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            QUẢN LÝ HỢP ĐỒNG
                        </h3>

                        <div className="space-y-4 mb-6">
                            <div>
                                <p className="text-xs text-gray-500 uppercase">Mã hợp đồng</p>
                                <p className="font-mono font-medium text-gray-900">{contract.code}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase">Hiệu lực</p>
                                <p className="font-medium text-gray-900">{contract.startDate} - {contract.endDate}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase">Trạng thái</p>
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 mt-1">
                                    HIỆU LỰC
                                </span>
                            </div>
                        </div>

                        <button className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-lg transition-colors shadow-sm mb-2">
                            GIA HẠN HỢP ĐỒNG
                        </button>
                        <p className="text-xs text-center text-gray-500 mb-6">*Gồm tùy chọn xin giảm/hoãn phí</p>

                        <div className="pt-6 border-t border-gray-100">
                            <h4 className="text-xs font-bold text-gray-900 uppercase mb-3">Thủ tục hành chính</h4>
                            <div className="space-y-2">
                                <Link href="/profile" className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors p-2 hover:bg-gray-50 rounded-md">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Cập nhật hồ sơ lưu trú
                                </Link>
                                <Link href="/requests/create?type=incident" className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors p-2 hover:bg-gray-50 rounded-md">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                    Báo cáo sự cố phòng
                                </Link>
                                <Link href="/requests/create?type=leave" className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors p-2 hover:bg-gray-50 rounded-md">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Đăng ký tạm vắng
                                </Link>
                            </div>

                            <div className="mt-6 pt-4 border-t border-gray-100">
                                <button className="w-full border border-red-200 text-red-600 hover:bg-red-50 font-medium py-2 px-4 rounded-lg transition-colors text-sm">
                                    YÊU CẦU TRẢ PHÒNG
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* History Log */}
                    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase">Lịch sử ra vào</h3>
                        <ul className="space-y-3">
                            <li className="flex gap-3 text-sm">
                                <div className="flex-shrink-0 w-2 h-2 mt-1.5 rounded-full bg-green-500"></div>
                                <div>
                                    <p className="font-medium text-gray-900">Check-in (Nhận phòng)</p>
                                    <p className="text-xs text-gray-500">{contract.checkInDate}</p>
                                </div>
                            </li>
                        </ul>
                    </section>

                </div>

            </div>
        </div>
    );
}
