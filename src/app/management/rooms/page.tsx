'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ManagementRoomsPage() {
    const router = useRouter();
    
    // Mock Data - Same as admin/rooms
    const [rooms, setRooms] = useState([
        {
            id: 'A.101',
            building: 'Khu A',
            type: '8 Giường',
            price: '600.000',
            gender: 'NAM',
            currentOccupancy: 4,
            maxCapacity: 8,
            status: 'AVAILABLE',
            statusLabel: 'SẴN SÀNG',
            statusColor: 'bg-green-100 text-green-800',
        },
        {
            id: 'A.102',
            building: 'Khu A',
            type: '8 Giường',
            price: '600.000',
            gender: 'NAM',
            currentOccupancy: 8,
            maxCapacity: 8,
            status: 'FULL',
            statusLabel: 'ĐÃ ĐẦY',
            statusColor: 'bg-gray-100 text-gray-800',
        },
        {
            id: 'B.201',
            building: 'Khu B',
            type: '4 Giường (DV)',
            price: '1.200.000',
            gender: 'NỮ',
            currentOccupancy: 2,
            maxCapacity: 4,
            status: 'AVAILABLE',
            statusLabel: 'SẴN SÀNG',
            statusColor: 'bg-green-100 text-green-800',
        },
        {
            id: 'B.205',
            building: 'Khu B',
            type: '4 Giường (DV)',
            price: '1.200.000',
            gender: 'NỮ',
            currentOccupancy: 0,
            maxCapacity: 4,
            status: 'MAINTENANCE',
            statusLabel: 'BẢO TRÌ',
            statusColor: 'bg-orange-100 text-orange-800',
        },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('id');
    const [filterBuilding, setFilterBuilding] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');

    const calculatePercentage = (current: number, max: number) => {
        return Math.round((current / max) * 100);
    };

    // Filter and sort rooms
    const filteredRooms = rooms
        .filter(room => {
            const matchesSearch = room.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                room.building.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesBuilding = filterBuilding === 'all' || room.building === filterBuilding;
            const matchesStatus = filterStatus === 'all' || room.status === filterStatus;
            return matchesSearch && matchesBuilding && matchesStatus;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'id':
                    return a.id.localeCompare(b.id);
                case 'building':
                    return a.building.localeCompare(b.building);
                case 'occupancy':
                    return b.currentOccupancy - a.currentOccupancy;
                case 'capacity':
                    return b.maxCapacity - a.maxCapacity;
                default:
                    return 0;
            }
        });

    const handleRoomClick = (roomId: string) => {
        router.push(`/management/rooms/editRoom?id=${roomId}`);
    };

    return (
        <div className="space-y-6">
            {/* Breadcrumb */}
            <nav className="flex text-sm text-gray-500">
                <Link href="/management/dashboard" className="hover:text-primary">Dashboard</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-medium">Quản lý phòng</span>
            </nav>

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-900">Danh sách Phòng</h1>
            </div>

            {/* Search and Filter Toolbar */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-4 justify-between items-center">
                <div className="relative w-full lg:w-64">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Tìm kiếm Mã phòng..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full pl-10 rounded-md border-gray-300 focus:border-primary focus:ring-primary sm:text-sm"
                    />
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto">
                    <select
                        value={filterBuilding}
                        onChange={(e) => setFilterBuilding(e.target.value)}
                        className="block w-full lg:w-auto rounded-md border-gray-300 py-1.5 text-base focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                    >
                        <option value="all">Tất cả Tòa nhà</option>
                        <option value="Khu A">Khu A</option>
                        <option value="Khu B">Khu B</option>
                    </select>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="block w-full lg:w-auto rounded-md border-gray-300 py-1.5 text-base focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                    >
                        <option value="all">Tất cả Trạng thái</option>
                        <option value="AVAILABLE">Sẵn sàng</option>
                        <option value="FULL">Đã đầy</option>
                        <option value="MAINTENANCE">Bảo trì</option>
                    </select>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="block w-full lg:w-auto rounded-md border-gray-300 py-1.5 text-base focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                    >
                        <option value="id">Sắp xếp theo Mã phòng</option>
                        <option value="building">Sắp xếp theo Tòa nhà</option>
                        <option value="occupancy">Sắp xếp theo Số người ở</option>
                        <option value="capacity">Sắp xếp theo Sức chứa</option>
                    </select>
                </div>
            </div>

            {/* Data Grid (Desktop) */}
            <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã Phòng</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tòa</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loại / Giá</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giới tính</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sức chứa</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredRooms.map((room) => (
                                <tr
                                    key={room.id}
                                    onClick={() => handleRoomClick(room.id)}
                                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{room.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{room.building}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{room.type}</div>
                                        <div className="text-xs text-gray-500">{room.price} đ</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${room.gender === 'NAM' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'}`}>
                                            {room.gender}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap align-middle">
                                        <div className="w-full max-w-[100px]">
                                            <div className="flex justify-between text-xs mb-1">
                                                <span className="font-medium">{room.currentOccupancy}/{room.maxCapacity}</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                <div
                                                    className={`h-2.5 rounded-full ${room.currentOccupancy === room.maxCapacity ? 'bg-red-500' : 'bg-green-500'}`}
                                                    style={{ width: `${calculatePercentage(room.currentOccupancy, room.maxCapacity)}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${room.statusColor}`}>
                                            {room.statusLabel}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile Card List */}
            <div className="md:hidden space-y-4">
                {filteredRooms.map((room) => (
                    <div
                        key={room.id}
                        onClick={() => handleRoomClick(room.id)}
                        className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 cursor-pointer hover:shadow-md transition-shadow"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg">{room.id} <span className="text-sm font-normal text-gray-500">({room.gender})</span></h3>
                                <p className="text-sm text-gray-500">{room.type} - {room.price} đ</p>
                            </div>
                            <span className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${room.statusColor}`}>
                                {room.statusLabel}
                            </span>
                        </div>

                        <div className="my-3">
                            <div className="flex justify-between text-xs mb-1">
                                <span className="text-gray-500">Sức chứa:</span>
                                <span className="font-medium">{room.currentOccupancy}/{room.maxCapacity}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                    className={`h-2.5 rounded-full ${room.currentOccupancy === room.maxCapacity ? 'bg-red-500' : 'bg-green-500'}`}
                                    style={{ width: `${calculatePercentage(room.currentOccupancy, room.maxCapacity)}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredRooms.length === 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                    <p className="text-gray-500">Không tìm thấy phòng nào</p>
                </div>
            )}
        </div>
    );
}


