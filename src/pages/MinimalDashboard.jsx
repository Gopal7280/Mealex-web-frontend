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
import { AiOutlineBarcode } from "react-icons/ai";
import { MdRoomService } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import { FiPhone, FiMail } from "react-icons/fi";
import { FaMapMarkedAlt, FaCalendarAlt } from "react-icons/fa";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FiArrowRight } from "react-icons/fi";
import { MdPowerSettingsNew  } from "react-icons/md";

 
const MinimalDashboard = () => {
    const location = useLocation(); // ✅ location.state milne ke liye

  const navigate = useNavigate();
  const [messes, setMesses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ownerName, setOwnerName] = useState("");
  const roles = storage.getItem("roles"); // "both" or single role
  const [showLogout, setShowLogout] = useState(false);

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


    const handleLogout = async () => {
    try {
      const userJwt = storage.getItem("token");
      const fcmToken = storage.getItem("fcmToken");
      await apiPost(
        "/user/logout",
        { fcmToken },
        { headers: { Authorization: `Bearer ${userJwt}` } }
      );
    } catch (err) {
    } finally {
      storage.clear();
      localStorage.clear();
      sessionStorage.clear();
      
      if (window.Razorpay) delete window.Razorpay;
      window.location.replace("/login");
    }
  };

  const hasNoMesses = messes.length === 0;

  return (
    <div className="min-h-screen overflow-y-auto bg-white px-4 sm:px-6 py-1">
{/* Header */}

<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-2 w-full p-4 md:p-12">

  {/* Left Section — Arrow + Welcome + Name + Logout (on mobile inline) */}
  <div className="flex flex-col w-full sm:w-auto">
    <div className="flex items-center justify-between w-full sm:justify-start sm:gap-3">
      <div className="flex items-center gap-2">
        <ArrowLeft
          className="w-7 h-7 cursor-pointer text-orange-500 hover:text-red-500"
          onClick={() => navigate(-1)}
        />
        <div className="flex flex-col">
          <p className="text-blue-800 font-bold text-sm sm:text-base">Welcome,</p>
          <p className="text-lg sm:text-2xl md:text-4xl font-bold text-orange-500">{ownerName}</p>
        </div>
      </div>

      {/* Logout icon — visible inline on mobile */}
      <button
        onClick={handleLogout}
        className="flex sm:hidden items-center cursor-pointer gap-1 justify-center text-red-500 hover:bg-red-200 
                    p-2 rounded-md shadow-sm font-semibold transition-all duration-200"
      >
    <MdPowerSettingsNew size={16} className="sm:w-5 sm:h-5" />
      </button>
    </div>
  </div>

  {/* Right Section — Logo + Logout (desktop only) */}
  <div className="hidden sm:flex items-center gap-5">
    <div className="flex flex-col items-center sm:items-end">
      <img
        src={mealx}
        alt="MealX Logo"
        className="w-20 sm:w-32 md:w-48 select-none"
      />
      <p className="text-xs sm:text-sm md:text-lg text-orange-600 font-semibold">
        Connecting Plates & People
      </p>
    </div>

    <button
      onClick={handleLogout}
      className="flex items-center gap-1  hover:bg-red-100 
                 text-red-500 px-3 py-1.5 rounded-md shadow-sm text-sm font-semibold transition-all duration-200"
    >
      <MdPowerSettingsNew size={20} />
      <span>LOG OUT</span>
    </button>
  </div>
</div>


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

      const dayShortMap = {
  Monday: "Mon",
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
  Friday: "Fri",
  Saturday: "Sat",
  Sunday: "Sun",
};

const formatTime12Hour = (time24) => {
  if (!time24) return "";
  const [hourStr, minute] = time24.split(":");
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12; // 0 ko 12 me convert
  return `${hour}:${minute} ${ampm}`;
};


    return (
<div
  key={mess.messId}
  onClick={() => {
    storage.setItem("messId", mess.messId);
    storage.setItem("selectedMess", JSON.stringify(mess));
    storage.setItem('role', 'owner');
    if (mess.status === "active") {
      navigate("/owner-dashboard", { state: { mess } });
    } else {
      navigate(`/own/mess/id/${mess.messId}`, { state: { mess } });
    }
  }}
  className={`cursor-pointer rounded-xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col border-2 ${borderColor}`}
>
  {/* ✅ Image Section with Status Badge */}
  <div className="relative">
    <img
      src={mess.logoUrl || '/default-icon.png'}
      alt={mess.messName}
      className="w-full h-44 object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
    <span
      className={`absolute top-2 right-2 px-3 py-1 text-xs font-semibold rounded-full ${
        isVerified ? 'bg-green-100 text-green-700' :
        isPending ? 'bg-orange-100 text-orange-700' :
        'bg-red-100 text-red-700'
      }`}
    >
      {statusText}
    </span>
  </div>

  {/* ✅ Content Section */}
  <div className="p-4 flex flex-col space-y-3 flex-1">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-lg font-bold text-gray-800">{mess.messName}</h3>
      </div>
    </div>

    {/* {mess.services?.length > 0 && (
      <div className="flex flex-wrap font-black gap-2 mt-1">
        <MdRoomService className="text-orange-500 mt-[2px]" />
        {mess.services.map((service, idx) => (
          <span
            key={idx}
            className="bg-orange-100 text-orange-600 text-xs font-medium px-2 py-1 rounded-full"
          >
            {service}
          </span>
        ))}
      </div>
    )} */}
    {mess.services?.length > 0 && (
      <div className="mt-3">
        <div className="text-gray-600 text-xs mb-1 font-semibold flex items-center gap-1">
          <MdRoomService className="text-orange-500" />
          Services
        </div>
    
        <div className="flex flex-wrap gap-2">
          {mess.services.map((service, idx) => (
            <span
              key={idx}
              className="bg-yellow-100 text-yellow-600 text-xs font-medium px-2 py-1 rounded-full"
            >
              {service}
            </span>
          ))}
        </div>
      </div>
    )}

    {/* Info Grid */}
    <div className="mt-3 grid grid-cols-3 text-center text-sm">
      <div>
        <p className="flex justify-center items-center gap-1 text-gray-500">
          <IoLocationOutline className="text-orange-500" /> City
        </p>
        <p className="font-semibold text-black">{mess.city}</p>
      </div>
      <div>
        <p className="flex justify-center items-center gap-1 text-gray-500">
          <HiOutlineBuildingOffice className="text-orange-500" /> Type
        </p>
        {/* <p className="font-semibold">{mess.messType}</p> */}
<p className="font-semibold">
  {mess.messType?.toLowerCase() === 'both'
    ? 'Both (Veg & Non-Veg)'
    : mess.messType}
</p>

      </div>
      <div>
        <p className="flex justify-center items-center gap-1 text-gray-500">
          <FiPhone className="text-orange-500" /> Contact
        </p>
        <p className="font-semibold">{mess.contactNumber}</p>
      </div>
    </div>

    {/* Additional Details */}
    <div className="grid grid-cols-1 gap-x-2 text-sm text-gray-700">
      <p className="flex items-center gap-2 break-words whitespace-normal p-1 overflow-hidden text-sm">
        <FiMail className="text-orange-500" />
        <span className="font-semibold">Email:</span> {mess.email}
      </p>

      <p className="flex items-center gap-2 text-sm p-1">
        <FaMapMarkedAlt className="text-orange-500" />
        <span className="font-semibold">Address:</span> {mess.address}
      </p>

      <p className="flex items-center gap-2 text-green-600 text-sm mt-1 p-1">
        <AiOutlineClockCircle className="text-orange-500" />
        <span className="font-semibold">Open:</span> {formatTime12Hour(mess.openTime)}
        <span className="font-semibold"> - Close:</span> {formatTime12Hour(mess.closeTime)}
      </p>

      {mess.daysOpen?.length > 0 && (
        <p className="flex items-center gap-2 text-sm text-gray-700 p-1">
          <FaCalendarAlt className="text-orange-500" />
          <span className="font-semibold">Days Open:</span>{" "}
          {mess.daysOpen.map(day => dayShortMap[day] || day).join(", ")}
        </p>
      )}
    </div>
  </div>


  {/* ✅ Arrow Icon (Bottom Right) */}
  <div className="flex justify-end items-center px-4 pb-3">
    <FiArrowRight
      onClick={(e) => {
        e.stopPropagation(); // ❗ stops triggering parent onClick
        storage.setItem("messId", mess.messId);
        storage.setItem("selectedMess", JSON.stringify(mess));
            storage.setItem('role', 'owner');
        if (mess.status === "active") {
          navigate("/owner-dashboard", { state: { mess } });
        } else {
          navigate(`/own/mess/id/${mess.messId}`, { state: { mess } });
        }
      }}
      className="text-orange-500 text-2xl cursor-pointer hover:text-orange-600 transition"
    />
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
    </div>
  );
};

export default MinimalDashboard;




