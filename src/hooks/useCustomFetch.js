import { useEffect, useState } from "react";
import useLoading from "./useLoading";
import { useToast } from "../contexts/ToastContext";

export default function useCustomFetch(fetchFunction, params = []) {
  const { showToast } = useToast();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const getData = async () => {
      try {
        setLoading(true);
        const result = await fetchFunction(...params);
        if (isMounted) {
          setData(result);
          
          setError(null);
          showToast("Fetch done", "success");
        }
      } catch (err) {
        if (isMounted) {
          const msg = err?.response?.data?.message || "Đăng nhập thất bại!";
          showToast(msg, "error");
          console.error("Login error:", msg);
          setData(null);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    getData();

    return () => {
      isMounted = false;
    };
  }, [fetchFunction, ...params]);

  return { data, loading, error };
}
