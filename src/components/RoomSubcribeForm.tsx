'use client'

import React, { useState } from 'react';
import { User, Calendar, Phone, Stethoscope, Upload, Home, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { subscriptionStorage, ROOM_TYPES, generateRegistrationId, formatDate, RoomSubscription } from '@/utils/subscriptionStorage';

interface FormData {
  name: string;
  birthdate: string;
  phoneNumber: string;
  cmnd: string;
  healthCheckupImage: File | null;
  parentName: string;
  parentPhoneNumber: string;
  parentCmnd: string;
  roomType: string;
}

const RoomSubscribeForm: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    birthdate: '',
    phoneNumber: '',
    cmnd: '',
    healthCheckupImage: null,
    parentName: '',
    parentPhoneNumber: '',
    parentCmnd: '',
    roomType: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (e.target instanceof HTMLInputElement && e.target.files) {
      setFormData({
        ...formData,
        healthCheckupImage: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.roomType) {
      toast.error('Vui lòng chọn loại phòng!');
      return;
    }

    const selectedRoom = ROOM_TYPES.find(room => room.name === formData.roomType);
    
    if (!selectedRoom) {
      toast.error('Loại phòng không hợp lệ!');
      return;
    }

    const subscription: RoomSubscription = {
      id: generateRegistrationId(),
      registrationId: generateRegistrationId(),
      roomType: selectedRoom.name,
      roomName: selectedRoom.name,
      price: selectedRoom.price,
      amenities: selectedRoom.amenities,
      status: 'PENDING',
      statusLabel: 'Chờ duyệt',
      submittedDate: formatDate(),
      studentName: formData.name,
      phoneNumber: formData.phoneNumber,
      parentName: formData.parentName,
      parentPhoneNumber: formData.parentPhoneNumber,
      registrationStatus: 'Chờ duyệt',
    };

    subscriptionStorage.saveSubscription(subscription);
    
    toast.success('Đăng ký thành công! Đang chuyển hướng...', {
      duration: 2000,
      icon: '✅',
    });
    
    setTimeout(() => {
      router.push('/dashboard');
    }, 2000);
  };

  const InputField: React.FC<{
    icon: React.ReactNode;
    label: string;
    name: keyof FormData;
    type: string;
    placeholder: string;
    required?: boolean;
    accept?: string;
  }> = ({ icon, label, name, type, placeholder, required = true, accept }) => (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      {type === 'file' ? (
        <div className="flex items-center justify-center w-full">
          <label 
            htmlFor={name}
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-red-300 border-dashed rounded-xl cursor-pointer bg-red-50 hover:bg-red-100 transition duration-150"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-red-600">
              <Upload className="w-6 h-6 mb-2" />
              <p className="mb-2 text-sm text-red-500">
                <span className="font-semibold">Bấm để tải lên</span> hoặc kéo thả
              </p>
              <p className="text-xs text-red-500">Chỉ chấp nhận file ảnh (PNG, JPG)</p>
              {formData.healthCheckupImage && (
                  <p className="text-xs mt-1 text-red-700 font-medium">Đã chọn: {formData.healthCheckupImage.name}</p>
              )}
            </div>
            <input 
              id={name} 
              name={name} 
              type="file" 
              className="hidden" 
              onChange={handleChange} 
              required={required} 
              accept={accept}
            />
          </label>
        </div>
      ) : (
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-red-500">
            {icon}
          </span>
          <input
            id={name}
            name={name}
            type={type}
            value={formData[name] as string}
            onChange={handleChange}
            required={required}
            placeholder={placeholder}
            className="w-full pl-10 pr-4 py-2 border border-red-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-150"
          />
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-2xl rounded-3xl border-t-4 border-red-600">
      <h2 className="text-3xl font-bold text-center text-red-700 mb-6 flex items-center justify-center">
        <Home className="w-8 h-8 mr-2" /> Đăng Ký Ký Túc Xá
      </h2>
      <p className="text-center text-gray-500 mb-8">
        Vui lòng điền đầy đủ và chính xác thông tin cá nhân.
      </p>

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-red-600 border-b pb-2 mb-4">Chọn loại phòng</h3>
          <label htmlFor="roomType" className="block text-sm font-medium text-gray-700 mb-1">
            Loại phòng <span className="text-red-600">*</span>
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-red-500">
              <Home className="w-5 h-5" />
            </span>
            <select
              id="roomType"
              name="roomType"
              value={formData.roomType}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2 border border-red-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-150 bg-white"
            >
              <option value="">-- Chọn loại phòng --</option>
              {ROOM_TYPES.map((room) => (
                <option key={room.id} value={room.name}>
                  {room.name} - {room.price.toLocaleString('vi-VN')} VND/tháng
                </option>
              ))}
            </select>
          </div>
          
          {formData.roomType && (
            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm font-medium text-blue-900 mb-1">Tiện nghi:</p>
              <div className="flex flex-wrap gap-1.5">
                {ROOM_TYPES.find(r => r.name === formData.roomType)?.amenities.map((amenity, idx) => (
                  <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <h3 className="text-xl font-semibold text-red-600 border-b pb-2 mb-4">Thông tin Cá nhân</h3>
        <InputField 
          icon={<User className="w-5 h-5" />}
          label="Họ và Tên"
          name="name"
          type="text"
          placeholder="Nguyễn Văn A"
        />
        <InputField 
          icon={<Calendar className="w-5 h-5" />}
          label="Ngày sinh"
          name="birthdate"
          type="date"
          placeholder="dd/mm/yyyy"
        />
        <InputField 
          icon={<Phone className="w-5 h-5" />}
          label="Số điện thoại cá nhân"
          name="phoneNumber"
          type="tel"
          placeholder="090 123 4567"
        />
        <InputField 
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" /></svg>}
          label="CMND/CCCD"
          name="cmnd"
          type="text"
          placeholder="079123456789"
        />

        <h3 className="text-xl font-semibold text-red-600 border-b pb-2 mb-4 pt-4">Tài liệu Bổ sung</h3>
        <InputField 
          icon={<Stethoscope className="w-5 h-5" />}
          label="Kết quả khám sức khỏe gần nhất (Ảnh)"
          name="healthCheckupImage"
          type="file"
          placeholder="Tải lên ảnh"
          accept=".jpg, .jpeg, .png"
        />

        <h3 className="text-xl font-semibold text-red-600 border-b pb-2 mb-4 pt-4">Thông tin Người giám hộ</h3>
        <InputField 
          icon={<User className="w-5 h-5" />}
          label="Họ và Tên Phụ huynh/Người giám hộ"
          name="parentName"
          type="text"
          placeholder="Trần Thị B"
        />
        <InputField 
          icon={<Phone className="w-5 h-5" />}
          label="Số điện thoại Phụ huynh/Người giám hộ"
          name="parentPhoneNumber"
          type="tel"
          placeholder="098 765 4321"
        />
        <InputField 
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" /></svg>}
          label="CMND/CCCD Phụ huynh/Người giám hộ"
          name="parentCmnd"
          type="text"
          placeholder="079987654321"
        />

        <button
          type="submit"
          className="w-full flex justify-center items-center px-4 py-3 border border-transparent text-lg font-medium rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50 transition duration-300 ease-in-out mt-8"
        >
          Gửi Đăng Ký <ArrowRight className="ml-2 w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default RoomSubscribeForm;