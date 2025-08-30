// // // import { useEffect } from 'react';
// // // import { connectSocket, onOrderResponse } from './socket';
// // // import { toast } from 'react-hot-toast';
// // // import storage from '../utils/storage';

// // // const SocketListener = () => {
// // //   useEffect(() => {
// // //     const token = storage.getItem('token');

// // //     if (token) {
// // //       connectSocket(token);
// // //     }

// // //     // onOrderResponse((data) => {
// // //     //   if (data?.orderStatus === 'accepted') {
// // //     //     toast.success('🎉 Your order was accepted!');
// // //     //   } else if (data?.orderStatus === 'rejected') {
// // //     //     toast.error('❌ Your order was rejected');
// // //     //   } else {
// // //     //     console.log('🔔 Other order event:', data);
// // //     //   }
// // //     // });
// // //     onOrderResponse((res) => {
// // //   const status = res?.data?.orderStatus;

// // //   if (status === 'accepted') {
// // //     toast.success('🎉 Your order was accepted!');
// // //   } else if (status === 'rejected') {
// // //     toast.error('❌ Your order was rejected');
// // //   } else {
// // //     console.log('🔔 Other order event:', res);
// // //   }
// // // });


// // //     return () => {
// // //       // Optional cleanup logic
// // //       onOrderResponse(null);
// // //     };
// // //   }, []);

// // //   return null; // no UI
// // // };

// // // export default SocketListener;

// // import { useEffect } from 'react';
// // import { connectSocket, onOrderResponse } from './socket';
// // import { toast } from 'react-hot-toast';
// // import storage from '../utils/storage';

// // const SocketListener = () => {
// //   useEffect(() => {
// //     const token = storage.getItem('token');
// //         const role = storage.getItem('role'); // ✅ Assume this is stored on login

// //     if (token) {
// //       connectSocket(token); // ensure WebSocket connection is active
// //     }

// //     onOrderResponse((res) => {
// //       console.log('📥 Received in SocketListener:', res);

// //       if (!res) return;

// //       // ✅ Handle server errors (like already accepted/rejected)
// //       if (res?.success === false) {
// //         toast.error(`⚠️ ${res.message || 'Something went wrong'}`);
// //         return;
// //       }

// //       const status = res?.data?.orderStatus;

// //       if (status === 'accepted') {
// //         toast.success('🎉 Your order was accepted!');
// //       } else if (status === 'rejected') {
// //         toast.error('❌ Your order was rejected.');
// //       } else {
// //         toast('ℹ️ Order status updated.');
// //         console.log('🔔 Other order event:', res);
// //       }
// //     });

// //     return () => {
// //       onOrderResponse(null); // ✅ cleanup on unmount
// //     };
// //   }, []);

// //   return null; // this component has no UI
// // };

// // export default SocketListener;

// import { useEffect } from 'react';
// import { useLocation } from 'react-router-dom'; // ✅ Detect current route
// import { connectSocket, onOrderResponse } from './socket';
// import { toast } from 'react-hot-toast';
// import storage from '../utils/storage';

// const SocketListener = () => {
//   const location = useLocation(); // ✅ current path

//   useEffect(() => {
//     const token = storage.getItem('token');
//     const role = storage.getItem('role'); // Must be stored after login

//     if (token) {
//       connectSocket(token);
//     }

//     if (role !== 'customer') return;

//     onOrderResponse((res) => {
//       console.log('📥 WebSocket Order Update:', res);
//       if (!res) return;

//       if (res.success === false) {
//         toast.error(`⚠️ ${res.message || 'Something went wrong'}`);
//         return;
//       }

//       const status = res?.data?.orderStatus;

//       // ✅ Only show toast if current page is CustomerUseTokens
//       const isOnCustomerTokensPage = location.pathname === '/customer-use-tokens' || location.pathname === '/customers-orders';

//       if (!isOnCustomerTokensPage) {
//         console.log('📍 User not on CustomerUseTokens page — no toast.');
//         return;
//       }

//       if (status === 'accepted') {
//         toast.success('🎉 Your order was accepted!');
//       } else if (status === 'rejected') {
//         toast.error('❌ Your order was rejected.');
//       } else {
//         toast('ℹ️ Order status updated.');
//       }
//     });

//     return () => {
//       onOrderResponse(null); // cleanup
//     };
//   }, [location.pathname]); // re-run effect on route change

//   return null;
// };

// export default SocketListener;

//isse sab run ho rha hai

// import { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import { connectSocket, onOrderResponse } from '../config/socket';
// import { toast } from 'react-hot-toast';
// import storage from '../utils/storage';

// const SocketListener = () => {
//   const location = useLocation();

//   useEffect(() => {
//     const token = storage.getItem('token');
//     const role = storage.getItem('role');

//     if (token) connectSocket(token);
//     if (role !== 'customer') return;

//     const allowedRoutes = ['/customer-use-tokens', '/customer-orders'];
//     const isAllowed = allowedRoutes.includes(location.pathname);

//     onOrderResponse((res) => {
//       console.log('📥 WebSocket Order Update:', res);
//       if (!res?.success || !res.data) return;

//       if (!isAllowed) {
//         console.log('🔕 Not on allowed customer page — skipping toast.');
//         return;
//       }

//       const status = res.data.orderStatus;
//       if (status === 'accepted') {
//         toast.success('🎉 Your order was accepted!');
//       } else if (status === 'rejected') {
//         toast.error('❌ Your order was rejected.');
//       } else {
//         toast('ℹ️ Order status updated.');
//       }
//     });

//     return () => onOrderResponse(null); // Cleanup
//   }, [location.pathname]);

//   return null;
// };

// export default SocketListener;


// sab kuch shi hai isme 

// import { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import { connectSocket, onOrderResponse, onIncomingOrder } from '../config/socket';
// import { toast } from 'react-hot-toast';
// import storage from '../utils/storage';

// const SocketListener = () => {
//   const location = useLocation();

//   useEffect(() => {
//     const token = storage.getItem('token');
//     const role = storage.getItem('role');

//     if (token) connectSocket(token);

//     // ✅ Owner: Listen for incoming_order globally
// //     if (role === 'owner') {
// //       onIncomingOrder((data) => {
// //         console.log('📥 Incoming order (global):', data);
// //         socket.on('incoming_order', (data) => {
// //   console.log('Raw incoming_order payload:', data);
// // });


// //         if (data?.success && data.data?.orderId) {
// //           const orderId = data.data.orderId;

// //           // Save full payload
// //           // storage.setItem(`orderPayload_${orderId}`, JSON.stringify(data.data));
// // // if (data?.success && data.data?.orderId) {
// // //   const o = data.data;
// // //   const payload = {
// // //     orderId: o.orderId,
// // //     customerId: o.customerId,
// // //     messId: o.messId,
// // //     planId: o.planId,
// // //     type: o.orderType || o.type,
// // //     quantity: o.quantity,
// // //     customerName: o.customerName,
// // //     planName: o.planName || o.customerPlanName,
// // //     tokenCount: o.tokenCount,
// // //     createdAt: o.createdAt,
// // //     orderStatus: o.orderStatus
// // //   };

// // //   storage.setItem(`orderPayload_${o.orderId}`, JSON.stringify(payload));

// // //   const existing = JSON.parse(storage.getItem("liveOrders") || "[]");
// // //   if (!existing.find(x => x.orderId === o.orderId)) {
// // //     existing.push(payload);
// // //     storage.setItem("liveOrders", JSON.stringify(existing));
// // //   }
// // // }
// // if (data?.success && data.data?.orderId) {
// //   const o = data.data;
// //   const payload = {
// //     orderId: o.orderId,
// //     customerId: o.customerId,
// //     messId: o.messId,
// //     planId: o.customerPlanId,          // <-- mapping here
// //     planName: o.customerPlanName,      // <-- mapping here
// //     type: o.orderType,                 // <-- mapping here
// //     quantity: o.tokenCount,            // or another field if required
// //     customerName: o.customerName,
// //     tokenCount: o.tokenCount,
// //     createdAt: o.createdAt,
// //     orderStatus: o.orderStatus,
// //     submittedTokenIds: o.submittedTokenIds
// //   };

// //   storage.setItem(`orderPayload_${o.orderId}`, JSON.stringify(payload));

// //   const existing = JSON.parse(storage.getItem("liveOrders") || "[]");
// //   if (!existing.find(x => x.orderId === o.orderId)) {
// //     existing.push(payload);
// //     storage.setItem("liveOrders", JSON.stringify(existing));
// //   }
// // }



// //           // Maintain liveOrders list
// //           const existing = JSON.parse(storage.getItem("liveOrders") || "[]");
// //           if (!existing.find(o => o.orderId === orderId)) {
// //             existing.push(data.data);
// //             storage.setItem("liveOrders", JSON.stringify(existing));
// //           }

// //           toast.success(`📦 New order from ${data.data.customerName}`, { duration: 4000 });
// //         }
// //       });
// //     }

// if (role === 'owner') {
//   onIncomingOrder((data) => {
//     if (data?.success && data.data?.orderId) {
//       const o = data.data;

//       const payload = {
//         orderId: o.orderId,
//         customerId: o.customerId,
//         messId: o.messId,
//         planId: o.customerPlanId,
//         planName: o.customerPlanName,
//         type: o.orderType,
//         quantity: o.tokenCount,
//         customerName: o.customerName,
//         tokenCount: o.tokenCount,
//         createdAt: o.createdAt,
//         orderStatus: o.orderStatus,
//         submittedTokenIds: o.submittedTokenIds
//       };

//       // Save standardized payload
//       storage.setItem(`orderPayload_${o.orderId}`, JSON.stringify(payload));

//       // Update liveOrders without duplicates
//       const existing = JSON.parse(storage.getItem("liveOrders") || "[]");
//       if (!existing.find(x => x.orderId === o.orderId)) {
//         existing.push(payload);
//         storage.setItem("liveOrders", JSON.stringify(existing));
//       }

//       toast.success(`📦 New order from ${o.customerName}`, { duration: 4000 });
//     }
//   });
// }

    

//     // ✅ Customer: Listen for order_response on specific pages
//     if (role === 'customer') {
//       const allowedRoutes = ['/customer-use-tokens', '/customer-orders'];
//       const isAllowed = allowedRoutes.includes(location.pathname);

//       onOrderResponse((res) => {
//         console.log('📥 WebSocket Order Update:', res);
//         if (!res?.success || !res.data) return;

//         if (!isAllowed) {
//           console.log('🔕 Not on allowed customer page — skipping toast.');
//           return;
//         }

//         const status = res.data.orderStatus;
//         if (status === 'accepted') {
//           toast.success('🎉 Your order was accepted!');
//         } else if (status === 'rejected') {
//           toast.error('❌ Your order was rejected.');
//         } else {
//           toast('ℹ️ Order status updated.');
//         }
//       });
//     }

//     return () => {
//       onOrderResponse(null);
//       onIncomingOrder(null);
//     };
//   }, [location.pathname]);

//   return null;
// };

// export default SocketListener;



// new refreshed 

// import { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import { connectSocket, onOrderResponse, onIncomingOrder } from '../config/socket';
// import { toast } from 'react-hot-toast';
// import storage from '../utils/storage';

// const SocketListener = () => {
//   const location = useLocation();

//   useEffect(() => {
//     const token = storage.getItem('token');
//     const role = storage.getItem('role');

//     if (token) connectSocket(token);

//     // ✅ Owner: Listen for incoming_order globally
//     if (role === 'owner') {
//       onIncomingOrder((data) => {
//         if (data?.success && data.data?.orderId) {
//           const o = data.data;

//           const payload = {
//             orderId: o.orderId,
//             messId: o.messId,
//             messName: o.messName || '',
//             customerId: o.customerId,
//             customerName: o.customerName,
//             customerPlanId: o.customerPlanId,
//             customerPlanName: o.customerPlanName || '',
//             decision: '',                          // will update on accept/reject
//             deliveryAddress: o.deliveryAddress || '',
//             orderExpiresAt: o.orderExpiresAt || '',
//             orderStatus: o.orderStatus,
//             orderType: o.orderType,
//             scheduledFor: o.scheduledFor || null,
//             submittedTokenIds: o.submittedTokenIds || [],
//             tokenCount: o.tokenCount || 0,
//             tokenStatus: o.tokenStatus || 'locked',
//             totalPrice: o.totalPrice || 0,
//             createdAt: o.createdAt,
//             updatedAt: o.updatedAt
//           };

//           // Save standardized payload
//           storage.setItem(`orderPayload_${o.orderId}`, JSON.stringify(payload));

//           // Update liveOrders without duplicates
//           const existing = JSON.parse(storage.getItem("liveOrders") || "[]");
//           if (!existing.find(x => x.orderId === o.orderId)) {
//             existing.push(payload);
//             storage.setItem("liveOrders", JSON.stringify(existing));
//           }

//           toast.success(`📦 New order from ${o.customerName}`, { duration: 4000 });
//         }
//       });
//     }

//     // ✅ Customer: Listen for order_response on specific pages
//     if (role === 'customer') {
//       const allowedRoutes = ['/customer-use-tokens', '/customer-orders'];
//       const isAllowed = allowedRoutes.includes(location.pathname);

//       onOrderResponse((res) => {
//         console.log('📥 WebSocket Order Update:', res);
//         if (!res?.success || !res.data) return;

//         if (!isAllowed) {
//           console.log('🔕 Not on allowed customer page — skipping toast.');
//           return;
//         }

//         const status = res.data.orderStatus;
//         if (status === 'accepted') {
//           toast.success('🎉 Your order was accepted!');
//         } else if (status === 'rejected') {
//           toast.error('❌ Your order was rejected.');
//         } else {
//           toast('ℹ️ Order status updated.');
//         }
//       });
//     }

//     return () => {
//       onOrderResponse(null);
//       onIncomingOrder(null);
//     };
//   }, [location.pathname]);

//   return null;
// };

// export default SocketListener;



//just try 

// import { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import { connectSocket, onOrderResponse, onIncomingOrder } from '../config/socket';
// import { toast } from 'react-hot-toast';
// import storage from '../utils/storage';

// const SocketListener = () => {
//   const location = useLocation();

//   useEffect(() => {
//     const token = storage.getItem('token');
//     const role = storage.getItem('role');

//     if (token) connectSocket(token);

//     // ✅ Owner: Listen for incoming orders globally
//     if (role === 'owner') {
//       onIncomingOrder((data) => {
//         if (data?.success && data.data?.orderId) {
//           const o = data.data;

//           // Load existing liveOrders
//           const existing = JSON.parse(storage.getItem("liveOrders") || "[]");

//           // Standardized payload with safe defaults
//           const payload = {
//             orderId: o.orderId || '',
//             messId: o.messId || '',
//             messName: o.messName || '',
//             customerId: o.customerId || '',
//             customerName: o.customerName || '',
//             customerPlanId: o.customerPlanId || '',
//             customerPlanName: o.customerPlanName || '',
//             decision: '',          
//             deliveryAddress: o.deliveryAddress || '',
//             orderExpiresAt: o.orderExpiresAt || '',
//             orderStatus: o.orderStatus || 'pending',
//             orderType: o.orderType || 'delivery',
//             scheduledFor: o.scheduledFor || null,
//             submittedTokenIds: o.submittedTokenIds || [],
//             tokenCount: o.tokenCount || 0,
//             tokenStatus: o.tokenStatus || 'locked',
//             totalPrice: o.totalPrice || 0,
//             createdAt: o.createdAt || new Date().toISOString(),
//             updatedAt: o.updatedAt || new Date().toISOString()
//           };

//           // Merge/update existing liveOrders
//           const index = existing.findIndex(x => x.orderId === o.orderId);
//           if (index > -1) existing[index] = { ...existing[index], ...payload };
//           else existing.push(payload);

//           storage.setItem("liveOrders", JSON.stringify(existing));
//           storage.setItem(`orderPayload_${o.orderId}`, JSON.stringify(payload));

//           toast.success(`📦 New order from ${o.customerName}`, { duration: 4000 });
//         }
//       });
//     }

//     // ✅ Customer: Listen for order_response on allowed pages
//     if (role === 'customer') {
//       const allowedRoutes = ['/customer-use-tokens', '/customer-orders'];
//       const isAllowed = allowedRoutes.includes(location.pathname);

//       onOrderResponse((res) => {
//         console.log('📥 WebSocket Order Update:', res);
//         if (!res?.success || !res.data) return;

//         if (!isAllowed) {
//           console.log('🔕 Not on allowed customer page — skipping toast.');
//           return;
//         }

//         const status = res.data.orderStatus;
//         if (status === 'accepted') {
//           toast.success('🎉 Your order was accepted!');
//         } else if (status === 'rejected') {
//           toast.error('❌ Your order was rejected.');
//         } else {
//           toast('ℹ️ Order status updated.');
//         }
//       });
//     }

//     // ✅ Cleanup listeners on unmount
//     return () => {
//       onOrderResponse(null);
//       onIncomingOrder(null);
//     };
//   }, [location.pathname]);

//   return null;
// };

// export default SocketListener;



import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  connectSocket,
  onOrderResponse,
  onIncomingOrder,
  getSocket,
} from '../config/socket';
import { toast } from 'react-hot-toast';
import storage from '../utils/storage';

const SocketListener = () => {
  const location = useLocation();

  useEffect(() => {
    const token = storage.getItem('token');
    const role = storage.getItem('role');

    if (!token) return;

    // Connect socket if not connected
    const socket = connectSocket(token);

    // ----------------- OWNER -----------------
    if (role === 'owner') {
      const cleanupOwner = onIncomingOrder((res) => {
        if (!res?.success || !res.data?.orderId) return;

        const o = res.data;

        // Standardized payload
        const payload = {
          orderId: o.orderId || '',
          messId: o.messId || '',
          messName: o.messName || '',
          customerId: o.customerId || '',
          customerName: o.customerName || '',
          customerPlanId: o.customerPlanId || '',
          customerPlanName: o.customerPlanName || '',
          decision: '',          
          deliveryAddress: o.deliveryAddress || '',
          orderExpiresAt: o.orderExpiresAt || '',
          orderStatus: o.orderStatus || 'pending',
          orderType: o.orderType || 'delivery',
          scheduledFor: o.scheduledFor || null,
          submittedTokenIds: o.submittedTokenIds || [],
          tokenCount: o.tokenCount || 0,
          tokenStatus: o.tokenStatus || 'locked',
          totalPrice: o.totalPrice || 0,
          createdAt: o.createdAt || new Date().toISOString(),
          updatedAt: o.updatedAt || new Date().toISOString(),
        };

        // Merge/update liveOrders
        const existing = JSON.parse(storage.getItem('liveOrders') || '[]');
        const index = existing.findIndex((x) => x.orderId === o.orderId);
        if (index > -1) existing[index] = { ...existing[index], ...payload };
        else existing.push(payload);

        storage.setItem('liveOrders', JSON.stringify(existing));
        storage.setItem(`orderPayload_${o.orderId}`, JSON.stringify(payload));

        toast.success(`📦 New order from ${o.customerName}`, { duration: 4000 });
      });

      // Ensure owner always stays connected
      const heartbeatCheck = setInterval(() => {
        if (!socket.connected) {
          console.log('⚠️ Owner socket disconnected, reconnecting...');
          socket.connect();
        }
      }, 30_000);

      return () => {
        cleanupOwner(); // remove listener
        clearInterval(heartbeatCheck);
      };
    }

    // ----------------- CUSTOMER -----------------
    if (role === 'customer') {
      const allowedRoutes = ['/customer-use-tokens', '/customer-orders'];

      const cleanupCustomer = onOrderResponse((res) => {
        if (!res?.success || !res.data) return;

        const isAllowed = allowedRoutes.includes(location.pathname);
        if (!isAllowed) return;

        const status = res.data.orderStatus;
        if (status === 'accepted') toast.success('🎉 Your order was accepted!');
        else if (status === 'rejected') toast.error('❌ Your order was rejected.');
        else toast('ℹ️ Order status updated.');
      });

      return () => cleanupCustomer(); // remove listener
    }
  }, [location.pathname]);

  return null;
};

export default SocketListener;
