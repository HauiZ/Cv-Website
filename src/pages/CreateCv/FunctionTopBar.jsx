import React from "react";
import { FaEye, FaDownload, FaPenNib } from "react-icons/fa";

export default function FunctionTopBar() {
  return (
    <div className="w-full flex justify-between items-center bg-white px-6 py-3 shadow-sm border-b">
      <div className="flex items-center space-x-2 text-gray-700 font-medium">
        <span>CV chưa đặt tên</span>
        <FaPenNib className="text-gray-600 transform -scale-x-100" />
      </div>

      <div className="flex items-center space-x-3">
        <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition duration-200">
          <FaEye />
          <span>Xem trước</span>
        </button>

        <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition duration-200">
          <FaDownload />
          <span>Lưu và tải xuống</span>
        </button>
      </div>
    </div>
  );
}
