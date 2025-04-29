import React, { useState, useEffect } from 'react';
import { FaUser, FaList, FaLightbulb, FaFileAlt, FaPlus, FaThumbsUp, FaCog, FaIdCard, FaAngleDown, FaAngleRight, FaShieldAlt, FaBell, FaLock, FaPaintBrush, FaEnvelope } from 'react-icons/fa';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Automatically open the settings dropdown if a settings tab is active
  useEffect(() => {
    if (activeTab === 'cai-dat' || activeTab === 'quan-ly-thong-tin' || window?.settingsTab) {
      setSettingsOpen(true);
    }
  }, [activeTab]);

  const mainNavItems = [
    { id: 'bang-tin', icon: <FaList size={18} />, label: 'Bảng tin' },
    { id: 'insights', icon: <FaLightbulb size={18} />, label: 'Insights' },
    { id: 'tin-tuyen-dung', icon: <FaFileAlt size={18} />, label: 'Tin tuyển dụng' },
    { id: 'dang-tin', icon: <FaPlus size={18} />, label: 'Đăng tin' },
    { id: 'cv-de-xuat', icon: <FaThumbsUp size={18} />, label: 'CV đề xuất' },
    { id: 'quan-ly-cv', icon: <FaFileAlt size={18} />, label: 'Quản lý CV' },
    { id: 'mail', icon: <FaEnvelope size={18} />, label: 'Quản lý Email' },
    { id: 'bao-cao', icon: <FaFileAlt size={18} />, label: 'Báo cáo tuyển dụng' },
  ];

  const settingsItems = [
    { id: 'profile', icon: <FaUser size={16} />, label: 'Hồ sơ cá nhân' },
    { id: 'security', icon: <FaShieldAlt size={16} />, label: 'Bảo mật' },
    { id: 'notifications', icon: <FaBell size={16} />, label: 'Thông báo' },
    { id: 'privacy', icon: <FaLock size={16} />, label: 'Quyền riêng tư' },
    { id: 'appearance', icon: <FaPaintBrush size={16} />, label: 'Giao diện' },
    { id: 'quanlythongtin', icon: <FaIdCard size={16} />, label: 'Quản lý thông tin', active: 'quan-ly-thong-tin' },
  ];

  const handleSettingsItemClick = (id) => {
    // For "Quản lý thông tin", set the active tab directly
    if (id === 'quanlythongtin') {
      setActiveTab('quan-ly-thong-tin');
      return;
    }

    setActiveTab('cai-dat');
    // Pass the settings tab id to the parent component to be used in the CaiDatTaiKhoan component
    if (typeof window !== 'undefined') {
      window.settingsTab = id;
      // Trigger storage event manually so our App.jsx useEffect can react
      window.dispatchEvent(new Event('storage'));
    }
  };

  const isSettingsActive = activeTab === 'cai-dat' || activeTab === 'quan-ly-thong-tin' ||
                          settingsItems.some(item => item.active === activeTab);

  // Determine if a settings item is active
  const isSettingsItemActive = (itemId, itemActive) => {
    // If activeTab is 'quan-ly-thong-tin', only "Quản lý thông tin" is active
    if (activeTab === 'quan-ly-thong-tin' && itemActive === 'quan-ly-thong-tin') return true;

    // If activeTab is 'cai-dat', only the tab specified by window.settingsTab is active
    if (activeTab === 'cai-dat' && window?.settingsTab === itemId) return true;

    return false;
  };

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
        {mainNavItems.map((item) => (
          <div
            key={item.id}
            className={`flex items-center p-3 cursor-pointer hover:bg-gray-100 ${
              activeTab === item.id ? 'active-nav-item' : ''
            }`}
            onClick={() => setActiveTab(item.id)}
          >
            <div className="mr-3 text-gray-500">{item.icon}</div>
            <div className="text-sm">{item.label}</div>
            {item.id === 'mail' && (
              <div className="ml-auto bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </div>
            )}
          </div>
        ))}

        {/* Settings dropdown */}
        <div className="relative">
          <div
            className={`flex items-center p-3 cursor-pointer hover:bg-gray-100 justify-between ${
              isSettingsActive ? 'active-nav-item' : ''
            }`}
            onClick={() => setSettingsOpen(!settingsOpen)}
          >
            <div className="flex items-center">
              <div className="mr-3 text-gray-500"><FaCog size={18} /></div>
              <div className="text-sm">Cài đặt tài khoản</div>
            </div>
            <div className="text-gray-500">
              {settingsOpen ? <FaAngleDown size={16} /> : <FaAngleRight size={16} />}
            </div>
          </div>

          {/* Dropdown menu */}
          <div className={`sidebar-dropdown-menu ${settingsOpen ? 'open' : ''}`}>
            {settingsItems.map((item) => (
              <div
                key={item.id}
                className={`sidebar-dropdown-item flex items-center py-2 px-3 cursor-pointer hover:bg-gray-100 ${
                  isSettingsItemActive(item.id, item.active) ? 'active' : ''
                }`}
                onClick={() => handleSettingsItemClick(item.id)}
              >
                <div className="mr-3 text-gray-500">{item.icon}</div>
                <div className="text-sm">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
