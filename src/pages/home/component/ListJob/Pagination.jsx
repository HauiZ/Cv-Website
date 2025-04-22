import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center justify-center mt-5 gap-x-10">
      <button 
        className={`border-2 border-[#5DDA33] text-[#5DDA33] rounded-full p-2 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#5DDA33] hover:text-white  hover:cursor-pointer transition-colors'}`}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FaAngleLeft />
      </button>
      <p className="text-center text-gray-500">Page {currentPage} of {totalPages}</p>
      <button 
        className={`border-2 border-[#5DDA33] text-[#5DDA33] rounded-full p-2 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#5DDA33] hover:text-white hover:cursor-pointer  transition-colors'}`}
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <FaAngleRight />
      </button>
    </div>
  );
};

export default Pagination;