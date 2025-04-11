import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";

export default function CvCard({ imageUrl }) {
  return (
    <div className="w-[200px] rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white">
      {/* Image container */}
      <div className="bg-[#777785] h-[220px] flex items-center justify-center">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Preview"
            className="object-cover w-full h-full"
          />
        ) : (
          <FontAwesomeIcon icon={faImage} className="text-black text-[80px]" />
        )}
      </div>

      {/* Title and Name */}
      <div className="p-3 flex flex-col gap-2 bg-white">
        <div className="flex justify-end">
          <button className="h-7 w-7 rounded-full bg-black text-white text-sm flex items-center justify-center hover:bg-gray-800 transition-colors">
            +
          </button>
        </div>
        <div className="text-base font-semibold text-gray-900">Name</div>
      </div>
    </div>
  );
}
