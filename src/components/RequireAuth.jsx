import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, loadingAuth } = useAuthContext();

  // ⏳ Đợi auth xác thực xong mới render
  if (loadingAuth) return null; // hoặc spinner tùy bạn

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/loginPersonal" replace state={{ from: location }} />
  );
};

export default RequireAuth;
