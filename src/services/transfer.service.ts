import { PrismaClient, TransferStatus, RegistrationStatus, RoomStatus } from '@prisma/client';

const prisma = new PrismaClient();

export const transferService = {
    /**
     * Create a new transfer request
     */
    async createTransferRequest(studentId: string, data: {
        reason: string;
        desiredRoomType: string;
        proofs: string[];
    }) {
        // Check if student has an active registration
        const activeRegistration = await prisma.registration.findFirst({
            where: {
                studentId,
                status: {
                    in: [RegistrationStatus.CHECKED_IN, RegistrationStatus.READY_FOR_CHECKIN]
                }
            }
        });

        if (!activeRegistration) {
            throw new Error('Student does not have an active room registration.');
        }

        return prisma.roomTransferRequest.create({
            data: {
                studentId,
                oldRoomId: activeRegistration.roomId,
                ...data,
                status: TransferStatus.PENDING
            }
        });
    },

    /**
     * Get transfer requests with optional filtering
     */
    async getTransferRequests(filter?: { status?: TransferStatus }) {
        return prisma.roomTransferRequest.findMany({
            where: filter,
            include: {
                student: {
                    select: {
                        id: true,
                        username: true,
                        studentHardProfile: { select: { fullName: true, mssv: true } }
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
    },

    /**
     * Validate a transfer request (Auto-check debts and violations)
     */
    async validateTransferRequest(requestId: string) {
        const request = await prisma.roomTransferRequest.findUnique({
            where: { id: requestId },
            include: { student: true }
        });

        if (!request) throw new Error('Request not found');

        // 1. Check Unpaid Debts
        const unpaidFees = await prisma.feeNotice.count({
            where: {
                studentId: request.studentId,
                status: { not: 'PAID' }
            }
        });

        if (unpaidFees > 0) {
            return { valid: false, reason: `Student has ${unpaidFees} unpaid fee notice(s).` };
        }

        // 2. Check Recent Violations (last 3 months)
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

        const recentViolations = await prisma.violation.count({
            where: {
                studentId: request.studentId,
                date: { gte: threeMonthsAgo }
            }
        });

        if (recentViolations > 0) {
            return { valid: false, reason: `Student has ${recentViolations} violation(s) in the last 3 months.` };
        }

        return { valid: true };
    },

    /**
     * Approve a transfer request
     */
    async approveTransferRequest(requestId: string, targetRoomId: string, adminId: string) {
        return prisma.$transaction(async (tx) => {
            const request = await tx.roomTransferRequest.findUniqueOrThrow({
                where: { id: requestId }
            });

            if (request.status !== TransferStatus.PENDING) {
                throw new Error('Request is not pending');
            }

            // 1. Verify Target Room Availability
            const targetRoom = await tx.room.findUniqueOrThrow({ where: { id: targetRoomId } });
            if (targetRoom.currentOccupancy >= targetRoom.capacity || targetRoom.status !== RoomStatus.AVAILABLE) {
                throw new Error('Target room is not available');
            }

            // 2. Find Active Registration
            const currentRegistration = await tx.registration.findFirstOrThrow({
                where: {
                    studentId: request.studentId,
                    status: { in: [RegistrationStatus.CHECKED_IN, RegistrationStatus.READY_FOR_CHECKIN] }
                }
            });

            // 3. Update Old Registration -> CHECKED_OUT
            await tx.registration.update({
                where: { id: currentRegistration.id },
                data: {
                    status: RegistrationStatus.CHECKED_OUT,
                    endDate: new Date()
                }
            });

            // 4. Decrement Old Room Occupancy
            await tx.room.update({
                where: { id: currentRegistration.roomId },
                data: { currentOccupancy: { decrement: 1 } }
            });

            // 5. Create New Registration -> CHECKED_IN (Assuming immediate move)
            const newRegistration = await tx.registration.create({
                data: {
                    studentId: request.studentId,
                    roomId: targetRoomId,
                    status: RegistrationStatus.CHECKED_IN,
                    startDate: new Date()
                }
            });

            // 6. Increment New Room Occupancy
            await tx.room.update({
                where: { id: targetRoomId },
                data: { currentOccupancy: { increment: 1 } }
            });

            // 7. Update Request Status
            await tx.roomTransferRequest.update({
                where: { id: requestId },
                data: {
                    status: TransferStatus.APPROVED,
                    targetRoomId: targetRoomId,
                    adminNote: `Approved by admin ${adminId}`
                }
            });

            return newRegistration;
        });
    },

    /**
     * Reject a transfer request
     */
    async rejectTransferRequest(requestId: string, reason: string, adminId: string) {
        return prisma.roomTransferRequest.update({
            where: { id: requestId },
            data: {
                status: TransferStatus.REJECTED,
                adminNote: reason
            }
        });
    }
};
