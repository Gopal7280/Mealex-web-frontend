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

//   // Active link helper
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
//       <div className="md:hidden flex items-center  w-full bg-white px-2 py-2 fixed top-0 left-0 z-50 gap-2 shadow-md">
//         <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 cursor-pointer">
//           {isOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>
//         <div>
//           <img src={mealx} alt="MealX Logo" className="h-6" />
//         </div>
//       </div>

//       {/* Sidebar */}
//       <div
//         className={`bg-white shadow-sm border-r fixed top-0 left-0 h-screen w-36 md:w-60 flex flex-col justify-between z-40 
//           transform transition-transform duration-300
//           ${isOpen ? "translate-x-0" : "-translate-x-full"} 
//           md:translate-x-0 md:relative md:flex`}
//       >
//         {/* Logo (Desktop Only) */}
//         <div className="hidden md:block p-6">
//           <img src={mealx} alt="MealX Logo" className="h-10 mb-1" />
//           <span className="text-xs text-orange-500 font-semibold">
//             Connecting Plates & People
//           </span>
//         </div>

//         {/* Links */}
//         <div className="md:w-full md:flex md:flex-col md:gap-2 md:flex-grow md:pt-4 pt-16 md:pl-4 py-1">
//           <Link
//             to="/login/customers-dashboard"
//             className={getLinkClasses("/login/customers-dashboard")}
//             onClick={() => setIsOpen(false)}
//           >
//             <LayoutDashboard size={20} />
//             Dashboard
//           </Link>

//           <Link
//             to="/customer-activeplans"
//             className={getLinkClasses("/customer-activeplans")}
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
//             to="/switch-role-customer"
//             className={getLinkClasses("/switch-role")}
//             onClick={() => setIsOpen(false)}
//           >
//             <UserCog size={20} />
//             Switch Role
//           </Link>

//           {/* <Link
//             to="/settings"
//             className={getLinkClasses("/settings")}
//             onClick={() => setIsOpen(false)}
//           >
//             <Settings size={20} />
//             Settings
//           </Link> */}
//         </div>

//         {/* Footer */}
//         <div className="p-4 border-t text-xs text-gray-500 text-center">
//           © 2025 MealX. All rights reserved.
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
  Menu,
  X,
} from "lucide-react";
// import { useTranslation } from "react-i18next";


const CustomerSidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
    // const { t } = useTranslation();


  // Helper to highlight active link
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
      {/* 🌐 Mobile Header */}
      <div className="md:hidden flex items-center w-full bg-white px-2 py-2 fixed top-0 left-0 z-50 gap-2 shadow-md">
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 cursor-pointer">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div>
          <img src={mealx} alt="MealX Logo" className="h-6" />
        </div>
      </div>

      {/* 🧭 Sidebar */}
      <div
        className={`bg-white shadow-sm border-r fixed top-0 left-0 h-screen w-36 md:w-60 flex flex-col justify-between z-40 
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:relative md:flex`}
      >
        {/* Logo Section (Desktop Only) */}
        <div className="hidden md:block p-6">
          <img src={mealx} alt="MealX Logo" className="h-10 mb-1" />
          <span className="text-xs text-orange-500 font-semibold">
            Connecting Plates & People
          </span>
        </div>

        {/* Navigation Links */}
        <div className="md:w-full md:flex md:flex-col md:gap-2 md:flex-grow md:pt-4 pt-16 md:pl-4 py-1">

          <Link
            to="/login/customers-dashboard"
            className={getLinkClasses("/login/customers-dashboard")}
            onClick={() => setIsOpen(false)}
          >
            <LayoutDashboard size={20} />
          {/* {t("dashboard")} */}
Dashboard
          </Link>

          <Link
            to="/customer-activeplans"
            className={getLinkClasses("/customer-activeplans")}
            onClick={() => setIsOpen(false)}
          >
            <ClipboardList size={20} />
          {/* {t("plans")}   */}
Plans
          </Link>

          <Link
            to="/customers-orders"
            className={getLinkClasses("/customers-orders")}
            onClick={() => setIsOpen(false)}
          >
            <ShoppingCart size={20} />
            {/* {t("orders")} */}
Orders
          </Link>

          <Link
            to="/customer-history"
            className={getLinkClasses("/customer-history")}
            onClick={() => setIsOpen(false)}
          >
            <Clock size={20} />
            {/* {t("history")} */}
 History
          </Link>

          <Link
            to="/switch-role-customer"
            className={getLinkClasses("/switch-role-customer")}
            onClick={() => setIsOpen(false)}
          >
            <UserCog size={20} />
          {/* {t("switchRole")} */}
Switch Role
          </Link>
        </div>

        {/* Footer */}
        <div className="p-4 border-t text-xs text-gray-500 text-center">
          © 2025 MealEX. All rights reserved.
        </div>
      </div>
    </>
  );
};

export default CustomerSidebar;
