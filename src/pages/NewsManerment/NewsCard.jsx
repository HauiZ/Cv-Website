import React from "react";
import formatSalaryRangeToVND from "../../utils/formatSalaryRangeToVND";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle, FaClock, FaTrashAlt } from "react-icons/fa";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import relativeTime from "dayjs/plugin/relativeTime";
import { useSpring, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';

dayjs.extend(relativeTime);
dayjs.locale("vi");

export default function NewsCard({ job, onDeleteNews }) {
  const navigate = useNavigate();
  const salaryRange = formatSalaryRangeToVND(
    `${job.salaryMin} - ${job.salaryMax}`
  );

  const statusMap = {
    PENDING: {
      icon: <FaClock className="text-black" />,
      class: "bg-yellow-300 text-black",
    },
    APPROVED: {
      icon: <FaCheckCircle className="text-white" />,
      class: "bg-green-500 text-white",
    },
    REJECTED: {
      icon: <FaTimesCircle className="text-red-600" />,
      class: "bg-red-500 text-white",
    },
  };

  const statusData = statusMap[job?.status?.toUpperCase() || "PENDING"] || statusMap["PENDING"];
  const handleOnclick = () => {
    if (job?.status === "APPROVED") {
      navigate(`/recruiter/quan-ly-cv`);
    }
  };

  const [{ x }, api] = useSpring(() => ({ x: 0 }));
  const SWIPE_THRESHOLD = -80;
  const DELETE_AREA_WIDTH = 80;

  const bind = useDrag(
    ({ down, movement: [mx], cancel }) => {
      if (mx >= 0) {
        api.start({ x: 0, immediate: true });
        return;
      }

      if (down) {
        api.start({ x: mx, immediate: true });
      } else {
        if (mx < SWIPE_THRESHOLD) {
          api.start({
            x: -(DELETE_AREA_WIDTH + 200),
            immediate: false,
            onRest: () => onDeleteNews(job.id, () => api.start({ x: 0 }))
          });
        } else {
          api.start({ x: 0, immediate: false });
        }
      }
    },
    {
      axis: 'x',
      filterTaps: true,
      rubberband: 0.1,
      preventDefault: true,
    }
  );

  return (
    <div className="relative rounded-lg overflow-hidden my-1">
      {/* Delete background */}
      <div
        className="absolute top-0 right-0 h-full bg-red-500 flex items-center justify-center text-white cursor-pointer"
        style={{ width: `${DELETE_AREA_WIDTH}px`, transform: `translateX(${DELETE_AREA_WIDTH}px)` }}
        onClick={(e) => {
          e.stopPropagation();
          onDeleteNews(job.id);
        }}
      >
        <FaTrashAlt size={24} />
      </div>

      {/* Main card */}        <animated.div
        {...bind()}
        style={{
          x,
          touchAction: 'pan-y',
          backgroundColor: 'white',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
        }} className={`flex flex-col border border-gray-200 p-3 rounded-lg shadow-sm transition-all duration-300 group relative max-w-4xl mx-auto
          ${job?.status === "APPROVED" ? "cursor-pointer" : "cursor-default"}
          hover:shadow-[0_0_10px_rgba(12,142,94,0.5)] hover:border-[#0C8E5E]`}
        onClick={handleOnclick}
      >
        <div className="flex gap-3">
          <img
            src={job?.logoUrl || "/src/assets/image/logoNoBg.png"}
            alt="logo"
            className="w-16 h-16 object-contain flex-shrink-0"
          />

          <div className="flex flex-col flex-grow gap-y-1">
            <div className="flex flex-col sm:flex-row sm:justify-between font-bold text-sm group-hover:text-[#1b8e0c] transition-colors duration-300">
              <div className="truncate max-w-[180px] sm:max-w-xs md:max-w-sm">
                {job.jobTitle}
              </div>
              <div className="flex flex-row items-center justify-between gap-2">
                <p className="text-[#5DDA33] text-xs whitespace-nowrap">
                  Bài đăng số: {job.id}
                </p>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[0.7rem] font-medium ${statusData.class}`}>
                  {statusData.icon}
                  {job?.status || ""}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 text-xs text-black mt-1">
              <div className="bg-gray-200 h-fit w-fit text-center px-2 py-1 rounded hover:bg-gray-300 transition-colors duration-200 truncate">
                {job?.companyAddress || "Chưa cập nhật"}
              </div>
              <div className="bg-gray-200 h-fit w-fit text-center px-2 py-1 rounded hover:bg-gray-300 transition-colors duration-200">
                Đăng: {dayjs(job.datePosted).format("DD/MM/YYYY")}
              </div>
              <div className="bg-gray-200 h-fit w-fit text-center px-2 py-1 rounded hover:bg-gray-300 transition-colors duration-200 truncate">
                {salaryRange || "Thương lượng"}
              </div>
            </div>
          </div>        </div>
        <div className="flex flex-row justify-end items-center gap-2">
          <button
            className={`px-3 py-1 text-white rounded-full text-xs whitespace-nowrap transition-colors ${job?.status === 'APPROVED'
              ? 'bg-[#5DDA33] hover:opacity-90 cursor-pointer'
              : 'bg-gray-400 cursor-not-allowed opacity-60'
              }`}
            onClick={(e) => {
              e.stopPropagation();
              if (job?.status === 'APPROVED' && job?.id) {
                navigate(`/recruiter/tin-tuyen-dung/edit`, {
                  state: { jobId: job.id }
                });
              }
            }}
            disabled={job?.status !== 'APPROVED'}
            title={job?.status !== 'APPROVED' ? 'Chỉ có thể sửa tin đã được duyệt' : 'Sửa tin tuyển dụng'}
          >
            Sửa tin
          </button>          <button
            className="px-3 py-1 bg-[#5DDA33] text-white rounded-full text-xs hover:opacity-90 whitespace-nowrap"
            onClick={(e) => {
              e.stopPropagation();
              navigate('/recruiter/quan-ly-cv');
            }}
          >
            Đơn ứng tuyển: {job?.numberApplicant || 0}
          </button>
        </div>
      </animated.div>
    </div>
  );
}
