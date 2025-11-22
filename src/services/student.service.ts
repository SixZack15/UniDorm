import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface UpdateSoftProfileInput {
    phoneNumber?: string;
    email?: string;
    emergencyContact?: string;
}

export const studentService = {
    /**
     * Updates the student's soft profile (Phone, Email, Emergency Contact).
     * Enforces BR3: Students can ONLY edit 'Soft Info'.
     */
    async updateSoftProfile(userId: string, data: UpdateSoftProfileInput) {
        // Ensure the user exists and is a student (optional check depending on auth layer)
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { studentSoftProfile: true },
        });

        if (!user) {
            throw new Error('User not found');
        }

        // Update or Create Soft Profile
        // Using upsert to handle cases where profile might not exist yet
        const updatedProfile = await prisma.studentSoftProfile.upsert({
            where: { userId: userId },
            update: {
                ...data,
            },
            create: {
                userId: userId,
                phoneNumber: data.phoneNumber || '',
                email: data.email || '',
                emergencyContact: data.emergencyContact || '',
            },
        });

        return updatedProfile;
    },
};
