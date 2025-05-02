import React, { useState, useEffect } from "react";
import { fetchAllNewsFilterApi } from "../../../../services/recruitmentNewsApi";
import JobItem from "./JobItem";
import Filter from "./Filter";
import LocationFilter from "./LocationFilter";
import Pagination from "./Pagination";
import useCustomFetch from "../../../../hooks/useCustomFetch";

const formatSalaryRange = (value) => {
  if (value === "10up") {
    return {
      salaryMin: 10000000,
      salaryMax: 10000000000000, // có thể bỏ hoặc không gửi key này nếu backend không yêu cầu
    };
  }

  const [minStr, maxStr] = value.split("-");
  const salaryMin = parseInt(minStr, 10) * 1000000;
  const salaryMax = parseInt(maxStr, 10) * 1000000;

  return { salaryMin, salaryMax };
};

const ListJobBox = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 9;
  const [filters, setFilters] = useState({});

  // Custom hook fetch theo query
  const {
    data: jobs,
    loading,
    error,
  } = useCustomFetch(fetchAllNewsFilterApi, [filters]);

  // Xử lý filter khi thay đổi từ component Filter
  const handleFilterChange = (value) => {
    if (value === null) {
      // Clear the corresponding filters
      setFilters({});
      return;
    }
    const [key, val] = value;

    if (key === "salary") {
      const { salaryMin, salaryMax } = formatSalaryRange(val);
      setFilters((prev) => ({
        salaryMin,
        ...(salaryMax !== null ? { salaryMax } : {}),
      }));
    } else {
      setFilters((prev) => ({
        [key]: val,
      }));
    }
    console.log("Filter value>>>>>>>>>>>..:", filters);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [jobs]);
  // Xử lý filter từ location button
  const handleLocationFilter = (locationValue) => {
    setFilters((prev) => ({
      ...prev,
      area: locationValue,
    }));
    console.log("Selected location:", locationValue);
  };
  // Tính toán phân trang
  const totalJobs = jobs?.length || 0;
  const totalPages = Math.ceil(totalJobs / jobsPerPage);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs ? jobs.slice(indexOfFirstJob, indexOfLastJob) : [];

  return (
    <div className="flex justify-center h-full relative">
      <div>
        <div className="relative min-w-[59rem]">
          <div className="flex my-3 items-center relative">
            <h1 className="text-3xl font-bold text-[#0C8E5E]">
              Danh sách việc làm
            </h1>
            <a href="/search" className="hover:underline hover:text-green-400 right-0 absolute font-semibold">Xem tất cả</a>
          </div>
          <div className="flex gap-x-10 mb-5">
            <div>
              <Filter onFilterChange={handleFilterChange} />
            </div>
            <div className="absolute right-0">
              <LocationFilter onLocationChange={handleLocationFilter} />
            </div>
          </div>
        </div>

        {loading ? (
          <div>Đang tải dữ liệu...</div>
        ) : error ? (
          <div>Có lỗi: {error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 w-fit">
            {currentJobs.map((job) => (
              <JobItem key={job.id} job={job} />
            ))}
          </div>
        )}

        <div className="absolute bottom-6 left-0 right-0">
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
};

export default ListJobBox;
