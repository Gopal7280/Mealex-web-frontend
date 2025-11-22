// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import Navbar from "../layouts/Navbar";
// // import OwnerHeader from "./ownerHeader";
// // import { apiGet, apiPost } from "../services/api";
// // import storage from "../utils/storage";

// // export default function OwnerPaymentSetup() {
// //   const navigate = useNavigate();
// //   const messId = storage.getItem("messId");

// //   const [accountHolderName, setAccountHolderName] = useState("");
// //   const [phoneNumber, setPhoneNumber] = useState("");
// //   const [qrFile, setQrFile] = useState(null);
// //   const [preview, setPreview] = useState(null);
// //   const [details, setDetails] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     if (!messId) return;
// //     fetchDetails();
// //   }, [messId]);

// //   const fetchDetails = async () => {
// //     try {
// //       const res = await apiGet(`/owner/mess/${messId}/payment/details`);
// //       console.log(res);
// //       if (res?.success) {
// //         setDetails(res.data);
// //       }
// //     } catch (err) {
// //       console.error("Failed to fetch payment details", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleFile = (e) => {
// //     const f = e.target.files[0];
// //     setQrFile(f || null);
// //     setPreview(f ? URL.createObjectURL(f) : null);
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!messId) return;

// //     try {
// //       await apiPost("/owner/mess/add/number", {
// //         messId,
// //         phoneNumber,
// //         accountHolderName,
// //       });

// //       if (qrFile) {
// //         const form = new FormData();
// //         form.append("messId", messId);
// //         form.append("accountHolderName", accountHolderName);
// //         form.append("qrImage", qrFile);
// //         await apiPost("/owner/mess/add/qr", form, {
// //           headers: { "Content-Type": "multipart/form-data" },
// //         });
// //       }

// //       await fetchDetails();
// //     } catch (err) {
// //       console.error(err);
// //       alert("Failed to upload payment info");
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className="flex items-center justify-center h-screen">
// //         <p className="text-gray-500">Loading...</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="flex h-screen">
// //       <Navbar />
// //       <div className="flex-1 md:p-4 pt-16 py-6 px-4 bg-gray-50 overflow-y-auto">
// //         <div className="flex justify-between items-center mb-4">
// //           <OwnerHeader />
// //           <button
// //             onClick={() => navigate(-1)}
// //             className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
// //           >
// //             Back
// //           </button>
// //         </div>

// //         {!details ? (
// //           <div className="max-w-xl mx-auto bg-white rounded shadow p-6">
// //             <h2 className="text-lg font-semibold mb-4">Setup Direct Payment</h2>
// //             <form onSubmit={handleSubmit} className="space-y-4">
// //               <div>
// //                 <label className="block text-sm mb-1">Account Holder Name</label>
// //                 <input
// //                   type="text"
// //                   value={accountHolderName}
// //                   onChange={(e) => setAccountHolderName(e.target.value)}
// //                   className="w-full border rounded px-3 py-2"
// //                   required
// //                 />
// //               </div>

// //               <div>
// //                 <label className="block text-sm mb-1">Phone Number</label>
// //                 <input
// //                   type="tel"
// //                   value={phoneNumber}
// //                   onChange={(e) => setPhoneNumber(e.target.value)}
// //                   className="w-full border rounded px-3 py-2"
// //                   placeholder="9876543210"
// //                   required
// //                 />
// //               </div>

// //               <div>
// //                 <label className="block text-sm mb-1">Upload QR Code</label>
// //                 <input type="file" accept="image/*" onChange={handleFile} />
// //                 {preview && (
// //                   <div className="mt-3">
// //                     <img
// //                       src={preview}
// //                       alt="qr preview"
// //                       className="h-40 w-40 object-contain border rounded"
// //                     />
// //                   </div>
// //                 )}
// //               </div>

// //               <button
// //                 type="submit"
// //                 className="px-6 py-2 bg-indigo-600 text-white rounded-lg"
// //               >
// //                 Save
// //               </button>
// //             </form>
// //           </div>
// //         ) : (
// //           <div className="max-w-xl mx-auto bg-white rounded shadow p-6 space-y-4">
// //             <h2 className="text-lg font-semibold mb-4">Your Payment Details</h2>
// //             <p>
// //               <span className="font-medium">Account Holder:</span>{" "}
// //               {details.accountHolderName}
// //             </p>
// //             <p>
// //               <span className="font-medium">Phone Number:</span>{" "}
// //               {details.phoneNumber}
// //             </p>
// //             {details.qrImage && (
// //               <div>
// //                 <p className="font-medium mb-2">QR Code</p>
// //                 <img
// //                   src={details.qrImage}
// //                   alt="qr"
// //                   className="h-40 w-40 object-contain border rounded"
// //                 />
// //               </div>
// //             )}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }




// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../layouts/Navbar";
// import OwnerHeader from "./ownerHeader";
// import { apiGet, apiPost } from "../services/api";
// import storage from "../utils/storage";
// import { ArrowLeft } from "lucide-react";
// import toast from "react-hot-toast";

// export default function OwnerPaymentSetup() {
//   const navigate = useNavigate();
//   const messId = storage.getItem("messId");

//   const [accountHolderName, setAccountHolderName] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [qrFile, setQrFile] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [details, setDetails] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!messId) return;
//     fetchDetails();
//   }, [messId]);


//  console.log("Fetching payment details for messId:", messId);
// const fetchDetails = async () => {
//   try {
//     const res = await apiGet(`/owner/mess/${messId}/payment/details`);
//     if (res?.success) {
//       const data = res.data;
//   console.log("Fetched payment details:", data);
//       // Fix qrCodeUrl if it has 'undefined'
//       if (data.qrCodeUrl && data.qrCodeUrl.includes("undefined/")) {
//         data.qrCodeUrl = data.qrCodeUrl.replace("undefined/", `${data.messId}/`);
//       }

//       setDetails(data);
//     }
//   } catch (err) {
//     console.error("Failed to fetch payment details", err);
//   } finally {
//     setLoading(false);
//   }
// };


//   const handleFile = (e) => {
//     const f = e.target.files[0];
//     setQrFile(f || null);
//     setPreview(f ? URL.createObjectURL(f) : null);
//   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!messId) return;

// //     try {
// //       await apiPost("/owner/mess/add/number", {
// //         messId,
// //         phoneNumber,
// //         accountHolderName,
// //       });

// //       if (qrFile) {
// //         const form = new FormData();
// //         form.append("messId", messId);
// //         form.append("accountHolderName", accountHolderName);
// //         form.append("qrImage", qrFile);
// //         await apiPost("/owner/mess/add/qr", form, {
// //           headers: { "Content-Type": "multipart/form-data" },
// //         });
// //       }

// //       await fetchDetails();
// //     } catch (err) {
// //       console.error(err);
// //       alert("Failed to upload payment info");
// //     }
// //   };

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   if (!messId) return;

//   // Validate phone number
//   const phoneRegex = /^\d{10,15}$/;
//   if (!phoneRegex.test(phoneNumber)) {
//     alert("Phone number must be 10–15 digits");
//     return;
//   }

//   if (!accountHolderName.trim()) {
//     alert("Account holder name is required");
//     return;
//   }

//   try {
//     // Update phone number first
//     try {
//       const resNumber = await apiPost("/owner/mess/add/number", {
//         messId,
//         phoneNumber,
//         accountHolderName,
//       });
//       toast.success(resNumber.message || "Phone number updated successfully");
//     } catch (err) {
//       console.error("Phone number upload failed:", err);
//       toast.error("Failed to update phone number: " + err?.response?.data?.message || err.message);
//     }

//     // Upload QR if present
//     if (qrFile) {
//       try {
//         const form = new FormData();
//         form.append("messId", messId);
//         form.append("accountHolderName", accountHolderName);
//         form.append("qrImage", qrFile);
//         const resQr = await apiPost("/owner/mess/add/qr", form, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//         toast.success(resQr.message || "QR uploaded successfully");
//       } catch (err) {
//         console.error("QR upload failed:", err);
//         toast.error("Failed to upload QR: " + err?.response?.data?.message || err.message);
//       }
//     }

//     // Refresh the details
//     await fetchDetails();
//   } catch (err) {
//     console.error("General error:", err);
//     toast.error("Something went wrong");
//   }
// };


//   const formatDate = (dateStr) => {
//     if (!dateStr) return "-";
//     return new Date(dateStr).toLocaleString();
//   };

//   const renderStatus = (status) => {
//     return (
//       <span
//         className={`px-2 py-1 rounded text-xs font-medium ${
//           status === "active" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
//         }`}
//       >
//         {status || "N/A"}
//       </span>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <p className="text-gray-500">Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="flex h-screen bg-gray-50">
//       <Navbar />
//       <div className="flex-1 md:p-4 pt-16 py-6 px-4 overflow-y-auto">
//                   <OwnerHeader />

//         <div className="flex items-center gap-4 mb-6">
//           <button
//             onClick={() => navigate(-1)}
//             className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
//           >
//             <ArrowLeft className="w-5 h-5" />
//             Back
//           </button>
//         </div>

//         {!details ? (
//           <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-6">
//             <h2 className="text-xl font-semibold mb-4 text-orange-600">
//               Setup Direct Payment
//             </h2>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-sm mb-1 font-medium text-gray-700">
//                   Account Holder Name
//                 </label>
//                 <input
//                   type="text"
//                   value={accountHolderName}
//                   onChange={(e) => setAccountHolderName(e.target.value)}
//                   className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-orange-400"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm mb-1 font-medium text-gray-700">
//                   Phone Number
//                 </label>
//                 <input
//                   type="tel"
//                   value={phoneNumber}
//                   onChange={(e) => setPhoneNumber(e.target.value)}
//                   className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-orange-400"
//                   placeholder="9876543210"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm mb-1 font-medium text-gray-700">
//                   Upload QR Code
//                 </label>
//                 <input type="file" accept="image/*" onChange={handleFile} />
//                 {preview && (
//                   <div className="mt-3">
//                     <img
//                       src={preview}
//                       alt="qr preview"
//                       className="h-40 w-40 object-contain border rounded"
//                     />
//                   </div>
//                 )}
//               </div>

//               <button
//                 type="submit"
//                 className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
//               >
//                 Save
//               </button>
//             </form>
//           </div>
//         ) : (
//           <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-6 space-y-4">
//             <h2 className="text-xl font-semibold text-orange-600 mb-4">
//               Your Payment Details
//             </h2>

//             <div className="space-y-3 text-gray-700">
//               <p>
//                 <span className="font-medium text-gray-800">Account Holder:</span>{" "}
//                 {details.phoneAccountHolderName || details.qrAccountHolderName}
//               </p>
//               <p>
//                 <span className="font-medium text-gray-800">Phone Number:</span>{" "}
//                 {details.phoneNumber}
//               </p>
//               <p>
//                 <span className="font-medium text-gray-800">Phone Status:</span>{" "}
//                 {renderStatus(details.phoneStatus)}
//               </p>
//               <p>
//                 <span className="font-medium text-gray-800">Phone Updated At:</span>{" "}
//                 {formatDate(details.phoneUpdatedAt)}
//               </p>
// {/* 
//               {details.qrCodeUrl && (
//                 <div>
//                   <p className="font-medium text-gray-800 mb-2">QR Code</p>
//                   <img
//                     src={details.qrCodeUrl}
//                     alt="qr"
//                     className="h-40 w-40 object-contain border rounded"
//                   />
//                 </div>
//               )} */}
// {/* {details.qrCodeUrl && (
//   <div>
//     <p className="font-medium text-gray-800 mb-2">QR Code</p>
//     <img
//       src={details.qrCodeUrl.replace("undefined/", `${details.messId}/`)}
//       alt="qr"
//       className="h-40 w-40 object-contain border rounded"
//     />
//   </div>
// )} */}
// {details.qrCodeUrl && (
//   <div>
//     <p className="font-medium text-gray-800 mb-2">QR Code</p>
//     <img
//       src={details.qrCodeUrl}
//       alt="qr"
//       className="h-40 w-40 object-contain border rounded"
//     />
//   </div>
// )}


//               <p>
//                 <span className="font-medium text-gray-800">QR Status:</span>{" "}
//                 {renderStatus(details.qrStatus)}
//               </p>
//               <p>
//                 <span className="font-medium text-gray-800">QR Updated At:</span>{" "}
//                 {formatDate(details.qrCodeUpdatedAt)}
//               </p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../layouts/Navbar";
// import OwnerHeader from "./ownerHeader";
// import { apiGet, apiPost } from "../services/api";
// import storage from "../utils/storage";
// import { ArrowLeft } from "lucide-react";
// import toast from "react-hot-toast";

// export default function OwnerPaymentSetup() {
//   const navigate = useNavigate();
//   const messId = storage.getItem("messId");

//   const [accountHolderName, setAccountHolderName] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [qrFile, setQrFile] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [details, setDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isEditingPhone, setIsEditingPhone] = useState(false);
// const [isEditingQr, setIsEditingQr] = useState(false);
// const [editPhoneNumber, setEditPhoneNumber] = useState("");
// const [editAccountHolder, setEditAccountHolder] = useState("");
// const [editQrHolder, setEditQrHolder] = useState("");
// const [editQrFile, setEditQrFile] = useState(null);
// const [editQrPreview, setEditQrPreview] = useState(null);


//   useEffect(() => {
//     if (!messId) return;
//     fetchDetails();
//   }, [messId]);

//   const fetchDetails = async () => {
//     try {
//       const res = await apiGet(`/owner/mess/${messId}/payment/details`);
//       if (res?.success) {
//         const data = res.data;
//         if (data.qrCodeUrl && data.qrCodeUrl.includes("undefined/")) {
//           data.qrCodeUrl = data.qrCodeUrl.replace("undefined/", `${data.messId}/`);
//         }
//         setDetails(data);
//       }
//     } catch (err) {
//       console.error("Failed to fetch payment details", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFile = (e) => {
//     const f = e.target.files[0];
//     setQrFile(f || null);
//     setPreview(f ? URL.createObjectURL(f) : null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!messId) return;

//     const phoneRegex = /^\d{10,15}$/;
//     if (!phoneRegex.test(phoneNumber)) {
//       alert("Phone number must be 10–15 digits");
//       return;
//     }

//     if (!accountHolderName.trim()) {
//       alert("Account holder name is required");
//       return;
//     }

//     try {
//       try {
//         const resNumber = await apiPost("/owner/mess/add/number", {
//           messId,
//           phoneNumber,
//           accountHolderName,
//         });
//         toast.success(resNumber.message || "Phone number updated successfully");
//       } catch (err) {
//         console.error("Phone number upload failed:", err);
//         toast.error(
//           "Failed to update phone number: " +
//             (err?.response?.data?.message || err.message)
//         );
//       }

//       if (qrFile) {
//         try {
//           const form = new FormData();
//           form.append("messId", messId);
//           form.append("accountHolderName", accountHolderName);
//           form.append("qrImage", qrFile);
//           const resQr = await apiPost("/owner/mess/add/qr", form, {
//             headers: { "Content-Type": "multipart/form-data" },
//           });
//           toast.success(resQr.message || "QR uploaded successfully");
//         } catch (err) {
//           console.error("QR upload failed:", err);
//           toast.error(
//             "Failed to upload QR: " +
//               (err?.response?.data?.message || err.message)
//           );
//         }
//       }

//       await fetchDetails();
//     } catch (err) {
//       console.error("General error:", err);
//       toast.error("Something went wrong");
//     }
//   };

//   const formatDate = (dateStr) => {
//     if (!dateStr) return "-";
//     return new Date(dateStr).toLocaleString();
//   };

//   const renderStatus = (status) => (
//     <span
//       className={`px-2 py-1 rounded text-xs font-medium ${
//         status === "active"
//           ? "bg-green-100 text-green-600"
//           : "bg-red-100 text-red-600"
//       }`}
//     >
//       {status || "N/A"}
//     </span>
//   );

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <p className="text-gray-500">Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="flex h-screen bg-gray-50">
//       <Navbar />
//       <div className="flex-1 md:p-4 pt-16 py-6 px-4 overflow-y-auto">
//         <OwnerHeader />

//         <div className="flex items-center gap-4 mb-6">
    
//                <div className="flex items-center gap-2 mb-6">
//                       <ArrowLeft
//                         className="w-8 h-8 cursor-pointer text-[#232325] hover:text-orange-500"
//                         onClick={() => navigate(-1)}
//                       />
//                       <h2 className="text-2xl font-bold text-[#232325]">Back</h2>
//                     </div>
//         </div>

//         {!details ? (
//           <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8">
//             <h2 className="text-2xl font-bold mb-6 text-orange-500">
//               Setup Direct Payment
//             </h2>
//             <form onSubmit={handleSubmit} className="grid gap-6">
//               <div>
//                 <label className="block text-sm font-semibold mb-1 text-gray-700">
//                   Account Holder Name
//                 </label>
//                 <input
//                   type="text"
//                   value={accountHolderName}
//                   onChange={(e) => setAccountHolderName(e.target.value)}
//                   className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold mb-1 text-gray-700">
//                   Phone Number
//                 </label>
//                 <input
//                   type="tel"
//                   value={phoneNumber}
//                   onChange={(e) => setPhoneNumber(e.target.value)}
//                   className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500"
//                   placeholder="9876543210"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold mb-1 text-gray-700">
//                   Upload QR Code
//                 </label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleFile}
//                   className="block w-full text-sm text-gray-500"
//                 />
//                 {preview && (
//                   <div className="mt-3">
//                     <img
//                       src={preview}
//                       alt="qr preview"
//                       className="h-40 w-40 object-contain border rounded"
//                     />
//                   </div>
//                 )}
//               </div>

//               <button
//                 type="submit"
//                 className="px-6 py-2 bg-orange-500 hover:bg-orange-700 text-white rounded-lg"
//               >
//                 Save
//               </button>
//             </form>
//           </div>
//         ) : (
//           <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
//             {/* Phone Info */}
//             {/* <div className="bg-white rounded-lg shadow p-6 flex flex-col">
//               <h3 className="text-lg font-semibold border-b pb-2 mb-4 text-gray-800">
//                 Phone Payment Information
//               </h3>
//               <p className="mb-2 text-sm">
//                 <span className="font-semibold">Account Holder:</span>{" "}
//                 {details.phoneAccountHolderName}
//               </p>
//               <p className="mb-2 text-sm">
//                 <span className="font-semibold">Phone Number:</span>{" "}
//                 {details.phoneNumber}
//               </p>
//               <p className="mb-2 text-sm">
//                 <span className="font-semibold">Status:</span>{" "}
//                 {renderStatus(details.phoneStatus)}
//               </p>
//               <p className="mb-4 text-sm">
//                 <span className="font-semibold">Updated At:</span>{" "}
//                 {formatDate(details.phoneUpdatedAt)}
//               </p>
//               <button className="mt-auto px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm">
//                 Edit
//               </button>
//             </div> */}
//             {/* Phone Info */}
// <div className="bg-white rounded-lg shadow p-6 flex flex-col">
//   <h3 className="text-lg font-semibold border-b pb-2 mb-4 text-gray-800">
//     Phone Payment Information
//   </h3>
//   {isEditingPhone ? (
//     <>
//       <input
//         type="text"
//         value={editAccountHolder}
//         onChange={(e) => setEditAccountHolder(e.target.value)}
//         className="w-full border rounded px-2 py-1 mb-2"
//         placeholder="Account Holder Name"
//       />
//       <input
//         type="tel"
//         value={editPhoneNumber}
//         onChange={(e) => setEditPhoneNumber(e.target.value)}
//         className="w-full border rounded px-2 py-1 mb-2"
//         placeholder="Phone Number"
//       />
//       <button
//         onClick={async () => {
//           try {
//             const res = await apiPost("/owner/mess/add/number", {
//               messId,
//               phoneNumber: editPhoneNumber,
//               accountHolderName: editAccountHolder,
//             });
//             toast.success(res.message || "Phone updated");
//             setIsEditingPhone(false);
//             fetchDetails();
//           } catch (err) {
//             toast.error("Failed: " + (err?.response?.data?.message || err.message));
//           }
//         }}
//         className="mt-auto px-4 py-2 bg-orange-500 hover:bg-orange-700 text-white rounded-md text-sm"
//       >
//         Submit
//       </button>
//     </>
//   ) : (
//     <>
//       <p className="mb-2 text-sm">
//         <span className="font-semibold">Account Holder:</span>{" "}
//         {details.phoneAccountHolderName}
//       </p>
//       <p className="mb-2 text-sm">
//         <span className="font-semibold">Phone Number:</span>{" "}
//         {details.phoneNumber}
//       </p>
//       <p className="mb-2 text-sm">
//         <span className="font-semibold">Status:</span>{" "}
//         {renderStatus(details.phoneStatus)}
//       </p>
//       <p className="mb-4 text-sm">
//         <span className="font-semibold">Updated At:</span>{" "}
//         {formatDate(details.phoneUpdatedAt)}
//       </p>
//       <button
//         onClick={() => {
//           setIsEditingPhone(true);
//           setEditAccountHolder(details.phoneAccountHolderName || "");
//           setEditPhoneNumber(details.phoneNumber || "");
//         }}
//         className="mt-auto px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm"
//       >
//         Edit
//       </button>
//     </>
//   )}
// </div>


//             {/* UPI Info */}
//             <div className="bg-white rounded-lg shadow p-6 flex flex-col">
//               <h3 className="text-lg font-semibold border-b pb-2 mb-4 text-gray-800">
//                 UPI Information
//               </h3>
//               <p className="mb-2 text-sm">
//                 <span className="font-semibold">UPI ID:</span> Not Provided
//               </p>
//               <p className="mb-2 text-sm">
//                 <span className="font-semibold">Previous UPI ID:</span> None
//               </p>
//               <p className="mb-2 text-sm">
//                 <span className="font-semibold">UPI Holder:</span> Not Provided
//               </p>
//               <p className="mb-4 text-sm">
//                 <span className="font-semibold">Status:</span>{" "}
//                 {renderStatus("inactive")}
//               </p>
//               <button className="mt-auto px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm">
//                 Edit
//               </button>
//             </div>

//             {/* QR Info */}
//             {/* <div className="bg-white rounded-lg shadow p-6 flex flex-col">
//               <h3 className="text-lg font-semibold border-b pb-2 mb-4 text-gray-800">
//                 QR Code Information
//               </h3>
//               <p className="mb-2 text-sm">
//                 <span className="font-semibold">QR Holder:</span>{" "}
//                 {details.qrAccountHolderName || details.phoneAccountHolderName}
//               </p>
//               <p className="mb-2 text-sm">
//                 <span className="font-semibold">Status:</span>{" "}
//                 {renderStatus(details.qrStatus)}
//               </p>
//               <p className="mb-2 text-sm">
//                 <span className="font-semibold">Last Updated:</span>{" "}
//                 {formatDate(details.qrCodeUpdatedAt)}
//               </p>
//               {details.qrCodeUrl && (
//                 <div className="mt-4">
//                   <img
//                     src={details.qrCodeUrl}
//                     alt="QR"
//                     className="h-36 w-36 object-contain border rounded mx-auto"
//                   />
//                 </div>
//               )}
//               <button className="mt-auto px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm">
//                 Edit
//               </button>
//             </div> */}
//             {/* QR Info */}
// <div className="bg-white rounded-lg shadow p-6 flex flex-col">
//   <h3 className="text-lg font-semibold border-b pb-2 mb-4 text-gray-800">
//     QR Code Information
//   </h3>
//   {isEditingQr ? (
//     <>
//       <input
//         type="text"
//         value={editQrHolder}
//         onChange={(e) => setEditQrHolder(e.target.value)}
//         className="w-full border rounded px-2 py-1 mb-2"
//         placeholder="QR Holder Name"
//       />
//       <input
//         type="file"
//         accept="image/*"
//         onChange={(e) => {
//           const file = e.target.files[0];
//           setEditQrFile(file || null);
//           setEditQrPreview(file ? URL.createObjectURL(file) : null);
//         }}
//         className="mb-2"
//       />
//       {editQrPreview && (
//         <img
//           src={editQrPreview}
//           alt="Preview"
//           className="h-32 w-32 border rounded mb-2"
//         />
//       )}
//       <button
//         onClick={async () => {
//           try {
//             if (editQrFile) {
//               const form = new FormData();
//               form.append("messId", messId);
//               form.append("qrImage", editQrFile);
//               await apiPost("/owner/mess/update/qr", form, {
//                 headers: { "Content-Type": "multipart/form-data" },
//               });
//               toast.success("QR image updated");
//             } else {
//               await apiPost("/owner/mess/update/qr/details", {
//                 messId,
//                 accountHolderName: editQrHolder,
//                 qrStatus: "active",
//               });
//               toast.success("QR details updated");
//             }
//             setIsEditingQr(false);
//             fetchDetails();
//           } catch (err) {
//             toast.error("Failed: " + (err?.response?.data?.message || err.message));
//           }
//         }}
//         className="mt-auto px-4 py-2 bg-orange-500 hover:bg-orange-700 text-white rounded-md text-sm"
//       >
//         Submit
//       </button>
//     </>
//   ) : (
//     <>
//       <p className="mb-2 text-sm">
//         <span className="font-semibold">QR Holder:</span>{" "}
//         {details.qrAccountHolderName || details.phoneAccountHolderName}
//       </p>
//       <p className="mb-2 text-sm">
//         <span className="font-semibold">Status:</span>{" "}
//         {renderStatus(details.qrStatus)}
//       </p>
//       <p className="mb-2 text-sm">
//         <span className="font-semibold">Last Updated:</span>{" "}
//         {formatDate(details.qrCodeUpdatedAt)}
//       </p>
//       {details.qrCodeUrl && (
//         <img
//           src={details.qrCodeUrl}
//           alt="QR"
//           className="h-36 w-36 object-contain border rounded mx-auto mb-3"
//         />
//       )}
//       <button
//         onClick={() => {
//           setIsEditingQr(true);
//           setEditQrHolder(details.qrAccountHolderName || "");
//         }}
//         className="mt-auto px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm"
//       >
//         Edit
//       </button>
//     </>
//   )}
// </div>

//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../layouts/Navbar";
// import OwnerHeader from "./ownerHeader";
// import { apiGet, apiPost } from "../services/api";
// import storage from "../utils/storage";
// import { ArrowLeft } from "lucide-react";
// import toast from "react-hot-toast";

// export default function OwnerPaymentSetup() {
//   const navigate = useNavigate();
//   const messId = storage.getItem("messId");

//   const [accountHolderName, setAccountHolderName] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [qrFile, setQrFile] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [details, setDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isEditingPhone, setIsEditingPhone] = useState(false);
//   const [isEditingQr, setIsEditingQr] = useState(false);
//   const [editPhoneNumber, setEditPhoneNumber] = useState("");
//   const [editAccountHolder, setEditAccountHolder] = useState("");
//   const [editQrHolder, setEditQrHolder] = useState("");
//   const [editQrFile, setEditQrFile] = useState(null);
//   const [editQrPreview, setEditQrPreview] = useState(null);

//   useEffect(() => {
//     if (!messId) return;
//     fetchDetails();
//   }, [messId]);

//   const fetchDetails = async () => {
//     try {
//       const res = await apiGet(`/owner/mess/${messId}/payment/details`);
//       console.log("Fetched payment details:", res);
//       if (res?.success) {
//         const data = res.data;
//         if (data.qrCodeUrl && data.qrCodeUrl.includes("undefined/")) {
//           data.qrCodeUrl = data.qrCodeUrl.replace("undefined/", `${data.messId}/`);
//         }
//         setDetails(data);
//       }
//     } catch (err) {
//       console.error("Failed to fetch payment details", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFile = (e) => {
//     const f = e.target.files[0];
//     setQrFile(f || null);
//     setPreview(f ? URL.createObjectURL(f) : null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!messId) return;

//     const phoneRegex = /^\d{10,15}$/;
//     if (!phoneRegex.test(phoneNumber)) {
//       alert("Phone number must be 10–15 digits");
//       return;
//     }

//     if (!accountHolderName.trim()) {
//       alert("Account holder name is required");
//       return;
//     }

//     try {
//       try {
//         const resNumber = await apiPost("/owner/mess/add/number", {
//           messId,
//           phoneNumber,
//           accountHolderName,
//         });
//         toast.success(resNumber.message || "Phone number updated successfully");
//       } catch (err) {
//         console.error("Phone number upload failed:", err);
//         toast.error(
//           "Failed to update phone number: " +
//             (err?.response?.data?.message || err.message)
//         );
//       }

//       if (qrFile) {
//         try {
//           const form = new FormData();
//           form.append("messId", messId);
//           form.append("accountHolderName", accountHolderName);
//           form.append("qrImage", qrFile);
//           const resQr = await apiPost("/owner/mess/add/qr", form, {
//             headers: { "Content-Type": "multipart/form-data" },
//           });
//           toast.success(resQr.message || "QR uploaded successfully");
//         } catch (err) {
//           console.error("QR upload failed:", err);
//           toast.error(
//             "Failed to upload QR: " +
//               (err?.response?.data?.message || err.message)
//           );
//         }
//       }

//       await fetchDetails();
//     } catch (err) {
//       console.error("General error:", err);
//       toast.error("Something went wrong");
//     }
//   };

//   const formatDate = (dateStr) => {
//     if (!dateStr) return "-";
//     return new Date(dateStr).toLocaleString();
//   };

//   const renderStatus = (status) => (
//     <span
//       className={`px-2 py-1 rounded text-xs font-medium ${
//         status === "active"
//           ? "bg-green-100 text-green-600"
//           : "bg-red-100 text-red-600"
//       }`}
//     >
//       {status || "N/A"}
//     </span>
//   );

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <p className="text-gray-500">Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="flex h-screen bg-gray-50">
//       <Navbar />
//       <div className="flex-1 md:p-4 pt-16 py-6 px-4 overflow-y-auto">
//         <OwnerHeader />

//         <div className="flex items-center gap-2 mb-6">
//           <ArrowLeft
//             className="w-8 h-8 cursor-pointer text-[#232325] hover:text-orange-500"
//             onClick={() => navigate(-1)}
//           />
//           <h2 className="text-2xl font-bold text-[#232325]">Back</h2>
//         </div>

//         {!details ? (
//           <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8">
//             <h2 className="text-2xl font-bold mb-6 text-orange-500">
//               Setup Direct Payment
//             </h2>
//             <form onSubmit={handleSubmit} className="grid gap-6">
//               <div>
//                 <label className="block text-sm font-semibold mb-1 text-gray-700">
//                   Account Holder Name
//                 </label>
//                 <input
//                   type="text"
//                   value={accountHolderName}
//                   onChange={(e) => setAccountHolderName(e.target.value)}
//                   className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-500"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold mb-1 text-gray-700">
//                   Phone Number
//                 </label>
//                 <input
//                   type="tel"
//                   value={phoneNumber}
//                   onChange={(e) => setPhoneNumber(e.target.value)}
//                   className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-500"
//                   placeholder="9876543210"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold mb-1 text-gray-700">
//                   Upload QR Code
//                 </label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleFile}
//                   className="block w-full text-sm text-gray-500"
//                 />
//                 {preview && (
//                   <div className="mt-3">
//                     <img
//                       src={preview}
//                       alt="qr preview"
//                       className="h-40 w-40 object-contain border rounded"
//                     />
//                   </div>
//                 )}
//               </div>

//               <button
//                 type="submit"
//                 className="px-6 py-2 bg-orange-500 hover:bg-orange-700 text-white rounded-lg"
//               >
//                 Save
//               </button>
//             </form>
//           </div>
//         ) : (
//           <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Phone Info */}
//             <div className="bg-white rounded-lg shadow p-6 flex flex-col justify-between">
//               <h3 className="text-lg font-semibold border-b pb-2 mb-4 text-gray-800">
//                 Phone Payment Information
//               </h3>
//               {isEditingPhone ? (
//                 <>
//                   <input
//                     type="text"
//                     value={editAccountHolder}
//                     onChange={(e) => setEditAccountHolder(e.target.value)}
//                     className="w-full border rounded px-2 py-1 mb-2"
//                     placeholder="Account Holder Name"
//                   />
//                   <input
//                     type="tel"
//                     value={editPhoneNumber}
//                     onChange={(e) => setEditPhoneNumber(e.target.value)}
//                     className="w-full border rounded px-2 py-1 mb-2"
//                     placeholder="Phone Number"
//                   />
//                   <button
//                     onClick={async () => {
//                       try {
//                         const res = await apiPost("/owner/mess/add/number", {
//                           messId,
//                           phoneNumber: editPhoneNumber,
//                           accountHolderName: editAccountHolder,
//                         });
//                         toast.success(res.message || "Phone updated");
//                         setIsEditingPhone(false);
//                         fetchDetails();
//                       } catch (err) {
//                         toast.error(
//                           "Failed: " +
//                             (err?.response?.data?.message || err.message)
//                         );
//                       }
//                     }}
//                     className="mt-auto px-4 py-2 bg-orange-500 hover:bg-orange-700 text-white rounded-md text-sm"
//                   >
//                     Submit
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <p className="mb-2 text-sm">
//                     <span className="font-semibold">Account Holder:</span>{" "}
//                     {details.phoneAccountHolderName}
//                   </p>
//                   <p className="mb-2 text-sm">
//                     <span className="font-semibold">Phone Number:</span>{" "}
//                     {details.phoneNumber}
//                   </p>
//                   <p className="mb-2 text-sm">
//                     <span className="font-semibold">Status:</span>{" "}
//                     {renderStatus(details.phoneStatus)}
//                   </p>
//                   <p className="mb-4 text-sm">
//                     <span className="font-semibold">Updated At:</span>{" "}
//                     {formatDate(details.phoneUpdatedAt)}
//                   </p>
//                   {/* <button
//                     onClick={() => {
//                       setIsEditingPhone(true);
//                       setEditAccountHolder(details.phoneAccountHolderName || "");
//                       setEditPhoneNumber(details.phoneNumber || "");
//                     }}
//                     className="mt-auto px-4 py-2 bg-orange-500 hover:bg-orange-700 text-white rounded-md text-sm"
//                   >
//                     Edit
//                   </button> */}
//                   <div className="flex justify-start">
//   <button
//     onClick={() => {
//       setIsEditingPhone(true);
//       setEditAccountHolder(details.phoneAccountHolderName || "");
//       setEditPhoneNumber(details.phoneNumber || "");
//     }}
//     className="px-4 py-2 bg-orange-500 hover:bg-orange-700 text-white rounded-md text-sm"
//   >
//     Edit
//   </button>
// </div>

//                 </>
//               )}
//             </div>

//             {/* QR Info */}
//             <div className="bg-white rounded-lg shadow p-6 flex flex-col justify-between">
//               <h3 className="text-lg font-semibold border-b pb-2 mb-4 text-gray-800">
//                 QR Code Information
//               </h3>
//               {isEditingQr ? (
//                 <>
//                   <input
//                     type="text"
//                     value={editQrHolder}
//                     onChange={(e) => setEditQrHolder(e.target.value)}
//                     className="w-full border rounded px-2 py-1 mb-2"
//                     placeholder="QR Holder Name"
//                   />
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => {
//                       const file = e.target.files[0];
//                       setEditQrFile(file || null);
//                       setEditQrPreview(file ? URL.createObjectURL(file) : null);
//                     }}
//                     className="mb-2 border"
//                   />
//                   {editQrPreview && (
//                     <img
//                       src={editQrPreview}
//                       alt="Preview"
//                       className="h-36 w-36 border rounded mb-2 self-center"
//                     />
//                   )}
//                   <button
//                     onClick={async () => {
//                       try {
//                         if (editQrFile) {
//                           const form = new FormData();
//                           form.append("messId", messId);
//                           form.append("qrImage", editQrFile);
//                           await apiPost("/owner/mess/update/qr", form, {
//                             headers: { "Content-Type": "multipart/form-data" },
//                           });
//                           toast.success("QR image updated");
//                         } else {
//                           await apiPost("/owner/mess/update/qr/details", {
//                             messId,
//                             accountHolderName: editQrHolder,
//                             qrStatus: "active",
//                           });
//                           toast.success("QR details updated");
//                         }
//                         setIsEditingQr(false);
//                         fetchDetails();
//                       } catch (err) {
//                         toast.error(
//                           "Failed: " +
//                             (err?.response?.data?.message || err.message)
//                         );
//                       }
//                     }}
//                     className="mt-auto px-4 py-2 bg-orange-500 hover:bg-orange-700 text-white rounded-md text-sm"
//                   >
//                     Submit
//                   </button>
//                 </>
//               ) : (
//                 <div className="flex flex-row items-start justify-between gap-4">
//                   <div>
//                     <p className="mb-2 text-sm">
//                       <span className="font-semibold">QR Holder:</span>{" "}
//                       {details.qrAccountHolderName ||
//                         details.phoneAccountHolderName}
//                     </p>
//                     <p className="mb-2 text-sm">
//                       <span className="font-semibold">Status:</span>{" "}
//                       {renderStatus(details.qrStatus)}
//                     </p>
//                     <p className="mb-2 text-sm">
//                       <span className="font-semibold">Last Updated:</span>{" "}
//                       {formatDate(details.qrCodeUpdatedAt)}
//                     </p>
//                     <button
//                       onClick={() => {
//                         setIsEditingQr(true);
//                         setEditQrHolder(details.qrAccountHolderName || "");
//                       }}
//                       // className="mt-3 px-4 py-2 bg-orange-500 hover:bg-orange-700 text-white rounded-md text-sm"
//                     className="mt-6 px-4 py-2 bg-orange-500 hover:bg-orange-700 text-white rounded-md text-sm"

// >
//                       Edit
//                     </button>
//                   </div>
//                   {details.qrCodeUrl && ( 
//                     <img
//                       src={details.qrCodeUrl}
//                       alt="QR"
//                       className="h-36 w-36 object-contain border rounded"
//                     />
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiGet, apiPost } from "../services/api";
import Navbar from "../layouts/Navbar";
import OwnerHeader from "./ownerHeader";
import { toast } from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import storage from "../utils/storage";

export default function OwnerPaymentSetup() {
  const navigate = useNavigate();
  const messId = storage.getItem("messId");

  const [accountHolderName, setAccountHolderName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [qrFile, setQrFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);
  const [submittingPhone, setSubmittingPhone] = useState(false);
  const [submittingQr, setSubmittingQr] = useState(false);

  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isEditingQr, setIsEditingQr] = useState(false);
  const [editPhoneNumber, setEditPhoneNumber] = useState("");
  const [editAccountHolder, setEditAccountHolder] = useState("");
  const [editQrHolder, setEditQrHolder] = useState("");
  const [editQrFile, setEditQrFile] = useState(null);
  const [editQrPreview, setEditQrPreview] = useState(null);

  useEffect(() => {
    if (!messId) return;
    fetchDetails();
  }, [messId]);

  const fetchDetails = async () => {
    try {
      const res = await apiGet(`/owner/mess/${messId}/payment/details`);
      if (res?.success) {
        const data = res.data;
        if (data.qrCodeUrl && data.qrCodeUrl.includes("undefined/")) {
          data.qrCodeUrl = data.qrCodeUrl.replace("undefined/", `${data.messId}/`);
        }
        setDetails(data);
      }
    } catch (err) {
      console.error("Failed to fetch payment details", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFile = (e) => {
    const f = e.target.files[0];
    setQrFile(f || null);
    setPreview(f ? URL.createObjectURL(f) : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!messId) return;

    const phoneRegex = /^\d{10,15}$/;
    if (!phoneRegex.test(phoneNumber)) {
      toast.error("Phone number must be 10–15 digits");
      return;
    }

    if (!accountHolderName.trim()) {
      toast.error("Account holder name is required");
      return;
    }

    setSaving(true);
    try {
      const resNumber = await apiPost("/owner/mess/add/number", {
        messId,
        phoneNumber,
        accountHolderName,
      });
      toast.success(resNumber.message || "Phone number updated successfully");

      if (qrFile) {
        const form = new FormData();
        form.append("messId", messId);
        form.append("accountHolderName", accountHolderName);
        form.append("qrImage", qrFile);
        const resQr = await apiPost("/owner/mess/add/qr", form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success(resQr.message || "QR uploaded successfully");
      }

      await fetchDetails();
    } catch (err) {
      console.error("General error:", err);
      toast.error("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handlePhoneSubmit = async () => {
    setSubmittingPhone(true);
    try {
      const res = await apiPost("/owner/mess/add/number", {
        messId,
        phoneNumber: editPhoneNumber,
        accountHolderName: editAccountHolder,
      });
      toast.success(res.message || "Phone updated");
      setIsEditingPhone(false);
      fetchDetails();
    } catch (err) {
      toast.error("Failed: " + (err?.response?.data?.message || err.message));
    } finally {
      setSubmittingPhone(false);
    }
  };

  const handleQrSubmit = async () => {
    setSubmittingQr(true);
    try {
      if (editQrFile) {
        const form = new FormData();
        form.append("messId", messId);
        form.append("qrImage", editQrFile);
        await apiPost("/owner/mess/update/qr", form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("QR image updated");
      } else {
        await apiPost("/owner/mess/update/qr/details", {
          messId,
          accountHolderName: editQrHolder,
          qrStatus: "active",
        });
        toast.success("QR details updated");
      }
      setIsEditingQr(false);
      fetchDetails();
    } catch (err) {
      toast.error("Failed: " + (err?.response?.data?.message || err.message));
    } finally {
      setSubmittingQr(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleString();
  };

  const renderStatus = (status) => (
    <span
      className={`px-2 py-1 rounded text-xs font-medium ${
        status === "active" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
      }`}
    >
      {status || "N/A"}
    </span>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Navbar />
      <div className="flex-1 md:p-4 pt-16 py-6 px-4 overflow-y-auto">
        <OwnerHeader />

        <div className="flex items-center gap-2 mb-6">
          <ArrowLeft
            className="w-8 h-8 cursor-pointer text-[#232325] hover:text-orange-500"
            onClick={() => navigate(-1)}
          />
          <h2 className="text-2xl font-bold text-[#232325]">Back</h2>
        </div>

        {!details ? (
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold mb-6 text-orange-500">
              Setup Direct Payment
            </h2>
            <form onSubmit={handleSubmit} className="grid gap-6">
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  Account Holder Name
                </label>
                <input
                  type="text"
                  value={accountHolderName}
                  onChange={(e) => setAccountHolderName(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-500"
                  placeholder="9876543210"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  Upload QR Code
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFile}
                  className="block w-full text-sm text-gray-500"
                />
                {preview && (
                  <div className="mt-3">
                    <img
                      src={preview}
                      alt="qr preview"
                      className="h-40 w-40 object-contain border rounded"
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={saving}
                className={`px-6 py-2 rounded-lg text-white ${
                  saving ? "bg-gray-400 text-white cursor-not-allowed" : "bg-orange-500 hover:bg-orange-700"
                }`}
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </form>
          </div>
        ) : (
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Phone Info */}
            <div className="bg-white rounded-lg shadow p-6 flex flex-col justify-between">
              <h3 className="text-lg font-semibold border-b pb-2 mb-4 text-gray-800">
                Phone Payment Information
              </h3>
              {isEditingPhone ? (
                <>
                  <input
                    type="text"
                    value={editAccountHolder}
                    onChange={(e) => setEditAccountHolder(e.target.value)}
                    className="w-full border rounded px-2 py-1 mb-2"
                    placeholder="Account Holder Name"
                  />
                  <input
                    type="tel"
                    value={editPhoneNumber}
                    onChange={(e) => setEditPhoneNumber(e.target.value)}
                    className="w-full border rounded px-2 py-1 mb-2"
                    placeholder="Phone Number"
                  />
                  <button
                    onClick={handlePhoneSubmit}
                    disabled={submittingPhone}
                    className={`mt-auto px-4 py-2 rounded-md text-white text-sm ${
                      submittingPhone
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-orange-500 hover:bg-orange-700"
                    }`}
                  >
                    {submittingPhone ? "Submitting..." : "Submit"}
                  </button>
                </>
              ) : (
                <>
                  <p className="mb-2 text-sm">
                    <span className="font-semibold">Account Holder:</span>{" "}
                    {details.phoneAccountHolderName}
                  </p>
                  <p className="mb-2 text-sm">
                    <span className="font-semibold">Phone Number:</span>{" "}
                    {details.phoneNumber}
                  </p>
                  <p className="mb-2 text-sm">
                    <span className="font-semibold">Status:</span>{" "}
                    {renderStatus(details.phoneStatus)}
                  </p>
                  <p className="mb-4 text-sm">
                    <span className="font-semibold">Updated At:</span>{" "}
                    {formatDate(details.phoneUpdatedAt)}
                  </p>
                  <div className="flex justify-start">
                    <button
                      onClick={() => {
                        setIsEditingPhone(true);
                        setEditAccountHolder(details.phoneAccountHolderName || "");
                        setEditPhoneNumber(details.phoneNumber || "");
                      }}
                      className="px-4 py-2 bg-orange-500 hover:bg-orange-700 text-white rounded-md text-sm"
                    >
                      Edit
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* QR Info */}
            <div className="bg-white rounded-lg shadow p-6 flex flex-col justify-between">
              <h3 className="text-lg font-semibold border-b pb-2 mb-4 text-gray-800">
                QR Code Information
              </h3>
              {isEditingQr ? (
                <>
                  <input
                    type="text"
                    value={editQrHolder}
                    onChange={(e) => setEditQrHolder(e.target.value)}
                    className="w-full border rounded px-2 py-1 mb-2"
                    placeholder="QR Holder Name"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setEditQrFile(file || null);
                      setEditQrPreview(file ? URL.createObjectURL(file) : null);
                    }}
                    className="mb-2 border"
                  />
                  {editQrPreview && (
                    <img
                      src={editQrPreview}
                      alt="Preview"
                      className="h-36 w-36 border rounded mb-2 self-center"
                    />
                  )}
                  <button
                    onClick={handleQrSubmit}
                    disabled={submittingQr}
                    className={`mt-auto px-4 py-2 rounded-md text-white text-sm ${
                      submittingQr
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-orange-500 hover:bg-orange-700"
                    }`}
                  >
                    {submittingQr ? "Submitting..." : "Submit"}
                  </button>
                </>
              ) : (
                <div className="flex flex-row items-start justify-between gap-4">
                  <div>
                    <p className="mb-2 text-sm">
                      <span className="font-semibold">QR Holder:</span>{" "}
                      {details.qrAccountHolderName || details.phoneAccountHolderName}
                    </p>
                    <p className="mb-2 text-sm">
                      <span className="font-semibold">Status:</span>{" "}
                      {renderStatus(details.qrStatus)}
                    </p>
                    <p className="mb-2 text-sm">
                      <span className="font-semibold">Last Updated:</span>{" "}
                      {formatDate(details.qrCodeUpdatedAt)}
                    </p>
                    <button
                      onClick={() => {
                        setIsEditingQr(true);
                        setEditQrHolder(details.qrAccountHolderName || "");
                      }}
                      className="mt-6 px-4 py-2 bg-orange-500 hover:bg-orange-700 text-white rounded-md text-sm"
                    >
                      Edit
                    </button>
                  </div>
                  {details.qrCodeUrl && (
                    <img
                      src={details.qrCodeUrl}
                      alt="QR"
                      className="h-36 w-36 object-contain border rounded"
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

