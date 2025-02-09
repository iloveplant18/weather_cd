import { useEffect, useState } from "react";
import { FetchError } from "../Types/types.ts";

type UseFetchReturnType<T> = {
  data: T | null;
  error: FetchError;
};

function useFetch<T>(fetchFunction: () => Promise<T>): UseFetchReturnType<T> {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedData: T = await fetchFunction();
        setData(fetchedData);
      } catch (error) {
        if (typeof error === "string") setError(error);
        else if (error instanceof Error) setError(error.message);
      }
    };
    getData();
  }, []);

  return { data, error };
}

export default useFetch;
