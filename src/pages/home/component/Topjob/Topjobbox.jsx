import React from "react";
import { FaTags, FaComputer } from "react-icons/fa6";
import { BsBank2 } from "react-icons/bs";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const JobItem = [
  {
    id: 1,
    title: "Kinh doanh - Bán hàng",
    icon: <FaTags className="size-10 text-[#00B14F]" />,
    keyword: 'Thương mại',
    job: "4560 việc làm",
  },
  {
    id: 2,
    title: "Công nghệ thông tin",
    icon: <FaComputer className="size-10 text-[#00B14F]" />,
    keyword: 'Công nghệ',
    job: "8999 việc làm",
  },
  {
    id: 3,
    title: "Tài chính - Ngân hàng",
    icon: <BsBank2 className="size-10 text-[#00B14F]" />,
    keyword: 'Ngân hàng',
    job: "3560 việc làm",
  },
  {
    id: 4,
    title: "Bất động sản - Xây dựng",
    icon: <HiBuildingOffice2 className="size-10 text-[#00B14F]" />,
    keyword: 'Viễn thông',
    job: "1560 việc làm",
  },
];

const Topjobbox = () => {
  const navigate = useNavigate();

  const handleProfessionClick = (keyword) => {
    navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
  };
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-10">
        {JobItem.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center justify-between gap-y-2 rounded-lg w-[13rem] h-[9rem] p-2
                       bg-[#F5F5F5] hover:border hover:border-[#00B14F] hover:bg-white hover:shadow-2xl hover:shadow-[#00B14F]"
          >
            <div className="flex flex-col justify-center items-center text-center gap-y-3"
              onClick={() => { handleProfessionClick(item.keyword) }}>
              <div className="mt-2">{item.icon}</div>
              <div className="text-base font-semibold text-center">{item.title}</div>
              <div className="text-[#0C8E5E] text-sm">{item.job}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Topjobbox;
