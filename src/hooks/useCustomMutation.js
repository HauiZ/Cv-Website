import { useState } from "react";
import { useToast } from "../contexts/ToastContext";

export default function useCustomMutation(mutationFunction) {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = async (...params) => {
    setLoading(true);
    setError(null);
    try {
      const result = await mutationFunction(...params);
      showToast("Action successful!", "success");
      return result;
    } catch (err) {
      const msg = err?.response?.data?.message || "Action failed!";
      showToast(msg, "error");
      setError(err);
      throw err; // để caller biết lỗi nếu cần
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error };
}
