import React, { useState } from "react";
import TemplateCv from "../Admin/Products/TemplateCv";
import useCustomFetch from "../../hooks/useCustomFetch";
import { fetchTemplateUserApi } from "../../services/CvApi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export default function TemplateContent() {
  const { data } = useCustomFetch(fetchTemplateUserApi);
  const [currentPage, setCurrentPage] = useState(0);

  const navigate = useNavigate();

  const pageSize = 6; // Số lượng mỗi trang

  const totalPages = data ? Math.ceil(data.length / pageSize) : 0;

  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev));
  };

  // Cắt data theo page
  const paginatedData = data?.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  return (
    <div className="relative flex flex-col items-center">
      {/* Pagination buttons */}
      <div className="relative w-full flex justify-center items-center">
        {/* Nút trái */}
        <button
          onClick={handlePrev}
          disabled={currentPage === 0}
          className="absolute left-[-3em] top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 disabled:opacity-50"
        >
          <FaChevronLeft size={20} />
        </button>

        {/* Nội dung template */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-10 w-fit transition-opacity duration-500 ease-in-out opacity-100"
        >
          {paginatedData?.map((cv) => (
            <TemplateCv
              key={cv.id}
              data={cv}
              hoverContent={
                <button
                  onClick={() => navigate(`/createCV`)}
                  className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-400"
                >
                  Tạo CV với mẫu
                </button>
              }
            />
          ))}
        </div>

        {/* Nút phải */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages - 1}
          className="absolute right-[-3em] top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 disabled:opacity-50"
        >
          <FaChevronRight size={20} />
        </button>
      </div>

      {/* Hiển thị số trang */}
      <div className="mt-5 text-gray-500">
        Trang {totalPages > 0 ? currentPage + 1 : 0}/{totalPages}
      </div>
    </div>
  );
}
