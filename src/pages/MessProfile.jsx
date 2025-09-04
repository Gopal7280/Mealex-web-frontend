


// // import React, { useEffect, useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import Navbar from '../layouts/Navbar';
// // import OwnerHeader from './ownerHeader';
// // import { apiGet, apiPost } from '../services/api';
// // import storage from '../utils/storage';


// // const MessProfile = () => {
// //   const [owner, setOwner] = useState(null);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [uploading, setUploading] = useState(false);
// // const fileInputRef = React.useRef(null);

// //   const navigate = useNavigate();


// //   const fetchOwner = async () => {
// //   setIsLoading(true);
// //   try {
// //     const res = await apiGet('/owner/profile');
// //     console.log('Full:', res);
// //     console.log('data:', res.data);
// //     console.log('data.data:', res.data);

// //     const payload = res.data || res.data?.owner || null;
// //     setOwner(payload);
// //   } catch(e) {
// //     console.error(e);
// //     setOwner(null);
// //   } finally {
// //     setIsLoading(false);
// //   }
// // };


// // const handleFileChange = async (e) => {
// //   const file = e.target.files[0];
// //   if (!file) return;

// //   const formData = new FormData();
// //   formData.append('image', file);

// //   try {
// //     setUploading(true);

// //     const res = await apiPost('/owner/profile/image', formData, {
// //       headers: { 'Content-Type': 'multipart/form-data' }
// //     });

// //     if (res?.data?.success) {
// //       // ✅ Backend sends inside res.data.data
// //       const newUrl =
// //         res.data?.data?.profileImage || res.data?.profileImage;

// //       console.log('🆕 Updated Profile Image URL:', newUrl);

// //       // ✅ Update state immediately with cache-busting
// //       setOwner((prev) => ({
// //         ...prev,
// //         profileImage: `${newUrl}?t=${Date.now()}`
// //       }));
// //     } else {
// //       console.error('⚠️ Upload failed, response:', res);
// //     }
// //   } catch (err) {
// //     console.error('❌ Image upload failed:', err);
// //   } finally {
// //     setUploading(false);
// //   }
// // };



// //   useEffect(() => {
// //     fetchOwner();
// //   }, []);

// //   const handleSwitch = () => {
     
// //   }
// //   // const handleLogout = () => {
// //   //   storage.clear();
// //   //   navigate('/login');
// //   // };

// // // const handleLogout = () => {
// // //   // 🔹 Clear your app storage
// // //   storage.clear();
// // //   localStorage.clear();
// // //   sessionStorage.clear();

// // //   // 🔹 Razorpay cleanup
// // //   if (window.Razorpay) {
// // //     delete window.Razorpay; 
// // //   }

// // //   // 🔹 Hard reload to ensure old Razorpay instance is flushed
// // //   window.location.replace('/login'); 
// // // };


// // const handleLogout = async () => {
// //   try {
// //     const userJwt = storage.getItem("token");
// //     const fcmToken = storage.getItem("fcmToken");

// //     await apiPost(
// //       "/user/logout",
// //       { fcmToken }, // optional, backend will block it
// //       { headers: { Authorization: `Bearer ${userJwt}` } }
// //     );

// //     console.log("✅ Logged out successfully");

// //   } catch (err) {
// //     console.error("❌ Logout API failed:", err);
// //   } finally {
// //     // 🔹 Clear storage
// //     storage.clear();
// //     localStorage.clear();
// //     sessionStorage.clear();

// //     // 🔹 Razorpay cleanup
// //     if (window.Razorpay) {
// //       delete window.Razorpay;
// //     }

// //     // 🔹 Redirect
// //     window.location.replace("/login");
// //   }
// // };



// //   return (
// //     <div className="flex h-screen">
// //       <Navbar />
// //       {/* <div className="flex-1 p-6 overflow-y-auto bg-[#f9f4f0] min-h-screen"> */}
// //       <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-[#f9f4f0] overflow-y-auto">
// //         <OwnerHeader />
// //         <div className="px-10 py-6">
// //          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Owner Profile</h2>

// //           {isLoading ? (
// //             <div className="text-center p-4 text-gray-500">Loading profile...</div>
// //           ) : !owner ? (
// //             <div className="text-center p-4 text-red-500">Profile not found</div>
// //           ) : (
// //             <div className="bg-white rounded shadow p-6 border max-w-3xl">
             
// //               {/* <div className="relative flex items-center gap-4 mb-6">
// //   <img
// //     src={owner.profileImage || '/default-avatar.png'}
// //     alt={owner.ownerName || 'profile'}
// //     className="w-24 h-24 rounded-full border object-cover"
// //   />

// //   <input
// //     type="file"
// //     accept="image/*"
// //     ref={fileInputRef}
// //     className="hidden"
// //     onChange={handleFileChange}
// //   />

  
// // </div> */}
// // <div className="relative flex items-center gap-4 mb-6">
// //   {/* Profile Image with hover overlay */}
// //   <div className="relative w-28 h-28">
// //     <img
// //       src={owner.profileImage || '/default-avatar.png'}
// //       alt={owner.ownerName || 'profile'}
// //       className="w-full h-full rounded-full border object-cover"
// //     />

// //     {/* Overlay on hover */}
// //     <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 hover:opacity-100 rounded-full cursor-pointer transition">
// //       <span className="text-white text-xs font-semibold px-2 py-1 border border-white rounded">
// //         Edit Image
// //       </span>
// //       <input
// //         type="file"
// //         accept="image/*"
// //         ref={fileInputRef}
// //         className="hidden"
// //         onChange={handleFileChange}
// //       />
// //     </label>
// //   </div>

// //   {/* Text loader when uploading */}
// //   {uploading && (
// //     <p className="text-orange-600 text-sm font-semibold">Uploading...</p>
// //   )}
// // </div>




// //               {/* Info Rows */}
// //               <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
// //                 <div><strong>Name:</strong> {owner.ownerName || '—'}</div>
// //                 <div><strong>Email:</strong> {owner.contactEmail || '—'}</div>
// //                 <div><strong>Contact:</strong> {owner.contactNumber || '—'}</div>
// //                 <div>
// //                   <strong>Gender:</strong> {owner.gender || '—'}
// //                 </div>
// //                 <div>
// //                   <strong>Address:</strong> {owner.ownerAddress || '—'}
// //                 </div>
// //                 <div><strong>City:</strong> {owner.city || '—'}</div>
// //                 <div><strong>State:</strong> {owner.state || '—'}</div>
// //                 <div><strong>Pincode:</strong> {owner.pincode || '—'}</div>
// //                 <div>
// //                   <strong>DOB:</strong> {owner.dateofbirth || '—'}
// //                 </div>
// //                 <div>
// //                   <strong>Mess Count:</strong> {owner.messCount || 0}
// //                 </div>
// //               </div>

// //               {/* CTA Buttons */}
// //               <div className="flex justify-between mt-8">
// //                 <button
// //                   className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm"
// //                   onClick={handleSwitch}
// //                 >
// //                   Switch to Mess Profile ↱
// //                 </button>
// //                 <button
// //                   className="border border-red-400 text-red-600 px-4 py-2 rounded text-sm hover:bg-red-50"
// //                   onClick={handleLogout}
// //                 >
// //                   Log Out ↩
// //                 </button>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default MessProfile;





// // import React, { useEffect, useState, useRef } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import Navbar from '../layouts/Navbar';
// // import OwnerHeader from './ownerHeader';
// // import { apiGet, apiPost } from '../services/api';
// // import storage from '../utils/storage';

// // const MessProfile = () => {
// //   const [owner, setOwner] = useState(null);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [uploading, setUploading] = useState(false);
// //   const [messes, setMesses] = useState([]);
// //   const [showModal, setShowModal] = useState(false);

// //   const fileInputRef = useRef(null);
// //   const navigate = useNavigate();

// //   const fetchOwner = async () => {
// //     setIsLoading(true);
// //     try {
// //       const res = await apiGet('/owner/profile');
// //       const payload = res.data || res.data?.owner || null;
// //       setOwner(payload);
// //     } catch (e) {
// //       console.error(e);
// //       setOwner(null);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const handleFileChange = async (e) => {
// //     const file = e.target.files[0];
// //     if (!file) return;

// //     const formData = new FormData();
// //     formData.append('image', file);

// //     try {
// //       setUploading(true);
// //       const res = await apiPost('/owner/profile/image', formData, {
// //         headers: { 'Content-Type': 'multipart/form-data' }
// //       });

// //       if (res?.data?.success) {
// //         const newUrl = res.data?.data?.profileImage || res.data?.profileImage;
// //         setOwner((prev) => ({
// //           ...prev,
// //           profileImage: `${newUrl}?t=${Date.now()}`
// //         }));
// //       }
// //     } catch (err) {
// //       console.error('❌ Image upload failed:', err);
// //     } finally {
// //       setUploading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchOwner();
// //   }, []);

// //   // 🔹 Fetch all messes for modal
// //   useEffect(() => {
// //     const fetchOwnerMesses = async () => {
// //       try {
// //         const res = await apiGet("/owner/mess/all");
// //         if (res?.success) {
// //           setMesses(res.data || []);
// //         } else {
// //           setMesses([]);
// //         }
// //       } catch (error) {
// //         console.error("Error fetching owner messes:", error);
// //         setMesses([]);
// //       }
// //     };
// //     fetchOwnerMesses();
// //   }, []);

// //   const handleLogout = async () => {
// //     try {
// //       const userJwt = storage.getItem("token");
// //       const fcmToken = storage.getItem("fcmToken");

// //       await apiPost(
// //         "/user/logout",
// //         { fcmToken },
// //         { headers: { Authorization: `Bearer ${userJwt}` } }
// //       );
// //     } catch (err) {
// //       console.error("❌ Logout API failed:", err);
// //     } finally {
// //       storage.clear();
// //       localStorage.clear();
// //       sessionStorage.clear();
// //       if (window.Razorpay) delete window.Razorpay;
// //       window.location.replace("/login");
// //     }
// //   };

// //   return (
// //     <div className="flex h-screen">
// //       <Navbar />
// //       <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-[#f9f4f0] overflow-y-auto">
// //         <OwnerHeader />
// //         <div className="px-10 py-6">
// //           <h2 className="text-2xl font-semibold text-gray-800 mb-4">Owner Profile</h2>

// //           {isLoading ? (
// //             <div className="text-center p-4 text-gray-500">Loading profile...</div>
// //           ) : !owner ? (
// //             <div className="text-center p-4 text-red-500">Profile not found</div>
// //           ) : (
// //             <div className="bg-white rounded shadow p-6 border max-w-3xl">
// //               {/* Profile Image */}
// //               <div className="relative flex items-center gap-4 mb-6">
// //                 <div className="relative w-28 h-28">
// //                   <img
// //                     src={owner.profileImage || '/default-avatar.png'}
// //                     alt={owner.ownerName || 'profile'}
// //                     className="w-full h-full rounded-full border object-cover"
// //                   />
// //                   <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 hover:opacity-100 rounded-full cursor-pointer transition">
// //                     <span className="text-white text-xs font-semibold px-2 py-1 border border-white rounded">
// //                       Edit Image
// //                     </span>
// //                     <input
// //                       type="file"
// //                       accept="image/*"
// //                       ref={fileInputRef}
// //                       className="hidden"
// //                       onChange={handleFileChange}
// //                     />
// //                   </label>
// //                 </div>
// //                 {uploading && <p className="text-orange-600 text-sm font-semibold">Uploading...</p>}
// //               </div>

// //               {/* Info Rows */}
// //               <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
// //                 <div><strong>Name:</strong> {owner.ownerName || '—'}</div>
// //                 <div><strong>Email:</strong> {owner.contactEmail || '—'}</div>
// //                 <div><strong>Contact:</strong> {owner.contactNumber || '—'}</div>
// //                 <div><strong>Gender:</strong> {owner.gender || '—'}</div>
// //                 <div><strong>Address:</strong> {owner.ownerAddress || '—'}</div>
// //                 <div><strong>City:</strong> {owner.city || '—'}</div>
// //                 <div><strong>State:</strong> {owner.state || '—'}</div>
// //                 <div><strong>Pincode:</strong> {owner.pincode || '—'}</div>
// //                 <div><strong>DOB:</strong> {owner.dateofbirth || '—'}</div>
// //                 <div><strong>Mess Count:</strong> {owner.messCount || 0}</div>
// //               </div>

// //               {/* CTA Buttons */}
// //               <div className="flex justify-between mt-8">
// //                 <button
// //                   className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm"
// //                   onClick={() => setShowModal(true)}
// //                 >
// //                   Switch to Mess Profile ↱
// //                 </button>
// //                 <button
// //                   className="border border-red-400 text-red-600 px-4 py-2 rounded text-sm hover:bg-red-50"
// //                   onClick={handleLogout}
// //                 >
// //                   Log Out ↩
// //                 </button>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       {/* 🔹 Modal for Mess List */}
// //       {showModal && (
// //         <div className="fixed inset-0 flex items-start justify-center backdrop-blur-sm bg-opacity-40 z-50 pt-20">
// //           <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6">
// //             <h3 className="text-lg font-semibold mb-4">Select a Mess</h3>

// //             {messes.length === 0 ? (
// //               <p className="text-gray-500">No messes found.</p>
// //             ) : (
// //               <ul className="space-y-3 max-h-64 overflow-y-auto">
// //                 {messes.map((mess) => (
// //                   <li
// //                     key={mess._id}
// //                     className="p-3 border rounded-lg hover:bg-orange-50 cursor-pointer"
// //                   >
// //                     <div className="font-medium text-gray-800">{mess.messName}</div>
// //                     <div className="text-sm text-gray-500">{mess.city}, {mess.state}</div>
// //                   </li>
// //                 ))}
// //               </ul>
// //             )}

// //             <div className="flex justify-end mt-6">
// //               <button
// //                 className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
// //                 onClick={() => setShowModal(false)}
// //               >
// //                 Close
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default MessProfile;




// // import React, { useEffect, useState, useRef } from "react";
// // import { useNavigate } from "react-router-dom";
// // import Navbar from "../layouts/Navbar";
// // import OwnerHeader from "./ownerHeader";
// // import { apiGet, apiPost } from "../services/api";
// // import storage from "../utils/storage";
// // import toast from "react-hot-toast";

// // const MessProfile = () => {
// //   const [owner, setOwner] = useState(null);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [uploading, setUploading] = useState(false);
// //   const [messes, setMesses] = useState([]);
// //   const [showModal, setShowModal] = useState(false);
// //   const [showEditModal, setShowEditModal] = useState(false);
// //   const [formData, setFormData] = useState({});
// //   const [saving, setSaving] = useState(false);

// //   const fileInputRef = useRef(null);
// //   const navigate = useNavigate();

// //   const fetchOwner = async () => {
// //     setIsLoading(true);
// //     try {
// //       const res = await apiGet("/owner/profile");
// //       const payload = res.data || res.data?.owner || null;
// //       setOwner(payload);
// //     } catch (e) {
// //       console.error(e);
// //       setOwner(null);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const handleFileChange = async (e) => {
// //     const file = e.target.files[0];
// //     if (!file) return;

// //     const formData = new FormData();
// //     formData.append("image", file);

// //     try {
// //       setUploading(true);
// //       const res = await apiPost("/owner/profile/image", formData, {
// //         headers: { "Content-Type": "multipart/form-data" },
// //       });

// //       if (res?.data?.success) {
// //         const newUrl = res.data?.data?.profileImage || res.data?.profileImage;
// //         setOwner((prev) => ({
// //           ...prev,
// //           profileImage: `${newUrl}?t=${Date.now()}`,
// //         }));
// //       }
// //     } catch (err) {
// //       console.error("❌ Image upload failed:", err);
// //     } finally {
// //       setUploading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchOwner();
// //   }, []);

// //   useEffect(() => {
// //     const fetchOwnerMesses = async () => {
// //       try {
// //         const res = await apiGet("/owner/mess/all");
// //         if (res?.success) {
// //           setMesses(res.data || []);
// //         } else {
// //           setMesses([]);
// //         }
// //       } catch (error) {
// //         console.error("Error fetching owner messes:", error);
// //         setMesses([]);
// //       }
// //     };
// //     fetchOwnerMesses();
// //   }, []);

// //   const handleLogout = async () => {
// //     try {
// //       const userJwt = storage.getItem("token");
// //       const fcmToken = storage.getItem("fcmToken");
// //       await apiPost(
// //         "/user/logout",
// //         { fcmToken },
// //         { headers: { Authorization: `Bearer ${userJwt}` } }
// //       );
// //     } catch (err) {
// //       console.error("❌ Logout API failed:", err);
// //     } finally {
// //       storage.clear();
// //       localStorage.clear();
// //       sessionStorage.clear();
// //       if (window.Razorpay) delete window.Razorpay;
// //       window.location.replace("/login");
// //     }
// //   };

// //   // const openEditModal = () => {
// //   //   setFormData({
// //   //     ownerName: owner?.ownerName || "",
// //   //     gender: owner?.gender || "",
// //   //     ownerAddress: owner?.ownerAddress || "",
// //   //     city: owner?.city || "",
// //   //     state: owner?.state || "",
// //   //     pincode: owner?.pincode || "",
// //   //     dateofbirth: owner?.dateofbirth || "",
// //   //   });
// //   //   setShowEditModal(true);
// //   // };
  
  
// //   const openEditModal = () => {
// //   setFormData({
// //     ownerName: owner?.ownerName || "",
// //     contactEmail: owner?.contactEmail || "",
// //     contactNumber: owner?.contactNumber || "",
// //     gender: owner?.gender || "",
// //     ownerAddress: owner?.ownerAddress || "",
// //     city: owner?.city || "",
// //     state: owner?.state || "",
// //     pincode: owner?.pincode || "",
// //     dateofbirth: owner?.dateofbirth || "",
// //   });
// //   setShowEditModal(true);
// // };


// //   const handleEditChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({ ...prev, [name]: value }));
// //   };

// //   // const handleProfileUpdate = async () => {
// //   //   try {
// //   //     setSaving(true);
// //   //     const res = await apiPost("/owner/profile/update", formData);
// //   //     if (res?.success) {
// //   //       setOwner((prev) => ({ ...prev, ...res.data }));
// //   //       setShowEditModal(false);
// //   //     } else {
// //   //       alert(res.message || "Update failed");
// //   //     }
// //   //   } catch (err) {
// //   //     console.error("Update error:", err);
// //   //   } finally {
// //   //     setSaving(false);
// //   //   }
// //   // };
// //   const handleProfileUpdate = async () => {
// //   try {
// //     setSaving(true);
// //     const res = await apiPost("/owner/profile/update", formData);
// //     console.log("Update response:", res);

// //     if (res?.data?.success) {
// //       setOwner((prev) => ({ ...prev, ...res.data.data }));
// //       setShowEditModal(false);
// //       toast.success(res.data.message || "Profile updated successfully!");
// //     } else {
// //       alert(res?.data?.message || "Update failed");
// //     }
// //   } catch (err) {
// //     console.error("Update error:", err);
// //     alert("Something went wrong.");
// //   } finally {
// //     setSaving(false);
// //   }
// // };


// //   return (
// //     <div className="flex h-screen">
// //       <Navbar />
// //       <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-[#f9f4f0] overflow-y-auto">
// //         <OwnerHeader />
// //         <div className="px-10 py-6">
// //           <h2 className="text-2xl font-semibold text-gray-800 mb-4">
// //             Owner Profile
// //           </h2>

// //           {isLoading ? (
// //             <div className="text-center p-4 text-gray-500">
// //               Loading profile...
// //             </div>
// //           ) : !owner ? (
// //             <div className="text-center p-4 text-red-500">Profile not found</div>
// //           ) : (
// //             <div className="bg-white rounded shadow p-6 border max-w-3xl">
// //               {/* Profile Image + Edit Button */}
// //               <div className="flex items-center gap-6 mb-6">
// //                 <div className="relative w-28 h-28">
// //                   <img
// //                     src={owner.profileImage || "/default-avatar.png"}
// //                     alt={owner.ownerName || "profile"}
// //                     className="w-full h-full rounded-full border object-cover"
// //                   />
// //                   <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 hover:opacity-100 rounded-full cursor-pointer transition">
// //                     <span className="text-white text-xs font-semibold px-2 py-1 border border-white rounded">
// //                       Edit Image
// //                     </span>
// //                     <input
// //                       type="file"
// //                       accept="image/*"
// //                       ref={fileInputRef}
// //                       className="hidden"
// //                       onChange={handleFileChange}
// //                     />
// //                   </label>
// //                 </div>

// //                 <button
// //                   onClick={openEditModal}
// //                   className="bg-orange-600 text-white hover:bg-green-700 px-4 py-2 rounded text-sm"
// //                 >
// //                   ✏️ Edit Profile
// //                 </button>

// //                 {uploading && (
// //                   <p className="text-orange-600 text-sm font-semibold">
// //                     Uploading...
// //                   </p>
// //                 )}
// //               </div>

// //               {/* Info Rows */}
// //               <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
// //                 <div>
// //                   <strong>Name:</strong> {owner.ownerName || "—"}
// //                 </div>
// //                 <div>
// //                   <strong>Email:</strong> {owner.contactEmail || "—"}
// //                 </div>
// //                 <div>
// //                   <strong>Contact:</strong> {owner.contactNumber || "—"}
// //                 </div>
// //                 <div>
// //                   <strong>Gender:</strong> {owner.gender || "—"}
// //                 </div>
// //                 <div>
// //                   <strong>Address:</strong> {owner.ownerAddress || "—"}
// //                 </div>
// //                 <div>
// //                   <strong>City:</strong> {owner.city || "—"}
// //                 </div>
// //                 <div>
// //                   <strong>State:</strong> {owner.state || "—"}
// //                 </div>
// //                 <div>
// //                   <strong>Pincode:</strong> {owner.pincode || "—"}
// //                 </div>
// //                 <div>
// //                   <strong>DOB:</strong> {owner.dateofbirth || "—"}
// //                 </div>
// //                 <div>
// //                   <strong>Mess Count:</strong> {owner.messCount || 0}
// //                 </div>
// //               </div>

// //               {/* CTA Buttons */}
// //               <div className="flex justify-between mt-8">
// //                 <button
// //                   className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm"
// //                   onClick={() => setShowModal(true)}
// //                 >
// //                   Switch to Mess Profile ↱
// //                 </button>
// //                 <button
// //                   className="border border-red-400 text-red-600 px-4 py-2 rounded text-sm hover:bg-red-50"
// //                   onClick={handleLogout}
// //                 >
// //                   Log Out ↩
// //                 </button>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       {/* Mess Switch Modal */}
// //       {showModal && (
// //         <div className="fixed inset-0 flex items-start justify-center backdrop-blur-sm bg-opacity-40 z-50 pt-20">
// //           <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6">
// //             <h3 className="text-lg font-semibold mb-4">Select a Mess</h3>
// //             {messes.length === 0 ? (
// //               <p className="text-gray-500">No messes found.</p>
// //             ) : (
// //               <ul className="space-y-3 max-h-64 overflow-y-auto">
// //                 {messes.map((mess) => (
// //                   <li
// //                     key={mess._id}
// //                     className="p-3 border rounded-lg hover:bg-orange-50 cursor-pointer"
// //                   >
// //                     <div className="font-medium text-gray-800">
// //                       {mess.messName}
// //                     </div>
// //                     <div className="text-sm text-gray-500">
// //                       {mess.city}, {mess.state}
// //                     </div>
// //                   </li>
// //                 ))}
// //               </ul>
// //             )}
// //             <div className="flex justify-end mt-6">
// //               <button
// //                 className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
// //                 onClick={() => setShowModal(false)}
// //               >
// //                 Close
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* Edit Profile Modal */}
// //       {/* {showEditModal && (
// //         <div className="fixed inset-0 flex items-start justify-center backdrop-blur-sm bg-opacity-40 z-50 pt-20">
// //           <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6">
// //             <h3 className="text-lg font-semibold mb-4">Edit Profile</h3>
// //             <div className="space-y-3">
// //               <input
// //                 name="ownerName"
// //                 value={formData.ownerName}
// //                 onChange={handleEditChange}
// //                 placeholder="Name"
// //                 className="border p-2 rounded w-full"
// //               />
// //               <select
// //                 name="gender"
// //                 value={formData.gender}
// //                 onChange={handleEditChange}
// //                 className="border p-2 rounded w-full"
// //               >
// //                 <option value="">Select Gender</option>
// //                 <option value="male">Male</option>
// //                 <option value="female">Female</option>
// //               </select>
// //               <input
// //                 name="ownerAddress"
// //                 value={formData.ownerAddress}
// //                 onChange={handleEditChange}
// //                 placeholder="Address"
// //                 className="border p-2 rounded w-full"
// //               />
// //               <input
// //                 name="city"
// //                 value={formData.city}
// //                 onChange={handleEditChange}
// //                 placeholder="City"
// //                 className="border p-2 rounded w-full"
// //               />
// //               <input
// //                 name="state"
// //                 value={formData.state}
// //                 onChange={handleEditChange}
// //                 placeholder="State"
// //                 className="border p-2 rounded w-full"
// //               />
// //               <input
// //                 name="pincode"
// //                 value={formData.pincode}
// //                 onChange={handleEditChange}
// //                 placeholder="Pincode"
// //                 className="border p-2 rounded w-full"
// //               />
// //               <input
// //                 type="date"
// //                 name="dateofbirth"
// //                 value={formData.dateofbirth}
// //                 onChange={handleEditChange}
// //                 className="border p-2 rounded w-full"
// //               />
// //             </div>

// //             <div className="flex justify-end mt-6 gap-3">
// //               <button
// //                 onClick={() => setShowEditModal(false)}
// //                 className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 disabled={saving}
// //                 onClick={handleProfileUpdate}
// //                 className="px-4 py-2 text-sm bg-orange-500 text-white rounded hover:bg-orange-600"
// //               >
// //                 {saving ? "Saving..." : "Save Changes"}
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )} */}
// //       {/* Edit Profile Modal */}
// // {/* {showEditModal && (
// //   <div className="fixed inset-0 flex items-start justify-center backdrop-blur-sm bg-opacity-40 z-50 pt-20">
// //     <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6">
// //       <h3 className="text-lg font-semibold mb-4">Edit Profile</h3>
// //       <div className="space-y-3">
// //         <input
// //           name="ownerName"
// //           value={formData.ownerName}
// //           onChange={handleEditChange}
// //           placeholder="Name"
// //           className="border p-2 rounded w-full"
// //         />
// //         <input
// //           type="email"
// //           name="contactEmail"
// //           value={formData.contactEmail}
// //           onChange={handleEditChange}
// //           placeholder="Email"
// //           className="border p-2 rounded w-full"
// //         />
// //         <input
// //           type="tel"
// //           name="contactNumber"
// //           value={formData.contactNumber}
// //           onChange={handleEditChange}
// //           placeholder="Contact Number"
// //           className="border p-2 rounded w-full"
// //         />
// //         <select
// //           name="gender"
// //           value={formData.gender}
// //           onChange={handleEditChange}
// //           className="border p-2 rounded w-full"
// //         >
// //           <option value="">Select Gender</option>
// //           <option value="male">Male</option>
// //           <option value="female">Female</option>
// //         </select>
// //         <input
// //           name="ownerAddress"
// //           value={formData.ownerAddress}
// //           onChange={handleEditChange}
// //           placeholder="Address"
// //           className="border p-2 rounded w-full"
// //         />
// //         <input
// //           name="city"
// //           value={formData.city}
// //           onChange={handleEditChange}
// //           placeholder="City"
// //           className="border p-2 rounded w-full"
// //         />
// //         <input
// //           name="state"
// //           value={formData.state}
// //           onChange={handleEditChange}
// //           placeholder="State"
// //           className="border p-2 rounded w-full"
// //         />
// //         <input
// //           name="pincode"
// //           value={formData.pincode}
// //           onChange={handleEditChange}
// //           placeholder="Pincode"
// //           className="border p-2 rounded w-full"
// //         />
// //         <input
// //           type="date"
// //           name="dateofbirth"
// //           value={formData.dateofbirth}
// //           onChange={handleEditChange}
// //           className="border p-2 rounded w-full"
// //         />
// //       </div>

// //       <div className="flex justify-end mt-6 gap-3">
// //         <button
// //           onClick={() => setShowEditModal(false)}
// //           className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
// //         >
// //           Cancel
// //         </button>
// //         <button
// //           disabled={saving}
// //           onClick={handleProfileUpdate}
// //           className="px-4 py-2 text-sm bg-orange-500 text-white rounded hover:bg-orange-600"
// //         >
// //           {saving ? "Saving..." : "Save Changes"}
// //         </button>
// //       </div>
// //     </div>
// //   </div>
// // )} */}
// // {/* Edit Profile Modal */}
// // {showEditModal && (
// //   <div className="fixed inset-0 flex items-start justify-center backdrop-blur-sm bg-opacity-40 z-50 pt-20">
// //     <div className="bg-white w-full max-w-lg rounded-lg shadow-lg flex flex-col max-h-[80vh]">
// //       <h3 className="text-lg font-semibold p-6 pb-2">Edit Profile</h3>

// //       {/* Scrollable content */}
// //       <div className="px-6 pb-4 overflow-y-auto flex-1 space-y-3">
// //         <input
// //           name="ownerName"
// //           value={formData.ownerName}
// //           onChange={handleEditChange}
// //           placeholder="Name"
// //           className="border p-2 rounded w-full"
// //         />
// //         <input
// //           type="email"
// //           name="contactEmail"
// //           value={formData.contactEmail}
// //           onChange={handleEditChange}
// //           placeholder="Email"
// //           className="border p-2 rounded w-full"
// //         />
// //         <input
// //           type="tel"
// //           name="contactNumber"
// //           value={formData.contactNumber}
// //           onChange={handleEditChange}
// //           placeholder="Contact Number"
// //           className="border p-2 rounded w-full"
// //         />
// //         <select
// //           name="gender"
// //           value={formData.gender}
// //           onChange={handleEditChange}
// //           className="border p-2 rounded w-full"
// //         >
// //           <option value="">Select Gender</option>
// //           <option value="male">Male</option>
// //           <option value="female">Female</option>
// //         </select>
// //         <input
// //           name="ownerAddress"
// //           value={formData.ownerAddress}
// //           onChange={handleEditChange}
// //           placeholder="Address"
// //           className="border p-2 rounded w-full"
// //         />
// //         <input
// //           name="city"
// //           value={formData.city}
// //           onChange={handleEditChange}
// //           placeholder="City"
// //           className="border p-2 rounded w-full"
// //         />
// //         <input
// //           name="state"
// //           value={formData.state}
// //           onChange={handleEditChange}
// //           placeholder="State"
// //           className="border p-2 rounded w-full"
// //         />
// //         <input
// //           name="pincode"
// //           value={formData.pincode}
// //           onChange={handleEditChange}
// //           placeholder="Pincode"
// //           className="border p-2 rounded w-full"
// //         />
// //         <input
// //           type="date"
// //           name="dateofbirth"
// //           value={formData.dateofbirth}
// //           onChange={handleEditChange}
// //           className="border p-2 rounded w-full"
// //         />
// //       </div>

// //       {/* Fixed buttons */}
// //       <div className="flex justify-end gap-3 border-t p-4">
// //         <button
// //           onClick={() => setShowEditModal(false)}
// //           className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
// //         >
// //           Cancel
// //         </button>
// //         <button
// //           disabled={saving}
// //           onClick={handleProfileUpdate}
// //           className="px-4 py-2 text-sm bg-orange-500 text-white rounded hover:bg-orange-600"
// //         >
// //           {saving ? "Saving..." : "Save Changes"}
// //         </button>
// //       </div>
// //     </div>
// //   </div>
// // )}


// //     </div>
// //   );
// // };

// // export default MessProfile;



// import React, { useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../layouts/Navbar";
// import OwnerHeader from "./ownerHeader";
// import { apiGet, apiPost } from "../services/api";
// import storage from "../utils/storage";
// import toast from "react-hot-toast";

// const MessProfile = () => {
//   const [owner, setOwner] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [uploading, setUploading] = useState(false);
//   const [messes, setMesses] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [formData, setFormData] = useState({});
//   const [saving, setSaving] = useState(false);

//   const fileInputRef = useRef(null);
//   const navigate = useNavigate();

//   const fetchOwner = async () => {
//     setIsLoading(true);
//     try {
//       const res = await apiGet("/owner/profile");
//       const payload = res.data || res.data?.owner || null;
//       setOwner(payload);
//     } catch (e) {
//       console.error(e);
//       setOwner(null);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleFileChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("image", file);

//     try {
//       setUploading(true);
//       const res = await apiPost("/owner/profile/image", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       if (res?.data?.success) {
//         const newUrl = res.data?.data?.profileImage || res.data?.profileImage;
//         setOwner((prev) => ({
//           ...prev,
//           profileImage: `${newUrl}?t=${Date.now()}`,
//         }));
//       }
//     } catch (err) {
//       console.error("❌ Image upload failed:", err);
//     } finally {
//       setUploading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOwner();
//   }, []);

//   useEffect(() => {
//     const fetchOwnerMesses = async () => {
//       try {
//         const res = await apiGet("/owner/mess/all");
//         if (res?.success) {
//           setMesses(res.data || []);
//         } else {
//           setMesses([]);
//         }
//       } catch (error) {
//         console.error("Error fetching owner messes:", error);
//         setMesses([]);
//       }
//     };
//     fetchOwnerMesses();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       const userJwt = storage.getItem("token");
//       const fcmToken = storage.getItem("fcmToken");
//       await apiPost(
//         "/user/logout",
//         { fcmToken },
//         { headers: { Authorization: `Bearer ${userJwt}` } }
//       );
//     } catch (err) {
//       console.error("❌ Logout API failed:", err);
//     } finally {
//       storage.clear();
//       localStorage.clear();
//       sessionStorage.clear();
//       if (window.Razorpay) delete window.Razorpay;
//       window.location.replace("/login");
//     }
//   };

//   const openEditModal = () => {
//     setFormData({
//       ownerName: owner?.ownerName || "",
//       contactEmail: owner?.contactEmail || "",
//       contactNumber: owner?.contactNumber || "",
//       gender: owner?.gender || "",
//       ownerAddress: owner?.ownerAddress || "",
//       city: owner?.city || "",
//       state: owner?.state || "",
//       pincode: owner?.pincode || "",
//       dateofbirth: owner?.dateofbirth || "",
//     });
//     setShowEditModal(true);
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleProfileUpdate = async () => {
//     try {
//       setSaving(true);
//       const res = await apiPost("/owner/profile/update", formData);
//       if (res?.data?.success) {
//         setOwner((prev) => ({ ...prev, ...res.data.data }));
//         setShowEditModal(false);
//         toast.success(res.data.message || "Profile updated successfully!");
//       } else {
//         toast.error(res?.data?.message || "Update failed");
//       }
//     } catch (err) {
//       console.error("Update error:", err);
//       toast.error("Something went wrong.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex min-h-screen bg-[#F9F4F0]">
//         <Navbar />
//         <div className="w-full mx-auto p-6 text-center text-gray-500">
//           Loading profile...
//         </div>
//       </div>
//     );
//   }

//   if (!owner) {
//     return (
//       <div className="flex min-h-screen bg-[#F9F4F0]">
//         <Navbar />
//         <div className="w-full mx-auto p-6 text-center text-red-500">
//           Profile not found
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex h-screen bg-[#E9DCC9]">
//       <Navbar />
//       <div className="flex-1 md:p-4 pt-16 py-4 px-4 overflow-y-auto">
//         <OwnerHeader />

//         <h2 className="text-2xl font-bold font-poppins text-[#232325D1] mb-4">
//           Owner Profile
//         </h2>

//         <div className="bg-white shadow-md rounded-2xl p-6">
//           <div className="w-full flex sm:flex-row items-center gap-6">
//             <div className="relative w-32 h-32">
//               <img
//                 src={owner.profileImage || "/default-avatar.png"}
//                 alt="Profile"
//                 className="w-full h-full rounded-xl object-cover"
//               />
//               <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 hover:opacity-100 rounded-xl cursor-pointer transition">
//                 <span className="text-white text-xs font-semibold px-2 py-1 border border-white rounded">
//                   {uploading ? "Uploading..." : "Edit Image"}
//                 </span>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   ref={fileInputRef}
//                   className="hidden"
//                   onChange={handleFileChange}
//                 />
//               </label>
//             </div>

//             <div>
//               <h2 className="text-2xl font-semibold font-poppins text-[#393939]">
//                 {owner.ownerName || "Unnamed"}
//               </h2>
//               <div className="flex items-center gap-3">
//                 <p className="text-gray-500 font-poppins">
//                   {owner.contactEmail || ""}
//                 </p>
//                 {/* <button
//                   onClick={openEditModal}
//                   className="bg-orange-500 hover:bg-orange-600 text-white text-xs px-3 py-1 rounded-lg shadow-sm transition"
//                 >
//                   ✏️ Edit Profile
//                 </button> */}
//                  <button
//     onClick={openEditModal}
//     className="top-4 right-4 bg-orange-500 hover:bg-orange-600 
//                text-white text-sm font-semibold px-5 py-2 rounded-full shadow-md transition"
//   >
//     ✏️ Edit Profile
//   </button>
//               </div>
//             </div>
//           </div>

//           {/* Details */}
//           <div className="flex justify-between w-full gap-2 font-poppins text-[#535353] mt-8">
//             <div className="flex flex-col items-start space-y-8 w-1/2 md:pl-4 pl-1 text-xl">
//               <p className="font-medium">Email:</p>
//               <p className="font-medium">Contact:</p>
//               <p className="font-medium">Gender:</p>
//               <p className="font-medium">DOB:</p>
//               <p className="font-medium">Address:</p>
//               <p className="font-medium">City:</p>
//               <p className="font-medium">State:</p>
//               <p className="font-medium">Pincode:</p>
//               <p className="font-medium">Mess Count:</p>
//             </div>

//             <div className="flex flex-col items-end space-y-8 w-1/2 md:pr-4 pr-1 text-xl text-gray-600">
//               <p>{owner.contactEmail || "N/A"}</p>
//               <p>{owner.contactNumber || "N/A"}</p>
//               <p>{owner.gender || "Not Provided"}</p>
//               <p>{owner.dateofbirth || "Not Provided"}</p>
//               <p>{owner.ownerAddress || "N/A"}</p>
//               <p>{owner.city || "N/A"}</p>
//               <p>{owner.state || "N/A"}</p>
//               <p>{owner.pincode || "N/A"}</p>
//               <p>{owner.messCount || 0}</p>
//             </div>
//           </div>
//         </div>

//         {/* Logout + Switch Buttons */}
//         <div className="grid grid-cols-2 gap-4 mt-8">
//           <button
//             onClick={() => setShowModal(true)}
//             className="bg-orange-500 hover:bg-orange-600 text-white font-bold font-poppins py-2 rounded-lg shadow-sm"
//           >
//             Switch to Mess Profile ↱
//           </button>
//           <button
//             onClick={handleLogout}
//             className="border border-[#EA4335] text-[#EA4335] text-sm font-bold font-poppins py-2 rounded-lg"
//           >
//             LOG OUT
//           </button>
//         </div>
//       </div>

//       {/* Switch Modal */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-start justify-center backdrop-blur-sm bg-opacity-40 z-50 pt-20">
//           <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6">
//             <h3 className="text-lg font-semibold mb-4">Select a Mess</h3>
//             {messes.length === 0 ? (
//               <p className="text-gray-500">No messes found.</p>
//             ) : (
//               <ul className="space-y-3 max-h-64 overflow-y-auto">
//                 {messes.map((mess) => (
//                   <li
//                     key={mess._id}
//                     className="p-3 border rounded-lg hover:bg-orange-50 cursor-pointer"
//                   >
//                     <div className="font-medium text-gray-800">
//                       {mess.messName}
//                     </div>
//                     <div className="text-sm text-gray-500">
//                       {mess.city}, {mess.state}
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             )}
//             <div className="flex justify-end mt-6">
//               <button
//                 className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
//                 onClick={() => setShowModal(false)}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Edit Profile Modal */}
//       {showEditModal && (
//         <div className="fixed inset-0 flex items-start justify-center backdrop-blur-sm bg-opacity-40 z-50 pt-20">
//           <div className="bg-white w-full max-w-lg rounded-lg shadow-lg flex flex-col max-h-[80vh]">
//             <h3 className="text-lg font-semibold p-6 pb-2">Edit Profile</h3>
//             <div className="px-6 pb-4 overflow-y-auto flex-1 space-y-3">
//               <input
//                 name="ownerName"
//                 value={formData.ownerName}
//                 onChange={handleEditChange}
//                 placeholder="Name"
//                 className="border p-2 rounded w-full"
//               />
//               <input
//                 type="email"
//                 name="contactEmail"
//                 value={formData.contactEmail}
//                 onChange={handleEditChange}
//                 placeholder="Email"
//                 className="border p-2 rounded w-full"
//               />
//               <input
//                 type="tel"
//                 name="contactNumber"
//                 value={formData.contactNumber}
//                 onChange={handleEditChange}
//                 placeholder="Contact Number"
//                 className="border p-2 rounded w-full"
//               />
//               <select
//                 name="gender"
//                 value={formData.gender}
//                 onChange={handleEditChange}
//                 className="border p-2 rounded w-full"
//               >
//                 <option value="">Select Gender</option>
//                 <option value="male">Male</option>
//                 <option value="female">Female</option>
//               </select>
//               <input
//                 type="date"
//                 name="dateofbirth"
//                 value={formData.dateofbirth}
//                 onChange={handleEditChange}
//                 className="border p-2 rounded w-full"
//               />
//               <input
//                 name="ownerAddress"
//                 value={formData.ownerAddress}
//                 onChange={handleEditChange}
//                 placeholder="Address"
//                 className="border p-2 rounded w-full"
//               />
//               <input
//                 name="city"
//                 value={formData.city}
//                 onChange={handleEditChange}
//                 placeholder="City"
//                 className="border p-2 rounded w-full"
//               />
//               <input
//                 name="state"
//                 value={formData.state}
//                 onChange={handleEditChange}
//                 placeholder="State"
//                 className="border p-2 rounded w-full"
//               />
//               <input
//                 name="pincode"
//                 value={formData.pincode}
//                 onChange={handleEditChange}
//                 placeholder="Pincode"
//                 className="border p-2 rounded w-full"
//               />
//             </div>
//             <div className="flex justify-end gap-3 border-t p-4">
//               <button
//                 onClick={() => setShowEditModal(false)}
//                 className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
//               >
//                 Cancel
//               </button>
//               <button
//                 disabled={saving}
//                 onClick={handleProfileUpdate}
//                 className="px-4 py-2 text-sm bg-orange-500 text-white rounded hover:bg-orange-600"
//               >
//                 {saving ? "Saving..." : "Save Changes"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MessProfile;



// import React, { useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../layouts/Navbar";
// import OwnerHeader from "./ownerHeader";
// import { apiGet, apiPost } from "../services/api";
// import storage from "../utils/storage";
// import toast from "react-hot-toast";

// const MessProfile = () => {
//   const [owner, setOwner] = useState(null);
//   const [mess, setMess] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [uploading, setUploading] = useState(false);
//   const [messes, setMesses] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [activeProfileType, setActiveProfileType] = useState("owner"); // owner | mess
//   const [selectedMessId, setSelectedMessId] = useState(null);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [formData, setFormData] = useState({});
//   const [saving, setSaving] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);


//   const fileInputRef = useRef(null);
//   const navigate = useNavigate();

//   // Fetch Owner Profile
//   const fetchOwner = async () => {
//     setIsLoading(true);
//     try {
//       const res = await apiGet("/owner/profile");
//       const payload = res.data || res.data?.owner || null;
//       setOwner(payload);
//     } catch (e) {
//       console.error(e);
//       setOwner(null);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Fetch Mess Profile
//   const fetchMessProfile = async (id) => {
//     setIsLoading(true);
//     try {
//       const res = await apiGet(`/owner/mess/id/${id}`);
//       if (res?.success) {
//         setMess(res.data);
//       } else {
//         toast.error("Mess not found");
//         setMess(null);
//       }
//     } catch (e) {
//       console.error("Error fetching mess profile:", e);
//       setMess(null);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Upload Image (only owner)
//   const handleFileChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const formData = new FormData();
//     formData.append("image", file);

//     try {
//       setUploading(true);
//       const res = await apiPost("/owner/profile/image", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       if (res?.data?.success) {
//         const newUrl = res.data?.data?.profileImage || res.data?.profileImage;
//         setOwner((prev) => ({
//           ...prev,
//           profileImage: `${newUrl}?t=${Date.now()}`,
//         }));
//       }
//     } catch (err) {
//       console.error("❌ Image upload failed:", err);
//     } finally {
//       setUploading(false);
//     }
//   };

//   // Fetch owner + messes initially
//   useEffect(() => {
//     fetchOwner();
//     (async () => {
//       try {
//         const res = await apiGet("/owner/mess/all");
//         if (res?.success) setMesses(res.data || []);
//       } catch (error) {
//         console.error("Error fetching owner messes:", error);
//       }
//     })();
//   }, []);

//   // Logout
//   const handleLogout = async () => {
//     try {
//       const userJwt = storage.getItem("token");
//       const fcmToken = storage.getItem("fcmToken");
//       await apiPost(
//         "/user/logout",
//         { fcmToken },
//         { headers: { Authorization: `Bearer ${userJwt}` } }
//       );
//     } catch (err) {
//       console.error("❌ Logout API failed:", err);
//     } finally {
//       storage.clear();
//       localStorage.clear();
//       sessionStorage.clear();
//       if (window.Razorpay) delete window.Razorpay;
//       window.location.replace("/login");
//     }
//   };

//   // Select Mess
//   const handleMessSelect = (id) => {
//     setSelectedMessId(id);
//     setActiveProfileType("mess");
//     setShowModal(false);
//     fetchMessProfile(id);
//   };

//   // Back to Owner
//   const switchToOwner = () => {
//     setActiveProfileType("owner");
//     setSelectedMessId(null);
//     setMess(null);
//   };

//   // Edit Profile
//   const openEditModal = () => {
//     setFormData({
//       ownerName: owner?.ownerName || "",
//       contactEmail: owner?.contactEmail || "",
//       contactNumber: owner?.contactNumber || "",
//       gender: owner?.gender || "",
//       ownerAddress: owner?.ownerAddress || "",
//       city: owner?.city || "",
//       state: owner?.state || "",
//       pincode: owner?.pincode || "",
//       dateofbirth: owner?.dateofbirth || "",
//     });
//     setShowEditModal(true);
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleProfileUpdate = async () => {
//     try {
//       setSaving(true);
//       const res = await apiPost("/owner/profile/update", formData);
//       if (res?.data?.success) {
//         setOwner((prev) => ({ ...prev, ...res.data.data }));
//         setShowEditModal(false);
//         toast.success(res.data.message || "Profile updated successfully!");
//       } else {
//         toast.error(res?.data?.message || "Update failed");
//       }
//     } catch (err) {
//       console.error("Update error:", err);
//       toast.error("Something went wrong.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   // Loader
//   if (isLoading) {
//     return (
//       <div className="flex min-h-screen bg-[#F9F4F0]">
//         <Navbar />
//         <div className="w-full mx-auto p-6 text-center text-gray-500">
//           Loading profile...
//         </div>
//       </div>
//     );
//   }

//   // Active Profile
//   const profileData = activeProfileType === "owner" ? owner : mess;

//   if (!profileData) {
//     return (
//       <div className="flex min-h-screen bg-gray-50">
//         <Navbar />
//         <div className="w-full mx-auto p-6 text-center text-red-500">
//           Profile not found
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex h-screen bg-gray-50">
//       <Navbar />
//       <div className="flex-1 md:p-4 pt-16 py-4 px-4 overflow-y-auto">
//         <OwnerHeader />

//         <h2 className="text-2xl font-bold font-poppins text-[#232325D1] mb-4">
//           {activeProfileType === "owner" ? "Owner Profile" : "Mess Profile"}
//         </h2>

//         <div className="bg-white shadow-md rounded-2xl p-6">
//           <div className="w-full flex sm:flex-row items-center gap-6">
//             <div className="relative w-32 h-32">
//               <img
//                 src={
//                   activeProfileType === "owner"
//                     ? profileData.profileImage || "/default-avatar.png"
//                     : profileData.logoUrl || "/default-avatar.png"
//                 }
//                 alt="Profile"
//                 className="w-full h-full rounded-xl object-cover"
//               />
//               {activeProfileType === "owner" && (
//                 <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 hover:opacity-100 rounded-xl cursor-pointer transition">
//                   <span className="text-white text-xs font-semibold px-2 py-1 border border-white rounded">
//                     {uploading ? "Uploading..." : "Edit Image"}
//                   </span>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     ref={fileInputRef}
//                     className="hidden"
//                     onChange={handleFileChange}
//                   />
//                 </label>
//               )}
//             </div>

//             <div>
//               <h2 className="text-2xl font-semibold font-poppins text-[#393939]">
//                 {profileData.ownerName || profileData.messName || "Unnamed"}
//               </h2>
//               <div className="flex items-center gap-3">
//                 <p className="text-gray-500 font-poppins">
//                   {profileData.contactEmail || profileData.email || ""}
//                 </p>
//                 {activeProfileType === "owner" && (
//                   <button
//                     onClick={openEditModal}
//                     className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2 rounded-full shadow-md transition"
//                   >
//                     ✏️ Edit Profile
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Details */}
//           <div className="grid grid-cols-2 gap-4 mt-8 text-lg text-gray-600 font-poppins">
//             <div className="font-medium">Email:</div>
//             <div>{profileData.contactEmail || profileData.email || "N/A"}</div>

//             <div className="font-medium">Contact:</div>
//             <div>{profileData.contactNumber || profileData.phone || "N/A"}</div>

//             <div className="font-medium">Address:</div>
//             <div>{profileData.ownerAddress || profileData.address || "N/A"}</div>

//             <div className="font-medium">City:</div>
//             <div>{profileData.city || "N/A"}</div>

//             <div className="font-medium">State:</div>
//             <div>{profileData.state || "N/A"}</div>

//             <div className="font-medium">Pincode:</div>
//             <div>{profileData.pincode || "N/A"}</div>
//           </div>
//         </div>

//         {/* Buttons */}
//         <div className="grid grid-cols-2 gap-4 mt-8">
//           {activeProfileType === "owner" ? (
//             <button
//               onClick={() => setShowModal(true)}
//               className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-lg shadow-sm"
//             >
//               Switch to Mess Profile ↱
//             </button>
//           ) : (
//             <button
//               onClick={switchToOwner}
//               className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-lg shadow-sm"
//             >
//               Switch to Owner Profile ↩
//             </button>
//           )}

//           <button
//             onClick={handleLogout}
//             className="border border-[#EA4335] text-[#EA4335] text-sm font-bold py-2 rounded-lg"
//           >
//             LOG OUT
//           </button>
//         </div>
//       </div>

//       {/* Mess Modal */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-start justify-center backdrop-blur-sm bg-opacity-40 z-50 pt-20">
//           <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6">
//             <h3 className="text-lg font-semibold mb-4">Select a Mess</h3>
//             {messes.length === 0 ? (
//               <p className="text-gray-500">No messes found.</p>
//             ) : (
//               <ul className="space-y-3 max-h-64 overflow-y-auto">
//                 {messes.map((mess) => (
//                   <li
//                     key={mess._id || mess.messId}
//                     onClick={() => handleMessSelect(mess._id || mess.id || mess.messId)}
//                     className="p-3 border rounded-lg hover:bg-orange-50 cursor-pointer"
//                   >
//                     <div className="font-medium text-gray-800">{mess.messName}</div>
//                     <div className="text-sm text-gray-500">
//                       {mess.city}, {mess.state}
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             )}
//             <div className="flex justify-end mt-6">
//               <button
//                 className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
//                 onClick={() => setShowModal(false)}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Edit Owner Profile Modal */}
//       {showEditModal && (
//         <div className="fixed inset-0 flex items-start justify-center backdrop-blur-sm bg-opacity-40 z-50 pt-20">
//           <div className="bg-white w-full max-w-lg rounded-lg shadow-lg flex flex-col max-h-[80vh]">
//             <h3 className="text-lg font-semibold p-6 pb-2">Edit Profile</h3>
//             <div className="px-6 pb-4 overflow-y-auto flex-1 space-y-3">
//               <input
//                 name="ownerName"
//                 value={formData.ownerName}
//                 onChange={handleEditChange}
//                 placeholder="Name"
//                 className="border p-2 rounded w-full"
//               />
//               <input
//                 type="email"
//                 name="contactEmail"
//                 value={formData.contactEmail}
//                 onChange={handleEditChange}
//                 placeholder="Email"
//                 className="border p-2 rounded w-full"
//               />
//               <input
//                 type="tel"
//                 name="contactNumber"
//                 value={formData.contactNumber}
//                 onChange={handleEditChange}
//                 placeholder="Contact Number"
//                 className="border p-2 rounded w-full"
//               />
//               <select
//                 name="gender"
//                 value={formData.gender}
//                 onChange={handleEditChange}
//                 className="border p-2 rounded w-full"
//               >
//                 <option value="">Select Gender</option>
//                 <option value="male">Male</option>
//                 <option value="female">Female</option>
//               </select>
//               <input
//                 type="date"
//                 name="dateofbirth"
//                 value={formData.dateofbirth}
//                 onChange={handleEditChange}
//                 className="border p-2 rounded w-full"
//               />
//               <input
//                 name="ownerAddress"
//                 value={formData.ownerAddress}
//                 onChange={handleEditChange}
//                 placeholder="Address"
//                 className="border p-2 rounded w-full"
//               />
//               <input
//                 name="city"
//                 value={formData.city}
//                 onChange={handleEditChange}
//                 placeholder="City"
//                 className="border p-2 rounded w-full"
//               />
//               <input
//                 name="state"
//                 value={formData.state}
//                 onChange={handleEditChange}
//                 placeholder="State"
//                 className="border p-2 rounded w-full"
//               />
//               <input
//                 name="pincode"
//                 value={formData.pincode}
//                 onChange={handleEditChange}
//                 placeholder="Pincode"
//                 className="border p-2 rounded w-full"
//               />
//             </div>
//             <div className="flex justify-end gap-3 border-t p-4">
//               <button
//                 onClick={() => setShowEditModal(false)}
//                 className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
//               >
//                 Cancel
//               </button>
//               <button
//                 disabled={saving}
//                 onClick={handleProfileUpdate}
//                 className="px-4 py-2 text-sm bg-orange-500 text-white rounded hover:bg-orange-600"
//               >
//                 {saving ? "Saving..." : "Save Changes"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MessProfile;


import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../layouts/Navbar";
import OwnerHeader from "./ownerHeader";
import { apiGet, apiPost } from "../services/api";
import storage from "../utils/storage";
import toast from "react-hot-toast";

const MessProfile = () => {
  const [owner, setOwner] = useState(null);
  const [mess, setMess] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [messes, setMesses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [activeProfileType, setActiveProfileType] = useState("owner"); // owner | mess
  const [selectedMessId, setSelectedMessId] = useState(null);

  // inline edit states
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Fetch Owner Profile
  const fetchOwner = async () => {
    setIsLoading(true);
    try {
      const res = await apiGet("/owner/profile");
      const payload = res.data || res.data?.owner || null;
      setOwner(payload);
    } catch (e) {
      console.error(e);
      setOwner(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch Mess Profile
  const fetchMessProfile = async (id) => {
    setIsLoading(true);
    try {
      const res = await apiGet(`/owner/mess/id/${id}`);
      if (res?.success) {
        setMess(res.data);
      } else {
        toast.error("Mess not found");
        setMess(null);
      }
    } catch (e) {
      console.error("Error fetching mess profile:", e);
      setMess(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Upload Image (only owner)
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("image", file);

    try {
      setUploading(true);
      const res = await apiPost("/owner/profile/image", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res?.data?.success) {
        const newUrl = res.data?.data?.profileImage || res.data?.profileImage;
        setOwner((prev) => ({
          ...prev,
          profileImage: `${newUrl}?t=${Date.now()}`,
        }));
      }
    } catch (err) {
      console.error("❌ Image upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  // Fetch owner + messes initially
  useEffect(() => {
    fetchOwner();
    (async () => {
      try {
        const res = await apiGet("/owner/mess/all");
        if (res?.success) setMesses(res.data || []);
      } catch (error) {
        console.error("Error fetching owner messes:", error);
      }
    })();
  }, []);

  // Logout
  const handleLogout = async () => {
    try {
      const userJwt = storage.getItem("token");
      const fcmToken = storage.getItem("fcmToken");
      await apiPost(
        "/user/logout",
        { fcmToken },
        { headers: { Authorization: `Bearer ${userJwt}` } }
      );
    } catch (err) {
      console.error("❌ Logout API failed:", err);
    } finally {
      storage.clear();
      localStorage.clear();
      sessionStorage.clear();
      if (window.Razorpay) delete window.Razorpay;
      window.location.replace("/login");
    }
  };

  // Select Mess
  const handleMessSelect = (id) => {
    setSelectedMessId(id);
    setActiveProfileType("mess");
    setShowModal(false);
    setIsEditing(false);
    fetchMessProfile(id);
  };

  // Back to Owner
  const switchToOwner = () => {
    setActiveProfileType("owner");
    setSelectedMessId(null);
    setMess(null);
    setIsEditing(false);
  };

  // Inline edit controls
  const startInlineEdit = () => {
    if (activeProfileType !== "owner") return;
    setFormData({
      ownerName: owner?.ownerName || "",
      contactEmail: owner?.contactEmail || "",
      contactNumber: owner?.contactNumber || "",
      ownerAddress: owner?.ownerAddress || "",
      city: owner?.city || "",
      state: owner?.state || "",
      pincode: owner?.pincode || "",
    });
    setIsEditing(true);
  };

  const cancelInlineEdit = () => setIsEditing(false);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileUpdate = async () => {
    try {
      setSaving(true);
      const res = await apiPost("/owner/profile/update", formData);
      if (res?.data?.success) {
        setOwner((prev) => ({ ...prev, ...res.data.data }));
        setIsEditing(false);
        toast.success(res.data.message || "Profile updated successfully!");
      } else {
        toast.error(res?.data?.message || "Update failed");
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  // Loader
  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-[#F9F4F0]">
        <Navbar />
        <div className="w-full mx-auto p-6 text-center text-gray-500">
          Loading profile...
        </div>
      </div>
    );
  }

  // Active Profile
  const profileData = activeProfileType === "owner" ? owner : mess;

  if (!profileData) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Navbar />
        <div className="w-full mx-auto p-6 text-center text-red-500">
          Profile not found
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Navbar />
      <div className="flex-1 md:p-4 pt-16 py-4 px-4 overflow-y-auto">
        <OwnerHeader />

        <h2 className="text-2xl font-bold font-poppins text-[#232325D1] mb-4">
          {activeProfileType === "owner" ? "Owner Profile" : "Mess Profile"}
        </h2>

        <div className="bg-white shadow-md rounded-2xl p-6">
          {/* Header (responsive + inline name edit) */}
          <div className="w-full flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative w-32 h-32">
              <img
                src={
                  activeProfileType === "owner"
                    ? profileData.profileImage || "/default-avatar.png"
                    : profileData.logoUrl || "/default-avatar.png"
                }
                alt="Profile"
                className="w-full h-full rounded-xl object-cover"
              />
              {activeProfileType === "owner" && (
                <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 hover:opacity-100 rounded-xl cursor-pointer transition">
                  <span className="text-white text-xs font-semibold px-2 py-1 border border-white rounded">
                    {uploading ? "Uploading..." : "Edit Image"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              )}
            </div>

            <div className="flex-1 w-full">
              {isEditing && activeProfileType === "owner" ? (
                <input
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleEditChange}
                  className="w-full sm:w-auto text-2xl font-semibold font-poppins text-[#393939] border rounded-lg px-3 py-2"
                  placeholder="Owner Name"
                />
              ) : (
                <h2 className="text-2xl font-semibold font-poppins text-[#393939] break-words">
                  {profileData.ownerName || profileData.messName || "Unnamed"}
                </h2>
              )}

              <div className="flex flex-wrap items-center gap-3 mt-2">
                <p className="text-gray-500 font-poppins break-all">
                  {profileData.contactEmail || profileData.email || ""}
                </p>

                {activeProfileType === "owner" && !isEditing && (
                  <button
                    onClick={startInlineEdit}
                    className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2 rounded-full shadow-md transition"
                  >
                    ✏️ Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Details (responsive + inline inputs) */}
          <div className="mt-8 text-lg text-gray-600 font-poppins">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Email */}
              <div className="flex flex-col">
                <span className="font-medium">Email:</span>
                {isEditing && activeProfileType === "owner" ? (
                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleEditChange}
                    className="mt-1 border rounded px-3 py-2"
                    placeholder="Email"
                  />
                ) : (
                  <span className="mt-1 break-all">
                    {profileData.contactEmail || profileData.email || "N/A"}
                  </span>
                )}
              </div>

              {/* Contact */}
              <div className="flex flex-col">
                <span className="font-medium">Contact:</span>
                {isEditing && activeProfileType === "owner" ? (
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleEditChange}
                    className="mt-1 border rounded px-3 py-2"
                    placeholder="Contact Number"
                  />
                ) : (
                  <span className="mt-1">
                    {profileData.contactNumber || profileData.phone || "N/A"}
                  </span>
                )}
              </div>

              {/* Address */}
              <div className="flex flex-col">
                <span className="font-medium">Address:</span>
                {isEditing && activeProfileType === "owner" ? (
                  <input
                    name="ownerAddress"
                    value={formData.ownerAddress}
                    onChange={handleEditChange}
                    className="mt-1 border rounded px-3 py-2"
                    placeholder="Address"
                  />
                ) : (
                  <span className="mt-1 break-words">
                    {profileData.ownerAddress || profileData.address || "N/A"}
                  </span>
                )}
              </div>

              {/* City */}
              <div className="flex flex-col">
                <span className="font-medium">City:</span>
                {isEditing && activeProfileType === "owner" ? (
                  <input
                    name="city"
                    value={formData.city}
                    onChange={handleEditChange}
                    className="mt-1 border rounded px-3 py-2"
                    placeholder="City"
                  />
                ) : (
                  <span className="mt-1">{profileData.city || "N/A"}</span>
                )}
              </div>

              {/* State */}
              <div className="flex flex-col">
                <span className="font-medium">State:</span>
                {isEditing && activeProfileType === "owner" ? (
                  <input
                    name="state"
                    value={formData.state}
                    onChange={handleEditChange}
                    className="mt-1 border rounded px-3 py-2"
                    placeholder="State"
                  />
                ) : (
                  <span className="mt-1">{profileData.state || "N/A"}</span>
                )}
              </div>

              {/* Pincode */}
              <div className="flex flex-col">
                <span className="font-medium">Pincode:</span>
                {isEditing && activeProfileType === "owner" ? (
                  <input
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleEditChange}
                    className="mt-1 border rounded px-3 py-2"
                    placeholder="Pincode"
                  />
                ) : (
                  <span className="mt-1">{profileData.pincode || "N/A"}</span>
                )}
              </div>
            </div>

            {/* Save/Cancel */}
            {isEditing && activeProfileType === "owner" && (
              <div className="flex gap-3 mt-6">
                <button
                  onClick={cancelInlineEdit}
                  className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  disabled={saving}
                  onClick={handleProfileUpdate}
                  className="px-4 py-2 text-sm bg-orange-500 text-white rounded hover:bg-orange-600"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          {activeProfileType === "owner" ? (
            <button
              onClick={() => setShowModal(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-lg shadow-sm"
            >
              Switch to Mess Profile ↱
            </button>
          ) : (
            <button
              onClick={switchToOwner}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-lg shadow-sm"
            >
              Switch to Owner Profile ↩
            </button>
          )}

          <button
            onClick={handleLogout}
            className="border border-[#EA4335] text-[#EA4335] text-sm font-bold py-2 rounded-lg"
          >
            LOG OUT
          </button>
        </div>
      </div>

      {/* Mess Select Modal (unchanged) */}
      {showModal && (
        <div className="fixed inset-0 flex items-start justify-center backdrop-blur-sm bg-opacity-40 z-50 pt-20">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Select a Mess</h3>
            {messes.length === 0 ? (
              <p className="text-gray-500">No messes found.</p>
            ) : (
              <ul className="space-y-3 max-h-64 overflow-y-auto">
                {messes.map((m) => (
                  <li
                    key={m._id || m.messId}
                    onClick={() => handleMessSelect(m._id || m.id || m.messId)}
                    className="p-3 border rounded-lg hover:bg-orange-50 cursor-pointer"
                  >
                    <div className="font-medium text-gray-800">{m.messName}</div>
                    <div className="text-sm text-gray-500">
                      {m.city}, {m.state}
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <div className="flex justify-end mt-6">
              <button
                className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default MessProfile;
