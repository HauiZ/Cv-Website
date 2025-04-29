import React, { useState, useEffect } from "react";
import { deleteUserApi } from "../../../../services/adminApi";
import useCustomMutation from "../../../../hooks/useCustomMutation";
import Pagination from "../../../home/component/ListJob/Pagination";

const TableContent = ({ data, onUserDeleted }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  // Thêm state cho phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Số lượng mục trên mỗi trang
  const [displayData, setDisplayData] = useState([]);

  const { mutate: deleteUser, loading: deleteLoading } =
    useCustomMutation(deleteUserApi);

  // Tính toán dữ liệu phân trang khi data hoặc currentPage thay đổi
  useEffect(() => {
    if (data && data.length > 0) {
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      setDisplayData(data.slice(indexOfFirstItem, indexOfLastItem));
    } else {
      setDisplayData([]);
    }
  }, [data, currentPage, itemsPerPage]);

  // Tính tổng số trang
  const totalPages = data ? Math.ceil(data.length / itemsPerPage) : 0;

  // Xử lý thay đổi trang
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDeleteClick = (userId) => {
    setSelectedUserId(userId);
    setConfirmDelete(true);
  };

  const handleCancelDelete = () => {
    setConfirmDelete(false);
    setSelectedUserId(null);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteUser(selectedUserId);
      console.log("User deleted successfully:", selectedUserId);
      if (onUserDeleted) {
        onUserDeleted();
      }
      setConfirmDelete(false);
      setSelectedUserId(null);
    } catch (error) {
      console.error("Error deleting user:", error);
      setConfirmDelete(false);
    }
  };

  return (
    <div className="relative">
      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 z-10">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500/80 "></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      className="h-6 w-6 text-red-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Xác nhận xóa
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Bạn có chắc chắn muốn xóa người dùng này? Hành động này
                        không thể hoàn tác.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleConfirmDelete}
                  disabled={deleteLoading}
                >
                  {deleteLoading ? "Đang xóa..." : "Xóa"}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleCancelDelete}
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow-md bg-white">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-700 uppercase">
            <tr>
              <th className="px-4 py-3 border-b">ID</th>
              <th className="px-4 py-3 border-b">Logo</th>
              <th className="px-4 py-3 border-b">Email</th>
              <th className="px-4 py-3 border-b">Role</th>
              <th className="px-4 py-3 border-b">Ngày tham gia</th>
              <th className="px-4 py-3 border-b">Hành động</th>
            </tr>
          </thead>
          <tbody className="stagger-animate">
            {displayData.map((item, index) => (
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
                <td className="px-4 py-3">{item.createAt}</td>
                <td className="px-4 py-3">
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-300"
                    onClick={() => handleDeleteClick(item.id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phân trang */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default TableContent;
