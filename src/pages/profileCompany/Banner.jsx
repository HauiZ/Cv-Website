import React from "react";
import background from "../../assets/image/background_ColorGreen.png";
import defaultLogo from "../../assets/image/icon_webCV.png"

export default function Banner({ data }) {
  // Check if data exists and has necessary properties
  const isDataLoaded = data && data.name && data.field && data.companySize;
  
  // Use default values if data is not loaded
  const companyName = isDataLoaded ? data.name : "Thông tin công ty";
  const companyField = isDataLoaded ? data.field : "Chưa có thông tin";
  const companySize = isDataLoaded ? `${data.companySize} nhân viên` : "Chưa cập nhật";
  const logoImage = (isDataLoaded && data.logoUrl) ? data.logoUrl : defaultLogo;

  return (
    <div className="flex mt-10">
      <div className="content w-full relative ">
        <div
          className="background bg-amber-800 h-[10rem] rounded-t-2xl"
          style={{  
            backgroundImage: `url(${background})`,
          }}
        ></div>
        <div className="brifdes h-[5rem] bg-gradient-to-r from-[#213E42] to-[#5DCC7C] flex items-center justify-center rounded-b-2xl">
          <div className="w-fit">
            <div>
              <h1 className="text-2xl text-white mb-1.5">{companyName}</h1>
            </div>
            <div className="flex justify-center gap-5 gap-x-10">
              <span>
                <h2 className="text text-white">{companyField}</h2>
              </span>
              <span>
                <h2 className="text-white">{companySize}</h2>
              </span>
            </div>
          </div>
        </div>
        <span className="logo absolute w-[8rem] h-[8rem] bg-blue-700 top-[35%] left-[5vh]">
          <img src={logoImage} alt="Company logo" className="h-full object-cover w-full" />
        </span>
      </div>
    </div>
  );
}