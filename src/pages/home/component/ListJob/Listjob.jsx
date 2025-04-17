import React, { useEffect, useState } from "react";
import { fetchJobs } from "../../../../services/api";
import JobItem from "./JobItem";
import Filter from "./Filter";
import LocationFilter from "./LocationFilter";
import Pagination from "./Pagination";
import useCustomFetch from "../../../../hooks/useCustomFetch";

const ListJobBox = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 9;
  
  // Use the custom hook to fetch jobs
  const { data: jobs, loading, error } = useCustomFetch(fetchJobs);
  
  // Calculate total jobs and pages
  const totalJobs = jobs?.length || 0;
  const totalPages = Math.ceil(totalJobs / jobsPerPage);

  // Get current jobs for the page
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs ? jobs.slice(indexOfFirstJob, indexOfLastJob) : [];

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top when changing page (optional)
    // window.scrollTo(0, 0);
  };

  return (
    <div className="flex justify-center relative h-full">
      <div>
        <div className="my-3">
          <h1 className="text-3xl font-bold text-[#0C8E5E] ">
            Danh sách việc làm
          </h1>
        </div>
        <div className="flex gap-x-10 mb-5 justify-between">
          <div>
            <Filter />
          </div>
          <div className="">
            <LocationFilter />
          </div>
        </div>
        
        {loading ? (
          <div>Đang tải dữ liệu...</div>
        ) : error ? (
          <div>Có lỗi: {error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt- w-fit">
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
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ListJobBox;