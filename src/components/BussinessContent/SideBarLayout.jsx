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

const Sidebar = ({ activeTab, setActiveTab }) => {
  const {user} = useAuthContext()
  const mainNavItems = [
    { id: "bang-tin", icon: <FaList size={18} />, label: "Bảng tin" },
    { id: "insights", icon: <FaLightbulb size={18} />, label: "Insights" },
    {
      id: "tin-tuyen-dung",
      icon: <FaFileAlt size={18} />,
      label: "Tin tuyển dụng",
    },
    { id: "dang-tin", icon: <FaPlus size={18} />, label: "Đăng tin" },
    { id: "cv-de-xuat", icon: <FaThumbsUp size={18} />, label: "CV đề xuất" },
    { id: "quan-ly-cv", icon: <FaFileAlt size={18} />, label: "Quản lý CV" },
    { id: "mail", icon: <FaEnvelope size={18} />, label: "Quản lý Email" },
    {
      id: "bao-cao",
      icon: <FaFileAlt size={18} />,
      label: "Báo cáo tuyển dụng",
    },
    { id: "profile", icon: <FaUser size={16} />, label: "Hồ sơ cá nhân" },
    { id: "security", icon: <FaShieldAlt size={16} />, label: "Bảo mật" },
  ];

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
            className={`flex items-center p-3 cursor-pointer hover:bg-gray-100 ${
              activeTab === item.id ? "active-nav-item" : ""
            }`}
            onClick={() => setActiveTab(item.id)}
          >
            <div className="mr-3 text-gray-500">{item.icon}</div>
            <div className="text-sm">{item.label}</div>
            {item.id === "mail" && (
              <div className="ml-auto bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
