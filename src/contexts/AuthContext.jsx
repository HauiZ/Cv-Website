import { createContext, useContext, useEffect, useState } from "react";
import { fetchUserApi } from "../services/userApi";

const AuthContext = createContext({
  isAuthenticated: false,
  user: {},
  loadingAuth: true,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);

  const fetchUser = async () => {
    const token = localStorage.getItem("access_token");
    const pathname = window.location.pathname;

    if (!token) {
      clearUser();
      return;
    }

    try {
      if (
        pathname.startsWith("/admin") ||
        pathname.startsWith("/login/admin")
      ) {
        // Không gọi API, set cứng user là admin
        setUser({ role: "admin" });
        setIsAuthenticated(true);
      } else {
        // Candidate và Recruiter dùng chung API
        const res = await fetchUserApi();
        if (res) {
          setUser(res);
          setIsAuthenticated(true);
        } else {
          clearUser();
        }
      }
    } catch (error) {
      console.error("Lỗi khi fetch user:", error);
      clearUser();
    } finally {
      setLoadingAuth(false);
    }
  };

  const clearUser = () => {
    localStorage.removeItem("access_token");
    setUser(null);
    setIsAuthenticated(false);
    setLoadingAuth(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        fetchUser,
        clearUser,
        isAuthenticated,
        setIsAuthenticated,
        loadingAuth,
        setLoadingAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
