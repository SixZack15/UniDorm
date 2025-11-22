import { PrismaClient, RoomStatus } from '@prisma/client';

const prisma = new PrismaClient();

interface RoomSearchFilters {
    minPrice?: number;
    maxPrice?: number;
    capacity?: number;
}

export const roomService = {
    /**
     * Searches for available rooms based on filters.
     * Enforces Student_UA1_BR3: Only show 'Available' rooms.
     */
    async searchRooms(filters: RoomSearchFilters) {
        const { minPrice, maxPrice, capacity } = filters;

        const rooms = await prisma.room.findMany({
            where: {
                status: RoomStatus.AVAILABLE,
                // Ensure room is not full (redundant if status is managed correctly, but safe)
                currentOccupancy: {
                    lt: prisma.room.fields.capacity,
                },
                price: {
                    gte: minPrice,
                    lte: maxPrice,
                },
                capacity: capacity ? { equals: capacity } : undefined,
            },
        });

        return rooms;
    },

    /**
     * Get all rooms for management
     */
    async getAllRooms() {
        return prisma.room.findMany({
            orderBy: { name: 'asc' }
        });
    },

    /**
     * Update room details
     * Enforces BR7: Cannot set to Maintenance/Locked if occupied
     */
    async updateRoom(roomId: string, data: {
        name?: string;
        type?: string;
        price?: number;
        capacity?: number;
        status?: RoomStatus;
    }) {
        const room = await prisma.room.findUniqueOrThrow({ where: { id: roomId } });

        // Validation: If setting to MAINTENANCE or LOCKED, ensure occupancy is 0
        if (
            (data.status === RoomStatus.MAINTENANCE || data.status === RoomStatus.LOCKED) &&
            room.currentOccupancy > 0
        ) {
            throw new Error(`Cannot set room to ${data.status} because it is currently occupied.`);
        }

        return prisma.room.update({
            where: { id: roomId },
            data
        });
    }
};
