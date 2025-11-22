import React, { useState } from 'react';
import { createRegistrationAction } from '@/actions/registration.actions';
import { DigitalCommitmentModal } from './DigitalCommitmentModal';

// Mock Status Enum
type RegStatus = 'PENDING' | 'VALIDATED' | 'APPROVED' | 'DEPOSIT_PAID' | 'READY_FOR_CHECKIN';

interface RegistrationFlowProps {
    role: 'STUDENT' | 'BQL' | 'ROOM_MANAGER' | 'FINANCE';
    currentStatus: RegStatus;
    onAction: (action: string) => void;
}

export const RegistrationFlow: React.FC<RegistrationFlowProps> = ({ role, currentStatus, onAction }) => {
    const [showModal, setShowModal] = useState(false);

    const handleFileUpload = async (files: File[]) => {
        // Mock implementation for now
        console.log('Files uploaded:', files);
        try {
            const result = await createRegistrationAction('student1', 'room1'); // Mock data
            if (result.success) {
                alert('Registration Submitted!');
            } else {
                alert('Error: ' + result.error);
            }
        } catch (e) {
            alert('Registration failed');
        }
    };

    const renderStudentView = () => {
        return (
            <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-md border border-blue-200">
                    <h3 className="font-bold text-blue-800">Current Status: {currentStatus}</h3>
                    <p className="text-sm text-blue-600 mt-1">
                        {currentStatus === 'PENDING' && 'Your application is being reviewed by BQL.'}
                        {currentStatus === 'VALIDATED' && 'Application valid. Waiting for room assignment.'}
                        {currentStatus === 'APPROVED' && 'Room assigned. Please pay the deposit.'}
                        {currentStatus === 'DEPOSIT_PAID' && 'Payment received. Please sign the digital commitment.'}
                        {currentStatus === 'READY_FOR_CHECKIN' && 'You are ready to check in!'}
                        {currentStatus === 'PENDING' && 'Your application is being reviewed by BQL.'}
                        {currentStatus === 'VALIDATED' && 'Application valid. Waiting for room assignment.'}
                        {currentStatus === 'APPROVED' && 'Room assigned. Please pay the deposit.'}
                        {currentStatus === 'DEPOSIT_PAID' && 'Payment received. Please sign the digital commitment.'}
                        {currentStatus === 'READY_FOR_CHECKIN' && 'You are ready to check in!'}
                    </p>
                </div>

                {currentStatus === 'DEPOSIT_PAID' && (
                    <button
                        onClick={() => setShowModal(true)}
                        className="w-full bg-indigo-600 text-white py-3 rounded-md font-bold hover:bg-indigo-700 shadow-lg transform transition hover:-translate-y-0.5"
                    >
                        Sign Digital Commitment
                    </button>
                )}

                <DigitalCommitmentModal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    onSubmit={(files) => {
                        console.log('Submitting proofs:', files);
                        handleFileUpload(files); // Call the new handler
                        onAction('SUBMIT_COMMITMENT');
                        setShowModal(false);
                    }}
                />
            </div>
        );
    };

    const renderAdminView = () => {
        return (
            <div className="border p-4 rounded-md bg-gray-50">
                <h3 className="font-bold mb-4">Admin Actions ({role})</h3>

                {role === 'BQL' && currentStatus === 'PENDING' && (
                    <button
                        onClick={() => onAction('VALIDATE')}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        Validate Application
                    </button>
                )}

                {role === 'ROOM_MANAGER' && currentStatus === 'VALIDATED' && (
                    <button
                        onClick={() => onAction('CONFIRM_ASSIGNMENT')}
                        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                    >
                        Confirm Room Assignment & Create Invoice
                    </button>
                )}

                {role === 'FINANCE' && currentStatus === 'APPROVED' && (
                    <button
                        onClick={() => onAction('CONFIRM_PAYMENT')}
                        className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
                    >
                        Confirm Payment Received
                    </button>
                )}

                {/* Fallback for no actions available */}
                {!['PENDING', 'VALIDATED', 'APPROVED'].includes(currentStatus) && (
                    <p className="text-gray-500 italic">No pending actions for this stage.</p>
                )}
            </div>
        );
    };

    return (
        <div className="max-w-md mx-auto mt-8">
            {role === 'STUDENT' ? renderStudentView() : renderAdminView()}
        </div>
    );
};
