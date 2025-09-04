// import React, { useState } from "react";

// const CreateLinkedAccount = () => {
//   const [formData, setFormData] = useState({});
//   const [response, setResponse] = useState(null);

//   const descriptions = {
//     individual: { pan: "Personal PAN required for identity verification.", gst: "Not required for individuals." },
//     proprietorship: { pan: "PAN identifies the business owner.", gst: "GST optional unless registered." },
//     partnership: { pan: "PAN identifies the partnership.", gst: "GST mandatory if registered." },
//     private_limited: { pan: "PAN identifies the company.", gst: "GST mandatory for registered companies." },
//     public_limited: { pan: "PAN identifies the company.", gst: "GST mandatory for registered companies." },
//     trust: { pan: "PAN for the trust entity.", gst: "GST if registered." },
//     llp: { pan: "PAN for the LLP entity.", gst: "GST if registered." },
//     ngo: { pan: "PAN for NGO entity.", gst: "GST if applicable." },
//     other: { pan: "Depends on the business structure.", gst: "Depends on registration." },
//     not_yet_registered: { pan: "Not required for unregistered businesses.", gst: "Not required for unregistered businesses." },
//     educational_institutes: { pan: "PAN for the institute.", gst: "GST if registered for commercial activity." }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const legal_info = { pan: formData.pan };
//     if (formData.gst) legal_info.gst = formData.gst;

//     const payload = {
//       mess_name: formData.mess_name,
//       mess_owner_name: formData.mess_owner_name,
//       email: formData.email,
//       phone: formData.phone,
//       type: formData.type,
//       messId: formData.messId,
//       legal_business_name: formData.legal_business_name,
//       customer_facing_business_name: formData.customer_facing_business_name,
//       business_type: formData.business_type,
//       contact_name: formData.contact_name,
//       profile: {
//         category: formData.category,
//         subcategory: formData.subcategory,
//         addresses: {
//           registered: {
//             street1: formData.street1,
//             street2: formData.street2,
//             city: formData.city,
//             state: formData.state,
//             postal_code: formData.postal_code,
//             country: formData.country
//           }
//         }
//       },
//       legal_info
//     };

//     try {
//       const res = await fetch("/admin/create-linked-account", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload)
//       });

//       const result = await res.json();

//       if (res.ok) {
//         setResponse({ success: true, result });
//       } else {
//         setResponse({ success: false, message: result.error?.description || "Unknown error" });
//       }
//     } catch (err) {
//       setResponse({ success: false, message: err.message });
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
//       <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-3xl border">
//         <h2 className="text-2xl font-bold mb-6 text-orange-600">
//           Create Razorpay Linked Account
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Business Info */}
//           <div>
//             <label className="block mb-1 text-gray-700 font-medium">
//               Legal Business Name <span className="text-red-600">*</span>
//             </label>
//             <input
//               type="text"
//               name="legal_business_name"
//               onChange={handleChange}
//               required
//               className="border p-3 rounded-lg w-full focus:outline-orange-500"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 text-gray-700 font-medium">
//               Customer Facing Business Name
//             </label>
//             <input
//               type="text"
//               name="customer_facing_business_name"
//               onChange={handleChange}
//               className="border p-3 rounded-lg w-full focus:outline-orange-500"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 text-gray-700 font-medium">
//               Mess ID <span className="text-red-600">*</span>
//             </label>
//             <input
//               type="text"
//               name="messId"
//               onChange={handleChange}
//               required
//               className="border p-3 rounded-lg w-full focus:outline-orange-500"
//             />
//           </div>

//           {/* Email + Phone */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block mb-1 text-gray-700 font-medium">
//                 Email <span className="text-red-600">*</span>
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 onChange={handleChange}
//                 required
//                 className="border p-3 rounded-lg w-full focus:outline-orange-500"
//               />
//             </div>
//             <div>
//               <label className="block mb-1 text-gray-700 font-medium">
//                 Phone <span className="text-red-600">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="phone"
//                 onChange={handleChange}
//                 required
//                 className="border p-3 rounded-lg w-full focus:outline-orange-500"
//               />
//             </div>
//           </div>

//           {/* Contact + Business Type */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block mb-1 text-gray-700 font-medium">
//                 Contact Name <span className="text-red-600">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="contact_name"
//                 onChange={handleChange}
//                 required
//                 className="border p-3 rounded-lg w-full focus:outline-orange-500"
//               />
//             </div>
//             <div>
//               <label className="block mb-1 text-gray-700 font-medium">
//                 Business Type <span className="text-red-600">*</span>
//               </label>
//               <select
//                 name="business_type"
//                 onChange={handleChange}
//                 required
//                 className="border p-3 rounded-lg w-full focus:outline-orange-500"
//               >
//                 <option value="">-- Select Business Type --</option>
//                 <option value="individual">Individual</option>
//                 <option value="proprietorship">Proprietorship</option>
//                 <option value="partnership">Partnership</option>
//                 <option value="private_limited">Private Limited</option>
//                 <option value="public_limited">Public Limited</option>
//                 <option value="trust">Trust / Society</option>
//                 <option value="llp">LLP</option>
//                 <option value="other">Other</option>
//                 <option value="not_yet_registered">Not Yet Registered</option>
//               </select>
//             </div>
//           </div>

//           {/* Account Type + Category */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block mb-1 text-gray-700 font-medium">Account Type</label>
//               <input
//                 type="text"
//                 name="type"
//                 value="route"
//                 readOnly
//                 className="border p-3 rounded-lg w-full bg-gray-100 text-gray-600"
//               />
//             </div>
//             <div>
//               <label className="block mb-1 text-gray-700 font-medium">Category</label>
//               <input
//                 type="text"
//                 name="category"
//                 value="food"
//                 readOnly
//                 className="border p-3 rounded-lg w-full bg-gray-100 text-gray-600"
//               />
//             </div>
//           </div>

//           {/* Subcategory */}
//           <div>
//             <label className="block mb-1 text-gray-700 font-medium">
//               Subcategory <span className="text-red-600">*</span>
//             </label>
//             <select
//               name="subcategory"
//               onChange={handleChange}
//               required
//               className="border p-3 rounded-lg w-full focus:outline-orange-500"
//             >
//               <option value="">-- Select Subcategory --</option>
//               <option value="online_food_ordering">Online Food Ordering</option>
//               <option value="restaurant">Restaurant</option>
//               <option value="food_court">Food Court</option>
//               <option value="catering">Catering</option>
//               <option value="alcohol">Alcohol</option>
//               <option value="restaurant_search_and_booking">Restaurant Search and Booking</option>
//               <option value="dairy_products">Dairy Products</option>
//               <option value="bakeries">Bakeries</option>
//             </select>
//           </div>

//           {/* Address */}
//           <h3 className="text-lg font-semibold text-gray-700 mt-6">Registered Address</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <input type="text" name="street1" onChange={handleChange} required placeholder="Street 1" className="border p-3 rounded-lg w-full focus:outline-orange-500" />
//             <input type="text" name="street2" onChange={handleChange} required placeholder="Street 2" className="border p-3 rounded-lg w-full focus:outline-orange-500" />
//             <input type="text" name="city" onChange={handleChange} required placeholder="City" className="border p-3 rounded-lg w-full focus:outline-orange-500" />
//             <input type="text" name="state" onChange={handleChange} required placeholder="State" className="border p-3 rounded-lg w-full focus:outline-orange-500" />
//             <input type="text" name="postal_code" onChange={handleChange} required placeholder="Postal Code" className="border p-3 rounded-lg w-full focus:outline-orange-500" />
//             <input type="text" name="country" value="IN" readOnly className="border p-3 rounded-lg w-full bg-gray-100 text-gray-600" />
//           </div>

//           {/* PAN + GST */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <input type="text" name="pan" onChange={handleChange} placeholder="PAN Number" className="border p-3 rounded-lg w-full focus:outline-orange-500" />
//             <input type="text" name="gst" onChange={handleChange} placeholder="GST Number" className="border p-3 rounded-lg w-full focus:outline-orange-500" />
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg w-full font-medium transition"
//           >
//             Submit
//           </button>
//         </form>

//         {/* Response */}
//         {response && (
//           <div
//             className={`mt-4 p-4 rounded-lg ${
//               response.success
//                 ? "bg-green-100 text-green-800 border border-green-400"
//                 : "bg-red-100 text-red-800 border border-red-400"
//             }`}
//           >
//             {response.success ? (
//               <>
//                 ✅ Success: {response.result.id ? `Account ID ${response.result.id}` : "Linked account created"}
//               </>
//             ) : (
//               <>❌ Error: {response.message}</>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CreateLinkedAccount;



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ArrowLeft } from "lucide-react";

// const CreateLinkedAccount = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({});
//   const [response, setResponse] = useState(null);

//   const descriptions = {
//     individual: { pan: "Personal PAN required for identity verification.", gst: "Not required for individuals." },
//     proprietorship: { pan: "PAN identifies the business owner.", gst: "GST optional unless registered." },
//     partnership: { pan: "PAN identifies the partnership.", gst: "GST mandatory if registered." },
//     private_limited: { pan: "PAN identifies the company.", gst: "GST mandatory for registered companies." },
//     public_limited: { pan: "PAN identifies the company.", gst: "GST mandatory for registered companies." },
//     trust: { pan: "PAN for the trust entity.", gst: "GST if registered." },
//     llp: { pan: "PAN for the LLP entity.", gst: "GST if registered." },
//     ngo: { pan: "PAN for NGO entity.", gst: "GST if applicable." },
//     other: { pan: "Depends on the business structure.", gst: "Depends on registration." },
//     not_yet_registered: { pan: "Not required for unregistered businesses.", gst: "Not required for unregistered businesses." },
//     educational_institutes: { pan: "PAN for the institute.", gst: "GST if registered for commercial activity." }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const legal_info = { pan: formData.pan };
//     if (formData.gst) legal_info.gst = formData.gst;

//     const payload = {
//       mess_name: formData.mess_name,
//       mess_owner_name: formData.mess_owner_name,
//       email: formData.email,
//       phone: formData.phone,
//       type: formData.type,
//       messId: formData.messId,
//       legal_business_name: formData.legal_business_name,
//       customer_facing_business_name: formData.customer_facing_business_name,
//       business_type: formData.business_type,
//       contact_name: formData.contact_name,
//       profile: {
//         category: formData.category,
//         subcategory: formData.subcategory,
//         addresses: {
//           registered: {
//             street1: formData.street1,
//             street2: formData.street2,
//             city: formData.city,
//             state: formData.state,
//             postal_code: formData.postal_code,
//             country: formData.country
//           }
//         }
//       },
//       legal_info
//     };

//     try {
//       const res = await fetch("/admin/create-linked-account", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload)
//       });

//       const result = await res.json();

//       if (res.ok) {
//         setResponse({ success: true, result });
//       } else {
//         setResponse({ success: false, message: result.error?.description || "Unknown error" });
//       }
//     } catch (err) {
//       setResponse({ success: false, message: err.message });
//     }
//   };

//   const selectedType = formData.business_type;
//   const currentDesc = selectedType ? descriptions[selectedType] : null;

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
//       <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-3xl border relative">
        
//         {/* Back Button */}
//         <button
//           onClick={() => navigate(-1)}
//           className="absolute top-4 left-4 text-gray-600 hover:text-orange-600 flex items-center gap-1"
//         >
//           <ArrowLeft size={20} /> Back
//         </button>

//         <h2 className="text-2xl font-bold mb-6 text-orange-600 text-center">
//           Create Razorpay Linked Account
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
          
//           {/* Business Info */}
//           <div>
//             <label className="block mb-1 text-gray-700 font-medium">
//               Legal Business Name <span className="text-red-600">*</span>
//             </label>
//             <input
//               type="text"
//               name="legal_business_name"
//               onChange={handleChange}
//               required
//               className="border p-3 rounded-lg w-full focus:outline-orange-500"
//               placeholder="Official business name as per PAN / registration"
//             />
//             <p className="text-sm text-gray-500 mt-1">Name as per PAN or registration documents.</p>
//           </div>

//           <div>
//             <label className="block mb-1 text-gray-700 font-medium">
//               Customer Facing Business Name
//             </label>
//             <input
//               type="text"
//               name="customer_facing_business_name"
//               onChange={handleChange}
//               className="border p-3 rounded-lg w-full focus:outline-orange-500"
//               placeholder="Name visible to customers (optional)"
//             />
//             <p className="text-sm text-gray-500 mt-1">This is the brand name shown to your customers.</p>
//           </div>

//           <div>
//             <label className="block mb-1 text-gray-700 font-medium">
//               Mess ID <span className="text-red-600">*</span>
//             </label>
//             <input
//               type="text"
//               name="messId"
//               onChange={handleChange}
//               required
//               className="border p-3 rounded-lg w-full focus:outline-orange-500"
//               placeholder="Unique Mess ID (internal reference)"
//             />
//             <p className="text-sm text-gray-500 mt-1">Internal reference ID for your mess / business.</p>
//           </div>

//           {/* Email + Phone */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block mb-1 text-gray-700 font-medium">
//                 Email <span className="text-red-600">*</span>
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 onChange={handleChange}
//                 required
//                 className="border p-3 rounded-lg w-full focus:outline-orange-500"
//                 placeholder="Business email for Razorpay communication"
//               />
//               <p className="text-sm text-gray-500 mt-1">Use a valid email for verification and updates.</p>
//             </div>
//             <div>
//               <label className="block mb-1 text-gray-700 font-medium">
//                 Phone <span className="text-red-600">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="phone"
//                 onChange={handleChange}
//                 required
//                 className="border p-3 rounded-lg w-full focus:outline-orange-500"
//                 placeholder="Business phone number (for verification)"
//               />
//               <p className="text-sm text-gray-500 mt-1">Provide a working phone number for verification.</p>
//             </div>
//           </div>

//           {/* Contact + Business Type */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block mb-1 text-gray-700 font-medium">
//                 Contact Name <span className="text-red-600">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="contact_name"
//                 onChange={handleChange}
//                 required
//                 className="border p-3 rounded-lg w-full focus:outline-orange-500"
//                 placeholder="Authorized contact person"
//               />
//               <p className="text-sm text-gray-500 mt-1">Name of the authorized person handling the account.</p>
//             </div>
//             <div>
//               <label className="block mb-1 text-gray-700 font-medium">
//                 Business Type <span className="text-red-600">*</span>
//               </label>
//               <select
//                 name="business_type"
//                 onChange={handleChange}
//                 required
//                 className="border p-3 rounded-lg w-full focus:outline-orange-500"
//               >
//                 <option value="">-- Select Business Type --</option>
//                 <option value="individual">Individual</option>
//                 <option value="proprietorship">Proprietorship</option>
//                 <option value="partnership">Partnership</option>
//                 <option value="private_limited">Private Limited</option>
//                 <option value="public_limited">Public Limited</option>
//                 <option value="trust">Trust / Society</option>
//                 <option value="llp">LLP</option>
//                 <option value="ngo">NGO</option>
//                 <option value="educational_institutes">Educational Institutes</option>
//                 <option value="not_yet_registered">Not Yet Registered</option>
//                 <option value="other">Other</option>
//               </select>
//               <p className="text-sm text-gray-500 mt-1">Choose the correct legal business type.</p>
//             </div>
//           </div>

//           {/* PAN + GST Descriptions */}
//           {currentDesc && (
//             <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-sm text-orange-700">
//               <p><strong>PAN:</strong> {currentDesc.pan}</p>
//               <p><strong>GST:</strong> {currentDesc.gst}</p>
//             </div>
//           )}

//           {/* PAN + GST Inputs */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <input type="text" name="pan" onChange={handleChange} placeholder="PAN Number" className="border p-3 rounded-lg w-full focus:outline-orange-500" />
//             <input type="text" name="gst" onChange={handleChange} placeholder="GST Number" className="border p-3 rounded-lg w-full focus:outline-orange-500" />
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg w-full font-medium transition"
//           >
//             Submit
//           </button>
//         </form>

//         {/* Response */}
//         {response && (
//           <div
//             className={`mt-4 p-4 rounded-lg ${
//               response.success
//                 ? "bg-green-100 text-green-800 border border-green-400"
//                 : "bg-red-100 text-red-800 border border-red-400"
//             }`}
//           >
//             {response.success ? (
//               <>✅ Success: {response.result.id ? `Account ID ${response.result.id}` : "Linked account created"}</>
//             ) : (
//               <>❌ Error: {response.message}</>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CreateLinkedAccount;



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ArrowLeft } from "lucide-react";

// const CreateLinkedAccount = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({});
//   const [response, setResponse] = useState(null);

//   const descriptions = {
//     individual: { pan: "Personal PAN required for identity verification.", gst: "Not required for individuals." },
//     proprietorship: { pan: "PAN identifies the business owner.", gst: "GST optional unless registered." },
//     partnership: { pan: "PAN identifies the partnership.", gst: "GST mandatory if registered." },
//     private_limited: { pan: "PAN identifies the company.", gst: "GST mandatory for registered companies." },
//     public_limited: { pan: "PAN identifies the company.", gst: "GST mandatory for registered companies." },
//     trust: { pan: "PAN for the trust entity.", gst: "GST if registered." },
//     llp: { pan: "PAN for the LLP entity.", gst: "GST if registered." },
//     ngo: { pan: "PAN for NGO entity.", gst: "GST if applicable." },
//     other: { pan: "Depends on the business structure.", gst: "Depends on registration." },
//     not_yet_registered: { pan: "Not required for unregistered businesses.", gst: "Not required for unregistered businesses." },
//     educational_institutes: { pan: "PAN for the institute.", gst: "GST if registered for commercial activity." }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const legal_info = { pan: formData.pan };
//     if (formData.gst) legal_info.gst = formData.gst;

//     const payload = {
//       messId: formData.messId,
//       legal_business_name: formData.legal_business_name,
//       customer_facing_business_name: formData.customer_facing_business_name,
//       email: formData.email,
//       phone: formData.phone,
//       contact_name: formData.contact_name,
//       business_type: formData.business_type,
//       type: "route",
//       profile: {
//         category: "food",
//         subcategory: formData.subcategory,
//         addresses: {
//           registered: {
//             street1: formData.street1,
//             street2: formData.street2,
//             city: formData.city,
//             state: formData.state,
//             postal_code: formData.postal_code,
//             country: "IN"
//           }
//         }
//       },
//       legal_info
//     };

//     try {
//       const res = await fetch("/admin/create-linked-account", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload)
//       });

//       const result = await res.json();
//       if (res.ok) {
//         setResponse({ success: true, result });
//       } else {
//         setResponse({ success: false, message: result.error?.description || "Unknown error" });
//       }
//     } catch (err) {
//       setResponse({ success: false, message: err.message });
//     }
//   };

//   const currentDesc = formData.business_type ? descriptions[formData.business_type] : null;

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
//       <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-3xl border relative">
        
//         {/* Back Button */}
//         <button
//           onClick={() => navigate(-1)}
//           className="absolute top-4 left-4 text-gray-600 hover:text-orange-600 flex items-center gap-1"
//         >
//           <ArrowLeft size={20} /> Back
//         </button>

//         <h2 className="text-2xl font-bold mb-6 text-orange-600 text-center">
//           Create Razorpay Linked Account
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Business Info */}
//           <input type="text" name="legal_business_name" placeholder="Legal Business Name *"
//             required onChange={handleChange} className="border p-3 rounded-lg w-full" />

//           <input type="text" name="customer_facing_business_name" placeholder="Customer Facing Business Name"
//             onChange={handleChange} className="border p-3 rounded-lg w-full" />

//           <input type="text" name="messId" placeholder="Mess ID *"
//             required onChange={handleChange} className="border p-3 rounded-lg w-full" />

//           {/* Email + Phone */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <input type="email" name="email" placeholder="Email *" required onChange={handleChange}
//               className="border p-3 rounded-lg w-full" />
//             <input type="text" name="phone" placeholder="Phone *" required onChange={handleChange}
//               className="border p-3 rounded-lg w-full" />
//           </div>

//           {/* Contact + Business Type */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <input type="text" name="contact_name" placeholder="Contact Name *" required onChange={handleChange}
//               className="border p-3 rounded-lg w-full" />
//             <select name="business_type" required onChange={handleChange}
//               className="border p-3 rounded-lg w-full">
//               <option value="">-- Select Business Type --</option>
//               <option value="individual">Individual</option>
//               <option value="proprietorship">Proprietorship</option>
//               <option value="partnership">Partnership</option>
//               <option value="private_limited">Private Limited</option>
//               <option value="public_limited">Public Limited</option>
//               <option value="trust">Trust / Society</option>
//               <option value="llp">LLP</option>
//               <option value="ngo">NGO</option>
//               <option value="educational_institutes">Educational Institutes</option>
//               <option value="not_yet_registered">Not Yet Registered</option>
//               <option value="other">Other</option>
//             </select>
//           </div>

//           {/* PAN/GST Descriptions */}
//           {currentDesc && (
//             <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-sm text-orange-700">
//               <p><strong>PAN:</strong> {currentDesc.pan}</p>
//               <p><strong>GST:</strong> {currentDesc.gst}</p>
//             </div>
//           )}

//           {/* PAN + GST */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <input type="text" name="pan" placeholder="PAN Number" onChange={handleChange}
//               className="border p-3 rounded-lg w-full" />
//             <input type="text" name="gst" placeholder="GST Number" onChange={handleChange}
//               className="border p-3 rounded-lg w-full" />
//           </div>

//           {/* Fixed Fields */}
//           <input type="text" name="type" value="route" readOnly className="border p-3 rounded-lg w-full bg-gray-100" />
//           <input type="text" name="category" value="food" readOnly className="border p-3 rounded-lg w-full bg-gray-100" />

//           {/* Subcategory */}
//           <select name="subcategory" required onChange={handleChange} className="border p-3 rounded-lg w-full">
//             <option value="">-- Select Subcategory --</option>
//             <option value="online_food_ordering">Online Food Ordering</option>
//             <option value="restaurant">Restaurant</option>
//             <option value="food_court">Food Court</option>
//             <option value="catering">Catering</option>
//             <option value="alcohol">Alcohol</option>
//             <option value="restaurant_search_and_booking">Restaurant Search & Booking</option>
//             <option value="dairy_products">Dairy Products</option>
//             <option value="bakeries">Bakeries</option>
//           </select>

//           {/* Registered Address */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <input type="text" name="street1" placeholder="Street 1 *" required onChange={handleChange}
//               className="border p-3 rounded-lg w-full" />
//             <input type="text" name="street2" placeholder="Street 2 *" required onChange={handleChange}
//               className="border p-3 rounded-lg w-full" />
//             <input type="text" name="city" placeholder="City *" required onChange={handleChange}
//               className="border p-3 rounded-lg w-full" />
//             <input type="text" name="state" placeholder="State *" required onChange={handleChange}
//               className="border p-3 rounded-lg w-full" />
//             <input type="text" name="postal_code" placeholder="Postal Code *" required onChange={handleChange}
//               className="border p-3 rounded-lg w-full" />
//             <input type="text" name="country" value="IN" readOnly
//               className="border p-3 rounded-lg w-full bg-gray-100" />
//           </div>

//           {/* Submit */}
//           <button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg w-full">
//             Submit
//           </button>
//         </form>

//         {/* Response */}
//         {response && (
//           <div
//             className={`mt-4 p-4 rounded-lg ${
//               response.success
//                 ? "bg-green-100 text-green-800 border border-green-400"
//                 : "bg-red-100 text-red-800 border border-red-400"
//             }`}
//           >
//             {response.success ? (
//               <>✅ Success: {response.result.id ? `Account ID ${response.result.id}` : "Linked account created"}</>
//             ) : (
//               <>❌ Error: {response.message}</>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CreateLinkedAccount;




// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ArrowLeft } from "lucide-react";
// import { apiPost } from "../services/api";
// import { toast } from "react-hot-toast";
// import storage from "../utils/storage";

// const CreateLinkedAccount = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({});
//   const [response, setResponse] = useState(null);
//   const messId = storage.getItem("messId");

//   const descriptions = {
//     individual: { pan: "Personal PAN required for identity verification.", gst: "Not required for individuals." },
//     proprietorship: { pan: "PAN identifies the business owner.", gst: "GST optional unless registered." },
//     partnership: { pan: "PAN identifies the partnership.", gst: "GST mandatory if registered." },
//     private_limited: { pan: "PAN identifies the company.", gst: "GST mandatory for registered companies." },
//     public_limited: { pan: "PAN identifies the company.", gst: "GST mandatory for registered companies." },
//     trust: { pan: "PAN for the trust entity.", gst: "GST if registered." },
//     llp: { pan: "PAN for the LLP entity.", gst: "GST if registered." },
//     ngo: { pan: "PAN for NGO entity.", gst: "GST if applicable." },
//     other: { pan: "Depends on the business structure.", gst: "Depends on registration." },
//     not_yet_registered: { pan: "Not required for unregistered businesses.", gst: "Not required for unregistered businesses." },
//     educational_institutes: { pan: "PAN for the institute.", gst: "GST if registered for commercial activity." }
//   };

//   const panMandatory = [
//     "proprietorship",
//     "partnership",
//     "private_limited",
//     "public_limited",
//     "trust",
//     "llp",
//     "ngo",
//     "educational_institutes",
//   ];
//   const gstMandatory = ["partnership", "private_limited", "public_limited", "trust", "llp", "ngo"];

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const legal_info = { pan: formData.pan };
//     if (formData.gst) legal_info.gst = formData.gst;

//     const payload = {
//       messId: messId,
//       legal_business_name: formData.legal_business_name,
//       customer_facing_business_name: formData.customer_facing_business_name,
//       email: formData.email,
//       phone: formData.phone,
//       contact_name: formData.contact_name,
//       business_type: formData.business_type,
//       type: "route",
//       profile: {
//         category: "food",
//         subcategory: formData.subcategory,
//         addresses: {
//           registered: {
//             street1: formData.street1,
//             street2: formData.street2,
//             city: formData.city,
//             state: formData.state,
//             postal_code: formData.postal_code,
//             country: "IN",
//           },
//         },
//       },
//       legal_info,
//     };

//     try {
//       const res = await fetch("/admin/create-linked-account", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const result = await res.json();
//       if (res.ok) {
//         setResponse({ success: true, result });
//       } else {
//         setResponse({ success: false, message: result.error?.description || "Unknown error" });
//       }
//     } catch (err) {
//       setResponse({ success: false, message: err.message });
//     }
//   };

//   const currentDesc = formData.business_type ? descriptions[formData.business_type] : null;
//   const showPAN = panMandatory.includes(formData.business_type);
//   const showGST = gstMandatory.includes(formData.business_type);

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
//       <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-3xl border relative">
        
//         {/* Back Button */}
//         <button
//           onClick={() => navigate(-1)}
//           className="absolute top-4 left-4 text-gray-600 hover:text-orange-600 flex items-center gap-1"
//         >
//           <ArrowLeft size={20} /> Back
//         </button>

//         <h2 className="text-2xl font-bold mb-6 text-orange-600 text-center">
//           Create Razorpay Linked Account
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Business Info */}
//           <input type="text" name="legal_business_name" placeholder="Legal Business Name *"
//             required onChange={handleChange} className="border p-3 rounded-lg w-full" />

//           <input type="text" name="customer_facing_business_name" placeholder="Customer Facing Business Name"
//             onChange={handleChange} className="border p-3 rounded-lg w-full" />

//           {/* <input type="text" name="messId" placeholder="Mess ID *"
//             required onChange={handleChange} className="border p-3 rounded-lg w-full" /> */}

//           {/* Email + Phone */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <input type="email" name="email" placeholder="Email *" required onChange={handleChange}
//               className="border p-3 rounded-lg w-full" />
//             <input type="text" name="phone" placeholder="Phone *" required onChange={handleChange}
//               className="border p-3 rounded-lg w-full" />
//           </div>

//           {/* Contact + Business Type */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <input type="text" name="contact_name" placeholder="Contact Name *" required onChange={handleChange}
//               className="border p-3 rounded-lg w-full" />
//             <select name="business_type" required onChange={handleChange}
//               className="border p-3 rounded-lg w-full">
//               <option value="">-- Select Business Type --</option>
//               <option value="individual">Individual</option>
//               <option value="proprietorship">Proprietorship</option>
//               <option value="partnership">Partnership</option>
//               <option value="private_limited">Private Limited</option>
//               <option value="public_limited">Public Limited</option>
//               <option value="trust">Trust / Society</option>
//               <option value="llp">LLP</option>
//               <option value="ngo">NGO</option>
//               <option value="educational_institutes">Educational Institutes</option>
//               <option value="not_yet_registered">Not Yet Registered</option>
//               <option value="other">Other</option>
//             </select>
//           </div>

//           {/* PAN + GST (Dynamic) */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {showPAN && (
//               <div>
//                 <input type="text" name="pan" placeholder="PAN Number *" required onChange={handleChange}
//                   className="border p-3 rounded-lg w-full" />
//                 {currentDesc && <p className="text-sm text-gray-500 mt-1">{currentDesc.pan}</p>}
//               </div>
//             )}
//             {showGST && (
//               <div>
//                 <input type="text" name="gst" placeholder="GST Number *" required onChange={handleChange}
//                   className="border p-3 rounded-lg w-full" />
//                 {currentDesc && <p className="text-sm text-gray-500 mt-1">{currentDesc.gst}</p>}
//               </div>
//             )}
//           </div>

//           {/* Fixed Fields */}
//           <input type="text" name="type" value="route" readOnly className="border p-3 rounded-lg w-full bg-gray-100" />
//           <input type="text" name="category" value="food" readOnly className="border p-3 rounded-lg w-full bg-gray-100" />

//           {/* Subcategory */}
//           <select name="subcategory" required onChange={handleChange} className="border p-3 rounded-lg w-full">
//             <option value="">-- Select Subcategory --</option>
//             <option value="online_food_ordering">Online Food Ordering</option>
//             <option value="restaurant">Restaurant</option>
//             <option value="food_court">Food Court</option>
//             <option value="catering">Catering</option>
//             <option value="alcohol">Alcohol</option>
//             <option value="restaurant_search_and_booking">Restaurant Search & Booking</option>
//             <option value="dairy_products">Dairy Products</option>
//             <option value="bakeries">Bakeries</option>
//           </select>

//           {/* Registered Address */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <input type="text" name="street1" placeholder="Street 1 *" required onChange={handleChange}
//               className="border p-3 rounded-lg w-full" />
//             <input type="text" name="street2" placeholder="Street 2 *" required onChange={handleChange}
//               className="border p-3 rounded-lg w-full" />
//             <input type="text" name="city" placeholder="City *" required onChange={handleChange}
//               className="border p-3 rounded-lg w-full" />
//             <input type="text" name="state" placeholder="State *" required onChange={handleChange}
//               className="border p-3 rounded-lg w-full" />
//             <input type="text" name="postal_code" placeholder="Postal Code *" required onChange={handleChange}
//               className="border p-3 rounded-lg w-full" />
//             <input type="text" name="country" value="IN" readOnly
//               className="border p-3 rounded-lg w-full bg-gray-100" />
//           </div>

//           {/* Submit */}
//           <button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg w-full">
//             Submit
//           </button>
//         </form>

//         {/* Response */}
//         {response && (
//           <div
//             className={`mt-4 p-4 rounded-lg ${
//               response.success
//                 ? "bg-green-100 text-green-800 border border-green-400"
//                 : "bg-red-100 text-red-800 border border-red-400"
//             }`}
//           >
//             {response.success ? (
//               <>✅ Success: {response.result.id ? `Account ID ${response.result.id}` : "Linked account created"}</>
//             ) : (
//               <>❌ Error: {response.message}</>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CreateLinkedAccount;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { apiPost } from "../services/api";
import storage from "../utils/storage";

const CreateLinkedAccount = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [response, setResponse] = useState(null);
  const messId = storage.getItem("messId"); // ✅ internally fetch messId

  const descriptions = {
    individual: { pan: "Personal PAN required for identity verification.", gst: "Not required for individuals." },
    proprietorship: { pan: "PAN identifies the business owner.", gst: "GST optional unless registered." },
    partnership: { pan: "PAN identifies the partnership.", gst: "GST mandatory if registered." },
    private_limited: { pan: "PAN identifies the company.", gst: "GST mandatory for registered companies." },
    public_limited: { pan: "PAN identifies the company.", gst: "GST mandatory for registered companies." },
    trust: { pan: "PAN for the trust entity.", gst: "GST if registered." },
    llp: { pan: "PAN for the LLP entity.", gst: "GST if registered." },
    ngo: { pan: "PAN for NGO entity.", gst: "GST if applicable." },
    other: { pan: "Depends on the business structure.", gst: "Depends on registration." },
    not_yet_registered: { pan: "Not required for unregistered businesses.", gst: "Not required for unregistered businesses." },
    educational_institutes: { pan: "PAN for the institute.", gst: "GST if registered for commercial activity." },
  };

  const panMandatory = [
    "proprietorship",
    "partnership",
    "private_limited",
    "public_limited",
    "trust",
    "llp",
    "ngo",
    "educational_institutes",
  ];
  const gstMandatory = ["partnership", "private_limited", "public_limited", "trust", "llp", "ngo"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const legal_info = { pan: formData.pan };
  if (formData.gst) legal_info.gst = formData.gst;

  const payload = {
    messId, // storage se nikal ke
    email: formData.email,
    phone: formData.phone,
    legal_business_name: formData.legal_business_name,
    customer_facing_business_name: formData.customer_facing_business_name,
    business_type: formData.business_type,
    contact_name: formData.contact_name,
    profile: {
      category: "food",
      subcategory: formData.subcategory,
      addresses: {
        registered: {
          street1: formData.street1,
          street2: formData.street2 || "",   // ✅ empty string bhej do agar user ne nahi dala
          city: formData.city,
          state: formData.state,
          postal_code: formData.postal_code,
          country: "IN",
        },
      },
    },
    legal_info,
  };
      console.log("Payload", payload);

  try {
    const res = await apiPost("/owner/add/linked-account", payload);
    setResponse({ success: true, result: res });
    navigate("/create-stakeholder");

    

  } catch (err) {
    setResponse({
      success: false,
      message: err.response?.data?.message || err.message,
    });
  }
};



  const currentDesc = formData.business_type ? descriptions[formData.business_type] : null;
  const showPAN = panMandatory.includes(formData.business_type);
  const showGST = gstMandatory.includes(formData.business_type);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-3xl border relative">
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 text-gray-600 hover:text-orange-600 flex items-center gap-1"
        >
          <ArrowLeft size={20} /> Back
        </button>

        <h2 className="text-2xl font-bold mb-6 text-orange-600 text-center">
          Create Razorpay Linked Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Business Info */}
          <input type="text" name="legal_business_name" placeholder="Legal Business Name *"
            required onChange={handleChange} className="border p-3 rounded-lg w-full" />

          <input type="text" name="customer_facing_business_name" placeholder="Customer Facing Business Name"
            onChange={handleChange} className="border p-3 rounded-lg w-full" />

          {/* Email + Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="email" name="email" placeholder="Email *" required onChange={handleChange}
              className="border p-3 rounded-lg w-full" />
            <input type="text" name="phone" placeholder="Phone *" required onChange={handleChange}
              className="border p-3 rounded-lg w-full" />
          </div>

          {/* Contact + Business Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="contact_name" placeholder="Contact Name *" required onChange={handleChange}
              className="border p-3 rounded-lg w-full" />
            <select name="business_type" required onChange={handleChange}
              className="border p-3 rounded-lg w-full">
              <option value="">-- Select Business Type --</option>
              <option value="individual">Individual</option>
              <option value="proprietorship">Proprietorship</option>
              <option value="partnership">Partnership</option>
              <option value="private_limited">Private Limited</option>
              <option value="public_limited">Public Limited</option>
              <option value="trust">Trust / Society</option>
              <option value="llp">LLP</option>
              <option value="ngo">NGO</option>
              <option value="educational_institutes">Educational Institutes</option>
              <option value="not_yet_registered">Not Yet Registered</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* PAN + GST (Dynamic) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {showPAN && (
              <div>
                <input type="text" name="pan" placeholder="PAN Number *" required onChange={handleChange}
                  className="border p-3 rounded-lg w-full" />
                {currentDesc && <p className="text-sm text-gray-500 mt-1">{currentDesc.pan}</p>}
              </div>
            )}
            {showGST && (
              <div>
                <input type="text" name="gst" placeholder="GST Number *" required onChange={handleChange}
                  className="border p-3 rounded-lg w-full" />
                {currentDesc && <p className="text-sm text-gray-500 mt-1">{currentDesc.gst}</p>}
              </div>
            )}
          </div>

          {/* Fixed Fields */}
          <input type="text" name="category" value="food" readOnly className="border p-3 rounded-lg w-full bg-gray-100" />

          {/* Subcategory */}
          <select name="subcategory" required onChange={handleChange} className="border p-3 rounded-lg w-full">
            <option value="">-- Select Subcategory --</option>
            <option value="online_food_ordering">Online Food Ordering</option>
            <option value="restaurant">Restaurant</option>
            <option value="food_court">Food Court</option>
            <option value="catering">Catering</option>
            <option value="alcohol">Alcohol</option>
            <option value="restaurant_search_and_booking">Restaurant Search & Booking</option>
            <option value="dairy_products">Dairy Products</option>
            <option value="bakeries">Bakeries</option>
          </select>

          {/* Registered Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="street1" placeholder="Street 1 *" required onChange={handleChange}
              className="border p-3 rounded-lg w-full" />
            <input type="text" name="street2" placeholder="Street 2 *" required onChange={handleChange}
              className="border p-3 rounded-lg w-full" />
            <input type="text" name="city" placeholder="City *" required onChange={handleChange}
              className="border p-3 rounded-lg w-full" />
            <input type="text" name="state" placeholder="State *" required onChange={handleChange}
              className="border p-3 rounded-lg w-full" />
            <input type="text" name="postal_code" placeholder="Postal Code *" required onChange={handleChange}
              className="border p-3 rounded-lg w-full" />
            <input type="text" name="country" value="IN" readOnly
              className="border p-3 rounded-lg w-full bg-gray-100" />
          </div>

          {/* Submit */}
          <button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg w-full">
            Submit
          </button>
        </form>

        {/* Response */}
        {response && (
          <div
            className={`mt-4 p-4 rounded-lg ${
              response.success
                ? "bg-green-100 text-green-800 border border-green-400"
                : "bg-red-100 text-red-800 border border-red-400"
            }`}
          >
            {response.success ? (
              <>✅ Success: {response.result.id ? `Account ID ${response.result.id}` : "Linked account created"}</>
            ) : (
              <>❌ Error: {response.message}</>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateLinkedAccount;
