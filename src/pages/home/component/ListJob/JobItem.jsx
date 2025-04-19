import React from "react";
import LikeButton from "./LikeButton";

const JobItem = ({ job }) => {
  return (
    <div className="relative border border-gray-300 rounded-xl w-[300px] h-[130px] bg-white p-3 shadow-sm hover:shadow-[0_0_10px_rgba(12,142,94,0.5)] hover:border-[#0C8E5E] hover:border-2 transition-all duration-300 cursor-pointer group">
      <div className="flex">
        <img
          src={job?.logoUrl || "/src/assets/image/logoNoBg.png"}
          alt="logo"
          className="w-[60px] h-[60px] rounded-md object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="ml-4 flex flex-col justify-center">
          <p className="font-bold text-sm group-hover:text-[#0C8E5E] transition-colors duration-300">{job.jobTitle}</p>
          <p className="text-gray-400 text-sm">{job.companyName}</p>
        </div>
      </div>

      <div className="flex mt-3 gap-3 text-[13px]">
        <span className="bg-[#EDEFF0] rounded-full px-3 py-1 hover:bg-gray-200 transition-colors duration-200">
          {job.salaryMin} - {job.salaryMax}
        </span>
        <span className="bg-[#EDEFF0] rounded-full px-3 py-1 hover:bg-gray-200 transition-colors duration-200">
          {job?.location || "Hà Nội"}
        </span>
      </div>

      <LikeButton />
    </div>
  );
};

export default JobItem;