import React from "react";
import NewsItem from "./News"; // từ News.jsx

export default function ListNews({ jobs,logo }) {
  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <NewsItem key={job.id} job={job} companyName={job?.companyName} logo={logo? logo : job?.logoUrl  }/>
      ))}
    </div>
  );
}
