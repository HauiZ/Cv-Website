import { useState, useRef, useEffect } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
import { FaUpload } from 'react-icons/fa';
// import { submitJobPosting } from '../../../service/jobPostingService';
import Notification from './Nofication';
// import CustomEditor from './CustomEditor';
import TextareaEditor from './TextareaEditor';

const JobPostingForm = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    industry: '',
    numPositions: '',
    workType: '',
    level: '',
    province: '',
    district: '',
    workLocation: '',
    salary: {
      currency: '',
      negotiable: false,
    },
    bonus: '',
    workingTime: '',
    jobDescription: '',
    experience: '',
    education: '',
    gender: '',
    ageRange: {
      min: '18',
      max: '60',
    },
    otherRequirements: '',
    benefits: '',
    requiredDocuments: '',
    deadline: '',
    uploadMethod: 'file',
    videoUrl: '',
    contactInfo: {
      name: '',
      address: '',
      phone: '',
      email: '',
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  // const TextareaWrapper = ({ value, onChange, placeholder }) => {
  //   return (
  //     <div className="textarea-wrapper">
  //       <textarea
  //         className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors bg-white min-h-[150px]"
  //         value={value || ''}
  //         onChange={(e) => onChange(e.target.value)}
  //         placeholder={placeholder}
  //       />
  //     </div>
  //   );
  // };

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleNestedInputChange = (parent, field, value) => {
    setFormData({
      ...formData,
      [parent]: {
        ...formData[parent],
        [field]: value,
      },
    });
  };

  const handleRichTextChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setNotification({
          type: 'error',
          message: 'Dung lượng video không được vượt quá 10MB'
        });
        return;
      }
      setVideoFile(file);
    }
  };

  const validateForm = () => {
    const requiredFields = [
      'jobTitle', 'industry', 'numPositions', 'workType', 'level',
      'province', 'district', 'workLocation', 'jobDescription',
      'experience', 'education', 'gender', 'benefits', 'deadline'
    ];

    const contactRequiredFields = ['name', 'address', 'phone', 'email'];

    // Check basic fields
    for (const field of requiredFields) {
      if (!formData[field]) {
        return `Vui lòng điền đầy đủ thông tin ${field}`;
      }
    }

    // Check contact info
    for (const field of contactRequiredFields) {
      if (!formData.contactInfo[field]) {
        return `Vui lòng điền đầy đủ thông tin liên hệ ${field}`;
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.contactInfo.email)) {
      return 'Email liên hệ không hợp lệ';
    }

    // Phone validation (Vietnamese phone number)
    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    if (!phoneRegex.test(formData.contactInfo.phone)) {
      return 'Số điện thoại liên hệ không hợp lệ';
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const validationError = validateForm();
    if (validationError) {
      setNotification({
        type: 'error',
        message: validationError
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Mock API response instead of actual API call
      // This prevents errors when there's no actual backend
      const mockResponse = {
        success: true,
        message: 'Đăng tin tuyển dụng thành công (Mô phỏng)'
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      setNotification({
        type: 'success',
        message: mockResponse.message
      });

      // Reset form after successful submission
      resetForm();
    } catch (error) {
      console.error('Error submitting form:', error);
      setNotification({
        type: 'error',
        message: 'Đã có lỗi xảy ra khi đăng tin. Vui lòng thử lại sau.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      jobTitle: '',
      industry: '',
      numPositions: '',
      workType: '',
      level: '',
      province: '',
      district: '',
      workLocation: '',
      salary: {
        currency: '',
        negotiable: false,
      },
      bonus: '',
      workingTime: '',
      jobDescription: '',
      experience: '',
      education: '',
      gender: '',
      ageRange: {
        min: '18',
        max: '60',
      },
      otherRequirements: '',
      benefits: '',
      requiredDocuments: '',
      deadline: '',
      uploadMethod: 'file',
      videoUrl: '',
      contactInfo: {
        name: '',
        address: '',
        phone: '',
        email: '',
      },
    });
    setVideoFile(null);
  };

  const handleCancel = () => {
    if (window.confirm('Bạn có chắc muốn hủy tạo tin? Tất cả thông tin sẽ bị mất.')) {
      resetForm();
    }
  };

  // Custom input style
  const inputFieldClass =
    "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors bg-white";

  const selectFieldClass =
    "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors bg-white";

  return (
    <div className="job-posting-form pb-10">
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm">
        {/* Job Information Section - First Image */}
        <div className="form-section mb-8">
          <h2 className="section-title flex items-center mb-6">
            <span className="w-1 h-6 bg-green-500 mr-2"></span>
            <span className="text-green-500 font-medium">Thông tin việc làm</span>
          </h2>

          <div className="form-group mb-4">
            <label className="form-label block mb-1 font-medium">
              Vị trí đăng tuyển
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              className={inputFieldClass}
              placeholder="Ví dụ: Nhân viên kinh doanh"
              value={formData.jobTitle}
              onChange={(e) => handleInputChange('jobTitle', e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="form-group">
              <label className="form-label block mb-1 font-medium">
                Ngành nghề
                <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                className={selectFieldClass}
                value={formData.industry}
                onChange={(e) => handleInputChange('industry', e.target.value)}
                required
              >
                <option value="" disabled>Ngành nghề</option>
                <option value="it">Công nghệ thông tin</option>
                <option value="marketing">Marketing</option>
                <option value="sales">Bán hàng</option>
                <option value="finance">Tài chính</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label block mb-1 font-medium">
                Số lượng cần tuyển
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="number"
                className={inputFieldClass}
                placeholder="Số lượng"
                value={formData.numPositions}
                onChange={(e) => handleInputChange('numPositions', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="form-group">
              <label className="form-label block mb-1 font-medium">
                Cấp bậc
                <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                className={selectFieldClass}
                value={formData.level}
                onChange={(e) => handleInputChange('level', e.target.value)}
                required
              >
                <option value="" disabled>Chọn cấp bậc</option>
                <option value="intern">Thực tập sinh</option>
                <option value="fresher">Fresher</option>
                <option value="junior">Junior</option>
                <option value="middle">Middle</option>
                <option value="senior">Senior</option>
                <option value="manager">Manager</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label block mb-1 font-medium">
                Hình thức làm việc
                <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                className={selectFieldClass}
                value={formData.workType}
                onChange={(e) => handleInputChange('workType', e.target.value)}
                required
              >
                <option value="" disabled>Chọn hình thức</option>
                <option value="fulltime">Toàn thời gian</option>
                <option value="parttime">Bán thời gian</option>
                <option value="remote">Từ xa</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="form-group">
              <label className="form-label block mb-1 font-medium">
                Tỉnh thành làm việc
                <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                className={selectFieldClass}
                value={formData.province}
                onChange={(e) => handleInputChange('province', e.target.value)}
                required
              >
                <option value="" disabled>Chọn tỉnh thành</option>
                <option value="hanoi">Hà Nội</option>
                <option value="hcm">TP. Hồ Chí Minh</option>
                <option value="danang">Đà Nẵng</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label block mb-1 font-medium">
                Quận huyện làm việc
                <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                className={selectFieldClass}
                value={formData.district}
                onChange={(e) => handleInputChange('district', e.target.value)}
                required
              >
                <option value="" disabled>Chọn quận huyện</option>
                <option value="dist1">Quận 1</option>
                <option value="dist2">Quận 2</option>
                <option value="dist3">Quận 3</option>
              </select>
            </div>
          </div>

          <div className="form-group mb-4">
            <label className="form-label block mb-1 font-medium">
              Địa điểm làm việc
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              className={inputFieldClass}
              placeholder="Ví dụ: Số 123 Cầu Giấy"
              value={formData.workLocation}
              onChange={(e) => handleInputChange('workLocation', e.target.value)}
              required
            />
          </div>

          <div className="form-group mb-4">
            <label className="form-label block mb-1 font-medium">
              Mức lương
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                className={selectFieldClass}
                value={formData.salary.currency}
                onChange={(e) => handleNestedInputChange('salary', 'currency', e.target.value)}
                required
              >
                <option value="" disabled>Chọn mức lương</option>
                <option value="1trto3trVND">1.000.000 - 3.000.000 VND</option>
                <option value="5trto8trVND">5.000.000 - 8.000.000 VND</option>
                <option value="10tr+VND">10.000.000 - 15.000.000 VND</option>
              </select>
              <select
                className={selectFieldClass}
                onChange={(e) => handleNestedInputChange('salary', 'negotiable', e.target.value === 'true')}
                value={formData.salary.negotiable ? 'true' : 'false'}
              >
                <option value="false">Thỏa thuận</option>
                <option value="true">Cố định</option>
              </select>
            </div>
          </div>

          <div className="form-group mb-4">
            <label className="form-label block mb-1 font-medium">Hoa hồng (nếu có)</label>
            <input
              type="text"
              className={inputFieldClass}
              placeholder="Ví dụ: từ 12 đến 15%"
              value={formData.bonus}
              onChange={(e) => handleInputChange('bonus', e.target.value)}
            />
          </div>

          <div className="form-group mb-4">
            <label className="form-label block mb-1 font-medium">Thời gian thử việc</label>
            <input
              type="text"
              className={inputFieldClass}
              placeholder="Ví dụ: 1 tuần hoặc 1 tháng"
              value={formData.workingTime}
              onChange={(e) => handleInputChange('workingTime', e.target.value)}
            />
          </div>

          <div className="form-group mb-4">
            <label className="form-label block mb-1 font-medium">
              Mô tả công việc
              <span className="text-red-500 ml-1">*</span>
            </label>
            <TextareaEditor
              value={formData.jobDescription}
              onChange={(value) => handleRichTextChange('jobDescription', value)}
              placeholder="Nhập mô tả công việc"
            />
          </div>
        </div>

        {/* Job Requirements Section - Second Image */}
        <div className="form-section mb-8">
          <h2 className="section-title flex items-center mb-6">
            <span className="w-1 h-6 bg-green-500 mr-2"></span>
            <span className="text-green-500 font-medium">Yêu cầu công việc</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="form-group">
              <label className="form-label block mb-1 font-medium">
                Kinh nghiệm
                <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                className={selectFieldClass}
                value={formData.experience}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                required
              >
                <option value="" disabled>Chọn kinh nghiệm</option>
                <option value="none">Không yêu cầu</option>
                <option value="under1">Dưới 1 năm</option>
                <option value="1to2">1-2 năm</option>
                <option value="3to5">3-5 năm</option>
                <option value="over5">Trên 5 năm</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label block mb-1 font-medium">
                Yêu cầu bằng cấp
                <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                className={selectFieldClass}
                value={formData.education}
                onChange={(e) => handleInputChange('education', e.target.value)}
                required
              >
                <option value="" disabled>Chọn bằng cấp</option>
                <option value="none">Không yêu cầu</option>
                <option value="highschool">THPT</option>
                <option value="college">Cao đẳng</option>
                <option value="university">Đại học</option>
                <option value="master">Thạc sĩ</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="form-group">
              <label className="form-label block mb-1 font-medium">
                Yêu cầu giới tính
                <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                className={selectFieldClass}
                value={formData.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                required
              >
                <option value="" disabled>Chọn giới tính</option>
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
                <option value="any">Không yêu cầu</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label block mb-1 font-medium">Tuổi tối thiểu</label>
              <input
                type="number"
                className={inputFieldClass}
                placeholder="18"
                value={formData.ageRange.min}
                onChange={(e) => handleNestedInputChange('ageRange', 'min', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label block mb-1 font-medium">Tuổi tối đa</label>
              <input
                type="number"
                className={inputFieldClass}
                placeholder="60"
                value={formData.ageRange.max}
                onChange={(e) => handleNestedInputChange('ageRange', 'max', e.target.value)}
              />
            </div>
          </div>

          <div className="form-group mb-4">
            <label className="form-label block mb-1 font-medium">Yêu cầu khác</label>
            <TextareaEditor
              value={formData.otherRequirements}
              onChange={(value) => handleRichTextChange('otherRequirements', value)}
              placeholder="Nhập yêu cầu khác (nếu có)"
            />
          </div>

          <div className="form-group mb-4">
            <label className="form-label block mb-1 font-medium">
              Quyền lợi được hưởng
              <span className="text-red-500 ml-1">*</span>
            </label>
            <TextareaEditor
              value={formData.benefits}
              onChange={(value) => handleRichTextChange('benefits', value)}
              placeholder="Nhập quyền lợi dành cho ứng viên"
            />
          </div>

          <div className="form-group mb-4">
            <label className="form-label block mb-1 font-medium">Hồ sơ bao gồm</label>
            <TextareaEditor
              value={formData.requiredDocuments}
              onChange={(value) => handleRichTextChange('requiredDocuments', value)}
              placeholder="Nhập hồ sơ cần chuẩn bị"
            />
          </div>

          <div className="form-group mb-4">
            <label className="form-label block mb-1 font-medium">
              Hạn nộp hồ sơ (Tối đa 3 ngày)
              <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              className={selectFieldClass}
              value={formData.deadline}
              onChange={(e) => handleInputChange('deadline', e.target.value)}
              required
            >
              <option value="" disabled>Chọn ngày</option>
              <option value="3days">3 ngày</option>
              <option value="7days">7 ngày</option>
              <option value="14days">14 ngày</option>
              <option value="30days">30 ngày</option>
            </select>
          </div>
        </div>

        {/* Video and Contact Information Section - Third Image */}
        <div className="form-section mb-8">
          <h2 className="section-title flex items-center mb-6">
            <span className="w-1 h-6 bg-green-500 mr-2"></span>
            <span className="text-green-500 font-medium">Video giới thiệu về tin đăng</span>
          </h2>

          <div className="form-group">
            <div className="radio-group mb-4 flex items-center">
              <div className="radio-item flex items-center">
                <input
                  type="radio"
                  id="upload"
                  name="uploadMethod"
                  value="file"
                  checked={formData.uploadMethod === 'file'}
                  onChange={() => handleInputChange('uploadMethod', 'file')}
                  className="mr-2"
                />
                <label htmlFor="upload" className="text-sm select-none">Tập tin lên</label>
              </div>
              <div className="text-sm mx-4 text-gray-500">Hoặc</div>
              <div className="radio-item flex items-center">
                <input
                  type="radio"
                  id="link"
                  name="uploadMethod"
                  value="link"
                  checked={formData.uploadMethod === 'link'}
                  onChange={() => handleInputChange('uploadMethod', 'link')}
                  className="mr-2"
                />
                <label htmlFor="link" className="text-sm select-none">Link liên kết</label>
              </div>
            </div>

            {formData.uploadMethod === 'file' ? (
              <div className="mb-4">
                <input
                  type="file"
                  id="video-upload"
                  className="hidden"
                  accept="video/*"
                  onChange={handleVideoUpload}
                />
                <label htmlFor="video-upload" className="block">
                  <div className="border border-dashed border-gray-300 rounded-md p-8 text-center text-sm text-gray-500 cursor-pointer hover:bg-gray-50 transition-colors">
                    <FaUpload className="mx-auto mb-2 text-gray-400" size={24} />
                    <p className="text-gray-500">Tải ảnh hoặc video (Tối đa 5 ảnh và 1 video dung lượng tối đa 10MB)</p>
                  </div>
                </label>
                {videoFile && (
                  <div className="mt-2 text-sm text-green-600">
                    Đã chọn: {videoFile.name}
                  </div>
                )}
              </div>
            ) : (
              <div className="mb-4">
                <input
                  type="text"
                  className={inputFieldClass}
                  placeholder="Nhập URL video (YouTube, Vimeo,...)"
                  value={formData.videoUrl}
                  onChange={(e) => handleInputChange('videoUrl', e.target.value)}
                />
              </div>
            )}

            <div className="flex mt-4">
              <div className="bg-gray-50 border border-dashed border-gray-300 rounded flex flex-col items-center justify-center w-40 h-40 cursor-pointer hover:bg-gray-100 transition-colors">
                <FaUpload size={24} className="mb-2 text-gray-400" />
                <span className="text-sm text-gray-500">Thêm ảnh/video</span>
              </div>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2 className="section-title flex items-center mb-6">
            <span className="w-1 h-6 bg-green-500 mr-2"></span>
            <span className="text-green-500 font-medium">Thông tin liên hệ</span>
          </h2>

          <div className="form-group mb-4">
            <label className="form-label block mb-1 font-medium">
              Tên người liên hệ
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              className={inputFieldClass}
              placeholder="Nhập tên liên hệ"
              value={formData.contactInfo.name}
              onChange={(e) => handleNestedInputChange('contactInfo', 'name', e.target.value)}
              required
            />
          </div>

          <div className="form-group mb-4">
            <label className="form-label block mb-1 font-medium">
              Địa chỉ liên hệ
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              className={inputFieldClass}
              placeholder="Nhập địa chỉ liên hệ"
              value={formData.contactInfo.address}
              onChange={(e) => handleNestedInputChange('contactInfo', 'address', e.target.value)}
              required
            />
          </div>

          <div className="form-group mb-4">
            <label className="form-label block mb-1 font-medium">
              Số điện thoại liên hệ
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              className={inputFieldClass}
              placeholder="Nhập số điện thoại liên hệ"
              value={formData.contactInfo.phone}
              onChange={(e) => handleNestedInputChange('contactInfo', 'phone', e.target.value)}
              required
            />
          </div>

          <div className="form-group mb-6">
            <label className="form-label block mb-1 font-medium">
              Email liên hệ
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="email"
              className={inputFieldClass}
              placeholder="Nhập email liên hệ"
              value={formData.contactInfo.email}
              onChange={(e) => handleNestedInputChange('contactInfo', 'email', e.target.value)}
              required
            />
          </div>

          <div className="mt-6 flex gap-4">
            <button
              type="submit"
              className="bg-blue-500 text-white font-medium py-2 px-8 rounded-md hover:bg-blue-600 transition-colors"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Đang xử lý...' : 'Đăng tin'}
            </button>
            <button
              type="button"
              className="bg-white text-gray-500 font-medium py-2 px-8 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Hủy tạo tin
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default JobPostingForm;
