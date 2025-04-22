import React, { useState } from "react";

const LocationFilter = ({ onLocationChange }) => {
  const area = ["TP. Hồ Chí Minh", "Hà Nội", "Miền Nam", "Miền Bắc"];
  const [selected, setSelected] = useState(null); // giữ location được chọn

  const handleClick = (loc) => {
    setSelected(loc); // cập nhật state được chọn
    onLocationChange && onLocationChange(loc); // gọi hàm cha
  };

  return (
    <div className="flex gap-x-3">
      {area.map((loc, index) => (
        <button
          key={index}
          onClick={() => handleClick(loc)}
          className={`px-4 py-2 rounded-2xl text-sm transition-colors duration-200
            ${selected === loc ? "bg-[#0C8E5E] text-white" : "bg-[#E0E0E0] hover:bg-gray-300"}
          `}
        >
          {loc}
        </button>
      ))}
    </div>
  );
};

export default LocationFilter;
