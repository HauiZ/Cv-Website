import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLoader } from "../contexts/LoaderContext";

export default function ScrollAndLoaderHandler() {
  const location = useLocation();
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    showLoader();
    window.scrollTo(0, 0);

    const timeout = setTimeout(() => {
      hideLoader();
    }, 400); // Giả lập thời gian fetch data

    return () => clearTimeout(timeout);
  }, [location]);

  return null;
}
