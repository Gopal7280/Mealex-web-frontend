
// active plan card component with backend integration

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoreVertical } from "lucide-react";
import storage from "../utils/storage";

const ActivePlanCard = ({ plan }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleUseTokens = () => {
    const customerPlanId = plan.customerPlanId || plan._id;
    storage.setItem("customerPlanId", customerPlanId);
    navigate(`/customer/use-tokens`);
    setIsMenuOpen(false);
  };

  return (
    <div className="relative flex flex-col sm:flex-row items-start sm:items-center bg-white border rounded-xl p-4 shadow-sm">
      <img
        src={plan.imageUrl}
        alt="Plan"
        className="w-full h-40 sm:w-24 sm:h-24 rounded-md object-cover mb-3 sm:mb-0 sm:mr-4"
      />

      <div className="flex-1 w-full">
        <h3 className="text-md font-semibold text-gray-800">{plan.name}</h3>
        <p className="text-sm text-gray-600">{plan.description}</p>

        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mt-2 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            ₹ <span className="font-bold text-black">{plan.price}</span>
            <span className="hidden sm:inline border-l border-gray-300 h-4" />
            <span>{plan.durationDays} Days</span>
          </div>

          <p className="text-sm text-gray-600">
            <strong>Purchased on:</strong>{" "}
            {new Date(plan.purchaseDate).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Expires on:</strong>{" "}
            {new Date(plan.expiryDate).toLocaleDateString()}
          </p>
        </div>

        <p className="text-sm text-green-600 mt-2">{plan.status}</p>
      </div>

      <div className="relative self-end sm:self-auto mt-2 sm:mt-0">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <MoreVertical className="h-5 w-5 cursor-pointer text-gray-500" />
        </button>

        {isMenuOpen && (
          <div className="absolute right-0 top-10 z-50 bg-white border rounded shadow p-2 w-32">
            <p className="text-xs text-gray-500 font-semibold px-2">Options</p>
            <button
              onClick={handleUseTokens}
              className="text-green-600 cursor-pointer text-sm font-medium hover:underline px-2 py-1 w-full text-left"
            >
              Use Tokens
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivePlanCard;
