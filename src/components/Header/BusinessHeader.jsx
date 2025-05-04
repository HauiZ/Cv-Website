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

  const avatar =  user?.logoUrl;
  const displayName =  user?.businessName || "User";
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
      label: (
        <button
          onClick={() => {
            logOut();
          }}
        >
          Đăng xuất
        </button>
      ),
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
    <div className="w-full h-[75px] bg-[#212F3F] fixed top-0 left-0 z-50 object-contain">
      <div className="flex justify-between items-center max-h-[75px]">
        <div className="flex w-[8vw] h-[75px] justify-between items-center ml-5 ">
          <img
            src="/src/assets/image/logoNoBg.png"
            className="object-contain hover:cursor-pointer"
            alt="Logo"
            onClick={() => navigate("/recruiter")}

          />
        </div>
        <div className="flex gap-x-20 px-6 py-2 mt-4 mb-4">
          <a href="/recruiter?tab=tin-tuyen-dung" className="menu bg-[#3B546F] text-white px-4 py-2 rounded-full hover:text-[#5DDA33]" >
            Tin đã đăng tuyển
          </a>
          <a href="/recruiter?tab=quan-ly-cv" className="menu bg-[#3B546F] text-white px-4 py-2 rounded-full hover:text-[#5DDA33]">
            Quản lý CV
          </a>
          <a href="/recruiter?tab=profile" className="menu bg-[#3B546F] text-white px-4 py-2 rounded-full hover:text-[#5DDA33]">
            Hồ sơ cá nhân
          </a>
        </div>
        <div className="flex gap-x-10 justify-end max-h-[50] mr-5">
          <span className="text-2xl text-white">{"|"}</span>
          <Notification></Notification>
          <UserDropdown />
        </div>
      </div>
    </div>
  );
};

export default BusinessHeader;
