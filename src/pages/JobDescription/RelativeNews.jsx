import React, { useState, useEffect } from "react";
import ListNews from "../profileCompany/ListNews";
import Pagination from "../home/component/ListJob/Pagination";
const ITEMS_PER_PAGE = 3;

export default function RelativeNews({ data, logo }) {
  const [currentPage, setCurrentPage] = useState(1);
  const jobs = Array.isArray(data) ? data : [];
  const totalPages = Math.ceil(jobs.length / ITEMS_PER_PAGE);
  const currentJobs = jobs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="mt-5 mb-10 rounded-[1em] bg-white shadow-md">
      {/* Header */}
      <div className="pt-4 px-5">
        <h1 className="text-base font-semibold">Việc làm liên quan</h1>
      </div>

      {/* Content */}
      <div className="p-5 h-[30rem] relative overflow-y-auto">
        {jobs.length > 0 ? (
          <>
            <div className="space-y-4">
              <ListNews jobs={currentJobs} logo={logo} />
            </div>
            {totalPages > 1 && (
              <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center py-4 bg-white">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-4 text-sm text-gray-600">
            Không có tin tuyển dụng
          </div>
        )}
      </div>
    </div>
  );
}
