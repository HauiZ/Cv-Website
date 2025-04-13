import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLoader } from "../contexts/LoaderContext";

const RouteChangeLoader = () => {
  const location = useLocation();
  const { showLoader, hideLoader } = useLoader();
  
  useEffect(() => {
    // Hiển thị loader khi bắt đầu chuyển trang
    showLoader();
    
    // Ẩn loader sau một khoảng thời gian ngắn
    const timer = setTimeout(() => {
      hideLoader();
    }, 300);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return null;
};

export default RouteChangeLoader;