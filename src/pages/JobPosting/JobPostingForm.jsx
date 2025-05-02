import { useState, useRef, useEffect } from 'react';
import { FaUpload } from 'react-icons/fa';
import TextAreaForm from './TextAreaForm';
import { DatePicker } from 'antd';
import useCustomMutation from '../../hooks/useCustomMutation';
import { postRecruitmentNewsApi } from '../../services/recruiterApi';
import Loader from "../../components/Loader";
import useLoading from "../../hooks/useLoading";
import useCustomFetch from "../../hooks/useCustomFetch";
import { fetchAreaApi } from "../../services/userApi";
import Select from "react-select";

const JobPostingForm = () => {

    const [notification, setNotification] = useState(null);
    const [videoFile, setVideoFile] = useState(null);
    const { loading, withLoading } = useLoading();
    const { mutate } = useCustomMutation(postRecruitmentNewsApi);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);

    const { data } = useCustomFetch(fetchAreaApi);

    const provincesOptions = data?.map((item) => ({
        label: item.province,
        value: item.province,
    })) || [];

    const districtOptions = selectedProvince
        ? data
            ?.find((item) => item.province === selectedProvince.value)
            ?.districts.map((district) => ({
                label: district,
                value: district,
            })) || []
        : [];

    const [formData, setFormData] = useState({
        jobTitle: '',
        profession: '',
        candidateNumber: '',
        jobLevel: '',
        workType: '',
        degree: '',
        jobAddress: '',
        salary: {
            min: '',
            max: '',
            negotiable: false,
        },
        experience: '',
        workDateIn: '',
        workDetail: '',
        jobRequirements: '',
        benefits: '',
        applicationDeadline: '',
        uploadMethod: 'file',
        videoUrl: '',
        contactInfo: {
            name: '',
            address: '',
            phone: '',
            email: '',
        },
    });

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

    const onChangeWorkDateIn = (date, dateString) => {
        setFormData({
            ...formData,
            workDateIn: dateString,
        });
    };

    const onChangeApplicationDeadline = (date, dateString) => {
        setFormData({
            ...formData,
            applicationDeadline: dateString,
        });
    };

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
            'jobTitle', 'profession', 'candidateNumber', 'workType', 'jobLevel', 'degree',
            'jobAddress', 'salary', 'workDetail',
            'experience', 'jobRequirements', 'benefits', 'applicationDeadline'
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
            window.alert(validationError);
            return;
        }

        await withLoading(async () => {
            await mutate({
                jobTitle: formData.jobTitle,
                profession: formData.profession,
                candidateNumber: formData.candidateNumber,
                jobLevel: formData.jobLevel,
                workType: formData.workType,
                degree: formData.degree,
                province: selectedProvince.label,
                district: selectedDistrict.label,
                jobAddress: formData.jobAddress,
                salaryMin: formData.salary.min,
                salaryMax: formData.salary.max,
                salaryNegotiable: formData.salary.negotiable,
                experience: formData.experience,
                workDateIn: formData.workDateIn,
                workDetail: formData.workDetail,
                jobRequirements: formData.jobRequirements,
                benefits: formData.benefits,
                applicationDeadline: formData.applicationDeadline,
                contactInfo: formData.contactInfo.name,
                contactAddress: formData.contactInfo.address,
                contactPhone: formData.contactInfo.phone,
                contactEmail: formData.contactInfo.email,
                videoUrl: formData.videoUrl,
            });
        });
        // resetForm();
    };

    const resetForm = () => {
        setFormData({
            jobTitle: '',
            profession: '',
            candidateNumber: '',
            jobLevel: '',
            workType: '',
            degree: '',
            jobAddress: '',
            salary: {
                min: '',
                max: '',
                negotiable: false,
            },
            experience: '',
            workDateIn: '',
            workDetail: '',
            jobRequirements: '',
            benefits: '',
            applicationDeadline: '',
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
        setSelectedProvince(null);
        selectedDistrict(null);
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
            {loading && (
                <div className="absolute inset-0 z-50 flex items-center justify-center">
                    <div className="backdrop-blur-md bg-white/30 p-6 rounded-2xl shadow-xl">
                        <Loader />
                    </div>
                </div>
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
                                value={formData.profession}
                                onChange={(e) => handleInputChange('profession', e.target.value)}
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
                                value={formData.candidateNumber}
                                onChange={(e) => handleInputChange('candidateNumber', e.target.value)}
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
                                value={formData.jobLevel}
                                onChange={(e) => handleInputChange('jobLevel', e.target.value)}
                                required
                            >
                                <option value="" disabled>Chọn cấp bậc</option>
                                <option value="Nhân viên">Nhân viên</option>
                                <option value="Trưởng nhóm">Trưởng nhóm</option>
                                <option value="Quản lý / Giám sát">Quản lý / Giám sát</option>
                                <option value="Trưởng chi nhánh">Trưởng chi nhánh</option>
                                <option value="Giám đốc / Phó giám đốc">Giám đốc / Phó giám đốc</option>
                                <option value="Thực tập sinh">Thực tập sinh</option>
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
                                <option value="Toàn thời gian">Toàn thời gian</option>
                                <option value="Bán thời gian">Bán thời gian</option>
                                <option value="Thực tập">Thực tập</option>
                                <option value="Khác">Khác</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-4 mb-4">
                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Tỉnh/Thành phố
                            </label>
                            <Select
                                options={provincesOptions}
                                value={selectedProvince}
                                onChange={(option) => {
                                    setSelectedProvince(option);
                                    setSelectedDistrict(null);
                                }}
                                placeholder="Chọn tỉnh/thành"
                                className="basic-select"
                                classNamePrefix="select"
                            />
                            {!selectedProvince && (
                                <p className="text-red-500 text-sm mt-1">
                                    Vui lòng chọn tỉnh/thành phố
                                </p>
                            )}
                        </div>

                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Quận/Huyện
                            </label>
                            <Select
                                options={districtOptions}
                                value={selectedDistrict}
                                onChange={setSelectedDistrict}
                                isDisabled={!selectedProvince}
                                placeholder="Chọn quận/huyện"
                                className="basic-select"
                                classNamePrefix="select"
                            />
                            {selectedProvince && !selectedDistrict && (
                                <p className="text-red-500 text-sm mt-1">
                                    Vui lòng chọn quận/huyện
                                </p>
                            )}
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
                            value={formData.jobAddress}
                            onChange={(e) => handleInputChange('jobAddress', e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group mb-4 flex gap-4">
                        <label className="form-label block mb-1 font-medium">
                            Mức lương
                            <span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                            type="text"
                            className={inputFieldClass}
                            placeholder="mức lương tối thiểu (1000000)"
                            value={formData.salary.min}
                            onChange={(e) => handleNestedInputChange('salary', 'min', e.target.value)}
                            required
                        />
                        <p>-</p>
                        <input
                            type="text"
                            className={inputFieldClass}
                            placeholder="mức lương tối thiểu tối đa (100000000)"
                            value={formData.salary.max}
                            onChange={(e) => handleNestedInputChange('salary', 'max', e.target.value)}
                            required
                        />
                        <select
                            className={selectFieldClass}
                            onChange={(e) => handleNestedInputChange('salary', 'negotiable', e.target.value === 'true')}
                            value={formData.salary.negotiable ? 'true' : 'false'}
                        >
                            <option value="true">Thỏa thuận</option>
                            <option value="false">Cố định</option>
                        </select>
                    </div>
                </div>

                <div className="form-group mb-4">
                    <label className="form-label block mb-1 font-medium">Thời gian vào làm</label>
                    <DatePicker onChange={onChangeWorkDateIn} needConfirm size='large' />
                </div>

                <div className="form-group mb-4">
                    <label className="form-label block mb-1 font-medium">
                        Mô tả công việc
                        <span className="text-red-500 ml-1">*</span>
                    </label>
                    <TextAreaForm
                        value={formData.workDetail}
                        onChange={(value) => handleRichTextChange('workDetail', value)}
                        placeholder="Nhập mô tả công việc"
                    />
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
                                <option value="Không yêu cầu">Không yêu cầu</option>
                                <option value="Dưới 1 năm">Dưới 1 năm</option>
                                <option value="1-3 năm">1-3 năm</option>
                                <option value="3-5 năm">3-5 năm</option>
                                <option value="Trên 5 năm">Trên 5 năm</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label block mb-1 font-medium">
                                Yêu cầu bằng cấp
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <select
                                className={selectFieldClass}
                                value={formData.degree}
                                onChange={(e) => handleInputChange('degree', e.target.value)}
                                required
                            >
                                <option value="" disabled>Chọn bằng cấp</option>
                                <option value="Không yêu cầu">Không yêu cầu</option>
                                <option value="THPT">THPT</option>
                                <option value="Cao đẳng">Cao đẳng</option>
                                <option value="Đại học">Đại học</option>
                                <option value="Thạc sĩ">Thạc sĩ</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group mb-4">
                        <label className="form-label block mb-1 font-medium">Yêu cầu công việc</label>
                        <TextAreaForm
                            value={formData.jobRequirements}
                            onChange={(value) => handleRichTextChange('jobRequirements', value)}
                            placeholder="Nhập yêu cầu khác (nếu có)"
                        />
                    </div>

                    <div className="form-group mb-4">
                        <label className="form-label block mb-1 font-medium">
                            Quyền lợi được hưởng
                            <span className="text-red-500 ml-1">*</span>
                        </label>
                        <TextAreaForm
                            value={formData.benefits}
                            onChange={(value) => handleRichTextChange('benefits', value)}
                            placeholder="Nhập quyền lợi dành cho ứng viên"
                        />
                    </div>

                    <div className="form-group mb-4">
                        <label className="form-label block mb-1 font-medium">
                            Hạn nộp hồ sơ (Tối thiểu 3 ngày)
                            <span className="text-red-500 ml-1">*</span>
                        </label>
                        <DatePicker onChange={onChangeApplicationDeadline} needConfirm size='large' />
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

                        >
                            Đăng tin
                        </button>
                        <button
                            type="button"
                            className="bg-white text-gray-500 font-medium py-2 px-8 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
                            onClick={handleCancel}
                        >
                            Hủy tạo tin
                        </button>
                    </div>
                </div>
            </form >
        </div >
    );
};

export default JobPostingForm;