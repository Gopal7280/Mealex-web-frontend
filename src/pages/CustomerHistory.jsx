
import React, { useEffect, useState } from 'react';
import Navbar from '../layouts/Navbar';
import OwnerHeader from './ownerHeader';
import { useNavigate, useLocation } from 'react-router-dom';
import storage from '../utils/storage';
import { apiPost } from '../services/api';

const CustomerHistory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ limit: 10, offset: 0, hasMore: false });
  const [filter, setFilter] = useState("All");

  const messId = storage.getItem('messId');
  const CustomerId = storage.getItem('CustomerId');

const fetchHistory = async () => {
  if (!messId || !CustomerId) return;

  setLoading(true);
  try {
    const response = await apiPost(
      `/owner/mess/stats/customer/transactions?limit=${pagination.limit}&offset=${pagination.offset}`,
      { messId, customerId: CustomerId }
    );
 console.log('✅ Customer History Response:', response);

    const mappedData = response.data.map(item => ({
      ...item,
      type: item.type === "transaction" ? "Purchased" : "Used",
      tokensCount: item.type === "transaction" ? (item.tokensPurchased || 0) : (item.submittedTokens?.length || 0)
    }));

    // Append if offset > 0
    setHistoryData(prev => pagination.offset === 0 ? mappedData : [ ...mappedData]);

    // Update hasMore from API
    setPagination(prev => ({
      ...prev,
      hasMore: response.pagination?.hasMore || false
    }));

  } catch (err) {
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchHistory();
  }, [pagination.offset]);

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

  // filter records
  const filteredData =
    filter === "All" ? historyData : historyData.filter(item => item.type === filter);

  return (
    <div className="flex h-screen">
      <Navbar />
      {/* <div className="flex-1 p-6 overflow-y-auto bg-[#f9f4f0] min-h-screen"> */}
      <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-gray-50 overflow-y-auto">

          <OwnerHeader />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Customer Details</h2>

          {/* ✅ Tabs */}
          <div className="bg-white rounded-xl shadow-md px-6 py-4">
            <div className="flex gap-6 mb-6 border-b pb-1">
              <button onClick={() => navigate('/owner-customer-profile')} className={`capitalize cursor-pointer text-md font-medium ${currentPath === '/customer-profile' ? 'text-orange-600 border-b-2 border-orange-500' : 'opacity-50 hover:opacity-80'}`}>
                Profile
              </button>
              <button onClick={() => navigate('/customer-profile/plans')} className={`capitalize cursor-pointer text-md font-medium ${currentPath === '/customer-profile/plans' ? 'text-orange-600 border-b-2 border-orange-500' : 'opacity-50 hover:opacity-80'}`}>
                Plans
              </button>
              <button onClick={() => navigate('/customer-profile/history')} className={`capitalize cursor-pointer text-md font-medium ${currentPath === '/customer-profile/history' ? 'text-orange-600 border-b-2 border-orange-500' : 'opacity-50 hover:opacity-80'}`}>
                History
              </button>
            </div>

            {/* ✅ Filter Buttons */}
            <div className="flex items-center gap-4 mb-4">
              {["All", "Purchased", "Used"].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`border  px-3 py-1 cursor-pointer rounded-xl shadow-sm text-sm ${
                    filter === f ? "bg-orange-500 text-white" : "bg-white"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* ✅ Transaction Table */}
            <div className="overflow-x-auto rounded-lg">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="py-3 px-4">Plans</th>
                    <th className="py-3 px-4">Tokens</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Time</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">User</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={6} className="text-center py-4">Loading...</td></tr>
                  ) : filteredData.length === 0 ? (
                    <tr><td colSpan={6} className="text-center py-4 text-gray-500">No history available</td></tr>
                  ) : (
                    filteredData.map((entry, idx) => (
                      <tr key={idx}>
                        <td className="py-2 px-4">{entry.planName || entry.planId || 'N/A'}</td>
                        <td className="py-2 px-4">
                          {entry.type === 'Used' ? (entry.submittedTokens?.length || 0) : (entry.tokensPurchased || 0)}
                        </td>
                        <td className="py-2 px-4">{entry.time ? new Date(entry.time).toLocaleDateString() : 'N/A'}</td>
                        <td className="py-2 px-4">{entry.time ? new Date(entry.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}</td>
                        <td className={`py-2 px-4 font-semibold ${entry.type === 'Purchased' ? 'text-green-600' : 'text-red-600'}`}>
                          {entry.type}
                        </td>
                        <td className="py-2 px-4 text-orange-500">
                          {entry.submittedByName || entry.transactionByName || 'N/A'}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* ✅ Pagination */}
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

export default CustomerHistory;

