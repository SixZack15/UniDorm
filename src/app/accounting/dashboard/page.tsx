'use client';

import React from 'react';

export default function AccountingDashboard() {
    // Mock Data
    const stats = [
        {
            label: 'Tổng số phiếu báo phí',
            value: '1,250',
            icon: (
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
            color: 'bg-blue-50 border-blue-200',
            textColor: 'text-blue-900'
        },
        {
            label: 'Tổng số phí đã thu',
            value: '5,400,000,000 ₫',
            icon: (
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            color: 'bg-emerald-50 border-emerald-200',
            textColor: 'text-emerald-900'
        },
        {
            label: 'Tổng số phí còn nợ',
            value: '350,000,000 ₫',
            icon: (
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            ),
            color: 'bg-red-50 border-red-200',
            textColor: 'text-red-900'
        }
    ];

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Financial Dashboard</h1>
                <div className="text-sm text-gray-500">
                    Last updated: {new Date().toLocaleDateString('vi-VN')}
                </div>
            </div>

            {/* Summary Panel */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <div 
                        key={index} 
                        className={`p-6 rounded-xl border shadow-sm transition-all hover:shadow-md ${stat.color}`}
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <p className={`text-sm font-medium ${stat.textColor} opacity-80`}>
                                    {stat.label}
                                </p>
                                <h3 className={`text-2xl font-bold mt-2 ${stat.textColor}`}>
                                    {stat.value}
                                </h3>
                            </div>
                            <div className={`p-3 rounded-lg bg-white/60`}>
                                {stat.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Activity / Placeholder for charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Transactions</h3>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-sm">
                                        SV
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Student Payment #{1000 + i}</p>
                                        <p className="text-xs text-gray-500">Room Fee - Oct 2025</p>
                                    </div>
                                </div>
                                <span className="font-bold text-emerald-600">+ 2,500,000 ₫</span>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-4 py-2 text-sm text-emerald-600 font-medium hover:bg-emerald-50 rounded-lg transition-colors">
                        View All Transactions
                    </button>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Outstanding Invoices</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-sm">
                                        !
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Overdue Invoice #{2000 + i}</p>
                                        <p className="text-xs text-gray-500">Due: 15/10/2025</p>
                                    </div>
                                </div>
                                <span className="font-bold text-red-600">1,200,000 ₫</span>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-4 py-2 text-sm text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition-colors">
                        View All Invoices
                    </button>
                </div>
            </div>
        </div>
    );
}
