import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import defaultLogo from "../../assets/image/logoNoBg.png";
export default function CompanyIntroduction({ data }) {
  const logoImage = data?.logoUrl || defaultLogo;
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
        <div className="flex justify-center gap-x-2">
          <h1>
            <a href={path} className="text-green-500">
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
