import { PrismaClient, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

export const paymentService = {
    /**
     * Confirm a payment for a Fee Notice
     * Transactionally:
     * 1. Update FeeNotice status to PAID
     * 2. Create Invoice
     * 3. Create Receipt
     */
    async confirmPayment(feeNoticeId: string, paymentMethod: string, transactionId?: string) {
        return prisma.$transaction(async (tx) => {
            // 1. Verify Fee Notice exists and is PENDING
            const feeNotice = await tx.feeNotice.findUniqueOrThrow({
                where: { id: feeNoticeId }
            });

            if (feeNotice.status === 'PAID') {
                throw new Error('Fee Notice is already paid.');
            }

            // 2. Update Fee Notice
            const updatedFeeNotice = await tx.feeNotice.update({
                where: { id: feeNoticeId },
                data: { status: 'PAID' }
            });

            // 3. Create Invoice
            const invoice = await tx.invoice.create({
                data: {
                    feeNoticeId: feeNoticeId,
                    amount: updatedFeeNotice.amount,
                }
            });

            // 4. Create Receipt
            const receipt = await tx.receipt.create({
                data: {
                    invoiceId: invoice.id,
                    amount: invoice.amount,
                    paymentMethod,
                    transactionId,
                    printCount: 0
                }
            });

            return { feeNotice: updatedFeeNotice, invoice, receipt };
        });
    },

    /**
     * Print Receipt
     * Enforces "Print Once" rule unless Admin override
     */
    async printReceipt(receiptId: string, userRole: UserRole) {
        const receipt = await prisma.receipt.findUniqueOrThrow({
            where: { id: receiptId },
            include: {
                invoice: {
                    include: {
                        feeNotice: {
                            include: { student: true }
                        }
                    }
                }
            }
        });

        // Check Print Count
        if (receipt.printCount > 0) {
            if (userRole !== UserRole.BQL_KTX) {
                throw new Error('Receipt already printed. Admin override required to reprint.');
            }
        }

        // Increment Print Count
        const updatedReceipt = await prisma.receipt.update({
            where: { id: receiptId },
            data: {
                printCount: { increment: 1 }
            }
        });

        return {
            receipt: updatedReceipt,
            details: {
                studentName: receipt.invoice.feeNotice.student.username, // Should use profile name in real app
                amount: receipt.amount,
                date: receipt.paidAt,
                items: receipt.invoice.feeNotice.description
            }
        };
    },

    /**
     * Get Pending Payments for Finance
     */
    async getPendingPayments() {
        return prisma.feeNotice.findMany({
            where: { status: 'PENDING' },
            include: { student: true },
            orderBy: { dueDate: 'asc' }
        });
    },

    /**
     * Get Paid History
     */
    async getPaidHistory() {
        return prisma.feeNotice.findMany({
            where: { status: 'PAID' },
            include: {
                student: true,
                invoice: {
                    include: { receipt: true }
                }
            },
            orderBy: { updatedAt: 'desc' }
        });
    }
};
