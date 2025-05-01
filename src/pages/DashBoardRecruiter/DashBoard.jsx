import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import "./animation.css";
import useCustomFetch from "../../hooks/useCustomFetch";
import { getDashBoardApi } from "../../services/recruiterApi";
import OverViewChart from "./DashBoardChart";

const stats = [
  {
    title: "Tổng tin tuyển dụng",
    color: "bg-blue-100 text-blue-600",
    selectedClass: "ring-blue-400",
    key: "recruitmentNews",
  },
  {
    title: "Đã đăng tuyển",
    color: "bg-green-100 text-green-600",
    selectedClass: "ring-green-400",
    key: "recruitmentNewsPosted",
  },
  {
    title: "Ứng viên ứng tuyển",
    color: "bg-red-100 text-red-600",
    selectedClass: "ring-red-400",
    key: "numberApplicant",
  },
];

const OverViewContent = () => {
  const { data } = useCustomFetch(getDashBoardApi);
  const [chartKey, setChartKey] = useState(Date.now());

  const [counts, setCounts] = useState({
    recruitmentNews: 0,
    recruitmentNewsPosted: 0,
    numberApplicant: 0,
  });

  useEffect(() => {
    setCounts({
      recruitmentNews: data?.recruitmentNews || 0,
      recruitmentNewsPosted: data?.recruitmentNewsPosted || 0,
      numberApplicant: data?.numberApplicant || 0,
    });
  }, [data]);

  const renderContent = () => {
    return <OverViewChart key={chartKey} counts={counts} />;
  };

  return (
    <div className="p-6 min-h-screen">
      {/* Info Boxes */}
      <div className="flex justify-center gap-x-10">
        {stats.map((item, index) => (
          <div
            key={index}
            className={`p-4 w-[20rem] rounded-xl shadow-md transition-all duration-300 transform ${item.color} flex items-center space-x-4 animate-scaleIn`}
            style={{ animationDelay: `${index * 1000}ms` }}
          >
            <div className="p-3 rounded-full bg-white bg-opacity-50">
              <FontAwesomeIcon icon={faChartBar} className="text-2xl" />
            </div>
            <div>
              <p className="text-2xl font-bold">{counts[item.key]}</p>
              <p className="text-sm font-medium">{item.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="mt-8 p-6 bg-white rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
          Tổng quan tin tuyển dụng
        </h2>

        <div className="mt-4 animate-fadeIn">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default OverViewContent;
