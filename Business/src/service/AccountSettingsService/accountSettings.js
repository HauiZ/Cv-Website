// Hàm lấy thông tin cài đặt người dùng
export const getUserSettings = async () => {
  // Mô phỏng call API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        notifications: {
          email: true,
          sms: false,
          push: true,
        },
        privacy: {
          showProfile: true,
          showContactInfo: false,
          allowMessages: true,
        },
        security: {
          twoFactorAuth: false,
          sessionTimeout: 30, // minutes
        },
        appearance: {
          theme: 'light',
          language: 'vi',
        }
      });
    }, 500);
  });
};

// Hàm lưu thông tin cài đặt người dùng
export const saveUserSettings = async (settings) => {
  // Mô phỏng call API
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Saved settings:', settings);
      resolve({ success: true, message: 'Lưu cài đặt thành công' });
    }, 800);
  });
};

// Hàm thay đổi mật khẩu
export const changePassword = async ({ currentPassword, newPassword }) => {
  // Mô phỏng call API
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Mô phỏng validation
      if (currentPassword === 'wrong') {
        reject({ success: false, message: 'Mật khẩu hiện tại không đúng' });
      } else if (newPassword.length < 8) {
        reject({ success: false, message: 'Mật khẩu mới phải có ít nhất 8 ký tự' });
      } else {
        resolve({ success: true, message: 'Đổi mật khẩu thành công' });
      }
    }, 1000);
  });
};

// Hàm xác thực 2 yếu tố
export const setupTwoFactor = async (phone) => {
  // Mô phỏng call API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Đã gửi mã xác thực đến ' + phone,
        verificationCode: '123456' // In thực tế, mã này sẽ được gửi qua SMS và không được trả về
      });
    }, 1000);
  });
};

// Hàm xác thực mã OTP
export const verifyOTP = async (code) => {
  // Mô phỏng call API
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (code === '123456') {
        resolve({ success: true, message: 'Xác thực thành công' });
      } else {
        reject({ success: false, message: 'Mã xác thực không đúng' });
      }
    }, 800);
  });
};

export default {
  getUserSettings,
  saveUserSettings,
  changePassword,
  setupTwoFactor,
  verifyOTP
};
