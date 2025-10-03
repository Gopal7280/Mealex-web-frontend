// src/pages/DeactivateAccount.jsx
import { useState } from "react";
import { apiPost } from "../services/api";

const DeactivateAccount = () => {
  const [identifier, setIdentifier] = useState("");
  const [reason, setReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDeactivate = async () => {
    setError("");

    if (!identifier.trim()) {
      setError("Please enter your email or phone.");
      return;
    }

    if (!reason) {
      setError("Please select a reason.");
      return;
    }

    const finalReason = reason === "Other" ? otherReason || "Other (no details)" : reason;

    setLoading(true);

    try {
      const res = await apiPost("/admin/deactivate-user", { identifier, reason: finalReason });

      if (res?.success) {
        alert("Your account has been deactivated. You can log in again to recover it.");
        setIdentifier("");
        setReason("");
        setOtherReason("");
      } else {
        setError(res?.message || "Failed to deactivate account.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8">

      <div className="max-w-md mx-auto mt-8 text-center">
        <img
          src="https://i.ibb.co/8tVpjTp/logo.png"
          alt="MealX Logo"
          className="w-48 mx-auto mb-4"
        />
        <p className="text-orange-600 font-semibold text-lg mb-4">Delete Your Account</p>

        <p className="text-gray-500 text-sm mb-6 leading-relaxed">
          Your account will be <strong>temporarily delete</strong>.<br />
          If you log in within the next few days, your account will be restored.<br />
          Otherwise, your account and all associated data will be <strong>permanently deleted</strong>.
        </p>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="text-left mb-4">
          <label className="block text-orange-600 font-semibold mb-1">Email or Phone Number</label>
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="Enter Email or Phone"
            className="w-full p-3 rounded-lg border border-gray-300 bg-gray-100 focus:outline-none"
          />
        </div>

        <div className="text-left mb-4">
          <label className="block text-orange-600 font-semibold mb-1">Reason for Leaving</label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 bg-gray-100 focus:outline-none"
          >
            <option value="">Select a reason</option>
            <option value="Not satisfied with service">Not satisfied with service</option>
            <option value="Privacy concerns">Privacy concerns</option>
            <option value="Found an alternative">Found an alternative</option>
            <option value="Temporary break">Temporary break</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {reason === "Other" && (
          <div className="text-left mb-4">
            <label className="block text-orange-600 font-semibold mb-1">Please tell us more</label>
            <textarea
              value={otherReason}
              onChange={(e) => setOtherReason(e.target.value)}
              placeholder="Write your reason..."
              className="w-full p-3 rounded-lg border border-gray-300 bg-gray-100 focus:outline-none resize-y min-h-[80px]"
            />
          </div>
        )}

        <button
          onClick={handleDeactivate}
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold text-white ${loading ? "bg-orange-300 cursor-not-allowed" : "bg-orange-600 hover:bg-orange-700"}`}
        >
          {loading ? "Processing..." : "Deactivate Account"}
        </button>

        <p className="text-gray-500 text-sm mt-4 leading-relaxed">
          You can always contact our support team if you change your mind.
        </p>
        <p className="text-gray-700 text-sm mt-2">
          Need help? <a href="mailto:support@mealex.in" className="text-orange-600 font-semibold">support@mealex.in</a>
        </p>
      </div>
    </div>
  );
};

export default DeactivateAccount;
