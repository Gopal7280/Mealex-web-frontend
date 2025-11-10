
import React, { useEffect, useState } from 'react';
import Navbar2 from '../layouts/Navbar';
import CustomerHeader from './ownerHeader';
import { apiGet ,apiPost } from '../services/api';
import storage from '../utils/storage';
import { CheckCircle, XCircle } from "lucide-react";
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { RefreshCw } from "lucide-react"; // 👈 add this import at the top


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
    // <div className="flex h-screen">
<div className="flex flex-col md:flex-row h-screen">

    <Navbar2 />
      <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-gray-50 overflow-y-auto">
        <CustomerHeader />

        {/* Entire card container */}
        <div className="bg-white p-4 rounded-2xl shadow">

         
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
    onClick={() => navigate('/own/purchased-plans')}
    className={`cursor-pointer capitalize text-md font-medium transition-opacity ${
      currentPath === '/own/purchased-plans' ? 'opacity-100 text-orange-600 border-b-2 border-orange-500' : 'opacity-50 hover:opacity-80'
    }`}
  >
    Plans Requests
  </button>
</div>



          {/* Filters */}
          {/* <div className="flex gap-4 mb-4 items-center">
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
            
          </div> */}
          {/* Filters + Refresh */}
{/* <div className="flex gap-4 mb-4 cursor-pointer items-center"> */}
<div className="flex flex-wrap gap-4 mb-4 items-center">

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

  {/* 🔄 Refresh button */}
  <button
    onClick={() => fetchPlans(page, statusFilter)}
    className="ml-auto flex items-cente cursor-pointer gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition text-sm font-medium"
    title="Refresh"
  >
    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-orange-500' : ''}`} />
    Refresh
  </button>
</div>


          {/* Plans */}
          <div className="space-y-4">
            {loading && <p className="text-gray-500">Loading plans...</p>}
            {!loading && plans.length === 0 && <p className="text-gray-500">No plans found</p>}

            {plans.map((plan) => (
              <div
                key={plan.requestId}
                // className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 flex flex-col md:flex-row md:items-center gap-4 border border-gray-100"
  className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 flex flex-col md:flex-row md:items-center gap-4 border border-gray-100 w-full"

>
                {/* Plan Section */}
                <div className="flex gap-3 flex-1 items-start">
                  <img
                    src={plan.planImageUrl}
                    alt={plan.planName}
                    // className="w-20 h-20 md:w-28 md:h-28 object-cover rounded-lg shadow-sm border border-gray-200"
className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 object-cover rounded-lg shadow-sm border border-gray-200"

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
                      {/* <p className="text-gray-500 col-span-2 truncate">🍽 {plan.planMenu.join(', ')}</p> */}
                 <p className="text-gray-500 col-span-2 break-words whitespace-normal">🍽 {plan.planMenu.join(', ')}</p>

                    </div>
                  </div>
                </div>

                {/* Customer Section */}
                {/* <div className="flex-1 text-sm border-t md:border-t-0 md:border-l border-gray-200 pt-3 md:pt-0 md:pl-4"> */}
<div className="flex-1 text-sm border-t md:border-t-0 md:border-l border-gray-200 pt-3 md:pt-0 md:pl-4 w-full">

                  <p className="text-gray-700 font-semibold mb-2">👤 Customer</p>
                  <div className="space-y-1">
                    <p><span className="font-medium">Name:</span> {plan.customerName}</p>
                    {/* <p><span className="font-medium">Email:</span> {plan.CustomerProfile?.contactEmail}</p> */}
<p className="break-all">
  <span className="font-medium">Email:</span> {plan.CustomerProfile?.contactEmail}
</p>
                    <p><span className="font-medium">Contact:</span> {plan.CustomerProfile?.contactNumber}</p>
                    <p><span className="font-medium">Mess:</span> {plan.MessProfile?.messName}</p>
                  </div>
                  <p className="text-gray-400 text-xs mt-2">Requested At: {new Date(plan.createdAt).toLocaleString()}</p>
                </div>

        
                {/* Actions */}
{plan.status === 'pending' && (
  // <div className="flex flex-row md:flex-col gap-2 justify-center items-center">
<div className="flex flex-col sm:flex-row md:flex-col gap-2 w-full md:w-auto justify-center items-stretch md:items-center">

  <p className="text-gray-600 text-xs font-medium md:mb-1">Actions</p>
    <button
      className="bg-gradient-to-r from-green-500 to-green-600 cursor-pointer hover:from-green-600 hover:to-green-700 text-white px-3 md:px-4 py-1.5 rounded-lg text-xs md:text-sm font-medium shadow transition flex items-center gap-1"
      onClick={() => handlePlanDecision(plan.requestId, 'accepted')}
    >
      <CheckCircle className="w-4 h-4" /> Confirm
    </button>
    <button
      className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 cursor-pointer hover:to-red-700 text-white px-3 md:px-4 py-1.5 rounded-lg text-xs md:text-sm font-medium shadow transition flex items-center gap-1"
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
              className="bg-gray-200 text-gray-700 cursor-pointer px-4 py-2 rounded disabled:opacity-50"
              disabled={page <= 1}
              onClick={() => fetchPlans(page - 1, statusFilter)}
            >
              Previous
            </button>
            <button
              className="px-4 py-2 bg-orange-500 cursor-pointer text-white rounded disabled:opacity-50"
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
