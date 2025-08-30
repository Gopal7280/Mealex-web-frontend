
import React, { useEffect, useState } from 'react';
import { apiGet } from '../services/api';
import Navbar2 from '../layouts/Navbar2';
import OwnerHeader from '../layouts/CustomerHeader';
import storage from '../utils/storage';
import { useNavigate } from 'react-router-dom';
import PaymentGateway from './PaymentGateway';
import { FiArrowRight } from "react-icons/fi";

const CustomerPlansView = () => {
  const [messes, setMesses] = useState([]);
  const [expandedMessId, setExpandedMessId] = useState(null);
  const [plansByMess, setPlansByMess] = useState({});
  const [selectedAvailablePlan, setSelectedAvailablePlan] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchMesses();
  }, []);

  const fetchMesses = async () => {
    const res = await apiGet('/customer/mess/subscribed');
    if (res.success && Array.isArray(res.data)) {
      setMesses(res.data);
    }
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
    if (!plansByMess[mess.messId]) {
      fetchPlans(mess.messId);
    }
    setSelectedAvailablePlan(null);
  };

  const handleUseTokens = (customerPlanId) => {
    storage.setItem('customerPlanId', customerPlanId);
    navigate(`/using-plans`);
  };

  const handlePaymentSuccess = () => {
    if (selectedAvailablePlan?.messId) {
      fetchPlans(selectedAvailablePlan.messId);
    }
    setSelectedAvailablePlan(null);
    setShowPaymentModal(false);
  };

  return (
    <div className="flex h-screen">
      <Navbar2 />
      <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-green-50 overflow-y-auto">
        <OwnerHeader />

        {/* Tabs */}
        <div className="flex space-x-6 border-b mb-6">
             <button
            className="pb-2 text-gray-500 hover:text-orange-600"
            onClick={() => navigate('/customer-activeplans')}
          >
            My Plans
          </button>
          <button className="pb-2 border-b-2 border-orange-500 text-orange-600">
            My Mess
          </button>
          <button
            className="pb-2 text-gray-500 hover:text-orange-600"
            onClick={() => navigate('/customer-minimal-dashboard')}
          >
            Available Mess
          </button>
        </div>

        {/* 👇 New User Condition */}
        {messes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
            <p className="text-lg font-semibold text-gray-700">
              If you are a new user then explore messes and subscribe your first plan.
            </p>
            <button
              onClick={() => navigate('/customer-minimal-dashboard')}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg shadow-md"
            >
              Explore Mess
            </button>
          </div>
        ) : (
          /* Messes Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {messes.map((mess) => {
              const isExpanded = expandedMessId === mess.messId;
              const plans = plansByMess[mess.messId] || { purchased: [], available: [] };

              return (
                <div key={mess.messId} className="border rounded-xl bg-white p-4 shadow-sm flex flex-col">
                  <div
                    onClick={() => handleMessClick(mess)}
                    className={`flex items-center gap-4 cursor-pointer p-2 rounded-lg border ${
                      isExpanded ? 'border-orange-500 bg-orange-50' : 'border-gray-300'
                    }`}
                  >
                    <img
                      src={mess.logoUrl || '/default-icon.png'}
                      alt="logo"
                      className="w-14 h-14 rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-semibold">{mess.messName}</p>
                      <p className="text-sm text-gray-500">{mess.address}</p>
                    </div>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        storage.setItem('messId', mess.messId);
                        navigate('/customer/mess-details', { state: { mess } });
                      }}
                      className="text-orange-500 text-xl"
                    >
                      <FiArrowRight />
                    </div>
                  </div>

                  {/* Expanded Section */}
                  {isExpanded && (
                    <div className="mt-4 space-y-6">
                      {/* Purchased Plans */}
                      <div>
                        <p className="text-lg font-semibold mb-2">
                          Purchased Plans ({plans.purchased.length})
                        </p>
                        {plans.purchased.length === 0 ? (
                          <p className="text-red-500 font-medium">No plans purchased</p>
                        ) : (
                          <div className="grid grid-cols-1 gap-4">
                            {plans.purchased.map((plan) => (
                              <div
                                key={plan.customerPlanId}
                                className="border p-3 rounded-xl bg-white shadow-sm flex justify-between"
                              >
                                <div className="flex gap-4">
                                  <img
                                    src={plan.imageUrl || '/default-plan.jpg'}
                                    alt="plan"
                                    className="w-16 h-16 rounded"
                                  />
                                  <div>
                                    <p className="font-medium">{plan.name}</p>
                                    <p className="text-sm text-gray-600">{plan.description}</p>
                                    <p className="text-sm text-gray-500">
                                      {plan.totalTokens} Tokens / {plan.durationDays} Days
                                    </p>
                                  </div>
                                </div>
                                <button
                                  onClick={() => handleUseTokens(plan.customerPlanId)}
                                  className="text-sm text-orange-600 hover:underline"
                                >
                                  Use Tokens
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Available Plans */}
                      <div>
                        <p className="text-lg font-semibold mb-2">
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
                                  className={`border p-3 rounded-xl shadow-sm cursor-pointer transition-all ${
                                    isSelected ? 'border-orange-500 bg-orange-50' : 'bg-white border-gray-300'
                                  }`}
                                  onClick={() =>
                                    setSelectedAvailablePlan({
                                      messId: mess.messId,
                                      planId: plan.planId,
                                      plan,
                                    })
                                  }
                                >
                                  <div className="flex gap-4">
                                    <img
                                      src={plan.imageUrl || '/default-plan.jpg'}
                                      alt="plan"
                                      className="w-16 h-16 rounded"
                                    />
                                    <div>
                                      <p className="font-medium">{plan.name}</p>
                                      <p className="text-sm text-gray-600">{plan.description}</p>
                                      <p className="text-sm text-gray-500">
                                        {plan.totalTokens} Tokens / {plan.durationDays} Days
                                      </p>
                                      <p className="text-sm text-gray-700 font-semibold">₹{plan.price}</p>
                                    </div>
                                  </div>
                                  {isSelected && (
                                    <button
                                      className="mt-2 bg-orange-500 hover:bg-orange-600 text-white py-1 px-3 rounded"
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

        {/* Payment Modal */}
        {showPaymentModal && selectedAvailablePlan && (
          <div className="fixed inset-0 bg-opacity-50 backdrop-brightness-50 flex items-center justify-center z-50">
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

                <PaymentGateway
                  messId={selectedAvailablePlan.messId}
                  plan={{ ...selectedAvailablePlan.plan, planId: selectedAvailablePlan.planId }}
                  onSuccess={handlePaymentSuccess}
                />

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
    </div>
  );
};

export default CustomerPlansView;
