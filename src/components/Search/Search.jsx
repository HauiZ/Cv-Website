
import React, { useState, useEffect } from "react";
import { Select } from 'antd';

import { FaListUl } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";

function Search({ onSearch, initialValues = {} }) {
  const [keyword, setKeyword] = useState(initialValues.keyword || "");
  const [profession, setProfession] = useState(
    initialValues.profession?.[0] || ""
  );
  const [area, setArea] = useState(initialValues.area || "");
  const navigate = useNavigate();
  const location = useLocation(); // Lấy thông tin vị trí hiện tại
  
    useEffect(() => {
        setKeyword(initialValues.keyword || '');
        setProfession(initialValues.profession?.[0] || '');
        setArea(initialValues.area || '');
    }, [initialValues]);

    const ListJob = () => (
        <Select
            defaultValue="Danh mục nghề"
            prefix={<FaListUl />}
            size="large"
            style={{ width: 200 }}
            value={profession || undefined}
            onChange={setProfession}
            options={[
                {
                    label: <span>Công nghệ & Kỹ thuật</span>,
                    options: [{ value: 'Công nghệ thông tin', label: <span>Công nghệ thông tin</span> }],
                },
                {
                    label: <span>Kinh doanh & Dịch vụ</span>,
                    options: [
                        { value: 'Kinh doanh/Bán hàng', label: <span>Kinh doanh/Bán hàng</span> },
                        { value: 'Chăm sóc khách hàng', label: <span>Chăm sóc khách hàng</span> },
                        { value: 'Marketing/Quảng cáo', label: <span>Marketing/Quảng cáo</span> },
                    ],
                },
                {
                    label: <span>Tài chính & Quản lý</span>,
                    options: [
                        { value: 'Tài chính/Ngân hàng', label: <span>Tài chính/Ngân hàng</span> },
                        { value: 'Kế toán/Kiểm toán', label: <span>Kế toán/Kiểm toán</span> },
                    ],
                },
                {
                    label: <span>Xây dựng & Bất động sản</span>,
                    options: [{ value: 'Bất động sản/Xây dựng', label: <span>Bất động sản/Xây dựng</span> }],
                },
            ]}
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
      options={[
        {
          label: <span>Miền Bắc</span>,
          options: [
            { value: "Hà Nội", label: <span>Hà Nội</span> },
            { value: "Hải Phòng", label: <span>Hải Phòng</span> },
            { value: "Quảng Ninh", label: <span>Quảng Ninh</span> },
          ],
        },
        {
          label: <span>Miền Trung</span>,
          options: [
            { value: "Đà Nẵng", label: <span>Đà Nẵng</span> },
            { value: "Thừa Thiên Huế", label: <span>Thừa Thiên Huế</span> },
            { value: "Thanh Hóa", label: <span>Thanh Hóa</span> },
          ],
        },
        {
          label: <span>Miền Nam</span>,
          options: [
            { value: "TP. Hồ Chí Minh", label: <span>TP. Hồ Chí Minh</span> },
            { value: "Bình Dương", label: <span>Bình Dương</span> },
            { value: "Đồng Nai", label: <span>Đồng Nai</span> },
          ],
        },
      ]}
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
