// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ArrowLeft } from "lucide-react";
// import { apiPost } from "../services/api";
// import storage from "../utils/storage";
// import toast from "react-hot-toast";

// const CreateLinkedAccount = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({});
//   const [response, setResponse] = useState(null);
//   const messId = storage.getItem("messId"); // ✅ internally fetch messId

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
//     educational_institutes: { pan: "PAN for the institute.", gst: "GST if registered for commercial activity." },
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
  
// const handleChange = (e) => {
//   let { name, value } = e.target;

//   // ✅ Force uppercase for PAN, GST, State
//   if (["pan", "gst", "state"].includes(name)) {
//     value = value.toUpperCase();
//   }

//   setFormData({ ...formData, [name]: value });
// };

// // Mandatory fields (base)
// const baseRequired = [
//   "legal_business_name",
//   "email",
//   "phone",
//   "contact_name",
//   "business_type",
//   "subcategory",
//   "street1",
//   "street2",
//   "city",
//   "state",
//   "postal_code",
// ];

// // Dynamic required fields resolver
// const getRequiredFields = () => {
//   let fields = [...baseRequired];

//   if (panMandatory.includes(formData.business_type)) fields.push("pan");
//   if (gstMandatory.includes(formData.business_type)) fields.push("gst");

//   return fields;
// };
// const handlePhoneInput = (e) => {
//   let value = e.target.value;

//   // Remove any non-digit characters (pasted or typed)
//   value = value.replace(/\D/g, "");

//   setFormData({ ...formData, phone: value });
// };

// // Validation checker
// const isFormValid = () => {
//   const req = getRequiredFields();
//   return req.every((field) => formData[field] && formData[field].trim() !== "");
// };


// const handleSubmit = async (e) => {
//   e.preventDefault();

//   // ✅ Ensure uppercase before sending backend
//   const legal_info = {};
//   if (formData.pan) legal_info.pan = formData.pan.toUpperCase();
//   if (formData.gst) legal_info.gst = formData.gst.toUpperCase();

//   const payload = {
//     messId,
//     email: formData.email,
//     phone: formData.phone,
//     legal_business_name: formData.legal_business_name,
//     customer_facing_business_name: formData.customer_facing_business_name,
//     business_type: formData.business_type,
//     contact_name: formData.contact_name,
//     profile: {
//       category: "food",
//       subcategory: formData.subcategory,
//       addresses: {
//         registered: {
//           street1: formData.street1,
//           street2: formData.street2 || "",
//           city: formData.city,
//           // ✅ State uppercase
//           state: formData.state?.toUpperCase(),
//           postal_code: formData.postal_code,
//           country: "IN",
//         },
//       },
//     },
//     legal_info,
//   };


//   try {
//     const res = await apiPost("/owner/add/linked-account", payload);
//     setResponse({ success: true, result: res });
//     toast.success(`Linked account created! ID: ${res.id || "Success"}`);

//     navigate("/create-stakeholder");
//   } catch (err) {
//     toast.error(`❌ ${err.response?.data?.message || err.message}`);

//     setResponse({
//       success: false,
//       message: err.response?.data?.message || err.message,

//     });
//   }
// };
//   const currentDesc = formData.business_type ? descriptions[formData.business_type] : null;
//   const showPAN = panMandatory.includes(formData.business_type);
//   const showGST = gstMandatory.includes(formData.business_type);
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
//       <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-3xl border relative">
        
//         {/* Back Button */}
//         <button
//           onClick={() => navigate(-1)}
//           className="absolute top-4 left-4 cursor-pointer text-gray-600 hover:text-orange-600 flex items-center gap-1"
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

//           {/* Email + Phone */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <input type="email" name="email" placeholder="Email *" required onChange={handleChange}
//               className="border p-3 rounded-lg w-full" />
//             {/* <input type="text" name="phone" placeholder="Phone *" required onChange={handleChange}
//               className="border p-3 rounded-lg w-full" /> */}
//               <input
//   type="text"
//   name="phone"
//   placeholder="Phone *"
//   required
//   value={formData.phone || ""}
//   onChange={handlePhoneInput}
//   inputMode="numeric"
//   pattern="[0-9]*"
//   maxLength={10} 
//   className="border p-3 rounded-lg w-full"
// />

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

//                   className="border p-3 rounded-lg w-full uppercase" />
//                 {currentDesc && <p className="text-sm text-gray-500 mt-1">{currentDesc.pan}</p>}
//               </div>
//             )}
//             {showGST && (
//               <div>
//                 <input type="text" name="gst" placeholder="GST Number *" required onChange={handleChange}
//                   className="border p-3 rounded-lg w-full uppercase" />  

//                 {currentDesc && <p className="text-sm text-gray-500 mt-1">{currentDesc.gst}</p>}
//               </div>
//             )}
//           </div>

//           {/* Fixed Fields */}
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
//              className="border p-3 rounded-lg w-full uppercase"
// />
//             <input type="text" name="postal_code" placeholder="Postal Code *" required onChange={handleChange}
//               className="border p-3 rounded-lg w-full" />
//             <input type="text" name="country" value="IN" readOnly
//               className="border p-3 rounded-lg w-full bg-gray-100" />
//           </div>

//           {/* Submit */}
//          <button
//   type="submit"
//   disabled={!isFormValid()}
//   className={`w-full px-6 py-3 rounded-lg text-white 
//     ${isFormValid() ? "bg-orange-600 hover:bg-orange-700 cursor-pointer" : "bg-gray-400 cursor-not-allowed"}
//   `}
// >
//   Submit
// </button>

//         </form>

//       {/* Response */}
//       </div>
//     </div>
//   );
// };

// export default CreateLinkedAccount;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { apiPost } from "../services/api";
import storage from "../utils/storage";
import toast from "react-hot-toast";

const CreateLinkedAccount = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [states, setStates] = useState([]);
  const messId = storage.getItem("messId");

  const indiaStates = [
    "ANDHRA PRADESH","ARUNACHAL PRADESH","ASSAM","BIHAR","CHHATTISGARH","GOA","GUJARAT","HARYANA","HIMACHAL PRADESH",
    "JHARKHAND","KARNATAKA","KERALA","MADHYA PRADESH","MAHARASHTRA","MANIPUR","MEGHALAYA","MIZORAM","NAGALAND",
    "ODISHA","PUNJAB","RAJASTHAN","SIKKIM","TAMIL NADU","TELANGANA","TRIPURA","UTTAR PRADESH","UTTARAKHAND",
    "WEST BENGAL","DELHI","JAMMU AND KASHMIR","LADAKH","PUDUCHERRY","ANDAMAN AND NICOBAR ISLANDS",
    "CHANDIGARH","DADRA AND NAGAR HAVELI AND DAMAN AND DIU","LAKSHADWEEP"
  ];

  useEffect(() => {
    setStates(indiaStates);
  }, []);

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (["pan", "gst", "state"].includes(name)) value = value.toUpperCase();
    setFormData({ ...formData, [name]: value });
  };

  const handlePhoneInput = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    setFormData({ ...formData, phone: value });
  };

  const handlePincode = async (e) => {
    let value = e.target.value.replace(/\D/g, "");
    setFormData({ ...formData, postal_code: value });

    if (value.length === 6) {
      try {
        const res = await fetch(`https://api.postalpincode.in/pincode/${value}`);
        const data = await res.json();
        const info = data?.[0]?.PostOffice?.[0];

        if (info) {
          setFormData((prev) => ({
            ...prev,
            city: info.District || prev.city,
            state: (info.State || prev.state).toUpperCase(),
          }));
        }
      } catch {}
    }
  };

  const baseRequired = [
    "legal_business_name","email","phone","contact_name","business_type",
    "subcategory","street1","street2","city","state","postal_code"
  ];

  const panMandatory = [
    "proprietorship","partnership","private_limited","public_limited","trust",
    "llp","ngo","educational_institutes"
  ];
  const gstMandatory = ["partnership","private_limited","public_limited","trust","llp","ngo"];

  const getRequiredFields = () => {
    let fields = [...baseRequired];
    if (panMandatory.includes(formData.business_type)) fields.push("pan");
    if (gstMandatory.includes(formData.business_type)) fields.push("gst");
    return fields;
  };

  const isFormValid = () => {
    const req = getRequiredFields();
    return req.every((field) => formData[field] && formData[field].trim() !== "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const legal_info = {};
    if (formData.pan) legal_info.pan = formData.pan.toUpperCase();
    if (formData.gst) legal_info.gst = formData.gst.toUpperCase();

    const payload = {
      messId,
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
            street2: formData.street2 || "",
            city: formData.city,
            state: formData.state?.toUpperCase(),
            postal_code: formData.postal_code,
            country: "IN",
          },
        },
      },
      legal_info,
    };

    try {
      const res = await apiPost("/owner/add/linked-account", payload);
      toast.success(`Linked account created! ID: ${res.id || "Success"}`);
      navigate("/create-stakeholder");
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

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
    educational_institutes: { pan: "PAN for the institute.", gst: "GST if registered for commercial activity." }
  };

  const currentDesc = formData.business_type ? descriptions[formData.business_type] : null;
  const showPAN = panMandatory.includes(formData.business_type);
  const showGST = gstMandatory.includes(formData.business_type);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-3xl border relative">
        <button onClick={() => navigate(-1)} className="absolute top-4 left-4 cursor-pointer text-gray-600 hover:text-orange-600 flex items-center gap-1">
          <ArrowLeft size={20} /> Back
        </button>

        <h2 className="text-2xl font-bold mb-6 text-orange-600 text-center">Create Razorpay Linked Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="legal_business_name" placeholder="Legal Business Name *" required onChange={handleChange} className="border p-3 rounded-lg w-full" />

          <input type="text" name="customer_facing_business_name" placeholder="Customer Facing Business Name" onChange={handleChange} className="border p-3 rounded-lg w-full" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="email" name="email" placeholder="Email *" required onChange={handleChange} className="border p-3 rounded-lg w-full" />

            <input type="text" name="phone" placeholder="Phone *" required value={formData.phone || ""} onChange={handlePhoneInput} inputMode="numeric" pattern="[0-9]*" maxLength={10} className="border p-3 rounded-lg w-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="contact_name" placeholder="Contact Name *" required onChange={handleChange} className="border p-3 rounded-lg w-full" />

            <select name="business_type" required onChange={handleChange} className="border p-3 rounded-lg w-full">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {showPAN && (
              <div>
                <input type="text" name="pan" placeholder="PAN Number *" required onChange={handleChange} className="border p-3 rounded-lg w-full uppercase" />
                {currentDesc && <p className="text-sm text-gray-500 mt-1">{currentDesc.pan}</p>}
              </div>
            )}

            {showGST && (
              <div>
                <input type="text" name="gst" placeholder="GST Number *" required onChange={handleChange} className="border p-3 rounded-lg w-full uppercase" />
                {currentDesc && <p className="text-sm text-gray-500 mt-1">{currentDesc.gst}</p>}
              </div>
            )}
          </div>

          <input type="text" name="category" value="food" readOnly className="border p-3 rounded-lg w-full bg-gray-100" />

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="street1" placeholder="Street 1 *" required onChange={handleChange} className="border p-3 rounded-lg w-full" />

            <input type="text" name="street2" placeholder="Street 2 *" required onChange={handleChange} className="border p-3 rounded-lg w-full" />

            <input type="text" name="city" placeholder="City *" required value={formData.city || ""} onChange={handleChange} className="border p-3 rounded-lg w-full" />

            <select name="state" required value={formData.state || ""} onChange={handleChange} className="border p-3 rounded-lg w-full uppercase">
              <option value="">-- Select State --</option>
              {states.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <input type="text" name="postal_code" placeholder="Postal Code *" required value={formData.postal_code || ""} onChange={handlePincode} maxLength={6} className="border p-3 rounded-lg w-full" />

            <input type="text" name="country" value="IN" readOnly className="border p-3 rounded-lg w-full bg-gray-100" />
          </div>

          <button
            type="submit"
            disabled={!isFormValid()}
            className={`w-full px-6 py-3 rounded-lg text-white ${
              isFormValid() ? "bg-orange-600 hover:bg-orange-700 cursor-pointer" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateLinkedAccount;
