import { PrismaClient, UserRole, RoomStatus, RegistrationStatus, CheckoutStatus, CheckoutType } from '@prisma/client';
import { checkoutService } from './services/checkout.service';

const prisma = new PrismaClient();

async function main() {
    console.log('--- Starting Feature 2.2 Verification ---');

    // 1. Setup: Create Admin, Student, and Room
    const admin = await prisma.user.create({
        data: {
            username: `admin_checkout_${Date.now()}`,
            password: 'password',
            role: UserRole.ROOM_MANAGER
        }
    });

    const student = await prisma.user.create({
        data: {
            username: `student_checkout_${Date.now()}`,
            password: 'password',
            role: UserRole.STUDENT,
            studentHardProfile: {
                create: {
                    fullName: 'Checkout Student',
                    idCard: `ID_${Date.now()}`,
                    mssv: `MSSV_${Date.now()}`
                }
            }
        }
    });

    const room = await prisma.room.create({
        data: {
            name: `Room C ${Date.now()}`,
            type: 'Standard',
            capacity: 4,
            price: 100,
            currentOccupancy: 1,
            status: RoomStatus.AVAILABLE
        }
    });

    // Register Student
    await prisma.registration.create({
        data: {
            studentId: student.id,
            roomId: room.id,
            status: RegistrationStatus.CHECKED_IN,
            startDate: new Date()
        }
    });

    console.log('Setup Complete: Student registered in Room C');

    // 2. Test Case 1: Voluntary Checkout Flow
    console.log('\n--- Test Case 1: Voluntary Checkout Flow ---');

    const request = await checkoutService.createCheckoutRequest(student.id, {
        reason: 'Graduating',
        desiredDate: new Date()
    });
    console.log('Checkout Request Created:', request.id);

    // Inspect
    await checkoutService.updateInspectionResult(request.id, true, 'Room in good condition');
    console.log('Inspection Completed: Passed');

    // Confirm
    await checkoutService.confirmCheckout(request.id, admin.id);
    console.log('Checkout Confirmed (Approved)');

    // Physical Checkout (New Step)
    await checkoutService.physicalCheckOut(request.id);
    console.log('Physical Checkout Completed');

    // Verify
    const reg1 = await prisma.registration.findFirst({ where: { studentId: student.id } });
    const room1 = await prisma.room.findUnique({ where: { id: room.id } });

    if (reg1?.status !== RegistrationStatus.CHECKED_OUT) throw new Error('Registration not checked out');
    if (room1?.currentOccupancy !== 0) throw new Error('Room occupancy not decremented');
    console.log('Voluntary Checkout Verified Success');

    // 3. Test Case 2: Forced Eviction
    console.log('\n--- Test Case 2: Forced Eviction ---');

    // Re-register student
    await prisma.registration.create({
        data: {
            studentId: student.id,
            roomId: room.id,
            status: RegistrationStatus.CHECKED_IN,
            startDate: new Date()
        }
    });
    await prisma.room.update({ where: { id: room.id }, data: { currentOccupancy: 1 } });
    console.log('Student Re-registered');

    // Force Evict
    const forcedReq = await checkoutService.createForcedCheckout(student.id, 'Violation of rules', admin.id);
    console.log('Forced Eviction Executed:', forcedReq.id);

    // Verify
    const reg2 = await prisma.registration.findFirst({ where: { studentId: student.id, status: RegistrationStatus.CHECKED_OUT }, orderBy: { endDate: 'desc' } });
    const room2 = await prisma.room.findUnique({ where: { id: room.id } });

    if (!reg2) throw new Error('Forced checkout registration not found');
    if (room2?.currentOccupancy !== 0) throw new Error('Room occupancy not decremented after eviction');
    if (forcedReq.status !== CheckoutStatus.COMPLETED) throw new Error('Forced request not completed');

    console.log('Forced Eviction Verified Success');

    console.log('\n--- Feature 2.2 Verification Successful ---');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
