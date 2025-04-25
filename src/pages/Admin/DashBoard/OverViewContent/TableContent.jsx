import React from "react";

const TableContent = ({ data }) => {
  console.log("data>>>>:",data)
  return (
    <div className="overflow-x-auto rounded-lg shadow-md bg-white">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50 text-gray-700 uppercase">
          <tr>
            <th className="px-4 py-3 border-b">ID</th>
            <th className="px-4 py-3 border-b">Logo</th>
            <th className="px-4 py-3 border-b">Email</th>
            <th className="px-4 py-3 border-b">Ngày tham gia</th>
            <th className="px-4 py-3 border-b">Hành động</th>
          </tr>
        </thead>
        <tbody className="stagger-animate">
          {data?.map((item, index) => (
            <tr
              key={item.id}
              className="hover:bg-gray-50 border-b transition-colors duration-200 animate-slideIn"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <td className="px-4 py-3">{item.id}</td>
              <td className="px-4 py-3">
                <img
                  src={item.imageUrl}
                  alt="logo"
                  className="w-10 h-10 object-cover rounded-full border shadow-sm"
                />
              </td>
              <td className="px-4 py-3">{item.email}</td>
              <td className="px-4 py-3">{item.role}</td>
              <td className="px-4 py-3">
                <button
                  
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-300"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableContent;
