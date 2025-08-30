// import React from "react";
// import Navbar from "../layouts/Navbar";
// import OwnerHeader from "./ownerHeader";    
// import { useLocation, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import axios from 'axios';



// const PlanHistory = () => { 

//   const [transactions, setTransactions] = useState([]);
//   const [filter, setFilter] = useState('All');
//   const [pagination, setPagination] = useState({ limit: 10, offset: 0, hasMore: false });
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   const location = useLocation();
//     const currentPath = location.pathname;

//   const currentTab = location.pathname.split('/').pop(); // 'transactions', 'plans', 'account'

//   const token = localStorage.getItem('token');
//   const messId = localStorage.getItem('messId');

//   const fetchTransactions = async () => {
//     if (!token || !messId) {
//       console.error('❌ Token or Mess ID missing');
//       return;
//     }

//     setLoading(true);
//     try {
//       const url = `https://student.studentshub.fun/owner/mess/stats/transactions?limit=${pagination.limit}&offset=${pagination.offset}`;
//       const res = await axios.post(
//         url,
//         { messId },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       console.log('✅ API Success Response:', res?.data);

//       if (res.data.success) {
//         setTransactions(res.data.data);
//         setPagination(prev => ({
//           ...prev,
//           hasMore: res.data.pagination.hasMore,
//         }));
//       }
//     } catch (error) {
//       console.error('❌ Error fetching transactions:', error?.response?.data || error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTransactions();
//   }, [pagination.offset]);

//   const filteredTransactions = transactions.filter(t => {
//     if (filter === 'All') return true;
//     if (filter === 'Purchased') return t.type === 'transaction';
//     if (filter === 'Used') return t.type === 'submission';
//     return false;
//   });

//   const handleNext = () => {
//     if (pagination.hasMore) {
//       setPagination(prev => ({ ...prev, offset: prev.offset + prev.limit }));
//     }
//   };

//   const handlePrevious = () => {
//     if (pagination.offset >= pagination.limit) {
//       setPagination(prev => ({ ...prev, offset: prev.offset - prev.limit }));
//     }
//   };

//   return (
//     <div className="flex">
//       <Navbar />
//       <div className="flex-1 p-6 bg-gray-50 min-h-screen">
//         <OwnerHeader />

//            <div className="flex gap-6 bg-white mb-6 border-b pb-2">
//               <button onClick={() => navigate('/history')} className={`capitalize text-md font-medium transition-opacity ${currentPath === '/history' ? 'opacity-100 text-orange-600 border-b-2 border-orange-500' : 'opacity-50 hover:opacity-80'}`}>
//                 Transactions History 
//               </button>
//               <button onClick={() => navigate('/owner/history/plans')} className={`capitalize text-md font-medium transition-opacity ${currentPath === '/owner/history/plans' ? 'opacity-100 text-orange-600 border-b-2 border-orange-500' : 'opacity-50 hover:opacity-80'}`}>
//                 Plan History
//               </button>
//               <button onClick={() => navigate('/owner/history/account')} className={`capitalize text-md font-medium transition-opacity ${currentPath === '/owner/history/account' ? 'opacity-100 text-orange-600 border-b-2 border-orange-500' : 'opacity-50 hover:opacity-80'}`}>
//                 Account History
//               </button>
//             </div>

//         {/* Filters */}
//         <div className="flex space-x-4 my-4">
//           {['All', 'Purchased', 'Used'].map(f => (
//             <button
//               key={f}
//               onClick={() => setFilter(f)}
//               className={`px-4 py-1 rounded border ${
//                 filter === f ? 'bg-orange-500 text-white' : 'text-gray-700 border-gray-300'
//               }`}
//             >
//               {f}
//             </button>
//           ))}
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto bg-white rounded shadow">
//           <table className="min-w-full text-sm text-left text-gray-700">
//             <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
//               <tr>
//                 <th className="px-6 py-3">Plans</th>
//                 <th className="px-6 py-3">Tokens</th>
//                 <th className="px-6 py-3">Date</th>
//                 <th className="px-6 py-3">Time</th>
//                 <th className="px-6 py-3">Type</th>
//                 <th className="px-6 py-3">User</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="6" className="text-center py-6">Loading...</td>
//                 </tr>
//               ) : filteredTransactions.length === 0 ? (
//                 <tr>
//                   <td colSpan="6" className="text-center py-6 text-gray-500">No transactions found</td>
//                 </tr>
//               ) : (
//                 filteredTransactions.map((item, index) => (
//                   <tr key={index} className="border-b">
//                     <td className="px-6 py-4">{item.planName || item.planId || '—'}</td>
//                     <td className="px-6 py-4">
//                       {item.type === 'submission'
//                         ? item.submittedTokens?.length || 0
//                         : item.tokensPurchased || 0}
//                     </td>
//                     <td className="px-6 py-4">
//                       {item.time ? new Date(item.time).toLocaleDateString() : 'N/A'}
//                     </td>
//                     <td className="px-6 py-4">
//                       {item.time
//                         ? new Date(item.time).toLocaleTimeString([], {
//                             hour: '2-digit',
//                             minute: '2-digit',
//                           })
//                         : 'N/A'}
//                     </td>
//                     <td
//                       className={`px-6 py-4 font-semibold ${
//                         item.type === 'transaction' ? 'text-green-600' : 'text-red-500'
//                       }`}
//                     >
//                       {item.type}
//                     </td>
//                     <td className="px-6 py-4">
//                       {item.type === 'submission' ? item.submittedBy : item.transactionBy || '—'}
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <div className="flex justify-between mt-4">
//           <button
//             className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
//             disabled={pagination.offset === 0}
//             onClick={handlePrevious}
//           >
//             Previous
//           </button>
//           <button
//             className="px-4 py-2 bg-orange-500 text-white rounded disabled:opacity-50"
//             disabled={!pagination.hasMore}
//             onClick={handleNext}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );



// }


// export default PlanHistory;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../layouts/Navbar';
import OwnerHeader from '../pages/ownerHeader';
import { useNavigate, useLocation } from 'react-router-dom';
import { apiPost } from '../services/api'; // Adjust the import based on your project structure

const PlanHistory = () => {
  const [records, setRecords] = useState([]);
  const [filter, setFilter] = useState('All');
  const [pagination, setPagination] = useState({ limit: 10, offset: 0, hasMore: false });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const currentTab = location.pathname.split('/').pop(); // 'plans'

  const token = localStorage.getItem('token');
  const messId = localStorage.getItem('messId');




const fetchRecords = async () => {
  if (!messId) {
    console.error('❌ Mess ID missing');
    return;
  }

  setLoading(true);
  try {
    const res = await apiPost(
      `/owner/mess/plan/record?limit=${pagination.limit}&offset=${pagination.offset}`,
      { messId }
    );

    if (res.data.success) {
      console.log('✅ API Success Response:', res.data);
      setRecords(res.data.data);
      const total = res.data.pagination.totalRecords;
      setPagination(prev => ({
        ...prev,
        hasMore: total > prev.offset + prev.limit,
      }));
    }
  } catch (err) {
    console.error('❌ Error fetching plans:', err);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchRecords();
  }, [pagination.offset]);



  const filtered = records.filter(r => {
  if (filter === 'All') return true;
  return r.action?.toLowerCase() === filter.toLowerCase();
});


  const handleNext = () =>
    pagination.hasMore && setPagination(p => ({ ...p, offset: p.offset + p.limit }));
  const handlePrev = () =>
    pagination.offset >= pagination.limit && setPagination(p => ({ ...p, offset: p.offset - p.limit }));

  return (
    <div className="flex h-screen">
      <Navbar />
      {/* <div className="flex-1 p-6 overflow-y-auto bg-[#f9f4f0] min-h-screen"> */}
      <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-green-50 overflow-y-auto">
        <OwnerHeader />

        {/* Tabs */}
          <div className="justify-between mb-4 bg-white p-4 rounded-2xl shadow">

        <div className="flex gap-6 bg-white mb-6 border-b pb-2">
          <button
            onClick={() => navigate('/history')}
            className={`capitalize text-md font-medium transition-opacity ${
              currentTab === 'transactions'
                ? 'opacity-100 text-orange-600 border-b-2 border-orange-500'
                : 'opacity-50 hover:opacity-80'
            }`}>
            Transactions History
          </button>
          <button
            onClick={() => navigate('/owner/history/plans')}
            className={`capitalize text-md font-medium transition-opacity ${
              currentTab === 'plans'
                ? 'opacity-100 text-orange-600 border-b-2 border-orange-500'
                : 'opacity-50 hover:opacity-80'
            }`}>
            Plan History
          </button>
          <button
            onClick={() => navigate('/owner/history/account')}
            className={`capitalize text-md font-medium transition-opacity ${
              currentTab === 'account'
                ? 'opacity-100 text-orange-600 border-b-2 border-orange-500'
                : 'opacity-50 hover:opacity-80'
            }`}>
            Account History
          </button>
        </div>

  
<div className="flex space-x-4 my-4">
  {['All', 'created', 'activated', 'updated'].map(f => (
    <button
      key={f}
      onClick={() => setFilter(f)}
      className={`px-4 py-1 rounded border capitalize ${
        filter === f ? 'bg-orange-500 text-white' : 'text-gray-700 border-gray-300'
      }`}
    >
      {f}
    </button>
  ))}
</div>


        {/* Table */}
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">

              <tr>
                {['Plan', 'Tokens', 'Date', 'Time', 'Amount', 'Action'].map(col => (
                  <th key={col} className="px-6 py-3">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="6" className="py-8 text-center">Loading...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan="6" className="py-8 text-center text-gray-500">No records found</td></tr>
              ) : (
               
filtered.map((r, i) => {
  const d = new Date(r.updatedAt || r.createdAt);

  const colorClass =
    r.action === 'activated'
      ? 'text-green-600'
      : r.action === 'deactivated'
      ? 'text-red-600'
      : 'text-orange-600';

  return (
    <tr key={i} className="border-b">
      <td className="px-6 py-4">{r.newData?.name || 'N/A'}</td>
      <td className="px-6 py-4">{r.newData?.totalTokens ?? 0}</td>
      <td className="px-6 py-4">{d.toLocaleDateString()}</td>
      <td className="px-6 py-4">
        {d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </td>
      <td className="px-6 py-4">{r.newData?.price ?? 0}</td>
      <td className={`px-6 py-4 font-semibold capitalize ${colorClass}`}>
        {r.action}
      </td>
    </tr>
  );
})


              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between mt-4">
          <button
            onClick={handlePrev}
            disabled={pagination.offset === 0}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50">
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={!pagination.hasMore}
            className="px-4 py-2 bg-orange-500 text-white rounded disabled:opacity-50">
            Next
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default PlanHistory;



