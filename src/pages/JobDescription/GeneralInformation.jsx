import React from "react";

export default function GeneralInformation({ data, degree }) {
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
      <div className=" content p-5 text-[0.95rem] space-y-3 leading-relaxed">
        <h1>
          {" "}
          <span className="font-semibold">Cấp Bậc: </span>
          {data?.jobLevel || "Nhân viên"}{" "}
        </h1>
        <h1>
          {" "}
          <span className="font-semibold">Học vấn: </span>
          { degree }
        </h1>
        <h1>
          {" "}
          <span className="font-semibold">Số lượng tuyển: </span>
          {data?.candidateNumber || "1"}
        </h1>
        <h1>
          {" "}
          <span className="font-semibold">Hình thứclàm việc: </span>{" "}
          {data?.workType || "Thương lượng"}
        </h1>
        <h1>
          {" "}
          <span className="font-semibold">Giới tính: </span>
          {data?.sex || "Nam/Nữ"}
        </h1>
      </div>
    </div>
  );
}
