import { useState, useRef, useEffect } from 'react';
import { FaUpload } from 'react-icons/fa';
import TextAreaForm from './TextAreaForm';
import { DatePicker, Modal } from 'antd';
import useCustomMutation from '../../hooks/useCustomMutation';
import { postRecruitmentNewsApi } from '../../services/recruiterApi';
import Loader from "../../components/Loader";
import useLoading from "../../hooks/useLoading";
import useCustomFetch from "../../hooks/useCustomFetch";
import { fetchAreaApi } from "../../services/userApi";
import Select from "react-select";
import jobCategories from '../../components/JobCategories';

const LEVEL_OPTIONS = [
    "Nhân viên",
    "Trưởng nhóm",
    "Quản lý / Giám sát",
    "Trưởng chi nhánh",
    "Giám đốc / Phó giám đốc",
    "Thực tập sinh",
];

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
        jobTitle: 'Frontend Developer',
        profession: 'Công nghệ thông tin',
        candidateNumber: '2',
        jobLevel: 'Junior',
        workType: 'Toàn thời gian',
        degree: 'Đại học',
        jobAddress: 'Quận 1, TP.HCM',
        salary: {
            min: '12000000',
            max: '18000000',
            negotiable: true,
        },
        experience: '1-3 năm',
        workDateIn: '',
        workDetail: 'Phát triển và tối ưu hóa giao diện người dùng cho các ứng dụng web. Phối hợp với backend để tích hợp API.',
        jobRequirements: 'Thành thạo HTML/CSS, JavaScript. Có kinh nghiệm sử dụng React hoặc Vue.js. Ưu tiên biết Tailwind CSS.',
        benefits: 'Lương tháng 13, bonus hiệu suất, BHYT đầy đủ, môi trường trẻ trung năng động.',
        applicationDeadline: '',
        uploadMethod: 'link',
        videoUrl: 'https://www.youtube.com/watch?v=g7DW5YsJD5M',
        contactInfo: {
            name: 'Nguyễn Văn A',
            address: 'Tầng 5, Tòa nhà ABC, Quận 1, TP.HCM',
            phone: '0909123456',
            email: 'hr@example.com',
        },
    });


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
        if (!formData.workDetail || formData.workDetail.trim() === '' || formData.workDetail === '<p><br></p>') {
            Modal.error({
                title: 'Thông tin không hợp lệ',
                content: 'Vui lòng điền Mô tả công việc',
            });
            return false;
        }
        if (!formData.benefits || formData.benefits.trim() === '' || formData.benefits === '<p><br></p>') {
            Modal.error({
                title: 'Thông tin không hợp lệ',
                content: 'Vui lòng điền Quyền lợi được hưởng',
            });
            return false;
        }

        const generalRequiredFields = [
            'jobTitle', 'profession', 'candidateNumber', 'workType', 'jobLevel', 'degree',
            'jobAddress', 'experience', 'applicationDeadline'
        ];

        const fieldLabels = {
            jobTitle: "Vị trí đăng tuyển",
            profession: "Ngành nghề",
            candidateNumber: "Số lượng cần tuyển",
            workType: "Hình thức làm việc",
            jobLevel: "Cấp bậc",
            degree: "Yêu cầu bằng cấp",
            jobAddress: "Địa điểm làm việc",
            experience: "Kinh nghiệm",
            jobRequirements: "Yêu cầu công việc",
            applicationDeadline: "Hạn nộp hồ sơ"
        };

        for (const field of generalRequiredFields) {
            if (!formData[field] || (typeof formData[field] === 'string' && formData[field].trim() === '') || formData[field] === '<p><br></p>') {
                Modal.error({
                    title: 'Thông tin không hợp lệ',
                    content: `Vui lòng điền đầy đủ thông tin: ${fieldLabels[field] || field}`,
                });
                return false;
            }
        }

        if (!formData.salary.negotiable && (!formData.salary.min || formData.salary.min.trim() === '' || !formData.salary.max || formData.salary.max.trim() === '')) {
            Modal.error({
                title: 'Thông tin không hợp lệ',
                content: 'Vui lòng điền đầy đủ mức lương (tối thiểu và tối đa), hoặc chọn Thỏa thuận.',
            });
            return false;
        }

        if (!selectedProvince?.value) {
            Modal.error({
                title: 'Thông tin không hợp lệ',
                content: 'Vui lòng chọn Tỉnh/Thành phố',
            });
            return false;
        }
        if (!selectedDistrict?.value) {
            Modal.error({
                title: 'Thông tin không hợp lệ',
                content: 'Vui lòng chọn Quận/Huyện',
            });
            return false;
        }

        const contactRequiredFields = ['name', 'address', 'phone', 'email'];
        const contactFieldLabels = {
            name: 'Tên người liên hệ',
            address: 'Địa chỉ liên hệ',
            phone: 'Số điện thoại liên hệ',
            email: 'Email liên hệ'
        };

        for (const field of contactRequiredFields) {
            if (!formData.contactInfo[field] || (typeof formData.contactInfo[field] === 'string' && formData.contactInfo[field].trim() === '')) {
                Modal.error({
                    title: 'Thông tin không hợp lệ',
                    content: `Vui lòng điền đầy đủ thông tin: ${contactFieldLabels[field]}`,
                });
                return false;
            }
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.contactInfo.email)) {
            Modal.error({
                title: 'Thông tin không hợp lệ',
                content: 'Email liên hệ không hợp lệ',
            });
            return false;
        }

        const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
        if (!phoneRegex.test(formData.contactInfo.phone)) {
            Modal.error({
                title: 'Thông tin không hợp lệ',
                content: 'Số điện thoại liên hệ không hợp lệ',
            });
            return false;
        }

        return true;
    };

    function convertToYouTubeEmbed(url) {
        try {
            const videoId = extractYouTubeVideoId(url);

            if (!videoId) {
                throw new Error('Không tìm thấy Video ID hợp lệ');
            }

            return `https://www.youtube.com/embed/${videoId}`;

        } catch (error) {
            console.error('Lỗi convert URL:', error.message);
            return null;
        }
    }

    function extractYouTubeVideoId(url) {
        url = url.trim();

        // Trường hợp 1: Tìm vị trí của "v=" trong URL
        const vIndex = url.indexOf('v=');

        if (vIndex !== -1) {
            // Lấy 11 ký tự sau "v="
            const videoId = url.substring(vIndex + 2, vIndex + 13);

            // Kiểm tra xem có đủ 11 ký tự không
            if (videoId.length === 11) {
                return videoId;
            }
        }

        // Trường hợp 2: URL embed - tìm "/embed/" hoặc "/v/"
        const embedIndex = url.indexOf('/embed/');
        const vSlashIndex = url.indexOf('/v/');

        let startIndex = -1;
        if (embedIndex !== -1) {
            startIndex = embedIndex + 7; // "/embed/".length = 7
        } else if (vSlashIndex !== -1) {
            startIndex = vSlashIndex + 3; // "/v/".length = 3
        }

        if (startIndex !== -1) {
            const videoId = url.substring(startIndex, startIndex + 11);
            if (videoId.length === 11) {
                return videoId;
            }
        }

        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        if (formData.uploadMethod === 'link' && formData.videoUrl) {
            const embedUrl = convertToYouTubeEmbed(formData.videoUrl);
            if (embedUrl) {
                formData.videoUrl = embedUrl;
            }
        }
        await withLoading(async () => {
            try {
                await mutate({
                    jobTitle: formData.jobTitle,
                    profession: formData.profession,
                    candidateNumber: formData.candidateNumber,
                    jobLevel: formData.jobLevel,
                    workType: formData.workType,
                    degree: formData.degree,
                    province: selectedProvince?.label,
                    district: selectedDistrict?.label,
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
                Modal.success({
                    title: 'Thành công!',
                    content: 'Đăng tin thành công.',
                });
                resetForm();
            } catch (error) {
                console.error("Error submitting form:", error);
                let errorMessage = "Đã có lỗi xảy ra khi đăng tin. Vui lòng thử lại.";
                if (error.response && error.response.data && error.response.data.message) {
                    errorMessage = error.response.data.message;
                } else if (error.message) {
                    errorMessage = error.message;
                }
                Modal.error({
                    title: 'Lỗi đăng tin',
                    content: errorMessage,
                });
            }
        });

        resetForm();
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
            uploadMethod: 'link',
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
        setSelectedDistrict(null);
    }; const handleCancel = () => {
        Modal.confirm({
            title: 'Xác nhận hủy',
            content: 'Bạn có chắc muốn hủy tạo tin? Tất cả thông tin sẽ bị mất.',
            okText: 'Đồng ý',
            cancelText: 'Hủy',
            okButtonProps: {
                className: 'bg-red-500 hover:bg-red-600',
            },
            onOk() {
                resetForm();
            }
        });
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
            {notification && (
                <div className={`notification-popup ${notification.type}`}>
                    <p>{notification.message}</p>
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
                                options={jobCategories}
                            >
                                <option value="" disabled>Ngành nghề</option>
                                {jobCategories.map((category) => (
                                    <optgroup key={category.label} label={category.label}>
                                        {category.options.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </optgroup>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label block mb-1 font-medium">
                                Số lượng cần tuyển
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <input
                                type="number"
                                min={1}
                                className={inputFieldClass}
                                placeholder="Số lượng"
                                value={formData.candidateNumber}
                                onChange={(e) => {
                                    const rawValue = e.target.value;
                                    if (rawValue === '' || Number(rawValue) >= 1) {
                                        handleInputChange('candidateNumber', rawValue);
                                    }
                                }}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="form-group">
                            <label className="form-label block mb-1 font-medium">
                                Cấp bậc <span className="text-red-500 ml-1">*</span>
                            </label>

                            <input
                                className={selectFieldClass}
                                list="job-level-list"
                                value={formData.jobLevel || ""}
                                onChange={(e) => handleInputChange("jobLevel", e.target.value)}
                                placeholder="Chọn hoặc nhập cấp bậc"
                                required
                            />
                            <datalist id="job-level-list">
                                {LEVEL_OPTIONS.map(opt => (
                                    <option key={opt} value={opt} />
                                ))}
                            </datalist>
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
                            onChange={(e) => {
                                const rawValue = e.target.value;
                                if (rawValue === '' || Number(rawValue) >= 1) {
                                    handleNestedInputChange('salary', 'min', rawValue);
                                }
                            }}
                            required
                        />
                        <p>-</p>
                        <input
                            type="text"
                            className={inputFieldClass}
                            placeholder="mức lương tối đa (100000000)"
                            value={formData.salary.max}
                            onChange={(e) => {
                                const rawValue = e.target.value;
                                if (rawValue === '' || Number(rawValue) >= 1) {
                                    handleNestedInputChange('salary', 'max', rawValue);
                                }
                            }}
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

                        <div className="mb-4">
                            <input
                                type="text"
                                className={inputFieldClass}
                                placeholder="Nhập URL video (YouTube, Vimeo,...)"
                                value={formData.videoUrl}
                                onChange={(e) => handleInputChange('videoUrl', e.target.value)}
                            />
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