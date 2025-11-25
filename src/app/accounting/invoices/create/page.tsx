'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Toaster, toast } from 'react-hot-toast';

interface Invoice {
    id: string;
    mssv: string;
    name: string;
    price: number;
    date: string;
    status: 'Paid' | 'Pending' | 'Overdue';
    notes?: string;
}

export default function CreateInvoicePage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const editId = searchParams.get('id');

    const [formData, setFormData] = useState({
        mssv: '',
        name: '',
        price: '',
        status: 'Pending',
        notes: ''
    });

    useEffect(() => {
        if (editId) {
            const stored = localStorage.getItem('accounting_invoices');
            if (stored) {
                const invoices: Invoice[] = JSON.parse(stored);
                const invoice = invoices.find(inv => inv.id === editId);
                if (invoice) {
                    setFormData({
                        mssv: invoice.mssv,
                        name: invoice.name,
                        price: invoice.price.toString(),
                        status: invoice.status,
                        notes: invoice.notes || ''
                    });
                }
            }
        }
    }, [editId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.mssv || !formData.price || !formData.name) {
            toast.error('Please fill in all required fields');
            return;
        }

        const stored = localStorage.getItem('accounting_invoices');
        let invoices: Invoice[] = stored ? JSON.parse(stored) : [];

        if (editId) {
            // Update existing
            invoices = invoices.map(inv => 
                inv.id === editId ? {
                    ...inv,
                    mssv: formData.mssv,
                    name: formData.name,
                    price: Number(formData.price),
                    status: formData.status as any,
                    notes: formData.notes
                } : inv
            );
            toast.success('Invoice updated successfully');
        } else {
            // Create new
            const newInvoice: Invoice = {
                id: `INV-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
                mssv: formData.mssv,
                name: formData.name, // In a real app, we'd fetch name from MSSV
                price: Number(formData.price),
                date: new Date().toISOString(),
                status: formData.status as any,
                notes: formData.notes
            };
            invoices = [newInvoice, ...invoices];
            toast.success('Invoice created successfully');
        }

        localStorage.setItem('accounting_invoices', JSON.stringify(invoices));
        
        // Small delay to show toast
        setTimeout(() => {
            router.push('/accounting/invoices');
        }, 1000);
    };

    return (
        <div className="max-w-2xl mx-auto">
            <Toaster />
            <div className="mb-6 flex items-center gap-4">
                <Link 
                    href="/accounting/invoices"
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">
                    {editId ? 'Edit Invoice' : 'Create New Invoice'}
                </h1>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="mssv" className="block text-sm font-medium text-gray-700 mb-1">
                                Student ID (MSSV) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="mssv"
                                name="mssv"
                                value={formData.mssv}
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                                Amount (VND) <span className="text-red-500">*</span>
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
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                                Status
                            </label>
                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm py-2 px-3 border"
                            >
                                <option value="Pending">Pending</option>
                                <option value="Paid">Paid</option>
                                <option value="Overdue">Overdue</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                            Additional Notes
                        </label>
                        <textarea
                            id="notes"
                            name="notes"
                            rows={4}
                            value={formData.notes}
                            onChange={handleChange}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm py-2 px-3 border"
                            placeholder="Enter any additional details about this invoice..."
                        />
                    </div>

                    <div className="pt-4 flex items-center justify-end gap-3">
                        <Link
                            href="/accounting/invoices"
                            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                        >
                            {editId ? 'Update Invoice' : 'Create Invoice'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
