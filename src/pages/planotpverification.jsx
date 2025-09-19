import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiPost } from '../services/api';
import storage from '../utils/storage';
import toast from 'react-hot-toast';

const PlanOtpVerification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(60);
  const [resendEnabled, setResendEnabled] = useState(false);
  const inputsRef = useRef([]);

  // 🔹 State to hold API response fields
  const [verificationData, setVerificationData] = useState(null);

  useEffect(() => {
    const savedResponse = storage.getItem("planIssueResponse");
    if (savedResponse) {
      const parsed = JSON.parse(savedResponse);
      setVerificationData(parsed);
    } else {
      alert("Missing verification data. Redirecting...");
      navigate("/customer-profile/plans");
    }
  }, [navigate]);

  useEffect(() => {
    if (timer === 0) {
      setResendEnabled(true);
    } else {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
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
    if (otp.some((val) => val === "")) {
      setError("Please enter all 6 digits");
      return;
    }

    const fullOtp = otp.join("");

    try {
      const res = await apiPost("/owner/mess/plan/issue/verify", {
        otp: fullOtp,
        verificationToken: verificationData?.verificationToken,
        requestId: verificationData?.requestId,
        context: verificationData?.context,
        identifier: verificationData?.identifier,
        identifierType: verificationData?.identifierType,
      });

      if (res.success) {
        toast.success("🎉 Plan issued successfully!");
        storage.removeItem("planIssueResponse");
        navigate("/customer-profile/plans");
      } else {
        setError("Invalid OTP");
      }
    } catch (err) {
      console.error(err);
      setError("Verification failed. Please try again.");
    }
  };

  const handleResend = async () => {
    setTimer(60);
    setResendEnabled(false);
    setError("");

    try {
      const res = await apiPost("/resend-otp", {
        identifier: verificationData?.identifier,
        identifierType: verificationData?.identifierType,
        context: verificationData?.context,
        requestId: verificationData?.requestId,
      });

      if (res.success && res.requestId) {
        toast.success("✅ OTP resent successfully.");
        setVerificationData((prev) => ({
          ...prev,
          requestId: res.requestId,
        }));
        storage.setItem("planIssueResponse", JSON.stringify({
          ...verificationData,
          requestId: res.requestId,
        }));
      } else {
        setError(res.message || "Failed to resend OTP");
      }
    } catch (err) {
      console.error("Resend OTP failed:", err);
      setError("Resend failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="bg-gray-50 p-8 rounded-lg w-full max-w-md text-center">
        <h2 className="md:text-4xl text-2xl font-semibold text-orange-500 mb-2 md:mb-4">
          Verify Plan Issue
        </h2>
        <p className="text-gray-400 mb-2 md:mb-6 text-sm md:text-base">
          Enter the 6-digit code sent to{" "}
          <span className="font-medium">{verificationData?.identifier}</span>
        </p>

        <div className="flex justify-between gap-2 mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
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

export default PlanOtpVerification;
