import { useCallback } from "react";
import useLoading from "./useLoading";
import { useToast } from "../contexts/ToastContext";
import { useAuthContext } from "../contexts/AuthContext";
import {
  loginCandidateApi,
  createCandidatesApi,
  loginRecruiterApi,
  createRecruterApi,
  forgotPasswordCandidateApi,
  forgotPasswordRecruiterApi,
  inputNewPasswordApi
} from "../services/authApi";

export default function useAuth(navigationCallback = null) {
  const { showToast } = useToast();
  const { withLoading } = useLoading();
  const { isAuthenticated, fetchUser, clearUser } = useAuthContext();

  // LOGIN
  const loginCandidate = useCallback(
    async ({ email, password }) => {
      await withLoading(async () => {
        try {
          const res = await loginCandidateApi(email, password);
          const token = res.data?.token;
          console.log("Login response:", res.data);
          if (token) {
            localStorage.setItem("access_token", token);
            await fetchUser(); // ✅ gọi trực tiếp
            showToast("Đăng nhập thành công!", "success");
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
  const loginRecruiter = useCallback(
    async ({ email, password }) => {
      await withLoading(async () => {
        try {
          const res = await loginRecruiterApi(email, password);
          const token = res.data?.token;
          console.log("Login response:", res.data);
          if (token) {
            localStorage.setItem("access_token", token);
            await fetchUser(); // ✅ gọi trực tiếp
            showToast("Đăng nhập thành công!", "success");
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
  const signUpCandidate = useCallback(
    async ({ userName, email, password, confirmPassword }) => {
      await withLoading(async () => {
        try {
          await createCandidatesApi(userName, email, password, confirmPassword);
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
  const signUpRecruiter = useCallback(
    async ({
      email,
      password,
      confirmPassword,
      businessName,
      phone,
      province,
      district,
    }) => {
      await withLoading(async () => {
        try {
          await createRecruterApi(
            email,
            password,
            confirmPassword,
            businessName,
            phone,
            province,
            district
          );
          showToast("Đăng ký thành công! Vui lòng đăng nhập.", "success");
          if (navigationCallback) {
            navigationCallback("/loginBusiness");
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
  // forgot password
  const forgotPasswordCandidate = useCallback(
    async ({ email }) => {
      await withLoading(async () => {
        try {
          await forgotPasswordCandidateApi(email);
          showToast("Đã gửi email khôi phục mật khẩu!", "success");
          if (navigationCallback) {
            navigationCallback("/InputNewPassword/candidate");
          }
        } catch (err) {
          const msg =
            err?.response?.data?.message || "Khôi phục mật khẩu thất bại!";
          showToast(msg, "error");
          console.error("Forgot password error:", msg);
        }
      });
    },
    [showToast, withLoading, navigationCallback]
  );
  const forgotPasswordRecruiter = useCallback(
    async ({ email }) => {
      await withLoading(async () => {
        try {
          await forgotPasswordRecruiterApi(email);
          showToast("Đã gửi email khôi phục mật khẩu!", "success");
          if (navigationCallback) {
            navigationCallback("/InputNewPassword/recruiter");
          }
        } catch (err) {
          const msg =
            err?.response?.data?.message || "Khôi phục mật khẩu thất bại!";
          showToast(msg, "error");
          console.error("Forgot password error:", msg);
        }
      });
    },
    [showToast, withLoading, navigationCallback]
  );

  const inputNewPassword = useCallback(
    async ({ email,role, otpCode, newPassword, confirmNewPassword }) => {
      await withLoading(async () => {
        try {
          await inputNewPasswordApi(email, role, otpCode, newPassword, confirmNewPassword);
          showToast("Đổi mật khẩu thành công!", "success");
          if (navigationCallback) {
            navigationCallback(`/login/${role}`);
          }
        } catch (err) {
          const msg =
            err?.response?.data?.message || "Đổi mật khẩu thất bại!";
          showToast(msg, "error");
          console.error("Forgot password error:", msg);
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

  return {
    loginCandidate,
    loginRecruiter,
    signUpCandidate,
    signUpRecruiter,
    forgotPasswordCandidate,
    forgotPasswordRecruiter,
    inputNewPassword,
    logOut,
  };
}
