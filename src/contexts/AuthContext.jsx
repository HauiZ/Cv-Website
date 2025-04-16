// src/contexts/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { testApi } from "../services/api";

const AuthContext = createContext({
  isAuthenticated: false,
  user: {
    userName: "",
    email: "",
    phone: "",
    avatarUrl: "",
  },
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
  
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const fetchUser = async () => {
    const token = localStorage.getItem("access_token");
  if (!token) return;

  try {
    const res = await testApi(); // API trả về { message, user }
    console.log(">>>>>>>>>>User data:", res);

    if (res) {
      console.log("User data found in response:", res);
      setUser(res);
      console.log(">>>>>>>>>User data:>>>", user);
      setIsAuthenticated(true);
    } else {
      console.log(res)
      console.log("No user data found in response.");
      clearUser();
    }
  } catch (err) {
    console.error("Lỗi khi lấy user:", err);
    clearUser();
  }

  };

  // Simple logout without navigation - navigation will be handled by useAuth
  const clearUser = () => {
    localStorage.removeItem("access_token");
    setIsAuthenticated(false);
    setUser(null);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
