import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, loadingAuth } = useAuthContext();

  if (loadingAuth) return null; 

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login/candidate" replace state={{ from: location }} />
  );
};

export default RequireAuth;
