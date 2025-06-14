import React, { useState, useEffect } from "react";
import { Select } from "antd";
import { FaListUl } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import useCustomFetch from "../../hooks/useCustomFetch";
import { fetchAreaApi } from "../../services/userApi";
import  jobCategories  from "../JobCategories";

function Search({ onSearch, initialValues = {} }) {
  const [keyword, setKeyword] = useState(initialValues.keyword || "");
  const [profession, setProfession] = useState(
    initialValues.profession?.[0] || ""
  );
  const [area, setArea] = useState(initialValues.area || "");
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch API data
  const { data: areaData, loading } = useCustomFetch(fetchAreaApi);
  const [provinceOptions, setProvinceOptions] = useState([]);

  useEffect(() => {
    if (areaData) {
      // Tổ chức dữ liệu cho Select component
      const options = areaData.map((item) => ({
        value: item.province,
        label: <span>{item.province}</span>,
      }));

      setProvinceOptions(options);
    }
  }, [areaData]);

  useEffect(() => {
    setKeyword(initialValues.keyword || "");
    setProfession(initialValues.profession?.[0] || "");
    setArea(initialValues.area || "");
  }, [initialValues]);

  const ListJob = () => (
    <Select
      defaultValue="Danh mục nghề"
      prefix={<FaListUl />}
      size="large"
      style={{ width: 200 }}
      value={profession || undefined}
      onChange={setProfession}
      options={jobCategories}
    />
  );

  const ListLocation = () => (
    <Select
      defaultValue="Địa điểm"
      prefix={<IoLocationSharp />}
      size="large"
      style={{ width: 200 }}
      value={area || undefined}
      onChange={setArea}
      loading={loading}
      options={provinceOptions}
    />
  );

  const handleSubmit = () => {
    const searchParams = {
      keyword,
      profession: profession ? [profession] : [],
      area,
    };

    if (location.pathname === "/search") {
      // Nếu đang ở trang tìm kiếm, chỉ cần gọi onSearch
      onSearch(searchParams);
    } else {
      // Nếu đang ở trang chủ, điều hướng đến trang tìm kiếm
      const queryParams = new URLSearchParams(searchParams).toString();
      navigate(`/search?${queryParams}`);
    }
  };

  return (
    <div className="w-[1100px] h-[60px] bg-white rounded-[100px] flex flex-row justify-center items-center gap-x-10">
      <div className="w-[200px] bg-white">
        <ListJob />
      </div>
      <input
        type="text"
        placeholder="Vị trí tuyển dụng & tên công ty"
        className="w-[330px] h-[50px] focus:outline-0"
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
      />
      <div className="w-[250px] bg-white">
        <ListLocation />
      </div>
      <button
        className="w-[150px] h-[40px] px-4 py-2 ml-3 rounded-[20px] font-semibold items-center
                justify-between text-[white] bg-[#5DDA33] hover:bg-[#33da6d] hover:text-[white] transition-all ease-in "
        onClick={handleSubmit}
      >
        Tìm kiếm
      </button>
    </div>
  );
}

export default Search;
