import React from "react";
import Banner from "./Banner";
import ProfileIntroduction from "./ProfileIntroduction";
import ContractInfo from "./ContractInfo";
import Recruitments from "./Recruitments";
import BrandList from "../home/component/BrandList/BrandList";
import useCustomFetch from "../../hooks/useCustomFetch";
import { fetchCompanyInfoApi } from "../../services/recruiterApi"; // Import the fetch function
import { useParams } from "react-router-dom";

export default function ProfileCompany() {
  const params = useParams(); // Get the URL parameters
  const { companyId } = params;
  const { data } = useCustomFetch(fetchCompanyInfoApi, [companyId]); // Fetch company data using the custom hook
  const { companyData, jobs } = data || {}; // Destructure data to get
  console.log(">>>>>>>>>>>>Company Data:", companyData);
  return (
    <div className="flex justify-center bg-[#F5F5F5]">
      <div className="w-[80vw] max-w-[60rem]">
        <div className="">
          <Banner data={companyData}></Banner>
        </div>
        <div className="flex justify-center gap-x-15 ">
          <div>
            <ProfileIntroduction data={companyData}></ProfileIntroduction>
            <div className="w-[35rem]">
              <Recruitments data={jobs} />
            </div>
          </div>
          <div>
            <ContractInfo data={companyData}></ContractInfo>
          </div>
        </div>
        <div className="w-full h-fit mb-15">
          <BrandList />
        </div>
      </div>
    </div>
  );
}
