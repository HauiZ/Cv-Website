import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

// Import our beautiful FileUploader component
export default function FileUploader({ onFileUploaded, currentAvatar }) {
    const [isDragging, setIsDragging] = useState(false);
    const [preview, setPreview] = useState(currentAvatar || null);
    useEffect(() => {
      if (currentAvatar === "") {
        setPreview(null);
        onFileUploaded(null);
      }
    }, [currentAvatar]);

    const handleDragEnter = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
    };
  
    const handleDragLeave = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    };
  
    const handleDragOver = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!isDragging) setIsDragging(true);
    };
  
    const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleImageUpload(e.dataTransfer.files[0]);
      }
    };
    
    const handleFileChange = (e) => {
      if (e.target.files && e.target.files.length > 0) {
        handleImageUpload(e.target.files[0]);
      }
    };
    
    const handleImageUpload = (file) => {
      if (file && file.type.match('image.*')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target.result;
          setPreview(result);
          onFileUploaded(result);
        };
        reader.readAsDataURL(file);
      }
    };
  
    const removeFile = () => {
      setPreview(null);
      onFileUploaded(null);
    };
  
    return (
      <div className="w-full h-full">
        <div 
          className={`relative w-full h-full rounded-full overflow-hidden transition-all duration-300 ${
            isDragging 
              ? "border-4 border-dashed border-blue-500 bg-blue-50" 
              : preview 
                ? "border-4 border-solid border-green-500" 
                : "bg-gray-200 hover:bg-gray-100"
          }`}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {!preview ? (
            <>
              <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="text-blue-600 mb-2">
                  <FontAwesomeIcon icon={faUpload} className="text-xl" />
                </div>
                <p className="text-sm font-medium text-center text-blue-600">
                  {isDragging ? "Thả ảnh vào đây" : "Tải ảnh lên"}
                </p>
              </div>
              
              <input 
                type="file" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileChange}
                accept="image/*"
              />
            </>
          ) : (
            <div className="relative w-full h-full">
              <img src={preview} alt="Avatar" className="w-full h-full object-cover" />
              
              <button 
                className="absolute top-5 right-3 p-1 bg-white rounded-full shadow-md hover:bg-red-100 focus:outline-none"
                onClick={removeFile}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }