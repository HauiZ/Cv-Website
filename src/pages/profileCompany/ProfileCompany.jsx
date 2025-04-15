import React from "react";
import Banner from "./Banner";
import ProfileIntroduction from "./ProfileIntroduction";
import ContractInfo from "./ContractInfo";
import Recruitments from "./Recruitments";
import BrandList from "../home/component/BrandList/BrandList";

export default function ProfileCompany() {
  return (
    <div className="flex justify-center bg-[#F5F5F5]">
      <div className="w-[80vw]">
        <div className="">
          <Banner></Banner>
        </div>
        <div className="flex justify-between gap-x-5 ">
          <div>
            <ProfileIntroduction></ProfileIntroduction>
          </div>
          <div>
            <ContractInfo></ContractInfo>
          </div>
        </div>
        <div>
          <Recruitments />
        </div>
        <div className="w-full h-fit mb-15">
            <BrandList />
        </div>
      </div>

    </div>
  );
}
