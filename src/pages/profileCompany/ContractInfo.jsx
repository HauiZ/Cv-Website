import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faMap } from "@fortawesome/free-solid-svg-icons";
import GoogleMap from "../../components/GoogleMap";
export default function ContractInfo() {
  const address = "dong da hn hai phong binh duong";
  return (
    <div className="w-[22rem] h-fit mt-5 rounded-[1em] bg-white">
      {/* banner */}
      <div className="h-15 rounded-t-[1em] bg-gradient-to-r from-[#213E42] to-[#5DCC7C] flex items-center p-5">
        <h1
          className="text-white text-2xl
        "
        >
          Thông tin liên lạc
        </h1>
      </div>
      <div className="content content p-5 text-[0.95rem] space-y-3 leading-relaxed">
        <div className="flex gap-x-3">
          <FontAwesomeIcon
            icon={faLocationDot}
            className="text-green-500 cursor-pointer text-2xl"
          />
          <h1 className="">Địa chỉ công ty</h1>
        </div>
        <div>
          <p>{address}</p>
        </div>
        <hr className="my-4 border-2 border-t border-gray-300" />
        <div>
          <div className="my-1.5">
            <FontAwesomeIcon
              icon={faMap}
              className="text-green-500 cursor-pointer text-2xl"
            />
          </div>
          <div className="h-[18em] w-[18em] m-auto">
            <GoogleMap placeName="abcd"/>
          </div>
        </div>
      </div>
    </div>
  );
}
