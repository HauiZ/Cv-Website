import React, { useState, useEffect } from 'react';
import QuanLyThongTin from './QuanLyThongTin';
import ProfileSettings from './CaiDatTaiKhoan/ProfileSettings';
import SecuritySettings from './CaiDatTaiKhoan/SecuritySettings';
import { AccountSettingsProvider } from '../service/AccountSettingsService/account-settings-context';

const CaiDatTaiKhoan = ({ activeSettingsTab }) => {
  const [activeTab, setActiveTab] = useState(activeSettingsTab || 'profile');

  // Update active tab when prop changes
  useEffect(() => {
    if (activeSettingsTab) {
      setActiveTab(activeSettingsTab);
    }
  }, [activeSettingsTab]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSettings />;
      case 'security':
        return <SecuritySettings />;
      case 'notifications':
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Thông báo</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p>Các cài đặt thông báo sẽ hiển thị ở đây.</p>
            </div>
          </div>
        );
      case 'privacy':
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Quyền riêng tư</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p>Các cài đặt quyền riêng tư sẽ hiển thị ở đây.</p>
            </div>
          </div>
        );
      case 'appearance':
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Giao diện</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p>Các cài đặt giao diện sẽ hiển thị ở đây.</p>
            </div>
          </div>
        );
      case 'quanlythongtin':
        return <QuanLyThongTin />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <AccountSettingsProvider>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Cài đặt tài khoản</h1>
        <div className="bg-white rounded-lg shadow-sm p-6">
          {renderTabContent()}
        </div>
      </div>
    </AccountSettingsProvider>
  );
};

export default CaiDatTaiKhoan;
