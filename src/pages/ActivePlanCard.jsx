
// active plan card component with backend integration

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { MoreVertical } from "lucide-react";
// import { AiOutlineBarcode } from "react-icons/ai";

// import storage from "../utils/storage";

// const ActivePlanCard = ({ plan }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const navigate = useNavigate();

//   const handleUseTokens = () => {
//     const customerPlanId = plan.customerPlanId || plan._id;
//     storage.setItem("customerPlanId", customerPlanId);
//     navigate(`/cust/use-tokens`);
//     setIsMenuOpen(false);
//   };

//   return (
//     <div className="relative flex flex-col sm:flex-row items-start sm:items-center bg-white  rounded-xl p-4 shadow-md">
//       <img
//         src={plan.imageUrl}
//         alt="Plan"
//         className="w-full h-40 sm:w-24 sm:h-24 rounded-md object-cover mb-3 sm:mb-0 sm:mr-4"
//       />

//       <div className="flex-1 w-full">
//         <h3 className="text-md font-semibold text-gray-800">{plan.name}</h3>
//         <p className="text-sm text-gray-600">{plan.description}</p>

//         <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mt-2 text-sm text-gray-500">
//           <div className="flex items-center gap-2">
//             ₹ <span className="font-bold text-black">{plan.price}</span>
//             <span className="hidden sm:inline border-l border-gray-300 h-4" />
//             <span>{plan.durationDays} Days</span>
//           </div>

//           <p className="text-sm text-gray-600">
//             <strong>Purchased on:</strong>{" "}
//             {new Date(plan.purchaseDate).toLocaleDateString()}
//           </p>
//           <p className="text-sm text-gray-600">
//             <strong>Expires on:</strong>{" "}
//             {new Date(plan.expiryDate).toLocaleDateString()}
//           </p>
//         </div>

//         <p className="text-sm text-green-600 mt-2">{plan.status}</p>
//       </div>

//       <div className="relative self-end sm:self-auto mt-2 sm:mt-0">
//         <button
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//           className="p-2 rounded-full hover:bg-gray-100"
//         >
//           <MoreVertical className="h-5 w-5 cursor-pointer text-gray-500" />
//         </button>

//         {isMenuOpen && (
//           <div className="absolute right-0 top-10 z-50 bg-white border rounded shadow p-2 w-32">
//             <p className="text-xs text-gray-500 font-semibold px-2">Options</p>
//             {/* <button
//               onClick={handleUseTokens}
//               className="text-green-600 cursor-pointer text-sm font-medium hover:underline px-2 py-1 w-full text-left"
//             >
//               Use Tokens
//             </button>
//              */}
//              <button
//   onClick={() => {
//     setIsMenuOpen(false);
//     console.log("Extend Plan clicked", plan);
//   }}
//   className="text-blue-600 cursor-pointer text-sm font-medium hover:underline px-2 py-1 w-full text-left"
// >
//   Extend Plan
// </button>
//    {!disableUseTokens && (
//         <button
//           onClick={() => handleUseTokens(plan.customerPlanId, plan.messId, plan.MessProfile?.services || [])}
//           className="flex items-center gap-1 w-fit mt-3 px-3 py-2 text-xs text-white bg-orange-500 rounded-full hover:bg-orange-700 cursor-pointer transition"
//         >
//           <AiOutlineBarcode className="w-3 h-3" />
//           Use Tokens
//         </button>
//       )}
//           </div>
//         )}
//       </div>
   

//     </div>
       
//   );
// };

// export default ActivePlanCard;


// active plan card component with backend integration

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { MoreVertical } from "lucide-react";
// import { AiOutlineBarcode } from "react-icons/ai";
// import storage from "../utils/storage";

// const ActivePlanCard = ({ plan }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const navigate = useNavigate();

//   const handleUseTokens = () => {
//     const customerPlanId = plan.customerPlanId || plan._id;
//     storage.setItem("customerPlanId", customerPlanId);
//     navigate(`/cust/use-tokens`);
//     setIsMenuOpen(false);
//   };

//   return (
//     <div className="relative flex flex-col sm:flex-row items-start sm:items-center bg-white rounded-xl p-4 shadow-md">
      
//       {/* IMAGE */}
//       <img
//         src={plan.imageUrl}
//         alt="Plan"
//         className="w-full h-40 sm:w-24 sm:h-24 rounded-md object-cover mb-3 sm:mb-0 sm:mr-4"
//       />

//       {/* MAIN CONTENT */}
//       <div className="flex-1 w-full">
//         <h3 className="text-md font-semibold text-gray-800">{plan.name}</h3>
//         <p className="text-sm text-gray-600">{plan.description}</p>

//         <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mt-2 text-sm text-gray-500">
//           <div className="flex items-center gap-2">
//             ₹ <span className="font-bold text-black">{plan.price}</span>
//             <span className="hidden sm:inline border-l border-gray-300 h-4" />
//             <span>{plan.durationDays} Days</span>
//           </div>

//           <p className="text-sm text-gray-600">
//             <strong>Purchased on:</strong>{" "}
//             {new Date(plan.purchaseDate).toLocaleDateString()}
//           </p>

//           <p className="text-sm text-gray-600">
//             <strong>Expires on:</strong>{" "}
//             {new Date(plan.expiryDate).toLocaleDateString()}
//           </p>
//         </div>

//         <p className="text-sm text-green-600 mt-2">{plan.status}</p>

//         {/* ✅ CORRECT USE TOKENS BUTTON (ALWAYS VISIBLE) */}
//         <button
//           onClick={handleUseTokens}
//           className="flex items-center gap-1 w-fit mt-3 px-3 py-2 text-xs text-white bg-orange-500 rounded-full hover:bg-orange-700 cursor-pointer transition"
//         >
//           <AiOutlineBarcode className="w-3 h-3" />
//           Use Tokens
//         </button>
//       </div>

//       {/* THREE DOTS MENU */}
//       <div className="relative self-end sm:self-auto mt-2 sm:mt-0">
//         <button
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//           className="p-2 rounded-full hover:bg-gray-100"
//         >
//           <MoreVertical className="h-5 w-5 cursor-pointer text-gray-500" />
//         </button>

//         {isMenuOpen && (
//           <div className="absolute right-0 top-10 z-50 bg-white border rounded shadow p-2 w-32">
//             <p className="text-xs text-gray-500 font-semibold px-2">Options</p>

//             {/* ✅ EXTEND PLAN */}
//             <button
//               onClick={() => {
//                 setIsMenuOpen(false);
//                 console.log("Extend Plan clicked", plan);
//               }}
//               className="text-blue-600 cursor-pointer text-sm font-medium hover:underline px-2 py-1 w-full text-left"
//             >
//               Extend Plan
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ActivePlanCard;


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { MoreVertical } from "lucide-react";
// import { AiOutlineBarcode } from "react-icons/ai";
// import storage from "../utils/storage";
// import { apiPost } from "../services/api";
// import toast from "react-hot-toast";

// const ActivePlanCard = ({ plan }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [showExtendModal, setShowExtendModal] = useState(false);
//   const [extendDays, setExtendDays] = useState("");
//   const navigate = useNavigate();

//   const handleUseTokens = () => {
//     const customerPlanId = plan.customerPlanId || plan._id;
//     storage.setItem("customerPlanId", customerPlanId);
//     navigate(`/cust/use-tokens`);
//     setIsMenuOpen(false);
//   };

//   const handleExtendSubmit = async () => {
//     if (!extendDays || Number(extendDays) <= 0) {
//       toast.error("Please enter valid number of days.");
//       return;
//     }

//     try {
//       const payload = {
//         customerPlanId: plan.customerPlanId || plan._id,
//         extendDays: Number(extendDays),
//       };

//       const res = await apiPost(
//         "/owner/mess/customer-plan/expiry/extend",
//         payload
//       );

//       if (res.success) {
//         toast.success(res.message || "Plan extended!");
//         setShowExtendModal(false);
//         setExtendDays("");
//       } else {
//         toast.error(res.message || "Something went wrong.");
//       }
//     } catch (err) {
//       toast.error("Error extending plan.");
//     }
//   };

//   return (
//     <>
//       {/* MAIN CARD */}
//       <div className="
//           relative flex flex-col sm:flex-row 
//           items-start sm:items-center 
//           bg-white rounded-xl 
//           p-3 sm:p-4 
//           shadow-sm hover:shadow-md transition-all 
//           border border-gray-100
//       ">

//         {/* IMAGE */}
//         <img
//           src={plan.imageUrl}
//           alt="Plan"
//           className="
//             w-full h-40 
//             sm:w-24 sm:h-24 
//             rounded-lg object-cover 
//             mb-3 sm:mb-0 sm:mr-4
//             shadow-sm
//           "
//         />

//         {/* MAIN CONTENT */}
//         <div className="flex-1 w-full">
//           <h3 className="text-md font-semibold text-gray-800">{plan.name}</h3>
//           <p className="text-sm text-gray-600 leading-snug">{plan.description}</p>

//           <div className="flex flex-col sm:flex-row sm:items-center sm:gap-5 mt-2 text-sm text-gray-500">
//             <div className="flex items-center gap-1">
//               ₹ <span className="font-bold text-black">{plan.price}</span>
//               <span className="hidden sm:inline border-l border-gray-300 h-4 mx-2" />
//               <span>{plan.durationDays} Days</span>
//             </div>

//             <p className="text-sm text-gray-700">
//               <strong>Purchased:</strong>{" "}
//               {new Date(plan.purchaseDate).toLocaleDateString()}
//             </p>

//             <p className="text-sm text-gray-700">
//               <strong>Expires:</strong>{" "}
//               {new Date(plan.expiryDate).toLocaleDateString()}
//             </p>
//           </div>

//           <p className="text-sm text-green-600 mt-1">{plan.status}</p>

//           {/* USE TOKENS BUTTON */}
//           <button
//             onClick={handleUseTokens}
//             className="
//               flex items-center gap-1 w-fit 
//               mt-3 px-3 py-2 
//               text-xs text-white 
//               bg-orange-500 rounded-full 
//               hover:bg-orange-600 
//               transition-all shadow-sm
//             "
//           >
//             <AiOutlineBarcode className="w-3 h-3" />
//             Use Tokens
//           </button>
//         </div>

//         {/* THREE DOTS MENU */}
//         <div className="relative self-end sm:self-auto mt-2 sm:mt-0">
//           <button
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className="p-2 rounded-full hover:bg-gray-100 transition"
//           >
//             <MoreVertical className="h-5 w-5 cursor-pointer text-gray-500" />
//           </button>

//           {isMenuOpen && (
//             <div className="
//                 absolute right-0 top-11 z-50 
//                 bg-white border rounded-lg shadow-md 
//                 p-2 w-36
//             ">
//               <p className="text-xs text-gray-500 font-semibold px-2">Options</p>

//               <button
//                 onClick={() => {
//                   setIsMenuOpen(false);
//                   setShowExtendModal(true);
//                 }}
//                 className="
//                     text-blue-600 text-sm font-medium 
//                     hover:underline px-2 py-1 
//                     w-full text-left
//                 "
//               >
//                 Extend Plan
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* EXTEND MODAL */}
//       {showExtendModal && (
//         <div className="fixed inset-0 backdrop-blur-sm bg-opacity-40 flex justify-center items-center z-[999]">
//           <div className="bg-white w-11/12 sm:w-80 p-5 rounded-xl shadow-lg">
//             <h2 className="text-lg font-semibold mb-3">Extend Plan</h2>

//             <label className="text-sm font-medium">Extend Days</label>
//             <input
//               type="number"
//               value={extendDays}
//               onChange={(e) => setExtendDays(e.target.value)}
//               className="w-full mt-1 px-3 py-2 border rounded-md"
//               placeholder="Enter days"
//             />

//             <div className="flex justify-end gap-2 mt-4">
//               <button
//                 onClick={() => setShowExtendModal(false)}
//                 className="px-3 py-1 text-sm cursor-pointer rounded-md border hover:bg-gray-50"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={handleExtendSubmit}
//                 className="
//                   px-3 py-1 text-sm 
//                   bg-blue-600 text-white 
//                   rounded-md cursor-pointer hover:bg-blue-700
//                 "
//               >
//                 Extend
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };
// export default ActivePlanCard;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoreVertical } from "lucide-react";
import { AiOutlineBarcode } from "react-icons/ai";
import { BsCalendarDate } from "react-icons/bs";
import storage from "../utils/storage";
import { apiPost } from "../services/api";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ActivePlanCard = ({ plan , onPlanExtended  }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showExtendModal, setShowExtendModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  
  const navigate = useNavigate();

  const handleUseTokens = () => {
    const customerPlanId = plan.customerPlanId || plan._id;
    storage.setItem("customerPlanId", customerPlanId);
    navigate(`/cust/use-tokens`);
    setIsMenuOpen(false);
  };

  // 🔥 Calculate day difference
  const calculateDaysDifference = (newDate) => {
    const expiry = new Date(plan.expiryDate);
    const selected = new Date(newDate);

    const diffTime = selected - expiry;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? diffDays : 0;
  };

  const handleExtendSubmit = async () => {
    if (!selectedDate) {
      toast.error("Please select a date.");
      return;
    }

const extendDays = calculateDaysDifference(selectedDate.toISOString().split("T")[0]);

    if (extendDays <= 0) {
      toast.error("Selected date must be after expiry date.");
      return;
    }

    try {
      const payload = {
        customerPlanId: plan.customerPlanId || plan._id,
        extendDays,
      };

      const res = await apiPost(
        "/owner/mess/customer-plan/expiry/extend",
        payload
      );

      if (res.success) {
        toast.success(res.message || "Plan extended!");
        setShowExtendModal(false);
              if (onPlanExtended) onPlanExtended();
        setSelectedDate("");
      } else {
        toast.error(res.message || "Something went wrong.");
      }
    } catch (err) {
      toast.error("Error extending plan.");
    }
  };

  return (
    <>
      {/* MAIN CARD */}
      <div
        className="relative flex flex-col sm:flex-row items-start sm:items-center 
        bg-white rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-all border border-gray-100"
      >
        <img
          src={plan.imageUrl}
          alt="Plan"
          className="w-full h-40 sm:w-24 sm:h-24 rounded-lg object-cover mb-3 sm:mb-0 sm:mr-4 shadow-sm"
        />

        <div className="flex-1 w-full">
          <h3 className="text-md font-semibold text-gray-800">{plan.name}</h3>
          <p className="text-sm text-gray-600">{plan.description}</p>

          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-5 mt-2 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              ₹ <span className="font-bold text-black">{plan.price}</span>
              <span className="hidden sm:inline border-l border-gray-300 h-4 mx-2" />
              <span>{plan.durationDays} Days</span>
            </div>

            <p className="text-sm">
              <strong>Purchased:</strong>{" "}
              {new Date(plan.purchaseDate).toLocaleDateString()}
            </p>

            <p className="text-sm">
              <strong>Expires:</strong>{" "}
              {new Date(plan.expiryDate).toLocaleDateString()}
            </p>
          </div>

          <p className="text-sm text-green-600 mt-1">{plan.status}</p>

          <button
            onClick={handleUseTokens}
            className="flex items-center gap-1 cursor-pointer w-fit mt-3 px-3 py-2 text-xs text-white bg-orange-500 rounded-full hover:bg-orange-600 transition-all shadow-sm"
          >
            <AiOutlineBarcode className="w-3 h-3" />
            Use Tokens
          </button>
        </div>

        {/* MENU BUTTON */}
        <div className="relative self-end sm:self-auto mt-2 sm:mt-0">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 cursor-pointer rounded-full hover:bg-gray-100 transition"
          >
            <MoreVertical className="h-5 w-5 text-gray-500" />
          </button>

          {isMenuOpen && (
            <div
              className="absolute right-0 top-11 z-50 bg-white border rounded-lg shadow-md p-2 w-40"
            >
              <p className="text-xs text-gray-500 font-semibold px-2">Options</p>

              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setShowExtendModal(true);
                }}
                className="flex items-center gap-2 cursor-pointer text-blue-600 text-sm font-medium px-2 py-2 w-full text-left hover:bg-gray-50"
              >
                <BsCalendarDate className="text-md" />
                Extend Plan
              </button>
            </div>
          )}
        </div>
      </div>

      {/* EXTEND MODAL */}
      {showExtendModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/40 flex justify-center items-center z-[999]">
          <div className="bg-white w-11/12 sm:w-80 p-5 rounded-xl shadow-lg">
            <h2 className="text-lg font-semibold mb-3">Extend Plan</h2>

            <label className="text-sm font-medium">Select New Expiry Date</label>
            {/* <input
              type="date"
              value={selectedDate}
              min={new Date(plan.expiryDate).toISOString().split("T")[0]}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-md"
            /> */}
            <DatePicker
  selected={selectedDate ? new Date(selectedDate) : null}
  onChange={(date) => setSelectedDate(date)}
  minDate={new Date(plan.expiryDate)}
  dateFormat="dd-MM-yyyy"
  inline
  className="w-full mt-2"
/>


            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowExtendModal(false)}
                className="px-3 py-1 text-sm rounded-md border cursor-pointer hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                onClick={handleExtendSubmit}
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700"
              >
                Extend
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default ActivePlanCard;



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { MoreVertical } from "lucide-react";
// import storage from "../utils/storage";
// import { useTranslation } from "react-i18next";

// const ActivePlanCard = ({ plan }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const navigate = useNavigate();
//   const { t } = useTranslation();

//   const handleUseTokens = () => {
//     const customerPlanId = plan.customerPlanId || plan._id;
//     storage.setItem("customerPlanId", customerPlanId);
//     navigate(`/cust/use-tokens`);
//     setIsMenuOpen(false);
//   };

//   return (
//     <div className="relative flex flex-col sm:flex-row items-start sm:items-center bg-white border rounded-xl p-4 shadow-sm">
//       <img
//         src={plan.imageUrl}
//         alt="Plan"
//         className="w-full h-40 sm:w-24 sm:h-24 rounded-md object-cover mb-3 sm:mb-0 sm:mr-4"
//       />

//       <div className="flex-1 w-full">
//         <h3 className="text-md font-semibold text-gray-800">{plan.name}</h3>
//         <p className="text-sm text-gray-600">{plan.description}</p>

//         <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mt-2 text-sm text-gray-500">
//           <div className="flex items-center gap-2">
//             ₹ <span className="font-bold text-black">{plan.price}</span>
//             <span className="hidden sm:inline border-l border-gray-300 h-4" />
//             <span>{plan.durationDays} {t("days")}</span>
//           </div>

//           <p className="text-sm text-gray-600">
//             <strong>{t("purchasedOn")}:</strong>{" "}
//             {new Date(plan.purchaseDate).toLocaleDateString()}
//           </p>
//           <p className="text-sm text-gray-600">
//             <strong>{t("expiresOn")}:</strong>{" "}
//             {new Date(plan.expiryDate).toLocaleDateString()}
//           </p>
//         </div>

//         <p className="text-sm text-green-600 mt-2">{t(plan.status)}</p>
//       </div>

//       <div className="relative self-end sm:self-auto mt-2 sm:mt-0">
//         <button
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//           className="p-2 rounded-full hover:bg-gray-100"
//         >
//           <MoreVertical className="h-5 w-5 cursor-pointer text-gray-500" />
//         </button>

//         {isMenuOpen && (
//           <div className="absolute right-0 top-10 z-50 bg-white border rounded shadow p-2 w-32">
//             <p className="text-xs text-gray-500 font-semibold px-2">{t("options")}</p>
//             <button
//               onClick={handleUseTokens}
//               className="text-green-600 cursor-pointer text-sm font-medium hover:underline px-2 py-1 w-full text-left"
//             >
//               {t("useTokens")}
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ActivePlanCard;
