import { useEffect, useState } from "react";
import { FaBuilding, FaCalendarAlt, FaFileAlt, FaEye } from "react-icons/fa";
import { FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";
import RequestCard from "./RequestCard";
import useCustomMutation from "../../hooks/useCustomMutation";
import { approveApplicationApi } from "../../services/recruiterApi";
const statusMap = {
    "PENDING": {
        icon: <FaClock className="text-black" />,
        class: "bg-yellow-300 text-black",
    },
    "Đã xem": {
        icon: <FaEye className="text-blue-600" />,
        class: "bg-blue-100 text-blue-800",
    },
    "APPROVED": {
        icon: <FaCheckCircle className="text-white" />,
        class: "bg-green-500 text-white",
    },
    "REJECTED": {
        icon: <FaTimesCircle className="text-white" />,
        class: "bg-red-500 text-white",
    },
};

export default function ApplicantCard({ applicant, refetch }) {

    const handCVDisplayClick = () => {
        const url = applicant?.CvFile?.urlView;
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
        statusMap[applicant?.status || ""] || statusMap["Chờ xử lý"];

    const [selectedRequest, setSelectedRequest] = useState(null);
    const { mutate } = useCustomMutation(approveApplicationApi);

    const handleApprove = async (id) => {
        try {
            await mutate(id, { status: "APPROVED" });
            refetch();
            setSelectedRequest(null);
        } catch (err) {
            console.error("Approve failed:", err);
        }
    };

    const handleReject = async (id) => {
        try {
            await mutate(id, { status: "REJECTED" });
            refetch();
            setSelectedRequest(null);
        } catch (err) {
            console.error("Reject failed:", err);
        }
    };

    return (
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white p-4 rounded-xl shadow border gap-4 hover:shadow-[0_0_10px_rgba(12,142,94,0.5)] hover:border-[#0C8E5E] hover:border-2 transition-all duration-300 cursor-pointer group">
            {/* Thông tin công việc */}
            <div className="flex items-center gap-4">
                <div className="flex-shrink-0 mr-4 w-16 h-16 rounded-full overflow-hidden shadow-[0_0_10px_rgba(12,142,94,0.5)] transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    <img
                        src={applicant.PersonalUser.avatarUrl}
                        alt={applicant.PersonalUser.avatarUrl}
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                </div>
                <div>
                    <div className="mb-1">
                        <h3 className="font-medium text-lg">{applicant.jobTitle}</h3>
                        <h4 className="text-blue-500 font-medium">{applicant.PersonalUser.name}</h4>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                        <FaCalendarAlt />
                        <span>Ứng tuyển: {applicant?.applyDate || "unknown"}</span>
                    </div>
                </div>
            </div>

            <div className="text-sm text-green-300">
                <span>Bài đăng số: {applicant?.recruitmentNewsId || 'unknow'}</span>
            </div>

            {/* Trạng thái + nút */}
            <div className="flex flex-col md:items-end gap-2">
                <div onClick={() => setSelectedRequest(applicant)}>
                    <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${statusData.class}`}
                    >
                        {statusData.icon}
                        {applicant?.status || ""}
                    </span>
                </div>

                <div className="flex gap-2">
                    <button
                        className="flex items-center gap-1 border px-3 py-1 rounded text-sm hover:bg-gray-100"
                        onClick={handCVDisplayClick}
                    >
                        <FaFileAlt />
                        Xem CV
                    </button>
                </div>
            </div>
            <RequestCard
                applicant={selectedRequest}
                onClose={() => setSelectedRequest(null)}
                onApprove={handleApprove}
                onReject={handleReject}
            />
        </div >
    );
}
