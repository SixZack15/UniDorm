'use client';

import { useState, useEffect } from 'react';

// Mock Types
interface FeeNotice {
    id: string;
    student: { username: string };
    title: string;
    amount: number;
    dueDate: string;
    status: string;
    invoice?: {
        receipt?: {
            id: string;
            printCount: number;
        }
    }
}

export function PaymentManager() {
    const [pendingNotices, setPendingNotices] = useState<FeeNotice[]>([]);
    const [paidNotices, setPaidNotices] = useState<FeeNotice[]>([]);
    const [selectedNotice, setSelectedNotice] = useState<FeeNotice | null>(null);
    const [paymentMethod, setPaymentMethod] = useState('TRANSFER');
    const [transactionId, setTransactionId] = useState('');
    const [loading, setLoading] = useState(false);

    // Mock Data Load
    useEffect(() => {
        setPendingNotices([
            { id: '1', student: { username: 'studentA' }, title: 'Fee 10/2023', amount: 1200000, dueDate: '2023-11-05', status: 'PENDING' }
        ]);
        setPaidNotices([
            {
                id: '2',
                student: { username: 'studentB' },
                title: 'Fee 09/2023',
                amount: 1200000,
                dueDate: '2023-10-05',
                status: 'PAID',
                invoice: { receipt: { id: 'r1', printCount: 0 } }
            }
        ]);
    }, []);

    const handleConfirmPayment = async () => {
        if (!selectedNotice) return;
        setLoading(true);

        console.log('Confirming Payment:', { noticeId: selectedNotice.id, paymentMethod, transactionId });

        // Simulate API
        setTimeout(() => {
            setPendingNotices(prev => prev.filter(n => n.id !== selectedNotice.id));
            setPaidNotices(prev => [...prev, { ...selectedNotice, status: 'PAID', invoice: { receipt: { id: 'new_r', printCount: 0 } } }]);
            setSelectedNotice(null);
            setTransactionId('');
            setLoading(false);
        }, 1000);
    };

    const handlePrintReceipt = async (notice: FeeNotice) => {
        if (!notice.invoice?.receipt) return;

        const receipt = notice.invoice.receipt;
        if (receipt.printCount > 0) {
            alert('Receipt already printed! Admin override required.');
            return;
        }

        console.log('Printing Receipt:', receipt.id);
        // Simulate Print
        alert(`Printing Receipt for ${notice.title}\nAmount: ${notice.amount}`);

        // Update local state to reflect print count increment
        setPaidNotices(prev => prev.map(n =>
            n.id === notice.id
                ? { ...n, invoice: { ...n.invoice!, receipt: { ...n.invoice!.receipt!, printCount: n.invoice!.receipt!.printCount + 1 } } }
                : n
        ));
    };

    return (
        <div className="space-y-8">
            {/* Pending Payments Section */}
            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Pending Payments</h2>
                <ul className="divide-y divide-gray-200">
                    {pendingNotices.map(notice => (
                        <li key={notice.id} className="py-4 flex justify-between items-center">
                            <div>
                                <p className="text-sm font-medium text-gray-900">{notice.title} - {notice.student.username}</p>
                                <p className="text-sm text-gray-500">{notice.amount.toLocaleString()} VND - Due: {notice.dueDate}</p>
                            </div>
                            <button
                                onClick={() => setSelectedNotice(notice)}
                                className="px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700"
                            >
                                Confirm Payment
                            </button>
                        </li>
                    ))}
                    {pendingNotices.length === 0 && <li className="py-4 text-gray-500 text-sm">No pending payments.</li>}
                </ul>
            </div>

            {/* Paid History Section */}
            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Payment History & Receipts</h2>
                <ul className="divide-y divide-gray-200">
                    {paidNotices.map(notice => (
                        <li key={notice.id} className="py-4 flex justify-between items-center">
                            <div>
                                <p className="text-sm font-medium text-gray-900">{notice.title} - {notice.student.username}</p>
                                <p className="text-sm text-gray-500">Paid: {notice.amount.toLocaleString()} VND</p>
                                <p className="text-xs text-gray-400">Print Count: {notice.invoice?.receipt?.printCount}</p>
                            </div>
                            <button
                                onClick={() => handlePrintReceipt(notice)}
                                className={`px-3 py-1 text-sm rounded ${(notice.invoice?.receipt?.printCount || 0) > 0
                                        ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                        : 'bg-green-600 text-white hover:bg-green-700'
                                    }`}
                            >
                                {(notice.invoice?.receipt?.printCount || 0) > 0 ? 'Printed' : 'Print Receipt'}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Confirmation Modal */}
            {selectedNotice && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg max-w-md w-full p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Payment</h3>
                        <p className="mb-4 text-sm text-gray-600">
                            Confirming payment of <b>{selectedNotice.amount.toLocaleString()} VND</b> for {selectedNotice.student.username}.
                        </p>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                                <select
                                    value={paymentMethod}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                                >
                                    <option value="TRANSFER">Bank Transfer</option>
                                    <option value="CASH">Cash</option>
                                    <option value="QR">QR Code</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Transaction ID (Optional)</label>
                                <input
                                    type="text"
                                    value={transactionId}
                                    onChange={(e) => setTransactionId(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                                />
                            </div>

                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    onClick={() => setSelectedNotice(null)}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleConfirmPayment}
                                    disabled={loading}
                                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
                                >
                                    {loading ? 'Processing...' : 'Confirm'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
