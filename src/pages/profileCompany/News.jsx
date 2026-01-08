import React from "react";
import formatSalaryRangeToVND from "../../utils/formatSalaryRangeToVND";
import { useNavigate } from "react-router-dom";
import useCustomMutation from "../../hooks/useCustomMutation.js"
import { emitEvent } from "../../services/emitEvent.js";
import { FaCrown } from "react-icons/fa";

export default function News({ job, companyName, logo }) {
  const salaryRange = formatSalaryRangeToVND(
    `${job.salaryMin} - ${job.salaryMax}`
  );
  const navigate = useNavigate();
  const { mutate: mutateViewCount } = useCustomMutation(emitEvent);

  return (
    <div>
      
      <div
        className="flex gap-4 border p-3 rounded-lg shadow-sm hover:shadow-[0_0_10px_rgba(12,142,94,0.5)] group-hover:border-[#0C8E5E] hover:border-1 transition-all duration-300 cursor-pointer group relative"
        onClick={() => {
          window.open(`/job/${job.id}`, '_blank');
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
        <img
          src={logo || "/src/assets/image/logoNoBg.png"}
          alt="logo"
          className="w-[5rem] h-[5rem] object-contain"
        />
        <div className="flex flex-col flex-grow gap-y-6">
          <div className="flex justify-between font-bold text-sm group-hover:text-[#1b8e0c] transition-colors duration-300">
            <div>{job.jobTitle}</div>
            <div className="text-green-600">{salaryRange || "Thương lượng"}</div>
          </div>
          {companyName && <div className="absolute top-[2rem] text-gray-400">{companyName}</div>}
          <div className="flex justify-between  xl:gap-x-5 text-sm text-black mt-1">
            <div className="flex gap-4">
              <div className="bg-gray-300 h-fit w-fit text-center p-1.5 rounded-[.5em] hover:bg-gray-200 transition-colors duration-200">
                {job?.Area?.province || "ha noi"}
              </div>
              <div className="bg-gray-300 h-fit w-fit text-center p-1.5 rounded-[.5em] hover:bg-gray-200 transition-colors duration-200 ">
                Hạn: {job?.applicationDeadline || "0"}
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
    </div>
  );
}
