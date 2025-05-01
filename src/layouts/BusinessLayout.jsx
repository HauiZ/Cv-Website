// src/layouts/adminLayout.jsx
import React, { useState, useEffect } from "react";
import BusinessHeader from "../components/Header/BusinessHeader";
import Sidebar from "../components/BussinessContent/SideBarLayout";
import RenderContent from "../components/BussinessContent/RenderContent";

export default function BusinessLayout() {
  const [activeTab, setActiveTab] = useState("bang-tin");
  const [settingsTab, setSettingsTab] = useState("");
  useEffect(() => {
    const handleSettingsTabChange = () => {
      if (window && window.settingsTab) {
        setSettingsTab(window.settingsTab);
      }
    };

    // Set up listener
    window.addEventListener("storage", handleSettingsTabChange);

    // Check if it's already set
    if (window && window.settingsTab) {
      setSettingsTab(window.settingsTab);
    }

    return () => {
      window.removeEventListener("storage", handleSettingsTabChange);
    };
  }, []);
  return (
    <div className="pt-[75px]">
      <BusinessHeader></BusinessHeader>
      <div className="flex bg-gray-100">
        {/* Sidebar */}
        <div className="w-[15rem] h-[40rem] bg-white shadow fixed">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Content */}
        <div className="flex-1 p-9  ml-[15rem]">
          <RenderContent activeTab={activeTab} />
        </div>
      </div>
    </div>
  );
}
