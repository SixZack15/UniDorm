import React, { useState } from 'react';

interface DigitalCommitmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (proofs: File[]) => void;
}

export const DigitalCommitmentModal: React.FC<DigitalCommitmentModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [agreed, setAgreed] = useState(false);
    const [files, setFiles] = useState<File[]>([]);

    if (!isOpen) return null;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files));
        }
    };

    const handleSubmit = () => {
        if (agreed && files.length > 0) {
            onSubmit(files);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Digital Commitment & Entry Confirmation</h2>

                <div className="mb-6 p-4 bg-gray-50 rounded-md border border-gray-200 text-sm text-gray-700 h-64 overflow-y-scroll">
                    <h3 className="font-bold mb-2">Dormitory Rules & Regulations</h3>
                    <p>1. Keep the room clean and tidy.</p>
                    <p>2. No noise after 10 PM.</p>
                    <p>3. No unauthorized guests.</p>
                    <p>4. Respect common areas and property.</p>
                    <p>... (Full text of regulations) ...</p>
                </div>

                <div className="mb-6">
                    <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={agreed}
                            onChange={(e) => setAgreed(e.target.checked)}
                            className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-gray-700 font-medium">
                            I have read and agree to the Dormitory Rules & Regulations.
                        </span>
                    </label>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload Proof of Identity (Passport/ID Card)
                    </label>
                    <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={!agreed || files.length === 0}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                        Confirm & Submit
                    </button>
                </div>
            </div>
        </div>
    );
};
