// import React, { useEffect, useState ,useRef} from 'react';
// import { MoreVertical } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import Navbar from '../layouts/Navbar';
// import OwnerHeader from './ownerHeader';
// import PlanOptions from './PlanOptions';
// import { apiGet, apiPost } from '../services/api';
// import storage from '../utils/storage';
// import planIllustration from '../assets/clipboard.png.png';
// import { toast } from "react-hot-toast";
// import { Trash2 } from "lucide-react";

// import { CheckCircle } from "lucide-react";


// const Plans = () => {
//   const navigate = useNavigate();
//   const [plans, setPlans] = useState([]);
//   const [selectedPlanId, setSelectedPlanId] = useState('');
//   const [isLoading, setIsLoading] = useState(true);
//   const messId = storage.getItem('messId');
//   const optionsRef = useRef(null); 


//   const [sortType, setSortType] = useState(null); 
//   const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
//   const [isPriceClicked, setIsPriceClicked] = useState(false);

//   const fetchPlans = async () => {
//     try {
//       const res = await apiGet(`/owner/mess/plan/${messId}`);
//       console.log("Fetched Plans:", res); // Debug log
//       const normalized = (res?.data || []).map(plan => ({
//         ...plan,
//         _id: plan.planId,
//         isActive: plan.status === 'active' || plan.status === 'activated',
//       }));
//       setPlans(normalized);
//     } catch (error) {
//     } finally {
//       setIsLoading(false);
//     }
//   };




// const handleAction = async (action, planId) => {
//   if (action === "close") {
//     setSelectedPlanId(null);
//     return;
//   }

//   const endpointMap = {
//     activate: `/owner/mess/plan/activate/${planId}`,
//     deactivate: `/owner/mess/plan/deactivate/${planId}`,
//     delete: `/owner/mess/plan/delete/${planId}`,
//   };

//   try {
//     const res = await apiPost(endpointMap[action]);

//     if (res?.success) {
//       if (action === "delete") {
//         toast.success("Plan deleted successfully ✅");
//       } else if (action === "activate") {
//         toast.success("Plan activated successfully ✅");
//       } else if (action === "deactivate") {
//         toast.success("Plan deactivated successfully ✅");
//       }

//       setPlans((prevPlans) =>
//         prevPlans
//           .map((plan) => {
//             if (plan._id === planId) {
//               if (action === "delete") return null;
//               return {
//                 ...plan,
//                 isActive: action === "activate",
//                 status: action === "activate" ? "active" : "deactivated",
//               };
//             }
//             return plan;
//           })
//           .filter(Boolean)
//       );
//     } else {
//       toast.error(res?.message || "Something went wrong ❌");
//     }

//     setSelectedPlanId(null);
//   } catch (err) {
//     const errorMessage =
//       err?.response?.data?.message || `Failed to ${action} plan`;
//     toast.error(errorMessage);
//   }
// };

// const handleImageChange = async (e, planId) => {
//   const file = e.target.files[0];
//   if (!file) return;

//   const formData = new FormData();
//   formData.append("image", file);

//   try {
//     toast.loading("Uploading image...");
//     const res = await apiPost(`/owner/mess/plan/update/image/${planId}`, formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });

//     if (res?.success) {
//       toast.dismiss();
//       toast.success(res.message || "Image updated ✅");

//       // Update state with new image
//       setPlans((prev) =>
//         prev.map((plan) =>
//           plan._id === planId
//             ? { ...plan, imageUrl: `${res.data?.imageUrl}?t=${Date.now()}` }
//             : plan
//         )
//       );
//     } else {
//       toast.dismiss();
//       toast.error(res?.message || "Failed to update image ❌");
//     }
//   } catch (err) {
//     toast.dismiss();
//     toast.error("Error uploading image ❌");
//   }
// };
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (
//         optionsRef.current &&
//         !optionsRef.current.contains(event.target)
//       ) {
//         setSelectedPlanId(null); // close if click is outside
//       }
//     }

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   useEffect(() => {
//     fetchPlans();
//   }, [messId]);

//   // Sorting logic
//   let sortedPlans = [...plans];
//   if (sortType === 'priceAsc') {
//     sortedPlans.sort((a, b) => a.price - b.price);
//   } else if (sortType === 'priceDesc') {
//     sortedPlans.sort((a, b) => b.price - a.price);
//   } else if (sortType === 'alpha') {
//     sortedPlans.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
//   }

//   return (
//     <div className="flex h-screen">
//       <Navbar />
//       {/* <div className="flex-1 p-6 overflow-y-auto bg-[#f9f4f0] min-h-screen"> */}
//       <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-gray-50 overflow-y-auto">
//         <OwnerHeader  />
//         <p className="text-2xl font-semibold  text-[#232325] mb-4">
//           Your Plans ({plans.length}),
//         </p>

//         {/* SORTING CONTROLS */}
//         <div className="flex  gap-2 mb-6 relative">
//           {/* 💰 Price Button */}


//           {/* ⇅ Sort Dropdown */}
//           <div className="relative">
//             <button
//               onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
//               className="border px-4 py-1 rounded-md bg-white shadow-sm cursor-pointer text-sm"
//             >
//               ⇅ Sort
//             </button>

//             {isSortDropdownOpen && (
//               <div className="absolute z-10 mt-2 w-52 bg-white border rounded-lg shadow-md p-2 text-sm">
//                 <button
//                   onClick={() => {
//                     if (isPriceClicked) setSortType('priceAsc');
//                     setIsSortDropdownOpen(false);
//                   }}
//                   disabled={!isPriceClicked}
//                   className={`block w-full text-left p-1 rounded ${
//                     isPriceClicked ? 'hover:bg-gray-100 cursor-pointer text-black' : 'text-gray-400 cursor-not-allowed'
//                   }`}
//                 >
//                   🔼 Price Ascending
//                 </button>
//                 <button
//                   onClick={() => {
//                     if (isPriceClicked) setSortType('priceDesc');
//                     setIsSortDropdownOpen(false);
//                   }}
//                   disabled={!isPriceClicked}
//                   className={`block w-full text-left p-1 rounded ${
//                     isPriceClicked ? 'hover:bg-gray-100 cursor-pointer text-black' : 'text-gray-400 cursor-not-allowed'
//                   }`}
//                 >
//                   🔽 Price Descending
//                 </button>
//                 <button
//                   onClick={() => {
//                     setSortType('alpha');
//                     setIsSortDropdownOpen(false);
//                   }}
//                   className="block w-full text-left cursor-pointer hover:bg-gray-100 p-1 rounded"
//                 >
//                   🔤 Alphabetical (Name)
//                 </button>
//               </div>
//             )}
//           </div>
//                     <button
//             onClick={() => setIsPriceClicked(true)}
//             className="border px-4 py-1 rounded-md cursor-pointer bg-white shadow-sm text-sm"
//           >
//             💰 Price
//           </button>

//           {/* UI Placeholders */}
//           <button className="border px-4 py-1 rounded-md bg-white shadow-sm text-sm text-gray-400 cursor-not-allowed">
//             Popularity
//           </button>
//           <button className="border px-4 py-1 rounded-md bg-white shadow-sm text-sm text-gray-400 cursor-not-allowed">
//             Date Added +
//           </button>
//         </div>

//         {isLoading ? (
//           <div className="text-center text-gray-500">Loading plans...</div>
//         ) : sortedPlans.length === 0 ? (
//           <div className="text-center">
//             <img src={planIllustration} className="w-40 h-40 mx-auto mb-1" />
//             <p className="text-orange-600 text-xl font-bold">NO PLANS CREATED</p>
//             <p className="text-sm">Let's create a plan to get started.</p>
//             <button
//               onClick={() => navigate('/add-plan')}
//               className="bg-orange-500 cursor-pointer text-white mt-2 md:mt-24 w-1/2 py-3 rounded-xl"
//             >
//               Create New Plan
//             </button>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
//             {sortedPlans.map((plan) => {
//               const isSelected = selectedPlanId === plan._id;
//               const { image, ...planDataWithoutImage } = plan;

//               return (
// <div
//   key={plan._id}
//   className={`relative bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg ${
//     plan.isActive ? "" : "grayscale opacity-60"
//   }`}
// >
//   {/* IMAGE SECTION */}
//   <div className="relative w-full h-48">
//     <img
//       src={plan.imageUrl}
//       alt={plan.name}
//       className="w-full h-full object-cover"
//     />

//     {/* Hover Edit Overlay */}
//     <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 cursor-pointer transition">
//       <span className="text-white text-sm font-semibold px-3 py-1 border border-white rounded-lg">
//         Edit Image
//       </span>
//       <input
//         type="file"
//         accept="image/*"
//         className="hidden"
//         onChange={(e) => handleImageChange(e, plan._id)}
//       />
//     </label>
//   </div>

//   {/* PLAN DETAILS */}
//   <div className="p-4 flex flex-col gap-2">
//     <h3 className="text-lg font-bold text-gray-800">{plan.name}</h3>
//     <p className="text-sm text-gray-600 line-clamp-2">{plan.description}</p>

//     {/* Menu items */}
//     <div className="flex flex-wrap gap-2 mt-2">
//       {plan.menu?.map((item, idx) => (
//         <span
//           key={idx}
//           className="bg-orange-100 text-orange-600 text-xs font-medium px-2 py-1 rounded-full"
//         >
//           {item}
//         </span>
//       ))}
//     </div>

//     {/* Price + Duration + Tokens */}
//     <div className="mt-3 grid grid-cols-3 text-center text-sm">
//       <div>
//         <p className="text-gray-500">Price</p>
//         <p className="font-semibold text-black">₹ {plan.price}</p>
//       </div>
//       <div>
//         <p className="text-gray-500">Tokens</p>
//         <p className="font-semibold">{plan.totalTokens}</p>
//       </div>
//       <div>
//         <p className="text-gray-500">Duration</p>
//         <p className="font-semibold">{plan.durationDays} Days</p>
//       </div>
//       <div className="flex items-center gap-1 mt-2 text-sm text-gray-600">
//   <span className="text-blue-600">👥</span>
//   <span className="font-medium">{plan.usageCount}</span>
//   <span>Users</span>
// </div>
//     </div>

//     {/* Status */}
//     <p
//       className={`mt-2 text-sm font-medium ${
//         plan.isActive ? "text-green-600" : "text-red-500"
//       }`}
//     >
//       {plan.status}
//     </p>

   
//     {/* ACTION BUTTONS */}
// <div className="flex items-center justify-between gap-2 mt-3">
//   {/* ✅ Activate */}
// <button
//   onClick={() => handleAction("activate", plan._id)}
//   disabled={plan.isActive}
//   className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-full text-sm font-semibold transition-all duration-200
//     ${
//       plan.isActive
//         ? "border border-gray-300 text-gray-400 bg-gray-100 cursor-not-allowed"
//         : "bg-gradient-to-r from-emerald-500 to-green-600 cursor-pointer hover:from-emerald-600 hover:to-green-700 text-white shadow-md"
//     }`}
// >
//   <CheckCircle className="w-4 h-4" /> {/* 👈 chhota icon */}
//   Activate
// </button>


//   {/* ⏸ Deactivate */}
//   <button
//     onClick={() => handleAction("deactivate", plan._id)}
//     disabled={!plan.isActive}
//     className={`flex-1 py-2 rounded-full text-sm font-semibold transition-all duration-200
//       ${
//         !plan.isActive
//           ? "border border-gray-300 text-gray-400 bg-gray-100 cursor-not-allowed"
//           : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-md"
//       }`}
//   >
//     ⏸ Deactivate
//   </button>

//   {/* 🗑 Delete */}
//   <button
//     onClick={() => handleAction("delete", plan._id)}
//     className="p-2 rounded-md hover:bg-red-100 cursor-pointer text-red-600 transition"
//     title="Delete Plan"
//   >
//     <Trash2 className="w-5 h-5" />
//   </button>
// </div>

//   </div>
// </div>
//               );
//             })}
//           </div>
//         )}
  
//       </div>
//     </div>
//   );
// };

// export default Plans;



import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../layouts/Navbar';
import OwnerHeader from './ownerHeader';
import { apiGet, apiPost } from '../services/api';
import storage from '../utils/storage';
import { toast } from "react-hot-toast";
import planIllustration from '../assets/clipboard.png.png';
import { CheckCircle, Trash2 } from "lucide-react";

const OwnerPlans = () => {
  const [plans, setPlans] = useState([]);
  const [selectedPlanId, setSelectedPlanId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const messId = storage.getItem('messId');
  const optionsRef = useRef(null);

  const [sortType, setSortType] = useState(null); 
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [isPriceClicked, setIsPriceClicked] = useState(false);

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
        <div className="flex gap-2 mb-6 relative">
          <div className="relative">
            <button
              onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
              className="border px-4 py-1 rounded-md bg-white shadow-sm cursor-pointer text-sm"
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
                    <PlanCard key={plan._id} plan={plan} handleAction={handleAction} handleImageChange={handleImageChange} />
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
                    <PlanCard key={plan._id} plan={plan} handleAction={handleAction} handleImageChange={handleImageChange} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const PlanCard = ({ plan, handleAction, handleImageChange }) => (
  <div>
  <div className={`relative bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 ${plan.isActive ? "" : "grayscale opacity-80"}`}>
    <div className="relative w-full h-48">
      <img src={plan.imageUrl} alt={plan.name} className="w-full h-full object-cover" />
      <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 cursor-pointer transition">
        <span className="text-white text-sm font-semibold px-3 py-1 border border-white rounded-lg">Edit Image</span>
        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageChange(e, plan._id)} />
      </label>
    </div>

    <div className="p-4 flex flex-col gap-2">
      <h3 className="text-lg font-bold text-gray-800">{plan.name}</h3>
      <p className="text-sm text-gray-600 line-clamp-2">{plan.description}</p>
      <div className="flex flex-wrap gap-2 mt-2">
        {plan.menu?.map((item, idx) => (
          <span key={idx} className="bg-orange-100 text-orange-600 text-xs font-medium px-2 py-1 rounded-full">{item}</span>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-3 text-center text-sm">
        <div><p className="text-gray-500">Price</p><p className="font-semibold text-black">₹ {plan.price}</p></div>
        <div><p className="text-gray-500">Tokens</p><p className="font-semibold">{plan.totalTokens}</p></div>
        <div><p className="text-gray-500">Duration</p><p className="font-semibold">{plan.durationDays} Days</p></div>
        {/* <div className="flex items-center gap-1 mt-2 text-sm text-gray-600">
          <span className="text-blue-600">👥</span> <span className="font-medium">{plan.usageCount}</span> <span>Users</span>
        </div> */}
        <div className="flex items-center gap-1 mt-2 text-sm text-gray-600">
  <span className="text-blue-600">👥</span>
  <span className="font-medium">{plan.usageCount}</span>
  <span>Active Users</span>
</div>

      </div>
      <p className={`mt-2 text-sm font-medium ${plan.isActive ? "text-green-600" : "text-red-500"}`}>{plan.status}</p>
  </div>
    </div>

      <div className="flex items-center justify-between gap-2 mt-3">
        <button onClick={() => handleAction("activate", plan._id)} disabled={plan.isActive} className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${plan.isActive ? "border border-gray-300 text-gray-400 bg-gray-100 cursor-not-allowed" : "bg-gradient-to-r from-emerald-500 to-green-600 cursor-pointer hover:from-emerald-600 hover:to-green-700 text-white shadow-md"}`}><CheckCircle className="w-4 h-4" /> Activate</button>
        <button onClick={() => handleAction("deactivate", plan._id)} disabled={!plan.isActive} className={`flex-1 py-2 rounded-full text-sm cursor-pointer font-semibold transition-all duration-200 ${!plan.isActive ? "border border-gray-300 text-gray-400 bg-gray-100 cursor-not-allowed" : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-md"}`}>⏸ Deactivate</button>
        <button onClick={() => handleAction("delete", plan._id)} className="p-2 rounded-md hover:bg-red-100 cursor-pointer text-red-600 transition" title="Delete Plan"><Trash2 className="w-5 h-5" /></button>
      </div>
  </div>
);

export default OwnerPlans;
