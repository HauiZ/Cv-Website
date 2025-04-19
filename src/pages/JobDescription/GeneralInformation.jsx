import React from "react";

export default function GeneralInformation({ data }) {
  const address = data?.companyAddress || "Chưa có thông tin địa chỉ";
  return (
    <div className="w-[18rem] h-fit  rounded-[1em] bg-white">
      {/* banner */}
      <div className="h-12 rounded-t-[1em] bg-gradient-to-r from-[#213E42] to-[#5DCC7C] flex items-center p-5">
        <h1
          className="text-white text-2xl
        "
        >
          Thông tin Chung
        </h1>
      </div>
      <div className=" content p-10 text-[0.95rem] space-y-3 leading-relaxed">
        <h1>Cấp Bậc: {data?.jobLevel || "Nhân viên"} </h1>
        <h1>Học vấn: {data?.degree || "Yêu cầu bằng đại học trở lên"}</h1>
        <h1>Số lượng tuyển: {data?.candidateNumber || "1"}</h1>
        <h1>Hình thức làm việc: {data?.workType || "Thương lượng"}</h1>
        <h1>Giới tính: {data?.sex || "Nam/Nữ"}</h1>
      </div>
    </div>
  );
}
