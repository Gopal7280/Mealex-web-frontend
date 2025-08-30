
// // import React, { useState } from 'react';
// // import { Link, useLocation } from 'react-router-dom';
// // import mealx from '../assets/mealx.png';
// // import {
// //   LayoutDashboard,
// //   ClipboardList,
// //   ShoppingCart,
// //   Users,
// //   Clock,
// //   Repeat,
// //   UserCog,
// //   Settings,
// //   Menu,
// //   X
// // } from 'lucide-react';

// // const Sidebar = () => {
// //   const location = useLocation();
// //   const [isOpen, setIsOpen] = useState(false);

// //   const navItems = [
// //     { label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/login/customers-dashboard' },
// //     { label: 'Plans', icon: <ClipboardList size={20} />, path: '/customer-minimal-dashboard' },
// //     { label: 'Orders', icon: <ShoppingCart size={20} />, path: '/customers-orders' },
// //     // { label: 'Explore', icon: <Users size={20} />, path: '/customer-plans'  },
// //     { label: 'History', icon: <Clock size={20} />, path: '/customer-history' },
// //     // { label: 'Switch Mess', icon: <Repeat size={20} />, path: '/switch-mess' },
// //     { label: 'Switch Role', icon: <UserCog size={20} />, path: '/switch-role' },
// //     { label: 'Settings', icon: <Settings size={20} />, path: '/settings' },
// //   ];

// //   return (
// //     <>
// //       {/* Mobile Topbar */}
// //       <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white shadow-md border-b">
// //         <img src={mealx} alt="MealX Logo" className="h-8" />
// //         <button onClick={() => setIsOpen(!isOpen)} className="text-[#898989]">
// //           {isOpen ? <X size={24} /> : <Menu size={24} />}
// //         </button>
// //       </div>

// //       {/* Sidebar */}
// //       <div
// //         className={`${
// //           isOpen ? 'block' : 'hidden'
// //         } md:flex md:flex-col bg-white md:w-64 h-svw border-r fixed md:relative z-50 px-6 py-8 shadow-sm`}
// //       >
// //         {/* Logo Section */}
// //         <div className="mb-10">
// //           <img src={mealx} alt="MealX Logo" className="h-10 mb-1" />
// //           <span className="text-xs text-orange-500 font-semibold block">Connecting Plates & People</span>
// //         </div>

// //         {/* Nav Items */}
// //         <div className="w-full flex flex-col gap-2">
// //           {navItems.map((item) => {
// //             const isActive = location.pathname === item.path;
// //             return (
// //               <React.Fragment key={item.label}>
// //                 <Link
// //                   to={item.path}
// //                   onClick={() => setIsOpen(false)}
// //                   className={`flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg transition-all
// //                     ${
// //                       isActive
// //                         ? 'bg-orange-100 text-orange-600 font-semibold border-l-4 border-orange-500'
// //                         : 'text-gray-600 hover:bg-gray-100 hover:text-orange-500'
// //                     }
// //                   `}
// //                 >
// //                   {item.icon}
// //                   {item.label}
// //                 </Link>

// //                 {item.path === '/plans' && isActive && (
// //                   <Link
// //                     to="/add-plan"
// //                     onClick={() => setIsOpen(false)}
// //                     className="ml-10 text-sm text-green-600 hover:text-green-800 transition"
// //                   >
// //                     ➕ Add New Plan
// //                   </Link>
// //                 )}
                
// //               </React.Fragment>
// //             );
// //           })}
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default Sidebar;

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

//   const getLinkClasses = (path) => {
//     const isActive = location.pathname === path;
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
//         {/* Logo Section */}
//         <div className="p-6">
//           <img src={mealx} alt="MealX Logo" className="h-10 mb-1" />
//           <span className="text-xs text-orange-500 font-semibold">
//             Connecting Plates & People
//           </span>
//         </div>

//         {/* Links */}
//         <div className="w-full flex flex-col gap-2 flex-grow px-2">
//           <Link
//             to="/login/customers-dashboard"
//             className={getLinkClasses("/login/customers-dashboard")}
//             onClick={() => setIsOpen(false)}
//           >
//             <LayoutDashboard size={20} />
//             Dashboard
//           </Link>

//           <Link
//             to="/customer-minimal-dashboard"
//             className={getLinkClasses("/customer-minimal-dashboard")}
//             onClick={() => setIsOpen(false)}
//           >
//             <ClipboardList size={20} />
//             Plans
//           </Link>

//           <Link
//             to="/customers-orders"
//             className={getLinkClasses("/customers-orders")}
//             onClick={() => setIsOpen(false)}
//           >
//             <ShoppingCart size={20} />
//             Orders
//           </Link>

//           <Link
//             to="/customer-history"
//             className={getLinkClasses("/customer-history")}
//             onClick={() => setIsOpen(false)}
//           >
//             <Clock size={20} />
//             History
//           </Link>

//           <Link
//             to="/switch-role"
//             className={getLinkClasses("/switch-role")}
//             onClick={() => setIsOpen(false)}
//           >
//             <UserCog size={20} />
//             Switch Role
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

//         {/* Footer */}
//         <div className="p-4 border-t text-xs text-gray-500 text-center">
//           © 2025 MealX
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;



// import React, { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import mealx from "../assets/mealx.png";
// import {
//   LayoutDashboard,
//   ClipboardList,
//   ShoppingCart,
//   Clock,
//   UserCog,
//   Settings,
//   Menu,
//   X,
// } from "lucide-react";

// const Sidebar = () => {
//   const location = useLocation();
//   const [isOpen, setIsOpen] = useState(false);

//   // Active link helper - supports single or multiple paths
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
//             to="/login/customers-dashboard"
//             className={getLinkClasses("/login/customers-dashboard")}
//             onClick={() => setIsOpen(false)}
//           >
//             <LayoutDashboard size={20} />
//             Dashboard
//           </Link>

//           <Link
//             to="/customer-minimal-dashboard"
//             className={getLinkClasses("/customer-minimal-dashboard")}
//             onClick={() => setIsOpen(false)}
//           >
//             <ClipboardList size={20} />
//             Plans
//           </Link>

//           <Link
//             to="/customers-orders"
//             className={getLinkClasses("/customers-orders")}
//             onClick={() => setIsOpen(false)}
//           >
//             <ShoppingCart size={20} />
//             Orders
//           </Link>

//           <Link
//             to="/customer-history"
//             className={getLinkClasses("/customer-history")}
//             onClick={() => setIsOpen(false)}
//           >
//             <Clock size={20} />
//             History
//           </Link>

//           <Link
//             to="/switch-role"
//             className={getLinkClasses("/switch-role")}
//             onClick={() => setIsOpen(false)}
//           >
//             <UserCog size={20} />
//             Switch Role (Customer)
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

//         {/* Footer */}
//         <div className="p-4 border-t text-xs text-gray-500 text-center">
//           © 2025 MealX
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;





import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import mealx from "../assets/mealx.png";
import {
  LayoutDashboard,
  ClipboardList,
  ShoppingCart,
  Clock,
  UserCog,
  Settings,
  Menu,
  X,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Active link helper
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
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800">
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
        {/* Logo (Desktop Only) */}
        <div className="hidden md:block p-6">
          <img src={mealx} alt="MealX Logo" className="h-10 mb-1" />
          <span className="text-xs text-orange-500 font-semibold">
            Connecting Plates & People
          </span>
        </div>

        {/* Links */}
        <div className="md:w-full md:flex md:flex-col md:gap-2 md:flex-grow md:pt-4 pt-16 md:pl-4 py-1">
          <Link
            to="/login/customers-dashboard"
            className={getLinkClasses("/login/customers-dashboard")}
            onClick={() => setIsOpen(false)}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </Link>

          <Link
            to="/customer/your-mess"
            className={getLinkClasses("/customer/your-mess")}
            onClick={() => setIsOpen(false)}
          >
            <ClipboardList size={20} />
            Plans
          </Link>

          <Link
            to="/customers-orders"
            className={getLinkClasses("/customers-orders")}
            onClick={() => setIsOpen(false)}
          >
            <ShoppingCart size={20} />
            Orders
          </Link>

          <Link
            to="/customer-history"
            className={getLinkClasses("/customer-history")}
            onClick={() => setIsOpen(false)}
          >
            <Clock size={20} />
            History
          </Link>

          <Link
            to="/switch-role-customer"
            className={getLinkClasses("/switch-role")}
            onClick={() => setIsOpen(false)}
          >
            <UserCog size={20} />
            Switch Role
          </Link>

          <Link
            to="/settings"
            className={getLinkClasses("/settings")}
            onClick={() => setIsOpen(false)}
          >
            <Settings size={20} />
            Settings
          </Link>
        </div>

        {/* Footer */}
        <div className="p-4 border-t text-xs text-gray-500 text-center">
          © 2025 MealX. All rights reserved.
        </div>
      </div>
    </>
  );
};

export default Sidebar;
