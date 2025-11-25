'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Toaster, toast } from 'react-hot-toast';

interface Receipt {
    id: string;
    studentId: string;
    name: string;
    price: number;
    date: string;
    notes?: string;
}

export default function CreateReceiptPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const editId = searchParams.get('id');

    const [formData, setFormData] = useState({
        studentId: '',
        name: '',
        price: '',
        notes: ''
    });

    useEffect(() => {
        if (editId) {
            const stored = localStorage.getItem('accounting_receipts');
            if (stored) {
                const receipts: Receipt[] = JSON.parse(stored);
                const receipt = receipts.find(r => r.id === editId);
                if (receipt) {
                    setFormData({
                        studentId: receipt.studentId,
                        name: receipt.name,
                        price: receipt.price.toString(),
                        notes: receipt.notes || ''
                    });
                }
            }
        }
    }, [editId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.studentId || !formData.price || !formData.name) {
            toast.error('Please fill in all required fields');
            return;
        }

        const stored = localStorage.getItem('accounting_receipts');
        let receipts: Receipt[] = stored ? JSON.parse(stored) : [];

        if (editId) {
            // Update existing
            receipts = receipts.map(r => 
                r.id === editId ? {
                    ...r,
                    studentId: formData.studentId,
                    name: formData.name,
                    price: Number(formData.price),
                    notes: formData.notes
                } : r
            );
            toast.success('Receipt updated successfully');
        } else {
            // Create new
            const newReceipt: Receipt = {
                id: `RCP-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
                studentId: formData.studentId,
                name: formData.name,
                price: Number(formData.price),
                date: new Date().toISOString(),
                notes: formData.notes
            };
            receipts = [newReceipt, ...receipts];
            toast.success('Receipt created successfully');
        }

        localStorage.setItem('accounting_receipts', JSON.stringify(receipts));
        
        // Small delay to show toast
        setTimeout(() => {
            router.push('/accounting/receipts');
        }, 1000);
    };

    return (
        <div className="max-w-2xl mx-auto">
            <Toaster />
            <div className="mb-6 flex items-center gap-4">
                <Link 
                    href="/accounting/receipts"
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">
                    {editId ? 'Edit Receipt' : 'Create New Receipt'}
                </h1>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-1">
                                Student ID (MSSV) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="studentId"
                                name="studentId"
                                value={formData.studentId}
                                onChange={handleChange}
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm py-2 px-3 border"
                                placeholder="e.g. 2174802010123"
                            />
                        </div>

                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Student Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm py-2 px-3 border"
                                placeholder="e.g. Nguyen Van A"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                            Amount Received (VND) <span className="text-red-500">*</span>
                        </label>
                        <div className="relative rounded-md shadow-sm">
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm py-2 px-3 border pr-12"
                                placeholder="0"
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-sm">VND</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                            Notes / Description
                        </label>
                        <textarea
                            id="notes"
                            name="notes"
                            rows={4}
                            value={formData.notes}
                            onChange={handleChange}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm py-2 px-3 border"
                            placeholder="Enter payment details..."
                        />
                    </div>

                    <div className="pt-4 flex items-center justify-end gap-3">
                        <Link
                            href="/accounting/receipts"
                            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                        >
                            {editId ? 'Update Receipt' : 'Save Receipt'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
