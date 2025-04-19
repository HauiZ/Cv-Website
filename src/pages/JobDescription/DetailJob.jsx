import React from "react";

export default function DetailJob({data}) {
  const content = data?.introduction || ["Công ty chưa có thông tin giới thiệu"];
  return (
    <div className="w-[38rem] h-[30rem] rounded-[1em] bg-white">
      {/* banner */}
      <div className="w-full h-12 rounded-t-[1em] bg-gradient-to-r from-[#213E42] to-[#5DCC7C] flex items-center p-5">
        <h1
          className="text-white text-2xl
        "
        >
          Chi tiết tin tuyển dụng
        </h1>
      </div>
      <div className="content p-5 text-[0.95rem] space-y-3 leading-relaxed">
        {content.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}
