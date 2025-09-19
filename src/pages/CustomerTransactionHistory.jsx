import React, { useEffect, useState } from 'react';
import Navbar2 from '../layouts/Navbar2';
import OwnerHeader from '../layouts/CustomerHeader';

import storage from '../utils/storage';
import { apiPost } from '../services/api';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState('transaction');
  const [filterType, setFilterType] = useState('All');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const messId = storage.getItem('messId');


  const fetchTransactions = async () => {
  try {
    const res = await apiPost('/customer/mess/transaction', { messId });
    console.log(res);
    if (res?.success) {
      const mappedData = (res.data || []).map((t) => ({
        ...t,
        type:
          t.type === 'transaction'
            ? 'Purchased'
            : t.type === 'submission'
            ? 'Used'
            : t.type,
      }));
      setTransactions(mappedData);
    }
  } catch (error) {
    console.error('Error fetching transactions:', error);
  }
};


  useEffect(() => {
    fetchTransactions();
  }, []);


  const filteredTransactions =
  filterType === 'All'
    ? transactions
    : transactions.filter((t) => t.type === filterType);


  // Pagination Logic
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex h-screen">
      <Navbar2 />
      {/* <div className="flex-1 p-6 overflow-y-auto bg-[#f9f4f0] min-h-screen"> */}
      <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-gray-50 overflow-y-auto">

        <OwnerHeader />
        <div className="bg-white rounded-xl shadow p-5 mt-4">
          <div className="flex space-x-8 border-b pb-2 mb-4">
            <button
              className={`text-sm font-semibold ${
                activeTab === 'transaction'
                  ? 'border-b-2 border-orange-500 cursor-pointer text-black'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('transaction')}
            >
              Transaction History
            </button>
            <button
              className={`text-sm font-semibold ${
                activeTab === 'account'
                  ? 'border-b-2 border-orange-500 cursor-pointer text-black'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('account')}
            >
              Account History
            </button>
          </div>

          {activeTab === 'transaction' && (
            <>
              <div className="flex justify-between items-center mb-4">
                <div>
               
                  {['All', 'Purchased', 'Used'].map((type) => (
  <button
    key={type}
    className={`px-3 py-1 text-sm border cursor-pointer rounded-full mr-2 ${
      filterType === type
        ? 'bg-orange-500 text-white'
        : 'bg-gray-100'
    }`}
    onClick={() => {
      setFilterType(type);
      setCurrentPage(1);
    }}
  >
    {type}
  </button>
))}

                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-700">
                  <thead className="text-xs uppercase bg-gray-100">
                    <tr>
                      <th className="px-4 py-2">User</th>
                      <th className="px-4 py-2">Plans</th>
                      <th className="px-4 py-2">Tokens</th>
                      <th className="px-4 py-2">Date</th>
                      <th className="px-4 py-2">Time</th>
                      <th className="px-4 py-2">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedTransactions.length === 0 ? (
                      <tr>
                        <td
                          colSpan="6"
                          className="text-center py-4 text-gray-400"
                        >
                          No transactions found.
                        </td>
                      </tr>
                    ) : (
                      paginatedTransactions.map((t, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-2">
                            {t.submittedByName  || t.transactionByName ||'N/A'}
                          </td>
                          <td className="px-4 py-2">{t.planName || 'N/A'}</td>
                          <td className="px-4 py-2">
                            {t.submittedTokenCount || t.tokensPurchased|| 0}
                          </td>
                          <td className="px-4 py-2">
                            {new Date(t.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-2">
                            {new Date(t.createdAt).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </td>
                          <td className="px-4 py-2">
                         
                            <span
  className={`font-medium ${
    t.type === 'Purchased'
      ? 'text-green-600'
      : t.type === 'Used'
      ? 'text-orange-500'
      : 'text-gray-600'
  }`}
>
  {t.type}
</span>

                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-4 space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border cursor-pointer rounded disabled:opacity-50"
                  >
                    Prev
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => handlePageChange(i + 1)}
                      className={`px-3 py-1 border cursor-pointer rounded ${
                        currentPage === i + 1
                          ? 'bg-orange-500 text-white'
                          : 'bg-white'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded cursor-pointer disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}

          {activeTab === 'account' && (
            <div className="text-gray-500 text-sm italic p-6 text-center">
              Account history feature coming soon...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;  