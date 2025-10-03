// import React, { useEffect, useState } from "react";
// import { apiGet } from "../services/api";
// import storage from "../utils/storage";
// import toast from "react-hot-toast";
// import Navbar from "../layouts/Navbar";
// import OwnerHeader from "./ownerHeader";
// import { ArrowLeft } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const LinkedAccountDetails = () => {
//   const [details, setDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const messId = storage.getItem("messId");

//   useEffect(() => {
//     const fetchDetails = async () => {
//       try {
//         const res = await apiGet(`/owner/account/details/${messId}`);
//         if (res?.success) {
//           setDetails(res.data);
//         } else {
//           toast.error("No account details found");
//         }
//       } catch (err) {
//         console.error("❌ Error fetching linked account details:", err);
//         toast.error("Failed to fetch linked account details");
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (messId) fetchDetails();
//   }, [messId]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <p className="text-gray-500">Loading linked account details...</p>
//       </div>
//     );
//   }

//   if (!details) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <p className="text-gray-500">No linked account details available</p>
//       </div>
//     );
//   }

//   return (
//     <div className="flex h-screen">
//       <Navbar />
//       <div className="flex-1 md:p-4 pt-16 py-6 px-4 bg-gray-50 overflow-y-auto">
//         <OwnerHeader />

//         {/* Back button */}
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center text-sm text-blue-600 mb-4"
//         >
//           <ArrowLeft className="w-4 h-4 mr-1" /> Back
//         </button>

//         <div className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-6">
//           <h2 className="text-xl font-bold text-orange-600 mb-4">
//             Linked Account Details
//           </h2>

//           <div className="space-y-3 text-gray-700">
//             {Object.entries(details).map(([key, value]) => (
//               <div
//                 key={key}
//                 className="flex justify-between border-b py-2 text-sm"
//               >
//                 <span className="font-medium capitalize">{key}</span>
//                 <span>{value ? value.toString() : "-"}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LinkedAccountDetails;


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../layouts/Navbar";
// import OwnerHeader from "./ownerHeader";
// import { apiGet } from "../services/api";
// import storage from "../utils/storage";
// import toast from "react-hot-toast";

// const LinkedAccountDetails = () => {
//   const messId = storage.getItem("messId");
//   const [details, setDetails] = useState(null);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchDetails = async () => {
//       setLoading(true);
//       try {
//         const res = await apiGet(`/owner/account/details/${messId}`);
//         if (res?.success && res.data) {
//           setDetails(res.data);
//           setErrorMessage("");
//         } else {
//           setDetails(null);
//           setErrorMessage(res?.message || "Linked account not found for this mess");
//         }
//       } catch (err) {
//         console.error("Error:", err);
//         toast.error("Error fetching account details");
//         setErrorMessage("Error fetching account details");
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (messId) fetchDetails();
//   }, [messId]);

//   return (
//     <div className="flex h-screen">
//       <Navbar />
//       <div className="flex-1 md:p-4 pt-16 py-6 px-4 bg-gray-50 overflow-y-auto">
//         <OwnerHeader />
//         <h2 className="text-xl font-bold text-orange-600 mb-6">
//           Linked Account Details
//         </h2>

//         {loading ? (
//           <p className="text-gray-500">Loading details...</p>
//         ) : errorMessage ? (
//           <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-6 shadow-md space-y-4">
//             <p className="font-medium">{errorMessage}</p>
//             <p className="text-sm text-gray-500">
//               Please create a linked account first to view details.
//             </p>

//             <div className="flex gap-3">
//               <button
//                 onClick={() => navigate("/linking-account")}
//                 className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg"
//               >
//                 Create Linked Account
//               </button>
//               <button
//                 onClick={() => navigate(-1)}
//                 className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
//               >
//                 Back
//               </button>
//             </div>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             <div className="overflow-x-auto bg-white shadow rounded-lg">
//               <table className="w-full border-collapse">
//                 <tbody>
//                   <tr className="border-b">
//                     <td className="px-4 py-3 font-medium text-gray-700">
//                       Account Holder
//                     </td>
//                     <td className="px-4 py-3 text-gray-600">
//                       {details.accountHolder}
//                     </td>
//                   </tr>
//                   <tr className="border-b">
//                     <td className="px-4 py-3 font-medium text-gray-700">
//                       Account Number
//                     </td>
//                     <td className="px-4 py-3 text-gray-600">
//                       {details.accountNumber}
//                     </td>
//                   </tr>
//                   <tr className="border-b">
//                     <td className="px-4 py-3 font-medium text-gray-700">
//                       IFSC Code
//                     </td>
//                     <td className="px-4 py-3 text-gray-600">{details.ifsc}</td>
//                   </tr>
//                   <tr>
//                     <td className="px-4 py-3 font-medium text-gray-700">
//                       Status
//                     </td>
//                     <td className="px-4 py-3 text-gray-600">{details.status}</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>

//             {/* Back Button even if details exist */}
//             <button
//               onClick={() => navigate(-1)}
//               className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
//             >
//               Back
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LinkedAccountDetails;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "../layouts/Navbar";
import OwnerHeader from "./ownerHeader";
import { apiGet } from "../services/api";
import storage from "../utils/storage";
import toast from "react-hot-toast";

const LinkedAccountDetails = () => {
  const messId = storage.getItem("messId");
  const [details, setDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const res = await apiGet(`/owner/account/details/${messId}`);
        if (res?.success && res.data) {
          setDetails(res.data);
          setErrorMessage("");
        } else {
          setDetails(null);
          setErrorMessage(
            res?.message || "Linked account not found for this mess"
          );
        }
      } catch (err) {
        toast.error("Error fetching account details");
        setErrorMessage("Error fetching account details");
      } finally {
        setLoading(false);
      }
    };
    if (messId) fetchDetails();
  }, [messId]);

  const excludeKeys = ["messId", "messOwnerId"]; // jo hide karne hain

  const renderDetails = () => {
    if (!details) return null;

    return Object.keys(details)
      .filter((key) => !excludeKeys.includes(key))
      .map((key) => (
        <div key={key} className="flex flex-col">
          <label className="text-gray-700 font-medium capitalize">
            {key.replace(/([A-Z])/g, " $1")}
          </label>
          {Array.isArray(details[key]) ? (
            <div className="border p-3 rounded-lg bg-gray-50 text-gray-700">
              {details[key].map((item, index) => (
                <div key={index} className="mb-2">
                  {Object.entries(item).map(([subKey, value]) => (
                    <div key={subKey}>
                      <span className="font-medium capitalize">{subKey}: </span>
                      <span>{value ?? "-"}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="border p-3 rounded-lg bg-gray-50 text-gray-700">
              {details[key] ?? "Not Given"}
            </div>
          )}
        </div>
      ));
  };

  return (
    <div className="flex h-screen">
      <Navbar />
      <div className="flex-1 md:p-4 pt-16 py-6 px-4 bg-gray-50 overflow-y-auto">
        <OwnerHeader />

        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-5xl border relative">
            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="absolute top-4 left-4 text-gray-600 hover:text-orange-600 flex items-center gap-1"
            >
              <ArrowLeft size={20} /> Back
            </button>

            <h2 className="text-2xl font-bold mb-6 text-orange-600 text-center">
              Linked Account Details
            </h2>

            {loading ? (
              <p className="text-gray-500 text-center">Loading details...</p>
            ) : errorMessage ? (
              <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-6 shadow-md space-y-4 text-center">
                <p className="font-medium">{errorMessage}</p>
                <p className="text-sm text-gray-500">
                  Please create a linked account first to view details.
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => navigate("/linking-account")}
                    className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg"
                  >
                    Create Linked Account
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderDetails()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkedAccountDetails;
