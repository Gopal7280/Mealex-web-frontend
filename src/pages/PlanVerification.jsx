


import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { apiPost } from '../services/api';
import storage from '../utils/storage';
import { toast } from 'react-hot-toast';
const PlanVerification = () => {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [timer, setTimer] = useState(60);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [error, setError] = useState('');
  // const [showToast, setShowToast] = useState(false);

  const navigate = useNavigate();
  const { state } = useLocation();
  const stored = JSON.parse(storage.getItem('otpRequestContext') || '{}');

  const identifier = state?.identifier || stored.identifier;
  const identifierType = state?.identifierType || stored.identifierType;
  const requestId = state?.requestId || stored.requestId;
  const verificationToken = state?.verificationToken || stored.verificationToken;
  const context = state?.context || stored.context;
    const orderType = state?.orderType || stored.orderType;
  const deliveryAddress = state?.address || stored.address;
  const name = state?.name || stored.name;

 
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

  const handleSubmit = async () => {
    const code = otp.join('');
    if (code.length < 6) {
      setError('Enter a valid 6‑digit code');
      return;
    }

    const payload = {
      otp: code,
      requestId,
      verificationToken,
      identifierType,
      context,
      orderType,
      deliveryAddress,
    };

    try {
      const res = await apiPost('/owner/token/submit/verify', payload);
      if (res.data?.success) {
        storage.removeItem('otpRequestContext');
       toast.success(`Tokens from ${name} are used Successfully `);
        // Auto navigate after toast
        setTimeout(() => {
          navigate('/customer/use-tokens');
        }, 3000);
      } else {
        setError(res.data?.message || 'Verification failed, please retry.');
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
    }
  };

  // const handleResend = async () => {
  //   setError('');
  //   try {
  //     const payload = {
  //       customerPlanId: storage.getItem('customerPlanId'),
  //       customerId: storage.getItem('customerId'),
  //       tokens: [],
  //     };

  //     const res = await apiPost('/resend-otp', payload);
  //     const { requestId, verificationToken, context, identifier, identifierType } = res.data;

  //     storage.setItem(
  //       'otpRequestContext',
  //       JSON.stringify({ requestId, verificationToken, context, identifier, identifierType })
  //     );

  //     setOtp(Array(6).fill(''));
  //     setTimer(60);
  //     setResendEnabled(false);

  //     navigate(location.pathname, {
  //       replace: true,
  //       state: { context, identifier, identifierType, requestId, verificationToken },
  //     });
  //   } catch (err) {
  //     setError(err.response?.data?.message || 'Unable to resend OTP.');
  //   }
  // };
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
      // verificationToken: stored.verificationToken,
      context: stored.context,
      identifier: stored.identifier,
      // identifierType: stored.identifierType,
    };

    const res = await apiPost('/resend-otp', payload);
    const { requestId, verificationToken, context, identifier, identifierType } = res.data;

    storage.setItem(
      'otpRequestContext',
      JSON.stringify({ requestId, verificationToken, context, identifier, identifierType })
    );

    setOtp(Array(6).fill(''));
    setTimer(60);
    setResendEnabled(false);

    navigate(location.pathname, {
      replace: true,
      state: { context, identifier, identifierType, requestId, verificationToken },
    });
  } catch (err) {
    setError(err.response?.data?.message || 'Unable to resend OTP.');
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="bg-white p-8 rounded-lg w-full max-w-md text-center shadow-lg">
        <h2 className="text-2xl font-semibold text-orange-500 mb-2">Verify Token Use</h2>
        <p className="text-gray-500 mb-4 text-sm">
          Enter the 6‑digit code sent to <span className="font-medium">{identifier || 'your email/number'}</span>
        </p>

        <div className="flex justify-between gap-2 mb-4">
          {otp.map((digit, i) => (
            <input
              key={i}
              id={`otp-${i}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d?$/.test(val)) {
                  const next = [...otp];
                  next[i] = val;
                  setOtp(next);
                  if (val && i < 5) document.getElementById(`otp-${i + 1}`)?.focus();
                }
              }}
              className="w-12 h-12 border-2 border-orange-500 text-center rounded focus:outline-none text-lg"
            />
          ))}
        </div>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={!requestId || !verificationToken}
          className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 disabled:opacity-50"
        >
          Verify
        </button>

        <div className="mt-4 text-sm text-gray-600">
          {resendEnabled ? (
            <button onClick={handleResend} className="text-orange-500 font-bold hover:underline">
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
