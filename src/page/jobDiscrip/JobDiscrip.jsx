import React from "react";
import { FaRegClock, FaMapMarkerAlt, FaDollarSign } from "react-icons/fa";
import Footer from "../../component/Footer/Footer";
import Header1 from "../../component/Header/Header1";
import Search from "../../component/Search/Search";
const JobDiscrip = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header>
        <Header1 />
      </header>

      <div className="p-4 flex justify-center bg-white shadow-md bg-[url('../../image/background_ColorGreen.png')]">
        <div>
          <Search />
        </div>
      </div>

      <div className="container mx-auto mt-6 p-4 grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-lg font-bold">Tên công việc</h2>
          <div className="flex items-center gap-4 text-gray-600 mt-2">
            <span className="flex items-center gap-1"><FaDollarSign /> Mức lương</span>
            <span className="flex items-center gap-1"><FaMapMarkerAlt /> Địa điểm</span>
            <span className="flex items-center gap-1"><FaRegClock /> Kinh nghiệm</span>
          </div>
          <p className="text-gray-500 mt-2">Hạn nộp hồ sơ: xx/xx/xxxx</p>
          <div className="mt-4 flex gap-2">
            <button variant="default">Ứng tuyển ngay</button>
            <button variant="outline">Lưu tin</button>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-bold">Chi tiết tin tuyển dụng:</h3>
            <p className="text-gray-600">(Mô tả công việc)</p>
          </div>
        </div>

        <div className="bg-white p-4 shadow-md rounded-lg">
          <h3 className="font-bold">Thông tin chung</h3>
          <ul className="text-gray-600 mt-2">
            <li>Cấp bậc: ...</li>
            <li>Học vấn: ...</li>
            <li>Số lượng tuyển: ...</li>
            <li>Hình thức làm việc: ...</li>
            <li>Giới tính: ...</li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto mt-6 p-4">
        <h3 className="font-bold text-lg">Việc làm liên quan</h3>
        <div className="grid grid-cols-1 gap-4 mt-4">
          {[1, 2, 3, 4].map((job) => (
            <div key={job} className="bg-white p-4 shadow-md rounded-lg flex justify-between items-center">
              <div>
                <h4 className="font-bold">Tên công việc</h4>
                <p className="text-gray-600">Địa điểm</p>
                <p className="text-sm text-gray-500">Còn x ngày để ứng tuyển</p>
              </div>
              <button variant="default">Ứng tuyển</button>
            </div>
          ))}
        </div>
      </div>


      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default JobDiscrip;
