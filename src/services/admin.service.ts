import { PrismaClient } from '@prisma/client';
import { checkActiveDebts, checkActiveRoom } from '../utils/validation';

const prisma = new PrismaClient();

interface UpdateHardProfileInput {
    fullName?: string;
    idCard?: string;
    mssv?: string;
}

interface UpdateFullProfileInput extends UpdateHardProfileInput {
    phoneNumber?: string;
    email?: string;
    emergencyContact?: string;
}

export const adminService = {
    /**
     * Updates a student's profile (Hard & Soft data) and logs the activity.
     * Enforces BR2: One MSSV = One Profile (via unique constraint in Schema).
     */
    async updateStudentProfile(
        adminId: string,
        targetStudentId: string,
        data: UpdateFullProfileInput
    ) {
        // 1. Separate Hard and Soft data
        const { fullName, idCard, mssv, ...softData } = data;

        // 2. Transaction to ensure atomicity
        const result = await prisma.$transaction(async (tx) => {
            // Update Hard Profile
            if (fullName || idCard || mssv) {
                await tx.studentHardProfile.upsert({
                    where: { userId: targetStudentId },
                    update: { fullName, idCard, mssv },
                    create: {
                        userId: targetStudentId,
                        fullName: fullName || '',
                        idCard: idCard || '',
                        mssv: mssv || '',
                    },
                });
            }

            // Update Soft Profile
            if (Object.keys(softData).length > 0) {
                await tx.studentSoftProfile.upsert({
                    where: { userId: targetStudentId },
                    update: { ...softData },
                    create: {
                        userId: targetStudentId,
                        phoneNumber: softData.phoneNumber || '',
                        email: softData.email || '',
                        emergencyContact: softData.emergencyContact || '',
                    },
                });
            }

            // 3. Log Activity
            await tx.activityLog.create({
                data: {
                    action: 'UPDATE_PROFILE',
                    performerId: adminId,
                    targetId: targetStudentId,
                    details: JSON.stringify(data),
                },
            });

            return await tx.user.findUnique({
                where: { id: targetStudentId },
                include: { studentHardProfile: true, studentSoftProfile: true },
            });
        });

        return result;
    },

    /**
     * Soft deletes a student if validation passes.
     */
    async softDeleteStudent(adminId: string, targetStudentId: string) {
        // 1. Validation: Check for active debts
        const hasDebts = await checkActiveDebts(targetStudentId);
        if (hasDebts) {
            throw new Error('Cannot delete student with active debts.');
        }

        // 2. Validation: Check for active room
        const hasRoom = await checkActiveRoom(targetStudentId);
        if (hasRoom) {
            throw new Error('Cannot delete student currently in a room.');
        }

        // 3. Perform Soft Delete
        await prisma.$transaction(async (tx) => {
            await tx.user.update({
                where: { id: targetStudentId },
                data: { isDeleted: true },
            });

            await tx.activityLog.create({
                data: {
                    action: 'SOFT_DELETE',
                    performerId: adminId,
                    targetId: targetStudentId,
                    details: 'Soft delete performed after validation.',
                },
            });
        });

        return { success: true };
    },
};
