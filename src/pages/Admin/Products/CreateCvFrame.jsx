import React, { useState } from "react";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CvCard from "./CvCard";

export default function CreateCvFrame({request, onClose}) {
  if (!request) return null;
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(URL.createObjectURL(selectedFile));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-[900px] h-[520px] p-6 flex flex-col justify-between relative ">
        {/* Close button */}
        <button className="absolute top-2 right-2 text-black hover:text-red-600 text-xl font-bold" onClick={onClose}>
          ✕
        </button>

        {/* Upload + Preview */}
        <div className="flex justify-center  mr-[10vw] gap-4 w-[70%] h-full bg-gray-300">
          <div className="flex justify-between items-center ">
            {/* Upload area */}
            <div className="flex-1 flex justify-center items-center">
              <label
                htmlFor="file-upload"
                className="cursor-pointer border-2 border-dashed border-[#aaa] rounded-xl p-6 w-[240px] h-[240px] flex flex-col items-center justify-center bg-[#e2e2f2] hover:bg-gray-100 transition"
              >
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
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
          {/* Preview card with image */}
          <div className="flex absolute right-10 top-5">
            <CvCard imageUrl={file} />
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-center gap-10 mt-6">
          <button className="bg-green-500 text-white px-8 py-2 rounded-lg font-bold hover:bg-green-600">
            Tạo
          </button>
          <button className="bg-red-600 text-white px-8 py-2 rounded-lg font-bold hover:bg-red-700">
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
}
