'use client';

import { useSearchParams } from 'next/navigation';
import StudentForm from '@/components/StudentForm';

export default function EditStudentPage() {
    const searchParams = useSearchParams();
    const studentId = searchParams.get('id') || undefined;

    return <StudentForm studentId={studentId} isEdit={true} />;
}

