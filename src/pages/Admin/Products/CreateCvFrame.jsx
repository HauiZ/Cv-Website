import React, { useState, useRef } from "react";
import {
  faUpload,
  faTrashAlt,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CvCard from "./CvCard";
import { createTemplateCVApi } from "../../../services/CvApi";
import useCustomMutation from "../../../hooks/useCustomMutation";

export default function CreateCvFrame({ request, onClose, refetch} ) {
  if (!request) return null;

  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const cvCardRef = useRef(null);
  const { mutate: uploadCvTemplate, loading } = useCustomMutation(createTemplateCVApi);

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

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleClearFile = (e) => {
    e.stopPropagation();
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleApply = async () => {
    if (!file) {
      showToast("Vui lòng đính kèm file CV trước khi tạo!", "error");
      return;
    }

    if (!cvCardRef.current) {
      showToast("Không thể lấy thông tin từ CV Card!", "error");
      return;
    }

    // Get data from the cvCardRef
    const name = cvCardRef.current.getName() || "";
    const tags = cvCardRef.current.getTags() || [];
    const imageFile = cvCardRef.current.getImageFile();
// Inside the handleApply function of CreateCvFrame.jsx, 
// replace the formData.append for properties with:

const handleApply = async () => {
  if (!file) {
    showToast("Vui lòng đính kèm file CV trước khi tạo!", "error");
    return;
  }

  if (!cvCardRef.current) {
    showToast("Không thể lấy thông tin từ CV Card!", "error");
    return;
  }

  // Get data from the cvCardRef
  const name = cvCardRef.current.getName() || "";
  const tags = cvCardRef.current.getTags() || [];
  const imageFile = cvCardRef.current.getImageFile();

  console.log('Submitting CV data:', { name, tags, hasImage: !!imageFile });

  const formData = new FormData();
  
  // Add the CV url as a string
  const fileUrl = "http://localhost:5173/template1"; // Update this to your actual URL
  formData.append("url", fileUrl);
  
  // Add name
  formData.append("name", name);
  
  // Add tags - send as a comma-separated string instead of JSON string with brackets
  formData.append("propoties", tags.join(", "));
  
  // Add image file if available
  if (imageFile) {
    formData.append("file", imageFile);
  }

  try {
    await uploadCvTemplate(formData);
    showToast("Tạo CV thành công!", "success");
    onClose();
  } catch (error) {
    // Error is already handled by useCustomMutation
  }
  finally{
    onClose();
    refetch();
  }
};
    console.log('Submitting CV data:', { name, tags, hasImage: !!imageFile });

    const formData = new FormData();
    
    // Add the CV url as a string (NOT the file itself)
    // This is what the API expects based on the screenshot
    const fileUrl = "http://localhost:5173/template1"; // This should be where your file is stored
    formData.append("url", fileUrl);
    
    // Add name and tags
    formData.append("name", name);
    formData.append("propoties", JSON.stringify(tags));
    
    // Add image file if available
    if (imageFile) {
      formData.append("file", imageFile);
    }

    try {
      await uploadCvTemplate(formData);
      showToast("Tạo CV thành công!", "success");
      onClose();
    } catch (error) {
      // Error is already handled by useCustomMutation
    }
    finally{
      onClose();
   refetch   ();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-fit h-[35rem] p-6 flex flex-col justify-between relative">
        {/* Close button */}
        <button
          className="absolute top-2 right-2 text-black hover:text-red-600 text-xl font-bold"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Upload + Preview */}
        <div className="flex items-center justify-center w-fit h-fit">
          {/* Upload area */}
          <div
            className={`w-[38rem] h-[28rem] border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${
              isDragging
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
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="hidden"
            />

            {file ? (
              <div className="flex flex-col items-center">
                {/* Show file preview if it's an image */}
                {file.type.startsWith("image/") && (
                  <div
                    className="mb-4 border border-gray-200 rounded-lg overflow-hidden"
                    style={{ maxWidth: "200px", maxHeight: "200px" }}
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Preview"
                      className="w-full h-auto object-contain"
                    />
                  </div>
                )}

                {/* File info and clear option */}
                <div className="flex items-center mt-2">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="text-green-600 text-xl mr-2"
                  />
                  <p className="font-medium text-green-700 text-sm">
                    {file.name}
                  </p>
                  <button
                    onClick={handleClearFile}
                    className="ml-4 text-red-600 hover:text-red-800"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <FontAwesomeIcon
                  icon={faUpload}
                  className="text-blue-500 text-5xl"
                />
                <span className="mt-4 bg-violet-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                  Select
                </span>
                <p className="text-xs mt-1 text-gray-600 text-center">
                  OR DROP FILES HERE
                </p>
              </>
            )}
          </div>

          {/* Preview Card - Always visible */}
          <div className="w-fit flex justify-end ml-10">
            <CvCard
              ref={cvCardRef}
              imageUrl={
                file && file.type.startsWith("image/") 
                  ? URL.createObjectURL(file) 
                  : "/api/placeholder/200/280"
              }
            />
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-center gap-10 mt-6">
          <button
            className={`${loading ? 'bg-green-400' : 'bg-green-500 hover:bg-green-600'} text-white px-8 py-2 rounded-lg font-bold`}
            onClick={handleApply}
            disabled={loading}
          >
            {loading ? 'Đang tạo...' : 'Tạo'}
          </button>
          <button
            className="bg-red-600 text-white px-8 py-2 rounded-lg font-bold hover:bg-red-700"
            onClick={onClose}
            disabled={loading}
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
}