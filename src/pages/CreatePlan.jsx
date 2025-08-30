

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload } from 'lucide-react';
import Navbar from '../layouts/Navbar';
import OwnerHeader from './ownerHeader';
import { apiPost } from '../services/api';
import storage from '../utils/storage';
import toast from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';


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

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files.length > 0) {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

    const [loading, setLoading] = useState(false);
  


  const handleSubmit = async (e) => {
    e.preventDefault();
     if (loading) return;
    setLoading(true);

    const messId = storage.getItem('messId');
    console.log("📦 messId from storage:", messId);

    if (!messId || !form.image) {
      console.error('❌ messId or image is missing');
      return;
    }

    const formData = new FormData();
    formData.append('messId', messId);
    formData.append('name', form.name);
    formData.append('description', form.description);
    formData.append('durationDays', Number(form.durationDays));
    formData.append('price', Number(form.price));
    formData.append('totalTokens', Number(form.totalTokens));
    formData.append('image', form.image);
    formData.append('menu', JSON.stringify(form.menu.split(',').map((item) => item.trim())));

    try {
      const res = await apiPost('/owner/mess/plan/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('✅ Plan Created:', res);
      setForm({
        name: '',
        description: '',
        menu: '',
        durationDays: '',
        price: '',
        totalTokens: '', 
        image: null,
      });
  //  toast.success('Plan created successfully!');
toast.success(`Plan "${form.name}" created successfully!`);

  navigate('/plans'); // Redirect to plans page after creation
 
    } catch (err) {
      console.error('❌ Failed to create plan:', err);
          setLoading(true);
      toast.error(err?.response?.data?.message || 'Something went wrong.');

    }
  };

  return (
    <div className="flex h-screen">
      <Navbar />
      {/* <div className="flex-1 p-6 overflow-y-auto bg-[#f9f4f0] min-h-screen"> */}
      <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-green-50 overflow-y-auto">

        <OwnerHeader />
             <div className="flex items-center gap-2 mb-4">
                    <ArrowLeft 
                      className="w-8 h-8 cursor-pointer text-[#232325] hover:text-red-500"
                      onClick={() => navigate(-1)}
                    />
                    <h2 className="text-2xl font-semibold text-[#232325]"> Create New Plan</h2>
                  </div>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl"
        >
          <div>
            <label className="block font-semibold mb-1">Plan Name*</label>
            <input
              type="text"
              name="name"
              placeholder="Enter plan name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-black rounded-md px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Description*</label>
            <input
              type="text"
              name="description"
              placeholder="What this plan includes?"
              value={form.description}
              onChange={handleChange}
              className="w-full border border-black rounded-md px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Menu*(comma-separated)</label>
            <input
              type="text"
              name="menu"
              placeholder="e.g., Dal, Roti, Sabji"
              value={form.menu}
              onChange={handleChange}
              className="w-full border border-black rounded-md px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Duration*(in days)</label>
            <input
              type="number"
              name="durationDays"
              placeholder="e.g., 30"
              value={form.durationDays}
              onChange={handleChange}
              className="w-full border border-black rounded-md px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Plan Price*(₹)</label>
            <input
              type="number"
              name="price"
              placeholder="Plan price ₹"
              value={form.price}
              onChange={handleChange}
              className="w-full border border-black rounded-md px-4 py-2"
              required
            />
          </div>
          <div>
  <label className="block font-semibold mb-1">Total Tokens*</label>
  <input
    type="number"
    name="totalTokens"
    placeholder="Enter total tokens for this plan"
    value={form.totalTokens}
    onChange={handleChange}
              className="w-full border border-black rounded-md px-4 py-2"
    required
    min="1"
  />
</div>

           <div className="col-span-2">
  <label className="block font-semibold mb-1">Plan’s Image*</label>
  <div className="relative border border-black rounded-md px-4 py-2">
    <input
      type="file"
      name="image"
      accept="image/*"
      onChange={handleChange}
      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
    />
    <div className="flex items-center mr-10 text-gray-500">
      <Upload className="w-10 " />
      <span>
        {form.image && typeof form.image === 'object' ? form.image.name : 'Upload'}
      </span>
    </div>
  </div>
</div>


          <div className="col-span-2">
            
            <div className="flex justify-between items-center gap-2 mb-4">
            {/* <button
              type="submit"
              className="w-full bg-orange-500 border-2 border-orange-500 hover:border-green-900 hover:bg-green-900  text-white py-3 rounded-2xl font-semibold"
            >
              Create New Plan
            </button> */}
                    <button
  type="submit"
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
      <span>Creating New Plan...</span>
    </div>
  ) : (
    "Create New Plan"
  )}
</button>
            <button
              type="cancel"
              onClick={() => navigate('/plans')} // yaha '/plans' aapke route ke hisab se adjust karein

              className="w-full bg-white hover:bg-red-500 hover:text-white hover:border-red-500 text-orange-500 border-2 border-orange-500 py-3 rounded-2xl font-semibold"
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
