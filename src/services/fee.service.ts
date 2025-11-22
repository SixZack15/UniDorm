import { PrismaClient, RegistrationStatus } from '@prisma/client';

const prisma = new PrismaClient();

// Hardcoded rates for now
const ELECTRICITY_RATE = 3000; // VND per kWh
const WATER_RATE = 10000;      // VND per m3

export const feeService = {
    /**
     * Record utility reading for a room
     */
    async recordUtilityReading(roomId: string, month: number, year: number, electricityIndex: number, waterIndex: number) {
        return prisma.utilityReading.upsert({
            where: {
                roomId_month_year: {
                    roomId,
                    month,
                    year
                }
            },
            update: {
                electricityIndex,
                waterIndex
            },
            create: {
                roomId,
                month,
                year,
                electricityIndex,
                waterIndex
            }
        });
    },

    /**
     * Generate monthly fee notices for all active students
     * Fee = Room Price + (Electricity * Rate) + (Water * Rate)
     * Note: Simplified calculation assuming index is usage for now, or we'd need previous month's reading.
     * For this MVP, we'll treat the input index as "Usage this month".
     */
    async generateMonthlyFees(month: number, year: number) {
        // 1. Find all active registrations (CHECKED_IN)
        const activeRegistrations = await prisma.registration.findMany({
            where: {
                status: RegistrationStatus.CHECKED_IN
            },
            include: {
                room: {
                    include: {
                        utilityReadings: {
                            where: { month, year }
                        }
                    }
                },
                student: true
            }
        });

        const generatedNotices = [];

        for (const reg of activeRegistrations) {
            const room = reg.room;
            const reading = room.utilityReadings[0]; // Should be only one due to unique constraint

            // Default to 0 usage if no reading found (or handle as error/warning)
            const electricityUsage = reading ? reading.electricityIndex : 0;
            const waterUsage = reading ? reading.waterIndex : 0;

            const electricityCost = electricityUsage * ELECTRICITY_RATE;
            const waterCost = waterUsage * WATER_RATE;
            const totalAmount = room.price + electricityCost + waterCost;

            const description = `Room Fee: ${room.price}, Electricity: ${electricityCost} (${electricityUsage} kWh), Water: ${waterCost} (${waterUsage} m3)`;

            // Create Fee Notice
            const notice = await prisma.feeNotice.create({
                data: {
                    studentId: reg.studentId,
                    title: `Dorm Fee - ${month}/${year}`,
                    amount: totalAmount,
                    description,
                    dueDate: new Date(year, month, 5), // Due 5th of next month (simplified)
                    status: 'PENDING'
                }
            });

            generatedNotices.push(notice);
        }

        return generatedNotices;
    },

    /**
     * Get fee notices for a student
     */
    async getStudentFeeNotices(studentId: string) {
        return prisma.feeNotice.findMany({
            where: { studentId },
            orderBy: { createdAt: 'desc' }
        });
    }
};
