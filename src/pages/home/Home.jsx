// src/pages/home/Home.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";  // Make sure to import from react-router-dom
import ListJobBox from "./component/ListJob/Listjob";
import BrandList from "./component/BrandList/BrandList";
import Topjob from "./component/Topjob/Topjob";
import Topbrand from "./component/Topjob/Topbrand";
import Slider from "./component/Slider/Slider";
import { FaAngleRight } from "react-icons/fa6";
import Hotline from "./component/HotLine/HotLine";
import Search from "./component/Search/Search";
import { useAuthContext } from "../../contexts/AuthContext";
import useAuth from "../../hooks/useAuth";
import background_ColorGreen from "../../image/background_ColorGreen.png";

const Mix = () => (
  <div className="flex flex-col justify-center items-center gap-y-1">
    <h1 className="text-2xl text-white font-semibold mt-2 mb-2">
      Tìm việc làm nhanh, việc làm mới nhất trên toàn quốc
    </h1>
    <Search />
    <div className="flex justify-center mt-2 gap-x-10">
      <div className="w-[300px] h-[240px] bg-white rounded-2xl">
        <ul className="space-y-3 ml-3 pr-3 py-4">
          {["Công nghệ thông tin", "Kinh doanh - Bán hàng", "Bất động sản - Xây dựng", "Tài chính - Ngân hàng", "Marketing - Quảng cáo", "Nhân sự - Hành chính"].map((title, index) => (
            <li key={index}>
              <div className="hover:text-[#5DDA33] flex justify-between">
                <a href="#" className="font-semibold">
                  {title}
                </a>
                <FaAngleRight className="text-[#D9D9D9]" />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-[600px] h-[240px] relative rounded-2xl">
        <Slider />
      </div>
    </div>
  </div>
);

function Home() {

  return (
    <>
      <div
        className="w-full h-[450px] bg-cover pt-[75px]"
        style={{ backgroundImage: `url(${background_ColorGreen})` }}
      >
        <Mix />
      </div>
      <div className="w-full h-[630px] bg-[#F5F5F5]">
        <ListJobBox />
      </div>
      <div className="w-full h-[1010px]">
        <BrandList />
        <Topjob />
        <Topbrand />
      </div>
      <Hotline />
      <div className="w-full h-[50px]" />
    </>
  );
}

export default Home;