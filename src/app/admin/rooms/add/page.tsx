'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';

interface RoomFormData {
    roomNumber: string;
    building: string;
    price: string;
    bedCounts: string;
    gender: string;
    state: 'ready' | 'full' | 'maintenance';
}

export default function AddRoomPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const roomId = searchParams.get('id');
    const isEdit = !!roomId;

    const [formData, setFormData] = useState<RoomFormData>({
        roomNumber: '',
        building: '',
        price: '',
        bedCounts: '',
        gender: '',
        state: 'ready',
    });

    // Load mock data if editing
    useEffect(() => {
        if (isEdit && roomId) {
            // Mock data for editing
            setFormData({
                roomNumber: 'A.101',
                building: 'Khu A',
                price: '600000',
                bedCounts: '8',
                gender: 'NAM',
                state: 'ready',
            });
        }
    }, [isEdit, roomId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success(isEdit ? 'Đã cập nhật phòng thành công!' : 'Đã thêm phòng mới thành công!', {
            duration: 3000,
            icon: '✅',
        });
        setTimeout(() => {
            router.push('/admin/rooms');
        }, 1500);
    };

    return (
        <div className="space-y-6">
            <Toaster position="top-right" />
            
            {/* Breadcrumb */}
            <nav className="flex text-sm text-gray-500">
                <Link href="/admin/rooms" className="hover:text-primary">Quản lý phòng</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-medium">{isEdit ? 'Chỉnh sửa' : 'Thêm mới'}</span>
            </nav>

            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/admin/rooms" className="text-gray-600 hover:text-primary transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">
                    {isEdit ? 'Chỉnh sửa Phòng' : 'Thêm Phòng Mới'}
                </h1>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Room Number */}
                    <div>
                        <label htmlFor="roomNumber" className="block text-sm font-medium text-gray-700 mb-1">
                            Số phòng <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="roomNumber"
                            name="roomNumber"
                            value={formData.roomNumber}
                            onChange={handleChange}
                            required
                            placeholder="A.101"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                        />
                    </div>

                    {/* Building */}
                    <div>
                        <label htmlFor="building" className="block text-sm font-medium text-gray-700 mb-1">
                            Tòa nhà <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="building"
                            name="building"
                            value={formData.building}
                            onChange={handleChange}
                            required
                            placeholder="Khu A"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                            Giá phòng (VND) <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            placeholder="600000"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                        />
                    </div>

                    {/* Bed Counts */}
                    <div>
                        <label htmlFor="bedCounts" className="block text-sm font-medium text-gray-700 mb-1">
                            Số giường <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            id="bedCounts"
                            name="bedCounts"
                            value={formData.bedCounts}
                            onChange={handleChange}
                            required
                            min="1"
                            placeholder="8"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                        />
                    </div>

                    {/* Gender */}
                    <div>
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                            Giới tính <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                        >
                            <option value="">-- Chọn giới tính --</option>
                            <option value="NAM">Nam</option>
                            <option value="NỮ">Nữ</option>
                        </select>
                    </div>

                    {/* State */}
                    <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                            Trạng thái <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            required
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                        >
                            <option value="ready">Sẵn sàng</option>
                            <option value="full">Đã đầy</option>
                            <option value="maintenance">Bảo trì</option>
                        </select>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-100">
                    <Link
                        href="/admin/rooms"
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                        Hủy
                    </Link>
                    <button
                        type="submit"
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                        Lưu
                    </button>
                </div>
            </form>
        </div>
    );
}


