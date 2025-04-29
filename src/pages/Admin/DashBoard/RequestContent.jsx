import React, { useEffect, useState } from "react";
import RequestDetailModal from "./RequestDetailModal";
import { getRequestApi, approveRequestApi } from "../../../services/adminApi";
import useCustomFetch from "../../../hooks/useCustomFetch";
import useCustomMutation from "../../../hooks/useCustomMutation";
import Pagination from "../../home/component/ListJob/Pagination";

const statusColors = {
  PENDING: "bg-yellow-300 text-black",
  APPROVED: "bg-green-500 text-white",
  REJECTED: "bg-red-500 text-white",
};

const RequestContent = () => {
  const { data, refetch } = useCustomFetch(getRequestApi);
  const [requestData, setRequestData] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [filter, setFilter] = useState("all");
  
  // Thêm state cho phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Số lượng mục trên mỗi trang

  const { mutate: approvedRequest } = useCustomMutation(approveRequestApi);

  useEffect(() => {
    setRequestData(data || []);
  }, [data]);

  const handleApprove = async (id) => {
    try {
      await approvedRequest(id, { status: "APPROVED" });
      await refetch();
      setSelectedRequest(null);
    } catch (err) {
      console.error("Approve failed:", err);
      // Nếu muốn có thể show thêm toast lỗi ở đây, nhưng trong hook của bạn đã showToast lỗi rồi
    }
  };

  const handleReject = async (id) => {
    try {
      await approvedRequest(id, { status: "REJECTED" });
      await refetch();
      setSelectedRequest(null);
    } catch (err) {
      console.error("Reject failed:", err);
    }
  };

  // Lọc dữ liệu theo trạng thái nếu cần
  const filteredData = filter === "all" 
    ? requestData 
    : requestData.filter(item => item.status.toLowerCase() === filter);

  // Tính toán phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  
  // Tính tổng số trang
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  
  // Xử lý thay đổi trang
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Xử lý thay đổi bộ lọc
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setCurrentPage(1); // Reset về trang 1 khi thay đổi bộ lọc
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">List of request</h2>
        <select 
          className="px-2 py-1 focus:outline-none border rounded"
          value={filter}
          onChange={handleFilterChange}
        >
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
            {currentItems.map((item, index) => (
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

      {/* Thêm component phân trang */}
      {totalPages > 0 && (
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={handlePageChange} 
        />
      )}

      <RequestDetailModal
        request={selectedRequest}
        status={selectedRequest?.status}
        onClose={() => setSelectedRequest(null)}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
};

export default RequestContent;