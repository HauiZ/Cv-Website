import React from "react";
import {
  FaUser,
  FaList,
  FaLightbulb,
  FaFileAlt,
  FaPlus,
  FaThumbsUp,
  FaEnvelope,
  FaShieldAlt,
} from "react-icons/fa";
import { useAuthContext } from "../../contexts/AuthContext";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const mainNavItems = [
    { id: "", icon: <FaList size={18} />, label: "Bảng tin" },
    {
      id: "tin-tuyen-dung",
      icon: <FaFileAlt size={18} />,
      label: "Tin tuyển dụng",
    },
    { id: "quan-ly-cv", icon: <FaFileAlt size={18} />, label: "Quản lý CV" },
    { id: "thong-bao", icon: <FaEnvelope size={18} />, label: "Thông báo" },
    { id: "trang-ca-nhan", icon: <FaUser size={16} />, label: "Trang cá nhân" },
  ];

  const handleNavClick = (itemId) => {
    navigate(`/recruiter/${itemId}`);
  };

  return (
    <div className="sidebar">
      <div className="user-info p-4 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600">
            <Avatar size={40} src={user?.logoUrl} icon={!user?.logoUrl && <UserOutlined />} />
          </div>
          <div className="ml-3">
            <div className="font-medium">{user?.businessName || "Unknown"}</div>
            <div className="text-xs text-gray-500">{user?.email}</div>
          </div>
        </div>
      </div>
      <nav className="mt-4">
        {mainNavItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={`flex items-center p-3 cursor-pointer hover:bg-gray-100 ${
              activeTab === item.id ? "active-nav-item" : ""
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
