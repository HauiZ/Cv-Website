import React from "react";

import Search from "../../components/Search/Search";
import background from "../../assets/image/background_ColorGreen.png";
import CompanyIntroduction from "./CompanyIntroduction";
import JobIntroduction from "./JobIntroduction";
import GeneralInformation from "./GeneralInformation";
import DetailJob from "./DetailJob";
import RelativeNews from "./RelativeNews";
export default function JobDescription() {
  return (
    <div>
      {/* Search bar */}
      <div
        className="flex justify-center items-center h-[10rem]"
        style={{
          backgroundImage: `url(${background})`,
        }}
      >
        <Search />
      </div>
      {/* main content */}
      <div className="flex justify-center bg-gray-300">
        <div className="w-[80vw]">
          <div className="flex justify-between gap-x-5 mt-10 mb-10">
            <div>
              <CompanyIntroduction />
            </div>
            <div>
              <JobIntroduction/>
            </div>
          </div>
          <div className="flex justify-between gap-x-5 mb-10">
            <div>
              <GeneralInformation/>
            </div>
            <div> 
              <DetailJob/>
            </div>
          </div>
          <div>
            <RelativeNews/>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
