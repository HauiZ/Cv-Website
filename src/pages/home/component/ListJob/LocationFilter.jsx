import React from "react";

const locations = ["TP Hồ Chí Minh", "Hà Nội", "Miền Nam", "Miền Bắc"];

const LocationFilter = () => {
  return (
    <div className="flex gap-x-3">
      {locations.map((loc, index) => (
        <button
          key={index}
          className="bg-[#E0E0E0] px-4 py-2 rounded-2xl text-sm hover:bg-gray-300 transition-colors duration-200"
        >
          {loc}
        </button>
      ))}
    </div>
  );
};

export default LocationFilter;
