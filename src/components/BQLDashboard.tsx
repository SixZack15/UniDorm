'use client';

import { useState, useEffect } from 'react';

// Mock Types
interface Arrival {
    id: string; // Registration ID
    student: { username: string; studentHardProfile?: { fullName: string } };
    room: { name: string };
    status: string;
}

interface Departure {
    id: string; // CheckoutRequest ID
    student: { username: string; studentHardProfile?: { fullName: string } };
    status: string;
}

export function BQLDashboard() {
    const [arrivals, setArrivals] = useState<Arrival[]>([]);
    const [departures, setDepartures] = useState<Departure[]>([]);
    const [loading, setLoading] = useState(false);

    // Mock Data Load
    useEffect(() => {
        setArrivals([
            { id: 'reg1', student: { username: 'studentNew', studentHardProfile: { fullName: 'Nguyen Van A' } }, room: { name: '101' }, status: 'READY_FOR_CHECKIN' }
        ]);
        setDepartures([
            { id: 'req1', student: { username: 'studentLeaving', studentHardProfile: { fullName: 'Tran Thi B' } }, status: 'APPROVED' }
        ]);
    }, []);

    const handleCheckIn = async (registrationId: string) => {
        if (!confirm('Confirm Physical Check-in? This will increment room occupancy.')) return;
        setLoading(true);
        console.log('Processing Check-in:', registrationId);

        // Simulate API
        setTimeout(() => {
            setArrivals(prev => prev.filter(a => a.id !== registrationId));
            setLoading(false);
            alert('Check-in Confirmed!');
        }, 1000);
    };

    const handleCheckOut = async (requestId: string) => {
        if (!confirm('Confirm Physical Check-out? This will decrement room occupancy.')) return;
        setLoading(true);
        console.log('Processing Check-out:', requestId);

        // Simulate API
        setTimeout(() => {
            setDepartures(prev => prev.filter(d => d.id !== requestId));
            setLoading(false);
            alert('Check-out Confirmed!');
        }, 1000);
    };

    return (
        <div className="space-y-8">
            {/* Arrivals Section */}
            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4 text-green-700">Today's Arrivals (Check-in)</h2>
                <ul className="divide-y divide-gray-200">
                    {arrivals.length === 0 ? <li className="py-4 text-gray-500">No arrivals today.</li> : arrivals.map(arrival => (
                        <li key={arrival.id} className="py-4 flex justify-between items-center">
                            <div>
                                <p className="text-sm font-medium text-gray-900">{arrival.student.studentHardProfile?.fullName || arrival.student.username}</p>
                                <p className="text-sm text-gray-500">Room: {arrival.room.name} - Status: {arrival.status}</p>
                            </div>
                            <button
                                onClick={() => handleCheckIn(arrival.id)}
                                disabled={loading}
                                className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 disabled:opacity-50"
                            >
                                Confirm Check-in
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Departures Section */}
            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4 text-red-700">Today's Departures (Check-out)</h2>
                <ul className="divide-y divide-gray-200">
                    {departures.length === 0 ? <li className="py-4 text-gray-500">No departures today.</li> : departures.map(departure => (
                        <li key={departure.id} className="py-4 flex justify-between items-center">
                            <div>
                                <p className="text-sm font-medium text-gray-900">{departure.student.studentHardProfile?.fullName || departure.student.username}</p>
                                <p className="text-sm text-gray-500">Status: {departure.status}</p>
                            </div>
                            <button
                                onClick={() => handleCheckOut(departure.id)}
                                disabled={loading}
                                className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 disabled:opacity-50"
                            >
                                Confirm Check-out
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
