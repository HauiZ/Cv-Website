import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser(decoded);
            } catch (error) {
                console.error("Lỗi giải mã token:", error);
                localStorage.removeItem("token"); // Xóa token không hợp lệ
                setUser(null);
            }
        }
    }, []);

    const login = useCallback((token) => {
        localStorage.setItem("token", token);
        try {
            const decoded = jwtDecode(token);
            setUser(decoded);
        } catch (error) {
            console.error("Lỗi giải mã token khi đăng nhập:", error);
            localStorage.removeItem("token"); // Xóa token không hợp lệ
            setUser(null);
        }
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem("token");
        setUser(null);
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);