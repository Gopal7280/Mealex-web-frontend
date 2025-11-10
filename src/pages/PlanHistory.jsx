
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Navbar from '../layouts/Navbar';
// import OwnerHeader from '../pages/ownerHeader';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { apiPost } from '../services/api'; // Adjust the import based on your project structure

// const PlanHistory = () => {
//   const [records, setRecords] = useState([]);
//   const [filter, setFilter] = useState('All');
//   const [pagination, setPagination] = useState({ limit: 10, offset: 0, hasMore: false });
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   const location = useLocation();
//   const currentTab = location.pathname.split('/').pop(); // 'plans'

//   const token = localStorage.getItem('token');
//   const messId = localStorage.getItem('messId');




// const fetchRecords = async () => {
//   if (!messId) {
//     return;
//   }

//   setLoading(true);
//   try {
//     const res = await apiPost(
//       `/owner/mess/plan/record?limit=${pagination.limit}&offset=${pagination.offset}`,
//       { messId }
//     );


//     let records = [];
//     let total = 0;

//     if (Array.isArray(res)) {
//       // Case: API direct array return kare
//       records = res;
//       total = res.length;
//     } else if (res.success) {
//       // Case: API object return kare
//       records = res.data || [];
//       total = res.pagination?.totalRecords || records.length;
//     }

//     setRecords(records);
//     setPagination(prev => ({
//       ...prev,
//       hasMore: total > prev.offset + prev.limit,
//     }));
//   } catch (err) {
//   } finally {
//     setLoading(false);
//   }
// };


//   useEffect(() => {
//     fetchRecords();
//   }, [pagination.offset]);



//   const filtered = records.filter(r => {
//   if (filter === 'All') return true;
//   return r.action?.toLowerCase() === filter.toLowerCase();
// });
//   const handleNext = () => {
//   if (pagination.hasMore) {
//     setPagination(p => ({ ...p, offset: p.offset + p.limit }));
//   }
// };

// const handlePrev = () => {
//   if (pagination.offset >= pagination.limit) {
//     setPagination(p => ({ ...p, offset: p.offset - p.limit }));
//   }
// };

//   return (
//     <div className="flex h-screen">
//       <Navbar />
//       {/* <div className="flex-1 p-6 overflow-y-auto bg-[#f9f4f0] min-h-screen"> */}
//       <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-gray-50 overflow-y-auto">
//         <OwnerHeader />

//         {/* Tabs */}
//           <div className="justify-between mb-4 bg-white p-4 rounded-2xl shadow">

//         <div className="flex gap-6 bg-white mb-6 border-b pb-2">
//           <button
//             onClick={() => navigate('/history')}
//             className={`cursor-pointer capitalize text-md font-medium transition-opacity ${
//               currentTab === 'transactions'
//                 ? 'opacity-100 text-orange-600 border-b-2 border-orange-500'
//                 : 'opacity-50 hover:opacity-80'
//             }`}>
//             Transactions History
//           </button>
//           <button
//             onClick={() => navigate('/owner/history/plans')}
//             className={`cursor-pointer capitalize text-md font-medium transition-opacity ${
//               currentTab === 'plans'
//                 ? 'opacity-100 text-orange-600 border-b-2 border-orange-500'
//                 : 'opacity-50 hover:opacity-80'
//             }`}>
//             Plan History
//           </button>
//         </div>
// <div className="flex flex-wrap gap-2 my-4">
//   {['All', 'created', 'activated', 'updated'].map(f => (
//     <button
//       key={f}
//       onClick={() => setFilter(f)}
//       className={`px-4 py-1 text-sm sm:text-base cursor-pointer rounded-lg border capitalize transition-colors ${
//         filter === f
//           ? 'bg-orange-500 text-white border-orange-500'
//           : 'text-gray-700 border-gray-300 hover:bg-gray-100'
//       }`}
//     >
//       {f}
//     </button>
//   ))}
// </div>




//         {/* Table */}
//         <div className="overflow-x-auto bg-white rounded shadow">
//           <table className="min-w-full text-sm text-left text-gray-700">
//             <thead className="bg-gray-100 text-gray-600 uppercase text-xs">

//               <tr>
//                 {['Plan', 'Tokens', 'Date', 'Time', 'Amount', 'Action'].map(col => (
//                   <th key={col} className="px-6 py-3">{col}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr><td colSpan="6" className="py-8 text-center">Loading...</td></tr>
//               ) : filtered.length === 0 ? (
//                 <tr><td colSpan="6" className="py-8 text-center text-gray-500">No records found</td></tr>
//               ) : (
               
// filtered.map((r, i) => {
//   const d = new Date(r.updatedAt || r.createdAt);

//   const colorClass =
//     r.action === 'activated'
//       ? 'text-green-600'
//       : r.action === 'deactivated'
//       ? 'text-red-600'
//       : 'text-orange-600';

//   return (
// <tr key={i} className="border-b border-gray-200 hover:bg-gray-50">
//   <td className="px-6 py-4">{r.newData?.name || r.name || 'N/A'}</td>
//   <td className="px-6 py-4">{r.newData?.totalTokens ?? r.totalTokens ?? 0}</td>
//   <td className="px-6 py-4">{d.toLocaleDateString()}</td>
//   <td className="px-6 py-4">
//     {d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//   </td>
//   <td className="px-6 py-4">{r.newData?.price ?? r.price ?? 0}</td>
//   <td className={`px-6 py-4 font-semibold capitalize ${colorClass}`}>
//     {r.action}
//   </td>
// </tr>

//   );
// })


//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <div className="flex justify-between mt-4">
//           <button
//             onClick={handlePrev}
//             disabled={pagination.offset === 0}
//             className="px-4 py-2 bg-gray-200 cursor-pointer text-gray-700 rounded disabled:opacity-50">
//             Previous
//           </button>
//           <button
//             onClick={handleNext}
//             disabled={!pagination.hasMore}
//             className="px-4 py-2 bg-orange-500 cursor-pointer text-white rounded disabled:opacity-50">
//             Next
//           </button>
//         </div>
//       </div>
//       </div>
//     </div>
//   );
// };

// export default PlanHistory;

// working but without updated data

// import React, { useState, useEffect } from 'react';
// import Navbar from '../layouts/Navbar';
// import OwnerHeader from '../pages/ownerHeader';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { apiPost } from '../services/api';

// const PlanHistory = () => {
//   const [records, setRecords] = useState([]);
//   const [filter, setFilter] = useState('All');
//   const [pagination, setPagination] = useState({ limit: 10, offset: 0, hasMore: false });
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   const location = useLocation();
//   const currentTab = location.pathname.split('/').pop();

//   const messId = localStorage.getItem('messId');

//   const fetchRecords = async () => {
//     if (!messId) return;

//     setLoading(true);
//     try {
//       const res = await apiPost(
//         `/owner/mess/plan/record?limit=${pagination.limit}&offset=${pagination.offset}`,
//         { messId }
//       );

//       console.log("Plan Records Response:", res);

//       if (res.success && Array.isArray(res.data)) {
//         setRecords(res.data);
//         setPagination(prev => ({
//           ...prev,
//           hasMore: res.pagination?.totalRecords > prev.offset + prev.limit,
//         }));
//       } else {
//         setRecords([]);
//       }
//     } catch (err) {
//       console.error("Error fetching plan records:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRecords();
//   }, [pagination.offset]);

//   const filtered = records.filter(r => {
//     if (filter === 'All') return true;
//     return r.action?.toLowerCase() === filter.toLowerCase();
//   });

//   const handleNext = () => {
//     if (pagination.hasMore) {
//       setPagination(p => ({ ...p, offset: p.offset + p.limit }));
//     }
//   };

//   const handlePrev = () => {
//     if (pagination.offset >= pagination.limit) {
//       setPagination(p => ({ ...p, offset: p.offset - p.limit }));
//     }
//   };

//   return (
//     <div className="flex h-screen">
//       <Navbar />
//       <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-gray-50 overflow-y-auto">
//         <OwnerHeader />

//         {/* Tabs */}
//         <div className="justify-between mb-4 bg-white p-4 rounded-2xl shadow">
//           <div className="flex gap-6 bg-white mb-6 border-b pb-2">
//             <button
//               onClick={() => navigate('/history')}
//               className={`cursor-pointer capitalize text-md font-medium transition-opacity ${
//                 currentTab === 'transactions'
//                   ? 'opacity-100 text-orange-600 border-b-2 border-orange-500'
//                   : 'opacity-50 hover:opacity-80'
//               }`}
//             >
//               Transactions History
//             </button>
//             <button
//               onClick={() => navigate('/owner/history/plans')}
//               className={`cursor-pointer capitalize text-md font-medium transition-opacity ${
//                 currentTab === 'plans'
//                   ? 'opacity-100 text-orange-600 border-b-2 border-orange-500'
//                   : 'opacity-50 hover:opacity-80'
//               }`}
//             >
//               Plan History
//             </button>
//           </div>

//           {/* Filter buttons */}
//           <div className="flex flex-wrap gap-2 my-4">
//             {['All', 'created', 'activated', 'updated', 'deactivated'].map(f => (
//               <button
//                 key={f}
//                 onClick={() => setFilter(f)}
//                 className={`px-4 py-1 text-sm sm:text-base cursor-pointer rounded-lg border capitalize transition-colors ${
//                   filter === f
//                     ? 'bg-orange-500 text-white border-orange-500'
//                     : 'text-gray-700 border-gray-300 hover:bg-gray-100'
//                 }`}
//               >
//                 {f}
//               </button>
//             ))}
//           </div>

//           {/* Desktop Table */}
//           <div className="hidden md:block overflow-x-auto bg-white rounded shadow">
//             <table className="min-w-full text-sm text-left text-gray-700">
//               <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
//                 <tr>
//                   {['Plan', 'Tokens', 'Date', 'Time', 'Amount', 'Action'].map(col => (
//                     <th key={col} className="px-6 py-3">
//                       {col}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {loading ? (
//                   <tr>
//                     <td colSpan="6" className="py-8 text-center">
//                       Loading...
//                     </td>
//                   </tr>
//                 ) : filtered.length === 0 ? (
//                   <tr>
//                     <td colSpan="6" className="py-8 text-center text-gray-500">
//                       No records found
//                     </td>
//                   </tr>
//                 ) : (
//                   filtered.map((r, i) => {
//                     const d = new Date(r.updatedAt || r.createdAt);
//                     const colorClass =
//                       r.action === 'activated'
//                         ? 'text-green-600'
//                         : r.action === 'deactivated'
//                         ? 'text-red-600'
//                         : 'text-orange-600';
//                     return (
//                       <tr
//                         key={i}
//                         className="border-b border-gray-200 hover:bg-gray-50"
//                       >
//                         <td className="px-6 py-4">{r.planName || 'N/A'}</td>
//                         <td className="px-6 py-4">{r.totalTokens ?? 0}</td>
//                         <td className="px-6 py-4">
//                           {d.toLocaleDateString()}
//                         </td>
//                         <td className="px-6 py-4">
//                           {d.toLocaleTimeString([], {
//                             hour: '2-digit',
//                             minute: '2-digit',
//                           })}
//                         </td>
//                         <td className="px-6 py-4">{r.price ?? 0}</td>
//                         <td
//                           className={`px-6 py-4 font-semibold capitalize ${colorClass}`}
//                         >
//                           {r.action}
//                         </td>
//                       </tr>
//                     );
//                   })
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Mobile Cards */}
//           <div className="grid md:hidden gap-3">
//             {loading ? (
//               <p className="text-center py-6 text-gray-500">Loading...</p>
//             ) : filtered.length === 0 ? (
//               <p className="text-center py-6 text-gray-500">No records found</p>
//             ) : (
//               filtered.map((r, i) => {
//                 const d = new Date(r.updatedAt || r.createdAt);
//                 const colorClass =
//                   r.action === 'activated'
//                     ? 'text-green-600'
//                     : r.action === 'deactivated'
//                     ? 'text-red-600'
//                     : 'text-orange-600';
//                 return (
//                   <div
//                     key={i}
//                     className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-2 border border-gray-100"
//                   >
//                     <div className="flex justify-between items-center">
//                       <h3 className="font-semibold text-gray-800">
//                         {r.planName || 'N/A'}
//                       </h3>
//                       <span
//                         className={`text-xs font-medium px-2 py-1 rounded-full ${colorClass} bg-gray-50`}
//                       >
//                         {r.action}
//                       </span>
//                     </div>
//                     <div className="text-sm text-gray-600">
//                       <p>
//                         <span className="font-medium">Tokens:</span>{' '}
//                         {r.totalTokens ?? 0}
//                       </p>
//                       <p>
//                         <span className="font-medium">Amount:</span>{' '}
//                         ₹{r.price ?? 0}
//                       </p>
//                       <p>
//                         <span className="font-medium">Date:</span>{' '}
//                         {d.toLocaleDateString()}
//                       </p>
//                       <p>
//                         <span className="font-medium">Time:</span>{' '}
//                         {d.toLocaleTimeString([], {
//                           hour: '2-digit',
//                           minute: '2-digit',
//                         })}
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })
//             )}
//           </div>

//           {/* Pagination */}
//           <div className="flex justify-between mt-4">
//             <button
//               onClick={handlePrev}
//               disabled={pagination.offset === 0}
//               className="px-4 py-2 bg-gray-200 cursor-pointer text-gray-700 rounded disabled:opacity-50"
//             >
//               Previous
//             </button>
//             <button
//               onClick={handleNext}
//               disabled={!pagination.hasMore}
//               className="px-4 py-2 bg-orange-500 cursor-pointer text-white rounded disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PlanHistory;


// updated code ends here

// import React, { useState, useEffect } from 'react';
// import Navbar from '../layouts/Navbar';
// import OwnerHeader from '../pages/ownerHeader';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { apiPost ,apiGet } from '../services/api';
// import { X } from 'lucide-react';

// const PlanHistory = () => {
//   const [records, setRecords] = useState([]);
//   const [filter, setFilter] = useState('All');
//   const [pagination, setPagination] = useState({ limit: 10, offset: 0, hasMore: false });
//   const [loading, setLoading] = useState(false);
//   const [selectedLog, setSelectedLog] = useState(null);
//   const [detailData, setDetailData] = useState(null);
//   const [detailLoading, setDetailLoading] = useState(false);

//   const navigate = useNavigate();
//   const location = useLocation();
//   const currentTab = location.pathname.split('/').pop();

//   const messId = localStorage.getItem('messId');

//   // Fetch all plan activity logs
//   const fetchRecords = async () => {
//     if (!messId) return;
//     setLoading(true);
//     try {
//       const res = await apiPost(
//         `/owner/mess/plan/record?limit=${pagination.limit}&offset=${pagination.offset}`,
//         { messId }
//       );

//       if (res.success && Array.isArray(res.data)) {
//         setRecords(res.data);
//         setPagination(prev => ({
//           ...prev,
//           hasMore: res.pagination?.totalRecords > prev.offset + prev.limit,
//         }));
//       } else setRecords([]);
//     } catch (err) {
//       console.error("Error fetching plan records:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRecords();
//   }, [pagination.offset]);

//   // Fetch details for a specific logId
//   const fetchLogDetails = async (logId) => {
//     setDetailLoading(true);
//     setSelectedLog(logId);
//     try {
//       const res = await apiPost(`/owner/mess/plan/record/id`, { messId, logId });
//       console.log("Log Details Response:", res);
//       if (res.success && Array.isArray(res.data)) {
//         setDetailData(res.data[0]); // Assuming first item
//       } else {
//         setDetailData(null);
//       }
//     } catch (err) {
//       console.error("Error fetching log details:", err);
//     } finally {
//       setDetailLoading(false);
//     }
//   };

//   const closeModal = () => {
//     setSelectedLog(null);
//     setDetailData(null);
//   };

//   const filtered = records.filter(r => filter === 'All' || r.action?.toLowerCase() === filter.toLowerCase());

//   const handleNext = () => pagination.hasMore && setPagination(p => ({ ...p, offset: p.offset + p.limit }));
//   const handlePrev = () => pagination.offset >= pagination.limit && setPagination(p => ({ ...p, offset: p.offset - p.limit }));

//   return (
//     <div className="flex h-screen">
//       <Navbar />
//       <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-gray-50 overflow-y-auto">
//         <OwnerHeader />

//         {/* Tabs */}
//         <div className="justify-between mb-4 bg-white p-4 rounded-2xl shadow">
//           <div className="flex gap-6 bg-white mb-6 border-b pb-2">
//             <button
//               onClick={() => navigate('/history')}
//               className={`cursor-pointer capitalize text-md font-medium transition-opacity ${
//                 currentTab === 'transactions'
//                   ? 'opacity-100 text-orange-600 border-b-2 border-orange-500'
//                   : 'opacity-50 hover:opacity-80'
//               }`}
//             >
//               Transactions History
//             </button>
//             <button
//               onClick={() => navigate('/owner/history/plans')}
//               className={`cursor-pointer capitalize text-md font-medium transition-opacity ${
//                 currentTab === 'plans'
//                   ? 'opacity-100 text-orange-600 border-b-2 border-orange-500'
//                   : 'opacity-50 hover:opacity-80'
//               }`}
//             >
//               Plan History
//             </button>
//           </div>

//           {/* Filters */}
//           <div className="flex flex-wrap gap-2 my-4">
//             {['All', 'created', 'activated', 'updated', 'deactivated'].map(f => (
//               <button
//                 key={f}
//                 onClick={() => setFilter(f)}
//                 className={`px-4 py-1 text-sm sm:text-base cursor-pointer rounded-lg border capitalize transition-colors ${
//                   filter === f
//                     ? 'bg-orange-500 text-white border-orange-500'
//                     : 'text-gray-700 border-gray-300 hover:bg-gray-100'
//                 }`}
//               >
//                 {f}
//               </button>
//             ))}
//           </div>

//           {/* Desktop Table */}
//           <div className="hidden md:block overflow-x-auto bg-white rounded shadow">
//             <table className="min-w-full text-sm text-left text-gray-700">
//               <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
//                 <tr>
//                   {['Plan', 'Tokens', 'Date', 'Time', 'Amount', 'Action'].map(col => (
//                     <th key={col} className="px-6 py-3">{col}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {loading ? (
//                   <tr><td colSpan="6" className="py-8 text-center">Loading...</td></tr>
//                 ) : filtered.length === 0 ? (
//                   <tr><td colSpan="6" className="py-8 text-center text-gray-500">No records found</td></tr>
//                 ) : (
//                   filtered.map((r, i) => {
//                     const d = new Date(r.updatedAt || r.createdAt);
//                     const colorClass =
//                       r.action === 'activated' ? 'text-green-600' :
//                       r.action === 'deactivated' ? 'text-red-600' : 'text-orange-600';
//                     return (
//                       <tr
//                         key={i}
//                         className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
//                         onClick={() => fetchLogDetails(r.logId)}
//                       >
//                         <td className="px-6 py-4">{r.planName}</td>
//                         <td className="px-6 py-4">{r.totalTokens ?? r.MessPlan?.totalTokens ?? 0}</td>
//                         <td className="px-6 py-4">{d.toLocaleDateString()}</td>
//                         <td className="px-6 py-4">{d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
//                         <td className="px-6 py-4">₹{r.price ?? r.MessPlan?.price ?? 0}</td>
//                         <td className={`px-6 py-4 font-semibold capitalize ${colorClass}`}>{r.action}</td>
//                       </tr>
//                     );
//                   })
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Mobile Cards */}
//           <div className="grid md:hidden gap-3">
//             {filtered.map((r, i) => {
//               const d = new Date(r.updatedAt || r.createdAt);
//               const colorClass =
//                 r.action === 'activated' ? 'text-green-600' :
//                 r.action === 'deactivated' ? 'text-red-600' : 'text-orange-600';
//               return (
//                 <div
//                   key={i}
//                   onClick={() => fetchLogDetails(r.logId)}
//                   className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-2 border border-gray-100 cursor-pointer hover:shadow-lg transition"
//                 >
//                   <div className="flex justify-between items-center">
//                     <h3 className="font-semibold text-gray-800">{r.planName}</h3>
//                     <span className={`text-xs font-medium px-2 py-1 rounded-full ${colorClass} bg-gray-50`}>
//                       {r.action}
//                     </span>
//                   </div>
//                   <div className="text-sm text-gray-600">
//                     <p><span className="font-medium">Tokens:</span> {r.totalTokens ?? r.MessPlan?.totalTokens ?? 0}</p>
//                     <p><span className="font-medium">Amount:</span> ₹{r.price ?? r.MessPlan?.price ?? 0}</p>
//                     <p><span className="font-medium">Date:</span> {d.toLocaleDateString()}</p>
//                     <p><span className="font-medium">Time:</span> {d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           {/* Pagination */}
//           <div className="flex justify-between mt-4">
//             <button onClick={handlePrev} disabled={pagination.offset === 0}
//               className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50">Previous</button>
//             <button onClick={handleNext} disabled={!pagination.hasMore}
//               className="px-4 py-2 bg-orange-500 text-white rounded disabled:opacity-50">Next</button>
//           </div>
//         </div>
//       </div>

//       {/* Modal */}
//       {selectedLog && (
//         <PlanDetailModal
//           loading={detailLoading}
//           data={detailData}
//           onClose={closeModal}
//         />
//       )}
//     </div>
//   );
// };

// const PlanDetailModal = ({ loading, data, onClose }) => {
//   if (loading) {
//     return (
//       <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//         <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 text-center">
//           <p className="text-gray-600">Loading details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!data) {
//     return (
//       <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//         <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 text-center">
//           <p className="text-gray-600">No details available</p>
//         </div>
//       </div>
//     );
//   }

//   const { planName, action, createdAt, updatedAt, newData, previousData } = data;

//   const ignoreKeys = ["planId", "messId", "createdAt", "updatedAt", "__v", "_id"];

//   const displayFields = Object.entries(newData || {}).filter(
//     ([key]) => !ignoreKeys.includes(key)
//   );

//   const changedKeys = Object.keys(previousData || {}).filter(
//     (key) => !ignoreKeys.includes(key)
//   );

//   // Helper to format key names (camelCase → normal text)
//   const formatKey = (key) =>
//     key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 p-4 pt-12 animate-fadeIn">
//       <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg relative overflow-hidden">
//         {/* Sticky Header */}
//         <div className="sticky top-0 bg-white border-b border-gray-200 p-4 z-10 flex justify-between items-center">
//           <h2 className="text-lg font-semibold text-gray-800">
//             Plan Activity Details
//           </h2>
//           <button
//             onClick={onClose}
//             className="text-gray-600 cursor-pointer hover:text-gray-900 transition"
//           >
//             <X size={20} />
//           </button>
//         </div>

//         {/* Scrollable Body */}
//         <div className="p-6 overflow-y-auto max-h-[80vh] space-y-6">
//           {/* Overview */}
//           <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
//             <p className="font-semibold text-gray-800 text-lg">{planName}</p>
//             <p className="text-sm text-gray-600 capitalize">
//               Action: <span className="font-medium">{action}</span>
//             </p>
//             <p className="text-sm text-gray-600">
//               Date: {new Date(updatedAt || createdAt).toLocaleString()}
//             </p>
//           </div>

//           {/* Plan Details - single card */}
//           <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
//             <h3 className="font-semibold text-gray-800 mb-3">Plan Details</h3>

//             {/* Plan image (if exists) */}
//             {newData?.imageUrl && (
//               <div className="flex justify-center mb-4">
//                 <img
//                   src={newData.imageUrl}
//                   alt="Plan"
//                   className="w-40 h-40 object-cover rounded-lg shadow"
//                 />
//               </div>
//             )}

//             <div className="grid grid-cols-2 gap-3 text-sm">
//               {displayFields.map(([key, value]) => {
//                 if (key === "imageUrl") return null; // handled separately

//                 return (
//                   <div key={key} className="col-span-2 sm:col-span-1">
//                     <p className="font-medium text-gray-700 capitalize">
//                       {formatKey(key)}:
//                     </p>
//                     {Array.isArray(value) ? (
//                       <ul className="list-disc list-inside text-gray-600 text-[13px]">
//                         {value.map((item, idx) => (
//                           <li key={idx}>{item}</li>
//                         ))}
//                       </ul>
//                     ) : (
//                       <p className="text-gray-600 text-[13px] break-words">
//                         {String(value)}
//                       </p>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Changed Fields */}
//           {changedKeys.length > 0 && (
//             <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
//               <h3 className="font-semibold text-gray-800 mb-3">Changed Fields</h3>

//               {changedKeys.map((key) => {
//                 // special case for image change
//                 if (key === "imageUrl") {
//                   return (
//                     <div key={key} className="mb-4">
//                       <p className="font-medium text-gray-800 capitalize mb-2">
//                         {formatKey(key)}
//                       </p>
//                       <div className="flex flex-col sm:flex-row gap-4">
//                         <div className="flex-1 text-center">
//                           <p className="text-sm text-gray-500 mb-1">Previous</p>
//                           {previousData[key] ? (
//                             <img
//                               src={previousData[key]}
//                               alt="Previous Plan"
//                               className="w-36 h-36 object-cover rounded-lg border shadow-sm mx-auto"
//                             />
//                           ) : (
//                             <p className="text-gray-400 text-sm">No Image</p>
//                           )}
//                         </div>
//                         <div className="flex-1 text-center">
//                           <p className="text-sm text-gray-500 mb-1">Updated</p>
//                           {newData[key] ? (
//                             <img
//                               src={newData[key]}
//                               alt="New Plan"
//                               className="w-36 h-36 object-cover rounded-lg border shadow-sm mx-auto"
//                             />
//                           ) : (
//                             <p className="text-gray-400 text-sm">No Image</p>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 }

//                 return (
//                   <div key={key} className="border-b border-gray-100 pb-3 mb-3">
//                     <p className="font-medium text-gray-800 capitalize mb-1">
//                       {formatKey(key)}
//                     </p>
//                     <p className="text-sm text-red-600 mb-1">
//                       <span className="font-medium text-gray-700">Previous:</span>{" "}
//                       {String(previousData[key]) ?? "—"}
//                     </p>
//                     <p className="text-sm text-green-700">
//                       <span className="font-medium text-gray-700">Updated:</span>{" "}
//                       {String(newData?.[key]) ?? "—"}
//                     </p>
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {changedKeys.length === 0 && (
//             <p className="text-center text-gray-500 mt-2">
//               No field-level updates found.
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default PlanHistory;



//new 

import React, { useState, useEffect } from 'react';
import Navbar from '../layouts/Navbar';
import OwnerHeader from '../pages/ownerHeader';
import { useNavigate, useLocation } from 'react-router-dom';
import { apiPost ,apiGet } from '../services/api';
import { X } from 'lucide-react';

const PlanHistory = () => {
  const [records, setRecords] = useState([]);
  const [filter, setFilter] = useState('All');
  const [pagination, setPagination] = useState({ limit: 10, page: 1, hasMore: false });
  const [loading, setLoading] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);
  const [detailData, setDetailData] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const currentTab = location.pathname.split('/').pop();

  const messId = localStorage.getItem('messId');

  // Fetch all plan activity logs
  const fetchRecords = async () => {
    if (!messId) return;
    setLoading(true);
    try {
      const res = await apiPost(
        `/owner/mess/plan/record?limit=${pagination.limit}&page=${pagination.page}`,
        { messId }
      );

      if (res.success && Array.isArray(res.data)) {
        setRecords(res.data);
        // compute hasMore using totalRecords if available, otherwise fallback to length check
        const totalRecords = res.pagination?.totalRecords;
        if (typeof totalRecords === 'number') {
          setPagination(prev => ({
            ...prev,
            hasMore: totalRecords > prev.page * prev.limit,
          }));
        } else {
          // fallback: if returned data length equals limit, assume there might be more
          setPagination(prev => ({
            ...prev,
            hasMore: res.data.length === prev.limit,
          }));
        }
      } else {
        setRecords([]);
        setPagination(prev => ({ ...prev, hasMore: false }));
      }
    } catch (err) {
      console.error("Error fetching plan records:", err);
      setRecords([]);
      setPagination(prev => ({ ...prev, hasMore: false }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.page]);

  // Fetch details for a specific logId
  const fetchLogDetails = async (logId) => {
    setDetailLoading(true);
    setSelectedLog(logId);
    try {
      const res = await apiPost(`/owner/mess/plan/record/id`, { messId, logId });
      console.log("Log Details Response:", res);
      if (res.success && Array.isArray(res.data)) {
        setDetailData(res.data[0]); // Assuming first item
      } else {
        setDetailData(null);
      }
    } catch (err) {
      console.error("Error fetching log details:", err);
      setDetailData(null);
    } finally {
      setDetailLoading(false);
    }
  };

  const closeModal = () => {
    setSelectedLog(null);
    setDetailData(null);
  };

  const filtered = records.filter(r => filter === 'All' || r.action?.toLowerCase() === filter.toLowerCase());

  const handleNext = () => {
    if (pagination.hasMore) {
      setPagination(p => ({ ...p, page: p.page + 1 }));
    }
  };
  const handlePrev = () => {
    if (pagination.page > 1) {
      setPagination(p => ({ ...p, page: p.page - 1 }));
    }
  };

  return (
    <div className="flex h-screen">
      <Navbar />
      <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-gray-50 overflow-y-auto">
        <OwnerHeader />

        {/* Tabs */}
        <div className="justify-between mb-4 bg-white p-4 rounded-2xl shadow">
          <div className="flex gap-6 bg-white mb-6 border-b pb-2">
            <button
              onClick={() => navigate('/history')}
              className={`cursor-pointer capitalize text-md font-medium transition-opacity ${
                currentTab === 'transactions'
                  ? 'opacity-100 text-orange-600 border-b-2 border-orange-500'
                  : 'opacity-50 hover:opacity-80'
              }`}
            >
              Transactions History
            </button>
            <button
              onClick={() => navigate('/owner/history/plans')}
              className={`cursor-pointer capitalize text-md font-medium transition-opacity ${
                currentTab === 'plans'
                  ? 'opacity-100 text-orange-600 border-b-2 border-orange-500'
                  : 'opacity-50 hover:opacity-80'
              }`}
            >
              Plan History
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 my-4">
            {['All', 'created', 'activated', 'updated', 'deactivated'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1 text-sm sm:text-base cursor-pointer rounded-lg border capitalize transition-colors ${
                  filter === f
                    ? 'bg-orange-500 text-white border-orange-500'
                    : 'text-gray-700 border-gray-300 hover:bg-gray-100'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto bg-white rounded shadow">
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
                      r.action === 'activated' ? 'text-green-600' :
                      r.action === 'deactivated' ? 'text-red-600' : 'text-orange-600';
                    return (
                      <tr
                        key={i}
                        className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                        onClick={() => fetchLogDetails(r.logId)}
                      >
                        <td className="px-6 py-4">{r.planName}</td>
                        <td className="px-6 py-4">{r.totalTokens ?? r.MessPlan?.totalTokens ?? 0}</td>
                        <td className="px-6 py-4">{d.toLocaleDateString()}</td>
                        <td className="px-6 py-4">{d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                        <td className="px-6 py-4">₹{r.price ?? r.MessPlan?.price ?? 0}</td>
                        <td className={`px-6 py-4 font-semibold capitalize ${colorClass}`}>{r.action}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="grid md:hidden gap-3">
            {filtered.map((r, i) => {
              const d = new Date(r.updatedAt || r.createdAt);
              const colorClass =
                r.action === 'activated' ? 'text-green-600' :
                r.action === 'deactivated' ? 'text-red-600' : 'text-orange-600';
              return (
                <div
                  key={i}
                  onClick={() => fetchLogDetails(r.logId)}
                  className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-2 border border-gray-100 cursor-pointer hover:shadow-lg transition"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-800">{r.planName}</h3>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${colorClass} bg-gray-50`}>
                      {r.action}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p><span className="font-medium">Tokens:</span> {r.totalTokens ?? r.MessPlan?.totalTokens ?? 0}</p>
                    <p><span className="font-medium">Amount:</span> ₹{r.price ?? r.MessPlan?.price ?? 0}</p>
                    <p><span className="font-medium">Date:</span> {d.toLocaleDateString()}</p>
                    <p><span className="font-medium">Time:</span> {d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="flex justify-between mt-4">
            <button onClick={handlePrev} disabled={pagination.page === 1}
              className="px-4 py-2 bg-gray-200 text-gray-700 cursor-pointer rounded disabled:opacity-50">Previous</button>
            <div className="flex items-center gap-3">
              {/* <span className="text-sm text-gray-600">Page {pagination.page}</span> */}
              <button onClick={handleNext} disabled={!pagination.hasMore}
                className="px-4 py-2 bg-orange-500 cursor-pointer text-white rounded disabled:opacity-50">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedLog && (
        <PlanDetailModal
          loading={detailLoading}
          data={detailData}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

const PlanDetailModal = ({ loading, data, onClose }) => {
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 text-center">
          <p className="text-gray-600">Loading details...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 text-center">
          <p className="text-gray-600">No details available</p>
        </div>
      </div>
    );
  }

  const { planName, action, createdAt, updatedAt, newData, previousData } = data;

  const ignoreKeys = ["planId", "messId", "createdAt", "updatedAt", "__v", "_id"];

  const displayFields = Object.entries(newData || {}).filter(
    ([key]) => !ignoreKeys.includes(key)
  );

  const changedKeys = Object.keys(previousData || {}).filter(
    (key) => !ignoreKeys.includes(key)
  );

  // Helper to format key names (camelCase → normal text)
  const formatKey = (key) =>
    key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 p-4 pt-12 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg relative overflow-hidden">
        {/* Sticky Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 z-10 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">
            Plan Activity Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 cursor-pointer hover:text-gray-900 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto max-h-[80vh] space-y-6">
          {/* Overview */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="font-semibold text-gray-800 text-lg">{planName}</p>
            <p className="text-sm text-gray-600 capitalize">
              Action: <span className="font-medium">{action}</span>
            </p>
            <p className="text-sm text-gray-600">
              Date: {new Date(updatedAt || createdAt).toLocaleString()}
            </p>
          </div>

          {/* Plan Details - single card */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Plan Details</h3>

            {/* Plan image (if exists) */}
            {newData?.imageUrl && (
              <div className="flex justify-center mb-4">
                <img
                  src={newData.imageUrl}
                  alt="Plan"
                  className="w-40 h-40 object-cover rounded-lg shadow"
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 text-sm">
              {displayFields.map(([key, value]) => {
                if (key === "imageUrl") return null; // handled separately

                return (
                  <div key={key} className="col-span-2 sm:col-span-1">
                    <p className="font-medium text-gray-700 capitalize">
                      {formatKey(key)}:
                    </p>
                    {Array.isArray(value) ? (
                      <ul className="list-disc list-inside text-gray-600 text-[13px]">
                        {value.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-600 text-[13px] break-words">
                        {String(value)}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Changed Fields */}
          {changedKeys.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
              <h3 className="font-semibold text-gray-800 mb-3">Changed Fields</h3>

              {changedKeys.map((key) => {
                // special case for image change
                if (key === "imageUrl") {
                  return (
                    <div key={key} className="mb-4">
                      <p className="font-medium text-gray-800 capitalize mb-2">
                        {formatKey(key)}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 text-center">
                          <p className="text-sm text-gray-500 mb-1">Previous</p>
                          {previousData[key] ? (
                            <img
                              src={previousData[key]}
                              alt="Previous Plan"
                              className="w-36 h-36 object-cover rounded-lg border shadow-sm mx-auto"
                            />
                          ) : (
                            <p className="text-gray-400 text-sm">No Image</p>
                          )}
                        </div>
                        <div className="flex-1 text-center">
                          <p className="text-sm text-gray-500 mb-1">Updated</p>
                          {newData[key] ? (
                            <img
                              src={newData[key]}
                              alt="New Plan"
                              className="w-36 h-36 object-cover rounded-lg border shadow-sm mx-auto"
                            />
                          ) : (
                            <p className="text-gray-400 text-sm">No Image</p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={key} className="border-b border-gray-100 pb-3 mb-3">
                    <p className="font-medium text-gray-800 capitalize mb-1">
                      {formatKey(key)}
                    </p>
                    <p className="text-sm text-red-600 mb-1">
                      <span className="font-medium text-gray-700">Previous:</span>{" "}
                      {String(previousData[key]) ?? "—"}
                    </p>
                    <p className="text-sm text-green-700">
                      <span className="font-medium text-gray-700">Updated:</span>{" "}
                      {String(newData?.[key]) ?? "—"}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {changedKeys.length === 0 && (
            <p className="text-center text-gray-500 mt-2">
              No field-level updates found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
export default PlanHistory;
