// src/layouts/BusinessLayout.jsx
import React from "react";
import { useLocation, Outlet } from "react-router-dom";
import BusinessHeader from "../components/Header/BusinessHeader";
import Sidebar from "../components/BussinessContent/SideBarLayout";

export default function BusinessLayout() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const activeTab = pathSegments[2] || "bang-tin"; // Default to bang-tin if no path
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 w-full z-50">
        <BusinessHeader />
      </div>
      <div className="flex flex-1 pt-[75px]">
        {/* Sidebar */}
        <div className="w-[15rem] fixed left-0 top-[75px] bottom-0 bg-white shadow-md overflow-y-auto">
          <Sidebar activeTab={activeTab} />
        </div>{" "}
        {/* Main Content */}
        <div className="flex-1 ml-[15rem] bg-gray-100 min-h-full">
          <div className="p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
