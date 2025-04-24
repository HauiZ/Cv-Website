import React, { useState, useEffect } from "react";
import TableContent from "./TableContent";
import { mockData } from "./Data";

const CandidateContent = () => {
  const [candidatesData, setCandidatesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    setTimeout(() => {
      setCandidatesData(mockData.candidates);
      setIsLoading(false);
    }, 300); // Short delay for animation effect
  }, []);

  const handleDelete = (id) => {
    alert("Xóa candidate: " + id);
    setCandidatesData(candidatesData.filter(candidate => candidate.id !== id));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-700">Candidate List</h3>
        <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-200 transform hover:scale-105">
          Add New Candidate
        </button>
      </div>
      <TableContent data={candidatesData} onDelete={handleDelete} />
    </div>
  );
};

export default CandidateContent;