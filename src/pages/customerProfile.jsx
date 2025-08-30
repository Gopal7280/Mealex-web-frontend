
import React, { useEffect, useState, useRef } from 'react';
import Navbar2 from '../layouts/Navbar2';
import { apiGet, apiPost } from '../services/api';
import { useNavigate } from 'react-router-dom';
import storage from '../utils/storage';
import CustomerHeader from '../layouts/CustomerHeader';

const CustomerProfileDetails = () => {
  const [profile, setProfile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await apiGet('/customer/profile/complete');
        setProfile(res?.data);
      } catch (error) {
        console.error('❌ Failed to fetch profile:', error);
      }
    };
    fetchProfile();
  }, []);

  
const handleLogout = () => {
  // 🔹 Clear your app storage
  storage.clear();
  localStorage.clear();
  sessionStorage.clear();

  // 🔹 Razorpay cleanup
  if (window.Razorpay) {
    delete window.Razorpay; 
  }

  // 🔹 Hard reload to ensure old Razorpay instance is flushed
  window.location.replace('/login'); 
};


  const triggerFileInput = () => fileInputRef.current?.click();


  const handleFileChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('image', file);

  try {
    setUploading(true);
    const response = await apiPost('/customer/profile/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    if (response?.data?.success) {
      // ✅ Get updated image from backend
      const newUrl =
        response.data?.data?.profileImage || response.data?.profileImage;

      console.log('🆕 Updated Customer Image URL:', newUrl);

      // ✅ Update local state so UI updates instantly
      setProfile((prev) => ({
        ...prev,
        profileImage: `${newUrl}?t=${Date.now()}`, // cache busting
      }));
    } else {
      console.error('⚠️ Upload failed:', response);
    }
  } catch (err) {
    console.error('❌ Failed to upload image:', err);
  } finally {
    setUploading(false);
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
    <div className="flex h-screen bg-[#F9F4F0]">
      <Navbar2 />
      {/* <div className="flex-1 p-6 overflow-y-auto bg-[#f9f4f0] min-h-screen"> */}
      <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-green-50 overflow-y-auto">
        <CustomerHeader />
        <h2 className="text-2xl font-bold font-poppins text-[#232325D1] mb-2">
          Profile Details
        </h2>

        <div className="bg-white shadow-md rounded-2xl p-6">
          <div className="w-full flex sm:flex-row items-center gap-6">
            {/* <div className="relative">
              <img
                src={profile.profileImage || 'https://via.placeholder.com/150'}
                alt="Profile"
                className="w-32 h-32 rounded-xl object-cover border-4 border-orange-400"
              />
              <button
                onClick={triggerFileInput}
                className="absolute bottom-0 left-0 bg-orange-500 text-white text-xs px-2 py-1 border border-white rounded-full hover:bg-orange-600"
              >
                {uploading ? 'Uploading...' : 'Edit'}
              </button>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="hidden"
              />
            </div> */}
            <div className="relative w-32 h-32">
  <img
    src={profile.profileImage || 'https://via.placeholder.com/150'}
    alt="Profile"
    className="w-full h-full rounded-xl object-cover  "
  />

  {/* Hover overlay */}
  <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 hover:opacity-100 rounded-xl cursor-pointer transition">
    <span className="text-white text-xs font-semibold px-2 py-1 border border-white rounded">
      {uploading ? 'Uploading...' : 'Edit Image'}
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


            <div>
              <h2 className="text-2xl font-semibold font-poppins text-[#393939]">
                {profile.customerName || 'Unnamed'}
              </h2>
              <p className="text-gray-500 font-poppins">
                {profile.identifier || ''}
              </p>
            </div>
          </div>

          {/* Details */}
          <div className="flex justify-between w-full gap-2 font-poppins text-[#535353] mt-8">
            <div className="flex flex-col items-start space-y-8 w-1/2 md:pl-4 pl-1">
              <p className="font-medium text-xl">Email:</p>
              <p className="font-medium text-xl">Contact:</p>
              <p className="font-medium text-xl">Gender:</p>
              <p className="font-medium text-xl">DOB:</p>
              <p className="font-medium text-xl">City:</p>
              <p className="font-medium text-xl">Pincode:</p>
              <p className="font-medium text-xl">Associated Messes:</p>
            </div>

            <div className="flex flex-col items-end space-y-8 w-1/2 md:pr-4 pr-1 text-xl text-gray-600">
              <p>{profile.contactEmail || 'N/A'}</p>
              <p>{profile.contactNumber || 'N/A'}</p>
              <p>{profile.gender || 'Not Provided'}</p>
              <p>{profile.dateofbirth || 'Not Provided'}</p>
              <p>{profile.city || 'N/A'}</p>
              <p>{profile.pincode || 'N/A'}</p>
              <p>{profile.mess_ids?.length || 0} connected</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center mt-8">
          <button
            onClick={handleLogout}
            className="border border-[#EA4335] text-[#EA4335] text-sm font-bold font-poppins w-1/2 py-2 rounded-lg"
          >
            LOG OUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfileDetails;
