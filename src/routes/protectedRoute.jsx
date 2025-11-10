// // // import React from 'react'
// // // import { Navigate } from 'react-router-dom'
// // // import storage from '../utils/storage'

// // // export default function ProtectedRoute({ allowedRoles, children }) {
// // //   // Token & role check
// // //   const token = storage.getItem('token')
// // //   const user = storage.getItem('user') // Assume you store { role: 'owner' } after login

// // //   if (!token) {
// // //     return <Navigate to="/login" replace />
// // //   }

// // //   if (!allowedRoles.includes(user?.role)) {
// // //     return <Navigate to="/" replace />
// // //   }

// // //   return children
// // // }



// // import React from "react";
// // import { Navigate, Outlet } from "react-router-dom";
// // import storage from "../utils/storage";

// // const ProtectedRoute = ({ allowedRole }) => {
// //   const token = storage.getItem("token");
// //   const role = storage.getItem("role");
// //   if (!token) return <Navigate to="/login" replace />;
// //   if (allowedRole && role !== allowedRole) {
// //     if (role === "owner") return <Navigate to="/owner/dashboard" replace />;
// //     if (role === "customer") return <Navigate to="/minimal-dashboard" replace />;
// //     return <Navigate to="/" replace />;
// //   }
// //   return <Outlet />;
// // };

// // export default ProtectedRoute;




// // src/routes/ProtectedRoute.jsx
// import React from "react";
// import { Navigate, useLocation } from "react-router-dom";
// import storage from "../utils/storage";

// // safe JWT parser (returns null on failure)
// export function parseJwt(token) {
//   try {
//     const payload = token.split(".")[1];
//     return JSON.parse(atob(payload));
//   } catch (e) {
//     return null;
//   }
// }

// /**
//  * Usage:
//  * <ProtectedRoute allowedRoles={['owner']}><OwnerPage/></ProtectedRoute>
//  * If allowedRoles is empty => just checks for authentication.
//  */
// export default function ProtectedRoute({ children, allowedRoles = [] }) {
//   const location = useLocation();
//   const token = storage.getItem("token");

//   // Not logged in
//   if (!token) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   // Try get role from storage first, then fall back to JWT payload
//   let role = storage.getItem("role");
//   if (!role) {
//     const payload = parseJwt(token);
//     role = payload?.role || payload?.user?.role || null;
//   }

//   // If allowedRoles provided and user's role isn't allowed -> redirect
//   if (allowedRoles.length && !allowedRoles.includes(role)) {
//     return <Navigate to="/" replace />;
//   }

//   // OK
//   return children;
// }





// // src/routes/ProtectedRoute.jsx
// import React from "react";
// import { Navigate, useLocation } from "react-router-dom";
// import storage from "../utils/storage";

// export default function ProtectedRoute({ children, allowedRoles = [] }) {
//   const location = useLocation();
//   const token = storage.getItem("token");

//   if (!token) {
//     // Not logged in
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   let role = storage.getItem("role");
//   if (!role) {
//     try {
//       const payload = JSON.parse(atob(token.split(".")[1]));
//       role = payload?.role || payload?.user?.role || null;
//     } catch {
//       role = null;
//     }
//   }

//   // If role not allowed
//   if (allowedRoles.length && !allowedRoles.includes(role)) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// }




// src/routes/ProtectedRoute.jsx

import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import storage from "../utils/storage";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const location = useLocation();
  const token = storage.getItem("token");

  if (!token) {
    // Not logged in
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Get single role or both
  let role = storage.getItem("role"); // owner or customer
  const roles = storage.getItem("roles"); // both

  if (!role && !roles) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      role = payload?.role || payload?.user?.role || null;
    } catch {
      role = null;
    }
  }

  // If user has both roles, allow access if either role matches allowedRoles
  if (roles === "both") {
    const hasAccess = allowedRoles.some(r => ["owner", "customer"].includes(r));
    if (!hasAccess) return <Navigate to="/" replace />;
  } else if (allowedRoles.length && !allowedRoles.includes(role)) {
    // Normal single role check
    return <Navigate to="/" replace />;
  }

  return children;
}
