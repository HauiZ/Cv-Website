import React from "react";
import { FaTags, FaComputer } from "react-icons/fa6";
import { BsBank2 } from "react-icons/bs";
import { HiBuildingOffice2 } from "react-icons/hi2";

const JobItem = [
  {
    id: 1,
    title: "Kinh doanh - Bán hàng",
    icon: <FaTags className="size-10 text-[#00B14F]" />,
    job: "4560 việc làm",
  },
  {
    id: 2,
    title: "Công nghệ thông tin",
    icon: <FaComputer className="size-10 text-[#00B14F]" />,
    job: "8999 việc làm",
  },
  {
    id: 3,
    title: "Tài chính - Ngân hàng",
    icon: <BsBank2 className="size-10 text-[#00B14F]" />,
    job: "3560 việc làm",
  },
  {
    id: 4,
    title: "Bất động sản - Xây dựng",
    icon: <HiBuildingOffice2 className="size-10 text-[#00B14F]" />,
    job: "1560 việc làm",
  },
];

const Topjobbox = () => {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-10">
        {JobItem.map((item) => (
          <a
            key={item.id}
            href="#"
            className="flex flex-col items-center justify-between gap-y-2 rounded-lg w-[13rem] h-[9rem] p-2
                       bg-[#F5F5F5] hover:border hover:border-[#00B14F] hover:bg-white hover:shadow-2xl hover:shadow-[#00B14F]"
          >
            <div className="mt-2">{item.icon}</div>
            <div className="text-base font-semibold text-center">{item.title}</div>
            <div className="text-[#0C8E5E] text-sm">{item.job}</div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Topjobbox;
