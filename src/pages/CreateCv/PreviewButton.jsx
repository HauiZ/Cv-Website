import React, { useState } from "react";
import CvDisplay from "./CvDisplay";
import { CVPDF } from "./Styles";
import { PDFViewer } from "@react-pdf/renderer";

export default function PreviewButton({ formData, primaryColor }) {
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    // Tạo một bản sao của formData để không ảnh hưởng đến dữ liệu gốc
    const [previewFormData, setPreviewFormData] = useState({});

    // Hàm mở modal preview
    const openPreview = () => {
        // Sao chép dữ liệu hiện tại vào previewFormData
        setPreviewFormData({ ...formData });
        setIsPreviewOpen(true);
    };

    // Hàm đóng modal preview
    const closePreview = () => {
        setIsPreviewOpen(false);
    };

    // Nếu modal không mở, không render gì
    if (!isPreviewOpen) {
        return (
            <button
                onClick={openPreview}
                className="flex items-center px-4 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition duration-200"
            >
                <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                </svg>
                Xem trước
            </button>
        );
    }

    // Modal preview với CvDisplay component
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-11/12 max-w-6xl max-h-screen overflow-auto">
                {/* Header của modal */}
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-xl font-bold text-green-600">Xem trước CV</h2>
                    <button
                        onClick={closePreview}
                        className="p-1 rounded-full hover:bg-gray-200"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                <div className="preview-container">
                    <PDFViewer width="100%" height="700">
                        <CVPDF formData={previewFormData} primaryColor={primaryColor} />
                    </PDFViewer>
                </div>

            </div>
        </div>
    );
}