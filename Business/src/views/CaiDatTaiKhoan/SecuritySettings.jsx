import React, { useState } from 'react';
import { useAccountSettings } from '../../service/AccountSettingsService/account-settings-context';

const SecuritySettings = () => {
  const { settings, updateSetting, changePassword, setupTwoFactor, verifyOTP, isLoading, successMessage, error } = useAccountSettings();

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [otpData, setOtpData] = useState({
    phone: '',
    code: '',
    step: 'setup', // 'setup' | 'verify'
  });

  const [passwordError, setPasswordError] = useState('');
  const [otpError, setOtpError] = useState('');

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError('');

    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('Mật khẩu mới không khớp. Vui lòng kiểm tra lại.');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setPasswordError('Mật khẩu mới phải có ít nhất 8 ký tự.');
      return;
    }

    try {
      await changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });

      // Reset form after successful password change
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (err) {
      setPasswordError(err.message || 'Không thể thay đổi mật khẩu. Vui lòng thử lại sau.');
    }
  };

  const handleOTPChange = (e) => {
    const { name, value } = e.target;
    setOtpData({ ...otpData, [name]: value });
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setOtpError('');

    if (!otpData.phone) {
      setOtpError('Vui lòng nhập số điện thoại.');
      return;
    }

    try {
      const result = await setupTwoFactor(otpData.phone);
      if (result.success) {
        setOtpData({ ...otpData, step: 'verify' });
      }
    } catch (err) {
      setOtpError(err.message || 'Không thể gửi mã xác thực. Vui lòng thử lại sau.');
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setOtpError('');

    if (!otpData.code) {
      setOtpError('Vui lòng nhập mã xác thực.');
      return;
    }

    try {
      await verifyOTP(otpData.code);
      // Reset OTP data after successful verification
      setOtpData({
        phone: '',
        code: '',
        step: 'setup'
      });
    } catch (err) {
      setOtpError(err.message || 'Mã xác thực không hợp lệ. Vui lòng thử lại.');
    }
  };

  if (!settings) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Bảo mật tài khoản</h2>

      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
          {successMessage}
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="space-y-6">
        {/* Password Change Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium mb-4">Đổi mật khẩu</h3>

          {passwordError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {passwordError}
            </div>
          )}

          <form onSubmit={handlePasswordSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Mật khẩu hiện tại
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Mật khẩu mới
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Xác nhận mật khẩu mới
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  disabled={isLoading}
                >
                  {isLoading ? 'Đang xử lý...' : 'Đổi mật khẩu'}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Two-Factor Authentication Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Xác thực hai yếu tố</h3>

            <div className="flex items-center">
              <span className={`inline-block w-3 h-3 rounded-full mr-2 ${settings.security.twoFactorAuth ? 'bg-green-500' : 'bg-gray-300'}`}></span>
              <span className="text-sm font-medium text-gray-700">
                {settings.security.twoFactorAuth ? 'Đã bật' : 'Đã tắt'}
              </span>
            </div>
          </div>

          <p className="text-gray-600 mb-4">
            Xác thực hai yếu tố thêm một lớp bảo mật bằng cách yêu cầu xác minh qua điện thoại mỗi khi đăng nhập từ thiết bị mới.
          </p>

          {otpError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {otpError}
            </div>
          )}

          {settings.security.twoFactorAuth ? (
            <div>
              <p className="text-green-600 mb-4">
                Xác thực hai yếu tố đang được bật. Điều này giúp bảo vệ tài khoản của bạn.
              </p>
              <button
                type="button"
                onClick={() => updateSetting('security', 'twoFactorAuth', false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Tắt xác thực hai yếu tố
              </button>
            </div>
          ) : (
            <div>
              {otpData.step === 'setup' ? (
                <form onSubmit={handleSendOTP}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Số điện thoại
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={otpData.phone}
                        onChange={handleOTPChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Nhập số điện thoại của bạn"
                        required
                      />
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Đang gửi...' : 'Gửi mã xác thực'}
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleVerifyOTP}>
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Chúng tôi đã gửi mã xác thực đến số điện thoại <span className="font-semibold">{otpData.phone}</span>. Vui lòng nhập mã để hoàn tất thiết lập.
                    </p>

                    <div>
                      <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                        Mã xác thực
                      </label>
                      <input
                        type="text"
                        id="code"
                        name="code"
                        value={otpData.code}
                        onChange={handleOTPChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Nhập mã xác thực 6 số"
                        maxLength={6}
                        required
                      />
                    </div>

                    <div className="flex space-x-3">
                      <button
                        type="button"
                        onClick={() => setOtpData({ ...otpData, step: 'setup' })}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Quay lại
                      </button>

                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Đang xác thực...' : 'Xác thực'}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Session Timeout Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium mb-4">Thời gian phiên làm việc</h3>

          <p className="text-gray-600 mb-4">
            Thiết lập thời gian tự động đăng xuất nếu không có hoạt động.
          </p>

          <div className="max-w-xs">
            <label htmlFor="sessionTimeout" className="block text-sm font-medium text-gray-700 mb-1">
              Thời gian chờ (phút)
            </label>
            <select
              id="sessionTimeout"
              name="sessionTimeout"
              value={settings.security.sessionTimeout}
              onChange={(e) => updateSetting('security', 'sessionTimeout', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="5">5 phút</option>
              <option value="15">15 phút</option>
              <option value="30">30 phút</option>
              <option value="60">1 giờ</option>
              <option value="120">2 giờ</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
