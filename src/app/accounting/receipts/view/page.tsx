'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface Receipt {
    id: string;
    studentId: string;
    name: string;
    price: number;
    date: string;
    notes?: string;
}

export default function ViewReceiptPage() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [receipt, setReceipt] = useState<Receipt | null>(null);

    useEffect(() => {
        if (id) {
            const stored = localStorage.getItem('accounting_receipts');
            if (stored) {
                const receipts: Receipt[] = JSON.parse(stored);
                const found = receipts.find(r => r.id === id);
                if (found) setReceipt(found);
            }
        }
    }, [id]);

    if (!receipt) {
        return (
            <div className="p-12 text-center">
                <p className="text-gray-500">Receipt not found or loading...</p>
                <Link href="/accounting/receipts" className="text-emerald-600 hover:underline mt-4 inline-block">
                    Return to Receipts
                </Link>
            </div>
        );
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-6 flex items-center justify-between print:hidden">
                <Link 
                    href="/accounting/receipts"
                    className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                >
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to List
                </Link>
                <button 
                    onClick={() => window.print()}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                    <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    Print Receipt
                </button>
            </div>

            <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 print:shadow-none print:border-none relative">
                {/* Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
                    <span className="text-9xl font-black transform -rotate-45">PAID</span>
                </div>

                {/* Header */}
                <div className="bg-gray-900 p-8 text-white text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500 rounded-full mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold tracking-wider uppercase">Payment Receipt</h1>
                    <p className="mt-2 text-emerald-400 font-mono">{receipt.id}</p>
                </div>

                {/* Body */}
                <div className="p-8">
                    <div className="text-center mb-8">
                        <p className="text-sm text-gray-500 uppercase tracking-wide">Amount Paid</p>
                        <p className="text-4xl font-bold text-gray-900 mt-2">{formatCurrency(receipt.price)}</p>
                    </div>

                    <div className="space-y-4 border-t border-gray-100 pt-6">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Date Paid</span>
                            <span className="font-medium text-gray-900">{new Date(receipt.date).toLocaleDateString('vi-VN')}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Student Name</span>
                            <span className="font-medium text-gray-900">{receipt.name}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Student ID (MSSV)</span>
                            <span className="font-medium text-gray-900">{receipt.studentId}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Payment Method</span>
                            <span className="font-medium text-gray-900">Cash / Transfer</span>
                        </div>
                    </div>

                    {receipt.notes && (
                        <div className="mt-8 bg-gray-50 p-4 rounded-lg">
                            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Description</h4>
                            <p className="text-gray-700 text-sm">{receipt.notes}</p>
                        </div>
                    )}

                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-400">Thank you for your payment!</p>
                        <p className="text-xs text-gray-300 mt-1">Van Lang University Dormitory Management System</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
