import React, { useState } from "react";
import TemplateCv from "./TemplateCv";
import Pagination from "../../home/component/ListJob/Pagination"; 
import "../DashBoard/OverViewContent/animation.css";
export default function CvLayout({data} ) {
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const pageSize = 6; // Số lượng mỗi trang

  const totalPages = data ? Math.ceil(data.length / pageSize) : 0;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Cắt data theo page
  const paginatedData = data?.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="flex flex-col items-center">
      <div className="animate-scaleIn grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-10 w-fit">
        {paginatedData?.map((cv) => (
          <TemplateCv key={cv.id} data={cv} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
