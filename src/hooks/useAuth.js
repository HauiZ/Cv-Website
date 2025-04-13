import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { createUsersApi, loginApi } from "../services/api"; // ✅ make sure signupApi is imported
import useLoading from "./useLoading"; // ✅ must be used as a hook
import { useToast } from "../contexts/ToastContext";

export default function useAuth() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { withLoading } = useLoading(); // ✅ fix: use hook, don't import directly

  // LOGIN
  const login = useCallback(async ({ email, password }) => {
    await withLoading(async () => {
      try {
        const res = await loginApi(email, password);
        const token = res.data?.token;

        if (token) {
          localStorage.setItem("access_token", token);
          showToast("Đăng nhập thành công!", "success");
          navigate("/");
        } else {
          showToast("Token không hợp lệ!", "error");
        }
      } catch (err) {
        const msg = err?.response?.data?.message || "Đăng nhập thất bại!";
        showToast(msg, "error");
        console.error("Login error:", msg);
      }
    });
  }, [navigate, showToast, withLoading]);

  // SIGNUP
  const signup = useCallback(async ({ email, password, name }) => {
    await withLoading(async () => {
      try {
        const res = await createUsersApi(email, password, name); // ✅ fix: use correct API name
        const token = res.data?.token;

        if (token) {
          localStorage.setItem("access_token", token);
          showToast("Đăng ký thành công!", "success");
          navigate("/Home");
        } else {
          showToast("Token không hợp lệ!", "error");
        }
      } catch (err) {
        const msg = err?.response?.data?.message || "Đăng ký thất bại!";
        showToast(msg, "error");
        console.error("Signup error:", msg);
      }
    });
  }, [navigate, showToast, withLoading]);

  // LOGOUT
  const logout = useCallback(() => {
    localStorage.removeItem("access_token");
    showToast("Đăng xuất thành công!", "success");
    navigate("/login");
  }, [navigate, showToast]);

  return { login, signup, logout };
}
