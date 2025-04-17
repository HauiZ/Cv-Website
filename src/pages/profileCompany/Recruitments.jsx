import React, { useState, useEffect } from "react";
import ListNews from "./ListNews.";
import Pagination from "../home/component/ListJob/Pagination";

const ITEMS_PER_PAGE = 3;

export default function RecruitmentNews({ data,logo }) {
  // Use destructuring to get data
  const [currentPage, setCurrentPage] = useState(1);

  // Ensure data is an array, provide default if not
  const jobs = Array.isArray(data) ? data : [];

  // Calculate total pages and current jobs
  const totalPages = Math.ceil(jobs.length / ITEMS_PER_PAGE);
  const currentJobs = jobs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="w-[33rem] mt-5 rounded-[1em] bg-white shadow-md">
      {/* Header */}
      <div className="w-full rounded-t-[1em] bg-gradient-to-r from-[#213E42] to-[#5DCC7C] flex items-center p-5">
        <h1 className="text-white text-2xl font-semibold">Tuyển dụng</h1>
      </div>

      {/* Content */}
      <div className="p-5 h-[30rem] relative">
        {jobs.length > 0 ? (
          <>
            <ListNews jobs={currentJobs} logo={logo} />
            <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center py-4">
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-4">Không có tin tuyển dụng</div>
        )}
      </div>
    </div>
  );
}
