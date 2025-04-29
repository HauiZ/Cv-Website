import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, loadingAuth, user } = useAuthContext();

  if (loadingAuth) return null;

  const getLoginPath = (pathname) => {
    if (pathname.startsWith("/admin")) return "/login/admin";
    if (pathname.startsWith("/recruiter")) return "/login/recruiter";
    return "/login/candidate";
  };

  const loginPath = getLoginPath(location.pathname);

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to={loginPath} replace state={{ from: location }} />
  );
};

export default RequireAuth;
