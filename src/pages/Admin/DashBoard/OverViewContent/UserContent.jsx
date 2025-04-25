import React, { useState, useEffect } from "react";
import TableContent from "./TableContent";

const UserContent = ({data}) => {
  const [usersData, setUsersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    setTimeout(() => {
      setUsersData(data);
      setIsLoading(false);
    }, 300); // Short delay for animation effect
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-700">User List</h3>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 transform hover:scale-105">
          Add New User
        </button>
      </div>
      <TableContent data={data}  />
    </div>
  );
};

export default UserContent;