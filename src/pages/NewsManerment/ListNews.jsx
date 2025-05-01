import React from "react";
import NewsItem from "./NewsCard"; // từ News.jsx

export default function ListNews({ jobs}) {
  return (
    <div className="space-y-0.5">
      {jobs.map((job) => (
        <NewsItem key={job.id} job={job}/>
      ))}
    </div>
  );
}
