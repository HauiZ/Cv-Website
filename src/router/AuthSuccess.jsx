import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from "../contexts/ToastContext";
import { useAuthContext } from "../contexts/AuthContext";
import useLoading from "../hooks/useLoading";
const AuthSuccess = () => {
  const location = useLocation(); 
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { withLoading } = useLoading();
  const { fetchUser } = useAuthContext(); 
  useEffect(() => {
    const handleAuth = async () => {
      const params = new URLSearchParams(location.search);
      const token = params.get('token');

      if (token) {
        localStorage.setItem('access_token', token);
        showToast("Đăng nhập thành công!", "success");

        await withLoading(fetchUser);
        navigate('/');
      } else {
        showToast("Đăng nhập thất bại!", "error");
        navigate('/login');
      }
    };

    handleAuth();
  }, [location, navigate]);

  return null;
};

export default AuthSuccess;
