import React, { useEffect, useState } from "react";
import { fetchJobs } from "../../../../services/api";
import JobItem from "./JobItem";
import Filter from "./Filter";
import LocationFilter from "./LocationFilter";
import Pagination from "./Pagination";

const ListJobBox = () => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const jobsPerPage = 9;

  useEffect(() => {
    const loadJobs = async () => {
      const data = await fetchJobs();
      setTotalJobs(data.length);
      setJobs(data);
    };
    loadJobs();
  }, []);

  const totalPages = Math.ceil(totalJobs / jobsPerPage);

  // Get current jobs for the page
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top when changing page (optional)
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex justify-center">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt- w-fit">
          {currentJobs.map((job, index) => (
            <JobItem key={job.id} job={job} />
          ))}
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default ListJobBox;
