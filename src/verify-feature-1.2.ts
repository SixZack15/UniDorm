import { PrismaClient, RoomStatus } from '@prisma/client';
import { roomService } from './services/room.service';
import { registrationService } from './services/registration.service';
import { invoiceService } from './services/invoice.service';

const prisma = new PrismaClient();

async function main() {
    console.log("Verifying Feature 1.2 with REAL Database Connections...");

    try {
        // 0. Setup: Create a dummy student and room
        console.log("\n[Setup] Creating test data...");
        const student = await prisma.user.create({
            data: {
                username: `student_${Date.now()}`,
                password: 'password123',
                role: 'STUDENT',
                studentSoftProfile: {
                    create: {
                        phoneNumber: '0909090909',
                        email: 'test@example.com',
                        emergencyContact: 'Mom',
                    }
                }
            }
        });

        const room = await prisma.room.create({
            data: {
                name: `Room_${Date.now()}`,
                type: 'Standard',
                capacity: 4,
                price: 3000000,
                status: RoomStatus.AVAILABLE,
                currentOccupancy: 0,
            }
        });
        console.log(`Created Student: ${student.id}, Room: ${room.id}`);

        // 1. Verify Room Search
        console.log("\n[Test] Room Service: searchRooms");
        const rooms = await roomService.searchRooms({ minPrice: 2000000, capacity: 4 });
        console.log(`Found ${rooms.length} rooms matching criteria.`);
        if (rooms.length === 0) throw new Error("Search failed to find the created room.");

        // 2. Verify Registration Workflow
        console.log("\n[Test] Registration Workflow");

        // Step 1: Register
        const reg = await registrationService.createRegistration(student.id, room.id);
        console.log(`Step 1: Created Registration ${reg.id} - Status: ${reg.status}`);
        if (reg.status !== 'PENDING') throw new Error("Initial status should be PENDING");

        // Step 2: Validate (BQL)
        const adminId = 'admin_id_placeholder'; // In real app, this comes from auth
        const validatedReg = await registrationService.validateRegistration(adminId, reg.id, true);
        console.log(`Step 2: Validated Registration - Status: ${validatedReg.status}`);
        if (validatedReg.status !== 'VALIDATED') throw new Error("Status should be VALIDATED");

        // Step 3: Confirm Assignment (Room Manager)
        const approvedReg = await registrationService.confirmRoomAssignment(adminId, reg.id);
        console.log(`Step 3: Confirmed Assignment - Status: ${approvedReg.status}`);
        if (approvedReg.status !== 'APPROVED') throw new Error("Status should be APPROVED");

        // Check Invoice
        const invoice = await prisma.invoice.findFirst({
            where: { feeNotice: { studentId: student.id } }
        });
        if (!invoice) throw new Error("Invoice was not created automatically.");
        console.log(`   -> Invoice created: ${invoice.id} for amount ${invoice.amount}`);

        // Step 4: Pay (Finance)
        await invoiceService.confirmPayment(invoice.id, 'Bank Transfer');
        const paidReg = await prisma.registration.findUnique({ where: { id: reg.id } });
        console.log(`Step 4: Payment Confirmed - Status: ${paidReg?.status}`);
        if (paidReg?.status !== 'DEPOSIT_PAID') throw new Error("Status should be DEPOSIT_PAID");

        // Step 5: Digital Commitment
        const finalReg = await registrationService.submitDigitalCommitment(reg.id, ['proof.jpg']);
        console.log(`Step 5: Digital Commitment Submitted - Status: ${finalReg.status}`);
        if (finalReg.status !== 'READY_FOR_CHECKIN') throw new Error("Status should be READY_FOR_CHECKIN");

        console.log("\nSUCCESS: Full workflow verified with real DB operations.");

    } catch (error) {
        console.error("\nFAILED:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
