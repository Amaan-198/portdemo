import { useState, useEffect, useCallback } from 'react';

const useFetchData = (apiFunc) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await apiFunc();
      setData(data);
    } catch (err) {
      setError(`Could not fetch data. ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [apiFunc]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

export default useFetchData;