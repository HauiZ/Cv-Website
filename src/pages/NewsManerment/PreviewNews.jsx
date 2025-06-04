// PreviewNews.jsx
import React from "react";
import background from "../../assets/image/background_ColorGreen.png";
import CompanyIntroduction from "../JobDescription/CompanyIntroduction";
import JobIntroduction from "../JobDescription/JobIntroduction";
import GeneralInformation from "../JobDescription/GeneralInformation";
import DetailJob from "../JobDescription/DetailJob";
import './PreviewNews.css';
import { useAuthContext } from "../../contexts/AuthContext";
import Search from "../../components/Search/Search";

const formatDateForDisplay = (dateString) => {
  if (!dateString) return "Chưa cập nhật";
  
  try {
    let date;
    
    // Check if the date is in "YYYY-MM-DD" format
    if (typeof dateString === 'string' && dateString.match(/^\d{4}-\d{2}-\d{2}/)) {
      date = new Date(dateString);
    } else if (dateString instanceof Date) {
      date = dateString;
    } else {
      console.log("Invalid date format:", dateString);
      return "Ngày không hợp lệ";
    }

    // Validate the date
    if (isNaN(date.getTime())) {
      console.log("Invalid date value:", dateString);
      return "Ngày không hợp lệ";
    }

    // Get the date components
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    // Format with padding
    return `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
  } catch (error) {
    console.log("Error formatting date:", error, "for date:", dateString);
    return "Ngày không hợp lệ";
  }
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  
  try {
    // Always return in ISO format for internal use
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "";
    }
    return date.toISOString().split('T')[0];
  } catch (error) {
    return "";
  }
};

export default function PreviewNews({
  formDataForPreview,
  selectedProvinceForPreview,
  selectedDistrictForPreview,
  videoFileForPreview,
  isPreviewMode = false
}) {
  console.log("Giá trị của isPreviewMode trong PreviewNews:", isPreviewMode);

  const { user } = useAuthContext();

  if (!formDataForPreview) {
    return <p>Không có dữ liệu để xem trước.</p>;
  }

  const mapFormDataToPreviewStructure = (form, province, district, video) => {
    console.log("workDateIn value:", form.workDateIn);
    return {
      company: {
        companyLogo: user?.logoUrl,
        companyName: user?.businessName,
        companySize: user?.companySize,
        field: user?.field,
        companyAddress: user?.companyAddress,
        id: user?.id,
      },
      introduce: {
        jobTitle: form.jobTitle,
        salaryRange: form.salary.negotiable
          ? "Thương lượng"
          : form.salary.min && form.salary.max
            ? `${Number(form.salary.min)}-${Number(form.salary.max)}`
            : "Thương lượng",
        address:
          [province?.label].filter(Boolean).join(", ") ||
          "Chưa có thông tin địa chỉ",        experience: form.experience,
        applicationDeadline: formatDateForDisplay(form.applicationDeadline),
      },
      general: {
        deadline: formatDate(form.applicationDeadline),
        workType: form.workType,
        candidateNumber: form.candidateNumber,
        jobLevel: form.jobLevel,
        experience: form.experience,
      },      detailRecruitment: {
        jobAddress: form.jobAddress,
        workType: form.workType,
        candidateNumber: form.candidateNumber,
        jobLevel: form.jobLevel,        experience: form.experience,
        workDateIn: form.workDateIn, // Pass raw date for moment.js to handle
        workDateInDisplay: formatDateForDisplay(form.workDateIn), // Add formatted version for display
        workDetail: form.workDetail,
        jobRequirements: form.jobRequirements,
        benefits: form.benefits,
        degree: form.degree,
        profession: form.profession,
        contactInfo: form.contactInfo.name,
        contactAddress: form.contactInfo.address,
        contactPhone: form.contactInfo.phone,
        contactEmail: form.contactInfo.email,
        videoUrl:
          form.uploadMethod === "link"
            ? form.videoUrl
            : video
              ? URL.createObjectURL(video)
              : null,
      },
    };
  };

  const previewData = mapFormDataToPreviewStructure(
    formDataForPreview,
    selectedProvinceForPreview,
    selectedDistrictForPreview,
    videoFileForPreview
  );

  const { company, general, introduce, detailRecruitment } = previewData;

  return (
    <div className="preview-news-container bg-[#F5F5F5] p-4 md:p-6">
      {!isPreviewMode && (
        <div
          className="flex justify-center items-center h-[10rem]"
          style={{
            backgroundImage: `url(${background})`,
          }}
        >
        </div>
      )}

      <div className={`flex justify-center ${isPreviewMode ? 'bg-[#F5F5F5]' : ''}`}>
        <div className={`${isPreviewMode ? 'w-full' : 'w-[80vw]'}`}>
          <div className="flex flex-col md:flex-row justify-center gap-x-5 mt-5 md:mt-10 mb-5 md:mb-10">
            {company && (
              <div className="w-full md:w-auto">
                <CompanyIntroduction data={company} isPreviewMode={isPreviewMode} />
              </div>
            )}
            <div className="w-full md:w-auto">
              <JobIntroduction data={introduce} jobId={null} isPreviewMode={isPreviewMode} />
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-x-5 mb-5 md:mb-10">
            <div className="w-full md:w-auto">
              <GeneralInformation
                data={general}
                degree={detailRecruitment?.degree || "Đại Học"}
                isPreviewMode={isPreviewMode}
              />
            </div>
            <div className="w-full md:w-auto">
              <DetailJob data={detailRecruitment} isPreviewMode={isPreviewMode} />
            </div>
          </div>
          {detailRecruitment?.profession && (
            <div className="max-w-[59rem] mx-auto">
              <p className="text-center text-gray-500">Tin tuyển dụng liên quan sẽ được hiển thị khi đăng tin.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}