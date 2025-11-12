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


// import React, { useEffect, useRef, useState } from "react";
// import { BrowserRouter } from "react-router-dom";
// import RouteComponent from "./routes/routes";
// import SocketListener from "./config/SocketListener";
// import { Toaster, toast } from "react-hot-toast";
// import storage from "./utils/storage";
// import { connectSocket, disconnectSocket } from "./config/socket";
// import { initFCM, onMessageListener } from "./firebase";
// import { apiPost } from "./services/api";

// const FCM_TOKEN_KEY = "fcmToken";
// const FCM_SYNC_KEY_PREFIX = "fcmSynced:";

// // ✅ Exportable notification setup function
// export const setupNotifications = async (token, foregroundListenerBound) => {
//   const saved = storage.getItem(FCM_TOKEN_KEY);
//   let fcmToken = saved;

//   if (!fcmToken) {
//     fcmToken = await initFCM();
//     if (fcmToken) storage.setItem(FCM_TOKEN_KEY, fcmToken);
//   }

//   if (!fcmToken) return;

//   const syncKey = `${FCM_SYNC_KEY_PREFIX}${token}`;
//   const alreadySynced = storage.getItem(syncKey);

//   if (!alreadySynced) {
//     await apiPost(
//       "/user/notification-token",
//       { token: fcmToken, deviceType: "web" },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//     storage.setItem(syncKey, "1");
//   }

//   if (foregroundListenerBound && !foregroundListenerBound.current) {
//     foregroundListenerBound.current = true;
//     onMessageListener().then((payload) => {
//       const { title, body } = payload?.notification || {};
//       if (title || body) toast(`${title || "Notification"}: ${body || ""}`);
//     });
//   }
// };

// function App() {
//   const [auth, setAuth] = useState(!!storage.getItem("token"));
//   const foregroundListenerBound = useRef(false);

//   useEffect(() => {
//     const token = storage.getItem("token");
//     if (token) {
//       connectSocket(token);
//       setupNotifications(token, foregroundListenerBound); // ✅ reuseable + optimized
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



// import React, { useEffect, useRef, useState } from "react";
// import { BrowserRouter } from "react-router-dom";
// import RouteComponent from "./routes/routes";
// import SocketListener from "./config/SocketListener";
// import { Toaster, toast } from "react-hot-toast";
// import storage from "./utils/storage";
// import { connectSocket, disconnectSocket } from "./config/socket";
// import { initFCM, onMessageListener } from "./firebase";
// import { apiPost } from "./services/api";
// import axios from "axios";              // ✅ add this
// import { setToken } from "./services/authService";  // ✅ add this

// const FCM_TOKEN_KEY = "fcmToken";
// const FCM_SYNC_KEY_PREFIX = "fcmSynced:";

// export const setupNotifications = async (token, foregroundListenerBound) => {
//   const saved = storage.getItem(FCM_TOKEN_KEY);
//   let fcmToken = saved;

//   if (!fcmToken) {
//     fcmToken = await initFCM();
//     if (fcmToken) storage.setItem(FCM_TOKEN_KEY, fcmToken);
//   }

//   if (!fcmToken) return;

//   const syncKey = `${FCM_SYNC_KEY_PREFIX}${token}`;
//   const alreadySynced = storage.getItem(syncKey);

//   if (!alreadySynced) {
//     await apiPost(
//       "/user/notification-token",
//       { token: fcmToken, deviceType: "web" },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//     storage.setItem(syncKey, "1");
//   }

//   if (foregroundListenerBound && !foregroundListenerBound.current) {
//     foregroundListenerBound.current = true;
//     onMessageListener().then((payload) => {
//       const { title, body } = payload?.notification || {};
//       if (title || body) toast(`${title || "Notification"}: ${body || ""}`);
//     });
//   }
// };

// function App() {
//   const [auth, setAuth] = useState(!!storage.getItem("token"));
//   const foregroundListenerBound = useRef(false);

//   // 🔹 Step 3: Auto refresh token on app load
//   useEffect(() => {
//     const refreshToken = async () => {
//       try {
//         const res = await axios.get("https://mealex.in/auth/refresh", { withCredentials: true });
//         if (res.data?.token) {
//           setToken(res.data.token); // localStorage me save
//           setAuth(true);           // ensure logged in state
//         }
//       } catch (err) {
//         console.error("Auto refresh on app load failed", err);
//         setAuth(false);
//       }
//     };

//     refreshToken();
//   }, []); // ✅ run only once on first load

//   useEffect(() => {
//     const token = storage.getItem("token");
//     if (token) {
//       connectSocket(token);
//       setupNotifications(token, foregroundListenerBound);
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



// import React, { useEffect, useRef, useState } from "react";
// import { BrowserRouter } from "react-router-dom";
// import RouteComponent from "./routes/routes";
// import SocketListener from "./config/SocketListener";
// import { Toaster, toast } from "react-hot-toast";
// import storage from "./utils/storage";
// import { connectSocket, disconnectSocket } from "./config/socket";
// import { initFCM, onMessageListener } from "./firebase";
// import { apiPost } from "./services/api";
// import SupportFloatingButton from "./pages/SupportFloatingButton"; // 👈 ADD THIS IMPORT


// const FCM_TOKEN_KEY = "fcmToken";
// const FCM_SYNC_KEY_PREFIX = "fcmSynced:";

// export const setupNotifications = async (token, foregroundListenerBound) => {
//   const saved = storage.getItem(FCM_TOKEN_KEY);
//   let fcmToken = saved;

//   if (!fcmToken) {
//     fcmToken = await initFCM();
//     if (fcmToken) storage.setItem(FCM_TOKEN_KEY, fcmToken);
//   }

//   if (!fcmToken) return;

//   const syncKey = `${FCM_SYNC_KEY_PREFIX}${token}`;
//   const alreadySynced = storage.getItem(syncKey);

//   if (!alreadySynced) {
//     await apiPost(
//       "/user/notification-token",
//       { token: fcmToken, deviceType: "web" },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//     storage.setItem(syncKey, "1");
//   }

//   if (foregroundListenerBound && !foregroundListenerBound.current) {
//     foregroundListenerBound.current = true;
//     onMessageListener().then((payload) => {
//       const { title, body } = payload?.notification || {};
//       if (title || body) toast(`${title || "Notification"}: ${body || ""}`);
//     });
//   }
// };

// // function App() {
// //   const [auth, setAuth] = useState(!!storage.getItem("token"));
// //   const foregroundListenerBound = useRef(false);

// //   useEffect(() => {
// //     const token = storage.getItem("token");
// //     if (token) {
// //       connectSocket(token);
// //       setupNotifications(token, foregroundListenerBound);
// //     }
// //     return () => disconnectSocket();
// //   }, [auth]);

// //   return (
// //     <BrowserRouter>
// //       <SocketListener />
// //       <RouteComponent auth={auth} setAuth={setAuth} />
// //             <SupportFloatingButton />
// //       <Toaster position="top-right" reverseOrder={false} />
// //     </BrowserRouter>
// //   );
// // }

// function App() {
//   const [auth, setAuth] = useState(!!storage.getItem("token"));
//   const [userRole, setUserRole] = useState(storage.getItem("role") || "");
//   const foregroundListenerBound = useRef(false);
  

//   useEffect(() => {
//     const token = storage.getItem("token");
//     if (token) {
//       connectSocket(token);
//       setupNotifications(token, foregroundListenerBound);
//     }
//     return () => disconnectSocket();
//   }, [auth]);

//   // Update role dynamically if storage changes (e.g., after login or role switch)
//   useEffect(() => {
//     const handleStorageChange = () => {
//       setUserRole(storage.getItem("role") || "");
//       setAuth(!!storage.getItem("token"));
//     };

//     window.addEventListener("storage", handleStorageChange);
//     return () => window.removeEventListener("storage", handleStorageChange);
//   }, []);

//   const hideOnRoutes = ["/", "/login", "/reset-otp", "/otp-verification"];
//   const currentPath = window.location.pathname;

//   const shouldShowSupport =
//     auth &&
//     (userRole === "owner" || userRole === "customer" || userRole === "both") &&
//     !hideOnRoutes.includes(currentPath);

//   return (
//     <BrowserRouter>
//       <SocketListener />
//       <RouteComponent auth={auth} setAuth={setAuth} setUserRole={setUserRole} />

//       {shouldShowSupport && <SupportFloatingButton />}
//       <Toaster position="top-right" reverseOrder={false} />
//     </BrowserRouter>
//   );
// }


// export default App;


// import React, { useEffect, useRef, useState } from "react";
// import { BrowserRouter, useLocation } from "react-router-dom";
// import RouteComponent from "./routes/routes";
// import SocketListener from "./config/SocketListener";
// import { Toaster, toast } from "react-hot-toast";
// import storage from "./utils/storage";
// import { connectSocket, disconnectSocket } from "./config/socket";
// import { initFCM, onMessageListener } from "./firebase";
// import SupportFloatingButton from "./pages/SupportFloatingButton";
// import { apiPost } from "./services/api";

// const FCM_TOKEN_KEY = "fcmToken";
// const FCM_SYNC_KEY_PREFIX = "fcmSynced:";

// export const setupNotifications = async (token, foregroundListenerBound) => {
//   const saved = storage.getItem(FCM_TOKEN_KEY);
//   let fcmToken = saved;

//   if (!fcmToken) {
//     fcmToken = await initFCM();
//     if (fcmToken) storage.setItem(FCM_TOKEN_KEY, fcmToken);
//   }

//   if (!fcmToken) return;

//   const syncKey = `${FCM_SYNC_KEY_PREFIX}${token}`;
//   const alreadySynced = storage.getItem(syncKey);

//   if (!alreadySynced) {
//     await apiPost(
//       "/user/notification-token",
//       { token: fcmToken, deviceType: "web" },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//     storage.setItem(syncKey, "1");
//   }

//   if (foregroundListenerBound && !foregroundListenerBound.current) {
//     foregroundListenerBound.current = true;
//     onMessageListener().then((payload) => {
//       const { title, body } = payload?.notification || {};
//       if (title || body) toast(`${title || "Notification"}: ${body || ""}`);
//     });
//   }
// };

// // ✅ AppContent: useLocation safe inside BrowserRouter
// function AppContent({ auth, setAuth }) {
//   const location = useLocation();
//   const [userRole, setUserRole] = useState(storage.getItem("role") || "");

//   const hideOnRoutes = ["/", "/login", "/reset-otp", "/otp-verification"];


//   const shouldShowSupport =
//     auth &&
//     (userRole === "owner" || userRole === "customer" || userRole === "both") &&
//     !hideOnRoutes.includes(location.pathname);

//   useEffect(() => {
//     const handleStorageChange = () => {
//       setUserRole(storage.getItem("role") || "");
//     };
//     window.addEventListener("storage", handleStorageChange);
//     return () => window.removeEventListener("storage", handleStorageChange);
//   }, []);

//   return (
//     <>
//       <RouteComponent auth={auth} setAuth={setAuth} setUserRole={setUserRole} />
//       {shouldShowSupport && <SupportFloatingButton />}
//     </>
//   );
// }

// function App() {
//   const [auth, setAuth] = useState(!!storage.getItem("token"));
//   const foregroundListenerBound = useRef(false);

//   useEffect(() => {
//     const token = storage.getItem("token");
//     if (token) {
//       connectSocket(token);
//       setupNotifications(token, foregroundListenerBound);
//     }
//     return () => disconnectSocket();
//   }, [auth]);

//   return (
//     <BrowserRouter>
//       <SocketListener />
//       <AppContent auth={auth} setAuth={setAuth} />
//       <Toaster position="top-right" reverseOrder={false} />
//     </BrowserRouter>
//   );
// }

// export default App;



import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import RouteComponent from "./routes/routes";
import SocketListener from "./config/SocketListener";
import { Toaster, toast } from "react-hot-toast";
import storage from "./utils/storage";
import { connectSocket, disconnectSocket } from "./config/socket";
import { initFCM, onMessageListener } from "./firebase";
import SupportFloatingButton from "./pages/SupportFloatingButton";
import { apiPost } from "./services/api";
// import LanguageModal from "./components/LanguageModal";
// import "./config/i18n";



const FCM_TOKEN_KEY = "fcmToken";
const FCM_SYNC_KEY_PREFIX = "fcmSynced:";

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

// ✅ AppContent now receives userRole + setUserRole directly from parent
// function AppContent({ auth, setAuth, userRole, setUserRole }) {
//   const location = useLocation();

//   const hideOnRoutes = ["/", "/login", "/reset-otp", "/otp-verification"];

//   const shouldShowSupport =
//     auth &&
//     (userRole === "owner" || userRole === "customer" || userRole === "both") &&
//     !hideOnRoutes.includes(location.pathname);

//   // Sync userRole with localStorage changes (in case of cross-tab or manual updates)
//   useEffect(() => {
//     const handleStorageChange = () => {
//       const role = storage.getItem("role") || "";
//       if (role !== userRole) setUserRole(role);
//     };
//     window.addEventListener("storage", handleStorageChange);
//     return () => window.removeEventListener("storage", handleStorageChange);
//   }, [userRole]);

//   return (
//     <>
//       <RouteComponent
//         auth={auth}
//         setAuth={setAuth}
//         setUserRole={setUserRole}
//       />
//       {shouldShowSupport && <SupportFloatingButton />}
//     </>
//   );
// }

function AppContent({ auth, setAuth, userRole, setUserRole }) {
  const location = useLocation();

  const hideOnRoutes = ["/", "/login", "/reset-otp", "/otp-verification"];

  const shouldShowSupport =
    auth &&
    (userRole === "owner" || userRole === "customer" || userRole === "both") &&
    !hideOnRoutes.includes(location.pathname);

  // ✅ Instant sync when route/auth changes (for same-tab updates)
  useEffect(() => {
    const roleInStorage = storage.getItem("role") || "";
    if (userRole !== roleInStorage) {
      setUserRole(roleInStorage);
    }
  }, [location.pathname, auth]);

  // ✅ Cross-tab sync listener (you already had this)
  useEffect(() => {
    const handleStorageChange = () => {
      const role = storage.getItem("role") || "";
      if (role !== userRole) setUserRole(role);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [userRole]);

  return (
    <>
      <RouteComponent auth={auth} setAuth={setAuth} setUserRole={setUserRole} />
      {shouldShowSupport && <SupportFloatingButton />}
    </>
  );
}

function App() {
  const [auth, setAuth] = useState(!!storage.getItem("token"));
  const [userRole, setUserRole] = useState(storage.getItem("role") || "");
  const foregroundListenerBound = useRef(false);

  // ✅ Automatically connect sockets + setup FCM when auth changes
  useEffect(() => {
    const token = storage.getItem("token");
    if (token) {
      connectSocket(token);
      setupNotifications(token, foregroundListenerBound);
    }
    return () => disconnectSocket();
  }, [auth]);

  return (
    <BrowserRouter>
      <SocketListener />
      {/* Now passing userRole + setUserRole */}
      <AppContent
        auth={auth}
        setAuth={setAuth}
        userRole={userRole}
        setUserRole={setUserRole}
      />
      <Toaster position="top-right" reverseOrder={false} />
    </BrowserRouter>
  );
}

// function App() {
//   const [auth, setAuth] = useState(!!storage.getItem("token"));
//   const [userRole, setUserRole] = useState(storage.getItem("role") || "");
//   const foregroundListenerBound = useRef(false);

//   // ✅ NEW: for Language Modal visibility
//   const [showLangModal, setShowLangModal] = useState(false);

//   // ✅ Automatically connect sockets + setup FCM when auth changes
//   useEffect(() => {
//     const token = storage.getItem("token");
//     if (token) {
//       connectSocket(token);
//       setupNotifications(token, foregroundListenerBound);
//     }
//     return () => disconnectSocket();
//   }, [auth]);

//   // ✅ Show language modal only on first visit (before login)
//   // useEffect(() => {
//   //   const langSelected = localStorage.getItem("mealex_lang_selected");
//   //   const seen = localStorage.getItem("mealex_first_visit_done");

//   //   if (!langSelected && !seen) {
//   //     setShowLangModal(true);
//   //     localStorage.setItem("mealex_first_visit_done", "true");
//   //   }
//   // }, []);

//   useEffect(() => {
//   const langSelected = localStorage.getItem("mealex_lang_selected");

//   // agar langSelected absent ya invalid ho tab modal show karo
//   if (!langSelected || !["en", "hi"].includes(langSelected)) {
//     setShowLangModal(true);
//     localStorage.setItem("mealex_first_visit_done", "true");
//   }
// }, []);


//   return (
//     <BrowserRouter>
//       <SocketListener />

//       {/* ✅ Language modal shown on first visit */}
//       <LanguageModal visible={showLangModal} onClose={() => setShowLangModal(false)} />

//       {/* Existing app content */}
//       <AppContent
//         auth={auth}
//         setAuth={setAuth}
//         userRole={userRole}
//         setUserRole={setUserRole}
//       />

//       <Toaster position="top-right" reverseOrder={false} />
//     </BrowserRouter>
//   );
// }


export default App;


