'use client';

import { useState, useEffect } from 'react';

// Mock Types
interface Relative {
    id: string;
    name: string;
    relationship: string;
    phone: string;
    isEmergencyContact: boolean;
}

interface VisitRequest {
    id: string;
    relative: Relative & { student: { studentHardProfile?: { fullName: string }, username: string } };
    purpose: string;
    expectedDate: string;
    status: string;
}

export function RelativeManager({ role }: { role: 'STUDENT' | 'BQL_KTX' }) {
    const [relatives, setRelatives] = useState<Relative[]>([]);
    const [requests, setRequests] = useState<VisitRequest[]>([]);
    const [loading, setLoading] = useState(false);

    // Mock Data Load
    useEffect(() => {
        if (role === 'STUDENT') {
            setRelatives([
                { id: 'rel1', name: 'Mom', relationship: 'Mother', phone: '0909090909', isEmergencyContact: true }
            ]);
        } else {
            setRequests([
                {
                    id: 'req1',
                    relative: {
                        id: 'rel1',
                        name: 'Mom',
                        relationship: 'Mother',
                        phone: '0909090909',
                        isEmergencyContact: true,
                        student: { username: 'student1', studentHardProfile: { fullName: 'Nguyen Van A' } }
                    },
                    purpose: 'Visit',
                    expectedDate: new Date().toISOString(),
                    status: 'PENDING'
                }
            ]);
        }
    }, [role]);

    const handleAddRelative = () => {
        const name = prompt('Relative Name:');
        if (!name) return;
        // Simulate API
        setRelatives(prev => [...prev, { id: Date.now().toString(), name, relationship: 'Parent', phone: '123', isEmergencyContact: false }]);
    };

    const handleDeleteRelative = (id: string) => {
        if (relatives.length <= 1) {
            alert('Cannot delete the last relative. You must have at least one contact.');
            return;
        }
        if (!confirm('Delete relative?')) return;
        setRelatives(prev => prev.filter(r => r.id !== id));
    };

    const handleApproveRequest = (id: string) => {
        setRequests(prev => prev.filter(r => r.id !== id));
        alert('Request Approved');
    };

    if (role === 'STUDENT') {
        return (
            <div className="space-y-6">
                <div className="bg-white shadow rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">My Relatives</h2>
                        <button onClick={handleAddRelative} className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                            + Add Relative
                        </button>
                    </div>
                    <ul className="divide-y divide-gray-200">
                        {relatives.map(rel => (
                            <li key={rel.id} className="py-4 flex justify-between items-center">
                                <div>
                                    <p className="font-medium">{rel.name} ({rel.relationship})</p>
                                    <p className="text-sm text-gray-500">{rel.phone} {rel.isEmergencyContact && <span className="text-red-500 font-bold">(Emergency)</span>}</p>
                                </div>
                                <div className="space-x-2">
                                    <button className="text-blue-600 hover:underline">Request Visit</button>
                                    <button onClick={() => handleDeleteRelative(rel.id)} className="text-red-600 hover:underline">Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Pending Visit Requests</h2>
                <ul className="divide-y divide-gray-200">
                    {requests.length === 0 ? <li className="py-4 text-gray-500">No pending requests.</li> : requests.map(req => (
                        <li key={req.id} className="py-4 flex justify-between items-center">
                            <div>
                                <p className="font-medium">Visitor: {req.relative.name} ({req.relative.relationship})</p>
                                <p className="text-sm text-gray-600">Student: {req.relative.student.studentHardProfile?.fullName || req.relative.student.username}</p>
                                <p className="text-sm text-gray-500">Purpose: {req.purpose} - Date: {new Date(req.expectedDate).toLocaleDateString()}</p>
                            </div>
                            <div className="space-x-2">
                                <button onClick={() => handleApproveRequest(req.id)} className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">Approve</button>
                                <button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">Reject</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
