import { useEffect, useState } from "react";
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
          // Removed the success toast to avoid spamming user with notifications
          // for province/district data fetches
        }
      } catch (err) {
        if (isMounted) {
          const msg = err?.response?.data?.message || "Data fetching failed!";
          showToast(msg, "error");
          console.error("Fetch error:", msg);
          setData(null);
          setError(err);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    getData();

    return () => {
      isMounted = false;
    };
  }, [fetchFunction, ...params, showToast]);

  return { data, loading, error };
}