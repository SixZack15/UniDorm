'use server';

import { registrationService } from '@/services/registration.service';
import { roomService } from '@/services/room.service';

export async function createRegistrationAction(studentId: string, roomId: string) {
    try {
        if (!studentId || !roomId) {
            throw new Error('Missing studentId or roomId');
        }
        const registration = await registrationService.createRegistration(studentId, roomId);
        return { success: true, data: registration };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function searchRoomsAction(criteria: { minPrice?: number; maxPrice?: number; capacity?: number }) {
    try {
        const rooms = await roomService.searchRooms(criteria);
        return { success: true, data: rooms };
    } catch (error: any) {
        return { success: false, error: 'Failed to search rooms' };
    }
}
