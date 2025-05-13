import React, { useState } from "react";
import TemplateCv from "../Admin/Products/TemplateCv";
import useCustomFetch from "../../hooks/useCustomFetch";
import { fetchTemplateUserApi } from "../../services/CvApi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa6";
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
                <div className="absolute inset-0 flex flex-col gap-y-2 justify-center items-center bg-black/30 h-[30rem]">
                  <button
                    onClick={() => handCVDisplayClick(cv.templateUrl)}
                    className="text-white hover:text-green-400 px-4 py-2 rounded-full w-[10rem] absolute top-0 left-78"
                  >
                    <FaEye size={25}/>
                  </button>
                  <button
                    onClick={() => navigate(`/createCV`)}
                    className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-400 w-[10rem]"
                  >
                    Tạo CV với mẫu
                  </button>
                  
                </div>
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
