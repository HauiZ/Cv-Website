import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faUpload,
  faExclamationCircle,
  faCheck,
  faInfoCircle,
  faArrowRight,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import useLoading from "../../hooks/useLoading";
import { useToast } from "../../contexts/ToastContext";
import Loader from "../../components/Loader";
import { applyJobApi } from "../../services/userApi";
import { emitEvent } from "../../services/emitEvent";
import useCustomMutation from "../../hooks/useCustomMutation";

export default function ApplyPopUp({ isOpen, onClose, jobId, setIsApplied }) {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const { mutate: applyJobMutate } = useCustomMutation(applyJobApi);
  const { mutate: emitEventMutate } = useCustomMutation(emitEvent);
  const { withLoading, loading } = useLoading();
  const { showToast } = useToast();
  const handleClose = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    onClose();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) setFile(selectedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleApply = async () => {
    if (!file) {
      showToast("Vui lòng đính kèm file CV trước khi ứng tuyển!", "error");
      return;
    }
    withLoading(async () => {
      try {
        await applyJobMutate(jobId, file);
        emitEventMutate({ event_name: 'apply_job', job_id: jobId });
        handleClose();
        setIsApplied(true);
      } catch (error) {
        showToast("Đã xảy ra lỗi khi ứng tuyển!", error);
      }
    });
  };

  const handleBrowseClick = () => fileInputRef.current.click();

  const handleClearFile = (e) => {
    e.stopPropagation();
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/70 z-50 backdrop-blur-sm transition-all duration-300">
      <div className="bg-white p-6 rounded-xl w-full max-w-2xl shadow-2xl transform transition-all duration-300 ease-in-out">
        {loading && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/70 rounded-xl">
            <Loader />
          </div>
        )}
        {/* Header với nút đóng */}
        <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Ứng tuyển công việc
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
            aria-label="Đóng"
          >
            <FontAwesomeIcon
              icon={faTimes}
              className="text-gray-500 hover:text-gray-700 text-xl"
            />
          </button>
        </div>

        <div className="space-y-6">
          {/* Phần upload file */}
          <div>
            <label className="font-medium mb-2 text-gray-700 flex items-center">
              <FontAwesomeIcon icon={faUpload} className="mr-2 text-blue-600" />
              Đính kèm CV của bạn
            </label>

            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-200 ${isDragging
                ? "border-blue-500 bg-blue-50"
                : file
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleBrowseClick}
            >
              <input
                type="file"
                ref={fileInputRef}
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
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
                    Hỗ trợ định dạng: PDF, DOC, DOCX
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Thông báo cảnh báo */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm">
            <div className="flex">
              <FontAwesomeIcon
                icon={faExclamationCircle}
                className="text-amber-500 mr-2 flex-shrink-0 mt-1 text-lg"
              />
              <div>
                <p className="font-semibold text-gray-800 mb-2">
                  Lưu ý quan trọng:
                </p>
                <p className="text-gray-700 mb-2">
                  CVweb khuyên tất cả các bạn hãy luôn cẩn trọng trong quá trình
                  tìm việc và chủ động nghiên cứu về thông tin công ty, vị trí
                  việc làm trước khi ứng tuyển.
                </p>
                <p className="text-gray-700">
                  Ứng viên cần có trách nhiệm với hành vi ứng tuyển của mình.
                  Nếu bạn gặp phải tin tuyển dụng hoặc nhận được liên lạc đáng
                  ngờ của nhà tuyển dụng, hãy báo cáo ngay cho CvWebsite qua
                  email{" "}
                  <span className="font-medium text-blue-700">
                    hotro@cvwebsite.vn
                  </span>{" "}
                  để được hỗ trợ kịp thời.
                </p>
                <a
                  href="https://www.topcv.vn/canh-bao-lua-dao"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-600 hover:text-blue-800 font-medium mt-2 group"
                >
                  <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
                  Tìm hiểu thêm kinh nghiệm phòng tránh lừa đảo
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="ml-1 group-hover:translate-x-1 transition-transform duration-200"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between gap-3 pt-2">
            <button
              className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition-colors duration-200 flex items-center"
              onClick={handleClose}
            >
              <FontAwesomeIcon icon={faTimes} className="mr-1.5" />
              Hủy
            </button>
            <button
              className={`px-5 py-2.5 w-[30rem] justify-center rounded-lg font-medium transition-all duration-200 flex items-center ${file
                ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-200"
                : "bg-blue-400 text-white cursor-not-allowed opacity-75"
                }`}
              onClick={handleApply}
              disabled={!file}
            >
              <FontAwesomeIcon icon={faCheck} className="mr-1.5" />
              Xác nhận ứng tuyển
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
