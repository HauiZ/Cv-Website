import React from "react";
import { FaListUl } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import './Home.css'
import Header from '../../component/Header/Header'
import Footer from "../../component/Footer/Footer";
import { FiPhoneCall } from "react-icons/fi";
import { MdEmail } from "react-icons/md";
import Listjob from "../../component/ListJob/Listjob";
import BrandList from "../../component/BrandList/BrandList";

const Notification = () => (
    <div className="flex flex-col justify-center items-center gap-y-1">
        <h1 className="text-2xl text-white font-semibold mt-2 mb-2">Tìm việc làm nhanh, việc làm mới nhất trên toàn quốc</h1>
        <div className="w-[1100px] h-[60px] bg-white rounded-[100px] flex flex-row justify-center items-center gap-x-10">
            <button className="noti w-[200px] bg-white flex gap-x-1"> <FaListUl size="1.5rem" /> Danh mục nghề</button>
            <input type="text" placeholder="| Vị trí tuyển dụng & tên công ty" className="w-[330px] h-[50px]" />
            <button className="noti w-[250px] bg-white flex gap-x-1"> <IoLocationSharp size="1.5rem" />Địa điểm <IoIosArrowDown size="1.1rem" /></button>
            <button className="noti w-[150px] text-[white] bg-[#5DDA33] hover:bg-[white] hover:text-[#5DDA33]">Tìm kiếm</button>
        </div>
        <div className="w-[800px] h-[240px] bg-white mt-2 flex items-center relative">
            <button className="w-[30px] border-[#5DDA33] border-2">a</button>
            <button className="w-[30px] border-[#5DDA33] border-2 right-0 absolute">b</button>
        </div>
    </div>

);

const Hotline = () => (
    <div className="w-[full] h-[300px] bg-[url('../../image/background_ColorGreen.png')] flex justify-between items-center relative">
        <div className="w-[450px] h-[180px] bg-white border-2 rounded-lg ml-20 flex flex-col items-center justify-center space-y-1">
            <h1 className="font-bold text-3xl text-[#0C8E5E] ">Hot Line</h1>
            <div className="flex">
                <h2 className="font-semibold">Tìm việc khó có</h2>
                <img src="/src/image/logo.png" alt="" className="w-[50px]" />
                <h2 className="font-semibold">lo</h2>
            </div>
            <div className="w-[350px] h-[40px] bg-gradient-to-r from-[#0C8E5E] to-[#5DDA33] rounded-md flex items-center justify-between">
                <h2 className="font-semibold text-2xl text-white ml-3">0935714169</h2>
                <button className="w-[150px] h-[30px] bg-gradient-to-r from-[#D9D9D9] to-[#FFFFFF] mr-5 rounded-md flex items-center justify-center gap-x-4">
                    <FiPhoneCall className="size-5" />
                    Phone now
                </button>
            </div>
            <h2 className="font-semibold"><MdEmail className="inline border-1 rounded-full p-[3px] m-1 text-2xl" />email: abc@gmail.com</h2>
        </div>
        <div className="w-[700px] h-[300px] mt-5  mr-30">
            <img src="/src/image/image_GreenMan.png" alt="" className="object-contain" />
        </div>
    </div>
);
function Home() {
    return <>
        <div className="header">
            <Header />
        </div>
        <div className="w-full h-[450px] bg-[url('../../image/background_ColorGreen.png')] bg-cover pt-[75px]">
            <Notification />
        </div>
        <div className="w-full h-[560px] bg-[#F5F5F5]">
            <Listjob />
        </div>
        <div className="w-full h-[900px]">
            <BrandList />
        </div>
        <Hotline />
        <div className="w-full h-[300px]"></div>
        <Footer className="" />

    </>
};

export default Home;