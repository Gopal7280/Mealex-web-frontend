



import React, { useEffect, useState } from 'react';
import Navbar from '../layouts/Navbar';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';
import { apiGet } from '../services/api';
import OwnerHeader from './ownerHeader';
import getNotificationStyle from './icons';


const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); 
 const [pagination, setPagination] = useState({});  
  const limit = 10;
  const [hasMore, setHasMore] = useState(true);

  // Mess states
  const [messes, setMesses] = useState([]);
  const [selectedMess, setSelectedMess] = useState("all"); // "all" or messId
  const [gotoPage, setGotoPage] = useState("");


  // Filters
  const [filter, setFilter] = useState("all"); // all, purchased, used, expiry

  // Fetch all messes for owner
  useEffect(() => {
    const fetchOwnerMesses = async () => {
      try {
        const res = await apiGet("/owner/mess/all");
        if (res?.success) {
          setMesses(res.data || []);
        } else {
          setMesses([]);
        }
      } catch (error) {
        console.error("Error fetching owner messes:", error);
        setMesses([]);
      }
    };
    fetchOwnerMesses();
  }, []);

 
  const fetchNotifications = async (currentPage = 1) => {
  try {
    setLoading(true);
    let res;

    if (selectedMess === "all") {
      res = await apiGet(`/owner/notifications?page=${currentPage}&limit=${limit}`);
    } else {
      res = await apiGet(`/owner/mess/${selectedMess}/notifications?page=${currentPage}&limit=${limit}`);
    }

    let data = [];
    if (res?.success) {
      data = res.notifications || [];

      // Apply filter
      if (filter !== "all") {
        data = data.filter((n) => {
          if (filter === "purchased") {
            return n.title?.toLowerCase().includes("plan purchase successful");
          }
          if (filter === "used") {
            return (
              n.title?.toLowerCase().includes("new order placed") ||
              n.title?.toLowerCase().includes("order accepted")
            );
          }
          if (filter === "expiry") {
            return n.title?.toLowerCase().includes("expired");
          }
          return true;
        });
      }

      // Update states
      setNotifications(data);
      setPagination({
        currentPage: res.currentPage || 1,
        totalPages: res.totalPages || 1,
        totalNotifications: res.totalNotifications || 0,
      });
      setHasMore(res.currentPage < res.totalPages);
    } else {
      setNotifications([]);
      setPagination({ currentPage: 1, totalPages: 1, totalNotifications: 0 });
      setHasMore(false);
    }
  } catch (error) {
    console.error("Error fetching notifications:", error);
    setNotifications([]);
    setHasMore(false);
  } finally {
    setLoading(false);
  }
};


  // Refetch on mess or filter change
  useEffect(() => {
    setPage(1);
    fetchNotifications(1);
  }, [filter, selectedMess]);



  // Refetch on page change
  useEffect(() => {
    fetchNotifications(page);
  }, [page]);

  

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
      <Navbar />
      <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-green-50 overflow-y-auto">
        <OwnerHeader />

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Notifications</h2>

        {/* Mess Filter Dropdown */}
        <div className="flex gap-3 mb-4">
          <select
            value={selectedMess}
            onChange={(e) => setSelectedMess(e.target.value)}
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
            onClick={() => setFilter("purchased")}
            className={`border text-sm px-3 py-1 rounded hover:bg-gray-100 ${
              filter === "purchased" ? "border-black font-semibold" : "border-[#5B5B5B]"
            }`}
          >
            Purchased
          </button>
          <button
            onClick={() => setFilter("used")}
            className={`border text-sm px-3 py-1 rounded hover:bg-gray-100 ${
              filter === "used" ? "border-black font-semibold" : "border-[#5B5B5B]"
            }`}
          >
            Used
          </button>
          <button
            onClick={() => setFilter("expiry")}
            className={`border text-sm px-3 py-1 rounded hover:bg-gray-100 ${
              filter === "expiry" ? "border-black font-semibold" : "border-[#5B5B5B]"
            }`}
          >
            Expiry
          </button>
          <button
            onClick={() => setFilter("all")}
            className={`border text-sm px-3 py-1 rounded hover:bg-gray-100 ${
              filter === "all" ? "border-black font-semibold" : "border-[#5B5B5B]"
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
                          {notif.message || `${notif.submittedByName || "Someone"} performed an action`}
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
        {/* <div className="flex justify-between mt-6">
          <button
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page === 1}
            className={`px-3 py-1 rounded ${
              page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-500 text-white"
            }`}
          >
            Previous
          </button>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={!hasMore}
            className={`px-3 py-1 rounded ${
              !hasMore ? "bg-gray-300 cursor-not-allowed" : "bg-gray-500 text-white"
            }`}
          >
            Next
          </button>
        </div> */}
        {/* Pagination Controls */}
{/* Pagination Controls */}
{/* Pagination Controls */}
{pagination?.totalPages > 1 && (
  <div className="flex flex-col items-center mt-6 gap-3">
    {/* Prev / Next */}
    <div className="flex gap-2">
      <button
        disabled={page === 1}
        className="px-3 py-1 rounded bg-gray-200 text-gray-600 disabled:opacity-50"
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
      >
        Prev
      </button>

      <span className="px-3 py-1 text-gray-700">
        Page {page} of {pagination.totalPages}
      </span>

      <button
        disabled={page === pagination.totalPages}
        className="px-3 py-1 rounded bg-gray-200 text-gray-600 disabled:opacity-50"
        onClick={() => setPage((prev) => Math.min(prev + 1, pagination.totalPages))}
      >
        Next
      </button>
    </div>

    {/* Go To Page */}
    <div className="flex gap-2 items-center">
      <input
        type="number"
        min="1"
        max={pagination.totalPages}
        placeholder="Page no."
        className="border px-3 py-1 rounded w-24 text-sm"
        value={gotoPage}
        onChange={(e) => setGotoPage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            const pageNum = Number(gotoPage);
            if (pageNum >= 1 && pageNum <= pagination.totalPages) {
              setPage(pageNum);
            }
            setGotoPage("");
          }
        }}
      />
      <button
        className="px-3 py-1 bg-orange-500 text-white rounded text-sm"
        onClick={() => {
          const pageNum = Number(gotoPage);
          if (pageNum >= 1 && pageNum <= pagination.totalPages) {
            setPage(pageNum);
          }
          setGotoPage("");
        }}
      >
        Go
      </button>
    </div>
  </div>
)}



      </div>
    </div>
  );
};

export default Notifications;
