import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faChartBar } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import UserContent from "./UserContent";
import "./animation.css";
import useCustomFetch from "../../../../hooks/useCustomFetch";
import {
  fetchDataDashBoardApi,
} from "../../../../services/adminApi";
import OverViewChart from "./OverViewChart";

const stats = [
  {
    title: "Overview",
    icon: faChartBar,
    color: "bg-orange-100 text-orange-600",
    hoverColor: "hover:bg-orange-200",
    selectedClass: "ring-orange-400",
    key: "overview",
  },
  {
    title: "Users",
    icon: faUsers,
    color: "bg-green-100 text-green-600",
    hoverColor: "hover:bg-green-200",
    selectedClass: "ring-green-400",
    key: "users",
  },
];

const OverViewContent = () => {
  const { data, refetch: refetchDashboard } = useCustomFetch(
    fetchDataDashBoardApi
  );
  const [activeKey, setActiveKey] = useState("overview");
  const [currentContent, setCurrentContent] = useState("overview");
  const [contentVisible, setContentVisible] = useState(true);
  // Use timestamp for chart key to ensure it's always unique
  const [chartKey, setChartKey] = useState(Date.now());

  const [counts, setCounts] = useState({
    users: 0,
    candidates: 0,
    recruiters: 0,
    news: 0,
  });

  useEffect(() => {
    setCounts({
      users: data?.user || 0,
      candidates: data?.candidate || 0,
      recruiters: data?.recruiter || 0,
      news: data?.recruitmentNews || 0,
    });
  }, [data]);

  const handleTabChange = (key) => {
    if (key !== activeKey) {
      // Switching tabs
      setContentVisible(false);

      setTimeout(() => {
        setActiveKey(key);
        setCurrentContent(key);

        // Create a new key when switching to Overview to force remount
        if (key === "overview") {
          setChartKey(Date.now());
        }

        setTimeout(() => {
          setContentVisible(true);
        }, 50);
      }, 300);
    } else if (key === "overview") {
      // Re-clicking already active Overview tab
      setContentVisible(false);

      setTimeout(() => {
        // Generate new timestamp key to force chart remount
        setChartKey(Date.now());

        setTimeout(() => {
          setContentVisible(true);
        }, 50);
      }, 300);
    }
  };

  // Function to handle user deletion and refresh dashboard data
  const handleDataUpdate = () => {
    refetchDashboard();
  };

  const renderContent = () => {
    if (currentContent === "users") {
      return <UserContent onDataUpdate={handleDataUpdate} />;
    } else {
      return <OverViewChart key={chartKey} counts={counts} />;
    }
  };

  return (
    <div className="p-6 min-h-screen">
      {/* Tabs */}
      <div className="flex justify-center gap-x-10">
        {stats.map((item, index) => (
          <div
            key={index}
            className={`p-4 w-[20rem] rounded-xl shadow-md cursor-pointer transition-all duration-300 transform ${item.color} ${item.hoverColor} flex items-center space-x-4 animate-scaleIn ${
              activeKey === item.key
                ? `ring-2 ring-offset-2 ${item.selectedClass} shadow-lg scale-105`
                : "hover:shadow-lg hover:scale-102"
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => handleTabChange(item.key)}
          >
            <div className="p-3 rounded-full bg-white bg-opacity-50">
              <FontAwesomeIcon icon={item.icon} className="text-2xl" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {item.key === "overview" ? "Dashboard" : counts[item.key]}
              </p>
              <p className="text-sm font-medium">{item.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="mt-8 p-6 bg-white rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
          {stats.find((item) => item.key === activeKey)?.title} Management
        </h2>

        <div
          className={`mt-4 transition-all duration-300 ${
            contentVisible ? "animate-fadeIn" : "animate-fadeOut"
          }`}
        >
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default OverViewContent;
