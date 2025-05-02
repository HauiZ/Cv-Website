import { useEffect, useState, useCallback } from "react";
import { useToast } from "../contexts/ToastContext";
import useAuth from "./useAuth"
export default function useCustomFetch(fetchFunction, params = []) {
  const {logOut} = useAuth();
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
       
        }
      } catch (err) {
        if (isMounted) {
          const msg =
            err?.response?.data?.message ||
            err?.message ||
            "Data fetching failed!";
            if(localStorage.getItem("access_token")){
              logOut()
            }
          showToast(msg, "error");
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
  }, [fetchFunction, ...params, refreshTrigger]);

  return { data, loading, error, refetch };
}
