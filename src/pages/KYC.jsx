

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../layouts/Navbar";
// import OwnerHeader from "./ownerHeader";

// const OwnerKYC = () => {
//   const navigate = useNavigate();

//   const steps = [
//     {
//       id: 1,
//       title: "Create Linked Account",
//       description:
//         "This is the first mandatory step. Link your account with the payment gateway so your mess becomes eligible to receive payouts.",
//       buttonLabel: "Create Linked Account",
//       route: "/linking-account",
//     },
//     {
//       id: 2,
//       title: "Create Stakeholder",
//       description:
//         "Register yourself (or an authorized person) as the stakeholder for compliance and verification purposes. This is required after you create the linked account.",
//       buttonLabel: "Create Stakeholder",
//       route: "/create-stakeholder",
//     },
//     {
//       id: 3,
//       title: "Add Bank Details",
//       description:
//         "Finally, provide bank account information so customer payments can be settled directly into your account.",
//       buttonLabel: "Add Bank Details",
//       // same route as stakeholder but opening the bank tab via state (unchanged behavior)
//       route: "/create-stakeholder",
//       routeState: { activeTab: "bank" },
//       primary: true,
//     },
//   ];

//   const handleNavigate = (step) => {
//     if (step.routeState) navigate(step.route, { state: step.routeState });
//     else navigate(step.route);
//   };

//   return (
//     <div className="flex h-screen">
//       <Navbar />
//       <div className="flex-1 md:p-4 pt-16 py-6 px-4 bg-gray-50 overflow-y-auto">
//         <OwnerHeader />

//         <div className="flex-grow flex items-center justify-center p-6">
//           <div className="max-w-4xl w-full">
//             {/* Card */}
//             <div className="bg-white shadow-md rounded-2xl p-6 border">
//               <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
//                 <div>
//                   <h2 className="text-2xl font-bold text-orange-600">
//                     Mess KYC Verification
//                   </h2>
//                   <p className="text-gray-600 mt-2 max-w-2xl">
//                     Complete the KYC steps in sequence. You must finish all three
//                     steps to receive payments directly from customers.
//                   </p>
//                 </div>
//                 <div className="hidden md:block text-right text-sm text-gray-500">
//                   <div>Progress: step-by-step workflow</div>
//                 </div>
//               </div>

//               {/* Vertical timeline of steps */}
//               <div className="space-y-6">
//                 {steps.map((step, idx) => (
//                   <div
//                     key={step.id}
//                     className="flex gap-4 md:gap-6 items-start bg-white rounded-lg border p-4 shadow-sm"
//                   >
//                     {/* timeline indicator */}
//                     <div className="flex flex-col items-center">
//                       <div
//                         className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold ${
//                           step.primary ? "bg-orange-600" : "bg-orange-400"
//                         }`}
//                         aria-hidden
//                       >
//                         {step.id}
//                       </div>
//                       {/* connector line (not on last element) */}
//                       {idx !== steps.length - 1 && (
//                         <div className="w-px bg-gray-200 flex-1 mt-2" style={{ minHeight: 24 }} />
//                       )}
//                     </div>

//                     {/* content */}
//                     <div className="flex-1">
//                       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
//                         <div>
//                           <h3 className="text-lg font-semibold text-gray-800">
//                             {step.title}
//                           </h3>
//                           <p className="text-sm text-gray-600 mt-2">
//                             {step.description}
//                           </p>
//                         </div>

//                         {/* button sits inside each step block — mobile: full width below description; md+: inline */}
//                         <div className="mt-3 md:mt-0">
//                           <button
//                             onClick={() => handleNavigate(step)}
//                             className={`w-full md:w-auto px-5 py-2 rounded-lg font-medium transition focus:outline-none
//                               ${
//                                 step.primary
//                                   ? "bg-orange-600 hover:bg-orange-700 text-white"
//                                   : "bg-gray-100 hover:bg-gray-200 text-gray-800"
//                               }`}
//                             aria-label={step.buttonLabel}
//                           >
//                             {step.buttonLabel}
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* explanatory footer */}
//               <div className="mt-6 text-gray-600 text-sm">
//                 <p className="leading-relaxed">
//                  <span className="text-red-500">Note:</span>Until all steps are completed, you will not receive payouts directly. You can still perform certain actions on behalf of customers if required.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>  
//     </div>
//   );
// };

// export default OwnerKYC;



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../layouts/Navbar";
// import OwnerHeader from "./ownerHeader";
// import { CheckCircle } from "lucide-react";

// const OwnerKYC = () => {
//   const navigate = useNavigate();
//   const [completedSteps, setCompletedSteps] = useState([]);

//   const steps = [
//     {
//       id: 1,
//       title: "Create Linked Account",
//       description: "Link your account with the payment gateway so your mess becomes eligible to receive payouts.",
//       buttonLabel: "Create Linked Account",
//       route: "/linking-account",
//     },
//     {
//       id: 2,
//       title: "Create Stakeholder",
//       description: "Register yourself (or an authorized person) as stakeholder. This unlocks after linked account.",
//       buttonLabel: "Create Stakeholder",
//       route: "/create-stakeholder",
//     },
//     {
//       id: 3,
//       title: "Add Bank Details",
//       description: "Provide bank account info for settlements. This unlocks after stakeholder creation.",
//       buttonLabel: "Add Bank Details",
//       route: "/create-stakeholder",
//       routeState: { activeTab: "bank" },
//     },
//   ];

//   const handleNavigate = (step) => {
//     if (step.routeState) navigate(step.route, { state: step.routeState });
//     else navigate(step.route);

//     // simulation: mark as complete (in real scenario, backend confirmation aayega)
//     if (!completedSteps.includes(step.id)) {
//       setCompletedSteps([...completedSteps, step.id]);
//     }
//   };

//   return (
//     <div className="flex h-screen">
//       <Navbar />
//       <div className="flex-1 md:p-4 pt-16 py-6 px-4 bg-gray-50 overflow-y-auto">
//         <OwnerHeader />

//         {/* Top Description */}
//         <div className="text-center max-w-3xl mx-auto my-8">
//           <h2 className="text-2xl font-bold text-orange-600">Mess KYC Verification</h2>
//           <p className="text-gray-600 mt-2">
//             Complete the KYC steps in sequence. You must finish all three
//             steps to receive payments directly from customers.
//           </p>
//           <button
//             onClick={() => navigate("/kyc-info")}
//             className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
//           >
//             More Information
//           </button>
//         </div>

//         {/* Steps Workflow */}
//         <div className="max-w-xl mx-auto space-y-6">
//           {steps.map((step, idx) => {
//             const isCompleted = completedSteps.includes(step.id);
//             const isDisabled =
//               idx > 0 && !completedSteps.includes(steps[idx - 1].id);

//             return (
//               <div
//                 key={step.id}
//                 className="flex flex-col items-center text-center bg-white border rounded-xl p-6 shadow-md"
//               >
//                 <div className="flex items-center gap-3">
//                   <div
//                     className={`w-10 h-10 flex items-center justify-center rounded-full font-bold text-white ${
//                       isCompleted ? "bg-green-500" : "bg-orange-500"
//                     }`}
//                   >
//                     {isCompleted ? <CheckCircle className="w-6 h-6" /> : step.id}
//                   </div>
//                   <h3 className="text-lg font-semibold text-gray-800">
//                     {step.title}
//                   </h3>
//                 </div>
//                 <p className="text-sm text-gray-600 mt-2">{step.description}</p>

//                 <button
//                   disabled={isDisabled || isCompleted}
//                   onClick={() => handleNavigate(step)}
//                   className={`mt-4 px-5 py-2 rounded-lg font-medium transition 
//                     ${
//                       isCompleted
//                         ? "bg-green-100 text-green-700 cursor-not-allowed"
//                         : isDisabled
//                         ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                         : "bg-orange-600 hover:bg-orange-700 text-white"
//                     }`}
//                 >
//                   {isCompleted ? "Completed" : step.buttonLabel}
//                 </button>
//               </div>

//             );
//           })}
//         </div>

//         {/* Footer Note */}
//         <div className="mt-8 text-center text-sm text-gray-500 max-w-xl mx-auto">
//           <span className="text-red-500">Note:</span> Until all steps are completed,
//           payouts cannot be received directly into your account.
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OwnerKYC;


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
        console.log(res);
        if (res?.success) {
          setKycStage(Number(res.data.kyc_stage || 0));
        } else {
          toast.error("Mess not found");
        }
      } catch (e) {
        console.error("Error fetching mess profile:", e);
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

  {/* <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
    <button
      onClick={() => navigate("/kyc-info")}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
    >
      More Information
    </button>

    <button
      onClick={() => navigate("/linked-account-details")}
      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
    >
      View Linked Account
    </button>
  </div> */}
  <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
  <button
    onClick={() => navigate("/kyc-info")}
    className="bg-green-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
  >
    More Information
  </button>

  {/* ✅ Show only if kycStage > 0 */}
  {kycStage > 0 && (
    <button
      onClick={() => navigate("/linked-account-details")}
      className="bg-green-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
    >
      View Linked Account
    </button>
  )}
</div>

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
