import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function TemplateCv({ onAddToCategory }) {
  const [imageUrl, setImageUrl] = useState("src/assets/image/icon_webCV.png");
  const [name, setName] = useState("Tên mẫu CV");

  return (
    <div className="w-[23rem] rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white">
      {/* Image */}
      <div className="bg-[#777785] h-[30rem] flex items-center justify-center cursor-pointer relative">
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
          type="file"
          accept="image/*"
          className="hidden"
        />
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col gap-2 bg-white">
        <div className="flex justify-end">
          <button className="h-7 w-7 rounded-full bg-black text-white text-sm flex items-center justify-center hover:bg-gray-800 transition-colors">
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>

        {/* Tên CV */}

        <div
          className="text-base font-semibold text-gray-900 cursor-pointer"
        >
          {name}
        </div>
      </div>
    </div>
  );
}
