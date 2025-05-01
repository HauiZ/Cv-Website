import React, { useState, useEffect } from "react";
import ApplicantCard from "./ApplicantCard";
import useCustomFetch from "../../hooks/useCustomFetch";
import Pagination from "../home/component/ListJob/Pagination";

export default function ApplicantLayout({ funcApi , newsId}) {
    const { data, loading, refetch } = useCustomFetch(funcApi, [newsId]);
    const applicants = Array.isArray(data) ? data : [];

    const [statusFilter, setStatusFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const handleStatusFilterChange = (e) => {
        setStatusFilter(e.target.value);
        setCurrentPage(1); // Reset trang về 1 khi đổi filter
    };

    const filterAppliants = applicants.filter((applicant) => {
        if (statusFilter === "all") return true;
        return applicant.status === statusFilter.toUpperCase();
    });

    const totalPages = Math.ceil(filterAppliants.length / itemsPerPage);
    const currentApplicants = filterAppliants.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="min-w-[20rem] w-full min-h-[35rem] bg-white rounded-[.5em] shadow relative pb-10">
            <div className="p-6 space-y-4 max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold mb-4 text-green-400">Đơn ứng tuyển của doanh nghiệp</h2>

                <div className="flex flex-wrap gap-2 mb-4 justify-end">
                    <select
                        className="px-2 py-1 focus:outline-none border rounded"
                        value={statusFilter}
                        onChange={handleStatusFilterChange}
                    >
                        <option value="all">Tất cả trạng thái</option>
                        <option value="approved">Đã duyệt</option>
                        <option value="pending">Đang chờ</option>
                        <option value="rejected">Từ chối</option>
                    </select>
                </div>

                {loading ? (
                    <p>Đang tải...</p>
                ) : currentApplicants.length > 0 ? (
                    currentApplicants.map((applicant) =>
                        applicant ? <ApplicantCard key={applicant.id} applicant={applicant} refetch={refetch} /> : null
                    )
                ) : (
                    <p>Không có đơn ứng tuyển nào phù hợp.</p>
                )}
                <div className="absolute bottom-0 left-0 w-full mb-5">
                    {totalPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
