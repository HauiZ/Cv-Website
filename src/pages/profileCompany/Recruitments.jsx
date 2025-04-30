import React, { useState, useEffect, useMemo } from "react";
import ListNews from "./ListNews";
import Pagination from "../home/component/ListJob/Pagination";

const ITEMS_PER_PAGE = 5;

export default function RecruitmentNews({ data }) {
  // Use destructuring to get data
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    setCurrentPage(1)
  }, [data]);
  // Ensure data is an array, provide default if not
  const jobs = Array.isArray(data) ? data : [];

  // Calculate total pages and current jobs
  const totalPages = Math.ceil(jobs.length / ITEMS_PER_PAGE);
  const currentJobs = jobs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="mt-5 rounded-[1em] bg-white shadow-md pb-10 relative">
      {/* Header */}
      <div className="w-full rounded-t-[1em] bg-gradient-to-r from-[#213E42] to-[#5DCC7C] flex items-center p-5">
        <h1 className="text-white text-2xl font-semibold">Tuyển dụng</h1>
      </div>

      {/* Content */}
      <div className="p-5 h-fit ">
        {jobs.length > 0 ? (
          <>
            <ListNews jobs={currentJobs}  />
            <div className="absolute bottom-2 left-0 right-0 flex justify-center items-center">
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
