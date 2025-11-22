import { PrismaClient, RoomStatus, RegistrationStatus } from '@prisma/client';
import { roomService } from './services/room.service';

const prisma = new PrismaClient();

async function main() {
    console.log('--- Starting Feature 2.3 Verification ---');

    // 1. Setup: Create Rooms (One Empty, One Occupied)
    const emptyRoom = await prisma.room.create({
        data: {
            name: `Empty Room ${Date.now()}`,
            type: 'Standard',
            capacity: 4,
            price: 100,
            currentOccupancy: 0,
            status: RoomStatus.AVAILABLE
        }
    });

    const occupiedRoom = await prisma.room.create({
        data: {
            name: `Occupied Room ${Date.now()}`,
            type: 'Service',
            capacity: 2,
            price: 200,
            currentOccupancy: 1,
            status: RoomStatus.AVAILABLE
        }
    });

    console.log('Setup Complete: Rooms created');

    // 2. Test Case 1: Update Empty Room (Success)
    console.log('\n--- Test Case 1: Update Empty Room (Success) ---');

    const updatedEmpty = await roomService.updateRoom(emptyRoom.id, {
        price: 150,
        status: RoomStatus.MAINTENANCE
    });

    console.log('Empty Room Updated:', updatedEmpty);
    if (updatedEmpty.price !== 150) throw new Error('Price update failed');
    if (updatedEmpty.status !== RoomStatus.MAINTENANCE) throw new Error('Status update failed');
    console.log('Empty Room Update Verified Success');

    // 3. Test Case 2: Update Occupied Room to Maintenance (Failure)
    console.log('\n--- Test Case 2: Update Occupied Room to Maintenance (Failure) ---');

    try {
        await roomService.updateRoom(occupiedRoom.id, {
            status: RoomStatus.MAINTENANCE
        });
        throw new Error('Test Case 2 Failed: Should have thrown error for occupied room');
    } catch (error: any) {
        console.log('Caught Expected Error:', error.message);
        if (!error.message.includes('currently occupied')) {
            throw new Error('Unexpected error message: ' + error.message);
        }
    }
    console.log('Occupied Room Validation Verified Success');

    // 4. Test Case 3: Update Occupied Room Details (Success)
    console.log('\n--- Test Case 3: Update Occupied Room Details (Success) ---');

    const updatedOccupied = await roomService.updateRoom(occupiedRoom.id, {
        price: 250
    });

    console.log('Occupied Room Updated:', updatedOccupied);
    if (updatedOccupied.price !== 250) throw new Error('Price update failed');
    if (updatedOccupied.status !== RoomStatus.AVAILABLE) throw new Error('Status changed unexpectedly');
    console.log('Occupied Room Details Update Verified Success');

    console.log('\n--- Feature 2.3 Verification Successful ---');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
