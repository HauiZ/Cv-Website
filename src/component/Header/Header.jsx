import React from "react";
import './Header.css';
import { Navigate, useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/login");
    };

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
        <div className="flex gap-x-10 justify-end max-h-[50]">
            <button className="button border-[#5DDA33] text-[#5DDA33] hover:bg-[#5DDA33] hover:text-white " onClick={handleLoginClick}>
                Đăng nhập
            </button>
            <button className="button text-[white] bg-[#5DDA33] hover:bg-[white] hover:text-[#5DDA33] ">
                Đăng ký
            </button>
            <button className="button bg-[black] text-[white] hover:text-[#5DDA33] ">
                Đăng tuyển & Tìm hồ sơ
            </button>
        </div>
    </div>
};

export default Header;