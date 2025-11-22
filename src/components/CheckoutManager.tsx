'use client';

import { useState, useEffect } from 'react';

// Mock Types (Replace with actual types from API/Prisma)
interface CheckoutRequest {
    id: string;
    student: {
        username: string;
        studentHardProfile?: { fullName: string; mssv: string };
    };
    reason: string;
    desiredDate: string;
    status: 'PENDING' | 'INSPECTED' | 'COMPLETED' | 'REJECTED';
    assetInspectionPassed?: boolean;
    assetInspectionNotes?: string;
}

export function CheckoutManager() {
    const [requests, setRequests] = useState<CheckoutRequest[]>([]);
    const [selectedRequest, setSelectedRequest] = useState<CheckoutRequest | null>(null);
    const [inspectionPassed, setInspectionPassed] = useState(false);
    const [inspectionNotes, setInspectionNotes] = useState('');
    const [loading, setLoading] = useState(false);

    // Mock Data Fetching
    useEffect(() => {
        // In real app: fetch('/api/checkouts').then(...)
        setRequests([
            {
                id: '1',
                student: { username: 'student1', studentHardProfile: { fullName: 'Nguyen Van A', mssv: 'SV001' } },
                reason: 'Graduated',
                desiredDate: new Date().toISOString(),
                status: 'PENDING'
            }
        ]);
    }, []);

    const handleInspect = (request: CheckoutRequest) => {
        setSelectedRequest(request);
        setInspectionPassed(request.assetInspectionPassed || false);
        setInspectionNotes(request.assetInspectionNotes || '');
    };

    const handleSubmitInspection = async () => {
        if (!selectedRequest) return;
        setLoading(true);
        console.log('Submitting Inspection:', { requestId: selectedRequest.id, passed: inspectionPassed, notes: inspectionNotes });

        // Simulate API Call
        setTimeout(() => {
            setRequests(prev => prev.map(r => r.id === selectedRequest.id ? { ...r, status: 'INSPECTED', assetInspectionPassed: inspectionPassed, assetInspectionNotes: inspectionNotes } : r));
            setSelectedRequest(null);
            setLoading(false);
        }, 1000);
    };

    const handleConfirmCheckout = async (request: CheckoutRequest) => {
        if (!confirm('Are you sure you want to finalize this checkout? This action is irreversible.')) return;
        console.log('Confirming Checkout:', request.id);
        // Simulate API Call
        setRequests(prev => prev.filter(r => r.id !== request.id));
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Checkout Requests</h2>

            <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {requests.map((req) => (
                            <tr key={req.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{req.student.studentHardProfile?.fullName || req.student.username}</div>
                                    <div className="text-sm text-gray-500">{req.student.studentHardProfile?.mssv}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{req.reason}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(req.desiredDate).toLocaleDateString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${req.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                                            req.status === 'INSPECTED' ? 'bg-blue-100 text-blue-800' :
                                                'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {req.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                    <button
                                        onClick={() => handleInspect(req)}
                                        className="text-indigo-600 hover:text-indigo-900"
                                    >
                                        Inspect Assets
                                    </button>
                                    {req.status === 'INSPECTED' && req.assetInspectionPassed && (
                                        <button
                                            onClick={() => handleConfirmCheckout(req)}
                                            className="text-green-600 hover:text-green-900"
                                        >
                                            Confirm Checkout
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Inspection Modal */}
            {selectedRequest && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg max-w-md w-full p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Asset Inspection: {selectedRequest.student.studentHardProfile?.fullName}</h3>

                        <div className="space-y-4">
                            <div className="flex items-center">
                                <input
                                    id="inspection-passed"
                                    type="checkbox"
                                    checked={inspectionPassed}
                                    onChange={(e) => setInspectionPassed(e.target.checked)}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="inspection-passed" className="ml-2 block text-sm text-gray-900">
                                    Assets Inspection Passed
                                </label>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Inspection Notes</label>
                                <textarea
                                    value={inspectionNotes}
                                    onChange={(e) => setInspectionNotes(e.target.value)}
                                    rows={3}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                                    placeholder="Describe condition of room/assets..."
                                />
                            </div>

                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    onClick={() => setSelectedRequest(null)}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmitInspection}
                                    disabled={loading}
                                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
                                >
                                    {loading ? 'Saving...' : 'Save Inspection'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
