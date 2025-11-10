// import React, { useState } from "react";
// import { apiPost } from "../services/api";
// import storage from "../utils/storage";
// import { toast } from "react-hot-toast";
// import Navbar2 from "../layouts/Navbar2";
// import CustomerHeader from '../layouts/CustomerHeader';


// import { useNavigate } from "react-router-dom";

// const SwitchRoleCustomer = () => {
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSwitchRole = async () => {
//     try {
//       setLoading(true);

//       const response = await apiPost("/customer/role/change");

//       if (response?.data?.success) {
//         const newToken = response?.data?.token;

//         if (newToken) {
//           storage.setToken(newToken); // ✅ replace old JWT with new one
//         }

//         toast.success(response?.data?.message || "Role switched to Owner!");

//         navigate("/owner-dashboard"); // ✅ redirect to owner dashboard
//       } else {
//         toast.error("Unable to switch role. Try again.");
//       }
//     } catch (error) {
//       console.error("Role switch error:", error);
//       toast.error(error.response?.data?.message || "Something went wrong!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex h-screen">
//       <Navbar2 />
//       <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-[#FFFDD0] overflow-y-auto">
//         <CustomerHeader title="Switch Role" />
//         <h1 className="text-2xl font-bold mb-4 text-gray-800">
//           Switch Role to Owner
//         </h1>
//         <p className="text-gray-600 mb-6">
//           You are currently a <b>Customer</b>.  
//           Click below if you want to become an <b>Owner</b>.
//         </p>
//         <button
//           onClick={handleSwitchRole}
//           disabled={loading}
//           className={`w-full py-3 px-4 rounded-xl text-white font-semibold transition ${
//             loading ? "bg-gray-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"
//           }`}
//         >
//           {loading ? "Switching..." : "Switch to Owner"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SwitchRoleCustomer;


// import React, { useState } from "react";
// import { apiPost } from "../services/api";
// import storage from "../utils/storage";
// import { setToken } from "../services/authService"; // ✅ direct import
// import { toast } from "react-hot-toast";
// import Navbar2 from "../layouts/Navbar2";
// import CustomerHeader from "../layouts/CustomerHeader";
// import { useNavigate } from "react-router-dom";


// const SwitchRoleCustomer = () => {
//   const [isChecked, setIsChecked] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSwitchRole = async () => {
//     setIsLoading(true);
//     try {
//       const response = await apiPost("/customer/role/change");

//       if (response?.data?.success) {
//         const newToken = response?.data?.token;

//             if (newToken) {
//           setToken(newToken); // ✅ replace old token value, same key "token"
//         }

//         toast.success(response?.data?.message || "Role switched to Owner!");
//         navigate("/owner-dashboard"); // ✅ redirect to owner dashboard
//       } else {
//         toast.error("Unable to switch role. Try again.");
//       }
//     } catch (error) {
//       console.error("Role switch error:", error);
//       toast.error(error.response?.data?.message || "Something went wrong!");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex h-screen">
//       <Navbar2 />
//       <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-green-50 overflow-y-auto">
//         <CustomerHeader title="Switch Role" />

//         {/* Description Section */}
//         <div className="bg-white shadow rounded-xl p-6 mt-4">
//           <h2 className="flex justify-center text-lg font-semibold text-gray-800 mb-2">
//             About Switching Role
//           </h2>
//           <p className="text-sm text-gray-600 leading-relaxed">
//             You are currently logged in as a{" "}
//             <span className="font-medium text-green-600">Customer</span>. By
//             switching your role, you will also become an{" "}
//             <span className="font-medium text-orange-600">Owner</span>. <br />
//             As an owner, you can create and manage your own mess, add meal
//             plans, track customer subscriptions, and view live orders directly
//             from the owner dashboard. <br />
//             This will not remove your customer role — instead, it adds owner
//             access so that you can run a mess business while still enjoying the
//             platform as a customer.
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
//                 ${
//                   !isChecked || isLoading
//                     ? "bg-gray-400 cursor-not-allowed"
//                     : "bg-orange-500 hover:bg-orange-600"
//                 }
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

// export default SwitchRoleCustomer;




// import React, { useState } from "react";
// import { apiPost } from "../services/api";
// import { setToken } from "../services/authService"; // ✅ direct import
// import { toast } from "react-hot-toast";
// import Navbar2 from "../layouts/Navbar2";
// import CustomerHeader from "../layouts/CustomerHeader";
// import { useNavigate } from "react-router-dom";
// import storage from "../utils/storage";

// const SwitchRoleCustomer = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   // const handleSwitchRole = async () => {
//   //   setIsLoading(true);
//   //   try {
//   //     const response = await apiPost("/customer/role/change");

//   //     if (response?.data?.success) {
//   //       const newToken = response?.data?.token;

//   //       if (newToken) {
//   //         setToken(newToken); // ✅ replace old token
//   //       }

//   //       toast.success(response?.data?.message || "Role switched to Owner!");
//   //       navigate("/minimal-dashboard");
//   //     } else {
//   //       toast.error("Unable to switch role. Try again.");
//   //     }
//   //   } catch (error) {
//   //     console.error("Role switch error:", error);
//   //     toast.error(error.response?.data?.message || "Something went wrong!");
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };

// const handleSwitchRole = async () => {
//   setIsLoading(true);
//   try {
//     const response = await apiPost("/customer/role/change"); // response already data
  
//     if (response.success) {
//       const newToken = response.token;
//   storage.setItem('roles', 'both');
//     storage.setItem('role', 'owner');
//       if (newToken) {
//         setToken(newToken); // update token
//       }
//     storage.removeItem('customerHeaderData');

//       toast.success(response.message || "Role switched to Owner!");
//       navigate("/minimal-dashboard");
//     } else {
//       toast.error("Unable to switch role. Try again.");
//     }
//   } catch (error) {
//     toast.error(error.response?.data?.message || "Something went wrong!");
//   } finally {
//     setIsLoading(false);
//   }
// };


//   return (
//     <div className="flex h-screen">
//       <Navbar2 />
//       <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-gray-50 overflow-y-auto">
//         <CustomerHeader title="Switch Role" />

//         {/* Description Section */}
//         <div className="bg-white shadow rounded-xl p-6 mt-4">
//           <h2 className="flex justify-center text-lg font-semibold text-gray-800 mb-2">
//             About Switching Role
//           </h2>
//           <p className="text-sm text-gray-600 leading-relaxed">
//             You are currently logged in as a{" "}
//             <span className="font-medium text-green-600">Customer</span>. By
//             switching your role, you will also become an{" "}
//             <span className="font-medium text-orange-600">Owner</span>. <br />
//             As an owner, you can create and manage your own mess, add meal
//             plans, track customer subscriptions, and view live orders directly
//             from the owner dashboard. <br />
//             This will not remove your customer role — instead, it adds owner
//             access so that you can run a mess business while still enjoying the
//             platform as a customer.
//           </p>

//           {/* Switch Role Button */}
//           <div className="flex justify-center mt-6">
//             <button
//               onClick={handleSwitchRole}
//               disabled={isLoading}
//               className={`px-6 py-3 rounded-xl shadow-md text-white transition flex items-center gap-2 
//                 ${
//                   isLoading
//                     ? "bg-gray-400 cursor-not-allowed"
//                     : "bg-orange-500 cursor-pointer hover:bg-orange-600"
//                 }
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

// export default SwitchRoleCustomer;



// import React, { useState } from "react";
// import { apiPost } from "../services/api";
// import { setToken } from "../services/authService";
// import { toast } from "react-hot-toast";
// import Navbar2 from "../layouts/Navbar2";
// import CustomerHeader from "../layouts/CustomerHeader";
// import { useNavigate } from "react-router-dom";
// import storage from "../utils/storage";

// const SwitchRoleCustomer = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const navigate = useNavigate();

//   const handleSwitchRole = async () => {
//     setIsLoading(true);
//     try {
//       const response = await apiPost("/customer/role/change");
//       console.log("🔄 Role switch response:", response);

//       if (response.success) {
//         const newToken = response.token;
//         storage.setItem("roles", "both");
//         storage.setItem("role", "owner");

//         if (newToken) {
//           setToken(newToken);
//         }

//         storage.removeItem("customerHeaderData");
//         toast.success(response.message || "Role switched to Owner!");
//         navigate("/minimal-dashboard");
//       } else {
//         toast.error("Unable to switch role. Try again.");
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Something went wrong!");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSwitchClick = () => {
//     const roles = storage.getItem("roles");

//     if (roles !== "both") {
//       setShowConfirmModal(true);
//     } else {
//       handleSwitchRole();
//     }
//   };

//   return (
//     <div className="flex h-screen">
//       <Navbar2 />
//       <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-gray-50 overflow-y-auto">
//         <CustomerHeader title="Switch Role" />

//         <div className="bg-white shadow rounded-xl p-6 mt-4">
//           <h2 className="flex justify-center text-lg font-semibold text-gray-800 mb-2">
//             About Switching Role
//           </h2>
//           <p className="text-sm text-gray-600 leading-relaxed">
//             You are currently logged in as a{" "}
//             <span className="font-medium text-green-600">Customer</span>. By
//             switching your role, you will also become an{" "}
//             <span className="font-medium text-orange-600">Owner</span>. <br />
//             As an owner, you can create and manage your own mess, add meal
//             plans, track customer subscriptions, and view live orders directly
//             from the owner dashboard. <br />
//             This will not remove your customer role — instead, it adds owner
//             access so that you can run a mess business while still enjoying the
//             platform as a customer.
//           </p>

//           <div className="flex justify-center mt-6">
//             <button
//               onClick={handleSwitchClick}
//               disabled={isLoading}
//               className={`px-6 py-3 rounded-xl shadow-md text-white transition flex items-center gap-2 
//                 ${
//                   isLoading
//                     ? "bg-gray-400 cursor-not-allowed"
//                     : "bg-orange-500 cursor-pointer hover:bg-orange-600"
//                 }
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

//       {/* Confirmation Modal */}
//       {showConfirmModal && (
//         <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs  bg-opacity-40 z-50">
//           <div className="bg-white rounded-lg shadow-lg p-6 w-80">
//             <h3 className="text-lg font-semibold mb-4 text-gray-800">
//               Are you sure?
//             </h3>
//             <p className="text-sm text-gray-600 mb-6">
//               Do you really want to switch your role to{" "}
//               <span className="font-semibold text-orange-600">Owner</span>? You
//               will gain full access to the Owner dashboard while keeping your
//               customer privileges.
//             </p>
//             <div className="flex justify-end gap-2">
//               <button
//                 onClick={() => setShowConfirmModal(false)}
//                 className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => {
//                   setShowConfirmModal(false);
//                   handleSwitchRole();
//                 }}
//                 className="px-4 py-2 rounded-md bg-orange-500 text-white hover:bg-orange-700"
//               >
//                 Switch Role
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SwitchRoleCustomer;


import React, { useState } from "react";
import { apiPost } from "../services/api";
import { setToken } from "../services/authService";
import { toast } from "react-hot-toast";
import Navbar2 from "../layouts/Navbar2";
import CustomerHeader from "../layouts/CustomerHeader";
import { useNavigate } from "react-router-dom";
import storage from "../utils/storage";

const SwitchRoleCustomer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const navigate = useNavigate();

  const handleSwitchRole = async (isFirstTime = false) => {
    setIsLoading(true);
    try {
      const response = await apiPost("/customer/role/change");
      console.log("🔄 Role switch response:", response);

      if (response.success) {
        const newToken = response.token;
        storage.setItem("roles", "both");
        storage.setItem("role", "owner");

        if (newToken) setToken(newToken);

        storage.removeItem("customerHeaderData");
        toast.success(response.message || "Role switched to Owner!");

        // 👉 Conditional navigation based on first-time role switch
        if (isFirstTime) {
          navigate("/mess-details");
        } else {
          navigate("/minimal-dashboard");
        }
      } else {
        toast.error("Unable to switch role. Try again.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwitchClick = () => {
    const roles = storage.getItem("roles");

    // If user is switching for the first time, show confirm modal
    if (roles !== "both") {
      setShowConfirmModal(true);
    } else {
      handleSwitchRole(false);
    }
  };

  return (
    <div className="flex h-screen">
      <Navbar2 />
      <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-gray-50 overflow-y-auto">
        <CustomerHeader title="Switch Role" />

        <div className="bg-white shadow rounded-xl p-6 mt-4">
          <h2 className="flex justify-center text-lg font-semibold text-gray-800 mb-2">
            About Switching Role
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            You are currently logged in as a{" "}
            <span className="font-medium text-green-600">Customer</span>. By
            switching your role, you will also become an{" "}
            <span className="font-medium text-orange-600">Owner</span>. <br />
            As an owner, you can create and manage your own mess, add meal
            plans, track customer subscriptions, and view live orders directly
            from the owner dashboard. <br />
            This will not remove your customer role — instead, it adds owner
            access so that you can run a mess business while still enjoying the
            platform as a customer.
          </p>

          <div className="flex justify-center mt-6">
            <button
              onClick={handleSwitchClick}
              disabled={isLoading}
              className={`px-6 py-3 rounded-xl shadow-md text-white transition flex items-center gap-2 
                ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-orange-500 cursor-pointer hover:bg-orange-600"
                }
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

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Are you sure?
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Do you really want to switch your role to{" "}
              <span className="font-semibold text-orange-600">Owner</span>? You
              will gain full access to the Owner dashboard while keeping your
              customer privileges.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 rounded-md bg-gray-200 cursor-pointer text-gray-700 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  handleSwitchRole(true); // 👈 mark first-time switch
                }}
                className="px-4 py-2 rounded-md cursor-pointer bg-orange-500 text-white hover:bg-orange-700"
              >
                Switch Role
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SwitchRoleCustomer;
