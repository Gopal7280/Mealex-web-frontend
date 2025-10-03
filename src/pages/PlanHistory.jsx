
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




// const fetchRecords = async () => {
//   if (!messId) {
//     console.error('❌ Mess ID missing');
//     return;
//   }

//   setLoading(true);
//   try {
//     const res = await apiPost(
//       `/owner/mess/plan/record?limit=${pagination.limit}&offset=${pagination.offset}`,
//       { messId }
//     );
//       console.log('✅ API Success Response:', res);

//     // if (res.data.success) {
//     //   console.log('✅ API Success Response:', res.data);
//     //   setRecords(res.data.data);
//     //   const total = res.data.pagination.totalRecords;
//     //   setPagination(prev => ({
//     //     ...prev,
//     //     hasMore: total > prev.offset + prev.limit,
//     //   }));
//     // }
// //     if (Array.isArray(res.data)) {
// //   // Case: response is direct array
// //   setRecords(res.data);
// // } else if (res.data?.success && Array.isArray(res.data.data)) {
// //   // Case: response wrapped with { success, data, pagination }
// //   setRecords(res.data.data);

// //   const total = res.data.pagination?.totalRecords || res.data.data.length;
// //   setPagination(prev => ({
// //     ...prev,
// //     hasMore: total > prev.offset + prev.limit,
// //   }));
// // } else {
// //   console.warn("⚠️ Unexpected API format:", res.data);
// // }

// let records = [];
// let total = 0;

// if (Array.isArray(res.data)) {
//   // Case: API returns only array
//   records = res.data;
//   total = res.data.length;
// } else if (res.data?.success) {
//   // Case: API returns { success, data, pagination }
//   records = res.data.data || [];
//   total = res.data.pagination?.totalRecords || records.length;
// }

// setRecords(records);
// setPagination(prev => ({
//   ...prev,
//   hasMore: total > prev.offset + prev.limit,
// }));


//   } catch (err) {
//     console.error('❌ Error fetching plans:', err);
//   } finally {
//     setLoading(false);
//   }
// };

const fetchRecords = async () => {
  if (!messId) {
    return;
  }

  setLoading(true);
  try {
    const res = await apiPost(
      `/owner/mess/plan/record?limit=${pagination.limit}&offset=${pagination.offset}`,
      { messId }
    );


    let records = [];
    let total = 0;

    if (Array.isArray(res)) {
      // Case: API direct array return kare
      records = res;
      total = res.length;
    } else if (res.success) {
      // Case: API object return kare
      records = res.data || [];
      total = res.pagination?.totalRecords || records.length;
    }

    setRecords(records);
    setPagination(prev => ({
      ...prev,
      hasMore: total > prev.offset + prev.limit,
    }));
  } catch (err) {
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


  // const handleNext = () =>
  //   pagination.hasMore && setPagination(p => ({ ...p, offset: p.offset + p.limit }));
  // const handlePrev = () =>
  //   pagination.offset >= pagination.limit && setPagination(p => ({ ...p, offset: p.offset - p.limit }));


  const handleNext = () => {
  if (pagination.hasMore) {
    setPagination(p => ({ ...p, offset: p.offset + p.limit }));
  }
};

const handlePrev = () => {
  if (pagination.offset >= pagination.limit) {
    setPagination(p => ({ ...p, offset: p.offset - p.limit }));
  }
};

  return (
    <div className="flex h-screen">
      <Navbar />
      {/* <div className="flex-1 p-6 overflow-y-auto bg-[#f9f4f0] min-h-screen"> */}
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
            }`}>
            Transactions History
          </button>
          <button
            onClick={() => navigate('/owner/history/plans')}
            className={`cursor-pointer capitalize text-md font-medium transition-opacity ${
              currentTab === 'plans'
                ? 'opacity-100 text-orange-600 border-b-2 border-orange-500'
                : 'opacity-50 hover:opacity-80'
            }`}>
            Plan History
          </button>
          <button
            onClick={() => navigate('/owner/purchased-plans')}
            className={`cursor-pointer capitalize text-md font-medium transition-opacity ${
              currentTab === 'account'
                ? 'opacity-100 text-orange-600 border-b-2 border-orange-500'
                : 'opacity-50 hover:opacity-80'
            }`}>
            Plans Requests
          </button>
        </div>

{/*   
<div className="flex space-x-4 my-4">
  {['All', 'created', 'activated', 'updated'].map(f => (
    <button
      key={f}
      onClick={() => setFilter(f)}
      className={`px-4 py-1 cursor-pointer rounded border capitalize ${
        filter === f ? 'bg-orange-500 text-white' : 'text-gray-700 border-gray-300'
      }`}
    >
      {f}
    </button>
  ))}
</div> */}
<div className="flex flex-wrap gap-2 my-4">
  {['All', 'created', 'activated', 'updated'].map(f => (
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
//     <tr key={i} className="border-b">
//       {/* <td className="px-6 py-4">{r.newData?.name || 'N/A'}</td>
//       <td className="px-6 py-4">{r.newData?.totalTokens ?? 0}</td>
//       <td className="px-6 py-4">{d.toLocaleDateString()}</td> */}
//       <td>{r.newData?.name || r.name || 'N/A'}</td>
// <td>{r.newData?.totalTokens ?? r.totalTokens ?? 0}</td>
// <td>{r.newData?.price ?? r.price ?? 0}</td>

//       <td className="px-6 py-4">
//         {d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//       </td>
//       <td className="px-6 py-4">{r.newData?.price ?? 0}</td>
//       <td className={`px-6 py-4 font-semibold capitalize ${colorClass}`}>
//         {r.action}
//       </td>
//     </tr>
<tr key={i} className="border-b">
  <td className="px-6 py-4">{r.newData?.name || r.name || 'N/A'}</td>
  <td className="px-6 py-4">{r.newData?.totalTokens ?? r.totalTokens ?? 0}</td>
  <td className="px-6 py-4">{d.toLocaleDateString()}</td>
  <td className="px-6 py-4">
    {d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
  </td>
  <td className="px-6 py-4">{r.newData?.price ?? r.price ?? 0}</td>
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
            className="px-4 py-2 bg-gray-200 cursor-pointer text-gray-700 rounded disabled:opacity-50">
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={!pagination.hasMore}
            className="px-4 py-2 bg-orange-500 cursor-pointer text-white rounded disabled:opacity-50">
            Next
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default PlanHistory;



