import React from "react";

export default function UserCard({ data }) {
  return (
    <div className="flex gap-3 pl-2">
      <div>
        <img
          src={data?.imageUrl || "logo"}
          alt="logo"
          className="w-10 h-10 object-cover rounded-full border shadow-sm"
        />
      </div>
      <div>
        <div className="flex gap-x-2 text-black">
          <h1>id: {data?.id || ""}</h1>
          <h1>{data?.role}</h1>
        </div>
        <div className="text-black">{data?.email || ""}</div>
      </div>
    </div>
  );
}
