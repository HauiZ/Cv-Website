import React, { useMemo } from "react";
import JobItem from "../home/component/ListJob/JobItem";
import useCustomFetch from "../../hooks/useCustomFetch";
import { fetchAllNewsFilterApi } from "../../services/recruitmentNewsApi";
import { ArrowRight } from "lucide-react";
export default function HintNews() {
  // Dùng useMemo để tạo filters chỉ khi dependencies thay đổi
  const filters = useMemo(() => {
    return {};
  }, []);

  const {
    data: jobs,
    loading,
    error,
  } = useCustomFetch(fetchAllNewsFilterApi, [filters]);

  return (
    <div className="w-[20rem] h-fit bg-white rounded-[.5em] p-4">
      <div className="text-2xl font-bold mb-3">
        <h1>Gợi ý công việc</h1>
      </div>
      <div className="flex justify-center">
        {loading ? (
          <div>Đang tải dữ liệu...</div>
        ) : error ? (
          <div>Có lỗi: {error}</div>
        ) : (
          <div className="flex flex-col gap-4">
            {jobs?.slice(0, 3).map((job) => (
              <JobItem key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
      <a href="/search">
        <div className="text-green-500 flex justify-center mt-3 hover:text-black">
          <h2>Xem thêm </h2>
          <div className="mt-1 ml-1">
            <ArrowRight size={15} />
          </div>
        </div>
      </a>
    </div>
  );
}
