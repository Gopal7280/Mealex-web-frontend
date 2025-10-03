


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
  .then(res => {
    setProfile(res.customer ?? res.data?.customer ?? null);
  })

      .catch(() => setProfile(null))
      .finally(() => setIsLoading(false));
  }, []);


  
  if (isLoading) return <div className="text-center mt-10 text-gray-500">Loading Customer Profile...</div>;
  if (!profile) return <div className="text-center mt-10 text-red-500">Profile not found</div>;

  return (
    <div className="flex h-screen">
      <Navbar />
      {/* <div className="flex-1 overflow-y-auto bg-[#f9f5f0] min-h-screen"> */}
      <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-gray-50 overflow-y-auto">
        <div >
          <OwnerHeader />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Customer Profile</h2>

          <div className="bg-white rounded-lg ">
            <div className="flex gap-6  mb-2 p-4 pb-2">
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
    className={`capitalize text-md font-medium cursor-pointer transition-opacity ${
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

  const details = [
    { label: "Name", value: customerName || "—" },
    { label: "Email", value: contactEmail || "—" },
    { label: "Contact", value: contactNumber || "N/A" },
    { label: "Address", value: customerAddress || "—" },
    { label: "City", value: city || "—" },
    { label: "State", value: state || "—" },
    { label: "Pincode", value: pincode || "—" },
    { label: "Gender", value: gender || "—" },
    { label: "DOB", value: dateofbirth || "—" },
  ];

  return (
    <div className="bg-white px-4 md:px-6 flex flex-col md:flex-row gap-4 md:gap-6 items-start">
      <div className="w-full flex-shrink-0 p-2">
        {/* Header: image + name */}
        <div className="flex flex-col md:flex-row gap-4 items-center md:items-start">
          <img
            src={profileImage || "/default-avatar.png"}
            alt={customerName}
            className="w-24 h-24 md:w-32 md:h-32 rounded-lg border mb-2 md:mb-4 border-orange-500 object-cover"
          />
          <div className="text-center md:text-left">
            <p className="text-2xl md:text-3xl text-[#393939] font-semibold font-poppins">
              {customerName}
            </p>
            <span
              className={`text-lg md:text-xl ${
                isActive ? "text-[#34A853]" : "text-red-500"
              }`}
            >
              {isActive ? "((.)) Active" : "Inactive"}
            </span>
          </div>
        </div>

        {/* Label + Value pairs */}
        <div className="mt-6 md:mt-8 space-y-4 md:space-y-2">
          {details.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col md:flex-row md:justify-between  pb-2 md:pb-1"
            >
              <span className="font-medium text-gray-700">{item.label}:</span>
              <span className="text-gray-600 md:text-right">{item.value}</span>
            </div>
          ))}
        </div>

        {/* Buttons */}
        
      </div>
    </div>
  );
};


// const Detail = ({ label, value }) => (
//   <div className="flex justify-between border-b pb-1">
//     <span className="font-medium">{label}</span>
//     <span className="text-right">{value}</span>
//   </div>
// );

export default CustomerProfile;
