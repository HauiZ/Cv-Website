import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import defaultLogo from "../../assets/image/logoNoBg.png";
export default function CompanyIntroduction({data}) {
    const logoImage = data?.logoUrl || defaultLogo;

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
          <div className="flex items-center">
            <h1>{data?.companyName || "Công ty"}</h1>
          </div>
        </div>
        {/* quy mo linh vuc */}
        <div>
          <h1>Quy mô: {data?.companySize || "Chưa có thông tin"}</h1>
          <h1>Lĩnh vực: {data?.field || "Chưa có thông tin"}</h1>
          <h1>Địa điểm: {data?.companyAddress|| "Chưa có thông tin"}</h1>
        </div>
        <div className="flex justify-center gap-x-2">
          <h1>
            <a href="" className="text-green-500">
              Xem trang công ty
            </a>
          </h1>
          <FontAwesomeIcon
            icon={faArrowUpRightFromSquare}
            className="text-green-500 mt-[.25rem]"
          />
        </div>
      </div>
    </div>
  );
}
