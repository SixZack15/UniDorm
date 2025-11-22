import { PrismaClient, RegistrationStatus, CheckoutStatus, RoomStatus, UserRole, CheckoutType } from '@prisma/client';
import { physicalOpsService } from './services/physical-ops.service';
import { checkoutService } from './services/checkout.service';

const prisma = new PrismaClient();

async function main() {
    console.log('--- Starting Feature 4.1 Verification ---');

    // 1. Setup: Room and Student
    const room = await prisma.room.create({
        data: {
            name: `Ops Room ${Date.now()}`,
            type: 'Standard',
            capacity: 4,
            price: 1000000,
            currentOccupancy: 0,
            status: RoomStatus.AVAILABLE
        }
    });

    const student = await prisma.user.create({
        data: {
            username: `ops_student_${Date.now()}`,
            password: 'password',
            role: UserRole.STUDENT
        }
    });

    // 2. Test Physical Check-in
    console.log('\n--- Test Case 1: Physical Check-in ---');

    // Create Registration in READY_FOR_CHECKIN state
    const registration = await prisma.registration.create({
        data: {
            studentId: student.id,
            roomId: room.id,
            status: RegistrationStatus.READY_FOR_CHECKIN
        }
    });

    // Perform Check-in
    await physicalOpsService.physicalCheckIn(registration.id);
    console.log('Physical Check-in Performed');

    // Verify
    const updatedReg = await prisma.registration.findUnique({ where: { id: registration.id } });
    const updatedRoom = await prisma.room.findUnique({ where: { id: room.id } });

    if (updatedReg?.status !== RegistrationStatus.CHECKED_IN) throw new Error('Registration status not updated to CHECKED_IN');
    if (updatedRoom?.currentOccupancy !== 1) throw new Error(`Room occupancy incorrect. Expected 1, got ${updatedRoom?.currentOccupancy}`);
    console.log('Check-in Verified Success');

    // 3. Test Physical Check-out
    console.log('\n--- Test Case 2: Physical Check-out ---');

    // Create Checkout Request
    const request = await prisma.checkoutRequest.create({
        data: {
            studentId: student.id,
            type: CheckoutType.VOLUNTARY,
            status: CheckoutStatus.INSPECTED, // Simulate inspection done
            reason: 'Leaving',
            desiredDate: new Date(),
            assetInspectionPassed: true
        }
    });

    // Approve Checkout (Room Manager Action - Refactored)
    await checkoutService.confirmCheckout(request.id, 'admin1');
    console.log('Checkout Request Approved');

    // Verify Intermediate State
    const approvedReq = await prisma.checkoutRequest.findUnique({ where: { id: request.id } });
    const intermediateRoom = await prisma.room.findUnique({ where: { id: room.id } });

    if (approvedReq?.status !== CheckoutStatus.APPROVED) throw new Error('Request status not APPROVED');
    if (intermediateRoom?.currentOccupancy !== 1) throw new Error('Occupancy should NOT decrement yet');

    // Perform Physical Check-out (BQL Action)
    await checkoutService.physicalCheckOut(request.id);
    console.log('Physical Check-out Performed');

    // Verify Final State
    const finalReg = await prisma.registration.findUnique({ where: { id: registration.id } });
    const finalRoom = await prisma.room.findUnique({ where: { id: room.id } });
    const finalReq = await prisma.checkoutRequest.findUnique({ where: { id: request.id } });

    if (finalReg?.status !== RegistrationStatus.CHECKED_OUT) throw new Error('Registration status not CHECKED_OUT');
    if (finalRoom?.currentOccupancy !== 0) throw new Error('Room occupancy not decremented');
    if (finalReq?.status !== CheckoutStatus.COMPLETED) throw new Error('Request status not COMPLETED');

    console.log('Check-out Verified Success');
    console.log('\n--- Feature 4.1 Verification Successful ---');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
