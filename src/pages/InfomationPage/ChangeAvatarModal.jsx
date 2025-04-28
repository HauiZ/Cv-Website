import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { changeAvatar } from "../../services/userApi";
import useLoading from "../../hooks/useLoading";
import { useToast } from "../../contexts/ToastContext";
import Loader from "../../components/Loader";
import { useAuthContext } from "../../contexts/AuthContext";
import {
    faUpload,
    faCheck,
    faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

const ChangeAvatarModal = ({ visible, onClose }) => {
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [dragging, setDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");
    const inputRef = useRef(null);
    const { withLoading, loading } = useLoading();
    const { showToast } = useToast();
    const { fetchUser } = useAuthContext();

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            setFile(droppedFile);
            setPreviewUrl(URL.createObjectURL(droppedFile));
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setDragging(false);
    };

    const handleUpload = async () => {
        if (!file) return;
        setUploading(true);
        setError("");

        await withLoading(async () => {
            console.log("Đang xử lý với file:", file);
            try {
                await changeAvatar(file);
                await fetchUser();
                showToast(`Cập nhật ảnh đại diện thành công với file: ${file.name}`, "success");
                onClose();
            } catch (error) {
                console.error(error);
                setError("Đã xảy ra lỗi khi tải ảnh lên.");
                showToast(`Đã xảy ra lỗi khi thay đổi ảnh: ${error?.message || error}`, "error");
            } finally {
                setUploading(false);
            }
        });
    };

    const handleClearFile = (e) => {
        e.stopPropagation();
        setFile(null);
        setPreviewUrl(null);
        if (inputRef.current) inputRef.current.value = "";
    };

    if (!visible) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-[600px] p-8 relative">
                {loading && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/70 rounded-xl">
                        <Loader />
                    </div>
                )}
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl"
                    onClick={onClose}
                >
                    ✕
                </button>

                <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Cập nhật Avatar</h2>

                {/* Drag and drop area */}
                <div
                    className={`border-2 ${dragging ? "border-blue-400 bg-blue-50" : "border-dashed border-gray-300"
                        } rounded-xl flex flex-col items-center justify-center p-8 cursor-pointer transition`}
                    onClick={() => inputRef.current.click()}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                >
                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    {file ? (
                        <div className="flex flex-col items-center">
                            <div className="rounded-full bg-green-100 p-3 mb-2">
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    className="text-green-600 text-xl"
                                />
                            </div>
                            <p className="font-medium text-green-700">
                                File đã được chọn
                            </p>
                            <p className="text-sm text-green-600 mt-1">{file.name}</p>

                            {/* Nút hủy chọn file */}
                            <button
                                onClick={handleClearFile}
                                className="mt-3 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200 flex items-center text-sm font-medium"
                            >
                                <FontAwesomeIcon icon={faTrashAlt} className="mr-1.5" />
                                Hủy chọn file
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center">
                            <div className="rounded-full bg-blue-100 p-3 mb-2">
                                <FontAwesomeIcon
                                    icon={faUpload}
                                    className="text-blue-600 text-xl"
                                />
                            </div>
                            <p className="font-medium text-gray-700">
                                Kéo thả hoặc nhấp vào đây để chọn file
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                                Hỗ trợ định dạng: png, img, jgp
                            </p>
                        </div>
                    )}
                </div>

                {/* Preview */}
                <div className="mt-6 flex justify-center">
                    {previewUrl ? (
                        <img
                            src={previewUrl}
                            alt="Avatar preview"
                            className="w-40 h-40 object-cover rounded-full shadow-md"
                        />
                    ) : (
                        <div className="w-40 h-40 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                            Ảnh xem trước
                        </div>
                    )}
                </div>

                {/* Error */}
                {error && (
                    <p className="text-red-500 text-center mt-4">{error}</p>
                )}

                {/* Buttons */}
                <div className="flex justify-center gap-6 mt-8">
                    <button
                        className={`px-6 py-2 rounded-lg font-bold text-white ${file && !uploading
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-gray-300 cursor-not-allowed"
                            }`}
                        disabled={!file || uploading}
                        onClick={handleUpload}
                    >
                        {uploading ? "Đang tải..." : "Cập nhật"}
                    </button>
                    <button
                        className="px-6 py-2 rounded-lg font-bold bg-red-500 hover:bg-red-600 text-white"
                        onClick={onClose}
                        disabled={uploading}
                    >
                        Hủy
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChangeAvatarModal;
