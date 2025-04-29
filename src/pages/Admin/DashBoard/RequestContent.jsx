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
  
  // Bộ lọc
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  
  // Phân trang
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

  // Lấy danh sách các loại request có trong data
  const getUniqueTypes = () => {
    if (!requestData || requestData.length === 0) return [];
    return [...new Set(requestData.map(item => item.typeOf))];
  };

  // Xử lý thay đổi bộ lọc trạng thái
  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1); // Reset về trang 1 khi thay đổi bộ lọc
  };

  // Xử lý thay đổi bộ lọc loại
  const handleTypeFilterChange = (e) => {
    setTypeFilter(e.target.value);
    setCurrentPage(1); // Reset về trang 1 khi thay đổi bộ lọc
  };

  // Reset lại các bộ lọc
  const handleResetFilters = () => {
    setStatusFilter("all");
    setTypeFilter("all");
    setCurrentPage(1);
  };

  // Lọc dữ liệu theo các bộ lọc đã chọn
  const filteredData = requestData.filter(item => {
    // Lọc theo trạng thái
    const statusMatch = statusFilter === "all" || 
      item.status.toLowerCase() === statusFilter.toLowerCase();
    
    // Lọc theo loại
    const typeMatch = typeFilter === "all" || 
      item.typeOf === typeFilter;
    
    // Trả về true nếu tất cả các điều kiện đều khớp
    return statusMatch && typeMatch;
  });

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

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h2 className="text-lg font-semibold mb-2 sm:mb-0">List of request</h2>
        
        <div className="flex flex-wrap gap-2">
          {/* Bộ lọc theo trạng thái */}
          <select 
            className="px-2 py-1 focus:outline-none border rounded"
            value={statusFilter}
            onChange={handleStatusFilterChange}
          >
            <option value="all">All Status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
          
          {/* Bộ lọc theo loại */}
          <select 
            className="px-2 py-1 focus:outline-none border rounded"
            value={typeFilter}
            onChange={handleTypeFilterChange}
          >
            <option value="all">All Types</option>
            {getUniqueTypes().map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          
          {/* Nút reset bộ lọc */}
          <button 
            className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
            onClick={handleResetFilters}
          >
            Reset Filters
          </button>
        </div>
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
            {currentItems.length > 0 ? (
              currentItems.map((item, index) => (
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
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-3 py-4 text-center">
                  No requests matching your filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Thông tin về kết quả lọc */}
      <div className="text-sm text-gray-500 mt-2">
        Showing {currentItems.length} of {filteredData.length} requests
      </div>

      {/* Component phân trang */}
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