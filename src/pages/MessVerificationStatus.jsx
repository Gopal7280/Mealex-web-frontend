

// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { apiGet } from '../services/api';
// import storage from '../utils/storage'; // Ensure storage is imported

// const MessVerificationStatus = () => {
//   const { messId } = useParams();
//   const navigate = useNavigate();
//   const [mess, setMess] = useState(null);
//   const [failedFields, setFailedFields] = useState([]);
//   const [status, setStatus] = useState('');

//   useEffect(() => {

// const fetchMess = async () => {
//   try {
//     const res = await apiGet(`/owner/mess/id/${messId}`);
//     console.log(res);

//     const data = res?.data;

// if (typeof data !== 'object' || data === null) {
//   throw new Error("Invalid response format from backend");
// }

//     setMess(data);
//     // setStatus(data.status?.toLowerCase() || 'unknown');
// let rawStatus = data.status?.toLowerCase() || 'unknown';
// if (rawStatus === 'activated') rawStatus = 'active'; // 🔥 Map to expected value
// setStatus(rawStatus);

// storage.setItem('messId', messId);

//     setFailedFields(data.failedFields || []);
//   } catch (err) {
//   }
// };


//     fetchMess();
//   }, [messId]);

//   const isFieldInvalid = (field) => failedFields.includes(field);

//   if (!mess) {
//     return <div className="text-center text-gray-500 mt-10">Loading...</div>;
//   }

//   const renderStatusTitle = () => {
//     if (status === 'active') return 'VERIFIED SUCCESSFULLY ✔';
//     if (status === 'pending') return 'VERIFICATION IN PROGRESS ⏳';
//     return 'VERIFICATION FAILED ❌';
//   };

//   const renderStatusColor = () => {
//     if (status === 'active') return 'text-green-700';
//     if (status === 'pending') return 'text-yellow-500';
//     return 'text-red-600';
//   };

//   return (
//     <div className="min-h-screen p-8 bg-white">
//       <h2 className={`text-center text-2xl font-bold mb-6 ${renderStatusColor()}`}>
//         {renderStatusTitle()}
//       </h2>

   
// <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//   <input className={`input ${isFieldInvalid('messName') && 'border-red-500'}`} value={mess.messName} readOnly />
//   <input className={`input ${isFieldInvalid('messType') && 'border-red-500'}`} value={mess.messType} readOnly />
//   <input className={`input ${isFieldInvalid('email') && 'border-red-500'}`} value={mess.email} readOnly />
//   <input className={`input ${isFieldInvalid('contactNumber') && 'border-red-500'}`} value={mess.contactNumber} readOnly />
//   <input className={`input ${isFieldInvalid('alternateContact') && 'border-red-500'}`} value={mess.alternateContact || 'N/A'} readOnly />
//   <input className={`input ${isFieldInvalid('address') && 'border-red-500'}`} value={mess.address} readOnly />
//   <input className={`input ${isFieldInvalid('city') && 'border-red-500'}`} value={mess.city} readOnly />
//   <input className={`input ${isFieldInvalid('state') && 'border-red-500'}`} value={mess.state} readOnly />
//   <input className={`input ${isFieldInvalid('pincode') && 'border-red-500'}`} value={mess.pincode} readOnly />
//   <input className={`input ${isFieldInvalid('activationDocType') && 'border-red-500'}`} value={mess.activationDocType} readOnly />
//   <input className={`input`} value={mess.openTime} readOnly />
//   <input className={`input`} value={mess.closeTime} readOnly />
//   <input className={`input`} value={(mess.daysOpen || []).join(', ')} readOnly />
// </div>
// <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
//   <div>
//     <label className="block text-sm font-medium text-gray-600 mb-1">Logo</label>
//     <a href={mess.logoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View Logo</a>
//   </div>
//   <div>
//     <label className="block text-sm font-medium text-gray-600 mb-1">FSSAI Document</label>
//     <a href={mess.fssaiDocUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View FSSAI Doc</a>
//   </div>
//   <div>
//     <label className="block text-sm font-medium text-gray-600 mb-1">Activation Document</label>
//     <a href={mess.activationDocUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View Activation Doc</a>
//   </div>
// </div>

  

// {status === 'inactive' && (
//   <div className="text-center mt-6">
//     <p className="text-sm text-orange-500 mb-2">Highlighted fields represent the reason for failure.</p>
//     <button onClick={() => navigate('/minimal-dashboard', { state: { mess } })} className="px-6 py-2 bg-orange-500 text-white rounded-full">Re-Apply</button>
//   </div>
// )}
// {status === 'active' && (
//   <div className="text-center mt-6">
//     <button onClick={() => navigate('/owner-dashboard')} className="px-6 py-2 bg-green-600 text-white rounded-full">Go to Dashboard</button>
//   </div>
// )}
// {status === 'pending' && (
//   <div className="text-center mt-6">
//     <button onClick={() => navigate('/minimal-dashboard')} className="px-6 py-2 bg-gray-600 text-white rounded-full">Cancel Verification</button>
//   </div>
// )}
//     </div>
//   );
// };

// export default MessVerificationStatus;










// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { apiGet } from '../services/api';
// import storage from '../utils/storage';

// const MessVerificationStatus = () => {
//   const { messId } = useParams();
//   const navigate = useNavigate();
//   const [mess, setMess] = useState(null);
//   const [failedFields, setFailedFields] = useState([]);
//   const [status, setStatus] = useState('');
//   const [remark, setRemark] = useState('');

//   useEffect(() => {
//     const fetchMess = async () => {
//       try {
//         const res = await apiGet(`/owner/mess/id/${messId}`);
//         const data = res?.data;

//         if (typeof data !== 'object' || data === null)
//           throw new Error("Invalid response format");

//         setMess(data);
//         let rawStatus = data.status?.toLowerCase() || 'unknown';
//         if (rawStatus === 'activated') rawStatus = 'active';
//         setStatus(rawStatus);

//         setFailedFields(data.failedFields || []);
//         setRemark(data.mealxactionremark || '');
//         storage.setItem('messId', messId);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchMess();
//   }, [messId]);

//   const isFieldInvalid = (field) => failedFields.includes(field);

//   const formatTime12Hour = (timeStr) => {
//     if (!timeStr) return '';
//     const [hour, minute] = timeStr.split(':');
//     const h = parseInt(hour);
//     const ampm = h >= 12 ? 'PM' : 'AM';
//     const formattedHour = h % 12 || 12;
//     return `${formattedHour}:${minute} ${ampm}`;
//   };

//   if (!mess)
//     return <div className="text-center text-gray-500 mt-10">Loading...</div>;

//   const renderStatusTitle = () => {
//     if (status === 'active') return 'VERIFIED SUCCESSFULLY ✔';
//     if (status === 'pending') return 'VERIFICATION IN PROGRESS...';
//     return 'VERIFICATION FAILED ❌';
//   };

//   const renderStatusColor = () => {
//     if (status === 'active') return 'text-green-700';
//     if (status === 'pending') return 'text-green-500';
//     return 'text-red-600';
//   };

//   const isEditable = status === 'inactive';

//   return (
//     <div className="min-h-screen bg-white p-8">
//       {/* Header */}
//       <div className="text-center mb-6">
//         <h2 className={`text-2xl font-bold ${renderStatusColor()}`}>
//           MESS KYC STATUS — {renderStatusTitle()}
//         </h2>
//         {status === 'inactive' && remark && (
//           <p className="text-red-500 font-medium mt-2">{remark}</p>
//         )}
//       </div>

//       {/* Form */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Mess Name + Logo */}
//         <div className="col-span-1 md:col-span-3 flex items-center gap-4">
//           <div className="flex-1">
//             <label className="block text-sm font-medium text-gray-600 mb-1">Mess Name</label>
//             <input
//               className={`w-full border rounded-md px-3 py-2 ${
//                 isFieldInvalid('messName') ? 'border-red-500' : 'border-gray-300'
//               }`}
//               value={mess.messName || ''}
//               readOnly={!isEditable}
//               onChange={(e) => isEditable && setMess({ ...mess, messName: e.target.value })}
//             />
//           </div>
//           {mess.logoUrl && (
//             <div className="w-16 h-16 flex-shrink-0">
//               <img
//                 src={mess.logoUrl}
//                 alt="Mess Logo"
//                 className="w-full h-full object-cover rounded-md border border-gray-300"
//               />
//             </div>
//           )}
//         </div>

//         {/* Other Fields */}
//         <Field label="Mess Type" field="messType" mess={mess} setMess={setMess} isEditable={isEditable} invalid={isFieldInvalid('messType')} />
//         <Field label="Email Address" field="email" mess={mess} setMess={setMess} isEditable={isEditable} invalid={isFieldInvalid('email')} />
//         <Field label="Contact Number" field="contactNumber" mess={mess} setMess={setMess} isEditable={isEditable} invalid={isFieldInvalid('contactNumber')} />
//         <Field label="Alternate Contact" field="alternateContact" mess={mess} setMess={setMess} isEditable={isEditable} invalid={isFieldInvalid('alternateContact')} />
//         <Field label="State" field="state" mess={mess} setMess={setMess} isEditable={isEditable} invalid={isFieldInvalid('state')} />
//         <Field label="City" field="city" mess={mess} setMess={setMess} isEditable={isEditable} invalid={isFieldInvalid('city')} />
//         <Field label="Pincode" field="pincode" mess={mess} setMess={setMess} isEditable={isEditable} invalid={isFieldInvalid('pincode')} />
//         <Field label="Address" field="address" mess={mess} setMess={setMess} isEditable={isEditable} invalid={isFieldInvalid('address')} />
//         <Field label="Open Time" value={formatTime12Hour(mess.openTime)} readOnly />
//         <Field label="Close Time" value={formatTime12Hour(mess.closeTime)} readOnly />
//         <Field label="Days Open" value={(mess.daysOpen || []).join(', ')} readOnly />
//         <Field label="FSSAI License Number" field="fssaiLicenseNumber" mess={mess} setMess={setMess} isEditable={isEditable} invalid={isFieldInvalid('fssaiLicenseNumber')} />
//         <Field label="Activation Document Type" field="activationDocType" mess={mess} setMess={setMess} isEditable={isEditable} invalid={isFieldInvalid('activationDocType')} />
//       </div>

//       {/* Document Links */}
//       <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
//         {mess.fssaiDocUrl && (
//           <div>
//             <label className="block text-sm font-medium text-gray-600 mb-1">FSSAI Document</label>
//             <a href={mess.fssaiDocUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
//               View FSSAI Doc
//             </a>
//           </div>
//         )}
//         {mess.activationDocUrl && (
//           <div>
//             <label className="block text-sm font-medium text-gray-600 mb-1">Activation Document</label>
//             <a href={mess.activationDocUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
//               View Activation Doc
//             </a>
//           </div>
//         )}
//       </div>

//       {/* Footer Buttons */}
//       <div className="text-center mt-10">
//         {status === 'inactive' && (
//           <>
//             <p className="text-sm text-orange-500 mb-2">
//               Highlighted Area Represents The Reason Of Failure
//             </p>
//             <button
//               onClick={() => navigate('/mess-details', { state: { mess } })}
//               className="px-6 py-2 bg-orange-500 text-white rounded-full"
//             >
//               Re-Apply
//             </button>
//           </>
//         )}
//         {status === 'pending' && (
//           <button
//             onClick={() => navigate('/minimal-dashboard')}
//             className="px-6 py-2 bg-gray-600 text-white rounded-full"
//           >
//             Cancel Verification
//           </button>
//         )}
//         {status === 'active' && (
//           <button
//             onClick={() => navigate('/owner-dashboard')}
//             className="px-6 py-2 bg-green-600 text-white rounded-full"
//           >
//             Go to Dashboard
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// const Field = ({ label, field, value, mess, setMess, isEditable, invalid, readOnly }) => {
//   const val = value ?? mess?.[field] ?? '';
//   return (
//     <div>
//       <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
//       <input
//         className={`w-full border rounded-md px-3 py-2 ${
//           invalid ? 'border-red-500' : 'border-gray-300'
//         }`}
//         value={val}
//         readOnly={!isEditable && !readOnly}
//         onChange={(e) =>
//           isEditable && field
//             ? setMess((prev) => ({ ...prev, [field]: e.target.value }))
//             : null
//         }
//       />
//     </div>
//   );
// };

// export default MessVerificationStatus;

// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { apiGet,apiPost } from '../services/api';
// import storage from '../utils/storage';

// const MessVerificationStatus = () => {
//   const { messId } = useParams();
//   const navigate = useNavigate();
//   const [mess, setMess] = useState(null);
//   const [failedFields, setFailedFields] = useState([]);
//   const [status, setStatus] = useState('');
//   const [remark, setRemark] = useState('');

//   useEffect(() => {
//     const fetchMess = async () => {
//       try {
//         const res = await apiGet(`/owner/mess/id/${messId}`);
//         const data = res?.data;

//         if (typeof data !== 'object' || data === null)
//           throw new Error("Invalid response format");

//         setMess(data);
//         let rawStatus = data.status?.toLowerCase() || 'unknown';
//         if (rawStatus === 'activated') rawStatus = 'active';
//         setStatus(rawStatus);

//         setFailedFields(data.failedFields || []);
//         setRemark(data.mealxactionremark || '');
//         storage.setItem('messId', messId);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchMess();
//   }, [messId]);

//   const handleReApply = async () => {
//   try {

//     const to24Hour = (hour, minute, period) => {
//   let h = parseInt(hour, 10);
//   if (period === "PM" && h !== 12) h += 12;
//   if (period === "AM" && h === 12) h = 0;
//   return `${String(h).padStart(2, "0")}:${minute}`;
// };

// // inside handleReApply before formData creation:
// const openTime24 = to24Hour(mess.openTimeHour, mess.openTimeMinute, mess.openTimePeriod);
// const closeTime24 = to24Hour(mess.closeTimeHour, mess.closeTimeMinute, mess.closeTimePeriod);
// mess.openTime = openTime24;
// mess.closeTime = closeTime24;
 
//     const formData = new FormData();

//     // Add text fields (skip system ones)
//     Object.entries(mess).forEach(([key, val]) => {
//       if (
//         [
//           'messId', 'messOwnerId', '_id', '__v',
//           'isActive', 'isVerified', 'status',
//           'mealxAction', 'mealxactionremark',
//           'kyc_stage', 'fssaiDocUrl',
//           'activationDocUrl', 'logoUrl',
//           'isEmailVerified', 'createdAt', 'updatedAt'
//         ].includes(key)
//       ) return;

//       if (val !== null && val !== undefined && typeof val !== 'object') {
//         formData.append(key, val);
//       }
//     });

//     // Add file fields if provided
//     if (mess.logoFile) formData.append('logo', mess.logoFile);
//     if (mess.fssaiDocFile) formData.append('fssaiDoc', mess.fssaiDocFile);
//     if (mess.activationDocFile) formData.append('activationDoc', mess.activationDocFile);

//     // Append arrays properly
//     if (Array.isArray(mess.daysOpen))
//       mess.daysOpen.forEach((day) => formData.append('daysOpen', day));
//     if (Array.isArray(mess.services))
//       mess.services.forEach((srv) => formData.append('services', srv));

//     const res = await apiPost(`/mess/${messId}/profile/update`, formData, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     });
//   console.log(res);
//     if (res.success) {
//       alert('✅ Mess profile updated successfully. Verification re-initiated.');
//       navigate('/minimal-dashboard');
//     } else {
//       alert('⚠️ ' + (res.data.message || 'Failed to update.'));
//     }
//   } catch (err) {
//     console.error(err);
//     alert('❌ Something went wrong while reapplying.');
//   }
// };


//   const isFieldInvalid = (field) => failedFields.includes(field);

//   const formatTime12Hour = (timeStr) => {
//     if (!timeStr) return '';
//     const [hour, minute] = timeStr.split(':');
//     const h = parseInt(hour);
//     const ampm = h >= 12 ? 'PM' : 'AM';
//     const formattedHour = h % 12 || 12;
//     return `${formattedHour}:${minute} ${ampm}`;
//   };

//   if (!mess)
//     return <div className="text-center text-gray-500 mt-10">Loading...</div>;

//   const renderStatusTitle = () => {
//     if (status === 'active') return 'VERIFIED SUCCESSFULLY ✔';
//     if (status === 'pending') return 'VERIFICATION IN PROGRESS...';
//     return 'VERIFICATION FAILED ❌';
//   };

//   const renderStatusColor = () => {
//     if (status === 'active') return 'text-green-700';
//     if (status === 'pending') return 'text-green-500';
//     return 'text-red-600';
//   };

//   const isEditable = status === 'inactive';

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       {/* Header */}
//       <div className="text-center mb-8">
//         <h2 className={'text-3xl font-bold text-[#FC7C00] '}>
//           MESS KYC STATUS
//         </h2>
//         <h2 className={`text-3xl mt-2 font-bold ${renderStatusColor()}`}
//           >{renderStatusTitle()}</h2>
//         {status === 'inactive' && remark && (
//           <p className="text-red-500 font-medium mt-1">({remark})</p>
//         )}
//       </div>

//       {/* Card Container */}
//       <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
        
//         {/* Logo + Name Section */}
//         <div className="flex items-center gap-6 mb-8">
//           <div className="relative">
//             <img
//               src={mess.logoUrl || '/placeholder.jpg'}
//               alt="Mess Logo"
//               className="w-20 h-20 object-cover rounded-full border border-gray-300"
//             />
//             {isEditable && (
//               <label className="absolute bottom-0 right-0 bg-gray-800 text-white rounded-full p-1 cursor-pointer text-xs">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={(e) => {
//                     const file = e.target.files[0];
//                     if (file) {
//                       const reader = new FileReader();
//                       reader.onloadend = () =>
//                         setMess({ ...mess, logoUrl: reader.result });
//                       reader.readAsDataURL(file);
//                     }
//                   }}
//                 />
//                 ✎
//               </label>
//             )}
//           </div>
//           <div className="flex-1">
//             <label className="block text-sm font-medium text-gray-600 mb-1">
//               Mess Name
//             </label>
//             <input
//               className={`w-full md:w-80 border rounded-md px-3 py-2 font-semibold ${
//                 isFieldInvalid('messName') ? 'border-red-500' : 'border-gray-300'
//               }`}
//               value={mess.messName || ''}
//               readOnly={!isEditable}
//               onChange={(e) =>
//                 isEditable && setMess({ ...mess, messName: e.target.value })
//               }
//             />
//           </div>
//           <span
//             className={`px-4 py-1 rounded-full text-sm font-semibold ${
//               status === 'active'
//                 ? 'bg-green-100 text-green-700'
//                 : status === 'pending'
//                 ? 'bg-yellow-100 text-yellow-700'
//                 : 'bg-red-100 text-red-700'
//             }`}
//           >
//             {status?.toUpperCase()}
//           </span>
//         </div>

//         {/* Fields Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
//           <Field label="Owner Name" field="ownerName" mess={mess} setMess={setMess} isEditable={isEditable} />
//           <Field label="Email" field="email" mess={mess} setMess={setMess} isEditable={isEditable} />
//           <Field label="Contact Number" field="contactNumber" mess={mess} setMess={setMess} isEditable={isEditable} />
//           <Field label="Alternate Contact" field="alternateContact" mess={mess} setMess={setMess} isEditable={isEditable} />
//           <Field label="State" field="state" mess={mess} setMess={setMess} isEditable={isEditable} />
//           <Field label="City" field="city" mess={mess} setMess={setMess} isEditable={isEditable} />
//           <Field label="Pincode" field="pincode" mess={mess} setMess={setMess} isEditable={isEditable} />
//           <Field label="Address" field="address" mess={mess} setMess={setMess} isEditable={isEditable} />
//           <Field label="Mess Type" field="messType" mess={mess} setMess={setMess} isEditable={isEditable} />
//           <Field label="Services" value={(mess.services || []).join(', ')} readOnly />
//           <Field label="Days Open" value={(mess.daysOpen || []).join(', ')} readOnly />
//           {/* <Field label="Open Time" value={formatTime12Hour(mess.openTime)} readOnly />
//           <Field label="Close Time" value={formatTime12Hour(mess.closeTime)} readOnly /> */}
//           {/* Editable Time Fields */}
// {isEditable ? (
//   <>
//     {/* Opening Time */}
//     <div>
//       <label className="block text-sm font-medium text-gray-600 mb-1">Open Time</label>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           min="1"
//           max="12"
//           value={mess.openTimeHour || 10}
//           onChange={(e) => setMess({ ...mess, openTimeHour: e.target.value })}
//           className="w-16 px-2 py-2 border border-gray-300 rounded text-center"
//         />
//         <span>:</span>
//         <input
//           type="number"
//           min="0"
//           max="59"
//           value={mess.openTimeMinute || 30}
//           onChange={(e) =>
//             setMess({ ...mess, openTimeMinute: e.target.value.padStart(2, "0") })
//           }
//           className="w-16 px-2 py-2 border border-gray-300 rounded text-center"
//         />
//         <select
//           value={mess.openTimePeriod || "AM"}
//           onChange={(e) => setMess({ ...mess, openTimePeriod: e.target.value })}
//           className="px-2 py-2 border border-gray-300 rounded"
//         >
//           <option>AM</option>
//           <option>PM</option>
//         </select>
//       </div>
//     </div>

//     {/* Closing Time */}
//     <div>
//       <label className="block text-sm font-medium text-gray-600 mb-1">Close Time</label>
//       <div className="flex gap-2 items-center">
//         <input
//           type="number"
//           min="1"
//           max="12"
//           value={mess.closeTimeHour || 10}
//           onChange={(e) => setMess({ ...mess, closeTimeHour: e.target.value })}
//           className="w-16 px-2 py-2 border border-gray-300 rounded text-center"
//         />
//         <span>:</span>
//         <input
//           type="number"
//           min="0"
//           max="59"
//           value={mess.closeTimeMinute || 30}
//           onChange={(e) =>
//             setMess({ ...mess, closeTimeMinute: e.target.value.padStart(2, "0") })
//           }
//           className="w-16 px-2 py-2 border border-gray-300 rounded text-center"
//         />
//         <select
//           value={mess.closeTimePeriod || "PM"}
//           onChange={(e) => setMess({ ...mess, closeTimePeriod: e.target.value })}
//           className="px-2 py-2 border border-gray-300 rounded"
//         >
//           <option>AM</option>
//           <option>PM</option>
//         </select>
//       </div>
//     </div>
//   </>
// ) : (
//   <>
//     <Field label="Open Time" value={formatTime12Hour(mess.openTime)} readOnly />
//     <Field label="Close Time" value={formatTime12Hour(mess.closeTime)} readOnly />
//   </>
// )}

//           <Field label="FSSAI License Number" field="fssaiLicenseNumber" mess={mess} setMess={setMess} isEditable={isEditable} />
//           <Field label="KYC Stage" value={mess.kyc_stage} readOnly />
//           <Field label="Email Verified" value={mess.isEmailVerified ? 'Yes' : 'No'} readOnly />
//           <Field label="Verified" value={mess.isVerified ? 'Yes' : 'No'} readOnly />
//           <Field label="Active" value={mess.isActive ? 'Yes' : 'No'} readOnly />
//           <Field label="MealEX Action" value={mess.mealxAction} readOnly />
//           <Field label="Action Remark" value={mess.mealxactionremark} readOnly />
//           <Field label="Created At" value={new Date(mess.createdAt).toLocaleString()} readOnly />
//           <Field label="Updated At" value={new Date(mess.updatedAt).toLocaleString()} readOnly />
//           <Field label="Activation Document Type" field="activationDocType" mess={mess} setMess={setMess} isEditable={isEditable} />
//         </div>

//         {/* Document Links */} 
//         <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-200 pt-6">
//           {mess.fssaiDocUrl && (
//             <div>
//               <label className="block text-sm font-medium text-gray-600 mb-1">
//                 FSSAI Document
//               </label>
//               <a
//                 href={mess.fssaiDocUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-600 underline"
//               >
//                 View FSSAI Doc
//               </a>
//             </div>
//           )}
//           {mess.activationDocUrl && (
//             <div>
//               <label className="block text-sm font-medium text-gray-600 mb-1">
//                 Activation Document
//               </label>
//               <a
//                 href={mess.activationDocUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-600 underline"
//               >
//                 View Document ({mess.activationDocType})
//               </a>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Footer Buttons */}
//       <div className="text-center mt-10">
//         {status === 'inactive' && (
//           <>
//             {/* <p className="text-sm text-orange-500 mb-2">
//               Highlighted Area Represents The Reason Of Failure
//             </p> */}
//             <button
//               // onClick={() => navigate('/mess-details', { state: { mess } })}
//                 onClick={handleReApply}

//               className="px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
//             >
//               Re-Apply
//             </button>
//           </>
//         )}
//         {status === 'pending' && (
//           <button
//             onClick={() => navigate('/minimal-dashboard')}
//             className="px-6 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition"
//           >
//             Cancel Verification
//           </button>
//         )}
//         {status === 'active' && (
//           <button
//             onClick={() => navigate('/owner-dashboard')}
//             className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
//           >
//             Go to Dashboard
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// const Field = ({ label, field, value, mess, setMess, isEditable, invalid, readOnly }) => {
//   const val = value ?? mess?.[field] ?? '';
//   return (
//     <div>
//       <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
//       <input
//         className={`w-full border rounded-md px-3 py-2 text-gray-800 bg-gray-50 focus:bg-white transition ${
//           invalid ? 'border-red-500' : 'border-gray-300'
//         }`}
//         value={val}
//         readOnly={!isEditable && !readOnly}
//         onChange={(e) =>
//           isEditable && field
//             ? setMess((prev) => ({ ...prev, [field]: e.target.value }))
//             : null
//         }
//       />
//     </div>
//   );
// };

// export default MessVerificationStatus;




// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { apiGet, apiPost } from '../services/api';
// import storage from '../utils/storage';
// import { ArrowLeft } from 'lucide-react';



// const MessVerificationStatus = () => {
//   const { messId } = useParams();
//   const navigate = useNavigate();
//   const [mess, setMess] = useState(null);
//   const [failedFields, setFailedFields] = useState([]);
//   const [status, setStatus] = useState('');
//   const [remark, setRemark] = useState('');
//   const [showDaysModal, setShowDaysModal] = useState(false);
//   const [showServicesModal, setShowServicesModal] = useState(false);

//   useEffect(() => {
//     const fetchMess = async () => {
//       try {
//         const res = await apiGet(`/owner/mess/id/${messId}`);
//         console.log(res);
//         const data = res?.data;
//         if (typeof data !== 'object' || data === null)
//           throw new Error('Invalid response format');

//         setMess(data);
//         let rawStatus = data.status?.toLowerCase() || 'unknown';
//         if (rawStatus === 'activated') rawStatus = 'active';
//         setStatus(rawStatus);

//         setFailedFields(data.failedFields || []);
//         setRemark(data.mealxactionremark || '');
//         // storage.setItem('messId', messId);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchMess();
//   }, [messId]);


// const handleReApply = async () => {
//   try {
//     const to24Hour = (hour, minute, period) => {
//       let h = parseInt(hour, 10);
//       let m = minute ? minute.padStart(2, "0") : "00";
//       if (isNaN(h)) return null;
//       if (period === "PM" && h !== 12) h += 12;
//       if (period === "AM" && h === 12) h = 0;
//       return `${String(h).padStart(2, "0")}:${m}`;
//     };

//     // ✅ Ensure time values are valid before converting
//     if (mess.openTimeHour && mess.openTimeMinute && mess.openTimePeriod) {
//    mess.openTime = to24Hour(
//   mess.openTimeHour,
//   mess.openTimeMinute,
//   mess.openTimePeriod
// ).slice(0, 5);

//     } else if (!mess.openTime) {
//       throw new Error("Open time is required");
//     }

//     if (mess.closeTimeHour && mess.closeTimeMinute && mess.closeTimePeriod) {
//   mess.closeTime = to24Hour(
//   mess.closeTimeHour,
//   mess.closeTimeMinute,
//   mess.closeTimePeriod
// ).slice(0, 5);

//     } else if (!mess.closeTime) {
//       throw new Error("Close time is required");
//     }
// if (mess.openTime) mess.openTime = mess.openTime.split(':').slice(0, 2).join(':');
// if (mess.closeTime) mess.closeTime = mess.closeTime.split(':').slice(0, 2).join(':');
 
//     const formData = new FormData();
//     Object.entries(mess).forEach(([key, val]) => {
//       if (
//         [
//           "messId", "_id", "__v", "isActive", "isVerified", "status",
//           "mealxAction", "mealxactionremark", "kyc_stage",
//           "fssaiDocUrl", "activationDocUrl", "logoUrl",
//           "isEmailVerified", "createdAt", "updatedAt"
//         ].includes(key)
//       ) return;

//       if (val !== null && val !== undefined && typeof val !== "object") {
//         formData.append(key, val);
//       }
//     });

//     if (mess.logoFile) formData.append("logo", mess.logoFile);
//     if (mess.fssaiDocFile) formData.append("fssaiDoc", mess.fssaiDocFile);
//     if (mess.activationDocFile) formData.append("activationDoc", mess.activationDocFile);

//     if (Array.isArray(mess.daysOpen))
//       mess.daysOpen.forEach((day) => formData.append("daysOpen", day));
//     if (Array.isArray(mess.services))
//       mess.services.forEach((srv) => formData.append("services", srv));

//     if (mess.openTime) mess.openTime = mess.openTime.substring(0, 5);
// if (mess.closeTime) mess.closeTime = mess.closeTime.substring(0, 5);
// console.log(mess.openTime);

//     const res = await apiPost(`/owner/mess/${messId}/profile/update`, formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });

//     if (res.success) {
//       alert("✅ Mess profile updated successfully. Verification re-initiated.");
//       navigate("/minimal-dashboard");
//     } else {
//       alert("⚠️ " + (res.response.data.message || "Failed to update."));
//     }
//   } catch (res) {
//     console.error(res);
//     alert(`❌ ${res.response.data.message || "Something went wrong while reapplying."}`);
//   }
// };


//   const isFieldInvalid = (field) => failedFields.includes(field);
//   const isEditable = status === 'inactive';

//   const formatTime12Hour = (timeStr) => {
//     if (!timeStr) return '';
//     const [hour, minute] = timeStr.split(':');
//     const h = parseInt(hour);
//     const ampm = h >= 12 ? 'PM' : 'AM';
//     const formattedHour = h % 12 || 12;
//     return `${formattedHour}:${minute} ${ampm}`;
//   };

//   if (!mess) return <div className="text-center text-gray-500 mt-10">Loading...</div>;

//   return (
//     <div className="min-h-screen bg-gray-50 p-2">
//       <div className="text-center mb-2">
//         <div classname='grid grid-2'>
//            <ArrowLeft
//       className="w-8 h-8 ml-4 mt-1 cursor-pointer text-orange-500 hover:text-red-500"
//       onClick={() => navigate(-1)}
//     />
//         <h2 className="text-3xl font-bold text-[#FC7C00]">MESS KYC STATUS</h2>
//         </div>
          
//         <h2 className={`text-3xl mt-2 font-bold ${status === 'active' ? 'text-green-700' : status === 'pending' ? 'text-green-500' : 'text-red-600'}`}>
//           {status === 'active' ? 'VERIFIED SUCCESSFULLY ✔' : status === 'pending' ? 'VERIFICATION IN PROGRESS...' : 'VERIFICATION FAILED ❌'}
//         </h2>
//         {status === 'inactive' && remark && (
//           <p className="text-red-500 font-medium mt-1">({remark})</p>
//         )}
//       </div>

//       <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
//         <div className="flex items-center gap-6 mb-8">
//           <div className="relative">
//             <img
//               src={mess.logoUrl || '/placeholder.jpg'}
//               alt="Mess Logo"
//               className="w-20 h-20 object-cover rounded-full border border-gray-300"
//             />
//             {isEditable && (
//               <label className="absolute bottom-0 right-0 bg-gray-800 text-white rounded-full p-1 cursor-pointer text-xs">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={(e) => {
//                     const file = e.target.files[0];
//                     if (file) {
//                       setMess({ ...mess, logoFile: file });
//                       const reader = new FileReader();
//                       reader.onloadend = () => setMess((prev) => ({ ...prev, logoUrl: reader.result }));
//                       reader.readAsDataURL(file);
//                     }
//                   }}
//                 />
//                 ✎
//               </label>
//             )}
//           </div>
//           <div className="flex-1">
//             <Field label="Mess Name" field="messName" mess={mess} setMess={setMess} isEditable={isEditable} invalid={isFieldInvalid('messName')} />
//           </div>
//           <span className={`px-4 py-1 rounded-full text-sm font-semibold ${
//             status === 'active' ? 'bg-green-100 text-green-700' :
//             status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
//           }`}>
//             {status?.toUpperCase()}
//           </span>
//         </div>

//         {/* All Major Fields */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
//           <Field label="Owner Name" field="ownerName" mess={mess} setMess={setMess} isEditable={isEditable} />
//           <Field label="Email" field="email" mess={mess} setMess={setMess} isEditable={isEditable} />
//           <Field label="Contact Number" field="contactNumber" mess={mess} setMess={setMess} isEditable={isEditable} />
//           <Field label="Alternate Contact" field="alternateContact" mess={mess} setMess={setMess} isEditable={isEditable} />
//           <Field label="State" field="state" mess={mess} setMess={setMess} isEditable={isEditable} />
//           <Field label="City" field="city" mess={mess} setMess={setMess} isEditable={isEditable} />
//           <Field label="Pincode" field="pincode" mess={mess} setMess={setMess} isEditable={isEditable} />
//           <Field label="Address" field="address" mess={mess} setMess={setMess} isEditable={isEditable} />
//           {/* <Field label="Mess Type" field="messType" mess={mess} setMess={setMess} isEditable={isEditable} /> */}

// <div>
//   <label className="block text-sm font-medium text-gray-600 mb-1">Mess Type</label>
//   {isEditable ? (
//     <select
//       value={mess.messType || ""}
//       onChange={(e) => setMess({ ...mess, messType: e.target.value })}
//       className="w-full px-3 py-2 border rounded-md bg-white"
//     >
//       <option value="">Select Type</option>
//       <option value="veg">Veg</option>
//       <option value="non-veg">Non-Veg</option>
//       <option value="both">Both</option>
//     </select>
//   ) : (
//     <div className="px-3 py-2 border rounded-md bg-gray-100">
//       {mess.messType || "—"}
//     </div>
//   )}
// </div>

//            <div>
//   <label className="block text-sm font-medium text-gray-600 mb-1">Services Offered</label>
//   {isEditable ? (
//     <div className="flex flex-wrap gap-2">
//       {['dine', 'take-away', 'delivery'].map((service) => (
//         <button
//           key={service}
//           type="button"
//           onClick={() => {
//             setMess((prev) => ({
//               ...prev,
//               services: prev.services?.includes(service)
//                 ? prev.services.filter((s) => s !== service)
//                 : [...(prev.services || []), service],
//             }));
//           }}
//           className={`px-4 py-2 border border-black rounded-xl ${
//             mess.services?.includes(service)
//               ? 'bg-orange-500 text-white'
//               : 'bg-gray-100'
//           }`}
//         >
//           {service}
//         </button>
//       ))}
//     </div>
//   ) : (
//     <div className="px-3 py-2 border rounded-md bg-gray-100">
//       {(mess.services || []).join(', ') || '—'}
//     </div>
//   )}
// </div>
//           {/* Time Fields */}
//           {isEditable ? (
//             <>
//               <TimePicker label="Open Time" prefix="openTime" mess={mess} setMess={setMess} />
//               <TimePicker label="Close Time" prefix="closeTime" mess={mess} setMess={setMess} />
//               <div>
//   <label className="block text-sm font-medium text-gray-600 mb-1">Days Open</label>
//   <button
//     type="button"
//     onClick={() => isEditable && setShowDaysModal(true)}
//     className={`px-3 py-2 w-full border rounded-md ${
//       isEditable ? 'bg-white cursor-pointer' : 'bg-gray-100'
//     }`}
//   >
//     {(mess.daysOpen || []).join(', ') || 'Select Days'}
//   </button>
// </div>

// {/* Days Modal */}
// {showDaysModal && (
//   <div className="fixed inset-0 backdrop-blur-sm bg-opacity-40 flex items-center justify-center z-50">
//     <div className="bg-white p-6 rounded-lg shadow-lg w-80">
//       <h2 className="text-lg font-semibold mb-4">Select Days Open</h2>
//       <div className="grid grid-cols-3 gap-2">
//         {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
//           <button
//             key={day}
//             type="button"
//             onClick={() => {
//               setMess((prev) => {
//                 const fullDayMap = {
//                   Mon: 'Monday', Tue: 'Tuesday', Wed: 'Wednesday',
//                   Thu: 'Thursday', Fri: 'Friday', Sat: 'Saturday', Sun: 'Sunday',
//                 };
//                 const dayFull = fullDayMap[day];
//                 const updatedDays = prev.daysOpen?.includes(dayFull)
//                   ? prev.daysOpen.filter((d) => d !== dayFull)
//                   : [...(prev.daysOpen || []), dayFull];
//                 return { ...prev, daysOpen: updatedDays };
//               });
//             }}
//             className={`px-3 py-1 border rounded ${
//               mess.daysOpen?.includes({
//                 Mon: 'Monday', Tue: 'Tuesday', Wed: 'Wednesday',
//                 Thu: 'Thursday', Fri: 'Friday', Sat: 'Saturday', Sun: 'Sunday',
//               }[day])
//                 ? 'bg-orange-500 text-white'
//                 : 'bg-gray-100'
//             }`}
//           >
//             {day}
//           </button>
//         ))}
//       </div>
//       <div className="flex justify-end gap-2 mt-4">
//         <button className="text-gray-500" onClick={() => setShowDaysModal(false)}>
//           Cancel
//         </button>
//         <button
//           className="bg-orange-500 text-white px-4 py-1 rounded"
//           onClick={() => setShowDaysModal(false)}
//         >
//           Save
//         </button>
//       </div>
//     </div>
//   </div>
// )}

//             </>
            
//           ) : (
//             <>
//               <Field label="Open Time" value={formatTime12Hour(mess.openTime)} readOnly />
//               <Field label="Close Time" value={formatTime12Hour(mess.closeTime)} readOnly />
//             </>
//           )}

//           <Field label="FSSAI License Number" field="fssaiLicenseNumber" mess={mess} setMess={setMess} isEditable={isEditable} />
// <div>
//   <label className="block text-sm font-medium text-gray-600 mb-1">Activation Document Type</label>
//   {isEditable ? (
//     <select
//       value={mess.activationDocType || ""}
//       onChange={(e) => setMess({ ...mess, activationDocType: e.target.value })}
//       className="w-full px-3 py-2 border rounded-md bg-white"
//     >
//       <option value="">Select Type</option>
//       <option value="aadhaar">Aadhaar</option>
//       <option value="gst">GST</option>
//       <option value="pan">PAN</option>
//       <option value="electricity_bill">Electricity Bill</option>
//       <option value="business_license">Business License</option>
//       <option value="rent_agreement">Rent Agreement</option>
//       <option value="other">Other</option>
//     </select>
//   ) : (
//     <div className="px-3 py-2 border rounded-md bg-gray-100">
//       {mess.activationDocType || "—"}
//     </div>
//   )}
// </div>
//         </div>

//         {/* Doc Preview */}
//         <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-200 pt-6">
//           {mess.fssaiDocUrl && (
//             <div>
//               <label className="block text-sm font-medium text-gray-600 mb-1">FSSAI Document</label>
//               <a href={mess.fssaiDocUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline">View</a>
//               {isEditable && (
//                 <input type="file" accept=".pdf,image/*" className="mt-2" onChange={(e) => setMess({ ...mess, fssaiDocFile: e.target.files[0] })} />
//               )}
//             </div>
//           )}
//           {mess.activationDocUrl && (
//             <div>
//               <label className="block text-sm font-medium text-gray-600 mb-1">Activation Document</label>
//               <a href={mess.activationDocUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline">View</a>
//               {isEditable && (
//                 <input type="file" accept=".pdf,image/*" className="mt-2" onChange={(e) => setMess({ ...mess, activationDocFile: e.target.files[0] })} />
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Footer Buttons */}
//       <div className="text-center mt-10">
//         {status === 'inactive' && (
//           <button onClick={handleReApply} className="px-6  bg-orange-500 text-white hover:bg-orange-600   w-full sm:w-1/2 md:w-1/3 font-semibold py-3 rounded-xl transition ">
//             Re-Apply
//           </button>
//         )}
//         {status === 'pending' && (
//           <button onClick={() => navigate('/minimal-dashboard')} className="px-6 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition">
//             Cancel Verification
//           </button>
//         )}
//         {status === 'active' && (
//           <button onClick={() => navigate('/owner-dashboard')} className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition">
//             Go to Dashboard
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// const Field = ({ label, field, value, mess, setMess, isEditable, invalid, readOnly }) => {
//   const val = value ?? mess?.[field] ?? '';
//   return (
//     <div>
//       <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
//       <input
//         className={`w-full border rounded-md px-3 py-2 text-gray-800 ${
//           invalid ? 'border-red-500' : 'border-gray-300'
//         } ${!isEditable && !readOnly ? 'bg-gray-100' : 'bg-white'}`}
//         value={val}
//         readOnly={!isEditable && !readOnly}
//         onChange={(e) =>
//           isEditable && field
//             ? setMess((prev) => ({ ...prev, [field]: e.target.value }))
//             : null
//         }
//       />
//     </div>
//   );
// };

// const TimePicker = ({ label, prefix, mess, setMess }) => (
//   <div>
//     <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
//     <div className="flex gap-2 items-center">
//       <input
//         type="number"
//         min="1"
//         max="12"
//         value={mess[`${prefix}Hour`] || 10}
//         onChange={(e) => setMess({ ...mess, [`${prefix}Hour`]: e.target.value })}
//         className="w-16 px-2 py-2 border border-gray-300 rounded text-center"
//       />
//       <span>:</span>
//       <input
//         type="number"
//         min="0"
//         max="59"
//         value={mess[`${prefix}Minute`] || 30}
//         onChange={(e) =>
//           setMess({ ...mess, [`${prefix}Minute`]: e.target.value.padStart(2, '0') })
//         }
//         className="w-16 px-2 py-2 border border-gray-300 rounded text-center"
//       />
//       <select
//         value={mess[`${prefix}Period`] || 'AM'}
//         onChange={(e) => setMess({ ...mess, [`${prefix}Period`]: e.target.value })}
//         className="px-2 py-2 border border-gray-300 rounded"
//       >
//         <option>AM</option>
//         <option>PM</option>
//       </select>
//     </div>
//   </div>
// );

// export default MessVerificationStatus;


import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiGet, apiPost } from '../services/api';
import storage from '../utils/storage';
import { ArrowLeft } from 'lucide-react';

const ALL_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const SHORT_TO_FULL = {
  Mon: 'Monday',
  Tue: 'Tuesday',
  Wed: 'Wednesday',
  Thu: 'Thursday',
  Fri: 'Friday',
  Sat: 'Saturday',
  Sun: 'Sunday',
};
const FULL_TO_SHORT = {
  Monday: 'Mon',
  Tuesday: 'Tue',
  Wednesday: 'Wed',
  Thursday: 'Thu',
  Friday: 'Fri',
  Saturday: 'Sat',
  Sunday: 'Sun',
};

const MessVerificationStatus = () => {
  const { messId } = useParams();
  const navigate = useNavigate();

  const [mess, setMess] = useState(null);
  const [failedFields, setFailedFields] = useState([]);
  const [status, setStatus] = useState('');
  const [remark, setRemark] = useState('');
  const [selectedDays, setSelectedDays] = useState([]); // short forms, e.g. ['Mon','Tue']

  useEffect(() => {
    const fetchMess = async () => {
      try {
        const res = await apiGet(`/owner/mess/id/${messId}`);
        const data = res?.data;
        if (typeof data !== 'object' || data === null) throw new Error('Invalid response format');

        setMess(data);
        let rawStatus = data.status?.toLowerCase() || 'unknown';
        if (rawStatus === 'activated') rawStatus = 'active';
        setStatus(rawStatus);

        setFailedFields(data.failedFields || []);
        setRemark(data.mealxactionremark || '');

        // Initialize selectedDays (short) from data.daysOpen (full names)
        if (Array.isArray(data.daysOpen)) {
          const shorts = data.daysOpen.map((full) => FULL_TO_SHORT[full]).filter(Boolean);
          setSelectedDays(shorts);
        } else {
          setSelectedDays([]);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchMess();
  }, [messId]);

  const isFieldInvalid = (field) => failedFields.includes(field);
  const isEditable = status === 'inactive'; // only editable when verification failed (inactive)

  const formatTime12Hour = (timeStr) => {
    if (!timeStr) return '';
    const [hour, minute] = timeStr.split(':');
    const h = parseInt(hour, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const formattedHour = h % 12 || 12;
    return `${formattedHour}:${minute} ${ampm}`;
  };

  const handleToggleDay = (shortDay) => {
    if (!isEditable) return;
    setSelectedDays((prev) => {
      let updated;
      if (prev.includes(shortDay)) {
        updated = prev.filter((d) => d !== shortDay);
      } else {
        updated = [...prev, shortDay];
      }
      // Update mess.daysOpen as full names
      setMess((m) => ({ ...m, daysOpen: updated.map((d) => SHORT_TO_FULL[d]) }));
      return updated;
    });
  };

  const handleSelectAll = (checked) => {
    if (!isEditable) return;
    if (checked) {
      setSelectedDays(ALL_SHORT.slice());
      setMess((m) => ({ ...m, daysOpen: ALL_SHORT.map((d) => SHORT_TO_FULL[d]) }));
    } else {
      setSelectedDays([]);
      setMess((m) => ({ ...m, daysOpen: [] }));
    }
  };

  // const handleReApply = async () => {
  //   try {
  //     // client-side basic validation before sending
  //     if (!mess) throw new Error('No mess data found.');
  //     // ensure daysOpen is an array
  //     if (!mess.daysOpen || !Array.isArray(mess.daysOpen)) {
  //       // if selectedDays exist, convert them
  //       if (selectedDays && selectedDays.length > 0) {
  //         setMess((m) => ({ ...m, daysOpen: selectedDays.map((d) => SHORT_TO_FULL[d]) }));
  //       } else {
  //         // if none selected, allow server to decide; but you may want to block:
  //         // throw new Error('Please select days open before re-applying.');
  //       }
  //     }

  //     // Normalize services to array (even if user selected only one)
  //     let servicesToSend = mess.services;
  //     if (!servicesToSend) servicesToSend = [];
  //     if (!Array.isArray(servicesToSend)) servicesToSend = [servicesToSend];

  //     // Normalize open/close times if stored in split fields
  //     const to24Hour = (hour, minute, period) => {
  //       let h = parseInt(hour, 10);
  //       let m = minute ? String(minute).padStart(2, '0') : '00';
  //       if (isNaN(h)) return null;
  //       if (period === 'PM' && h !== 12) h += 12;
  //       if (period === 'AM' && h === 12) h = 0;
  //       return `${String(h).padStart(2, '0')}:${m}`;
  //     };

  //     const copy = { ...mess };

  //     if (copy.openTimeHour && copy.openTimeMinute && copy.openTimePeriod) {
  //       copy.openTime = to24Hour(copy.openTimeHour, copy.openTimeMinute, copy.openTimePeriod).slice(0, 5);
  //     }
  //     if (copy.closeTimeHour && copy.closeTimeMinute && copy.closeTimePeriod) {
  //       copy.closeTime = to24Hour(copy.closeTimeHour, copy.closeTimeMinute, copy.closeTimePeriod).slice(0, 5);
  //     }
  //     if (copy.openTime) copy.openTime = copy.openTime.split(':').slice(0, 2).join(':');
  //     if (copy.closeTime) copy.closeTime = copy.closeTime.split(':').slice(0, 2).join(':');

  //     const formData = new FormData();

  //     Object.entries(copy).forEach(([key, val]) => {
  //       if (
  //         [
  //           'messId', '_id', '__v', 'isActive', 'isVerified', 'status',
  //           'mealxAction', 'mealxactionremark', 'kyc_stage',
  //           'fssaiDocUrl', 'activationDocUrl', 'logoUrl',
  //           'isEmailVerified', 'createdAt', 'updatedAt'
  //         ].includes(key)
  //       ) return;

  //       // skip object types (we append files separately)
  //       if (val !== null && val !== undefined && typeof val !== 'object') {
  //         formData.append(key, val);
  //       }
  //     });

  //     // files
  //     if (copy.logoFile) formData.append('logo', copy.logoFile);
  //     if (copy.fssaiDocFile) formData.append('fssaiDoc', copy.fssaiDocFile);
  //     if (copy.activationDocFile) formData.append('activationDoc', copy.activationDocFile);

  //     // daysOpen (ensure array)
  //     const daysArr = Array.isArray(copy.daysOpen) ? copy.daysOpen : (selectedDays.length ? selectedDays.map(d => SHORT_TO_FULL[d]) : []);
  //     daysArr.forEach((day) => formData.append('daysOpen', day));

  //     // services always array
  //     const svcArr = Array.isArray(copy.services) ? copy.services : (copy.services ? [copy.services] : []);
  //     svcArr.forEach((s) => formData.append('services', s));

  //     if (copy.openTime) formData.append('openTime', copy.openTime.substring(0, 5));
  //     if (copy.closeTime) formData.append('closeTime', copy.closeTime.substring(0, 5));

  //     const res = await apiPost(`/owner/mess/${messId}/profile/update`, formData, {
  //       headers: { 'Content-Type': 'multipart/form-data' },
  //     });

  //     if (res.success) {
  //       alert('✅ Mess profile updated successfully. Verification re-initiated.');
  //       navigate('/minimal-dashboard');
  //     } else {
  //       alert('⚠️ ' + (res.response?.data?.message || 'Failed to update.'));
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     alert(`❌ ${err?.response?.data?.message || err.message || 'Something went wrong while reapplying.'}`);
  //   }
  // };

  const handleReApply = async () => {
  try {
    const to24Hour = (hour, minute, period) => {
      let h = parseInt(hour, 10);
      let m = minute ? minute.padStart(2, '0') : '00';
      if (isNaN(h)) return null;
      if (period === 'PM' && h !== 12) h += 12;
      if (period === 'AM' && h === 12) h = 0;
      return `${String(h).padStart(2, '0')}:${m}`;
    };

    // Ensure valid open time
    if (mess.openTimeHour && mess.openTimeMinute && mess.openTimePeriod) {
      mess.openTime = to24Hour(
        mess.openTimeHour,
        mess.openTimeMinute,
        mess.openTimePeriod
      ).slice(0, 5);
    } else if (!mess.openTime) {
      throw new Error('Open time is required');
    }

    // Ensure valid close time
    if (mess.closeTimeHour && mess.closeTimeMinute && mess.closeTimePeriod) {
      mess.closeTime = to24Hour(
        mess.closeTimeHour,
        mess.closeTimeMinute,
        mess.closeTimePeriod
      ).slice(0, 5);
    } else if (!mess.closeTime) {
      throw new Error('Close time is required');
    }

    if (mess.openTime) mess.openTime = mess.openTime.split(':').slice(0, 2).join(':');
    if (mess.closeTime) mess.closeTime = mess.closeTime.split(':').slice(0, 2).join(':');

    const formData = new FormData();
    Object.entries(mess).forEach(([key, val]) => {
      if (
        [
          'messId', '_id', '__v', 'isActive', 'isVerified', 'status',
          'mealxAction', 'mealxactionremark', 'kyc_stage',
          'fssaiDocUrl', 'activationDocUrl', 'logoUrl',
          'isEmailVerified', 'createdAt', 'updatedAt'
        ].includes(key)
      ) return;

      if (val !== null && val !== undefined && typeof val !== 'object') {
        formData.append(key, val);
      }
    });

    // ✅ Handle Files
    if (mess.logoFile) formData.append('logo', mess.logoFile);
    if (mess.fssaiDocFile) formData.append('fssaiDoc', mess.fssaiDocFile);
    if (mess.activationDocFile) formData.append('activationDoc', mess.activationDocFile);

    // ✅ Handle days
    if (Array.isArray(mess.daysOpen)) {
      mess.daysOpen.forEach((day) => formData.append('daysOpen', day));
    }

    // ✅ Handle services
    if (Array.isArray(mess.services)) {
      mess.services.forEach((srv) => formData.append('services', srv));
    }

    if (mess.openTime) mess.openTime = mess.openTime.substring(0, 5);
    if (mess.closeTime) mess.closeTime = mess.closeTime.substring(0, 5);

    const res = await apiPost(`/owner/mess/${messId}/profile/update`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    if (res.success) {
      alert('✅ Mess profile updated successfully. Verification re-initiated.');
      navigate('/minimal-dashboard');
    } else {
      alert('⚠️ ' + (res.response?.data?.message || 'Failed to update.'));
    }
  } catch (err) {
    console.error(err);
    alert(`❌ ${err.response?.data?.message || 'Something went wrong while reapplying.'}`);
  }
};


  if (!mess) return <div className="text-center text-gray-500 mt-10">Loading...</div>;

  return (
      <div className="min-h-screen bg-gray-50">
      {/* Sticky header */}
      {/* <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto p-4 flex items-center justify-center relative">
          <ArrowLeft
            className="w-8 h-8 absolute left-1 cursor-pointer text-black hover:text-gray-700"
            onClick={() => navigate(-1)}
          />
          <h2 className="text-2xl sm:text-3xl font-bold text-center">MESS KYC STATUS</h2>
        </div>
      </div> */}
      {/* Sticky header */}
<div className="sticky top-0 z-40 bg-white border-b border-gray-200">
  <div className="max-w-6xl mx-auto p-4 flex items-center justify-between">
    <ArrowLeft
      className="w-7 h-7 cursor-pointer text-gray-800 hover:text-gray-600"
      onClick={() => navigate(-1)}
    />
    <h2 className="text-lg sm:text-2xl font-bold text-center flex-1 text-gray-800">
      MESS KYC STATUS
    </h2>
    <div className="w-7 h-7" /> {/* spacer for balance */}
  </div>
</div>


      <div className="max-w-6xl mx-auto p-4">
        <div className="text-center mb-4">
          <h2 className={`text-2xl sm:text-3xl font-bold ${status === 'active' ? 'text-green-700' : status === 'pending' ? 'text-yellow-600' : 'text-red-500'}`}>
            {status === 'active' ? 'VERIFIED SUCCESSFULLY ✔' : status === 'pending' ? 'VERIFICATION IN PROGRESS...' : 'VERIFICATION FAILED ❌'}
          </h2>
          {status === 'inactive' && remark && <p className="text-red-500 font-medium mt-1">({remark})</p>}
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 md:p-8 border border-gray-200">
          {/* <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <img
                src={mess.logoUrl || '/placeholder.jpg'}
                alt="Mess Logo"
                className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-full border border-gray-300"
              />
              {isEditable && (
                <label className="absolute bottom-0 right-0 bg-gray-700 text-white rounded-full p-1 cursor-pointer text-xs">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setMess((prev) => ({ ...prev, logoFile: file }));
                        const reader = new FileReader();
                        reader.onloadend = () => setMess((prev) => ({ ...prev, logoUrl: reader.result }));
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  ✎
                </label>
              )}
            </div>

            <div className="flex-1">
              <Field label="Mess Name" field="messName" mess={mess} setMess={setMess} isEditable={isEditable} invalid={isFieldInvalid('messName')} />
            </div>

            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
              status === 'active' ? 'bg-green-100 text-green-700' :
                status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
            }`}>
              {status?.toUpperCase()}
            </span>
          </div> */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
  <div className="flex items-center gap-4">
    <div className="relative">
      <img
        src={mess.logoUrl || '/placeholder.jpg'}
        alt="Mess Logo"
        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-full border border-gray-300"
      />
      {isEditable && (
        <label className="absolute bottom-0 right-0 bg-gray-700 text-white rounded-full p-1 cursor-pointer text-xs">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setMess((prev) => ({ ...prev, logoFile: file }));
                const reader = new FileReader();
                reader.onloadend = () => setMess((prev) => ({ ...prev, logoUrl: reader.result }));
                reader.readAsDataURL(file);
              }
            }}
          />
          ✎
        </label>
      )}
    </div>
    <div className="flex-1">
      <Field
        label="Mess Name"
        field="messName"
        mess={mess}
        setMess={setMess}
        isEditable={isEditable}
        invalid={isFieldInvalid('messName')}
      />
    </div>
  </div>

  {/* Status pill moved below in mobile */}
  <span
    className={`px-3 py-1 rounded-full text-sm font-semibold self-start sm:self-auto ${
      status === 'active'
        ? 'bg-green-100 text-green-700'
        : status === 'pending'
        ? 'bg-yellow-100 text-yellow-700'
        : 'bg-red-100 text-red-700'
    }`}
  >
    {status?.toUpperCase()}
  </span>
</div>


          {/* Grid fields: responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Field label="Owner Name" field="ownerName" mess={mess} setMess={setMess} isEditable={isEditable} />
            <Field label="Email" field="email" mess={mess} setMess={setMess} isEditable={isEditable} />
            <Field label="Contact Number" field="contactNumber" mess={mess} setMess={setMess} isEditable={isEditable} />
            <Field label="Alternate Contact" field="alternateContact" mess={mess} setMess={setMess} isEditable={isEditable} />
            <Field label="State" field="state" mess={mess} setMess={setMess} isEditable={isEditable} />
            <Field label="City" field="city" mess={mess} setMess={setMess} isEditable={isEditable} />
            <Field label="Pincode" field="pincode" mess={mess} setMess={setMess} isEditable={isEditable} />
            <Field label="Address" field="address" mess={mess} setMess={setMess} isEditable={isEditable} />

            {/* Mess Type */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Mess Type</label>
              {isEditable ? (
                <select
                  value={mess.messType || ''}
                  onChange={(e) => setMess({ ...mess, messType: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md bg-white"
                >
                  <option value="">Select Type</option>
                  <option value="veg">Veg</option>
                  <option value="non-veg">Non-Veg</option>
                  <option value="both">Both</option>
                </select>
              ) : (
                <div className="px-3 py-2 border rounded-md bg-gray-100">{mess.messType || '—'}</div>
              )}
            </div>

            {/* Services - keep UI same as requested (orange toggles) */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Services Offered</label>
              {isEditable ? (
                <div className="flex flex-wrap gap-2">
                  {['dine', 'take-away', 'delivery'].map((service) => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => {
                        setMess((prev) => {
                          const prevServices = Array.isArray(prev.services) ? prev.services : (prev.services ? [prev.services] : []);
                          const updated = prevServices.includes(service) ? prevServices.filter((s) => s !== service) : [...prevServices, service];
                          return { ...prev, services: updated };
                        });
                      }}
                      className={`px-4 py-2 border border-orange-200 rounded-xl ${mess.services?.includes(service) ? 'bg-orange-500 text-white' : 'bg-gray-100'}`}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="px-3 py-2 border rounded-md bg-gray-100">
                  {(mess.services || []).join(', ') || '—'}
                </div>
              )}
            </div>

            {/* Time + Days Open area (make full width stack on small screens) */}
            <div className="sm:col-span-2 lg:col-span-1">
              <TimePicker label="Open Time" prefix="openTime" mess={mess} setMess={setMess} />
            </div>
            <div className="sm:col-span-2 lg:col-span-1">
              <TimePicker label="Close Time" prefix="closeTime" mess={mess} setMess={setMess} />
            </div>

            {/* Days Open - inline grid, no modal */}
            <div className="sm:col-span-2 lg:col-span-1">
              <label className="block text-sm font-medium text-gray-600 mb-1">Days Open</label>
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-300">
                <div className="flex items-center gap-2 mb-3">
                  <label className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${isEditable ? 'bg-white cursor-pointer hover:border-gray-600' : 'bg-gray-100 cursor-not-allowed'}`}>
                    <input
                      type="checkbox"
                      checked={selectedDays.length === 7}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      disabled={!isEditable}
                      className="w-4 h-4 accent-black"
                    />
                    <span className="text-sm font-semibold text-gray-800">Select All</span>
                  </label>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {ALL_SHORT.map((day) => {
                    const isSelected = selectedDays.includes(day);
                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => handleToggleDay(day)}
                        disabled={!isEditable}
                        aria-pressed={isSelected}
                        className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg border transition select-none
                          ${isSelected ? 'bg-orange-500 border-orange-500 text-white shadow' : 'bg-white border-gray-300 hover:border-gray-600 text-gray-800'}
                        `}
                      >
                        <span className="text-sm font-medium">{day}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <Field label="FSSAI License Number" field="fssaiLicenseNumber" mess={mess} setMess={setMess} isEditable={isEditable} />
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Activation Document Type</label>
              {isEditable ? (
                <select
                  value={mess.activationDocType || ''}
                  onChange={(e) => setMess({ ...mess, activationDocType: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md bg-white"
                >
                  <option value="">Select Type</option>
                  <option value="aadhaar">Aadhaar</option>
                  <option value="gst">GST</option>
                  <option value="pan">PAN</option>
                  <option value="electricity_bill">Electricity Bill</option>
                  <option value="business_license">Business License</option>
                  <option value="rent_agreement">Rent Agreement</option>
                  <option value="other">Other</option>
                </select>
              ) : (
                <div className="px-3 py-2 border rounded-md bg-gray-100">{mess.activationDocType || '—'}</div>
              )}
            </div>
          </div>

          {/* Doc Preview */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-gray-200 pt-4">
            {mess.fssaiDocUrl && (
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">FSSAI Document</label>
                <a href={mess.fssaiDocUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline">View</a>
                {isEditable && <input type="file" accept=".pdf,image/*" className="mt-2" onChange={(e) => setMess({ ...mess, fssaiDocFile: e.target.files[0] })} />}
              </div>
            )}
            {mess.activationDocUrl && (
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Activation Document</label>
                <a href={mess.activationDocUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline">View</a>
                {isEditable && <input type="file" accept=".pdf,image/*" className="mt-2" onChange={(e) => setMess({ ...mess, activationDocFile: e.target.files[0] })} />}
              </div>
            )}
          </div>
        </div>

        {/* Footer buttons */}
        <div className="text-center mt-6">
          {status === 'inactive' && (
            <button onClick={handleReApply} className="px-6 bg-orange-500 text-white hover:bg-orange-700 w-full sm:w-1/2 md:w-1/3 font-semibold py-3 rounded-xl transition">
              Re-Apply
            </button>
          )}
          {/* {status === 'pending' && (
            <button onClick={() => navigate('/minimal-dashboard')} className="px-6 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition">
              Cancel Verification
            </button>
          )} */}
          {status === 'pending' && (
  <button
    onClick={async () => {
      const confirmDelete = window.confirm(
        "⚠️ Are you sure you want to cancel verification?\nThis will permanently delete your mess details."
      );
      if (!confirmDelete) return;

      try {
        const res = await apiPost('/owner/mess/delete', { messId });
        if (res.success) {
          alert('✅ Mess profile deleted successfully.');
          navigate('/minimal-dashboard');
        } else {
          alert(`❌ ${res.message || 'Failed to delete mess.'}`);
        }
      } catch (err) {
        console.error(err);
        alert(`❌ ${err.response?.data?.message || 'Something went wrong while deleting mess.'}`);
      }
    }}
    className="px-6 py-2 bg-red-600 cursor-pointer text-white rounded-full hover:bg-red-700 transition"
  >
    Cancel Verification
  </button>
)}

          {status === 'active' && (
            <button onClick={() => navigate('/owner-dashboard')} className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition">
              Go to Dashboard
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const Field = ({ label, field, value, mess, setMess, isEditable, invalid, readOnly }) => {
  const val = value ?? mess?.[field] ?? '';
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
      <input
        className={`w-full border rounded-md px-3 py-2 text-gray-800 ${invalid ? 'border-red-500' : 'border-gray-300'} ${!isEditable && !readOnly ? 'bg-gray-100' : 'bg-white'}`}
        value={val}
        readOnly={!isEditable && !readOnly}
        onChange={(e) =>
          isEditable && field
            ? setMess((prev) => ({ ...prev, [field]: e.target.value }))
            : null
        }
      />
    </div>
  );
};

const TimePicker = ({ label, prefix, mess, setMess }) => (
  <div>
    <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
    <div className="flex gap-2 items-center">
      <input
        type="number"
        min="1"
        max="12"
        value={mess?.[`${prefix}Hour`] ?? 10}
        onChange={(e) => setMess({ ...mess, [`${prefix}Hour`]: e.target.value })}
        className="w-16 px-2 py-2 border border-gray-300 rounded text-center"
      />
      <span>:</span>
      <input
        type="number"
        min="0"
        max="59"
        value={mess?.[`${prefix}Minute`] ?? 30}
        onChange={(e) => setMess({ ...mess, [`${prefix}Minute`]: String(e.target.value).padStart(2, '0') })}
        className="w-16 px-2 py-2 border border-gray-300 rounded text-center"
      />
      <select
        value={mess?.[`${prefix}Period`] ?? 'AM'}
        onChange={(e) => setMess({ ...mess, [`${prefix}Period`]: e.target.value })}
        className="px-2 py-2 border border-gray-300 rounded"
      >
        <option>AM</option>
        <option>PM</option>
      </select>
    </div>
  </div>
);

export default MessVerificationStatus;



// new banayi jo 

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { apiGet } from "../services/api";
// import storage from "../utils/storage";
// import { ArrowLeft, CheckCircle2, XCircle, Clock } from "lucide-react";

// const MessVerificationStatus = () => {
//   const { messId } = useParams();
//   const navigate = useNavigate();
//   const [mess, setMess] = useState(null);
//   const [failedFields, setFailedFields] = useState([]);
//   const [status, setStatus] = useState("");
//   const [remark, setRemark] = useState("");

//   useEffect(() => {
//     const fetchMess = async () => {
//       try {
//         const res = await apiGet(`/owner/mess/id/${messId}`);
//         const data = res?.data;
//         if (!data || typeof data !== "object") throw new Error("Invalid data");
//         setMess(data);
//         setFailedFields(data.failedFields || []);
//         setRemark(data.mealxactionremark || "");
//         let rawStatus = data.status?.toLowerCase() || "unknown";
//         if (rawStatus === "activated") rawStatus = "active";
//         setStatus(rawStatus);
//         storage.setItem("messId", messId);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchMess();
//   }, [messId]);

//   const isFieldInvalid = (field) => failedFields.includes(field);
//   const isEditable = status === "inactive";

//   const getStatusIcon = () => {
//     if (status === "active") return <CheckCircle2 className="text-green-500 w-6 h-6" />;
//     if (status === "pending") return <Clock className="text-yellow-500 w-6 h-6" />;
//     return <XCircle className="text-red-500 w-6 h-6" />;
//   };

//   if (!mess) return <div className="text-center text-gray-500 mt-10">Loading...</div>;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-8">
//       {/* Header */}
//       <div className="sticky top-0 z-20 flex items-center justify-between bg-white shadow-sm rounded-2xl p-4 mb-6">
//         <div className="flex items-center gap-3">
//           <ArrowLeft
//             className="w-6 h-6 text-orange-500 cursor-pointer hover:text-orange-600 transition"
//             onClick={() => navigate(-1)}
//           />
//           <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Mess KYC Status</h2>
//         </div>
//         <div className="flex items-center gap-2">
//           {getStatusIcon()}
//           <span
//             className={`text-sm font-semibold uppercase px-3 py-1 rounded-full ${
//               status === "active"
//                 ? "bg-green-100 text-green-700"
//                 : status === "pending"
//                 ? "bg-yellow-100 text-yellow-700"
//                 : "bg-red-100 text-red-700"
//             }`}
//           >
//             {status}
//           </span>
//         </div>
//       </div>

//       {/* Remark */}
//       {status === "inactive" && remark && (
//         <p className="text-center text-red-600 font-medium mb-4 bg-red-50 py-2 rounded-md">
//           {remark}
//         </p>
//       )}

//       <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-6 space-y-8">
//         {/* Profile Details */}
//         <SectionHeader title="Profile Details" />
//         <div className="flex flex-col sm:flex-row gap-6 items-center">
//           <div className="relative">
//             <img
//               src={mess.logoUrl || "/placeholder.jpg"}
//               alt="Mess Logo"
//               className="w-28 h-28 object-cover rounded-full border-2 border-gray-300 shadow-sm"
//             />
//           </div>
//           <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
//             <Field label="Mess Name" field="messName" mess={mess} setMess={setMess} isEditable={isEditable} invalid={isFieldInvalid("messName")} />
//             <Field label="Owner Name" field="ownerName" mess={mess} setMess={setMess} isEditable={isEditable} />
//             <Field label="Mess Type" field="messType" mess={mess} setMess={setMess} isEditable={isEditable} />
//             <Field label="Email" field="email" mess={mess} setMess={setMess} isEditable={false} />
//             <Field label="Status" field="status" mess={mess} setMess={setMess} isEditable={false} />
//             <Field label="KYC Stage" field="kyc_stage" mess={mess} setMess={setMess} isEditable={false} />
//           </div>
//         </div>

//         {/* Contact Information */}
//         <SectionHeader title="Contact Information" />
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//           <Field label="Contact Number" field="contactNumber" mess={mess} setMess={setMess} isEditable={isEditable} />
//           <Field label="Alternate Contact" field="alternateContact" mess={mess} setMess={setMess} isEditable={isEditable} />
//           <Field label="Address" field="address" mess={mess} setMess={setMess} isEditable={isEditable} />
//           <Field label="City" field="city" mess={mess} setMess={setMess} isEditable={isEditable} />
//           <Field label="State" field="state" mess={mess} setMess={setMess} isEditable={isEditable} />
//           <Field label="Pincode" field="pincode" mess={mess} setMess={setMess} isEditable={isEditable} />
//         </div>

//         {/* Operations */}
//         <SectionHeader title="Operational Details" />
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//           <Field label="Open Time" field="openTime" mess={mess} setMess={setMess} isEditable={isEditable} />
//           <Field label="Close Time" field="closeTime" mess={mess} setMess={setMess} isEditable={isEditable} />
//           <Field label="Days Open" field="daysOpen" mess={{ ...mess, daysOpen: mess.daysOpen?.join(", ") }} setMess={setMess} isEditable={false} />
//           <Field label="Services" field="services" mess={{ ...mess, services: mess.services?.join(", ") }} setMess={setMess} isEditable={false} />
//         </div>

//         {/* Documents */}
//         <SectionHeader title="Documents" />
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <DocCard
//             label={`Activation Document (${mess.activationDocType || "N/A"})`}
//             url={mess.activationDocUrl}
//             editable={isEditable}
//             onChange={(f) => setMess({ ...mess, activationDocFile: f })}
//           />
//           <DocCard
//             label="FSSAI Document"
//             url={mess.fssaiDocUrl}
//             editable={isEditable}
//             onChange={(f) => setMess({ ...mess, fssaiDocFile: f })}
//           />
//           <Field label="FSSAI License Number" field="fssaiLicenseNumber" mess={mess} setMess={setMess} isEditable={isEditable} />
//         </div>

//         {/* Meta Data */}
//         <SectionHeader title="Meta Information" />
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//           <Field label="Mess ID" field="messId" mess={mess} setMess={setMess} isEditable={false} />
//           <Field label="Owner ID" field="messOwnerId" mess={mess} setMess={setMess} isEditable={false} />
//           <Field label="Created At" field="createdAt" mess={mess} setMess={setMess} isEditable={false} />
//           <Field label="Updated At" field="updatedAt" mess={mess} setMess={setMess} isEditable={false} />
//           <Field label="Email Verified" field="isEmailVerified" mess={{ ...mess, isEmailVerified: mess.isEmailVerified ? "Yes" : "No" }} setMess={setMess} isEditable={false} />
//           <Field label="KYC Verified" field="isVerified" mess={{ ...mess, isVerified: mess.isVerified ? "Yes" : "No" }} setMess={setMess} isEditable={false} />
//         </div>

//         {/* Action Buttons */}
//         <div className="text-center pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-center gap-4">
//           {status === "inactive" && (
//             <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition">
//               Re-Apply Verification
//             </button>
//           )}
//           {status === "pending" && (
//             <button
//               onClick={() => navigate("/minimal-dashboard")}
//               className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition"
//             >
//               Cancel Verification
//             </button>
//           )}
//           {status === "active" && (
//             <button
//               onClick={() => navigate("/owner-dashboard")}
//               className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition"
//             >
//               Go to Dashboard
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// const Field = ({ label, field, mess, setMess, isEditable, invalid }) => (
//   <div>
//     <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
//     <input
//       className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 ${
//         invalid ? "border-red-500" : "border-gray-300"
//       } ${!isEditable ? "bg-gray-100" : "bg-white"}`}
//       value={mess[field] || ""}
//       readOnly={!isEditable}
//       onChange={(e) => isEditable && setMess((prev) => ({ ...prev, [field]: e.target.value }))}
//     />
//   </div>
// );

// const DocCard = ({ label, url, editable, onChange }) => (
//   <div className="border rounded-xl p-4 flex flex-col gap-2">
//     <span className="text-sm font-medium text-gray-600">{label}</span>
//     {url ? (
//       <a href={url} target="_blank" rel="noreferrer" className="text-orange-500 underline">
//         View Document
//       </a>
//     ) : (
//       <p className="text-gray-400 text-sm italic">No document uploaded</p>
//     )}
//     {editable && <input type="file" accept=".pdf,image/*" onChange={(e) => onChange(e.target.files[0])} />}
//   </div>
// );

// const SectionHeader = ({ title }) => (
//   <div className="flex items-center justify-between">
//     <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
//     <div className="flex-1 h-px bg-gray-200 ml-4"></div>
//   </div>
// );

// export default MessVerificationStatus;
