import React, { useState } from "react";
import RequestDetailModal from "./RequestDetailModal";

const dummyData = [
  { id: "01", sender: "FPT", date: "20/11", type: "Authorize account", status: "pending" },
  { id: "02", sender: "TDSV", date: "25/3", type: "Recruitment News", status: "approved" },
  { id: "03", sender: "Trường", date: "30/4", type: "support", status: "rejected" },
];

const statusColors = {
  pending: "bg-yellow-300 text-black",
  approved: "bg-green-500 text-white",
  rejected: "bg-red-500 text-white",
};

const RequestContent = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleApprove = (id) => {
    alert(`Approved request ${id}`);
    setSelectedRequest(null);
  };

  const handleReject = (id) => {
    alert(`Rejected request ${id}`);
    setSelectedRequest(null);
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">List of request</h2>
        <select className="border px-2 py-1 rounded">
          <option value="all">All</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border px-3 py-2">Id</th>
              <th className="border px-3 py-2">Sender</th>
              <th className="border px-3 py-2">Date</th>
              <th className="border px-3 py-2">Type</th>
              <th className="border px-3 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map((item) => (
              <tr
                key={item.id}
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => setSelectedRequest(item)}
              >
                <td className="border px-3 py-2">{item.id}</td>
                <td className="border px-3 py-2">{item.sender}</td>
                <td className="border px-3 py-2">{item.date}</td>
                <td className="border px-3 py-2">{item.type}</td>
                <td className="border px-3 py-2">
                  <span className={`px-2 py-1 rounded text-xs ${statusColors[item.status]}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <RequestDetailModal
        request={selectedRequest}
        onClose={() => setSelectedRequest(null)}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
};

export default RequestContent;
