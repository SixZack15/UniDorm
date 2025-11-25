'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface StudentDetail {
    id: string;
    name: string;
    email: string;
    phone: string;
    faculty: string;
    currentRoom: string;
    parentName: string;
    parentPhone: string;
    parentEmail: string;
    checkInHistory: CheckInRecord[];
}

interface CheckInRecord {
    id: string;
    room: string;
    checkInDate: string;
    checkOutDate?: string;
    status: 'active' | 'completed';
}

export default function ViewStudentPage() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [student, setStudent] = useState<StudentDetail | null>(null);

    useEffect(() => {
        // Mock data - in real app, fetch from API
        const mockStudent: StudentDetail = {
            id: id || '21748020',
            name: 'Nguyễn Văn A',
            email: '21748020@vanlanguni.vn',
            phone: '0901234567',
            faculty: 'Công Nghệ Thông Tin',
            currentRoom: 'A.304',
            parentName: 'Nguyễn Văn Cha',
            parentPhone: '0987654321',
            parentEmail: 'nguyenvancha@email.com',
            checkInHistory: [
                {
                    id: 'CI-001',
                    room: 'A.304',
                    checkInDate: '2025-09-01',
                    status: 'active'
                },
                {
                    id: 'CI-002',
                    room: 'B.205',
                    checkInDate: '2025-01-15',
                    checkOutDate: '2025-08-30',
                    status: 'completed'
                },
                {
                    id: 'CI-003',
                    room: 'A.101',
                    checkInDate: '2024-09-01',
                    checkOutDate: '2025-01-10',
                    status: 'completed'
                }
            ]
        };
        setStudent(mockStudent);
    }, [id]);

    if (!student) {
        return (
            <div className="p-12 text-center">
                <p className="text-gray-500">Loading student information...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Student Details</h1>
                    <p className="text-gray-600 mt-1">Complete student information and history</p>
                </div>
                <Link
                    href="/management/students"
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to List
                </Link>
            </div>

            {/* Student Info Card */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-primary to-primary-dark p-6 text-white">
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-4xl font-bold">
                            {student.name.charAt(0)}
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold">{student.name}</h2>
                            <p className="text-primary-light mt-1">Student ID: {student.id}</p>
                            <div className="flex items-center gap-4 mt-2">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-white/20">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                    Room {student.currentRoom}
                                </span>
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-emerald-500/80">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Active
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Student Information */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                                <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Student Information
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-start">
                                    <span className="text-sm font-medium text-gray-500 w-32">Email:</span>
                                    <span className="text-sm text-gray-900">{student.email}</span>
                                </div>
                                <div className="flex items-start">
                                    <span className="text-sm font-medium text-gray-500 w-32">Phone:</span>
                                    <span className="text-sm text-gray-900">{student.phone}</span>
                                </div>
                                <div className="flex items-start">
                                    <span className="text-sm font-medium text-gray-500 w-32">Faculty:</span>
                                    <span className="text-sm text-gray-900">{student.faculty}</span>
                                </div>
                                <div className="flex items-start">
                                    <span className="text-sm font-medium text-gray-500 w-32">Current Room:</span>
                                    <span className="text-sm font-bold text-primary">{student.currentRoom}</span>
                                </div>
                            </div>
                        </div>

                        {/* Parent Contact Information */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                                <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                Parent Contact Information
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-start">
                                    <span className="text-sm font-medium text-gray-500 w-32">Parent Name:</span>
                                    <span className="text-sm text-gray-900">{student.parentName}</span>
                                </div>
                                <div className="flex items-start">
                                    <span className="text-sm font-medium text-gray-500 w-32">Parent Phone:</span>
                                    <span className="text-sm text-gray-900">{student.parentPhone}</span>
                                </div>
                                <div className="flex items-start">
                                    <span className="text-sm font-medium text-gray-500 w-32">Parent Email:</span>
                                    <span className="text-sm text-gray-900">{student.parentEmail}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Check-in/Checkout History */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Check-in & Checkout History
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">Complete history of room assignments</p>
                </div>

                <div className="p-6">
                    <div className="space-y-4">
                        {student.checkInHistory.map((record, index) => (
                            <div
                                key={record.id}
                                className={`relative p-5 rounded-lg border-2 transition-all ${
                                    record.status === 'active'
                                        ? 'border-emerald-300 bg-emerald-50'
                                        : 'border-gray-200 bg-white hover:bg-gray-50'
                                }`}
                            >
                                {record.status === 'active' && (
                                    <div className="absolute top-3 right-3">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-500 text-white">
                                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            Current
                                        </span>
                                    </div>
                                )}

                                <div className="flex items-start gap-4">
                                    <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                                        record.status === 'active' ? 'bg-emerald-200' : 'bg-gray-200'
                                    }`}>
                                        <svg className={`w-6 h-6 ${record.status === 'active' ? 'text-emerald-700' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h4 className="text-lg font-bold text-gray-900">Room {record.room}</h4>
                                            <span className="text-xs text-gray-500">#{record.id}</span>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                            <div className="flex items-center gap-2">
                                                <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                                </svg>
                                                <div>
                                                    <span className="text-gray-500 font-medium">Check-in:</span>
                                                    <span className="ml-2 text-gray-900 font-semibold">
                                                        {new Date(record.checkInDate).toLocaleDateString('vi-VN')}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                {record.checkOutDate ? (
                                                    <>
                                                        <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                        </svg>
                                                        <div>
                                                            <span className="text-gray-500 font-medium">Checkout:</span>
                                                            <span className="ml-2 text-gray-900 font-semibold">
                                                                {new Date(record.checkOutDate).toLocaleDateString('vi-VN')}
                                                            </span>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        <div>
                                                            <span className="text-gray-500 font-medium">Checkout:</span>
                                                            <span className="ml-2 text-emerald-600 font-semibold">Ongoing</span>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        {record.checkOutDate && (
                                            <div className="mt-3 pt-3 border-t border-gray-200">
                                                <span className="text-xs text-gray-500">
                                                    Duration: {Math.ceil((new Date(record.checkOutDate).getTime() - new Date(record.checkInDate).getTime()) / (1000 * 60 * 60 * 24))} days
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {student.checkInHistory.length === 0 && (
                        <div className="text-center py-12">
                            <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <p className="text-gray-500 font-medium">No check-in history available</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
