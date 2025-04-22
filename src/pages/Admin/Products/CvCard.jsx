import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function CvCard({ onAddToCategory }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [name, setName] = useState("Tên mẫu CV");
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null); // For file validation

  const fileInputRef = useRef();

  const handleImageClick = () => {
    fileInputRef.current.click(); // Trigger input file
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if the file is an image
      if (!file.type.startsWith("image/")) {
        setErrorMessage("Please upload a valid image file.");
        setImageUrl(null); // Reset image preview if invalid file
      } else {
        setErrorMessage(null);
        const url = URL.createObjectURL(file);
        setImageUrl(url);
      }
    }
  };

  const handleNameClick = () => {
    setIsEditing(true);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleNameBlur = () => {
    setIsEditing(false);
  };

  return (
    <div className="w-[200px] rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white">
      {/* Image */}
      <div
        className="bg-[#777785] h-[220px] flex items-center justify-center cursor-pointer relative"
        onClick={handleImageClick}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Preview"
            className="object-cover w-full h-full"
          />
        ) : (
          <FontAwesomeIcon icon={faImage} className="text-black text-[80px]" />
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      {/* Error message */}
      {errorMessage && (
        <div className="text-red-500 text-xs px-3">{errorMessage}</div>
      )}

      {/* Content */}
      <div className="p-3 flex flex-col gap-2 bg-white">
        <div className="flex justify-end">
          <button
            className="h-7 w-7 rounded-full bg-black text-white text-sm flex items-center justify-center hover:bg-gray-800 transition-colors"
            onClick={onAddToCategory}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>

        {/* Tên CV */}
        {isEditing ? (
          <input
            className="text-base font-semibold border border-gray-300 rounded px-1 py-0.5"
            value={name}
            onChange={handleNameChange}
            onBlur={handleNameBlur}
            autoFocus
          />
        ) : (
          <div
            className="text-base font-semibold text-gray-900 cursor-pointer"
            onClick={handleNameClick}
          >
            {name}
          </div>
        )}
      </div>
    </div>
  );
}
