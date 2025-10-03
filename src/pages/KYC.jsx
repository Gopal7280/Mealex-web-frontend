

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../layouts/Navbar";
import OwnerHeader from "./ownerHeader";
import { CheckCircle } from "lucide-react";
import { apiGet } from "../services/api";
import toast from "react-hot-toast";
import storage from "../utils/storage";

const OwnerKYC = () => {
  const navigate = useNavigate();
  const [kycStage, setKycStage] = useState(0);
  const [loading, setLoading] = useState(true);

  const messId = storage.getItem("messId"); // 🔑 assuming messId is in localStorage

  const steps = [
    {
      id: 1,
      title: "Create Linked Account",
      description:
        "Link your account with the payment gateway so your mess becomes eligible to receive payouts.",
      buttonLabel: "Create Linked Account",
      route: "/linking-account",
      stage: 0,
    },
    {
      id: 2,
      title: "Create Stakeholder",
      description:
        "Register yourself (or an authorized person) as stakeholder. This unlocks after linked account.",
      buttonLabel: "Create Stakeholder",
      route: "/create-stakeholder",
      stage: 1,
    },
    {
      id: 3,
      title: "Add Bank Details",
      description:
        "Provide bank account info for settlements. This unlocks after stakeholder creation.",
      buttonLabel: "Add Bank Details",
      route: "/create-stakeholder",
      routeState: { activeTab: "bank" },
      stage: 2,
    },
  ];

  useEffect(() => {
    const fetchMessProfile = async () => {
      setLoading(true);
      try {
        const res = await apiGet(`/owner/mess/id/${messId}`);
        if (res?.success) {
          setKycStage(Number(res.data.kyc_stage || 0));
        } else {
          toast.error("Mess not found");
        }
      } catch (e) {
        toast.error("Failed to fetch KYC status");
      } finally {
        setLoading(false);
      }
    };
    if (messId) fetchMessProfile();
  }, [messId]);

  const handleNavigate = (step) => {
    if (step.routeState) navigate(step.route, { state: step.routeState });
    else navigate(step.route);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading KYC details...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <Navbar />
      <div className="flex-1 md:p-4 pt-16 py-6 px-4 bg-gray-50 overflow-y-auto">
        <OwnerHeader />

        {/* Top Description */}
        {/* <div className="text-center max-w-3xl mx-auto my-8">
          <h2 className="text-2xl font-bold text-orange-600">
            Mess KYC Verification
          </h2>
          <p className="text-gray-600 mt-2">
            Complete the KYC steps in sequence. You must finish all three
            steps to receive payments directly from customers.
          </p>
          <button
            onClick={() => navigate("/kyc-info")}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            
          >
            More Information
          </button>
        </div> */}
{/* Top Description */}
<div className="text-center max-w-3xl mx-auto my-8">
  <h2 className="text-2xl font-bold text-orange-600">
    Mess KYC Verification
  </h2>
  <p className="text-gray-600 mt-2">
    Complete the KYC steps in sequence. You must finish all three
    steps to receive payments directly from customers.
  </p>


  <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
  <button
    onClick={() => navigate("/kyc-info")}
    className="bg-green-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
  >
    More Information
  </button>

  {kycStage > 0 && (
    <button
      onClick={() => navigate("/linked-account-details")}
      className="bg-green-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
    >
      View Linked Account
    </button>
  )}
    <button
    onClick={() => navigate("/owner/mess/payment-info")}
    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
  >
    Setup Direct Payment (QR & Mobile)
  </button>
</div>
{/* <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
  <button
    onClick={() => navigate("/kyc-info")}
    className="bg-green-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
  >
    More Information
  </button>

  {kycStage > 0 && (
    <button
      onClick={() => navigate("/linked-account-details")}
      className="bg-green-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
    >
      View Linked Account
    </button>
  )}
</div>

✨ Added Explanation for Direct Payment
<div className="text-center max-w-2xl mx-auto mt-6">
  <p className="text-gray-700 text-sm">
    If you don’t want to provide full bank details or complete KYC,  
    you can directly set up <span className="font-medium text-gray-900">Mobile Number, UPI, or QR</span>  
    for receiving payments from customers.
  </p>

  <button
    onClick={() => navigate("/owner/mess/payment-info")}
    className="mt-3 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
  >
    Setup Direct Payment (QR & Mobile)
  </button>
</div> */}


</div>

        {/* Steps Workflow */}
        {/* <div className="max-w-xl mx-auto space-y-6">
          {steps.map((step) => {
            const isCompleted = kycStage > step.stage;
            const isCurrent = kycStage === step.stage;
            const isDisabled = !isCurrent;

            return (
              <div
                key={step.id}
                className="flex flex-col items-center text-center bg-white border rounded-xl p-6 shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-full font-bold text-white ${
                      isCompleted ? "bg-green-500" : "bg-orange-500"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {step.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {step.description}
                </p>

                <button
                  disabled={isDisabled || isCompleted}
                  onClick={() => handleNavigate(step)}
                  className={`mt-4 px-5 py-2 rounded-lg font-medium transition 
                    ${
                      isCompleted
                        ? "bg-green-100 text-green-700 cursor-not-allowed"
                        : isDisabled
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-orange-600 hover:bg-orange-700 text-white"
                    }`}
                >
                  {isCompleted ? "Completed" : step.buttonLabel}
                </button>
              </div>
            );
          })}
        </div> */}
        <div className="max-w-2xl mx-auto space-y-10">
  {steps.map((step, index) => {
    const isCompleted = kycStage > step.stage;
    const isCurrent = kycStage === step.stage;
    const isDisabled = !isCurrent;

    return (
      <div key={step.id} className="relative">
        {/* Step Card */}
        <div
          className={`flex flex-col items-center text-center bg-white border rounded-2xl p-6 shadow-lg transition ${
            isCurrent ? "ring-2 ring-orange-400" : ""
          }`}
        >
          {/* Step Circle */}
          <div
            className={`w-12 h-12 flex items-center justify-center rounded-full font-bold text-white mb-3 ${
              isCompleted ? "bg-green-500" : "bg-orange-500"
            }`}
          >
            {isCompleted ? (
              <CheckCircle className="w-6 h-6" />
            ) : (
              step.id
            )}
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-800">
            {step.title}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{step.description}</p>

          {/* Action Button */}
          <button
            disabled={isDisabled || isCompleted}
            onClick={() => handleNavigate(step)}
            className={`mt-4 px-6 py-2 rounded-full font-medium transition-all shadow ${
              isCompleted
                ? "bg-green-100 text-green-700 cursor-not-allowed"
                : isDisabled
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-orange-600 hover:bg-orange-700 text-white"
            }`}
          >
            {isCompleted ? "Completed" : step.buttonLabel}
          </button>
        </div>

        {/* Connector Arrow (show only if not last step) */}
        {index < steps.length - 1 && (
          <div className="flex justify-center mt-3">
            <div className="w-px h-8 bg-gray-300"></div>
          </div>
        )}
      </div>
    );
  })}
</div>


        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-gray-500 max-w-xl mx-auto">
          <span className="text-red-500">Note:</span> Until all steps are
          completed, payouts cannot be received directly into your account.
        </div>
      </div>
    </div>
  );
};

export default OwnerKYC;
