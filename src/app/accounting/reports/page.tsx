'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

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

export default function AccountingReports() {
    const [reports, setReports] = useState<Report[]>([]);
    const [showForm, setShowForm] = useState(false);
    
    // Form states
    const [reportType, setReportType] = useState<Report['type']>('everything');
    const [period, setPeriod] = useState<'monthly' | 'quarterly'>('monthly');
    const [month, setMonth] = useState('');
    const [quarter, setQuarter] = useState('Q1');
    const [year, setYear] = useState(new Date().getFullYear().toString());

    useEffect(() => {
        loadReports();
    }, []);

    const loadReports = () => {
        const stored = localStorage.getItem('accounting_reports');
        if (stored) {
            setReports(JSON.parse(stored));
        } else {
            // Initialize with mock data
            const mockReports: Report[] = [
                {
                    id: 'RPT-001',
                    type: 'everything',
                    period: 'monthly',
                    month: '10',
                    year: '2025',
                    createdAt: '2025-10-31T10:30:00',
                    createdBy: 'Admin User'
                },
                {
                    id: 'RPT-002',
                    type: 'students_paid',
                    period: 'quarterly',
                    quarter: 'Q3',
                    year: '2025',
                    createdAt: '2025-09-30T14:20:00',
                    createdBy: 'Finance Manager'
                },
                {
                    id: 'RPT-003',
                    type: 'utility_billing',
                    period: 'monthly',
                    month: '09',
                    year: '2025',
                    createdAt: '2025-09-30T09:15:00',
                    createdBy: 'Admin User'
                },
                {
                    id: 'RPT-004',
                    type: 'students_unpaid',
                    period: 'monthly',
                    month: '10',
                    year: '2025',
                    createdAt: '2025-10-15T16:45:00',
                    createdBy: 'Finance Manager'
                }
            ];
            localStorage.setItem('accounting_reports', JSON.stringify(mockReports));
            setReports(mockReports);
        }
    };

    const handleCreateReport = (e: React.FormEvent) => {
        e.preventDefault();
        
        const newReport: Report = {
            id: `RPT-${String(reports.length + 1).padStart(3, '0')}`,
            type: reportType,
            period,
            month: period === 'monthly' ? month : undefined,
            quarter: period === 'quarterly' ? quarter : undefined,
            year,
            createdAt: new Date().toISOString(),
            createdBy: 'Current User'
        };

        const updatedReports = [newReport, ...reports];
        setReports(updatedReports);
        localStorage.setItem('accounting_reports', JSON.stringify(updatedReports));
        
        // Reset form
        setShowForm(false);
        setReportType('everything');
        setPeriod('monthly');
        setMonth('');
        setQuarter('Q1');
        setYear(new Date().getFullYear().toString());
    };

    const getReportTypeLabel = (type: Report['type']) => {
        const labels = {
            utility_billing: 'Utility Billing',
            students_paid: 'Students Paid',
            students_unpaid: 'Students Unpaid',
            everything: 'Complete Report'
        };
        return labels[type];
    };

    const getReportTypeColor = (type: Report['type']) => {
        const colors = {
            utility_billing: 'bg-blue-50 text-blue-700 border-blue-200',
            students_paid: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            students_unpaid: 'bg-red-50 text-red-700 border-red-200',
            everything: 'bg-purple-50 text-purple-700 border-purple-200'
        };
        return colors[type];
    };

    const getPeriodLabel = (report: Report) => {
        if (report.period === 'monthly') {
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return `${monthNames[parseInt(report.month || '1') - 1]} ${report.year}`;
        } else {
            return `${report.quarter} ${report.year}`;
        }
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Financial Reports</h1>
                    <p className="text-gray-600 mt-1">Generate and manage financial reports</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-lg shadow-md hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 transform hover:scale-105"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Create New Report
                </button>
            </div>

            {/* Create Report Form */}
            {showForm && (
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-4">
                        <h2 className="text-xl font-bold text-white">Create New Report</h2>
                    </div>
                    <form onSubmit={handleCreateReport} className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Report Type */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Report Type
                                </label>
                                <select
                                    value={reportType}
                                    onChange={(e) => setReportType(e.target.value as Report['type'])}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                    required
                                >
                                    <option value="everything">Complete Report (Everything)</option>
                                    <option value="utility_billing">Utility Billing</option>
                                    <option value="students_paid">Students Paid</option>
                                    <option value="students_unpaid">Students Unpaid</option>
                                </select>
                            </div>

                            {/* Period Type */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Period Type
                                </label>
                                <select
                                    value={period}
                                    onChange={(e) => setPeriod(e.target.value as 'monthly' | 'quarterly')}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                    required
                                >
                                    <option value="monthly">Monthly</option>
                                    <option value="quarterly">Quarterly</option>
                                </select>
                            </div>

                            {/* Month or Quarter */}
                            {period === 'monthly' ? (
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Month
                                    </label>
                                    <select
                                        value={month}
                                        onChange={(e) => setMonth(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                        required
                                    >
                                        <option value="">Select Month</option>
                                        <option value="01">January</option>
                                        <option value="02">February</option>
                                        <option value="03">March</option>
                                        <option value="04">April</option>
                                        <option value="05">May</option>
                                        <option value="06">June</option>
                                        <option value="07">July</option>
                                        <option value="08">August</option>
                                        <option value="09">September</option>
                                        <option value="10">October</option>
                                        <option value="11">November</option>
                                        <option value="12">December</option>
                                    </select>
                                </div>
                            ) : (
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Quarter
                                    </label>
                                    <select
                                        value={quarter}
                                        onChange={(e) => setQuarter(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                        required
                                    >
                                        <option value="Q1">Q1 (Jan - Mar)</option>
                                        <option value="Q2">Q2 (Apr - Jun)</option>
                                        <option value="Q3">Q3 (Jul - Sep)</option>
                                        <option value="Q4">Q4 (Oct - Dec)</option>
                                    </select>
                                </div>
                            )}

                            {/* Year */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Year
                                </label>
                                <input
                                    type="number"
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                    min="2020"
                                    max="2030"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                    required
                                />
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-md"
                            >
                                Generate Report
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Reports List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                    <h2 className="text-lg font-bold text-gray-900">Generated Reports</h2>
                    <p className="text-sm text-gray-600 mt-1">View and export previously generated reports</p>
                </div>

                {reports.length === 0 ? (
                    <div className="p-12 text-center">
                        <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-gray-500 font-medium">No reports generated yet</p>
                        <p className="text-sm text-gray-400 mt-1">Click "Create New Report" to get started</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-200">
                        {reports.map((report) => (
                            <div
                                key={report.id}
                                className="p-6 hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-lg font-bold text-gray-900">{report.id}</h3>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getReportTypeColor(report.type)}`}>
                                                {getReportTypeLabel(report.type)}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-gray-600">
                                            <div className="flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <span className="font-medium">{getPeriodLabel(report)}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                <span>{report.createdBy}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span>{new Date(report.createdAt).toLocaleString('vi-VN')}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-center gap-3 ml-6">
                                        <Link
                                            href={`/accounting/reports/view?id=${report.id}`}
                                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                                        >
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            View
                                        </Link>
                                        <Link
                                            href={`/accounting/reports/view?id=${report.id}`}
                                            className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                                        >
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                            </svg>
                                            Export
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
