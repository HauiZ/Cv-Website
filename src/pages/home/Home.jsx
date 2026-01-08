// src/pages/home/Home.jsx
import ListJobBox from "./component/ListJob/Listjob";
import BrandList from "./component/BrandList/BrandList";
import Topjob from "./component/Topjob/Topjob";
import Topbrand from "./component/Topjob/Topbrand";
import Slider from "./component/Slider/Slider";
import { FaAngleRight } from "react-icons/fa6";
import Hotline from "./component/HotLine/HotLine";
import Search from "../../components/Search/Search";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import UpdateProfilePopup from "./component/UpdateProfilePopup";

import background_ColorGreen from "../../assets/image/background_ColorGreen.png";
import { useState } from "react";

const Mix = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState();
  const handleProfessionClick = (keyword) => {
    navigate(`/search?profession=${encodeURIComponent(keyword)}`);
  };
  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="flex flex-col justify-center items-center gap-y-1">
      <h1 className="text-2xl text-white font-semibold mt-2 mb-2 animate-pulse">
        Tìm việc làm nhanh, việc làm mới nhất trên toàn quốc
      </h1>
      <Search onSearch={handleFilterChange}
        initialValues={{
          keyword: filters
        }} />
      <div className="flex justify-center mt-2 gap-x-10">
        <div className="w-[300px] h-[240px] bg-white rounded-2xl shadow-md">
          <ul className="space-y-3 ml-3 pr-3 py-4">
            {[
              { title: "Công nghệ thông tin", keyword: "Công nghệ thông tin" },
              { title: "Kinh doanh - Bán hàng", keyword: "Thương mại" },
              { title: "Truyền hình - Viễn Thông", keyword: "Viễn thông" },
              { title: "Tài chính - Ngân hàng", keyword: "Ngân hàng" },
              { title: "Marketing - Quảng cáo", keyword: "Marketing" },
              { title: "Nhân sự - Hành chính", keyword: "Nhân sự" },
            ].map((items, index) => (
              <li key={index}>
                <div
                  className="hover:text-[#5DDA33] flex justify-between cursor-pointer"
                  onClick={() => handleProfessionClick(items.keyword)}
                >
                  <span className="font-semibold">{items.title}</span>
                  <FaAngleRight className="text-[#D9D9D9]" />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-[600px] h-[240px] relative rounded-2xl shadow-md">
          <Slider />
        </div>
      </div>
    </div>
  );
};


function Home() {
  const { user } = useAuthContext();

  const isProfileIncomplete =
    user &&
    (!user.skills ||
      !user.yearsExperience ||
      !user.location);
  return (
    <>
      <div
        className="w-full h-[400px] bg-cover pt-[10px]"
        style={{ backgroundImage: `url(${background_ColorGreen})` }}
      >
        <Mix />
      </div>
      <div className="w-full h-fit bg-[#F5F5F5]">
        <ListJobBox />
      </div>
      <div className="w-full h-[75rem]">
        <BrandList />
        <Topjob />
        <Topbrand />
      </div>
      <Hotline />
      <div className="w-full h-[50px]" />
      <UpdateProfilePopup show={isProfileIncomplete} />
    </>
  );
}

export default Home;
