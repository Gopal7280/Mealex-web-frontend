// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { apiGet } from "../services/api";
// import storage from "../utils/storage";
// import defaultIcon from "../assets/chef-icon.webp";
// import Navbar2 from "../layouts/Navbar";
// import OwnerHeader from "../pages/ownerHeader";
// import { FiArrowRight } from "react-icons/fi";

// const SwitchMess = () => {
//   const navigate = useNavigate();
//   const [messes, setMesses] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchOwnerMesses();
//   }, []);

//   const fetchOwnerMesses = async () => {
//     setLoading(true);
//     try {
//       const res = await apiGet("/owner/mess/all");
//       if (res?.success && Array.isArray(res.data)) {
//         setMesses(res.data);
//       } else {
//         setMesses([]);
//       }
//     } catch (err) {
//       console.error("❌ Error fetching owner messes:", err);
//       setMesses([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleMessClick = (mess) => {
//     storage.setItem("messId", mess.messId);
//     navigate("/owner/dashboard", { state: { mess } }); // ✅ redirect as per flow
//   };

//   return (
//     <div className="flex h-screen">
//       <Navbar2 />
//       <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-[#FFFDD0] overflow-y-auto">
//         <OwnerHeader />

//         <h2 className="text-xl font-semibold mb-6">Switch Mess</h2>

//         {loading ? (
//           <p>Loading messes...</p>
//         ) : messes.length === 0 ? (
//           <p className="text-gray-500">No messes found.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {messes.map((mess) => (
//               <div
//                 key={mess.messId}
//                 className="border rounded-xl bg-white p-4 shadow-sm flex flex-col"
//               >
//                 <div
//                   className="flex items-center gap-4 p-2 rounded-lg border border-gray-300 cursor-pointer hover:border-orange-500"
//                 >
//                   <img
//                     src={mess.logoUrl || defaultIcon}
//                     alt="logo"
//                     className="w-14 h-14 rounded-md object-cover"
//                   />
//                   <div className="flex-1">
//                     <p className="font-semibold">{mess.messName}</p>
//                     <p className="text-sm text-gray-500">
//                       {mess.city} • {mess.pincode}
//                     </p>
//                     <p className="text-sm text-gray-500">
//                       Open: {mess.openTime} - Close: {mess.closeTime}
//                     </p>
//                   </div>
//                   <div
//                     onClick={() => handleMessClick(mess)}
//                     className="text-orange-500 text-xl"
//                   >
//                     <FiArrowRight />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SwitchMess;



// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { apiGet } from "../services/api";
// import storage from "../utils/storage";
// import defaultIcon from "../assets/chef-icon.webp";
// import Navbar2 from "../layouts/Navbar";
// import OwnerHeader from "../pages/ownerHeader";
// import { FiArrowRight } from "react-icons/fi";
// import { toast } from "react-hot-toast";
// import { ArrowLeft } from 'lucide-react';


// const SwitchMess = () => {
//   const navigate = useNavigate();
//   const [messes, setMesses] = useState([]);
//   const [loading, setLoading] = useState(false);

//     const handleAddMess = () => navigate("/mess-details");

//    const hasNoMesses = messes.length === 0;

//   useEffect(() => {
//     fetchOwnerMesses();
//   }, []);

//   const fetchOwnerMesses = async () => {
//     setLoading(true);
//     try {
//       const res = await apiGet("/owner/mess/all");
//       if (res?.success && Array.isArray(res.data)) {
//         console.log("✅ Fetched messes:", res.data); // <-- ✅ Add this
//         setMesses(res.data);
//       } else {
//         setMesses([]);
//       }
//     } catch (err) {
//       console.error("❌ Error fetching owner messes:", err);
//       setMesses([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleMessClick = (mess) => {
//     const isVerified = mess.status === "active" || mess.status === "activated";

//     if (isVerified) {
//       storage.setItem("messId", mess._id || mess.messId);
//       storage.setItem("selectedMess", JSON.stringify(mess));
//       toast.success(`Logged in with ${mess.messName} successfully`);
//       navigate("/owner-dashboard");
//     } else {
//       storage.setItem("selectedMess", JSON.stringify(mess));
//       navigate(`/owner/mess/id/${mess.messId}`);
//     }
//   };

//   return (
//     <>
//     <div className="flex h-screen">
//       <Navbar2 />
//       <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-gray-50 overflow-y-auto">
//         <OwnerHeader />
//           {/* <ArrowLeft 
//             className="w-6 h-6 cursor-pointer text-gray-700 hover:text-orange-500"
//             onClick={() => navigate(-1)}
//           />

//         <h2 className="text-xl font-semibold mb-6">Switch Mess</h2> */}
//                 <div className="flex items-center gap-2 mb-4">
//           <ArrowLeft 
//             className="w-8 h-8 cursor-pointer text-[#232325] hover:text-orange-500"
//             onClick={() => navigate(-1)}
//           />
//           <h2 className="text-2xl font-bold text-[#232325]">Switch Mess</h2>
//         </div>


//         {loading ? (
//           <p>Loading messes...</p>
//         ) : messes.length === 0 ? (
//           <p className="text-gray-500">No messes found.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {messes.map((mess) => (
//               <div
//                 key={mess.messId}
//                 className="border rounded-xl bg-white p-4 shadow-sm flex flex-col"
//               >
//                 <div className="flex items-center gap-4 p-2 rounded-lg border border-gray-300 cursor-pointer hover:border-orange-500">
//                   <img
//                     src={mess.logoUrl || defaultIcon}
//                     alt="logo"
//                     className="w-14 h-14 rounded-md object-cover"
//                   />
//                   <div className="flex-1">
//                     <p className="font-semibold">{mess.messName}</p>
//                     <p className="text-sm text-gray-500">
//                       {mess.messType} • {mess.pincode}
//                     </p>
//                     <p className="text-sm text-gray-500">
//                       {mess.address || 'Mess Address'}, {mess.city || 'Mess City'}
//                     </p>
//                   </div>
//                   <div
//                     onClick={() => handleMessClick(mess)}
//                     className="text-orange-500 text-xl"
//                   >
//                     <FiArrowRight />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
          
//         )}
//       </div>
      
      
      
//     </div>
//         <div className="flex justify-center mt-10 sm:mt-16 md:mt-24">
//             <button
//               onClick={handleAddMess}
//               className="bg-orange-500 text-white px-10 sm:px-20 md:px-40 py-3 rounded-lg font-semibold shadow-lg hover:bg-orange-600 transition text-sm sm:text-base"
//             >
//               {hasNoMesses ? "Add Your Mess" : "Add New Mess"}
//             </button>
//           </div>
//     </>
//   );
// };

// export default SwitchMess;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiGet } from "../services/api";
import storage from "../utils/storage";
import defaultIcon from "../assets/chef-icon.webp";
import Navbar2 from "../layouts/Navbar";
import OwnerHeader from "../pages/ownerHeader";
import { FiArrowRight } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { ArrowLeft } from "lucide-react";

const SwitchMess = () => {
  const navigate = useNavigate();
  const [messes, setMesses] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAddMess = () => navigate("/mess-details");
  const hasNoMesses = messes.length === 0;

  useEffect(() => {
    fetchOwnerMesses();
  }, []);

  const fetchOwnerMesses = async () => {
    setLoading(true);
    try {
      const res = await apiGet("/owner/mess/all");
      if (res?.success && Array.isArray(res.data)) {
        setMesses(res.data);
      } else {
        setMesses([]);
      }
    } catch (err) {
      setMesses([]);
    } finally {
      setLoading(false);
    }
  };

  // const handleMessClick = (mess) => {
  //   const isVerified = mess.status === "active" || mess.status === "activated";

  //   if (isVerified) {
  //     storage.setItem("messId", mess._id || mess.messId);
  //     storage.setItem("selectedMess", JSON.stringify(mess));
  //     toast.success(`Logged in with ${mess.messName} successfully`);
  //     navigate("/owner-dashboard");
  //   } else {
  //     storage.setItem("selectedMess", JSON.stringify(mess));
  //     navigate(`/owner/mess/id/${mess.messId}`);
  //   }
  // };

// const handleMessClick = (mess) => {
//   const isVerified = mess.status === "active" || mess.status === "activated";

//   // Store messId and whole mess object
//   storage.setItem("messId", mess._id || mess.messId);
//   storage.setItem("selectedMess", JSON.stringify(mess));

//   // ✅ Store only this mess ke available services
//   storage.setItem("messServices", JSON.stringify(mess.services || []));

//   if (isVerified) {
//     toast.success(`Logged in with ${mess.messName} successfully`);
//     navigate("/owner-dashboard");
//   } else {
//     navigate(`/owner/mess/id/${mess.messId}`);
//   }
// };
const handleMessClick = (mess) => {
  const isVerified = mess.status === "active" || mess.status === "activated";

  // Store messId and complete mess object
  storage.setItem("messId", mess._id || mess.messId);
  storage.setItem("selectedMess", JSON.stringify(mess));

  // Store mess KYC stage separately for easy access
  storage.setItem("messKycStage", mess.kyc_stage || "0");

  // Optionally, store available services of this mess
  storage.setItem("messServices", JSON.stringify(mess.services || []));

  if (isVerified) {
    toast.success(`Logged in with ${mess.messName} successfully`);
    navigate("/owner-dashboard");
  } else {
    navigate(`/owner/mess/id/${mess.messId}`);
  }
};



  return (
    <>
      <div className="flex h-screen">
        <Navbar2 />
        <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-gray-50 overflow-y-auto">
          <OwnerHeader />

          {/* Page Header */}
          <div className="flex items-center gap-2 mb-6">
            <ArrowLeft
              className="w-8 h-8 cursor-pointer text-[#232325] hover:text-orange-500"
              onClick={() => navigate(-1)}
            />
            <h2 className="text-2xl font-bold text-[#232325]">Switch Mess</h2>
          </div>

          {/* Mess List */}
          {loading ? (
            <p>Loading messes...</p>
          ) : hasNoMesses ? (
            <p className="text-gray-500">No messes found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* {messes.map((mess) => (
             
                <div
  key={mess.messId}
  className="rounded-xl border shadow-md overflow-hidden flex flex-col cursor-pointer hover:shadow-lg transition-all duration-300"
>
  <div className="relative">
    <img
      src={mess.logoUrl || defaultIcon}
      alt={mess.messName}
      className="w-full h-40 object-cover"
    />
  </div>

  <div className="p-4 flex-1 flex flex-col gap-1">
    <h3 className="text-lg font-bold text-gray-800">{mess.messName}</h3>
    <p className="text-sm text-gray-500 capitalize">Type: {mess.messType}</p>
    <p className="text-sm text-gray-600"><span className="font-semibold">City:</span> {mess.city}</p>
    <p className="text-sm text-gray-600 break-words"><span className="font-semibold">Address:</span> {mess.address}</p>
    <p className="text-sm text-gray-600"><span className="font-semibold">Contact:</span> {mess.contactNumber}</p>
    <p className="text-sm text-gray-600"><span className="font-semibold">Email:</span> {mess.email}</p>
    <p className="text-sm text-green-600">
      Open: {mess.openTime} - Close: {mess.closeTime}
    </p>
    <p className="text-sm text-gray-700">
      <span className="font-semibold">Services:</span> {mess.services?.join(", ") || "N/A"}
    </p>
    <p className="text-sm text-gray-700">
      <span className="font-semibold">Days Open:</span> {mess.daysOpen?.join(", ") || "N/A"}
    </p>
  </div>

  <div
    onClick={() => handleMessClick(mess)}
    className="flex justify-end p-3 text-orange-500 text-3xl hover:text-orange-600 cursor-pointer"
  >
    <FiArrowRight />
  </div>
</div>

              ))} */}
              {messes.map((mess) => {
  const isVerified = mess.status === "active" || mess.status === "activated";
  const isPending = mess.status === "pending";
  const isNotVerified = mess.status === "inactive";

  const borderColor = isVerified
    ? "border-green-500"
    : isPending
    ? "border-orange-500"
    : "border-red-500";

  const statusText = isVerified
    ? "Verified "
    : isPending
    ? "Pending ⏳"
    : "Not Verified ❌";

  const statusBg = isVerified
    ? "bg-green-100 text-green-700"
    : isPending
    ? "bg-orange-100 text-orange-700"
    : "bg-red-100 text-red-700";

  return (
    <div
      key={mess.messId}
      className={`rounded-xl border-2 ${borderColor} shadow-md overflow-hidden flex flex-col cursor-pointer hover:shadow-lg transition-all duration-300`}
    >
      {/* Logo + Status */}
      <div className="relative">
        <img
          src={mess.logoUrl || defaultIcon}
          alt={mess.messName}
          className="w-full h-40 object-cover"
        />
        <span
          className={`absolute top-2 right-2 px-3 py-1 text-xs font-semibold rounded-full ${statusBg}`}
        >
          {statusText}
        </span>
      </div>

      {/* Mess Info */}
      <div className="p-4 flex-1 flex flex-col gap-1">
        <h3 className="text-lg font-bold text-gray-800">{mess.messName}</h3>
        <p className="text-sm text-gray-500 capitalize">
          Type: {mess.messType}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">City:</span> {mess.city}
        </p>
        <p className="text-sm text-gray-600 break-words">
          <span className="font-semibold">Address:</span> {mess.address}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Contact:</span> {mess.contactNumber}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Email:</span> {mess.email}
        </p>
        <p className="text-sm text-green-600">
          Open: {mess.openTime} - Close: {mess.closeTime}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Services:</span>{" "}
          {mess.services?.join(", ") || "N/A"}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Days Open:</span>{" "}
          {mess.daysOpen?.join(", ") || "N/A"}
        </p>
      </div>

      {/* Arrow */}
      <div
        onClick={() => handleMessClick(mess)}
        className="flex justify-end p-3 text-orange-500 text-3xl hover:text-orange-600 cursor-pointer"
      >
        <FiArrowRight />
      </div>
    </div>
  );
})}

            </div>
          )}

          <div className="flex justify-center mt-10 sm:mt-16 md:mt-24">
            <button
              onClick={handleAddMess}
              className="bg-orange-500 cursor-pointer text-white px-10 sm:px-20 md:px-40 py-3 rounded-lg font-semibold shadow-lg hover:bg-orange-600 transition text-sm sm:text-base"
            >
              {hasNoMesses ? "Add Your Mess" : "Add New Mess"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SwitchMess;
