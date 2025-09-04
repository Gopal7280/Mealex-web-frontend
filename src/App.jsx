// // import ProtectedRouteComponent from "./routes/ProtectedRoutes";
// import React, { useEffect } from 'react';

// import RouteComponent from "./routes/routes";
// import { Route, Routes } from 'react-router-dom';
// import { connectSocket } from './config/socket';
// import storage from './utils/storage';
// import SocketListener from './components/SocketListener'; // ✅ Import your listener



// // import 'primereact/resources/primereact.min.css'; // Core styles
// // import 'primeicons/primeicons.css';              // Icons
// // import 'primereact/resources/themes/lara-light-indigo/theme.css'; // Theme styles


// function App(){
//       useEffect(() => {
//     const token = storage.getItem('token'); // your localStorage token logic
//     if (token) {
//       connectSocket(token); // initialize socket once
//     }

//     // optional: clean-up on unmount (only needed for single-page full reload use cases)
//     // return () => disconnectSocket();

//   }, []);

//   return <RouteComponent />;
// }
// //     return(
        
// //         // <ProtectedRouteComponent></ProtectedRouteComponent>       
// //         <RouteComponent></RouteComponent>
// //     )
// // }
// export default App;

//isse sab run ho rha tha 

// import React, { useEffect } from 'react';
// import RouteComponent from "./routes/routes";
// import { connectSocket } from './config/socket';
// import storage from './utils/storage';
// import SocketListener from './config/SocketListener';
// import {Toaster} from 'react-hot-toast'; // ✅ Import your listener
// import { BrowserRouter } from 'react-router-dom';

// function App() {
//   useEffect(() => {
//     const token = storage.getItem('token');
//     if (token) {
//       connectSocket(token); // ✅ Global WebSocket connection
//     }
//   }, []);

//   return (
//     <>
//     <BrowserRouter>
//       <SocketListener />  
//       <RouteComponent />
//             <Toaster position="top-right" reverseOrder={false} />
// </BrowserRouter>
//     </>
//   );
// }

// export default App;



//new updated 

//chal rha hai without push notifications 

// import React, { useEffect } from 'react';
// import { useState } from 'react';
// import { BrowserRouter } from 'react-router-dom';
// import RouteComponent from "./routes/routes";
// import SocketListener from './config/SocketListener';
// import { Toaster } from 'react-hot-toast';
// import storage from './utils/storage';
// import { connectSocket, disconnectSocket } from './config/socket';

// function App() {
//     const [auth, setAuth] = useState(!!storage.getItem('token')); // ✅ load initial auth from storage

//   useEffect(() => {
//     const token = storage.getItem('token');
//     if (token) {
//       connectSocket(token); // ✅ Global WebSocket connection
//     }

//     return () => {
//       disconnectSocket(); // ✅ Clean up on unmount
//     };
//   }, []);

//   return (
//     <BrowserRouter>
//       <SocketListener />  
//       {/* <RouteComponent /> */}
//             <RouteComponent auth={auth} setAuth={setAuth} />  

//       <Toaster position="top-right" reverseOrder={false} />
//     </BrowserRouter>
//   );
// }

// export default App;


// ye bhi running hai bus isme refresh krne pr fir se token mangta hai


// import React, { useEffect, useState } from 'react';
// import { BrowserRouter } from 'react-router-dom';
// import RouteComponent from "./routes/routes";
// import SocketListener from './config/SocketListener';
// import { Toaster, toast } from 'react-hot-toast';
// import storage from './utils/storage';
// import { connectSocket, disconnectSocket } from './config/socket';
// import { initFCM, onMessageListener } from './firebase';   // ✅ new
// import { apiPost } from './services/api';                  // ✅ new

// function App() {
//   const [auth, setAuth] = useState(!!storage.getItem('token')); 

//   useEffect(() => {
//     const token = storage.getItem('token');
//     if (token) {
//       connectSocket(token); 
//       console.log("Socket connected");

//       // ✅ Setup push notifications
//       const setupNotifications = async () => {
//         console.log("Setting up notifications...");
//         const fcmToken = await initFCM();
//         console.log("FCM Token fetched:", fcmToken);
//         if (fcmToken) {
//           console.log("FCM Token:", fcmToken);

//           // send token to backend
//           await apiPost(
//             "/user/notification-token",
//             { token: fcmToken, deviceType: "web" },
//             { headers: { Authorization: `Bearer ${token}` } }
//           );

//           // foreground notifications
//           onMessageListener().then((payload) => {
//             console.log("Foreground Notification:", payload);
//             const { title, body } = payload.notification || {};
//             toast(`${title}: ${body}`);
//           });
//         }
//       };

//       setupNotifications();
//     }

//     return () => {
//       disconnectSocket();
//     };
// }, [auth]);   // <- auth pe dependency

//   return (
//     <BrowserRouter>
//       <SocketListener />  
//       <RouteComponent auth={auth} setAuth={setAuth} />  
//       <Toaster position="top-right" reverseOrder={false} />
//     </BrowserRouter>
//   );
// }

// export default App;



// Final working with push notifications and no token prompt on refresh


// import React, { useEffect, useRef, useState } from 'react';
// import { BrowserRouter } from 'react-router-dom';
// import RouteComponent from "./routes/routes";
// import SocketListener from './config/SocketListener';
// import { Toaster, toast } from 'react-hot-toast';
// import storage from './utils/storage';
// import { connectSocket, disconnectSocket } from './config/socket';
// import { initFCM, onMessageListener } from './firebase';
// import { apiPost } from './services/api';

// const FCM_TOKEN_KEY = 'fcmToken';
// const FCM_SYNC_KEY_PREFIX = 'fcmSynced:';

// function App() {
//   const [auth, setAuth] = useState(!!storage.getItem('token'));
//   const foregroundListenerBound = useRef(false);

//   useEffect(() => {
//     const token = storage.getItem('token');
//     if (token) {
//       connectSocket(token);

//       const setupNotifications = async () => {
//         const saved = storage.getItem(FCM_TOKEN_KEY);
//         let fcmToken = saved;
//         if (!fcmToken) {
//           fcmToken = await initFCM();
//           if (fcmToken) storage.setItem(FCM_TOKEN_KEY, fcmToken);
//         }
//         if (!fcmToken) return;

//         const syncKey = `${FCM_SYNC_KEY_PREFIX}${token}`;
//         const alreadySynced = storage.getItem(syncKey);
//         if (!alreadySynced) {
//           await apiPost(
//             "/user/notification-token",
//             { token: fcmToken, deviceType: "web" },
//             { headers: { Authorization: `Bearer ${token}` } }
//           );
//           storage.setItem(syncKey, '1');
//         }

//         if (!foregroundListenerBound.current) {
//           foregroundListenerBound.current = true;
//           onMessageListener().then((payload) => {
//             const { title, body } = payload?.notification || {};
//             if (title || body) toast(`${title || 'Notification'}: ${body || ''}`);
//           });
//         }
//       };

//       setupNotifications();
//     }

//     return () => {
//       disconnectSocket();
//     };
//   }, [auth]);

//   return (
//     <BrowserRouter>
//       <SocketListener />
//       <RouteComponent auth={auth} setAuth={setAuth} />
//       <Toaster position="top-right" reverseOrder={false} />
//     </BrowserRouter>
//   );
// }

// export default App;

//working hai ye bhi 

// import React, { useEffect, useRef, useState } from 'react';
// import { BrowserRouter } from 'react-router-dom';
// import RouteComponent from "./routes/routes";
// import SocketListener from './config/SocketListener';
// import { Toaster, toast } from 'react-hot-toast';
// import storage from './utils/storage';
// import { connectSocket, disconnectSocket } from './config/socket';
// import { initFCM, onMessageListener } from './firebase';
// import { apiPost } from './services/api';

// const FCM_TOKEN_KEY = 'fcmToken';
// const FCM_SYNC_KEY_PREFIX = 'fcmSynced:';

// function App() {
//   const [auth, setAuth] = useState(!!storage.getItem('token'));
//   const foregroundListenerBound = useRef(false);

//   // ✅ reusable notification setup function
//   const setupNotifications = async (token) => {
//     const saved = storage.getItem(FCM_TOKEN_KEY);
//     let fcmToken = saved;
//     if (!fcmToken) {
//       fcmToken = await initFCM();
//       if (fcmToken) storage.setItem(FCM_TOKEN_KEY, fcmToken);
//     }
//     if (!fcmToken) return;

//     const syncKey = `${FCM_SYNC_KEY_PREFIX}${token}`;
//     const alreadySynced = storage.getItem(syncKey);
//     if (!alreadySynced) {
//       await apiPost(
//         "/user/notification-token",
//         { token: fcmToken, deviceType: "web" },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       storage.setItem(syncKey, '1');
//     }

//     if (!foregroundListenerBound.current) {
//       foregroundListenerBound.current = true;
//       onMessageListener().then((payload) => {
//         const { title, body } = payload?.notification || {};
//         if (title || body) toast(`${title || 'Notification'}: ${body || ''}`);
//       });
//     }
//   };

//   useEffect(() => {
//     const token = storage.getItem('token');
//     if (token) {
//       connectSocket(token);
//       setupNotifications(token); // ✅ refresh ki need khatam
//     }
//     return () => disconnectSocket();
//   }, [auth]);

//   return (
//     <BrowserRouter>
//       <SocketListener />
//       <RouteComponent auth={auth} setAuth={setAuth} />
//       <Toaster position="top-right" reverseOrder={false} />
//     </BrowserRouter>
//   );
// }

// export default App;


import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import RouteComponent from "./routes/routes";
import SocketListener from "./config/SocketListener";
import { Toaster, toast } from "react-hot-toast";
import storage from "./utils/storage";
import { connectSocket, disconnectSocket } from "./config/socket";
import { initFCM, onMessageListener } from "./firebase";
import { apiPost } from "./services/api";

const FCM_TOKEN_KEY = "fcmToken";
const FCM_SYNC_KEY_PREFIX = "fcmSynced:";

// ✅ Exportable notification setup function
export const setupNotifications = async (token, foregroundListenerBound) => {
  const saved = storage.getItem(FCM_TOKEN_KEY);
  let fcmToken = saved;

  if (!fcmToken) {
    fcmToken = await initFCM();
    if (fcmToken) storage.setItem(FCM_TOKEN_KEY, fcmToken);
  }

  if (!fcmToken) return;

  const syncKey = `${FCM_SYNC_KEY_PREFIX}${token}`;
  const alreadySynced = storage.getItem(syncKey);

  if (!alreadySynced) {
    await apiPost(
      "/user/notification-token",
      { token: fcmToken, deviceType: "web" },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    storage.setItem(syncKey, "1");
  }

  if (foregroundListenerBound && !foregroundListenerBound.current) {
    foregroundListenerBound.current = true;
    onMessageListener().then((payload) => {
      const { title, body } = payload?.notification || {};
      if (title || body) toast(`${title || "Notification"}: ${body || ""}`);
    });
  }
};

function App() {
  const [auth, setAuth] = useState(!!storage.getItem("token"));
  const foregroundListenerBound = useRef(false);

  useEffect(() => {
    const token = storage.getItem("token");
    if (token) {
      connectSocket(token);
      setupNotifications(token, foregroundListenerBound); // ✅ reuseable + optimized
    }
    return () => disconnectSocket();
  }, [auth]);

  return (
    <BrowserRouter>
      <SocketListener />
      <RouteComponent auth={auth} setAuth={setAuth} />
      <Toaster position="top-right" reverseOrder={false} />
    </BrowserRouter>
  );
}

export default App;



// import React, { useEffect, useRef, useState } from 'react';
// import { BrowserRouter } from 'react-router-dom';
// import RouteComponent from "./routes/routes";
// import SocketListener from './config/SocketListener';
// import { Toaster, toast } from 'react-hot-toast';
// import storage from './utils/storage';
// import { connectSocket, disconnectSocket } from './config/socket';
// import { initFCM, onMessageListener } from './firebase';
// import { apiPost } from './services/api';

// const FCM_TOKEN_KEY = 'fcmToken';
// const FCM_SYNC_KEY_PREFIX = 'fcmSynced:';

// function App() {
//   const [auth, setAuth] = useState(!!storage.getItem('token'));
//   const foregroundListenerBound = useRef(false);

//   // 🔹 Socket connection + Notifications setup
//   useEffect(() => {
//     const token = storage.getItem('token');
//     if (token) {
//       connectSocket(token);
//       setupNotifications(token);
//     }
//     return () => {
//       disconnectSocket();
//     };
//   }, [auth]);

//   // 🔹 Notification setup extracted as function
//   const setupNotifications = async (jwtToken) => {
//     try {
//       let fcmToken = storage.getItem(FCM_TOKEN_KEY);

//       // Generate token immediately if not found
//       if (!fcmToken) {
//         fcmToken = await initFCM();
//         if (fcmToken) storage.setItem(FCM_TOKEN_KEY, fcmToken);
//       }

//       if (!fcmToken) return;

//       // Sync with backend if not synced for this user
//       const syncKey = `${FCM_SYNC_KEY_PREFIX}${jwtToken}`;
//       const alreadySynced = storage.getItem(syncKey);

//       if (!alreadySynced) {
//         await apiPost(
//           "/user/notification-token",
//           { token: fcmToken, deviceType: "web" },
//           { headers: { Authorization: `Bearer ${jwtToken}` } }
//         );
//         storage.setItem(syncKey, '1');
//       }

//       // Bind foreground notification listener once
//       if (!foregroundListenerBound.current) {
//         foregroundListenerBound.current = true;
//         onMessageListener().then((payload) => {
//           const { title, body } = payload?.notification || {};
//           if (title || body) {
//             toast(`${title || 'Notification'}: ${body || ''}`);
//           }
//         });
//       }
//     } catch (err) {
//       console.error("❌ Error setting up FCM notifications:", err);
//     }
//   };

//   return (
//     <BrowserRouter>
//       <SocketListener />
//       <RouteComponent auth={auth} setAuth={setAuth} />
//       <Toaster position="top-right" reverseOrder={false} />
//     </BrowserRouter>
//   );
// }

// export default App;
