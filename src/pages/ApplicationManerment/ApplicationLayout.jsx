import React, { useState } from "react";
import ApplicationCard from "./ApplicationCard";
import useCustomFetch from "../../hooks/useCustomFetch";
import { getInfoApplicationApi } from "../../services/userApi";
import Pagination from "../home/component/ListJob/Pagination";

export default function ApplicationLayout() {
  const { data, loading } = useCustomFetch(getInfoApplicationApi);
  const jobs = Array.isArray(data) ? data : [];

  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1); // Reset trang về 1 khi đổi filter
  };

  const filteredJobs = jobs.filter((job) => {
    if (statusFilter === "all") return true;
    return job.status === statusFilter.toUpperCase();
  });

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const currentJobs = filteredJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-w-[20rem] w-[50rem] min-h-[35rem] bg-white rounded-[.5em] shadow  relative pb-10">
      <div className="p-6 space-y-4 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Đơn ứng tuyển của bạn</h2>

        <div className="flex flex-wrap gap-2 mb-4 justify-end">
          <select
            className="px-2 py-1 focus:outline-none border rounded"
            value={statusFilter}
            onChange={handleStatusFilterChange}
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="approved">Đã duyệt</option>
            <option value="pending">Đang chờ</option>
            <option value="rejected">Từ chối</option>
          </select>
        </div>

        {loading ? (
          <p>Đang tải...</p>
        ) : currentJobs.length > 0 ? (
          currentJobs.map((job) =>
            job ? <ApplicationCard key={job.id} application={job} /> : null
          )
        ) : (
          <p>Không có đơn ứng tuyển nào phù hợp.</p>
        )}
        <div className="absolute bottom-0 left-0 w-full mb-5">
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
}
