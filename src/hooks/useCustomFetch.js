import { useEffect, useState, useCallback } from "react";
import { useToast } from "../contexts/ToastContext";

export default function useCustomFetch(fetchFunction, params = []) {
  const { showToast } = useToast();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refetch = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
  }, []);

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
          // showToast(msg, "error");
          console.error("Fetch error:", msg);
          setData(null);
          setError(err);
        }
      } finally {
        console.log("Loading finished", ...params);
        if (isMounted) setLoading(false);
      }
    };

    getData();

    return () => {
      isMounted = false;
    };
  }, [fetchFunction, ...params, refreshTrigger]);

  return { data, loading, error, refetch };
}
