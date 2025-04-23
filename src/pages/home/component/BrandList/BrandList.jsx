import React from "react";
import BrandListbox from "./BrandListbox";
import background from "../../../../assets/image/Thuonghieulon.png"
const BrandList = () => {
  return (
    <div className="flex justify-center mt-10">
      <div className="w-[980px] h-fit rounded-2xl shadow-2xl py-5">
        <div>
          <img
            src={background}
            className="w-full rounded-t-2xl"
            alt=""
          />
        </div>
        <div className="flex justify-center mt-10 ml-2">
          <BrandListbox />
        </div>
      </div>
    </div>
  );
};
export default BrandList;
