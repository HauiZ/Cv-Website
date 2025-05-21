import React from "react";
import defaultLogo from "../../../../../assets/image/logoNoBg.png";
export default function CompanyIntroduction({ data }) {
  const logoImage = data?.companyLogo || defaultLogo;
  const path = `/companyprofile/${data?.id}`;
  return (
    <div>
      {/* content left */}
      <div className="flex flex-col p-6 gap-y-5 bg-white w-[18rem] h-fit">
        <div className="flex justify-between ">
          {/* logo name */}
          <div className="logo w-[6rem] h-[6rem]">
            <img src={logoImage} alt="" />
          </div>
          {/* Name bussines */}
          <div className="flex items-center font-bold">
            <h1>{data?.companyName || "Công ty"}</h1>
          </div>
        </div>
        {/* quy mo linh vuc */}
        <div>
          <h1>
            <span className="font-semibold">Quy mô: </span>
            {data?.companySize || "Chưa có thông tin"}
          </h1>
          <h1>
            <span className="font-semibold">Lĩnh vực:</span>{" "}
            {data?.field || "Chưa có thông tin"}
          </h1>
          <h1>
            <span className="font-semibold">Địa điểm:</span>{" "}
            {data?.companyAddress || "Chưa có thông tin"}
          </h1>
        </div>
      </div>
    </div>
  );
}
