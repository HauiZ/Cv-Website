import React, { useState, useEffect } from "react";
import TableContent from "./TableContent";
import { mockData } from "./Data";

const RecruiterContent = () => {
  const [recruitersData, setRecruitersData] = useState([]);
  
  useEffect(() => {
    // Use mock data instead of a fetch hook
    setRecruitersData(mockData.recruiters);
  }, []);

  const handleDelete = (id) => {
    alert("Xóa recruiter: " + id);
    // Filter the deleted item from the local state
    setRecruitersData(recruitersData.filter(recruiter => recruiter.id !== id));
  };

  return <TableContent data={recruitersData} onDelete={handleDelete} />;
};

export default RecruiterContent;