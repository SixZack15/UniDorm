import React, { useState } from 'react';
import { searchRoomsAction } from '@/actions/registration.actions';

interface Room {
    id: string;
    name: string;
    price: number;
    capacity: number;
    currentOccupancy: number;
}

export const RoomSearch: React.FC = () => {
    const [filters, setFilters] = useState({
        minPrice: '',
        maxPrice: '',
        capacity: '',
    });
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        setLoading(true);
        try {
            const result = await searchRoomsAction({
                minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
                maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
                capacity: filters.capacity ? Number(filters.capacity) : undefined,
            });

            if (result.success && result.data) {
                setRooms(result.data);
            } else {
                console.error(result.error);
            }
        } catch (error) {
            console.error('Search failed', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Find Your Room</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
                    <input
                        type="number"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        value={filters.minPrice}
                        onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                        placeholder="e.g. 2000000"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
                    <input
                        type="number"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        value={filters.maxPrice}
                        onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                        placeholder="e.g. 5000000"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                    <select
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        value={filters.capacity}
                        onChange={(e) => setFilters({ ...filters, capacity: e.target.value })}
                    >
                        <option value="">Any</option>
                        <option value="4">4 Students</option>
                        <option value="6">6 Students</option>
                        <option value="8">8 Students</option>
                    </select>
                </div>
            </div>

            <button
                onClick={handleSearch}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
            >
                {loading ? 'Searching...' : 'Search Available Rooms'}
            </button>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                {rooms.map((room) => (
                    <div key={room.id} className="border border-gray-200 p-4 rounded-lg hover:shadow-lg transition-shadow">
                        <h3 className="text-xl font-semibold text-gray-800">{room.name}</h3>
                        <p className="text-gray-600">Price: {room.price.toLocaleString()} VND</p>
                        <p className="text-gray-600">Capacity: {room.currentOccupancy}/{room.capacity}</p>
                        <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
                            Register Now
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
