import React, { useState, useEffect, useMemo } from "react";
import TableContent from "./TableContent";
import { fetchUserApi } from "../../../../services/adminApi";
import useCustomFetch from "../../../../hooks/useCustomFetch";

const UserContent = ({ onDataUpdate }) => {
  const [filter, setFilter] = useState("Truong")
  const filterParams = useMemo(
      () => ({
        keyword: filter,
      }),
      [filter]
    );
  const {
    data: fetchedData,
    loading,
    error,
    refetch,
  } = useCustomFetch(fetchUserApi,[filterParams]);
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    if (fetchedData) {
      setUsersData([...fetchedData.users].reverse() || []);
    }
  }, [fetchedData]);

  // Handle user deletion and data refresh
  const handleUserDeleted = () => {
    refetch();
    if (onDataUpdate) {
      onDataUpdate();
    }
  };

  if (loading) {
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
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 transform hover:scale-105 hidden">
          Add New User
        </button>
      </div>
      <TableContent data={usersData} onUserDeleted={handleUserDeleted} />
    </div>
  );
};

export default UserContent;
