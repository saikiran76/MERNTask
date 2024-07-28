import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchStat = (month) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStat = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/statistics`, {
          params: { month },
        });
        setData(response.data);
      } catch (err) {
        setError(err);
      }
    };

    if (month) {
      fetchStat();
    }
  }, [month]);

  return { data, error };
};

export default useFetchStat;
