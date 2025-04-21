import React from "react";
import FunctionTopBar from "./FunctionTopBar";
import FunctionLeftBar from "./FunctionLeftBar";
import CvDisplay from "./CvDisplay";

export default function CreateCvPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-100">
      <FunctionTopBar />
      <div className="flex justify-between p-4 mt-10">
        <div className="flex mt-14">
          <FunctionLeftBar />
        </div>
        <div className="w-[54rem] h-[100rem]">
          <CvDisplay />
        </div>
      </div>
    </div>
  );
}
