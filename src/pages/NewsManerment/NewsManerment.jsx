import React, { useState, useEffect } from "react";
import ListNews from "./ListNews";
import Pagination from "../home/component/ListJob/Pagination";
import useCustomFetch from "../../hooks/useCustomFetch";
import { fetchAllNewsApi } from "../../services/recruiterApi";
const ITEMS_PER_PAGE = 4;
export default function NewsManerment({ setFilterWithNews, setNewsId }) {
  const { data } = useCustomFetch(fetchAllNewsApi);

  const [currentPage, setCurrentPage] = useState(1);
  const jobs = Array.isArray(data) ? data : [];
  const totalPages = Math.ceil(jobs.length / ITEMS_PER_PAGE);
  const currentJobs = jobs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  return (
    <div className="rounded-[.5em] bg-white shadow-md h-fit relative pb-9 max-w-[65rem] mx-auto">
      {/* Header */}
      <div className="pt-4 px-5">
        <h1 className="text-base font-semibold">Quản lý tin tuyển dụng</h1>
      </div>

      {/* Content */}
      <div className="p-3 min-h-[30rem]">
        {jobs.length > 0 ? (
          <>
            <div className="">
              <ListNews jobs={currentJobs} setFilterWithNews={setFilterWithNews} setNewsId={setNewsId}/>
            </div>
            {totalPages > 1 && (
              <div className="absolute bottom-3 left-0 right-0 flex justify-center items-center p- bg-white">
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
