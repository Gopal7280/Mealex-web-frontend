


import React, { useEffect, useState } from "react";
import { useNavigate ,useLocation } from "react-router-dom";
import { apiGet } from "../services/api";
import mealx from "../assets/mealx.png";
import chefIcon from "../assets/no-mess.webp";
import storage from "../utils/storage";
import { toast } from "react-hot-toast";
import customer from '../assets/customer.png';
import owner from '../assets/owner.png';
import { ArrowLeft } from 'lucide-react';


const MinimalDashboard = () => {
    const location = useLocation(); // ✅ location.state milne ke liye

  const navigate = useNavigate();
  const [messes, setMesses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ownerName, setOwnerName] = useState("");
  const roles = storage.getItem("roles"); // "both" or single role
  
  const [activeRole, setActiveRole] = useState(
    roles === "both" ? "owner" : storage.getItem("role") || "owner"
  );

  const handleAddMess = () => navigate("/mess-details");

  useEffect(() => {
    if (activeRole === "owner") {
      const fetchMesses = async () => {
        try {
          const res = await apiGet("/owner/mess/all");
          console.log("Fetched messes:", res);
          const messArray = res?.data || [];
          setMesses(messArray);

          if (messArray.length > 0) {
            setOwnerName(messArray[0]?.ownerName || "Owner");
          } else {
            setOwnerName(res?.ownerName || "Owner");
          }
        } catch (error) {
        } finally {
          setIsLoading(false);
        }
      };
      fetchMesses();
    } else {
      setIsLoading(false);
    }
  }, [activeRole]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Loading your dashboard...
      </div>
    );
  }

  

  const hasNoMesses = messes.length === 0;

  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4 sm:gap-2 w-full p-4 md:p-12">
        
        <div className="text-center sm:text-left">
           <ArrowLeft
      className="w-8 h-8 cursor-pointer text-orange-500 hover:text-red-500"
      onClick={() => navigate(-1)}
    />
          <p className="text-blue-800 font-bold text-sm sm:text-base">Welcome,</p>
          <p className="text-lg sm:text-2xl md:text-4xl font-bold text-orange-500">{ownerName}</p>
        </div>
        
        <div className="flex flex-col items-center sm:items-end">
          <img src={mealx} alt="MealX Logo" className="w-20 sm:w-32 md:w-48" />
          <p className="text-xs sm:text-sm md:text-lg text-orange-600 font-semibold">
            Connecting Plates & People
          </p>
        </div>
      </div>

      {/* Role Toggle (only if both roles) */}
      {roles === "both" && (
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 rounded-full p-1 flex gap-2">
            <button
              onClick={() => setActiveRole("owner")}
              className={`px-6 py-2 rounded-full font-medium cursor-pointer transition ${
                activeRole === "owner"
                  ? "bg-orange-500 text-white"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              Owner
            </button>
            <button
              onClick={() => setActiveRole("customer")}
              className={`px-6 py-2 rounded-full font-medium cursor-pointer transition ${
                activeRole === "customer"
                  ? "bg-orange-500 text-white"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              Customer
            </button>
          </div>
        </div>
      )}

      {/* Owner Dashboard (existing view) */}
      {activeRole === "owner" && (
        <>
          {hasNoMesses ? (
            <div className="flex flex-col items-center justify-center mt-12 sm:mt-20 text-center">
              <img src={owner} alt="No Mess Found" className="w-20 sm:w-24 mx-auto" />
              <h3 className="text-orange-500 font-bold text-lg sm:text-xl mt-4">NO MESS FOUND</h3>
              <p className="text-gray-500 text-sm sm:text-base">Let's set up your mess to get started.</p>
            </div>
          ) : (

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-2 sm:px-6 md:px-12">
  {messes.map((mess) => {
    const isVerified = mess.status === "active";
    const isPending = mess.status === "pending";
    const isNotVerified = mess.status === "inactive";

    const borderColor = isVerified
      ? "border-green-500"
      : isPending
      ? "border-orange-500"
      : "border-red-500";

    const statusText = isVerified
      ? "Verified "
      : isPending
      ? "Pending ⏳"
      : "Not Verified ❌";

    return (
      <div
        key={mess.messId}
        className={`rounded-xl border-2 ${borderColor} shadow-md overflow-hidden flex flex-col cursor-pointer hover:shadow-lg transition-all duration-300`}
      >
        {/* Logo */}
        <div className="relative">
          <img
            src={mess.logoUrl || chefIcon}
            alt={mess.messName}
            className="w-full h-40 object-cover"
          />
          <span className={`absolute top-2 right-2 px-3 py-1 text-xs font-semibold rounded-full ${
            isVerified ? 'bg-green-100 text-green-700' :
            isPending ? 'bg-orange-100 text-orange-700' :
            'bg-red-100 text-red-700'
          }`}>
            {statusText}
          </span>
        </div>

        {/* Mess Details */}
        <div className="p-4 flex-1 flex flex-col gap-1">
          <h3 className="text-lg font-bold text-gray-800">{mess.messName}</h3>
          <p className="text-sm text-gray-500 capitalize">Type: {mess.messType}</p>
          <p className="text-sm text-gray-600"><span className="font-semibold">City:</span> {mess.city}</p>
          <p className="text-sm text-gray-600 break-words"><span className="font-semibold">Address:</span> {mess.address}</p>
          <p className="text-sm text-gray-600"><span className="font-semibold">Contact:</span> {mess.contactNumber}</p>
          <p className="text-sm text-gray-600"><span className="font-semibold">Email:</span> {mess.email}</p>
          <p className="text-sm text-green-600">
            Open: {mess.openTime} - Close: {mess.closeTime}
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Services:</span> {mess.services?.join(", ") || "N/A"}
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Days Open:</span> {mess.daysOpen?.join(", ") || "N/A"}
          </p>
        </div>

        {/* Navigate Arrow */}
        <div
          onClick={() => {
            storage.setItem("messId", mess.messId);
            storage.setItem("selectedMess", JSON.stringify(mess));
            navigate("/owner-dashboard", { state: { mess } });
          }}
  className="text-orange-500 text-3xl pt-0 pb-1 pr-3 pl-0 text-right hover:text-orange-600 cursor-pointer"
        >
          →
        </div>
      </div>
    );
  })}
</div>

)}

          <div className="flex justify-center mt-10 sm:mt-16 md:mt-24">
            <button
              onClick={handleAddMess}
              className="bg-orange-500 cursor-pointer text-white px-10 sm:px-20 md:px-40 py-3 rounded-lg font-semibold shadow-lg hover:bg-orange-600 transition text-sm sm:text-base"
            >
              {hasNoMesses ? "Add Your Mess" : "Add New Mess"}
            </button>
          </div>
        </>
      )}

      {/* Customer Dashboard CTA */}
      {/* {activeRole === "customer" && (
        <div className="flex flex-col items-center justify-center mt-20">
          <button
            onClick={() => {
              storage.setItem("role", "customer");
              toast.success("🎉 Logged In As Customer!");
              navigate("/login/customers-dashboard");
            }}
            className="bg-orange-500 text-white px-10 py-4 rounded-lg font-semibold shadow-lg hover:bg-orange-600 transition text-lg"
          >
            Continue as Customer
          </button>
        </div>
      )} */}
      {activeRole === "customer" && (
  <div className="flex flex-col items-center justify-center mt-12 sm:mt-20 text-center">
    <img
      src={customer} 
      alt="Customer Avatar"
      className="w-20 sm:w-24 mx-auto"
    />
    <h3 className="text-orange-500 font-bold text-lg sm:text-xl mt-4">
      Welcome {ownerName}
    </h3>
    <p className="text-gray-500 text-sm sm:text-base">
      Continue exploring messes and plans.
    </p>

    <div className="flex justify-center mt-10 sm:mt-16 md:mt-24">
      <button
        onClick={() => {
          storage.setItem("role", "customer");
          // ✅ store customerId from state if coming via both roles
          if (!storage.getItem("customerId") && location.state?.customerId) {
            storage.setItem("customerId", location.state.customerId);
          }
          toast.success("🎉 Logged In As Customer!");
          navigate("/login/customers-dashboard");
        }}
        className="bg-orange-500 cursor-pointer text-white px-10 sm:px-20 md:px-40 py-3 rounded-lg font-semibold shadow-lg hover:bg-orange-600 transition text-sm sm:text-base"
      >
        Continue as Customer
      </button>
    </div>
  </div>
)}

      {/* Customer Dashboard CTA */}

    </div>
  );
};

export default MinimalDashboard;







// {activeRole === "customer" && (
//   <div className="flex flex-col items-center justify-center mt-12 sm:mt-20 text-center">
//     <img
//       src={customer} // ✅ customer avatar icon (ya apna asset use kar sakte ho)
//       alt="Customer Avatar"
//       className="w-20 sm:w-24 mx-auto"
//     />
//     <h3 className="text-orange-500 font-bold text-lg sm:text-xl mt-4">
//       Welcome {ownerName}
//     </h3>
//     <p className="text-gray-500 text-sm sm:text-base">
//       Continue exploring messes and plans.
//     </p>

//     {/* Button same placement as "Add Your Mess" */}
//     <div className="flex justify-center mt-10 sm:mt-16 md:mt-24">
//       <button
//         onClick={() => {
//           storage.setItem("role", "customer");
//           toast.success("🎉 Logged In As Customer!");
//           navigate("/login/customers-dashboard");
//         }}
//         className="bg-orange-500 cursor-pointer text-white px-10 sm:px-20 md:px-40 py-3 rounded-lg font-semibold shadow-lg hover:bg-orange-600 transition text-sm sm:text-base"
//       >
//         Continue as Customer
//       </button>
//     </div>
//   </div>
// )}