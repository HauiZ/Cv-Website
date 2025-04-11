import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";

export default function CvCard() {
  return (
    <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white">
      {/* Image container */}
      <div className="flex bg-[#777785] h-48 items-center justify-center">
        <FontAwesomeIcon
          icon={faImage}
          className="text-black text-[70px]"
        />
      </div>
      
      {/* Title and Name */}
      <div className="p-4 flex flex-col gap-2">
        <div className="flex justify-end">
          <button className="h-6 w-6 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors">
            +
          </button>
        </div>
        <div className="text-lg font-semibold text-gray-800">Name</div>
      </div>
    </div>
  );
}
