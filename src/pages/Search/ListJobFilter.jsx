import React, { useState, useEffect } from "react";
import ListNews from "../profileCompany/ListNews";
import Pagination from "../home/component/ListJob/Pagination";
const ITEMS_PER_PAGE = 15;

export default function ListJobFilter({ data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const jobs = Array.isArray(data) ? data : [];
  const totalPages = Math.ceil(jobs.length / ITEMS_PER_PAGE);
  const currentJobs = jobs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className=" mb-10 rounded-[.5em] bg-white shadow-md h-fit">
      {/* Header */}
      <div className="pt-4 px-5">
        <h1 className="text-base font-semibold">Việc làm liên quan</h1>
      </div>

      {/* Content */}
      <div className="p-5 min-h-[30rem] h-fit relative ">
        {jobs.length > 0 ? (
          <>
            <div className="space-y-4">
              <ListNews jobs={currentJobs}/>
            </div>
            {totalPages > 1 && (
              <div className="  bottom-0 flex justify-center">
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
