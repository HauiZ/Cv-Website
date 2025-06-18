// src/components/Header.jsx
import React from "react";
import "./Header.css";
import Notification from "./NotificationRecruiter";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space, Dropdown } from "antd";
import { DownOutlined, SettingOutlined } from "@ant-design/icons";
import { CiLogout } from "react-icons/ci";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { ImProfile } from "react-icons/im";
import { TbLockPassword } from "react-icons/tb";

const BusinessHeader = () => {
  const { user } = useAuthContext();
  const { logOut } = useAuth((path) => navigate(path));
  const navigate = useNavigate();

  const avatar = user?.logoUrl;
  const displayName = user?.businessName || "User";
  const email = user?.email || "";

  const handleLogOut = () => {
    logOut((path) => navigate(path));
  };

  const items = [
    {
      key: "1",
      label: <span>{email}</span>,
      disabled: true,
    },
    {
      type: "divider",
    },
    // {
    //   key: "2",
    //   label: <a href="/profile">Thông tin cá nhân</a>,
    //   icon: <ImProfile />,
    //   extra: "⌘",
    // },
    // {
    //   key: "3",
    //   label: <a href="/change-Password">Đổi mật khẩu</a>,
    //   icon: <TbLockPassword />,
    //   extra: "⌘",
    // },
    // {
    //   key: "4",
    //   label: <a href="/candidate-application">Quản lý đơn ứng tuyển</a>,
    //   icon: <SettingOutlined />,
    //   extra: "⌘",
    // },
    {
      key: "5",
      label: <button onClick={handleLogOut}>Đăng xuất</button>,
      icon: <CiLogout />,
      extra: "⌘",
    },
  ];

  const UserDropdown = () => (
    <Dropdown menu={{ items }}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <Avatar size={40} src={avatar} icon={!avatar && <UserOutlined />} />
          <p className="text-white ">{displayName}</p>
        </Space>
      </a>
    </Dropdown>
  );

  return (
    <div className="w-full h-[75px] bg-[#212F3F] shadow-md">
      <div className="flex justify-between items-center h-full max-w-[1400px] mx-auto px-4">
        <div className="flex items-center">
          <img
            src="/src/assets/image/logoNoBg.png"
            className="h-20 w-auto object-contain hover:cursor-pointer mr-8"
            alt="Logo"
            onClick={() => navigate("/recruiter")}
          />
          <div className="flex items-center space-x-4">
            <a
              href="/recruiter/tin-tuyen-dung"
              className="menu bg-[#3B546F] text-white px-4 py-2 rounded-lg hover:bg-[#4B647F] transition-colors"
            >
              Tin đã đăng tuyển
            </a>
            <a
              href="/recruiter/quan-ly-cv/%20"
              className="menu bg-[#3B546F] text-white px-4 py-2 rounded-lg hover:bg-[#4B647F] transition-colors"
            >
              Quản lý CV
            </a>
            <a
              href="/recruiter/profile"
              className="menu bg-[#3B546F] text-white px-4 py-2 rounded-lg hover:bg-[#4B647F] transition-colors"
            >
              Hồ sơ cá nhân
            </a>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <Notification />
          <div className="h-6 w-px bg-gray-400/50" />
          <UserDropdown />
        </div>
      </div>
    </div>
  );
};

export default BusinessHeader;
