//last wala

import React, { useEffect, useState } from 'react';
import Navbar2 from '../layouts/Navbar2';
import OwnerHeader from '../layouts/CustomerHeader';
import storage from '../utils/storage';
import { apiPost } from '../services/api';
import { useNavigate } from 'react-router-dom';

const TransactionHistory = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState('transaction');
  const [filterType, setFilterType] = useState('All');

  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState(0);

  const itemsPerPage = 10;
  const messId = storage.getItem('messId');

const handlePageChange = (direction) => {
  if (direction === 'prev' && currentPage > 1) {
    setCurrentPage((prev) => prev - 1);
  } else if (direction === 'next' && hasMore) {
    setCurrentPage((prev) => prev + 1);
  }
};


const fetchTransactions = async (page = 1) => {
  try {
    const offset = (page - 1) * itemsPerPage;
    console.log('Fetching transactions for page:', page, 'with offset:', offset);

    const res = await apiPost('/customer/mess/transaction', {
      messId,
      limit: itemsPerPage,
      offset,
    });

    console.log('API response:', res);

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

      // ✅ Fix pagination updates
      setHasMore(res.pagination?.hasMore || false);
      setTotal(res.pagination?.total || 0);
    }
  } catch (error) {
    console.error('Error fetching transactions', error);
  }
};


  useEffect(() => {
    fetchTransactions(currentPage);
  }, [currentPage]);

  const filteredTransactions =
    filterType === 'All'
      ? transactions
      : transactions.filter((t) => t.type === filterType);

  return (
    <div className="flex h-screen">
      <Navbar2 />
      <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-gray-50 overflow-y-auto">
        <OwnerHeader />

        <div className="bg-white rounded-xl shadow p-5 mt-4">
          {/* Tabs */}
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
    className={`text-sm cursor-pointer font-semibold ${
      activeTab === 'plansRequest'
        ? 'border-b-2 border-orange-500 cursor-pointer text-black'
        : 'text-gray-500'
    }`}
    onClick={() => navigate('/cust/plans-requests')}
  >
    Plans Requests
  </button>
</div>


          {activeTab === 'transaction' && (
            <>
              {/* Filter */}
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

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-700">
                  <thead className="text-xs uppercase bg-gray-100">
                    <tr>
                      <th className="px-4 py-2">User</th>
                      <th className="px-4 py-2">Mess</th>
                      <th className="px-4 py-2">Plans</th>
                      <th className="px-4 py-2">Tokens</th>
                      <th className="px-4 py-2">Date</th>
                      <th className="px-4 py-2">Time</th>
                      <th className="px-4 py-2">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.length === 0 ? (
                      <tr>
                        <td
                          colSpan="6"
                          className="text-center py-4 text-gray-400"
                        >
                          No transactions found.
                        </td>
                      </tr>
                    ) : (
                      filteredTransactions.map((t, index) => (
                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="px-4 py-2">
                            {t.submittedByName || t.transactionByName || 'N/A'}
                          </td>
                          <td className="px-4 py-2">{t.messProfile.messName || 'N/A'}</td>
                          <td className="px-4 py-2">{t.planName || 'N/A'}</td>
                          <td className="px-4 py-2">
                            {t.submittedTokenCount || t.tokensPurchased || 0}
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
             
              <div className="flex justify-center items-center mt-4 space-x-2">
  <button
    onClick={() => handlePageChange('prev')}
    disabled={currentPage === 1}
    className="px-3 py-1 border rounded cursor-pointer disabled:opacity-50"
  >
    Prev
  </button>

  <span className="px-2 text-sm text-gray-600">
    Page {currentPage} / {Math.ceil(total / itemsPerPage)}
  </span>

  <button
    onClick={() => handlePageChange('next')}
    disabled={!hasMore}
    className="px-3 py-1 border rounded cursor-pointer disabled:opacity-50"
  >
    Next
  </button>
</div>

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
