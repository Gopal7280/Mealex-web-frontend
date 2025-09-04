// import React from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../layouts/Navbar";
// import OwnerHeader from "./ownerHeader";

// const OwnerKYC = () => {
//   const navigate = useNavigate();

//   return (
//      <div className="flex h-screen ">
//       <Navbar />
//       <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-gray-50 overflow-y-auto">
//         <OwnerHeader />

//       {/* Content */}
//       <div className="flex-grow flex items-center justify-center p-6">
//         <div className="bg-white shadow-md rounded-2xl p-8 max-w-2xl w-full border">
//           <h2 className="text-2xl font-bold text-orange-600 mb-4">
//             Mess KYC Verification
//           </h2>

//         <p className="text-gray-600 mb-6 leading-relaxed">
//   To start receiving payments from customers, you need to complete the KYC
//   process in the following order:
// </p>

// <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
//   <li>
//     <span className="font-semibold">Create Linked Account:</span> This is the
//     first mandatory step where your account gets linked with the payment
//     gateway.
//   </li>
//   <li>
//     <span className="font-semibold">Create Stakeholder:</span> Once the linked
//     account is created, you must register yourself as a stakeholder for
//     compliance and verification.
//   </li>
//   <li>
//     <span className="font-semibold">Add Bank Details:</span> Finally, provide
//     your bank account details so that customer payments can be settled directly
//     into your account.
//   </li>
// </ul>

// <p className="text-gray-600 leading-relaxed">
//   Please note: Until all these steps are successfully completed, you will not
//   be able to receive payments directly from customers. However, you can still
//   purchase a plan on behalf of a customer if required.
// </p>


//           <div className="flex flex-col sm:flex-row gap-4">
//             <button
//               onClick={() => navigate("/linking-account")}
//               className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium transition"
//             >
//               Create Linked Account
//             </button>
//             <button
//               onClick={() => navigate("/create-stakeholder")}
//               className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium transition"
//             >
//               Create Stakeholder
//             </button>
           
//           </div>
//           <div className="flex flex-col sm:flex-row gap-4 mt-4">
//             <button
//   onClick={() => navigate("/create-stakeholder", { state: { activeTab: "bank" } })}
//               className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-lg font-medium transition"
//             >
//               Add Bank Details
//             </button>
//             </div>
//         </div>
//       </div>
//       </div>
//     </div>
//   );
// };

// export default OwnerKYC;

import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../layouts/Navbar";
import OwnerHeader from "./ownerHeader";

const OwnerKYC = () => {
  const navigate = useNavigate();

  const steps = [
    {
      id: 1,
      title: "Create Linked Account",
      description:
        "This is the first mandatory step. Link your account with the payment gateway so your mess becomes eligible to receive payouts.",
      buttonLabel: "Create Linked Account",
      route: "/linking-account",
    },
    {
      id: 2,
      title: "Create Stakeholder",
      description:
        "Register yourself (or an authorized person) as the stakeholder for compliance and verification purposes. This is required after you create the linked account.",
      buttonLabel: "Create Stakeholder",
      route: "/create-stakeholder",
    },
    {
      id: 3,
      title: "Add Bank Details",
      description:
        "Finally, provide bank account information so customer payments can be settled directly into your account.",
      buttonLabel: "Add Bank Details",
      // same route as stakeholder but opening the bank tab via state (unchanged behavior)
      route: "/create-stakeholder",
      routeState: { activeTab: "bank" },
      primary: true,
    },
  ];

  const handleNavigate = (step) => {
    if (step.routeState) navigate(step.route, { state: step.routeState });
    else navigate(step.route);
  };

  return (
    <div className="flex h-screen">
      <Navbar />
      <div className="flex-1 md:p-4 pt-16 py-6 px-4 bg-gray-50 overflow-y-auto">
        <OwnerHeader />

        <div className="flex-grow flex items-center justify-center p-6">
          <div className="max-w-4xl w-full">
            {/* Card */}
            <div className="bg-white shadow-md rounded-2xl p-6 border">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-orange-600">
                    Mess KYC Verification
                  </h2>
                  <p className="text-gray-600 mt-2 max-w-2xl">
                    Complete the KYC steps in sequence. You must finish all three
                    steps to receive payments directly from customers.
                  </p>
                </div>
                <div className="hidden md:block text-right text-sm text-gray-500">
                  <div>Progress: step-by-step workflow</div>
                </div>
              </div>

              {/* Vertical timeline of steps */}
              <div className="space-y-6">
                {steps.map((step, idx) => (
                  <div
                    key={step.id}
                    className="flex gap-4 md:gap-6 items-start bg-white rounded-lg border p-4 shadow-sm"
                  >
                    {/* timeline indicator */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold ${
                          step.primary ? "bg-orange-600" : "bg-orange-400"
                        }`}
                        aria-hidden
                      >
                        {step.id}
                      </div>
                      {/* connector line (not on last element) */}
                      {idx !== steps.length - 1 && (
                        <div className="w-px bg-gray-200 flex-1 mt-2" style={{ minHeight: 24 }} />
                      )}
                    </div>

                    {/* content */}
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {step.title}
                          </h3>
                          <p className="text-sm text-gray-600 mt-2">
                            {step.description}
                          </p>
                        </div>

                        {/* button sits inside each step block — mobile: full width below description; md+: inline */}
                        <div className="mt-3 md:mt-0">
                          <button
                            onClick={() => handleNavigate(step)}
                            className={`w-full md:w-auto px-5 py-2 rounded-lg font-medium transition focus:outline-none
                              ${
                                step.primary
                                  ? "bg-orange-600 hover:bg-orange-700 text-white"
                                  : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                              }`}
                            aria-label={step.buttonLabel}
                          >
                            {step.buttonLabel}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* explanatory footer */}
              <div className="mt-6 text-gray-600 text-sm">
                <p className="leading-relaxed">
                 <span className="text-red-500">Note:</span>Until all steps are completed, you will not receive payouts directly. You can still perform certain actions on behalf of customers if required.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
};

export default OwnerKYC;
