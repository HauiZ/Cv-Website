import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FaUpload } from 'react-icons/fa';

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
      currency: 'VND',
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
    contactInfo: {
      name: '',
      address: '',
      phone: '',
      email: '',
    },
  });

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

  const toolbarOptions = [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'},
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    ['clean']
  ];

  return (
    <div className="job-posting-form pb-10">
      {/* Job Information Section - First Image */}
      <div className="form-section">
        <h2 className="section-title">Thông tin việc làm</h2>

        <div className="form-group">
          <label className="form-label">
            Vị trí đăng tuyển
            <span className="required">*</span>
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="Ví dụ: Nhân viên kinh doanh"
            value={formData.jobTitle}
            onChange={(e) => handleInputChange('jobTitle', e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label className="form-label">
              Ngành nghề
              <span className="required">*</span>
            </label>
            <select
              className="form-select"
              value={formData.industry}
              onChange={(e) => handleInputChange('industry', e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>Ngành nghề</option>
              <option value="it">Công nghệ thông tin</option>
              <option value="marketing">Marketing</option>
              <option value="sales">Bán hàng</option>
              <option value="finance">Tài chính</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              Số lượng cần tuyển
              <span className="required">*</span>
            </label>
            <input
              type="number"
              className="form-input"
              placeholder="Số lượng"
              value={formData.numPositions}
              onChange={(e) => handleInputChange('numPositions', e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label className="form-label">
              Cấp bậc
              <span className="required">*</span>
            </label>
            <select
              className="form-select"
              value={formData.level}
              onChange={(e) => handleInputChange('level', e.target.value)}
              defaultValue=""
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
            <label className="form-label">
              Hình thức làm việc
              <span className="required">*</span>
            </label>
            <select
              className="form-select"
              value={formData.workType}
              onChange={(e) => handleInputChange('workType', e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>Chọn hình thức</option>
              <option value="fulltime">Toàn thời gian</option>
              <option value="parttime">Bán thời gian</option>
              <option value="remote">Từ xa</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label className="form-label">
              Tỉnh thành làm việc
              <span className="required">*</span>
            </label>
            <select
              className="form-select"
              value={formData.province}
              onChange={(e) => handleInputChange('province', e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>Chọn tỉnh thành</option>
              <option value="hanoi">Hà Nội</option>
              <option value="hcm">TP. Hồ Chí Minh</option>
              <option value="danang">Đà Nẵng</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              Quận huyện làm việc
              <span className="required">*</span>
            </label>
            <select
              className="form-select"
              value={formData.district}
              onChange={(e) => handleInputChange('district', e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>Chọn quận huyện</option>
              <option value="dist1">Quận 1</option>
              <option value="dist2">Quận 2</option>
              <option value="dist3">Quận 3</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">
            Địa điểm làm việc
            <span className="required">*</span>
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="Ví dụ: Số 123 Cầu Giấy"
            value={formData.workLocation}
            onChange={(e) => handleInputChange('workLocation', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Mức lương
            <span className="required">*</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              className="form-select"
              value={formData.salary.currency}
              onChange={(e) => handleNestedInputChange('salary', 'currency', e.target.value)}
            >
              <option value="1trto3trVND">1.000.000 - 3.000.000 VND</option>
              <option value="5trto8trVND">5.000.000 - 8.000.000 VND</option>
              <option value="10tr+VND">10.000.000 - 15.000.000 VND</option>
              
            </select>
            <select
              className="form-select"
              onChange={(e) => handleNestedInputChange('salary', 'negotiable', e.target.value === 'true')}
              defaultValue="false"
            >
              <option value="false">Thỏa thuận</option>
              <option value="true">Cố định</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Hoa hồng (nếu có)</label>
          <input
            type="text"
            className="form-input"
            placeholder="Ví dụ: từ 12 đến 15%"
            value={formData.bonus}
            onChange={(e) => handleInputChange('bonus', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Thời gian thử việc</label>
          <input
            type="text"
            className="form-input"
            placeholder="Ví dụ: 1 tuần hoặc 1 tháng"
            value={formData.workingTime}
            onChange={(e) => handleInputChange('workingTime', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Mô tả công việc
            <span className="required">*</span>
          </label>
          <ReactQuill
            theme="snow"
            value={formData.jobDescription}
            onChange={(value) => handleRichTextChange('jobDescription', value)}
            modules={{ toolbar: toolbarOptions }}
            placeholder="Nhập mô tả công việc"
          />
        </div>
      </div>

      {/* Job Requirements Section - Second Image */}
      <div className="form-section">
        <h2 className="section-title">Yêu cầu công việc</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label className="form-label">
              Kinh nghiệm
              <span className="required">*</span>
            </label>
            <select
              className="form-select"
              value={formData.experience}
              onChange={(e) => handleInputChange('experience', e.target.value)}
              defaultValue=""
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
            <label className="form-label">
              Yêu cầu bằng cấp
              <span className="required">*</span>
            </label>
            <select
              className="form-select"
              value={formData.education}
              onChange={(e) => handleInputChange('education', e.target.value)}
              defaultValue=""
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="form-group">
            <label className="form-label">
              Yêu cầu giới tính
              <span className="required">*</span>
            </label>
            <select
              className="form-select"
              value={formData.gender}
              onChange={(e) => handleInputChange('gender', e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>Chọn giới tính</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="any">Không yêu cầu</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Tuổi tối thiểu</label>
            <input
              type="number"
              className="form-input"
              placeholder="18"
              value={formData.ageRange.min}
              onChange={(e) => handleNestedInputChange('ageRange', 'min', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Tuổi tối đa</label>
            <input
              type="number"
              className="form-input"
              placeholder="60"
              value={formData.ageRange.max}
              onChange={(e) => handleNestedInputChange('ageRange', 'max', e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Yêu cầu khác</label>
          <ReactQuill
            theme="snow"
            value={formData.otherRequirements}
            onChange={(value) => handleRichTextChange('otherRequirements', value)}
            modules={{ toolbar: toolbarOptions }}
            placeholder="Nhập yêu cầu khác (nếu có)"
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Quyền lợi được hưởng
            <span className="required">*</span>
          </label>
          <ReactQuill
            theme="snow"
            value={formData.benefits}
            onChange={(value) => handleRichTextChange('benefits', value)}
            modules={{ toolbar: toolbarOptions }}
            placeholder="Nhập quyền lợi dành cho ứng viên"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Hồ sơ bao gồm</label>
          <ReactQuill
            theme="snow"
            value={formData.requiredDocuments}
            onChange={(value) => handleRichTextChange('requiredDocuments', value)}
            modules={{ toolbar: toolbarOptions }}
            placeholder="Nhập hồ sơ cần chuẩn bị"
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Hạn nộp hồ sơ (Tối đa 3 ngày)
            <span className="required">*</span>
          </label>
          <select
            className="form-select"
            defaultValue=""
            value={formData.deadline}
            onChange={(e) => handleInputChange('deadline', e.target.value)}
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
      <div className="form-section">
        <h2 className="section-title">Video giới thiệu về tin đăng</h2>

        <div className="form-group">
          <div className="radio-group mb-4">
            <div className="radio-item">
              <input
                type="radio"
                id="upload"
                name="uploadMethod"
                value="file"
                checked={formData.uploadMethod === 'file'}
                onChange={() => handleInputChange('uploadMethod', 'file')}
              />
              <label htmlFor="upload" className="text-sm">Tập tin lên</label>
            </div>
            <div className="text-sm mx-2">Hoặc</div>
            <div className="radio-item">
              <input
                type="radio"
                id="link"
                name="uploadMethod"
                value="link"
                checked={formData.uploadMethod === 'link'}
                onChange={() => handleInputChange('uploadMethod', 'link')}
              />
              <label htmlFor="link" className="text-sm">Link liên kết</label>
            </div>
          </div>

          <div className="mb-4">
            <input
              type="file"
              id="video-upload"
              className="hidden"
            />
            <label htmlFor="video-upload" className="block">
              <div className="border border-dashed border-gray-300 rounded-md p-4 text-center text-sm text-gray-500 cursor-pointer">
                <FaUpload className="mx-auto mb-2 text-gray-400" size={24} />
                Tải ảnh hoặc video (Tối đa 5 ảnh và 1 video dung lượng tối đa 10MB)
              </div>
            </label>
          </div>

          <div className="flex">
            <div className="btn-upload">
              <FaUpload size={24} className="mb-2" />
              <span className="text-sm">Thêm ảnh/video</span>
            </div>
          </div>
        </div>
      </div>

      <div className="form-section">
        <h2 className="section-title">Thông tin liên hệ</h2>

        <div className="form-group">
          <label className="form-label">
            Tên người liên hệ
            <span className="required">*</span>
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="Nhập tên liên hệ"
            value={formData.contactInfo.name}
            onChange={(e) => handleNestedInputChange('contactInfo', 'name', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Địa chỉ liên hệ
            <span className="required">*</span>
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="Nhập địa chỉ liên hệ"
            value={formData.contactInfo.address}
            onChange={(e) => handleNestedInputChange('contactInfo', 'address', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Số điện thoại liên hệ
            <span className="required">*</span>
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="Nhập số điện thoại liên hệ"
            value={formData.contactInfo.phone}
            onChange={(e) => handleNestedInputChange('contactInfo', 'phone', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Email liên hệ
            <span className="required">*</span>
          </label>
          <input
            type="email"
            className="form-input"
            placeholder="Nhập email liên hệ"
            value={formData.contactInfo.email}
            onChange={(e) => handleNestedInputChange('contactInfo', 'email', e.target.value)}
          />
        </div>

        <div className="mt-6 flex gap-4">
          <button className="btn btn-primary px-8">Đăng tin</button>
          <button className="btn btn-secondary px-8">Hủy tạo tin</button>
        </div>
      </div>
    </div>
  );
};

export default JobPostingForm;
