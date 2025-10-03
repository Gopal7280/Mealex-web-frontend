

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

//   // inline edit states
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({});
//   const [saving, setSaving] = useState(false);

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
//       console.log(res)
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
//     const fd = new FormData();
//     fd.append("image", file);

//     try {
//       setUploading(true);
//       const res = await apiPost("/owner/profile/image", fd, {
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
//     setIsEditing(false);
//     fetchMessProfile(id);
//   };

//   // Back to Owner
//   const switchToOwner = () => {
//     setActiveProfileType("owner");
//     setSelectedMessId(null);
//     setMess(null);
//     setIsEditing(false);
//   };

//   // Inline edit controls
//   const startInlineEdit = () => {
//     if (activeProfileType !== "owner") return;
//     setFormData({
//       ownerName: owner?.ownerName || "",
//       contactEmail: owner?.contactEmail || "",
//       contactNumber: owner?.contactNumber || "",
//       ownerAddress: owner?.ownerAddress || "",
//       city: owner?.city || "",
//       state: owner?.state || "",
//       pincode: owner?.pincode || "",
//     });
//     setIsEditing(true);
//   };

//   const cancelInlineEdit = () => setIsEditing(false);

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleProfileUpdate = async () => {
//     try {
//       setSaving(true);
//       const res = await apiPost("/owner/profile/update", formData);
//       if (res?.success) {
//         setOwner((prev) => ({ ...prev, ...res.data }));
//         setIsEditing(false);
//         toast.success(res.message || "Profile updated successfully!");
//       } else {
//         toast.error(res?.message || "Update failed");
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
//           {/* Header (responsive + inline name edit) */}
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

//             <div className="flex-1 w-full">
//               {isEditing && activeProfileType === "owner" ? (
//                 <input
//                   name="ownerName"
//                   value={formData.ownerName}
//                   onChange={handleEditChange}
//                   className="w-full sm:w-auto text-2xl font-semibold font-poppins text-[#393939] border rounded-lg px-3 py-2"
//                   placeholder="Owner Name"
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
//                     className="bg-orange-500 hover:bg-orange-600 cursor-pointer text-white text-sm font-semibold px-5 py-2 rounded-full shadow-md transition"
//                   >
//                     ✏️ Edit Profile
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Details (responsive + inline inputs) */}
//           <div className="mt-8 text-lg text-gray-600 font-poppins">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {/* Email */}
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
//                 ) : (
//                   <span className="mt-1 break-all">
//                     {profileData.contactEmail || profileData.email || "N/A"}
//                   </span>
//                 )}
//               </div>

//               {/* Contact */}
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
//                 ) : (
//                   <span className="mt-1">
//                     {profileData.contactNumber || profileData.phone || "N/A"}
//                   </span>
//                 )}
//               </div>

//               {/* Address */}
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
//                 ) : (
//                   <span className="mt-1 break-words">
//                     {profileData.ownerAddress || profileData.address || "N/A"}
//                   </span>
//                 )}
//               </div>

//               {/* City */}
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
//                 ) : (
//                   <span className="mt-1">{profileData.city || "N/A"}</span>
//                 )}
//               </div>

//               {/* State */}
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
//                 ) : (
//                   <span className="mt-1">{profileData.state || "N/A"}</span>
//                 )}
//               </div>

//               {/* Pincode */}
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
//                 ) : (
//                   <span className="mt-1">{profileData.pincode || "N/A"}</span>
//                 )}
//               </div>
//             </div>

//             {/* Save/Cancel */}
//             {isEditing && activeProfileType === "owner" && (
//               <div className="flex gap-3 mt-6">
//                 <button
//                   onClick={cancelInlineEdit}
//                   className="px-4 py-2 text-sm cursor-pointer bg-gray-200 rounded hover:bg-gray-300"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   disabled={saving}
//                   onClick={handleProfileUpdate}
//                   className="px-4 py-2 text-sm bg-orange-500 cursor-pointer text-white rounded hover:bg-orange-600"
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
//               className="bg-orange-500 cursor-pointer hover:bg-orange-600 text-white font-bold py-2 rounded-lg shadow-sm"
//             >
//               Switch to Mess Profile ↱
//             </button>
//           ) : (
//             <button
//               onClick={switchToOwner}
//               className="bg-orange-500 cursor-pointer hover:bg-orange-600 text-white font-bold py-2 rounded-lg shadow-sm"
//             >
//               Switch to Owner Profile ↩
//             </button>
//           )}

//           <button
//             onClick={handleLogout}
//             className="border border-[#EA4335] cursor-pointer text-[#EA4335] text-sm font-bold py-2 rounded-lg"
//           >
//             LOG OUT
//           </button>
//         </div>
//       </div>

//       {/* Mess Select Modal (unchanged) */}
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
//                     key={m._id || m.messId}
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
//               <button
//                 className="px-4 py-2 text-sm cursor-pointer bg-gray-200 rounded hover:bg-gray-300"
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

const MessProfile = () => {
  const [owner, setOwner] = useState(null);
  const [mess, setMess] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [messes, setMesses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [activeProfileType, setActiveProfileType] = useState("owner"); // owner | mess
  const [selectedMessId, setSelectedMessId] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const fetchOwner = async () => {
    setIsLoading(true);
    try {
      const res = await apiGet("/owner/profile");
      const payload = res.data || res.data?.owner || null;
      setOwner(payload);
    } catch (e) {
      setOwner(null);
    } finally {
      setIsLoading(false);
    }
  };

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
      setMess(null);
    } finally {
      setIsLoading(false);
    }
  };

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
      if (res?.success) {
        const newUrl = res.data?.data?.profileImage || res.data?.profileImage;
        setOwner((prev) => ({
          ...prev,
          profileImage: `${newUrl}?t=${Date.now()}`,
        }));
      }
    } catch (err) {
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
      } catch (error) {
      }
    })();
  }, []);

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
    } finally {
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
    fetchMessProfile(id);
  };

  const switchToOwner = () => {
    setActiveProfileType("owner");
    setSelectedMessId(null);
    setMess(null);
    setIsEditing(false);
  };

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
      if (res?.success) {
        setOwner((prev) => ({ ...prev, ...res.data }));
        setIsEditing(false);
        toast.success(res.message || "Profile updated successfully!");
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
      <div className="flex min-h-screen bg-[#F9F4F0]">
        <Navbar />
        <div className="w-full mx-auto p-6 text-center text-gray-500">
          Loading profile...
        </div>
      </div>
    );
  }

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
                    className="bg-orange-500 hover:bg-orange-600 cursor-pointer text-white text-sm font-semibold px-5 py-2 rounded-full shadow-md transition"
                  >
                    ✏️ Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Details */}
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

            {/* Mess-specific fields */}
            {activeProfileType === "mess" && mess && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="flex flex-col">
                  <span className="font-medium">Mess Type:</span>
                  <span className="mt-1">{mess.messType || "N/A"}</span>
                </div>

                <div className="flex flex-col">
                  <span className="font-medium">Alternate Contact:</span>
                  <span className="mt-1">{mess.alternateContact || "N/A"}</span>
                </div>

                <div className="flex flex-col">
                  <span className="font-medium">FSSAI License Number:</span>
                  <span className="mt-1">{mess.fssaiLicenseNumber || "N/A"}</span>
                </div>

                {/* <div className="flex flex-col">
                  <span className="font-medium">FSSI License PDF:</span>
                  {mess.fssaiDocUrl ? (
                    <a href={mess.fssiLicensePdf} target="_blank" className="text-blue-600 underline mt-1">
                      View PDF
                    </a>
                  ) : (
                    <span className="mt-1">N/A</span>
                  )}
                </div> */}
                <div className="flex flex-col mt-4">
  <span className="font-medium">FSSAI Document:</span>
  {profileData.fssaiDocUrl ? (
    <a
      href={profileData.fssaiDocUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-1 text-blue-600 underline"
    >
      View FSSAI Document
    </a>
  ) : (
    <span className="mt-1">N/A</span>
  )}
</div>


                <div className="flex flex-col">
                  <span className="font-medium">Activation Document Type:</span>
                  <span className="mt-1">{mess.activationDocType || "N/A"}</span>
                </div>

                {/* <div className="flex flex-col">
                  <span className="font-medium">Activation Document Link:</span>
                  {mess.activationDocUrl ? (
                    <a href={mess.activationDocumentLink} target="_blank" className="text-blue-600 underline mt-1">
                      View Document
                    </a>
                  ) : (
                    <span className="mt-1">N/A</span>
                  )}
                </div> */}
                <div className="flex flex-col mt-4">
  <span className="font-medium">Activation Document:</span>
  {profileData.activationDocUrl ? (
    <a
      href={profileData.activationDocUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-1 text-blue-600 underline"
    >
      {profileData.activationDocType || "View Document"}
    </a>
  ) : (
    <span className="mt-1">N/A</span>
  )}
</div>


                <div className="flex flex-col">
                  <span className="font-medium">Is FSSAI Verified?</span>
                  <span className="mt-1">{mess.isVerified ? "Yes" : "No"}</span>
                </div>

                <div className="flex flex-col">
                  <span className="font-medium">Status:</span>
                  <span className="mt-1">{mess.status || "N/A"}</span>
                </div>

                <div className="flex flex-col">
                  <span className="font-medium">Days Open:</span>
                  <span className="mt-1">{mess.daysOpen?.join(", ") || "N/A"}</span>
                </div>

                <div className="flex flex-col">
                  <span className="font-medium">Services:</span>
                  <span className="mt-1">{mess.services?.join(", ") || "N/A"}</span>
                </div>

                <div className="flex flex-col">
                  <span className="font-medium">KYC Stage:</span>
                  <span className="mt-1">{mess.kyc_stage || "N/A"}</span>
                </div>

                <div className="flex flex-col">
                  <span className="font-medium">Open / Close Time:</span>
                  <span className="mt-1">
                    {mess.openTime && mess.closeTime ? `${mess.openTime} - ${mess.closeTime}` : "N/A"}
                  </span>
                </div>
              </div>
            )}
            

            {isEditing && activeProfileType === "owner" && (
              <div className="flex gap-3 mt-6">
                <button
                  onClick={cancelInlineEdit}
                  className="px-4 py-2 text-sm cursor-pointer bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  disabled={saving}
                  onClick={handleProfileUpdate}
                  className="px-4 py-2 text-sm bg-orange-500 cursor-pointer text-white rounded hover:bg-orange-600"
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
              className="bg-orange-500 cursor-pointer hover:bg-orange-600 text-white font-bold py-2 rounded-lg shadow-sm"
            >
              Switch to Mess Profile ↱
            </button>
          ) : (
            <button
              onClick={switchToOwner}
              className="bg-orange-500 cursor-pointer hover:bg-orange-600 text-white font-bold py-2 rounded-lg shadow-sm"
            >
              Switch to Owner Profile ↩
            </button>
          )}

          <button
            onClick={handleLogout}
            className="border border-[#EA4335] cursor-pointer text-[#EA4335] text-sm font-bold py-2 rounded-lg"
          >
            LOG OUT
          </button>
           <button
      onClick={() => navigate("/delete-account")}
  className="absolute opacity-0 "
>
  Delete Account
</button>
          {/* Invisible Delete Account Button */}


        </div>
       
      </div>
      

      {/* Mess Select Modal */}
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
                className="px-4 py-2 text-sm cursor-pointer bg-gray-200 rounded hover:bg-gray-300"
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
