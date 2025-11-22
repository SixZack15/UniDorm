import { PrismaClient, UserRole, VisitStatus } from '@prisma/client';
import { relativeService } from './services/relative.service';

const prisma = new PrismaClient();

async function main() {
    console.log('--- Starting Feature 5.1 Verification ---');

    // 1. Setup: Student
    const student = await prisma.user.create({
        data: {
            username: `rel_student_${Date.now()}`,
            password: 'password',
            role: UserRole.STUDENT
        }
    });

    // 2. Test Relative CRUD & Constraints
    console.log('\n--- Test Case 1: Relative CRUD & Constraints ---');

    // Add Relative A
    const relA = await relativeService.addRelative(student.id, {
        name: 'Relative A',
        relationship: 'Parent',
        phone: '111',
        isEmergencyContact: true
    });
    console.log('Relative A Added');

    // Try Delete A (Should Fail - Min 1)
    try {
        await relativeService.deleteRelative(student.id, relA.id);
        throw new Error('Failed to enforce Min 1 Relative rule');
    } catch (e: any) {
        if (e.message.includes('Cannot delete the last relative')) {
            console.log('Min 1 Relative Rule Verified (Expected Error Caught)');
        } else {
            throw e;
        }
    }

    // Add Relative B
    const relB = await relativeService.addRelative(student.id, {
        name: 'Relative B',
        relationship: 'Sibling',
        phone: '222'
    });
    console.log('Relative B Added');

    // Delete A (Should Success now)
    await relativeService.deleteRelative(student.id, relA.id);
    console.log('Relative A Deleted (Allowed as B exists)');

    // 3. Test Visit Request Flow
    console.log('\n--- Test Case 2: Visit Request Flow ---');

    // Create Request for B
    const request = await relativeService.createVisitRequest(relB.id, 'Visit', new Date());
    console.log('Visit Request Created');

    // Verify Pending
    const pendingReqs = await relativeService.getPendingVisitRequests();
    const found = pendingReqs.find(r => r.id === request.id);
    if (!found) throw new Error('Request not found in pending list');
    console.log('Request found in Pending List');

    // Approve Request
    await relativeService.approveVisitRequest(request.id, 'Approved by Admin');
    console.log('Visit Request Approved');

    // Verify Status
    const updatedReq = await prisma.visitRequest.findUnique({ where: { id: request.id } });
    if (updatedReq?.status !== VisitStatus.APPROVED) throw new Error('Request status not APPROVED');
    console.log('Approval Verified Success');

    console.log('\n--- Feature 5.1 Verification Successful ---');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
