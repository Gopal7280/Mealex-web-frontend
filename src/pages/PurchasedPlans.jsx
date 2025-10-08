// // src/components/PurchasedPlans.jsx
// import React, { useEffect, useState } from 'react';
// import Navbar2 from '../layouts/Navbar';
// import CustomerHeader from './ownerHeader';
// import { apiGet } from '../services/api';
// import storage from '../utils/storage';
// import { useNavigate } from 'react-router-dom';
// import { CheckSquare, Square } from 'lucide-react';
// import toast from 'react-hot-toast';

// const PurchasedPlans = () => {
//   const navigate = useNavigate();
//   const messId = storage.getItem('messId');

//   const [plans, setPlans] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalPlans, setTotalPlans] = useState(0);
//   const [statusFilter, setStatusFilter] = useState('pending');
//   const [loading, setLoading] = useState(false);

//   const fetchPlans = async (pageNumber = 1, status = 'pending') => {
//     if (!messId) return;
//     setLoading(true);
//     try {
//       const res = await apiGet(
//         `/owner/mess/${messId}/plan/issue/requests?page=${pageNumber}&limit=10&status=${status}`
//       );
//       console.log(res);
//       if (res.success) {
//         setPlans(res.data || []);
//         setPage(pageNumber);
//         setTotalPlans(res.pagination?.total || res.data?.length || 0);
//         setTotalPages(Math.ceil((res.pagination?.total || res.data?.length || 0)/10));
//       } else {
//         toast.error(res.message || 'Failed to fetch plans');
//       }
//     } catch (err) {
//       toast.error(err?.response?.data?.message || 'Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPlans(1, statusFilter);
//   }, [statusFilter]);

//   return (
//     <div className="flex h-screen">
//       <Navbar2 />
//       <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-gray-50 overflow-y-auto">
//         <CustomerHeader />

//         {/* Tabs */}
//         <div className="flex gap-4 mb-6 border-b border-gray-200">
//           <button
//             className="px-4 py-2 -mb-1 font-medium text-gray-500 hover:text-orange-500"
//             onClick={() => navigate('/orders')}
//           >
//             Orders
//           </button>
//           <button
//             className="px-4 py-2 -mb-1 font-medium text-gray-700 border-b-2 border-orange-500"
//           >
//             Purchased Plans
//           </button>
//         </div>

//         {/* Filters */}
//         <div className="flex gap-4 mb-4">
//           <select
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//             className="border border-gray-200 rounded px-2 py-1 cursor-pointer"
//           >
//             <option value="pending">Pending</option>
//             <option value="accepted">Accepted</option>
//             <option value="rejected">Rejected</option>
//           </select>
//           <span className="text-gray-600 font-medium mt-1">
//             Total: {totalPlans}
//           </span>
//         </div>

//         {/* Plans Table */}
//         <div className="space-y-4">
//           {loading && <p className="text-gray-500">Loading plans...</p>}
//           {!loading && plans.length === 0 && (
//             <p className="text-gray-500">No plans found</p>
//           )}

//           {plans.map((plan) => (
//             <div
//               key={plan._id || plan.id}
//               className="bg-white border border-orange-400 rounded-lg p-4 flex flex-col md:flex-row justify-between items-center gap-2"
//             >
//               <div className="flex-1">
//                 <p className="text-sm font-bold text-orange-600">
//                   {plan.customerName}
//                 </p>
//                 <p className="text-gray-700 text-sm">
//                   Plan: {plan.planName || plan.customerPlanName}
//                 </p>
//                 <p className="text-gray-700 text-sm">
//                   Tokens: {plan.tokenCount || plan.tokens || 0}
//                 </p>
//               </div>
//               <div className="flex items-center gap-2">
//                 <span
//                   className={`px-3 py-1 rounded text-sm font-semibold ${
//                     plan.status === 'pending'
//                       ? 'bg-yellow-100 text-yellow-700'
//                       : plan.status === 'accepted'
//                       ? 'bg-green-100 text-green-700'
//                       : 'bg-red-100 text-red-700'
//                   }`}
//                 >
//                   {plan.status?.toUpperCase()}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Pagination */}
//         <div className="flex justify-between mt-4">
//           <button
//             className="bg-gray-200 cursor-pointer px-3 py-1 rounded disabled:opacity-50"
//             disabled={page <= 1}
//             onClick={() => fetchPlans(page - 1, statusFilter)}
//           >
//             Previous
//           </button>
//           <button
//             className="bg-gray-200 cursor-pointer px-3 py-1 rounded disabled:opacity-50"
//             disabled={page >= totalPages}
//             onClick={() => fetchPlans(page + 1, statusFilter)}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PurchasedPlans;


// import React, { useEffect, useState } from 'react';
// import Navbar2 from '../layouts/Navbar';
// import CustomerHeader from './ownerHeader';
// import { apiGet } from '../services/api';
// import storage from '../utils/storage';
// import { CheckCircle, XCircle } from "lucide-react";
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import {  useLocation } from 'react-router-dom';


// const PurchasedPlans = () => {
//     const navigate = useNavigate();
//   const location = useLocation();
//   const currentPath = location.pathname;

//   const messId = storage.getItem('messId');

//   const [plans, setPlans] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalPlans, setTotalPlans] = useState(0);
//   const [statusFilter, setStatusFilter] = useState('pending');
//   const [loading, setLoading] = useState(false);

//   const fetchPlans = async (pageNumber = 1, status = 'pending') => {
//     if (!messId) return;
//     setLoading(true);
//     try {
//       const res = await apiGet(
//         `/owner/mess/${messId}/plan/issue/requests?page=${pageNumber}&limit=10&status=${status}`
//       );
//       console.log(res);
//       if (res.success) {
//         setPlans(res.data || []);
//         setPage(pageNumber);
//         setTotalPlans(res.pagination?.totalRecords || res.data?.length || 0);
//         setTotalPages(res.pagination?.totalPages || 1);
//       } else {
//         toast.error(res.message || 'Failed to fetch plans');
//       }
//     } catch (err) {
//       toast.error(err?.response?.data?.message || 'Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPlans(1, statusFilter);
//   }, [statusFilter]);

//   return (
//     <div className="flex h-screen">
//       <Navbar2 />
//       <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-gray-50 overflow-y-auto">
//         <CustomerHeader />

//         {/* Tabs */}
//         {/* <div className="flex gap-4 mb-6 border-b border-gray-200">
//           <button
//             className="px-4 py-2 -mb-1 font-medium text-gray-500 hover:text-orange-500"
//             onClick={() => navigate('/orders')}
//           >
//             Orders
//           </button>
//           <button
//             className="px-4 py-2 -mb-1 font-medium text-gray-700 border-b-2 border-orange-500"
//           >
//             Purchased Plans
//           </button>
//         </div> */}
//                   {/* <div className="flex gap-6 bg-white mb-6 border-b pb-2">
//               <button onClick={() => navigate('/history')} className={`cursor-pointer capitalize text-md font-medium transition-opacity ${currentPath === '/history' ? 'opacity-100 text-orange-600 border-b-2 border-orange-500' : 'opacity-50 hover:opacity-80'}`}>
//                 Transactions History 
//               </button>
//               <button onClick={() => navigate('/owner/history/plans')} className={` cursor-pointer capitalize text-md font-medium transition-opacity ${currentPath === '/owner/history/plans' ? 'opacity-100 text-orange-600 border-b-2 border-orange-500' : 'opacity-50 hover:opacity-80'}`}>
//                 Plan History
//               </button>
//               <button onClick={() => navigate('/owner/purchased-plans')} className={`cursor-pointer capitalize text-md font-medium transition-opacity ${currentPath === '/owner/history/account' ? 'opacity-100 text-orange-600 border-b-2 border-orange-500' : 'opacity-50 hover:opacity-80'}`}>
//             Plans Requests
//               </button>
//             </div> */}
//             <div className="flex gap-6 bg-white mb-6 border-b pb-2">
//   <button
//     onClick={() => navigate('/history')}
//     className={`cursor-pointer capitalize text-md font-medium transition-opacity ${
//       currentPath === '/history'
//         ? 'opacity-100 text-orange-600 border-b-2 border-orange-500'
//         : 'opacity-50 hover:opacity-80'
//     }`}
//   >
//     Transactions History
//   </button>

//   <button
//     onClick={() => navigate('/owner/history/plans')}
//     className={`cursor-pointer capitalize text-md font-medium transition-opacity ${
//       currentPath === '/owner/history/plans'
//         ? 'opacity-100 text-orange-600 border-b-2 border-orange-500'
//         : 'opacity-50 hover:opacity-80'
//     }`}
//   >
//     Plan History
//   </button>

//   <button
//     onClick={() => navigate('/owner/purchased-plans')}
//     className={`cursor-pointer capitalize text-md font-medium transition-opacity ${
//       currentPath === '/owner/purchased-plans'
//         ? 'opacity-100 text-orange-600 border-b-2 border-orange-500'
//         : 'opacity-50 hover:opacity-80'
//     }`}
//   >
//     Plans Requests
//   </button>
// </div>


//         {/* Filters */}
//         <div className="flex gap-4 mb-4">
//           <select
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//             className="border border-gray-200 rounded px-2 py-1 cursor-pointer"
//           >
//             <option value="pending">Pending</option>
//             <option value="accepted">Accepted</option>
//             <option value="rejected">Rejected</option>
//           </select>
//           <span className="text-gray-600 font-medium mt-1">
//             Total: {totalPlans}
//           </span>
//         </div>

//         {/* Plans */}
//         <div className="space-y-4">
//           {loading && <p className="text-gray-500">Loading plans...</p>}
//           {!loading && plans.length === 0 && <p className="text-gray-500">No plans found</p>}

//         {plans.map((plan) => (

// <div
//   key={plan.requestId}
//   className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 flex flex-col md:flex-row md:items-center gap-4 border border-gray-100"
// >
//   {/* Plan Section */}
//   <div className="flex gap-3 flex-1 items-start">
//     <img
//       src={plan.planImageUrl}
//       alt={plan.planName}
//       className="w-20 h-20 md:w-28 md:h-28 object-cover rounded-lg shadow-sm border border-gray-200"
//     />
//     <div className="flex-1 flex flex-col gap-1">
//       {/* Plan Name + Status */}
//       <div className="flex items-center gap-2">
//         <h3 className="text-orange-600 font-bold text-base md:text-lg">
//           {plan.planName}
//         </h3>
//         <span
//           className={`px-2 py-0.5 rounded-full text-[10px] md:text-xs font-semibold ${
//             plan.status === 'pending'
//               ? 'bg-yellow-100 text-yellow-700 border border-yellow-300'
//               : plan.status === 'accepted'
//               ? 'bg-green-100 text-green-700 border border-green-300'
//               : 'bg-red-100 text-red-700 border border-red-300'
//           }`}
//         >
//           {plan.status.toUpperCase()}
//         </span>
//       </div>

//       {/* Description */}
//       <p className="text-gray-600 text-xs md:text-sm line-clamp-2">
//         {plan.planDescription}
//       </p>

//       {/* Info Grid */}
//       <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs md:text-sm mt-2">
//         <p className="text-gray-500">
//           💰 <span className="font-semibold text-black">₹{plan.planPrice}</span>
//         </p>
//         <p className="text-gray-500">
//           📅 <span className="font-semibold">{plan.planDurationDays}d</span>
//         </p>
//         <p className="text-gray-500">
//           🎟 <span className="font-semibold">{plan.planTotalTokens}</span>
//         </p>
//         <p className="text-gray-500 col-span-2 truncate">
//           🍽 {plan.planMenu.join(', ')}
//         </p>
//       </div>
//     </div>
//   </div>

//   {/* Customer Section */}
//   {/* <div className="hidden md:block md:flex-1 text-sm">
//     <p className="text-gray-700 font-semibold mb-2">👤 Customer</p>
//     <div className="space-y-1">
//       <p><span className="font-medium">Name:</span> {plan.customerName}</p>
//       <p><span className="font-medium">Email:</span> {plan.CustomerProfile?.contactEmail}</p>
//       <p><span className="font-medium">Contact:</span> {plan.CustomerProfile?.contactNumber}</p>
//       <p><span className="font-medium">Mess:</span> {plan.MessProfile?.messName}</p>
//     </div>
//     <p className="text-gray-400 text-xs mt-2">
//       {new Date(plan.createdAt).toLocaleString()}
//     </p>
//   </div> */}
//   {/* Customer Section */}
// <div className="flex-1 text-sm border-t md:border-t-0 md:border-l border-gray-200 pt-3 md:pt-0 md:pl-4">
//   <p className="text-gray-700 font-semibold mb-2">👤 Customer</p>
//   <div className="space-y-1">
//     <p><span className="font-medium">Name:</span> {plan.customerName}</p>
//     <p><span className="font-medium">Email:</span> {plan.CustomerProfile?.contactEmail}</p>
//     <p><span className="font-medium">Contact:</span> {plan.CustomerProfile?.contactNumber}</p>
//     <p><span className="font-medium">Mess:</span> {plan.MessProfile?.messName}</p>
//   </div>
//   <p className="text-gray-400 text-xs mt-2">
//     Requested At: {new Date(plan.createdAt).toLocaleString()}
//   </p>
// </div>


//   {/* Actions */}
//   {plan.status === 'pending' && (
//     <div className="flex flex-row md:flex-col gap-2 justify-center items-center">
//       <p className="text-gray-600 text-xs font-medium md:mb-1">Actions</p>
//       {/* <button className="bg-green-500 hover:bg-green-600 text-white px-3 md:px-4 py-1.5 rounded-lg text-xs md:text-sm font-medium shadow transition">
//         ✅ Accept
//       </button>
//       <button className="bg-red-500 hover:bg-red-600 text-white px-3 md:px-4 py-1.5 rounded-lg text-xs md:text-sm font-medium shadow transition">
//         ❌ Reject
//       </button> */}
//       <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-3 md:px-4 py-1.5 rounded-lg text-xs md:text-sm font-medium shadow transition flex items-center gap-1">
//   <CheckCircle className="w-4 h-4" /> Accept
// </button>
// <button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-3 md:px-4 py-1.5 rounded-lg text-xs md:text-sm font-medium shadow transition flex items-center gap-1">
//   <XCircle className="w-4 h-4" /> Reject
// </button>

//     </div>
//   )}
// </div>


// ))}

//         </div>

//         {/* Pagination */}
//         <div className="flex justify-between mt-4">
//           <button
//             className="bg-gray-200 cursor-pointer px-3 py-1 rounded disabled:opacity-50"
//             disabled={page <= 1}
//             onClick={() => fetchPlans(page - 1, statusFilter)}
//           >
//             Previous
//           </button>
//           <button
//             className="bg-gray-200 cursor-pointer px-3 py-1 rounded disabled:opacity-50"
//             disabled={page >= totalPages}
//             onClick={() => fetchPlans(page + 1, statusFilter)}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PurchasedPlans;




import React, { useEffect, useState } from 'react';
import Navbar2 from '../layouts/Navbar';
import CustomerHeader from './ownerHeader';
import { apiGet ,apiPost } from '../services/api';
import storage from '../utils/storage';
import { CheckCircle, XCircle } from "lucide-react";
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

const PurchasedPlans = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const messId = storage.getItem('messId');

  const [plans, setPlans] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPlans, setTotalPlans] = useState(0);
  const [statusFilter, setStatusFilter] = useState('all'); // ✅ default All
  const [loading, setLoading] = useState(false);

  const fetchPlans = async (pageNumber = 1, status = 'all') => {
    if (!messId) return;
    setLoading(true);
    try {
      const res = await apiGet(
        `/owner/mess/${messId}/plan/issue/requests?page=${pageNumber}&limit=10&status=${status}`
      );
      if (res.success) {
        setPlans(res.data || []);
        setPage(pageNumber);
        setTotalPlans(res.pagination?.totalRecords || res.data?.length || 0);
        setTotalPages(res.pagination?.totalPages || 1);
      } else {
        toast.error(res.message || 'Failed to fetch plans');
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans(1, statusFilter);
  }, [statusFilter]);

//   const handlePlanDecision = async (requestId, decision) => {
//   if (!messId) return;
//   try {
//     const res = await apiGet(
//       `/owner/mess/plan/issue/${decision}/${requestId}`
//     );
//     console.log(res);
//     if (res.success) {
//       toast.success(`Plan request ${decision}ed successfully!`);
//       // Refresh the list to reflect new status
//       fetchPlans(page, statusFilter);
//     } else {
//       toast.error(res.message || `Failed to ${decision} plan request`);
//     }
//   } catch (err) {
//     toast.error(err?.response?.data?.message || `Something went wrong`);
//   }
// };

const handlePlanDecision = async (requestId, decision) => {
  if (!messId) return;

  // If rejecting, you might want to prompt for reason
  let rejectionReason = '';
  if (decision === 'rejected') {
    rejectionReason = prompt("Enter reason for rejection (optional):", "");
  }

  try {
    const res = await apiPost('/owner/mess/plan/issue/request/decision', {
      requestId,
      action: decision,
      rejectionReason: rejectionReason || undefined
    });

    console.log(res);

    if (res.success) {
      toast.success(`Plan request ${decision}ed successfully!`);
      fetchPlans(page, statusFilter); // Refresh list
    } else {
      toast.error(res.message || `Failed to ${decision} plan request`);
    }
  } catch (err) {
    toast.error(err?.response?.data?.message || `Something went wrong`);
  }
};



  return (
    <div className="flex h-screen">
      <Navbar2 />
      <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-gray-50 overflow-y-auto">
        <CustomerHeader />

        {/* Entire card container */}
        <div className="bg-white p-4 rounded-2xl shadow">

          {/* Tabs */}
          {/* <div className="flex gap-6 mb-6 border-b pb-2">
            <button
              onClick={() => navigate('/history')}
              className={`cursor-pointer capitalize text-md font-medium transition-opacity ${
                currentPath === '/history'
                  ? 'opacity-100 text-orange-600 border-b-2 border-orange-500'
                  : 'opacity-50 hover:opacity-80'
              }`}
            >
              Transactions History
            </button>

            <button
              onClick={() => navigate('/owner/history/plans')}
              className={`cursor-pointer capitalize text-md font-medium transition-opacity ${
                currentPath === '/owner/history/plans'
                  ? 'opacity-100 text-orange-600 border-b-2 border-orange-500'
                  : 'opacity-50 hover:opacity-80'
              }`}
            >
              Plan History
            </button>

            <button
              onClick={() => navigate('/owner/purchased-plans')}
              className={`cursor-pointer capitalize text-md font-medium transition-opacity ${
                currentPath === '/owner/purchased-plans'
                  ? 'opacity-100 text-orange-600 border-b-2 border-orange-500'
                  : 'opacity-50 hover:opacity-80'
              }`}
            >
              Plans Requests
            </button>
          </div> */}
          {/* <div className="flex gap-6 mb-6 border-b pb-2">
  <button
    onClick={() => navigate('/orders')}
    className={`cursor-pointer capitalize text-md font-medium transition-opacity ${
      currentPath === '/owner/orders' ? 'opacity-100 text-orange-600 border-b-2 border-orange-500' : 'opacity-50 hover:opacity-80'
    }`}
  >
    Orders ({orders.length})
  </button>

  <button
    onClick={() => navigate('/owner/purchased-plans')}
    className={`cursor-pointer capitalize text-md font-medium transition-opacity ${
      currentPath === '/owner/purchased-plans' ? 'opacity-100 text-orange-600 border-b-2 border-orange-500' : 'opacity-50 hover:opacity-80'
    }`}
  >
    Plans Requests
  </button>
</div> */}

<div className="flex gap-6 mb-6 border-b pb-2">
  <button
    onClick={() => navigate('/orders')}
    className={`cursor-pointer capitalize text-md font-medium transition-opacity ${
      currentPath === '/orders' ? 'opacity-100 text-orange-600 border-b-2 border-orange-500' : 'opacity-50 hover:opacity-80'
    }`}
  >
    Orders
  </button>

  <button
    onClick={() => navigate('/owner/purchased-plans')}
    className={`cursor-pointer capitalize text-md font-medium transition-opacity ${
      currentPath === '/owner/purchased-plans' ? 'opacity-100 text-orange-600 border-b-2 border-orange-500' : 'opacity-50 hover:opacity-80'
    }`}
  >
    Plans Requests
  </button>
</div>



          {/* Filters */}
          <div className="flex gap-4 mb-4 items-center">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-200 rounded px-2 py-1 cursor-pointer"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
            <span className="text-gray-600 font-medium mt-1">
              Total: {totalPlans}
            </span>
          </div>

          {/* Plans */}
          <div className="space-y-4">
            {loading && <p className="text-gray-500">Loading plans...</p>}
            {!loading && plans.length === 0 && <p className="text-gray-500">No plans found</p>}

            {plans.map((plan) => (
              <div
                key={plan.requestId}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 flex flex-col md:flex-row md:items-center gap-4 border border-gray-100"
              >
                {/* Plan Section */}
                <div className="flex gap-3 flex-1 items-start">
                  <img
                    src={plan.planImageUrl}
                    alt={plan.planName}
                    className="w-20 h-20 md:w-28 md:h-28 object-cover rounded-lg shadow-sm border border-gray-200"
                  />
                  <div className="flex-1 flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-orange-600 font-bold text-base md:text-lg">{plan.planName}</h3>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] md:text-xs font-semibold ${
                          plan.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-700 border border-yellow-300'
                            : plan.status === 'accepted'
                            ? 'bg-green-100 text-green-700 border border-green-300'
                            : 'bg-red-100 text-red-700 border border-red-300'
                        }`}
                      >
                        {plan.status.toUpperCase()}
                      </span>
                    </div>

                    <p className="text-gray-600 text-xs md:text-sm line-clamp-2">{plan.planDescription}</p>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs md:text-sm mt-2">
                      <p className="text-gray-500">💰 <span className="font-semibold text-black">₹{plan.planPrice}</span></p>
                      <p className="text-gray-500">📅 <span className="font-semibold">{plan.planDurationDays}d</span></p>
                      <p className="text-gray-500">🎟 <span className="font-semibold">{plan.planTotalTokens}</span></p>
                      <p className="text-gray-500 col-span-2 truncate">🍽 {plan.planMenu.join(', ')}</p>
                    </div>
                  </div>
                </div>

                {/* Customer Section */}
                <div className="flex-1 text-sm border-t md:border-t-0 md:border-l border-gray-200 pt-3 md:pt-0 md:pl-4">
                  <p className="text-gray-700 font-semibold mb-2">👤 Customer</p>
                  <div className="space-y-1">
                    <p><span className="font-medium">Name:</span> {plan.customerName}</p>
                    <p><span className="font-medium">Email:</span> {plan.CustomerProfile?.contactEmail}</p>
                    <p><span className="font-medium">Contact:</span> {plan.CustomerProfile?.contactNumber}</p>
                    <p><span className="font-medium">Mess:</span> {plan.MessProfile?.messName}</p>
                  </div>
                  <p className="text-gray-400 text-xs mt-2">Requested At: {new Date(plan.createdAt).toLocaleString()}</p>
                </div>

                {/* Actions */}
                {/* {plan.status === 'pending' && (
                  <div className="flex flex-row md:flex-col gap-2 justify-center items-center">
                    <p className="text-gray-600 text-xs font-medium md:mb-1">Actions</p>
                    <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-3 md:px-4 py-1.5 rounded-lg text-xs md:text-sm font-medium shadow transition flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" /> Accept
                    </button>
                    <button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-3 md:px-4 py-1.5 rounded-lg text-xs md:text-sm font-medium shadow transition flex items-center gap-1">
                      <XCircle className="w-4 h-4" /> Reject
                    </button>
                  </div>
                )} */}
                {/* Actions */}
{plan.status === 'pending' && (
  <div className="flex flex-row md:flex-col gap-2 justify-center items-center">
    <p className="text-gray-600 text-xs font-medium md:mb-1">Actions</p>
    <button
      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-3 md:px-4 py-1.5 rounded-lg text-xs md:text-sm font-medium shadow transition flex items-center gap-1"
      onClick={() => handlePlanDecision(plan.requestId, 'accepted')}
    >
      <CheckCircle className="w-4 h-4" /> Confirm
    </button>
    <button
      className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-3 md:px-4 py-1.5 rounded-lg text-xs md:text-sm font-medium shadow transition flex items-center gap-1"
      onClick={() => handlePlanDecision(plan.requestId, 'rejected')}
    >
      <XCircle className="w-4 h-4" /> Decline
    </button>
  </div>
)}

              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-between mt-4">
            <button
              className="bg-gray-200 cursor-pointer px-3 py-1 rounded disabled:opacity-50"
              disabled={page <= 1}
              onClick={() => fetchPlans(page - 1, statusFilter)}
            >
              Previous
            </button>
            <button
              className="bg-gray-200 cursor-pointer px-3 py-1 rounded disabled:opacity-50"
              disabled={page >= totalPages}
              onClick={() => fetchPlans(page + 1, statusFilter)}
            >
              Next
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PurchasedPlans;
