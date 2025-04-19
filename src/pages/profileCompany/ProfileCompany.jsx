import React from "react";
import Banner from "./Banner";
import ProfileIntroduction from "./ProfileIntroduction";
import ContractInfo from "./ContractInfo";
import Recruitments from "./Recruitments";
import BrandList from "../home/component/BrandList/BrandList";
import defaultLogo from "../../assets/image/icon_webCV.png"

import useCustomFetch from "../../hooks/useCustomFetch";
import fetchCompanyInfo from "../../services/recruiterApi"; // Import the fetch function

export default function ProfileCompany() {
  const { data } = useCustomFetch(fetchCompanyInfo, [3]);
  const { companyData, jobs } = data || {}; // Destructure data to get
  const logoImage = companyData?.logoUrl || defaultLogo;
  console.log(">>>>>>>>>>>>Company Data:", companyData);
  return (
    <div className="flex justify-center bg-[#F5F5F5]">
      <div className="w-[80vw]">
        <div className="">
          <Banner data={companyData}></Banner>
        </div>
        <div className="flex justify-between gap-x-5 ">
          <div>
            <ProfileIntroduction data={companyData}></ProfileIntroduction>
          </div>
          <div>
            <ContractInfo data={companyData}></ContractInfo>
          </div>
        </div>
        <div className="w-[33rem]">
          <Recruitments data={jobs} logo={logoImage} />
        </div>
        <div className="w-full h-fit mb-15">
          <BrandList />
        </div>
      </div>
    </div>
  );
}
