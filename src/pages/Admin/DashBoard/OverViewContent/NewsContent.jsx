import React, { useState, useEffect } from "react";
import TableContent from "./TableContent";
import { mockData } from "./Data";

const NewsContent = () => {
  const [newsData, setNewsData] = useState([]);
  
  useEffect(() => {
    // Use mock data instead of a fetch hook
    setNewsData(mockData.news);
  }, []);

  const handleDelete = (id) => {
    alert("Xóa news: " + id);
    // Filter the deleted item from the local state
    setNewsData(newsData.filter(news => news.id !== id));
  };

  return <TableContent data={newsData} onDelete={handleDelete} />;
};

export default NewsContent;