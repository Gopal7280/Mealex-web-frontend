


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiGet } from "../services/api";
import mealx from "../assets/mealx.png";
import chefIcon from "../assets/no-mess.webp";
import storage from "../utils/storage";
import { toast } from "react-hot-toast";
import customer from '../assets/customer.png';
import owner from '../assets/owner.png';
import { ArrowLeft } from 'lucide-react';


const MinimalDashboard = () => {
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
          console.log("Fetched Messes:", res);
          const messArray = res?.data || [];
          setMesses(messArray);

          if (messArray.length > 0) {
            setOwnerName(messArray[0]?.ownerName || "Owner");
          } else {
            setOwnerName(res?.ownerName || "Owner");
          }
        } catch (error) {
          console.error("❌ Failed to fetch mess list:", error);
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-2 sm:px-6 md:px-12">
              {messes.map((mess, index) => {
                const isVerified = mess.status === "active" || mess.status === "activated";
                const isUnverified = mess.status === "inactive";
                const isPending = mess.status === "pending";

                const badgeText = isVerified
                  ? "Verified "
                  : isUnverified
                  ? "Not Verified ❌"
                  : "Pending ⏳";

                const borderColor = isVerified
                  ? "border-green-500"
                  : isUnverified
                  ? "border-red-400"
                  : "border-yellow-400";

                const textColor = isVerified
                  ? "text-green-600"
                  : isUnverified
                  ? "text-red-500"
                  : "text-yellow-600";

                return (
                  <div
                    key={index}
                    className={`rounded-lg border-2 p-4 flex items-center justify-between shadow-md bg-gradient-to-b from-green-100 to-green-50 ${borderColor}`}
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <img
                        src={mess.logoUrl || "/assets/mess-default.png"}
                        alt="Mess Logo"
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border"
                      />
                      <div>
                        <h3 className="text-base sm:text-lg text-green-500 font-semibold">{mess.messName}</h3>
                        <p className="text-xs sm:text-sm text-gray-500">
                          {mess.address || "Mess Address"}, {mess.city || "Mess City"}
                        </p>
                      </div>
                    </div>
                    <div className="text-right ml-2 sm:ml-4">
                      <p className={`font-medium text-xs sm:text-sm ${textColor}`}>{badgeText}</p>
                      <button
                        onClick={() => {
                          if (isVerified) {
                            storage.setItem("messId", mess._id || mess.messId);
                            storage.setItem("selectedMess", JSON.stringify(mess));
                            toast.success(`Logged in with ${mess.messName} successfully`);
                            navigate("/owner-dashboard");
                          } else {
                            storage.setItem("selectedMess", JSON.stringify(mess));
                            navigate(`/owner/mess/id/${mess.messId}`);
                          }
                        }}
                        className="text-xl sm:text-2xl cursor-pointer text-green-600 hover:text-green-800"
                      >
                        →
                      </button>
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
      {/* Customer Dashboard CTA */}
{activeRole === "customer" && (
  <div className="flex flex-col items-center justify-center mt-12 sm:mt-20 text-center">
    <img
      src={customer} // ✅ customer avatar icon (ya apna asset use kar sakte ho)
      alt="Customer Avatar"
      className="w-20 sm:w-24 mx-auto"
    />
    <h3 className="text-orange-500 font-bold text-lg sm:text-xl mt-4">
      Welcome {ownerName}
    </h3>
    <p className="text-gray-500 text-sm sm:text-base">
      Continue exploring messes and plans.
    </p>

    {/* Button same placement as "Add Your Mess" */}
    <div className="flex justify-center mt-10 sm:mt-16 md:mt-24">
      <button
        onClick={() => {
          storage.setItem("role", "customer");
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
    </div>
  );
};

export default MinimalDashboard;
