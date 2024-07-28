import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchTrans = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [month, setMonth] = useState('March'); // Default month
  const [page, setPage] = useState(1); // Default page
  const [searchTerm, setSearchTerm] = useState(''); // Default search term

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError(null); // Reset error state before fetching

      try {
        const response = await axios.get('http://localhost:4000/api/transactions', {
          params: { month, page, search: searchTerm },
        });
        setTransactions(response.data.products || []); // Fallback to empty array
      } catch (err) {
        setError(err.message || 'An error occurred while fetching transactions.');
      } finally {
        setLoading(false);
      }
    };

    if (month) { // Ensure month is provided before fetching
      fetchTransactions();
    }
  }, [month, page, searchTerm]);

  return { transactions, loading, error, setMonth, setPage, setSearchTerm, page }; // Return page
};

export default useFetchTrans;