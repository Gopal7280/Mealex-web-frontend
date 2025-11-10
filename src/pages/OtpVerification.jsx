// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { apiPost } from '../services/api';
// import axios from 'axios';
// import storage from '../utils/storage'; // adjust the path as needed

// const OtpVerification = () => {
//   const [otp, setOtp] = useState(['', '', '', '', '', '']);
//   const [timer, setTimer] = useState(30);
//   const [resendEnabled, setResendEnabled] = useState(false);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const location = useLocation();

//   const identifier = location.state?.identifier;
//   const identifierType = location.state?.identifierType;
//   const requestId = location.state?.requestId;
//   const context = location.state?.context || 'registration'; // fallback

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimer(prev => {
//         if (prev <= 1) {
//           clearInterval(interval);
//           setResendEnabled(true);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleChange = (index, value) => {
//     if (!/^\d?$/.test(value)) return;
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);
//     if (value && index < 5) {
//       document.getElementById(`otp-${index + 1}`).focus();
//     }
//   };

 

//   const handleSubmit = async () => {
//   const finalOtp = otp.join('');
//   if (finalOtp.length !== 6) {
//     setError('Please enter a valid 6-digit OTP');
//     return;
//   }

//   try {
//     const response = await apiPost('https://student.studentshub.fun/register/otp', {
//       identifier,
//       identifierType,
//       otp: finalOtp,
//       requestId,
//       context,
//     });
//     console.log('✅ OTP Response:', response.data);


//     if (response.data.success) {
//       const token = response.data.token;
//       const identifier = response.data.identifier;

//       storage.removeItem('token');
//       storage.removeItem('identifier');

//       // Set new data
//       storage.setItem('identifier', identifier);
//       storage.setItem('token', token);

//       //  Set axios default auth header
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

//       //  Redirect
//       navigate('/user-access');
//     } else {
//       setError(response.data.message || 'OTP verification failed');
//     }
//   } catch (err) {
//         console.error('❌ OTP verification failed:', err);

//     setError(err.response?.data?.message || 'OTP verification failed');
//   }
// };


//   const handleResend = async () => {
//     try {
//       await apiPost('https://student.studentshub.fun/resend-otp', {
//         identifier,
//         // identifierType,
//         context,
//               requestId, // ✅ This is required

//       });
//       setOtp(['', '', '', '', '', '']);
//       setResendEnabled(false);
//       setTimer(30);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to resend OTP');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
//         <h2 className="text-2xl font-semibold mb-4">OTP Verification</h2>
//         <p className="text-gray-600 mb-6">
//           OTP sent to <span className="font-medium">{identifier}</span>
//         </p>

//         <div className="flex justify-between gap-2 mb-4">
//           {otp.map((digit, index) => (
//             <input
//               key={index}
//               id={`otp-${index}`}
//               type="text"
//               inputMode="numeric"
//               maxLength={1}
//               value={digit}
//               onChange={e => handleChange(index, e.target.value)}
//               className="w-10 h-12 border text-center rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//             />
//           ))}
//         </div>

//         {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

//         <button
//           onClick={handleSubmit}
//           className="w-full bg-[#bbe849] text-white py-2 rounded hover:red-[#2E4A5D] transition"
//         >
//           Verify
//         </button>

//         <div className="mt-4 text-sm text-gray-600">
//           {resendEnabled ? (
//             <button
//               onClick={handleResend}
//               className="text-blue-600 hover:underline"
//             >
//               Resend OTP
//             </button>
//           ) : (
//             `Resend OTP in ${timer}s`
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OtpVerification;




// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { apiPost } from '../services/api';
// import axios from 'axios';
// import storage from '../utils/storage';


// const OtpVerification = () => {
//   const [otp, setOtp] = useState(['', '', '', '', '', '']);
//   const [timer, setTimer] = useState(30);
//   const [resendEnabled, setResendEnabled] = useState(false);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const location = useLocation();

//   const identifier = location.state?.identifier;
//   const identifierType = location.state?.identifierType;
//   const requestId = location.state?.requestId;
//   const context = location.state?.context || 'registration';

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimer(prev => {
//         if (prev <= 1) {
//           clearInterval(interval);
//           setResendEnabled(true);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleChange = (index, value) => {
//     if (!/^\d?$/.test(value)) return;
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);
//     if (value && index < 5) {
//       document.getElementById(`otp-${index + 1}`).focus();
//     }
//   };

//   const handleSubmit = async () => {
//     const finalOtp = otp.join('');
//     if (finalOtp.length !== 6) {
//       setError('Please enter a valid 6-digit OTP');
//       return;
//     }

//     try {
//       const response = await apiPost('/register/otp', {
//         identifier,
//         identifierType,
//         otp: finalOtp,
//         requestId,
//         context,
//       });

//       if (response.data.success) {
//         const token = response.data.token;
//         const identifier = response.data.identifier;

//         storage.removeItem('token');
//         storage.removeItem('identifier');
//         storage.setItem('identifier', identifier);
//         storage.setItem('token', token);
//         axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//         navigate('/user-access');
//       } else {
//         setError(response.data.message || 'OTP verification failed');
//       }
//     } catch (err) {
//       console.error('❌ OTP verification failed:', err);
//       setError(err.response?.data?.message || 'OTP verification failed');
//     }
//   };

//   const handleResend = async () => {
//     try {
//       await apiPost('/resend-otp', {
//         identifier,
//         context,
//         requestId,
//       });
//       setOtp(['', '', '', '', '', '']);
//       setResendEnabled(false);
//       setTimer(30);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to resend OTP');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-white px-4">
//       <div className="bg-white p-8 rounded-lg w-full max-w-md text-center">
//         <h2 className="md:text-4xl text-2xl font-semibold text-orange-500 mb-2 md:mb-4">
//           Verify Your Account
//         </h2>
//         <p className="text-gray-400 mb-2 md:mb-6 text-sm md:text-base">
//           Enter the 6-digit code sent to <span className="font-medium">{identifier}</span>
//         </p>

//         <div className="flex justify-between gap-2 mb-4">
//           {otp.map((digit, index) => (
//             <input
//               key={index}
//               id={`otp-${index}`}
//               type="text"
//               inputMode="numeric"
//               maxLength={1}
//               value={digit}
//               onChange={e => handleChange(index, e.target.value)}
//               className="w-10 h-12 border-2 border-orange-500 text-center rounded-lg text-lg focus:outline-none"
//             />
//           ))}
//         </div>

//         {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

//         <button
//           onClick={handleSubmit}
//           className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition"
//         >
//           Verify
//         </button>

//         <div className="mt-4 text-sm text-gray-600">
//           {resendEnabled ? (
//             <button
//               onClick={handleResend}
//               className="text-orange-500 font-bold hover:underline"
//             >
//               Resend OTP
//             </button>
//           ) : (
//             `Resend OTP in ${timer}s`
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OtpVerification;

// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { apiPost } from '../services/api';
// import axios from 'axios';
// import storage from '../utils/storage';
// import { setupNotifications } from '../App'; // ✅ import kiya
// import { toast } from 'react-hot-toast';

// const OtpVerification = () => {
//   const [otp, setOtp] = useState(['', '', '', '', '', '']);
//   const [timer, setTimer] = useState(30);
//   const [resendEnabled, setResendEnabled] = useState(false);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const location = useLocation();
//   const foregroundListenerBound = useRef(false); // ✅ yaha bhi chahiye

//   const identifier = location.state?.identifier;
//   const identifierType = location.state?.identifierType;
//   const requestId = location.state?.requestId;
//   const context = location.state?.context || 'registration';

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimer(prev => {
//         if (prev <= 1) {
//           clearInterval(interval);
//           setResendEnabled(true);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleChange = (index, value) => {
//     if (!/^\d?$/.test(value)) return;
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);
//     if (value && index < 5) {
//       document.getElementById(`otp-${index + 1}`).focus();
//     }
//   };

//   const handleSubmit = async () => {
//     const finalOtp = otp.join('');
//     if (finalOtp.length !== 6) {
//       setError('Please enter a valid 6-digit OTP');
//       return;
//     }

//     try {
//       const response = await apiPost('/register/otp', {
//         identifier,
//         identifierType,
//         otp: finalOtp,
//         requestId,
//         context,
//       });

//       if (response.data.success) {
//         const token = response.data.token;
//         const identifier = response.data.identifier;

//         storage.removeItem('token');
//         storage.removeItem('identifier');
//         storage.setItem('identifier', identifier);
//         storage.setItem('token', token);
//         axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

//         // ✅ setupNotifications call
//         await setupNotifications(token, foregroundListenerBound);
//         toast.success('🎉 Account verified & logged in!');

//         navigate('/user-access');
//       } else {
//         setError(response.data.message || 'OTP verification failed');
//       }
//     } catch (err) {
//       console.error('❌ OTP verification failed:', err);
//       setError(err.response?.data?.message || 'OTP verification failed');
//     }
//   };

//   const handleResend = async () => {
//     try {
//       await apiPost('/resend-otp', {
//         identifier,
//         context,
//         requestId,
//       });
//       setOtp(['', '', '', '', '', '']);
//       setResendEnabled(false);
//       setTimer(30);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to resend OTP');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-white px-4">
//       <div className="bg-white p-8 rounded-lg w-full max-w-md text-center">
//         <h2 className="md:text-4xl text-2xl font-semibold text-orange-500 mb-2 md:mb-4">
//           Verify Your Account
//         </h2>
//         <p className="text-gray-400 mb-2 md:mb-6 text-sm md:text-base">
//           Enter the 6-digit code sent to <span className="font-medium">{identifier}</span>
//         </p>

//         <div className="flex justify-between gap-2 mb-4">
//           {otp.map((digit, index) => (
//             <input
//               key={index}
//               id={`otp-${index}`}
//               type="text"
//               inputMode="numeric"
//               maxLength={1}
//               value={digit}
//               onChange={e => handleChange(index, e.target.value)}
//               className="w-10 h-12 border-2 border-orange-500 text-center rounded-lg text-lg focus:outline-none"
//             />
//           ))}
//         </div>

//         {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

//         <button
//           onClick={handleSubmit}
//           className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition"
//         >
//           Verify
//         </button>

//         <div className="mt-4 text-sm text-gray-600">
//           {resendEnabled ? (
//             <button
//               onClick={handleResend}
//               className="text-orange-500 font-bold hover:underline"
//             >
//               Resend OTP
//             </button>
//           ) : (
//             `Resend OTP in ${timer}s`
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OtpVerification;


import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { apiPost } from '../services/api';
import axios from 'axios';
import storage from '../utils/storage';
import { setupNotifications } from '../App';
import { toast } from 'react-hot-toast';

const OtpVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // ✅ for verify button
  const [resending, setResending] = useState(false); // ✅ for resend OTP
  const navigate = useNavigate();
  const location = useLocation();
  const foregroundListenerBound = useRef(false);

  const identifier = location.state?.identifier;
  const identifierType = location.state?.identifierType;
  const requestId = location.state?.requestId;
  const context = location.state?.context || 'registration';

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setResendEnabled(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  
const handleSubmit = async (otpArray) => {
  const finalOtp = otpArray ? otpArray.join('') : otp.join('');
  if (finalOtp.length !== 6) {
    setError('Please enter a valid 6-digit OTP');
    return;
  }

  try {
    setLoading(true);
    setError('');
    const response = await apiPost('/register/otp', {
      identifier,
      identifierType,
      otp: finalOtp,
      requestId,
      context,
    });

    if (response.success) {
      const token = response.token;
      const identifier = response.identifier;
      const customerId = response.id;

      storage.removeItem('token');
      storage.removeItem('identifier');
      storage.setItem('identifier', identifier);
      storage.setItem('token', token);
      storage.setItem('customerId', customerId);

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      await setupNotifications(token, foregroundListenerBound);
      toast.success('🎉 Account verified !');

      navigate('/user-access');
    } else {
      setError(response.message || 'OTP verification failed');
    }
  } catch (err) {
    setError(err.response?.message || 'OTP verification failed');
  } finally {
    setLoading(false);
  }
};



const handlePaste = (e) => {
  e.preventDefault();
  const pasteData = e.clipboardData.getData('Text').trim();

  if (!/^\d{6}$/.test(pasteData)) return; // only accept 6 digits

  const newOtp = pasteData.split('');
  setOtp(newOtp);

  // ✅ Directly pass the pasted OTP to handleSubmit
  setTimeout(() => {
    handleSubmit(newOtp);
  }, 50);
};



// ✅ Handle backspace to move to previous input
const handleKeyDown = (e, index) => {
  if (e.key === 'Backspace') {
    if (otp[index] === '') {
      if (index > 0) {
        const prevInput = document.getElementById(`otp-${index - 1}`);
        prevInput.focus();
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
      }
    }
  }
};


  const handleResend = async () => {
    try {
      setResending(true); // ✅ start resending
      await apiPost('/resend-otp', {
        identifier,
        context,
        requestId,
      });
      setOtp(['', '', '', '', '', '']);
      setResendEnabled(false);
      setTimer(30);
      toast.success('📩 OTP resent successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend OTP');
    } finally {
      setResending(false); // ✅ stop resending
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="bg-white p-8 rounded-lg w-full max-w-md text-center">
        <h2 className="md:text-4xl text-2xl font-semibold text-orange-500 mb-2 md:mb-4">
          Verify Your Account
        </h2>
        <p className="text-gray-400 mb-2 md:mb-6 text-sm md:text-base">
          Enter the 6-digit code sent to <span className="font-medium">{identifier}</span>
        </p>

        {/* <div className="flex justify-between gap-2 mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={e => handleChange(index, e.target.value)}
              className="w-10 h-12 border-2 border-orange-500 text-center rounded-lg text-lg focus:outline-none"
            />
          ))}
        </div> */}
        <div 
  className="flex justify-between gap-2 mb-4"
  onPaste={handlePaste} // ✅ ADD THIS
>
  {otp.map((digit, index) => (
    <input
      key={index}
      id={`otp-${index}`}
      type="text"
      inputMode="numeric"
      maxLength={1}
      value={digit}
      onChange={e => handleChange(index, e.target.value)}
        onKeyDown={e => handleKeyDown(e, index)}   // ✅ ADD THIS
  onPaste={index === 0 ? handlePaste : undefined} // ✅ only first input
      className="w-10 h-12 border-2 border-orange-500 text-center rounded-lg text-lg focus:outline-none"
    />
  ))}
</div>


        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-3 rounded-lg transition ${
            loading
              ? 'bg-orange-300 cursor-not-allowed'
              : 'bg-orange-500 hover:bg-orange-600 cursor-pointer'
          } text-white`}
        >
          {loading ? 'Verifying...' : 'Verify'}
        </button>

        <div className="mt-4 text-sm text-gray-600">
          {resendEnabled ? (
            <button
              onClick={handleResend}
              disabled={resending}
              className={`font-bold ${
                resending
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-orange-500 hover:underline cursor-pointer'
              }`}
            >
              {resending ? 'Resending...' : 'Resend OTP'}
            </button>
          ) : (
            `Resend OTP in ${timer}s`
          )}
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;




// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { apiPost } from '../services/api';
// import axios from 'axios';
// import storage from '../utils/storage';

// const OtpVerification = () => {
//   const [otp, setOtp] = useState(['', '', '', '', '', '']);
//   const [timer, setTimer] = useState(30);
//   const [resendEnabled, setResendEnabled] = useState(false);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const location = useLocation();

//   const identifier = location.state?.identifier;
//   const identifierType = location.state?.identifierType;
//   const requestId = location.state?.requestId;
//   const context = location.state?.context || 'registration';

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimer(prev => {
//         if (prev <= 1) {
//           clearInterval(interval);
//           setResendEnabled(true);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleChange = (index, value) => {
//     if (!/^\d?$/.test(value)) return;
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);
//     if (value && index < 5) {
//       document.getElementById(`otp-${index + 1}`).focus();
//     }
//   };

//   const handleSubmit = async () => {
//     const finalOtp = otp.join('');
//     if (finalOtp.length !== 6) {
//       setError('Please enter a valid 6-digit OTP');
//       return;
//     }

//     try {
//       const response = await apiPost('/register/otp', {
//         identifier,
//         identifierType,
//         otp: finalOtp,
//         requestId,
//         context,
//       });

//       if (response.data.success) {
//         const token = response.data.token;
//         const identifier = response.data.identifier;

//         storage.removeItem('token');
//         storage.removeItem('identifier');
//         storage.setItem('identifier', identifier);
//         storage.setItem('token', token);
//         axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//         navigate('/user-access');
//       } else {
//         setError(response.data.message || 'OTP verification failed');
//       }
//     } catch (err) {
//       console.error('❌ OTP verification failed:', err);
//       setError(err.response?.data?.message || 'OTP verification failed');
//     }
//   };

//   const handleResend = async () => {
//     try {
//       await apiPost('/resend-otp', {
//         identifier,
//         context,
//         requestId,
//       });
//       setOtp(['', '', '', '', '', '']);
//       setResendEnabled(false);
//       setTimer(30);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to resend OTP');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
//       <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-6 md:p-10 text-center">
//         <h2 className="text-2xl md:text-4xl font-bold text-orange-500 mb-3 md:mb-5">
//           Verify Your Account
//         </h2>
//         <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
//           Enter the 6-digit code sent to <span className="font-medium">{identifier}</span>
//         </p>

//         {/* <div className="flex justify-between gap-2 md:gap-3 mb-4 md:mb-6">
//           {otp.map((digit, index) => (
//             <input
//               key={index}
//               id={`otp-${index}`}
//               type="text"
//               inputMode="numeric"
//               maxLength={1}
//               value={digit}
//               onChange={e => handleChange(index, e.target.value)}
//               className="w-10 h-12 md:w-12 md:h-14 border-2 border-orange-500 text-center rounded-lg text-lg focus:outline-none"
//             />
//           ))}
//         </div> */}
//         <div className="flex flex-wrap justify-center gap-2">
//   {Array(6).fill(0).map((_, i) => (
//     <input
//       key={i}
//       type="text"
//       maxLength="1"
//       className="w-10 h-12  border rounded-lg text-center text-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//     />
//   ))}
// </div>


//         {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

//         <button
//           onClick={handleSubmit}
//           className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition font-medium text-sm md:text-base"
//         >
//           Verify
//         </button>

//         <div className="mt-4 text-sm text-gray-600">
//           {resendEnabled ? (
//             <button
//               onClick={handleResend}
//               className="text-orange-500 font-semibold hover:underline"
//             >
//               Resend OTP
//             </button>
//           ) : (
//             <span>Resend OTP in {timer}s</span>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OtpVerification;






// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { apiPost } from '../services/api';
// import storage from '../utils/storage';

// const OtpVerification = () => {
//   const [otp, setOtp] = useState(['', '', '', '', '', '']);
//   const [timer, setTimer] = useState(30);
//   const [resendEnabled, setResendEnabled] = useState(false);
//   const [error, setError] = useState('');

//   const navigate = useNavigate();
//   const location = useLocation();

//   const identifier = location.state?.identifier;
//   const identifierType = location.state?.identifierType;
//   const requestId = location.state?.requestId;
//   const context = location.state?.context || 'registration';

//   // Timer for resend OTP
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimer(prev => {
//         if (prev <= 1) {
//           clearInterval(interval);
//           setResendEnabled(true);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleChange = (index, value) => {
//     if (!/^\d?$/.test(value)) return;
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);
//     if (value && index < 5) {
//       const nextInput = document.getElementById(`otp-${index + 1}`);
//       if (nextInput) nextInput.focus();
//     }
//   };

//   const handleSubmit = async () => {
//     const finalOtp = otp.join('');
//     if (finalOtp.length !== 6) {
//       setError('Please enter a valid 6-digit OTP');
//       return;
//     }

//     try {
//       const response = await apiPost('/register/otp', {
//         identifier,
//         identifierType,
//         otp: finalOtp,
//         requestId,
//         context,
//       });

//       if (response.data.success) {
//         const { token, identifier } = response.data;

//         // Reset and save
//         storage.removeItem('token');
//         storage.removeItem('identifier');
//         storage.setItem('token', token);
//         storage.setItem('identifier', identifier);

//         // Navigate to profile setup
//         navigate('/user-access');
//       } else {
//         setError(response.data.message || 'OTP verification failed');
//       }
//     } catch (err) {
//       setError(err?.response?.data?.message || 'OTP verification failed');
//       console.error('OTP Error:', err);
//     }
//   };

//   const handleResend = async () => {
//     try {
//       await apiPost('/resend-otp', {
//         identifier,
//         identifierType,
//         context,
//       });
//       setOtp(['', '', '', '', '', '']);
//       setResendEnabled(false);
//       setTimer(30);
//     } catch (err) {
//       setError(err?.response?.data?.message || 'Failed to resend OTP');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
//         <h2 className="text-2xl font-semibold mb-4">OTP Verification</h2>
//         <p className="text-gray-600 mb-6">
//           OTP sent to <span className="font-medium">{identifier}</span>
//         </p>

//         <div className="flex justify-between gap-2 mb-4">
//           {otp.map((digit, index) => (
//             <input
//               key={index}
//               id={`otp-${index}`}
//               type="text"
//               inputMode="numeric"
//               maxLength={1}
//               value={digit}
//               onChange={(e) => handleChange(index, e.target.value)}
//               className="w-10 h-12 border text-center rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//             />
//           ))}
//         </div>

//         {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

//         <button
//           onClick={handleSubmit}
//           className="w-full bg-[#bbe849] text-white py-2 rounded hover:bg-green-600 transition"
//         >
//           Verify
//         </button>

//         <div className="mt-4 text-sm text-gray-600">
//           {resendEnabled ? (
//             <button onClick={handleResend} className="text-blue-600 hover:underline">
//               Resend OTP
//             </button>
//           ) : (
//             `Resend OTP in ${timer}s`
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OtpVerification;
