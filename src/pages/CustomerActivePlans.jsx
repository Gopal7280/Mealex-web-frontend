import React, { useEffect, useState } from "react";
import { apiGet } from "../services/api";
import Navbar2 from "../layouts/Navbar2";
import CustomerHeader from "../layouts/CustomerHeader";
import { useNavigate } from "react-router-dom";
import { AiOutlineBarcode } from "react-icons/ai";
import storage from "../utils/storage";

const CustomerActivePlans = () => { 
  const [activePlans, setActivePlans] = useState([]);
  const [expiredPlans, setExpiredPlans] = useState([]);
  const [completedPlans, setCompletedPlans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const res = await apiGet("/customer/plans/active");
      if (res.success && Array.isArray(res.data)) {
        const active = res.data.filter((p) => p.status === "active");
        const expired = res.data.filter((p) => p.status === "expired");
        const complete = res.data.filter((p) => p.status === "completed");
        setActivePlans(active);
        setExpiredPlans(expired);
        setCompletedPlans(complete);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // const handleUseTokens = (customerPlanId, messId, services) => {
  //   storage.setItem("customerPlanId", customerPlanId);
  //   storage.setItem("messId", messId);
  //   storage.setItem("messServices", JSON.stringify(services));
  //   navigate("/using-plans");
  // };

  const handleUseTokens = (customerPlanId, messId, services, charges) => {
  storage.setItem("customerPlanId", customerPlanId);
  storage.setItem("messId", messId);

  // Save charges + services in state while navigating
  navigate("/using-plans", {
    state: {
      services: services,
      dineCharge: charges.dineCharge,
      takeAwayCharge: charges.takeAwayCharge,
      deliveryCharge: charges.deliveryCharge
    }
  });
};

  const PlanCard = ({ plan, disableUseTokens }) => (
    <div className={`relative bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg ${disableUseTokens ? "opacity-50 pointer-events-none" : ""}`}>
      {/* Mess Info */}
      <div className="flex items-center gap-3 p-4">
        <img
          src={plan.MessProfile?.logoUrl || "/default-mess.jpg"}
          alt="Mess Logo"
          className="w-12 h-12 rounded-full object-cover border"
        />
        <div>
          <p className="font-semibold text-gray-800">{plan.MessProfile?.messName}</p>
          <p className="text-xs text-gray-500">Mess</p>
        </div>
      </div>

      {/* Plan Image */}
      <img
        src={plan.imageUrl || "/default-plan.jpg"}
        alt="Plan"
        className="w-full h-40 object-cover"
      />

      {/* Plan Details */}
      <div className="p-4 flex flex-col gap-2">
        <p className="font-semibold text-lg text-gray-900">{plan.name}</p>
        <p className="text-sm text-gray-600 line-clamp-2">{plan.description}</p>

        {/* Menu Badges */}
        <div className="flex flex-wrap gap-2 mt-2">
          {Array.isArray(plan.menu) && plan.menu.map((item, idx) => (
            <span key={idx} className="bg-orange-100 text-orange-600 text-xs font-medium px-2 py-1 rounded-full">{item}</span>
          ))}
        </div>

        {/* Price & Tokens */}
        <div className="mt-3 grid grid-cols-3 text-center text-sm">
          <div>
            <p className="text-gray-500">Tokens</p>
            <p className="font-semibold">{plan.issuedTokenCount}</p>
          </div>
          <div>
            <p className="text-gray-500">Duration</p>
            <p className="font-semibold">{plan.durationDays} Days</p>
          </div>
          <div>
            <p className="text-gray-500">Price</p>
            <p className="font-semibold">₹{plan.price}</p>
          </div>
        </div>

        {/* Dates & Usage */}
        <p className="text-xs mt-2">
          <span className="text-green-600 font-medium">
            Purchased: {new Date(plan.purchaseDate).toLocaleDateString()}
          </span>{" "}
          |{" "}
          <span className="text-red-600 font-medium">
            Expiry: {new Date(plan.expiryDate).toLocaleDateString()}
          </span>
        </p>
        {/* <p className="text-xs text-black">
          Tokens Used: {plan.usedTokenCount} / {plan.issuedTokenCount} 
        </p> */}
          <p className="text-xs text-black">
          Tokens: 
          <p >(Used {plan.usedTokenCount} /Total {plan.issuedTokenCount})</p>
        </p>

        {!disableUseTokens && (
          <div className="mt-4">
            <button
onClick={() =>
  handleUseTokens(
    plan.customerPlanId,
    plan.messId,
    plan.MessProfile?.services || [],
    {
      dineCharge: plan.MessProfile?.dineCharge,
      takeAwayCharge: plan.MessProfile?.takeAwayCharge,
      deliveryCharge: plan.MessProfile?.deliveryCharge
    }
  )
}
              className="flex items-center gap-1 px-3 py-2 text-xs text-white bg-orange-500 rounded-full hover:bg-orange-700 cursor-pointer transition"
            >
              <AiOutlineBarcode className="w-3 h-3" />
              Use Tokens
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen">
      <Navbar2 />
      <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-gray-50 overflow-y-auto">
        <CustomerHeader />

        {/* Tabs */}
        <div className="flex space-x-6 border-b mb-6">
          <button className="pb-2 cursor-pointer border-b-2 border-orange-500 text-orange-600">
            My Plans
          </button>
          <button
            className="pb-2 cursor-pointer text-gray-500 hover:text-orange-600"
            onClick={() => navigate("/cust/my-mess")}
          >
            My Mess
          </button>
          <button
            className="pb-2 cursor-pointer text-gray-500 hover:text-orange-600"
            onClick={() => navigate("/customer-minimal-dashboard")}
          >
            Available Mess
          </button>
        </div>

        {/* Active Plans */}
        {activePlans.length > 0 && (
          <>
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Active Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {activePlans.map((plan) => (
                <PlanCard key={plan.customerPlanId} plan={plan} disableUseTokens={false} />
              ))}
            </div>
          </>
        )}

        {/* Completed Plans */}
        {completedPlans.length > 0 && (
          <>
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Completed Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {completedPlans.map((plan) => (
                <PlanCard key={plan.customerPlanId} plan={plan} disableUseTokens={true} />
              ))}
            </div>
          </>
        )}

        {/* Expired Plans */}
        {expiredPlans.length > 0 && (
          <>
            <h2 className="text-lg font-semibold mb-4 text-gray-600">Expired Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {expiredPlans.map((plan) => (
                <PlanCard key={plan.customerPlanId} plan={plan} disableUseTokens={true} />
              ))}
            </div>
          </>
        )}

        {/* No Plans */}
        {activePlans.length === 0 && expiredPlans.length === 0 && completedPlans.length === 0 && (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
            <p className="text-lg font-semibold text-gray-700">
              If you are a new user then explore messes and subscribe to your first plan.
            </p>
            <button
              onClick={() => navigate('/customer-minimal-dashboard')}
              className="bg-orange-500 hover:bg-orange-600 cursor-pointer text-white px-6 py-2 rounded-lg shadow-md"
            >
              Explore Mess
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default CustomerActivePlans;



// import React, { useEffect, useState } from "react";
// import { apiGet } from "../services/api";
// import Navbar2 from "../layouts/Navbar2";
// import CustomerHeader from "../layouts/CustomerHeader";
// import { useNavigate } from "react-router-dom";
// import { AiOutlineBarcode } from "react-icons/ai";
// import storage from "../utils/storage";
// import { useTranslation } from "react-i18next";

// const CustomerActivePlans = () => {
//   const { t } = useTranslation();
//   const [activePlans, setActivePlans] = useState([]);
//   const [expiredPlans, setExpiredPlans] = useState([]);
//   const [completedPlans, setCompletedPlans] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchPlans();
//   }, []);

//   const fetchPlans = async () => {
//     try {
//       const res = await apiGet("/customer/plans/active");
//       if (res.success && Array.isArray(res.data)) {
//         const active = res.data.filter((p) => p.status === "active");
//         const expired = res.data.filter((p) => p.status === "expired");
//         const complete = res.data.filter((p) => p.status === "completed");
//         setActivePlans(active);
//         setExpiredPlans(expired);
//         setCompletedPlans(complete);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleUseTokens = (customerPlanId, messId, services) => {
//     storage.setItem("customerPlanId", customerPlanId);
//     storage.setItem("messId", messId);
//     storage.setItem("messServices", JSON.stringify(services));
//     navigate("/using-plans");
//   };

//   const PlanCard = ({ plan, disableUseTokens }) => (
//     <div
//       className={`relative bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg ${
//         disableUseTokens ? "opacity-50 pointer-events-none" : ""
//       }`}
//     >
//       <div className="flex items-center gap-3 p-4">
//         <img
//           src={plan.MessProfile?.logoUrl || "/default-mess.jpg"}
//           alt={t("Mess Logo")}
//           className="w-12 h-12 rounded-full object-cover border"
//         />
//         <div>
//           <p className="font-semibold text-gray-800">
//             {plan.MessProfile?.messName}
//           </p>
//           <p className="text-xs text-gray-500">{t("Mess")}</p>
//         </div>
//       </div>

//       <img
//         src={plan.imageUrl || "/default-plan.jpg"}
//         alt={t("Plan")}
//         className="w-full h-40 object-cover"
//       />

//       <div className="p-4 flex flex-col gap-2">
//         <p className="font-semibold text-lg text-gray-900">{plan.name}</p>
//         <p className="text-sm text-gray-600 line-clamp-2">
//           {plan.description}
//         </p>

//         <div className="flex flex-wrap gap-2 mt-2">
//           {Array.isArray(plan.menu) &&
//             plan.menu.map((item, idx) => (
//               <span
//                 key={idx}
//                 className="bg-orange-100 text-orange-600 text-xs font-medium px-2 py-1 rounded-full"
//               >
//                 {item}
//               </span>
//             ))}
//         </div>

//         <div className="mt-3 grid grid-cols-3 text-center text-sm">
//           <div>
//             <p className="text-gray-500">{t("Tokens")}</p>
//             <p className="font-semibold">{plan.issuedTokenCount}</p>
//           </div>
//           <div>
//             <p className="text-gray-500">{t("Duration")}</p>
//             <p className="font-semibold">
//               {plan.durationDays} {t("Days")}
//             </p>
//           </div>
//           <div>
//             <p className="text-gray-500">{t("Price")}</p>
//             <p className="font-semibold">₹{plan.price}</p>
//           </div>
//         </div>

//         <p className="text-xs mt-2">
//           <span className="text-green-600 font-medium">
//             {t("Purchased")}:{" "}
//             {new Date(plan.purchaseDate).toLocaleDateString()}
//           </span>{" "}
//           |{" "}
//           <span className="text-red-600 font-medium">
//             {t("Expiry")}: {new Date(plan.expiryDate).toLocaleDateString()}
//           </span>
//         </p>

//         <p className="text-xs text-black">
//           {t("Tokens")}:{" "}
//           <p>
//             ({t("Used")} {plan.usedTokenCount} / {t("Total")}{" "}
//             {plan.issuedTokenCount})
//           </p>
//         </p>

//         {!disableUseTokens && (
//           <div className="mt-4">
//             <button
//               onClick={() =>
//                 handleUseTokens(
//                   plan.customerPlanId,
//                   plan.messId,
//                   plan.MessProfile?.services || []
//                 )
//               }
//               className="flex items-center gap-1 px-3 py-2 text-xs text-white bg-orange-500 rounded-full hover:bg-orange-700 cursor-pointer transition"
//             >
//               <AiOutlineBarcode className="w-3 h-3" />
//               {t("Use Tokens")}
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );

//   return (
//     <div className="flex h-screen">
//       <Navbar2 />
//       <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-gray-50 overflow-y-auto">
//         <CustomerHeader />

//         <div className="flex space-x-6 border-b mb-6">
//           <button className="pb-2 cursor-pointer border-b-2 border-orange-500 text-orange-600">
//             {t("My Plans")}
//           </button>
//           <button
//             className="pb-2 cursor-pointer text-gray-500 hover:text-orange-600"
//             onClick={() => navigate("/cust/my-mess")}
//           >
//             {t("My Mess")}
//           </button>
//           <button
//             className="pb-2 cursor-pointer text-gray-500 hover:text-orange-600"
//             onClick={() => navigate("/customer-minimal-dashboard")}
//           >
//             {t("Available Mess")}
//           </button>
//         </div>

//         {activePlans.length > 0 && (
//           <>
//             <h2 className="text-lg font-semibold mb-4 text-gray-800">
//               {t("Active Plans")}
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
//               {activePlans.map((plan) => (
//                 <PlanCard
//                   key={plan.customerPlanId}
//                   plan={plan}
//                   disableUseTokens={false}
//                 />
//               ))}
//             </div>
//           </>
//         )}

//         {completedPlans.length > 0 && (
//           <>
//             <h2 className="text-lg font-semibold mb-4 text-gray-700">
//               {t("Completed Plans")}
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
//               {completedPlans.map((plan) => (
//                 <PlanCard
//                   key={plan.customerPlanId}
//                   plan={plan}
//                   disableUseTokens={true}
//                 />
//               ))}
//             </div>
//           </>
//         )}

//         {expiredPlans.length > 0 && (
//           <>
//             <h2 className="text-lg font-semibold mb-4 text-gray-600">
//               {t("Expired Plans")}
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {expiredPlans.map((plan) => (
//                 <PlanCard
//                   key={plan.customerPlanId}
//                   plan={plan}
//                   disableUseTokens={true}
//                 />
//               ))}
//             </div>
//           </>
//         )}
//         {activePlans.length === 0 &&
//           expiredPlans.length === 0 &&
//           completedPlans.length === 0 && (
//             <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
//               <p className="text-lg font-semibold text-gray-700">
//                 {t(
//                   "If you are a new user then explore messes and subscribe to your first plan."
//                 )}
//               </p>
//               <button
//                 onClick={() => navigate("/customer-minimal-dashboard")}
//                 className="bg-orange-500 hover:bg-orange-600 cursor-pointer text-white px-6 py-2 rounded-lg shadow-md"
//               >
//                 {t("Explore Mess")}
//               </button>
//             </div>
//           )}
//       </div>
//     </div>
//   );
// };
// export default CustomerActivePlans;
