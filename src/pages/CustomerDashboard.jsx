
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { apiGet } from '../services/api';
// import Navbar2 from '../layouts/Navbar2';
// import CustomerHeader from '../layouts/CustomerHeader';
// import { connectSocket } from '../config/socket';
// import { getSocket } from '../config/socket'; // ✅ yeh add karo
// import { toast } from 'react-hot-toast'; // ✅ notifications ke liye
// import { MdRestaurant, MdSubscriptions } from "react-icons/md";


// import storage from '../utils/storage';

// const CustomerDashboard = () => {
//   const navigate = useNavigate();
//   const [orders, setOrders] = useState([]);
//   const [totalMessSubscribed, setTotalMessSubscribed] = useState(0);
//   const [totalActivePlans, setTotalActivePlans] = useState(0);


// useEffect(() => {
//     const token = storage.getItem('token');
//     if (token) {
//       connectSocket(token);

//       // ✅ Fetch customer profile stats
//       apiGet('/customer/profile/basic')
//         .then((res) => {
//           console.log('Customer Profile Stats:', res);
//           if (res.success && res.data) {
//             setTotalActivePlans(res.data.activePlansCount || 0);
//             setTotalMessSubscribed(res.data.mess_ids?.length || 0);
//           }
//         })
//         .catch((err) => {
//           console.error('Failed to fetch profile stats:', err);
//         });

//       // ✅ Fetch orders (still needed for recent orders list)
//       apiGet('/customer/mess/orders')
//         .then((res) => {
//           if (res.success) {
//             setOrders(res.data || []);
//           }
//         })
//         .catch((err) => {
//           console.error('Failed to fetch orders:', err);
//         });
//     }
//   }, []);
// const handleCancelOrder = (order) => {
//   const socket = getSocket();
//   if (!socket) {
//     console.error('❌ No socket connection available.');
//     return;
//   }

//   const tokensArray = Array.isArray(order.submittedTokenIds) ? order.submittedTokenIds : [];
//   if (tokensArray.length === 0) {
//     console.error('❌ Cancel failed: No submittedTokenIds available.');
//     return;
//   }

//   const orderPayload = {
//     orderId: order.orderId,
//     customerPlanId: order.customerPlanId,
//     customerId: order.customerId,
//     orderType: order.orderType,
//     submittedTokenIds: tokensArray,
//   };

//   // UI update instantly
//   setOrders((prev) =>
//     prev.map((o) =>
//       o.orderId === order.orderId ? { ...o, orderStatus: 'cancelled' } : o
//     )
//   );

//   socket.emit('cancel_order', orderPayload, (response) => {
//     if (response?.success) {
//       toast.success('Order cancelled');
//     } else {
//       console.error('❌ Cancel failed:', response?.message);
//       toast.error('Failed to cancel order');
//     }
//   });
// };


//   return (
//     <div className="flex h-screen ">
//       <Navbar2 />
//       {/* <div className="flex-1 p-6 overflow-y-auto bg-[#f9f4f0] min-h-screen"> */}
//       <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-green-50 overflow-y-auto">

//         <CustomerHeader />
//         {/* Stats */}
//         {/* <div className="grid grid-cols-2 gap-8 text-center mb-8">
//           <div>
//             <h3 
//             onClick={() => navigate('/customer/your-mess')}
//             className="text-3xl font-bold text-orange-500">
//               {totalMessSubscribed}
//             </h3>
//             <p className="text-sm text-gray-600 mt-1">Total Mess Subscribed</p>
//           </div>
//           <div>
//             <h3
//               onClick={() => navigate('/customer/your-mess')}
//             className="text-3xl font-bold text-orange-500">
//               {totalActivePlans}
//             </h3>
//             <p className="text-sm text-gray-600 mt-1">Total Active Plans</p>
//           </div>
//         </div> */}
// {/* 
//         <div className="grid grid-cols-2 gap-6 mb-8">
//   <div
//     onClick={() => navigate('/customer/your-mess')}
//     className="flex items-center gap-4 p-6 bg-white border rounded-xl shadow hover:shadow-md transition cursor-pointer"
//   >
//     <div className="w-14 h-14 flex items-center justify-center rounded-full bg-orange-100">
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         className="w-7 h-7 text-orange-500"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="currentColor"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth="2"
//           d="M3 7h18M3 12h18M3 17h18"
//         />
//       </svg>
//     </div>
//     <div>
//       <h3 className="text-3xl font-bold text-orange-500">{totalMessSubscribed}</h3>
//       <p className="text-sm font-bold text-black mt-1">Total Mess Subscribed</p>
//     </div>
//   </div>

//   <div
//     onClick={() => navigate('/customer/your-mess')}
//     className="flex items-center gap-4 p-6 bg-white border rounded-xl shadow hover:shadow-md transition cursor-pointer"
//   >
//     <div className="w-14 h-14 flex items-center justify-center rounded-full bg-green-100">
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         className="w-7 h-7 text-green-500"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="currentColor"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth="2"
//           d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//         />
//       </svg>
//     </div>
//     <div>
//       <h3 className="text-3xl font-bold text-green-500">{totalActivePlans}</h3>
//       <p className="text-sm font-bold text-black mt-1">Total Active Plans</p>
//     </div>
//   </div>
// </div> */}


// <div className="grid grid-cols-2 gap-6 mb-8">
//   {/* 🔹 Total Mess Subscribed */}
//   <div
//     onClick={() => navigate('/customer/your-mess')}
//     className="flex items-center gap-4 p-6 bg-white border rounded-xl shadow hover:shadow-lg transition cursor-pointer"
//   >
//     <div className="w-14 h-14 flex items-center justify-center rounded-full bg-orange-100">
//       <MdRestaurant className="w-7 h-7 text-orange-500" />
//     </div>
//     <div>
//       <h3 className="text-3xl font-bold text-orange-500">{totalMessSubscribed}</h3>
//       <p className="text-sm text-gray-600 mt-1">Total Mess Subscribed</p>
//     </div>
//   </div>

//   {/* 🔹 Total Active Plans */}
//   <div
//     onClick={() => navigate('/customer-activeplans')}
//     className="flex items-center gap-4 p-6 bg-white border rounded-xl shadow hover:shadow-lg  hover:transition-all cursor-pointer"
//   >
//     <div className="w-14 h-14 flex items-center justify-center rounded-full bg-green-100">
//       <MdSubscriptions className="w-7 h-7 text-green-500" />
//     </div>
//     <div>
//       <h3 className="text-3xl font-bold text-green-500">{totalActivePlans}</h3>
//       <p className="text-sm text-gray-600 mt-1">Total Active Plans</p>
//     </div>
//   </div>
// </div>


        
// <div className="bg-white border rounded-xl overflow-hidden mb-8">
//   <div className="flex justify-between items-center px-12 py-4">
//     <h3 className="text-base font-semibold text-[#33363F]">Recent Orders</h3>
//   </div>

//   {orders.length === 0 ? (
//     <div className="text-center text-[#0000008C] py-6">No orders placed today.</div>
//   ) : (
//     <>
//       {/* Header Row */}
//       <div className="grid grid-cols-7 text-sm font-medium text-gray-600 border-b pb-2 px-4">
//         <div>Customer Name</div>
//         <div>Plan Name</div>
//         <div>Tokens</div>
//         <div>Type</div>
//         <div>Time</div>
//         <div>Date</div>
//         <div className="text-center">Status</div>
//       </div>

//       {/* 🔹 Scrollable Orders Section */}
//       <div className="max-h-[340px] overflow-y-auto">
//         {orders.map((order, idx) => (
//           <div
//             key={order.orderId || idx}
//             className="grid grid-cols-7 text-sm py-2 items-center border-t px-4"
//           >
//             <div>{order.customerName}</div>
//             <div>{order.customerPlanName}</div>
//             <div>{order.tokenCount}</div>
//             <div className="capitalize">{order.orderType}</div>
//             <div>
//               {new Date(order.createdAt).toLocaleTimeString([], {
//                 hour: '2-digit',
//                 minute: '2-digit',
//               })}
//             </div>
//             <div>{new Date(order.createdAt).toLocaleDateString()}</div>
//             <div className="text-center">
//               {order.orderStatus === 'pending' ? (
//                 <button
//                   onClick={() => handleCancelOrder(order)}
//                   className="px-3 py-1 text-xs font-semibold rounded bg-red-100 text-red-600 hover:bg-red-200"
//                 >
//                   CANCEL ORDER
//                 </button>
//               ) : (
//                 <span
//                   className={`px-2 py-1 text-xs font-semibold rounded-full ${
//                     order.orderStatus === 'accepted'
//                       ? 'bg-green-100 text-green-600'
//                       : 'bg-red-100 text-red-600'
//                   }`}
//                 >
//                   {order.orderStatus.toUpperCase()}
//                 </span>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   )}
// </div>

//       </div>
//     </div>
//   );
// };

// export default CustomerDashboard;



import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiGet } from '../services/api';
import Navbar2 from '../layouts/Navbar2';
import CustomerHeader from '../layouts/CustomerHeader';
import { connectSocket, getSocket } from '../config/socket';
import { toast } from 'react-hot-toast';
import { MdRestaurant, MdSubscriptions } from "react-icons/md";
import storage from '../utils/storage';

const statusColors = {
  accepted: 'bg-green-100 text-green-600',
  rejected: 'bg-red-100 text-red-600',
  cancelled: 'bg-gray-200 text-gray-600',
  pending: 'bg-yellow-100 text-yellow-600'
};

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [totalMessSubscribed, setTotalMessSubscribed] = useState(0);
  const [totalActivePlans, setTotalActivePlans] = useState(0);

  useEffect(() => {
    const token = storage.getItem('token');
    if (!token) return;

    connectSocket(token);

    // fetch profile stats
    apiGet('/customer/profile/basic')
      .then((res) => {
        if (res.success && res.data) {
          setTotalActivePlans(res.data.activePlansCount || 0);
          setTotalMessSubscribed(res.data.mess_ids?.length || 0);
        }
      })
      .catch((err) => console.error('Failed to fetch profile stats:', err));

    // fetch initial orders
    apiGet('/customer/mess/orders')
      .then((res) => {
        if (res.success) setOrders(res.data || []);
      })
      .catch((err) => console.error('Failed to fetch orders:', err));
  }, []);

  // websocket listener
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handleUpdate = (res) => {
      if (!res?.success || !res.data?.orderId) return;

      const updatedOrder = res.data;
      const normalizedStatus = updatedOrder?.decision?.toLowerCase() 
        || updatedOrder?.orderStatus?.toLowerCase() 
        || 'pending';

      setOrders((prev) =>
        prev.map((o) =>
          o.orderId === updatedOrder.orderId
            ? { ...o, orderStatus: normalizedStatus }
            : o
        )
      );

      if (['accepted', 'rejected', 'cancelled'].includes(normalizedStatus)) {
        toast.success(`Order ${normalizedStatus}`);
      }
    };

    socket.on('order_update', handleUpdate);
    socket.on('order_response', handleUpdate);

    return () => {
      socket.off('order_update', handleUpdate);
      socket.off('order_response', handleUpdate);
    };
  }, []);

  const handleCancelOrder = (order) => {
    const socket = getSocket();
    if (!socket) return console.error('❌ No socket connection available.');

    const tokensArray = Array.isArray(order.submittedTokenIds)
      ? order.submittedTokenIds
      : [];
    if (tokensArray.length === 0) return;

    const orderPayload = {
      orderId: order.orderId,
      customerPlanId: order.customerPlanId,
      customerId: order.customerId,
      orderType: order.orderType,
      submittedTokenIds: tokensArray,
    };

    // optimistic update
    setOrders((prev) =>
      prev.map((o) =>
        o.orderId === order.orderId ? { ...o, orderStatus: 'cancelled' } : o
      )
    );

    socket.emit('cancel_order', orderPayload, (response) => {
      if (response?.success) {
        toast.success('Order cancelled');
      } else {
        toast.error('Failed to cancel order');
      }
    });
  };

  return (
    <div className="flex h-screen">
      <Navbar2 />
      <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-gray-50 overflow-y-auto">
        <CustomerHeader />

        {/* stats */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div
            onClick={() => navigate('/customer/your-mess')}
            className="flex items-center gap-4 p-6 bg-white border rounded-xl shadow hover:shadow-lg transition cursor-pointer"
          >
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-orange-100">
              <MdRestaurant className="w-7 h-7 text-orange-500" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-orange-500">
                {totalMessSubscribed}
              </h3>
              <p className="text-sm text-gray-600 mt-1">Total Mess Subscribed</p>
            </div>
          </div>

          <div
            onClick={() => navigate('/customer-activeplans')}
            className="flex items-center gap-4 p-6 bg-white border rounded-xl shadow hover:shadow-lg transition cursor-pointer"
          >
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-green-100">
              <MdSubscriptions className="w-7 h-7 text-green-500" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-green-500">
                {totalActivePlans}
              </h3>
              <p className="text-sm text-gray-600 mt-1">Total Active Plans</p>
            </div>
          </div>
        </div>

        {/* recent orders */}
        {/* <div className="bg-white border rounded-xl overflow-hidden mb-8">
          <div className="flex justify-between items-center px-12 py-4">
            <h3 className="text-base font-semibold text-[#33363F]">Recent Orders</h3>
          </div>

          {orders.length === 0 ? (
            <div className="text-center text-[#0000008C] py-6">
              No orders placed today.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-7 text-sm font-medium text-gray-600 border-b pb-2 px-4">
                <div>Customer Name</div>
                <div>Plan Name</div>
                <div>Tokens</div>
                <div>Type</div>
                <div>Time</div>
                <div>Date</div>
                <div className="text-center">Status</div>
              </div>

              <div className="max-h-[320px] overflow-y-auto">
                {orders.map((order, idx) => (
                  <div
                    key={order.orderId || idx}
                    className="grid grid-cols-7 text-sm py-2 items-center border-t px-4"
                  >
                    <div>{order.customerName}</div>
                    <div>{order.customerPlanName}</div>
                    <div>{order.tokenCount}</div>
                    <div className="capitalize">{order.orderType}</div>
                    <div>
                      {new Date(order.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                    <div>{new Date(order.createdAt).toLocaleDateString()}</div>
                    <div className="text-center">
                      {order.orderStatus === 'pending' ? (
                        <button
                          onClick={() => handleCancelOrder(order)}
                          className="px-3 py-1 text-xs font-semibold rounded bg-red-100 text-red-600 hover:bg-red-200"
                        >
                          CANCEL ORDER
                        </button>
                      ) : (
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[order.orderStatus?.toLowerCase()]}`}
                        >
                          {order.orderStatus?.toUpperCase()}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div> */}
        {/* recent orders */}
<div className="bg-white border rounded-xl overflow-hidden mb-8">
  <div className="flex justify-between items-center px-4 sm:px-6 md:px-12 py-4">
    <h3 className="text-base font-semibold text-[#33363F]">Recent Orders</h3>
  </div>

  {orders.length === 0 ? (
    <div className="text-center text-[#0000008C] py-6">
      No orders placed today.
    </div>
  ) : (
    <div className="overflow-x-auto">
      <div className="hidden md:grid grid-cols-7 text-sm font-medium text-gray-600 border-b pb-2 px-4 min-w-[900px]">
        <div>Customer Name</div>
        <div>Plan Name</div>
        <div>Tokens</div>
        <div>Type</div>
        <div>Time</div>
        <div>Date</div>
        <div className="text-center">Status</div>
      </div>

      <div className="max-h-[320px] overflow-y-auto">
        {orders.map((order, idx) => (
          <div
            key={order.orderId || idx}
            className="border-t px-4 py-3 text-sm md:grid md:grid-cols-7 items-center min-w-[900px]"
          >
            {/* Mobile stacked view */}
            <div className="md:hidden space-y-2">
              <p><span className="font-medium">Customer:</span> {order.customerName}</p>
              <p><span className="font-medium">Plan:</span> {order.customerPlanName}</p>
              <p><span className="font-medium">Tokens:</span> {order.tokenCount}</p>
              <p><span className="font-medium">Type:</span> {order.orderType}</p>
              <p>
                <span className="font-medium">Time:</span>{" "}
                {new Date(order.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
              <p>
                <span className="font-medium">Date:</span>{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">Status:</span>{" "}
                {order.orderStatus === "pending" ? (
                  <button
                    onClick={() => handleCancelOrder(order)}
                    className="ml-2 px-3 py-1 text-xs font-semibold rounded bg-red-100 text-red-600 hover:bg-red-200"
                  >
                    CANCEL ORDER
                  </button>
                ) : (
                  <span
                    className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${
                      statusColors[order.orderStatus?.toLowerCase()]
                    }`}
                  >
                    {order.orderStatus?.toUpperCase()}
                  </span>
                )}
              </p>
            </div>

            {/* Desktop 7-column view */}
            <div className="hidden md:contents">
              <div>{order.customerName}</div>
              <div>{order.customerPlanName}</div>
              <div>{order.tokenCount}</div>
              <div className="capitalize">{order.orderType}</div>
              <div>
                {new Date(order.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <div>{new Date(order.createdAt).toLocaleDateString()}</div>
              <div className="text-center">
                {order.orderStatus === "pending" ? (
                  <button
                    onClick={() => handleCancelOrder(order)}
                    className="px-3 py-1 text-xs font-semibold rounded bg-red-100 text-red-600 hover:bg-red-200"
                  >
                    CANCEL ORDER
                  </button>
                ) : (
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      statusColors[order.orderStatus?.toLowerCase()]
                    }`}
                  >
                    {order.orderStatus?.toUpperCase()}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )}
</div>

      </div>
    </div>
  );
};

export default CustomerDashboard;
