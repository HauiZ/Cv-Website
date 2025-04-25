import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faTasks,
  faCheckCircle,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import UserContent from "./UserContent";
import CandidateContent from "./CandidateContent";
import RecruiterContent from "./RecruiterContent";
import NewsContent from "./NewsContent";
import './animation.css';
import useCustomFetch from "../../../../hooks/useCustomFetch";
import { fetchDataDashBoardApi, fetchUserApi } from "../../../../services/adminApi";

const stats = [
  {
    title: "Users",
    icon: faUsers,
    color: "bg-blue-100 text-blue-600",
    hoverColor: "hover:bg-blue-200",
    selectedClass: "ring-blue-400",
    key: "users",
  },
  {
    title: "Candidates",
    icon: faTasks,
    color: "bg-yellow-100 text-yellow-600",
    hoverColor: "hover:bg-yellow-200",
    selectedClass: "ring-yellow-400",
    key: "news",
  },
  {
    title: "Recruiters",
    icon: faCheckCircle,
    color: "bg-green-100 text-green-600",
    hoverColor: "hover:bg-green-200",
    selectedClass: "ring-green-400",
    key: "news",
  },
  {
    title: "Recruitment News",
    icon: faSpinner,
    color: "bg-purple-100 text-purple-600",
    hoverColor: "hover:bg-purple-200",
    selectedClass: "ring-purple-400",
    key: "news",
  },
];

const OverViewContent = () => {
  const { data } = useCustomFetch(fetchDataDashBoardApi); 
  const { data: users } = useCustomFetch(fetchUserApi)
  const [activeKey, setActiveKey] = useState("");
  const [counts, setCounts] = useState({
    users: 0,
    candidates: 0,
    recruiters: 0,
    news: 0
  });
  const [contentVisible, setContentVisible] = useState(true);
  const [currentContent, setCurrentContent] = useState("users");
  
  useEffect(() => {
    // Set counts from mock data
    setCounts({
      users: data?.user || 0,
      candidates: data?.candidate || 0,
      recruiters: data?.recruiter || 0,
      news: data?.recruitmentNews || 0 
    });
  }, [data]);

  const handleTabChange = (key) => {
    if (key !== activeKey) {
      setContentVisible(false); // Start fade out animation
      
      // Wait for fade out to complete before changing content
      setTimeout(() => {
        setActiveKey(key);
        setCurrentContent(key);
        
        // Start fade in animation
        setTimeout(() => {
          setContentVisible(true);
        }, 50);
      }, 300); // This should match the fadeOut animation duration
    }
  };

  const renderContent = () => {
    switch (currentContent) {
      case "users":
        return <UserContent data={users?.users || []} />;
      case "candidates":
        return <CandidateContent />;
      case "recruiters":
        return <RecruiterContent />;
      case "news":
        return <NewsContent />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger-animate">
        {stats.map((item, index) => (
          <div
            key={index}
            className={`p-4 rounded-xl shadow-md cursor-pointer transition-all duration-300 transform ${item.color} ${item.hoverColor} flex items-center space-x-4 animate-scaleIn ${
              activeKey === item.key ? `ring-2 ring-offset-2 ${item.selectedClass} shadow-lg scale-105` : "hover:shadow-lg hover:scale-102"
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => handleTabChange(item.key)}
          >
            <div className="p-3 rounded-full bg-white bg-opacity-50">
              <FontAwesomeIcon icon={item.icon} className="text-2xl" />
            </div>
            <div>
              <p className="text-2xl font-bold">{counts[item.key]}</p>
              <p className="text-sm font-medium">{item.title}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
          {stats.find(item => item.key === activeKey)?.title} Management
        </h2>
        
        <div className={`mt-4 transition-all duration-300 ${contentVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default OverViewContent;