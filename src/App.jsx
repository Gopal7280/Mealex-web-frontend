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





import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import RouteComponent from "./routes/routes";
import SocketListener from './config/SocketListener';
import { Toaster, toast } from 'react-hot-toast';
import storage from './utils/storage';
import { connectSocket, disconnectSocket } from './config/socket';
import { initFCM, onMessageListener } from './firebase';   // ✅ new
import { apiPost } from './services/api';                  // ✅ new

function App() {
  const [auth, setAuth] = useState(!!storage.getItem('token')); 

  useEffect(() => {
    const token = storage.getItem('token');
    if (token) {
      connectSocket(token); 
      console.log("Socket connected");

      // ✅ Setup push notifications
      const setupNotifications = async () => {
        console.log("Setting up notifications...");
        const fcmToken = await initFCM();
        console.log("FCM Token fetched:", fcmToken);
        if (fcmToken) {
          console.log("FCM Token:", fcmToken);

          // send token to backend
          await apiPost(
            "/user/notification-token",
            { token: fcmToken, deviceType: "web" },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          // foreground notifications
          onMessageListener().then((payload) => {
            console.log("Foreground Notification:", payload);
            const { title, body } = payload.notification || {};
            toast(`${title}: ${body}`);
          });
        }
      };

      setupNotifications();
    }

    return () => {
      disconnectSocket();
    };
}, [auth]);   // <- auth pe dependency

  return (
    <BrowserRouter>
      <SocketListener />  
      <RouteComponent auth={auth} setAuth={setAuth} />  
      <Toaster position="top-right" reverseOrder={false} />
    </BrowserRouter>
  );
}

export default App;
