'use client';

import { useState, useEffect } from 'react';

// Mock Types (Replace with actual types from API/Prisma)
interface Room {
    id: string;
    name: string;
    type: string;
    price: number;
    capacity: number;
    currentOccupancy: number;
    status: 'AVAILABLE' | 'FULL' | 'MAINTENANCE' | 'LOCKED';
}

export function RoomManager() {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [editingRoom, setEditingRoom] = useState<Room | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Mock Data Fetching
    useEffect(() => {
        // In real app: fetch('/api/rooms').then(...)
        setRooms([
            { id: '1', name: '101', type: 'Standard', price: 100, capacity: 4, currentOccupancy: 2, status: 'AVAILABLE' },
            { id: '2', name: '102', type: 'Service', price: 200, capacity: 2, currentOccupancy: 0, status: 'AVAILABLE' },
            { id: '3', name: '103', type: 'Standard', price: 100, capacity: 4, currentOccupancy: 0, status: 'MAINTENANCE' },
        ]);
    }, []);

    const handleEdit = (room: Room) => {
        setEditingRoom({ ...room });
        setError('');
    };

    const handleSave = async () => {
        if (!editingRoom) return;
        setLoading(true);
        setError('');

        // Client-side validation preview
        if ((editingRoom.status === 'MAINTENANCE' || editingRoom.status === 'LOCKED') && editingRoom.currentOccupancy > 0) {
            setError(`Cannot set room to ${editingRoom.status} because it is occupied.`);
            setLoading(false);
            return;
        }

        console.log('Saving Room:', editingRoom);

        // Simulate API Call
        setTimeout(() => {
            setRooms(prev => prev.map(r => r.id === editingRoom.id ? editingRoom : r));
            setEditingRoom(null);
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Room Management</h2>

            <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Occupancy</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {rooms.map((room) => (
                            <tr key={room.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{room.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{room.type}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${room.price}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{room.currentOccupancy} / {room.capacity}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${room.status === 'AVAILABLE' ? 'bg-green-100 text-green-800' :
                                            room.status === 'FULL' ? 'bg-red-100 text-red-800' :
                                                'bg-gray-100 text-gray-800'
                                        }`}>
                                        {room.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button
                                        onClick={() => handleEdit(room)}
                                        className="text-indigo-600 hover:text-indigo-900"
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            {editingRoom && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg max-w-md w-full p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Room: {editingRoom.name}</h3>

                        {error && (
                            <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
                                <div className="flex">
                                    <div className="ml-3">
                                        <p className="text-sm text-red-700">{error}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Price</label>
                                <input
                                    type="number"
                                    value={editingRoom.price}
                                    onChange={(e) => setEditingRoom({ ...editingRoom, price: Number(e.target.value) })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Capacity</label>
                                <input
                                    type="number"
                                    value={editingRoom.capacity}
                                    onChange={(e) => setEditingRoom({ ...editingRoom, capacity: Number(e.target.value) })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Status</label>
                                <select
                                    value={editingRoom.status}
                                    onChange={(e) => setEditingRoom({ ...editingRoom, status: e.target.value as any })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                                >
                                    <option value="AVAILABLE">Available</option>
                                    <option value="FULL">Full</option>
                                    <option value="MAINTENANCE">Maintenance</option>
                                    <option value="LOCKED">Locked</option>
                                </select>
                            </div>

                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    onClick={() => setEditingRoom(null)}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={loading}
                                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
                                >
                                    {loading ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
