// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { apiPost } from '../services/api';
// import storage from '../utils/storage';

// const VerifyMessOtp = () => {
//   const navigate = useNavigate();

//   const [otp, setOtp] = useState('');
//   const [email, setEmail] = useState('');
//   const [requestId, setRequestId] = useState('');
//   const [messId, setMessId] = useState('');

//   useEffect(() => {
//     const savedEmail = storage.getItem('messEmail');
//     const savedRequestId = storage.getItem('messRequestId');
//     const savedMessId = storage.getItem('messId');

//     if (savedEmail && savedRequestId && savedMessId) {
//       setEmail(savedEmail);
//       setRequestId(savedRequestId);
//       setMessId(savedMessId);
//     } else {
//       alert('Missing verification data. Redirecting to form...');
//       navigate('/mess-details');
//     }
//   }, [navigate]);

//   const handleVerify = async () => {
//     if (!otp) return alert('Please enter OTP');

//     try {
//       const payload = {
//         email,
//         otp,
//         requestId,
//         context: 'mess-registration',
//         messId
//       };

//       const res = await apiPost('/owner/mess/otp', payload);
//       if (res.data.success) {
//         alert('✅ Email verified successfully');

//         // ✅ Cleanup after success
//         storage.removeItem('messEmail');
//         storage.removeItem('messRequestId');
//         storage.removeItem('messId');

//         navigate('/minimal-dashboard');
//       } else {
//         alert('❌ Invalid OTP');
//       }
//     } catch (err) {
//       console.error(err);
//       alert('Verification failed. Please try again.');
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
//       <h2 className="text-2xl font-semibold mb-4 text-center">Verify Your Email</h2>

//       <p className="mb-2 text-gray-600 text-center">
//         Enter the OTP sent to <strong>{email}</strong>
//       </p>

//       <input
//         type="text"
//         placeholder="Enter OTP"
//         value={otp}
//         onChange={(e) => setOtp(e.target.value)}
//         className="input w-full mb-4"
//       />

//       <button
//         onClick={handleVerify}
//         className="w-full py-2 bg-orange-600 text-white font-semibold rounded hover:bg-orange-700"
//       >
//         Verify OTP
//       </button>
//     </div>
//   );
// };

// export default VerifyMessOtp;


import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiPost } from '../services/api';
import storage from '../utils/storage';
import toast from 'react-hot-toast';

const VerifyMessOtp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [requestId, setRequestId] = useState('');
  const [messId, setMessId] = useState('');

  const [otp, setOtp] = useState(Array(6).fill(''));
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(60);
  const [resendEnabled, setResendEnabled] = useState(false);
  const inputsRef = useRef([]);

    const messName = storage.getItem('messName');
        const messEmail = storage.getItem('messEmail');



  useEffect(() => {
    const savedRequestId = storage.getItem('messRequestId');
    const savedMessId = storage.getItem('messId');

    if (messEmail && savedRequestId && savedMessId) {
      setEmail(messEmail);
      setRequestId(savedRequestId);
      setMessId(savedMessId);
    } else {
      alert('Missing verification data. Redirecting to form...');
      navigate('/mess-details');
    }
  }, [navigate]);

  useEffect(() => {
    if (timer === 0) {
      setResendEnabled(true);
    } else {
      const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    if (otp.some(val => val === '')) {
      setError('Please enter all 6 digits');
      return;
    }

    const fullOtp = otp.join('');
    try {
      const res = await apiPost('/owner/mess/otp', {
        email,
        otp: fullOtp,
        requestId,
        context: 'mess-registration',
        messId
      });

      if (res.data.success) {
        toast.success(`${messEmail} verified successfully and ${messName} Created Successfully`);
        storage.removeItem('messEmail');
        storage.removeItem('messRequestId');
        storage.removeItem('messId');
        navigate('/minimal-dashboard');
      } else {
        setError('Invalid OTP');
      }
    } catch (err) {
      console.error(err);
      setError('Verification failed. Please try again.');
    }
  };

  // const handleResend = () => {
  //   setTimer(60);
  //   setResendEnabled(false);
  //   // Optionally hit resend endpoint here
  //   alert('OTP resent (mocked).');
  // };

const handleResend = async () => {
  setTimer(60);
  setResendEnabled(false);
  setError('');

  try {
    const res = await apiPost('/resend-otp', {
      identifier: email,
      identifierType: 'email',
      context: 'mess-registration',
      requestId
    });

    if (res.data.success && res.data.requestId) {
      setRequestId(res.data.requestId);
      storage.setItem('messRequestId', res.data.requestId);
    } else {
      setError(res.data.message || 'Failed to resend OTP');
    }
  } catch (err) {
    console.error('Resend OTP failed:', err);
    setError('Resend failed. Please try again.');
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="bg-white p-8 rounded-lg w-full max-w-md text-center">
        <h2 className="md:text-4xl text-2xl font-semibold text-orange-500 mb-2 md:mb-4">
          Verify Your Account
        </h2>
        <p className="text-gray-400 mb-2 md:mb-6 text-sm md:text-base">
          Enter the 6-digit code sent to <span className="font-medium">{email}</span>
        </p>

        <div className="flex justify-between gap-2 mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={el => inputsRef.current[index] = el}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              className="w-10 h-12 border-2 border-orange-500 text-center rounded-lg text-lg focus:outline-none"
            />
          ))}
        </div>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          onClick={handleSubmit}
          className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition"
        >
          Verify
        </button>

        <div className="mt-4 text-sm text-gray-600">
          {resendEnabled ? (
            <button
              onClick={handleResend}
              className="text-orange-500 font-bold hover:underline"
            >
              Resend OTP
            </button>
          ) : (
            `Resend OTP in ${timer}s`
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyMessOtp;
