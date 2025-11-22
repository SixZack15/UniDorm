import { PrismaClient, RegistrationStatus, CheckoutStatus } from '@prisma/client';

const prisma = new PrismaClient();

export const physicalOpsService = {
    /**
     * Physical Check-in (BQL)
     * Pre-condition: Registration is READY_FOR_CHECKIN
     * Action: Update status to CHECKED_IN, Increment Room Occupancy
     */
    async physicalCheckIn(registrationId: string) {
        return prisma.$transaction(async (tx) => {
            const registration = await tx.registration.findUniqueOrThrow({
                where: { id: registrationId },
                include: { room: true }
            });

            if (registration.status !== RegistrationStatus.READY_FOR_CHECKIN) {
                throw new Error('Student is not ready for check-in.');
            }

            // Update Registration
            const updatedReg = await tx.registration.update({
                where: { id: registrationId },
                data: { status: RegistrationStatus.CHECKED_IN }
            });

            // Increment Room Occupancy
            await tx.room.update({
                where: { id: registration.roomId },
                data: { currentOccupancy: { increment: 1 } }
            });

            return updatedReg;
        });
    },

    /**
     * Get Today's Arrivals
     * Students with status READY_FOR_CHECKIN or CHECKED_IN (updated today)
     */
    async getTodaysArrivals() {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        return prisma.registration.findMany({
            where: {
                OR: [
                    { status: RegistrationStatus.READY_FOR_CHECKIN },
                    {
                        status: RegistrationStatus.CHECKED_IN,
                        updatedAt: { gte: startOfDay }
                    }
                ]
            },
            include: {
                student: { include: { studentHardProfile: true } },
                room: true
            }
        });
    },

    /**
     * Get Today's Departures
     * CheckoutRequests with status APPROVED or COMPLETED (updated today)
     */
    async getTodaysDepartures() {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        return prisma.checkoutRequest.findMany({
            where: {
                OR: [
                    { status: CheckoutStatus.APPROVED },
                    {
                        status: CheckoutStatus.COMPLETED,
                        updatedAt: { gte: startOfDay }
                    }
                ]
            },
            include: {
                student: { include: { studentHardProfile: true } }
            }
        });
    }
};
