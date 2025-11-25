'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface Report {
    id: string;
    type: 'utility_billing' | 'students_paid' | 'students_unpaid' | 'everything';
    period: 'monthly' | 'quarterly';
    month?: string;
    quarter?: string;
    year: string;
    createdAt: string;
    createdBy: string;
}

interface ReportData {
    totalRevenue: number;
    totalPaid: number;
    totalUnpaid: number;
    totalUtility: number;
    studentsPaid: number;
    studentsUnpaid: number;
    transactions: Transaction[];
}

interface Transaction {
    id: string;
    studentId: string;
    studentName: string;
    amount: number;
    type: string;
    status: 'paid' | 'unpaid';
    date: string;
}

export default function ViewReportPage() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [report, setReport] = useState<Report | null>(null);
    const [reportData, setReportData] = useState<ReportData | null>(null);

    useEffect(() => {
        if (id) {
            const stored = localStorage.getItem('accounting_reports');
            if (stored) {
                const reports: Report[] = JSON.parse(stored);
                const found = reports.find(r => r.id === id);
                if (found) {
                    setReport(found);
                    generateReportData(found);
                }
            }
        }
    }, [id]);

    const generateReportData = (report: Report) => {
        // Generate mock data based on report type
        const mockTransactions: Transaction[] = [];
        
        // Generate different data based on report type
        const numTransactions = report.type === 'everything' ? 15 : 
                               report.type === 'students_paid' ? 10 : 
                               report.type === 'students_unpaid' ? 5 : 8;

        for (let i = 1; i <= numTransactions; i++) {
            const isPaid = report.type === 'students_paid' ? true : 
                          report.type === 'students_unpaid' ? false : 
                          Math.random() > 0.3;

            const transactionType = report.type === 'utility_billing' ? 'Utility' :
                                   ['Room Fee', 'Utility', 'Service Fee'][Math.floor(Math.random() * 3)];

            mockTransactions.push({
                id: `TXN-${String(i).padStart(4, '0')}`,
                studentId: `2100${String(1000 + i).slice(-4)}`,
                studentName: `Student ${i}`,
                amount: Math.floor(Math.random() * 3000000) + 1000000,
                type: transactionType,
                status: isPaid ? 'paid' : 'unpaid',
                date: `2025-${report.month || '10'}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`
            });
        }

        const totalPaid = mockTransactions
            .filter(t => t.status === 'paid')
            .reduce((sum, t) => sum + t.amount, 0);

        const totalUnpaid = mockTransactions
            .filter(t => t.status === 'unpaid')
            .reduce((sum, t) => sum + t.amount, 0);

        const totalUtility = mockTransactions
            .filter(t => t.type === 'Utility')
            .reduce((sum, t) => sum + t.amount, 0);

        setReportData({
            totalRevenue: totalPaid + totalUnpaid,
            totalPaid,
            totalUnpaid,
            totalUtility,
            studentsPaid: mockTransactions.filter(t => t.status === 'paid').length,
            studentsUnpaid: mockTransactions.filter(t => t.status === 'unpaid').length,
            transactions: mockTransactions
        });
    };

    if (!report || !reportData) {
        return (
            <div className="p-12 text-center">
                <p className="text-gray-500">Report not found or loading...</p>
                <Link href="/accounting/reports" className="text-emerald-600 hover:underline mt-4 inline-block">
                    Return to Reports
                </Link>
            </div>
        );
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    const getReportTypeLabel = (type: Report['type']) => {
        const labels = {
            utility_billing: 'Utility Billing Report',
            students_paid: 'Students Paid Report',
            students_unpaid: 'Students Unpaid Report',
            everything: 'Complete Financial Report'
        };
        return labels[type];
    };

    const getPeriodLabel = (report: Report) => {
        if (report.period === 'monthly') {
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                              'July', 'August', 'September', 'October', 'November', 'December'];
            return `${monthNames[parseInt(report.month || '1') - 1]} ${report.year}`;
        } else {
            return `${report.quarter} ${report.year}`;
        }
    };

    const filteredTransactions = report.type === 'students_paid' 
        ? reportData.transactions.filter(t => t.status === 'paid')
        : report.type === 'students_unpaid'
        ? reportData.transactions.filter(t => t.status === 'unpaid')
        : report.type === 'utility_billing'
        ? reportData.transactions.filter(t => t.type === 'Utility')
        : reportData.transactions;

    return (
        <div className="max-w-6xl mx-auto">
            {/* Action Bar - Hidden when printing */}
            <div className="mb-6 flex items-center justify-between print:hidden">
                <Link 
                    href="/accounting/reports"
                    className="flex items-center text-gray-600 hover:text-gray-900 transition-colors font-medium"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Reports
                </Link>
                <button 
                    onClick={() => window.print()}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-lg shadow-md hover:from-emerald-700 hover:to-emerald-800 transition-all transform hover:scale-105"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    Export / Print Report
                </button>
            </div>

            {/* Report Container */}
            <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-200 print:shadow-none print:border-none">
                {/* Header */}
                <div className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 p-8 text-white">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <h1 className="text-4xl font-bold tracking-tight">{getReportTypeLabel(report.type)}</h1>
                            </div>
                            <p className="text-emerald-100 text-lg mt-2">{getPeriodLabel(report)}</p>
                            <p className="text-emerald-200 text-sm mt-1">Report ID: {report.id}</p>
                        </div>
                        <div className="text-right">
                            <h2 className="text-2xl font-bold">Van Lang University</h2>
                            <p className="text-emerald-100 text-sm mt-1">Dormitory Management</p>
                            <p className="text-emerald-200 text-xs mt-1">69/68 Dang Thuy Tram, Ward 13</p>
                            <p className="text-emerald-200 text-xs">Binh Thanh Dist, HCMC</p>
                        </div>
                    </div>
                </div>

                {/* Report Info */}
                <div className="bg-gray-50 px-8 py-4 border-b border-gray-200">
                    <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <span className="text-gray-600">Generated by: <span className="font-semibold text-gray-900">{report.createdBy}</span></span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-gray-600">Date: <span className="font-semibold text-gray-900">{new Date(report.createdAt).toLocaleString('vi-VN')}</span></span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Summary Statistics */}
                <div className="p-8 bg-gradient-to-br from-gray-50 to-white">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                        <svg className="w-6 h-6 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Summary Statistics
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {report.type !== 'students_unpaid' && (
                            <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-emerald-100 hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Total Paid</p>
                                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                                        <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-2xl font-bold text-emerald-600">{formatCurrency(reportData.totalPaid)}</p>
                                <p className="text-xs text-gray-500 mt-1">{reportData.studentsPaid} transactions</p>
                            </div>
                        )}

                        {report.type !== 'students_paid' && (
                            <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-red-100 hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Total Unpaid</p>
                                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                                        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-2xl font-bold text-red-600">{formatCurrency(reportData.totalUnpaid)}</p>
                                <p className="text-xs text-gray-500 mt-1">{reportData.studentsUnpaid} outstanding</p>
                            </div>
                        )}

                        {(report.type === 'everything' || report.type === 'utility_billing') && (
                            <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-blue-100 hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Utility Fees</p>
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-2xl font-bold text-blue-600">{formatCurrency(reportData.totalUtility)}</p>
                                <p className="text-xs text-gray-500 mt-1">Electricity & Water</p>
                            </div>
                        )}

                        <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-purple-100 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Total Revenue</p>
                                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                            <p className="text-2xl font-bold text-purple-600">{formatCurrency(reportData.totalRevenue)}</p>
                            <p className="text-xs text-gray-500 mt-1">Expected total</p>
                        </div>
                    </div>
                </div>

                {/* Transactions Table */}
                <div className="p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                        <svg className="w-6 h-6 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        Transaction Details
                    </h3>
                    <div className="overflow-x-auto rounded-xl border border-gray-200">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Transaction ID</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Student</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Type</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredTransactions.map((transaction) => (
                                    <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm font-medium text-gray-900">{transaction.id}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{transaction.studentName}</p>
                                                <p className="text-xs text-gray-500">{transaction.studentId}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm text-gray-900">{transaction.type}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm text-gray-600">{new Date(transaction.date).toLocaleDateString('vi-VN')}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                                                transaction.status === 'paid' 
                                                    ? 'bg-emerald-100 text-emerald-800' 
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {transaction.status === 'paid' ? 'Paid' : 'Unpaid'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <span className={`text-sm font-bold ${
                                                transaction.status === 'paid' ? 'text-emerald-600' : 'text-red-600'
                                            }`}>
                                                {formatCurrency(transaction.amount)}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-600">
                            <p className="font-semibold">Van Lang University Dormitory</p>
                            <p className="text-xs mt-1">This is an automatically generated report</p>
                        </div>
                        <div className="text-right text-sm text-gray-600">
                            <p>Report generated on:</p>
                            <p className="font-semibold">{new Date().toLocaleString('vi-VN')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
