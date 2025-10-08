import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaUpload } from "react-icons/fa";
import { DatePicker, Modal } from "antd";
import TextAreaForm from "../JobPosting/TextAreaForm";
import axios from "../../utils/axios.customize";
import useCustomMutation from "../../hooks/useCustomMutation";
import { updateRecruitmentNewsApi } from "../../services/recruiterApi";
import { fetchRecruitmentNewsDetailApi } from "../../services/recruitmentNewsApi";
import Loader from "../../components/Loader";
import useLoading from "../../hooks/useLoading";
import useCustomFetch from "../../hooks/useCustomFetch";
import { fetchAreaApi } from "../../services/userApi";
import Select from "react-select";
import dayjs from "dayjs";
import locale from "antd/es/date-picker/locale/vi_VN";
import PreviewNews from "./PreviewNews";
import { fetchUserApi } from "../../services/userApi";
import { useAuthContext } from "../../contexts/AuthContext";
import jobCategories from "../../components/JobCategories";

const EditJob = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [notification, setNotification] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const { withLoading } = useLoading();
  const jobId = location.state?.jobId;
  const [jobData, setJobData] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const { mutate } = useCustomMutation(updateRecruitmentNewsApi);
  const { data: areaResponse } = useCustomFetch(fetchAreaApi);
  const areaData = areaResponse || [];
  const { user } = useAuthContext();

  // Tạo options cho Select tỉnh/thành phố
  const provincesOptions = areaData.map((item) => ({
    label: item.province,
    value: item.province,
  }));

  // Tạo options cho Select quận/huyện dựa vào tỉnh/thành phố đã chọn
  const districtOptions = selectedProvince
    ? (
      areaData.find((item) => item.province === selectedProvince.value)
        ?.districts || []
    ).map((district) => ({
      label: district,
      value: district,
    }))
    : [];

  // Form state
  const [formData, setFormData] = useState({
    jobTitle: "",
    profession: "",
    candidateNumber: "",
    jobLevel: "",
    workType: "",
    degree: "",
    jobAddress: "",
    salary: {
      min: "",
      max: "",
      negotiable: false,
    },
    experience: "",
    workDateIn: "",
    workDetail: "",
    jobRequirements: "",
    benefits: "",
    applicationDeadline: "",
    contactInfo: {
      name: "",
      address: "",
      phone: "",
      email: "",
    },
    videoUrl: "",
    uploadMethod: "link",
  });

  useEffect(() => {
    if (!jobId) {
      toast.error("ID tin tuyển dụng không hợp lệ");
      navigate("/recruiter/tin-tuyen-dung");
      return;
    }

    if (jobData) {
      setFormData({
        jobTitle: jobData.introduce?.jobTitle || "",
        profession: jobData.detailRecruitment?.profession || "",
        candidateNumber: jobData.general?.candidateNumber || "",
        jobLevel: jobData.general?.jobLevel || "",
        workType: jobData.general?.workType || "",
        degree: jobData.detailRecruitment?.degree || "",
        jobAddress: jobData.detailRecruitment?.jobAddress || "",
        salary: {
          min: jobData.introduce?.salaryMin || "",
          max: jobData.introduce?.salaryMax || "",
          negotiable: jobData.detailRecruitment?.salaryNegotiable,
        },
        experience: jobData.introduce?.experience || "",
        workDateIn: jobData.detailRecruitment?.workDateIn || "",
        workDetail: jobData.detailRecruitment?.workDetail || "",
        jobRequirements: jobData.detailRecruitment?.jobRequirements || "",
        benefits: jobData.detailRecruitment?.benefits || "",
        applicationDeadline: jobData.introduce?.applicationDeadlineDate || "",
        contactInfo: {
          name: jobData.detailRecruitment?.contactInfo || "",
          address: jobData.detailRecruitment?.contactAddress || "",
          phone: jobData.detailRecruitment?.contactPhone || "",
          email: jobData.detailRecruitment?.contactEmail || "",
        },
        videoUrl: jobData.detailRecruitment?.videoUrl || "",
        uploadMethod: "link",
      });

      if (jobData.introduce?.address) {
        setSelectedProvince({
          label: jobData.introduce?.address,
          value: jobData.introduce?.address,
        });

        if (jobData.introduce?.district) {
          setSelectedDistrict({
            label: jobData.introduce?.district,
            value: jobData.introduce?.district,
          });
        }
      }
    }
  }, [jobId, jobData, navigate]);

  // Fetch data only once when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!jobId) {
          setNotification({
            type: "error",
            message: "ID tin tuyển dụng không hợp lệ",
          });
          navigate("/recruiter/tin-tuyen-dung");
          return;
        }
        const jobResponse = await fetchRecruitmentNewsDetailApi(jobId);
        console.log("Job Response:", jobResponse);

        // Lưu trữ dữ liệu job response
        setJobData(jobResponse);

        if (jobResponse.introduce.address) {
          const provinceOption = {
            label: jobResponse.introduce.address,
            value: jobResponse.introduce.address,
          };
          setSelectedProvince(provinceOption);

          if (jobResponse.introduce.district) {
            const districtOption = {
              label: jobResponse.introduce.district,
              value: jobResponse.introduce.district,
            };
            setSelectedDistrict(districtOption);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setNotification({
          type: "error",
          message: "Không thể tải dữ liệu. Vui lòng thử lại sau.",
        });
      }
    };

    fetchData();
  }, [jobId, navigate]); // Only depend on jobId and navigate

  const handleInputChange = (field, value) => {
    if (field === "videoUrl") {
      const embedUrl = convertToYouTubeEmbed(value);
      value = embedUrl || value;
    }
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNestedInputChange = (parent, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }));
  };

  function convertToYouTubeEmbed(url) {
    try {
      const videoId = extractYouTubeVideoId(url);

      if (!videoId) {
        throw new Error("Không tìm thấy Video ID hợp lệ");
      }

      return `https://www.youtube.com/embed/${videoId}`;
    } catch (error) {
      console.error("Lỗi convert URL:", error.message);
      return null;
    }
  }

  function extractYouTubeVideoId(url) {
    url = url;

    // Trường hợp 1: Tìm vị trí của "v=" trong URL
    const vIndex = url.indexOf("v=");

    if (vIndex !== -1) {
      // Lấy 11 ký tự sau "v="
      const videoId = url.substring(vIndex + 2, vIndex + 13);

      // Kiểm tra xem có đủ 11 ký tự không
      if (videoId.length === 11) {
        return videoId;
      }
    }

    // Trường hợp 2: URL embed - tìm "/embed/" hoặc "/v/"
    const embedIndex = url.indexOf("/embed/");
    const vSlashIndex = url.indexOf("/v/");

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

  const handleSave = async () => {
    try {
      if (!jobData || !jobId) {
        Modal.error({
          title: "Lỗi",
          content:
            "Không thể cập nhật tin tuyển dụng. Thiếu thông tin cần thiết.",
        });
        return;
      }

      if (!validateForm()) {
        return;
      }

      if (!selectedProvince || !selectedDistrict) {
        Modal.error({
          title: "Lỗi",
          content: "Vui lòng chọn Tỉnh/Thành phố và Quận/Huyện",
        });
        return;
      }
      await withLoading(async () => {
        const data = {
          jobTitle: formData.jobTitle,
          profession: formData.profession,
          candidateNumber: parseInt(formData.candidateNumber) || 0,
          jobLevel: formData.jobLevel,
          workType: formData.workType,
          degree: formData.degree,
          province: selectedProvince.value,
          district: selectedDistrict.value,
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
          videoUrl: formData.videoUrl || "",
        };
        console.log("Saving job with data:", data);
        await mutate(data, jobId);
        navigate("/recruiter/tin-tuyen-dung");
      });
    } catch (error) {
      console.error("Error saving job:", error);
      Modal.error({
        title: "Lỗi",
        content: "Không thể cập nhật tin tuyển dụng. Vui lòng thử lại sau.",
      });
    }
  };

  const onChangeWorkDateIn = (date, dateString) => {
    handleInputChange("workDateIn", dateString);
  };

  const onChangeApplicationDeadline = (date, dateString) => {
    handleInputChange("applicationDeadline", dateString);
  };

  // Format date using dayjs
  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = dayjs(dateString);
    return date.isValid() ? date : null;
  };

  // Custom input styles
  const inputFieldClass =
    "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors bg-white";
  const selectFieldClass =
    "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors bg-white";

  // Loading state
  if (!jobData) {
    return (
      <div className="job-posting-form pb-10">
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <h2 className="text-2xl font-bold mb-4">Đang tải...</h2>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  const handleCancelClick = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmCancel = () => {
    navigate("/recruiter/tin-tuyen-dung");
  };

  const handleCancelModal = () => {
    setShowConfirmModal(false);
  };

  const validateForm = () => {
    if (
      !formData.workDetail ||
      formData.workDetail === "" ||
      formData.workDetail === "<p><br></p>"
    ) {
      Modal.error({
        title: "Thông tin không hợp lệ",
        content: "Vui lòng điền Mô tả công việc",
      });
      return false;
    }
    if (
      !formData.benefits ||
      formData.benefits === "" ||
      formData.benefits === "<p><br></p>"
    ) {
      Modal.error({
        title: "Thông tin không hợp lệ",
        content: "Vui lòng điền Quyền lợi được hưởng",
      });
      return false;
    }

    const generalRequiredFields = [
      "jobTitle",
      "profession",
      "candidateNumber",
      "workType",
      "jobLevel",
      "degree",
      "jobAddress",
      "experience",
      "applicationDeadline",
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
      applicationDeadline: "Hạn nộp hồ sơ",
    };

    for (const field of generalRequiredFields) {
      if (
        !formData[field] ||
        (typeof formData[field] === "string" && formData[field] === "") ||
        formData[field] === "<p><br></p>"
      ) {
        Modal.error({
          title: "Thông tin không hợp lệ",
          content: `Vui lòng điền đầy đủ thông tin: ${fieldLabels[field] || field}`,
        });
        return false;
      }
    }

    if (
      !formData.salary.negotiable &&
      (!formData.salary.min ||
        formData.salary.min === "" ||
        !formData.salary.max ||
        formData.salary.max === "")
    ) {
      Modal.error({
        title: "Thông tin không hợp lệ",
        content:
          "Vui lòng điền đầy đủ mức lương (tối thiểu và tối đa), hoặc chọn Thỏa thuận.",
      });
      return false;
    }

    if (!selectedProvince?.value) {
      Modal.error({
        title: "Thông tin không hợp lệ",
        content: "Vui lòng chọn Tỉnh/Thành phố",
      });
      return false;
    }
    if (!selectedDistrict?.value) {
      Modal.error({
        title: "Thông tin không hợp lệ",
        content: "Vui lòng chọn Quận/Huyện",
      });
      return false;
    }

    const contactRequiredFields = ["name", "address", "phone", "email"];
    const contactFieldLabels = {
      name: "Tên người liên hệ",
      address: "Địa chỉ liên hệ",
      phone: "Số điện thoại liên hệ",
      email: "Email liên hệ",
    };

    for (const field of contactRequiredFields) {
      if (
        !formData.contactInfo[field] ||
        (typeof formData.contactInfo[field] === "string" &&
          formData.contactInfo[field] === "")
      ) {
        Modal.error({
          title: "Thông tin không hợp lệ",
          content: `Vui lòng điền đầy đủ thông tin: ${contactFieldLabels[field]}`,
        });
        return false;
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.contactInfo.email)) {
      Modal.error({
        title: "Thông tin không hợp lệ",
        content: "Email liên hệ không hợp lệ",
      });
      return false;
    }

    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    if (!phoneRegex.test(formData.contactInfo.phone)) {
      Modal.error({
        title: "Thông tin không hợp lệ",
        content: "Số điện thoại liên hệ không hợp lệ",
      });
      return false;
    }

    return true;
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Chỉnh sửa tin tuyển dụng</h2>
      {/* Form content */}

      {/* Preview Modal using Ant Design Modal */}
      <Modal
        visible={showPreviewModal}
        onCancel={() => setShowPreviewModal(false)}
        closable={true}
        width="95%"
        style={{ top: 20 }}
        footer={null}
        bodyStyle={{ maxHeight: "90vh", overflow: "auto" }}
      >
        <PreviewNews
          formDataForPreview={{
            jobTitle: formData.jobTitle,
            salary: formData.salary,
            experience: formData.experience,
            applicationDeadline: formData.applicationDeadline,
            workDateIn: formData.workDateIn,
            workType: formData.workType,
            candidateNumber: formData.candidateNumber,
            jobLevel: formData.jobLevel,
            degree: formData.degree,
            jobAddress: formData.jobAddress,
            workDetail: formData.workDetail,
            jobRequirements: formData.jobRequirements,
            benefits: formData.benefits,
            profession: formData.profession,
            contactInfo: formData.contactInfo,
            videoUrl: formData.videoUrl,
            uploadMethod: "link",
          }}
          selectedProvinceForPreview={selectedProvince}
          selectedDistrictForPreview={selectedDistrict}
          isPreviewMode={true}
        />
      </Modal>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <Modal
          title="Xác nhận hủy"
          open={showConfirmModal}
          onOk={handleConfirmCancel}
          onCancel={handleCancelModal}
          okText="Đồng ý"
          cancelText="Hủy"
        >
          <p>Bạn có chắc chắn muốn hủy chỉnh sửa tin tuyển dụng này?</p>
          <p>Các thay đổi sẽ không được lưu lại.</p>
        </Modal>
      )}

      <div className="bg-white p-6 rounded-lg shadow-sm">
        {notification && (
          <div
            className={`p-4 mb-4 rounded ${notification.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
          >
            {notification.message}
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Chỉnh sửa tin tuyển dụng</h2>
          <div className="text-sm text-gray-600">
            ID tin tuyển dụng: {jobId}
          </div>
        </div>

        <form className="space-y-6">
          {/* Thông tin công việc */}
          <div className="section mb-8">
            <h2 className="section-title flex items-center mb-6">
              <span className="w-1 h-6 bg-green-500 mr-2"></span>
              <span className="text-green-500 font-medium">
                Thông tin công việc
              </span>
            </h2>

            <div className="space-y-4">
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vị trí đăng tuyển
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  className={inputFieldClass}
                  value={formData.jobTitle}
                  onChange={(e) =>
                    handleInputChange("jobTitle", e.target.value)
                  }
                  placeholder="Ví dụ: Nhân viên kinh doanh"
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
                    onChange={(e) =>
                      handleInputChange("profession", e.target.value)
                    }
                    required
                    options={jobCategories}
                  >
                    <option value="" disabled>
                      Ngành nghề
                    </option>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Số lượng cần tuyển
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="number"
                    min={1}
                    className={inputFieldClass}
                    value={formData.candidateNumber}
                    onChange={(e) =>
                      handleInputChange("candidateNumber", e.target.value)
                    }
                    placeholder="Số lượng"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cấp bậc
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    className={selectFieldClass}
                    value={formData.jobLevel}
                    onChange={(e) =>
                      handleInputChange("jobLevel", e.target.value)
                    }
                  >
                    <option value="">Chọn cấp bậc</option>
                    <option value="Nhân viên">Nhân viên</option>
                    <option value="Trưởng nhóm">Trưởng nhóm</option>
                    <option value="Quản lý / Giám sát">
                      Quản lý / Giám sát
                    </option>
                    <option value="Trưởng chi nhánh">Trưởng chi nhánh</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hình thức làm việc
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    className={selectFieldClass}
                    value={formData.workType}
                    onChange={(e) =>
                      handleInputChange("workType", e.target.value)
                    }
                  >
                    <option value="">Chọn hình thức</option>
                    <option value="Toàn thời gian">Toàn thời gian</option>
                    <option value="Bán thời gian">Bán thời gian</option>
                    <option value="Thực tập">Thực tập</option>
                    <option value="Khác">Khác</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          {/* Địa điểm và yêu cầu */}
          <div className="section mb-8">
            <h2 className="section-title flex items-center mb-6">
              <span className="w-1 h-6 bg-green-500 mr-2"></span>
              <span className="text-green-500 font-medium">
                Địa điểm và yêu cầu công việc
              </span>
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tỉnh/Thành phố
                    <span className="text-red-500 ml-1">*</span>
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
                </div>

                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quận/Huyện
                    <span className="text-red-500 ml-1">*</span>
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
                </div>
              </div>

              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Địa điểm làm việc
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  className={inputFieldClass}
                  value={formData.jobAddress}
                  onChange={(e) =>
                    handleInputChange("jobAddress", e.target.value)
                  }
                  placeholder="Ví dụ: Số 123 Cầu Giấy"
                />
              </div>

              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mức lương
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="text"
                    className={inputFieldClass}
                    value={formData.salary.min}
                    onChange={(e) => {
                                const rawValue = e.target.value;
                                if (rawValue === '' || Number(rawValue) >= 1) {
                                    handleNestedInputChange('salary', 'min', rawValue);
                                }
                            }}
                    placeholder="Mức lương tối thiểu"
                  />
                  <span>-</span>
                  <input
                    type="text"
                    className={inputFieldClass}
                    value={formData.salary.max}
                    onChange={(e) => {
                                const rawValue = e.target.value;
                                if (rawValue === '' || Number(rawValue) >= 1) {
                                    handleNestedInputChange('salary', 'max', rawValue);
                                }
                            }}
                    placeholder="Mức lương tối đa"
                  />
                  <select
                    className={selectFieldClass}
                    value={formData.salary.negotiable.toString()}
                    onChange={(e) =>
                      handleNestedInputChange(
                        "salary",
                        "negotiable",
                        e.target.value === "true"
                      )
                    }
                  >
                    <option value="true">Thỏa thuận</option>
                    <option value="false">Cố định</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Yêu cầu bằng cấp
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    className={selectFieldClass}
                    value={formData.degree}
                    onChange={(e) =>
                      handleInputChange("degree", e.target.value)
                    }
                  >
                    <option value="">Chọn bằng cấp</option>
                    <option value="Không yêu cầu">Không yêu cầu</option>
                    <option value="THPT">THPT</option>
                    <option value="Cao đẳng">Cao đẳng</option>
                    <option value="Đại học">Đại học</option>
                    <option value="Thạc sĩ">Thạc sĩ</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kinh nghiệm
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    className={selectFieldClass}
                    value={formData.experience}
                    onChange={(e) =>
                      handleInputChange("experience", e.target.value)
                    }
                  >
                    <option value="">Chọn kinh nghiệm</option>
                    <option value="Không yêu cầu">Không yêu cầu</option>
                    <option value="Dưới 1 năm">Dưới 1 năm</option>
                    <option value="1-3 năm">1-3 năm</option>
                    <option value="3-5 năm">3-5 năm</option>
                    <option value="Trên 5 năm">Trên 5 năm</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          {/* Thời gian */}
          <div className="section mb-8">
            <h2 className="section-title flex items-center mb-6">
              <span className="w-1 h-6 bg-green-500 mr-2"></span>
              <span className="text-green-500 font-medium">
                Thông tin thời gian
              </span>
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hạn nộp hồ sơ
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <DatePicker
                    onChange={onChangeApplicationDeadline}
                    className="w-full"
                    size="large"
                    locale={locale}
                    placeholder="Chọn hạn nộp hồ sơ"
                    value={
                      formData.applicationDeadline
                        ? dayjs(formData.applicationDeadline)
                        : null
                    }
                  />
                </div>

                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Thời gian vào làm
                  </label>
                  <DatePicker
                    onChange={onChangeWorkDateIn}
                    className="w-full"
                    size="large"
                    locale={locale}
                    placeholder="Chọn ngày"
                    value={
                      formData.workDateIn ? dayjs(formData.workDateIn) : null
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Mô tả chi tiết */}
          <div className="section mb-8">
            <h2 className="section-title flex items-center mb-6">
              <span className="w-1 h-6 bg-green-500 mr-2"></span>
              <span className="text-green-500 font-medium">Mô tả chi tiết</span>
            </h2>

            <div className="space-y-4">
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mô tả công việc
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <TextAreaForm
                  value={formData.workDetail}
                  onChange={(value) => handleInputChange("workDetail", value)}
                  placeholder="Nhập mô tả công việc"
                />
              </div>

              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Yêu cầu công việc
                </label>
                <TextAreaForm
                  value={formData.jobRequirements}
                  onChange={(value) =>
                    handleInputChange("jobRequirements", value)
                  }
                  placeholder="Nhập yêu cầu khác (nếu có)"
                />
              </div>

              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quyền lợi được hưởng
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <TextAreaForm
                  value={formData.benefits}
                  onChange={(value) => handleInputChange("benefits", value)}
                  placeholder="Nhập quyền lợi dành cho ứng viên"
                />
              </div>
            </div>
          </div>
          {/* Video and Contact Information Section - Third Image */}
          <div className="form-section mb-8">
            <h2 className="section-title flex items-center mb-6">
              <span className="w-1 h-6 bg-green-500 mr-2"></span>
              <span className="text-green-500 font-medium">
                Video giới thiệu về tin đăng
              </span>
            </h2>

            <div className="form-group">
              <div className="radio-item flex items-center">
                <input
                  type="radio"
                  id="link"
                  name="uploadMethod"
                  value="link"
                  checked={formData.uploadMethod === "link"}
                  onChange={() => handleInputChange("uploadMethod", "link")}
                  className="mr-2"
                />
                <label htmlFor="link" className="text-sm select-none">
                  Link liên kết
                </label>
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  className={inputFieldClass}
                  placeholder="Nhập URL video (YouTube, Vimeo,...)"
                  value={formData.videoUrl}
                  onChange={(e) =>
                    handleInputChange("videoUrl", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
          {/* Thông tin liên hệ */}
          <div className="section mb-8">
            <h2 className="section-title flex items-center mb-6">
              <span className="w-1 h-6 bg-green-500 mr-2"></span>
              <span className="text-green-500 font-medium">
                Thông tin liên hệ
              </span>
            </h2>

            <div className="space-y-4">
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tên người liên hệ
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  className={inputFieldClass}
                  value={formData.contactInfo.name}
                  onChange={(e) =>
                    handleNestedInputChange(
                      "contactInfo",
                      "name",
                      e.target.value
                    )
                  }
                  placeholder="Nhập tên liên hệ"
                />
              </div>

              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Địa chỉ liên hệ
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  className={inputFieldClass}
                  value={formData.contactInfo.address}
                  onChange={(e) =>
                    handleNestedInputChange(
                      "contactInfo",
                      "address",
                      e.target.value
                    )
                  }
                  placeholder="Nhập địa chỉ liên hệ"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Số điện thoại liên hệ
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    className={inputFieldClass}
                    value={formData.contactInfo.phone}
                    onChange={(e) =>
                      handleNestedInputChange(
                        "contactInfo",
                        "phone",
                        e.target.value
                      )
                    }
                    placeholder="Nhập số điện thoại liên hệ"
                  />
                </div>

                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email liên hệ
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="email"
                    className={inputFieldClass}
                    value={formData.contactInfo.email}
                    onChange={(e) =>
                      handleNestedInputChange(
                        "contactInfo",
                        "email",
                        e.target.value
                      )
                    }
                    placeholder="Nhập email liên hệ"
                  />
                </div>
              </div>
            </div>
          </div>{" "}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              onClick={handleCancelClick}
            >
              Hủy
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              onClick={() => setShowPreviewModal(true)}
            >
              Xem trước
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={() => {
                if (validateForm()) {
                  handleSave();
                }
              }}
            >
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>

      <Modal
        title="Xác nhận hủy"
        open={showConfirmModal}
        onOk={handleConfirmCancel}
        onCancel={handleCancelModal}
        okText="Đồng ý"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn hủy chỉnh sửa tin tuyển dụng này?</p>
        <p>Các thay đổi sẽ không được lưu lại.</p>
      </Modal>
    </div>
  );
};

export default EditJob;
