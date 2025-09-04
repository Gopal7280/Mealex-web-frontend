// import React from "react";
// import Navbar from "../layouts/Navbar";
// import OwnerHeader from "./ownerHeader";
// import { apiPost } from "../services/api";
// import storage from "../utils/storage";
// import { toast } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// const SwitchRole = () => {
//   const navigate = useNavigate();

//   const handleSwitchRole = async () => {
//     try {
//       const res = await apiPost("/owner/role/change");
//       if (res.success) {
//         console.log("🔄 Role switch response:", res); // Debug log
//         storage.setToken(res.token);
//         toast.success(res.message || "Role switched successfully");
//         navigate("/login/customers-dashboard");
//       } else {
//         toast.error(res.message || "Something went wrong");
//       }
//     } catch (err) {
//       toast.error("Error while switching role");
//     }
//   };

//   return (
//     <div className="flex h-screen">
//       <Navbar />
//          <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-[#FFFDD0] overflow-y-auto"> 

//       <OwnerHeader />
//       <div className="flex justify-center items-center h-[70vh]">
//         <button
//           onClick={handleSwitchRole}
//           className="px-6 py-3 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 transition"
//         >
//           Switch Role
//         </button>
//       </div>
//       </div>
//     </div>
//   );
// };

// export default SwitchRole;


// import React from "react";
// import Navbar from "../layouts/Navbar";
// import OwnerHeader from "./ownerHeader";
// import { apiPost } from "../services/api";
// import storage from "../utils/storage";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";

// const SwitchRole = () => {
//   const navigate = useNavigate();

//   const handleSwitchRole = async () => {
//     try {
//       const response = await apiPost("/owner/role/change");

//       if (response.data.success) {
//         toast.success(response.data.message);

//         if (response.data.token) {
//           storage.setToken(response.data.token);
//         }

//         navigate("/login/customers-dashboard");
//       } else {
//         toast.error("Something went wrong!");
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to switch role");
//     }
//   };

//   return (
//     <div className="flex h-screen">
//       <Navbar />
//          <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-[#FFFDD0] overflow-y-auto"> 

//       <OwnerHeader title="Switch Role" />
//       <div className="flex justify-center items-center h-[70vh]">
//         <button
//           onClick={handleSwitchRole}
//           className="bg-orange-500 text-white px-6 py-3 rounded-xl shadow hover:bg-orange-600 transition"
//         >
//           Switch Role
//         </button>
//       </div>
//       </div>
//     </div>
//   );
// };

// export default SwitchRole;




// import React, { useState } from "react";
// import Navbar from "../layouts/Navbar";
// import OwnerHeader from "./ownerHeader";
// import { apiPost } from "../services/api";
// import storage from "../utils/storage";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";

// const SwitchRole = () => {
//   const navigate = useNavigate();
//   const [isChecked, setIsChecked] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSwitchRole = async () => {
//     setIsLoading(true);
//     try {
//       const response = await apiPost("/owner/role/change");

//       if (response.data.success) {
//         toast.success(response.data.message);

//         if (response.data.token) {
//           storage.setToken(response.data.token);
//         }

//         navigate("/login/customers-dashboard");
//       } else {
//         toast.error("Something went wrong!");
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to switch role");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex h-screen">
//       <Navbar />
//       <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-green-50 overflow-y-auto">
//         <OwnerHeader title="Switch Role" />

//         {/* Description Section */}
//         <div className="bg-white shadow rounded-xl p-6 mt-4">
//           <h2 className="flex justify-center text-lg font-semibold text-gray-800 mb-2">About Switching Role</h2>
//           <p className="text-sm text-gray-600 leading-relaxed">
//             Currently, you are logged in as an <span className="font-medium text-orange-600">Owner</span>. 
//             By switching your role, you will also become a 
//             <span className="font-medium text-green-600"> Customer</span>. 
//             As a customer, you can explore different messes, place new orders, 
//             and manage your subscriptions directly from the customer dashboard. 
//             This will not remove your owner role — instead, it adds customer access 
//             so that you can experience the platform from both perspectives.
//           </p>

//           {/* Checkbox */}
//           <div className="flex items-center mt-4">
//             <input
//               type="checkbox"
//               id="confirm"
//               checked={isChecked}
//               onChange={(e) => setIsChecked(e.target.checked)}
//               className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-400"
//             />
//             <label htmlFor="confirm" className="ml-2 text-sm text-gray-700">
//               I have read and understood the above information.
//             </label>
//           </div>

//           {/* Switch Role Button */}
//           <div className="flex justify-center mt-6">
//             <button
//               onClick={handleSwitchRole}
//               disabled={!isChecked || isLoading}
//               className={`px-6 py-3 rounded-xl shadow-md text-white transition flex items-center gap-2 
//                 ${!isChecked || isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"}
//               `}
//             >
//               {isLoading ? (
//                 <>
//                   <svg
//                     className="animate-spin h-5 w-5 text-white"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     ></circle>
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
//                     ></path>
//                   </svg>
//                   Processing...
//                 </>
//               ) : (
//                 "Switch Role"
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SwitchRole;




import React, { useState } from "react";
import Navbar from "../layouts/Navbar";
import OwnerHeader from "./ownerHeader";
import { apiPost } from "../services/api";
import storage from "../utils/storage";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const SwitchRole = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSwitchRole = async () => {
    setIsLoading(true);
    try {
      const response = await apiPost("/owner/role/change");

      if (response.data.success) {
        toast.success(response.data.message);

        if (response.data.token) {
          storage.setToken(response.data.token);
        }

        navigate("/login/customers-dashboard");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to switch role");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <Navbar />
      <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-gray-50 overflow-y-auto">
        <OwnerHeader title="Switch Role" />

        {/* Description Section */}
        <div className="bg-white shadow rounded-xl p-6 mt-4">
          <h2 className="flex justify-center text-lg font-semibold text-gray-800 mb-2">
            About Switching Role
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Currently, you are logged in as an{" "}
            <span className="font-medium text-orange-600">Owner</span>. By switching
            your role, you will also become a{" "}
            <span className="font-medium text-green-600">Customer</span>. As a
            customer, you can explore different messes, place new orders, and
            manage your subscriptions directly from the customer dashboard. This
            will not remove your owner role — instead, it adds customer access so
            that you can experience the platform from both perspectives.
          </p>

          {/* Switch Role Button */}
          <div className="flex justify-center mt-6">
            <button
              onClick={handleSwitchRole}
              disabled={isLoading}
              className={`px-6 py-3 rounded-xl shadow-md text-white transition flex items-center gap-2 
                ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"}
              `}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Switch Role"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwitchRole;
