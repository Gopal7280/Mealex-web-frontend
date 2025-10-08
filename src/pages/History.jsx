
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiPost } from '../services/api'; // ✅ import api wrapper

import Navbar from '../layouts/Navbar';
import OwnerHeader from '../pages/ownerHeader';
import { useNavigate, useLocation } from 'react-router-dom';

const History = () => {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState('All');
  const [pagination, setPagination] = useState({ limit: 10, offset: 0, hasMore: false });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
    const currentPath = location.pathname;

  const currentTab = location.pathname.split('/').pop(); // 'transactions', 'plans', 'account'

  const token = localStorage.getItem('token');
  const messId = localStorage.getItem('messId');

//   const fetchTransactions = async () => {
    // if (!token || !messId) {
    //   console.error('❌ Token or Mess ID missing');
    //   return;
    // }

//     setLoading(true);
//     try {
   
//        const res = await apiPost(
//         `/owner/mess/stats/transactions?limit=${pagination.limit}&offset=${pagination.offset}`,
//         { messId },
//       );

//       console.log('✅ API Success Response:', res?.data);

//       // if (res.data.success) {
//       //   setTransactions(res.data.data);
//       // ✅ Abhi
// if (Array.isArray(res.data)) {
//   setTransactions(res.data);
// } else if (res.data?.data) {
//   setTransactions(res.data.data);
// }
//         setPagination(prev => ({
//           ...prev,
//           hasMore: res.data.pagination.hasMore,
//         }));
//       }
//     } catch (error) {
//       console.error('❌ Error fetching transactions:', error?.response?.data || error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

// const fetchTransactions = async () => {
//   try {
//     const res = await apiPost(
//       `/owner/mess/stats/transactions?limit=${pagination.limit}&offset=${pagination.offset}`,
//       { messId },
//     );

//     console.log('✅ API Success Response:', res?.data);

//     if (Array.isArray(res.data)) {
//       setTransactions(res.data);
//     } else if (res.data?.data) {
//       setTransactions(res.data.data);
//     }
//   } catch (err) {
//     console.error('❌ API Error:', err);
//   }
// };

const fetchTransactions = async () => {
  if (!token || !messId) {
    return;
  }

  setLoading(true);
  try {
    const res = await apiPost(
      `/owner/mess/stats/transactions?limit=${pagination.limit}&offset=${pagination.offset}`,
      { messId },
    );


    if (res?.success) {
      setTransactions(res.data || []);

      setPagination(prev => ({
        ...prev,
        hasMore: res.pagination?.hasMore || false,
      }));
    }
  } catch (err) {
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchTransactions();
  }, [pagination.offset]);

  const filteredTransactions = transactions.filter(t => {
    if (filter === 'All') return true;
    if (filter === 'Purchased') return t.type === 'transaction';
    if (filter === 'Used') return t.type === 'submission';
    return false;
  });


  
  const handleNext = () => {
    if (pagination.hasMore) {
      setPagination(prev => ({ ...prev, offset: prev.offset + prev.limit }));
    }
  };

  const handlePrevious = () => {
    if (pagination.offset >= pagination.limit) {
      setPagination(prev => ({ ...prev, offset: prev.offset - prev.limit }));
    }
  };

  return (
    <div className="flex h-screen">
      <Navbar />
      {/* <div className="flex-1 p-6 overflow-y-auto bg-[#f9f4f0] min-h-screen"> */}
      <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-gray-50 overflow-y-auto">

        <OwnerHeader />
  <div className="justify-between mb-4 bg-white p-4 rounded-2xl shadow">
           <div className="flex gap-6 bg-white mb-6 border-b pb-2">
              <button onClick={() => navigate('/history')} className={`cursor-pointer capitalize text-md font-medium transition-opacity ${currentPath === '/history' ? 'opacity-100 text-orange-600 border-b-2 border-orange-500' : 'opacity-50 hover:opacity-80'}`}>
                Transactions History 
              </button>
              <button onClick={() => navigate('/owner/history/plans')} className={` cursor-pointer capitalize text-md font-medium transition-opacity ${currentPath === '/owner/history/plans' ? 'opacity-100 text-orange-600 border-b-2 border-orange-500' : 'opacity-50 hover:opacity-80'}`}>
                Plan History
              </button>
              {/* <button onClick={() => navigate('/owner/purchased-plans')} className={`cursor-pointer capitalize text-md font-medium transition-opacity ${currentPath === '/owner/history/account' ? 'opacity-100 text-orange-600 border-b-2 border-orange-500' : 'opacity-50 hover:opacity-80'}`}>
            Plans Requests
              </button> */}
            </div>

        {/* Filters */}
        {/* <div className="flex space-x-4 my-4">
          {['All', 'Purchased', 'Used'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1 rounded cursor-pointer border ${
                filter === f ? 'bg-orange-500 text-white' : 'text-gray-700 border-gray-300'
              }`}
            >
              {f}
            </button>
          ))}
        </div> */}
        <div className="flex flex-wrap gap-2 my-4">
  {['All', 'Purchased', 'Used'].map(f => (
    <button
      key={f}
      onClick={() => setFilter(f)}
      className={`px-4 py-1 rounded cursor-pointer border text-sm sm:text-base ${
        filter === f
          ? 'bg-orange-500 text-white'
          : 'text-gray-700 border-gray-300'
      }`}
    >
      {f}
    </button>
  ))}
</div>


        {/* Table */}
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Plans</th>
                <th className="px-6 py-3">Tokens</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Time</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">User</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-6">Loading...</td>
                </tr>
              ) : filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">No transactions found</td>
                </tr>
              ) : (
                filteredTransactions.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-6 py-4">{item.planName || item.planId || '—'}</td>
                    <td className="px-6 py-4">
                      {/* {item.type === 'submission'
                        ? item.submittedTokens?.length || 0
                        : item.tokensPurchased || 0} */}
                        {item.type === 'submission'
  ? item.submittedTokenCount || 0
  : item.tokensPurchased || 0}

                    </td>
                    <td className="px-6 py-4">
                      {item.time ? new Date(item.time).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      {item.time
                        ? new Date(item.time).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : 'N/A'}
                    </td>
                    {/* <td
                      className={`px-6 py-4 font-semibold ${
                        item.type === 'transaction' ? 'text-green-600' : 'text-red-500'
                      }`}
                    >
                      {item.type}
                    </td> */}
                    <td
  className={`px-6 py-4 font-semibold ${
    item.type === 'transaction' ? 'text-green-600' : 'text-red-500'
  }`}
>
  {item.type === 'transaction' ? 'Purchased' : 'Used'}
</td>

                    <td className="px-6 py-4">
                      {/* {item.type === 'submission' ? item.submittedByName : item.transactionByName || '—'} */}

{item.type === 'submission'
  ? item.submittedByName
  : item.transactionByName || '—'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between mt-4">
          <button
            className="px-4 py-2 cursor-pointer bg-gray-200 text-gray-700 rounded disabled:opacity-50"
            disabled={pagination.offset === 0}
            onClick={handlePrevious}
          >
            Previous
          </button>
          <button
            className="px-4 py-2 cursor-pointer bg-orange-500 text-white rounded disabled:opacity-50"
            disabled={!pagination.hasMore}
            onClick={handleNext}
          >
            Next
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default History;


