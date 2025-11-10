
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../layouts/Navbar';
import OwnerHeader from './ownerHeader';
import { apiPost } from '../services/api';
import toast from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';

const EditPlan = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const plan = state?.plan;
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    messId: plan?.messId || '',
    name: plan?.name || '',
    description: plan?.description || '',
    menu: Array.isArray(plan?.menu) ? plan.menu.join(', ') : plan?.menu || '',
    durationDays: plan?.durationDays || '',
    price: plan?.price || '',
    totalTokens: plan?.totalTokens || '',
    imageUrl: plan?.imageUrl || '',
  });

  // 🧩 Handle input field changes
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // 🧩 Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const form = new FormData();
    form.append('image', file);

    try {
      setUploading(true);
      toast.loading('Uploading new image...');
      const res = await apiPost(`/owner/mess/plan/update/image/${plan._id}`, form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.dismiss();
      if (res?.success) {
        toast.success('Image updated successfully ✅');
        setFormData((prev) => ({
          ...prev,
          imageUrl: `${res.data?.imageUrl}?t=${Date.now()}`,
        }));
      } else {
        toast.error(res?.message || 'Failed to update image ❌');
      }
    } catch (error) {
      toast.dismiss();
      toast.error('Error uploading image ❌');
    } finally {
      setUploading(false);
    }
  };

  // 🧩 Submit plan details
  const handleSubmit = async () => {
    setLoading(true);
    const payload = {
      ...formData,
      menu: formData.menu.split(',').map((item) => item.trim()),
    };

    try {
      const res = await apiPost(`/owner/mess/plan/update/${plan._id}`, payload);
      toast.success('Plan updated successfully!');
      navigate('/plans');
    } catch (error) {
      setLoading(false);
      toast.error('Failed to update plan. Please try again.');
    }
  };

  return (
    <div className="flex h-screen">
      <Navbar />
      <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-gray-50 overflow-y-auto">
        <OwnerHeader />

        {/* Back + Title */}
        <div className="flex items-center gap-2 mb-6">
          <ArrowLeft
            className="w-8 h-8 cursor-pointer text-[#232325] hover:text-red-500"
            onClick={() => navigate(-1)}
          />
          <h2 className="text-xl sm:text-2xl font-semibold text-[#232325]">
            Edit Plan Details
          </h2>
        </div>

        {/* --- Plan Preview with Image Edit --- */}
        <div className="bg-white border rounded-xl p-4 shadow mb-8 w-full max-w-md relative">
          <div className="flex gap-4 items-center">
            <div className="relative">
              <img
                src={formData.imageUrl || 'https://via.placeholder.com/80'}
                alt="plan"
                className="w-24 h-24 rounded object-cover"
              />

              {/* ✏️ Edit Image Button */}
              <label className="absolute -bottom-3 right-0 bg-white text-white text-xs px-2 py-1 rounded-full shadow cursor-pointer hover:bg-orange-200 transition">
                {uploading ? '⏳' : '✏️'}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>

            <div>
              <h3 className="font-bold text-lg text-blue-900">{formData.name}</h3>
              <p className="text-sm text-gray-600">{formData.description}</p>
              <p className="text-sm text-green-800 font-medium">₹ {formData.price}</p>
              <p className="text-sm text-gray-500">{formData.durationDays} Days</p>
            </div>
          </div>
        </div>

        {/* --- Editable Fields --- */}
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
        </div>

        {/* --- Submit Button --- */}
        <div className="mt-10">
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full font-semibold py-3 rounded-xl transition 
              ${
                loading
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-orange-500 text-white cursor-pointer hover:bg-green-900'
              }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Editing Plan...</span>
              </div>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPlan;
