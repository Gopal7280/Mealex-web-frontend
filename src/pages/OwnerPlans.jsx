import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../layouts/Navbar';
import OwnerHeader from './ownerHeader';
import { apiGet, apiPost } from '../services/api';
import storage from '../utils/storage';
import { toast } from "react-hot-toast";
import planIllustration from '../assets/clipboard.png.png';
import { CheckCircle, Trash2 } from "lucide-react";
import { useNavigate } from 'react-router-dom';



const OwnerPlans = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [selectedPlanId, setSelectedPlanId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const messId = storage.getItem('messId');
  const optionsRef = useRef(null);
  const [sortType, setSortType] = useState(null); 
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [isPriceClicked, setIsPriceClicked] = useState(false);
  const [planToDelete, setPlanToDelete] = useState(null); // store plan _id temporarily


  const fetchPlans = async () => {
    try {
      const res = await apiGet(`/owner/mess/plan/${messId}`);
      const normalized = (res?.data || []).map(plan => ({
        ...plan,
        _id: plan.planId,
        isActive: plan.status === 'active' || plan.status === 'activated',
      }));
      setPlans(normalized);
    } catch (error) {
      toast.error("Failed to fetch plans");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAction = async (action, planId) => {
    if (action === "close") {
      setSelectedPlanId(null);
      return;
    }

    const endpointMap = {
      activate: `/owner/mess/plan/activate/${planId}`,
      deactivate: `/owner/mess/plan/deactivate/${planId}`,
      delete: `/owner/mess/plan/delete/${planId}`,
    };

    try {
      const res = await apiPost(endpointMap[action]);

      if (res?.success) {
        if (action === "delete") toast.success("Plan deleted successfully ✅");
        else if (action === "activate") toast.success("Plan activated successfully ✅");
        else if (action === "deactivate") toast.success("Plan deactivated successfully ✅");

        setPlans((prevPlans) =>
          prevPlans
            .map((plan) => {
              if (plan._id === planId) {
                if (action === "delete") return null;
                return {
                  ...plan,
                  isActive: action === "activate",
                  status: action === "activate" ? "active" : "deactivated",
                };
              }
              return plan;
            })
            .filter(Boolean)
        );
      } else {
        toast.error(res?.message || "Something went wrong ❌");
      }
      setSelectedPlanId(null);
    } catch (err) {
      const errorMessage = err?.response?.data?.message || `Failed to ${action} plan`;
      toast.error(errorMessage);
    }
  };

  const handleImageChange = async (e, planId) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      toast.loading("Uploading image...");
      const res = await apiPost(`/owner/mess/plan/update/image/${planId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res?.success) {
        toast.dismiss();
        toast.success(res.message || "Image updated ✅");
        setPlans((prev) =>
          prev.map((plan) =>
            plan._id === planId
              ? { ...plan, imageUrl: `${res.data?.imageUrl}?t=${Date.now()}` }
              : plan
          )
        );
      } else {
        toast.dismiss();
        toast.error(res?.message || "Failed to update image ❌");
      }
    } catch (err) {
      toast.dismiss();
      toast.error("Error uploading image ❌");
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setSelectedPlanId(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => { fetchPlans(); }, [messId]);

  const activatedPlans = plans.filter(plan => plan.isActive);
  const deactivatedPlans = plans.filter(plan => !plan.isActive);

  const sortPlans = (planArray) => {
    const sorted = [...planArray];
    if (sortType === 'priceAsc') sorted.sort((a, b) => a.price - b.price);
    else if (sortType === 'priceDesc') sorted.sort((a, b) => b.price - a.price);
    else if (sortType === 'alpha') sorted.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
    return sorted;
  };

  return (
    <div className="flex h-screen">
      <Navbar />
      <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-gray-50 overflow-y-auto">
        <OwnerHeader />
        <p className="text-2xl font-semibold text-[#232325] mb-4">Your Plans ({plans.length})</p>

        {/* SORTING CONTROLS */}
<div className="flex flex-wrap gap-2 mb-6 relative justify-center sm:justify-start">
          <div className="relative">
            <button
              onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
              className="border px-4 py-1 rounded-md bg-white shadow-sm flex-shrink-0 w-full sm:w-auto text-center cursor-pointer text-sm"
            >
              ⇅ Sort
            </button>
            {isSortDropdownOpen && (
              <div className="absolute z-10 mt-2 w-52 bg-white border rounded-lg shadow-md p-2 text-sm">
                <button onClick={() => { if (isPriceClicked) setSortType('priceAsc'); setIsSortDropdownOpen(false); }}
                  disabled={!isPriceClicked} className={`block w-full text-left p-1 rounded ${isPriceClicked ? 'hover:bg-gray-100 cursor-pointer text-black' : 'text-gray-400 cursor-not-allowed'}`}>
                  🔼 Price Ascending
                </button>
                <button onClick={() => { if (isPriceClicked) setSortType('priceDesc'); setIsSortDropdownOpen(false); }}
                  disabled={!isPriceClicked} className={`block w-full text-left p-1 rounded ${isPriceClicked ? 'hover:bg-gray-100 cursor-pointer text-black' : 'text-gray-400 cursor-not-allowed'}`}>
                  🔽 Price Descending
                </button>
                <button onClick={() => { setSortType('alpha'); setIsSortDropdownOpen(false); }}
                  className="block w-full text-left cursor-pointer hover:bg-gray-100 p-1 rounded">
                  🔤 Alphabetical (Name)
                </button>
              </div>
            )}
          </div>
          <button onClick={() => setIsPriceClicked(true)} className="border px-4 py-1 rounded-md cursor-pointer bg-white shadow-sm text-sm">💰 Price</button>
          <button className="border px-4 py-1 rounded-md bg-white shadow-sm text-sm text-gray-400 cursor-not-allowed">Popularity</button>
          <button className="border px-4 py-1 rounded-md bg-white shadow-sm text-sm text-gray-400 cursor-not-allowed">Date Added +</button>
        </div>

        {/* PLANS */}
        {isLoading ? (
          <div className="text-center text-gray-500">Loading plans...</div>
        ) : plans.length === 0 ? (
          <div className="text-center">
            <img src={planIllustration} className="w-40 h-40 mx-auto mb-1" />
            <p className="text-orange-600 text-xl font-bold">NO PLANS CREATED</p>
            <p className="text-sm">Let's create a plan to get started.</p>
            <button onClick={() => navigate('/add-plan')} className="bg-orange-500 cursor-pointer text-white mt-2 md:mt-24 w-1/2 py-3 rounded-xl">
              Create New Plan
            </button>
          </div>
        ) : (
          <>
            {/* Activated Plans Section */}
            {activatedPlans.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Activated Plans</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {sortPlans(activatedPlans).map(plan => (
<PlanCard 
  key={plan._id} 
  plan={plan} 
  handleAction={handleAction} 
  handleImageChange={handleImageChange} 
  onDeleteClick={() => setPlanToDelete(plan._id)} 
/>
                  ))}
                </div>
              </div>
            )}

            {/* Deactivated Plans Section */}
            {deactivatedPlans.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Deactivated Plans</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {sortPlans(deactivatedPlans).map(plan => (
                    <PlanCard key={plan._id} plan={plan} 
                    handleAction={handleAction}
                    handleImageChange={handleImageChange}
                    onDeleteClick={() => setPlanToDelete(plan._id)} // ✅ add this
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
      {planToDelete && (
  <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs bg-opacity-50 z-50">
    <div className="bg-white rounded-lg shadow-lg p-6 w-80">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Are you sure?</h3>
      <p className="text-sm text-gray-600 mb-6">Do you really want to delete this plan? This action cannot be undone.</p>
      <div className="flex justify-end gap-2">
        <button
          onClick={() => setPlanToDelete(null)}
          className="px-4 py-2 rounded-md bg-gray-200 cursor-pointer text-gray-700 hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            handleAction("delete", planToDelete);
            setPlanToDelete(null);
          }}
          className="px-4 py-2 rounded-md bg-red-600 cursor-pointer text-white hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

// const PlanCard = ({ plan, handleAction, handleImageChange, onDeleteClick }) => {
//   const navigate = useNavigate();

//   return (
//     <div className="relative">
//       <div
//         className={`relative bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 ${
//           plan.isActive ? "" : "grayscale opacity-80"
//         }`}
//       >
//         {/* --- Edit Plan Button (Always Visible) --- */}
//         <button
//           onClick={() => navigate("/edit-plan", { state: { plan } })}
//           className="absolute top-3 right-3 z-20 bg-white text-xs md:text-sm font-medium px-3 py-1.5 rounded-full shadow hover:bg-orange-200 cursor-pointer transition-all duration-200"
//         >
//           ✏️ 
//         </button>

//         {/* Plan Image */}
//         <div className="relative w-full h-48">
//           <img
//             src={plan.imageUrl}
//             alt={plan.name}
//             className="w-full h-full object-cover"
//           />
//         </div>

//         {/* Plan Info */}
//         <div className="p-4 flex flex-col gap-2">
//           <h3 className="text-lg font-bold text-gray-800">{plan.name}</h3>
//           <p className="text-sm text-gray-600 line-clamp-2">{plan.description}</p>
//           <div className="flex flex-wrap gap-2 mt-2">
//             {plan.menu?.map((item, idx) => (
//               <span
//                 key={idx}
//                 className="bg-orange-100 text-orange-600 text-xs font-medium px-2 py-1 rounded-full"
//               >
//                 {item}
//               </span>
//             ))}
//           </div>

//           <div className="mt-3 grid grid-cols-3 text-center text-sm">
//             <div>
//               <p className="text-gray-500">Price</p>
//               <p className="font-semibold text-black">₹ {plan.price}</p>
//             </div>
//             <div>
//               <p className="text-gray-500">Tokens</p>
//               <p className="font-semibold">{plan.totalTokens}</p>
//             </div>
//             <div>
//               <p className="text-gray-500">Duration</p>
//               <p className="font-semibold">{plan.durationDays} Days</p>
//             </div>
//             <div className="flex items-center gap-1 mt-2 text-sm text-gray-600">
//               <span className="text-blue-600">👥</span>
//               <span className="font-medium">{plan.usageCount}</span>
//               <span>Active Users</span>
//             </div>
//           </div>

//           <p
//             className={`mt-2 text-sm font-medium ${
//               plan.isActive ? "text-green-600" : "text-red-500"
//             }`}
//           >
//             {plan.status}
//           </p>
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex items-center justify-between gap-2 mt-3">
//         <button
//           onClick={() => handleAction("activate", plan._id)}
//           disabled={plan.isActive}
//           className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
//             plan.isActive
//               ? "border border-gray-300 text-gray-400 bg-gray-100 cursor-not-allowed"
//               : "bg-gradient-to-r from-emerald-500 to-green-600 cursor-pointer hover:from-emerald-600 hover:to-green-700 text-white shadow-md"
//           }`}
//         >
//           <CheckCircle className="w-4 h-4" /> Activate
//         </button>

//         <button
//           onClick={() => handleAction("deactivate", plan._id)}
//           disabled={!plan.isActive}
//           className={`flex-1 py-2 rounded-full text-sm cursor-pointer font-semibold transition-all duration-200 ${
//             !plan.isActive
//               ? "border border-gray-300 text-gray-400 bg-gray-100 cursor-not-allowed"
//               : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-md"
//           }`}
//         >
//           ⏸ Deactivate
//         </button>

//         <button
//           onClick={onDeleteClick}
//           className="p-2 rounded-md hover:bg-red-100 cursor-pointer text-red-600 transition"
//           title="Delete Plan"
//         >
//           <Trash2 className="w-5 h-5 cursor-pointer" />
//         </button>
//       </div>
//     </div>
//   );
// };

const PlanCard = ({ plan, handleAction, handleImageChange, onDeleteClick }) => {
  const navigate = useNavigate();

  const isActive = plan.isActive;

  return (
    <div className="relative">
      <div
        className={`relative bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 ${
          isActive ? "" : "grayscale opacity-80"
        }`}
      >
        <button
          onClick={() => navigate("/edit-plan", { state: { plan } })}
          className="absolute top-3 right-3 z-20 bg-white text-xs md:text-sm font-medium px-3 py-1.5 rounded-full shadow hover:bg-orange-200 cursor-pointer transition-all duration-200"
        >
          ✏️
        </button>

        <div className="relative w-full h-48">
          <img
            src={plan.imageUrl}
            alt={plan.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-4 flex flex-col gap-2">
          <h3 className="text-lg font-bold text-gray-800">{plan.name}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{plan.description}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {plan.menu?.map((item, idx) => (
              <span
                key={idx}
                className="bg-orange-100 text-orange-600 text-xs font-medium px-2 py-1 rounded-full"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-3 grid grid-cols-3 text-center text-sm">
            <div>
              <p className="text-gray-500">Price</p>
              <p className="font-semibold text-black">₹ {plan.price}</p>
            </div>
            <div>
              <p className="text-gray-500">Tokens</p>
              <p className="font-semibold">{plan.totalTokens}</p>
            </div>
            <div>
              <p className="text-gray-500">Duration</p>
              <p className="font-semibold">{plan.durationDays} Days</p>
            </div>
            <div className="flex items-center gap-1 mt-2 text-sm text-gray-600">
              <span className="text-blue-600">👥</span>
              <span className="font-medium">{plan.usageCount}</span>
              <span>Active Users</span>
            </div>
          </div>

          <p
            className={`mt-2 text-sm font-medium ${
              isActive ? "text-green-600" : "text-red-500"
            }`}
          >
            {plan.status}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 mt-3">
        <button
          onClick={() => handleAction("activate", plan._id)}
          disabled={isActive}
          className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
            isActive
              ? "border border-gray-300 text-gray-400 bg-gray-100 cursor-not-allowed"
              : "bg-gradient-to-r from-emerald-500 to-green-600 cursor-pointer hover:from-emerald-600 hover:to-green-700 text-white shadow-md"
          }`}
        >
          <CheckCircle className="w-4 h-4" /> Activate
        </button>

        <button
          onClick={() => handleAction("deactivate", plan._id)}
          disabled={!isActive}
          className={`flex-1 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
            !isActive
              ? "border border-gray-300 text-gray-400 bg-gray-100 cursor-not-allowed"
              : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-md cursor-pointer"
          }`}
        >
          ⏸ Deactivate
        </button>

        {/* <button
          onClick={!isActive ? onDeleteClick : undefined}
          disabled={isActive}
          className={`p-2 rounded-md transition ${
            isActive
              ? "opacity-50 cursor-not-allowed text-red-300 bg-gray-100"
              : "hover:bg-red-100 text-red-600 cursor-pointer"
          }`}
          title={isActive ? "Cannot delete active plan" : "Delete Plan"}
        >
          <Trash2 className="w-5 h-5" />
        </button> */}
        <button
  onClick={() => {
    if (!isActive) onDeleteClick();
  }}
  disabled={isActive}
  className={`p-2 rounded-md transition ${
    isActive
      ? "opacity-50 cursor-not-allowed text-red-300 bg-gray-100"
      : "hover:bg-red-100 text-red-600 cursor-pointer"
  }`}
  title={isActive ? "Cannot delete active plan" : "Delete Plan"}
>
  <Trash2 className="w-5 h-5" />
</button>

      </div>
    </div>
  );
};



export default OwnerPlans;
