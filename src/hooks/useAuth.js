import { useCallback } from "react";
import { createUsersApi, loginApi } from "../services/api";
import useLoading from "./useLoading";
import { useToast } from "../contexts/ToastContext";
import { useAuthContext } from "../contexts/AuthContext";

export default function useAuth(navigationCallback = null) {
  const { showToast } = useToast();
  const { withLoading } = useLoading();
  const { isAuthenticated, fetchUser, clearUser } = useAuthContext(); // ✅ fix ở đây

  // LOGIN
  const login = useCallback(
    async ({ email, password }) => {
      await withLoading(async () => {
        try {
          const res = await loginApi(email, password);
          const token = res.data?.token;
          console.log("Login response:", res.data);
          if (token) {
            localStorage.setItem("access_token", token);
            await fetchUser(); // ✅ gọi trực tiếp
            showToast(
              "Đăng nhập thành công!",
              "success"
            );
            if (navigationCallback) {
              navigationCallback("/");
            }
          } else {
            showToast("Token không hợp lệ!", "error");
          }
        } catch (err) {
          const msg = err?.response?.data?.message || "Đăng nhập thất bại!";
          showToast(msg, "error");
          console.error("Login error:", msg);
        }
      });
    },
    [showToast, withLoading, fetchUser, navigationCallback]
  );

  // SIGNUP
  const signUp = useCallback(
    async ({ userName, email, password, confirmPassword }) => {
      await withLoading(async () => {
        try {
          await createUsersApi(userName, email, password, confirmPassword);
          showToast("Đăng ký thành công! Vui lòng đăng nhập.", "success");
          if (navigationCallback) {
            navigationCallback("/login");
          }
        } catch (err) {
          const msg = err?.response?.data?.message || "Đăng ký thất bại!";
          showToast(msg, "error");
          console.error("Signup error:", msg);
        }
      });
    },
    [showToast, withLoading, navigationCallback]
  );

  // LOGOUT
  const logOut = useCallback(() => {
    localStorage.removeItem("access_token");
    clearUser(); // ✅ gọi trực tiếp
    showToast("Đăng xuất thành công!", "success");
    if (navigationCallback) {
      navigationCallback("/");
    }
  }, [showToast, clearUser, navigationCallback]);

  return { login, signUp, logOut };
}
