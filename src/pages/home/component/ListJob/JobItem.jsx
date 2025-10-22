import React from "react";
import LikeButton from "./LikeButton";

import formatSalaryRangeToVND from "../../../../utils/formatSalaryRangeToVND.js";
import { useNavigate } from "react-router-dom";
const JobItem = ({ job }) => {
  const salaryRange = formatSalaryRangeToVND(
    `${job.salaryMin} - ${job.salaryMax}`
  );
  const navigate = useNavigate();
  return (
    <div
      className="relative border border-gray-300 rounded-xl w-[300px] h-[130px] bg-white p-3 shadow-sm hover:shadow-[0_0_10px_rgba(12,142,94,0.5)] hover:border-[#0C8E5E] hover:border-2 transition-all duration-300 cursor-pointer group "
      onClick={() => {
        navigate(`/job/${job.id}`);
      }}
    >
      <div className="flex">
        <img
          src={job?.logoUrl || "/src/assets/image/logoNoBg.png"}
          alt="logo"
          className="w-[60px] h-[60px] rounded-md object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="ml-4 flex flex-col justify-center">
          <div className="max-w-[11rem] w-fit">
            <p className="font-bold text-sm group-hover:text-[#0C8E5E] transition-colors duration-300 ">
              {job.jobTitle}
            </p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">{job.companyName}</p>
          </div>
        </div>
      </div>

      <div className="flex mt-3 gap-3 text-[13px]">
        <span className="bg-[#EDEFF0] rounded-full px-3 py-1 hover:bg-gray-200 transition-colors duration-200">
          {salaryRange || "Thương lượng"}
        </span>
        <span className="bg-[#EDEFF0] rounded-full px-3 py-1 hover:bg-gray-200 transition-colors duration-200">
          {job?.companyAddress || "Hà Nội"}
        </span>
      </div>

    </div>
  );
};

export default JobItem;
