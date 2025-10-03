import React, { useEffect, useState, } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { apiGet, apiPost } from '../services/api';
import Navbar from '../layouts/Navbar';
import OwnerHeader from './ownerHeader';
import ActivePlanCard from './ActivePlanCard';
import storage from '../utils/storage';
import clipboard from '../assets/clipboard.png.png';
import toast from 'react-hot-toast';


const CustomerPlans = () => {
  const selectedMess = JSON.parse(storage.getItem("selectedMess"));
const kycStage = selectedMess?.kyc_stage || "0";

  const [activePlans, setActivePlans] = useState([]);
  const [showAvailablePlans, setShowAvailablePlans] = useState(false);
  const [availablePlans, setAvailablePlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [isPriceClicked, setIsPriceClicked] = useState(false);

  const [sortType, setSortType] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const messId = storage.getItem('messId');
  const customerId = storage.getItem('customerId');



const fetchActivePlans = async () => {
  try {
    const res = await apiGet(`owner/mess/${messId}/customer/${customerId}/active-plans`);
    const plans = res?.data || [];
    setActivePlans(plans);

    if (plans.length > 0 && plans[0].customerPlanId) {
      storage.setItem('customerPlanId', plans[0].customerPlanId);
    }
  } catch (err) {
  } finally {
    setLoading(false);
  }
};


useEffect(() => {
  fetchActivePlans();
}, [messId, customerId]);





  
//   const initiatePayment = async () => {
//     const planId = selectedPlan._id || selectedPlan.planId;
//     if (!planId || planId.length !== 36) {
//       alert('Invalid or missing Plan ID. Please select a plan again.');
//       return;
//     }

//     try {
//       const res = await apiPost('/owner/mess/razorpay-order', { planId, messId });
//       const { id: orderId, amount } = res.data.orderDetails;

//       const options = {
//         key: 'rzp_test_RD4LUvyj0ffvxI',
//         amount,
//         currency: 'INR',
//         name: 'MealX Mess System',
//         description: `Purchase Plan: ${selectedPlan.name}`,
// image: {
//   src: 'your-url.svg', // ensure the SVG file has valid width/height or use PNG
//   width: '100',        // <-- valid value
//   height: '40'         // <-- valid value
// },
//         order_id: orderId,
//         handler: async function (response) {
//           const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
//           if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
//             alert('⚠️ Incomplete Razorpay response. Payment not verified.');
//             return;
//           }
//           try {
//             console.log('🔍 customerId from storage:', customerId);

//             const verifyPayload = {
//               razorpay_payment_id,
//               razorpay_order_id,
//               razorpay_signature,
//               planId: selectedPlan._id || selectedPlan.planId,
//               customerId,
//               customerPaymentType: 'online', // 🔁 specify payment type
//             };
//             const verifyRes = await apiPost('/owner/mess/payment-verify', verifyPayload);

//         // Auto navigate after toast
//         setTimeout(() => {
//         }, 5000);           
//          await fetchActivePlans(); // <-- fetch new plans
// toast.success(`🎉 Payment successful! ${selectedPlan?.name || "Plan"} activated.`);
// setShowAvailablePlans(false); // hide available plans section



//           } 
//         catch (err) {
//   console.error('❌ Payment verification failed:', err?.response?.data || err);
//   alert('❌ Payment verification failed.');
// }

//         },
//         prefill: {
//           name: 'Customer Name',
//           email: 'customer@example.com',
//           contact: '9876543210',
//         },
//         notes: { messId, planId },
//         theme: { color: '#f97316' },
//       };

//       const razor = new window.Razorpay(options);
//       razor.open();
//     } catch (err) {
//       alert('Unable to initiate payment');
//     }
//   };

const initiatePayment = async () => {
  const planId = selectedPlan._id || selectedPlan.planId;
  if (!planId || planId.length !== 36) {
    toast.error("⚠️ Invalid or missing Plan ID. Please select a plan again.");
    return;
  }

  try {
    const res = await apiPost("/owner/mess/razorpay-order", { planId, messId });
const orderDetails = res?.orderDetails;
if (!orderDetails?.id || !orderDetails?.amount) {
  toast.error("⚠️ Invalid order response from server.");
  return;
}

const { id: orderId, amount } = orderDetails;
    // const { id: orderId, amount } = res.orderDetails;

    const options = {
      key: "rzp_test_RD4LUvyj0ffvxI",
      amount,
      currency: "INR",
      name: "MealX Mess System",
      description: `Purchase Plan: ${selectedPlan.name}`,
      image: {
        src: "your-url.svg", // replace with PNG if SVG not working
        width: "100",
        height: "40",
      },
      order_id: orderId,
      handler: async function (response) {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
        if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
          toast.error("⚠️ Incomplete Razorpay response. Payment not verified.");
          return;
        }

        try {
          const verifyPayload = {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
            planId,
            customerId,
            customerPaymentType: "online",
          };

          await apiPost("/owner/mess/payment-verify", verifyPayload);

          await fetchActivePlans();
          toast.success(` Payment successful! ${selectedPlan?.name || "Plan"} activated.`);

          setShowAvailablePlans(false);

          // Auto navigate after success
          setTimeout(() => {
            navigate("/customer-profile/plans");
          }, 3000);
        } catch (err) {
          toast.error("❌ Payment verification failed. Please contact support.");
        }
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9876543210",
      },
      notes: { messId, planId },
      theme: { color: "#f97316" },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  } catch (err) {
    const errorMessage =
      err?.response?.data?.message ||
      "Unable to initiate payment. Please try again later.";

    // Special case: mess not activated
    if (
      err?.response?.status === 404 &&
      errorMessage.includes("not yet activated")
    ) {
      toast.error("❌ This mess is not activated for online payments. Link Your Bank Accunts First");
      setTimeout(() => {
        navigate("/Mess-KYC");
      }, 3000);
      return;
    }

    toast.error(errorMessage);
  }
};




  const fetchAvailablePlans = async () => {
  setLoading(true);
  setSelectedPlan(null); // reset previous selection
  try {
    const res = await apiGet(`/owner/mess/plan/${messId}`);
    const normalizedPlans = (res?.data || []).map(plan => ({ ...plan, _id: plan.planId }));
    if (sortType === 'priceAsc') normalizedPlans.sort((a, b) => a.price - b.price);
    else if (sortType === 'priceDesc') normalizedPlans.sort((a, b) => b.price - a.price);
    else if (sortType === 'alpha') normalizedPlans.sort((a, b) => a.name.localeCompare(b.name));
    setAvailablePlans(normalizedPlans);
    setShowAvailablePlans(true);
  } catch (err) {
  } finally {
    setLoading(false);
  }
};


  

const handlePlanPurchase = async () => {
  setShowPaymentModal(false);

  if (selectedPlan?.paymentMode === "cash") {
    try {
      const payload = {
        customerId,
        planId: selectedPlan._id || selectedPlan.planId,
        messId,
      };

      // 🔥 New API for cash (OTP initiation)
      const res = await apiPost("/owner/mess/plan/issue/initiate", payload);
      const responseData = res; // ✅ axios ka response unwrap karo

      if (responseData.success) {
        toast.success(" OTP sent successfully. Please verify.");
        
        // ⚡ Store response for next page
        storage.setItem("planIssueResponse", JSON.stringify(responseData));

        // 👉 Navigate to OTP verification page
        navigate("/plan-otp-verification");
      } else {
        toast.error("❌ Failed to initiate cash plan issue.");
      }
    } catch (err) {
      toast.error("❌ Something went wrong.");
    }
  } else {
    initiatePayment();
  }
};


  return (
    <div className="flex h-screen">
      <Navbar />
      {/* <div className="flex-1 p-6 overflow-y-auto bg-[#f9f4f0] min-h-screen"> */}
      <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-gray-50 overflow-y-auto">

          <OwnerHeader />
          <h2 className="text-2xl font-semibold cursor-pointer text-gray-800 mb-2">
            {showAvailablePlans ? 'Purchase Plan' : 'Customer Details'}
          </h2>
<div className="bg-white rounded-xl shadow-md px-6 py-4">
          {showAvailablePlans ? (
            <div className="flex gap-2 mb-6 relative">
              <div className="relative">
                <button onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)} className="border px-4 py-1 cursor-pointer rounded-md bg-white shadow-sm text-sm">
                  ⇅ Sort
                </button>
                {isSortDropdownOpen && (
                  <div className="absolute z-10 mt-2 w-52 bg-white border rounded-lg shadow-md p-2 text-sm">
                    <button onClick={() => { if (isPriceClicked) { setSortType('priceAsc'); fetchAvailablePlans(); } setIsSortDropdownOpen(false); }} disabled={!isPriceClicked} className={`block w-full text-left cursor-pointer p-1 rounded ${isPriceClicked ? 'hover:bg-gray-100 text-black' : 'text-gray-400 cursor-not-allowed'}`}>
                      🔼 Price Ascending
                    </button>
                    <button onClick={() => { if (isPriceClicked) { setSortType('priceDesc'); fetchAvailablePlans(); } setIsSortDropdownOpen(false); }} disabled={!isPriceClicked} className={`block w-full text-left cursor-pointer p-1 rounded ${isPriceClicked ? 'hover:bg-gray-100 text-black' : 'text-gray-400 cursor-not-allowed'}`}>
                      🔽 Price Descending
                    </button>
                    <button onClick={() => { setSortType('alpha'); fetchAvailablePlans(); setIsSortDropdownOpen(false); }} className="block w-full text-left hover:bg-gray-100 cursor-pointer p-1 rounded">
                      🔤 Alphabetical (Name)
                    </button>
                  </div>
                )}
              </div>
              <button onClick={() => setIsPriceClicked(true)} className="border cursor-pointer px-4 py-1 rounded-md bg-white shadow-sm text-sm">
                💰 Price
              </button>
              <button className="border px-4 py-1 rounded-md bg-white shadow-sm text-sm text-gray-400 cursor-not-allowed">
                📈 Popularity
              </button>
              <button className="border px-4 py-1 rounded-md bg-white shadow-sm text-sm text-gray-400 cursor-not-allowed">
                🗓️ Date Added +
              </button>
            </div>
          ) : (
            <div className="flex gap-6 bg-white mb-6 pb-2">
              <button onClick={() => navigate('/owner-customer-profile')} className={`capitalize text-md cursor-pointer font-medium transition-opacity ${currentPath === '/customer-profile' ? 'opacity-100 text-orange-600 border-b-2 border-orange-500' : 'opacity-50 hover:opacity-80'}`}>
                Profile Details
              </button>
              <button onClick={() => navigate('/customer-profile/plans')} className={`capitalize text-md  cursor-pointer font-medium transition-opacity ${currentPath === '/customer-profile/plans' ? 'opacity-100 text-orange-600 border-b-2 border-orange-500' : 'opacity-50 hover:opacity-80'}`}>
                Plans
              </button>
              <button onClick={() => navigate('/customer-profile/history')} className={`capitalize cursor-pointer text-md font-medium transition-opacity ${currentPath === '/customer-profile/history' ? 'opacity-100 text-orange-600 border-b-2 border-orange-500' : 'opacity-50 hover:opacity-80'}`}>
                History
              </button>
            </div>
          )}
         {loading ? (
  <div className="text-center text-gray-500 py-6">Loading...</div>
) : showAvailablePlans ? (
  <>
    {/* 🔓 Available Plans UI (clickable) */}
    <div className="grid grid-cols-1  md:grid-cols-3 gap-4 mb-8">
      {availablePlans.map((plan) => (
        <div
          key={plan._id}
          onClick={() => setSelectedPlan(plan)}
          className={`flex items-center bg-white border-2 rounded-xl p-4    ${
            selectedPlan?._id === plan._id ? 'border-2 cursor-pointer border-orange-500  shadow-md' : 'border-gray-200 cursor-pointer'
          }`}
        >
          <img src={plan.imageUrl} alt="Plan" className="w-24 h-24 rounded-md object-cover mr-4" />
          <div className="flex-1">
            <h3 className="text-md font-semibold text-gray-800">{plan.name}</h3>
            <p className="text-sm text-gray-600">{plan.description}</p>
                        <p className="text-sm text-green-600">{plan.status}</p>

            {/* <p className="text-sm text-gray-600">{plan.expiryDate}</p>
            <p className="text-sm text-gray-600">{plan.purchaseDate}</p>
             */}
         <p className="text-sm text-gray-600">
                          <strong>Created on:</strong> {new Date(plan.createdAt).toLocaleDateString()}
                        </p>
                        {/* <p className="text-sm text-gray-600">
                          <strong>Expires on:</strong> {new Date(plan.expiryDate).toLocaleDateString()}
                        </p> */}

            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
              ₹ <span className="font-bold text-black">{plan.price}</span>
              <span className="border-l border-gray-300 h-4" />
              <span>{plan.durationDays} Days</span>
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className="flex justify-center">
      <button
        onClick={() => setShowPaymentModal(true)}
        className="mt-4 bg-orange-500 text-white w-1/2 py-3 cursor-pointer rounded-2xl hover:bg-orange-600"
      >
        Purchase Plan
      </button>
    </div>
  </>
) : activePlans.length > 0 ? (
  <>
    {/* ✅ Show active plans */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 ">
    
 {activePlans.map((plan) => (
  <ActivePlanCard key={plan._id} plan={plan} 
  />
))}


    </div>
    {/* 🔘 Show Purchase Plan button even if active plans exist */}
    <div className="flex justify-center  ">
      <button
        onClick={fetchAvailablePlans}
        className="w-[600px] h-[50px] bg-orange-500 text-white text-lg font-semibold rounded-2xl cursor-pointer hover:bg-orange-600 m-2 mb-8 "
      >
        Purchase Plan
      </button>
    </div>
  </>
) : (
  // 🧾 Fallback: no plans at all
  <div className="bg-white rounded-lg p-12 flex flex-col items-center justify-center text-center">
    <img src={clipboard} alt="No Plans" className="w-36 h-36 mb-2" />
    <p className="text-orange-600 text-xl font-bold mb-1">NO PLANS PURCHASED</p>
    <p className="text-gray-600 text-sm mb-6">Let's purchase a plan to get started.</p>
    <button
      onClick={fetchAvailablePlans}
      className="w-[600px] h-[50px] md:mt-16 mt-2 cursor-pointer bg-orange-500 text-white text-lg font-semibold rounded-2xl hover:bg-orange-600 "
    >
      Purchase Plan
    </button>
  </div>
)}

        </div>
        </div>


{/* 
 {showPaymentModal && selectedPlan && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-brightness-50">
            <div className="bg-white rounded-2xl p-6 shadow-lg w-[90%] max-w-md relative">
              <button onClick={() => setShowPaymentModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">✕</button>
              <h3 className="text-lg font-semibold text-center text-black mb-6">Choose Customer’s Payment Method</h3>
              <div className="flex flex-col gap-4 mb-6">
                <label onClick={() => setSelectedPlan({ ...selectedPlan, paymentMode: 'cash' })} className={`flex items-center justify-between px-4 py-3 rounded-lg border cursor-pointer ${selectedPlan?.paymentMode === 'cash' ? 'border-green-500 bg-green-50' : 'border-gray-300'}`}>
                  <div className="flex items-center gap-2 text-green-600  font-medium">
                    <span className="text-xl">🪙</span> Cash
                  </div>
                  {selectedPlan?.paymentMode === 'cash' && <span className="text-green-500 text-lg">✔</span>}
                </label>
                <label onClick={() => setSelectedPlan({ ...selectedPlan, paymentMode: 'online' })} className={`flex items-center cursor-pointer justify-between px-4 py-3 rounded-lg border  ${selectedPlan?.paymentMode === 'online' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}>
                  <div className="flex items-center gap-2 text-blue-600 font-medium">
                    <span className="text-xl cursor-pointer">💳</span> UPI/Online
                  </div>
                  {selectedPlan?.paymentMode === 'online' && <span className="text-blue-500 text-lg">✔</span>}
                </label>
              </div>
              <button onClick={handlePlanPurchase} className="w-full bg-orange-500 cursor-pointer hover:bg-orange-600 text-white py-2 rounded-lg font-semibold">
                Purchase Plan
              </button>
            </div>
            
          </div>
        )} */}
        {showPaymentModal && selectedPlan && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-brightness-50">
    <div className="bg-white rounded-2xl p-6 shadow-lg w-[90%] max-w-md relative">
      <button
        onClick={() => setShowPaymentModal(false)}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>
      <h3 className="text-lg font-semibold text-center text-black mb-6">
        Choose Customer’s Payment Method
      </h3>

      <div className="flex flex-col gap-4 mb-6">
        {/* Cash option always available */}
        <label
          onClick={() => setSelectedPlan({ ...selectedPlan, paymentMode: 'cash' })}
          className={`flex items-center justify-between px-4 py-3 rounded-lg border cursor-pointer ${
            selectedPlan?.paymentMode === 'cash' ? 'border-green-500 bg-green-50' : 'border-gray-300'
          }`}
        >
          <div className="flex items-center gap-2 text-green-600 font-medium">
            <span className="text-xl">🪙</span> Pay via Cash / UPI
          </div>
          {selectedPlan?.paymentMode === 'cash' && <span className="text-green-500 text-lg">✔</span>}
        </label>

        {/* Online/UPI option shown only if KYC Stage 3 */}
        {(() => {
          const selectedMess = JSON.parse(storage.getItem("selectedMess"));
          const kycStage = selectedMess?.kyc_stage || "0";

          if (kycStage === "3") {
            return (
              <label
                onClick={() => setSelectedPlan({ ...selectedPlan, paymentMode: 'online' })}
                className={`flex items-center cursor-pointer justify-between px-4 py-3 rounded-lg border ${
                  selectedPlan?.paymentMode === 'online' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2 text-blue-600 font-medium">
                  <span className="text-xl cursor-pointer">💳</span> Pay Online
                </div>
                {selectedPlan?.paymentMode === 'online' && <span className="text-blue-500 text-lg">✔</span>}
              </label>
            );
          } else {
            return (
              <p className="text-red-500 text-sm font-medium mt-2">
                ⚠️ Online payment is not available for this mess as KYC is incomplete.
              </p>
            );
          }
        })()}
      </div>

      <button
        onClick={handlePlanPurchase}
        className="w-full bg-orange-500 cursor-pointer hover:bg-orange-600 text-white py-2 rounded-lg font-semibold"
      >
        Purchase Plan
      </button>
    </div>
  </div>
)}

      </div>
      
    
  );
};

export default CustomerPlans;

