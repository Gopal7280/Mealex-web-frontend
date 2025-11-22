

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiGet } from '../services/api';
import defaultAvatar from '../assets/owner.png';
import bell from '../assets/bell-icon.png';
import storage from '../utils/storage';
import { useTranslation } from "react-i18next";
import { FaGlobe } from 'react-icons/fa'
// import LanguageModal from '../components/LanguageModal'

const OwnerHeader = () => {
  const navigate = useNavigate();
    // const { t } = useTranslation();
  const [ownerName, setOwnerName] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [messName, setMessName] = useState('');
  const [messAddress, setMessAddress] = useState('');
  // const [langModalVisible, setLangModalVisible] = useState(false)

  // 🔥 NEW STATE for unread notification
  const [hasUnread, setHasUnread] = useState(false);

  useEffect(() => {
    const storedHeader = storage.getItem('ownerHeaderData');

    if (storedHeader) {
      const parsed = JSON.parse(storedHeader);
      setOwnerName(parsed.ownerName || 'Owner');
      setProfileImage(parsed.profileImage || '');
      setMessName(parsed.messName || 'Unnamed Mess');
      setMessAddress(parsed.messAddress || 'Address of Mess');
    } else {
      fetchAndStoreHeaderData();
    }

    // ✅ Call notification check on mount
    checkUnreadNotifications();
  }, []);

  // Existing function
  const fetchAndStoreHeaderData = async () => {
    try {
      const res = await apiGet('/owner/profile/basic');
      const selectedMess = JSON.parse(storage.getItem('selectedMess'));

      const ownerNameVal = res?.data?.ownerName || 'Owner';
      const profileImageVal = res?.data?.profileImage || '';
      const messNameVal = selectedMess?.messName || 'Unnamed Mess';
      const messAddressVal = selectedMess?.address || 'Address of Mess';

      const headerData = {
        ownerName: ownerNameVal,
        profileImage: profileImageVal,
        messName: messNameVal,
        messAddress: messAddressVal,
      };

      storage.setItem('ownerHeaderData', JSON.stringify(headerData));

      setOwnerName(ownerNameVal);
      setProfileImage(profileImageVal);
      setMessName(messNameVal);
      setMessAddress(messAddressVal);
    } catch (err) {}
  };

  // ✅ NEW function for checking unread notifications
  const checkUnreadNotifications = async () => {
    try {
      const selectedMess = JSON.parse(storage.getItem('selectedMess'));
      let res;

      if (selectedMess?.messId === 'all' || !selectedMess?.messId) {
        res = await apiGet(`/owner/notifications?page=1&limit=1`);
      } else {
        res = await apiGet(`/owner/mess/${selectedMess.messId}/notifications?page=1&limit=1`);
      }

      const list = res?.notifications || [];

      // Check first notification OR check if any unread exists
      const unreadExists = list.some(n => n.isRead === false);

      setHasUnread(unreadExists);
    } catch (err) {
      setHasUnread(false);
    }
  };

  const handleNotifications = () => {
    navigate('/notifications');

    // ✅ clear unread dot on open if you want
    setHasUnread(false);
  };

  const handleAvatarClick = () => navigate('/mess-profile');

  return (
    <div className="flex justify-between items-center mb-6">
      {/* Left: Owner Info */}
      <div>
        <p className="text-sm sm:text-sm text-gray-700 font-bold">welcome Owner,</p>
        <h2 className="text-xl sm:text-3xl font-bold text-orange-500">{ownerName}</h2>
      </div>

      {/* Right: Mess Info + Icons */}
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
        <div className="text-center sm:text-right sm:mr-2">
          <p className="text-lg sm:text-2xl font-bold text-green-700">{messName}</p>
          <p className="text-xs sm:text-lg text-gray-500">{messAddress}</p>
        </div>

        <div className="flex items-center gap-4 relative">
          {/* <div className="relative">
            <FaGlobe
              className="text-3xl text-gray-700 cursor-pointer"
              onClick={() => setLangModalVisible(true)}
            />
          </div> */}

          {/* ✅ Notification Icon with Red Dot */}
          <div className="relative">
            <img
              src={bell}
              alt="Notifications"
              className="w-12 h-12 cursor-pointer"
              onClick={handleNotifications}
            />

            {hasUnread && (
              <span
                className="absolute"
                style={{
                  bottom: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 10,
                  height: 10,
                  backgroundColor: 'red',
                  borderRadius: '50%',
                  boxShadow: '0 0 0 1px white',
                }}
              ></span>
            )}
          </div>

          <img
            src={profileImage || defaultAvatar}
            alt="Owner Avatar"
            className="w-14 h-14 object-cover border border-orange-400 cursor-pointer rounded-full"
            onClick={handleAvatarClick}
          />
        </div>
      </div>
        {/* <LanguageModal
        visible={langModalVisible}
        onClose={() => setLangModalVisible(false)}
      /> */}
    </div>
  );
};

export default OwnerHeader;

