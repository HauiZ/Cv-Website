import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faSearch } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Header = ({ setSelectedPage }) => {
  return (
    <header className="bg-blue-500 text-white px-4 py-2 flex items-center justify-between shadow">
      {/* Nút điều hướng */}
      <div className="flex space-x-2">
        <button
          className="bg-white text-black rounded-full px-4 py-1 transition-all duration-300 hover:bg-blue-100 hover:scale-105"
          onClick={() => setSelectedPage("overview")}
        >
          Overview
        </button>
        <button
          className="relative bg-white text-black rounded-full px-4 py-1 transition-all duration-300 hover:bg-blue-100 hover:scale-105"
          onClick={() => setSelectedPage("request")}
        >
          Request
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            2
          </span>
        </button>
      </div>

      {/* Tìm kiếm + Thông báo */}
      <div className="flex items-center space-x-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Comming Soon"
            className="pl-10 pr-3 py-1 bg-[#c5c7cb] [#7c7878] rounded border focus:outline-none text-black transition-all duration-200 hover:ring-2 hover:ring-blue-300 hover:bg-white focus:bg-white"
            disabled
          />
          <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-2 text-gray-500" />
        </div>
        <FontAwesomeIcon icon={faBell} className="text-white text-xl cursor-pointer hover:text-yellow-300 transition-all duration-200" />
      </div>
    </header>
  );
};

export default Header;
