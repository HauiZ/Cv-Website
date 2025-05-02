import React, { useState } from 'react';
import { useAuthContext } from "../../../contexts/AuthContext";
import IntroduceBusiness from "./IntroduceBusiness";
import useCustomFetch from "../../../hooks/useCustomFetch";
import { fetchAreaApi } from "../../../services/userApi";
import TextAreaForm from '../../JobPosting/TextAreaForm';
import Select from "react-select";
import useCustomMutation from '../../../hooks/useCustomMutation';
import { changeProfileBusinessApi } from '../../../services/recruiterApi';
import Loader from "../../../components/Loader";
import useLoading from "../../../hooks/useLoading";

export default function ProfileSettingPage() {
    const { user, fetchUser } = useAuthContext();
    const email = user?.email || '';
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const { loading, withLoading } = useLoading();
    const { data } = useCustomFetch(fetchAreaApi);
    const { mutate } = useCustomMutation(changeProfileBusinessApi);

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
        name: user?.businessName || "",
        phone: user?.phone || "",
        companyAddress: user?.companyAddress || "",
        field: user?.field || "",
        companySize: user?.companySize || "",
        website: user?.website || "",
        introduction: user?.introduction || "",
    });

    const [errors, setErrors] = useState({
        fullName: '',
        phoneNumber: ''
    });

    const [touched, setTouched] = useState({
        fullName: false,
        phoneNumber: false
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));

        setTouched(prev => ({
            ...prev,
            [name]: true
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleTextChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value,
        });
    };

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        if (!formData.name || !formData.name.trim()) {
            newErrors.fullName = 'Vui lòng nhập họ và tên';
            isValid = false;
        }

        if (formData.phone && formData.phone.trim()) {
            const phoneRegex = /^0\d{9}$/;
            if (!phoneRegex.test(formData.phone.trim())) {
                newErrors.phoneNumber = 'Số điện thoại không hợp lệ (phải có 10 số và bắt đầu bằng 0)';
                isValid = false;
            }
        }

        setErrors(newErrors);

        setTouched({
            fullName: true,
            phoneNumber: Boolean(formData.phone)
        });

        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }
        await withLoading(async () => {
            await mutate({
                name: formData.name,
                phone: formData.phone,
                province: selectedProvince.label,
                district: selectedDistrict.label,
                companyAddress: formData.companyAddress,
                field: formData.field,
                companySize: formData.companySize,
                website: formData.website,
                introduction: formData.introduction,
            });
            fetchUser();
        });
        setFormData({
            name: user?.businessName || "",
            phone: user?.phone || "",
            companyAddress: user?.companyAddress || "",
            field: user?.field || "",
            companySize: user?.companySize || "",
            website: user?.website || "",
            introduction: user?.introduction || "",
        });
        setSelectedProvince(null);
        selectedDistrict(null);
    };

    return (
        <div>
            {loading && (
                <div className="absolute inset-0 z-50 flex items-center justify-center">
                    <div className="backdrop-blur-md bg-white/30 p-6 rounded-2xl shadow-xl">
                        <Loader />
                    </div>
                </div>
            )}
            <h2 className="text-xl font-semibold mb-4">Hồ sơ cá nhân</h2>

            <form onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row mb-8 gap-8">
                    <div className="w-full md:w-1/3">
                        <IntroduceBusiness></IntroduceBusiness>
                    </div>

                    <div className="w-full md:w-2/3">
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <h3 className="text-lg font-medium mb-4">Thông tin doanh nghiệp</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tên doanh nghệp</label>
                                    <input
                                        type="text"
                                        id='name'
                                        name="name"
                                        className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 
                                        ${touched.fullName && errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                    {touched.fullName && errors.fullName && (
                                        <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại doanh nghiệp</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 
                                            ${touched.phoneNumber && errors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                    {touched.phoneNumber && errors.phoneNumber && (
                                        <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
                                    )}
                                </div>
                            </div>

                            <div className='mb-4'>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="w-full px-3 py-2 bg-gray-200 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    value={email}
                                    disabled
                                />
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
                                        placeholder={user?.province || "Chọn tỉnh/thành"} 
                                        className="basic-select"
                                        classNamePrefix="select"
                                    />
                                    {!selectedProvince && (
                                        <p className="text-red-500 text-sm mt-1">
                                            Vui lòng chọn tỉnh/thành phố nếu muốn thay đổi
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
                                        placeholder={user?.district ||"Chọn quận/huyện"}
                                        className="basic-select"
                                        classNamePrefix="select"
                                    />
                                    {selectedProvince && !selectedDistrict && (
                                        <p className="text-red-500 text-sm mt-1">
                                            Vui lòng chọn quận/huyện nếu muốn thay đổi
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ</label>
                                <input
                                    type="text"
                                    name="companyAddress"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    value={formData.companyAddress}
                                    onChange={handleChange}
                                    placeholder='123, Cầu Giấy'
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Lĩnh vực doanh nghiệp</label>
                                    <input
                                        type="text"
                                        id='field'
                                        name="field"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        value={formData.field}
                                        onChange={handleChange}
                                        placeholder='Công nghệ thông tin'
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Quy mô doanh nghiệp</label>
                                    <input
                                        type="text"
                                        name="companySize"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        value={formData.companySize}
                                        onChange={handleChange}
                                        placeholder='500-1000'
                                    />
                                </div>
                            </div>

                            <div className='mb-4'>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Website doanh nghiệp</label>
                                <input
                                    type="text"
                                    name="website"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    value={formData.website}
                                    onChange={handleChange}
                                    placeholder='https:/www.com'
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Giới thiệu</label>
                                <TextAreaForm
                                    value={formData.introduction}
                                    onChange={(value) => handleTextChange('introduction', value)}
                                    placeholder={formData.introduction}
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Lưu
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};
