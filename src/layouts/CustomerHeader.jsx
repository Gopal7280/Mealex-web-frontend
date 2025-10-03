
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiGet } from '../services/api';
import bellIcon from '../assets/bell-icon.png';
import customerAvatar from '../assets/customer.png';

const CustomerHeader = () => {
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState('Customer');
  const [messName, setMessName] = useState('Subscribed Mess');
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await apiGet('/customer/profile/basic');
        if (res?.success && res?.data) {
          const { customerName, messes, profileImage } = res.data;

          setCustomerName(customerName || 'Customer');
          setProfileImage(profileImage || '');

          if (Array.isArray(messes) && messes.length > 0) {
            const firstMess = messes[0];
            setMessName(firstMess.messName || 'Subscribed Mess');
          }
        }
      } catch (err) {
      }
    };

    fetchProfile();
  }, []);

  const handleNotifications = () => navigate('/customer-notifications');
  const handleAvatarClick = () => navigate('/customer-profile');

  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        {/* <p className="text-sm text-slate-800 font-medium">Welcome Customer,</p> */}
         <p className="text-sm sm:text-sm text-gray-700 font-bold">Welcome Customer,</p>

        <p className="text-3xl font-bold text-orange-600">{customerName}</p>
        {/* <p className="text-sm text-green-600 px-1">(Customer)</p> */}
      </div>

      <div className="flex items-center gap-4">
        <img
          src={bellIcon}
          alt="Notifications"
          className="w-10 h-10 cursor-pointer"
          onClick={handleNotifications}
        />
        <img
          src={profileImage || customerAvatar}
          alt="Customer Avatar"
          className="w-12 h-12 object-cover border border-orange-400 cursor-pointer rounded-full"
          onClick={handleAvatarClick}
        />
      </div>
    </div>
  );
};

export default CustomerHeader;
