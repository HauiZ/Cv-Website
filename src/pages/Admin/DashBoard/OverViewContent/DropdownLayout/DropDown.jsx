import React, { useEffect, useMemo, useState } from "react";
import UsersCard from "./UsersCard";
import useCustomFetch from "../../../../../hooks/useCustomFetch";
import { fetchUserApi } from "../../../../../services/adminApi";
import { useSearch } from "../../../../../contexts/SearchContext";

export default function LayoutDropdown({ handleSubmit}) {
  const { searchTerm } = useSearch();
  const [users, setUsers] = useState([]);
  const filter = useMemo(
    () => ({
      keyword: searchTerm,
    }),
    [searchTerm]
  );
  const { data, refetch, error } = useCustomFetch(fetchUserApi, [filter]);

  useEffect(() => {
    refetch();
  }, [searchTerm]);

  useEffect(() => {
    if (data?.users) {
      setUsers(data.users);
    }
  }, [data]);

  return (
    <div className="relative w-64">
      {/* Dropdown content */}
      {searchTerm && (
        <div className="w-fit h-fit bg-white border border-gray-300 shadow-lg rounded z-10 flex flex-col gap-y-5">
          {!Array.isArray(users) ? (
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
