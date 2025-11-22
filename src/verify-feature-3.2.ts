import { PrismaClient, UserRole } from '@prisma/client';
import { paymentService } from './services/payment.service';

const prisma = new PrismaClient();

async function main() {
    console.log('--- Starting Feature 3.2 Verification ---');

    // 1. Setup: Create Student and Fee Notice
    const student = await prisma.user.create({
        data: {
            username: `pay_student_${Date.now()}`,
            password: 'password',
            role: UserRole.STUDENT
        }
    });

    const feeNotice = await prisma.feeNotice.create({
        data: {
            studentId: student.id,
            title: 'Test Fee',
            amount: 500000,
            dueDate: new Date(),
            status: 'PENDING'
        }
    });

    console.log('Setup Complete: Unpaid Fee Notice created');

    // 2. Confirm Payment
    console.log('\n--- Test Case 1: Confirm Payment ---');
    const result = await paymentService.confirmPayment(feeNotice.id, 'TRANSFER', 'TX123');

    console.log('Payment Confirmed');
    if (result.feeNotice.status !== 'PAID') throw new Error('Fee Notice status not updated');
    if (!result.invoice) throw new Error('Invoice not created');
    if (!result.receipt) throw new Error('Receipt not created');
    if (result.receipt.printCount !== 0) throw new Error('Initial print count should be 0');
    console.log('Payment Confirmation Verified Success');

    // 3. Print Receipt (First Time - Success)
    console.log('\n--- Test Case 2: Print Receipt (First Time) ---');
    const print1 = await paymentService.printReceipt(result.receipt.id, UserRole.FINANCE_MANAGER);

    console.log('Receipt Printed');
    if (print1.receipt.printCount !== 1) throw new Error('Print count not incremented');
    console.log('First Print Verified Success');

    // 4. Print Receipt (Second Time - Fail as Non-Admin)
    console.log('\n--- Test Case 3: Print Receipt (Second Time - Fail) ---');
    try {
        // Assuming STUDENT or generic FINANCE_MANAGER cannot reprint without override
        // Based on implementation, only BQL_KTX can reprint.
        await paymentService.printReceipt(result.receipt.id, UserRole.FINANCE_MANAGER);
        throw new Error('Should have failed to reprint');
    } catch (error: any) {
        console.log('Caught Expected Error:', error.message);
        if (!error.message.includes('Admin override required')) {
            throw new Error('Unexpected error message');
        }
    }
    console.log('Reprint Restriction Verified Success');

    // 5. Print Receipt (Override - Success)
    console.log('\n--- Test Case 4: Print Receipt (Admin Override) ---');
    const print2 = await paymentService.printReceipt(result.receipt.id, UserRole.BQL_KTX);

    console.log('Receipt Reprinted by Admin');
    if (print2.receipt.printCount !== 2) throw new Error('Print count not incremented on override');
    console.log('Admin Override Verified Success');

    console.log('\n--- Feature 3.2 Verification Successful ---');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
