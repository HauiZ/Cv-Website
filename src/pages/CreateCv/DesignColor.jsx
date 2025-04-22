import React from "react";
import { MdOutlineColorLens } from "react-icons/md";

export default function DesignColor({ active, onClick }) {
  return (
    <div
      className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer ${
        active ? "bg-green-500 text-white" : "bg-white text-gray-800"
      } hover:bg-green-100`}
      onClick={onClick}
    >
      <div className="p-1 border rounded-md">
        <MdOutlineColorLens size={20} />
      </div>
      <span className="text-sm font-medium">Đổi mẫu thiết kế</span>
    </div>
  );
}
