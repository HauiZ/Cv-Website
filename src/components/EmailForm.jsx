import { useState } from 'react';
import { Send, X } from 'lucide-react';

export const EmailForm = ({ candidate, onSend, onCancel }) => {
  // Prepare default subject and message based on candidate status
  const getDefaultSubject = () => {
    return candidate.status === 'approved'
      ? `Thông báo kết quả ứng tuyển - ${candidate.position}`
      : `Thông báo về đơn ứng tuyển - ${candidate.position}`;
  };

  const getDefaultMessage = () => {
    if (candidate.status === 'approved') {
      return `Kính gửi ${candidate.name},

Chúng tôi vui mừng thông báo rằng hồ sơ ứng tuyển vị trí ${candidate.position} của bạn đã được chấp nhận. Chúng tôi rất ấn tượng với kinh nghiệm và kỹ năng của bạn.

Bước tiếp theo, chúng tôi sẽ liên hệ để sắp xếp buổi phỏng vấn. Vui lòng giữ liên lạc.

Trân trọng,
Phòng Nhân sự`;
    }

    return `Kính gửi ${candidate.name},

Cảm ơn bạn đã quan tâm và nộp hồ sơ ứng tuyển vị trí ${candidate.position} tại công ty chúng tôi.

Sau khi xem xét kỹ lưỡng, chúng tôi rất tiếc phải thông báo rằng hồ sơ của bạn chưa đáp ứng được yêu cầu cho vị trí này. Chúng tôi sẽ lưu hồ sơ của bạn và liên hệ khi có vị trí phù hợp.

Chúc bạn tìm được công việc phù hợp.

Trân trọng,
Phòng Nhân sự`;
  };

  // State for form data and validation
  const [formData, setFormData] = useState({
    to: `${candidate.name} <candidate@example.com>`,
    subject: getDefaultSubject(),
    message: getDefaultMessage(),
  });

  const [errors, setErrors] = useState({});

  const [isSending, setIsSending] = useState(false);

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const extractEmail = (fullAddress) => {
    const match = fullAddress.match(/<([^>]+)>/) || fullAddress.match(/([^\s]+@[^\s]+\.[^\s]+)/);
    return match ? match[1] : fullAddress;
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validate email
    const email = extractEmail(formData.to);
    if (!formData.to.trim()) {
      newErrors.to = 'Vui lòng nhập địa chỉ email';
      isValid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.to = 'Địa chỉ email không hợp lệ';
      isValid = false;
    }

    // Validate subject
    if (!formData.subject.trim()) {
      newErrors.subject = 'Vui lòng nhập tiêu đề email';
      isValid = false;
    } else if (formData.subject.length > 100) {
      newErrors.subject = 'Tiêu đề không được quá 100 ký tự';
      isValid = false;
    }

    // Validate message
    if (!formData.message.trim()) {
      newErrors.message = 'Vui lòng nhập nội dung email';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSending(true);

      // Simulate sending email
      setTimeout(() => {
        onSend(formData);
        setIsSending(false);
      }, 1000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-1">
          Người nhận
        </label>
        <input
          type="text"
          id="to"
          name="to"
          value={formData.to}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.to ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-1 focus:ring-green-500`}
        />
        {errors.to && <p className="mt-1 text-sm text-red-500">{errors.to}</p>}
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
          Tiêu đề
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.subject ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-1 focus:ring-green-500`}
        />
        {errors.subject && (
          <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Nội dung
        </label>
        <textarea
          id="message"
          name="message"
          rows={8}
          value={formData.message}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.message ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-1 focus:ring-green-500`}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center"
          disabled={isSending}
        >
          <X size={16} className="mr-1" />
          Hủy
        </button>
        <button
          type="submit"
          className={`px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center ${
            isSending ? 'opacity-70 cursor-not-allowed' : ''
          }`}
          disabled={isSending}
        >
          <Send size={16} className="mr-1" />
          {isSending ? 'Đang gửi...' : 'Gửi email'}
        </button>
      </div>
    </form>
  );
};
