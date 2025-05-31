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

  const renderSection = (title, content) => (
    <div className="space-y-2 pl-2">
      <div className="flex items-center space-x-2">
        <div className="w-2 h-5 bg-green-500 "></div>
        <h2 className="text-[1.425rem] font-semibold text-[#212f3f]">{title}</h2>
      </div>
      {Array.isArray(content)
        ? content.map((item, idx) => (
            <p key={idx} className="text-[#333] ml-7 break-words">- {item}</p>
          ))
        : <pre className="text-[#333] font-sans ml-7 break-words whitespace-pre-wrap">{content || "Không có thông tin"}</pre>}
    </div>
  );

  return (
    <div className="w-[38rem] max-h-fit rounded-[1em] bg-white shadow-md">
      {/* Banner */}
      <div className="w-full h-12 rounded-t-[1em] bg-gradient-to-r from-[#213E42] to-[#5DCC7C] flex items-center p-5">
        <h1 className="text-white text-2xl">Chi tiết tin tuyển dụng</h1>
      </div>

      {/* Nội dung */}
      <div className="p-10 p-x-15 text-[0.95rem] space-y-5 leading-relaxed">
        {/* {renderSection("Giới thiệu", introduction)} */}
        {renderSection("Yêu cầu công việc", jobRequirements)}
        {renderSection("Chi tiết công việc", workDetail)}
        {renderSection("Quyền lợi", benefits)}
        {renderSection("Bằng cấp yêu cầu", degree)}
        {renderSection("Địa điểm làm việc", jobAddress)}
        {renderSection("Ngày bắt đầu", moment(workDateIn).format("YYYY-MM-DD HH:mm"))}

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
              height="300"
              src={`${videoUrl}?rel=0&modestbranding=1&showinfo=0&cc_load_policy=0&iv_load_policy=3&autohide=1&controls=1&disablekb=1&playsinline=1`}
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
