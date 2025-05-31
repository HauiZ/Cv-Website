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
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({ activeTab }) => {
  const { user } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();
  const mainNavItems = [
    { id: "bang-tin", icon: <FaList size={18} />, label: "Bảng tin", path: "/recruiter/bang-tin" },
    { id: "tin-tuyen-dung", icon: <FaFileAlt size={18} />, label: "Tin tuyển dụng", path: "/recruiter/tin-tuyen-dung" },
    { id: "dang-tin", icon: <FaPlus size={18} />, label: "Đăng tin", path: "/recruiter/dang-tin" },
    { id: "cv-de-xuat", icon: <FaThumbsUp size={18} />, label: "CV đề xuất", path: "/recruiter/cv-de-xuat" },
    { id: "quan-ly-cv", icon: <FaFileAlt size={18} />, label: "Quản lý CV", path: "/recruiter/quan-ly-cv" },
    { id: "profile", icon: <FaUser size={16} />, label: "Hồ sơ cá nhân", path: "/recruiter/profile" },
    { id: "security", icon: <FaShieldAlt size={16} />, label: "Bảo mật", path: "/recruiter/security" },
     ];

  return (
    <div className="sidebar">
      <div className="user-info p-4 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600">
            <Avatar
              size={40}
              src={user?.logoUrl}
              icon={!user?.logoUrl && <UserOutlined />}
            />
          </div>
          <div className="ml-3">
            <div className="font-medium">
              {user?.businessName || "Unknown"}
            </div>
            <div className="text-xs text-gray-500">{user?.email}</div>
          </div>
        </div>
      </div>      <nav className="mt-4">
        {mainNavItems.map((item) => (
          <div
            key={item.id}
            className={`flex items-center p-3 cursor-pointer hover:bg-gray-100 transition-all duration-200 ${
              activeTab === item.id ? "bg-green-50 text-green-600 font-medium" : "text-gray-700"
            }`}
            onClick={() => navigate(item.path)}
          >
            <div className={`mr-3 ${activeTab === item.id ? "text-green-600" : "text-gray-500"}`}>
              {item.icon}
            </div>
            <div className="text-sm">{item.label}</div>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
