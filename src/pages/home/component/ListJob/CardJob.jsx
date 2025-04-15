import React, { useEffect, useState } from "react";
import { fetchJobs } from "../../../../services/api";
import JobItem from "./JobItem";

const ListJobBox = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const loadJobs = async () => {
      const data = await fetchJobs();
      // Limit to only the first 9 jobs
      setJobs(data.slice(0, 9));
    };
    loadJobs();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
      {jobs.map((job, index) => (
        <JobItem key={index} job={job} />
      ))}
    </div>
  );
};

export default ListJobBox;