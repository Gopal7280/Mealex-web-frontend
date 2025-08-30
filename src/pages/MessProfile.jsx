


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../layouts/Navbar';
import OwnerHeader from './ownerHeader';
import { apiGet, apiPost } from '../services/api';
import storage from '../utils/storage';


const MessProfile = () => {
  const [owner, setOwner] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
const fileInputRef = React.useRef(null);

  const navigate = useNavigate();


  const fetchOwner = async () => {
  setIsLoading(true);
  try {
    const res = await apiGet('/owner/profile');
    console.log('Full:', res);
    console.log('data:', res.data);
    console.log('data.data:', res.data);

    const payload = res.data || res.data?.owner || null;
    setOwner(payload);
  } catch(e) {
    console.error(e);
    setOwner(null);
  } finally {
    setIsLoading(false);
  }
};


const handleFileChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('image', file);

  try {
    setUploading(true);

    const res = await apiPost('/owner/profile/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    if (res?.data?.success) {
      // ✅ Backend sends inside res.data.data
      const newUrl =
        res.data?.data?.profileImage || res.data?.profileImage;

      console.log('🆕 Updated Profile Image URL:', newUrl);

      // ✅ Update state immediately with cache-busting
      setOwner((prev) => ({
        ...prev,
        profileImage: `${newUrl}?t=${Date.now()}`
      }));
    } else {
      console.error('⚠️ Upload failed, response:', res);
    }
  } catch (err) {
    console.error('❌ Image upload failed:', err);
  } finally {
    setUploading(false);
  }
};



  useEffect(() => {
    fetchOwner();
  }, []);

  const handleSwitch = () => navigate('/customer-profile');
  // const handleLogout = () => {
  //   storage.clear();
  //   navigate('/login');
  // };

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



  return (
    <div className="flex h-screen">
      <Navbar />
      {/* <div className="flex-1 p-6 overflow-y-auto bg-[#f9f4f0] min-h-screen"> */}
      <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-green-50 overflow-y-auto">
        <OwnerHeader />
        <div className="px-10 py-6">
         <h2 className="text-2xl font-semibold text-gray-800 mb-4">Mess Profile</h2>

          {isLoading ? (
            <div className="text-center p-4 text-gray-500">Loading profile...</div>
          ) : !owner ? (
            <div className="text-center p-4 text-red-500">Profile not found</div>
          ) : (
            <div className="bg-white rounded shadow p-6 border max-w-3xl">
             
              {/* <div className="relative flex items-center gap-4 mb-6">
  <img
    src={owner.profileImage || '/default-avatar.png'}
    alt={owner.ownerName || 'profile'}
    className="w-24 h-24 rounded-full border object-cover"
  />

  <input
    type="file"
    accept="image/*"
    ref={fileInputRef}
    className="hidden"
    onChange={handleFileChange}
  />

  
</div> */}
<div className="relative flex items-center gap-4 mb-6">
  {/* Profile Image with hover overlay */}
  <div className="relative w-28 h-28">
    <img
      src={owner.profileImage || '/default-avatar.png'}
      alt={owner.ownerName || 'profile'}
      className="w-full h-full rounded-full border object-cover"
    />

    {/* Overlay on hover */}
    <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 hover:opacity-100 rounded-full cursor-pointer transition">
      <span className="text-white text-xs font-semibold px-2 py-1 border border-white rounded">
        Edit Image
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

  {/* Text loader when uploading */}
  {uploading && (
    <p className="text-orange-600 text-sm font-semibold">Uploading...</p>
  )}
</div>




              {/* Info Rows */}
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                <div><strong>Name:</strong> {owner.ownerName || '—'}</div>
                <div><strong>Email:</strong> {owner.contactEmail || '—'}</div>
                <div><strong>Contact:</strong> {owner.contactNumber || '—'}</div>
                <div>
                  <strong>Gender:</strong> {owner.gender || '—'}
                </div>
                <div>
                  <strong>Address:</strong> {owner.ownerAddress || '—'}
                </div>
                <div><strong>City:</strong> {owner.city || '—'}</div>
                <div><strong>State:</strong> {owner.state || '—'}</div>
                <div><strong>Pincode:</strong> {owner.pincode || '—'}</div>
                <div>
                  <strong>DOB:</strong> {owner.dateofbirth || '—'}
                </div>
                <div>
                  <strong>Mess Count:</strong> {owner.messCount || 0}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex justify-between mt-8">
                <button
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm"
                  onClick={handleSwitch}
                >
                  Switch to User Profile ↱
                </button>
                <button
                  className="border border-red-400 text-red-600 px-4 py-2 rounded text-sm hover:bg-red-50"
                  onClick={handleLogout}
                >
                  Log Out ↩
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessProfile;
