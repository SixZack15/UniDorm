'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { ArrowLeft, Plus, Trash2, Edit2, Save, X } from 'lucide-react';

export default function EditRoomPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const roomId = searchParams.get('id') || 'A.101';

    // Mock room data
    const [roomData, setRoomData] = useState({
        id: roomId,
        building: 'Khu A',
        type: '8 Giường',
        price: '600.000',
        gender: 'NAM',
        maxCapacity: 8,
        status: 'ready' as 'ready' | 'maintenance',
    });

    // Mock students with status "đã duyệt" from admin/students
    const [availableStudents] = useState([
        {
            id: '21748020',
            name: 'Nguyễn Văn A',
            faculty: 'CNTT',
            phone: '0901234567',
            status: 'Đã duyệt',
        },
        {
            id: '22711005',
            name: 'Trần Thị B',
            faculty: 'Du Lịch',
            phone: '0912345678',
            status: 'Đã duyệt',
        },
        {
            id: '21700001',
            name: 'Phạm Văn D',
            faculty: 'Kiến Trúc',
            phone: '0999888777',
            status: 'Đã duyệt',
        },
        {
            id: '21748025',
            name: 'Võ Văn F',
            faculty: 'CNTT',
            phone: '0987654321',
            status: 'Đã duyệt',
        },
    ]);

    // Current students in the room
    const [roomStudents, setRoomStudents] = useState([
        {
            id: '21748020',
            name: 'Nguyễn Văn A',
            faculty: 'CNTT',
            phone: '0901234567',
            mssv: '21748020',
        },
        {
            id: '22711005',
            name: 'Trần Thị B',
            faculty: 'Du Lịch',
            phone: '0912345678',
            mssv: '22711005',
        },
    ]);

    // Room items (furniture, appliances, etc.)
    const [roomItems, setRoomItems] = useState([
        {
            id: 'item-1',
            title: 'Điều hòa',
        },
        {
            id: 'item-2',
            title: 'Ấm đun nước',
        },
    ]);

    const [newItemTitle, setNewItemTitle] = useState('');
    const [editingItemId, setEditingItemId] = useState<string | null>(null);
    const [editItemTitle, setEditItemTitle] = useState('');

    // Filter available students (not already in room)
    const getAvailableStudents = () => {
        const roomStudentIds = roomStudents.map(s => s.id);
        return availableStudents.filter(s => !roomStudentIds.includes(s.id));
    };

    const handleAddStudent = (student: typeof availableStudents[0]) => {
        if (roomStudents.length >= roomData.maxCapacity) {
            toast.error('Phòng đã đầy!', {
                duration: 2000,
                icon: '⚠️',
            });
            return;
        }

        setRoomStudents(prev => [...prev, {
            id: student.id,
            name: student.name,
            faculty: student.faculty,
            phone: student.phone,
            mssv: student.id,
        }]);

        toast.success(`Đã thêm ${student.name} vào phòng!`, {
            duration: 2000,
            icon: '✅',
        });
    };

    const handleRemoveStudent = (studentId: string) => {
        const student = roomStudents.find(s => s.id === studentId);
        if (student && confirm(`Bạn có chắc chắn muốn xóa ${student.name} khỏi phòng?`)) {
            setRoomStudents(prev => prev.filter(s => s.id !== studentId));
            toast.success(`Đã xóa ${student.name} khỏi phòng!`, {
                duration: 2000,
                icon: '✅',
            });
        }
    };

    // Room Items Handlers
    const handleAddItem = () => {
        if (!newItemTitle.trim()) {
            toast.error('Vui lòng nhập tên vật dụng!', {
                duration: 2000,
                icon: '⚠️',
            });
            return;
        }

        const newItem = {
            id: `item-${Date.now()}`,
            title: newItemTitle.trim(),
        };

        setRoomItems(prev => [...prev, newItem]);
        setNewItemTitle('');
        toast.success(`Đã thêm ${newItem.title}!`, {
            duration: 2000,
            icon: '✅',
        });
    };

    const handleStartEditItem = (itemId: string) => {
        const item = roomItems.find(i => i.id === itemId);
        if (item) {
            setEditingItemId(itemId);
            setEditItemTitle(item.title);
        }
    };

    const handleSaveEditItem = () => {
        if (!editItemTitle.trim()) {
            toast.error('Vui lòng nhập tên vật dụng!', {
                duration: 2000,
                icon: '⚠️',
            });
            return;
        }

        setRoomItems(prev => prev.map(item =>
            item.id === editingItemId
                ? { ...item, title: editItemTitle.trim() }
                : item
        ));
        setEditingItemId(null);
        setEditItemTitle('');
        toast.success('Đã cập nhật vật dụng!', {
            duration: 2000,
            icon: '✅',
        });
    };

    const handleCancelEditItem = () => {
        setEditingItemId(null);
        setEditItemTitle('');
    };

    const handleDeleteItem = (itemId: string) => {
        const item = roomItems.find(i => i.id === itemId);
        if (item && confirm(`Bạn có chắc chắn muốn xóa ${item.title}?`)) {
            setRoomItems(prev => prev.filter(i => i.id !== itemId));
            toast.success(`Đã xóa ${item.title}!`, {
                duration: 2000,
                icon: '✅',
            });
        }
    };

    return (
        <div className="space-y-6">
            <Toaster position="top-right" />
            
            {/* Breadcrumb */}
            <nav className="flex text-sm text-gray-500">
                <Link href="/management/rooms" className="hover:text-primary">Quản lý phòng</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-medium">Chỉnh sửa phòng {roomData.id}</span>
            </nav>

            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/management/rooms" className="text-gray-600 hover:text-primary transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Quản lý Phòng {roomData.id}</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        {roomData.building} • {roomData.type} • {roomData.price} đ • {roomData.gender}
                    </p>
                </div>
            </div>

            {/* Room Info Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div>
                        <p className="text-xs text-gray-500 uppercase mb-1">Sức chứa</p>
                        <p className="text-2xl font-bold text-gray-900">
                            {roomStudents.length}/{roomData.maxCapacity}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase mb-1">Chỗ trống</p>
                        <p className="text-2xl font-bold text-green-600">
                            {roomData.maxCapacity - roomStudents.length}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase mb-1">Tỷ lệ lấp đầy</p>
                        <p className="text-2xl font-bold text-blue-600">
                            {Math.round((roomStudents.length / roomData.maxCapacity) * 100)}%
                        </p>
                    </div>
                </div>
                <div className="border-t border-gray-200 pt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Trạng thái phòng
                    </label>
                    <select
                        value={roomData.status}
                        onChange={(e) => {
                            setRoomData(prev => ({
                                ...prev,
                                status: e.target.value as 'ready' | 'maintenance'
                            }));
                            toast.success(`Đã cập nhật trạng thái phòng thành "${e.target.value === 'ready' ? 'Sẵn sàng' : 'Bảo trì'}"!`, {
                                duration: 2000,
                                icon: '✅',
                            });
                        }}
                        className="block w-full md:w-auto rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    >
                        <option value="ready">Sẵn sàng</option>
                        <option value="maintenance">Bảo trì</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Current Students in Room */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                        <h2 className="font-bold text-gray-900">Sinh viên trong phòng ({roomStudents.length})</h2>
                    </div>
                    <div className="p-6">
                        {roomStudents.length > 0 ? (
                            <div className="space-y-3">
                                {roomStudents.map((student) => (
                                    <div
                                        key={student.id}
                                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                                    >
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900">{student.name}</p>
                                            <p className="text-sm text-gray-500">MSSV: {student.mssv} • {student.faculty}</p>
                                            <p className="text-xs text-gray-400">SĐT: {student.phone}</p>
                                        </div>
                                        <button
                                            onClick={() => handleRemoveStudent(student.id)}
                                            className="ml-4 p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded transition-colors"
                                            title="Xóa khỏi phòng"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                <p>Chưa có sinh viên nào trong phòng</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Available Students to Add */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                        <h2 className="font-bold text-gray-900">Sinh viên có thể thêm</h2>
                        <p className="text-xs text-gray-500 mt-1">Chỉ hiển thị sinh viên có trạng thái "Đã duyệt"</p>
                    </div>
                    <div className="p-6">
                        {getAvailableStudents().length > 0 ? (
                            <div className="space-y-3">
                                {getAvailableStudents().map((student) => (
                                    <div
                                        key={student.id}
                                        className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors"
                                    >
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900">{student.name}</p>
                                            <p className="text-sm text-gray-500">MSSV: {student.id} • {student.faculty}</p>
                                            <p className="text-xs text-gray-400">SĐT: {student.phone}</p>
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 mt-1">
                                                {student.status}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => handleAddStudent(student)}
                                            disabled={roomStudents.length >= roomData.maxCapacity}
                                            className="ml-4 p-2 text-primary hover:text-primary-dark hover:bg-primary/10 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            title="Thêm vào phòng"
                                        >
                                            <Plus className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                <p>Không còn sinh viên nào có thể thêm</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Room Items Panel */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                    <h2 className="font-bold text-gray-900">Vật dụng trong phòng ({roomItems.length})</h2>
                    <p className="text-xs text-gray-500 mt-1">Quản lý các vật dụng như điều hòa, ấm đun nước, v.v.</p>
                </div>
                <div className="p-6 space-y-4">
                    {/* Add New Item Form */}
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <h3 className="font-medium text-gray-900 mb-3">Thêm vật dụng mới</h3>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newItemTitle}
                                onChange={(e) => setNewItemTitle(e.target.value)}
                                placeholder="VD: Điều hòa, Ấm đun nước, Tủ lạnh..."
                                className="flex-1 block rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        handleAddItem();
                                    }
                                }}
                            />
                            <button
                                onClick={handleAddItem}
                                className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                                Thêm
                            </button>
                        </div>
                    </div>

                    {/* Items List */}
                    {roomItems.length > 0 ? (
                        <div className="space-y-3">
                            {roomItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                                >
                                    {editingItemId === item.id ? (
                                        // Edit Mode
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={editItemTitle}
                                                onChange={(e) => setEditItemTitle(e.target.value)}
                                                className="flex-1 block rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                                onKeyPress={(e) => {
                                                    if (e.key === 'Enter') {
                                                        handleSaveEditItem();
                                                    }
                                                }}
                                            />
                                            <button
                                                onClick={handleSaveEditItem}
                                                className="flex items-center gap-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded transition-colors"
                                            >
                                                <Save className="w-4 h-4" />
                                                Lưu
                                            </button>
                                            <button
                                                onClick={handleCancelEditItem}
                                                className="flex items-center gap-1 px-3 py-1.5 bg-gray-300 hover:bg-gray-400 text-gray-700 text-sm font-medium rounded transition-colors"
                                            >
                                                <X className="w-4 h-4" />
                                                Hủy
                                            </button>
                                        </div>
                                    ) : (
                                        // View Mode
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-medium text-gray-900">{item.title}</h4>
                                            <div className="flex gap-2 ml-4">
                                                <button
                                                    onClick={() => handleStartEditItem(item.id)}
                                                    className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded transition-colors"
                                                    title="Sửa"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteItem(item.id)}
                                                    className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded transition-colors"
                                                    title="Xóa"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            <p>Chưa có vật dụng nào trong phòng</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

