import { FaUser, FaList, FaLightbulb, FaFileAlt, FaPlus, FaThumbsUp, FaCog } from 'react-icons/fa';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'bang-tin', icon: <FaList size={18} />, label: 'Bảng tin' },
    { id: 'insights', icon: <FaLightbulb size={18} />, label: 'Insights' },
    { id: 'tin-tuyen-dung', icon: <FaFileAlt size={18} />, label: 'Tin tuyển dụng' },
    { id: 'dang-tin', icon: <FaPlus size={18} />, label: 'Đăng tin' },
    { id: 'cv-de-xuat', icon: <FaThumbsUp size={18} />, label: 'CV đề xuất' },
    { id: 'quan-ly-cv', icon: <FaFileAlt size={18} />, label: 'Quản lý CV' },
    { id: 'bao-cao', icon: <FaFileAlt size={18} />, label: 'Báo cáo tuyển dụng' },
    { id: 'cai-dat', icon: <FaCog size={18} />, label: 'Cài đặt tài khoản' },
  ];

  return (
    <div className="sidebar">
      <div className="user-info p-4 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600">
            28
          </div>
          <div className="ml-3">
            <div className="font-medium">Lê Đức Khánh</div>
            <div className="text-xs text-gray-500">Employer</div>
          </div>
        </div>
      </div>
      <nav className="mt-4">
        {navItems.map((item) => (
          <div
            key={item.id}
            className={`flex items-center p-3 cursor-pointer hover:bg-gray-100 ${
              activeTab === item.id ? 'active-nav-item' : ''
            }`}
            onClick={() => setActiveTab(item.id)}
          >
            <div className="mr-3 text-gray-500">{item.icon}</div>
            <div className="text-sm">{item.label}</div>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
