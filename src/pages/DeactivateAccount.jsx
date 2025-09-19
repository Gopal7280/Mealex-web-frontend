import React, { useState } from "react";

const DeactivateAccount = () => {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    messDetails: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          Deactivate Account
        </h1>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Fill in your details to request account deactivation.  
          (This is only a demo screen, no action will be performed.)
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select Role</option>
              <option value="customer">Customer</option>
              <option value="owner">Mess Owner</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Mess Details</label>
            <textarea
              name="messDetails"
              placeholder="Enter mess details"
              value={formData.messDetails}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500"
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        <div className="mt-6">
          <p className="text-red-600 text-sm font-semibold mb-4">
            ⚠️ Once deactivated, your account will no longer be accessible.
          </p>
          <button
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
            onClick={() => alert("This is a demo, no action performed.")}
          >
            Deactivate Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeactivateAccount;
