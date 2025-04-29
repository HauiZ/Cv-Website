import { useState, useEffect } from 'react';
import { Send, X, Check, AlertCircle } from 'lucide-react';
import mailService, { EMAIL_TEMPLATES } from '../../service/mailService';

export const EmailForm = ({ candidate, onSend, onCancel }) => {
  // Determine template based on candidate status
  const getDefaultTemplateId = () => {
    return candidate.status === 'approved'
      ? EMAIL_TEMPLATES.APPLICATION_ACCEPTED
      : EMAIL_TEMPLATES.APPLICATION_REJECTED;
  };

  // State for form data and validation
  const [formData, setFormData] = useState({
    to: `${candidate.name} <${candidate.email || 'candidate@example.com'}>`,
    templateId: getDefaultTemplateId(),
    subject: '',
    message: '',
    isHtml: false
  });

  const [availableTemplates, setAvailableTemplates] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  // Load templates and prepare initial message
  useEffect(() => {
    // Get all available templates
    const templates = mailService.getAvailableTemplates();
    const templateOptions = Object.entries(templates).map(([key, value]) => ({
      id: value,
      name: key.replace(/_/g, ' ').toLowerCase()
        .replace(/\b\w/g, char => char.toUpperCase())
    }));

    setAvailableTemplates(templateOptions);

    // Set initial subject and message based on template
    if (formData.templateId) {
      prepareTemplateMessage(formData.templateId);
    }
  }, []);

  const prepareTemplateMessage = (templateId) => {
    let templateData = {
      name: candidate.name,
      position: candidate.position,
      companyName: 'Công Ty XYZ', // This would normally come from company settings
    };

    // For interview invitation, add more data
    if (templateId === EMAIL_TEMPLATES.INTERVIEW_INVITATION) {
      templateData = {
        ...templateData,
        interviewTime: 'Thứ Hai, 15/05/2023, 10:00 AM',
        interviewLocation: 'Tầng 8, Tòa nhà VTower, Số 123 Đường ABC, Quận XYZ, TP.HCM',
        interviewType: 'Trực tiếp',
        contactPhone: '028.1234.5678'
      };
    }

    // Use the mail service to process template without sending
    try {
      const template = mailService.EMAIL_TEMPLATES[Object.keys(mailService.EMAIL_TEMPLATES)
        .find(key => mailService.EMAIL_TEMPLATES[key] === templateId)];

      // Check if this is a known template from our service
      if (template) {
        // Just prepare the template content without sending
        const processTemplate = (template, data) => {
          return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
            return data[key] !== undefined ? data[key] : match;
          });
        };

        // Set subject and message based on template
        // This would ideally be a helper function from the mail service
        const templateConfig = {
          [EMAIL_TEMPLATES.APPLICATION_ACCEPTED]: {
            subject: "Thông báo kết quả ứng tuyển - {{position}}",
            body: `Kính gửi {{name}},

Chúng tôi vui mừng thông báo rằng hồ sơ ứng tuyển vị trí {{position}} của bạn đã được chấp nhận. Chúng tôi rất ấn tượng với kinh nghiệm và kỹ năng của bạn.

Bước tiếp theo, chúng tôi sẽ liên hệ để sắp xếp buổi phỏng vấn. Vui lòng giữ liên lạc.

Trân trọng,
{{companyName}}
Phòng Nhân sự`,
          },
          [EMAIL_TEMPLATES.APPLICATION_REJECTED]: {
            subject: "Thông báo về đơn ứng tuyển - {{position}}",
            body: `Kính gửi {{name}},

Cảm ơn bạn đã quan tâm và nộp hồ sơ ứng tuyển vị trí {{position}} tại công ty chúng tôi.

Sau khi xem xét kỹ lưỡng, chúng tôi rất tiếc phải thông báo rằng hồ sơ của bạn chưa đáp ứng được yêu cầu cho vị trí này. Chúng tôi sẽ lưu hồ sơ của bạn và liên hệ khi có vị trí phù hợp.

Chúc bạn tìm được công việc phù hợp.

Trân trọng,
{{companyName}}
Phòng Nhân sự`,
          },
          [EMAIL_TEMPLATES.INTERVIEW_INVITATION]: {
            subject: "Lời mời phỏng vấn - {{position}}",
            body: `Kính gửi {{name}},

Chúng tôi vui mừng thông báo rằng hồ sơ ứng tuyển vị trí {{position}} của bạn đã được chọn vào vòng phỏng vấn.

Thời gian phỏng vấn: {{interviewTime}}
Địa điểm: {{interviewLocation}}
Hình thức: {{interviewType}}

Vui lòng xác nhận lịch phỏng vấn bằng cách trả lời email này hoặc liên hệ với chúng tôi qua số điện thoại {{contactPhone}}.

Trân trọng,
{{companyName}}
Phòng Nhân sự`,
          },
        };

        const config = templateConfig[templateId];
        if (config) {
          setFormData(prev => ({
            ...prev,
            subject: processTemplate(config.subject, templateData),
            message: processTemplate(config.body, templateData)
          }));
        }
      }
    } catch (error) {
      console.error("Error preparing template:", error);
    }
  };

  // Handle template change
  const handleTemplateChange = (e) => {
    const templateId = e.target.value;
    setFormData(prev => ({
      ...prev,
      templateId,
    }));

    prepareTemplateMessage(templateId);
  };

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const extractEmail = (fullAddress) => {
    const match = fullAddress.match(/<([^>]+)>/) || fullAddress.match(/([^\s@]+@[^\s@]+\.[^\s@]+)/);
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

    // Clear status when user makes changes
    if (status.type) {
      setStatus({ type: '', message: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSending(true);
      setStatus({ type: '', message: '' });

      try {
        // Send email using template if a template is selected
        if (formData.templateId && formData.templateId !== 'custom') {
          const templateData = {
            name: candidate.name,
            position: candidate.position,
            companyName: 'Công Ty XYZ',
            interviewTime: 'Thứ Hai, 15/05/2023, 10:00 AM',
            interviewLocation: 'Tầng 8, Tòa nhà VTower, Số 123 Đường ABC, Quận XYZ, TP.HCM',
            interviewType: 'Trực tiếp',
            contactPhone: '028.1234.5678',
          };

          const result = await mailService.sendTemplatedMail({
            to: extractEmail(formData.to),
            templateId: formData.templateId,
            templateData,
            isHtml: formData.isHtml
          });

          if (result.success) {
            setStatus({
              type: 'success',
              message: 'Email đã được gửi thành công!'
            });
            onSend(formData);
          } else {
            setStatus({
              type: 'error',
              message: result.message || 'Gửi email thất bại. Vui lòng thử lại.'
            });
          }
        } else {
          // Send custom email
          const result = await mailService.sendMail({
            to: extractEmail(formData.to),
            subject: formData.subject,
            body: formData.message,
            isHtml: formData.isHtml
          });

          if (result.success) {
            setStatus({
              type: 'success',
              message: 'Email đã được gửi thành công!'
            });
            onSend(formData);
          } else {
            setStatus({
              type: 'error',
              message: result.message || 'Gửi email thất bại. Vui lòng thử lại.'
            });
          }
        }
      } catch (error) {
        setStatus({
          type: 'error',
          message: error?.message || 'Đã xảy ra lỗi khi gửi email.'
        });
      } finally {
        setIsSending(false);
      }
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
        <label htmlFor="templateId" className="block text-sm font-medium text-gray-700 mb-1">
          Mẫu email
        </label>
        <select
          id="templateId"
          name="templateId"
          value={formData.templateId}
          onChange={handleTemplateChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
        >
          {availableTemplates.map(template => (
            <option key={template.id} value={template.id}>
              {template.name}
            </option>
          ))}
          <option value="custom">Tùy chỉnh</option>
        </select>
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

      <div className="flex items-center">
        <input
          type="checkbox"
          id="isHtml"
          name="isHtml"
          checked={formData.isHtml}
          onChange={(e) => setFormData({...formData, isHtml: e.target.checked})}
          className="h-4 w-4 text-green-500 focus:ring-green-400 border-gray-300 rounded"
        />
        <label htmlFor="isHtml" className="ml-2 block text-sm text-gray-700">
          Gửi dưới dạng HTML
        </label>
      </div>

      {status.type && (
        <div className={`p-3 rounded-md ${
          status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          <div className="flex items-center">
            {status.type === 'success' ? (
              <Check size={16} className="mr-2" />
            ) : (
              <AlertCircle size={16} className="mr-2" />
            )}
            <p className="text-sm">{status.message}</p>
          </div>
        </div>
      )}

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
