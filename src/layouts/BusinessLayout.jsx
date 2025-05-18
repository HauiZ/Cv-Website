// src/layouts/adminLayout.jsx
import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import BusinessHeader from "../components/Header/BusinessHeader";
import Sidebar from "../components/BussinessContent/SideBarLayout";

export default function BusinessLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname.split('/').pop() || 'bang-tin';

  // Function to update the path
  const handleTabChange = (newTab) => {
    navigate(`/recruiter/${newTab}`);
  };
  return (
    <div className="pt-[75px]">
      <BusinessHeader />
      <div className="flex bg-gray-100">
        {/* Sidebar */}
        <div className="w-[15rem] h-[40rem] bg-white shadow fixed">
          <Sidebar activeTab={currentPath} setActiveTab={handleTabChange} />
        </div>

        {/* Content */}
        <div className="flex-1 p-9 ml-[15rem]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
