


import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../layouts/Navbar';
import OwnerHeader from './ownerHeader';
import { apiGet } from '../services/api';
import storage from '../utils/storage';

const VALID_TABS = ['profile', 'plans', 'history'];

const CustomerProfile = () => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { tab = 'profile' } = useParams();

  const activeTab = VALID_TABS.includes(tab) ? tab : 'profile';

  useEffect(() => {
    const messId = storage.getItem('messId');
    const customerId = storage.getItem('customerId');

    if (!messId || !customerId) {
      setIsLoading(false);
      return;
    }

    apiGet(`/owner/mess/${messId}/customer/${customerId}`)
      // .then(res => setProfile(res.customer ?? res.data?.customer ?? null))
  .then(res => {
    console.log("✅ API response:", res);   // 👈 log full response
    setProfile(res.customer ?? res.data?.customer ?? null);
  })

      .catch(() => setProfile(null))
      .finally(() => setIsLoading(false));
      console.log('🔑 Fetching with IDs:', { messId, customerId });
      console.log('✅ API response:', );
  }, []);


  
  if (isLoading) return <div className="text-center mt-10 text-gray-500">Loading Customer Profile...</div>;
  if (!profile) return <div className="text-center mt-10 text-red-500">Profile not found</div>;

  return (
    <div className="flex h-screen">
      <Navbar />
      {/* <div className="flex-1 overflow-y-auto bg-[#f9f5f0] min-h-screen"> */}
      <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-green-50 overflow-y-auto">
        <div >
          <OwnerHeader />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Customer Profile</h2>

          <div className="bg-white rounded-lg ">
            <div className="flex gap-6 mb-2 p-4 pb-2">
              <TabButton label="Profile Details" active={activeTab === 'profile'} onClick={() => navigate('/owner-customer-profile')} />
              <TabButton label="Plans" active={activeTab === 'plans'} onClick={() => navigate('/customer-profile/plans')} />
              <TabButton label="History" active={activeTab === 'history'} onClick={() => navigate('/customer-profile/history')} />
            </div>

            {activeTab === 'profile' && <ProfileDetails profile={profile} />}
            {activeTab === 'plans' && <div className="p-4 text-gray-600">🗂️ Plans content here</div>}
            {activeTab === 'history' && <div className="p-4 text-gray-600">📜 History content here</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

const TabButton = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`capitalize text-md font-medium transition-opacity ${
      active
        ? 'opacity-100 text-orange-600 border-b-2 border-orange-500'
        : 'opacity-50 hover:opacity-80'
    }`}
  >
    {label}
  </button>
);



const ProfileDetails = ({ profile }) => {
  const {
    profileImage,
    customerName,
    contactEmail,
    contactNumber,
    customerAddress,
    city,
    state,
    pincode,
    gender,
    dateofbirth,
    isActive
  } = profile;

  return (
    <div className="bg-white px-6 flex flex-col md:flex-row gap-6 items-start">
      <div className="w-full  flex-shrink-0 p-2">
        <div className="flex flex-row gap-4">
          <img
            src={profileImage || '/default-avatar.png'}
            alt={customerName}
            className="w-32 h-32 rounded-lg border mb-4 mt-2 border-orange-500 object-cover"
          />
          <div>
            <p className="text-3xl text-[#393939] font-semibold font-poppins">
              {customerName}
            </p>
            <span className={`text-xl ${isActive ? 'text-[#34A853]' : 'text-red-500'}`}>
              {isActive ? '((.)) Active' : 'Inactive'}
            </span>
          </div>
        </div>

        {/* Two-column layout for details */}
        <div className="flex justify-between w-full gap-2 font-poppins text-[#535353] mt-8">
          {/* Left column: labels */}
          <div className="flex flex-col items-start space-y-6 w-1/2 md:pl-4 pl-1 text-lg">
            <p>Name:</p>
            <p>Email:</p>
            <p>Contact:</p>
            <p>Address:</p>
            <p>City:</p>
            <p>State:</p>
            <p>Pincode:</p>
            <p>Gender:</p>
            <p>DOB:</p>
          </div>

          {/* Right column: values */}
          <div className="flex flex-col items-end space-y-6 w-1/2 md:pr-4 pr-1 text-lg text-gray-600">
            <p>{customerName || '—'}</p>
            <p>{contactEmail || '—'}</p>
            <p>{contactNumber || 'N/A'}</p>
            <p>{customerAddress || '—'}</p>
            <p>{city || '—'}</p>
            <p>{state || '—'}</p>
            <p>{pincode || '—'}</p>
            <p>{gender || '—'}</p>
            <p>{dateofbirth || '—'}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-4">
          <button className="bg-orange-500 text-white font-poppins px-4 py-2 rounded-md hover:bg-orange-600">
            Switch to User Profile ⮞
          </button>
          <button className="border border-red-500 text-red-500 font-poppins px-4 py-2 rounded-md hover:bg-red-50">
            Log Out ⮞
          </button>
        </div>
      </div>
    </div>
  );
};

const Detail = ({ label, value }) => (
  <div className="flex justify-between border-b pb-1">
    <span className="font-medium">{label}</span>
    <span className="text-right">{value}</span>
  </div>
);

export default CustomerProfile;
