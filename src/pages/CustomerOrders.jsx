

// import React, { useEffect, useState ,useRef } from 'react';
// import CustomerHeader from '../layouts/CustomerHeader';
// import Navbar2 from '../layouts/Navbar2';
// import { apiGet } from '../services/api';
// import { getSocket } from '../config/socket';
// import { toast } from 'react-hot-toast';

// const statusColors = {
//   pending: 'border-orange-400 text-orange-500',
//   accepted: 'border-green-400 text-green-600',
//   rejected: 'border-red-400 text-red-500',
//   cancelled: 'border-gray-400 text-gray-500'
// };

// const CustomerOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [filteredOrders, setFilteredOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [statusFilter, setStatusFilter] = useState('all');
//   const [timeRange, setTimeRange] = useState('today');
//   const [showDropdown, setShowDropdown] = useState(false);
//   const dropdownRef = useRef(null);

//   const [page, setPage] = useState(1);
//   const limit = 10;
//   const [hasMore, setHasMore] = useState(true);

//   const [messes, setMesses] = useState([]);
//   const [selectedMess, setSelectedMess] = useState('all');

//   useEffect(() => {
//     const fetchMesses = async () => {
//       try {
//         const res = await apiGet('/customer/mess/subscribed');
//         if (res?.success) setMesses(res.data || []);
//       } catch (err) {
//         console.error('Error fetching messes:', err);
//       }
//     };
//     fetchMesses();

//       const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setShowDropdown(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   useEffect(() => {
//     const socket = getSocket();
//     if (!socket) return;

//     const onUpdate = (res) => {
//       if (!res?.success || !res.data) return;
//       const updatedOrder = res.data;
//       const normalizedStatus = updatedOrder?.decision?.toLowerCase() || updatedOrder?.orderStatus?.toLowerCase() || 'pending';

//       setOrders((prev) => {
//         const updated = prev.map(order =>
//           order.orderId === updatedOrder.orderId ? { ...order, orderStatus: normalizedStatus } : order
//         );
//         applyFilter(statusFilter, updated);
//         return updated;
//       });

//       if (['accepted', 'rejected', 'cancelled'].includes(normalizedStatus)) {
//         toast.success(`Order ${normalizedStatus}`);
//       }
//     };

//     socket.on('order_update', onUpdate);
//     return () => socket.off('order_update', onUpdate);
//   }, [statusFilter]);

//   const handleCancelOrder = (order) => {
//     const socket = getSocket();
//     if (!socket) {
//       console.error('❌ No socket connection available.');
//       return;
//     }

//     const tokensArray = Array.isArray(order.submittedTokenIds) ? order.submittedTokenIds : [];
//     if (tokensArray.length === 0) {
//       console.error('❌ Cancel failed: No submittedTokenIds available.');
//       return;
//     }

//     const orderPayload = {
//       orderId: order.orderId,
//       customerPlanId: order.customerPlanId,
//       customerId: order.customerId,
//       orderType: order.orderType,
//       submittedTokenIds: tokensArray,
//     };

//     setOrders((prev) => {
//       const updated = prev.map(o =>
//         o.orderId === order.orderId ? { ...o, orderStatus: 'cancelled' } : o
//       );
//       applyFilter(statusFilter, updated);
//       return updated;
//     });

//     socket.emit('cancel_order', orderPayload, (response) => {
//       if (response?.success) {
//         fetchOrders();
//         toast.success('Order cancelled');
//       } else {
//         console.error('❌ Cancel failed:', response?.message);
//       }
//     });
//   };

//   const applyFilter = (status, allOrders = orders) => {
//     if (status === 'all') {
//       setFilteredOrders(allOrders);
//     } else {
//       setFilteredOrders(allOrders.filter(order => order.orderStatus?.toLowerCase() === status));
//     }
//   };

//   const fetchOrders = async (currentPage = 1) => {
//     try {
//       setLoading(true);
//       let res;
//       const query = `?days=${timeRange === 'today' ? 1 : timeRange}&page=${currentPage}&limit=${limit}`;

//       if (selectedMess === 'all') {
//         res = timeRange === 'today'
//           ? await apiGet(`/customer/mess/orders${query}`)
//           : await apiGet(`/customer/mess/orders/past${query}`);
//       } else {
//         res = await apiGet(`/customer/mess/orders/${selectedMess}${query}`);
//       }

//       if (res?.success) {
//         const data = res.data || [];
//         setOrders(data);
//         applyFilter(statusFilter, data);
//         setHasMore(data.length === limit);
//       } else {
//         setOrders([]);
//         setFilteredOrders([]);
//         setHasMore(false);
//       }
//     } catch (err) {
//       console.error('Error fetching orders:', err);
//       setOrders([]);
//       setFilteredOrders([]);
//       setHasMore(false);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     setPage(1);
//     fetchOrders(1);
//   }, [statusFilter, selectedMess, timeRange]);

//   useEffect(() => {
//     fetchOrders(page);
//   }, [page]);

//   return (
//     <div className="flex h-screen">
//       <Navbar2 />
//       {/* <div className="flex-1 p-6 overflow-y-auto bg-[#f9f4f0] min-h-screen"> */}
//       <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-gray-50 overflow-y-auto">

//           <CustomerHeader />

//           {/* Filters */}
//           <h1 className="text-2xl font-semibold mb-2">Your Orders</h1>
//           <div className="flex gap-2 mb-4 flex-wrap">
//             <select
//               value={selectedMess}
//               onChange={(e) => setSelectedMess(e.target.value)}
//               className="border px-3 py-1 rounded text-sm"
//             >
//               <option value="all">All Messes</option>
//               {messes.map(m => (
//                 <option key={m.messId} value={m.messId}>{m.messName}</option>
//               ))}
//             </select>

//             {['all','pending','accepted','rejected','cancelled'].map(status => (
//               <button
//                 key={status}
//                 className={`px-4 py-1 rounded border ${statusFilter === status ? 'bg-orange-500 text-white' : ''}`}
//                 onClick={() => setStatusFilter(status)}
//               >
//                 {status.charAt(0).toUpperCase() + status.slice(1)}
//               </button>
//             ))}

//             {/* <div  ref={dropdownRef} className="relative inline-block">
//               <button
//                 className="border px-4 py-1 rounded flex items-center"
//                 onClick={() => setShowDropdown(!showDropdown)}
//               >
//                 {timeRange === 'today' ? 'Today' : timeRange === '7' ? 'Last 7 Days' : 'Last 30 Days'} ▾
//               </button>
//               {showDropdown && (
//                 <div className="absolute mt-1 bg-white border rounded shadow">
//                   <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => setTimeRange('today')}>Today</button>
//                   <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => setTimeRange('7')}>Last 7 Days</button>
//                   <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => setTimeRange('30')}>Last 30 Days</button>
//                 </div>
//               )}
//             </div> */}
//             <div ref={dropdownRef} className="relative inline-block">
//   <button
//     className="border px-4 py-1 rounded flex items-center"
//     onClick={(e) => {
//       e.stopPropagation(); // ⬅️ yeh add karo
//       setShowDropdown((prev) => !prev);
//     }}
//   >
//     {timeRange === 'today'
//       ? 'Today'
//       : timeRange === '7'
//       ? 'Last 7 Days'
//       : 'Last 30 Days'} ▾
//   </button>

//   {showDropdown && (
//     <div className="absolute mt-1 bg-white border rounded shadow">
//       <button
//         className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//         onClick={() => {
//           setTimeRange('today');
//           setShowDropdown(false); // ⬅️ option click pe band karo
//         }}
//       >
//         Today
//       </button>
//       <button
//         className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//         onClick={() => {
//           setTimeRange('7');
//           setShowDropdown(false);
//         }}
//       >
//         Last 7 Days
//       </button>
//       <button
//         className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//         onClick={() => {
//           setTimeRange('30');
//           setShowDropdown(false);
//         }}
//       >
//         Last 30 Days
//       </button>
//     </div>
//   )}
// </div>

//           </div>

//           {/* Orders List */}
//           <div className="border rounded-lg p-4 bg-white">
//             <h2 className="font-bold text-[#33363F] text-lg mb-4">All Orders</h2>

//             {loading ? (
//               <div className="text-center text-gray-500">Loading orders...</div>
//             ) : filteredOrders.length === 0 ? (
//               <div className="text-center text-gray-500">No orders found.</div>
//             ) : (
//               filteredOrders.map(order => (
//                 <div
//                   key={order._id}
//                   className={`mb-4 border-l-4 ${statusColors[order.orderStatus?.toLowerCase()]}`}
//                 >
//                   <div className="bg-white border border-orange-500 rounded-lg p-4">
//                     <div className="flex justify-between items-center mb-2">
//                       <span className={`font-bold ${statusColors[order.orderStatus?.toLowerCase()]}`}>
//                         {order.orderStatus?.toUpperCase()}
//                       </span>
//                       {order.orderStatus?.toLowerCase() === 'pending' && (
//                         <button
//                           onClick={() => handleCancelOrder(order)}
//                           className="text-orange-500 font-semibold"
//                         >
//                           CANCEL ORDER
//                         </button>
//                       )}
//                     </div>

//                     <div className="grid grid-cols-5 text-center font-poppins font-medium text-gray-700 border-gray-300 border-t py-4">
//                       <span className='border-r font-semibold p-1'>Customer Name</span>
//                       <span className='border-r font-semibold p-1'>Plan Name</span>
//                       <span className='border-r font-semibold p-1'>No Of Tokens</span>
//                       <span className='border-r font-semibold p-1'>Time</span>
//                       <span className='font-semibold p-1'>Date</span>

//                       <span className='border-r text-[#3C3C4399] p-1'>{order.customerName}</span>
//                       <span className='border-r text-[#3C3C4399] p-1'>{order.customerPlanName}</span>
//                       <span className='border-r text-[#3C3C4399] p-1'>{order.tokenCount}</span>
//                       <span className='border-r text-[#3C3C4399] p-1'>
//                         {new Date(order.createdAt).toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'})}
//                       </span>
//                       <span className='text-[#3C3C4399] p-1'>
//                         {new Date(order.createdAt).toLocaleDateString('en-GB')}
//                       </span>
//                     </div>

//                     <div className="mt-2 text-sm text-gray-700 p-1">
//                       <span className="inline-block border font-poppins border-green-500 text-green-600 font-bold px-2 py-0.5 rounded mr-2 text-sm">
//                         {order.orderType}
//                       </span>
//                       {order.address}
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}

//             {/* Pagination */}
//             {hasMore && (
//               <div className="flex justify-between mt-4">
//                 <button disabled={page===1} className="px-4 py-1 border rounded" onClick={()=>setPage(page-1)}>Previous</button>
//                 <button disabled={!hasMore} className="px-4 py-1 border rounded" onClick={()=>setPage(page+1)}>Next</button>
//               </div>
//             )}
//           </div>
//       </div>
//     </div>
//   );
// };

// export default CustomerOrders;

import React, { useEffect, useState ,useRef } from 'react';
import CustomerHeader from '../layouts/CustomerHeader';
import Navbar2 from '../layouts/Navbar2';
import { apiGet } from '../services/api';
import { getSocket } from '../config/socket';
import { toast } from 'react-hot-toast';

const statusColors = {
  pending: 'border-orange-400 text-orange-500',
  accepted: 'border-green-400 text-green-600',
  rejected: 'border-red-400 text-red-500',
  cancelled: 'border-gray-400 text-gray-500'
};

const CustomerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [statusFilter, setStatusFilter] = useState('all');
  const [timeRange, setTimeRange] = useState('today');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const [page, setPage] = useState(1);
  const limit = 10;
  const [hasMore, setHasMore] = useState(true);

  const [messes, setMesses] = useState([]);
  const [selectedMess, setSelectedMess] = useState('all');

  useEffect(() => {
    const fetchMesses = async () => {
      try {
        const res = await apiGet('/customer/mess/subscribed');
        if (res?.success) setMesses(res.data || []);
      } catch (err) {
        console.error('Error fetching messes:', err);
      }
    };
    fetchMesses();

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const onUpdate = (res) => {
      if (!res?.success || !res.data) return;
      const updatedOrder = res.data;
      const normalizedStatus = updatedOrder?.decision?.toLowerCase() || updatedOrder?.orderStatus?.toLowerCase() || 'pending';

      setOrders((prev) => {
        const updated = prev.map(order =>
          order.orderId === updatedOrder.orderId ? { ...order, orderStatus: normalizedStatus } : order
        );
        applyFilter(statusFilter, updated);
        return updated;
      });

      if (['accepted', 'rejected', 'cancelled'].includes(normalizedStatus)) {
        toast.success(`Order ${normalizedStatus}`);
      }
    };

    socket.on('order_update', onUpdate);
    return () => socket.off('order_update', onUpdate);
  }, [statusFilter]);

  const handleCancelOrder = (order) => {
    const socket = getSocket();
    if (!socket) {
      console.error('❌ No socket connection available.');
      return;
    }

    const tokensArray = Array.isArray(order.submittedTokenIds) ? order.submittedTokenIds : [];
    if (tokensArray.length === 0) {
      console.error('❌ Cancel failed: No submittedTokenIds available.');
      return;
    }

    const orderPayload = {
      orderId: order.orderId,
      customerPlanId: order.customerPlanId,
      customerId: order.customerId,
      orderType: order.orderType,
      submittedTokenIds: tokensArray,
    };

    setOrders((prev) => {
      const updated = prev.map(o =>
        o.orderId === order.orderId ? { ...o, orderStatus: 'cancelled' } : o
      );
      applyFilter(statusFilter, updated);
      return updated;
    });

    socket.emit('cancel_order', orderPayload, (response) => {
      if (response?.success) {
        fetchOrders();
        toast.success('Order cancelled');
      } else {
        console.error('❌ Cancel failed:', response?.message);
      }
    });
  };

  const applyFilter = (status, allOrders = orders) => {
    if (status === 'all') {
      setFilteredOrders(allOrders);
    } else {
      setFilteredOrders(allOrders.filter(order => order.orderStatus?.toLowerCase() === status));
    }
  };

  const fetchOrders = async (currentPage = 1) => {
    try {
      setLoading(true);
      let res;
      const query = `?days=${timeRange === 'today' ? 1 : timeRange}&page=${currentPage}&limit=${limit}`;

      if (selectedMess === 'all') {
        res = timeRange === 'today'
          ? await apiGet(`/customer/mess/orders${query}`)
          : await apiGet(`/customer/mess/orders/past${query}`);
      } else {
        res = await apiGet(`/customer/mess/orders/${selectedMess}${query}`);
      }

      if (res?.success) {
        const data = res.data || [];
        setOrders(data);
        applyFilter(statusFilter, data);
        setHasMore(data.length === limit);
      } else {
        setOrders([]);
        setFilteredOrders([]);
        setHasMore(false);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      setOrders([]);
      setFilteredOrders([]);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchOrders(1);
  }, [statusFilter, selectedMess, timeRange]);

  useEffect(() => {
    fetchOrders(page);
  }, [page]);

  return (
    <div className="flex h-screen">
      <Navbar2 />
      <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-gray-50 overflow-y-auto">
        <CustomerHeader />

        <h1 className="text-2xl font-semibold mb-2">Your Orders</h1>
        <div className="flex gap-2 mb-4 flex-wrap">
          <select
            value={selectedMess}
            onChange={(e) => setSelectedMess(e.target.value)}
            className="border px-3 py-1 cursor-pointer rounded text-sm"
          >
            <option value="all">All Messes</option>
            {messes.map(m => (
              <option className='cursor-pointer' key={m.messId} value={m.messId}>{m.messName}</option>
            ))}
          </select>

          {['all','pending','accepted','rejected','cancelled'].map(status => (
            <button
              key={status}
              className={`px-4 py-1 rounded cursor-pointer border ${statusFilter === status ? 'bg-orange-500 text-white' : ''}`}
              onClick={() => setStatusFilter(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}

          <div ref={dropdownRef} className="relative inline-block">
            <button
              className="border px-4 py-1 cursor-pointer rounded flex items-center"
              onClick={(e) => {
                e.stopPropagation();
                setShowDropdown((prev) => !prev);
              }}
            >
              {timeRange === 'today'
                ? 'Today'
                : timeRange === '7'
                ? 'Last 7 Days'
                : 'Last 30 Days'} ▾
            </button>

            {showDropdown && (
              <div className="absolute mt-1 bg-white border rounded shadow">
                <button className="block w-full text-left cursor-pointer px-4 py-2 hover:bg-gray-100"
                  onClick={() => { setTimeRange('today'); setShowDropdown(false); }}>Today</button>
                <button className="block w-full text-left cursor-pointer px-4 py-2 hover:bg-gray-100"
                  onClick={() => { setTimeRange('7'); setShowDropdown(false); }}>Last 7 Days</button>
                <button className="block w-full text-left cursor-pointer px-4 py-2 hover:bg-gray-100"
                  onClick={() => { setTimeRange('30'); setShowDropdown(false); }}>Last 30 Days</button>
              </div>
            )}
          </div>
        </div>

        <div className="border rounded-lg p-4 bg-white">
          <h2 className="font-bold text-[#33363F] text-lg mb-4">All Orders</h2>

          {loading ? (
            <div className="text-center text-gray-500">Loading orders...</div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center text-gray-500">No orders found.</div>
          ) : (
            filteredOrders.map(order => (
              <div
                key={order._id}
                className={`mb-4 border-l-4 ${statusColors[order.orderStatus?.toLowerCase()]}`}
              >
                <div className="bg-white border border-orange-500 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
                    <span className={`font-bold ${statusColors[order.orderStatus?.toLowerCase()]}`}>
                      {order.orderStatus?.toUpperCase()}
                    </span>
                    {order.orderStatus?.toLowerCase() === 'pending' && (
                      <button
                        onClick={() => handleCancelOrder(order)}
                        className="text-orange-500 cursor-pointer font-semibold"
                      >
                        CANCEL ORDER
                      </button>
                    )}
                  </div>

                  <div className="overflow-x-auto">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 text-center font-poppins font-medium text-gray-700 border-gray-300 border-t py-4 min-w-[500px]">
                      <span className='border-r font-semibold p-1'>Customer Name</span>
                      <span className='border-r font-semibold p-1'>Plan Name</span>
                      <span className='border-r font-semibold p-1'>No Of Tokens</span>
                      <span className='border-r font-semibold p-1'>Time</span>
                      <span className='font-semibold p-1'>Date</span>

                      <span className='border-r text-[#3C3C4399] p-1'>{order.customerName}</span>
                      <span className='border-r text-[#3C3C4399] p-1'>{order.customerPlanName}</span>
                      <span className='border-r text-[#3C3C4399] p-1'>{order.tokenCount}</span>
                      <span className='border-r text-[#3C3C4399] p-1'>
                        {new Date(order.createdAt).toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'})}
                      </span>
                      <span className='text-[#3C3C4399] p-1'>
                        {new Date(order.createdAt).toLocaleDateString('en-GB')}
                      </span>
                    </div>
                  </div>

                  <div className="mt-2 text-sm text-gray-700 p-1 break-words">
                    <span className="inline-block border font-poppins border-green-500 text-green-600 font-bold px-2 py-0.5 rounded mr-2 text-sm">
                      {order.orderType}
                    </span>
                    {order.address}
                  </div>
                </div>
              </div>
            ))
          )}

          {hasMore && (
            <div className="flex justify-between mt-4">
              <button disabled={page===1} className="px-4 py-1 border rounded" onClick={()=>setPage(page-1)}>Previous</button>
              <button disabled={!hasMore} className="px-4 py-1 border rounded" onClick={()=>setPage(page+1)}>Next</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerOrders;
