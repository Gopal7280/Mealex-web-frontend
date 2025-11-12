// Working Without language modal

// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { apiGet } from '../services/api';
// import bellIcon from '../assets/bell-icon.png';
// import customerAvatar from '../assets/customer.png';
// import storage from '../utils/storage';

// const CustomerHeader = () => {
//   const navigate = useNavigate();
//   const [customerName, setCustomerName] = useState('Customer');
//   const [messName, setMessName] = useState('Subscribed Mess');
//   const [profileImage, setProfileImage] = useState('');

//   useEffect(() => {
//     const storedHeader = storage.getItem('customerHeaderData');

//     if (storedHeader) {
//       const parsed = JSON.parse(storedHeader);
//       setCustomerName(parsed.customerName || 'Customer');
//       setProfileImage(parsed.profileImage || '');
//       setMessName(parsed.messName || 'Subscribed Mess');
//     } else {
//       fetchAndStoreHeaderData();
//     }
//   }, []);

//   const fetchAndStoreHeaderData = async () => {
//     try {
//       const res = await apiGet('/customer/profile/basic');
//       if (res?.success && res?.data) {
//         const { customerName: nameVal, messes, profileImage: imgVal } = res.data;

//         const finalCustomerName = nameVal || 'Customer';
//         const finalProfileImage = imgVal || '';
//         const finalMessName =
//           Array.isArray(messes) && messes.length > 0
//             ? messes[0].messName || 'Subscribed Mess'
//             : 'Subscribed Mess';

//         const headerData = {
//           customerName: finalCustomerName,
//           profileImage: finalProfileImage,
//           messName: finalMessName,
//         };

//         storage.setItem('customerHeaderData', JSON.stringify(headerData));

//         setCustomerName(finalCustomerName);
//         setProfileImage(finalProfileImage);
//         setMessName(finalMessName);
//       }
//     } catch (err) {}
//   };

//   const handleNotifications = () => navigate('/customer-notifications');
//   const handleAvatarClick = () => navigate('/customer-profile');

//   return (
//     <div className="flex justify-between items-center mb-6">
//       {/* Left Section */}
//       <div>
      
//         <p className="text-sm sm:text-sm text-gray-700 font-bold">Welcome Customer,</p>

// {/* <p className="text-2xl sm:text-3xl font-bold text-orange-600">
//   {customerName}
// </p> */}
//         <h2 className="text-xl sm:text-3xl font-bold text-orange-600">{customerName}</h2>

//       </div>

//       {/* Right Section */}
//       <div className="flex items-center gap-4">
        
      
//         <img
//           src={bellIcon}
//           alt="Notifications"
//           className="w-12 h-12 cursor-pointer"
//           onClick={handleNotifications}
//         />
//         <img
//           src={profileImage || customerAvatar}
//           alt="Customer Avatar"
//           // className="w-12 h-12 object-cover border border-orange-400 cursor-pointer rounded-full"
//   className="w-14 h-14 object-cover border border-orange-400 cursor-pointer rounded-full mr-6 sm:mr-0"

//           onClick={handleAvatarClick}
//         />
//       </div>
//     </div>
//   );
// };

// export default CustomerHeader;



import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiGet } from '../services/api';
import bellIcon from '../assets/bell-icon.png';
import customerAvatar from '../assets/customer.png';
import storage from '../utils/storage';
import { useTranslation } from "react-i18next";
import { FaGlobe } from "react-icons/fa";
// import LanguageModal from "../components/LanguageModal";

const CustomerHeader = () => {
  const navigate = useNavigate();
    // const { t } = useTranslation();
  const [customerName, setCustomerName] = useState('Customer');
  const [messName, setMessName] = useState('Subscribed Mess');
  const [profileImage, setProfileImage] = useState('');

  // ✅ NEW STATE: unread notification
  const [hasUnread, setHasUnread] = useState(false);
  const [langModalVisible, setLangModalVisible] = useState(false);


  useEffect(() => {
    const storedHeader = storage.getItem('customerHeaderData');

    if (storedHeader) {
      const parsed = JSON.parse(storedHeader);
      setCustomerName(parsed.customerName || 'Customer');
      setProfileImage(parsed.profileImage || '');
      setMessName(parsed.messName || 'Subscribed Mess');
    } else {
      fetchAndStoreHeaderData();
    }

    // ✅ Check notification unread
    checkNotifications();
  }, []);

  const fetchAndStoreHeaderData = async () => {
    try {
      const res = await apiGet('/customer/profile/basic');
      if (res?.success && res?.data) {
        const { customerName: nameVal, messes, profileImage: imgVal } = res.data;

        const finalCustomerName = nameVal || 'Customer';
        const finalProfileImage = imgVal || '';
        const finalMessName =
          Array.isArray(messes) && messes.length > 0
            ? messes[0].messName || 'Subscribed Mess'
            : 'Subscribed Mess';

        const headerData = {
          customerName: finalCustomerName,
          profileImage: finalProfileImage,
          messName: finalMessName,
        };

        storage.setItem('customerHeaderData', JSON.stringify(headerData));

        setCustomerName(finalCustomerName);
        setProfileImage(finalProfileImage);
        setMessName(finalMessName);
      }
    } catch (err) {}
  };

  // ✅ NEW FUNCTION: check if any unread notification exists
  const checkNotifications = async () => {
    try {
      // sirf first page se 1 record kaafi hai
      const res = await apiGet('/customer/notifications?page=1&limit=1');

      if (res?.success && res.notifications?.length > 0) {
        const first = res.notifications[0];

        // ✅ check isRead === false
        if (first.isRead === false) {
          setHasUnread(true);
        } else {
          setHasUnread(false);
        }
      } else {
        setHasUnread(false);
      }
    } catch (err) {
      setHasUnread(false);
    }
  };

  const handleNotifications = () => {
    setHasUnread(false); // Optional: open karte hi dot hide
    navigate('/customer-notifications');
  };

  const handleAvatarClick = () => navigate('/customer-profile');

  return (
    <div className="flex justify-between items-center mb-6">

      {/* Left Section */}
      <div>
        <p className="text-sm sm:text-sm text-gray-700 font-bold">Welcome Customer,</p>
        <h2 className="text-xl sm:text-3xl font-bold text-orange-600">{customerName}</h2>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
 {/* <div className="relative">
  <FaGlobe
    className="text-3xl text-gray-700 cursor-pointer"
    onClick={() => setLangModalVisible(true)}
  />
</div> */}
        {/* ✅ Bell wrapper for dot */}
        <div className="relative">
         

          <img
            src={bellIcon}
            alt="Notifications"
            className="w-12 h-12 cursor-pointer"
            onClick={handleNotifications}
          />

          {/* ✅ Red Dot */}
          {hasUnread && (
            <span
              className="absolute"
              style={{
                bottom: "0",       // image ke niche
                left: "50%",
                transform: "translateX(-50%)",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "red",
                boxShadow: "0 0 0 2px white"
              }}
            />
          )}
        </div>

        <img
          src={profileImage || customerAvatar}
          alt="Customer Avatar"
          className="w-14 h-14 object-cover border border-orange-400 cursor-pointer rounded-full mr-6 sm:mr-0"
          onClick={handleAvatarClick}
        />
      </div>
      {/* <LanguageModal 
  visible={langModalVisible}
  onClose={() => setLangModalVisible(false)}
/> */}

    </div>
  );
};

export default CustomerHeader;


// Working with Language modal

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { apiGet } from "../services/api";
// import bellIcon from "../assets/bell-icon.png";
// import customerAvatar from "../assets/customer.png";
// import storage from "../utils/storage";
// import { Globe } from "lucide-react"; // 🌐 NEW ICON
// import LanguageModal from "./LanguageModal"; // 🌐 LANGUAGE MODAL

// const CustomerHeader = () => {
//   const navigate = useNavigate();
//   const [customerName, setCustomerName] = useState("Customer");
//   const [messName, setMessName] = useState("Subscribed Mess");
//   const [profileImage, setProfileImage] = useState("");
//   const [showLangModal, setShowLangModal] = useState(false); // 🌐 STATE

//   useEffect(() => {
//     const storedHeader = storage.getItem("customerHeaderData");

//     if (storedHeader) {
//       const parsed = JSON.parse(storedHeader);
//       setCustomerName(parsed.customerName || "Customer");
//       setProfileImage(parsed.profileImage || "");
//       setMessName(parsed.messName || "Subscribed Mess");
//     } else {
//       fetchAndStoreHeaderData();
//     }
//   }, []);

//   const fetchAndStoreHeaderData = async () => {
//     try {
//       const res = await apiGet("/customer/profile/basic");
//       if (res?.success && res?.data) {
//         const { customerName: nameVal, messes, profileImage: imgVal } = res.data;

//         const finalCustomerName = nameVal || "Customer";
//         const finalProfileImage = imgVal || "";
//         const finalMessName =
//           Array.isArray(messes) && messes.length > 0
//             ? messes[0].messName || "Subscribed Mess"
//             : "Subscribed Mess";

//         const headerData = {
//           customerName: finalCustomerName,
//           profileImage: finalProfileImage,
//           messName: finalMessName,
//         };

//         storage.setItem("customerHeaderData", JSON.stringify(headerData));

//         setCustomerName(finalCustomerName);
//         setProfileImage(finalProfileImage);
//         setMessName(finalMessName);
//       }
//     } catch (err) {}
//   };

//   const handleNotifications = () => navigate("/customer-notifications");
//   const handleAvatarClick = () => navigate("/customer-profile");

//   return (
//     <>
//       {/* 🌐 Language Modal */}
//       <LanguageModal visible={showLangModal} onClose={() => setShowLangModal(false)} />

//       <div className="flex justify-between items-center mb-6">
//         {/* Left Section */}
//         <div>
//           <p className="text-sm sm:text-sm text-gray-700 font-bold">
//             Welcome Customer,
//           </p>
//           <h2 className="text-xl sm:text-3xl font-bold text-orange-600">
//             {customerName}
//           </h2>
//         </div>

//         {/* Right Section */}
//         <div className="flex items-center gap-4">
//           {/* 🌐 Language Icon */}
//           <Globe
//             className="w-8 h-8 text-gray-700 cursor-pointer hover:text-orange-500"
//             onClick={() => setShowLangModal(true)}
//             title="Change Language"
//           />

//           <img
//             src={bellIcon}
//             alt="Notifications"
//             className="w-12 h-12 cursor-pointer"
//             onClick={handleNotifications}
//           />
//           <img
//             src={profileImage || customerAvatar}
//             alt="Customer Avatar"
//             className="w-14 h-14 object-cover border border-orange-400 cursor-pointer rounded-full mr-6 sm:mr-0"
            
//             onClick={handleAvatarClick}
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default CustomerHeader;



// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { apiGet } from "../services/api";
// import bellIcon from "../assets/bell-icon.png";
// import customerAvatar from "../assets/customer.png";
// import storage from "../utils/storage";
// import { Globe } from "lucide-react";
// import LanguageModal from "./LanguageModal";
// import { useTranslation } from "react-i18next"; // ✅ NEW

// const CustomerHeader = () => {
//   const navigate = useNavigate();
//   const [customerName, setCustomerName] = useState("Customer");
//   const [messName, setMessName] = useState("Subscribed Mess");
//   const [profileImage, setProfileImage] = useState("");
//   const [showLangModal, setShowLangModal] = useState(false);

//   const { t, i18n } = useTranslation(); // ✅ INIT TRANSLATION

//   useEffect(() => {
//     const storedHeader = storage.getItem("customerHeaderData");

//     if (storedHeader) {
//       const parsed = JSON.parse(storedHeader);
//       setCustomerName(parsed.customerName || "Customer");
//       setProfileImage(parsed.profileImage || "");
//       setMessName(parsed.messName || t("subscribed_mess"));
//     } else {
//       fetchAndStoreHeaderData();
//     }
//   }, []);

//   const fetchAndStoreHeaderData = async () => {
//     try {
//       const res = await apiGet("/customer/profile/basic");
//       if (res?.success && res?.data) {
//         const { customerName: nameVal, messes, profileImage: imgVal } = res.data;

//         const finalCustomerName = nameVal || "Customer";
//         const finalProfileImage = imgVal || "";
//         const finalMessName =
//           Array.isArray(messes) && messes.length > 0
//             ? messes[0].messName || t("subscribed_mess")
//             : t("subscribed_mess");

//         const headerData = {
//           customerName: finalCustomerName,
//           profileImage: finalProfileImage,
//           messName: finalMessName
//         };

//         storage.setItem("customerHeaderData", JSON.stringify(headerData));

//         setCustomerName(finalCustomerName);
//         setProfileImage(finalProfileImage);
//         setMessName(finalMessName);
//       }
//     } catch (err) {}
//   };

//   const handleNotifications = () => navigate("/customer-notifications");
//   const handleAvatarClick = () => navigate("/customer-profile");

//   // 🌐 Language Switch Handler
//   const handleLanguageChange = (lang) => {
//     i18n.changeLanguage(lang);
//   };

//   return (
//     <>
//       <LanguageModal visible={showLangModal} onClose={() => setShowLangModal(false)} />

//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <p className="text-sm sm:text-sm text-gray-700 font-bold">
//             {t("welcome_customer")}
//           </p>
//           <h2 className="text-xl sm:text-3xl font-bold text-orange-600">
//             {customerName}
//           </h2>
//         </div>

//         <div className="flex items-center gap-4">
//           <Globe
//             className="w-8 h-8 text-gray-700 cursor-pointer hover:text-orange-500"
//             onClick={() => setShowLangModal(true)}
//             title="Change Language"
//           />
//           <button onClick={() => handleLanguageChange("en")}>EN</button>
//           <button onClick={() => handleLanguageChange("hi")}>हिं</button>
//           <img
//             src={bellIcon}
//             alt="Notifications"
//             className="w-12 h-12 cursor-pointer"
//             onClick={handleNotifications}
//           />
//           <img
//             src={profileImage || customerAvatar}
//             alt="Customer Avatar"
//             className="w-14 h-14 object-cover border border-orange-400 cursor-pointer rounded-full mr-6 sm:mr-0"
//             onClick={handleAvatarClick}
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default CustomerHeader;
