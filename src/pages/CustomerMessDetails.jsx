
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { apiGet, apiPost } from '../services/api';
import Navbar2 from '../layouts/Navbar2';
import storage from '../utils/storage';
import PaymentGateway from './PaymentGateway';
import CustomerHeader from '../layouts/CustomerHeader';
import { toast } from 'react-hot-toast';

const ExploreMessDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const mess = location.state?.mess;

  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [subscribed, setSubscribed] = useState(false);



  const fetchSubscribedMessIds = async () => {
  try {
    const res = await apiGet('/customer/mess/subscribed');
    if (res.success && Array.isArray(res.data)) {
      // extract only messIds
      const messIds = res.data.map(m => m.messId);
      storage.setItem('subscribedMessIds', JSON.stringify(messIds));
      return messIds;
    }
    return [];
  } catch (error) {
    console.error('Failed to fetch subscribed mess IDs', error);
    return [];
  }
};


  useEffect(() => {
    if (!mess) {
      navigate('/customer');
      return;
    }

  

    const loadSubscribedStatus = async () => {
  const subscribedIds = await fetchSubscribedMessIds();
  const isSubscribed = subscribedIds.includes(mess.messId);
  setSubscribed(isSubscribed);
};


    loadSubscribedStatus();
    fetchPlans(mess.messId);
  }, [mess?.messId]);

  const fetchPlans = async (messId) => {
    try {
      const res = await apiGet(`/customer/mess/plans/${messId}`);
      if (res?.success) {
        setPlans(res.data || []);
        console.log('Fetched plans:', res.data);
      }
    } catch (err) {
      console.error('🔴 Error fetching plans:', err);
    }
  };

  const handleSubscribe = async () => {
    try {
      const response = await apiPost('/customer/mess/add', { messId: mess.messId });
      const res = response?.data;

      if (res?.success && Array.isArray(res?.mess_ids)) {
        localStorage.setItem('subscribedMessIds', JSON.stringify(res.mess_ids));
        setSubscribed(true);
        toast.success(`Subscribed to ${mess.messName} successfully!`);
      } else {
        console.error('Unexpected response structure:', res);
        alert('Subscription failed. Try again.');
      }
    } catch (error) {
      if (error?.response?.status === 409) {
        alert('Already subscribed.');
        setSubscribed(true);
      } else {
        console.error('Subscription error:', error);
        alert('Failed to subscribe.');
      }
    }
  };

  if (!mess) return <div className="p-10 text-center">Loading mess details...</div>;

  return (
      <div className="flex h-screen">
        <Navbar2 />
      {/* <div className="flex-1 p-6 overflow-y-auto bg-[#f9f4f0] min-h-screen"> */}
      <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-gray-50 overflow-y-auto">

          <CustomerHeader />

          <h2 className="text-2xl font-bold mb-4 text-gray-700">Mess Details</h2>
          <div className="border rounded-xl bg-white p-6">
            <div className="flex items-center gap-4 mb-4">
              <img src={mess.logoUrl} alt="Mess" className="w-24 h-24 rounded-md" />
              <div className="flex flex-col">
                <h3 className="text-xl font-bold text-gray-800">
                  {mess.messName}
                  {subscribed && <span className=" ml-2">✅</span>}
                </h3>
                <p className="text-sm text-gray-500">{mess.address}</p>
                <p className="text-sm text-gray-500">{mess.city}</p>
              <div className="">
                <button
                  onClick={handleSubscribe}
                  disabled={subscribed}
                  className={`border px-4 py-2 rounded-xl ${
                    subscribed
                      ? 'bg-orange-400 text-white cursor-not-allowed'
                      : 'border-orange-400 text-orange-400 hover:bg-orange-50'
                  }`}
                >
                  {subscribed ? 'Subscribed' : 'Subscribe'}
                </button>
              </div>
            </div>
                          </div>


            <div className="mt-6">
              <h4 className="text-lg font-semibold border-b-2 border-orange-400 inline-block pb-1 mb-4">
                Available Plans
              </h4>

              <div className="flex gap-4 flex-wrap">
                {/* {plans.map((plan, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedPlan(plan)}
                    className={`w-64 border rounded-xl p-4 cursor-pointer  ${
                      selectedPlan?.planId === plan.planId
                        ? 'border-4 border-orange-500 shadow-md'
                        : 'hover:shadow-md'
                    }`}
                  >
                    <img
                      src={plan.imageUrl || 'https://via.placeholder.com/150'}
                      alt="Plan"
                      className="h-28 w-full object-cover rounded mb-3"
                    />
                    <h5 className="font-bold text-gray-800 text-base">{plan.name}</h5>
                    <p className="text-sm text-gray-500">{plan.description}</p>
                    <p className="text-sm font-semibold text-green-600">Menu:{plan.menu}</p>

                    <ul className="text-sm text-gray-700 mt-2 space-y-1">
                      <li>💰 {plan.price} INR</li>
                      <li>🎫 {plan.totalTokens} Tokens</li>
                      <li>📅 {plan.durationDays} Days</li>
                    </ul>
                  </div>
                ))} */}
                {plans.map((plan, idx) => (
  <div
    key={idx}
    onClick={() => setSelectedPlan(plan)}
    className={`w-64 border rounded-xl p-4 cursor-pointer transition-all ${
      selectedPlan?.planId === plan.planId
        ? 'border-4 border-orange-500 shadow-md'
        : 'hover:shadow-md'
    }`}
  >
    <img
      src={plan.imageUrl || 'https://via.placeholder.com/150'}
      alt="Plan"
      className="h-28 w-full object-cover rounded mb-3"
    />
    <h5 className="font-bold text-gray-800 text-base">{plan.name}</h5>
    <p className="text-sm text-gray-500">{plan.description}</p>

    {/* Menu section */}
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

    <ul className="text-sm text-gray-700 mt-3 space-y-1">
      <li>💰 {plan.price} INR</li>
      <li>🎫 {plan.totalTokens} Tokens</li>
      <li>📅 {plan.durationDays} Days</li>
    </ul>
  </div>
))}

              </div>

              <div className="mt-6">
                <button
                  className={`w-full py-3 rounded-lg text-lg font-medium transition-colors ${
                    selectedPlan
                      ? 'bg-orange-500 text-white hover:bg-orange-600'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  onClick={() => selectedPlan && setShowPaymentModal(true)}
                  disabled={!selectedPlan}
                >
                  Purchase Plan
                </button>
              </div>
            </div>
          </div>
        </div>

        {showPaymentModal && (
          <div className="fixed inset-0  bg-opacity-50 backdrop-brightness-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 shadow-xl w-[90%] max-w-md">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Choose Payment Method</h3>
              <div className="flex flex-col gap-3">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white py-2 rounded"
                  onClick={() => {
                    setShowPaymentModal(false);
                    alert('💵 Cash payment selected. Please pay at mess counter.');
                  }}
                >
                  Pay with Cash
                </button>
       
                {selectedPlan && (
                  <PaymentGateway
                    plan={selectedPlan}
                    messId={mess.messId}
                    onSuccess={() => {
                      setShowPaymentModal(false);    
                      fetchPlans(mess.messId);        
                      setTimeout(() => {
                        navigate('/customer/your-mess');
                      }, 4000); 
                    }}
                  />
                )}

                <button
                  className="text-sm text-gray-500 mt-2 hover:text-red-500"
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

export default ExploreMessDetails;
