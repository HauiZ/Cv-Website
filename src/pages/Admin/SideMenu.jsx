import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsersRectangle,
  faBox,
  faSignOutAlt,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import logo from "../../assets/image/logoNoBg.png";

const SideMenu = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <aside
      className={`bg-white shadow h-screen ${isCollapsed ? "w-20" : "w-60"
        } p-4 flex flex-col justify-between border-r-2 border-[#AFBCC9] transition-all duration-500`}
    >
      {/* Menu Items */}
      <div className="space-y-6">
        {/* Toggle */}
        <div className="flex justify-end">
          <FontAwesomeIcon
            icon={faBars}
            className="text-gray-500 cursor-pointer"
            onClick={toggleSidebar}
          />
        </div>

        {/* Dash Board */}
        <div className="flex items-center space-x-3 px-2 py-2 rounded-lg hover:bg-purple-100 text-purple-700 font-medium cursor-pointer transition">
          <FontAwesomeIcon icon={faUsersRectangle} className="text-xl" />
          {!isCollapsed && <span>Dash Board</span>}
        </div>

        {/* Products */}
        <div className="flex items-center space-x-3 px-2 py-2 rounded-lg hover:bg-purple-100 text-black font-medium cursor-pointer transition">
          <FontAwesomeIcon icon={faBox} className="text-xl" />
          {!isCollapsed && <span>Products</span>}
        </div>
      </div>

      {/* Logo + Logout */}
      <div className="flex justify-center">
        <img
          src={logo}
          alt="Logo"
          className={`${isCollapsed ? "w-10 h-10" : "w-[10vw] h-[10vw]"
            } rounded-full object-contain shadow-md mb-2 transition-all duration-500`}
        />
      </div>
      <div className="flex items-center space-x-3 text-red-500 hover:text-red-700 cursor-pointer px-3 py-2 rounded-md hover:bg-gray-100 transition">
        <FontAwesomeIcon icon={faSignOutAlt} className="text-xl" />
        {!isCollapsed && <span>Log out</span>}
      </div>


    </aside>
  );
};

export default SideMenu;
