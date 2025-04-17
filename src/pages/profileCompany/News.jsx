import React from "react";

export default function News({ job, logo }) {
  return (
    <div className="flex gap-4 border p-3 rounded-lg shadow-sm hover:shadow-[0_0_10px_rgba(12,142,94,0.5)] hover:border-[#0C8E5E] hover:border-1 transition-all duration-300 cursor-pointer group">
      <img
        src={logo}
        alt="logo"
        className="w-[5rem] h-[5rem] object-contain"
      />
      <div className="flex flex-col flex-grow gap-y-6">
        <div className="flex justify-between font-bold text-sm group-hover:text-[#1b8e0c] transition-colors duration-300">
          <div>{job.jobTitle}</div>
          <div className="text-green-600">
            {job.salaryMin} - {job.salaryMax}
          </div>
        </div>
        <div className="flex justify-between text-sm text-black mt-1">
          <div className="bg-gray-300 h-fit w-fit text-center p-1.5 rounded-[.5em] hover:bg-gray-200 transition-colors duration-200">{job?.location || "ha noi"}</div>
          <div className="bg-gray-300 h-fit w-fit text-center p-1.5 rounded-[.5em] hover:bg-gray-200 transition-colors duration-200 ">{job.datePosted}</div>
          <div>
            <button className=" px-3 py-1 bg-[#5DDA33] text-white rounded-full text-sm hover:opacity-90 hover:cursor-pointer">
              Ứng tuyển
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
