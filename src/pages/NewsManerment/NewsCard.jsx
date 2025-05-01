import React from "react";
import formatSalaryRangeToVND from "../../utils/formatSalaryRangeToVND";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import relativeTime from "dayjs/plugin/relativeTime";
import { getApplicantForNewsApi } from "../../services/recruiterApi";

dayjs.extend(relativeTime);
dayjs.locale("vi");

export default function NewsCard({ job, setFilterWithNews, setNewsId }) {
  const salaryRange = formatSalaryRangeToVND(
    `${job.salaryMin} - ${job.salaryMax}`
  );
  const navigate = useNavigate();
  const path = `/recruiter?tab=quan-ly-cv`;

  // Hàm xác định màu sắc cho status
  const statusMap = {
    "PENDING": {
      icon: <FaClock className="text-black" />,
      class: "bg-yellow-300 text-black",
    },
    "APPROVED": {
      icon: <FaCheckCircle className="text-white" />,
      class: "bg-green-500 text-white ",
    },
    "REJECTED": {
      icon: <FaTimesCircle className="text-red-600" />,
      class: "bg-red-500 text-red-800",
    },
  };

  const handleOnclick = () => {
    setFilterWithNews(true);
    setNewsId(job.id);
    navigate(path);
  }

  const statusData = statusMap[job?.status.toUpperCase() || ""] || statusMap["PENDING"];

  return (
    <div className="flex gap-4 border p-3 rounded-lg shadow-sm hover:shadow-[0_0_10px_rgba(12,142,94,0.5)] hover:border-[#0C8E5E] hover:border-1 transition-all duration-300 cursor-pointer group relative"
      onClick={handleOnclick}>
      <img
        src={job?.logoUrl || "/src/assets/image/logoNoBg.png"}
        alt="logo"
        className="w-[5rem] h-[5rem] object-contain"
      />
      <div className="flex flex-col flex-grow gap-y-5">
        <div className="flex justify-between font-bold text-sm group-hover:text-[#1b8e0c] transition-colors duration-300">
          <div>{job.jobTitle}</div>
          <div className="flex flex-col md:items-end gap-2">
            <span
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[0.75rem] font-medium ${statusData.class}`}
            >
              {statusData.icon}
              {job?.status || ""}
            </span>
          </div>
        </div>
        <div className="flex justify-between  xl:gap-x-5 text-sm text-black mt-1">
          <div className="flex gap-4">
            <div className="bg-gray-300 h-fit w-fit text-center p-1.5 rounded-[.5em] hover:bg-gray-200 transition-colors duration-200">
              {job?.companyAddress || "ha noi"}
            </div>
            <div className="bg-gray-300 h-fit w-fit text-center p-1.5 rounded-[.5em] hover:bg-gray-200 transition-colors duration-200 ">
              {dayjs(job.datePosted).format("DD/MM/YYYY")}
            </div>
            <div className="bg-gray-300 h-fit w-fit text-center p-1.5 rounded-[.5em] hover:bg-gray-200 transition-colors duration-200 ">
              {salaryRange || "Thương lượng"}
            </div>
          </div>
          <div className="xl:absolute xl:right-5">
            <button className=" px-3 py-1 bg-[#5DDA33] text-white rounded-full text-sm hover:opacity-90 hover:cursor-pointer">
              Đơn ứng tuyển: {job?.numberApplicant || 0}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
