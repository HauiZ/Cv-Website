import React from "react";
import formatSalaryRangeToVND from "../../utils/formatSalaryRangeToVND";
import { useNavigate } from "react-router-dom";



export default function News({ job }) {
  const salaryRange = formatSalaryRangeToVND(
    `${job.salaryMin} - ${job.salaryMax}`
  );
  const navigate = useNavigate();

  return (
    <div
      className="flex gap-4 border p-3 rounded-lg shadow-sm hover:shadow-[0_0_10px_rgba(12,142,94,0.5)] hover:border-[#0C8E5E] hover:border-1 transition-all duration-300 cursor-pointer group relative"
      onClick={() => {
        navigate(`/job/${job.id}`);
        // window.location.reload();
        window.scrollTo(0, 0);
      }}
    >
      <img
        src={job?.logoUrl || "/src/assets/image/logoNoBg.png"}
        alt="logo"
        className="w-[5rem] h-[5rem] object-contain"
      />
      <div className="flex flex-col flex-grow gap-y-6">
        <div className="flex justify-between font-bold text-sm group-hover:text-[#1b8e0c] transition-colors duration-300">
          <div>{job.jobTitle}</div>
          <div className="text-green-600">{salaryRange || "Thương lượng"}</div>
        </div>
        <div className="flex justify-between  xl:gap-x-5 text-sm text-black mt-1">
          <div className="flex gap-4">
            <div className="bg-gray-300 h-fit w-fit text-center p-1.5 rounded-[.5em] hover:bg-gray-200 transition-colors duration-200">
              {job?.companyAddress || "ha noi"}
            </div>
            <div className="bg-gray-300 h-fit w-fit text-center p-1.5 rounded-[.5em] hover:bg-gray-200 transition-colors duration-200 ">
              {job?.applicationDeadline || "0"}
            </div>
          </div>
          <div className="xl:absolute xl:right-5">
            <button className=" px-3 py-1 bg-[#5DDA33] text-white rounded-full text-sm hover:opacity-90 hover:cursor-pointer">
              Ứng tuyển
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
