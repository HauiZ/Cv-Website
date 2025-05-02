import React from 'react';

export default function Tips() {
  return (
    <div className="max-w-4xl mx-auto animate-fadeIn">
      <h2 className="text-3xl font-bold text-green-600 mb-6">Mẹo Hữu Ích Khi Tìm Việc</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-green-600 p-4">
            <h3 className="text-xl font-bold text-white">Mạng Lưới Quan Hệ</h3>
          </div>
          <div className="p-4">
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Tham gia các sự kiện networking trong ngành</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Cập nhật LinkedIn thường xuyên và kết nối với các chuyên gia</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Tham gia các nhóm chuyên môn trên Facebook và Linkedin</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Giữ liên lạc với đồng nghiệp cũ và bạn bè trong ngành</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-green-600 p-4">
            <h3 className="text-xl font-bold text-white">Xây Dựng Thương Hiệu Cá Nhân</h3>
          </div>
          <div className="p-4">
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Chia sẻ kiến thức chuyên môn trên các nền tảng xã hội</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Tạo blog cá nhân hoặc portfolio online</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Tham gia diễn giả tại các sự kiện chuyên ngành</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Đóng góp vào các dự án mã nguồn mở (nếu làm IT)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold text-green-600 mb-4">Chiến Lược Tìm Việc Hiệu Quả</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-medium text-gray-800 mb-2">1. Tập trung chất lượng hơn số lượng</h4>
            <p className="text-gray-600">Thay vì gửi CV đại trà đến hàng chục công ty, hãy dành thời gian nghiên cứu kỹ 5-10 công ty phù hợp nhất và điều chỉnh CV + thư xin việc riêng cho từng nơi. Tỷ lệ thành công sẽ cao hơn nhiều.</p>
          </div>
          
          <div>
            <h4 className="text-lg font-medium text-gray-800 mb-2">2. Học kỹ năng mới liên tục</h4>
            <p className="text-gray-600">Dành thời gian học các kỹ năng đang được yêu cầu cao trên thị trường. Các khóa học online như Coursera, LinkedIn Learning hay Udemy là nguồn tài nguyên tuyệt vời với chi phí hợp lý.</p>
          </div>
          
          <div>
            <h4 className="text-lg font-medium text-gray-800 mb-2">3. Sử dụng đa dạng kênh tìm việc</h4>
            <p className="text-gray-600">Ngoài các trang tìm việc phổ biến như VietnamWorks, TopCV, hãy tận dụng LinkedIn, Facebook Jobs, các hội nhóm chuyên ngành và cả các sự kiện tuyển dụng trực tiếp.</p>
          </div>
          
          <div>
            <h4 className="text-lg font-medium text-gray-800 mb-2">4. Chuẩn bị kỹ về công ty trước khi phỏng vấn</h4>
            <p className="text-gray-600">Tìm hiểu sâu về công ty, bao gồm sản phẩm/dịch vụ, văn hóa, thách thức hiện tại và các tin tức gần đây. Điều này sẽ giúp bạn đưa ra câu hỏi thông minh và gây ấn tượng với nhà tuyển dụng.</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold text-green-600 mb-4">Những Sai Lầm Cần Tránh</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-red-200 rounded-lg p-4 bg-red-50">
            <div className="flex items-center mb-2">
              <svg className="h-5 w-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <h4 className="font-medium text-gray-800">Sử dụng CV chung cho mọi công việc</h4>
            </div>
            <p className="text-gray-600 text-sm">Mỗi vị trí có yêu cầu khác nhau. Hãy điều chỉnh CV của bạn để phù hợp với từng vị trí ứng tuyển.</p>
          </div>
          
          <div className="border border-red-200 rounded-lg p-4 bg-red-50">
            <div className="flex items-center mb-2">
              <svg className="h-5 w-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <h4 className="font-medium text-gray-800">Không chuẩn bị câu hỏi cho phỏng vấn</h4>
            </div>
            <p className="text-gray-600 text-sm">Không đặt câu hỏi cho người phỏng vấn sẽ thể hiện sự thiếu quan tâm đến công ty và vị trí.</p>
          </div>
          
          <div className="border border-red-200 rounded-lg p-4 bg-red-50">
            <div className="flex items-center mb-2">
              <svg className="h-5 w-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <h4 className="font-medium text-gray-800">Nói xấu công ty/sếp cũ</h4>
            </div>
            <p className="text-gray-600 text-sm">Điều này thể hiện tính chuyên nghiệp kém và có thể khiến nhà tuyển dụng lo ngại về thái độ làm việc của bạn.</p>
          </div>
          
          <div className="border border-red-200 rounded-lg p-4 bg-red-50">
            <div className="flex items-center mb-2">
              <svg className="h-5 w-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <h4 className="font-medium text-gray-800">Thông tin sai sự thật</h4>
            </div>
            <p className="text-gray-600 text-sm">Nói dối về kinh nghiệm hay kỹ năng có thể được phát hiện trong quá trình phỏng vấn hoặc thử việc và gây hậu quả nghiêm trọng.</p>
          </div>
        </div>
      </div>
      
      <div className="bg-green-100 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-green-700 mb-3">Nguồn Tài Nguyên Hữu Ích</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded p-4 shadow-sm">
            <h4 className="font-medium text-green-600 mb-2">Trang Web Tìm Việc</h4>
            <ul className="space-y-1 text-gray-700">
              <li>• VietnamWorks - vietnamworks.com</li>
              <li>• TopCV - topcv.vn</li>
              <li>• CareerBuilder - careerbuilder.vn</li>
              <li>• LinkedIn Jobs - linkedin.com/jobs</li>
              <li>• ITViec (cho IT) - itviec.com</li>
            </ul>
          </div>
          
          <div className="bg-white rounded p-4 shadow-sm">
            <h4 className="font-medium text-green-600 mb-2">Khóa Học Online</h4>
            <ul className="space-y-1 text-gray-700">
              <li>• Coursera - coursera.org</li>
              <li>• LinkedIn Learning - linkedin.com/learning</li>
              <li>• Udemy - udemy.com</li>
              <li>• edX - edx.org</li>
              <li>• SkillShare - skillshare.com</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-green-800 font-medium">
            Hãy nhớ rằng, tìm việc là một quá trình đòi hỏi kiên nhẫn và chiến lược. 
            Bạn xứng đáng có một công việc phù hợp với kỹ năng và đam mê của mình!
          </p>
        </div>
      </div>
    </div>
  );
}