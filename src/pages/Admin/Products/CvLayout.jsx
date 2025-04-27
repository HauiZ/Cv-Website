import React from "react";
import TemplateCv from "./TemplateCv";
export default function CvLayout() {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-10 w-fit">
        {/* {currentJobs.map((cv) => (
          <TemplateCv key={cv.id} job={cv} />
        ))} */}
        <TemplateCv></TemplateCv>
        <TemplateCv></TemplateCv>
        <TemplateCv></TemplateCv>
        <TemplateCv></TemplateCv>
        <TemplateCv></TemplateCv>
        <TemplateCv></TemplateCv>
      </div>
    </div>
  );
}
