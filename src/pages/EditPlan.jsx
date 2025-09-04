// import { useLocation, useNavigate } from 'react-router-dom';
// import { useState } from 'react';
// import { apiPost } from '../services/api';

// const EditPlan = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { plan } = location.state || {};

//   const [formData, setFormData] = useState({
//     messId: plan?.messId || '',
//     name: plan?.name || '',
//     description: plan?.description || '',
//     menu: plan?.menu || '',
//     durationDays: plan?.durationDays || '',
//     price: plan?.price || ''
//   });

//   const handleChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleSubmit = async () => {
//     try {
//       const response = await apiPost(`/owner/mess/plan/update/${plan._id}`, formData);
//       console.log('Update Success:', response);
//       navigate('/plans'); // or show success toast
//     } catch (error) {
//       console.error('Update Failed:', error);
//     }
//   };

//   return (
//     <div className="p-6">
//       <input
//         name="name"
//         value={formData.name}
//         onChange={handleChange}
//         placeholder="Plan Name"
//       />
//       <input
//         name="description"
//         value={formData.description}
//         onChange={handleChange}
//         placeholder="Description"
//       />
//       <input
//         name="menu"
//         value={formData.menu}
//         onChange={handleChange}
//         placeholder="Menu"
//       />
//       <input
//         name="durationDays"
//         value={formData.durationDays}
//         onChange={handleChange}
//         placeholder="Expiry Days"
//       />
//       <input
//         name="price"
//         value={formData.price}
//         onChange={handleChange}
//         placeholder="Price ₹"
//       />
//       <button onClick={handleSubmit}>Edit Plan</button>
//     </div>
//   );
// };

// export default EditPlan;



// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import Navbar from '../layouts/Navbar';
// import OwnerHeader from './ownerHeader';
// import { apiPost } from '../services/api';

// const EditPlan = () => {

//   const navigate = useNavigate();

// const { state } = useLocation();
// const plan = state?.plan; // ✅ Move this up first

// const [planData, setPlanData] = useState(plan); // ✅ Now safe to use


//   const [formData, setFormData] = useState({
//     messId: plan?.messId || '',
//     name: plan?.name || '',
//     description: plan?.description || '',
//     menu: Array.isArray(plan?.menu) ? plan.menu.join(', ') : plan?.menu || '',
//     durationDays: plan?.durationDays || '',
//     price: plan?.price || '',
//     totalTokens: plan?.totalTokens || '', // ✅ Added this line

//   });

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };


// const handleImageUpload = async (e) => {
//   const file = e.target.files[0];
//   if (!file || !plan?._id) return;

//   const form = new FormData();
//   form.append('image', file);

//   try {
//     const res = await apiPost(`/owner/mess/plan/update/image/${plan._id}`, form, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     });

//     if (res?.success) {
//       const updatedImageUrl = res.data.data.imageUrl + `?t=${Date.now()}`;
      
//       // ✅ Use setPlanData to trigger re-render
//       setPlanData((prev) => ({
//         ...prev,
//         imageUrl: updatedImageUrl,
//       }));

//       console.log('✅ Image updated:', updatedImageUrl);
//     }
//   } catch (err) {
//     console.error('❌ Failed to update image:', err);
//   }
// };


//   const handleSubmit = async () => {
//   const payload = {
//     ...formData,
//     imageUrl: planData.imageUrl, // ✅ include latest image
//     menu: formData.menu.split(',').map((item) => item.trim()),
//   };

//   try {
//     const res = await apiPost(`/owner/mess/plan/update/${plan._id}`, payload);
//     console.log('✅ Plan Updated:', res.data);
//     navigate('/plans');
//   } catch (error) {
//     console.error('❌ Update Failed:', error);
//   }
// };

//   return (
//     <div className="flex min-h-screen bg-[#FFF7F0]">
//       <Navbar />
//       <div className="flex-1 px-10 py-8">
//         <OwnerHeader ownerName="Owner Name" messName="Test Mess 1" />

//         <h2 className="text-xl font-semibold text-gray-700 mb-6">Plan Details,</h2>

//         {/* Plan Card Preview */}
//         <div className="bg-white border rounded-xl p-4 shadow mb-8 w-full max-w-md">
//           <div className="flex gap-4">
           
//             <img
//   src={planData.imageUrl || 'https://via.placeholder.com/80'}
//   alt="plan"
//   className="w-24 h-24 rounded object-cover"
// />
// <div>
//   <h3 className="font-bold text-lg text-blue-900">{planData.name}</h3>
//   <p className="text-sm text-gray-600">{planData.description}</p>
//   <p className="text-sm text-green-800 font-medium">₹ {planData.price}</p>
//   <p className="text-sm text-gray-500">{planData.durationDays} Days</p>
// </div>

//           </div>
//         </div>

//         {/* Editable Form */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
//           <div>
//             <label className="block mb-1 text-sm font-medium text-gray-700">Plan Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full border px-4 py-2 rounded-lg"
//               placeholder="Enter plan name"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
//             <input
//               type="text"
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               className="w-full border px-4 py-2 rounded-lg"
//               placeholder="What this plan includes?"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 text-sm font-medium text-gray-700">Menu</label>
//             <input
//               type="text"
//               name="menu"
//               value={formData.menu}
//               onChange={handleChange}
//               className="w-full border px-4 py-2 rounded-lg"
//               placeholder="Brief about meals included"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 text-sm font-medium text-gray-700">Expiry (Days)</label>
//             <input
//               type="number"
//               name="durationDays"
//               value={formData.durationDays}
//               onChange={handleChange}
//               className="w-full border px-4 py-2 rounded-lg"
//               placeholder="How many days it's valid for?"
//             />
//           </div>

// <div>
//   <label className="block mb-1 text-sm font-medium text-gray-700">Total Tokens</label>
//   <input
//     type="number"
//     name="totalTokens"
//     placeholder="Enter total tokens for this plan"
//     value={formData.totalTokens}
//     onChange={handleChange}
//     className="w-full border px-4 py-2 rounded-lg"
//     min="1"
//   />
// </div>

//           <div>
//             <label className="block mb-1 text-sm font-medium text-gray-700">Price ₹</label>
//             <input
//               type="number"
//               name="price"
//               value={formData.price}
//               onChange={handleChange}
//               className="w-full border px-4 py-2 rounded-lg"
//               placeholder="Plan price ₹"
//             />
//           </div>

//            <input
//   type="file"
//   accept="image/*"
//   onChange={handleImageUpload}
//   className="w-full border px-4 py-2 rounded-lg cursor-pointer"
// />

//         </div>

//         <div className="mt-10">
//           <button
//             onClick={handleSubmit}
//             className="bg-orange-500 text-white flex items-center justify-center px-8 py-3 rounded-2xl text-lg hover:bg-orange-600"
//           >
//             Edit Plan
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditPlan;


import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../layouts/Navbar';
import OwnerHeader from './ownerHeader';
import { apiPost } from '../services/api';
import toast from 'react-hot-toast';


const EditPlan = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const plan = state?.plan;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    messId: plan?.messId || '',
    name: plan?.name || '',
    description: plan?.description || '',
    menu: Array.isArray(plan?.menu) ? plan.menu.join(', ') : plan?.menu || '',
    durationDays: plan?.durationDays || '',
    price: plan?.price || '',
    totalTokens: plan?.totalTokens || '',
    imageUrl: plan?.imageUrl || '', // keep existing image, disabled
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    const payload = {
      ...formData,
      menu: formData.menu.split(',').map((item) => item.trim()),
    };

    try {
      const res = await apiPost(`/owner/mess/plan/update/${plan._id}`, payload);
      console.log('✅ Plan Updated:', res.data);
      toast.success('Plan updated successfully!');
      navigate('/plans'); // back to plans list
    } catch (error) {
      console.error('❌ Update Failed:', error);
      setLoading(false);
      toast.error('Failed to update plan. Please try again.');
    }
  };

  return (
    <div className="flex h-screen">
      <Navbar />
      {/* <div className="flex-1 p-6 overflow-y-auto bg-[#f9f4f0] min-h-screen"> */}
      <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-gray-50 overflow-y-auto">

        <OwnerHeader ownerName="Owner Name" messName="Test Mess 1" />

        <h2 className="text-xl font-semibold text-gray-700 mb-6">Plan Details,</h2>

        {/* Plan Card Preview */}
        <div className="bg-white border rounded-xl p-4 shadow mb-8 w-full max-w-md">
          <div className="flex gap-4">
            <img
              src={formData.imageUrl || 'https://via.placeholder.com/80'}
              alt="plan"
              className="w-24 h-24 rounded object-cover opacity-50" // disabled look
            />
            <div>
              <h3 className="font-bold text-lg text-blue-900">{formData.name}</h3>
              <p className="text-sm text-gray-600">{formData.description}</p>
              <p className="text-sm text-green-800 font-medium">₹ {formData.price}</p>
              <p className="text-sm text-gray-500">{formData.durationDays} Days</p>
            </div>
          </div>
        </div>

        {/* Editable Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Plan Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg"
              placeholder="Enter plan name"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg"
              placeholder="What this plan includes?"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Menu</label>
            <input
              type="text"
              name="menu"
              value={formData.menu}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg"
              placeholder="Brief about meals included"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Expiry (Days)</label>
            <input
              type="number"
              name="durationDays"
              value={formData.durationDays}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg"
              placeholder="How many days it's valid for?"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Total Tokens</label>
            <input
              type="number"
              name="totalTokens"
              placeholder="Enter total tokens for this plan"
              value={formData.totalTokens}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg"
              min="1"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Price ₹</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg"
              placeholder="Plan price ₹"
            />
          </div>

         
<div>
  <label className="block mb-1 text-sm font-medium text-gray-700">Plan Image (Disabled)</label>
  <input
    type="file"
    accept="image/*"
    disabled
    className="w-full border px-4 py-2 rounded-lg bg-gray-100 cursor-not-allowed"
  />
</div>

        </div>

        <div className="mt-10">
          {/* <button
            onClick={handleSubmit}
            className="bg-orange-500 text-white flex items-center justify-center px-8 py-3 rounded-2xl text-lg hover:bg-orange-600"
          >
            Edit Plan
          </button> */}
                              <button
  type="submit"
  onClick={handleSubmit}
  disabled={loading}
  className={`w-full font-semibold py-3 rounded-xl transition 
    ${loading 
      ? 'bg-gray-400 text-white cursor-not-allowed' 
      : 'bg-orange-500 text-white hover:bg-green-900'
    }`}
>
  {loading ? (
    <div className="flex items-center justify-center gap-2">
      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
      <span>Editing New Plan...</span>
    </div>
  ) : (
    "Edit New Plan"
  )}
</button>
        </div>
      </div>
    </div>
  );
};

export default EditPlan;
