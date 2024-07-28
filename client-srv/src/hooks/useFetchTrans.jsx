import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchTrans = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [month, setMonth] = useState('March');
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get('http://localhost:4000/api/transactions', {
          params: { month, page, search: searchTerm },
        });
        setTransactions(response.data.products || []);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching transactions.');
      } finally {
        setLoading(false);
      }
    };

    if (month) {
      fetchTransactions();
    }
  }, [month, page, searchTerm]);

  return { transactions, loading, error, setMonth, setPage, setSearchTerm, page };
};

export default useFetchTrans;
