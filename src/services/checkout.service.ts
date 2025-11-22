import { PrismaClient, CheckoutStatus, CheckoutType, RegistrationStatus, RoomStatus } from '@prisma/client';

const prisma = new PrismaClient();

export const checkoutService = {
    /**
     * Create a voluntary checkout request (Student)
     */
    async createCheckoutRequest(studentId: string, data: {
        reason: string;
        desiredDate: Date;
    }) {
        const activeRegistration = await prisma.registration.findFirst({
            where: {
                studentId,
                status: RegistrationStatus.CHECKED_IN
            }
        });

        if (!activeRegistration) {
            throw new Error('Student is not currently checked in.');
        }

        return prisma.checkoutRequest.create({
            data: {
                studentId,
                type: CheckoutType.VOLUNTARY,
                status: CheckoutStatus.PENDING,
                ...data
            }
        });
    },

    /**
     * Create a forced eviction (Room Manager)
     * Immediately processes the checkout.
     */
    async createForcedCheckout(studentId: string, reason: string, adminId: string) {
        return prisma.$transaction(async (tx) => {
            const activeRegistration = await tx.registration.findFirstOrThrow({
                where: {
                    studentId,
                    status: RegistrationStatus.CHECKED_IN
                }
            });

            // 1. Create Request Record
            const request = await tx.checkoutRequest.create({
                data: {
                    studentId,
                    type: CheckoutType.FORCED,
                    status: CheckoutStatus.COMPLETED,
                    reason: 'Forced Eviction',
                    desiredDate: new Date(),
                    adminNote: reason,
                    assetInspectionPassed: true, // Assume forced eviction bypasses or auto-fails inspection logic handled elsewhere
                    assetInspectionNotes: 'Forced eviction by admin.'
                }
            });

            // 2. Update Registration
            await tx.registration.update({
                where: { id: activeRegistration.id },
                data: {
                    status: RegistrationStatus.CHECKED_OUT,
                    endDate: new Date()
                }
            });

            // 3. Update Room Occupancy
            await tx.room.update({
                where: { id: activeRegistration.roomId },
                data: { currentOccupancy: { decrement: 1 } }
            });

            return request;
        });
    },

    /**
     * Update inspection results (Room Manager)
     */
    async updateInspectionResult(requestId: string, passed: boolean, notes: string) {
        return prisma.checkoutRequest.update({
            where: { id: requestId },
            data: {
                status: CheckoutStatus.INSPECTED,
                assetInspectionPassed: passed,
                assetInspectionNotes: notes
            }
        });
    },

    /**
     * Confirm Checkout (Room Manager)
     * Validates debts and finalizes the process.
     */
    async confirmCheckout(requestId: string, adminId: string) {
        return prisma.$transaction(async (tx) => {
            const request = await tx.checkoutRequest.findUniqueOrThrow({
                where: { id: requestId }
            });

            if (request.status !== CheckoutStatus.INSPECTED) {
                throw new Error('Request must be inspected before confirmation.');
            }

            if (!request.assetInspectionPassed) {
                throw new Error('Cannot confirm checkout: Asset inspection failed.');
            }

            // 1. Check for Unpaid Debts
            const unpaidFees = await tx.feeNotice.count({
                where: {
                    studentId: request.studentId,
                    status: { not: 'PAID' }
                }
            });

            if (unpaidFees > 0) {
                throw new Error(`Cannot confirm checkout: Student has ${unpaidFees} unpaid fee notice(s).`);
            }

            // 2. Find Active Registration (Just to verify, but don't update yet)
            await tx.registration.findFirstOrThrow({
                where: {
                    studentId: request.studentId,
                    status: RegistrationStatus.CHECKED_IN
                }
            });

            // 3. Update Request Status to APPROVED (Ready for Departure)
            return tx.checkoutRequest.update({
                where: { id: requestId },
                data: {
                    status: CheckoutStatus.APPROVED,
                    adminNote: `Approved by admin ${adminId}. Ready for physical checkout.`
                }
            });
        });
    },

    /**
     * Physical Check-out (BQL)
     * Pre-condition: Request is APPROVED
     * Action: Update Registration to CHECKED_OUT, Decrement Room Occupancy, Complete Request
     */
    async physicalCheckOut(requestId: string) {
        return prisma.$transaction(async (tx) => {
            const request = await tx.checkoutRequest.findUniqueOrThrow({
                where: { id: requestId }
            });

            if (request.status !== CheckoutStatus.APPROVED) {
                throw new Error('Checkout request is not approved for departure.');
            }

            // 1. Update Registration
            const registration = await tx.registration.findFirstOrThrow({
                where: {
                    studentId: request.studentId,
                    status: RegistrationStatus.CHECKED_IN
                }
            });

            await tx.registration.update({
                where: { id: registration.id },
                data: {
                    status: RegistrationStatus.CHECKED_OUT,
                    endDate: new Date()
                }
            });

            // 2. Update Room Occupancy
            await tx.room.update({
                where: { id: registration.roomId },
                data: { currentOccupancy: { decrement: 1 } }
            });

            // 3. Complete Request
            return tx.checkoutRequest.update({
                where: { id: requestId },
                data: { status: CheckoutStatus.COMPLETED }
            });
        });
    },

    /**
     * Get pending requests
     */
    async getPendingRequests() {
        return prisma.checkoutRequest.findMany({
            where: { status: { in: [CheckoutStatus.PENDING, CheckoutStatus.INSPECTED] } },
            include: { student: { include: { studentHardProfile: true } } },
            orderBy: { createdAt: 'asc' }
        });
    }
};
