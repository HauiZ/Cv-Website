import React, { useState } from "react";
import TemplateContent from "./TemplateContent";
export default function TemplateCV() {
  const [showTip, setShowTip] = useState(true);
  return (
    <div >
      {/* banner */}
      <div className="w-full bg-gradient-to-r from-green-600 to-green-400 text-white py-10 flex flex-col items-center justify-center shadow-md rounded-b-3xl">
        <h1 className="text-4xl font-bold text-white text-center mb-2 animate-pulse">Kho Mẫu CV Chuyên Nghiệp</h1>
        <p className="text-lg text-green-100">Lựa chọn mẫu phù hợp để nổi bật trước nhà tuyển dụng</p>
      </div>
      <div className="flex justify-center my-[5em]">
        <TemplateContent></TemplateContent>
      </div>

      <div className="relative w-full bg-green-50 py-10 flex flex-col items-center justify-center shadow-inner rounded-t-3xl">
        <h2 className="text-2xl font-semibold text-green-700 mb-2">Bắt đầu hành trình sự nghiệp của bạn ngay hôm nay!</h2>
        <p className="text-sm text-green-500">Tạo CV miễn phí, dễ dàng và nhanh chóng.</p>
        {showTip && (
          <div className="absolute bottom-4 right-4 bg-green-600 text-white p-4 rounded-lg shadow-lg max-w-xs z-20 animate-bounce">
            <button onClick={() => setShowTip(false)} className="absolute top-2 right-2 text-white">✕</button>
            <h4 className="font-bold mb-2">Sẵn Sàng Tỏa Sáng!</h4>
            <p>Một CV ấn tượng là bước đầu tiên để ghi điểm với nhà tuyển dụng. <br />
              Hãy bắt đầu tạo CV của bạn ngay hôm nay — nhanh chóng, dễ dàng, chuyên nghiệp!</p>
          </div>
        )}
      </div>
    </div>
  );
}
