import { useState } from "react";
import formatSalaryRangeToVND from "../../utils/formatSalaryRangeToVND";
import {
  FaDollarSign,
  FaMapMarkerAlt,
  FaHourglassHalf,
  FaRegHeart,
  FaHeart,
} from "react-icons/fa";
import ApplyPopUp from "./ApplyPopUp";
import { useEffect } from "react";
import useCustomMutation from "../../hooks/useCustomMutation";
import { saveNews } from "../../services/userApi";
import { emitEvent } from "../../services/emitEvent";

export default function JobIntroduction({data, status, jobId, isPreviewMode = false}) {
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const salaryRanges = formatSalaryRangeToVND(data?.salaryRange || "Thương lượng");
  const { mutate: saveNewsMutate } = useCustomMutation(saveNews);
  const { mutate: emitEventMutate } = useCustomMutation(emitEvent);
  const [isSaved, setIsSaved] = useState(!!status?.isSaved);
  useEffect(() => setIsSaved(!!status?.isSaved), [status?.isSaved]);
  const [isApplied, setIsApplied] = useState(!!status?.isApplied);
  useEffect(() => setIsApplied(!!status?.isApplied), [status?.isApplied]);

  const handleSaveClick = () => {
    const next = !isSaved;
    setIsSaved(next);
    saveNewsMutate(jobId);
    if (next) {
      emitEventMutate({ event_name: 'save_job', job_id: jobId });
    }
  }
  return (
    <div className="p-6 bg-white w-[39rem] h-fit">
      <h2 className="text-lg font-semibold mb-4">{data?.jobTitle || ""}</h2>

      <div className="flex justify-between items-start gap-x-10 text-sm mb-6">
        {/* Mức lương */}
        <div className="flex flex-col items-center text-center">
          <div className="border rounded-full w-10 h-10 flex items-center justify-center text-emerald-600 text-lg mb-1">
            <FaDollarSign />
          </div>
          <div className="text-gray-700 text-sm">Thu nhập</div>
          <div className="font-semibold text-[15px] mt-1">{ salaryRanges || "Thương lượng"}</div>
        </div>

        {/* Địa điểm */}
        <div className="flex flex-col items-center text-center">
          <div className="border rounded-full w-10 h-10 flex items-center justify-center text-emerald-600 text-lg mb-1">
            <FaMapMarkerAlt />
          </div>
          <div className="text-gray-700 text-sm">Địa điểm</div>
          <div className="font-semibold text-[15px] mt-1">
            {data?.address || "Chưa có thông tin địa chỉ"}
          </div>
        </div>

        {/* Kinh nghiệm */}
        <div className="flex flex-col items-center text-center">
          <div className="border rounded-full w-10 h-10 flex items-center justify-center text-emerald-600 text-lg mb-1">
            <FaHourglassHalf />
          </div>
          <div className="text-gray-700 text-sm">Kinh nghiệm</div>
          <div className="font-semibold text-[15px] mt-1">{data?.experience || "Không yêu cầu kinh nghiệm"}</div>
        </div>
      </div>

      {/* Hạn nộp & nút */}
      <div className="bg-gray-100 text-sm px-5 py-2 rounded mb-4 w-fit">
        Hạn nộp hồ sơ: {data?.applicationDeadline || "Chưa có thông tin"}
      </div>

      {!isPreviewMode && (
        <div className="flex items-center justify-between gap-3">
          { isApplied ? <button className="bg-gray-500 text-white font-semibold py-2 w-[25rem] px-6 rounded-full transition" disabled>
            Đã ứng tuyển
          </button> : <button className="bg-green-500 text-white font-semibold py-2 w-[25rem] px-6 rounded-full hover:bg-lime-600 transition" onClick={() => setIsApplyOpen(true)}>
            Ứng tuyển ngay
          </button>}
          {/* <button className="bg-green-500 text-white font-semibold py-2 w-[25rem] px-6 rounded-full hover:bg-lime-600 transition" onClick={() => setIsApplyOpen(true)}>
            Ứng tuyển ngay
          </button> */}

          <button
            onClick={handleSaveClick}
            className={`flex items-center gap-1 border ${
              isSaved
                ? "bg-lime-100 border-lime-500 text-lime-600"
                : "border-lime-500 text-lime-500"
            } px-4 py-2 rounded-full hover:bg-lime-50 transition text-sm`}
          >
            {isSaved ? <FaHeart className="text-lime-600" /> : <FaRegHeart />}
            {isSaved ? "Đã lưu" : "Lưu tin"}
          </button>
        </div>
      )}

      <ApplyPopUp isOpen={isApplyOpen} onClose={() => setIsApplyOpen(false)} jobId={jobId} setIsApplied={setIsApplied}/>
    </div>
  );
}
