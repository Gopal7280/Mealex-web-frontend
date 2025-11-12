import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { apiPost } from "../services/api";
import storage from "../utils/storage";
import toast from "react-hot-toast";

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
  let { name, value } = e.target;

  // ✅ Force uppercase for PAN, GST, State
  if (["pan", "gst", "state"].includes(name)) {
    value = value.toUpperCase();
  }

  setFormData({ ...formData, [name]: value });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  // ✅ Ensure uppercase before sending backend
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
          // ✅ State uppercase
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
    setResponse({ success: true, result: res });
    toast.success(`Linked account created! ID: ${res.id || "Success"}`);

    navigate("/create-stakeholder");
  } catch (err) {
    toast.error(`❌ ${err.response?.data?.message || err.message}`);

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

                  className="border p-3 rounded-lg w-full uppercase" />
                {currentDesc && <p className="text-sm text-gray-500 mt-1">{currentDesc.pan}</p>}
              </div>
            )}
            {showGST && (
              <div>
                <input type="text" name="gst" placeholder="GST Number *" required onChange={handleChange}
                  className="border p-3 rounded-lg w-full uppercase" />  

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
             className="border p-3 rounded-lg w-full uppercase"
/>
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
      </div>
    </div>
  );
};

export default CreateLinkedAccount;


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ArrowLeft } from "lucide-react";
// import { apiPost } from "../services/api";
// import storage from "../utils/storage";
// import toast from "react-hot-toast";
// import { useTranslation } from "react-i18next";

// const CreateLinkedAccount = () => {
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({});
//   const [response, setResponse] = useState(null);
//   const messId = storage.getItem("messId");

//   const descriptions = {
//     individual: { pan: t("descriptions.individual.pan"), gst: t("descriptions.individual.gst") },
//     proprietorship: { pan: t("descriptions.proprietorship.pan"), gst: t("descriptions.proprietorship.gst") },
//     partnership: { pan: t("descriptions.partnership.pan"), gst: t("descriptions.partnership.gst") },
//     private_limited: { pan: t("descriptions.private_limited.pan"), gst: t("descriptions.private_limited.gst") },
//     public_limited: { pan: t("descriptions.public_limited.pan"), gst: t("descriptions.public_limited.gst") },
//     trust: { pan: t("descriptions.trust.pan"), gst: t("descriptions.trust.gst") },
//     llp: { pan: t("descriptions.llp.pan"), gst: t("descriptions.llp.gst") },
//     ngo: { pan: t("descriptions.ngo.pan"), gst: t("descriptions.ngo.gst") },
//     other: { pan: t("descriptions.other.pan"), gst: t("descriptions.other.gst") },
//     not_yet_registered: { pan: t("descriptions.not_yet_registered.pan"), gst: t("descriptions.not_yet_registered.gst") },
//     educational_institutes: { pan: t("descriptions.educational_institutes.pan"), gst: t("descriptions.educational_institutes.gst") },
//   };

//   const panMandatory = [
//     "proprietorship", "partnership", "private_limited", "public_limited",
//     "trust", "llp", "ngo", "educational_institutes",
//   ];
//   const gstMandatory = ["partnership", "private_limited", "public_limited", "trust", "llp", "ngo"];
  
//   const handleChange = (e) => {
//     let { name, value } = e.target;
//     if (["pan", "gst", "state"].includes(name)) value = value.toUpperCase();
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const legal_info = {};
//     if (formData.pan) legal_info.pan = formData.pan.toUpperCase();
//     if (formData.gst) legal_info.gst = formData.gst.toUpperCase();

//     const payload = {
//       messId,
//       email: formData.email,
//       phone: formData.phone,
//       legal_business_name: formData.legal_business_name,
//       customer_facing_business_name: formData.customer_facing_business_name,
//       business_type: formData.business_type,
//       contact_name: formData.contact_name,
//       profile: {
//         category: "food",
//         subcategory: formData.subcategory,
//         addresses: {
//           registered: {
//             street1: formData.street1,
//             street2: formData.street2 || "",
//             city: formData.city,
//             state: formData.state?.toUpperCase(),
//             postal_code: formData.postal_code,
//             country: "IN",
//           },
//         },
//       },
//       legal_info,
//     };

//     try {
//       const res = await apiPost("/owner/add/linked-account", payload);
//       setResponse({ success: true, result: res });
//       toast.success(t("linkedAccountCreated", { id: res.id || "Success" }));
//       navigate("/create-stakeholder");
//     } catch (err) {
//       toast.error(`❌ ${err.response?.data?.message || err.message}`);
//       setResponse({ success: false, message: err.response?.data?.message || err.message });
//     }
//   };

//   const currentDesc = formData.business_type ? descriptions[formData.business_type] : null;
//   const showPAN = panMandatory.includes(formData.business_type);
//   const showGST = gstMandatory.includes(formData.business_type);

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
//       <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-3xl border relative">
//         <button
//           onClick={() => navigate(-1)}
//           className="absolute top-4 left-4 text-gray-600 hover:text-orange-600 flex items-center gap-1"
//         >
//           <ArrowLeft size={20} /> {t("back")}
//         </button>

//         <h2 className="text-2xl font-bold mb-6 text-orange-600 text-center">
//           {t("createLinkedAccountTitle")}
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input type="text" name="legal_business_name" placeholder={t("legalBusinessName")} required onChange={handleChange} className="border p-3 rounded-lg w-full" />
//           <input type="text" name="customer_facing_business_name" placeholder={t("customerFacingBusinessName")} onChange={handleChange} className="border p-3 rounded-lg w-full" />

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <input type="email" name="email" placeholder={t("email")} required onChange={handleChange} className="border p-3 rounded-lg w-full" />
//             <input type="text" name="phone" placeholder={t("phone")} required onChange={handleChange} className="border p-3 rounded-lg w-full" />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <input type="text" name="contact_name" placeholder={t("contactName")} required onChange={handleChange} className="border p-3 rounded-lg w-full" />
//             <select name="business_type" required onChange={handleChange} className="border p-3 rounded-lg w-full">
//               <option value="">{t("selectBusinessType")}</option>
//               {Object.keys(descriptions).map(key => (
//                 <option key={key} value={key}>{t(`businessTypes.${key}`)}</option>
//               ))}
//             </select>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {showPAN && (
//               <div>
//                 <input type="text" name="pan" placeholder={t("panNumber")} required onChange={handleChange} className="border p-3 rounded-lg w-full uppercase" />
//                 {currentDesc && <p className="text-sm text-gray-500 mt-1">{currentDesc.pan}</p>}
//               </div>
//             )}
//             {showGST && (
//               <div>
//                 <input type="text" name="gst" placeholder={t("gstNumber")} required onChange={handleChange} className="border p-3 rounded-lg w-full uppercase" />
//                 {currentDesc && <p className="text-sm text-gray-500 mt-1">{currentDesc.gst}</p>}
//               </div>
//             )}
//           </div>

//           <input type="text" name="category" value="food" readOnly className="border p-3 rounded-lg w-full bg-gray-100" />

//           <select name="subcategory" required onChange={handleChange} className="border p-3 rounded-lg w-full">
//             <option value="">{t("selectSubcategory")}</option>
//             {["online_food_ordering", "restaurant", "food_court", "catering", "alcohol", "restaurant_search_and_booking", "dairy_products", "bakeries"].map(sub => (
//               <option key={sub} value={sub}>{t(`subcategories.${sub}`)}</option>
//             ))}
//           </select>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <input type="text" name="street1" placeholder={t("street1")} required onChange={handleChange} className="border p-3 rounded-lg w-full" />
//             <input type="text" name="street2" placeholder={t("street2")} required onChange={handleChange} className="border p-3 rounded-lg w-full" />
//             <input type="text" name="city" placeholder={t("city")} required onChange={handleChange} className="border p-3 rounded-lg w-full" />
//             <input type="text" name="state" placeholder={t("state")} required onChange={handleChange} className="border p-3 rounded-lg w-full uppercase" />
//             <input type="text" name="postal_code" placeholder={t("postalCode")} required onChange={handleChange} className="border p-3 rounded-lg w-full" />
//             <input type="text" name="country" value="IN" readOnly className="border p-3 rounded-lg w-full bg-gray-100" />
//           </div>

//           <button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg w-full">
//             {t("submit")}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateLinkedAccount;
