'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { ArrowLeft, Upload } from 'lucide-react';

interface StudentFormData {
    mssv: string;
    fullName: string;
    faculty: string;
    room: string;
    phone: string;
    gender: string;
    birthdate: string;
    status: 'đang ở' | 'chờ duyệt' | 'từ chối';
    relativeName: string;
    relativePhone: string;
    cmnd: string;
    healthCheckupImage: File | null;
}

interface StudentFormProps {
    studentId?: string;
    isEdit?: boolean;
}

export default function StudentForm({ studentId, isEdit = false }: StudentFormProps) {
    const router = useRouter();
    const [formData, setFormData] = useState<StudentFormData>({
        mssv: '',
        fullName: '',
        faculty: '',
        room: '',
        phone: '',
        gender: '',
        birthdate: '',
        status: 'chờ duyệt',
        relativeName: '',
        relativePhone: '',
        cmnd: '',
        healthCheckupImage: null,
    });

    // Load mock data if editing
    useEffect(() => {
        if (isEdit && studentId) {
            // Mock data for editing
            setFormData({
                mssv: '21748020',
                fullName: 'Nguyễn Văn A',
                faculty: 'CNTT',
                room: 'A.304',
                phone: '0901234567',
                gender: 'Nam',
                birthdate: '2003-05-15',
                status: 'đang ở',
                relativeName: 'Nguyễn Văn Ba',
                relativePhone: '0988777666',
                cmnd: '079123456789',
                healthCheckupImage: null,
            });
        }
    }, [isEdit, studentId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({ ...prev, healthCheckupImage: e.target.files![0] }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success(isEdit ? 'Đã cập nhật hồ sơ sinh viên thành công!' : 'Đã thêm hồ sơ sinh viên mới thành công!', {
            duration: 3000,
            icon: '✅',
        });
        setTimeout(() => {
            router.push('/admin/students');
        }, 1500);
    };

    return (
        <div className="space-y-6">
            {/* Breadcrumb */}
            <nav className="flex text-sm text-gray-500">
                <Link href="/admin/students" className="hover:text-primary">Quản lý sinh viên</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-medium">{isEdit ? 'Chỉnh sửa' : 'Thêm mới'}</span>
            </nav>

            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/admin/students" className="text-gray-600 hover:text-primary transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">
                    {isEdit ? 'Chỉnh sửa Hồ sơ Sinh viên' : 'Thêm Hồ sơ Sinh viên Mới'}
                </h1>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* MSSV */}
                    <div>
                        <label htmlFor="mssv" className="block text-sm font-medium text-gray-700 mb-1">
                            MSSV <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="mssv"
                            name="mssv"
                            value={formData.mssv}
                            onChange={handleChange}
                            required
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                        />
                    </div>

                    {/* Họ Tên */}
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                            Họ Tên <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                        />
                    </div>

                    {/* Khoa */}
                    <div>
                        <label htmlFor="faculty" className="block text-sm font-medium text-gray-700 mb-1">
                            Khoa <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="faculty"
                            name="faculty"
                            value={formData.faculty}
                            onChange={handleChange}
                            required
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                        />
                    </div>

                    {/* Phòng */}
                    <div>
                        <label htmlFor="room" className="block text-sm font-medium text-gray-700 mb-1">
                            Phòng
                        </label>
                        <input
                            type="text"
                            id="room"
                            name="room"
                            value={formData.room}
                            onChange={handleChange}
                            placeholder="A.304"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                        />
                    </div>

                    {/* SĐT */}
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            SĐT <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                        />
                    </div>

                    {/* Giới tính */}
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
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                            <option value="Khác">Khác</option>
                        </select>
                    </div>

                    {/* Ngày sinh */}
                    <div>
                        <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700 mb-1">
                            Ngày sinh <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            id="birthdate"
                            name="birthdate"
                            value={formData.birthdate}
                            onChange={handleChange}
                            required
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                        />
                    </div>

                    {/* Tên người thân */}
                    <div>
                        <label htmlFor="relativeName" className="block text-sm font-medium text-gray-700 mb-1">
                            Tên người thân <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="relativeName"
                            name="relativeName"
                            value={formData.relativeName}
                            onChange={handleChange}
                            required
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                        />
                    </div>

                    {/* Số điện thoại người thân */}
                    <div>
                        <label htmlFor="relativePhone" className="block text-sm font-medium text-gray-700 mb-1">
                            Số điện thoại người thân <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="tel"
                            id="relativePhone"
                            name="relativePhone"
                            value={formData.relativePhone}
                            onChange={handleChange}
                            required
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                        />
                    </div>

                    {/* CMND */}
                    <div>
                        <label htmlFor="cmnd" className="block text-sm font-medium text-gray-700 mb-1">
                            CMND/CCCD <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="cmnd"
                            name="cmnd"
                            value={formData.cmnd}
                            onChange={handleChange}
                            required
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                        />
                    </div>
                </div>

                {/* Health Checkup Image */}
                <div>
                    <label htmlFor="healthCheckupImage" className="block text-sm font-medium text-gray-700 mb-1">
                        Ảnh khám sức khỏe
                    </label>
                    <div className="flex items-center justify-center w-full">
                        <label
                            htmlFor="healthCheckupImage"
                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-red-300 border-dashed rounded-xl cursor-pointer bg-red-50 hover:bg-red-100 transition duration-150"
                        >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-red-600">
                                <Upload className="w-6 h-6 mb-2" />
                                <p className="mb-2 text-sm text-red-500">
                                    <span className="font-semibold">Bấm để tải lên</span> hoặc kéo thả
                                </p>
                                <p className="text-xs text-red-500">Chỉ chấp nhận file ảnh (PNG, JPG)</p>
                                {formData.healthCheckupImage && (
                                    <p className="text-xs mt-1 text-red-700 font-medium">
                                        Đã chọn: {formData.healthCheckupImage.name}
                                    </p>
                                )}
                            </div>
                            <input
                                id="healthCheckupImage"
                                name="healthCheckupImage"
                                type="file"
                                className="hidden"
                                onChange={handleFileChange}
                                accept=".jpg,.jpeg,.png"
                            />
                        </label>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-100">
                    <Link
                        href="/admin/students"
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


