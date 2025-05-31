import { useState } from 'react';
import { useAuthContext } from "../../contexts/AuthContext";
import useCustomMutation from "../../hooks/useCustomMutation";
import { changePassword } from '../../services/userApi';
import Loader from "../../components/Loader";
import useLoading from "../../hooks/useLoading";
import { Eye, EyeOff } from 'lucide-react';

export default function PasswordChangeInterface() {
    const { user } = useAuthContext();
    const email = user?.email;
    const { mutate } = useCustomMutation(changePassword);
    const { loading, withLoading } = useLoading();
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [touched, setTouched] = useState({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false,
    });

    const [showPassword, setShowPassword] = useState({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false,
    });

    const togglePasswordVisibility = (fieldName) => {
        setShowPassword(prev => ({
            ...prev,
            [fieldName]: !prev[fieldName]
        }));
    };

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

    const validatePassword = (password) => {
        if (password.length < 6) {
            return 'Mật khẩu phải có ít nhất 6 ký tự';
        }

        if (!/[A-Z]/.test(password)) {
            return 'Mật khẩu phải chứa ít nhất một chữ in hoa';
        }

        // Kiểm tra có chữ thường
        if (!/[a-z]/.test(password)) {
            return 'Mật khẩu phải chứa ít nhất một chữ thường';
        }

        if (!/[0-9]/.test(password)) {
            return 'Mật khẩu phải chứa ít nhất một chữ số';
        }

        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            return 'Mật khẩu phải chứa ít nhất một ký tự đặc biệt';
        }

        return '';
    };

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        if (!formData.currentPassword.trim()) {
            newErrors.currentPassword = 'Vui lòng nhập mật khẩu hiện tại';
            isValid = false;
        }

        if (!formData.newPassword.trim()) {
            newErrors.newPassword = 'Vui lòng nhập mật khẩu mới';
            isValid = false;
        } else {
            const passwordError = validatePassword(formData.newPassword);
            if (passwordError) {
                newErrors.newPassword = passwordError;
                isValid = false;
            }
        }

        if (!formData.confirmPassword.trim()) {
            newErrors.confirmPassword = 'Vui lòng nhập lại mật khẩu mới';
            isValid = false;
        } else if (formData.confirmPassword !== formData.newPassword) {
            newErrors.confirmPassword = 'Mật khẩu không khớp';
            isValid = false;
        }

        setErrors(newErrors);

        setTouched({
            currentPassword: true,
            newPassword: true,
            confirmPassword: true,
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
                oldPassword: formData.currentPassword,
                newPassword: formData.newPassword,
                confirmNewPassword: formData.confirmPassword,
            });

            setFormData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            });

            // Reset touched và errors
            setTouched({
                currentPassword: false,
                newPassword: false,
                confirmPassword: false,
            });
            setErrors({
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            });
            setShowPassword({
                currentPassword: false,
                newPassword: false,
                confirmPassword: false,
            });
        });
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md relative">
            {loading && (
                <div className="absolute inset-0 z-50 flex items-center justify-center">
                    <div className="backdrop-blur-md bg-white/30 p-6 rounded-2xl shadow-xl">
                        <Loader />
                    </div>
                </div>
            )}
            <h2 className="text-xl font-bold mb-6">Thay đổi mật khẩu đăng nhập</h2>

            <div className="space-y-4">
                <div className="flex items-center">
                    <label className="w-40 text-gray-700">Email đăng nhập:</label>
                    <input
                        type="email"
                        className="flex-1 px-3 py-2 rounded-md bg-gray-100"
                        value={email}
                        disabled
                    />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <div className="flex items-center mb-1">
                            <label className="w-40 text-gray-700">Mật khẩu hiện tại:</label>
                            <div className="flex-1 relative">
                                <input
                                    type={showPassword.currentPassword ? "text" : "password"}
                                    name="currentPassword"
                                    className={`w-full px-3 py-2 pr-10 border rounded-md ${touched.currentPassword && errors.currentPassword ? 'border-red-500' : ''}`}
                                    placeholder="Nhập mật khẩu hiện tại"
                                    value={formData.currentPassword}
                                    onChange={handleChange}
                                />
                                {formData.currentPassword && (
                                    <button
                                        type="button"
                                        onClick={() => togglePasswordVisibility('currentPassword')}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                    >
                                        {showPassword.currentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                )}
                                {touched.currentPassword && errors.currentPassword && (
                                    <p className="text-red-500 text-sm mt-1">{errors.currentPassword}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <div className="flex items-center mb-1">
                            <label className="w-40 text-gray-700">Mật khẩu mới:</label>
                            <div className="flex-1 relative">
                                <input
                                    type={showPassword.newPassword ? "text" : "password"}
                                    name="newPassword"
                                    className={`w-full px-3 py-2 pr-10 border rounded-md ${touched.newPassword && errors.newPassword ? 'border-red-500' : ''}`}
                                    placeholder="Nhập mật khẩu mới"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                />
                                {formData.newPassword && (
                                    <button
                                        type="button"
                                        onClick={() => togglePasswordVisibility('newPassword')}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                    >
                                        {showPassword.newPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                )}
                                {touched.newPassword && errors.newPassword && (
                                    <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <div className="flex items-center mb-1">
                            <label className="w-40 text-gray-700">Nhập lại mật khẩu mới:</label>
                            <div className="flex-1 relative">
                                <input
                                    type={showPassword.confirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    className={`w-full px-3 py-2 pr-10 border rounded-md ${touched.confirmPassword && errors.confirmPassword ? 'border-red-500' : ''}`}
                                    placeholder="Nhập lại mật khẩu mới"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                                {formData.confirmPassword && (
                                    <button
                                        type="button"
                                        onClick={() => togglePasswordVisibility('confirmPassword')}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                    >
                                        {showPassword.confirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                )}
                                {touched.confirmPassword && errors.confirmPassword && (
                                    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex">
                        <div className="w-40"></div>
                        <button
                            className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                            type="button"
                            onClick={handleSubmit}
                        >
                            Cập nhật
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}