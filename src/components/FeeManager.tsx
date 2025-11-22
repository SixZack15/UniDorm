'use client';

import { useState } from 'react';

// Mock Types
interface FeeNotice {
    id: string;
    title: string;
    amount: number;
    description: string;
    dueDate: string;
    status: string;
}

interface FeeManagerProps {
    role: 'FINANCE_MANAGER' | 'STUDENT';
    studentId?: string; // For student view
}

export function FeeManager({ role, studentId }: FeeManagerProps) {
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [loading, setLoading] = useState(false);
    const [notices, setNotices] = useState<FeeNotice[]>([]);
    const [message, setMessage] = useState('');

    const handleGenerateFees = async () => {
        setLoading(true);
        setMessage('');

        // Simulate API call
        console.log(`Generating fees for ${month}/${year}`);

        setTimeout(() => {
            setLoading(false);
            setMessage(`Successfully generated fee notices for ${month}/${year}`);
            // In real app, we might fetch the generated list here
        }, 1500);
    };

    const loadStudentNotices = async () => {
        // Simulate fetching student notices
        setNotices([
            { id: '1', title: 'Dorm Fee - 10/2023', amount: 1500000, description: 'Room: 1000000, Elec: 300000, Water: 200000', dueDate: '2023-11-05', status: 'PENDING' },
            { id: '2', title: 'Dorm Fee - 09/2023', amount: 1450000, description: 'Room: 1000000, Elec: 250000, Water: 200000', dueDate: '2023-10-05', status: 'PAID' },
        ]);
    };

    if (role === 'FINANCE_MANAGER') {
        return (
            <div className="space-y-6 bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold">Fee Management</h2>

                <div className="flex items-end space-x-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Month</label>
                        <input
                            type="number"
                            min="1"
                            max="12"
                            value={month}
                            onChange={(e) => setMonth(Number(e.target.value))}
                            className="mt-1 block w-24 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Year</label>
                        <input
                            type="number"
                            value={year}
                            onChange={(e) => setYear(Number(e.target.value))}
                            className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                        />
                    </div>
                    <button
                        onClick={handleGenerateFees}
                        disabled={loading}
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
                    >
                        {loading ? 'Generating...' : 'Generate Fee Notices'}
                    </button>
                </div>

                {message && (
                    <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-md">
                        {message}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">My Fee Notices</h2>
                <button onClick={loadStudentNotices} className="text-sm text-indigo-600 hover:text-indigo-900">Refresh</button>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                    {notices.length === 0 ? (
                        <li className="px-4 py-4 sm:px-6 text-gray-500">No fee notices found. Click Refresh to load.</li>
                    ) : notices.map((notice) => (
                        <li key={notice.id}>
                            <div className="px-4 py-4 sm:px-6">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-indigo-600 truncate">{notice.title}</p>
                                    <div className="ml-2 flex-shrink-0 flex">
                                        <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${notice.status === 'PAID' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {notice.status}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-2 sm:flex sm:justify-between">
                                    <div className="sm:flex">
                                        <p className="flex items-center text-sm text-gray-500">
                                            Amount: {notice.amount.toLocaleString()} VND
                                        </p>
                                        <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                            Due: {notice.dueDate}
                                        </p>
                                    </div>
                                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                        <p>{notice.description}</p>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
