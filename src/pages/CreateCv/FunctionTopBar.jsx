import React, { useState } from "react";
import { FaEye, FaDownload, FaPenNib } from "react-icons/fa";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { CVPDF } from "./Styles";
import PreviewButton from "./PreviewButton";
import { RiResetLeftFill } from "react-icons/ri";
import { a } from "react-spring";

export default function FunctionTopBar({ formData, color, setFormData, setPrimaryColor }) {
  const [cvName, setCvName] = useState();

  const handleCvNameChange = (event) => {
    setCvName(event.target.value);
  };

  const handleResetForm = (event) => {
    setFormData({
      avatar: "",
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
    setPrimaryColor("#007F00");
    setCvName("");
    console.log(formData)
  };

  return (
    <div className="w-full flex justify-between items-center bg-white px-6 py-3 shadow-sm border-b">
      <div className="flex items-center text-gray-700 font-medium">
        <input
          type="text"
          placeholder="cv chưa đặt tên"
          className="w-32 border-none outline-none font-medium text-gray-700"
          value={cvName}
          onChange={handleCvNameChange}
        />
        <FaPenNib className="text-gray-600 transform -scale-x-100" />
      </div>

      <div className="flex items-center space-x-3">
        <button className="flex w-[8rem] items-center px-4 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition duration-200"
          onClick={handleResetForm}>
          <RiResetLeftFill className="w-5 h-5 mr-2" />
          Làm mới
        </button>

        <PreviewButton formData={formData} primaryColor={color} />

        <PDFDownloadLink
          document={<CVPDF formData={formData} primaryColor={color} />}
          fileName={`${cvName}.pdf`}
          className="flex w-[11rem] items-center gap-2 px-4 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition duration-200"
        >
          {/* {({ loading }) => (
            <>
              <FaDownload />
              <span>{loading ? "Đang tạo..." : "Lưu & tải xuống"}</span>
            </>
          )} */}
          <>
            <FaDownload />
            <span>Lưu & tải xuống</span>
          </>
        </PDFDownloadLink>
      </div>
    </div>
  );
}
