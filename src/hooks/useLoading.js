import { useState } from "react";

export default function useLoading() {
  const [loading, setLoading] = useState(false);

  const withLoading = async (callback) => {
    setLoading(true);
    try {
      await callback();
    } finally {
      setLoading(false);
    }
  };

  return { loading, setLoading, withLoading };
}
