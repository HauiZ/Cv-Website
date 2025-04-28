import { useState, useEffect } from 'react';
import { useAuthContext } from "../../contexts/AuthContext";
import useCustomMutation from "../../hooks/useCustomMutation";
import Loader from "../../components/Loader";
import useLoading from "../../hooks/useLoading";
import { changeProfileCandidate } from '../../services/userApi';

export default function PersonalInfoForm() {
    const { user, fetchUser } = useAuthContext();
    const email = user?.email;
    const { mutate } = useCustomMutation(changeProfileCandidate);
    const { loading, withLoading } = useLoading();

    const [formData, setFormData] = useState({
        fullName: user?.userName || '',
        phoneNumber: user?.phone || ''
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

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        if (!formData.fullName || !formData.fullName.trim()) {
            newErrors.fullName = 'Vui lòng nhập họ và tên';
            isValid = false;
        }

        if (formData.phoneNumber && formData.phoneNumber.trim()) {
            const phoneRegex = /^0\d{9}$/;
            if (!phoneRegex.test(formData.phoneNumber.trim())) {
                newErrors.phoneNumber = 'Số điện thoại không hợp lệ (phải có 10 số và bắt đầu bằng 0)';
                isValid = false;
            }
        }

        setErrors(newErrors);

        setTouched({
            fullName: true,
            phoneNumber: Boolean(formData.phoneNumber)
        });

        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const dataToSubmit = {};

        if (formData.fullName) {
            dataToSubmit.name = formData.fullName.trim();
        }

        if (formData.phoneNumber && formData.phoneNumber.trim() !== user?.phone) {
            dataToSubmit.phone = formData.phoneNumber.trim();
        }

        if (Object.keys(dataToSubmit).length > 0) {
            await withLoading(async () => {
                await mutate(dataToSubmit);
                fetchUser();
            });
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md relative">
            {loading && (
                <div className="absolute inset-0 z-50 flex items-center justify-center">
                    <div className="backdrop-blur-md bg-white/30 p-6 rounded-2xl shadow-xl">
                        <Loader />
                    </div>
                </div>
            )}
            <h1 className="text-2xl font-bold mb-4">Cài đặt thông tin cá nhân</h1>
            <p className="text-sm mb-4">(*) Các thông tin bắt buộc</p>

            <div className="mb-4">
                <label htmlFor="email" className="block mb-2">
                    Email:
                </label>
                <input
                    type="email"
                    className="w-full px-3 py-2 rounded-md bg-gray-100"
                    value={email}
                    disabled
                />
            </div>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="fullName" className="block mb-2">
                        Họ và tên: <span className="text-red-500">(*)</span>
                    </label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        placeholder="Nhập họ và tên"
                        value={formData.fullName || ''}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-300 ${touched.fullName && errors.fullName ? 'border-red-500' : 'border-gray-300'
                            }`}
                    />
                    {touched.fullName && errors.fullName && (
                        <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                    )}
                </div>

                <div className="mb-6">
                    <label htmlFor="phoneNumber" className="block mb-2">
                        Số điện thoại:
                    </label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        placeholder="Nhập số điện thoại"
                        value={formData.phoneNumber || ''}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-300 ${touched.phoneNumber && errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                            }`}
                    />
                    {touched.phoneNumber && errors.phoneNumber && (
                        <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="bg-green-400 hover:bg-green-500 text-white font-medium px-8 py-2 rounded transition-colors"
                >
                    Lưu
                </button>
            </form>
        </div>
    );
}