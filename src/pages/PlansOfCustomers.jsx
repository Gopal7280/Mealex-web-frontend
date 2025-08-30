// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Navbar2 from '../layouts/Navbar';
// import { apiGet } from '../services/api';
// import OwnerHeader from './ownerHeader';
// import storage from '../utils/storage';

// const CustomerPlans = () => {
//   const [plans, setPlans] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchPlans = async () => {
//   const messId = storage.getItem('messId');
//     if (!messId) {
//       console.error('messId not found in localStorage');
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await apiGet(`/customer/mess/${messId}/plan/issued`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
//       console.log('Fetched plans:', response);

//     //  if (response.data.success) {
// //   console.log('✅ Issued Plans Fetched:', response.data.data);
// //   setPlans(response.data.data || []);
// // } else {
// //   console.warn('⚠️ Response received but success flag false:', response.data);
// // }
// const { success, data, message } = response.data;


//     } catch (error) {
//     //   console.error('Error fetching plans:', error);
// console.error('❌ Error fetching plans:', error?.response || error);

// } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPlans();
//   }, []);

//   if (loading) return <div className="text-center py-10">Loading...</div>;

//   return (
//     <>
//   <div className="flex h-screen bg-[#f4f4f4]">
//       <div className="w-[17rem] bg-white shadow">
//         <Navbar2 />
//       </div>
//         <div className="flex-1 overflow-y-auto">
//         <div className="p-6 max-w-7xl mx-auto">
//                   <OwnerHeader />

//         {plans.length === 0 ? (
//           // 🔸 No Plans View
//           <div className="flex flex-col items-center justify-center text-center mt-16">
//             <img
//               src="/no-plans-illustration.png"
//               alt="No Plans"
//               className="w-48 mb-6"
//             />
//             <h2 className="text-orange-500 font-semibold text-xl mb-2">
//               NO PLANS PURCHASED
//             </h2>
//             <p className="text-gray-500 mb-6">
//               Let's purchase a plan to get started.
//             </p>
//             <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded">
//               Purchase Plan
//             </button>
//           </div>
//         ) : (
//           // 🔹 Plans Available View
//           <div>
//             <h2 className="text-2xl font-semibold mb-6">Purchase Plan</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {plans.map((plan, index) => (
//                 <div
//                   key={index}
//                   className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
//                 >
//                   <img
//                     src="/plan-img.jpg"
//                     alt="Plan"
//                     className="rounded-md mb-4 w-full h-40 object-cover"
//                   />
//                   <h3 className="text-lg font-semibold text-gray-800">
//                     {plan.title || 'Test Plan'}
//                   </h3>
//                   <p className="text-gray-600 text-sm mb-2">
//                     {plan.description || 'Plan Description'}
//                   </p>
//                   <ul className="text-sm text-gray-700 space-y-1 mb-4">
//                     <li>💰 Price: ₹{plan.price || 3600}</li>
//                     <li>🍱 Tokens: {plan.tokens || 30}</li>
//                     <li>🗓 Duration: {plan.duration || 30} Days</li>
//                   </ul>
//                 </div>
//               ))}
//             </div>
//             <div className="flex justify-center mt-8">
//               <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded">
//                 Purchase Plan
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//       </div>
//       </div>
//     </>
//   );
// };

// export default CustomerPlans;













// import React, { useEffect, useState } from 'react';
// import Navbar2 from '../layouts/Navbar';
// import { apiGet } from '../services/api';
// import OwnerHeader from './ownerHeader';
// import storage from '../utils/storage';
// import { useNavigate } from 'react-router-dom';

// const CustomerPlans = () => {
//   const [plans, setPlans] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   const fetchPlans = async () => {
//     const messId = storage.getItem('messId');
//     if (!messId) {
//       console.error('messId not found in localStorage');
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await apiGet(`/customer/mess/${messId}/plan/issued`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });

//       const { success, data, message } = response.data;

//       if (success) {
//         setPlans(data || []);
//         console.log('✅ Issued Plans:', data);
//       } else {
//         console.warn('⚠️ API responded with failure:', message);
//         setPlans([]);
//       }
//     } catch (error) {
//       console.error('❌ Error fetching plans:', error?.response || error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPlans();
//   }, []);

//   if (loading) {
//     return <div className="text-center py-10">Loading...</div>;
//   }

//   return (
//     <div className="flex h-screen bg-[#f4f4f4]">
//       <div className="w-[17rem] bg-white shadow">
//         <Navbar2 />
//       </div>

//       <div className="flex-1 overflow-y-auto">
//         <div className="p-6 max-w-7xl mx-auto">
//           <OwnerHeader />

//           {plans.length === 0 ? (
//             <div className="flex flex-col items-center justify-center text-center mt-16">
//               <img
//                 src="/no-plans-illustration.png"
//                 alt="No Plans"
//                 className="w-48 mb-6"
//               />
//               <h2 className="text-orange-500 font-semibold text-xl mb-2">
//                 NO PLANS PURCHASED
//               </h2>
//               <p className="text-gray-500 mb-6">
//                 Let's purchase a plan to get started.
//               </p>
//               <button
//                 className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded"
//                 onClick={() => navigate('/customer/available-plans')} // <- 🔁 Add correct route
//               >
//                 Purchase Plan
//               </button>
//             </div>
//           ) : (
//             <div>
//               <h2 className="text-2xl font-semibold mb-6">Your Plans</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {plans.map((plan, index) => (
//                   <div
//                     key={index}
//                     className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
//                   >
//                     <img
//                       src="/plan-img.jpg"
//                       alt="Plan"
//                       className="rounded-md mb-4 w-full h-40 object-cover"
//                     />
//                     <h3 className="text-lg font-semibold text-gray-800">
//                       {plan.title || 'Plan Title'}
//                     </h3>
//                     <p className="text-gray-600 text-sm mb-2">
//                       {plan.description || 'No description provided.'}
//                     </p>
//                     <ul className="text-sm text-gray-700 space-y-1 mb-4">
//                       <li>💰 Price: ₹{plan.price}</li>
//                       <li>🍱 Tokens: {plan.tokens}</li>
//                       <li>🗓 Duration: {plan.duration} Days</li>
//                     </ul>
//                   </div>
//                 ))}
//               </div>

//               <div className="flex justify-center mt-8">
//                 <button
//                   className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded"
//                   onClick={() => navigate('/customer/available-plans')} // <- 🔁 Add correct route
//                 >
//                   Purchase Plan
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomerPlans;



// import React, { useEffect, useState } from 'react';
// import Navbar2 from '../layouts/Navbar';
// import { apiGet } from '../services/api';
// import OwnerHeader from './ownerHeader';
// import storage from '../utils/storage';
// import { useNavigate } from 'react-router-dom';

// const CustomerPlans = () => {
//   const [plans, setPlans] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchPlans = async () => {
//       const messId = storage.getItem('messId');
//       if (!messId) {
//         console.error('❌ messId not found in localStorage');
//         setLoading(false);
//         return;
//       }

//     //   try {
//     //     const res = await apiGet(`/customer/mess/${messId}/plan/issued`, {
//     //       headers: {
//     //         Authorization: `Bearer ${localStorage.getItem('token')}`,
//     //       },
//     //     });

//     //     console.log('Fetched plans:', res);

//     //     const { success, data, message } = res.data;

//     //     if (success && Array.isArray(data)) {
//     //       setPlans(data);
//     //       console.groupCollapsed('✅ Issued Plans Fetched');
//     //       data.forEach((plan, idx) => {
//     //         console.log(`Plan ${idx + 1}:`, {
//     //           id: plan._id || plan.planId,
//     //           ...plan,
//     //         });
//     //       });
//     //       console.groupEnd();
//     //     } else {
//     //       console.warn('⚠️ API responded with failure:', message || 'No message provided');
//     //       setPlans([]);
//     //     }
//     //   } catch (error) {
//     //     console.error('❌ Error fetching plans:', error?.response || error);
//     //     setPlans([]);
//     //   } 
//     try {
//   const res = await apiGet(`/customer/mess/${messId}/plan/issued`, {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem('token')}`,
//     },
//   });

//   const { success, data, message } = res.data;

//   if (success && Array.isArray(data) && data.length > 0) {
//     console.log("✅ Issued Plans:", data);
//     setPlans(data);
//   } else {
//     console.warn("⚠️ No plans found or failed response:", message);
//     setPlans([]);
//   }
// } catch (error) {
//   console.error('❌ Error fetching plans:', error);
//   setPlans([]);
// }

//       finally {
//         setLoading(false);
//       }
//     };

//     fetchPlans();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-[#f4f4f4]">
//         <p className="text-lg text-gray-700">Loading plans...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="flex min-h-screen bg-[#f4f4f4]">
//       <aside className="w-[17rem] bg-white shadow">
//         <Navbar2 />
//       </aside>

//       <main className="flex-1 overflow-y-auto">
//         <div className="p-6 max-w-7xl mx-auto">
//           <OwnerHeader />

//           {plans.length === 0 ? (
//             <div className="flex flex-col items-center justify-center text-center mt-24">
//               <img
//                 src="/no-plans-illustration.png"
//                 alt="No Plans"
//                 className="w-48 mb-6"
//               />
//               <h2 className="text-orange-500 font-semibold text-2xl mb-2">
//                 No Plans Purchased
//               </h2>
//               <p className="text-gray-600 mb-6">
//                 Let's get started by purchasing a plan.
//               </p>
//               <button
//                 onClick={() => navigate('/customer/available-plans')}
//                 className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded shadow-md"
//               >
//                 Purchase Plan
//               </button>
//             </div>
//           ) : (
//             <section>
//               <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Active Plans</h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {plans.map((plan, index) => (
//                   <div
//                     key={plan.customerPlanId || index}
//                     className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200 border rounded-xl overflow-hidden"
//                   >
//                     <img
//                       src="/plan-img.jpg"
//                       alt="Plan"
//                       className="w-full h-40 object-cover"
//                     />
//                     <div className="p-4">
//                       <h3 className="text-xl font-semibold text-gray-900 mb-1">
//                         {plan.name || 'Unnamed Plan'}
//                       </h3>
//                       <p className="text-gray-600 text-sm mb-3">
//                         {plan.description || 'No description provided.'}
//                       </p>
//                       <ul className="text-gray-700 text-sm space-y-1">
//                         <li><strong>💰 Price:</strong> ₹{plan.price}</li>
//                         <li><strong>🍱 Tokens:</strong> {plan.tokens}</li>
//                         <li><strong>🗓 Duration:</strong> {plan.duration} Days</li>
//                       </ul>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <div className="flex justify-center mt-10">
//                 <button
//                   onClick={() => navigate('/customer/available-plans')}
//                   className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded shadow"
//                 >
//                   Purchase More Plans
//                 </button>
//               </div>
//             </section>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default CustomerPlans;






// import React, { useEffect, useState } from 'react';
// import { apiGet } from '../services/api';
// import storage from '../utils/storage';
// import Navbar2 from '../layouts/Navbar2';
// import OwnerHeader from '../pages/ownerHeader';

// const IssuedPlans = () => {
//   const messId = storage.getItem('messId');
//   const [plans, setPlans] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchIssuedPlans = async () => {
//     try {
//       const res = await apiGet(`/customer/mess/${messId}/plan/issued`);
//       console.log (res.data);
//       if (res.success && Array.isArray(res.data)) {
//         setPlans(res.data);
//       } else {
//         setPlans([]);
//       }
//     } catch (err) {
//       console.error('Error fetching issued plans:', err);
//       setPlans([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchIssuedPlans();
//   }, []);

//   return (
//  <div className="flex min-h-screen bg-[#FAF9F5]">
//       <Navbar2 />
//       <div className="flex-1 px-10 py-8">
//          <OwnerHeader />

//         <h2 className="text-2xl font-semibold mb-4">Issued Plans</h2>

//         {loading ? (
//           <div className="text-center text-gray-500">Loading...</div>
//         ) : plans.length === 0 ? (
//           <div className="text-center text-red-500 text-lg font-medium mt-10">No plans issued</div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {plans.map((plan, index) => (
//               <div
//                 key={index}
//                 className="border rounded-2xl shadow-sm p-4 bg-white hover:shadow-md transition"
//               >
//                 <h3 className="text-lg font-bold text-gray-800">{plan.name}</h3>
//                 <p className="text-sm text-gray-600 mb-2">{plan.description}</p>
//                 <div className="flex justify-between text-sm text-gray-700">
//                   <span>Days: {plan.durationDays}</span>
//                   <span>Price: ₹{plan.price}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default IssuedPlans;




// import React, { useEffect, useState } from 'react';
// import { apiGet } from '../services/api';
// import storage from '../utils/storage';
// import Navbar2 from '../layouts/Navbar2';
// import OwnerHeader from '../pages/ownerHeader';

// const IssuedPlans = () => {
//   const messId = storage.getItem('messId');
//   const [plans, setPlans] = useState([]);
//   const [loading, setLoading] = useState(true);

// useEffect(() => {
//   const fetchIssuedPlans = async () => {
//     try {
//       if (!messId) {
//         console.warn("messId not found");
//         return;
//       }

//       const res = await apiGet(`/customer/mess/${messId}/plan/issued`);
//       console.log("📦 API Response:", res);

//       if (res.success && Array.isArray(res.data)) {
//         setPlans(res.data);
//       } else {
//         console.warn("Unexpected data format:", res.data);
//         setPlans([]);
//       }
//     } catch (err) {
//       console.error('❌ Error fetching issued plans:', err.response?.data || err.message);
//       setPlans([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchIssuedPlans();
// }, []);

//   return (
//  <div className="flex min-h-screen bg-[#FAF9F5]">
//       <Navbar2 />
//       <div className="flex-1 px-10 py-8">
//          <OwnerHeader />


//         <h2 className="text-2xl font-semibold mb-4">Issued Plans</h2>

//         {loading ? (
//           <div className="text-center text-gray-500">Loading...</div>
//         ) : plans.length === 0 ? (
//           <div className="text-center text-red-500 text-lg font-medium mt-10">No plans issued</div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {plans.map((plan, index) => (
//               <div
//                 key={index}
//                 className="border rounded-2xl shadow-sm p-4 bg-white hover:shadow-md transition"
//               >
//                 <h3 className="text-lg font-bold text-gray-800">{plan.name}</h3>
//                 <p className="text-sm text-gray-600 mb-2">{plan.description}</p>
//                 <div className="flex justify-between text-sm text-gray-700">
//                   <span>Days: {plan.durationDays}</span>
//                   <span>Price: ₹{plan.price}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default IssuedPlans;






// import React, { useEffect, useState } from 'react';
// import { apiGet } from '../services/api';
// import Navbar2 from '../layouts/Navbar2';
// import OwnerHeader from './ownerHeader';
// import storage from '../utils/storage';
// import { useNavigate } from 'react-router-dom';


// const CustomerPlansView = () => {
//   const [messes, setMesses] = useState([]);
//   const [selectedMess, setSelectedMess] = useState(null);
//   const [plans, setPlans] = useState([]);
//   const [activeDropdown, setActiveDropdown] = useState(null);

//   const navigate = useNavigate();


//   useEffect(() => {
//     fetchMesses();
//   }, []);

//   const fetchMesses = async () => {
//     const res = await apiGet('/customer/mess/subscribed');
//     if (res.success && Array.isArray(res.data)) {
//       setMesses(res.data);

//       const storedMessId = storage.getItem('messId');
//       const initialMess =
//         res.data.find((mess) => mess.messId === storedMessId) || res.data[0];

//       setSelectedMess(initialMess);
//       storage.setItem('messId', initialMess.messId); // persist current selection
//       fetchPlans(initialMess.messId);
//     }
//   };


//   const handleUseTokens = (customerPlanId) => {
//   storage.setItem('customerPlanId', customerPlanId);
//   navigate(`/customer/tokens`);
// };

//   const fetchPlans = async (messId) => {
//     const res = await apiGet(`/customer/mess/${messId}/plan/issued`);
//     console.log('Fetched plans:', res);
//     if (res.success) {
//       setPlans(res.data);
//     } else {
//       setPlans([]); // fallback in case of bad response
//     }
//   };

//   const handleMessSelect = (mess) => {
//     setSelectedMess(mess);
//     storage.setItem('messId', mess.messId); // update local storage
//     fetchPlans(mess.messId);
//   };

//   return (
//        <div className="flex">
//       <Navbar2 />
//       <div className="flex-1 bg-gray-50 min-h-screen p-6">
//         <OwnerHeader />

//     <div className="flex gap-6 px-6 py-4 min-h-screen bg-[#FAF9F5]">
//       {/* Left - Mess List */}
//       <div className="w-1/2 space-y-3">
//         <p className="text-lg font-semibold mb-2">Your Mess</p>
//         {messes.map((mess) => (
//           <div
//             key={mess.messId}
//             onClick={() => handleMessSelect(mess)}
//             className={`flex items-center gap-4 p-3 rounded-xl border cursor-pointer transition ${
//               selectedMess?.messId === mess.messId
//                 ? 'border-orange-500 bg-orange-50'
//                 : 'border-gray-300'
//             }`}
//           >
//             <img
//               src={mess.logoUrl || '/default-icon.png'}
//               alt="logo"
//               className="w-12 h-12 rounded-md"
//             />
//             <div>
//               <p className="font-semibold">{mess.messName}</p>
//               <p className="text-sm text-gray-500">{mess.address}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Right - Plans */}
//       <div className="w-1/2 space-y-4">
//         <p className="text-lg font-semibold">
//           Purchased Plans ({plans.length})
//         </p>

//         <div className="space-y-3">
//           {plans.length === 0 ? (
//             <p className="text-red-500 font-medium">No plans available for this mess</p>
//           ) : (
//            plans.map((plan) => (
//   <div
//     key={plan._id || plan.customerPlanId}
//     className="border p-3 rounded-xl flex justify-between gap-4 items-start bg-white relative"
//   >
//     <div className="flex gap-4">
//       <img
//         src={plan.imageUrl || '/default-plan.jpg'}
//         className="w-20 h-20 rounded-lg"
//         alt="plan"
//       />
//       <div>
//         <p className="font-medium">{plan.name}</p>
//         <p className="text-sm text-gray-600">{plan.description}</p>
//         <div className="text-sm text-gray-500">
//           <p>{plan.totalTokens} Tokens</p>
//           <p>{plan.durationDays} Days</p>
//         </div>
//       </div>
//     </div>

//     {/* Three-dot menu */}
//     <div className="relative">
//       <button
//         onClick={() =>
//           setActiveDropdown((prev) => (prev === plan.customerPlanId ? null :plan.customerPlanId))
//         }
//         className="text-gray-600 hover:text-gray-800 text-xl px-2"
//       >
//         ⋮
//       </button>

//       {activeDropdown === plan.customerPlanId && (
//         <div className="absolute top-8 right-0 bg-white shadow-lg rounded-md border w-32 z-10">
//           <button
//             onClick={() => handleUseTokens(plan.customerPlanId)}
//             className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
//           >
//             Use Tokens
//           </button>
//         </div>
//       )}
//     </div>
//   </div>
// ))

//           )}
//         </div>

//         <button className="w-full bg-orange-500 text-white py-2 rounded-xl hover:bg-orange-600 transition">
//           Purchase Plan
//         </button>
//         </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomerPlansView;



// import React, { useEffect, useState } from 'react';
// import { apiGet } from '../services/api';
// import Navbar2 from '../layouts/Navbar2';
// import OwnerHeader from './ownerHeader';
// import storage from '../utils/storage';
// import { useNavigate } from 'react-router-dom';

// const CustomerPlansView = () => {
//   const [messes, setMesses] = useState([]);
//   const [selectedMess, setSelectedMess] = useState(null);
//   const [purchasedPlans, setPurchasedPlans] = useState([]);
//   const [availablePlans, setAvailablePlans] = useState([]);
//   const [activeDropdown, setActiveDropdown] = useState(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchMesses();
//   }, []);

//   const fetchMesses = async () => {
//     const res = await apiGet('/customer/mess/subscribed');
//     if (res.success && Array.isArray(res.data)) {
//       setMesses(res.data);

//       const storedMessId = storage.getItem('messId');
//       const initialMess =
//         res.data.find((mess) => mess.messId === storedMessId) || res.data[0];

//       setSelectedMess(initialMess);
//       storage.setItem('messId', initialMess.messId);
//       fetchPlans(initialMess.messId);
//     }
//   };

//   const fetchPlans = async (messId) => {
//     const [issuedRes, allPlansRes] = await Promise.all([
//       apiGet(`/customer/mess/${messId}/plan/issued`),
//       apiGet(`/customer/mess/plans/${messId}`)
//     ]);

//     if (issuedRes.success) {
//       setPurchasedPlans(issuedRes.data);
//     } else {
//       setPurchasedPlans([]);
//     }

//     if (allPlansRes.success) {
//       setAvailablePlans(allPlansRes.data);
//     } else {
//       setAvailablePlans([]);
//     }
//   };

//   const handleMessSelect = (mess) => {
//     setSelectedMess(mess);
//     storage.setItem('messId', mess.messId);
//     fetchPlans(mess.messId);
//   };

//   const handleUseTokens = (customerPlanId) => {
//     storage.setItem('customerPlanId', customerPlanId);
//     navigate(`/customer/tokens`);
//   };

//   return (
//     <div className="flex">
//       <Navbar2 />
//       <div className="flex-1 bg-gray-50 min-h-screen p-6">
//         <OwnerHeader />

//         <div className="flex gap-6 px-6 py-4 min-h-screen bg-[#FAF9F5]">
//           {/* Left - Mess List */}
//           <div className="w-1/2 space-y-3">
//             <p className="text-lg font-semibold mb-2">Your Mess</p>
//             {messes.map((mess) => (
//               <div
//                 key={mess.messId}
//                 onClick={() => handleMessSelect(mess)}
//                 className={`flex items-center gap-4 p-3 rounded-xl border cursor-pointer transition ${
//                   selectedMess?.messId === mess.messId
//                     ? 'border-orange-500 bg-orange-50'
//                     : 'border-gray-300'
//                 }`}
//               >
//                 <img
//                   src={mess.logoUrl || '/default-icon.png'}
//                   alt="logo"
//                   className="w-12 h-12 rounded-md"
//                 />
//                 <div>
//                   <p className="font-semibold">{mess.messName}</p>
//                   <p className="text-sm text-gray-500">{mess.address}</p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Right - Purchased and Available Plans */}
//           <div className="w-1/2 space-y-6">
//             {/* Purchased Plans */}
//             <div>
//               <p className="text-lg font-semibold">
//                 Purchased Plans ({purchasedPlans.length})
//               </p>

// <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 {purchasedPlans.length === 0 ? (
//                   <p className="text-red-500 font-medium">No plans purchased</p>
//                 ) : (
//                   purchasedPlans.map((plan) => (
//                     <div
//                       key={plan._id || plan.customerPlanId}
//                       className="border p-3 rounded-xl flex justify-between gap-4 items-start bg-white relative"
//                     >
//                       <div className="flex gap-4">
//                         <img
//                           src={plan.imageUrl || '/default-plan.jpg'}
//                           className="w-20 h-20 rounded-lg"
//                           alt="plan"
//                         />
//                         <div>
//                           <p className="font-medium">{plan.name}</p>
//                           <p className="text-sm text-gray-600">{plan.description}</p>
//                           <div className="text-sm text-gray-500">
//                             <p>{plan.totalTokens} Tokens</p>
//                             <p>{plan.durationDays} Days</p>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="relative">
//                         <button
//                           onClick={() =>
//                             setActiveDropdown((prev) =>
//                               prev === plan.customerPlanId ? null : plan.customerPlanId
//                             )
//                           }
//                           className="text-gray-600 hover:text-gray-800 text-xl px-2"
//                         >
//                           ⋮
//                         </button>

//                         {activeDropdown === plan.customerPlanId && (
//                           <div className="absolute top-8 right-0 bg-white shadow-lg rounded-md border w-32 z-10">
//                             <button
//                               onClick={() => handleUseTokens(plan.customerPlanId)}
//                               className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
//                             >
//                               Use Tokens
//                             </button>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </div>
//             </div>

//             {/* Available Plans */}
//             <div>
//               <p className="text-lg font-semibold">
//                 Available Plans ({availablePlans.length})
//               </p>

// <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 {availablePlans.length === 0 ? (
//                   <p className="text-gray-500">No available plans for this mess</p>
//                 ) : (
//                   availablePlans.map((plan) => (
//                     <div
//                       key={plan._id}
//                       className="border p-3 rounded-xl flex gap-4 items-start bg-white"
//                     >
//                       <img
//                         src={plan.imageUrl || '/default-plan.jpg'}
//                         className="w-20 h-20 rounded-lg"
//                         alt="plan"
//                       />
//                       <div>
//                         <p className="font-medium">{plan.name}</p>
//                         <p className="text-sm text-gray-600">{plan.description}</p>
//                         <div className="text-sm text-gray-500">
//                           <p>{plan.totalTokens} Tokens</p>
//                           <p>{plan.durationDays} Days</p>
//                           <p>₹{plan.price}</p>
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </div>
//             </div>

//             <button className="w-full bg-orange-500 text-white py-2 rounded-xl hover:bg-orange-600 transition">
//               Purchase Plan
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomerPlansView;



// import React, { useEffect, useState } from 'react';
// import { apiGet } from '../services/api';
// import Navbar2 from '../layouts/Navbar2';
// import OwnerHeader from './ownerHeader';
// import storage from '../utils/storage';
// import { useNavigate } from 'react-router-dom';

// const CustomerPlansView = () => {
//   const [messes, setMesses] = useState([]);
//   const [expandedMessId, setExpandedMessId] = useState(null);
//   const [plansByMess, setPlansByMess] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchMesses();
//   }, []);

//   const fetchMesses = async () => {
//     const res = await apiGet('/customer/mess/subscribed');
//     if (res.success && Array.isArray(res.data)) {
//       setMesses(res.data);
//     }
//   };

//   const fetchPlans = async (messId) => {
//     const [issuedRes, allPlansRes] = await Promise.all([
//       apiGet(`/customer/mess/${messId}/plan/issued`),
//       apiGet(`/customer/mess/plans/${messId}`),
//     ]);

//     setPlansByMess((prev) => ({
//       ...prev,
//       [messId]: {
//         purchased: issuedRes.success ? issuedRes.data : [],
//         available: allPlansRes.success ? allPlansRes.data : [],
//       },
//     }));
//   };

//   const handleMessClick = (mess) => {
//     const alreadyExpanded = expandedMessId === mess.messId;
//     setExpandedMessId(alreadyExpanded ? null : mess.messId);
//     storage.setItem('messId', mess.messId);
//     if (!plansByMess[mess.messId]) {
//       fetchPlans(mess.messId);
//     }
//   };

//   const handleUseTokens = (customerPlanId) => {
//     storage.setItem('customerPlanId', customerPlanId);
//     navigate(`/customer/tokens`);
//   };

//   return (
//     <div className="flex">
//       <Navbar2 />
//       <div className="flex-1 bg-gray-50 min-h-screen p-6">
//         <OwnerHeader />
//         <div className="space-y-6 bg-[#FAF9F5] px-4 py-4">
//           {messes.map((mess) => {
//             const isExpanded = expandedMessId === mess.messId;
//             const plans = plansByMess[mess.messId] || { purchased: [], available: [] };

//             return (
//               <div key={mess.messId} className="border rounded-xl bg-white p-4 shadow-sm">
//                 <div
//                   onClick={() => handleMessClick(mess)}
//                   className={`flex items-center gap-4 cursor-pointer p-2 rounded-lg border ${
//                     isExpanded ? 'border-orange-500 bg-orange-50' : 'border-gray-300'
//                   }`}
//                 >
//                   <img
//                     src={mess.logoUrl || '/default-icon.png'}
//                     alt="logo"
//                     className="w-12 h-12 rounded-md"
//                   />
//                   <div>
//                     <p className="font-semibold">{mess.messName}</p>
//                     <p className="text-sm text-gray-500">{mess.address}</p>
//                   </div>
//                 </div>

//                 {isExpanded && (
//                   <div className="mt-4">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       {/* Purchased Plans */}
//                       <div>
//                         <p className="text-lg font-semibold mb-2">
//                           Purchased Plans ({plans.purchased.length})
//                         </p>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                           {plans.purchased.length === 0 ? (
//                             <p className="text-red-500 font-medium">No plans purchased</p>
//                           ) : (
//                             plans.purchased.map((plan) => (
//                               <div
//                                 key={plan.customerPlanId}
//                                 className="border p-3 rounded-xl bg-white shadow-sm flex justify-between"
//                               >
//                                 <div className="flex gap-4">
//                                   <img
//                                     src={plan.imageUrl || '/default-plan.jpg'}
//                                     alt="plan"
//                                     className="w-16 h-16 rounded"
//                                   />
//                                   <div>
//                                     <p className="font-medium">{plan.name}</p>
//                                     <p className="text-sm text-gray-600">{plan.description}</p>
//                                     <p className="text-sm text-gray-500">
//                                       {plan.totalTokens} Tokens / {plan.durationDays} Days
//                                     </p>
//                                   </div>
//                                 </div>
//                                 <div className="relative">
//                                   <button
//                                     onClick={() => handleUseTokens(plan.customerPlanId)}
//                                     className="text-sm text-orange-600 hover:underline"
//                                   >
//                                     Use Tokens
//                                   </button>
//                                 </div>
//                               </div>
//                             ))
//                           )}
//                         </div>
//                       </div>

//                       {/* Available Plans */}
//                       <div>
//                         <p className="text-lg font-semibold mb-2">
//                           Available Plans ({plans.available.length})
//                         </p>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                           {plans.available.length === 0 ? (
//                             <p className="text-gray-500">No available plans</p>
//                           ) : (
//                             plans.available.map((plan) => (
//                               <div
//                                 key={plan._id}
//                                 className="border p-3 rounded-xl bg-white shadow-sm"
//                               >
//                                 <div className="flex gap-4">
//                                   <img
//                                     src={plan.imageUrl || '/default-plan.jpg'}
//                                     alt="plan"
//                                     className="w-16 h-16 rounded"
//                                   />
//                                   <div>
//                                     <p className="font-medium">{plan.name}</p>
//                                     <p className="text-sm text-gray-600">{plan.description}</p>
//                                     <p className="text-sm text-gray-500">
//                                       {plan.totalTokens} Tokens / {plan.durationDays} Days
//                                     </p>
//                                     <p className="text-sm text-gray-700 font-semibold">
//                                       ₹{plan.price}
//                                     </p>
//                                   </div>
//                                 </div>
//                               </div>
//                             ))
//                           )}
//                         </div>
//                       </div>
//                     </div>

//                     <button className="mt-4 w-full bg-orange-500 text-white py-2 rounded-xl hover:bg-orange-600 transition">
//                       Purchase Plan
//                     </button>
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomerPlansView;



import React, { useEffect, useState } from 'react';
import { apiGet } from '../services/api';
import Navbar2 from '../layouts/Navbar2';
import OwnerHeader from './ownerHeader';
import storage from '../utils/storage';
import { useNavigate } from 'react-router-dom';

const CustomerPlansView = () => {
  const [messes, setMesses] = useState([]);
  const [expandedMessId, setExpandedMessId] = useState(null);
  const [plansByMess, setPlansByMess] = useState({});
  const [selectedAvailablePlan, setSelectedAvailablePlan] = useState(null);

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
    setSelectedAvailablePlan(null);
    if (!plansByMess[mess.messId]) {
      fetchPlans(mess.messId);
    }
  };

  const handleUseTokens = (customerPlanId) => {
    storage.setItem('customerPlanId', customerPlanId);
    navigate(`/customer/tokens`);
  };

  const handleSelectAvailablePlan = (messId, planId) => {
    setSelectedAvailablePlan((prev) =>
      prev?.messId === messId && prev?.planId === planId ? null : { messId, planId }
    );
  };

  const handlePurchasePlan = () => {
    if (selectedAvailablePlan) {
      const { planId, messId } = selectedAvailablePlan;
      storage.setItem('selectedPlanId', planId);
      storage.setItem('messId', messId);
      navigate(`/customer/payment`);
    }
  };

  return (
    <div className="flex h-screen">
      <Navbar2 />
      {/* <div className="flex-1 p-6 overflow-y-auto bg-[#f9f4f0] min-h-screen"> */}
      <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-green-50 overflow-y-auto">
        <OwnerHeader />
        <div className="space-y-6 bg-[#FAF9F5] px-4 py-4">
          {messes.map((mess) => {
            const isExpanded = expandedMessId === mess.messId;
            const plans = plansByMess[mess.messId] || { purchased: [], available: [] };

            return (
              <div key={mess.messId} className="border rounded-xl bg-white p-4 shadow-sm">
                <div
                  onClick={() => handleMessClick(mess)}
                  className={`flex items-center gap-4 cursor-pointer p-2 rounded-lg border ${
                    isExpanded ? 'border-orange-500 bg-orange-50' : 'border-gray-300'
                  }`}
                >
                  <img
                    src={mess.logoUrl || '/default-icon.png'}
                    alt="logo"
                    className="w-12 h-12 rounded-md"
                  />
                  <div>
                    <p className="font-semibold">{mess.messName}</p>
                    <p className="text-sm text-gray-500">{mess.address}</p>
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-4 space-y-4">
                    {/* Purchased Plans */}
                    <div>
                      <p className="text-lg font-semibold mb-2">
                        Purchased Plans ({plans.purchased.length})
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {plans.purchased.length === 0 ? (
                          <p className="text-red-500 font-medium">No plans purchased</p>
                        ) : (
                          plans.purchased.map((plan) => (
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
                          ))
                        )}
                      </div>
                    </div>

                    {/* Available Plans */}
                    <div>
                      <p className="text-lg font-semibold mb-2">
                        Available Plans ({plans.available.length})
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {plans.available.length === 0 ? (
                          <p className="text-gray-500">No available plans</p>
                        ) : (
                          plans.available.map((plan) => {
                            const isSelected =
                              selectedAvailablePlan?.planId === plan._id &&
                              selectedAvailablePlan?.messId === mess.messId;
                            return (
                              <div
                                key={plan._id}
                                onClick={() =>
                                  handleSelectAvailablePlan(mess.messId, plan._id)
                                }
                                className={`border p-3 rounded-xl shadow-sm cursor-pointer transition-all ${
                                  isSelected
                                    ? 'border-orange-500 bg-orange-50'
                                    : 'bg-white border-gray-300'
                                }`}
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
                                    <p className="text-sm text-gray-700 font-semibold">
                                      ₹{plan.price}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>

                    {/* Purchase Button */}
                    <button
                      disabled={
                        !selectedAvailablePlan ||
                        selectedAvailablePlan.messId !== mess.messId
                      }
                      onClick={handlePurchasePlan}
                      className={`mt-4 w-full py-2 rounded-xl transition font-semibold ${
                        selectedAvailablePlan?.messId === mess.messId
                          ? 'bg-orange-500 text-white hover:bg-orange-600'
                          : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                      }`}
                    >
                      Purchase Plan
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CustomerPlansView;
