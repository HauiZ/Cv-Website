import React, { useState } from "react";

const LocationFilter = ({ onLocationChange }) => {
  const area = ["TP Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Tất Cả"];
  const [selected, setSelected] = useState(null);

  const handleClick = (loc) => {
    if (loc === "Tất Cả") {
      setSelected(null); // bỏ chọn
      onLocationChange && onLocationChange(null); // thông báo là không có lọc
    } else {
      setSelected(loc);
      onLocationChange && onLocationChange(loc);
    }
  };

  return (
    <div className="flex gap-x-3 flex-wrap">
      {area.map((loc, index) => {
        const isSelected = selected === loc && loc !== "Tất Cả";

        return (
          <button
            key={index}
            onClick={() => handleClick(loc)}
            className={`px-4 py-2 rounded-2xl text-sm transition-colors duration-200
              ${isSelected ? "bg-[#0C8E5E] text-white" : "bg-[#E0E0E0] hover:bg-gray-300"}
            `}
          >
            {loc}
          </button>
        );
      })}
    </div>
  );
};

export default LocationFilter;
