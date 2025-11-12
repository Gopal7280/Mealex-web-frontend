import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, ArrowLeft, User, Banknote, Wallet } from "lucide-react";

const OwnerKYCGuide = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white text-gray-800">
      {/* Header */}
      <header className="relative bg-gradient-to-r from-orange-500 to-yellow-400 text-white text-center py-20 rounded-b-3xl shadow-xl">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 top-4 flex items-center gap-2 px-3 py-2 
          bg-white/20 backdrop-blur-lg border border-white/30 text-white font-medium rounded-xl 
          hover:bg-white/30 transition"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>

        <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg">
          MealEX Owner KYC Guide
        </h1>
        <p className="mt-4 text-lg md:text-xl opacity-95 max-w-2xl mx-auto leading-relaxed">
          Unlock payments, secure your mess identity, and start receiving
          earnings directly in your bank account.
        </p>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 py-12 space-y-10">
        {/* Why Important */}
        <section className="bg-white/70 backdrop-blur-md p-8 rounded-3xl shadow-lg hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold text-orange-600 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-orange-500" /> Why is this important?
          </h2>
          <p className="mt-4 leading-relaxed">
            To run your mess business seamlessly on{" "}
            <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded-md font-semibold">
              MealEX
            </span>
            , you must complete the <strong>KYC (Know Your Customer)</strong> process.
          </p>
          <ul className="grid sm:grid-cols-2 gap-3 mt-6 text-gray-700">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" /> Direct payments in your bank
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" /> Verified & secure transactions
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" /> RBI compliant
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" /> Fraud protection
            </li>
          </ul>
        </section>

        {/* Steps */}
        {[
          {
            step: "Step 1",
            title: "Create & Link Your Razorpay Account",
            icon: <Wallet className="w-8 h-8 text-orange-500" />,
            details:
              "Your mess will be connected with Razorpay, our trusted payment partner.",
            why: "Without linking, we cannot route customer payments to you.",
            list: [
              "Confirms your mess identity",
              "Creates a trusted digital wallet",
              "Enables secure online payments",
            ],
            note: "Think of this as opening a digital bank account—without it, you can’t accept money online.",
          },
          {
            step: "Step 2",
            title: "Add a Stakeholder (You, the Owner)",
            icon: <User className="w-8 h-8 text-orange-500" />,
            details:
              "You (the owner) are added as the official stakeholder of the account.",
            why: "This proves that the mess belongs to you and ensures compliance.",
            list: [
              "Confirms your personal & business identity",
              "Protects against unauthorized usage",
              "Meets mandatory RBI rules",
            ],
            note: "Like signing your name on legal documents, this proves ownership.",
          },
          {
            step: "Step 3",
            title: "Submit Bank Details for Settlements",
            icon: <Banknote className="w-8 h-8 text-orange-500" />,
            details:
              "Provide your bank account number, IFSC code, and beneficiary name.",
            why: "This ensures your money reaches you securely & quickly.",
            list: [
              "Direct deposits—no middlemen",
              "Verified details prevent failures",
              "Smooth & timely payouts",
            ],
            note: "Accurate bank details = no delays, no errors, only smooth payments.",
          },
        ].map((s, i) => (
          <section
            key={i}
            className="bg-white/70 backdrop-blur-md p-8 rounded-3xl shadow-lg hover:shadow-xl transition"
          >
            <h2 className="text-2xl font-semibold text-orange-600 flex items-center gap-2 border-b pb-3">
              {s.icon} {s.step}: {s.title}
            </h2>
            <p className="mt-4">{s.details}</p>
            <h3 className="mt-6 font-semibold text-lg">Why is it needed?</h3>
            <p className="mt-2">{s.why}</p>
            <ul className="list-disc ml-6 mt-4 space-y-1 text-gray-700">
              {s.list.map((l, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" /> {l}
                </li>
              ))}
            </ul>
            <p className="mt-6 italic bg-gray-50 p-4 rounded-xl border-l-4 border-orange-400 text-gray-700">
              {s.note}
            </p>
          </section>
        ))}

        {/* Final Note */}
        <section className="bg-gradient-to-r from-orange-100 to-yellow-50 p-8 rounded-3xl shadow-inner border-l-8 border-orange-500">
          <h2 className="text-2xl font-semibold text-orange-700">Final Note</h2>
          <p className="mt-4 italic text-gray-800">
            Completing all three steps is <strong>mandatory</strong> to activate your mess
            for online orders and payments. 🚀
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 mt-10 bg-gray-100 text-gray-600 border-t">
        © 2025 MealEX | Secure Payments, Seamless Operations
      </footer>
    </div>
  );
};

export default OwnerKYCGuide;




// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { CheckCircle, ArrowLeft, User, Banknote, Wallet } from "lucide-react";
// import { useTranslation } from "react-i18next";

// const OwnerKYCGuide = () => {
//   const navigate = useNavigate();
//   const { t } = useTranslation();

//   const steps = [
//     {
//       step: t("kyc.step1"),
//       title: t("kyc.step1_title"),
//       icon: <Wallet className="w-8 h-8 text-orange-500" />,
//       details: t("kyc.step1_details"),
//       why: t("kyc.step1_why"),
//       list: [
//         t("kyc.step1_point1"),
//         t("kyc.step1_point2"),
//         t("kyc.step1_point3"),
//       ],
//       note: t("kyc.step1_note"),
//     },
//     {
//       step: t("kyc.step2"),
//       title: t("kyc.step2_title"),
//       icon: <User className="w-8 h-8 text-orange-500" />,
//       details: t("kyc.step2_details"),
//       why: t("kyc.step2_why"),
//       list: [
//         t("kyc.step2_point1"),
//         t("kyc.step2_point2"),
//         t("kyc.step2_point3"),
//       ],
//       note: t("kyc.step2_note"),
//     },
//     {
//       step: t("kyc.step3"),
//       title: t("kyc.step3_title"),
//       icon: <Banknote className="w-8 h-8 text-orange-500" />,
//       details: t("kyc.step3_details"),
//       why: t("kyc.step3_why"),
//       list: [
//         t("kyc.step3_point1"),
//         t("kyc.step3_point2"),
//         t("kyc.step3_point3"),
//       ],
//       note: t("kyc.step3_note"),
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white text-gray-800">
//       {/* Header */}
//       <header className="relative bg-gradient-to-r from-orange-500 to-yellow-400 text-white text-center py-20 rounded-b-3xl shadow-xl">
//         <button
//           onClick={() => navigate(-1)}
//           className="absolute left-4 top-4 flex items-center gap-2 px-3 py-2 
//           bg-white/20 backdrop-blur-lg border border-white/30 text-white font-medium rounded-xl 
//           hover:bg-white/30 transition"
//         >
//           <ArrowLeft className="w-5 h-5" /> {t("common.back")}
//         </button>

//         <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg">
//           {t("kyc.title")}
//         </h1>
//         <p className="mt-4 text-lg md:text-xl opacity-95 max-w-2xl mx-auto leading-relaxed">
//           {t("kyc.subtitle")}
//         </p>
//       </header>

//       {/* Content */}
//       <main className="max-w-5xl mx-auto px-6 py-12 space-y-10">
//         {/* Why Important */}
//         <section className="bg-white/70 backdrop-blur-md p-8 rounded-3xl shadow-lg hover:shadow-xl transition">
//           <h2 className="text-2xl font-semibold text-orange-600 flex items-center gap-2">
//             <CheckCircle className="w-6 h-6 text-orange-500" />{" "}
//             {t("kyc.why_heading")}
//           </h2>
//           <p className="mt-4 leading-relaxed">
//             {t("kyc.why_description.part1")}{" "}
//             <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded-md font-semibold">
//               MealEX
//             </span>{" "}
//             {t("kyc.why_description.part2")}
//           </p>
//           <ul className="grid sm:grid-cols-2 gap-3 mt-6 text-gray-700">
//             <li className="flex items-center gap-2">
//               <CheckCircle className="w-5 h-5 text-green-500" />{" "}
//               {t("kyc.why_point1")}
//             </li>
//             <li className="flex items-center gap-2">
//               <CheckCircle className="w-5 h-5 text-green-500" />{" "}
//               {t("kyc.why_point2")}
//             </li>
//             <li className="flex items-center gap-2">
//               <CheckCircle className="w-5 h-5 text-green-500" />{" "}
//               {t("kyc.why_point3")}
//             </li>
//             <li className="flex items-center gap-2">
//               <CheckCircle className="w-5 h-5 text-green-500" />{" "}
//               {t("kyc.why_point4")}
//             </li>
//           </ul>
//         </section>

//         {/* Steps */}
//         {steps.map((s, i) => (
//           <section
//             key={i}
//             className="bg-white/70 backdrop-blur-md p-8 rounded-3xl shadow-lg hover:shadow-xl transition"
//           >
//             <h2 className="text-2xl font-semibold text-orange-600 flex items-center gap-2 border-b pb-3">
//               {s.icon} {s.step}: {s.title}
//             </h2>
//             <p className="mt-4">{s.details}</p>
//             <h3 className="mt-6 font-semibold text-lg">{t("kyc.why_needed")}</h3>
//             <p className="mt-2">{s.why}</p>
//             <ul className="list-disc ml-6 mt-4 space-y-1 text-gray-700">
//               {s.list.map((l, idx) => (
//                 <li key={idx} className="flex items-center gap-2">
//                   <CheckCircle className="w-5 h-5 text-green-500" /> {l}
//                 </li>
//               ))}
//             </ul>
//             <p className="mt-6 italic bg-gray-50 p-4 rounded-xl border-l-4 border-orange-400 text-gray-700">
//               {s.note}
//             </p>
//           </section>
//         ))}

//         {/* Final Note */}
//         <section className="bg-gradient-to-r from-orange-100 to-yellow-50 p-8 rounded-3xl shadow-inner border-l-8 border-orange-500">
//           <h2 className="text-2xl font-semibold text-orange-700">
//             {t("kyc.final_note_title")}
//           </h2>
//           <p className="mt-4 italic text-gray-800">{t("kyc.final_note_text")}</p>
//         </section>
//       </main>

//       {/* Footer */}
//       <footer className="text-center py-6 mt-10 bg-gray-100 text-gray-600 border-t">
//         © 2025 MealEX | {t("kyc.footer")}
//       </footer>
//     </div>
//   );
// };

// export default OwnerKYCGuide;
