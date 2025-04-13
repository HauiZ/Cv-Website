import React from "react";
import './Header.css';
import App from "./Notification";
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';
import { DownOutlined, SettingOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { CiLogout } from "react-icons/ci";
import { useAuth } from "../../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Header1 = ({ onLogout }) => {
    const { user, logout, candidateInfo, recruiterInfo } = useAuth();
    const navigate = useNavigate();

    const items = [
        {
            key: '1',
            label: <span>
                {candidateInfo ? candidateInfo.email : "Loading..."} {/* Conditional check */}
            </span>,
            disabled: true,
        },
        {
            type: 'divider',
        },
        {
            key: '2',
            label: <a href="#" target="_blank" rel="noopener noreferrer">
                Profile
            </a>,
            extra: '⌘P',
        },
        {
            key: '3',
            label: 'My CV',
            extra: '⌘M',
        },
        {
            key: '4',
            label: 'Settings',
            icon: <SettingOutlined />,
            extra: '⌘S',
        },
        {
            key: '5',
            label: <button onClick={() => {
                onLogout();
                navigate("/");
            }}>
                Logout
            </button >,
            icon: <CiLogout />,
            extra: '⌘L',
        },
    ];

    const User = () => (
        <Dropdown
            menu={{
                items,
            }}
        >
            <a onClick={(e) => e.preventDefault()}>
                <Space>
                    <Space direction="vertical" size={16}>
                        <Space wrap size={16}>
                            <Avatar size={40} icon={<UserOutlined />} />
                        </Space>
                    </Space>
                    <DownOutlined className="size-3" />
                </Space>
            </a>
        </Dropdown>
    );
    return <div className="flex justify-between items-center max-h-[75px]">
        {/* 133px */}
        <div className="flex w-[8vw] h-[75px] justify-between items-center ml-5 ">
            <img src="/src/image/logo.png" className=" object-contain" alt="Logo" />
        </div>
        <div className="flex gap-x-20 px-6 py-2 mt-4 mb-4">
            <a href="#" className="menu">Việc làm</a>
            <a href="#" className="menu">Hồ sơ & CV</a>
            <a href="#" className="menu">Công cụ</a>
        </div>
        <div className="flex gap-x-10 justify-end max-h-[50] mr-5">
            <div className="flex flex-col ">
                <span className="text-[13px] text-[#A9A9A9]">Bạn là nhà tuyển dụng?</span>
                <a href="#" className="hover:text-[#0C8E5E]">Đăng tuyển ngay {'>>'}</a>
            </div>
            <span className="text-2xl text-[#A9A9A9]">{'|'}</span>
            <App />
            <User />
        </div>
    </div>
};

export default Header1;