import { useState, useEffect } from 'react';

export const useFetch = (url: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch(url, {method: "GET"});
        const json = await response.json();
      console.log("json: ", json)
        setData(json);
      } catch (err) {
        const errorMessage = (err as Error).message;
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};
