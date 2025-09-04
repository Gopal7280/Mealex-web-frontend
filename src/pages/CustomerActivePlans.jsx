import React, { useEffect, useState } from "react";
import { apiGet } from "../services/api";
import Navbar2 from "../layouts/Navbar2";
import CustomerHeader from "../layouts/CustomerHeader";
import { useNavigate } from "react-router-dom";
import { FiMoreVertical } from "react-icons/fi";

const CustomerActivePlans = () => {
  const [activePlans, setActivePlans] = useState([]);
  const [menuOpenId, setMenuOpenId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchActivePlans();
  }, []);

  const fetchActivePlans = async () => {
    try {
      const res = await apiGet("/customer/plans/active");
      if (res.success && Array.isArray(res.data)) {
        setActivePlans(res.data);
      }
    } catch (err) {
      console.error("Error fetching active plans:", err);
    }
  };

  const handleUseTokens = (customerPlanId) => {
    localStorage.setItem("customerPlanId", customerPlanId);
    navigate("/using-plans");
  };

  return (
    <div className="flex h-screen">
      <Navbar2 />
      <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-gray-50 overflow-y-auto">
        <CustomerHeader  />

        {/* Tabs */}
        <div className="flex space-x-6 border-b mb-6">
          <button
            className="pb-2 border-b-2 border-orange-500 text-orange-600"
          >
            My Plans
          </button>
           <button
            className="pb-2 text-gray-500 hover:text-orange-600"
            onClick={() => navigate("/customer/your-mess")}
          >
            My Mess
          </button>
           <button
            className="pb-2 text-gray-500 hover:text-orange-600"
            onClick={() => navigate('/customer-minimal-dashboard')}
          >
            Available Mess
          </button>
        </div>

        {/* Active Plans List */}
        {activePlans.length === 0 ? (
          <p className="text-center text-gray-600 mt-10">
            No active plans found.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activePlans.map((plan) => (
              <div
                key={plan.customerPlanId}
                className="border rounded-xl bg-white p-4 shadow-sm relative"
              >
            
                <div className="absolute top-3 right-3">
  {/* Three Dots Button */}
  <button
    onClick={() =>
      setMenuOpenId(menuOpenId === plan.customerPlanId ? null : plan.customerPlanId)
    }
    className="p-2 rounded-full hover:bg-gray-100"
  >
    <FiMoreVertical className="text-gray-600" />
  </button>

  {/* Dropdown Menu */}
  {menuOpenId === plan.customerPlanId && (
    <div className="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow-md z-20">
      <button
        onClick={() => handleUseTokens(plan.customerPlanId)}
        className="w-full px-4 py-2 text-sm text-left  text-orange-600"
      >
        Use Tokens
      </button>
    </div>
  )}
</div>


                {/* Plan Content */}
                <img
                  src={plan.imageUrl || "/default-plan.jpg"}
                  alt="plan"
                  className="w-30 h-30 object-cover rounded-full mb-3"
                />
                <p className="font-semibold text-lg">{plan.name}</p>
                <p className="text-sm text-gray-600">{plan.description}</p>
                <p className="text-sm text-gray-500">
                  {plan.issuedTokenCount} Tokens / {plan.durationDays} Days
                </p>
                <p className="text-sm text-gray-700 font-semibold">₹{plan.price}</p>
              
                <p className="text-xs mt-1">
  <span className="text-green-600 font-medium">
    Purchased: {new Date(plan.purchaseDate).toLocaleDateString()}
  </span>{" "}
  |{" "}
  <span className="text-red-600 font-medium">
    Expiry: {new Date(plan.expiryDate).toLocaleDateString()}
  </span>
</p>
<p className="text-xs text-gray-500">
  Tokens Used: {plan.usedTokenCount} / {plan.issuedTokenCount}
</p>

              </div>
            ))}
          </div>
          
        )}
      </div>
    </div>
  );
};

export default CustomerActivePlans;





// <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//   {activePlans.map((plan) => (
//     <div
//       key={plan.customerPlanId}
//       className="border rounded-xl bg-white p-4 shadow-md relative hover:shadow-lg transition"
//     >
//       {/* Three Dots Menu */}
//       <div className="absolute top-3 right-3">
//         <button
//           onClick={() =>
//             setMenuOpenId(menuOpenId === plan.customerPlanId ? null : plan.customerPlanId)
//           }
//           className="p-2 rounded-full hover:bg-gray-100"
//         >
//           <FiMoreVertical className="text-gray-600" />
//         </button>

//         {menuOpenId === plan.customerPlanId && (
//           <div className="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow-md z-20">
//             <button
//               onClick={() => handleUseTokens(plan.customerPlanId)}
//               className="w-full px-4 py-2 text-sm text-left text-green-600 hover:bg-gray-100"
//             >
//               Use Tokens
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Plan Image */}
//       <div className="flex justify-center mb-3">
//         <img
//           src={plan.imageUrl || "/default-plan.jpg"}
//           alt="plan"
//           className="w-20 h-20 object-cover rounded-full border"
//         />
//       </div>

//       {/* Plan Info */}
//       <div className="text-center space-y-1">
//         <p className="font-semibold text-lg text-gray-800">{plan.name}</p>
//         <p className="text-sm text-gray-600 line-clamp-2">{plan.description}</p>
//         <p className="text-sm text-gray-500">
//           {plan.totalTokens} Tokens / {plan.durationDays} Days
//         </p>
//         <p className="text-base font-bold text-green-700">₹{plan.price}</p>
//       </div>

//       {/* Dates & Tokens */}
//       <div className="mt-3 text-xs text-gray-500 space-y-1 border-t pt-2">
//         <p>
//           Purchased:{" "}
//           <span className="font-medium">
//             {new Date(plan.purchaseDate).toLocaleDateString()}
//           </span>
//         </p>
//         <p>
//           Expiry:{" "}
//           <span className="font-medium">
//             {new Date(plan.expiryDate).toLocaleDateString()}
//           </span>
//         </p>
//         <p>
//           Tokens Used:{" "}
//           <span className="font-medium">
//             {plan.usedTokenCount} / {plan.issuedTokenCount}
//           </span>
//         </p>
//       </div>
//     </div>
//   ))}
// </div>
