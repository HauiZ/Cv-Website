import React, { useEffect, useState } from "react";
import RequestDetailModal from "./RequestDetailModal";
import { getRequestApi, approveRequestApi } from "../../../services/adminApi";
import useCustomFetch from "../../../hooks/useCustomFetch";
import useCustomMutation from "../../../hooks/useCustomMutation";

const statusColors = {
  PENDING: "bg-yellow-300 text-black",
  APPROVED: "bg-green-500 text-white",
  REJECTED: "bg-red-500 text-white",
};

const RequestContent = () => {
  const { data, refetch } = useCustomFetch(getRequestApi);
  const [requestData, setRequestData] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const { mutate: approvedRequest } = useCustomMutation(approveRequestApi);

  useEffect(() => {
    setRequestData(data || []);
  }, [data]);

  const handleApprove = async (id) => {
    try {
      await approvedRequest( id, {status: "APPROVED" });
      await refetch();
      setSelectedRequest(null);
    } catch (err) {
      console.error("Approve failed:", err);
      // Nếu muốn có thể show thêm toast lỗi ở đây, nhưng trong hook của bạn đã showToast lỗi rồi
    }
  };
  
  const handleReject = async (id) => {
    try {
      await approvedRequest( id, {status: "REJECTED" });
      await refetch();
      setSelectedRequest(null);
    } catch (err) {
      console.error("Reject failed:", err);
    }
  };
  
  return (
    <div className="bg-white p-4 rounded shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">List of request</h2>
        <select className="px-2 py-1  focus:outline-none">
          <option value="all">All</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="w-full text-sm text-gray-700 uppercase">
          <thead className="bg-gray-200 text-gray-700 uppercase">
            <tr className="bg-gray-100 text-left">
              <th className="px-3 py-3 border-b">Id</th>
              <th className="px-3 py-2 border-b">Sender</th>
              <th className="px-3 py-2 border-b">Date</th>
              <th className="px-3 py-3 border-b">Type</th>
              <th className="px-3 py-2 border-b">Status</th>
            </tr>
          </thead>
          <tbody className="stagger-animate">
            {requestData?.map((item, index) => (
              <tr
                key={item.id}
                className="cursor-pointer hover:bg-gray-50 border-b transition-transform duration-300 animate-slideIn"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => setSelectedRequest(item)}
              >
                <td className="px-3 py-2">{item.id}</td>
                <td className="px-3 py-2">{item.sender}</td>
                <td className="px-3 py-2">{item.createAt}</td>
                <td className="px-3 py-2">{item.typeOf}</td>
                <td className="px-3 py-2">
                  <span
                    className={`px-2 py-1 rounded text-xs ${statusColors[item.status]}`}
                  >
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
        status= {selectedRequest?.status}
        onClose={() => setSelectedRequest(null)}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
};

export default RequestContent;
