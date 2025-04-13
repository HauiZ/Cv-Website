import React from "react";
import { FaTags } from "react-icons/fa6";
import { FaComputer } from "react-icons/fa6";
import { BsBank2 } from "react-icons/bs";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { icons } from "antd/es/image/PreviewGroup";

const JobItem = [
    {
        id: 1,
        title: "Kinh doanh - Bán hàng",
        icon: <FaTags className="size-10 text-[#00B14F] " />,
        job: "4560 việc làm",
    },
    {
        id: 2,
        title: "Công nghệ thông tin",
        icon: <FaComputer className="size-10 text-[#00B14F] "/>,
        job: "8999 việc làm",
    },
    {
        id: 3,
        title: "Tài chính - Ngân hàng",
        icon: <BsBank2 className="size-10 text-[#00B14F] "/>,
        job: "3560 việc làm",
    },
    {
        id: 4,
        title: "Bất động sản - Xây dựng",
        icon: <HiBuildingOffice2 className="size-10 text-[#00B14F] "/>,
        job: "1560 việc làm",
    },
];

const Topjobbox = () => {
    return <div className="flex justify-center">
        <a href="#" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-10">
            {JobItem.map((item) => (
                <div key={item.id} className="flex flex-col items-center justify-between gap-x-4 rounded-lg w-[200px] h-[120px]
                 bg-[#F5F5F5] hover:border-1 hover:border-[#00B14F] hover:bg-white hover:shadow-2xl hover:shadow-[#00B14F]">
                    <div className="flex items-center mt-2">
                        {item.icon}
                    </div>
                    <a href="#" className="text-1xl font-semibold ">{item.title}</a>
                    <a href="#" className="text-[#0C8E5E] mb-2">{item.job}</a>
                </div>
            ))}
        </a>
    </div>
};
export default Topjobbox;