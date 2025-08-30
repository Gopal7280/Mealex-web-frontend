
import React, { useEffect, useState } from 'react';
import Navbar2 from '../layouts/Navbar';
import CustomerHeader from './ownerHeader';
import { CheckSquare, Square } from 'lucide-react';
import storage from '../utils/storage';
import { getSocket, onIncomingOrder, onOrderResponse, onOrderCancelByCustomer } from '../config/socket';
import { apiGet } from '../services/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [showPastOrders, setShowPastOrders] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);


  const messId = storage.getItem('messId');

  const isSelected = (id) => selectedOrders.includes(id);

  // const toggleOrderSelection = (id) => {
  //   if (isSelected(id)) {
  //     setSelectedOrders(selectedOrders.filter((orderId) => orderId !== id));
  //   } else {
  //     setSelectedOrders([...selectedOrders, id]);
  //   }
  // };

  // const selectAll = () => {
  //   if (selectedOrders.length === orders.length) {
  //     setSelectedOrders([]);
  //   } else {
  //     setSelectedOrders(orders.map((o) => o.orderId));
  //   }
  // };
  const toggleOrderSelection = (id) => {
  setSelectedOrders(prev =>
    prev.includes(id) ? prev.filter(orderId => orderId !== id) : [...prev, id]
  );
};

const selectAll = () => {
  if (selectedOrders.length === orders.length) {
    setSelectedOrders([]);
  } else {
    setSelectedOrders(orders.map(o => o.orderId || o.id)); // ✅ consistent key
  }
};


  // const handleAcceptAll = () => {
  //   selectedOrders.forEach(id => handleDecision(id, 'accepted'));
  //   setSelectedOrders([]);
  // };

  // const handleRejectAll = () => {
  //   selectedOrders.forEach(id => handleDecision(id, 'rejected'));
  //   setSelectedOrders([]);
  // };

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
        console.warn("❌ Accept all failed for:", orderId, response?.message);
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
        console.warn("❌ Reject all failed for:", orderId, response?.message);
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
              setTotalOrders(res.total || 0);   // ✅ backend se total count lo

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
          console.error("❌ Error fetching orders:", err);
        }
      };

      fetchOrders();
    }
  }, [showPastOrders]);


  const fetchPastOrders = async (pageNumber = 1) => {
  if (!messId) return;

  try {
    const res = await apiGet(`/owner/mess/${messId}/orders/past?days=7&page=${pageNumber}&limit=10`);
    if (res.success) {
      const data = res.data || [];
      console.log("Past orders fetched:", data);
      setOrders(data);
      setPage(pageNumber);

      // Enable next if 10 items came, else last page
      if (data.length === 10) {
        setTotalPages(pageNumber + 1); 
      } else {
        setTotalPages(pageNumber);
      }
    }
  } catch (err) {
    console.error("❌ Error fetching past orders:", err);
  }
};


  // ------------------- Socket listeners -------------------
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

    // onOrderResponse(res => {
    //   console.log("Order response received:", res);
    //   if (res?.success && res.data?.orderId && res.data?.orderStatus) {
    //     console.log("Order response received:", res.data);
    //     const rawPayload = storage.getItem(`orderPayload_${res.data.orderId}`);
    //     const existingPayload = rawPayload ? JSON.parse(rawPayload) : {};
    //     const updatedPayload = { ...existingPayload, orderStatus: res.data.orderStatus };
    //     storage.setItem(`orderPayload_${res.data.orderId}`, JSON.stringify(updatedPayload));
    //     setOrders(prev => prev.map(o => o.orderId === res.data.orderId ? updatedPayload : o));
    //   }
    // });
    onOrderResponse(res => {
  console.log("Order response received:", res);

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
      {/* <div className="flex-1 p-6 overflow-y-auto bg-[#f9f4f0] min-h-screen"> */}
      <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-green-50 overflow-y-auto">
        <CustomerHeader/>

     
        <div className="flex justify-between items-center mb-2">
  {/* <h2 className="font-bold text-[#33363F] text-lg md:px-4 px-1 mb-4">
    Orders ({orders.length})
  </h2> */}
  <h2 className="font-bold text-[#33363F] text-lg md:px-4 px-1 mb-4">
  Orders ({totalOrders})
</h2>

  
  
</div>


        {selectedOrders.length > 0 && !showPastOrders && (
          <div className="flex justify-between items-center mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedOrders.length === orders.length}
                onChange={selectAll}
              />
              <span>Select All</span>
            </label>
            <div className="space-x-4">
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded"
                onClick={handleAcceptAll}
              >
                Accept All ({selectedOrders.length})
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
                onClick={handleRejectAll}
              >
                Reject All ({selectedOrders.length})
              </button>
            </div>
          </div>
        )}

        <div className="border rounded-lg p-4 bg-white">
          {/* <div className="flex justify-between items-center mb-2">
            
            
          </div> */}
          <div className="flex justify-between items-center mb-2">
  <h2 className="font-bold text-[#33363F] text-lg md:px-4 px-1 mb-4">
              {showPastOrders ? "Past Orders" : "All Orders"}
            </h2>
  
  <div className="relative inline-block text-left">
    <select
      className="border border-gray-200 rounded px-1 py-1"
      value={showPastOrders ? "all" : "today"}
      onChange={(e) => {
        if (e.target.value === "today") {
          setShowPastOrders(false);
        } else {
          setShowPastOrders(true);
          fetchPastOrders(1); // fetch first page of past orders
        }
      }}
    >
      <option value="today">Today </option>
      <option value="all">All Orders</option>
    </select>
  </div>
</div>


          {orders.map((order) => (
            <div key={order.orderId || order.id} className={`bg-white border border-[#FC7C00] rounded-lg mb-4`}>
              <div className={`rounded-lg p-4 relative ${isSelected(order.orderId || order.id) ? 'border-[#FC7C00] bg-orange-50' : 'border-gray-900'}`}>
                <p className="text-sm font-bold text-[#FC7C00] mb-3">{(order.orderStatus || '').toUpperCase()}</p>
                {!showPastOrders && (
                  // <button
                  //   className="absolute top-4 right-4"
                  //   onClick={() => toggleOrderSelection(order.orderId)}
                  // >
                  //   {isSelected(order.orderId) ? <CheckSquare /> : <Square />}
                  // </button>
                  <button
  className="absolute top-4 right-4"
  onClick={() => toggleOrderSelection(order.orderId || order.id)}
>
  {isSelected(order.orderId || order.id) ? <CheckSquare /> : <Square />}
</button>

                )}

                <div className="grid grid-cols-7 text-center font-poppins font-medium text-gray-700 py-4 border-t border-t-[#DEDEDE] border-b border-b-[#DEDEDE]">
                  <span className='border-r border-[#DEDEDE] text-[#3C3C4399] p-1'>{order.customerName}</span>
                  <span className='border-r border-[#DEDEDE] text-[#3C3C4399] p-1'>{order.customerPlanName || order.planName}</span>
                  <span className='border-r border-[#DEDEDE] text-[#3C3C4399] p-1'>{order.tokenCount} Token(s)</span>
                  <span className='border-r border-[#DEDEDE] text-[#3C3C4399] p-1'>{new Date(order.createdAt).toLocaleTimeString()}</span>
                  <span className='border-r border-[#DEDEDE] text-[#3C3C4399] p-1'>{new Date(order.createdAt).toLocaleDateString()}</span>

                  {!showPastOrders ? (
                    order.orderStatus==='pending' || !order.orderStatus ? (
                      <>
                        <button onClick={()=>handleDecision(order.orderId,'accepted')} className="border-r border-gray-300 text-green-600 font-bold">ACCEPT</button>
                        <button onClick={()=>handleDecision(order.orderId,'rejected')} className="text-red-600 font-bold">REJECT</button>
                      </>
                    ) : (
                      <span className="col-span-2 text-gray-400 italic text-center">Action taken</span>
                    )
                  ) : (
                    <span className="col-span-2 text-gray-400 italic text-center">Past Order</span>
                  )}
                </div>

                <div className="mt-2 text-sm text-gray-700 p-1">
                  <span className="inline-block border font-poppins border-green-500 text-green-600 font-bold md:ml-3 px-2 py-0.5 rounded mr-2 text-sm">
                    {order.orderType || order.type}
                  </span>
                  <span className="font-poppins font-medium text-sm text-[#393939]">{order.deliveryAddress}</span>
                </div>
              </div>
            </div>
          ))}

          {showPastOrders && (
            <div className="flex justify-between mt-4">
              <button
                className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
                disabled={page <= 1}
                onClick={() => fetchPastOrders(page - 1)}
              >
                Previous
              </button>
              <button
                className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
                disabled={page >= totalPages}
                onClick={() => fetchPastOrders(page + 1)}
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






