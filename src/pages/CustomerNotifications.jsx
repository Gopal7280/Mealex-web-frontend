




import React, { useEffect, useState } from 'react';
import Navbar2 from '../layouts/Navbar2';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';
import { apiGet } from '../services/api';
import CustomerHeader from '../layouts/CustomerHeader';
import getNotificationStyle from './icons';

const CustomerNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [hasMore, setHasMore] = useState(true);
  const [filter, setFilter] = useState('all'); // all, purchased, used, expiry

  // Mess states
  const [messes, setMesses] = useState([]);
  const [selectedMess, setSelectedMess] = useState('all'); // 'all' or messId

  // Fetch all messes for the customer
  useEffect(() => {
    const fetchCustomerMesses = async () => {
      try {
        const res = await apiGet('/customer/mess/subscribed'); // Adjust this API if different
        if (res?.success) {
  setMesses(res.data || []);
          console.log('Fetched Messes:', res);
        } else {
          setMesses([]);
        }
      } catch (error) {
        console.error("Error fetching customer messes:", error);
        setMesses([]);
      }
    };
    fetchCustomerMesses();
  }, []);

  const fetchNotifications = async (currentPage = 1) => {
    try {
      setLoading(true);
      let res;

      if (selectedMess === 'all') {
        res = await apiGet(`/customer/notifications?page=${currentPage}&limit=${limit}`);
      } else {
        res = await apiGet(
          `/customer/mess/${selectedMess}/notifications?page=${currentPage}&limit=${limit}`
        
        );
      }

    if (res?.success) {
  let data = res.notifications || [];
  console.log('Fetched Notifications:', data);

  // Apply title-based filter
  if (filter !== 'all') {
    data = data.filter((n) => {
      if (filter === 'purchased') {
        return n.title?.toLowerCase().includes("plan purchase successful");
      }
      if (filter === 'used') {
        return (
          n.title?.toLowerCase().includes("new order placed") ||
          n.title?.toLowerCase().includes("order accepted")
        );
      }
      if (filter === 'expiry') {
        return n.title?.toLowerCase().includes("expired");
      }
      return true;
    });
  }

  setNotifications(data);
  setHasMore((res.notifications || []).length === limit);
} else {
  setNotifications([]);
  setHasMore(false);
}

    } finally {
      setLoading(false);
    }
  };

  // Refetch notifications on filter, page, or mess change
  useEffect(() => {
    setPage(1);
    fetchNotifications(1);
  }, [filter, selectedMess]);

  useEffect(() => {
    fetchNotifications(page);
  }, [page]);

  // const getNotificationStyle = (type) => {
  //   switch (type) {
  //     case 'purchased':
  //       return { icon: <CheckCircle className="text-green-600 w-5 h-5" />, color: 'text-green-700' };
  //     case 'expiry':
  //       return { icon: <AlertCircle className="text-red-500 w-5 h-5" />, color: 'text-red-600' };
  //     case 'used':
  //       return { icon: <Info className="text-orange-400 w-5 h-5" />, color: 'text-orange-600' };
  //     default:
  //       return { icon: <Info className="text-gray-400 w-5 h-5" />, color: 'text-gray-700' };
  //   }
  // };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSeconds < 60) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="flex h-screen">
      <Navbar2 />
      {/* <div className="flex-1 p-6 overflow-y-auto bg-[#f9f4f0] min-h-screen"> */}
      <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-gray-50 overflow-y-auto">
            <CustomerHeader />
   
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Notifications</h2>

        {/* Mess Filter Dropdown */}
        <div className="flex gap-3 mb-4">
         
           <select
  value={selectedMess}
  onChange={(e) => {
    setSelectedMess(e.target.value);
    localStorage.setItem('selectedMessId', e.target.value);
  }}
  className="border px-3 py-1 rounded text-sm"
>
  <option value="all">All Messes</option>
  {messes.map((mess) => (
    <option key={mess.messId} value={mess.messId}>
      {mess.messName}
    </option>
  ))}
</select>

        </div>

        {/* Type Filter Buttons */}
        <div className="flex gap-3 mb-4">
          <button
            onClick={() => setFilter('purchased')}
            className={`border text-sm px-3 py-1 rounded hover:bg-gray-100 ${
              filter === 'purchased' ? 'border-black font-semibold' : 'border-[#5B5B5B]'
            }`}
          >
            Purchased
          </button>
          <button
            onClick={() => setFilter('used')}
            className={`border text-sm px-3 py-1 rounded hover:bg-gray-100 ${
              filter === 'used' ? 'border-black font-semibold' : 'border-[#5B5B5B]'
            }`}
          >
            Used
          </button>
          <button
            onClick={() => setFilter('expiry')}
            className={`border text-sm px-3 py-1 rounded hover:bg-gray-100 ${
              filter === 'expiry' ? 'border-black font-semibold' : 'border-[#5B5B5B]'
            }`}
          >
            Expiry
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`border text-sm px-3 py-1 rounded hover:bg-gray-100 ${
              filter === 'all' ? 'border-black font-semibold' : 'border-[#5B5B5B]'
            }`}
          >
            All
          </button>
        </div>

        {/* Notification List */}
        <div className="space-y-2">
          {loading ? (
            <p className="text-gray-600">Loading notifications...</p>
          ) : notifications.length === 0 ? (
            <p className="text-gray-600">No notifications found.</p>
          ) : (
            notifications.map((notif, idx) => {
              const { icon, color } = getNotificationStyle(notif.type || "default");
              return (
                <div key={idx} className="grid grid-cols-1 gap-2 w-full bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-3 pb-3">
                      {icon}
                      <div className="text-sm">
                        <p className={`font-semibold ${color}`}>{notif.title || notif.planName}</p>
                        <p className="text-gray-700 mt-0.5">
                          {notif.message || `${notif.submittedByName || 'Someone'} performed an action`}
                        </p>
                      </div>
                    </div>
                    <div className="pt-3 text-xs text-gray-500">
                      <span>{formatTimeAgo(notif.time || notif.createdAt)}</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page === 1}
            className={`px-3 py-1 rounded ${
              page === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-500 text-white'
            }`}
          >
            Previous
          </button>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={!hasMore}
            className={`px-3 py-1 rounded ${
              !hasMore ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-500 text-white'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerNotifications;
