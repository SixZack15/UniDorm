import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function checkActiveDebts(studentId: string): Promise<boolean> {
    const unpaidNotices = await prisma.feeNotice.count({
        where: {
            studentId: studentId,
            status: 'PENDING',
        },
    });
    return unpaidNotices > 0;
}

export async function checkActiveRoom(studentId: string): Promise<boolean> {
    const activeRegistration = await prisma.registration.count({
        where: {
            studentId: studentId,
            status: {
                in: ['APPROVED', 'CHECKED_IN'],
            },
        },
    });
    return activeRegistration > 0;
}
