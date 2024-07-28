import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import { TbDatabaseExport } from "react-icons/tb";

const Table = ({ transactions }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentRows, setCurrentRows] = useState([]);

  useEffect(() => {
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    setCurrentRows(transactions.slice(indexOfFirstRow, indexOfLastRow));
  }, [currentPage, rowsPerPage, transactions]);

  const headers = [
    { label: "ID", key: "id" },
    { label: "Title", key: "title" },
    { label: "Price", key: "price" },
    { label: "Description", key: "description" },
    { label: "Category", key: "category" },
    { label: "Sold", key: "sold" },
    { label: "Date of Sale", key: "dateOfSale" }
  ];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(transactions.length / rowsPerPage);

  // Conditional rendering for empty or undefined transactions
  if (!Array.isArray(transactions) || transactions.length === 0) {
    return <div>No transactions available.</div>;
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <CSVLink data={transactions} headers={headers} filename="transactions.csv" className="bg-red-500 text-white px-4 py-2 rounded flex gap-2 items-center hover:scale-105 duration-150">
          <p>Export as CSV</p>
          <TbDatabaseExport/>
        </CSVLink>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              {headers.map(header => (
                <th key={header.key} className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentRows.map((transaction) => (
              <tr key={transaction.id}>
                {headers.map(header => (
                  <td key={header.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {header.key === 'sold' ? (transaction[header.key] ? 'Yes' : 'No') : transaction[header.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div>
          <label>
            Rows per page:
            <select value={rowsPerPage} onChange={(e) => setRowsPerPage(Number(e.target.value))} className="ml-2">
              {[10, 25, 50, 100].map(size => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-300 rounded mr-2 cursor-pointer hover:bg-black hover: text-white duration-150"
          >
            Previous
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-300 rounded cursor-pointer hover:bg-black hover: text-white duration-150"
          >
            Next
          </button>
        </div>
        <div>
          Page {currentPage} of {totalPages}
        </div>
      </div>
    </div>
  );
};

export default Table;