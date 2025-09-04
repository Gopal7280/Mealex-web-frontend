import React, { useEffect, useState } from 'react';
import Navbar from '../layouts/Navbar';
import OwnerHeader from './ownerHeader';
import { apiGet, apiPost } from '../services/api';
import { useNavigate } from 'react-router-dom';
import storage from '../utils/storage';

const UseTokens = () => {
  const [planData, setPlanData] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedCount, setSelectedCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [orderType, setOrderType] = useState('');
  const [address, setAddress] = useState('');

  const messId = storage.getItem('messId');
  const customerId = storage.getItem('customerId');
  const customerPlanId = storage.getItem('customerPlanId');

  useEffect(() => {
    if (!messId || !customerId || !customerPlanId) return;
    apiGet(`/owner/mess/${messId}/customer/${customerId}/active-plans/${customerPlanId}`)
      .then(res => {
              console.log('🔍 Active Plan API Response:', res.data);  // <-- ✅ Add this

        const data = res.data;
        const issued = data.issuedTokenCount || data.issuedTokens?.length || 0;
        const used = data.usedTokenCount || data.usedTokens?.length || 0;
        data.remainingTokens = issued - used;
        setPlanData(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [messId, customerId, customerPlanId]);

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (!planData) return <div className="p-6 text-center text-red-500">No plan found.</div>;

  const {
    name, description, price, durationDays, imageUrl,
    issuedTokens = [], usedTokens = [], remainingTokens
  } = planData;


const handleUsePlan = async () => {
  if (selectedCount < 1 || selectedCount > remainingTokens) return;

  const unusedTokens = issuedTokens
    .filter(t => !usedTokens.includes(t))
    .slice(0, selectedCount);

  try {
    const payload = {
      customerPlanId,
      tokens: unusedTokens,
      customerId,
      orderType,
...(orderType === 'delivery' && { deliveryAddress: address })
    };

    const res = await apiPost('/owner/token/submit/initiate', payload);

    const { requestId, verificationToken, context, identifier, identifierType } = res.data;
    storage.setItem('otpRequestContext', JSON.stringify({
      requestId, verificationToken, context, identifier, identifierType
    }));

    navigate('/plan-verification', {
      state: { name, context, identifier, identifierType,orderType, address }
    });
  } catch (err) {
    alert('Error initiating token use, please try again');
    console.error('❌ Token submission failed:', err.response || err);
  }
};


  return (
    <div className="flex h-screen">
      <Navbar />
      {/* <div className="flex-1 p-6 overflow-y-auto bg-[#f9f4f0] min-h-screen"> */}
      <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-gray-50 overflow-y-auto">
        <OwnerHeader />
        <h2 className="text-2xl font-semibold mb-4">Use Plan Tokens</h2>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-1 rounded text-sm ${activeTab === 'all' ? 'bg-orange-500 text-white' : 'bg-white'}`}
          >
            All Tokens ({issuedTokens.length})
          </button>
          {/* <button
            onClick={() => setActiveTab('used')}
            className={`px-4 py-1 rounded text-sm ${activeTab === 'used' ? 'bg-orange-500 text-white' : 'bg-white'}`}
          >
            Used Tokens ({usedTokens.length})
          </button> */}
        </div>

    

<div className="bg-white rounded-xl p-4 shadow mb-6 flex gap-4 items-center border border-gray-200">
  <img src={imageUrl} alt={name} className="w-32 h-24 object-cover rounded-md" />
  <div className="flex flex-col justify-between flex-1">
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold text-blue-900">✨ {name}</h3>
      <button className="text-gray-500 hover:text-black">
        {/* <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <circle cx="12" cy="5" r="1.5" />
          <circle cx="12" cy="12" r="1.5" />
          <circle cx="12" cy="19" r="1.5" />
        </svg> */}
      </button>
    </div>

    <p className="text-sm text-gray-500">{description || 'Plan Description'}</p>

    <div className="text-base font-bold text-gray-800">₹ {price}</div>

    <div className="text-sm text-gray-500">
      {usedTokens.length}/{issuedTokens.length} Tokens
    </div>

    <div className="text-sm text-gray-500">
      🗓 {new Date(planData.purchaseDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })} &nbsp;–&nbsp;
      {new Date(planData.expiryDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
    </div>
  </div>
</div>

        {/* Token Selector */}
        {activeTab === 'all' && (
          <div className="flex justify-center items-center gap-4 mb-6">
            <button
              onClick={() => setSelectedCount(c => Math.max(1, c - 1))}
              disabled={selectedCount <= 1}
              className="px-3 py-1 rounded bg-gray-200"
            >−</button>
            <span className="text-2xl font-bold">{selectedCount}</span>
            <button
              onClick={() => setSelectedCount(c => Math.min(remainingTokens, c + 1))}
              disabled={selectedCount >= remainingTokens}
              className="px-3 py-1 rounded bg-gray-200"
            >+</button>
          </div>
        )}

        {/* Use Plan Button */}
          <div className="flex justify-center  ">
        <button
          // onClick={handleUsePlan}
onClick={() => setShowModal(true)}

          disabled={activeTab !== 'all' || selectedCount < 1}
        className="w-[600px] h-[50px] bg-orange-500 text-white text-lg font-semibold rounded-2xl hover:bg-orange-600 m-2 mb-8 "
      >
          Use Plan
      </button>
    </div>
      </div>
      {showModal && (
  <div className="fixed inset-0 backdrop-brightness-50 bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-lg">
      <h3 className="text-lg font-semibold mb-4 text-center">Select Order Type</h3>
      
      <div className="flex gap-3 justify-center mb-4">
        {['dine', 'take-away', 'delivery'].map(type => (
          <button
            key={type}
            onClick={() => setOrderType(type)}
            className={`px-4 py-2 rounded-full border ${
              orderType === type ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {orderType === 'delivery' && (
        <input
          type="text"
          placeholder="Enter delivery address"
          className="w-full border rounded px-3 py-2 mb-4"
          value={address}
          onChange={e => setAddress(e.target.value)}
        />
      )}

      <div className="flex justify-between">
        <button
          onClick={() => setShowModal(false)}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={async () => {
            if (!orderType) return alert('Please select an order type');
            if (orderType === 'delivery' && !address.trim()) return alert('Please enter address');

            setShowModal(false);
            await handleUsePlan(); // call with selected values
          }}
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default UseTokens;
