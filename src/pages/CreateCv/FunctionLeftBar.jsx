import React, { useState } from "react";
import { FaPalette, FaTint, FaLightbulb } from "react-icons/fa";
import DesignColor from "./DesignColor";
import ColorTheme from "./ColorTheme";
import CvSuggestion from "./CvSuggestion";

const TABS = [
  { id: "design", label: "Đổi mẫu thiết kế", icon: <FaPalette /> },
  { id: "theme", label: "Màu chủ đề", icon: <FaTint /> },
  { id: "suggest", label: "Gợi ý viết CV", icon: <FaLightbulb /> },
];

export default function FunctionLeftBar() {
  const [activeTab, setActiveTab] = useState("suggest");

  const renderTabContent = () => {
    switch (activeTab) {
      case "design":
        return <DesignColor />;
      case "theme":
        return <ColorTheme />;
      case "suggest":
        return <CvSuggestion />;
      default:
        return null;
    }
  };

  return (
    <div className="flex gap-x-5">
      <div className="w-[8rem] p-4 rounded-xl flex h-fit">
        <div className="flex flex-col gap-2">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-col justify-center h-[5rem] w-[5rem] items-center gap-4 px-2 py-3 rounded-md text-sm border ${
                activeTab === tab.id
                  ? "bg-green-500 text-white"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100"
              } transition`}
            >
              <div className="text-base flex justify-center ">{tab.icon}</div>
              <div>{tab.label}</div>
            </button>
          ))}
        </div>
      </div>
      <div className="bg-white w-[20rem] p-3 h-fit rounded-lg text-sm">
        {renderTabContent()}
      </div>
    </div>
  );
}
