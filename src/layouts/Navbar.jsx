


// import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import mealx from '../assets/mealx.png'; // Adjust the path as necessary
// import {
//   LayoutDashboard,
//   ClipboardList,
//   ShoppingCart,
//   Users,
//   Clock,
//   Repeat,
//   UserCog,
//   Settings,
//   Menu,
//   X
// } from 'lucide-react';

// const Sidebar = () => {
//   const location = useLocation();
//   const [isOpen, setIsOpen] = useState(false);

//   const navItems = [
//     { label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/owner-dashboard' },
//     { label: 'Plans', icon: <ClipboardList size={20} />, path: '/plans' },
//     { label: 'Orders', icon: <ShoppingCart size={20} />, path: '/orders' },
//     { label: 'Customers', icon: <Users size={20} />, path: '/customers' },
//     { label: 'History', icon: <Clock size={20} />, path: '/history' },
//     { label: 'Switch Mess', icon: <Repeat size={20} />, path: '/switch-mess' },
//     { label: 'Switch Role', icon: <UserCog size={20} />, path: '/switch-role' },
//     { label: 'Settings', icon: <Settings size={20} />, path: '/settings' },
//   ];

//  return (
//   <>
//     <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white max-h-full shadow-md border-b">
//       <img src={mealx} alt="MealX Logo" className="h-8" />
//       <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800">
//         {isOpen ? <X size={24} /> : <Menu size={24} />}
//       </button>
//     </div>

//     <div
//       className={`${
//         isOpen ? 'block' : 'hidden'
//       } md:flex md:flex-col md:items-start md:px-6 md:py-8 bg-white md:w-64 h-screen shadow-sm border-r fixed md:relative z-50`}
//     >
//       <div className="hidden md:block mb-10">
//         <img src={mealx} alt="MealX Logo" className="h-10 mb-1" />
//         <span className="text-xs text-orange-500 font-semibold">Connecting Plates & People</span>
//       </div>

//       <div className="w-full flex flex-col gap-2">
//         {navItems.map((item) => (
//           <React.Fragment key={item.label}>
//             <Link
//               to={item.path}
//               onClick={() => setIsOpen(false)}
//               className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 w-full
//                 ${
//                   location.pathname === item.path
//                     ? 'bg-orange-100 text-orange-600 font-semibold border-l-4 border-orange-500'
//                     : 'text-gray-600 hover:text-orange-500 hover:bg-gray-100'
//                 }
//               `}
//             >
//               {item.icon}
//               {item.label}
//             </Link>

//             {/* Show Add Plan when on Plans page */}
//             {item.path === '/plans' && location.pathname === '/plans' && (
//               <Link
//                 to="/add-plan"
//                 onClick={() => setIsOpen(false)}
//                 className="ml-10 text-sm text-green-600 hover:text-green-800 transition"
//               >
//                 ➕ Add New Plan
//               </Link>
//             )}
//           </React.Fragment>
//         ))}
//       </div>
//     </div>
//   </>
// );

// };

// export default Sidebar;


// import React, { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import mealx from "../assets/mealx.png";
// import { LayoutDashboard, ClipboardList, ShoppingCart, Users, Clock, Repeat, UserCog, Settings, MoreVertical, X } from "lucide-react";

// const Sidebar = () => {
//   const location = useLocation();
//   const [isOpen, setIsOpen] = useState(false);

//   // active link helper
//   const getLinkClasses = (path) =>
//     `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 w-full ${
//       location.pathname === path
//         ? "bg-orange-100 text-orange-600 font-semibold border-l-4 border-orange-500"
//         : "text-gray-600 hover:text-orange-500 hover:bg-gray-100"
//     }`;

//   return (
//     <>
//       {/* Mobile Header */}
//       <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white shadow-md border-b">
//         <img src={mealx} alt="MealX Logo" className="h-8" />
//         <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800">
//           {isOpen ? <X size={24} /> : <MoreVertical size={24} />}
//         </button>
//       </div>

//       {/* Sidebar */}
//       <div
//         className={`bg-white shadow-sm border-r fixed md:relative z-50 h-screen w-64 md:flex md:flex-col md:items-start md:px-6 md:py-8 ${
//           isOpen ? "block" : "hidden"
//         } md:block`}
//       >
//         {/* Logo Section */}
//         <div className="mb-10 hidden md:block">
//           <img src={mealx} alt="MealX Logo" className="h-10 mb-1" />
//           <span className="text-xs text-orange-500 font-semibold">
//             Connecting Plates & People
//           </span>
//         </div>

//         {/* Links */}
//         <div className="w-full flex flex-col gap-2">
//           <Link to="/owner-dashboard" className={getLinkClasses("/owner-dashboard")} onClick={() => setIsOpen(false)}>
//             <LayoutDashboard size={20} />
//             Dashboard
//           </Link>

//           <Link to="/plans" className={getLinkClasses("/plans")} onClick={() => setIsOpen(false)}>
//             <ClipboardList size={20} />
//             Plans
//           </Link>

//           {/* Show Add New Plan link only on Plans page */}
//           {location.pathname === "/plans" && (
//             <Link
//               to="/add-plan"
//               className="ml-10 text-sm text-green-600 hover:text-green-800 transition"
//               onClick={() => setIsOpen(false)}
//             >
//               ➕ Add New Plan
//             </Link>
//           )}

//           <Link to="/orders" className={getLinkClasses("/orders")} onClick={() => setIsOpen(false)}>
//             <ShoppingCart size={20} />
//             Orders
//           </Link>

//           <Link to="/customers" className={getLinkClasses("/customers")} onClick={() => setIsOpen(false)}>
//             <Users size={20} />
//             Customers
//           </Link>

//           <Link to="/history" className={getLinkClasses("/history")} onClick={() => setIsOpen(false)}>
//             <Clock size={20} />
//             History
//           </Link>

//           <Link to="/switch-mess" className={getLinkClasses("/switch-mess")} onClick={() => setIsOpen(false)}>
//             <Repeat size={20} />
//             Switch Mess
//           </Link>

//           <Link to="/switch-role" className={getLinkClasses("/switch-role")} onClick={() => setIsOpen(false)}>
//             <UserCog size={20} />
//             Switch Role
//           </Link>

//           <Link to="/settings" className={getLinkClasses("/settings")} onClick={() => setIsOpen(false)}>
//             <Settings size={20} />
//             Settings
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;




// nhi hua pura ye lo code 


// import React, { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import mealx from "../assets/mealx.png";
// import {
//   LayoutDashboard,
//   ClipboardList,
//   ShoppingCart,
//   Users,
//   Clock,
//   Repeat,
//   UserCog,
//   Settings,
//   Menu,
//   X,
// } from "lucide-react";

// const Sidebar = () => {
//   const location = useLocation();
//   const [isOpen, setIsOpen] = useState(false);

//   // Active link helper - supports multiple paths
//   const getLinkClasses = (paths) => {
//     const isActive = Array.isArray(paths)
//       ? paths.includes(location.pathname)
//       : location.pathname === paths;

//     return `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 w-full ${
//       isActive
//         ? "bg-orange-100 text-orange-600 font-semibold border-l-4 border-orange-500"
//         : "text-gray-600 hover:text-orange-500 hover:bg-gray-100"
//     }`;
//   };

//   return (
//     <>
//       {/* Mobile Header */}
//       <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white shadow-md border-b fixed top-0 left-0 right-0 z-50">
//         <img src={mealx} alt="MealX Logo" className="h-8" />
//         <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800">
//           {isOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>
//       </div>

//       {/* Sidebar */}
//       <div
//         className={`bg-white shadow-sm border-r fixed top-0 left-0 h-screen w-64 flex flex-col justify-between z-40 
//           transform transition-transform duration-300
//           ${isOpen ? "translate-x-0" : "-translate-x-full"} 
//           md:translate-x-0 md:relative md:flex`}
//       >
//         {/* Logo Section (Desktop Only) */}
//         <div className="hidden md:block p-6">
//           <img src={mealx} alt="MealX Logo" className="h-10 mb-1" />
//           <span className="text-xs text-orange-500 font-semibold">
//             Connecting Plates & People
//           </span>
//         </div>

//         {/* Links */}
//         <div className="w-full flex flex-col gap-2 flex-grow px-2">
//           <Link
//             to="/owner-dashboard"
//             className={getLinkClasses("/owner-dashboard")}
//             onClick={() => setIsOpen(false)}
//           >
//             <LayoutDashboard size={20} />
//             Dashboard
//           </Link>

//           <Link
//             to="/plans"
//             className={getLinkClasses("/plans")}
//             onClick={() => setIsOpen(false)}
//           >
//             <ClipboardList size={20} />
//             Plans
//           </Link>

//           {/* Show Add New Plan link only on Plans page */}
//           {location.pathname === "/plans" && (
//             <Link
//               to="/add-plan"
//               className="ml-10 text-sm text-green-600 hover:text-green-800 transition"
//               onClick={() => setIsOpen(false)}
//             >
//               ➕ Add New Plan
//             </Link>
//           )}

//           <Link
//             to="/orders"
//             className={getLinkClasses("/orders")}
//             onClick={() => setIsOpen(false)}
//           >
//             <ShoppingCart size={20} />
//             Orders
//           </Link>

//           {/* Customers: active on /customers AND /add-customer */}
//           <Link
//             to="/customers"
//             className={getLinkClasses(["/customers", "/add-customer"])}
//             onClick={() => setIsOpen(false)}
//           >
//             <Users size={20} />
//             Customers
//           </Link>

//           <Link
//             to="/history"
//             className={getLinkClasses("/history")}
//             onClick={() => setIsOpen(false)}
//           >
//             <Clock size={20} />
//             History
//           </Link>

//           <Link
//             to="/minimal-dashboard"
//             className={getLinkClasses("/switch-mess")}
//             onClick={() => setIsOpen(false)}
//           >
//             <Repeat size={20} />
//             Switch Mess
//           </Link>

//           <Link
//             to="/switch-role"
//             className={getLinkClasses("/switch-role")}
//             onClick={() => setIsOpen(false)}
//           >
//             <UserCog size={20} />
//             Switch Role (Owner)
//           </Link>

//           <Link
//             to="/settings"
//             className={getLinkClasses("/settings")}
//             onClick={() => setIsOpen(false)}
//           >
//             <Settings size={20} />
//             Settings
//           </Link>
//         </div>

//         {/* Footer (Fixed at Bottom) */}
//         <div className="p-4 border-t text-xs text-gray-500 text-center">
//           © 2025 MealX
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;









//pranav bhaiyya wala code 



import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import mealx from "../assets/mealx.png";
import {
  LayoutDashboard,
  ClipboardList,
  ShoppingCart,
  Users,
  Clock,
  Repeat,
  UserCog,
  Settings,
  Menu,
  X,
 FileCheck   // ✅ KYC style icon

} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Active link helper - supports multiple paths
  const getLinkClasses = (paths) => {
    const isActive = Array.isArray(paths)
      ? paths.includes(location.pathname)
      : location.pathname === paths;

    return `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 w-full ${
      isActive
        ? "bg-orange-100 text-orange-600 font-semibold border-l-4 border-orange-500"
        : "text-gray-600 hover:text-orange-500 hover:bg-gray-100"
    }`;
  };

  

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden flex items-center w-full bg-white px-2 py-2 fixed top-0 left-0 z-50 gap-2 shadow-md">
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 cursor-pointer">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div>
          <img src={mealx} alt="MealX Logo" className="h-6" />
      
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`bg-white shadow-sm border-r fixed top-0 left-0 h-screen w-36 md:w-60 flex flex-col justify-between z-40 
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:relative md:flex`}
      >

        <div className="md:w-full md:flex md:flex-col md:gap-2 md:flex-grow md:pt-4 pt-16 md:pl-4 py-1">
          
          <div className="hidden md:block p-6">
          <img src={mealx} alt="MealX Logo" className="h-10 mb-1" />
          <span className="text-xs text-orange-500 font-semibold">
            Connecting Plates & People
          </span>
        </div>

              


          <Link
            to="/owner-dashboard"
            className={getLinkClasses("/owner-dashboard")}
            onClick={() => setIsOpen(false)}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </Link>

          <Link
            to="/plans"
            className={getLinkClasses("/plans")}
            onClick={() => setIsOpen(false)}
          >
            <ClipboardList size={20} />
            Plans
          </Link>

          {/* Show Add New Plan link only on Plans page */}
          {location.pathname === "/plans" && (
            <Link
              to="/add-plan"
              className="ml-10 text-sm text-green-600 hover:text-green-800 transition"
              onClick={() => setIsOpen(false)}
            >
              ➕ Add New Plan
            </Link>
          )}

          <Link
            to="/orders"
            className={getLinkClasses("/orders")}
            onClick={() => setIsOpen(false)}
          >
            <ShoppingCart size={20} />
            Orders
          </Link>

          {/* Customers: active on /customers AND /add-customer */}
          <Link
            to="/customers"
            className={getLinkClasses(["/customers", "/add-customer"])}
            onClick={() => setIsOpen(false)}
          >
            <Users size={20} />
            Customers
          </Link>

          <Link
            to="/history"
            className={getLinkClasses("/history", "/owner/history/plans")}
            onClick={() => setIsOpen(false)}
          >
            <Clock size={20} />
            History
          </Link>

          <Link
            to="/switch-mess"
            className={getLinkClasses("/switch-mess")}
            onClick={() => setIsOpen(false)}
          >
            <Repeat size={20} />
            Switch Mess
          </Link>

          <Link
            to="/switch-role"
            className={getLinkClasses("/switch-role")}
            onClick={() => setIsOpen(false)}
          >
            <UserCog size={20} />
            Switch Role
          </Link>
           
          <Link
          to="/Mess-KYC"
          className={getLinkClasses("/Mess-KYC")}
          onClick={() => setIsOpen(false)}
           >
          <FileCheck size={20} />   {/* ✅ KYC icon */}
          Add Account
          </Link>

          {/* <Link
            to="/settings"
            className={getLinkClasses("/settings")}
            onClick={() => setIsOpen(false)}
          >
            <Settings size={20} />
            Settings
          </Link> */}
        </div>

        {/* Footer (Fixed at Bottom) */}
        <div className="p-4 border-t text-xs text-gray-500 text-center">
          © 2025 MealX. All rights reserved.
        </div>
      </div>
    </>
  );
};

export default Sidebar;






