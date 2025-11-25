'use client';

import toast from 'react-hot-toast';
import { subscriptionStorage } from '@/utils/subscriptionStorage';

export function Footer() {
    const approveCurrentRoom = () => {
        // Get current subscription
        const currentSubscription = subscriptionStorage.getSubscription();
        
        if (!currentSubscription) {
            // If no subscription exists, create a new approved one
            const approvedSubscription = {"id":"SUB-2024-001","registrationId":"REG-2024-001","roomType":"Phòng 4 Giường (Có Điều Hòa)","roomName":"Phòng 4 Giường (Có Điều Hòa)","price":1200000,"amenities":["Điều hòa","Nước nóng","Tủ lạnh","Wi-Fi"],"status":"APPROVED","statusLabel":"Đã duyệt","submittedDate":"15/11/2024","studentName":"Nguyễn Văn A","phoneNumber":"0901234567","parentName":"Nguyễn Văn Ba","parentPhoneNumber":"0988777666","registrationStatus":"Đang ở"}
            const unidorm_room_subscription = {"id":"REG-2025-007","registrationId":"REG-2025-073","roomType":"Phòng Dịch Vụ (4 Giường)","roomName":"Phòng Dịch Vụ (4 Giường)","price":1200000,"amenities":["Máy lạnh","Tủ lạnh","WC Riêng"],"status":"APPROVED","statusLabel":"Chờ duyệt","submittedDate":"25/11/2025","studentName":"","phoneNumber":"","parentName":"","parentPhoneNumber":"","registrationStatus":"Đang ở"}
            localStorage.setItem('roomSubscription', JSON.stringify(approvedSubscription));
            localStorage.setItem('unidorm_room_subscription', JSON.stringify(unidorm_room_subscription));
        } else {
            // Update existing subscription to "Đang ở" (approved status)
            //subscriptionStorage.updateRegistrationStatus('Đang ở');
            const approvedSubscription = {"id":"SUB-2024-001","registrationId":"REG-2024-001","roomType":"Phòng 4 Giường (Có Điều Hòa)","roomName":"Phòng 4 Giường (Có Điều Hòa)","price":1200000,"amenities":["Điều hòa","Nước nóng","Tủ lạnh","Wi-Fi"],"status":"APPROVED","statusLabel":"Đã duyệt","submittedDate":"15/11/2024","studentName":"Nguyễn Văn A","phoneNumber":"0901234567","parentName":"Nguyễn Văn Ba","parentPhoneNumber":"0988777666","registrationStatus":"Đang ở"}
            const unidorm_room_subscription = {"id":"REG-2025-007","registrationId":"REG-2025-073","roomType":"Phòng Dịch Vụ (4 Giường)","roomName":"Phòng Dịch Vụ (4 Giường)","price":1200000,"amenities":["Máy lạnh","Tủ lạnh","WC Riêng"],"status":"APPROVED","statusLabel":"Chờ duyệt","submittedDate":"25/11/2025","studentName":"","phoneNumber":"","parentName":"","parentPhoneNumber":"","registrationStatus":"Đang ở"}
            localStorage.setItem('roomSubscription', JSON.stringify(approvedSubscription));
            localStorage.setItem('unidorm_room_subscription', JSON.stringify(unidorm_room_subscription));
        }
    };

    const wipeLocalStorage = () => {
        // Save the current userRole
        const userRole = localStorage.getItem('userRole');
        
        // Clear all localStorage
        localStorage.clear();
        
        // Restore userRole if it existed
        if (userRole) {
            localStorage.setItem('userRole', userRole);
        }
        
    };

    return (
        <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-600">

                {/* Info */}
                <div>
                    <h3 className="font-bold text-gray-900 mb-2">Van Lang University Dormitory</h3>
                    <p>69/68 Dang Thuy Tram, Ward 13, Binh Thanh Dist, HCMC</p>
                    <p className="mt-2">© 2025 VLU. All rights reserved.</p>
                </div>

                {/* Quick Links */}
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-gray-900 mb-2">Quick Links</h3>
                    <a href="#" className="hover:text-primary transition-colors">Internal Rules</a>
                    <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-primary transition-colors">Terms of Use</a>
                    <button 
                        onClick={approveCurrentRoom}
                        className="text-left hover:text-primary transition-colors text-sm font-normal"
                    >
                        🔧 Approve Room (Dev)
                    </button>
                    <button 
                        onClick={wipeLocalStorage}
                        className="text-left hover:text-red-600 transition-colors text-sm font-normal"
                    >
                        🗑️ Clear Data (Dev)
                    </button>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="font-bold text-gray-900 mb-2">Emergency Support</h3>
                    <p className="flex items-center gap-2">
                        <span className="font-bold text-red-600">Hotline:</span>
                        <span className="text-lg font-bold text-gray-900">028.710.99221</span>
                    </p>
                    <p className="mt-2">Support: support@vlu.edu.vn</p>
                </div>

            </div>
        </footer>
    );
}



