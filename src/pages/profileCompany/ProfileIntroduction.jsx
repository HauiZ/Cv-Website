import React from "react";

export default function ProfileIntroduction({data}) {
  const content = data?.introduction || ["Công ty chưa có thông tin giới thiệu"];
  const renderContent = Array.isArray(content) ? content.join(' ') : content;
  return (
    <div className="w-[33rem] h-fit  mt-5 rounded-[1em] bg-white">
      {/* banner */}
      <div className="w-full h-15 rounded-t-[1em] bg-gradient-to-r from-[#213E42] to-[#5DCC7C] flex items-center p-5">
        <h1
          className="text-white text-2xl
        "
        >
          Giới thiệu công ty
        </h1>
      </div>
      <div className="content p-5 text-[0.95rem] space-y-3 leading-relaxed">
        <p>{renderContent}</p>
      </div>
    </div>
  );
}
