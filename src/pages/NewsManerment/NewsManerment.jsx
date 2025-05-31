import React, { useState, useEffect } from "react";
import ListNews from "./ListNews";
import Pagination from "../home/component/ListJob/Pagination";
import useCustomFetch from "../../hooks/useCustomFetch";
import useCustomMutation from "../../hooks/useCustomMutation";
import { Modal } from "antd";
import { fetchAllNewsApi, deleteRecruitmentNewsApi } from "../../services/recruiterApi";
import { useAuthContext } from "../../contexts/AuthContext";

const ITEMS_PER_PAGE = 4;
export default function NewsManerment({ setFilterWithNews, setNewsId }) {
  const { user } = useAuthContext();
  const { data: fetchedData, loading: fetchLoading, refetch } = useCustomFetch(
    fetchAllNewsApi
  );
  const { mutate: deleteNews } = useCustomMutation(deleteRecruitmentNewsApi);

  const [currentPage, setCurrentPage] = useState(1);
  const jobs = Array.isArray(fetchedData) ? fetchedData : [];
  const totalPages = Math.ceil(jobs.length / ITEMS_PER_PAGE);
  const currentJobs = jobs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );  const handleDeleteNews = (newsIdToDelete, resetPosition) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: `Bạn có chắc chắn muốn xóa tin tuyển dụng số ${newsIdToDelete} không? Hành động này không thể hoàn tác.`,
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onCancel: () => {
        resetPosition?.();
      },
      onOk: async () => {
        try {          await deleteNews(newsIdToDelete);
          refetch();
        } catch (error) {
          console.error("Lỗi khi xóa tin:", error);
          Modal.error({
            title: "Lỗi",
            content: "Không thể xóa tin tuyển dụng. Vui lòng thử lại.",
          });
        }
      },
    });
  };

  return (    <div className="rounded-[.5em] bg-white shadow-md h-fit relative pb-16 max-w-[65rem] mx-auto">
      {/* Header */}
      <div className="pt-4 px-5">
        <h1 className="text-base font-semibold">Quản lý tin tuyển dụng</h1>
      </div>

      {/* Content */}
      <div className="p-3 min-h-[31rem]">
        {jobs.length > 0 ? (
          <>
            <div className="">
              <ListNews
                jobs={currentJobs}
                setFilterWithNews={setFilterWithNews}
                setNewsId={setNewsId}
                onDeleteNews={handleDeleteNews}
              />
            </div>
            {totalPages > 1 && (
              <div className="absolute bottom-3 left-0 right-0 flex justify-center items-center p- bg-white">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-4 text-sm text-gray-600">
            Không có tin tuyển dụng
          </div>
        )}
      </div>
    </div>
  );
}
