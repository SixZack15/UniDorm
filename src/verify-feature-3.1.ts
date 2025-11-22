import { PrismaClient, RegistrationStatus, RoomStatus, UserRole } from '@prisma/client';
import { feeService } from './services/fee.service';

const prisma = new PrismaClient();

async function main() {
    console.log('--- Starting Feature 3.1 Verification ---');

    // 1. Setup: Create Room, Student, Registration
    const room = await prisma.room.create({
        data: {
            name: `Fee Room ${Date.now()}`,
            type: 'Standard',
            capacity: 4,
            price: 1000000,
            currentOccupancy: 1,
            status: RoomStatus.AVAILABLE
        }
    });

    const student = await prisma.user.create({
        data: {
            username: `fee_student_${Date.now()}`,
            password: 'password',
            role: UserRole.STUDENT
        }
    });

    await prisma.registration.create({
        data: {
            studentId: student.id,
            roomId: room.id,
            status: RegistrationStatus.CHECKED_IN
        }
    });

    console.log('Setup Complete: Room and Student created');

    // 2. Record Utility Reading
    const month = 10;
    const year = 2023;
    const electricity = 50; // 50 kWh
    const water = 5;        // 5 m3

    await feeService.recordUtilityReading(room.id, month, year, electricity, water);
    console.log('Utility Reading Recorded');

    // 3. Generate Fees
    console.log('Generating Monthly Fees...');
    const notices = await feeService.generateMonthlyFees(month, year);

    // 4. Verify
    const studentNotice = notices.find(n => n.studentId === student.id);

    if (!studentNotice) {
        throw new Error('Fee Notice not generated for student');
    }

    const expectedAmount = 1000000 + (50 * 3000) + (5 * 10000); // 1,000,000 + 150,000 + 50,000 = 1,200,000

    console.log('Generated Notice:', studentNotice);
    console.log(`Expected Amount: ${expectedAmount}, Actual: ${studentNotice.amount}`);

    if (studentNotice.amount !== expectedAmount) {
        throw new Error(`Fee calculation incorrect. Expected ${expectedAmount}, got ${studentNotice.amount}`);
    }

    console.log('Fee Calculation Verified Success');
    console.log('\n--- Feature 3.1 Verification Successful ---');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
