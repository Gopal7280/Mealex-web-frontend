

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

const CustomerUseTokens = () => {
  const navigate = useNavigate();
  const [planData, setPlanData] = useState(null);
  const [selectedCount, setSelectedCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');

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
          console.log("✅ Plan data re-fetched:", res.data);
        } else {
          console.error("❌ API failed:", res.message);
          setPlanData(null);
        }
      })
      .catch((err) => {
        console.error("❌ API Error:", err);
        setPlanData(null);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const token = storage.getItem('token');
    if (token) {
      connectSocket(token);
      console.log("🔗 WebSocket initialized from CustomerUseTokens");
    }
    if (!messId || !customerPlanId) return;
    refetchPlan();

    const handleOrderResponse = (response) => {
      console.log('📦 Received order_response:', response);
      if (response?.success) {
        toast.success('Order placed successfully!');
        setIsModalOpen(false);
        setTimeout(() => {
          navigate('/customers-orders');
        }, 800);
      } else {
        toast.error(`❌ Failed: ${response?.message}`);
      }
    };

    onOrderResponse(handleOrderResponse);

    return () => {
      onOrderResponse(null); // ✅ Clear all listeners for order_response
    };
  }, [messId, customerPlanId, navigate]);

  useEffect(() => {
    const token = storage.getItem('token');
    if (token) connectSocket(token);

    const handleUpdate = (res) => {
      console.log('📢 order_update:', res);
      if (res?.success && res.data?.orderStatus) {
        if (res.data.orderStatus === 'accepted') {
          toast.success('🎉 Order accepted');
        } else if (res.data.orderStatus === 'rejected') {
          toast.error('❌ Order rejected');
        } else {
          toast('ℹ️ Order updated');
        }
        navigate('/customers-orders');
      } else {
        toast.error(`⚠️ Update failed: ${res?.message}`);
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
    if (!socket) return toast.error('WebSocket not connected');

    setLoading(true);
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
      setLoading(false);
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
        setTimeout(refetchPlan, 1000);
      } else {
        toast.error(`❌ Failed: ${response?.message}`);
      }
    });
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
              {usedTokens.length}/{issuedTokens.length} Tokens Used
            </div>
            <div className="text-sm text-gray-500">
              🗓 {new Date(planData.purchaseDate).toLocaleDateString('en-GB')} – {new Date(planData.expiryDate).toLocaleDateString('en-GB')}
            </div>
          </div>
        </div>

        {/* Token Selector */}
        <div className="flex justify-center items-center gap-4 mb-6">
          <button onClick={() => setSelectedCount((c) => Math.max(1, c - 1))} disabled={selectedCount <= 1} className="px-3 py-1 rounded bg-gray-200">−</button>
          <span className="text-2xl font-bold">{selectedCount}</span>
          <button onClick={() => setSelectedCount((c) => Math.min(remainingTokens, c + 1))} disabled={selectedCount >= remainingTokens} className="px-3 py-1 rounded bg-gray-200">+</button>
        </div>

        {/* Use Tokens Button */}
        <button
          onClick={handleUseTokens}
          disabled={selectedCount < 1 || remainingTokens === 0}
          className="w-full py-2 rounded bg-orange-500 text-white font-semibold hover:bg-orange-600 transition disabled:opacity-50"
        >
          Use {selectedCount} Token{selectedCount > 1 ? 's' : ''}
        </button>
      </div>

      {/* Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl space-y-4">
            <Dialog.Title className="text-lg font-bold">Select Order Type</Dialog.Title>
            <div className="space-y-2">
              {['dine', 'take-away', 'delivery'].map(service => (
                <button
                  key={service}
                  className={`w-full px-4 py-2 rounded border ${selectedService === service ? 'bg-orange-500 text-white' : 'bg-gray-100'}`}
                  onClick={() => setSelectedService(service)}
                >
                  {service}
                </button>
              ))}
            </div>
            {selectedService === 'delivery' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mt-4">Delivery Address</label>
                <textarea
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full mt-1 p-2 border rounded"
                  placeholder="Enter your full address"
                />
              </div>
            )}
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
              <button
                onClick={handleSubmitOrder}
                disabled={!selectedService || (selectedService === 'delivery' && !deliveryAddress)}
                className="px-4 py-2 bg-orange-500 text-white rounded disabled:opacity-50"
              >
                Submit Order
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default CustomerUseTokens;
