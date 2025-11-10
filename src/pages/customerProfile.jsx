
// import React, { useEffect, useState, useRef } from "react";
// import Navbar2 from "../layouts/Navbar2";
// import { apiGet, apiPost } from "../services/api";
// import { useNavigate } from "react-router-dom";
// import storage from "../utils/storage";
// import CustomerHeader from "../layouts/CustomerHeader";
// import { toast } from "react-hot-toast";
// import { MdLogout } from "react-icons/md";
// import "../styles/customerProfile.css"; // ✅ Add this line at top



// const CustomerProfileDetails = () => {
//   const [profile, setProfile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
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
//     } catch (err) {
//     } finally {
//       storage.clear();
//       localStorage.clear();
//       sessionStorage.clear();
//       if (window.Razorpay) delete window.Razorpay;
//       window.location.replace("/login");
//     }
//   };

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

// if (response?.success) {
//   const newUrl =
//     response.data?.data?.profileImage || response.data?.profileImage;
//   const updatedProfile = {
//     ...profile,
//     profileImage: `${newUrl}?t=${Date.now()}`,
//   };
//   setProfile(updatedProfile);

//   // Update storage for CustomerHeader
//   const storedHeader = JSON.parse(storage.getItem("customerHeaderData") || "{}");
//   storage.setItem(
//     "customerHeaderData",
//     JSON.stringify({
//       ...storedHeader,
//       profileImage: updatedProfile.profileImage,
//     })
//   );
// }

//     } catch (err) {
//     } finally {
//       setUploading(false);
//     }
//   };

//   const startInlineEdit = () => {
//     setFormData({
//       customerName: profile?.customerName || "",
//       gender: profile?.gender || "",
//       customerAddress: profile?.customerAddress || "",
//       city: profile?.city || "",
//       state: profile?.state || "",
//       pincode: profile?.pincode || "",
//       dateofbirth: profile?.dateofbirth || "",
//     });
//     setIsEditing(true);
//   };

//   const cancelInlineEdit = () => {
//     setIsEditing(false);
//     setFormData({});
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleProfileUpdate = async () => {
//     try {
//       setSaving(true);
//       const res = await apiPost("/customer/profile/update", formData);
//   if (res?.success) {
//   const updatedProfile = { ...profile, ...res.data };
//   setProfile(updatedProfile);
//   setIsEditing(false);
//   toast.success(res.message || "Profile updated successfully!");

//   // Update storage for CustomerHeader
//   const storedHeader = JSON.parse(storage.getItem("customerHeaderData") || "{}");
//   const newHeaderData = {
//     ...storedHeader,
//     customerName: updatedProfile.customerName || storedHeader.customerName,
//     profileImage: updatedProfile.profileImage || storedHeader.profileImage,
//     // Optional: update messName if this can change
//     messName: updatedProfile.messes?.[0]?.messName || storedHeader.messName,
//   };
//   storage.setItem("customerHeaderData", JSON.stringify(newHeaderData));
//       } else {
//         toast.error(res?.message || "Update failed");
//       }
//     } catch (err) {
//       toast.error("Something went wrong.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (!profile) {
//     return (
//       <div className="flex  bg-[#F9F4F0]">
//         <Navbar2 />
//         <div className="w-full mx-auto p-6 text-center text-gray-500">
//           Loading profile...
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex bg-gray-50 customer-profile-page">
//       <Navbar2 />
//       <div className="flex-1 md:p-4 pt-16 py-4 px-4 overflow-y-auto bg-gray-50">
//         <CustomerHeader />

//         <div className="bg-white shadow-md rounded-2xl p-6">
//           <div className="w-full flex flex-col sm:flex-row items-center sm:items-start gap-6">
        
//             <div className="relative w-32 h-32">
//   <img
//     src={profile.profileImage || "https://via.placeholder.com/150"}
//     alt="Profile"
//     className="w-full h-full rounded-xl object-cover"
//   />

//   <>
//     <input
//       type="file"
//       accept="image/*"
//       ref={fileInputRef}
//       className="hidden"
//       onChange={handleFileChange}
//     />
//     <button
//       onClick={() => fileInputRef.current?.click()}
//       disabled={uploading}
//       // className="absolute bottom-0 right-0 bg-white hover:bg-orange-200 cursor-pointer text-white rounded-full p-2 shadow-md transition"
//           className="absolute bottom-0  right-0 z-20 bg-white text-xs md:text-sm font-medium px-1.5 py-1.5 rounded-full shadow hover:bg-orange-200 cursor-pointer transition-all duration-200"

//       title="Edit Image"
//     >
//       ✏️
//     </button>
    
//   </>
// </div>


//             <div className="flex flex-col sm:flex-1 w-full">
//               {isEditing ? (
//                 <input
//                   name="customerName"
//                   value={formData.customerName}
//                   onChange={handleEditChange}
//                   className="border p-2 rounded text-lg font-semibold"
//                 />
//               ) : (
//                 <h2 className="text-xl md:text-2xl font-semibold font-poppins text-[#393939]">
//                   {profile.customerName || "Unnamed"}
//                 </h2>
//               )}
//               <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-2 sm:mt-3">
//                 <p className="text-gray-500 font-poppins text-sm md:text-base break-all sm:break-normal">
//                   {profile.identifier || ""}
//                 </p>
//                 {!isEditing && (
//                   <button
//                     onClick={startInlineEdit}
//                     className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-full cursor-pointer shadow-md transition"
//                   >
//                     ✏️ Edit Profile
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Inline Editable Fields */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4 font-poppins text-[#535353] mt-8">
//             <div className="font-medium text-lg">Email:</div>
//             <div className="text-gray-600 text-lg break-all sm:break-normal">
//               {profile.contactEmail || "N/A"}
//             </div>

//             <div className="font-medium text-lg">Contact:</div>
//             <div className="text-gray-600 text-lg">
//               {profile.contactNumber || "N/A"}
//             </div>

//             <div className="font-medium text-lg">Gender:</div>
//             <div className="text-gray-600 text-lg">
//               {isEditing ? (
//                 <select
//                   name="gender"
//                   value={formData.gender}
//                   onChange={handleEditChange}
//                   className="border p-2 rounded w-full"
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="male">Male</option>
//                   <option value="female">Female</option>
//                 </select>
//               ) : (
//                 profile.gender || "Not Provided"
//               )}
//             </div>

//             <div className="font-medium text-lg">DOB:</div>
//             <div className="text-gray-600 text-lg">
//               {isEditing ? (
//                 <input
//                   type="date"
//                   name="dateofbirth"
//                   value={formData.dateofbirth}
//                   onChange={handleEditChange}
//                   className="border p-2 rounded w-full"
//                 />
//               ) : (
//                 profile.dateofbirth || "Not Provided"
//               )}
//             </div>

//             <div className="font-medium text-lg">Address:</div>
//             <div className="text-gray-600 text-lg">
//               {isEditing ? (
//                 <input
//                   name="customerAddress"
//                   value={formData.customerAddress}
//                   onChange={handleEditChange}
//                   className="border p-2 rounded w-full"
//                 />
//               ) : (
//                 profile.customerAddress || "N/A"
//               )}
//             </div>

//             <div className="font-medium text-lg">City:</div>
//             <div className="text-gray-600 text-lg">
//               {isEditing ? (
//                 <input
//                   name="city"
//                   value={formData.city}
//                   onChange={handleEditChange}
//                   className="border p-2 rounded w-full"
//                 />
//               ) : (
//                 profile.city || "N/A"
//               )}
//             </div>

//             <div className="font-medium text-lg">State:</div>
//             <div className="text-gray-600 text-lg">
//               {isEditing ? (
//                 <input
//                   name="state"
//                   value={formData.state}
//                   onChange={handleEditChange}
//                   className="border p-2 rounded w-full"
//                 />
//               ) : (
//                 profile.state || "N/A"
//               )}
//             </div>

//             <div className="font-medium text-lg">Pincode:</div>
//             <div className="text-gray-600 text-lg">
//               {isEditing ? (
//                 <input
//                   name="pincode"
//                   value={formData.pincode}
//                   onChange={handleEditChange}
//                   className="border p-2 rounded w-full"
//                 />
//               ) : (
//                 profile.pincode || "N/A"
//               )}
//             </div>

//             <div className="font-medium text-lg">Associated Messes:</div>
//             <div className="text-gray-600 text-lg">
//               {profile.mess_ids?.length || 0} connected
//             </div>
//           </div>

//           {/* Save / Cancel Buttons */}
//           {isEditing && (
//             <div className="flex justify-end mt-6 gap-3">
//               <button
//                 onClick={cancelInlineEdit}
//                 className="px-4 py-2 text-sm bg-gray-200 cursor-pointer rounded hover:bg-gray-300"
//               >
//                 Cancel
//               </button>
//               <button
//                 disabled={saving}
//                 onClick={handleProfileUpdate}
//                 className="px-4 py-2 text-sm bg-orange-500 cursor-pointer text-white rounded hover:bg-orange-600"
//               >
//                 {saving ? "Saving..." : "Save Changes"}
//               </button>
//             </div>
//           )}
//         </div>

//         <div className="flex flex-col items-center mt-8">
//          <button
//   onClick={handleLogout}
//   className="flex items-center justify-center gap-2 cursor-pointer bg-[#EA4335] hover:bg-[#d9362b] text-white text-sm font-bold font-poppins w-1/2 py-2 rounded-lg transition"
// >
//   <MdLogout size={18} />
//   LOG OUT
// </button>

//            <button
//       onClick={() => navigate("/delete-account")}
//   className="absolute opacity-0"
// >
//   Delete Account
// </button>
//         </div>
//       </div>
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
import { MdPowerSettingsNew  } from "react-icons/md";
import "../styles/customerProfile.css";

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
        console.error(error);
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
        const updatedProfile = {
          ...profile,
          profileImage: `${newUrl}?t=${Date.now()}`,
        };
        setProfile(updatedProfile);

        // Update header storage
        const storedHeader = JSON.parse(
          storage.getItem("customerHeaderData") || "{}"
        );
        storage.setItem(
          "customerHeaderData",
          JSON.stringify({
            ...storedHeader,
            profileImage: updatedProfile.profileImage,
          })
        );
      }
    } catch (err) {
      console.error(err);
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
      contactEmail: profile?.contactEmail || "",
      contactNumber: profile?.contactNumber || "",
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

      // ✅ Send all fields including email and contact number
      const payload = {
        customerName: formData.customerName,
        gender: formData.gender,
        customerAddress: formData.customerAddress,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        dateofbirth: formData.dateofbirth,
        contactEmail: formData.contactEmail,
        contactNumber: formData.contactNumber,
      };

      const res = await apiPost("/customer/profile/update", payload);

      if (res?.success) {
        const updatedProfile = { ...profile, ...payload };
        setProfile(updatedProfile);
        setIsEditing(false);
        toast.success(res.message || "Profile updated successfully!");

        // ✅ Update header storage
        const storedHeader = JSON.parse(
          storage.getItem("customerHeaderData") || "{}"
        );
        const newHeaderData = {
          ...storedHeader,
          customerName:
            updatedProfile.customerName || storedHeader.customerName,
          profileImage:
            updatedProfile.profileImage || storedHeader.profileImage,
          messName:
            updatedProfile.messes?.[0]?.messName || storedHeader.messName,
        };
        storage.setItem("customerHeaderData", JSON.stringify(newHeaderData));
      } else {
        toast.error(res?.message || "Update failed");
      }
    } catch (err) {
      toast.error("Something went wrong.");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (!profile) {
    return (
      <div className="flex bg-[#F9F4F0]">
        <Navbar2 />
        <div className="w-full mx-auto p-6 text-center text-gray-500">
          Loading profile...
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 customer-profile-page">
      <Navbar2 />
      <div className="flex-1 md:p-4 pt-16 py-4 px-4 overflow-y-auto bg-gray-50">
        <CustomerHeader />

        <div className="bg-white shadow-md rounded-2xl p-6">
          <div className="w-full flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Profile Image */}
            <div className="relative w-32 h-32">
              <img
                src={profile.profileImage || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-full h-full rounded-xl object-cover"
              />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="absolute bottom-0 right-0 z-20 bg-white text-xs md:text-sm font-medium px-1.5 py-1.5 rounded-full shadow hover:bg-orange-200 cursor-pointer transition-all duration-200"
                title="Edit Image"
              >
                ✏️
              </button>
            </div>

            {/* Profile Name and Edit Button */}
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
                <p className="text-gray-500 font-poppins text-sm md:text-base break-all sm:break-normal">
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

          {/* Editable Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4 font-poppins text-[#535353] mt-8">
            <div className="font-medium text-lg">Email:</div>
            <div className="text-gray-600 text-lg break-all sm:break-normal">
              {isEditing ? (
                <input
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleEditChange}
                  className="border p-2 rounded w-full"
                />
              ) : (
                profile.contactEmail || "N/A"
              )}
            </div>

            <div className="font-medium text-lg">Contact:</div>
            <div className="text-gray-600 text-lg">
              {isEditing ? (
                <input
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleEditChange}
                  className="border p-2 rounded w-full"
                />
              ) : (
                profile.contactNumber || "N/A"
              )}
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

          {isEditing && (
            <div className="flex justify-end mt-6 gap-3">
              <button
                onClick={cancelInlineEdit}
                className="px-4 py-2 text-sm bg-gray-200 cursor-pointer rounded hover:bg-gray-300"
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

        <div className="flex flex-col items-center mt-8">
          <button
            onClick={handleLogout}
            className="flex border border-red-500 items-center justify-center gap-2 cursor-pointer text-red-500 hover:bg-[#d9362b] shadow-md text-sm font-bold font-poppins w-1/2 py-2 rounded-lg transition"
          >
            <MdPowerSettingsNew  size={18} />
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
