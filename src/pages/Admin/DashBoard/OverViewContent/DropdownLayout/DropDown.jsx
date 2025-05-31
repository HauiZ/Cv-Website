import React, { useEffect, useMemo, useState } from "react";
import UsersCard from "./UsersCard";
import useCustomFetch from "../../../../../hooks/useCustomFetch";
import { fetchUserApi } from "../../../../../services/adminApi";
import { useSearch } from "../../../../../contexts/SearchContext";

export default function LayoutDropdown({ handleSubmit }) {
  const { searchTerm } = useSearch();
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Debounce the search term
  useEffect(() => {
    // Start loading immediately when search term changes
    if (searchTerm) {
      setIsLoading(true);
    }

    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // 2 second delay as specified

    return () => clearTimeout(handler); // cleanup if user is still typing
  }, [searchTerm]);

  const filter = useMemo(
    () => ({
      keyword: debouncedSearchTerm,
    }),
    [debouncedSearchTerm]
  );

  const {
    data,
    refetch,
    error,
    isLoading: isFetching,
  } = useCustomFetch(fetchUserApi, [filter]);

  // Fetch when debounced search term changes
  useEffect(() => {
    if (debouncedSearchTerm) {
      refetch();
    }
  }, [debouncedSearchTerm, refetch]);

  // Update users and loading state when data changes
  useEffect(() => {
    if (data) {
      if (data.users) {
        setUsers(data.users);
      }
      setIsLoading(false);
    }
  }, [data]);

  // Reset loading state on error
  useEffect(() => {
    if (error) {
      setIsLoading(false);
    }
  }, [error]);

  // Loading spinner component
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center p-4 w-[15.5rem]">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
    </div>
  );

  return (
    <div className="relative w-64">
      {/* Dropdown content */}
      {searchTerm && (
        <div className="w-fit h-fit bg-white border border-gray-300 shadow-lg rounded z-10 flex flex-col gap-y-5">
          {isLoading || isFetching ? (
            <LoadingSpinner />
          ) : !Array.isArray(users) ? (
            <div className="p-2 text-gray-500">Loading...</div>
          ) : users.length === 0 || error ? (
            <div className="p-2 text-gray-500 w-[15.5rem]">No users found.</div>
          ) : (
            users.slice(0, 5).map((user) => (
              <div key={user.id} onClick={() => handleSubmit(user.id)}>
                <UsersCard data={user} />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
