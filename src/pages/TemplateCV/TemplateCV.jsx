import React from "react";
import TemplateContent from "./TemplateContent";
export default function TemplateCV() {
  return (
    <div>
      {/* banner */}
      <div className="w-screen">
        <img
          src="src/assets/image/BannerTemplateCv.png"
          alt="banner"
          className="w-full"
        />
      </div>
      <div className="flex justify-center my-[5em]">
        <TemplateContent></TemplateContent>
      </div>
      <div className="flex justify-center mb-10">
        <div>
          <img src="src/assets/image/BannerTemplateCvBottom.png" className="object-center w-[73rem] rounded-[1em]" />
        </div>
      </div>
    </div>
  );
}
