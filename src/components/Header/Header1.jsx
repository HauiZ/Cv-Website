// src/components/Header.jsx
import React from "react";
import "./Header.css";
import App from "./Notification";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space, Dropdown } from "antd";
import { DownOutlined, SettingOutlined } from "@ant-design/icons";
import { CiLogout } from "react-icons/ci";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
const Header1 = () => {
  const { user } = useAuthContext();
  const { logOut } = useAuth((path) => navigate(path));
  const navigate = useNavigate();

  const avatar = user?.LinkAvatar || user?.linkLogo;
  const displayName = user?.userName || user?.businessName || "User";
  const email = user?.email || "";

  const items = [
    {
      key: "1",
      label: <span>{email}</span>,
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: <a href="#">Profile</a>,
      extra: "⌘P",
    },
    {
      key: "3",
      label: "My CV",
      extra: "⌘M",
    },
    {
      key: "4",
      label: "Settings",
      icon: <SettingOutlined />,
      extra: "⌘S",
    },
    {
      key: "5",
      label: (
        <button
          onClick={() => {
            logOut();
            navigate("/");
          }}
        >
          logout
        </button>
      ),
      icon: <CiLogout />,
      extra: "⌘L",
    },
  ];

  const UserDropdown = () => (
    <Dropdown menu={{ items }}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <Avatar size={40} src={avatar} icon={!avatar && <UserOutlined />} />
          <span className="font-medium">{displayName}</span>
          <DownOutlined className="size-3" />
        </Space>
      </a>
    </Dropdown>
  );

  return (
    <div className="w-full h-[75px] bg-white fixed top-0 left-0 z-50 object-contain">
      <div className="flex justify-between items-center max-h-[75px]">
        <div className="flex w-[8vw] h-[75px] justify-between items-center ml-5 ">
          <img
            src="/src/image/logo.png"
            className="object-contain hover:cursor-pointer"
            alt="Logo"
            onClick={() => navigate("/")}

          />
        </div>
        <div className="flex gap-x-20 px-6 py-2 mt-4 mb-4">
          <a href="/" className="menu">
            Việc làm
          </a>
          <a href="/" className="menu">
            Hồ sơ & CV
          </a>
          <a href="/" className="menu">
            Công cụ
          </a>
        </div>
        <div className="flex gap-x-10 justify-end max-h-[50] mr-5">
          <div className="flex flex-col ">
            <span className="text-[13px] text-[#A9A9A9]">
              Bạn là nhà tuyển dụng?
            </span>
            <a href="/loginBusiness" className="hover:text-[#0C8E5E]">
              Đăng tuyển ngay {">>"}
            </a>
          </div>
          <span className="text-2xl text-[#A9A9A9]">{"|"}</span>
          <App />
          <UserDropdown />
        </div>
      </div>
    </div>
  );
};

export default Header1;
