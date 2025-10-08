import { useState, useEffect } from 'react';
import { useAuthContext } from "../../contexts/AuthContext";
import useCustomMutation from "../../hooks/useCustomMutation";
import Loader from "../../components/Loader";
import useLoading from "../../hooks/useLoading";
import { changeProfileCandidate } from '../../services/userApi';

const EDUCATION_OPTIONS = [
  "Sinh viên/Thực tập", "Trung cấp/Cao đẳng", "Đại học", "Thạc sĩ", "Tiến sĩ", "Khác"
];

const LOCATION_OPTIONS = [
  "TP. Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Cần Thơ", "Hải Phòng", "Khác"
];

// --- Modal xác nhận ---
function ConfirmDialog({ open, onCancel, onConfirm, changes }) {
  if (!open) return null;
  const visibleKeys = Object.keys(changes || {});
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onCancel} />
      <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-xl p-6">
        <h3 className="text-lg font-semibold">Xác nhận lưu thay đổi</h3>
        {visibleKeys.length === 0 ? (
          <p className="mt-3 text-gray-600">Không có gì thay đổi.</p>
        ) : (
          <div className="mt-4 max-h-64 overflow-auto">
            <ul className="space-y-2 text-sm">
              {visibleKeys.map((k) => (
                <li key={k} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                  <div>
                    <div className="font-medium">
                      {({
                        userName: "Họ và tên",
                        phone: "Số điện thoại",
                        desiredJob: "Công việc mong muốn",
                        location: "Địa điểm",
                        skills: "Kỹ năng",
                        expectedSalary: "Mức lương mong đợi",
                        yearsExperience: "Kinh nghiệm (năm)",
                        educationLevel: "Trình độ hiện tại",
                        about: "Mô tả bản thân"
                      }[k]) || k}
                    </div>
                    <div className="text-gray-600">
                      {Array.isArray(changes[k]) ? changes[k].join(", ") : String(changes[k] ?? "")}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white"
            disabled={visibleKeys.length === 0}
          >
            Xác nhận lưu
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PersonalInfoForm() {
  const { user, fetchUser } = useAuthContext();
  const email = user?.email || "";
  const { mutate } = useCustomMutation(changeProfileCandidate);
  const { loading, withLoading } = useLoading();

  const [formData, setFormData] = useState({
    fullName: user?.userName || "",
    phoneNumber: user?.phone || "",
    desiredJob: user?.desiredJob || "",
    location: user?.location || "",
    skills: Array.isArray(user?.skills) ? user.skills : [],
    expectedSalary: user?.expectedSalary || "",
    yearsExperience: user?.yearsExperience ?? "",
    educationLevel: user?.educationLevel || "",
    about: user?.about || ""
  });

  const [skillInput, setSkillInput] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingChanges, setPendingChanges] = useState({}); // dataToSubmit đã diff

  useEffect(() => {
    setFormData({
      fullName: user?.userName || "",
      phoneNumber: user?.phone || "",
      desiredJob: user?.desiredJob || "",
      location: user?.location || "",
      skills: Array.isArray(user?.skills) ? user.skills : [],
      expectedSalary: user?.expectedSalary || "",
      yearsExperience: user?.yearsExperience ?? "",
      educationLevel: user?.educationLevel || "",
      about: user?.about || ""
    });
  }, [user]);

  const setField = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setField(name, value);
  };

  // skills
  const addSkill = (raw) => {
    const token = String(raw).trim();
    if (!token) return;
    if (formData.skills.includes(token)) return;
    setFormData(prev => ({ ...prev, skills: [...prev.skills, token] }));
    setSkillInput("");
    setTouched(prev => ({ ...prev, skills: true }));
  };
  const removeSkill = (skill) => {
    setFormData(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }));
    setTouched(prev => ({ ...prev, skills: true }));
  };
  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const parts = skillInput.split(",").map(s => s.trim()).filter(Boolean);
      if (parts.length) parts.forEach(addSkill);
      else addSkill(skillInput);
    }
  };
  const handleSkillBlur = () => {
    if (skillInput.trim()) addSkill(skillInput);
  };

  // validate
  const validateForm = () => {
    const next = {};
    let ok = true;

    if (!formData.fullName || !formData.fullName.trim()) {
      next.fullName = "Vui lòng nhập họ và tên";
      ok = false;
    }
    if (formData.phoneNumber && formData.phoneNumber.trim()) {
      const phoneRegex = /^0\d{9}$/;
      if (!phoneRegex.test(formData.phoneNumber.trim())) {
        next.phoneNumber = "SĐT không hợp lệ (10 số, bắt đầu bằng 0)";
        ok = false;
      }
    }
    if (formData.expectedSalary !== "" && (Number.isNaN(Number(formData.expectedSalary)) || Number(formData.expectedSalary) < 0)) {
      next.expectedSalary = "Mức lương phải là số ≥ 0";
      ok = false;
    }
    if (formData.yearsExperience !== "" && (Number.isNaN(Number(formData.yearsExperience)) || Number(formData.yearsExperience) < 0)) {
      next.yearsExperience = "Kinh nghiệm (năm) phải là số ≥ 0";
      ok = false;
    }
    if (formData.about && formData.about.length > 1000) {
      next.about = "Mô tả tối đa 1000 ký tự";
      ok = false;
    }

    setErrors(next);
    setTouched({
      fullName: true,
      phoneNumber: true,
      desiredJob: true,
      location: true,
      skills: true,
      expectedSalary: true,
      yearsExperience: true,
      educationLevel: true,
      about: true
    });
    return ok;
  };

  // build diff để show trong popup & gửi lên server
  const buildChanges = () => {
    const out = {};
    const putIfChanged = (kUser, vForm) => {
      const oldVal = user?.[kUser];
      if (Array.isArray(vForm)) {
        if (JSON.stringify(oldVal || []) !== JSON.stringify(vForm)) out[kUser] = vForm;
      } else {
        if ((oldVal ?? "") !== (vForm ?? "")) out[kUser] = vForm;
      }
    };
    putIfChanged("name", formData.fullName);
    putIfChanged("phone", formData.phoneNumber);
    putIfChanged("desiredJob", formData.desiredJob);
    putIfChanged("location", formData.location);
    putIfChanged("skills", formData.skills);
    putIfChanged("expectedSalary", formData.expectedSalary === "" ? "" : Number(formData.expectedSalary));
    putIfChanged("yearsExperience", formData.yearsExperience === "" ? "" : Number(formData.yearsExperience));
    putIfChanged("educationLevel", formData.educationLevel);
    putIfChanged("about", formData.about);
    return out;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const diff = buildChanges();
    setPendingChanges(diff);
    setConfirmOpen(true);
  };

  const confirmAndSave = async () => {
    setConfirmOpen(false);
    if (Object.keys(pendingChanges).length === 0) return;
    await withLoading(async () => {
      await mutate(pendingChanges);
      await fetchUser();
    });
  };

  // UI
  const inputBase = "w-full px-3 py-2 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-emerald-300 border-gray-300";
  const labelBase = "block text-sm font-medium mb-1";

  return (
    <div className="max-w-3xl mx-auto">
      <div className="relative bg-white/80 backdrop-blur rounded-2xl shadow p-6 md:p-8 ring-1 ring-gray-100">
        {loading && (
          <div className="absolute inset-0 z-50 flex items-center justify-center rounded-2xl bg-white/50 backdrop-blur">
            <div className="p-5 rounded-xl shadow bg-white">
              <Loader />
            </div>
          </div>
        )}

        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Cài đặt thông tin cá nhân</h1>
        <p className="text-gray-500 mt-1">(*) là thông tin bắt buộc</p>

        {/* Email readonly */}
        <div className="mt-6">
          <label className={labelBase}>Email:</label>
          <input type="email" className="w-full px-3 py-2 rounded-lg bg-gray-100 border border-gray-200" value={user?.email || ""} disabled />
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="fullName" className={labelBase}>Họ và tên <span className="text-red-500">*</span></label>
              <input
                id="fullName" name="fullName" type="text" placeholder="VD: Nguyễn Văn A"
                value={formData.fullName} onChange={handleChange}
                className={`${inputBase} ${touched.fullName && errors.fullName ? 'border-red-500 ring-red-200' : ''}`}
              />
              {touched.fullName && errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
            </div>

            <div>
              <label htmlFor="phoneNumber" className={labelBase}>Số điện thoại</label>
              <input
                id="phoneNumber" name="phoneNumber" type="tel" placeholder="0xxxxxxxxx"
                value={formData.phoneNumber} onChange={handleChange}
                className={`${inputBase} ${touched.phoneNumber && errors.phoneNumber ? 'border-red-500 ring-red-200' : ''}`}
              />
              {touched.phoneNumber && errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
            </div>

            <div>
              <label htmlFor="desiredJob" className={labelBase}>Công việc mong muốn</label>
              <input
                id="desiredJob" name="desiredJob" type="text" placeholder="VD: Frontend Developer (React)"
                value={formData.desiredJob} onChange={handleChange}
                className={inputBase}
              />
            </div>

            <div>
              <label htmlFor="location" className={labelBase}>Địa điểm</label>
              <select id="location" name="location" value={formData.location} onChange={handleChange} className={inputBase}>
                <option value="">-- Chọn địa điểm --</option>
                {LOCATION_OPTIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
              </select>
            </div>

            <div>
              <label htmlFor="expectedSalary" className={labelBase}>Mức lương mong đợi (VND/tháng)</label>
              <input
                id="expectedSalary" name="expectedSalary" type="number" min="0" step="100000" placeholder="VD: 15000000"
                value={formData.expectedSalary} onChange={handleChange}
                className={`${inputBase} ${touched.expectedSalary && errors.expectedSalary ? 'border-red-500 ring-red-200' : ''}`}
              />
              {touched.expectedSalary && errors.expectedSalary && <p className="text-red-500 text-sm mt-1">{errors.expectedSalary}</p>}
            </div>

            <div>
              <label htmlFor="yearsExperience" className={labelBase}>Kinh nghiệm (năm)</label>
              <input
                id="yearsExperience" name="yearsExperience" type="number" min="0" step="0.5" placeholder="VD: 1, 2, 3…"
                value={formData.yearsExperience} onChange={handleChange}
                className={`${inputBase} ${touched.yearsExperience && errors.yearsExperience ? 'border-red-500 ring-red-200' : ''}`}
              />
              {touched.yearsExperience && errors.yearsExperience && <p className="text-red-500 text-sm mt-1">{errors.yearsExperience}</p>}
            </div>

            <div>
              <label htmlFor="educationLevel" className={labelBase}>Trình độ hiện tại</label>
              <select
                id="educationLevel" name="educationLevel" value={formData.educationLevel} onChange={handleChange}
                className={inputBase}
              >
                <option value="">-- Chọn trình độ --</option>
                {EDUCATION_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className={labelBase}>Kỹ năng bạn có</label>
              <div className="flex flex-wrap items-center gap-2 p-2 border rounded-lg">
                {formData.skills.map(skill => (
                  <span key={skill} className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {skill}
                    <button type="button" onClick={() => removeSkill(skill)} className="ml-1 rounded-full px-1.5 hover:bg-emerald-100" aria-label={`Xoá ${skill}`}>×</button>
                  </span>
                ))}
                <input
                  type="text" value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={handleSkillKeyDown}
                  onBlur={handleSkillBlur}
                  placeholder="Nhập kỹ năng rồi Enter (VD: React, Node.js)"
                  className="flex-1 min-w-[220px] outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="about" className={labelBase}>Mô tả về bản thân</label>
            <textarea
              id="about" name="about" rows={5}
              placeholder="Giới thiệu ngắn gọn về bạn, dự án nổi bật, định hướng nghề nghiệp…"
              value={formData.about} onChange={handleChange}
              className={inputBase}
            />
            {touched.about && errors.about && <p className="text-red-500 text-sm mt-1">{errors.about}</p>}
            <div className="text-xs text-gray-400 mt-1">{formData.about?.length || 0}/1000</div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setFormData({
                  fullName: user?.userName || "",
                  phoneNumber: user?.phone || "",
                  desiredJob: user?.desiredJob || "",
                  location: user?.location || "",
                  skills: Array.isArray(user?.skills) ? user.skills : [],
                  expectedSalary: user?.expectedSalary || "",
                  yearsExperience: user?.yearsExperience ?? "",
                  educationLevel: user?.educationLevel || "",
                  about: user?.about || ""
                });
                setErrors({});
                setTouched({});
                setSkillInput("");
              }}
              className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
            >
              Hoàn tác
            </button>

            <button
              type="submit"
              className="px-8 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-medium shadow"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>

      {/* Popup xác nhận */}
      <ConfirmDialog
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={confirmAndSave}
        changes={pendingChanges}
      />
    </div>
  );
}
