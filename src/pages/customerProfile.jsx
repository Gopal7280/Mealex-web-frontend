
// import React, { useEffect, useState, useRef } from "react";
// import Navbar2 from "../layouts/Navbar2";
// import { apiGet, apiPost } from "../services/api";
// import { useNavigate } from "react-router-dom";
// import storage from "../utils/storage";
// import CustomerHeader from "../layouts/CustomerHeader";

// const CustomerProfileDetails = () => {
//   const [profile, setProfile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [formData, setFormData] = useState({});
//   const [saving, setSaving] = useState(false);
//   const fileInputRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await apiGet("/customer/profile/complete");
//         setProfile(res?.data);
//       } catch (error) {
//         console.error("❌ Failed to fetch profile:", error);
//       }
//     };
//     fetchProfile();
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
//       console.log("✅ Logged out successfully");
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

//   const triggerFileInput = () => fileInputRef.current?.click();

//   const handleFileChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("image", file);

//     try {
//       setUploading(true);
//       const response = await apiPost("/customer/profile/image", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       if (response?.data?.success) {
//         const newUrl =
//           response.data?.data?.profileImage || response.data?.profileImage;

//         setProfile((prev) => ({
//           ...prev,
//           profileImage: `${newUrl}?t=${Date.now()}`,
//         }));
//       }
//     } catch (err) {
//       console.error("❌ Failed to upload image:", err);
//     } finally {
//       setUploading(false);
//     }
//   };

//   const openEditModal = () => {
//     setFormData({
//       customerName: profile?.customerName || "",
//       gender: profile?.gender || "",
//       customerAddress: profile?.customerAddress || "",
//       city: profile?.city || "",
//       state: profile?.state || "",
//       pincode: profile?.pincode || "",
//       dateofbirth: profile?.dateofbirth || "",
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
//       const res = await apiPost("/customer/profile/update", formData);
//       console.log("Update response:", res);

//       if (res?.data?.success) {
//         setProfile((prev) => ({ ...prev, ...res.data.data }));
//         setShowEditModal(false);
//         alert(res.data.message || "Profile updated successfully!");
//       } else {
//         alert(res?.data?.message || "Update failed");
//       }
//     } catch (err) {
//       console.error("Update error:", err);
//       alert("Something went wrong.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (!profile) {
//     return (
//       <div className="flex min-h-screen bg-[#F9F4F0]">
//         <Navbar2 />
//         <div className="w-full mx-auto p-6 text-center text-gray-500">
//           Loading profile...
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex h-screen bg-gray-50">
//       <Navbar2 />
//       <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-gray-50 overflow-y-auto">
//         <CustomerHeader />
//         <div className="flex justify-between items-center">
//           <h2 className="text-2xl font-bold font-poppins text-[#232325D1] mb-2">
//             Profile Details
//           </h2>
        
//         </div>

//         {/* <div className="bg-white shadow-md rounded-2xl p-6">
//           <div className="w-full flex sm:flex-row items-center gap-6">
//             <div className="relative w-32 h-32">
//               <img
//                 src={profile.profileImage || "https://via.placeholder.com/150"}
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

//          <div>
//   <h2 className="text-2xl font-semibold font-poppins text-[#393939]">
//     {profile.customerName || "Unnamed"}
//   </h2>
//   <div className="flex items-center gap-3">
//     <p className="text-gray-500 font-poppins">
//       {profile.identifier || ""}
//     </p>

//      <button
//     onClick={openEditModal}
//     className="top-4 right-4 bg-orange-500 hover:bg-orange-600 
//                text-white text-sm font-semibold px-5 py-2 rounded-full shadow-md transition"
//   >
//     ✏️ Edit Profile
//   </button>
//   </div>
// </div>

//           </div>


//           <div className="flex justify-between w-full gap-2 font-poppins text-[#535353] mt-8">
//             <div className="flex flex-col items-start space-y-8 w-1/2 md:pl-4 pl-1">
//               <p className="font-medium text-xl">Email:</p>
//               <p className="font-medium text-xl">Contact:</p>
//               <p className="font-medium text-xl">Gender:</p>
//               <p className="font-medium text-xl">DOB:</p>
//               <p className="font-medium text-xl">Address:</p>
//               <p className="font-medium text-xl">City:</p>
//               <p className="font-medium text-xl">State:</p>
//               <p className="font-medium text-xl">Pincode:</p>
//               <p className="font-medium text-xl">Associated Messes:</p>
//             </div>

//             <div className="flex flex-col items-end space-y-8 w-1/2 md:pr-4 pr-1 text-xl text-gray-600">
//               <p>{profile.contactEmail || "N/A"}</p>
//               <p>{profile.contactNumber || "N/A"}</p>
//               <p>{profile.gender || "Not Provided"}</p>
//               <p>{profile.dateofbirth || "Not Provided"}</p>
//               <p>{profile.customerAddress || "N/A"}</p>
//               <p>{profile.city || "N/A"}</p>
//               <p>{profile.state || "N/A"}</p>
//               <p>{profile.pincode || "N/A"}</p>
//               <p>{profile.mess_ids?.length || 0} connected</p>
//             </div>
//           </div>
//         </div> */}
//         <div className="bg-white shadow-md rounded-2xl p-6">
//   <div className="w-full flex flex-col sm:flex-row items-center sm:items-start gap-6">
//     <div className="relative w-32 h-32">
//       <img
//         src={profile.profileImage || "https://via.placeholder.com/150"}
//         alt="Profile"
//         className="w-full h-full rounded-xl object-cover"
//       />
//       <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 hover:opacity-100 rounded-xl cursor-pointer transition">
//         <span className="text-white text-xs font-semibold px-2 py-1 border border-white rounded">
//           {uploading ? "Uploading..." : "Edit Image"}
//         </span>
//         <input
//           type="file"
//           accept="image/*"
//           ref={fileInputRef}
//           className="hidden"
//           onChange={handleFileChange}
//         />
//       </label>
//     </div>

//     {/* Name + Email + Edit button */}
//     <div className="flex flex-col sm:flex-1 w-full">
//       <h2 className="text-xl md:text-2xl font-semibold font-poppins text-[#393939] text-center sm:text-left">
//         {profile.customerName || "Unnamed"}
//       </h2>
//       <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-2 sm:mt-3">
//         <p className="text-gray-500 font-poppins text-sm md:text-base text-center sm:text-left">
//           {profile.identifier || ""}
//         </p>
//         <button
//           onClick={openEditModal}
//           className="bg-orange-500 hover:bg-orange-600 
//                    text-white text-sm font-semibold px-4 py-2 
//                    rounded-full shadow-md transition w-max self-center sm:self-auto"
//         >
//           ✏️ Edit Profile
//         </button>
//       </div>
//     </div>
//   </div>

//   {/* Details */}
//   <div className="flex flex-col md:flex-row justify-between w-full gap-6 font-poppins text-[#535353] mt-8">
//     {/* <div className="flex flex-col items-start space-y-4 w-full md:w-1/2">
//       <p className="font-medium text-base md:text-xl">Email:</p>
//       <p className="font-medium text-base md:text-xl">Contact:</p>
//       <p className="font-medium text-base md:text-xl">Gender:</p>
//       <p className="font-medium text-base md:text-xl">DOB:</p>
//       <p className="font-medium text-base md:text-xl">Address:</p>
//       <p className="font-medium text-base md:text-xl">City:</p>
//       <p className="font-medium text-base md:text-xl">State:</p>
//       <p className="font-medium text-base md:text-xl">Pincode:</p>
//       <p className="font-medium text-base md:text-xl">Associated Messes:</p>
//     </div> */}

//     {/* <div className="flex flex-col items-start md:items-end space-y-4 w-full md:w-1/2 text-sm md:text-xl text-gray-600">
//       <p>{profile.contactEmail || "N/A"}</p>
//       <p>{profile.contactNumber || "N/A"}</p>
//       <p>{profile.gender || "Not Provided"}</p>
//       <p>{profile.dateofbirth || "Not Provided"}</p>
//       <p>{profile.customerAddress || "N/A"}</p>
//       <p>{profile.city || "N/A"}</p>
//       <p>{profile.state || "N/A"}</p>
//       <p>{profile.pincode || "N/A"}</p>
//       <p>{profile.mess_ids?.length || 0} connected</p>
//     </div> */}
//     {/* Details */}
// <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4 font-poppins text-[#535353] mt-8">
//   <div className="font-medium text-lg">Email:</div>
//   <div className="text-gray-600 text-lg">{profile.contactEmail || "N/A"}</div>

//   <div className="font-medium text-lg">Contact:</div>
//   <div className="text-gray-600 text-lg">{profile.contactNumber || "N/A"}</div>

//   <div className="font-medium text-lg">Gender:</div>
//   <div className="text-gray-600 text-lg">{profile.gender || "Not Provided"}</div>

//   <div className="font-medium text-lg">DOB:</div>
//   <div className="text-gray-600 text-lg">{profile.dateofbirth || "Not Provided"}</div>

//   <div className="font-medium text-lg">Address:</div>
//   <div className="text-gray-600 text-lg">{profile.customerAddress || "N/A"}</div>

//   <div className="font-medium text-lg">City:</div>
//   <div className="text-gray-600 text-lg">{profile.city || "N/A"}</div>

//   <div className="font-medium text-lg">State:</div>
//   <div className="text-gray-600 text-lg">{profile.state || "N/A"}</div>

//   <div className="font-medium text-lg">Pincode:</div>
//   <div className="text-gray-600 text-lg">{profile.pincode || "N/A"}</div>

//   <div className="font-medium text-lg">Associated Messes:</div>
//   <div className="text-gray-600 text-lg">{profile.mess_ids?.length || 0} connected</div>
// </div>

//   </div>
// </div>


//         <div className="flex flex-col items-center mt-8">
//           <button
//             onClick={handleLogout}
//             className="border border-[#EA4335] text-[#EA4335] text-sm font-bold font-poppins w-1/2 py-2 rounded-lg"
//           >
//             LOG OUT
//           </button>
//         </div>
//       </div>

//       {/* Edit Profile Modal */}
//       {showEditModal && (
//         <div className="fixed inset-0 flex items-start justify-center backdrop-blur-sm bg-opacity-40 z-50 pt-20">
//           <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 max-h-[90vh] overflow-y-auto">
//             <h3 className="text-lg font-semibold mb-4">Edit Profile</h3>
//             <div className="space-y-3">
//               <input
//                 name="customerName"
//                 value={formData.customerName}
//                 onChange={handleEditChange}
//                 placeholder="Name"
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
//                 name="customerAddress"
//                 value={formData.customerAddress}
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

//             <div className="flex justify-end mt-6 gap-3">
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

// export default CustomerProfileDetails;

import React, { useEffect, useState, useRef } from "react";
import Navbar2 from "../layouts/Navbar2";
import { apiGet, apiPost } from "../services/api";
import { useNavigate } from "react-router-dom";
import storage from "../utils/storage";
import CustomerHeader from "../layouts/CustomerHeader";
import { toast } from "react-hot-toast";

const CustomerProfileDetails = () => {
  const [profile, setProfile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await apiGet("/customer/profile/complete");
        setProfile(res?.data);
      } catch (error) {
      }
    };
    fetchProfile();
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

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const response = await apiPost("/customer/profile/image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response?.success) {
        const newUrl =
          response.data?.data?.profileImage || response.data?.profileImage;
        setProfile((prev) => ({
          ...prev,
          profileImage: `${newUrl}?t=${Date.now()}`,
        }));
      }
    } catch (err) {
    } finally {
      setUploading(false);
    }
  };

  const startInlineEdit = () => {
    setFormData({
      customerName: profile?.customerName || "",
      gender: profile?.gender || "",
      customerAddress: profile?.customerAddress || "",
      city: profile?.city || "",
      state: profile?.state || "",
      pincode: profile?.pincode || "",
      dateofbirth: profile?.dateofbirth || "",
    });
    setIsEditing(true);
  };

  const cancelInlineEdit = () => {
    setIsEditing(false);
    setFormData({});
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileUpdate = async () => {
    try {
      setSaving(true);
      const res = await apiPost("/customer/profile/update", formData);
      if (res?.success) {
        setProfile((prev) => ({ ...prev, ...res.data }));
        setIsEditing(false);
        // alert(res.message || "Profile updated successfully!");
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

  if (!profile) {
    return (
      <div className="flex min-h-screen bg-[#F9F4F0]">
        <Navbar2 />
        <div className="w-full mx-auto p-6 text-center text-gray-500">
          Loading profile...
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Navbar2 />
      <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-gray-50 overflow-y-auto">
        <CustomerHeader />

        <div className="bg-white shadow-md rounded-2xl p-6">
          <div className="w-full flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="relative w-32 h-32">
              <img
                src={profile.profileImage || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-full h-full rounded-xl object-cover"
              />
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
            </div>

            <div className="flex flex-col sm:flex-1 w-full">
              {isEditing ? (
                <input
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleEditChange}
                  className="border p-2 rounded text-lg font-semibold"
                />
              ) : (
                <h2 className="text-xl md:text-2xl font-semibold font-poppins text-[#393939]">
                  {profile.customerName || "Unnamed"}
                </h2>
              )}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-2 sm:mt-3">
                <p className="text-gray-500 font-poppins text-sm md:text-base">
                  {profile.identifier || ""}
                </p>
                {!isEditing && (
                  <button
                    onClick={startInlineEdit}
                    className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-full cursor-pointer shadow-md transition"
                  >
                    ✏️ Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Inline Editable Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4 font-poppins text-[#535353] mt-8">
            <div className="font-medium text-lg">Email:</div>
            <div className="text-gray-600 text-lg">
              {profile.contactEmail || "N/A"}
            </div>

            <div className="font-medium text-lg">Contact:</div>
            <div className="text-gray-600 text-lg">
              {profile.contactNumber || "N/A"}
            </div>

            <div className="font-medium text-lg">Gender:</div>
            <div className="text-gray-600 text-lg">
              {isEditing ? (
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleEditChange}
                  className="border p-2 rounded w-full"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              ) : (
                profile.gender || "Not Provided"
              )}
            </div>

            <div className="font-medium text-lg">DOB:</div>
            <div className="text-gray-600 text-lg">
              {isEditing ? (
                <input
                  type="date"
                  name="dateofbirth"
                  value={formData.dateofbirth}
                  onChange={handleEditChange}
                  className="border p-2 rounded w-full"
                />
              ) : (
                profile.dateofbirth || "Not Provided"
              )}
            </div>

            <div className="font-medium text-lg">Address:</div>
            <div className="text-gray-600 text-lg">
              {isEditing ? (
                <input
                  name="customerAddress"
                  value={formData.customerAddress}
                  onChange={handleEditChange}
                  className="border p-2 rounded w-full"
                />
              ) : (
                profile.customerAddress || "N/A"
              )}
            </div>

            <div className="font-medium text-lg">City:</div>
            <div className="text-gray-600 text-lg">
              {isEditing ? (
                <input
                  name="city"
                  value={formData.city}
                  onChange={handleEditChange}
                  className="border p-2 rounded w-full"
                />
              ) : (
                profile.city || "N/A"
              )}
            </div>

            <div className="font-medium text-lg">State:</div>
            <div className="text-gray-600 text-lg">
              {isEditing ? (
                <input
                  name="state"
                  value={formData.state}
                  onChange={handleEditChange}
                  className="border p-2 rounded w-full"
                />
              ) : (
                profile.state || "N/A"
              )}
            </div>

            <div className="font-medium text-lg">Pincode:</div>
            <div className="text-gray-600 text-lg">
              {isEditing ? (
                <input
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleEditChange}
                  className="border p-2 rounded w-full"
                />
              ) : (
                profile.pincode || "N/A"
              )}
            </div>

            <div className="font-medium text-lg">Associated Messes:</div>
            <div className="text-gray-600 text-lg">
              {profile.mess_ids?.length || 0} connected
            </div>
          </div>

          {/* Save / Cancel Buttons */}
          {isEditing && (
            <div className="flex justify-end mt-6 gap-3">
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

        <div className="flex flex-col items-center mt-8">
          <button
            onClick={handleLogout}
            className="border border-[#EA4335] cursor-pointer text-[#EA4335] text-sm font-bold font-poppins w-1/2 py-2 rounded-lg"
          >
            LOG OUT
          </button>
           <button
      onClick={() => navigate("/delete-account")}
  className="absolute opacity-0"
>
  Delete Account
</button>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfileDetails;
