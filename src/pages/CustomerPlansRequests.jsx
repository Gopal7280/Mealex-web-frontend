import { RefreshCw } from 'lucide-react'; // ✅ add at the top
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar2 from '../layouts/Navbar2';
import CustomerHeader from '../layouts/CustomerHeader';
import { apiGet } from '../services/api';
import storage from '../utils/storage';
import toast from 'react-hot-toast';

const CustomerPlansRequests = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('plansRequest');
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState(0);

  const itemsPerPage = 10;
  const customerId = storage.getItem('customerId');

  const fetchRequests = async (page = 1) => {
    if (!customerId) return;
    setLoading(true);
    try {
      const res = await apiGet(
        `/customer/plan/issue/requests?page=${page}&limit=${itemsPerPage}`
      );
      if (res.success) {
        setRequests(res.data || []);
        setHasMore(res.pagination?.totalPages > page);
        setTotal(res.pagination?.totalRecords || 0);
      } else {
        toast.error(res.message || 'Failed to fetch plan requests');
      }
    } catch (err) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page < 1) return;
    if (page > currentPage && !hasMore) return;
    setCurrentPage(page);
  };

  return (
    <div className="flex h-screen">
      <Navbar2 />
      <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-gray-50 overflow-y-auto">
        <CustomerHeader />

        <div className="bg-white rounded-xl shadow p-5 mt-4">
          {/* Tabs */}
          {/* <div className="flex space-x-8 border-b pb-2 mb-4">
            <button
              className={`text-sm cursor-pointer font-semibold ${
                activeTab === 'transaction'
                  ? 'border-b-2 border-orange-500 cursor-pointer text-black'
                  : 'text-gray-500'
              }`}
              onClick={() => navigate('/customer-history')}
            >
              Transaction History
            </button>
            <button
              className={`text-sm font-semibold ${
                activeTab === 'plansRequest'
                  ? 'border-b-2 border-orange-500 cursor-pointer text-black'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('plansRequest')}
            >
              Plans Requests
            </button>
          </div> */}
<div className="flex items-center justify-between border-b pb-2 mb-4">
  {/* Left Tabs */}
  <div className="flex space-x-8">
    <button
      className={`text-sm cursor-pointer font-semibold ${
        activeTab === 'transaction'
          ? 'border-b-2 border-orange-500 cursor-pointer text-black'
          : 'text-gray-500'
      }`}
      onClick={() => navigate('/customer-history')}
    >
      Transaction History
    </button>
    <button
      className={`text-sm font-semibold ${
        activeTab === 'plansRequest'
          ? 'border-b-2 border-orange-500 cursor-pointer text-black'
          : 'text-gray-500'
      }`}
      onClick={() => setActiveTab('plansRequest')}
    >
      Plans Requests
    </button>
  </div>

  {/* Right Refresh Button */}
  <button
    onClick={() => fetchRequests(currentPage)}
    className="flex items-center gap-2 px-3 py-1.5 border cursor-pointer border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition text-sm font-medium"
    title="Refresh"
  >
    <RefreshCw
      className={`w-4 h-4 ${loading ? 'animate-spin text-orange-500' : ''}`}
    />
    Refresh
  </button>
</div>


          {activeTab === 'plansRequest' && (
            <>
              {/* Table */}
              <div className="overflow-x-auto">
                {loading && <p className="text-gray-500">Loading...</p>}
                {!loading && requests.length === 0 ? (
                  <p className="text-gray-500">No plan requests found.</p>
                ) : (
                  <table className="w-full text-sm text-left text-gray-700">
                    <thead className="text-xs uppercase bg-gray-100">
                      <tr>
                        <th className="px-4 py-2">Plan</th>
                        <th className="px-4 py-2">Customer</th>
                        <th className="px-4 py-2">Mess</th>
                        <th className="px-4 py-2">Tokens</th>
                        <th className="px-4 py-2">Menu</th>
                        <th className="px-4 py-2">Price</th>
                        <th className="px-4 py-2">Requested At</th>
                        <th className="px-4 py-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {requests.map((req) => (
                        <tr
                          key={req.requestId}
                          className="border-b border-gray-200 hover:bg-gray-50"
                        >
                          <td className="px-4 py-2">{req.planName}</td>
                          <td className="px-4 py-2">
                            {req.CustomerProfile?.customerName} <br />
                            <span className="text-xs text-gray-500">
                              {req.CustomerProfile?.contactEmail}
                            </span>
                          </td>
                          <td className="px-4 py-2">
                            {req.MessProfile?.messName || 'N/A'}
                          </td>
                          <td className="px-4 py-2">{req.planTotalTokens}</td>
                          <td className="px-4 py-2">
                            {req.planMenu?.join(', ')}
                          </td>
                          <td className="px-4 py-2">₹{req.planPrice}</td>
                          <td className="px-4 py-2">
                            {new Date(req.createdAt).toLocaleString()}
                          </td>
                          <td className="px-4 py-2">
                            <span
                              className={`font-semibold ${
                                req.status === 'pending'
                                  ? 'text-yellow-500'
                                  : req.status === 'accepted'
                                  ? 'text-green-600'
                                  : 'text-red-600'
                              }`}
                            >
                              {req.status?.toUpperCase()}
                            </span>
                            {req.rejectionReason && (
                              <div className="text-xs text-red-600">
                                Reason: {req.rejectionReason}
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Pagination Controls */}
              {requests.length > 0 && (
                <div className="flex justify-center items-center mt-4 space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border cursor-pointer rounded disabled:opacity-50"
                  >
                    Prev
                  </button>

                  <span className="px-2 text-sm text-gray-600">
                    Page {currentPage} / {Math.ceil(total / itemsPerPage)}
                  </span>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={!hasMore}
                    className="px-3 py-1 border rounded cursor-pointer disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerPlansRequests;
