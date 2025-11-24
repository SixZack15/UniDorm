'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';

type PaymentMethod = 'VISA' | 'MASTERCARD' | 'WIRE_TRANSFER' | '';

export default function PaymentPage() {
    const router = useRouter();
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    // Form state for card payment
    const [cardData, setCardData] = useState({
        cardholderName: '',
        cardNumber: '',
        cvc: '',
        expiryDate: ''
    });

    const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        
        // Format card number with spaces
        if (name === 'cardNumber') {
            const formatted = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
            setCardData({ ...cardData, [name]: formatted });
        } else if (name === 'expiryDate') {
            // Format expiry date as MM/YY
            const formatted = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').substr(0, 5);
            setCardData({ ...cardData, [name]: formatted });
        } else {
            setCardData({ ...cardData, [name]: value });
        }
    };

    const handleCardPayment = (e: React.FormEvent) => {
        e.preventDefault();
        
        // No validation for prototyping - allow empty submission
        
        setIsProcessing(true);

        // Simulate payment processing
        setTimeout(() => {
            setIsProcessing(false);
            setPaymentSuccess(true);
            
            toast.success('Thanh toán thành công! 🎉', {
                duration: 4000,
                icon: '✅',
                style: {
                    borderRadius: '10px',
                    background: '#10B981',
                    color: '#fff',
                },
            });

            // Redirect to dashboard after 2 seconds
            setTimeout(() => {
                router.push('/dashboard');
            }, 2000);
        }, 2000);
    };

    const getCardIcon = () => {
        if (paymentMethod === 'VISA') {
            return (
                <div className="text-blue-600 font-bold text-xl">VISA</div>
            );
        } else if (paymentMethod === 'MASTERCARD') {
            return (
                <div className="flex gap-1">
                    <div className="w-8 h-8 rounded-full bg-red-500 opacity-80"></div>
                    <div className="w-8 h-8 rounded-full bg-orange-500 opacity-80 -ml-4"></div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 py-12 px-4 sm:px-6 lg:px-8">
            <Toaster position="top-right" />

            {/* Breadcrumb */}
            <div className="max-w-3xl mx-auto mb-6">
                <nav className="flex items-center text-sm text-gray-600 mb-4">
                    <Link href="/dashboard" className="hover:text-primary transition-colors">
                        Trang chủ
                    </Link>
                    <span className="mx-2">/</span>
                    <Link href="/finance" className="hover:text-primary transition-colors">
                        Tài chính
                    </Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-900 font-medium">Thanh toán</span>
                </nav>
            </div>

            {/* Main Content */}
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Thanh Toán Hóa Đơn</h1>
                    <p className="text-gray-600">Chọn phương thức thanh toán phù hợp với bạn</p>
                </div>

                {/* Payment Method Selection */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
                    <label className="block text-sm font-bold text-gray-900 mb-3">
                        Phương thức thanh toán <span className="text-red-600">*</span>
                    </label>
                    <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-base font-medium"
                    >
                        <option value="">-- Chọn phương thức thanh toán --</option>
                        <option value="VISA">💳 Thẻ VISA</option>
                        <option value="MASTERCARD">💳 Thẻ MASTERCARD</option>
                        <option value="WIRE_TRANSFER">🏦 Chuyển khoản ngân hàng</option>
                    </select>
                </div>

                {/* Card Payment Form */}
                {(paymentMethod === 'VISA' || paymentMethod === 'MASTERCARD') && !paymentSuccess && (
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Thông tin thẻ thanh toán</h2>
                            {getCardIcon()}
                        </div>

                        <form noValidate onSubmit={handleCardPayment} className="space-y-6">
                            {/* Cardholder Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tên chủ thẻ <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="cardholderName"
                                    value={cardData.cardholderName}
                                    onChange={handleCardInputChange}
                                    placeholder="NGUYEN VAN A"
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all uppercase"
                                    required
                                />
                            </div>

                            {/* Card Number */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Số thẻ <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="cardNumber"
                                    value={cardData.cardNumber}
                                    onChange={handleCardInputChange}
                                    placeholder="1234 5678 9012 3456"
                                    maxLength={19}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all font-mono text-lg tracking-wider"
                                    required
                                />
                            </div>

                            {/* Expiry Date and CVC */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Ngày hết hạn <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="expiryDate"
                                        value={cardData.expiryDate}
                                        onChange={handleCardInputChange}
                                        placeholder="MM/YY"
                                        maxLength={5}
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all font-mono"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Mã CVC <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="cvc"
                                        value={cardData.cvc}
                                        onChange={handleCardInputChange}
                                        placeholder="123"
                                        maxLength={3}
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all font-mono text-center text-lg"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Security Notice */}
                            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-blue-700">
                                            <strong className="font-medium">Bảo mật:</strong> Thông tin thẻ của bạn được mã hóa và bảo mật tuyệt đối.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isProcessing}
                                className="w-full flex justify-center items-center gap-2 px-6 py-4 bg-primary text-white rounded-xl shadow-lg hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 transition-all font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isProcessing ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Đang xử lý...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Xác nhận thanh toán
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                )}

                {/* Wire Transfer Information */}
                {paymentMethod === 'WIRE_TRANSFER' && (
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                        <div className="text-center mb-6">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Thông tin chuyển khoản</h2>
                            <p className="text-gray-600">Vui lòng chuyển khoản theo thông tin bên dưới</p>
                        </div>

                        {/* Bank Information Card */}
                        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white mb-6 shadow-xl">
                            <div className="flex items-center justify-between mb-4">
                                <div className="text-2xl font-bold">TECHCOMBANK</div>
                                <div className="text-xs opacity-75">Vietnam Technological and Commercial Joint Stock Bank</div>
                            </div>
                            
                            <div className="space-y-4 mt-6">
                                <div>
                                    <p className="text-xs opacity-75 mb-1">Số tài khoản</p>
                                    <p className="text-2xl font-mono font-bold tracking-wider">19036 888 999 001</p>
                                </div>
                                
                                <div>
                                    <p className="text-xs opacity-75 mb-1">Chủ tài khoản</p>
                                    <p className="text-lg font-semibold">TRUONG DAI HOC VAN LANG</p>
                                </div>

                                <div>
                                    <p className="text-xs opacity-75 mb-1">Chi nhánh</p>
                                    <p className="font-medium">Techcombank - Chi nhánh Tân Bình, TP.HCM</p>
                                </div>
                            </div>
                        </div>

                        {/* Transfer Instructions */}
                        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg mb-6">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-bold text-yellow-800 mb-2">Nội dung chuyển khoản</h3>
                                    <p className="text-sm text-yellow-700 font-mono bg-yellow-100 px-3 py-2 rounded">
                                        MSSV [Mã số sinh viên] KTXTHANG[Tháng]
                                    </p>
                                    <p className="text-xs text-yellow-700 mt-2">
                                        Ví dụ: <strong>MSSV 21748020 KTXTHANG11</strong>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Important Notes */}
                        <div className="space-y-3 mb-6">
                            <h3 className="font-bold text-gray-900">Lưu ý quan trọng:</h3>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li className="flex items-start gap-2">
                                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Vui lòng ghi <strong>ĐÚNG nội dung chuyển khoản</strong> để hệ thống tự động xác nhận thanh toán
                                </li>
                                <li className="flex items-start gap-2">
                                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Thời gian xử lý: <strong>15-30 phút</strong> trong giờ hành chính
                                </li>
                                <li className="flex items-start gap-2">
                                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Sau khi chuyển khoản, vui lòng chụp ảnh biên lai và gửi về email: <strong>ktx@vanlanguni.vn</strong>
                                </li>
                            </ul>
                        </div>

                        {/* Back to Dashboard Button */}
                        <Link
                            href="/dashboard"
                            className="w-full flex justify-center items-center gap-2 px-6 py-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all font-semibold border-2 border-gray-300"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Quay lại trang chủ
                        </Link>
                    </div>
                )}

                {/* Empty State - No Payment Method Selected */}
                {!paymentMethod && (
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
                        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Chọn phương thức thanh toán</h3>
                        <p className="text-gray-600">Vui lòng chọn phương thức thanh toán ở trên để tiếp tục</p>
                    </div>
                )}
            </div>
        </div>
    );
}
