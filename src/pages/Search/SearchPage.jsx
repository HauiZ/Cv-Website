import { useState, useEffect, useMemo } from "react";
import { Loader2 } from "lucide-react";
import Search from "../../components/Search/Search";
import FilterSidebar from "./FilterSidebar";
import ListJobFilter from "./ListJobFilter";
import background from "../../assets/image/background_ColorGreen.png";
import { fetchAllNewsFilterApi } from "../../services/recruitmentNewsApi";
import useCustomFetch from "../../hooks/useCustomFetch";
import { Select } from "antd";
import { useLocation } from "react-router-dom";

export default function SearchPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialProfession = queryParams.get("profession") || "";
  const initialKeyword = queryParams.get("keyword") || "";
  const initialArea = queryParams.get("area") || "";
  const [filterHovered, setFilterHovered] = useState(false);
  const [jobListHovered, setJobListHovered] = useState(false);

  const [filters, setFilters] = useState({
    keyword: initialKeyword ? initialKeyword : "",
    profession: initialProfession ? [initialProfession] : [],
    area: initialArea ? initialArea : "",
    experience: "",
    jobLevel: "",
    salaryMin: null,
    salaryMax: null,
    salaryRange: "",
    workType: "",
    companyIndustry: "",
    sortBy: "datePosted",
    order: "DESC",
  });

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleSortChange = (value) => {
    let sortBy = "datePosted";
    let order = "DESC";

    if (value === "salary") {
      sortBy = "salary";
      order = "DESC";
    } else if (value === "experience") {
      sortBy = "experience";
      order = "DESC";
    } else if (value === "date") {
      sortBy = "datePosted";
      order = "DESC";
    }

    setFilters((prev) => ({
      ...prev,
      sortBy,
      order,
    }));
  };

  const filterParams = useMemo(() => {
    const params = {};
    if (filters.keyword) params.keyword = filters.keyword;
    if (filters.profession?.length)
      params.profession = filters.profession.join(",");
    if (filters.area) params.area = filters.area;
    if (filters.experience && filters.experience !== "Tất cả")
      params.experience = filters.experience;
    if (filters.jobLevel && filters.jobLevel !== "Tất cả")
      params.jobLevel = filters.jobLevel;
    if (filters.salaryMin != null) params.salaryMin = filters.salaryMin;
    if (filters.salaryMax != null) params.salaryMax = filters.salaryMax;
    if (filters.workType && filters.workType !== "Tất cả")
      params.workType = filters.workType;
    if (filters.companyIndustry)
      params.companyIndustry = filters.companyIndustry;
    if (filters.sortBy) params.sortBy = filters.sortBy;
    if (filters.order) params.order = filters.order;
    return params;
  }, [filters]);

  const {
    data: jobs = [],
    loading,
    error,
  } = useCustomFetch(fetchAllNewsFilterApi, [filterParams]);

  return (
    <div>
      {/* Banner + Search Form */}
      <div
        className="flex justify-center items-center h-[7rem] bg-cover bg-center rounded-xl"
        style={{
          backgroundImage: `url(${background})`,
        }}
      >
        <Search
          onSearch={handleFilterChange}
          initialValues={{
            keyword: filters.keyword,
            profession: filters.profession,
            area: filters.area,
          }}
        />
      </div>

      {/* Bộ lọc và danh sách job */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mx-30 relative">
        {/* Sidebar lọc */}
        <div
          className="col-span-1 sticky top-0 h-[100vh] 
                    overflow-hidden hover:overflow-y-scroll 
                    hover:scrollbar hover:scrollbar-w-1 hover:scrollbar-thumb-green-600 hover:scrollbar-track-transparent
                    transition-all duration-500 ease-out scroll-smooth"
        >
          <FilterSidebar
            onFilterChange={handleFilterChange}
            totalJobs={jobs?.length || 0}
            initialFilters={filters}
          />
        </div>

        {/* List job */}
        <div className="col-span-1 md:col-span-3">
          {/* Sort select */}
          <div className="flex items-center justify-between mt-4">
            <h2 className="text-xl font-semibold text-gray-600 ml-5">
              Đã tìm thấy
              <span className="font-semibold text-green-400 underline">
                {" "}
                {jobs?.length}{" "}
              </span>
              việc làm liên quan
            </h2>
            <div className="flex justify-end sticky top-0 bg-white z-10 pb-2">
              <Select
                value={
                  filters.sortBy === "datePosted"
                    ? "date"
                    : filters.sortBy === "salary"
                      ? "salary"
                      : filters.sortBy === "experience"
                        ? "experience"
                        : "date"
                }
                size="large"
                style={{ width: 250 }}
                onChange={handleSortChange}
                options={[
                  { value: "salary", label: "Lương cao đến thấp" },
                  { value: "experience", label: "Kinh nghiệm" },
                  { value: "date", label: "Ngày đăng tuyển" },
                ]}
              />
            </div>
          </div>

          <div
            className="overflow-hidden 
                        transition-all duration-500 ease-out scroll-smooth
                        pb-5"
          >
            {loading ? (
              <div className="flex justify-center items-center h-[400px]">
                <Loader2 size={48} className="animate-spin text-[#00875a]" />
              </div>
            ) : error ? (
              <div className="text-center text-red-500 font-semibold py-8">
                {error?.message || "Đã xảy ra lỗi"}
              </div>
            ) : (
              <ListJobFilter data={jobs} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
