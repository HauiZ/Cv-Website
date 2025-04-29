import { useState } from 'react';
import { EmailManager } from './QuanLyCV/EmailManager';
import { MailButton } from './QuanLyCV/MailButton';
import { Filter, RefreshCw, ArrowLeft, Link as LinkIcon, Send } from 'lucide-react';

export default function Mail() {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Quản lý Email</h2>

        <div className="flex gap-6">
          {/* Sidebar */}
          {showSidebar && (
            <div className="w-64 border-r border-gray-200 pr-6">
              <div className="mb-6">
                <button
                  className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center justify-center gap-2"
                >
                  <Send size={16} />
                  Soạn thư mới
                </button>
              </div>

              <nav className="space-y-1">
                <a href="#" className="block px-4 py-2 rounded-md bg-green-50 text-green-700 font-medium">
                  Hộp thư đến
                </a>
                <a href="#" className="block px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50">
                  Đã gửi
                </a>
                <a href="#" className="block px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50">
                  Thư nháp
                </a>
                <a href="#" className="block px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50">
                  Quản lý mẫu email
                </a>
                <a href="#" className="block px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50">
                  Thùng rác
                </a>
              </nav>

              <div className="mt-8">
                <h3 className="text-sm font-medium text-gray-500 mb-2 px-4">DỊCH VỤ EMAIL</h3>
                <div className="space-y-1">
                  <div className="px-4 py-2 flex justify-between items-center text-gray-700">
                    <span>Server status</span>
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                  </div>
                  <div className="px-4 py-2 flex justify-between items-center text-gray-700">
                    <span>Dung lượng</span>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">2.4 GB / 10 GB</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowSidebar(false)}
                  className="flex items-center text-gray-500 hover:text-gray-700 px-4 py-2 gap-2"
                >
                  <ArrowLeft size={16} />
                  <span>Thu gọn</span>
                </button>
              </div>
            </div>
          )}

          {/* Main content */}
          <div className={`flex-1 ${!showSidebar ? 'ml-0' : ''}`}>
            {!showSidebar && (
              <button
                onClick={() => setShowSidebar(true)}
                className="mb-4 flex items-center text-gray-500 hover:text-gray-700 gap-2"
              >
                <ArrowLeft className="rotate-180" size={16} />
                <span>Mở rộng</span>
              </button>
            )}

            <EmailManager />
          </div>
        </div>
      </div>
    </div>
  );
}
