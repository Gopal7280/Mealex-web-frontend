// // // components/DashboardHeader.jsx
// // import React from 'react';
// // import { Bell } from 'lucide-react';
// // // import avatar from '../assets/379fa9cf-ecec-499d-bbda-0f56e012da4d.png'; // your logo file

// // const ownerHeader = ({ ownerName, messName }) => {
// //   return (
// //     <div className="flex justify-between items-center mb-6">
// //       <div>
// //         <p className="text-sm text-black">Welcome,</p>
// //         <p className="text-3xl font-bold text-orange-600">{ownerName}</p>
// //       </div>
// //       <div className="flex items-center gap-4">
// //         <Bell className="text-gray-500" />
// //         <div className="text-sm text-gray-600">
// //           Mess Owner, <span className="text-orange-600 font-bold">{messName}</span>
// //         </div>
// //         {/* <img
// //           src={avatar}
// //           alt="avatar"
// //           className="w-10 h-10 rounded-full border border-orange-400"
// //         /> */}
// //       </div>
// //     </div>
// //   );
// // };

// // export default ownerHeader;

// // components/DashboardHeader.jsx

// import React from 'react';
// import { Bell } from 'lucide-react';
// // import avatar from '../assets/419fceb1-f73a-4787-9a22-8cb0a296ec30.png'; // your uploaded image

// const ownerHeader = ({ ownerName = 'Owner Name', messName = 'Test Mess 1' }) => {
//   return (
//     <div className="flex justify-between items-center mb-6">
//       {/* Welcome Text */}
//       <div>
//         <p className="text-sm text-black">Welcome,</p>
//         <p className="text-3xl font-bold text-orange-600">{ownerName}</p>
//       </div>

//       {/* Bell, Mess Info, Avatar */}
//       <div className="flex items-center gap-4">
//         <Bell className="text-gray-500" />
//         <div className="text-sm text-gray-600">
//           Mess Owner, <span className="text-orange-600 font-bold">{messName}</span>
//         </div>
//         {/* <img
//           src={avatar}
//           alt="logo"
//           className="w-10 h-10 rounded-full object-cover"
//         /> */}
//       </div>
//     </div>
//   );
// };

// export default ownerHeader;



// import React from 'react';
// import { Bell } from 'lucide-react';
// // import avatar from '../assets/4da8ef37-9c6e-4c2c-9311-18a42bda9453.png'; // ✅ Use your correct image path

// const OwnerHeader = ({ ownerName = 'Owner Name', messName = 'Test Mess 1' }) => {
//   return (
//     <div className="flex justify-between items-center mb-6">
//       {/* Left Side: Welcome */}
//       <div>
//         <p className="text-sm text-gray-900">Welcome,</p>
//         <p className="text-3xl font-bold text-orange-600">{ownerName}</p>
//       </div>

//       {/* Right Side: Bell + Mess Info + Avatar */}
//       <div className="flex items-center gap-4">
//         <div className="w-10 h-10 bg-gray-100 flex items-center justify-center rounded-full shadow">
//           <Bell className="text-gray-500 w-5 h-5" />
//         </div>
//         <p className="text-sm text-gray-700 font-medium">
//           Mess Owner, <span className="text-orange-600 font-bold">{messName}</span>
//         </p>
//         {/* <img
//           src={avatar}
//           alt="avatar"
//           className="w-10 h-10 rounded-full border-2 border-orange-400 object-cover"
//         /> */}
//       </div>
//     </div>
//   );
// };

// export default OwnerHeader;

// import React from 'react';
// import { Bell } from 'lucide-react';
// import avatar from '../assets/owner.png'; // ✅ your uploaded chef image

// const OwnerHeader = ({ ownerName = 'Owner Name', messName = 'Test Mess 1' }) => {
//   return (
//     <div className="flex justify-between items-center mb-6">
//       {/* Left Section */}
//       <div>
//         <p className="text-sm text-[#0F172A] font-medium">Welcome,</p>
//         <p className="text-3xl font-bold text-orange-600">{ownerName}</p>
//       </div>

//       {/* Right Section */}
//       <div className="flex items-center gap-4">
//         {/* Bell icon with background */}
//         <div className="w-10 h-10 flex items-center justify-center bg-white border rounded-lg shadow-sm">
//           <Bell className="text-gray-500 w-7 h-7" />
//         </div>

//         {/* Mess Info */}
//         <div className="text-sm">
//           <span className="text-gray-700 font-medium">Mess Owner, </span>
//           <span className="text-orange-600 font-bold">{messName}</span>
//         </div>

//         {/* Avatar */}
//         <img
//           src={avatar}
//           alt="Mess Avatar"
//           className="w-10 h-10 rounded-full border border-orange-400 object-cover"
//         />
//       </div>
//     </div>
//   );
// };

// export default OwnerHeader;



// import { Bell } from 'lucide-react';

// import { FiBell } from 'react-icons/fi'; // or any icon of your choice

// import avatar from '../assets/owner.png'; // Update with actual path
// import { useNavigate } from 'react-router-dom';
// import bell from '../assets/bell-icon.png'; // Update with actual path

// const OwnerHeader = ({ ownerName = 'Owner Name', messName = 'Test Mess 1' }) => {
//   const navigate = useNavigate();

// const HandleNotifications = () => {
//     navigate('/notifications');
// }

//   const handleAvatarClick = () => {
//     navigate('/mess-profile');
//   };
//     return (
//     <div className="flex justify-between items-center mb-6">
//       {/* Left Section: Welcome Text */}
//       <div><p className="text-base text-gray-700 font-semibold tracking-wide">
//             Mess Owner,
//           </p>
//           <p className="text-xl text-orange-600 font-bold leading-snug">
//             {messName}
//           </p>
//       </div>

//       {/* Right Section: Role and Mess Info */}
//       <div className="flex items-center gap-1">
//         {/* Bell Icon */}
//           {/* <FiBell className="text-gray-500 w-6 h-6" /> */}
//           <img src={bell} alt="Bell Icon" className="w-8 h-8" 
//           onClick={HandleNotifications}/>

//         {/* Mess Role and Name */}
//         <div className="flex flex-col items-end text-right">
          
//         </div>

//         {/* Avatar Image */}
//         <img
//           src={avatar}
//                     onClick={handleAvatarClick}

//           alt="Owner Avatar"
//           className="w-10 h-10  border border-orange-400 rounded-lg object-cover"
//         />
//       </div>
//     </div>
//   );
// };

// export default OwnerHeader;


// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { apiGet } from '../services/api';
// import defaultAvatar from '../assets/owner.png';
// import bell from '../assets/bell-icon.png';

// const OwnerHeader = () => {
//   const navigate = useNavigate();

//   const [ownerName, setOwnerName] = useState('');
//   const [messCount, setMessCount] = useState(0);
//   const [profileImage, setProfileImage] = useState('');

//   useEffect(() => {
//     const fetchOwnerData = async () => {
//       try {
//         const res = await apiGet('/owner/profile/basic');
//         console.log('🔹 Owner Profile Response:', res);

//         if (res?.success && res?.data) {
//           const { ownerName, mess_ids, profileImage } = res.data;
//           setOwnerName(ownerName || 'Owner');
//           setMessCount(mess_ids?.length || 0);
//           setProfileImage(profileImage || '');
//         }
//       } catch (error) {
//         console.error('❌ Error fetching owner profile:', error);
//       }
//     };

//     fetchOwnerData();
//   }, []);

//   const handleNotifications = () => navigate('/notifications');
//   const handleAvatarClick = () => navigate('/mess-profile');

//   return (
//     <div className="flex justify-between items-center mb-6">
//       {/* Left Section */}
//       <div>
//         <p className="text-base text-gray-700 font-semibold tracking-wide">Welcome,</p>
//         <p className="text-xl text-orange-600 font-bold leading-snug">{ownerName}</p>
//         <p className="text-sm text-gray-500">{messCount} Mess{messCount !== 1 && 'es'} Linked</p>
//       </div>

//       {/* Right Section */}
      // <div className="flex items-center gap-3">
      //   <img
      //     src={bell}
      //     alt="Notifications"
      //     className="w-8 h-8 cursor-pointer"
      //     onClick={handleNotifications}
      //   />
//         <img
//           src={profileImage || defaultAvatar}
//           onClick={handleAvatarClick}
//           alt="Owner Avatar"
//           className="w-10 h-10 border border-orange-400 rounded-lg object-cover cursor-pointer"
//         />
//       </div>
//     </div>
//   );
// };

// export default OwnerHeader;

//without responsive but running

// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { apiGet } from '../services/api';
// import defaultAvatar from '../assets/owner.png';
// import bell from '../assets/bell-icon.png';
// import storage from '../utils/storage'; // assuming storage utility is used for local storage

// const OwnerHeader = () => {
//   const navigate = useNavigate();
//   const [ownerName, setOwnerName] = useState('');
//   const [profileImage, setProfileImage] = useState('');
//   const [messName, setMessName] = useState('');
//   const [messAddress, setMessAddress] = useState('');
//   const selectedMess = JSON.parse(storage.getItem('selectedMess'));




//   useEffect(() => {
//   const fetchProfile = async () => {
//     try {
//       const res = await apiGet('/owner/profile/basic');
//       if (res?.success && res?.data) {
//         const { ownerName, profileImage } = res.data;
//         setOwnerName(ownerName || 'Owner');
//         setProfileImage(profileImage || '');
//       }

//       if (selectedMess) {
//         const { messName, address } = selectedMess;
//         setMessName(messName || 'Unnamed Mess');
//         setMessAddress(address || 'Address of Mess');
//       }
//     } catch (err) {
//       console.error('❌ Error loading owner data:', err);
//     }
//   };

//   fetchProfile();
// }, []);


//   const handleNotifications = () => navigate('/notifications');
//   const handleAvatarClick = () => navigate('/mess-profile');

//   return (
//     <div className="flex justify-between items-start mb-6">
//       <div>
//         <p className="text-sm text-gray-700 font-semibold">Welcome,</p>

//         <h2 className="text-3xl font-bold text-orange-600">{ownerName}</h2>
//                 <p className="text-sm text-green-600 px-1">(Owner)</p>

//       </div>

//       <div className="flex items-center gap-3">
//         <div className="text-right mr-2">
//           <p className="text-2xl font-bold text-orange-600">{messName}</p>
//           <p className="text-lg text-gray-500">{messAddress}</p>
//         </div>
    
//         <img
//           src={bell}
//           alt="Notifications"
//           className="w-10 h-10 cursor-pointer"
//           onClick={handleNotifications}
//         />
//         <img
//           src={profileImage || defaultAvatar}
//           onClick={handleAvatarClick}
//           alt="Owner Avatar"
//           className="w-12 h-12 rounded-full border border-orange-400 object-cover cursor-pointer"
          
//         />
             
//       </div>
//     </div>
//   );
// };

// export default OwnerHeader;


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
        console.error('❌ Error loading owner data:', err);
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
        <p className="text-xs sm:text-sm text-gray-700 font-semibold">Welcome,</p>
        <h2 className="text-xl sm:text-3xl font-bold text-orange-600">{ownerName}</h2>
        <p className="text-xs sm:text-sm text-green-600">(Owner)</p>
      </div>

      {/* Right: Mess Info + Icons */}
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
        <div className="text-center sm:text-right sm:mr-2">
          <p className="text-lg sm:text-2xl font-bold text-orange-600">{messName}</p>
          <p className="text-xs sm:text-lg text-gray-500">{messAddress}</p>
        </div>

        {/* <div className="flex items-center gap-2 sm:gap-3">
          <img
            src={bell}
            alt="Notifications"
            className="w-7 h-7 sm:w-10 sm:h-10 cursor-pointer"
            onClick={handleNotifications}
          />
          <img
            src={profileImage || defaultAvatar}
            onClick={handleAvatarClick}
            alt="Owner Avatar"
            className="w-9 h-9 sm:w-12 sm:h-12 rounded-full border border-orange-400 object-cover cursor-pointer"
          />
        </div> */}
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
