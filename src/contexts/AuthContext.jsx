import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from '../utils/axios.customize';

const AuthContext = createContext({
    
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [candidateInfo, setCandidateInfo] = useState(null);
    const [recruiterInfo, setRecruiterInfo] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchUserProfile = useCallback(async (token) => {
        try {
            const response = await axios.get("/users/getProfile", /*{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }*/);
            const userData = response.data.user;
            setUser(userData);
            setRole(userData.roles);

            if (userData.roles?.includes('candidate') && userData.personalUser) {
                setCandidateInfo(userData.personalUser);
            } else {
                setCandidateInfo(null);
            }

            if (userData.roles?.includes('recruiter') && userData.companyUser) {
                setRecruiterInfo(userData.companyUser);
            } else {
                setRecruiterInfo(null);
            }

            setIsAdmin(userData.roles?.includes('admin'));
        } catch (error) {
            console.error('Lỗi khi lấy thông tin profile:', error);
            setUser(null);
            setRole(null);
            setCandidateInfo(null);
            setRecruiterInfo(null);
            setIsAdmin(false);
            localStorage.removeItem("access_token");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUser({ id: decodedToken.id, email: decodedToken.email });
                fetchUserProfile(token);
            } catch (error) {
                console.error("Lỗi giải mã token ban đầu:", error);
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    }, [fetchUserProfile]);

    const login = useCallback((token) => {
        localStorage.setItem("access_token", token);
        try {
            const decodedToken = jwtDecode(token);
            setUser({ id: decodedToken.id, email: decodedToken.email }); 
            fetchUserProfile(token);
        } catch (error) {
            console.error("Lỗi giải mã token khi đăng nhập:", error);
        }
    }, [fetchUserProfile]);

    const logout = useCallback(() => {
        localStorage.removeItem("access_token");
        setUser(null);
        setRole(null);
        setCandidateInfo(null);
        setRecruiterInfo(null);
        setIsAdmin(false);
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            role,
            candidateInfo,
            recruiterInfo,
            isAdmin,
            loading,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);