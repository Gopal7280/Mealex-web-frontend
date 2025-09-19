// import React from "react";
// import { useNavigate } from "react-router-dom";

// const OwnerKYCGuide = () => {
//       const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-gray-50 text-gray-800">
       
//       <header className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white text-center py-16 rounded-b-3xl shadow-lg">
//          <button
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-300 transition"
//         >
//           ← Back
//         </button>
//         <h1 className="text-4xl md:text-5xl font-bold">MealX Owner KYC Guide</h1>
        
//         <p className="mt-2 text-lg md:text-xl opacity-95 max-w-2xl mx-auto">
//           Complete these steps to unlock payments, secure your mess identity, and start receiving
//           earnings directly to your bank.
//         </p>
//       </header>

//       <main className="max-w-4xl mx-auto p-6 space-y-8">
//         {/* Why Important */}
//         <section className="bg-white p-6 rounded-2xl shadow-md">
//           <h2 className="text-2xl font-semibold text-orange-600 border-b pb-2">
//             Why is this important?
//           </h2>
//           <p className="mt-4">
//             To run your mess business seamlessly on{" "}
//             <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded-md font-semibold">
//               MealX
//             </span>
//             , you must complete the <strong>KYC (Know Your Customer)</strong> process.
//           </p>
//           <ul className="list-disc ml-6 mt-4 space-y-1">
//             <li>✔ Receive customer payments directly in your bank.</li>
//             <li>✔ Build trust with verified and secure transactions.</li>
//             <li>✔ Stay compliant with RBI and government regulations.</li>
//             <li>✔ Protect your mess from fraud and misuse.</li>
//           </ul>
//         </section>

// import React from "react";
// import { useNavigate } from "react-router-dom";

// const OwnerKYCGuide = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-gray-50 text-gray-800">
//       <header className="relative bg-gradient-to-r from-orange-500 to-yellow-400 text-white text-center py-16 rounded-b-3xl shadow-lg">
//         {/* Back Button - top-left corner */}
//         <button
//           onClick={() => navigate(-1)}
//           className="absolute left-4 top-4 flex items-center gap-2 px-4 py-2 bg-white text-orange-600 font-medium rounded-lg shadow hover:bg-orange-50 transition"
//         >
//           ← Back
//         </button>

//         <h1 className="text-4xl md:text-5xl font-bold">MealX Owner KYC Guide</h1>
//         <p className="mt-2 text-lg md:text-xl opacity-95 max-w-2xl mx-auto">
//           Complete these steps to unlock payments, secure your mess identity, and start receiving
//           earnings directly to your bank.
//         </p>
//       </header>

//       <main className="max-w-4xl mx-auto p-6 space-y-8">
//         {/* Why Important */}
//         <section className="bg-white p-6 rounded-2xl shadow-md">
//           <h2 className="text-2xl font-semibold text-orange-600 border-b pb-2">
//             Why is this important?
//           </h2>
//           <p className="mt-4">
//             To run your mess business seamlessly on{" "}
//             <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded-md font-semibold">
//               MealX
//             </span>
//             , you must complete the <strong>KYC (Know Your Customer)</strong> process.
//           </p>
//           <ul className="list-disc ml-6 mt-4 space-y-1">
//             <li>✔ Receive customer payments directly in your bank.</li>
//             <li>✔ Build trust with verified and secure transactions.</li>
//             <li>✔ Stay compliant with RBI and government regulations.</li>
//             <li>✔ Protect your mess from fraud and misuse.</li>
//           </ul>
//         </section>

//         {/* Step 1 */}
//         <section className="bg-white p-6 rounded-2xl shadow-md">
//           <h2 className="text-2xl font-semibold text-orange-600 border-b pb-2">
//             Step 1: Create & Link Your Razorpay Account
//           </h2>
//           <div className="mt-4 p-6 bg-orange-50 border-l-8 border-orange-400 rounded-xl shadow-sm hover:shadow-md transition">
//             <h3 className="font-semibold text-lg">What happens here?</h3>
//             <p className="mt-2">
//               Your mess is connected with{" "}
//               <span className="bg-yellow-100 text-yellow-600 px-2 py-0.5 rounded-md font-semibold">
//                 Razorpay
//               </span>
//               , our payment partner.
//             </p>
//             <h3 className="mt-4 font-semibold text-lg">Why is it needed?</h3>
//             <p className="mt-2">Without linking, we cannot route customer payments to you.</p>
//             <ul className="list-disc ml-6 mt-4 space-y-1">
//               <li>✅ Confirms your mess identity.</li>
//               <li>✅ Creates a trusted digital wallet for your business.</li>
//               <li>✅ Allows online payments to flow securely.</li>
//             </ul>
//             <p className="mt-4 italic bg-gray-100 p-4 rounded-lg border-l-4 border-orange-400">
//               Think of this as opening a bank account in the digital world—without it, you can’t
//               accept money online.
//             </p>
//           </div>
//         </section>

//         {/* Step 2 */}
//         <section className="bg-white p-6 rounded-2xl shadow-md">
//           <h2 className="text-2xl font-semibold text-orange-600 border-b pb-2">
//             Step 2: Add a Stakeholder (You, the Owner)
//           </h2>
//           <div className="mt-4 p-6 bg-orange-50 border-l-8 border-orange-400 rounded-xl shadow-sm hover:shadow-md transition">
//             <h3 className="font-semibold text-lg">What happens here?</h3>
//             <p className="mt-2">
//               You (the owner) are added as the <strong>stakeholder</strong> of the account.
//             </p>
//             <h3 className="mt-4 font-semibold text-lg">Why is it needed?</h3>
//             <p className="mt-2">
//               Stakeholder verification ensures legal compliance and proves that the mess belongs to
//               you.
//             </p>
//             <ul className="list-disc ml-6 mt-4 space-y-1">
//               <li>✅ Confirms your personal and business identity.</li>
//               <li>✅ Protects against unauthorized usage.</li>
//               <li>✅ Meets mandatory RBI compliance rules.</li>
//             </ul>
//             <p className="mt-4 italic bg-gray-100 p-4 rounded-lg border-l-4 border-orange-400">
//               Just like signing your name on legal documents, this step shows you’re the rightful
//               owner of the mess.
//             </p>
//           </div>
//         </section>

//         {/* Step 3 */}
//         <section className="bg-white p-6 rounded-2xl shadow-md">
//           <h2 className="text-2xl font-semibold text-orange-600 border-b pb-2">
//             Step 3: Submit Bank Details for Settlements
//           </h2>
//           <div className="mt-4 p-6 bg-orange-50 border-l-8 border-orange-400 rounded-xl shadow-sm hover:shadow-md transition">
//             <h3 className="font-semibold text-lg">What happens here?</h3>
//             <p className="mt-2">
//               Provide your <strong>bank account number, IFSC code, and beneficiary name</strong>.
//             </p>
//             <h3 className="mt-4 font-semibold text-lg">Why is it needed?</h3>
//             <p className="mt-2">This guarantees your money reaches you securely and quickly.</p>
//             <ul className="list-disc ml-6 mt-4 space-y-1">
//               <li>✅ Direct deposits—no middlemen.</li>
//               <li>✅ Verified details prevent failed transactions.</li>
//               <li>✅ Timely payouts to keep your mess running smoothly.</li>
//             </ul>
//             <p className="mt-4 italic bg-gray-100 p-4 rounded-lg border-l-4 border-orange-400">
//               Submitting accurate bank details means no delays, no errors—just smooth, direct
//               payments.
//             </p>
//           </div>
//         </section>

//         {/* Final Note */}
//         <section className="bg-white p-6 rounded-2xl shadow-md">
//           <h2 className="text-2xl font-semibold text-orange-600 border-b pb-2">Final Note</h2>
//           <p className="mt-4 italic bg-gray-100 p-4 rounded-lg border-l-4 border-orange-400">
//             Completing all three steps is <strong>mandatory</strong> to activate your mess for online
//             orders and payments. 🚀
//           </p>
//         </section>
//       </main>

//       <footer className="text-center py-6 mt-10 bg-gray-100 text-gray-600 border-t">
//         © 2025 MealX | Secure Payments, Seamless Operations
//       </footer>
//     </div>
//   );
// };

// export default OwnerKYCGuide;


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
          MealX Owner KYC Guide
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
              MealX
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
        © 2025 MealX | Secure Payments, Seamless Operations
      </footer>
    </div>
  );
};

export default OwnerKYCGuide;
