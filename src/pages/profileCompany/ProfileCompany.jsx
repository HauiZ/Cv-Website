import React from "react";
import Banner from "./Banner";
import ProfileIntroduction from "./ProfileIntroduction";
import ContractInfo from "./ContractInfo";
import Recruitments from "./Recruitments";
import BrandList from "../home/component/BrandList/BrandList";
import useCustomFetch from "../../hooks/useCustomFetch";
import {fetchCompanyInfoApi} from "../../services/recruiterApi"; // Import the fetch function

export default function ProfileCompany() {
  const { data } = useCustomFetch(fetchCompanyInfoApi, [3]);
  const { companyData, jobs } = data || {}; // Destructure data to get
  console.log(">>>>>>>>>>>>Company Data:", companyData);
  return (
    <div className="flex justify-center bg-[#F5F5F5]">
      <div className="w-[80vw] max-w-[60rem]">
        <div className="">
          <Banner data={companyData}></Banner>
        </div>
        <div className="flex justify-center gap-x-5 ">
          <div>
            <ProfileIntroduction data={companyData}></ProfileIntroduction>
          </div>
          <div>
            <ContractInfo data={companyData}></ContractInfo>
          </div>
        </div>
        <div className="w-[33rem]">
          <Recruitments data={jobs}  />
        </div>
        <div className="w-full h-fit mb-15">
          <BrandList />
        </div>
      </div>
    </div>
  );
}
