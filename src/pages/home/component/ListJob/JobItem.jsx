import React from "react";
import LikeButton from "./LikeButton";

import formatSalaryRangeToVND from "../../../../utils/formatSalaryRangeToVND.js";
import { useNavigate } from "react-router-dom";
import useCustomMutation from "../../../../hooks/useCustomMutation.js"
import { emitEvent } from "../../../../services/emitEvent.js";
import { FaCrown } from "react-icons/fa";
const JobItem = ({ job }) => {
  const salaryRange = formatSalaryRangeToVND(
    `${job.salaryMin} - ${job.salaryMax}`
  );
  const navigate = useNavigate();
  const { mutate: mutateViewCount } = useCustomMutation(emitEvent);
  return (
    <div
      className="relative border border-gray-300 rounded-xl w-[300px] h-[130px] bg-white p-3 shadow-sm hover:shadow-[0_0_10px_rgba(12,142,94,0.5)] hover:border-[#0C8E5E] hover:border-2 transition-all duration-300 cursor-pointer group "
      onClick={() => {
        navigate(`/job/${job.id}`);
        mutateViewCount({ event_name: 'job_view', job_id: job.id });
      }}
    >
      {job.isRecommend && (
        <div className="absolute top-[-0.75rem] right-0 z-100">
          <style>{`
                  @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-5px); }
                  }
                  @keyframes shine {
                    0%, 100% { filter: drop-shadow(0 0 3px rgba(255, 215, 0, 0.8)); }
                    50% { filter: drop-shadow(0 0 8px rgba(255, 215, 0, 1)); }
                  }
                  @keyframes pulse-glow {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 0.6; transform: scale(1.4); }
                  }
                  .crown-icon {
                    animation: float 2s ease-in-out infinite, shine 1.5s ease-in-out infinite;
                  }
                  .crown-glow {
                    animation: pulse-glow 2s ease-in-out infinite;
                  }
                  .group:hover .crown-icon {
                    animation: float 1.5s ease-in-out infinite, shine 1s ease-in-out infinite;
                    transform: rotate(-10deg);
                    transition: transform 0.3s ease;
                  }
                `}</style>

          {/* Glow effect background */}
          <div className="absolute inset-0 crown-glow">
            <FaCrown className="text-yellow-300 text-xl blur-sm" />
          </div>

          {/* Main crown icon */}
          <FaCrown className="crown-icon relative text-yellow-400 text-xl" />
        </div>
      )}
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
          {job?.Area?.province || "Hà Nội"}
        </span>
      </div>

    </div>
  );
};

export default JobItem;
