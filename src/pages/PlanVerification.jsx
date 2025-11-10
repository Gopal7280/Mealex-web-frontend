// working code for PlanVerification.jsx
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { apiPost } from '../services/api';
// import storage from '../utils/storage';
// import { toast } from 'react-hot-toast';

// const PlanVerification = () => {
//   const [otp, setOtp] = useState(Array(6).fill(''));
//   const [timer, setTimer] = useState(60);
//   const [resendEnabled, setResendEnabled] = useState(false);
//   const [error, setError] = useState('');
//   const [contextData, setContextData] = useState({});

//   const [isVerifying, setIsVerifying] = useState(false); // 🔥 new state

//   const navigate = useNavigate();
//   const { state } = useLocation();
// useEffect(() => {
//   const stored = JSON.parse(storage.getItem('otpRequestContext') || '{}');

//   setContextData({
//     identifier: state?.identifier || stored.identifier,
//     identifierType: state?.identifierType || stored.identifierType,
//     requestId: state?.requestId || stored.requestId,
//     verificationToken: state?.verificationToken || stored.verificationToken,
//     context: state?.context || stored.context,
//     orderType: state?.orderType || stored.orderType,
//     deliveryAddress: state?.address || stored.address,
//     name: state?.name || stored.name,
//   });
// }, [state]);


//   // const stored = JSON.parse(storage.getItem('otpRequestContext') || '{}');

//   // const identifier = state?.identifier || stored.identifier;
//   // const identifierType = state?.identifierType || stored.identifierType;
//   // const requestId = state?.requestId || stored.requestId;
//   // const verificationToken = state?.verificationToken || stored.verificationToken;
//   // const context = state?.context || stored.context;
//   // const orderType = state?.orderType || stored.orderType;
//   // const deliveryAddress = state?.address || stored.address;
//   // const name = state?.name || stored.name;

//   const { identifier, identifierType, requestId, verificationToken, context, orderType, deliveryAddress, name } = contextData;


//   useEffect(() => {
//     if (!requestId || !verificationToken || !context) {
//       const fromStorage = JSON.parse(storage.getItem('otpRequestContext') || '{}');
//       if (!fromStorage?.requestId || !fromStorage?.verificationToken || !fromStorage?.context) {
//         setError('Missing verification context. Please restart the process.');
//       }
//     }
//   }, []);

//   useEffect(() => {
//     if (resendEnabled) return;
//     const id = setInterval(() => {
//       setTimer(prev => {
//         if (prev <= 1) {
//           clearInterval(id);
//           setResendEnabled(true);
//           setOtp(Array(6).fill(''));
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//     return () => clearInterval(id);
//   }, [resendEnabled]);

//   // const handleSubmit = async () => {
//   //   const code = otp.join('');
//   //   if (code.length < 6) {
//   //     setError('Enter a valid 6-digit code');
//   //     return;
//   //   }

//   //   setIsVerifying(true); // 🔥 start verifying
//   //   const payload = {
//   //     otp: code,
//   //     requestId,
//   //     verificationToken,
//   //     identifierType,
//   //     context,
//   //     orderType,
//   //     deliveryAddress,
//   //   };

    

//   //   try {
//   //     const res = await apiPost('/owner/token/submit/verify', payload);
//   //     console.log('✅ Token Use Verification Response:', res);
//   //     if (res?.success) {
//   //       storage.removeItem('otpRequestContext');
//   //       toast.success(`Tokens from ${name} are used Successfully`);
//   //       setTimeout(() => {
//   //         navigate('/customer/use-tokens');
//   //       }, 3000);
//   //     } else {
//   //       setError(res?.message || 'Verification failed, please retry.');
//   //     }
//   //   } catch (err) {
//   //     const msg = err.response?.message?.toLowerCase() || '';
//   //     setOtp(Array(6).fill(''));
//   //     setResendEnabled(true);
//   //     setError(
//   //       msg.includes('expired')
//   //         ? 'Your code has expired — please request a new one.'
//   //         : 'Incorrect code — please try again.'
//   //     );
//   //   } finally {
//   //     setIsVerifying(false); // 🔥 reset button state
//   //   }
//   // };

// //   const handleResend = async () => {
// //     setError('');
// //     try {
// //       const stored = JSON.parse(storage.getItem('otpRequestContext') || '{}');
// //       if (!stored?.requestId || !stored?.verificationToken) {
// //         setError('Missing verification context, please restart the process.');
// //         return;
// //       }

// //       const payload = {
// //         requestId: stored.requestId,
// //         context: stored.context,
// //         identifier: stored.identifier,
// //       };

// //       const res = await apiPost('/resend-otp', payload);
// //       console.log('Resend OTP Response:', res);
// //       const { requestId, verificationToken, context, identifier, identifierType } = res;

// //       storage.setItem(
// //         'otpRequestContext',
// //         JSON.stringify({ requestId, verificationToken, context, identifier, identifierType })
// //       );

// //       setOtp(Array(6).fill(''));
// //       setTimer(60);
// //       setResendEnabled(false);

// //       setContextData(prev => ({
// //   ...prev,
// //   requestId,
// //   verificationToken,
// //   context,
// //   identifier,
// //   identifierType,
// // }));

// //       navigate(location.pathname, {
// //         replace: true,
// //         state: { context, identifier, identifierType, requestId, verificationToken },
// //       });
// //     } catch (err) {
// //       setError(err.response?.message || 'Unable to resend OTP.');
// //     }
// //   };


// const handleSubmit = async () => {
//   const code = otp.join('');
//   if (code.length < 6) {
//     setError('Enter a valid 6-digit code');
//     return;
//   }

//   setIsVerifying(true);

//   // Use the latest contextData directly
//   const payload = {
//     otp: code,
//     requestId: contextData.requestId,
//     verificationToken: contextData.verificationToken,
//     identifierType: contextData.identifierType,
//     context: contextData.context,
//     orderType: contextData.orderType,
//     deliveryAddress: contextData.deliveryAddress,
//   };

//   try {
//     const res = await apiPost('/owner/token/submit/verify', payload);
//     if (res?.success) {
//       storage.removeItem('otpRequestContext');
//       toast.success(`Tokens from ${contextData.name} are used Successfully`);
//       setTimeout(() => {
//         navigate('/customers');
//       }, 3000);
//     } else {
//       setError(res?.message || 'Verification failed, please retry.');
//     }
//   } catch (err) {
//     const msg = err.response?.data?.message?.toLowerCase() || '';
//     setOtp(Array(6).fill(''));
//     setResendEnabled(true);
//     setError(
//       msg.includes('expired')
//         ? 'Your code has expired — please request a new one.'
//         : 'Incorrect code — please try again.'
//     );
//   } finally {
//     setIsVerifying(false);
//   }
// };

// const handleResend = async () => {
//   setError('');
//   try {
//     const stored = JSON.parse(storage.getItem('otpRequestContext') || '{}');
//     if (!stored?.requestId || !stored?.verificationToken) {
//       setError('Missing verification context, please restart the process.');
//       return;
//     }

//     const payload = {
//       requestId: stored.requestId,
//       context: stored.context,
//       identifier: stored.identifier,
//     };

//     const res = await apiPost('/resend-otp', payload);
//     const {
//       requestId,
//       verificationToken,
//       context,
//       identifier,
//       identifierType,
//     } = res; // ✅ root level, as per your API

//     // Update storage
//     storage.setItem(
//       'otpRequestContext',
//       JSON.stringify({ requestId, verificationToken, context, identifier, identifierType })
//     );

//     // Update local state
//     setContextData(prev => ({
//       ...prev,
//       requestId,
//   verificationToken: prev.verificationToken, // keep original token
//       context,
//       identifier,
//       identifierType,
//     }));

//     // Reset UI
//     setOtp(Array(6).fill(''));
//     setTimer(60);
//     setResendEnabled(false);

//     toast.success('OTP resent successfully');
//   } catch (err) {
//     setError(err.response?.message || 'Unable to resend OTP.');
//   }
// };


//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
//       <div className="bg-white p-8 rounded-lg w-full max-w-md text-center shadow-lg">
//         <h2 className="text-2xl font-semibold text-orange-500 mb-2">Verify Token Use</h2>
//         <p className="text-gray-500 mb-4 text-sm">
//           Enter the 6-digit code sent to <span className="font-medium">{identifier || 'your email/number'}</span>
//         </p>

//         <div className="flex justify-between gap-2 mb-4">
//           {otp.map((digit, i) => (
//             <input
//               key={i}
//               id={`otp-${i}`}
//               type="text"
//               inputMode="numeric"
//               maxLength={1}
//               value={digit}
//               onChange={(e) => {
//                 const val = e.target.value;
//                 if (/^\d?$/.test(val)) {
//                   const next = [...otp];
//                   next[i] = val;
//                   setOtp(next);
//                   if (val && i < 5) document.getElementById(`otp-${i + 1}`)?.focus();
//                 }
//               }}
//               className="w-12 h-12 border-2 border-orange-500 text-center rounded focus:outline-none text-lg"
//             />
//           ))}
//         </div>

//         {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

//         {/* <button
//           onClick={handleSubmit}
//           disabled={!requestId || !verificationToken || isVerifying}
//           className={`w-full py-3 rounded-lg text-white font-medium ${
//             isVerifying
//               ? 'bg-gray-300 cursor-not-allowed'
//               : 'bg-orange-500 hover:bg-orange-600 cursor-pointer'
//           }`}
//         >
//           {isVerifying ? 'Verifying...' : 'Verify'}
//         </button> */}
//         <button
//   onClick={handleSubmit}
//   disabled={isVerifying}  // ✅ only block double-submission
//   className={`w-full py-3 rounded-lg text-white font-medium ${
//     isVerifying
//       ? 'bg-gray-300 cursor-not-allowed'
//       : 'bg-orange-500 hover:bg-orange-600 cursor-pointer'
//   }`}
// >
//   {isVerifying ? 'Verifying...' : 'Verify'}
// </button>


//         <div className="mt-4 text-sm text-gray-600">
//           {resendEnabled ? (
//             <button
//               onClick={handleResend}
//               className="text-orange-500 font-bold hover:underline cursor-pointer"
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

// export default PlanVerification;


// new code otp box handle ke baad


import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { apiPost } from '../services/api';
import storage from '../utils/storage';
import { toast } from 'react-hot-toast';

const PlanVerification = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [timer, setTimer] = useState(60);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [contextData, setContextData] = useState({});
  const inputsRef = useRef([]);

  useEffect(() => {
    const stored = JSON.parse(storage.getItem('otpRequestContext') || '{}');
    setContextData({
      identifier: state?.identifier || stored.identifier,
      identifierType: state?.identifierType || stored.identifierType,
      requestId: state?.requestId || stored.requestId,
      verificationToken: state?.verificationToken || stored.verificationToken,
      context: state?.context || stored.context,
      orderType: state?.orderType || stored.orderType,
      deliveryAddress: state?.address || stored.address,
      name: state?.name || stored.name,
    });
  }, [state]);

  const { identifier, identifierType, requestId, verificationToken, context } = contextData;

  useEffect(() => {
    if (!requestId || !verificationToken || !context) {
      const fromStorage = JSON.parse(storage.getItem('otpRequestContext') || '{}');
      if (!fromStorage?.requestId || !fromStorage?.verificationToken || !fromStorage?.context) {
        setError('Missing verification context. Please restart the process.');
      }
    }
  }, []);

  useEffect(() => {
    if (resendEnabled) return;
    const id = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(id);
          setResendEnabled(true);
          setOtp(Array(6).fill(''));
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [resendEnabled]);

  const verifyAndSubmit = async (fullOtp) => {
    if (!/^\d{6}$/.test(fullOtp)) {
      setError('Enter a valid 6-digit code');
      return;
    }

    setError('');
    setIsVerifying(true);

    const payload = {
      otp: fullOtp,
      requestId: contextData.requestId,
      verificationToken: contextData.verificationToken,
      identifierType: contextData.identifierType,
      context: contextData.context,
      orderType: contextData.orderType,
      deliveryAddress: contextData.deliveryAddress,
    };

    try {
      const res = await apiPost('/owner/token/submit/verify', payload);
      if (res?.success) {
        storage.removeItem('otpRequestContext');
        toast.success(`Tokens from ${contextData.name} are used successfully`);
        setTimeout(() => navigate('/customers'), 3000);
      } else {
        setError(res?.message || 'Verification failed, please retry.');
      }
    } catch (err) {
      const msg = err.response?.data?.message?.toLowerCase() || '';
      setOtp(Array(6).fill(''));
      setResendEnabled(true);
      setError(
        msg.includes('expired')
          ? 'Your code has expired — please request a new one.'
          : 'Incorrect code — please try again.'
      );
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSubmit = async () => {
    const fullOtp = otp.join('');
    if (!/^\d{6}$/.test(fullOtp)) {
      setError('Enter a valid 6-digit code');
      return;
    }
    await verifyAndSubmit(fullOtp);
  };

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < 5) inputsRef.current[index + 1]?.focus();

    if (updatedOtp.every(v => v !== '')) {
      const fullOtp = updatedOtp.join('');
      setTimeout(() => verifyAndSubmit(fullOtp), 150);
    }
  };

  // const handlePaste = (e) => {
  //   e.preventDefault();
  //   const pasteData = e.clipboardData.getData('Text').trim();
  //   if (!/^\d+$/.test(pasteData)) return;

  //   const digits = pasteData.slice(0, otp.length).split('');
  //   const newOtp = Array.from({ length: otp.length }, (_, i) => digits[i] || '');
  //   setOtp(newOtp);

  //   const nextIndex = digits.length < otp.length ? digits.length : otp.length - 1;
  //   inputsRef.current[nextIndex]?.focus();

  //   if (digits.length === otp.length) {
  //     const fullOtp = digits.join('');
  //     setTimeout(() => verifyAndSubmit(fullOtp), 150);
  //   }
  // };

//   const handleKeyDown = (index, e) => {
//   if (e.key === 'Backspace' && !otp[index] && index > 0) {
//     // Move to previous box and clear it
//     const updatedOtp = [...otp];
//     updatedOtp[index - 1] = '';
//     setOtp(updatedOtp);
//     inputsRef.current[index - 1]?.focus();
//     e.preventDefault();
//   }
// };

// const handleKeyDown = (index, e) => {
//   if (e.key === 'Backspace') {
//     e.preventDefault(); // prevent browser default behavior
//     const updatedOtp = [...otp];

//     if (updatedOtp[index]) {
//       // If current box has a digit → clear it, stay
//       updatedOtp[index] = '';
//       setOtp(updatedOtp);
//     } else if (index > 0) {
//       // Current box empty → move back, clear previous
//       updatedOtp[index - 1] = '';
//       setOtp(updatedOtp);
//       inputsRef.current[index - 1]?.focus();
//     }
//   } else if (e.key === 'ArrowLeft' && index > 0) {
//     inputsRef.current[index - 1]?.focus();
//   } else if (e.key === 'ArrowRight' && index < otp.length - 1) {
//     inputsRef.current[index + 1]?.focus();
//   }
// };

const handlePaste = (e) => {
  e.preventDefault();
  const pasteData = e.clipboardData.getData('Text').trim();

  // Only accept numeric strings
  if (!/^\d+$/.test(pasteData)) return;

  // Fill OTP boxes from the start
  const digits = pasteData.slice(0, otp.length).split('');
  const newOtp = Array.from({ length: otp.length }, (_, i) => digits[i] || '');
  setOtp(newOtp);

  // If all digits filled, auto-verify
  if (digits.length === otp.length) {
    const fullOtp = digits.join('');
    setTimeout(() => verifyAndSubmit(fullOtp), 150);
  } else {
    // Otherwise move focus to the next empty one
    const nextIndex = digits.length < otp.length ? digits.length : otp.length - 1;
    inputsRef.current[nextIndex]?.focus();
  }
};


const handleKeyDown = (index, e) => {
  if (e.key === 'Backspace') {
    e.preventDefault(); // stop default cursor jump
    const updatedOtp = [...otp];

    if (updatedOtp[index]) {
      // If current box has a value → clear it and move left
      updatedOtp[index] = '';
      setOtp(updatedOtp);
      if (index > 0) inputsRef.current[index - 1]?.focus();
    } else if (index > 0) {
      // If current box empty → clear previous and move there
      updatedOtp[index - 1] = '';
      setOtp(updatedOtp);
      inputsRef.current[index - 1]?.focus();
    }
  } 
  // Optional: arrow key navigation
  else if (e.key === 'ArrowLeft' && index > 0) {
    inputsRef.current[index - 1]?.focus();
  } else if (e.key === 'ArrowRight' && index < otp.length - 1) {
    inputsRef.current[index + 1]?.focus();
  }
};





  const handleResend = async () => {
    setError('');
    try {
      const stored = JSON.parse(storage.getItem('otpRequestContext') || '{}');
      if (!stored?.requestId || !stored?.verificationToken) {
        setError('Missing verification context, please restart the process.');
        return;
      }

      const payload = {
        requestId: stored.requestId,
        context: stored.context,
        identifier: stored.identifier,
      };

      const res = await apiPost('/resend-otp', payload);
      const {
        requestId,
        verificationToken,
        context,
        identifier,
        identifierType,
      } = res;

      storage.setItem(
        'otpRequestContext',
        JSON.stringify({ requestId, verificationToken, context, identifier, identifierType })
      );

      setContextData(prev => ({
        ...prev,
        requestId,
        verificationToken: prev.verificationToken,
        context,
        identifier,
        identifierType,
      }));

      setOtp(Array(6).fill(''));
      setTimer(60);
      setResendEnabled(false);

      toast.success('OTP resent successfully');
    } catch (err) {
      setError(err.response?.message || 'Unable to resend OTP.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-lg w-full max-w-md text-center shadow-lg">
        <h2 className="text-2xl font-semibold text-orange-500 mb-2">Verify Token Use</h2>
        <p className="text-gray-500 mb-4 text-sm">
          Enter the 6-digit code sent to <span className="font-medium">{identifier || 'your email/number'}</span>
        </p>

        <div className="flex justify-between gap-2 mb-4" onPaste={handlePaste}>
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (inputsRef.current[i] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)} // 👈 Added line
              className="w-10 h-12 md:w-12 md:h-14 border-2 border-orange-500 text-center rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
            />
          ))}

          
        </div>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={isVerifying}
          className={`w-full py-3 rounded-lg text-white font-medium ${
            isVerifying
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-orange-500 hover:bg-orange-600 cursor-pointer'
          }`}
        >
          {isVerifying ? 'Verifying...' : 'Verify'}
        </button>

        <div className="mt-4 text-sm text-gray-600">
          {resendEnabled ? (
            <button
              onClick={handleResend}
              className="text-orange-500 font-bold hover:underline cursor-pointer"
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

export default PlanVerification;

