import React, { useState } from "react";
import FunctionTopBar from "./FunctionTopBar";
import FunctionLeftBar from "./FunctionLeftBar";
import CvDisplay from "./CvDisplay";

export default function CreateCvPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    jobTitle: "",
    motto: "",
    email: "",
    phone: "",
    website: "",
    address: "",
    education: "",
    major: "",
    educationDetails: "",
    skills: "",
    certificates: "",
    experience: "",
    company: "",
    experienceDetails: "",
    activities: "",
    activityDetails: "",
    activityDesc: "",
    hobbies: "",
    awards: "",
    reference: "",
    additionalInfo: ""
  });
  const [primaryColor, setPrimaryColor] = useState("#007F00"); // Default color
  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-100">
      <FunctionTopBar formData={formData} setFormData={setFormData} color={primaryColor} setPrimaryColor={setPrimaryColor}/>
      <div className="flex justify-between p-4 ">
        <div className="flex mt-14">
          <FunctionLeftBar onColorChange={setPrimaryColor} />
        </div>
        <div className="w-[54rem] h-[100rem]">
          <CvDisplay
            formData={formData}
            setFormData={setFormData}
            primaryColor={primaryColor}
          />
        </div>
      </div>
    </div>
  );
}
