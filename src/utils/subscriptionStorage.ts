// LocalStorage utility for room subscription management

export type RegistrationStatus = 'Đang ở' | 'Chờ duyệt' | 'Từ chối';

export interface RoomSubscription {
    id: string;
    registrationId: string;
    roomType: string;
    roomName: string;
    price: number;
    amenities: string[];
    status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
    statusLabel: string;
    submittedDate: string;
    studentName: string;
    phoneNumber: string;
    parentName: string;
    parentPhoneNumber: string;
    registrationStatus: RegistrationStatus; // New field for admin processing
}

export type PaymentExtensionStatus = 'Đang đợi' | 'Đã duyệt' | 'Từ chối';

export interface PaymentExtension {
    id: string;
    reason: string;
    extensionDate: string;
    reductionAmount: string;
    status: PaymentExtensionStatus;
    submittedDate: string;
}

const STORAGE_KEY = 'unidorm_room_subscription';
const EXTENSION_STORAGE_KEY = 'unidorm_payment_extension';
const CHANGE_ROOM_STORAGE_KEY = 'unidorm_change_room_request';
const END_CONTRACT_STORAGE_KEY = 'unidorm_end_contract_request';

export type RequestStatus = 'Đang đợi' | 'Đã duyệt' | 'Từ chối';

export interface ChangeRoomRequest {
    id: string;
    reason: string;
    desiredRoom: string;
    status: RequestStatus;
    submittedDate: string;
}

export interface EndContractRequest {
    id: string;
    leaveDate: string;
    reason: string;
    status: RequestStatus;
    submittedDate: string;
}

export const subscriptionStorage = {
    // ... existing methods ...

    // --- Change Room Request ---
    getChangeRoomRequest: (): ChangeRoomRequest | null => {
        if (typeof window === 'undefined') return null;
        try {
            const data = localStorage.getItem(CHANGE_ROOM_STORAGE_KEY);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error reading change room request:', error);
            return null;
        }
    },

    saveChangeRoomRequest: (request: ChangeRoomRequest): void => {
        if (typeof window === 'undefined') return;
        try {
            localStorage.setItem(CHANGE_ROOM_STORAGE_KEY, JSON.stringify(request));
        } catch (error) {
            console.error('Error saving change room request:', error);
        }
    },

    removeChangeRoomRequest: (): void => {
        if (typeof window === 'undefined') return;
        try {
            localStorage.removeItem(CHANGE_ROOM_STORAGE_KEY);
        } catch (error) {
            console.error('Error removing change room request:', error);
        }
    },

    // --- End Contract Request ---
    getEndContractRequest: (): EndContractRequest | null => {
        if (typeof window === 'undefined') return null;
        try {
            const data = localStorage.getItem(END_CONTRACT_STORAGE_KEY);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error reading end contract request:', error);
            return null;
        }
    },

    saveEndContractRequest: (request: EndContractRequest): void => {
        if (typeof window === 'undefined') return;
        try {
            localStorage.setItem(END_CONTRACT_STORAGE_KEY, JSON.stringify(request));
        } catch (error) {
            console.error('Error saving end contract request:', error);
        }
    },

    removeEndContractRequest: (): void => {
        if (typeof window === 'undefined') return;
        try {
            localStorage.removeItem(END_CONTRACT_STORAGE_KEY);
        } catch (error) {
            console.error('Error removing end contract request:', error);
        }
    },

    // Get current subscription
    getSubscription: (): RoomSubscription | null => {
        if (typeof window === 'undefined') return null;
        
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error reading subscription from localStorage:', error);
            return null;
        }
    },

    // Save subscription
    saveSubscription: (subscription: RoomSubscription): void => {
        if (typeof window === 'undefined') return;
        
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(subscription));
        } catch (error) {
            console.error('Error saving subscription to localStorage:', error);
        }
    },

    // Update subscription status
    updateStatus: (status: RoomSubscription['status'], statusLabel: string): void => {
        const current = subscriptionStorage.getSubscription();
        if (current) {
            current.status = status;
            current.statusLabel = statusLabel;
            subscriptionStorage.saveSubscription(current);
        }
    },

    // Remove subscription (cancel)
    removeSubscription: (): void => {
        if (typeof window === 'undefined') return;
        
        try {
            localStorage.removeItem(STORAGE_KEY);
            localStorage.removeItem(EXTENSION_STORAGE_KEY); // Also remove extension if subscription is removed
        } catch (error) {
            console.error('Error removing subscription from localStorage:', error);
        }
    },

    // Check if subscription exists
    hasSubscription: (): boolean => {
        return subscriptionStorage.getSubscription() !== null;
    },

    // Update registration status (for admin)
    updateRegistrationStatus: (registrationStatus: RegistrationStatus): void => {
        const current = subscriptionStorage.getSubscription();
        if (current) {
            current.registrationStatus = registrationStatus;
            subscriptionStorage.saveSubscription(current);
        }
    },

    // Get payment extension
    getPaymentExtension: (): PaymentExtension | null => {
        if (typeof window === 'undefined') return null;
        try {
            const data = localStorage.getItem(EXTENSION_STORAGE_KEY);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error reading payment extension:', error);
            return null;
        }
    },

    // Save payment extension
    savePaymentExtension: (extension: PaymentExtension): void => {
        if (typeof window === 'undefined') return;
        try {
            localStorage.setItem(EXTENSION_STORAGE_KEY, JSON.stringify(extension));
        } catch (error) {
            console.error('Error saving payment extension:', error);
        }
    }
};

// Room types data (matching /rooms page)
export const ROOM_TYPES = [
    {
        id: 1,
        name: 'Phòng Dịch Vụ (4 Giường)',
        price: 1200000,
        capacity: 4,
        amenities: ['Máy lạnh', 'Tủ lạnh', 'WC Riêng'],
    },
    {
        id: 2,
        name: 'Phòng Tiêu Chuẩn (6 Giường)',
        price: 800000,
        capacity: 6,
        amenities: ['Quạt trần', 'Tủ cá nhân', 'WC Chung tầng'],
    },
    {
        id: 3,
        name: 'Phòng Cơ Bản (8 Giường)',
        price: 500000,
        capacity: 8,
        amenities: ['Quạt trần', 'WC Chung tầng'],
    },
    {
        id: 4,
        name: 'Phòng Cơ Bản (10 Giường)',
        price: 450000,
        capacity: 10,
        amenities: ['Quạt trần', 'WC Chung tầng'],
    },
];

// Helper to generate registration ID
export const generateRegistrationId = (): string => {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `REG-${year}-${random}`;
};

// Helper to format date
export const formatDate = (date: Date = new Date()): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};
