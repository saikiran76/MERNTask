import { useState, useEffect } from 'react';
import axios from 'axios';
import useDebounce from './useDebounce';

const useFetchTrans = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [month, setMonth] = useState('March');
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearchTerm = useDebounce(searchTerm, 200); 

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get('http://localhost:4000/api/transactions', {
          params: { month, page, search: debouncedSearchTerm },
        });
        setTransactions(response.data.products || []);
      } catch (err) {
        console.error('Error fetching transactions:', err);
        setError(err.message || 'An error occurred while fetching transactions.');
      } finally {
        setLoading(false);
      }
    };

    if (month) {
      fetchTransactions();
    }
  }, [month, page, debouncedSearchTerm]);

  return { transactions, loading, error, setMonth, setPage, setSearchTerm, page };
};

export default useFetchTrans;
