import { PrismaClient, VisitStatus } from '@prisma/client';

const prisma = new PrismaClient();

export const relativeService = {
    /**
     * Add a relative for a student.
     */
    async addRelative(studentId: string, data: {
        name: string;
        relationship: string;
        phone: string;
        address?: string;
        isEmergencyContact?: boolean;
    }) {
        return prisma.relative.create({
            data: {
                studentId,
                ...data
            }
        });
    },

    /**
     * Update a relative.
     */
    async updateRelative(relativeId: string, data: {
        name?: string;
        relationship?: string;
        phone?: string;
        address?: string;
        isEmergencyContact?: boolean;
    }) {
        return prisma.relative.update({
            where: { id: relativeId },
            data
        });
    },

    /**
     * Delete a relative.
     * Enforces Rule: Cannot delete if it's the last relative.
     */
    async deleteRelative(studentId: string, relativeId: string) {
        return prisma.$transaction(async (tx) => {
            const count = await tx.relative.count({
                where: { studentId }
            });

            if (count <= 1) {
                throw new Error('Cannot delete the last relative. You must have at least one contact.');
            }

            return tx.relative.delete({
                where: { id: relativeId }
            });
        });
    },

    /**
     * Get all relatives for a student.
     */
    async getRelatives(studentId: string) {
        return prisma.relative.findMany({
            where: { studentId }
        });
    },

    /**
     * Create a visit request.
     */
    async createVisitRequest(relativeId: string, purpose: string, expectedDate: Date) {
        return prisma.visitRequest.create({
            data: {
                relativeId,
                purpose,
                expectedDate,
                status: VisitStatus.PENDING
            }
        });
    },

    /**
     * Approve a visit request (BQL).
     */
    async approveVisitRequest(requestId: string, adminNote?: string) {
        return prisma.visitRequest.update({
            where: { id: requestId },
            data: {
                status: VisitStatus.APPROVED,
                adminNote
            }
        });
    },

    /**
     * Reject a visit request (BQL).
     */
    async rejectVisitRequest(requestId: string, reason: string) {
        return prisma.visitRequest.update({
            where: { id: requestId },
            data: {
                status: VisitStatus.REJECTED,
                adminNote: reason
            }
        });
    },

    /**
     * Get all pending visit requests (BQL).
     */
    async getPendingVisitRequests() {
        return prisma.visitRequest.findMany({
            where: { status: VisitStatus.PENDING },
            include: {
                relative: {
                    include: {
                        student: { include: { studentHardProfile: true } }
                    }
                }
            }
        });
    }
};
