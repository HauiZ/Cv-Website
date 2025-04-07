import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { ToastContainer, toast } from 'react-toastify';

const AuthSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { login } = useAuth();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');

        if (token) {
            login(token);
            toast.success('Đăng nhập thành công!');
            navigate('/');
        } else {
            toast.error('Đăng nhập thất bại!');
            navigate('/login');
        }
    }, [location, navigate, login]);

    return null;
};

export default AuthSuccess;