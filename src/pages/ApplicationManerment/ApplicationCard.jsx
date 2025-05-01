import { FaBuilding, FaCalendarAlt, FaFileAlt, FaEye } from "react-icons/fa";
import { FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const statusMap = {
    "PENDING": {
      icon: <FaClock className="text-black" />,
      class: "bg-yellow-300 text-black",
    },
    "APPROVED": {
      icon: <FaCheckCircle className="text-white" />,
      class: "bg-green-500 text-white ",
    }
  };

export default function ApplicationCard({ application }) {
  const news = application?.recruitmentNews
  const navigate = useNavigate();
  const handleDetailClick = () => {
    navigate(`/job/${news?.id || "/error/out"}`);
  };
  const handCVDisplayClick = () => {
    const url = application?.cvUrl;
    const match = url.match(/\/d\/([^/]+)\//);
    const fileId = match ? match[1] : null;
    const width = 800;
    const height = 600;
    const left = window.screenX + (window.innerWidth - width) / 2;
    const top = window.screenY + (window.innerHeight - height) / 2;

    if (fileId) {
      const previewUrl = `https://drive.google.com/file/d/${fileId}/preview`;
      window.open(
        previewUrl,
        "_blank",
        `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
      );
    } else {
      console.error("Không tìm được fileId trong URL.");
    }
  };
  const statusData =
    statusMap[application?.status.toUpperCase() || ""] || statusMap["PENDING"];

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white p-4 rounded-xl shadow border gap-4 hover:shadow-[0_0_10px_rgba(12,142,94,0.5)] hover:border-[#0C8E5E] hover:border-2 transition-all duration-300 cursor-pointer group">
      {/* Thông tin công việc */}
      <div className="flex items-center gap-4">
        <img
          src={news?.logoUrl || ""}
          alt="Company Logo"
          className="w-12 h-12 rounded-md object-cover"
        />
        <div>
          <h3 className="text-lg font-semibold">
            {news?.jobTitle || "Ten cong ty"}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FaBuilding />
            <span>{news?.companyName || "Tên ct"}</span>
            <span className="mx-2">•</span>
            <span>{news?.companyAddress || "abc"}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
            <FaCalendarAlt />
            <span>Ứng tuyển: {application?.applyDate || "unknown"}</span>
          </div>
        </div>
      </div>

      {/* Trạng thái + nút */}
      <div className="flex flex-col md:items-end gap-2">
        <span
          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${statusData.class}`}
        >
          {statusData.icon}
          {application?.status || ""}
        </span>
        <div className="flex gap-2">
          <button
            className="flex items-center gap-1 border px-3 py-1 rounded text-sm hover:bg-gray-100"
            onClick={handCVDisplayClick}
          >
            <FaFileAlt />
            Xem CV
          </button>
          <button
            className="flex items-center gap-1 bg-gray-800 text-white px-3 py-1 rounded text-sm hover:bg-gray-700"
            onClick={handleDetailClick}
          >
            Chi tiết
          </button>
        </div>
      </div>
    </div>
  );
}
