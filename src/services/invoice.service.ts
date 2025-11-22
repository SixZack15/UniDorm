import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const invoiceService = {
    /**
     * Creates a FeeNotice and Invoice for a registration.
     * Called when Room Manager confirms assignment.
     */
    async createInvoice(registrationId: string, studentId: string, amount: number) {
        return await prisma.$transaction(async (tx) => {
            // 1. Create Fee Notice
            const feeNotice = await tx.feeNotice.create({
                data: {
                    studentId,
                    title: 'Dormitory Deposit Fee',
                    amount,
                    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
                    status: 'PENDING',
                },
            });

            // 2. Create Invoice linked to Fee Notice
            const invoice = await tx.invoice.create({
                data: {
                    feeNoticeId: feeNotice.id,
                    amount,
                },
            });

            return invoice;
        });
    },

    /**
     * Confirms payment for an invoice.
     * Updates Invoice -> Receipt -> Registration Status.
     */
    async confirmPayment(invoiceId: string, paymentMethod: string) {
        return await prisma.$transaction(async (tx) => {
            // 1. Get Invoice with FeeNotice to find Student/Registration
            const invoice = await tx.invoice.findUnique({
                where: { id: invoiceId },
                include: { feeNotice: true },
            });

            if (!invoice) throw new Error('Invoice not found');

            // 2. Create Receipt
            await tx.receipt.create({
                data: {
                    invoiceId,
                    amount: invoice.amount,
                    paymentMethod,
                },
            });

            // 3. Update FeeNotice Status
            await tx.feeNotice.update({
                where: { id: invoice.feeNoticeId },
                data: { status: 'PAID' },
            });

            // 4. Find and Update Registration
            // Assuming we can link back via studentId and status 'APPROVED'
            // In a real app, FeeNotice might link directly to Registration, but for now we infer
            const registration = await tx.registration.findFirst({
                where: {
                    studentId: invoice.feeNotice.studentId,
                    status: 'APPROVED',
                },
            });

            if (registration) {
                await tx.registration.update({
                    where: { id: registration.id },
                    data: { status: 'DEPOSIT_PAID' },
                });
            }

            return { success: true };
        });
    },
};
