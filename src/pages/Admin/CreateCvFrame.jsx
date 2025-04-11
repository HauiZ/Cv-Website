import React, { useState } from "react";
import { faPlus, faUpload, faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CvCard from "./CvCard";
export default function CreateCvFrame() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      {/* Content area */}
      <div className="flex gap-4">
        {/* Upload area */}
        <div className="bg-[#e2e2f2] p-10 rounded-md">
          <label
            htmlFor="file-upload"
            className="cursor-pointer border-2 border-dashed border-[#aaa] rounded-xl p-6 flex flex-col items-center justify-center bg-white hover:bg-gray-50 transition"
          >
            <FontAwesomeIcon
              icon={faUpload}
              className="text-blue-500 text-4xl"
            />
            <span className="mt-4 bg-violet-600 text-white px-4 py-1 rounded-full text-sm font-bold">
              Select
            </span>
            <p className="text-xs mt-1 text-gray-600">OR DROP FILES HERE</p>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>

        {/* Preview card */}
        <CvCard />
      </div>

      {/* Action buttons */}
      <div className="flex gap-10 mt-4">
        <button className="bg-green-500 text-white px-8 py-2 rounded-lg font-bold hover:bg-green-600">
          Tạo
        </button>
        <button className="bg-red-600 text-white px-8 py-2 rounded-lg font-bold hover:bg-red-700">
          Hủy
        </button>
      </div>
    </div>
  );
}
