// import React, { useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../layouts/Navbar";
// import OwnerHeader from "./ownerHeader";
// import { apiGet, apiPost } from "../services/api";
// import storage from "../utils/storage";
// import toast from "react-hot-toast";
// import { MdLogout } from "react-icons/md";
// const dayShortMap = {
//   Monday: "Mon",
//   Tuesday: "Tue",
//   Wednesday: "Wed",
//   Thursday: "Thu",
//   Friday: "Fri",
//   Saturday: "Sat",
//   Sunday: "Sun",
// };
// const defaultServices = ["dine", "take-away", "delivery"];
// const MessProfile = () => {
//   const [owner, setOwner] = useState(null);
//   const [mess, setMess] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [uploading, setUploading] = useState(false);
//   const [messes, setMesses] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [activeProfileType, setActiveProfileType] = useState("owner"); // owner | mess
//   const [selectedMessId, setSelectedMessId] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({});
//   const [saving, setSaving] = useState(false);
//   const fileInputRef = useRef(null); // owner profile image
//   const messLogoRef = useRef(null); // mess logo file input
//   const messFssaiRef = useRef(null); // fssai doc
//   const messActivationRef = useRef(null); // activation doc
//   const navigate = useNavigate();
//   const fetchOwner = async () => {
//     setIsLoading(true);
//     try {
//       const res = await apiGet("/owner/profile");
//       const payload = res?.data || res?.data?.owner || null;
//       setOwner(payload);
//     } catch (e) {
//       setOwner(null);
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   const fetchMessProfile = async (id) => {
//     if (!id) return;
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
//       setMess(null);
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   const handleFileChange = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const fd = new FormData();
//     fd.append("image", file);

//     try {
//       setUploading(true);
//       const res = await apiPost("/owner/profile/image", fd, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       if (res?.success) {
//         const newUrl = res.data?.data?.profileImage || res.data?.profileImage;
//         setOwner((prev) => ({ ...prev, profileImage: `${newUrl}?t=${Date.now()}` }));

//         const storedHeader = JSON.parse(storage.getItem("ownerHeaderData")) || {};
//         storage.setItem(
//           "ownerHeaderData",
//           JSON.stringify({
//             ...storedHeader,
//             profileImage: `${newUrl}?t=${Date.now()}`,
//           })
//         );
//         toast.success("Profile image updated");
//       } else {
//         toast.error(res?.message || "Image upload failed");
//       }
//     } catch (err) {
//       toast.error("Image upload failed");
//     } finally {
//       setUploading(false);
//     }
//   };
//   useEffect(() => {
//     fetchOwner();
//     (async () => {
//       try {
//         const res = await apiGet("/owner/mess/all");
//         if (res?.success) setMesses(res.data || []);
//       } catch (error) {
//       }
//     })();
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
//     } finally {
//       storage.clear();
//       localStorage.clear();
//       sessionStorage.clear();
//       if (window.Razorpay) delete window.Razorpay;
//       window.location.replace("/login");
//     }
//   };
//   const handleMessSelect = (id) => {
//     setSelectedMessId(id);
//     setActiveProfileType("mess");
//     setShowModal(false);
//     setIsEditing(false);
//     fetchMessProfile(id);
//   };
//   const switchToOwner = () => {
//     setActiveProfileType("owner");
//     setSelectedMessId(null);
//     setMess(null);
//     setIsEditing(false);
//   };
//   const startInlineEdit = () => {
//     if (activeProfileType === "owner") {
//       setFormData({
//         ownerName: owner?.ownerName || "",
//         contactEmail: owner?.contactEmail || "",
//         contactNumber: owner?.contactNumber || "",
//         ownerAddress: owner?.ownerAddress || "",
//         city: owner?.city || "",
//         state: owner?.state || "",
//         pincode: owner?.pincode || "",
//         dateofbirth: owner?.dateofbirth || "",
//         gender: owner?.gender?.toLowerCase?.() || "",
//       });
//       setIsEditing(true);
//     } else if (activeProfileType === "mess" && mess) {
//       setFormData({
//         messName: mess?.messName || "",
//         messType: mess?.messType || "",
//         email: mess?.email || "",
//         contactNumber: mess?.contactNumber || "",
//         alternateContact: mess?.alternateContact || "",
//         address: mess?.address || "",
//         city: mess?.city || "",
//         state: mess?.state || "",
//         pincode: mess?.pincode || "",
//         fssaiLicenseNumber: mess?.fssaiLicenseNumber || "",
//         activationDocType: "", // user can choose a type if uploading doc
//         openTime: mess?.openTime || "",
//         closeTime: mess?.closeTime || "",
//         daysOpen: mess?.daysOpen || [],
//         services: mess?.services || [],
//         // file placeholders will be handled via refs
//       });
//       setIsEditing(true);
//     }
//   };
//   const cancelInlineEdit = () => {
//     setIsEditing(false);
//     setFormData({});
//     if (messLogoRef.current) messLogoRef.current.value = "";
//     if (messFssaiRef.current) messFssaiRef.current.value = "";
//     if (messActivationRef.current) messActivationRef.current.value = "";
//   };
//   const handleEditChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (name === "services") {
//       // value is service name
//       setFormData((prev) => {
//         const arr = prev.services ? [...prev.services] : [];
//         if (checked) {
//           if (!arr.includes(value)) arr.push(value);
//         } else {
//           const idx = arr.indexOf(value);
//           if (idx > -1) arr.splice(idx, 1);
//         }
//         return { ...prev, services: arr };
//       });
//       return;
//     }
//     if (name === "daysOpen") {
//       setFormData((prev) => {
//         const arr = prev.daysOpen ? [...prev.daysOpen] : [];
//         if (checked) {
//           if (!arr.includes(value)) arr.push(value);
//         } else {
//           const idx = arr.indexOf(value);
//           if (idx > -1) arr.splice(idx, 1);
//         }
//         return { ...prev, daysOpen: arr };
//       });
//       return;
//     }
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };
// const handleProfileUpdate = async () => {
//   setSaving(true);

//   try {
//     if (activeProfileType === "owner") {
//       const res = await apiPost("/owner/profile/update", formData);
//       if (res?.success) {
//         setOwner((prev) => ({ ...prev, ...res.data }));
//         setIsEditing(false);
//         toast.success(res.message || "Profile updated successfully!");

//         const storedHeader = JSON.parse(storage.getItem("ownerHeaderData")) || {};
//         const updatedHeader = {
//           ...storedHeader,
//           ownerName: res.data.ownerName || owner?.ownerName,
//           profileImage: res.data.profileImage || owner?.profileImage,
//         };
//         storage.setItem("ownerHeaderData", JSON.stringify(updatedHeader));
//       } else {
//         toast.error(res?.message || "Update failed");
//       }
//     }
//     else if (activeProfileType === "mess") {
//       if (!selectedMessId) {
//         toast.error("No mess selected");
//         setSaving(false);
//         return;
//       }
//       const fd = new FormData();
//       const allowedFields = [
//         "messName",
//         "messType",
//         "email",
//         "contactNumber",
//         "alternateContact",
//         "address",
//         "city",
//         "state",
//         "pincode",
//         "fssaiLicenseNumber",
//         "activationDocType",
//         "openTime",
//         "closeTime",
//       ];
//       const formatTimeForApi = (time) => {
//         if (!time) return "";
//         return time.split(":").slice(0, 2).join(":");
//       };
//       allowedFields.forEach((k) => {
//         let value = formData[k];
//         if (k === "openTime" || k === "closeTime") {
//           value = formatTimeForApi(value);
//         }
//         if (value !== undefined && value !== null && value !== "") {
//           fd.append(k, value);
//         }
//       });
//       if (Array.isArray(formData.daysOpen)) {
//         formData.daysOpen.forEach((day) => fd.append("daysOpen", day));
//       }
//       if (Array.isArray(formData.services)) {
//         formData.services.forEach((s) => fd.append("services", s));
//       }
//       if (formData.logo) {
//         fd.append("logo", formData.logo);
//       }
//       if (messLogoRef.current?.files?.[0]) {
//         fd.append("logo", messLogoRef.current.files[0]);
//       }
//       if (messFssaiRef.current?.files?.[0]) {
//         fd.append("fssaiDoc", messFssaiRef.current.files[0]);
//       }
//       if (messActivationRef.current?.files?.[0]) {
//         fd.append("activationDoc", messActivationRef.current.files[0]);
//       }
//       const res = await apiPost(
//         `/owner/mess/${selectedMessId}/profile/update`,
//         fd,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );
//       if (res?.success) {
//         await fetchMessProfile(selectedMessId);
//         setIsEditing(false);
//         toast.success(res.message || "Mess updated successfully");
//       } else {
//         if (res?.restrictedFields?.length) {
//           toast.error(
//             `Cannot update after activation: ${res.restrictedFields.join(", ")}`
//           );
//         } else {
//           toast.error(res?.message || "Failed to update mess");
//         }
//       }
//     }
//   } catch (err) {
//     console.error(err);
//     toast.error("Something went wrong.");
//   } finally {
//     setSaving(false);
//   }
// };
//   const formatTime12Hour = (time24) => {
//     if (!time24) return "";
//     const [hourStr, minute] = time24.split(":");
//     let hour = parseInt(hourStr, 10);
//     const ampm = hour >= 12 ? "PM" : "AM";
//     hour = hour % 12 || 12;
//     return `${hour}:${minute} ${ampm}`;
//   };
//  if (isLoading) {
//     return (
//       <div className="flex min-h-screen bg-gray-50">
//         <Navbar />
//         <div className="w-full mx-auto p-6 text-center text-gray-500">Loading profile...</div>
//       </div>
//     );
//   }
//  const profileData = activeProfileType === "owner" ? owner : mess;
//  if (!profileData) {
//     return (
//       <div className="flex min-h-screen bg-gray-50">
//         <Navbar />
//         <div className="w-full mx-auto p-6 text-center text-red-500">Profile not found</div>
//       </div>
//     );
//   }
//  return (
//     <div className="flex h-screen ">
//       <Navbar />
//       <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-gray-50 overflow-y-auto">
//         <OwnerHeader />
//         <h2 className="text-2xl font-bold font-poppins text-[#232325D1] mb-4">
//           {activeProfileType === "owner" ? "Owner Profile" : "Mess Profile"}
//         </h2>
//         <div className="bg-white shadow-md rounded-2xl p-6">
//           <div className="w-full flex flex-col sm:flex-row items-start sm:items-center gap-6">
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
//                 <>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     ref={fileInputRef}
//                     className="hidden"
//                     onChange={handleFileChange}
//                   />
//                   <button
//                     onClick={() => fileInputRef.current?.click()}
//                     disabled={uploading}
//                     className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md transition"
//                     title="Edit Image"
//                   >
//                     ✏️
//                   </button>
//                 </>
//               )}
// {activeProfileType === "mess" && selectedMessId && isEditing && (
//                 <>
//                  <input
//   type="file"
//   accept="image/*"
//   ref={messLogoRef}
//   className="hidden"
//   onChange={(e) =>
//     setFormData((prev) => ({
//       ...prev,
//       logo: e.target.files?.[0], // store in state only
//     }))
//   }
// />
//    <button
//                     onClick={() => messLogoRef.current?.click()}
//                     disabled={uploading}
//                     className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md transition"
//                     title="Edit Logo"
//                   >
//                     ✏️
//                   </button>
//                 </>
//               )}
//             </div>
//             <div className="flex-1 w-full">
//               {isEditing && activeProfileType === "owner" ? (
//                 <input
//                   name="ownerName"
//                   value={formData.ownerName}
//                   onChange={handleEditChange}
//                   className="w-full sm:w-auto text-2xl font-semibold font-poppins text-[#393939] border rounded-lg px-3 py-2"
//                   placeholder="Owner Name"
//                 />
//               ) : isEditing && activeProfileType === "mess" ? (
//                 <input
//                   name="messName"
//                   value={formData.messName}
//                   onChange={handleEditChange}
//                   className="w-full sm:w-auto text-2xl font-semibold font-poppins text-[#393939] border rounded-lg px-3 py-2"
//                   placeholder="Mess Name"
//                 />
//               ) : (
//                 <h2 className="text-2xl font-semibold font-poppins text-[#393939] break-words">
//                   {profileData.ownerName || profileData.messName || "Unnamed"}
//                 </h2>
//               )}
//               <div className="flex flex-wrap items-center gap-3 mt-2">
//                 <p className="text-gray-500 font-poppins break-all">
//                   {profileData.contactEmail || profileData.email || ""}
//                 </p>
//                 {activeProfileType === "owner" && !isEditing && (
//                   <button
//                     onClick={startInlineEdit}
//                     className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2 rounded-full shadow-md transition"
//                   >
//                     ✏️ Edit Profile
//                   </button>
//                 )}
//                 {activeProfileType === "mess" && !isEditing && selectedMessId && (
//                   <button
//                     onClick={startInlineEdit}
//                     className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2 rounded-full shadow-md transition"
//                   >
//                     ✏️ Edit Mess Profile
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//           <div className="mt-8 text-lg text-gray-600 font-poppins">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="flex flex-col">
//                 <span className="font-medium">Email:</span>
//                 {isEditing && activeProfileType === "owner" ? (
//                   <input
//                     type="email"
//                     name="contactEmail"
//                     value={formData.contactEmail}
//                     onChange={handleEditChange}
//                     className="mt-1 border rounded px-3 py-2"
//                     placeholder="Email"
//                   />
//                 ) : isEditing && activeProfileType === "mess" ? (
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleEditChange}
//                     className="mt-1 border rounded px-3 py-2"
//                     placeholder="Email"
//                   />
//                 ) : (
//                   <span className="mt-1 break-all">
//                     {profileData.contactEmail || profileData.email || "N/A"}
//                   </span>
//                 )}
//               </div>
//               <div className="flex flex-col">
//                 <span className="font-medium">Contact:</span>
//                 {isEditing && activeProfileType === "owner" ? (
//                   <input
//                     type="tel"
//                     name="contactNumber"
//                     value={formData.contactNumber}
//                     onChange={handleEditChange}
//                     className="mt-1 border rounded px-3 py-2"
//                     placeholder="Contact Number"
//                   />
//                 ) : isEditing && activeProfileType === "mess" ? (
//                   <input
//                     type="tel"
//                     name="contactNumber"
//                     value={formData.contactNumber}
//                     onChange={handleEditChange}
//                     className="mt-1 border rounded px-3 py-2"
//                     placeholder="Contact Number"
//                   />
//                 ) : (
//                   <span className="mt-1">
//                     {profileData.contactNumber || profileData.phone || "N/A"}
//                   </span>
//                 )}
//               </div>
//               <div className="flex flex-col">
//                 <span className="font-medium">Address:</span>
//                 {isEditing && activeProfileType === "owner" ? (
//                   <input
//                     name="ownerAddress"
//                     value={formData.ownerAddress}
//                     onChange={handleEditChange}
//                     className="mt-1 border rounded px-3 py-2"
//                     placeholder="Address"
//                   />
//                 ) : isEditing && activeProfileType === "mess" ? (
//                   <input
//                     name="address"
//                     value={formData.address}
//                     onChange={handleEditChange}
//                     className="mt-1 border rounded px-3 py-2"
//                     placeholder="Address"
//                   />
//                 ) : (
//                   <span className="mt-1 break-words">
//                     {profileData.ownerAddress || profileData.address || "N/A"}
//                   </span>
//                 )}
//               </div>
//               <div className="flex flex-col">
//                 <span className="font-medium">City:</span>
//                 {isEditing && activeProfileType === "owner" ? (
//                   <input
//                     name="city"
//                     value={formData.city}
//                     onChange={handleEditChange}
//                     className="mt-1 border rounded px-3 py-2"
//                     placeholder="City"
//                   />
//                 ) : isEditing && activeProfileType === "mess" ? (
//                   <input
//                     name="city"
//                     value={formData.city}
//                     onChange={handleEditChange}
//                     className="mt-1 border rounded px-3 py-2"
//                     placeholder="City"
//                   />
//                 ) : (
//                   <span className="mt-1">{profileData.city || "N/A"}</span>
//                 )}
//               </div>
//               <div className="flex flex-col">
//                 <span className="font-medium">State:</span>
//                 {isEditing && activeProfileType === "owner" ? (
//                   <input
//                     name="state"
//                     value={formData.state}
//                     onChange={handleEditChange}
//                     className="mt-1 border rounded px-3 py-2"
//                     placeholder="State"
//                   />
//                 ) : isEditing && activeProfileType === "mess" ? (
//                   <input
//                     name="state"
//                     value={formData.state}
//                     onChange={handleEditChange}
//                     className="mt-1 border rounded px-3 py-2"
//                     placeholder="State"
//                   />
//                 ) : (
//                   <span className="mt-1">{profileData.state || "N/A"}</span>
//                 )}
//               </div>
//               <div className="flex flex-col">
//                 <span className="font-medium">Pincode:</span>
//                 {isEditing && activeProfileType === "owner" ? (
//                   <input
//                     name="pincode"
//                     value={formData.pincode}
//                     onChange={handleEditChange}
//                     className="mt-1 border rounded px-3 py-2"
//                     placeholder="Pincode"
//                   />
//                 ) : isEditing && activeProfileType === "mess" ? (
//                   <input
//                     name="pincode"
//                     value={formData.pincode}
//                     onChange={handleEditChange}
//                     className="mt-1 border rounded px-3 py-2"
//                     placeholder="Pincode"
//                   />
//                 ) : (
//                   <span className="mt-1">{profileData.pincode || "N/A"}</span>
//                 )}
//               </div>
//               {activeProfileType === "owner" && (
//                 <div className="flex flex-col">
//                   <span className="font-medium">Date of Birth:</span>
//                   {isEditing ? (
//                     <input
//                       type="date"
//                       name="dateofbirth"
//                       value={formData.dateofbirth || ""}
//                       onChange={handleEditChange}
//                       className="mt-1 border rounded px-3 py-2"
//                     />
//                   ) : (
//                     <span className="mt-1">
//                       {profileData.dateofbirth
//                         ? new Date(profileData.dateofbirth).toLocaleDateString("en-IN", {
//                             year: "numeric",
//                             month: "short",
//                             day: "numeric",
//                           })
//                         : "N/A"}
//                     </span>
//                   )}
//                 </div>
//               )}
//               {activeProfileType === "owner" && (
//                 <div className="flex flex-col">
//                   <span className="font-medium">Gender:</span>
//                   {isEditing ? (
//                     <select
//                       name="gender"
//                       value={formData.gender || ""}
//                       onChange={(e) =>
//                         setFormData((prev) => ({ ...prev, gender: e.target.value.toLowerCase() }))
//                       }
//                       className="mt-1 border rounded px-3 py-2"
//                     >
//                       <option value="">Select gender</option>
//                       <option value="male">Male</option>
//                       <option value="female">Female</option>
//                       <option value="others">Others</option>
//                     </select>
//                   ) : (
//                     <span className="mt-1 capitalize">{profileData.gender || "N/A"}</span>
//                   )}
//                 </div>
//               )}
//               <div className="flex flex-col">
//                 <span className="font-medium">Total Mess Count:</span>
//                 <span className="mt-1">{profileData.messCount ?? "0"}</span>
//               </div>
//             </div>
//             {activeProfileType === "mess" && mess && (
//               <div className="mt-6">
//                 <h3 className="text-base font-semibold mb-3">Mess Details</h3>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {/* Mess Type */}
//                   <div className="flex flex-col">
//                     <span className="font-medium">Mess Type:</span>
//                     {isEditing ? (
//                       <select
//                         name="messType"
//                         value={formData.messType || ""}
//                         onChange={handleEditChange}
//                         className="mt-1 border rounded px-3 py-2"
//                       >
//                         <option value="">Select</option>
//                         <option value="veg">Veg</option>
//                         <option value="non-veg">Non-Veg</option>
//                         <option value="both">Both</option>
//                       </select>
//                     ) : (
//                       <span className="mt-1">{mess.messType || "N/A"}</span>
//                     )}
//                   </div>

//                   {/* Alternate Contact */}
//                   <div className="flex flex-col">
//                     <span className="font-medium">Alternate Contact:</span>
//                     {isEditing ? (
//                       <input
//                         name="alternateContact"
//                         value={formData.alternateContact || ""}
//                         onChange={handleEditChange}
//                         className="mt-1 border rounded px-3 py-2"
//                         placeholder="Alternate Contact"
//                       />
//                     ) : (
//                       <span className="mt-1">{mess.alternateContact || "N/A"}</span>
//                     )}
//                   </div>
// <div className="flex flex-col w-full">
//   <span className="font-medium">FSSAI License Number:</span>
//   {isEditing ? (
//     <input
//       name="fssaiLicenseNumber"
//       value={formData.fssaiLicenseNumber || ""}
//       onChange={handleEditChange}
//       className="mt-1 border rounded px-3 py-2 w-full"
//       placeholder="FSSAI License Number"
//     />
//   ) : (
//     <span className="mt-1 break-words">{mess.fssaiLicenseNumber || "N/A"}</span>
//   )}
//   {isEditing && (
//     <div className="mt-2 w-full">
//       <input
//         type="file"
//         accept="image/*,application/pdf"
//         ref={messFssaiRef}
//         className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100"
//       />
//       <small className="text-gray-500 block mt-1 text-sm break-words">
//         If uploading FSSAI doc, provide license number too.
//       </small>
//     </div>
//   )}
// </div>
// <div className="flex flex-col w-full">
//   <span className="font-medium">Activation Document Type:</span>
//   {isEditing ? (
//     <>
//       <select
//         name="activationDocType"
//         value={formData.activationDocType || ""}
//         onChange={handleEditChange}
//         className="mt-1 border rounded px-3 py-2 w-full"
//       >
//         <option value="">Select</option>
//         <option value="aadhaar">Aadhaar</option>
//         <option value="gst">GST</option>
//         <option value="pan">PAN</option>
//         <option value="electricity_bill">Electricity Bill</option>
//         <option value="business_license">Business License</option>
//         <option value="rent_agreement">Rent Agreement</option>
//       </select>

//       <div className="mt-2 w-full">
//         <input
//           type="file"
//           accept="image/*,application/pdf"
//           ref={messActivationRef}
//           className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100"
//         />
//         <small className="text-gray-500 block mt-1 text-sm break-words">
//           If uploading activation doc, choose type first.
//         </small>
//       </div>
//     </>
//   ) : (
//     <span className="mt-1 break-words">{mess.activationDocType || "N/A"}</span>
//   )}
// </div>
//                   <div className="flex flex-col">
//                     <span className="font-medium">Is FSSAI Verified?</span>
//                     <span className="mt-1">{mess.isVerified ? "Yes" : "No"}</span>
//                   </div>
//                   <div className="flex flex-col">
//                     <span className="font-medium">Status:</span>
//                     <span className="mt-1">{mess.status || "N/A"}</span>
//                   </div>
//                   <div className="flex flex-col">
//                     <span className="font-medium">Days Open:</span>
//                     {isEditing ? (
//                       <div className="mt-1 flex flex-wrap gap-2">
//                         {Object.keys(dayShortMap).map((d) => (
//                           <label key={d} className="inline-flex items-center gap-2 text-sm">
//                             <input
//                               type="checkbox"
//                               name="daysOpen"
//                               value={d}
//                               checked={(formData.daysOpen || []).includes(d)}
//                               onChange={handleEditChange}
//                             />
//                             <span>{dayShortMap[d]}</span>
//                           </label>
//                         ))}
//                       </div>
//                     ) : (
//                       <span className="mt-1">{(mess.daysOpen || []).map((day) => dayShortMap[day] || day).join(", ") || "N/A"}</span>
//                     )}
//                   </div>
//                   <div className="flex flex-col">
//                     <span className="font-medium">Services:</span>
//                     {isEditing ? (
//                       <div className="mt-1 flex flex-wrap gap-2">
//                         {defaultServices.map((s) => (
//                           <label key={s} className="inline-flex items-center gap-2 text-sm">
//                             <input
//                               type="checkbox"
//                               name="services"
//                               value={s}
//                               checked={(formData.services || []).includes(s)}
//                               onChange={handleEditChange}
//                             />
//                             <span className="capitalize">{s.replace("-", " ")}</span>
//                           </label>
//                         ))}
//                       </div>
//                     ) : (
//                       <span className="mt-1">{(mess.services || []).join(", ") || "N/A"}</span>
//                     )}
//                   </div>
//                   <div className="flex flex-col">
//                     <span className="font-medium">KYC Stage:</span>
//                     <span className="mt-1">{mess.kyc_stage || "N/A"}</span>
//                   </div>

//                   <div className="flex flex-col">
//                     <span className="font-medium">Open / Close Time:</span>
//                     <span className="mt-1">
//                       Open: {formatTime12Hour(mess.openTime)} - Close: {formatTime12Hour(mess.closeTime)}
//                     </span>
//                     {isEditing && (
//                       <div className="mt-2 grid grid-cols-2 gap-2">
//                         <input
//                           type="time"
//                           name="openTime"
//                           value={formData.openTime || ""}
//                           onChange={handleEditChange}
//                           className="border rounded px-3 py-2"
//                         />
//                         <input
//                           type="time"
//                           name="closeTime"
//                           value={formData.closeTime || ""}
//                           onChange={handleEditChange}
//                           className="border rounded px-3 py-2"
//                         />
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}
//             {isEditing && (
//               <div className="flex gap-3 mt-6">
//                 <button
//                   onClick={cancelInlineEdit}
//                   className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   disabled={saving}
//                   onClick={handleProfileUpdate}
//                   className="px-4 py-2 text-sm bg-orange-500 text-white rounded hover:bg-orange-600"
//                 >
//                   {saving ? "Saving..." : "Save Changes"}
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//         <div className="grid grid-cols-2 gap-4 mt-8">
//           {activeProfileType === "owner" ? (
//             <button
//               onClick={() => setShowModal(true)}
//               className="bg-white border border-orange-500 hover:bg-orange-100 text-orange-500 font-bold py-2 rounded-lg shadow-sm"
//             >
//               Switch to Mess Profile ↱
//             </button>
//           ) : (
//             <button
//               onClick={switchToOwner}
//               className="bg-white border border-orange-500 hover:bg-orange-100 text-orange-500 font-bold py-2 rounded-lg shadow-sm"
//             >
//               Switch to Owner Profile ↩
//             </button>
//           )}

//           <button
//             onClick={handleLogout}
//             className="flex items-center justify-center gap-2 bg-[#EA4335] hover:bg-[#d9362b] text-white text-sm font-bold py-2 rounded-lg"
//           >
//             <MdLogout size={18} />
//             LOG OUT
//           </button>

//           <button onClick={() => navigate("/delete-account")} className="absolute opacity-0">
//             Delete Account
//           </button>
//         </div>
//       </div>
//       {showModal && (
//         <div className="fixed inset-0 flex items-start justify-center backdrop-blur-sm bg-opacity-40 z-50 pt-20">
//           <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6">
//             <h3 className="text-lg font-semibold mb-4">Select a Mess</h3>
//             {messes.length === 0 ? (
//               <p className="text-gray-500">No messes found.</p>
//             ) : (
//               <ul className="space-y-3 max-h-64 overflow-y-auto">
//                 {messes.map((m) => (
//                   <li
//                     key={m._id || m.messId || m.id}
//                     onClick={() => handleMessSelect(m._id || m.id || m.messId)}
//                     className="p-3 border rounded-lg hover:bg-orange-50 cursor-pointer"
//                   >
//                     <div className="font-medium text-gray-800">{m.messName}</div>
//                     <div className="text-sm text-gray-500">
//                       {m.city}, {m.state}
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             )}
//             <div className="flex justify-end mt-6">
//               <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300" onClick={() => setShowModal(false)}>
//                 Close
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
// import { MdPowerSettingsNew  } from "react-icons/md";

// const dayShortMap = {
//   Monday: "Mon",
//   Tuesday: "Tue",
//   Wednesday: "Wed",
//   Thursday: "Thu",
//   Friday: "Fri",
//   Saturday: "Sat",
//   Sunday: "Sun",
// };
// const defaultServices = ["dine", "take-away", "delivery"];

// const MessProfile = () => {
//   const [owner, setOwner] = useState(null);
//   const [mess, setMess] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [uploading, setUploading] = useState(false);
//   const [messes, setMesses] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [activeProfileType, setActiveProfileType] = useState("owner");
//   const [selectedMessId, setSelectedMessId] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({});
//   const [saving, setSaving] = useState(false);

//   const fileInputRef = useRef(null);
//   const navigate = useNavigate();

//   const fetchOwner = async () => {
//     setIsLoading(true);
//     try {
//       const res = await apiGet("/owner/profile");
//       const payload = res?.data || res?.data?.owner || null;
//       setOwner(payload);
//     } catch {
//       setOwner(null);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchMessProfile = async (id) => {
//     if (!id) return;
//     setIsLoading(true);
//     try {
//       const res = await apiGet(`/owner/mess/id/${id}`);
//       if (res?.success) {
//         setMess(res.data);
//       } else {
//         toast.error("Mess not found");
//         setMess(null);
//       }
//     } catch {
//       setMess(null);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleFileChange = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const fd = new FormData();
//     fd.append("image", file);

//     try {
//       setUploading(true);
//       const res = await apiPost("/owner/profile/image", fd, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       if (res?.success) {
//         const newUrl = res.data?.data?.profileImage || res.data?.profileImage;
//         setOwner((prev) => ({
//           ...prev,
//           profileImage: `${newUrl}?t=${Date.now()}`,
//         }));

//         const storedHeader =
//           JSON.parse(storage.getItem("ownerHeaderData")) || {};
//         storage.setItem(
//           "ownerHeaderData",
//           JSON.stringify({
//             ...storedHeader,
//             profileImage: `${newUrl}?t=${Date.now()}`,
//           })
//         );
//         toast.success("Profile image updated");
//       } else {
//         toast.error(res?.message || "Image upload failed");
//       }
//     } catch {
//       toast.error("Image upload failed");
//     } finally {
//       setUploading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOwner();
//     (async () => {
//       try {
//         const res = await apiGet("/owner/mess/all");
//         if (res?.success) setMesses(res.data || []);
//       } catch {}
//     })();
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
//     } catch {} finally {
//       storage.clear();
//       localStorage.clear();
//       sessionStorage.clear();
//       if (window.Razorpay) delete window.Razorpay;
//       window.location.replace("/login");
//     }
//   };

//   const handleMessSelect = (id) => {
//     setSelectedMessId(id);
//     setActiveProfileType("mess");
//     setShowModal(false);
//     setIsEditing(false);
//     fetchMessProfile(id);
//   };

//   const switchToOwner = () => {
//     setActiveProfileType("owner");
//     setSelectedMessId(null);
//     setMess(null);
//     setIsEditing(false);
//   };

//   // const startInlineEdit = () => {
//   //   if (!owner) return;
//   //   setFormData({
//   //     ownerName: owner?.ownerName || "",
//   //     contactEmail: owner?.contactEmail || "",
//   //     contactNumber: owner?.contactNumber || "",
//   //     ownerAddress: owner?.ownerAddress || "",
//   //     city: owner?.city || "",
//   //     state: owner?.state || "",
//   //     pincode: owner?.pincode || "",
//   //     dateofbirth: owner?.dateofbirth || "",
//   //     gender: owner?.gender?.toLowerCase?.() || "",
//   //   });
//   //   setIsEditing(true);
//   // };
// const startInlineEdit = () => {
//   if (activeProfileType === "owner") {
//     setFormData({
//       ownerName: owner?.ownerName || "",
//       contactEmail: owner?.contactEmail || "",
//       contactNumber: owner?.contactNumber || "",
//       ownerAddress: owner?.ownerAddress || "",
//       city: owner?.city || "",
//       state: owner?.state || "",
//       pincode: owner?.pincode || "",
//       dateofbirth: owner?.dateofbirth || "",
//       gender: owner?.gender?.toLowerCase?.() || "",
//     });
//   } else {
//     // MESS EDIT FIELDS
//     setFormData({
//       openTime: mess?.openTime || "",
//       closeTime: mess?.closeTime || "",
//       daysOpen: mess?.daysOpen || [],
//       services: mess?.services || [],
//     });
//   }

//   setIsEditing(true);
// };


// const handleMessUpdate = async () => {
//   if (!selectedMessId) return;

//   setSaving(true);
//   try {
//     const res = await apiPost(
//       `/owner/mess/update/active/${selectedMessId}`,
//       {
//         openTime: formData.openTime,
//         closeTime: formData.closeTime,
//         daysOpen: formData.daysOpen,
//         services: formData.services,
//       }
//     );

//     if (res?.success) {
//       setMess((prev) => ({ ...prev, ...res.data }));
//       toast.success("Mess profile updated!");
//       setIsEditing(false);
//     } else {
//       toast.error(res?.message || "Update failed");
//     }
//   } catch (e) {
//     toast.error("Something went wrong.");
//   } finally {
//     setSaving(false);
//   }
// };


//   const cancelInlineEdit = () => {
//     setIsEditing(false);
//     setFormData({});
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleProfileUpdate = async () => {
//     setSaving(true);
//     try {
//       const res = await apiPost("/owner/profile/update", formData);
//       if (res?.success) {
//         setOwner((prev) => ({ ...prev, ...res.data }));
//         setIsEditing(false);
//         toast.success(res.message || "Profile updated successfully!");

//         const storedHeader =
//           JSON.parse(storage.getItem("ownerHeaderData")) || {};
//         const updatedHeader = {
//           ...storedHeader,
//           ownerName: res.data.ownerName || owner?.ownerName,
//           profileImage: res.data.profileImage || owner?.profileImage,
//         };
//         storage.setItem("ownerHeaderData", JSON.stringify(updatedHeader));
//       } else {
//         toast.error(res?.message || "Update failed");
//       }
//     } catch {
//       toast.error("Something went wrong.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const formatTime12Hour = (time24) => {
//     if (!time24) return "";
//     const [hourStr, minute] = time24.split(":");
//     let hour = parseInt(hourStr, 10);
//     const ampm = hour >= 12 ? "PM" : "AM";
//     hour = hour % 12 || 12;
//     return `${hour}:${minute} ${ampm}`;
//   };

//   if (isLoading) {
//     return (
//       <div className="flex min-h-screen bg-gray-50">
//         <Navbar />
//         <div className="w-full mx-auto p-6 text-center text-gray-500">
//           Loading profile...
//         </div>
//       </div>
//     );
//   }

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
//     <div className="flex h-screen">
//       <Navbar />
//       <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-gray-50 overflow-y-auto">
//         <OwnerHeader />
//         <h2 className="text-2xl font-bold font-poppins text-[#232325D1] mb-4">
//           {activeProfileType === "owner" ? "Owner Profile" : "Mess Profile"}
//         </h2>

//         {/* Profile Card */}
//         <div className="bg-white shadow-md rounded-2xl p-6">
//           <div className="w-full flex flex-col sm:flex-row items-start sm:items-center gap-6">
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
//                 <>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     ref={fileInputRef}
//                     className="hidden"
//                     onChange={handleFileChange}
//                   />
//                   <button
//                     onClick={() => fileInputRef.current?.click()}
//                     disabled={uploading}
//                     // className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md transition"
//           className="absolute bottom-0  right-0 z-20 bg-white text-xs md:text-sm font-medium px-1.5 py-1.5 rounded-full shadow hover:bg-orange-200 cursor-pointer transition-all duration-200"

//                     title="Edit Image"
//                   >
//                     ✏️
//                   </button>
//                 </>
//               )}
//             </div>

//             <div className="flex-1 w-full">
//               {isEditing && activeProfileType === "owner" ? (
//                 <input
//                   name="ownerName"
//                   value={formData.ownerName}
//                   onChange={handleEditChange}
//                   className="w-full sm:w-auto text-2xl font-semibold border rounded-lg px-3 py-2"
//                   placeholder="Owner Name"
//                 />
//               ) : (
//                 <h2 className="text-2xl font-semibold break-words">
// {activeProfileType === "owner"
//   ? profileData.ownerName
//   : profileData.messName}
//                 </h2>
//               )}

//               <div className="flex flex-wrap items-center gap-3 mt-2">
//                 {/* <p className="text-gray-500 break-all">
//                   {profileData.contactEmail || profileData.email || ""}
//                 </p> */}

//                 {activeProfileType === "owner" && !isEditing && (
//                   <button
//                     onClick={startInlineEdit}
//                     className="bg-orange-500 hover:bg-orange-600 cursor-pointer text-white text-sm font-semibold px-5 py-2 rounded-full shadow-md transition"
//                   >
//                     ✏️ Edit Profile
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Info Section */}
//           <div className="mt-8 text-lg text-gray-600">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {/* Shared Fields */}
//               <div className="flex flex-col">
//                 <span className="font-medium">Email:</span>
//                 {isEditing && activeProfileType === "owner" ? (
//                   <input
//                     type="email"
//                     name="contactEmail"
//                     value={formData.contactEmail}
//                     onChange={handleEditChange}
//                     className="mt-1 border rounded px-3 py-2"
//                   />
//                 ) : (
//                   <span className="mt-1 break-all">
//                     {profileData.contactEmail || profileData.email || "N/A"}
//                   </span>
//                 )}
//               </div>

//               <div className="flex flex-col">
//                 <span className="font-medium">Contact:</span>
//                 {isEditing && activeProfileType === "owner" ? (
//                   <input
//                     type="tel"
//                     name="contactNumber"
//                     value={formData.contactNumber}
//                     onChange={handleEditChange}
//                     className="mt-1 border rounded px-3 py-2"
//                   />
//                 ) : (
//                   <span className="mt-1">
//                     {profileData.contactNumber || "N/A"}
//                   </span>
//                 )}
//               </div>

//               <div className="flex flex-col">
//                 <span className="font-medium">Address:</span>
//                 {isEditing && activeProfileType === "owner" ? (
//                   <input
//                     name="ownerAddress"
//                     value={formData.ownerAddress}
//                     onChange={handleEditChange}
//                     className="mt-1 border rounded px-3 py-2"
//                   />
//                 ) : (
//                   <span className="mt-1 break-words">
//                     {profileData.ownerAddress || profileData.address || "N/A"}
//                   </span>
//                 )}
//               </div>

//               <div className="flex flex-col">
//                 <span className="font-medium">City:</span>
//                 {isEditing && activeProfileType === "owner" ? (
//                   <input
//                     name="city"
//                     value={formData.city}
//                     onChange={handleEditChange}
//                     className="mt-1 border rounded px-3 py-2"
//                   />
//                 ) : (
//                   <span className="mt-1">{profileData.city || "N/A"}</span>
//                 )}
//               </div>

//               <div className="flex flex-col">
//                 <span className="font-medium">State:</span>
//                 {isEditing && activeProfileType === "owner" ? (
//                   <input
//                     name="state"
//                     value={formData.state}
//                     onChange={handleEditChange}
//                     className="mt-1 border rounded px-3 py-2"
//                   />
//                 ) : (
//                   <span className="mt-1">{profileData.state || "N/A"}</span>
//                 )}
//               </div>

//               <div className="flex flex-col">
//                 <span className="font-medium">Pincode:</span>
//                 {isEditing && activeProfileType === "owner" ? (
//                   <input
//                     name="pincode"
//                     value={formData.pincode}
//                     onChange={handleEditChange}
//                     className="mt-1 border rounded px-3 py-2"
//                   />
//                 ) : (
//                   <span className="mt-1">{profileData.pincode || "N/A"}</span>
//                 )}
//               </div>

//               {/* Owner-only extra fields */}
//               {activeProfileType === "owner" && (
//                 <>
//                   <div className="flex flex-col">
//                     <span className="font-medium">Date of Birth:</span>
//                     {isEditing ? (
//                       <input
//                         type="date"
//                         name="dateofbirth"
//                         value={formData.dateofbirth || ""}
//                         onChange={handleEditChange}
//                         className="mt-1 border rounded px-3 py-2"
//                       />
//                     ) : (
//                       <span className="mt-1">
//                         {profileData.dateofbirth
//                           ? new Date(
//                               profileData.dateofbirth
//                             ).toLocaleDateString("en-IN", {
//                               year: "numeric",
//                               month: "short",
//                               day: "numeric",
//                             })
//                           : "N/A"}
//                       </span>
//                     )}
//                   </div>

//                   <div className="flex flex-col">
//                     <span className="font-medium">Gender:</span>
//                     {isEditing ? (
//                       <select
//                         name="gender"
//                         value={formData.gender || ""}
//                         onChange={(e) =>
//                           setFormData((prev) => ({
//                             ...prev,
//                             gender: e.target.value.toLowerCase(),
//                           }))
//                         }
//                         className="mt-1 border rounded px-3 py-2"
//                       >
//                         <option value="">Select gender</option>
//                         <option value="male">Male</option>
//                         <option value="female">Female</option>
//                         <option value="others">Others</option>
//                       </select>
//                     ) : (
//                       <span className="mt-1 capitalize">
//                         {profileData.gender || "N/A"}
//                       </span>
//                     )}
//                   </div>

//                   <div className="flex flex-col">
//                     <span className="font-medium">Total Mess Count:</span>
//                     <span className="mt-1">{profileData.messCount ?? "0"}</span>
//                   </div>
//                 </>
//               )}
//             </div>

//             {/* Mess Details (view only) */}
//             {/* {activeProfileType === "mess" && mess && (
//               <div className="mt-6">
//                 <h3 className="text-base font-semibold mb-3">Mess Details</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <p><b>Mess Type:</b> {mess.messType || "N/A"}</p>
//                   <p><b>Alternate Contact:</b> {mess.alternateContact || "N/A"}</p>
//                   <p><b>FSSAI License Number:</b> {mess.fssaiLicenseNumber || "N/A"}</p>
//                   <p><b>Activation Doc Type:</b> {mess.activationDocType || "N/A"}</p>
//                   <p><b>Is FSSAI Verified:</b> {mess.isVerified ? "Yes" : "No"}</p>
//                   <p><b>Status:</b> {mess.status || "N/A"}</p>
//                   <p>
//                     <b>Days Open:</b>{" "}
//                     {(mess.daysOpen || [])
//                       .map((day) => dayShortMap[day] || day)
//                       .join(", ") || "N/A"}
//                   </p>
//                   <p>
//                     <b>Services:</b>{" "}
//                     {(mess.services || []).join(", ") || "N/A"}
//                   </p>
//                   <p><b>KYC Stage:</b> {mess.kyc_stage || "N/A"}</p>
//                   <p>
//                     <b>Open / Close Time:</b>{" "}
//                     {formatTime12Hour(mess.openTime)} -{" "}
//                     {formatTime12Hour(mess.closeTime)}
//                   </p>
//                 </div>
//               </div>
//             )} */}
//             {activeProfileType === "mess" && mess && (
//   <div className="mt-6">
//     <h3 className="text-base font-semibold mb-3">Mess Details</h3>

//     {/* Editable fields */}
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//       {/* openTime */}
//       <div>
//         <b>Open Time:</b>
//         {isEditing ? (
//           <input
//             type="time"
//             name="openTime"
//             value={formData.openTime}
//             onChange={handleEditChange}
//             className="border rounded px-3 py-2 mt-1"
//           />
//         ) : (
//           <p>{formatTime12Hour(mess.openTime)}</p>
//         )}
//       </div>

//       {/* closeTime */}
//       <div>
//         <b>Close Time:</b>
//         {isEditing ? (
//           <input
//             type="time"
//             name="closeTime"
//             value={formData.closeTime}
//             onChange={handleEditChange}
//             className="border rounded px-3 py-2 mt-1"
//           />
//         ) : (
//           <p>{formatTime12Hour(mess.closeTime)}</p>
//         )}
//       </div>

//       {/* daysOpen */}
//       <div className="col-span-2">
//         <b>Days Open:</b>
//         {isEditing ? (
//           <div className="flex flex-wrap gap-3 mt-2">
//             {["mon","tue","wed","thu","fri","sat","sun"].map((d) => (
//               <label key={d} className="flex items-center gap-2">
//                 <input
//                   type="checkbox"
//                   checked={formData.daysOpen.includes(d)}
//                   onChange={() => {
//                     setFormData((prev) => ({
//                       ...prev,
//                       daysOpen: prev.daysOpen.includes(d)
//                         ? prev.daysOpen.filter(x => x !== d)
//                         : [...prev.daysOpen, d]
//                     }))
//                   }}
//                 />
//                 {d.toUpperCase()}
//               </label>
//             ))}
//           </div>
//         ) : (
//           <p>{mess.daysOpen.join(", ").toUpperCase()}</p>
//         )}
//       </div>

//       {/* services */}
//       <div className="col-span-2">
//         <b>Services:</b>
//         {isEditing ? (
//           <div className="flex flex-wrap gap-3 mt-2">
//             {["dine","take-away","delivery"].map((s) => (
//               <label key={s} className="flex items-center gap-2">
//                 <input
//                   type="checkbox"
//                   checked={formData.services.includes(s)}
//                   onChange={() => {
//                     setFormData((prev) => ({
//                       ...prev,
//                       services: prev.services.includes(s)
//                         ? prev.services.filter(x => x !== s)
//                         : [...prev.services, s]
//                     }))
//                   }}
//                 />
//                 {s.toUpperCase()}
//               </label>
//             ))}
//           </div>
//         ) : (
//           <p>{mess.services.join(", ")}</p>
//         )}
//       </div>

//     </div>
//   </div>
// )}


//             {isEditing && (
//               <div className="flex gap-3 mt-6">
//                 <button
//                   onClick={cancelInlineEdit}
//                   className="px-4 py-2 text-sm cursor-pointer bg-gray-200 rounded hover:bg-gray-300"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   disabled={saving}
//                   // onClick={handleProfileUpdate}
//   onClick={
//     activeProfileType === "owner"
//       ? handleProfileUpdate
//       : handleMessUpdate
//   }

//                   className="px-4 py-2 text-sm cursor-pointer bg-orange-500 text-white rounded hover:bg-orange-600"
//                 >
//                   {saving ? "Saving..." : "Save Changes"}
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Buttons */}
//         <div className="grid grid-cols-2 gap-4 mt-8">
//           {activeProfileType === "owner" ? (
//             <button
//               onClick={() => setShowModal(true)}
//               className="bg-white border border-orange-500 cursor-pointer hover:bg-orange-100 text-orange-500 font-bold py-2 rounded-lg shadow-sm"
//             >
//               Switch to Mess Profile ↱
//             </button>
//           ) : (
//             <button
//               onClick={switchToOwner}
//               className="bg-white border border-orange-500 cursor-pointer hover:bg-orange-100 text-orange-500 font-bold py-2 rounded-lg shadow-sm"
//             >
//               Switch to Owner Profile ↩
//             </button>
//           )}

//           <button
//             onClick={handleLogout}
//             className="flex items-center justify-center gap-2 cursor-pointer bg-[#EA4335] hover:bg-[#d9362b] text-white text-sm font-bold py-2 rounded-lg"
//           >
//             <MdPowerSettingsNew  size={18} />
//             LOG OUT
//           </button>
//         </div>
//       </div>

//       {/* Mess Selection Modal */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-start justify-center backdrop-blur-sm bg-opacity-40 z-50 pt-20">
//           <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6">
//             <h3 className="text-lg font-semibold mb-4">Select a Mess</h3>
//             {messes.length === 0 ? (
//               <p className="text-gray-500">No messes found.</p>
//             ) : (
//               <ul className="space-y-3 max-h-64 overflow-y-auto">
//                 {messes.map((m) => (
//                   <li
//                     key={m._id || m.messId || m.id}
//                     onClick={() =>
//                       handleMessSelect(m._id || m.id || m.messId)
//                     }
//                     className="p-3 border rounded-lg hover:bg-orange-50 cursor-pointer"
//                   >
//                     <div className="font-medium text-gray-800">
//                       {m.messName}
//                     </div>
//                     <div className="text-sm text-gray-500">
//                       {m.city}, {m.state}
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             )}
//             <div className="flex justify-end mt-6">
//               <button
//                 className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
//                 onClick={() => setShowModal(false)}
//               >
//                 Close
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
import { MdPowerSettingsNew } from "react-icons/md";

/**
 * Final MessProfile component
 *
 * - All mess fields are shown in view mode (restored from old file).
 * - Mess editing is allowed ONLY for: openTime, closeTime, daysOpen, services.
 * - Mess edit button shows only when mess?.isActive === true && mess?.status === "active".
 * - Owner editing remains the same as before.
 */

/* Mapping helpers */
const dayShortMap = {
  Monday: "Mon",
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
  Friday: "Fri",
  Saturday: "Sat",
  Sunday: "Sun",
};

const fullToShortLower = (full) => {
  if (!full) return "";
  const map = {
    Monday: "mon",
    Tuesday: "tue",
    Wednesday: "wed",
    Thursday: "thu",
    Friday: "fri",
    Saturday: "sat",
    Sunday: "sun",
  };
  return map[full] || full.toLowerCase();
};

const shortToFull = (short) => {
  const map = {
    mon: "Monday",
    tue: "Tuesday",
    wed: "Wednesday",
    thu: "Thursday",
    fri: "Friday",
    sat: "Saturday",
    sun: "Sunday",
  };
  return map[short] || short;
};

const availableDaysShort = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const availableServices = ["dine", "take-away", "delivery"];

const formatTime12Hour = (time24) => {
  if (!time24) return "";
  const [hourStr, minute] = time24.split(":");
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour}:${minute} ${ampm}`;
};

const MessProfile = () => {
  const [owner, setOwner] = useState(null);
  const [mess, setMess] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [messes, setMesses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [activeProfileType, setActiveProfileType] = useState("owner");
  const [selectedMessId, setSelectedMessId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  /* Fetch owner */
  const fetchOwner = async () => {
    setIsLoading(true);
    try {
      const res = await apiGet("/owner/profile");
      const payload = res?.data || res?.data?.owner || null;
      setOwner(payload);
    } catch {
      setOwner(null);
    } finally {
      setIsLoading(false);
    }
  };

  /* Fetch a mess by id */
  const fetchMessProfile = async (id) => {
    if (!id) return;
    setIsLoading(true);
    try {
      const res = await apiGet(`/owner/mess/id/${id}`);
      if (res?.success) {
        setMess(res.data);
      } else {
        toast.error("Mess not found");
        setMess(null);
      }
    } catch {
      setMess(null);
    } finally {
      setIsLoading(false);
    }
  };

  /* Image upload for owner header (unchanged) */
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("image", file);
    try {
      setUploading(true);
      const res = await apiPost("/owner/profile/image", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res?.success) {
        const newUrl = res.data?.data?.profileImage || res.data?.profileImage;
        setOwner((prev) => ({
          ...prev,
          profileImage: `${newUrl}?t=${Date.now()}`,
        }));
        const storedHeader = JSON.parse(storage.getItem("ownerHeaderData")) || {};
        storage.setItem(
          "ownerHeaderData",
          JSON.stringify({
            ...storedHeader,
            profileImage: `${newUrl}?t=${Date.now()}`,
          })
        );
        toast.success("Profile image updated");
      } else {
        toast.error(res?.message || "Image upload failed");
      }
    } catch {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    fetchOwner();
    (async () => {
      try {
        const res = await apiGet("/owner/mess/all");
        if (res?.success) setMesses(res.data || []);
      } catch {}
    })();
  }, []);

  const handleLogout = async () => {
    try {
      const userJwt = storage.getItem("token");
      const fcmToken = storage.getItem("fcmToken");
      await apiPost("/user/logout", { fcmToken }, { headers: { Authorization: `Bearer ${userJwt}` } });
    } catch {} finally {
      storage.clear();
      localStorage.clear();
      sessionStorage.clear();
      if (window.Razorpay) delete window.Razorpay;
      window.location.replace("/login");
    }
  };

  const handleMessSelect = (id) => {
    setSelectedMessId(id);
    setActiveProfileType("mess");
    setShowModal(false);
    setIsEditing(false);
    setFormData({});
    fetchMessProfile(id);
  };

  const switchToOwner = () => {
    setActiveProfileType("owner");
    setSelectedMessId(null);
    setMess(null);
    setIsEditing(false);
    setFormData({});
  };

  /* Start inline edit — sets formData depending on profile type.
     For mess, we prefill only the editable fields (openTime, closeTime, daysOpen, services).
     daysOpen in formData will be short lowercase strings like ["mon","tue"] (as API expects). */
  const startInlineEdit = () => {
    if (activeProfileType === "owner") {
      if (!owner) return;
      setFormData({
        ownerName: owner?.ownerName || "",
        contactEmail: owner?.contactEmail || "",
        contactNumber: owner?.contactNumber || "",
        ownerAddress: owner?.ownerAddress || "",
        city: owner?.city || "",
        state: owner?.state || "",
        pincode: owner?.pincode || "",
        dateofbirth: owner?.dateofbirth || "",
        gender: owner?.gender?.toLowerCase?.() || "",
      });
    } else {
      if (!mess) return;
      // convert full day names (if present) to short lowercase form expected by API
      const days =
        (mess.daysOpen || []).map((d) =>
          // if mess.daysOpen contains full names like "Monday"
          (typeof d === "string" && d.length > 3 ? fullToShortLower(d) : String(d).toLowerCase())
        );
      setFormData({
        openTime: mess?.openTime || "",
        closeTime: mess?.closeTime || "",
        daysOpen: Array.isArray(days) ? days : [],
        services: Array.isArray(mess?.services) ? mess.services : [],
      });
    }
    setIsEditing(true);
  };

  const cancelInlineEdit = () => {
    setIsEditing(false);
    setFormData({});
  };

  /* Generic input change for owner fields and for time inputs.
     For days/services (checkboxes) we use toggle helpers below. */
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleDay = (shortDay) => {
    setFormData((prev) => {
      const existing = Array.isArray(prev.daysOpen) ? [...prev.daysOpen] : [];
      if (existing.includes(shortDay)) {
        return { ...prev, daysOpen: existing.filter((d) => d !== shortDay) };
      } else {
        return { ...prev, daysOpen: [...existing, shortDay] };
      }
    });
  };

  const toggleService = (service) => {
    setFormData((prev) => {
      const existing = Array.isArray(prev.services) ? [...prev.services] : [];
      if (existing.includes(service)) {
        return { ...prev, services: existing.filter((s) => s !== service) };
      } else {
        return { ...prev, services: [...existing, service] };
      }
    });
  };

  /* Owner profile update (unchanged) */
  const handleProfileUpdate = async () => {
    setSaving(true);
    try {
      const res = await apiPost("/owner/profile/update", formData);
      if (res?.success) {
        setOwner((prev) => ({ ...prev, ...res.data }));
        setIsEditing(false);
        toast.success(res.message || "Profile updated successfully!");
        const storedHeader = JSON.parse(storage.getItem("ownerHeaderData")) || {};
        const updatedHeader = {
          ...storedHeader,
          ownerName: res.data.ownerName || owner?.ownerName,
          profileImage: res.data.profileImage || owner?.profileImage,
        };
        storage.setItem("ownerHeaderData", JSON.stringify(updatedHeader));
      } else {
        toast.error(res?.message || "Update failed");
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  /* Mess update — must send only allowed fields, per docs */
  const handleMessUpdate = async () => {
    if (!selectedMessId) return;
    // Basic validation: ensure required fields present and mess is active
    if (!mess?.isActive || mess?.status !== "active") {
      toast.error("Cannot update: Mess is not active.");
      return;
    }

    // Ensure formData.daysOpen is array of lowercase short day strings
    const days = (formData.daysOpen || []).map((d) => String(d).toLowerCase());
    const payload = {
      openTime: formData.openTime || "",
      closeTime: formData.closeTime || "",
      daysOpen: days,
      services: Array.isArray(formData.services) ? formData.services : [],
    };

    setSaving(true);
    try {
      const res = await apiPost(`/owner/mess/update/active/${selectedMessId}`, payload);
      if (res?.success) {
        // API returns updated mess in res.data per docs — merge it (safely)
        setMess((prev) => ({ ...prev, ...res.data }));
        toast.success(res.message || "Active Mess Profile updated successfully.");
        setIsEditing(false);
        setFormData({});
      } else {
        toast.error(res?.message || "Update failed");
      }
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Navbar />
        <div className="w-full mx-auto p-6 text-center text-gray-500">Loading profile...</div>
      </div>
    );
  }

  const profileData = activeProfileType === "owner" ? owner : mess;

  if (!profileData) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Navbar />
        <div className="w-full mx-auto p-6 text-center text-red-500">Profile not found</div>
      </div>
    );
  }

  console.log("MESS DATA => ", mess);
console.log("isActive => ", mess?.isActive);
console.log("status => ", mess?.status);


  return (
    <div className="flex h-screen">
      <Navbar />
      <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-gray-50 overflow-y-auto">
        <OwnerHeader />
        <h2 className="text-2xl font-bold font-poppins text-[#232325D1] mb-4">
          {activeProfileType === "owner" ? "Owner Profile" : "Mess Profile"}
        </h2>

        {/* Profile Card */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          <div className="w-full flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative w-32 h-32">
              <img
                src={activeProfileType === "owner" ? profileData.profileImage || "/default-avatar.png" : profileData.logoUrl || "/default-avatar.png"}
                alt="Profile"
                className="w-full h-full rounded-xl object-cover"
              />
              {/* Owner can update image */}
              {activeProfileType === "owner" && (
                <>
                  <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="absolute bottom-0 right-0 z-20 bg-white text-xs md:text-sm font-medium px-1.5 py-1.5 rounded-full shadow hover:bg-orange-200 cursor-pointer transition-all duration-200"
                    title="Edit Image"
                  >
                    ✏️
                  </button>
                </>
              )}
            </div>

            <div className="flex-1 w-full">
              {isEditing && activeProfileType === "owner" ? (
                <input name="ownerName" value={formData.ownerName} onChange={handleEditChange} className="w-full sm:w-auto text-2xl font-semibold border rounded-lg px-3 py-2" placeholder="Owner Name" />
              ) : (
                <h2 className="text-2xl font-semibold break-words">{activeProfileType === "owner" ? profileData.ownerName : profileData.messName}</h2>
              )}

              <div className="flex flex-wrap items-center gap-3 mt-2">
                {/* contact email shown for both */}
                <p className="text-gray-500 break-all">{profileData.contactEmail || profileData.email || ""}</p>

                {/* Owner edit button */}
                {activeProfileType === "owner" && !isEditing && (
                  <button onClick={startInlineEdit} className="bg-orange-500 hover:bg-orange-600 cursor-pointer text-white text-sm font-semibold px-5 py-2 rounded-full shadow-md transition">
                    ✏️ Edit Profile
                  </button>
                )}

                {/* Mess edit button - only when mess is active & status === "active" */}
                {activeProfileType === "mess" && mess?.isActive === true && mess?.status === "active" && !isEditing && (
                  <button onClick={startInlineEdit} className="bg-orange-500 hover:bg-orange-600 cursor-pointer text-white text-sm font-semibold px-5 py-2 rounded-full shadow-md transition">
                    ✏️ Edit Mess
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="mt-8 text-lg text-gray-600">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Shared / Owner fields */}
              <div className="flex flex-col">
                <span className="font-medium">Email:</span>
                {isEditing && activeProfileType === "owner" ? (
                  <input type="email" name="contactEmail" value={formData.contactEmail} onChange={handleEditChange} className="mt-1 border rounded px-3 py-2" />
                ) : (
                  <span className="mt-1 break-all">{profileData.contactEmail || profileData.email || "N/A"}</span>
                )}
              </div>

              <div className="flex flex-col">
                <span className="font-medium">Contact:</span>
                {isEditing && activeProfileType === "owner" ? (
                  <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleEditChange} className="mt-1 border rounded px-3 py-2" />
                ) : (
                  <span className="mt-1">{profileData.contactNumber || "N/A"}</span>
                )}
              </div>

              <div className="flex flex-col">
                <span className="font-medium">Address:</span>
                {isEditing && activeProfileType === "owner" ? (
                  <input name="ownerAddress" value={formData.ownerAddress} onChange={handleEditChange} className="mt-1 border rounded px-3 py-2" />
                ) : (
                  <span className="mt-1 break-words">{profileData.ownerAddress || profileData.address || "N/A"}</span>
                )}
              </div>

              <div className="flex flex-col">
                <span className="font-medium">City:</span>
                {isEditing && activeProfileType === "owner" ? (
                  <input name="city" value={formData.city} onChange={handleEditChange} className="mt-1 border rounded px-3 py-2" />
                ) : (
                  <span className="mt-1">{profileData.city || "N/A"}</span>
                )}
              </div>

              <div className="flex flex-col">
                <span className="font-medium">State:</span>
                {isEditing && activeProfileType === "owner" ? (
                  <input name="state" value={formData.state} onChange={handleEditChange} className="mt-1 border rounded px-3 py-2" />
                ) : (
                  <span className="mt-1">{profileData.state || "N/A"}</span>
                )}
              </div>

              <div className="flex flex-col">
                <span className="font-medium">Pincode:</span>
                {isEditing && activeProfileType === "owner" ? (
                  <input name="pincode" value={formData.pincode} onChange={handleEditChange} className="mt-1 border rounded px-3 py-2" />
                ) : (
                  <span className="mt-1">{profileData.pincode || "N/A"}</span>
                )}
              </div>

              {/* Owner-only extra fields */}
              {activeProfileType === "owner" && (
                <>
                  <div className="flex flex-col">
                    <span className="font-medium">Date of Birth:</span>
                    {isEditing ? (
                      <input type="date" name="dateofbirth" value={formData.dateofbirth || ""} onChange={handleEditChange} className="mt-1 border rounded px-3 py-2" />
                    ) : (
                      <span className="mt-1">
                        {profileData.dateofbirth
                          ? new Date(profileData.dateofbirth).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })
                          : "N/A"}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <span className="font-medium">Gender:</span>
                    {isEditing ? (
                      <select
                        name="gender"
                        value={formData.gender || ""}
                        onChange={(e) => setFormData((prev) => ({ ...prev, gender: e.target.value.toLowerCase() }))}
                        className="mt-1 border rounded px-3 py-2"
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="others">Others</option>
                      </select>
                    ) : (
                      <span className="mt-1 capitalize">{profileData.gender || "N/A"}</span>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <span className="font-medium">Total Mess Count:</span>
                    <span className="mt-1">{profileData.messCount ?? "0"}</span>
                  </div>
                </>
              )}
            </div>

            {/* Mess Details (view-only fields restored + editable limited fields) */}
            {activeProfileType === "mess" && mess && (
              <div className="mt-6">
                <h3 className="text-base font-semibold mb-3">Mess Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Many view-only fields preserved */}
                  <p><b>Mess Name:</b> {mess.messName || "N/A"}</p>
                  <p><b>Mess Type:</b> {mess.messType || "N/A"}</p>
                  <p><b>Alternate Contact:</b> {mess.alternateContact || "N/A"}</p>
                  <p><b>FSSAI License Number:</b> {mess.fssaiLicenseNumber || "N/A"}</p>
                  <p><b>Activation Doc Type:</b> {mess.activationDocType || "N/A"}</p>
                  <p><b>Is FSSAI Verified:</b> {mess.isVerified ? "Yes" : "No"}</p>
                  <p><b>Status:</b> {mess.status || "N/A"}</p>
                  <p><b>KYC Stage:</b> {mess.kyc_stage || "N/A"}</p>

                  {/* Days Open (view or edit limited) */}
                  <div>
                    <b>Days Open:</b>
                    {!isEditing ? (
                      <p className="mt-1">
                        {(Array.isArray(mess.daysOpen) ? mess.daysOpen.map((d) => (d.length > 3 ? dayShortMap[d] || d : d.toUpperCase())).join(", ") : "N/A")}
                      </p>
                    ) : (
                      <div className="flex flex-wrap gap-3 mt-2">
                        {availableDaysShort.map((d) => (
                          <label key={d} className="flex items-center gap-2">
                            <input type="checkbox" checked={(formData.daysOpen || []).includes(d)} onChange={() => toggleDay(d)} />
                            <span className="text-sm">{d.toUpperCase()}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Services (view or edit limited) */}
                  <div>
                    <b>Services:</b>
                    {!isEditing ? (
                      <p className="mt-1">{(mess.services || []).join(", ") || "N/A"}</p>
                    ) : (
                      <div className="flex flex-wrap gap-3 mt-2">
                        {availableServices.map((s) => (
                          <label key={s} className="flex items-center gap-2">
                            <input type="checkbox" checked={(formData.services || []).includes(s)} onChange={() => toggleService(s)} />
                            <span className="text-sm">{s.toUpperCase()}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Open / Close Time (editable) */}
                  <div>
                    <b>Open Time:</b>
                    {!isEditing ? <p className="mt-1">{formatTime12Hour(mess.openTime)}</p> : <input type="time" name="openTime" value={formData.openTime || ""} onChange={handleEditChange} className="mt-1 border rounded px-3 py-2" />}
                  </div>

                  <div>
                    <b>Close Time:</b>
                    {!isEditing ? <p className="mt-1">{formatTime12Hour(mess.closeTime)}</p> : <input type="time" name="closeTime" value={formData.closeTime || ""} onChange={handleEditChange} className="mt-1 border rounded px-3 py-2" />}
                  </div>
                </div>
              </div>
            )}

            {/* Save/Cancel buttons (owner or mess) */}
            {isEditing && (
              <div className="flex gap-3 mt-6">
                <button onClick={cancelInlineEdit} className="px-4 py-2 text-sm cursor-pointer bg-gray-200 rounded hover:bg-gray-300">Cancel</button>
                <button
                  disabled={saving}
                  onClick={activeProfileType === "owner" ? handleProfileUpdate : handleMessUpdate}
                  className="px-4 py-2 text-sm cursor-pointer bg-orange-500 text-white rounded hover:bg-orange-600"
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
            <button onClick={() => setShowModal(true)} className="bg-white border border-orange-500 cursor-pointer hover:bg-orange-100 text-orange-500 font-bold py-2 rounded-lg shadow-sm">
              Switch to Mess Profile ↱
            </button>
          ) : (
            <button onClick={switchToOwner} className="bg-white border border-orange-500 cursor-pointer hover:bg-orange-100 text-orange-500 font-bold py-2 rounded-lg shadow-sm">
              Switch to Owner Profile ↩
            </button>
          )}

          <button onClick={handleLogout} className="flex items-center justify-center gap-2 cursor-pointer bg-[#EA4335] hover:bg-[#d9362b] text-white text-sm font-bold py-2 rounded-lg">
            <MdPowerSettingsNew size={18} />
            LOG OUT
          </button>
        </div>
      </div>

      {/* Mess Selection Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-start justify-center backdrop-blur-sm bg-opacity-40 z-50 pt-20">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Select a Mess</h3>
            {messes.length === 0 ? (
              <p className="text-gray-500">No messes found.</p>
            ) : (
              <ul className="space-y-3 max-h-64 overflow-y-auto">
                {messes.map((m) => (
                  <li key={m._id || m.messId || m.id} onClick={() => handleMessSelect(m._id || m.id || m.messId)} className="p-3 border rounded-lg hover:bg-orange-50 cursor-pointer">
                    <div className="font-medium text-gray-800">{m.messName}</div>
                    <div className="text-sm text-gray-500">{m.city}, {m.state}</div>
                  </li>
                ))}
              </ul>
            )}
            <div className="flex justify-end mt-6">
              <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300" onClick={() => setShowModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessProfile;
