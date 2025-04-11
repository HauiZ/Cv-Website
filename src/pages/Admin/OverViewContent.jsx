import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faTasks,
  faCheckCircle,
  faSpinner
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import CvCard from "./CvCard";
import CreateCvFrame from "./CreateCvFrame";

const stats = [
  {
    title: "Người dùng",
    count: 120,
    icon: faUsers,
    color: "bg-blue-100 text-blue-600"
  },
  {
    title: "Tổng công việc",
    count: 75,
    icon: faTasks,
    color: "bg-yellow-100 text-yellow-600"
  },
  {
    title: "Đã hoàn thành",
    count: 50,
    icon: faCheckCircle,
    color: "bg-green-100 text-green-600"
  },
  {
    title: "Đang xử lý",
    count: 25,
    icon: faSpinner,
    color: "bg-purple-100 text-purple-600"
  }
];

const OverViewContent = () => {
  return (
    <>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((item, index) => (
        <div
          key={index}
          className={`p-4 rounded-xl shadow ${item.color} flex items-center space-x-4`}
        >
          <FontAwesomeIcon icon={item.icon} className="text-3xl" />
          <div>
            <p className="text-xl font-bold">{item.count}</p>
            <p className="text-sm font-medium">{item.title}</p>
          </div>
        </div>
      ))}


    </div>
      <div>
        <CvCard></CvCard>
        <CreateCvFrame></CreateCvFrame>
      </div>
    
    </>
  );
};

export default OverViewContent;
