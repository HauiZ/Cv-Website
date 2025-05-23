import React, { useState } from "react";
import TemplateCv from "./TemplateCv";
import Pagination from "../../home/component/ListJob/Pagination";
import "../DashBoard/OverViewContent/animation.css";
import { FaEllipsisH } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import useCustomMutation from "../../../hooks/useCustomMutation";
import { deleteTemplateCVApi } from "../../../services/CvApi";
import EditCvFrame from "./EditCvFrame";
import { set } from "react-hook-form";

export default function CvLayout({ data, refetch }) {
  data = [...data].reverse();
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedCvId, setSelectedCvId] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedCv, setSelectedCv] = useState(null);
  const location = useLocation();
  const { mutate: deleteTemplate, loading } =
    useCustomMutation(deleteTemplateCVApi);
  const pageSize = 6;
  const totalPages = data ? Math.ceil(data.length / pageSize) : 0;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleOpenModal = (cvId) => {
    setSelectedCvId(cvId);
    setShowModal(true);
  };

  const handleDelete = async () => {
    console.log("Xoá CV:", selectedCvId);
    await deleteTemplate(selectedCvId);
    refetch();
    if (!loading) {
      setSelectedCvId(null);
      setShowModal(false);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setSelectedCvId(null);
  };

  // Cắt data theo page
  const paginatedData = data?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Chỉ hiển thị nút xoá nếu không phải trang user
  const canDelete = !location.pathname.includes("/user");

  const handCVDisplayClick = (templateUrl) => {
    const width = 800;
    const height = 600;
    const left = window.screenX + (window.innerWidth - width) / 2;
    const top = window.screenY + (window.innerHeight - height) / 2;

    if (templateUrl) {
      const previewUrl = templateUrl;
      window.open(
        previewUrl,
        "_blank",
        `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
      );
    } else {
      console.error("Không tìm được fileId trong URL.");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="animate-scaleIn grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-10 w-fit">
        {paginatedData?.map((cv) => (
          <div key={cv.id} className="relative">
            <TemplateCv
              data={cv}
              hoverContent={
                <div className="flex flex-col gap-y-2">
                  <button
                    onClick={() => handCVDisplayClick(cv.templateUrl)}
                    className="text-white hover:text-green-400 font-bold px-4 py-2 rounded-full w-[10rem] border-2 border-white hover:bg-white"
                  >
                    Xem mẫu
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCv(cv);
                      setSelectedRequest(true);
                      
                    }}
                    className="text-white hover:text-green-400 font-bold px-4 py-2 rounded-full w-[10rem] border-2 border-white hover:bg-white"
                  >
                    Chỉnh sửa
                  </button>
                </div>
              }
            />

            {canDelete && (
              <button
                onClick={() => handleOpenModal(cv.id)}
                className="absolute top-2 right-2 text-gray-500 hover:text-black"
              >
                <FaEllipsisH />
              </button>
            )}
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {/* Modal xác nhận xoá */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[300px]">
            <p className="text-center mb-4">
              Bạn có chắc chắn muốn xoá CV này không?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                {loading ? "Đang xóa ..." : "Xóa"}
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 border rounded hover:bg-gray-100"
                disabled={loading ? true : false}
              >
                Huỷ
              </button>
            </div>
          </div>
        </div>
      )}
      {selectedRequest && (
        <EditCvFrame
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          refetch={refetch}
          data = {selectedCv}
        />
      )}
    </div>
  );
}
