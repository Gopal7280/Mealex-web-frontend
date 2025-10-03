

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiGet } from '../services/api';
import defaultAvatar from '../assets/owner.png';
import bell from '../assets/bell-icon.png';
import storage from '../utils/storage';

const OwnerHeader = () => {
  const navigate = useNavigate();
  const [ownerName, setOwnerName] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [messName, setMessName] = useState('');
  const [messAddress, setMessAddress] = useState('');
  const selectedMess = JSON.parse(storage.getItem('selectedMess'));

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await apiGet('/owner/profile/basic');
        if (res?.success && res?.data) {
          const { ownerName, profileImage } = res.data;
          setOwnerName(ownerName || 'Owner');
          setProfileImage(profileImage || '');
        }

        if (selectedMess) {
          const { messName, address } = selectedMess;
          setMessName(messName || 'Unnamed Mess');
          setMessAddress(address || 'Address of Mess');
        }
      } catch (err) {
      }
    };

    fetchProfile();
  }, []);

  const handleNotifications = () => navigate('/notifications');
  const handleAvatarClick = () => navigate('/mess-profile');

  return (
    // <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start mb-6 gap-4 sm:gap-0">
<div className="flex justify-between items-center mb-6">
      
      {/* Left: Owner Info */}
      <div className="">
        <p className="text-sm sm:text-sm text-gray-700 font-bold">Welcome Owner,</p>
        <h2 className="text-xl sm:text-3xl font-bold text-orange-600">{ownerName}</h2>
        {/* <p className="text-sm sm:text-sm font-semibold text-gray-700"> Owner</p> */}
      </div>

      {/* Right: Mess Info + Icons */}
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
        <div className="text-center sm:text-right sm:mr-2">
          <p className="text-lg sm:text-2xl font-bold text-orange-600">{messName}</p>
          <p className="text-xs sm:text-lg text-gray-500">{messAddress}</p>
        </div>

        <div className="flex items-center gap-4">
  <img
    src={bell}
    alt="Notifications"
    className="w-10 h-10 cursor-pointer"
    onClick={handleNotifications}
  />
  <img
    src={profileImage || defaultAvatar}
    alt="Owner Avatar"
    className="w-12 h-12 object-cover border border-orange-400 cursor-pointer rounded-full"
    onClick={handleAvatarClick}
  />
</div>

      </div>
    </div>
  );
};

export default OwnerHeader;
