import React, { useEffect, useState } from 'react';
import Navbar2 from '../layouts/Navbar';
import CustomerHeader from './ownerHeader';
import { CheckSquare, Square } from 'lucide-react';
import storage from '../utils/storage';
import { getSocket, onIncomingOrder, onOrderResponse, onOrderCancelByCustomer } from '../config/socket';
import { apiGet } from '../services/api';
import { useNavigate ,useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Orders = () => {
  const navigate = useNavigate();
  const location = useLocation();
const currentPath = location.pathname

const statusColors = {
  pending: 'border-orange-400 text-orange-500',
  accepted: 'border-green-400 text-green-600',
  rejected: 'border-red-400 text-red-500',
  cancelled: 'border-gray-400 text-gray-500',
};
;


  const [orders, setOrders] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [showPastOrders, setShowPastOrders] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);


  const messId = storage.getItem('messId');

  const isSelected = (id) => selectedOrders.includes(id);


  const toggleOrderSelection = (id) => {
  setSelectedOrders(prev =>
    prev.includes(id) ? prev.filter(orderId => orderId !== id) : [...prev, id]
  );
};


const selectAll = () => {
  const pendingOrders = orders
    .filter(o => o.orderStatus?.toLowerCase() === "pending")
    .map(o => o.orderId || o.id);

  if (selectedOrders.length === pendingOrders.length) {
    setSelectedOrders([]);
  } else {
    setSelectedOrders(pendingOrders);
  }
};



const handleAcceptAll = () => {
  const socket = getSocket();
  if (!socket) return;

  selectedOrders.forEach(orderId => {
    const rawPayload = storage.getItem(`orderPayload_${orderId}`);
    const orderFromState = orders.find(o => o.orderId === orderId) || {};
    const orderPayload = rawPayload ? JSON.parse(rawPayload) : {};

    const finalPayload = {
      ...orderPayload,
      ...orderFromState,
      decision: "accepted",
      updatedAt: new Date().toISOString(),
    };

    // Emit socket event (backend confirm karega)
    socket.emit("owner_order_decision", finalPayload, (response) => {
      if (!response?.success) {
      }
    });
  });

  setSelectedOrders([]);
};

const handleRejectAll = () => {
  const socket = getSocket();
  if (!socket) return;

  selectedOrders.forEach(orderId => {
    const rawPayload = storage.getItem(`orderPayload_${orderId}`);
    const orderFromState = orders.find(o => o.orderId === orderId) || {};
    const orderPayload = rawPayload ? JSON.parse(rawPayload) : {};

    const finalPayload = {
      ...orderPayload,
      ...orderFromState,
      decision: "rejected",
      updatedAt: new Date().toISOString(),
    };

    socket.emit("owner_order_decision", finalPayload, (response) => {
      if (!response?.success) {
      }
    });
  });

  setSelectedOrders([]);
};


  // ------------------- Fetch live orders -------------------
  useEffect(() => {
    if (!messId) return;

    if (!showPastOrders) {
      const savedOrders = JSON.parse(storage.getItem("liveOrders") || "[]");
      if (savedOrders.length > 0) setOrders(savedOrders);

      const fetchOrders = async () => {
        try {
          const res = await apiGet(`/owner/mess/${messId}/orders`);
          if (res.success) {
            const data = res.data || [];
  setTotalOrders(data.length); // ✅ fix here

            const mergedOrders = data.map(o => {
              const rawPayload = storage.getItem(`orderPayload_${o.orderId}`);
              const existingPayload = rawPayload ? JSON.parse(rawPayload) : {};
              const merged = {
                ...existingPayload,
                ...o,
                messName: o.messName || existingPayload.messName || '',
                customerName: o.customerName || existingPayload.customerName || '',
                customerPlanId: o.customerPlanId || existingPayload.customerPlanId || o.planId || '',
                customerPlanName: o.customerPlanName || existingPayload.customerPlanName || o.planName || '',
                submittedTokenIds: o.submittedTokenIds || existingPayload.submittedTokenIds || [],
                orderType: o.orderType || existingPayload.orderType || o.type || 'delivery',
                deliveryAddress: o.deliveryAddress || existingPayload.deliveryAddress || '',
                orderStatus: o.orderStatus || existingPayload.orderStatus || 'pending',
                tokenCount: o.tokenCount || existingPayload.tokenCount || 0,
                tokenStatus: o.tokenStatus || existingPayload.tokenStatus || '',
                totalPrice: o.totalPrice || existingPayload.totalPrice || 0,
                createdAt: o.createdAt || existingPayload.createdAt || new Date().toISOString(),
                updatedAt: o.updatedAt || new Date().toISOString(),
                count: o.count || existingPayload.count || { pending:0, accepted:0, rejected:0, completed:0 },
              };
              storage.setItem(`orderPayload_${o.orderId}`, JSON.stringify(merged));
              return merged;
            });

            storage.setItem("liveOrders", JSON.stringify(mergedOrders));
            setOrders(mergedOrders);
          }
        } catch (err) {
        }
      };

      fetchOrders();
    }
  }, [showPastOrders]);


const [filterType, setFilterType] = useState("today");

// const fetchPastOrders = async (pageNumber = 1, days = null) => {
//   if (!messId) return;

//   try {
//     let url = `/owner/mess/${messId}/orders/past?page=${pageNumber}&limit=10`;
//     if (days) url += `&days=${days}`;

//     const res = await apiGet(url);
//     if (res.success) {
//       const data = res.data || [];
//       setOrders(data);
//       setPage(pageNumber);
//       setTotalOrders(res.pagination?.total || data.length);

//       if (data.length === 10) {
//         setTotalPages(pageNumber + 1);
//       } else {
//         setTotalPages(pageNumber);
//       }
//     }
//   } catch (err) {
//   }
// };

const fetchPastOrders = async (pageNumber = 1, days = null) => {
  if (!messId) return;

  try {
    let url = `/owner/mess/${messId}/orders/past?page=${pageNumber}&limit=10`;
    if (days) url += `&days=${days}`;

    const res = await apiGet(url);

    if (res.success) {
      const data = res.data || [];
      setOrders(data);
      setPage(pageNumber);

      // ✅ Safely handle totalOrders & totalPages
      const total = res.pagination?.total || data.length;
      setTotalOrders(total);

      const pages = Math.ceil(total / 10);
      setTotalPages(pages);
    }
  } catch (err) {
    console.error("Error fetching past orders:", err);
  }
};



  useEffect(() => {
    if (!messId || showPastOrders) return; // socket only for live orders

    const socket = getSocket();
    if (!socket) return;

    socket.off('incoming_order');
    socket.off('order_response');
    socket.off('order_cancel_by_customer');

    onIncomingOrder(res => {
      if (res?.success && res.data?.orderId) {
        const o = res.data;
        const rawPayload = storage.getItem(`orderPayload_${o.orderId}`);
        const existingPayload = rawPayload ? JSON.parse(rawPayload) : {};
        const mergedPayload = { ...existingPayload, ...o };
        storage.setItem(`orderPayload_${o.orderId}`, JSON.stringify(mergedPayload));
     setTotalOrders(prev => prev + 1);   // ✅ new order aaya, total +1

        const existingOrders = JSON.parse(storage.getItem("liveOrders") || "[]");
        const updated = existingOrders.find(x => x.orderId === o.orderId)
          ? existingOrders.map(x => x.orderId === o.orderId ? mergedPayload : x)
          : [...existingOrders, mergedPayload];

        storage.setItem("liveOrders", JSON.stringify(updated));
        setOrders(prev => {
          const exists = prev.find(x => x.orderId === o.orderId);
          return exists ? prev.map(x => x.orderId === o.orderId ? mergedPayload : x) 
          // : [...prev, mergedPayload];
        : [mergedPayload, ...prev];  // ✅ prepend instead of append
        });
      }
    });

 
    onOrderResponse(res => {

  if (res?.success && res.data?.submittedTokenIds?.length > 0) {
    const tokenIds = res.data.submittedTokenIds;
    const newStatus = res.data.status;

    setOrders(prev =>
      prev.map(o =>
        o.submittedTokenIds?.some(id => tokenIds.includes(id))
          ? { ...o, orderStatus: newStatus }
          : o
      )
    );
  }
});


    onOrderCancelByCustomer(res => {
      if (res?.success && res.data?.orderId) {
        const rawPayload = storage.getItem(`orderPayload_${res.data.orderId}`);
        const existingPayload = rawPayload ? JSON.parse(rawPayload) : {};
        const updatedPayload = { ...existingPayload, orderStatus: 'cancelled' };
        storage.setItem(`orderPayload_${res.data.orderId}`, JSON.stringify(updatedPayload));
        setOrders(prev => prev.map(o => o.orderId === res.data.orderId ? updatedPayload : o));
      }
    });

    return () => {
      socket.off('incoming_order');
      socket.off('order_response');
      socket.off('order_cancel_by_customer');
    };
  }, [showPastOrders]);

  // ------------------- Handle accept/reject -------------------
  const handleDecision = (orderId, decision) => {
    const socket = getSocket();
    if (!socket) return;

    const rawPayload = storage.getItem(`orderPayload_${orderId}`);
    const orderFromState = orders.find(o => o.orderId === orderId) || {};
    const orderPayload = rawPayload ? JSON.parse(rawPayload) : {};

    const finalPayload = {
      ...orderPayload,
      ...orderFromState,
      orderStatus: decision,
      decision,
      updatedAt: new Date().toISOString()
    };

    storage.setItem(`orderPayload_${orderId}`, JSON.stringify(finalPayload));
    setOrders(prev => prev.map(o => o.orderId === orderId ? finalPayload : o));
    

    socket.emit('owner_order_decision', finalPayload, response => {
      if (!response?.success) console.warn("❌ Decision failed:", response?.message);
    });
  };

  return (
    <div className="flex h-screen ">
      <Navbar2 />
      <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-gray-50 overflow-y-auto">
        <CustomerHeader/>
     <div className=" p-4 bg-white justify-between mb-4   rounded-2xl shadow">
{!showPastOrders && selectedOrders.length > 0 && (
  <div className="flex justify-between items-center bg-transparent mt-2 mb-3">
    <label
  className="flex items-center gap-2 text-gray-700 font-medium cursor-pointer hover:text-orange-600 transition-colors
 select-none"
  onClick={selectAll}
>
  <span className="text-base">Select All</span>
  {selectedOrders.length ===
  orders.filter(o => o.orderStatus?.toLowerCase() === "pending").length ? (
    <CheckSquare className="text-orange-500 cursor-pointer" size={22} />
  ) : (
    <Square className="text-gray-400 cursor-pointer" size={22} />
  )}
</label>


    <div className="flex gap-3">
      <button
        onClick={handleAcceptAll}
        className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium shadow-sm cursor-pointer hover:opacity-90"
      >
        Accept All ({selectedOrders.length})
      </button>

      <button
        onClick={handleRejectAll}
        className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium shadow-sm cursor-pointer hover:opacity-90"
      >
        Reject All ({selectedOrders.length})
      </button>
    </div>

  </div>
)}

  {/* Tabs section — copied and matched from PurchasedPlans.jsx */}
  <div className="flex gap-6 mb-6 border-b pb-2">
    <button
      onClick={() => navigate('/orders')}
      className={`cursor-pointer capitalize text-md font-medium transition-opacity ${
        currentPath === '/orders'
          ? 'opacity-100 text-orange-600 border-b-2 border-orange-500'
          : 'opacity-50 hover:opacity-80'
      }`}
    >
      Orders
    </button>

    <button
      onClick={() => navigate('/own/purchased-plans')}
      className={`cursor-pointer capitalize text-md font-medium transition-opacity ${
        currentPath === '/own/purchased-plans'
          ? 'opacity-100 text-orange-600 border-b-2 border-orange-500'
          : 'opacity-50 hover:opacity-80'
      }`}
    >
      Plans Requests
    </button>
  </div>

  {/* Header line with filter (same alignment style as PurchasedPlans) */}
  <div className="flex justify-between items-center mb-4">
    <h2 className="font-bold text-[#33363F] text-lg">
      {showPastOrders ? `Past Orders(${orders.length})` : `All Orders(${orders.length})`}
    </h2>

 
    <select
  className="border border-gray-200 rounded px-2 py-1 cursor-pointer"
  value={filterType}
  onChange={(e) => {
    const val = e.target.value;
    setFilterType(val);

    if (val === "today") {
      setShowPastOrders(false);
    } else if (val === "7days") {
      setShowPastOrders(true);
      fetchPastOrders(1, 7);
    } else if (val === "30days") {
      setShowPastOrders(true);
      fetchPastOrders(1, 30); // ✅ same API, just 30 days instead of 7
    }
  }}
>
  <option value="today">Today</option>
  <option value="7days">Last 7 Days</option>
  <option value="30days">Last 30 Days</option>
</select>

  </div>



          {orders.map((order) => (
<div
  key={order.orderId || order.id}
  className={`bg-white border rounded-lg mb-4 ${
    statusColors[order.orderStatus?.toLowerCase()] || 'border-orange-400 text-orange-500'
  }`}
>
  <div
    className={`rounded-lg p-4 relative ${
      isSelected(order.orderId || order.id)
        ? 'bg-orange-50 border border-orange-400'
        : 'border border-gray-200'
    }`}
  >
    <p
      className={`text-sm font-bold mb-3 ${
        statusColors[order.orderStatus?.toLowerCase()] || 'text-orange-500'
      }`}
    >
      {(order.orderStatus || 'PENDING').toUpperCase()}
    </p>

{!showPastOrders && order.orderStatus?.toLowerCase() === 'pending' && (
             
                  <button
  className="absolute top-4 cursor-pointer right-4"
  onClick={() => toggleOrderSelection(order.orderId || order.id)}
>
  {isSelected(order.orderId || order.id) ? <CheckSquare /> : <Square />}
</button>

                )}
                <div className="overflow-x-auto">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 text-center font-poppins font-medium text-gray-700 py-4 border-t border-t-[#DEDEDE] border-b border-b-[#DEDEDE] text-xs sm:text-sm md:text-base">
    <span className="md:border-r border-b md:border-b-0 border-[#DEDEDE] text-[#3C3C4399] p-2 break-words">
      {order.customerName}
    </span>
    <span className="md:border-r border-b md:border-b-0 border-[#DEDEDE] text-[#3C3C4399] p-2 break-words">
      {order.customerPlanName || order.planName}
    </span>
    <span className="md:border-r border-b md:border-b-0 border-[#DEDEDE] text-[#3C3C4399] p-2 break-words">
      {order.tokenCount} Token(s)
    </span>
    <span className="md:border-r border-b md:border-b-0 border-[#DEDEDE] text-[#3C3C4399] p-2 break-words">
      {new Date(order.createdAt).toLocaleTimeString()}
    </span>
    <span className="md:border-r border-b md:border-b-0 border-[#DEDEDE] text-[#3C3C4399] p-2 break-words">
      {new Date(order.createdAt).toLocaleDateString()}
    </span>

    {!showPastOrders ? (
      order.orderStatus === "pending" || !order.orderStatus ? (
        <>
          <button
            onClick={() => handleDecision(order.orderId, "accepted")}
            className="md:border-r border-b md:border-b-0 cursor-pointer border-gray-300 text-green-600 font-bold w-full py-2"
          >
            ACCEPT
          </button>
          <button
            onClick={() => handleDecision(order.orderId, "rejected")}
            className="text-red-600 font-bold cursor-pointer w-full py-2"
          >
            REJECT
          </button>
        </>
      ) : (
        <span className="col-span-2 text-gray-400 italic text-center py-2">
          Action taken
        </span>
      )
    ) : (
      <span className="col-span-2 text-gray-400 italic text-center py-2">
        Past Order
      </span>
    )}
  </div>
</div>


                <div className="mt-2 text-sm text-gray-700 p-1">
<span
  className={`inline-block font-poppins font-bold md:ml-3 px-2 py-0.5 rounded mr-2 text-sm border ${
    statusColors[order.orderStatus?.toLowerCase()] || 'border-orange-400 text-orange-500'
  }`}
>
  {order.orderType?.toLowerCase() === 'dine' ? 'Dine-in' : order.orderType || order.type}
</span>


                  <span className="font-poppins font-medium text-sm text-[#393939]">{order.deliveryAddress}</span>
                </div>
              </div>
            </div>
          ))}
{/* 
          {showPastOrders && (
            <div className="flex justify-between mt-4">
              <button
                className="bg-gray-200 cursor-pointer px-3 py-1 rounded disabled:opacity-50"
                disabled={page <= 1}
                onClick={() => fetchPastOrders(page - 1)}
              >
                Previous
              </button>
              <button
                className="bg-gray-200 px-3 cursor-pointer py-1 rounded disabled:opacity-50"
                disabled={page >= totalPages}
                onClick={() => fetchPastOrders(page + 1)}
              >
                Next
              </button>
            </div>
          )} */}
          {showPastOrders && (
  <div className="flex justify-between mt-4">
    <button
      className="bg-gray-200 text-gray-700 cursor-pointer px-4 py-2 rounded disabled:opacity-50"
      disabled={page <= 1}
      onClick={() =>
        fetchPastOrders(page - 1, filterType === "7days" ? 7 : 30)
      }
    >
      Previous
    </button>
    <button
      className="px-4 py-2 bg-orange-500 cursor-pointer text-white rounded disabled:opacity-50"
      disabled={page >= totalPages}
      onClick={() =>
        fetchPastOrders(page + 1, filterType === "7days" ? 7 : 30)
      }
    >
      Next
    </button>
  </div>
)}


        </div>
    </div>

    </div>
  );
};

export default Orders;






