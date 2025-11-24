//new after heartbeat 

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar2 from '../layouts/Navbar2';
import { apiGet } from '../services/api';
import storage from '../utils/storage';
import { Dialog } from '@headlessui/react';
import { connectSocket, getSocket, onOrderResponse, onOrderUpdate } from '../config/socket';
import CustomerHeader from '../layouts/CustomerHeader';
import { toast } from 'react-hot-toast';
import { useLocation } from "react-router-dom";


const CustomerUseTokens = () => {
const location = useLocation();
const { dineCharge,
   takeAwayCharge,
    deliveryCharge,  
    services = []
 } = location.state || {};



  const navigate = useNavigate();
  const [planData, setPlanData] = useState(null);
  const [selectedCount, setSelectedCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);


  const messId = storage.getItem('messId');
  const customerPlanId = storage.getItem('customerPlanId');
  const JWT = storage.getItem('token');
  const customerId = storage.getItem('customerId');

  const refetchPlan = () => {
    setLoading(true);
    apiGet(`/customer/mess/${messId}/plan/${customerPlanId}`)
      .then(res => {
        if (res.success) {
          
          const data = res.data;
          const issued = data.issuedTokenCount || data.issuedTokens?.length || 0;
          const used = data.usedTokenCount || data.usedTokens?.length || 0;
          
          data.remainingTokens = issued - used;
          setPlanData(data);
        } else {
          setPlanData(null);
        }
      })
      .catch((err) => {
        setPlanData(null);
      })
      .finally(() => setLoading(false));
  };



  useEffect(() => {
    const token = storage.getItem('token');
    if (token) {
      connectSocket(token);
    }
    if (!messId || !customerPlanId) return;
    refetchPlan();

    const handleOrderResponse = (response) => {
      if (response?.success) {
        toast.success('Order placed successfully!');
        setIsModalOpen(false);
        setTimeout(() => {
          navigate('/customers-orders');
        }, 800);
      } else {
        toast.error(`❌ Failed: ${response?.message}`);
        setIsSubmitting(false); // ✅ reset submitting state on failure
      }
    };

    onOrderResponse(handleOrderResponse);

    return () => {
      onOrderResponse(null); // ✅ Clear all listeners for order_response
    };
  }, [messId, customerPlanId, navigate]);

  useEffect(() => {
    

    const handleUpdate = (res) => {
      if (res?.success && res.data?.orderStatus) {
        if (res.data.orderStatus === 'accepted') {
          toast.success('🎉 Order accepted');
          setIsSubmitting(false); // ✅ reset submitting state on acceptance
        } else if (res.data.orderStatus === 'rejected') {
          toast.error('❌ Order rejected');
          setIsSubmitting(false); // ✅ reset submitting state on rejection
        } else {
          toast('ℹ️ Order updated');
        }
        navigate('/customers-orders');
      } else {
        toast.error(`⚠️ Update failed: ${res?.message}`);
        setIsSubmitting(false); // ✅ reset submitting state on failure
      }
    };

    onOrderUpdate(handleUpdate);

    return () => {
      onOrderUpdate(null); // ✅ Clear all listeners for order_update
    };
  }, [navigate]);

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (!planData) return <div className="p-6 text-center text-red-500">No plan found.</div>;

  const { name, description, price, durationDays, imageUrl, issuedTokens = [], usedTokens = [], remainingTokens } = planData;

  const handleUseTokens = () => {
    setIsModalOpen(true);
  };

const handleSubmitOrder = async () => {
  const socket = getSocket();
  if (!socket) {
    toast.error('WebSocket not connected');
    setIsSubmitting(false); // ✅ reset immediately if no socket
    return;
  }

  setIsSubmitting(true); // ⬅️ Start submitting state

  try {
    await refetchPlan();

    const latestUnusedTokens = planData.issuedTokens
      .filter(issuedToken => {
        return !planData.usedTokens.some(used => {
          return typeof used === 'string'
            ? used === issuedToken._id
            : used._id === issuedToken._id;
        });
      })
      .slice(0, selectedCount);

    if (latestUnusedTokens.length < selectedCount) {
      toast.error("❌ Not enough valid unused tokens available. Please try again.");
      setIsSubmitting(false); // ✅ reset on failure
      return;
    }

    storage.setItem('tokens', latestUnusedTokens);

    const payload = {
      customerPlanId,
      tokens: latestUnusedTokens,
      customerId,
      orderType: selectedService,
      token: JWT,
      ...(selectedService === 'delivery' && { deliveryAddress }),
    };

    socket.emit('new_order', payload, (response) => {
      if (response?.success) {
        toast.success('Order placed successfully!');
        setIsModalOpen(false);
        setIsSubmitting(false); // ✅ reset on failure
        setTimeout(refetchPlan, 1000);
      } else {
        toast.error(`❌ Failed: ${response?.message}`);
        setIsSubmitting(false); // ✅ reset on failure
      }
      setIsSubmitting(false); // ✅ always reset after socket response
    });
  } catch (err) {
    toast.error("Unexpected error. Please try again.");
    setIsSubmitting(false); // ✅ reset on unexpected error
  }
};




  return (
    <div className="flex h-screen">
      <Navbar2 />
      {/* <div className="flex-1 p-6 overflow-y-auto bg-[#f9f4f0] min-h-screen"> */}
      <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-gray-50 overflow-y-auto">
        <CustomerHeader />
        <h2 className="text-2xl font-semibold mb-4">Use Your Tokens</h2>

        {/* Plan Summary */}
        <div className="bg-white rounded-xl p-4 shadow mb-6 flex gap-4 items-center border border-gray-200">
          <img src={imageUrl || '/default-plan.jpg'} alt={name} className="w-32 h-24 object-cover rounded-md" />
          <div className="flex flex-col flex-1">
            <h3 className="text-lg font-semibold text-blue-900">✨ {name}</h3>
            <p className="text-sm text-gray-600">{description || 'No description available.'}</p>
            <div className="text-base font-bold text-gray-800">₹{price} | {durationDays} Days</div>
            <div className="text-sm text-gray-500">
              {/* {usedTokens.length}/{issuedTokens.length} Tokens Used */}
{usedTokens.length}/{issuedTokens.length + usedTokens.length} Tokens Used
            </div>
            
            <div className="text-sm text-gray-500">
              🗓 {new Date(planData.purchaseDate).toLocaleDateString('en-GB')} – {new Date(planData.expiryDate).toLocaleDateString('en-GB')}
            </div>
          </div>
        </div>

        {/* Token Selector */}
        <div className="flex justify-center items-center gap-4 mb-6">
          <button onClick={() => setSelectedCount((c) => Math.max(1, c - 1))} disabled={selectedCount <= 1} className="px-3 py-1 rounded cursor-pointer bg-gray-200">−</button>
          <span className="text-2xl font-bold">{selectedCount}</span>
          <button onClick={() => setSelectedCount((c) => Math.min(remainingTokens, c + 1))} disabled={selectedCount >= remainingTokens} className="px-3 py-1 cursor-pointer rounded bg-gray-200">+</button>
        </div>

        {/* Use Tokens Button */}
        <button
          onClick={handleUseTokens}
          disabled={selectedCount < 1 || remainingTokens === 0}
          className="w-full py-2 rounded bg-orange-500 text-white font-semibold cursor-pointer hover:bg-orange-600 transition disabled:opacity-50"
        >
          Use {selectedCount} Token{selectedCount > 1 ? 's' : ''}
        </button>
      </div>
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
  <div className="fixed inset-0 backdrop-brightness-50 bg-opacity-50" aria-hidden="true" />
  <div className="fixed inset-0 flex items-center justify-center">
    <Dialog.Panel className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-lg">
      <Dialog.Title className="text-lg font-semibold mb-4 text-center">
        Select Order Type
      </Dialog.Title>

    
      {services.length === 0 ? (
  <p className="text-center text-gray-500">No services available for this mess.</p>
) : (
  <div className="flex gap-3 justify-center mb-4">
    {services.map((service) => (
      <button
        key={service}
        onClick={() => setSelectedService(service)}
        className={`px-4 py-2 rounded-full cursor-pointer border ${
          selectedService === service
            ? 'bg-orange-500 text-white'
            : 'bg-gray-100 text-gray-700'
        }`}
      >
        {service.charAt(0).toUpperCase() + service.slice(1)}
      </button>
    ))}
  </div>
)}
{/* Show Service Charge */}
{selectedService && (
  <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4 text-center shadow-sm">
    <p className="text-sm font-semibold text-orange-700">
      {selectedService === 'dine'
        ? `Dine-in Charge: ₹${dineCharge}`
        : selectedService === 'take-away'
        ? `Take-Away Charge: ₹${takeAwayCharge}`
        : selectedService === 'delivery'
        ? `Delivery Charge: ₹${deliveryCharge}`
        : ''}
    </p>
  </div>
)}


      {/* Delivery Address Field */}
      {selectedService === 'delivery' && (
        <input
          type="text"
          placeholder="Enter delivery address"
          className="w-full border rounded px-3 py-2 mb-4"
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
        />
      )}

      {/* Action Buttons */}
      <div className="flex justify-between">
        <button
          onClick={() => setIsModalOpen(false)}
          className="px-4 py-2 cursor-pointer bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
  onClick={handleSubmitOrder}
  disabled={isSubmitting || !selectedService || (selectedService === 'delivery' && !deliveryAddress)}
  className="px-4 py-2 bg-orange-500 cursor-pointer text-white rounded hover:bg-orange-600 disabled:opacity-50 flex items-center gap-2"
>
  {isSubmitting ? (
    <>
      <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
      Submitting...
    </>
  ) : (
    "Submit Order"
  )}
</button>

      </div>
    </Dialog.Panel>
  </div>
</Dialog>

    </div>
  );
};

export default CustomerUseTokens;
