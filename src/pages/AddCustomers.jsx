


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../layouts/Navbar';
import OwnerHeader from './ownerHeader';
import { apiPost } from '../services/api';
import storage from '../utils/storage';

const AddCustomer = () => {
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [requestId, setRequestId] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const messId = storage.getItem('messId');
    const navigate = useNavigate();



  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setMsg({ type: 'error', text: 'Identifier is required.' });
      return;
    }
    if (!messId) {
  setMsg({ type: 'error', text: 'Mess ID not found in storage.' });
  return;
}




    setLoading(true);
    setMsg(null);

    try {
      const res = await apiPost('/owner/customer/add', { identifier });
      if (res.data.success) {
        setMsg({ type: 'success', text: res.data.message });
        setRequestId(res.data.requestId);
        setOtpSent(true);
      } else {
        setMsg({ type: 'error', text: res.data.message || 'Failed to send OTP.' });
      }
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.message || err.message || 'Server error.' });
    } finally {
      setLoading(false);
    }
  };

const handleVerifyOtp = async (e) => {
  e.preventDefault();
  if (otp.length !== 6) {
    setMsg({ type: 'error', text: 'Enter valid 6-digit OTP.' });
    return;
  }

  setLoading(true);
  setMsg(null);

  try {
    const payload = {
      requestId,
      otp,
      messId,
      identifier,
      identifierType: identifier.includes('@') ? 'email' : 'phone',
      context: 'add-customer'
    };

    const res = await apiPost('/owner/customer/verify', payload);

    if (res.data.success) {
      setMsg({ type: 'success', text: res.data.message || 'Customer verified successfully.' });
      setOtpSent(false);
      setIdentifier('');
      setOtp('');

      // ✅ Navigate to next page
      navigate('/customers'); // Replace with your desired route
    } else {
      setMsg({ type: 'error', text: res.data.message || 'Invalid OTP.' });
    }
  } catch (err) {
    setMsg({ type: 'error', text: err.response?.data?.message || err.message });
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="flex h-screen">
      <Navbar />
      {/* <div className="flex-1 p-6 overflow-y-auto bg-[#f9f4f0] min-h-screen"> */}
      <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-green-50 overflow-y-auto">

        <OwnerHeader />
        <div className="max-w-md mx-auto bg-white rounded shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Add Customer</h2>

          {msg && (
            <div className={`p-2 mb-4 rounded text-sm ${msg.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {msg.text}
            </div>
          )}

          {!otpSent ? (
            <form onSubmit={handleSendOtp}>
              <label className="block text-gray-700 mb-2">Customer Email / Phone</label>
              <input
                type="text"
                value={identifier}
                onChange={e => setIdentifier(e.target.value)}
                placeholder="Enter email or phone number"
                className="w-full border px-3 py-2 rounded mb-4 focus:outline-none focus:ring focus:border-orange-300"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded transition"
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp}>
              <label className="block text-gray-700 mb-2">Enter OTP</label>
              <input
                type="text"
                value={otp}
                onChange={e => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                className="w-full border px-3 py-2 rounded mb-4 focus:outline-none focus:ring focus:border-orange-300"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded transition"
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddCustomer;
