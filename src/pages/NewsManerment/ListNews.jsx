import React from "react";
import NewsItem from "./NewsCard"; // từ News.jsx

export default function ListNews({ jobs, setFilterWithNews, setNewsId}) {
  return (
    <div className="space-y-0.5">
      {jobs.map((job) => (
        <NewsItem key={job.id} job={job} setFilterWithNews={setFilterWithNews} setNewsId={setNewsId}/>
      ))}
    </div>
  );
}
