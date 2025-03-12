import React from "react";
import { FiPhoneCall } from "react-icons/fi";
import { MdEmail } from "react-icons/md";


function Hotline() {
    return <div className="flex justify-center">
        <div className="w-[1400px] h-[300px] bg-[url('../../image/background_ColorGreen.png')] flex justify-between items-center relative">
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
    </div>
};

export default Hotline;