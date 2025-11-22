import React, { useEffect, useState } from "react";
import { apiGet } from "../services/api";
import Navbar from "../layouts/Navbar";
import OwnerHeader from "../pages/ownerHeader";
import { useNavigate, useLocation } from "react-router-dom";
import storage from "../utils/storage";

const OrderHistory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const messId = storage.getItem("messId");

  const [orders, setOrders] = useState([]);
  const [days, setDays] = useState(7); // default 7 days history
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showDayOptions, setShowDayOptions] = useState(false);


  // ---------------------------------------------------------------------
  // 📌 API: Fetch Past Orders (same as existing orders page)
  // ---------------------------------------------------------------------
  const fetchPastOrders = async (pageNumber = 1, daysFilter = 7) => {
    if (!messId) return;

    setLoading(true);

    try {
      let url = `/owner/mess/${messId}/orders/past?page=${pageNumber}&limit=10`;
      if (daysFilter) url += `&days=${daysFilter}`;

      const res = await apiGet(url);

      if (res.success) {
        const data = res.data || [];
        setOrders(data);
        setPage(pageNumber);

        const total = res.pagination?.total || data.length;
        const pages = Math.ceil(total / 10);

        setTotalPages(pages);
      }
    } catch (err) {
      console.error("Error fetching past orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPastOrders(page, days);
  }, [page]);

  // ---------------------------------------------------------------------
  // 📌 Date → Calculate days difference → API call
  // ---------------------------------------------------------------------
  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const today = new Date();

    const diff = Math.ceil((today - selectedDate) / (1000 * 60 * 60 * 24));

    if (diff > 0) {
      setDays(diff);
      fetchPastOrders(1, diff); // refresh orders
      setPage(1);
    }
  };

  // ---------------------------------------------------------------------

  return (
    <div className="flex h-screen">
      <Navbar />

      <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-gray-50 overflow-y-auto">
        <OwnerHeader />

        {/* ------------------------ TABS -------------------------------- */}
        <div className="justify-between mb-4 bg-white p-4 rounded-2xl shadow">
          <div className="flex gap-6 bg-white mb-6 border-b pb-2">
            <button
              onClick={() => navigate("/history")}
              className={`cursor-pointer capitalize text-md font-medium transition-opacity ${
                currentPath === "/history"
                  ? "opacity-100 text-orange-600 border-b-2 border-orange-500"
                  : "opacity-50 hover:opacity-80"
              }`}
            >
              Transactions History
            </button>

            <button
              onClick={() => navigate("/own/history/plans")}
              className={`cursor-pointer capitalize text-md font-medium transition-opacity ${
                currentPath === "/own/history/plans"
                  ? "opacity-100 text-orange-600 border-b-2 border-orange-500"
                  : "opacity-50 hover:opacity-80"
              }`}
            >
              Plan History
            </button>

            {/* NEW TAB: ORDER HISTORY */}
            <button
              onClick={() => navigate("/own/history/orders")}
              className={`cursor-pointer capitalize text-md font-medium transition-opacity ${
                currentPath === "/own/history/orders"
                  ? "opacity-100 text-orange-600 border-b-2 border-orange-500"
                  : "opacity-50 hover:opacity-80"
              }`}
            >
              Order History
            </button>
          </div>

       
{/* --------------------- Days Filter Tabs ------------------------ */}
{/* <div className="flex items-center gap-4 my-3">

  <p className="text-gray-700 font-medium">Filter:</p>

  <div className="flex gap-3">
    <button
      onClick={() => {
        setDays(7);
        fetchPastOrders(1, 7);
        setPage(1);
      }}
      className={`px-4 py-2 rounded-md border 
        ${days === 7 ? "bg-orange-500 text-white border-orange-600" : "bg-white hover:bg-gray-100"}`}
    >
      7 Days
    </button>

    <button
      onClick={() => {
        setDays(15);
        fetchPastOrders(1, 15);
        setPage(1);
      }}
      className={`px-4 py-2 rounded-md border 
        ${days === 15 ? "bg-orange-500 text-white border-orange-600" : "bg-white hover:bg-gray-100"}`}
    >
      15 Days
    </button>

    <button
      onClick={() => {
        setDays(31);
        fetchPastOrders(1, 31);
        setPage(1);
      }}
      className={`px-4 py-2 rounded-md border 
        ${days === 31 ? "bg-orange-500 text-white border-orange-600" : "bg-white hover:bg-gray-100"}`}
    >
      31 Days
    </button>
  </div>

  <span className="text-sm text-gray-500">
    Showing last <b>{days}</b> days
  </span>
</div> */}
{/* Search History */}
{/* Search History (Premium Minimal UI) */}
<div className="flex items-center gap-3 my-3 relative">

  <p className="text-gray-700 font-medium">Search History:</p>

  {/* Main Button */}
  <button
    onClick={() => setShowDayOptions(!showDayOptions)}
    className="w-32 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm flex justify-between items-center cursor-pointer hover:bg-gray-50 transition"
  >
    {days} Days
    <span className="text-gray-500">▾</span>
  </button>

  {/* Dropdown */}
  {showDayOptions && (
    <div className="absolute top-full left-40 mt-2 w-32 bg-white border border-gray-300 rounded-md shadow-sm z-50">

      {/* Option Item */}
      <div
        onClick={() => {
          setDays(7);
          fetchPastOrders(1, 7);
          setPage(1);
          setShowDayOptions(false);
        }}
        className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 transition ${
          days === 7 ? "bg-gray-200 font-medium" : ""
        }`}
      >
        7 Days
      </div>

      {/* Option Item */}
      <div
        onClick={() => {
          setDays(15);
          fetchPastOrders(1, 15);
          setPage(1);
          setShowDayOptions(false);
        }}
        className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 transition ${
          days === 15 ? "bg-gray-200 font-medium" : ""
        }`}
      >
        15 Days
      </div>

      {/* Option Item */}
      <div
        onClick={() => {
          setDays(31);
          fetchPastOrders(1, 31);
          setPage(1);
          setShowDayOptions(false);
        }}
        className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 transition ${
          days === 31 ? "bg-gray-200 font-medium" : ""
        }`}
      >
        31 Days
      </div>

    </div>
  )}
</div>


          {/* ------------------------ Table ----------------------------- */}
          <div className="overflow-x-auto bg-white rounded shadow">
            <table className="min-w-full text-sm text-left text-gray-700">
          
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
    <tr>
        <th className="px-6 py-3">Customer</th>
        <th className="px-6 py-3">Plan</th>
        <th className="px-6 py-3">Type</th>
        <th className="px-6 py-3">Address</th>
        <th className="px-6 py-3">Amount</th>
        <th className="px-6 py-3">Date</th>
        <th className="px-6 py-3">Time</th>
    </tr>
</thead>

<tbody>
    {loading ? (
        <tr>
            <td colSpan="7" className="py-6 text-center">
                Loading...
            </td>
        </tr>
    ) : orders.length === 0 ? (
        <tr>
            <td colSpan="7" className="py-6 text-center text-gray-500">
                No orders found
            </td>
        </tr>
    ) : (
        orders.map((order, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
                
                {/* Customer name */}
                <td className="px-6 py-4 font-medium">
                    {order.customerName || "—"}
                </td>

                {/* Plan name */}
                <td className="px-6 py-4">
                    {order.customerPlanName || "—"}
                </td>

                {/* Order type */}
                <td className="px-6 py-4 capitalize">
                    {order.orderType || "—"}
                </td>

                {/* Delivery Address */}
                <td className="px-6 py-4">
                    {order.orderType === "delivery"
                        ? order.deliveryAddress || "—"
                        : "—"}
                </td>

                {/* Amount */}
                <td className="px-6 py-4">
                    ₹ {order.totalPrice?.toFixed(2) || "0.00"}
                </td>

                {/* Date */}
                <td className="px-6 py-4">
                    {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString()
                        : "N/A"}
                </td>

                {/* Time */}
                <td className="px-6 py-4">
                    {order.createdAt
                        ? new Date(order.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                          })
                        : "N/A"}
                </td>
            </tr>
        ))
    )}
</tbody>

            </table>
          </div>

          {/* ------------------------ Pagination ------------------------- */}
          <div className="flex justify-between mt-4">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-4 py-2 bg-gray-200 cursor-pointer rounded disabled:opacity-50"
            >
              Previous
            </button>

            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 bg-orange-500 cursor-pointer text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
