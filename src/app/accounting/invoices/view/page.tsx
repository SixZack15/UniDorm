'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface Invoice {
    id: string;
    mssv: string;
    name: string;
    price: number;
    date: string;
    status: 'Paid' | 'Pending' | 'Overdue';
    notes?: string;
}

export default function ViewInvoicePage() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [invoice, setInvoice] = useState<Invoice | null>(null);

    useEffect(() => {
        if (id) {
            const stored = localStorage.getItem('accounting_invoices');
            if (stored) {
                const invoices: Invoice[] = JSON.parse(stored);
                const found = invoices.find(inv => inv.id === id);
                if (found) setInvoice(found);
            }
        }
    }, [id]);

    if (!invoice) {
        return (
            <div className="p-12 text-center">
                <p className="text-gray-500">Invoice not found or loading...</p>
                <Link href="/accounting/invoices" className="text-emerald-600 hover:underline mt-4 inline-block">
                    Return to Invoices
                </Link>
            </div>
        );
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-6 flex items-center justify-between print:hidden">
                <Link 
                    href="/accounting/invoices"
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
                    Print Invoice
                </button>
            </div>

            <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 print:shadow-none print:border-none">
                {/* Header */}
                <div className="bg-emerald-700 p-8 text-white flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">INVOICE</h1>
                        <p className="mt-1 opacity-80">#{invoice.id}</p>
                    </div>
                    <div className="text-right">
                        <h2 className="text-xl font-bold">Van Lang University Dormitory</h2>
                        <p className="text-sm opacity-80 mt-1">69/68 Dang Thuy Tram, Ward 13</p>
                        <p className="text-sm opacity-80">Binh Thanh Dist, HCMC</p>
                    </div>
                </div>

                {/* Body */}
                <div className="p-8">
                    <div className="flex justify-between mb-12">
                        <div>
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Bill To</h3>
                            <p className="text-lg font-bold text-gray-900">{invoice.name}</p>
                            <p className="text-gray-600">MSSV: {invoice.mssv}</p>
                        </div>
                        <div className="text-right">
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Invoice Details</h3>
                            <p className="text-gray-600">
                                <span className="font-medium">Date:</span> {new Date(invoice.date).toLocaleDateString('vi-VN')}
                            </p>
                            <p className="text-gray-600 mt-1">
                                <span className="font-medium">Status:</span> 
                                <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    invoice.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' :
                                    invoice.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                                }`}>
                                    {invoice.status}
                                </span>
                            </p>
                        </div>
                    </div>

                    <table className="w-full mb-12">
                        <thead>
                            <tr className="border-b-2 border-gray-200">
                                <th className="text-left py-3 text-sm font-bold text-gray-600 uppercase">Description</th>
                                <th className="text-right py-3 text-sm font-bold text-gray-600 uppercase">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-100">
                                <td className="py-4 text-gray-900">
                                    <p className="font-medium">Dormitory Fee / Service Charge</p>
                                    {invoice.notes && <p className="text-sm text-gray-500 mt-1">{invoice.notes}</p>}
                                </td>
                                <td className="py-4 text-right text-gray-900 font-medium">
                                    {formatCurrency(invoice.price)}
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td className="pt-6 text-right font-bold text-gray-900 text-lg">Total</td>
                                <td className="pt-6 text-right font-bold text-emerald-600 text-2xl">
                                    {formatCurrency(invoice.price)}
                                </td>
                            </tr>
                        </tfoot>
                    </table>

                    <div className="border-t border-gray-200 pt-8">
                        <h4 className="font-bold text-gray-900 mb-2">Payment Information</h4>
                        <p className="text-sm text-gray-600 mb-1">Bank: Vietcombank - CN TP.HCM</p>
                        <p className="text-sm text-gray-600 mb-1">Account Name: TRUONG DAI HOC VAN LANG</p>
                        <p className="text-sm text-gray-600">Account Number: 0071000078999</p>
                        <p className="text-sm text-gray-500 mt-4 italic">
                            * Please include the Invoice ID ({invoice.id}) and MSSV ({invoice.mssv}) in the transfer description.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
