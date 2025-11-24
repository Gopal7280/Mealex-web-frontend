//this is latest changes 

import React, { useEffect, useState } from 'react';
import { apiGet } from '../services/api';
import Navbar2 from '../layouts/Navbar2';
import OwnerHeader from '../layouts/CustomerHeader';
import storage from '../utils/storage';
import { useNavigate } from 'react-router-dom';
import PaymentGateway from './PaymentGateway';
import { FiArrowRight } from "react-icons/fi";
import { toast } from 'react-hot-toast';
import { AiOutlineBarcode } from "react-icons/ai";
import { MdRoomService } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import { FiPhone, FiMail } from "react-icons/fi";
import { FaMapMarkedAlt, FaCalendarAlt } from "react-icons/fa";
import { AiOutlineClockCircle } from "react-icons/ai";


const CustomerPlansView = () => {
  const [messes, setMesses] = useState([]);
  const [expandedMessId, setExpandedMessId] = useState(null);
  const [plansByMess, setPlansByMess] = useState({});
  const [selectedAvailablePlan, setSelectedAvailablePlan] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedMessKyc, setSelectedMessKyc] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMesses();
  }, []);

  const fetchMesses = async () => {
    const res = await apiGet('/customer/mess/subscribed');
    if (res.success && Array.isArray(res.data)) setMesses(res.data);
    console.log(res);
  };
  const fetchPlans = async (messId) => {
    const [issuedRes, allPlansRes] = await Promise.all([
      apiGet(`/customer/mess/${messId}/plan/issued`),
      apiGet(`/customer/mess/plans/${messId}`),
    ]);
    setPlansByMess((prev) => ({
      ...prev,
      [messId]: {
        purchased: issuedRes.success ? issuedRes.data : [],
        available: allPlansRes.success ? allPlansRes.data : [],
      },
    }));
  };

  const handleMessClick = (mess) => {
    const alreadyExpanded = expandedMessId === mess.messId;
    setExpandedMessId(alreadyExpanded ? null : mess.messId);
    storage.setItem('messId', mess.messId);
    setSelectedMessKyc(mess.kyc_stage);
    if (!plansByMess[mess.messId]) fetchPlans(mess.messId);
    setSelectedAvailablePlan(null);
  };

  const handleUseTokens = (customerPlanId, messId, services, charges) => {
  storage.setItem('customerPlanId', customerPlanId);
  storage.setItem('messId', messId);

  // Save services
  // storage.setItem('messServices', JSON.stringify(services || []));

  navigate(`/using-plans`, {
    state: {
      services,
      dineCharge: charges.dineCharge,
      takeAwayCharge: charges.takeAwayCharge,
      deliveryCharge: charges.deliveryCharge
    }
  });
};



  const handlePaymentSuccess = () => {
    if (selectedAvailablePlan?.messId) fetchPlans(selectedAvailablePlan.messId);
    setSelectedAvailablePlan(null);
    setShowPaymentModal(false);
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
    <div className="flex h-screen">
      <Navbar2 />
      <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-gray-50 overflow-y-auto">
        <OwnerHeader />

        <div className="flex space-x-6 border-b mb-6">
          <button
            className="pb-2 text-gray-500 cursor-pointer hover:text-orange-600"
            onClick={() => navigate('/customer-activeplans')}
          >
            My Plans
          </button>
          <button className="pb-2 border-b-2 cursor-pointer border-orange-500 text-orange-600">
            My Mess
          </button>
          <button
            className="pb-2 text-gray-500 cursor-pointer hover:text-orange-600"
            onClick={() => navigate('/customer-minimal-dashboard')}
          >
            Available Mess
          </button>
        </div>

        {messes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
            <p className="text-lg font-semibold text-gray-700">
              If you are a new user then explore messes and subscribe your first plan.
            </p>
            <button
              onClick={() => navigate('/customer-minimal-dashboard')}
              className="bg-orange-500 hover:bg-orange-600 cursor-pointer text-white px-6 py-2 rounded-lg shadow-md"
            >
              Explore Mess
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {messes.map((mess) => {
              const isExpanded = expandedMessId === mess.messId;
              const plans = plansByMess[mess.messId] || { purchased: [], available: [] };

              return (
                <div
                  key={mess.messId}
                  onClick={() => handleMessClick(mess)}
                  className={`cursor-pointer rounded-xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col border-2
                    ${mess.status === 'active'
                      ? 'border-green-500'
                      : mess.status === 'pending'
                      ? 'border-yellow-400'
                      : 'border-red-500'}`}
                >
                  {/* Image & Status */}
                  <div className="relative">
                    <img
                      src={mess.logoUrl || '/default-icon.png'}
                      alt={mess.messName}
                      className="w-full h-44 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col flex-1 space-y-3">
                    <div className="flex justify-between items-start">

                      <div>
                        <h3 className="text-lg font-bold text-gray-800">{mess.messName}</h3>
                      </div>
                      
                      <FiArrowRight
                        className={`text-gray-500 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`}
                      />
                      
                    </div>
             
                    {/* {mess.services.length > 0 && (
  <div className="flex flex-wrap font-black gap-2 mt-1">
    <MdRoomService className="text-orange-500 mt-[2px]" />
    {mess.services.map((service, idx) => (
      <span
        key={idx}
        className="bg-yellow-100 text-yellow-600 text-xs font-medium px-2 py-1 rounded-full"
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

            <div className="grid grid-cols-1 gap-x-2  text-sm text-gray-700">

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
                      {/* Purchased Plans */}
                      <div>
                        <p className="text-base font-semibold mb-2 text-gray-800">
                          Purchased Plans ({plans.purchased.length})
                        </p>
                        {plans.purchased.length === 0 ? (
                          <p className="text-red-500 font-medium">No plans purchased</p>
                        ) : (
                          <div className="grid grid-cols-1 gap-4">
                            {plans.purchased.map((plan) => (
                              <div
                                key={plan.customerPlanId}
                                className="border p-4 rounded-xl bg-white shadow-sm flex flex-col gap-3"
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
                                  <p className="text-sm text-gray-500">Total: {plan.issuedTokenCount} Tokens / {plan.durationDays} Days</p>
                                  <p className="text-sm text-gray-600">Used: {plan.usedTokenCount} / {plan.issuedTokenCount} Tokens</p>
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
    </div>                                </div>
                                </div>
                        
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
  className="w-full border border-orange-500 mt-1 flex items-center justify-center gap-2 px-3 py-2 text-sm text-white bg-orange-500 rounded-lg hover:bg-orange-700"
>
  <AiOutlineBarcode className="w-4 h-4" /> Use Tokens
</button>

                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Available Plans */}
                      <div>
                        <p className="text-base font-semibold mb-2 text-gray-800">
                          Available Plans ({plans.available.length})
                        </p>
                        {plans.available.length === 0 ? (
                          <p className="text-gray-500">No available plans</p>
                        ) : (
                          <div className="grid grid-cols-1 gap-4">
                            {plans.available.map((plan) => {
                              const isSelected =
                                selectedAvailablePlan?.planId === plan.planId &&
                                selectedAvailablePlan?.messId === mess.messId;
                              return (
                                <div
  key={plan.planId}
  className={`border p-4 rounded-xl shadow-sm cursor-pointer transition-all
    ${isSelected ? 'border-orange-500 bg-orange-50' : 'bg-white border-gray-300'}`}
  onClick={(e) => {
    e.stopPropagation();
    setSelectedAvailablePlan({ messId: mess.messId, planId: plan.planId, plan });
  }}
>
  <div className="flex gap-4">
    <img
      src={plan.imageUrl || '/default-plan.jpg'}
      alt="plan"
      className="w-20 h-20 rounded-lg object-cover"
    />
  
             <div>
                                      <p className="font-medium">{plan.name}</p>
                                      <p className="text-sm text-gray-600">{plan.description}</p>
                                      <p className="text-sm text-gray-500">{plan.totalTokens} Tokens / {plan.durationDays} Days</p>
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
    </div>                                      <p className="text-sm mt-1 text-gray-700 font-semibold">₹{plan.price}</p>
                                    </div>
  </div>
  {isSelected && (
    <button
      className="mt-3 bg-orange-500 cursor-pointer hover:bg-orange-600 text-white py-2 px-3 rounded w-full"
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
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {showPaymentModal && selectedAvailablePlan && (
          <div className="fixed inset-0 bg-opacity-50 backdrop-brightness-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 shadow-xl w-[90%] max-w-md">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Choose Payment Method</h3>
              <div className="flex flex-col gap-3">
                <button
                  className="bg-green-500 hover:bg-green-600 cursor-pointer text-white py-2 rounded"
                  onClick={() => {
                    setShowPaymentModal(false);
                    navigate(`/customer/cash-payment/${selectedAvailablePlan.planId}`);
                    toast.success('💵 Cash payment selected. Please pay at mess counter.');
                  }}
                >
                  Pay via Cash / UPI
                </button>

                {selectedMessKyc >= 3 ? (
                  <PaymentGateway
                    messId={selectedAvailablePlan.messId}
                    plan={{ ...selectedAvailablePlan.plan, planId: selectedAvailablePlan.planId }}
                    onSuccess={handlePaymentSuccess}
                  />
                ) : (
                  <p className="text-red-500 text-sm mt-1">
                    Online payment is not available for this mess as KYC is incomplete.
                  </p>
                )}

                <button
                  className="text-sm text-gray-500 mt-2 cursor-pointer hover:text-red-500"
                  onClick={() => setShowPaymentModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CustomerPlansView;
