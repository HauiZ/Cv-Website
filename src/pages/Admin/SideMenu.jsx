import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsersRectangle,
  faBox,
  faSignOutAlt,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import logo from "../../assets/image/logoNoBg.png";
import { NavLink, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
const menuItems = [
  {
    to: "/admin",
    icon: faUsersRectangle,
    label: "Dash Board",
  },
  {
    to: "/admin/products",
    icon: faBox,
    label: "Products",
  },
];

const SideMenu = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { logOut } = useAuth((path) => navigate(path));
  const navigate = useNavigate();

  const toggleSidebar = () => setIsCollapsed((prev) => !prev);

  const onclose = () => {
    logOut();
  };
  return (
    <aside
      className={`bg-white shadow h-screen sticky top-0 ${
        isCollapsed ? "w-20" : "w-60"
      } p-4 flex flex-col justify-between border-r-2 border-[#AFBCC9] transition-all duration-500`}
    >
      {/* Toggle */}
      <div className="flex justify-end mb-6">
        <FontAwesomeIcon
          icon={faBars}
          className="text-gray-500 cursor-pointer"
          onClick={toggleSidebar}
        />
      </div>

      {/* Menu Items */}
      <div className="space-y-3 flex-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.to;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg font-medium transition ${
                isActive
                  ? "bg-purple-100 text-purple-700"
                  : "text-black hover:bg-purple-100"
              }`}
            >
              <FontAwesomeIcon icon={item.icon} className="text-xl" />
              {!isCollapsed && (
                <span className="whitespace-nowrap">{item.label}</span>
              )}
            </NavLink>
          );
        })}
        <div className="flex justify-center mt-50">
          <img
            src={logo}
            alt="Logo"
            className={`${
              isCollapsed ? "w-10 h-10" : "w-30 h-30"
            } rounded-full object-contain shadow-md mb-2 transition-all duration-500`}
          />
        </div>
      </div>

      {/* Logo + Logout */}
      <div
        className="flex items-center space-x-3 text-red-500 hover:text-red-700 cursor-pointer px-3 py-2 rounded-md hover:bg-gray-100 transition"
        onClick={onclose}
      >
        <FontAwesomeIcon icon={faSignOutAlt} className="text-xl" />
        {!isCollapsed && <span>Log out</span>}
      </div>
    </aside>
  );
};

export default SideMenu;
