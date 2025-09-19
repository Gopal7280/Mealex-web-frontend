import React, { useEffect, useState } from "react";
import { apiGet } from "../services/api";
import Navbar2 from "../layouts/Navbar2";
import CustomerHeader from "../layouts/CustomerHeader";
import { useNavigate } from "react-router-dom";
import { FiMoreVertical } from "react-icons/fi";
import storage from "../utils/storage";

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
      console.log('res',res);
      if (res.success && Array.isArray(res.data)) {
        setActivePlans(res.data);
      }
    } catch (err) {
      console.error("Error fetching active plans:", err);
    }
  };

  const handleUseTokens = (customerPlanId,messId) => {
    storage.setItem("customerPlanId", customerPlanId);
    storage.setItem("messId", messId); // ✅ messId bhi save karo

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
            className="pb-2 cursor-pointer border-b-2 border-orange-500 text-orange-600"
          >
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
  className="border rounded-xl bg-white p-5 shadow-md relative hover:shadow-lg transition"
>
  {/* Action Menu */}
  <div className="absolute top-3 right-3">
    <button
      onClick={() =>
        setMenuOpenId(menuOpenId === plan.customerPlanId ? null : plan.customerPlanId)
      }
      className="p-2 rounded-full cursor-pointer hover:bg-gray-100"
    >
      <FiMoreVertical className="text-gray-600 cursor-pointer" />
    </button>
    {menuOpenId === plan.customerPlanId && (
      <div className="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow-md z-20">
        <button
          onClick={() => handleUseTokens(plan.customerPlanId, plan.messId)}
          className="w-full px-4 cursor-pointer py-2 text-sm text-left text-orange-600 hover:bg-orange-50"
        >
          Use Tokens
        </button>
      </div>
    )}
  </div>

  {/* Mess Info */}
  <div className="flex items-center space-x-3 mb-4">
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

  {/* Plan Info */}
  <img
    src={plan.imageUrl || "/default-plan.jpg"}
    alt="Plan"
    className="w-full h-40 object-cover rounded-lg mb-3"
  />
  <p className="font-semibold text-lg text-gray-900">{plan.name}</p>
  <p className="text-sm text-gray-600 mb-2">{plan.description}</p>
  <div className="mt-2 flex flex-wrap gap-2">
      {Array.isArray(plan.menu) ? (
        plan.menu.map((item, i) => (
          <span
            key={i}
            className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full border border-green-300"
          >
            {item}
          </span>
        ))
      ) : (
        <p className="text-sm font-semibold text-green-600">
          Menu: {plan.menu}
        </p>
      )}
    </div>
  <p className="text-sm text-gray-500">
    {plan.issuedTokenCount} Tokens / {plan.durationDays} Days
  </p>
  <p className="text-sm text-gray-700 font-semibold">₹{plan.price}</p>

  {/* Dates + Usage */}
  <p className="text-xs mt-2">
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


