import { PrismaClient, UserRole, RoomStatus, RegistrationStatus, TransferStatus } from '@prisma/client';
import { transferService } from './services/transfer.service';

const prisma = new PrismaClient();

async function main() {
    console.log('--- Starting Feature 2.1 Verification ---');

    // 1. Setup: Create Admin, Student, and Rooms
    const admin = await prisma.user.create({
        data: {
            username: `admin_transfer_${Date.now()}`,
            password: 'password',
            role: UserRole.ROOM_MANAGER
        }
    });

    const student = await prisma.user.create({
        data: {
            username: `student_transfer_${Date.now()}`,
            password: 'password',
            role: UserRole.STUDENT,
            studentHardProfile: {
                create: {
                    fullName: 'Transfer Student',
                    idCard: `ID_${Date.now()}`,
                    mssv: `MSSV_${Date.now()}`
                }
            }
        }
    });

    const roomA = await prisma.room.create({
        data: {
            name: `Room A ${Date.now()}`,
            type: 'Standard',
            capacity: 4,
            price: 100,
            currentOccupancy: 1,
            status: RoomStatus.AVAILABLE
        }
    });

    const roomB = await prisma.room.create({
        data: {
            name: `Room B ${Date.now()}`,
            type: 'Service',
            capacity: 2,
            price: 200,
            currentOccupancy: 0,
            status: RoomStatus.AVAILABLE
        }
    });

    // 2. Setup: Register Student in Room A
    await prisma.registration.create({
        data: {
            studentId: student.id,
            roomId: roomA.id,
            status: RegistrationStatus.CHECKED_IN,
            startDate: new Date()
        }
    });

    console.log('Setup Complete: Student registered in Room A');

    // 3. Test Case 1: Validation Failure (Unpaid Debt)
    console.log('\n--- Test Case 1: Validation Failure (Unpaid Debt) ---');
    await prisma.feeNotice.create({
        data: {
            studentId: student.id,
            title: 'Old Debt',
            amount: 50,
            dueDate: new Date(),
            status: 'PENDING'
        }
    });

    const request1 = await transferService.createTransferRequest(student.id, {
        reason: 'Want better room',
        desiredRoomType: 'Service',
        proofs: []
    });

    const validation1 = await transferService.validateTransferRequest(request1.id);
    console.log('Validation Result (Expected False):', validation1);

    if (validation1.valid) throw new Error('Test Case 1 Failed: Should verify unpaid debt');

    // Cleanup Debt
    await prisma.feeNotice.deleteMany({ where: { studentId: student.id } });

    // 4. Test Case 2: Successful Transfer
    console.log('\n--- Test Case 2: Successful Transfer ---');

    const validation2 = await transferService.validateTransferRequest(request1.id);
    console.log('Validation Result (Expected True):', validation2);

    if (!validation2.valid) throw new Error('Test Case 2 Failed: Should be valid after debt clear');

    const newReg = await transferService.approveTransferRequest(request1.id, roomB.id, admin.id);
    console.log('Transfer Approved. New Registration ID:', newReg.id);

    // Verify Database State
    const oldReg = await prisma.registration.findFirst({
        where: { studentId: student.id, roomId: roomA.id }
    });
    const updatedRoomA = await prisma.room.findUnique({ where: { id: roomA.id } });
    const updatedRoomB = await prisma.room.findUnique({ where: { id: roomB.id } });
    const updatedRequest = await prisma.roomTransferRequest.findUnique({ where: { id: request1.id } });

    console.log('Old Registration Status:', oldReg?.status); // Should be CHECKED_OUT
    console.log('Room A Occupancy:', updatedRoomA?.currentOccupancy); // Should be 0 (started 1, decremented)
    console.log('Room B Occupancy:', updatedRoomB?.currentOccupancy); // Should be 1
    console.log('Request Status:', updatedRequest?.status); // Should be APPROVED

    if (oldReg?.status !== RegistrationStatus.CHECKED_OUT) throw new Error('Old registration not checked out');
    if (updatedRoomA?.currentOccupancy !== 0) throw new Error('Room A occupancy not updated');
    if (updatedRoomB?.currentOccupancy !== 1) throw new Error('Room B occupancy not updated');
    if (updatedRequest?.status !== TransferStatus.APPROVED) throw new Error('Request status not updated');

    console.log('\n--- Feature 2.1 Verification Successful ---');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
