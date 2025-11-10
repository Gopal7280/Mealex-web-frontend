
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiGet } from '../services/api';
import storage from '../utils/storage';
import defaultIcon from '../assets/chef-icon.webp';
import CustomerHeader from '../layouts/CustomerHeader'; 
import { MdLocationOn } from 'react-icons/md';
import { FiArrowRight } from "react-icons/fi";  // sabse upar import
import Navbar2 from '../layouts/Navbar2';
import PaymentGateway from './PaymentGateway';
import toast from 'react-hot-toast';
import { AiOutlineBarcode } from "react-icons/ai";
import { MdRoomService } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import { FiPhone, FiMail } from "react-icons/fi";
import { FaMapMarkedAlt, FaCalendarAlt } from "react-icons/fa";
import { AiOutlineClockCircle } from "react-icons/ai";


const CustomerMinimalDashboard = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [searchMode, setSearchMode] = useState('city');
  const [messes, setMesses] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState('available');

  const [expandedMessId, setExpandedMessId] = useState(null);
  const [plansByMess, setPlansByMess] = useState({});
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [gotoPage, setGotoPage] = useState("");
  const [selectedMessKyc, setSelectedMessKyc] = useState(0);



  useEffect(() => {
    fetchMesses(page);
  }, [page]);

  const fetchMesses = async (pageNum) => {
    setLoading(true);
    try {
      let url = `/customer/mess?page=${pageNum}&limit=9`;
      if (searchMode === 'city' && searchInput.trim()) {
        url = `/customer/mess/city?city=${searchInput.trim().toLowerCase()}&page=${pageNum}&limit=10`;
      } else if (searchMode === 'pincode' && searchInput.trim()) {
        url = `/customer/mess/pincode?pincode=${searchInput.trim()}&page=${pageNum}&limit=10`;
      }

      const res = await apiGet(url);
      console.log(res);
      if (res?.success && Array.isArray(res.data)) {
        setMesses(res.data);
        setPagination(res.pagination || { currentPage: 1, totalPages: 1 });
      } else {
        setMesses([]);
        setPagination({ currentPage: 1, totalPages: 1 });
      }
    } catch (err) {
      setMesses([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchPlans = async (messId) => {
    try {
      const res = await apiGet(`/customer/mess/plans/${messId}`);
      console.log(res);
      setPlansByMess((prev) => ({
        ...prev,
        [messId]: res?.success ? res.data : [],
      }));
    } catch (err) {
      setPlansByMess((prev) => ({ ...prev, [messId]: [] }));
    }
  };

  const handleMessClick = (mess) => {
  mess.services = mess.services || (Array.isArray(mess.services) ? mess.services : mess.services ? [mess.services] : []);
  const alreadyExpanded = expandedMessId === mess.messId;
  setExpandedMessId(alreadyExpanded ? null : mess.messId);
  storage.setItem('messId', mess.messId);
  setSelectedMessKyc(Number(mess.kyc_stage)); // ✅ Selected mess KYC stage store
  if (!plansByMess[mess.messId]) fetchPlans(mess.messId);
  setSelectedPlan(null);
};


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
    <div className="flex h-screen ">
        <Navbar2 />
      {/* <div className="flex-1 p-6 overflow-y-auto bg-[#f9f4f0] min-h-screen"> */}
      <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-gray-50 overflow-y-auto ">

          <CustomerHeader />

          {/* Tabs */}
          <div className="flex space-x-6 border-b mb-6">
              <button
              className={`pb-2 ${tab === 'plans' ? 'border-b-2 border-orange-500  text-orange-600' : 'cursor-pointer text-gray-500'}`}
              onClick={() => navigate('/customer-activeplans')}
            >
              My Plans
            </button>
             <button
              className={`pb-2 ${tab === 'your' ? 'border-b-2 border-orange-500  text-orange-600' : 'cursor-pointer text-gray-500'}`}
              onClick={() => navigate('/cust/my-mess')}
            >
              My Mess
            </button>
            <button
              className={`pb-2 ${tab === 'available' ? 'border-b-2 border-orange-500  text-orange-600' : 'cursor-pointer text-gray-500'}`}
              onClick={() => setTab('available')}
            >
              Available Mess
            </button>
           
          </div>

          {/* Search */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <select
              value={searchMode}
              onChange={(e) => setSearchMode(e.target.value)}
              className="px-4 py-2 border cursor-pointer border-gray-300 rounded-lg"
            >
              <option value="city">City</option>
              <option value="pincode">Pincode</option>
            </select>
            <input
              type="text"
              placeholder={`Enter ${searchMode}`}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button
              className="flex items-center gap-2 px-4 cursor-pointer py-2 bg-orange-500 text-white rounded-lg"
              onClick={() => fetchMesses(1)}
            >
              <MdLocationOn className="text-xl" />
              Search
            </button>
          </div>

       
<div className="space-y-6">
  {loading ? (
    <p>Loading...</p>
  ) : messes.length === 0 ? (
    <p className="text-gray-500">No messes found.</p>
  ) : (


<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {messes.map((mess) => {
    const isExpanded = expandedMessId === mess.messId;
    const plans = plansByMess[mess.messId] || [];

    return (
      <div
        key={mess.messId}
        onClick={() => handleMessClick(mess)}
        className={`cursor-pointer rounded-xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col
          ${mess.status === 'active'
            ? 'border-2 border-green-500'
            : mess.status === 'pending'
            ? 'border-2 border-yellow-400'
            : 'border-2 border-red-500'}`}
      >
        {/* Mess Image */}
        <div className="relative">
          <img
            src={mess.logoUrl || '/default-icon.png'}
            alt={mess.messName}
            className="w-full h-44 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        {/* Mess Content */}
        <div className={`p-4 flex flex-col flex-1 space-y-3 `}>
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold text-gray-800">{mess.messName}</h3>
            <div
              onClick={(e) => {
                e.stopPropagation();
                storage.setItem('messId', mess.messId);
                navigate('/cust/mess-details', { state: { mess } });
              }}
              className="text-orange-500 text-xl"
            >
              <FiArrowRight />
            </div>
          </div>
                   {mess.services.length > 0 && (
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
          )}
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

        {/* Expanded Plans */}
        {isExpanded && (
          <div className="px-4 pb-4 space-y-6 border-t bg-gray-50">
            <p className="text-lg font-semibold mt-4 mb-2">
              Available Plans ({plans.length})
            </p>
            <div className="grid grid-cols-1 gap-4">
              {plans.length === 0 ? (
                <p className="text-gray-500">No plans available</p>
              ) : (
                plans.map((plan) => {
                  const isSelected = selectedPlan?.planId === plan.planId;
                  return (
                    <div
                      key={plan.planId}
                      className={`border p-4 rounded-xl shadow-sm cursor-pointer transition-all
                        ${isSelected ? 'border-orange-500 bg-orange-50' : 'bg-white border-gray-300'}`}
onClick={(e) => {
  e.stopPropagation(); // prevent mess collapse
  setSelectedPlan(plan);
}}
                    >
                      <div className="flex gap-4">
                        <img
                          src={plan.imageUrl || '/default-plan.jpg'}
                          alt="plan"
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <p className="font-medium">{plan.name}</p>
                          <p className="text-sm text-gray-600">{plan.description}</p>
                          <p className="text-sm text-gray-500">
                            {plan.totalTokens} Tokens / {plan.durationDays} Days
                          </p>
                          <p className="text-sm text-gray-700 font-semibold">₹{plan.price}</p>
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
                              <p className="text-sm font-semibold text-green-600">Menu: {plan.menu}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      {isSelected && (
                        <button
                          className="mt-3 bg-orange-500 cursor-pointer hover:bg-orange-700 text-white py-2 px-3 rounded w-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowPaymentModal(true);
                          }}
                        >
                          Purchase Plan
                        </button>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    );
  })}
</div>

    
  )}
</div>




     
{pagination?.totalPages > 1 && (
  <div className="flex flex-col items-center mt-6 gap-3">
    {/* Prev / Next */}
    <div className="flex gap-2">
      <button
        disabled={page === 1}
        className="px-3 py-1 rounded cursor-pointer bg-gray-200 text-gray-600 disabled:opacity-50"
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
      >
        Prev
      </button>

      <span className="px-3 py-1 text-gray-700">
        Page {page} of {pagination.totalPages}
      </span>

      <button
        disabled={page === pagination.totalPages}
        className="px-3 py-1 rounded cursor-pointer bg-gray-200 text-gray-600 disabled:opacity-50"
        onClick={() => setPage((prev) => Math.min(prev + 1, pagination.totalPages))}
      >
        Next
      </button>
    </div>

    {/* Go To Page */}
    <div className="flex gap-2 items-center">
      <input
        type="number"
        min="1"
        max={pagination.totalPages}
        placeholder="Page no."
        className="border px-3 py-1 rounded w-24 text-sm"
        value={gotoPage}
        onChange={(e) => setGotoPage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            const pageNum = Number(gotoPage);
            if (pageNum >= 1 && pageNum <= pagination.totalPages) {
              setPage(pageNum);
            }
            setGotoPage("");
          }
        }}
      />
      <button
        className="px-3 py-1 bg-orange-500 cursor-pointer text-white rounded text-sm"
        onClick={() => {
          const pageNum = Number(gotoPage);
          if (pageNum >= 1 && pageNum <= pagination.totalPages) {
            setPage(pageNum);
          }
          setGotoPage("");
        }}
      >
        Go
      </button>
    </div>
  </div>
)}

        </div>

      {showPaymentModal && selectedPlan && (
  <div className="fixed inset-0 bg-opacity-50 backdrop-brightness-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl p-6 shadow-xl w-[90%] max-w-md">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">Choose Payment Method</h3>
      <div className="flex flex-col gap-3">

        {/* Cash always available */}
        <button
          className="bg-green-500 hover:bg-green-600 cursor-pointer text-white py-2 rounded"
          onClick={() => {
            setShowPaymentModal(false);
                navigate(`/customer/cash-payment/${selectedPlan.planId}`);
            toast.success('💵 Cash payment selected. Please pay at mess counter.');
          }}
        >
Pay via Cash / UPI
        </button>

        {/* UPI / Online only if KYC complete */}
        {selectedMessKyc >= 3 ? (
          <PaymentGateway
            messId={expandedMessId}
            plan={selectedPlan}
            onSuccess={() => {
              setShowPaymentModal(false);
              fetchPlans(expandedMessId);
              toast.success(`${selectedPlan?.name} has been added successfully!`);
              navigate('/cust/my-mess');
            }}
          />
        ) : (
          <p className="text-red-500 text-sm mt-1">
            Online payment is not available for this mess as KYC is incomplete.
          </p>
        )}

        <button
          className="text-sm text-gray-500 cursor-pointer mt-2 hover:text-red-500"
          onClick={() => setShowPaymentModal(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default CustomerMinimalDashboard;
