import React from "react";
import moment from "moment";

export default function DetailJob({ data }) {
  if (!data) return null;

  const {
    // introduction = ["Công ty chưa có thông tin giới thiệu"],
    jobRequirements,
    workDetail,
    benefits,
    degree,
    jobAddress,
    workDateIn,
    contactInfo,
    contactAddress,
    contactPhone,
    contactEmail,
    videoUrl,
  } = data;

  const renderSection = (title, content) => (    <div className="space-y-2 pl-2">      <div className="flex items-center space-x-2">
        <div className="w-1.5 h-4 bg-green-500 "></div>
        <h2 className="text-[1.2rem] font-semibold text-[#212f3f]">{title}</h2>
      </div>
      {Array.isArray(content)
        ? content.map((item, idx) => (
            <p key={idx} className="text-[#333] ml-5 text-sm whitespace-pre-wrap break-words">- {item}</p>
          ))
        : <pre className="text-[#333] text-sm font-sans ml-5 whitespace-pre-wrap break-words">{content || "Không có thông tin"}</pre>}
    </div>
  );

  return (
    <div className="w-[38rem] max-h-fit rounded-[1em] bg-white shadow-md">
      {/* Banner */}
      <div className="w-full h-12 rounded-t-[1em] bg-gradient-to-r from-[#213E42] to-[#5DCC7C] flex items-center p-5">
        <h1 className="text-white text-2xl">Chi tiết tin tuyển dụng</h1>
      </div>

      {/* Nội dung */}      <div className="p-6 p-x-10 text-[0.95rem] space-y-4 leading-relaxed">
        {/* {renderSection("Giới thiệu", introduction)} */}
        {renderSection("Yêu cầu công việc", jobRequirements)}
        {renderSection("Chi tiết công việc", workDetail)}
        {renderSection("Quyền lợi", benefits)}
        {renderSection("Bằng cấp yêu cầu", degree)}
        {renderSection("Địa điểm làm việc", jobAddress)}
        {renderSection("Ngày bắt đầu", data.workDateInDisplay || moment(workDateIn).format("DD/MM/YYYY"))}

        <div className="space-y-2 pl-2">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-5 bg-green-500 "></div>
            <h2 className="text-[1.425rem] font-semibold text-[#212f3f]">Thông tin liên hệ</h2>
          </div>
          <p className="ml-7"><strong>Người liên hệ:</strong> {contactInfo || "Không có"}</p>
          <p className="ml-7"><strong>Địa chỉ:</strong> {contactAddress || "Không có"}</p>
          <p className="ml-7"><strong>SĐT:</strong> {contactPhone || "Không có"}</p>
          <p className="ml-7"><strong>Email:</strong> {contactEmail || "Không có"}</p>
        </div>

        {videoUrl && (
          <div className="space-y-2 pl-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-5 bg-green-500 rounded-sm"></div>
              <h2 className="text-[1.425rem] font-semibold text-[#212f3f]">Video giới thiệu</h2>
            </div>
            <iframe
              width="100%"
              height="200"
              src={videoUrl}
              title="Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-md ml-7"
            ></iframe>  
          </div>
        )}
      </div>
    </div>
  );
}
