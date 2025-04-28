import React from "react";
import TemplateContent from "./TemplateContent";
import { useNavigate } from "react-router-dom";
export default function TemplateCV() {
  const navigate = useNavigate();
  return (
    <div onClick={()=>{navigate('/createCV')}}>
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
