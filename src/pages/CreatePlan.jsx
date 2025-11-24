import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, ArrowLeft } from 'lucide-react';
import Navbar from '../layouts/Navbar';
import OwnerHeader from './ownerHeader';
import { apiPost } from '../services/api';
import storage from '../utils/storage';
import toast from 'react-hot-toast';
import defaultPlanImage from "../assets/noiimage.png";


const CreatePlan = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    description: '',
    menu: '',
    durationDays: '',
    price: '',
    totalTokens: '',
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [menu, setMenu] = useState([]); // menu items array
const [menuItem, setMenuItem] = useState(''); // input for single item

const Label = ({ text }) => {
  const parts = text.split("*");
  return (
    <label className="block font-semibold mb-1 text-[#232325]">
      {parts[0]}
      {text.includes("*") && <span className="text-red-500">*</span>}
    </label>
  );
};

const assetToFile = async (assetUrl, fileName) => {
  const response = await fetch(assetUrl);
  const blob = await response.blob();
  return new File([blob], fileName, { type: blob.type });
};

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };
  const validateFields = () => {
  return (
    form.name.trim() !== '' &&
    menu.length > 0 &&
    form.durationDays.trim() !== '' &&
    form.price.trim() !== '' &&
    form.totalTokens.trim() !== '' 
    );
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (
      !form.name.trim() ||
      menu.length === 0 ||
      !form.durationDays ||
      !form.price ||
      !form.totalTokens 
        ) {
      toast.error('⚠️ Please fill all required fields before submitting.');
      return;
    }

    setLoading(true);
    const messId = storage.getItem('messId');

    // if (!messId || !form.image) {
    //   toast.error('Mess ID or Image missing, try again.');
    //   setLoading(false);
    //   return;
    // }
    if (!messId) {
  toast.error('Mess ID missing, try again.');
  setLoading(false);
  return;
}
 let finalImageFile = form.image;

if (!finalImageFile) {
  finalImageFile = await assetToFile(defaultPlanImage, "default-plan.jpg");
}


    const formData = new FormData();
    formData.append('messId', messId);
    formData.append('name', form.name);
    formData.append('description', form.description);
    formData.append('durationDays', Number(form.durationDays));
    formData.append('price', Number(form.price));
    formData.append('totalTokens', Number(form.totalTokens));
    // formData.append('image', form.image);
    formData.append("image", finalImageFile);

    // formData.append(
    //   'menu',
    //   JSON.stringify(form.menu.split(',').map((item) => item.trim()))
    // );
    formData.append('menu', JSON.stringify(menu));
   console.log("📦 Menu being sent:", menu);

    try {
      await apiPost('/owner/mess/plan/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success(`Plan "${form.name}" created successfully!`);
      

      setForm({
        name: '',
        description: '',
        menu: '',
        durationDays: '',
        price: '',
        totalTokens: '',
        image: null,
      });

      navigate('/plans');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <Navbar />
      <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-gray-50 overflow-y-auto">
        <OwnerHeader />

        <div className="flex items-center gap-2 mb-6">
          <ArrowLeft
            className="w-8 h-8 cursor-pointer text-[#232325] hover:text-red-500"
            onClick={() => navigate(-1)}
          />
          <h2 className="text-xl sm:text-2xl font-semibold  text-[#232325]">
            Create New Plan
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-5xl"
        >
          <div>
            {/* <label className="block font-semibold mb-1">Plan Name*</label> */}
<Label text="Plan Name*" />

            <input
              type="text"
              name="name"
              placeholder="Enter plan name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-black rounded-md px-3 py-2 sm:px-4 sm:py-2"
              required
            />
          </div>

          <div>
            {/* <label className="block font-semibold mb-1">Description</label> */}
<Label text="Description" />
            <input
              type="text"
              name="description"
              placeholder="What this plan includes?"
              value={form.description}
              onChange={handleChange}
              className="w-full border border-black rounded-md px-3 py-2 sm:px-4 sm:py-2"
              
            />
          </div>

          <div>
  {/* <label className="block font-semibold mb-1">Menu Items*</label> */}
<Label text="Menu Items*" />
  <div className="flex gap-2">
    <input
      type="text"
      placeholder="Add item..."
      value={menuItem}
      onChange={(e) => setMenuItem(e.target.value)}
      className="w-full border border-black rounded-md px-3 py-2"
    />
    <button
      type="button"
      onClick={() => {
        if (menuItem.trim() !== '') {
          setMenu([...menu, menuItem.trim()]);
          setMenuItem('');
        }
      }}
      className="bg-orange-500 text-white cursor-pointer px-4 py-2 rounded-md font-semibold"
    >
      +
    </button>
  </div>

  <div className="mt-2 flex flex-wrap gap-2">
    {menu.map((item, index) => (
      <span
        key={index}
        className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-1"
      >
        {item}
        <button
          type="button"
          onClick={() =>
            setMenu(menu.filter((_, i) => i !== index))
          }
          className="text-red-500 cursor-pointer font-bold ml-1"
        >
          x
        </button>
      </span>
    ))}
  </div>
</div>
          <div>
<Label text="Duration* " />
            <input
              type="number"
              name="durationDays"
              placeholder="e.g., 30 (in Days)"
              value={form.durationDays}
              onChange={handleChange}
              className="w-full border border-black rounded-md px-3 py-2 sm:px-4 sm:py-2"
              required
            />
          </div>
          <div>
<Label text="Plan Price* (₹)" />
            <input
              type="number"
              name="price"
              placeholder="Plan price ₹"
              value={form.price}
              onChange={handleChange}
              className="w-full border border-black rounded-md px-3 py-2 sm:px-4 sm:py-2"
              required
            />
          </div>

          <div>
            {/* <label className="block font-semibold mb-1">Total Tokens*</label> */}
<Label text="Total Tokens*" />
            <input
              type="number"
              name="totalTokens"
              placeholder="Enter total tokens"
              value={form.totalTokens}
              onChange={handleChange}
              className="w-full border border-black rounded-md px-3 py-2 sm:px-4 sm:py-2"
              required
              min="1"
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            {/* <label className="block font-semibold mb-1">Plan’s Image*</label> */}
<Label text="Plan’s Image" />
            <div className="relative border border-black rounded-md px-4 py-3">
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex items-center gap-2 text-gray-500">
                <Upload className="w-6 h-6" />
                <span className="truncate">
                  {form.image && typeof form.image === 'object'
                    ? form.image.name
                    : 'Upload (jpg, png, etc.)'}
                </span>
              </div>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
  type="submit"
  disabled={loading || !validateFields()}
  className={`flex-1 font-semibold py-3 rounded-xl transition 
    ${
      loading || !validateFields()
        ? 'bg-gray-400 text-white cursor-not-allowed'
        : 'bg-orange-500 text-white cursor-pointer hover:bg-green-900'
    }`}
>
  {loading ? (
    <div className="flex items-center justify-center gap-2">
      <span className="w-4 h-4 border-2 border-white border-t-transparent  rounded-full animate-spin"></span>
      <span>Creating New Plan...</span>
    </div>
  ) : (
    'Create New Plan'
  )}
</button>
         <button
                type="button"
                onClick={() => navigate('/plans')}
                className="flex-1 bg-white hover:bg-red-500 hover:text-white cursor-pointer hover:border-red-500 text-orange-500 border-2 border-orange-500 py-3 rounded-2xl font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CreatePlan;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Upload, ArrowLeft } from 'lucide-react';
// import Navbar from '../layouts/Navbar';
// import OwnerHeader from './ownerHeader';
// import { apiPost } from '../services/api';
// import storage from '../utils/storage';
// import toast from 'react-hot-toast';

// const CreatePlan = () => {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     name: '',
//     description: '',
//     menu: '',
//     durationDays: '',
//     price: '',
//     totalTokens: '',
//     image: null,
//   });
//   const [loading, setLoading] = useState(false);
//   const [menu, setMenu] = useState([]); // menu items array
// const [menuItem, setMenuItem] = useState(''); // input for single item
// const [planType, setPlanType] = useState("normal"); // default: Normal Plan

// const [schedule, setSchedule] = useState({
//   breakfast: "",
//   lunch: "",
//   dinner: "",
// });

// const Label = ({ text }) => {
//   const parts = text.split("*");
//   return (
//     <label className="block font-semibold mb-1 text-[#232325]">
//       {parts[0]}
//       {text.includes("*") && <span className="text-red-500">*</span>}
//     </label>
//   );
// };


//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (files && files.length > 0) {
//       setForm((prev) => ({ ...prev, [name]: files[0] }));
//     } else {
//       setForm((prev) => ({ ...prev, [name]: value }));
//     }
//   };
//   const validateFields = () => {
//   return (
//     form.name.trim() !== '' &&
//     menu.length > 0 &&
//     form.durationDays.trim() !== '' &&
//     form.price.trim() !== '' &&
//     form.totalTokens.trim() !== '' &&
//     form.image !== null
//   );
// };


//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   if (loading) return;

//   //   if (
//   //     !form.name.trim() ||
//   //     menu.length === 0 ||
//   //     !form.durationDays ||
//   //     !form.price ||
//   //     !form.totalTokens ||
//   //     !form.image
//   //   ) {
//   //     toast.error('⚠️ Please fill all required fields before submitting.');
//   //     return;
//   //   }

//   //   setLoading(true);
//   //   const messId = storage.getItem('messId');

//   //   if (!messId || !form.image) {
//   //     toast.error('Mess ID or Image missing, try again.');
//   //     setLoading(false);
//   //     return;
//   //   }

//   //   const formData = new FormData();
//   //   formData.append('messId', messId);
//   //   formData.append('name', form.name);
//   //   formData.append('description', form.description);
//   //   formData.append('durationDays', Number(form.durationDays));
//   //   formData.append('price', Number(form.price));
//   //   formData.append('totalTokens', Number(form.totalTokens));
//   //   formData.append('image', form.image);
//   //   // formData.append(
//   //   //   'menu',
//   //   //   JSON.stringify(form.menu.split(',').map((item) => item.trim()))
//   //   // );
//   //   formData.append('menu', JSON.stringify(menu));
//   //  console.log("📦 Menu being sent:", menu);

//   //   try {
//   //     await apiPost('/owner/mess/plan/create', formData, {
//   //       headers: { 'Content-Type': 'multipart/form-data' },
//   //     });
//   //     toast.success(`Plan "${form.name}" created successfully!`);
      

//   //     setForm({
//   //       name: '',
//   //       description: '',
//   //       menu: '',
//   //       durationDays: '',
//   //       price: '',
//   //       totalTokens: '',
//   //       image: null,
//   //     });

//   //     navigate('/plans');
//   //   } catch (err) {
//   //     toast.error(err?.response?.data?.message || 'Something went wrong.');
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   if (loading) return;

//   if (!validateFields()) {
//     toast.error("⚠️ Please fill all required fields before submitting.");
//     return;
//   }

//   if (planType === "scheduled") {
//     if (!schedule.breakfast && !schedule.lunch && !schedule.dinner) {
//       toast.error("⚠️ Add at least one meal time in schedule!");
//       return;
//     }
//   }

//   setLoading(true);
//   const messId = storage.getItem("messId");

//   const formData = new FormData();
//   formData.append("messId", messId);
//   formData.append("name", form.name);
//   formData.append("description", form.description);
//   formData.append("durationDays", Number(form.durationDays));
//   formData.append("price", Number(form.price));
//   formData.append("totalTokens", Number(form.totalTokens));
//   formData.append("image", form.image);
//   formData.append("menu", JSON.stringify(menu));

//   if (planType === "scheduled") {
//     const scheduleData = {};

//     if (schedule.breakfast) scheduleData.breakfast = [schedule.breakfast];
//     if (schedule.lunch) scheduleData.lunch = [schedule.lunch];
//     if (schedule.dinner) scheduleData.dinner = [schedule.dinner];

//     formData.append("schedule", JSON.stringify(scheduleData));
//   }

//   try {
//     await apiPost("/owner/mess/plan/create", formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });

//     toast.success(
//       `${planType === "scheduled" ? "Scheduled" : "Normal"} Plan "${form.name}" created successfully!`
//     );

//     navigate("/plans");
//   } catch (err) {
//     toast.error(err?.response?.data?.message || "Something went wrong.");
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <div className="flex h-screen">
//       <Navbar />
//       <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-gray-50 overflow-y-auto">
//         <OwnerHeader />

//         <div className="flex items-center gap-2 mb-6">
//           <ArrowLeft
//             className="w-8 h-8 cursor-pointer text-[#232325] hover:text-red-500"
//             onClick={() => navigate(-1)}
//           />
//           <h2 className="text-xl sm:text-2xl font-semibold  text-[#232325]">
//             Create New Plan
//           </h2>
//                   </div>

//           {/* 🔘 Plan Type Select */}
// <div className="mb-6 flex gap-6 items-center">
//   <label className="flex items-center gap-2 cursor-pointer font-semibold">
//     <input
//       type="radio"
//       name="planType"
//       value="normal"
//       checked={planType === "normal"}
//       onChange={() => setPlanType("normal")}
//     />
//     Normal Plan
//   </label>

//   <label className="flex items-center gap-2 cursor-pointer font-semibold">
//     <input
//       type="radio"
//       name="planType"
//       value="scheduled"
//       checked={planType === "scheduled"}
//       onChange={() => setPlanType("scheduled")}
//     />
//     Scheduled Plan
//   </label>
// </div>


//         <form
//           onSubmit={handleSubmit}
//           className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-5xl"
//         >
//           <div>
//             {/* <label className="block font-semibold mb-1">Plan Name*</label> */}
// <Label text="Plan Name*" />

//             <input
//               type="text"
//               name="name"
//               placeholder="Enter plan name"
//               value={form.name}
//               onChange={handleChange}
//               className="w-full border border-black rounded-md px-3 py-2 sm:px-4 sm:py-2"
//               required
//             />
//           </div>

//           <div>
//             {/* <label className="block font-semibold mb-1">Description</label> */}
// <Label text="Description" />
//             <input
//               type="text"
//               name="description"
//               placeholder="What this plan includes?"
//               value={form.description}
//               onChange={handleChange}
//               className="w-full border border-black rounded-md px-3 py-2 sm:px-4 sm:py-2"
              
//             />
//           </div>

//           <div>
//   {/* <label className="block font-semibold mb-1">Menu Items*</label> */}
// <Label text="Menu Items*" />
//   <div className="flex gap-2">
//     <input
//       type="text"
//       placeholder="Add item..."
//       value={menuItem}
//       onChange={(e) => setMenuItem(e.target.value)}
//       className="w-full border border-black rounded-md px-3 py-2"
//     />
//     <button
//       type="button"
//       onClick={() => {
//         if (menuItem.trim() !== '') {
//           setMenu([...menu, menuItem.trim()]);
//           setMenuItem('');
//         }
//       }}
//       className="bg-orange-500 text-white cursor-pointer px-4 py-2 rounded-md font-semibold"
//     >
//       +
//     </button>
//   </div>

//   <div className="mt-2 flex flex-wrap gap-2">
//     {menu.map((item, index) => (
//       <span
//         key={index}
//         className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-1"
//       >
//         {item}
//         <button
//           type="button"
//           onClick={() =>
//             setMenu(menu.filter((_, i) => i !== index))
//           }
//           className="text-red-500 cursor-pointer font-bold ml-1"
//         >
//           x
//         </button>
//       </span>
//     ))}
//   </div>
// </div>
//           <div>
// <Label text="Duration* " />
//             <input
//               type="number"
//               name="durationDays"
//               placeholder="e.g., 30 (in Days)"
//               value={form.durationDays}
//               onChange={handleChange}
//               className="w-full border border-black rounded-md px-3 py-2 sm:px-4 sm:py-2"
//               required
//             />
//           </div>
//           {planType === "scheduled" && (
//   <>
//     <div className="col-span-1 md:col-span-2">
//       <Label text="Breakfast Time (HH:MM)" />
//       <input
//         type="time"
//         value={schedule.breakfast}
//         onChange={(e) => setSchedule({ ...schedule, breakfast: e.target.value })}
//         className="w-full border border-black rounded-md px-3 py-2"
//       />
//     </div>

//     <div className="col-span-1 md:col-span-2">
//       <Label text="Lunch Time (HH:MM)" />
//       <input
//         type="time"
//         value={schedule.lunch}
//         onChange={(e) => setSchedule({ ...schedule, lunch: e.target.value })}
//         className="w-full border border-black rounded-md px-3 py-2"
//       />
//     </div>

//     <div className="col-span-1 md:col-span-2">
//       <Label text="Dinner Time (HH:MM)" />
//       <input
//         type="time"
//         value={schedule.dinner}
//         onChange={(e) => setSchedule({ ...schedule, dinner: e.target.value })}
//         className="w-full border border-black rounded-md px-3 py-2"
//       />
//     </div>
//   </>
// )}

//           <div>
// <Label text="Plan Price* (₹)" />
//             <input
//               type="number"
//               name="price"
//               placeholder="Plan price ₹"
//               value={form.price}
//               onChange={handleChange}
//               className="w-full border border-black rounded-md px-3 py-2 sm:px-4 sm:py-2"
//               required
//             />
//           </div>

//           <div>
//             {/* <label className="block font-semibold mb-1">Total Tokens*</label> */}
// <Label text="Total Tokens*" />
//             <input
//               type="number"
//               name="totalTokens"
//               placeholder="Enter total tokens"
//               value={form.totalTokens}
//               onChange={handleChange}
//               className="w-full border border-black rounded-md px-3 py-2 sm:px-4 sm:py-2"
//               required
//               min="1"
//             />
//           </div>

//           <div className="col-span-1 md:col-span-2">
//             {/* <label className="block font-semibold mb-1">Plan’s Image*</label> */}
// <Label text="Plan’s Image*" />
//             <div className="relative border border-black rounded-md px-4 py-3">
//               <input
//                 type="file"
//                 name="image"
//                 accept="image/*"
//                 onChange={handleChange}
//                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//               />
//               <div className="flex items-center gap-2 text-gray-500">
//                 <Upload className="w-6 h-6" />
//                 <span className="truncate">
//                   {form.image && typeof form.image === 'object'
//                     ? form.image.name
//                     : 'Upload (jpg, png, etc.)'}
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="col-span-1 md:col-span-2">
//             <div className="flex flex-col sm:flex-row gap-3">
//               <button
//   type="submit"
//   disabled={loading || !validateFields()}
//   className={`flex-1 font-semibold py-3 rounded-xl transition 
//     ${
//       loading || !validateFields()
//         ? 'bg-gray-400 text-white cursor-not-allowed'
//         : 'bg-orange-500 text-white cursor-pointer hover:bg-green-900'
//     }`}
// >
//   {loading ? (
//     <div className="flex items-center justify-center gap-2">
//       <span className="w-4 h-4 border-2 border-white border-t-transparent  rounded-full animate-spin"></span>
//       <span>Creating New Plan...</span>
//     </div>
//   ) : (
//     'Create New Plan'
//   )}
// </button>
//          <button
//                 type="button"
//                 onClick={() => navigate('/plans')}
//                 className="flex-1 bg-white hover:bg-red-500 hover:text-white cursor-pointer hover:border-red-500 text-orange-500 border-2 border-orange-500 py-3 rounded-2xl font-semibold"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };
// export default CreatePlan;
