import { useState } from "react";
import { FaDollarSign, FaMapMarkerAlt, FaHourglassHalf, FaRegHeart, FaHeart } from "react-icons/fa";

export default function JobIntroduction() {
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveClick = () => {
    setIsSaved(!isSaved);
    // Bạn có thể thêm API call hoặc toast ở đây nếu muốn
    console.log(isSaved ? "Đã hủy lưu tin" : "Đã lưu tin");
  };

  return (
    <div className="p-6 bg-white w-[39rem] h-fit">
      <h2 className="text-lg font-semibold mb-4">Tên công việc</h2>

      <div className="flex justify-between items-start gap-x-10 text-sm mb-6">
        {/* Mức lương */}
        <div className="flex flex-col items-center text-center">
          <div className="border rounded-full w-10 h-10 flex items-center justify-center text-emerald-600 text-lg mb-1">
            <FaDollarSign />
          </div>
          <div className="text-gray-700 text-sm">Thu nhập</div>
          <div className="font-semibold text-[15px] mt-1">15 - 25 triệu</div>
        </div>

        {/* Địa điểm */}
        <div className="flex flex-col items-center text-center">
          <div className="border rounded-full w-10 h-10 flex items-center justify-center text-emerald-600 text-lg mb-1">
            <FaMapMarkerAlt />
          </div>
          <div className="text-gray-700 text-sm">Địa điểm</div>
          <div className="font-semibold text-[15px] mt-1">Hưng Yên & 2 nơi khác</div>
        </div>

        {/* Kinh nghiệm */}
        <div className="flex flex-col items-center text-center">
          <div className="border rounded-full w-10 h-10 flex items-center justify-center text-emerald-600 text-lg mb-1">
            <FaHourglassHalf />
          </div>
          <div className="text-gray-700 text-sm">Kinh nghiệm</div>
          <div className="font-semibold text-[15px] mt-1">1 năm</div>
        </div>
      </div>

      {/* Hạn nộp & nút */}
      <div className="bg-gray-100 text-sm px-5 py-2 rounded mb-4 w-fit">
        Hạn nộp hồ sơ: xx/xx/xxxx
      </div>

      <div className="flex items-center justify-between gap-3">
        <button className="bg-lime-500 text-white font-semibold py-2 w-[25rem] px-6 rounded-full hover:bg-lime-600 transition">
          Ứng tuyển ngay
        </button>

        <button
          onClick={handleSaveClick}
          className={`flex items-center gap-1 border ${
            isSaved ? "bg-lime-100 border-lime-500 text-lime-600" : "border-lime-500 text-lime-500"
          } px-4 py-2 rounded-full hover:bg-lime-50 transition text-sm`}
        >
          {isSaved ? <FaHeart className="text-lime-600" /> : <FaRegHeart />}
          {isSaved ? "Đã lưu" : "Lưu tin"}
        </button>
      </div>
    </div>
  );
}
