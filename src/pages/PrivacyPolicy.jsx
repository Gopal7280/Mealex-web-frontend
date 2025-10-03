// // src/PrivacyPolicy.jsx

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { FiArrowLeft } from "react-icons/fi";

// export function PrivacyPolicy() {
//   const navigate = useNavigate();

//   return (
//     <div className="bg-white min-h-screen py-4 px-4 sm:px-6 lg:px-8">
//         {/* Back Button */}
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-2 mb-6 text-orange-500 font-semibold hover:text-orange-600"
//         >
//           <FiArrowLeft size={20} /> Back
//         </button>
//               <div className="max-w-3xl mx-auto">


//         <div className="prose prose-blue text-gray-700 mx-auto">
//           <h1 className="text-3xl font-extrabold text-orange-500 mb-4">
//             Privacy Policy
//           </h1>

//           <p className="text-gray-500 text-sm mb-6">
//             Last Updated: September 18, 2025
//           </p>

//           <p className="mb-4">
//             This Privacy Policy describes the practices of <strong>Compunic Private Limited</strong> ("we", "us", "our") regarding the <strong>MealEX</strong> web application (the "App").
//           </p>
//           <p className="mb-6">
//             This policy is written in compliance with the Digital Personal Data Protection Act, 2023 (DPDP Act) of India.
//           </p>

//           <h2 className="text-xl font-bold text-orange-500 mt-8 mb-3">
//             1. Data Collection and Usage
//           </h2>
//           <p className="mb-4">
//             To deliver our services, we collect and process certain personal and transactional data when you interact with the App.
//           </p>
//           <ul className="list-disc list-outside space-y-2 pl-5 mt-4">
//             <li>
//               <strong>Account Information:</strong> When you sign up using Google, Facebook, or email, we collect basic profile details (name, email, profile photo).
//             </li>
//             <li>
//               <strong>Mess and Customer Profiles:</strong> Customers and mess owners provide information such as mess name, contact details, location, and food preferences.
//             </li>
//             <li>
//               <strong>Plans and Payments:</strong> We collect subscription details, payment confirmations, and transaction records.
//             </li>
//             <li>
//               <strong>Usage Data:</strong> Logs related to plan usage, token consumption, and order activity to provide accurate dashboards.
//             </li>
//             <li>
//               <strong>Communication Data:</strong> Notifications via WebSockets for real-time updates.
//             </li>
//           </ul>

//           <h2 className="text-xl font-bold text-orange-500 mt-8 mb-3">
//             2. Links to Other Sites
//           </h2>
//           <p className="mb-4">
//             The App may contain links to our official website,{" "}
//             <a
//               href="https://mealex.in"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-orange-500 hover:underline"
//             >
//               https://mealex.in
//             </a>. We have no control over other sites’ privacy practices.
//           </p>

//           <h2 className="text-xl font-bold text-orange-500 mt-8 mb-3">
//             3. Data Security
//           </h2>
//           <p className="mb-4">
//             We implement reasonable technical and organizational measures including encrypted token-based authentication and secure payment gateways.
//           </p>

//           <h2 className="text-xl font-bold text-orange-500 mt-8 mb-3">
//             4. Changes to This Privacy Policy
//           </h2>
//           <p className="mb-4">
//             Updates may be posted on this page with a revised "Last Updated" date.
//           </p>

//           <h2 className="text-xl font-bold text-orange-500 mt-8 mb-3">
//             5. Your Rights
//           </h2>
//           <p className="mb-4">
//             Under the DPDP Act, you can access, correct, and request deletion of your data. Contact us for any requests.
//           </p>

//           <h2 className="text-xl font-bold text-orange-500 mt-8 mb-3">
//             6. Contact Us / Grievance Officer
//           </h2>
//           <p className="mb-4">
//             If you have any questions about this Privacy Policy, contact our Grievance Officer:
//           </p>
//           <address className="not-italic bg-gray-50 p-4 rounded-lg border border-gray-200">
//             <strong>Data Privacy Team</strong>
//             <br />
//             Email:{" "}
//             <a
//               href="mailto:support@mealex.in"
//               className="font-medium text-orange-500 hover:underline"
//             >
//               support@mealex.in
//             </a>
//             <br />
//             Address: Compunic Private Limited, 198, Somani Nagar, 60 Ft. Airport Road, Indore-452005
//           </address>
//         </div>
//       </div>
//     </div>
//   );
// }






// src/MealexPrivacyPolicy.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import mealexLogo from "../assets/mealx.png"; // your uploaded logo
import { FaInstagram, FaLinkedin, FaFacebook } from "react-icons/fa";

export function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen py-4 px-4 sm:px-6 lg:px-8">
      <button
        onClick={() => navigate(-1)}
        aria-label="Go back"
        className="flex items-center gap-2 mb-6 text-orange-500 font-semibold hover:text-orange-600"
      >
        <FiArrowLeft size={20} /> Back
      </button>

      <div className="max-w-4xl mx-auto">
        <div className="prose prose-blue text-gray-700 mx-auto">
          <h1 className="text-3xl font-extrabold text-orange-500 mb-4">
            Privacy Policy & Terms of Service - MealEX
          </h1>

          <p className="text-gray-500 text-sm mb-6">
            Last Updated: September 27, 2025
          </p>

          <p className="mb-4">
            At <strong>MealEX</strong>, we are committed to protecting the privacy and confidentiality of our users’ personal information, including customers and mess owners.
          </p>

          <h2 className="text-xl font-bold text-orange-500 mt-8 mb-3">
            1. Information We Collect
          </h2>
          <ul className="list-disc list-outside space-y-2 pl-5 mt-4">
            <li>
              <strong>Account Information:</strong> Name, email, profile photo when registering via Google, Facebook, or email.
            </li>
            <li>
              <strong>Customer Data:</strong> Contact info, subscription history, plan usage, token consumption, and order logs.
            </li>
            <li>
              <strong>Mess Owner Data:</strong> Mess name, location, contact, food services, plan creation data. Optional KYC through Razorpay is used for verification.
            </li>
            <li>
              <strong>Payment Information:</strong> Transaction details, subscription payments via Razorpay or other payment methods.
            </li>
            <li>
              <strong>Usage Data:</strong> IP addresses, browser info, cookies, and logs for analytics and improving the platform.
            </li>
            <li>
              <strong>Communication Data:</strong> WebSocket notifications, emails, or support interactions.
            </li>
          </ul>

          <h2 className="text-xl font-bold text-orange-500 mt-8 mb-3">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc list-outside space-y-2 pl-5 mt-4">
            <li>To provide our services efficiently and track plan/token usage.</li>
            <li>To verify mess owner identity (optional KYC with Razorpay).</li>
            <li>For payment processing, subscription management, and refunds.</li>
            <li>To communicate updates, promotions, or customer support information.</li>
            <li>To analyze platform usage, improve performance, and prevent fraud.</li>
          </ul>

          <h2 className="text-xl font-bold text-orange-500 mt-8 mb-3">
            3. Data Security
          </h2>
          <p className="mb-4">
            We implement technical and organizational measures including secure token-based authentication, encrypted data storage, and secure payment gateways to protect your data.
          </p>

          <h2 className="text-xl font-bold text-orange-500 mt-8 mb-3">
            4. Third-Party Services
          </h2>
          <p className="mb-4">
            We may use third-party services like Razorpay for payments and optional KYC verification. These providers are bound by strict data protection agreements.
          </p>

          <h2 className="text-xl font-bold text-orange-500 mt-8 mb-3">
            5. Refund & Cancellation Policy
          </h2>
          <ul className="list-disc list-outside space-y-2 pl-5 mt-4">
            <li>
              Refunds are provided if a service cannot be delivered or in accordance with the plan-specific policies.
            </li>
            <li>
              Cancellation requests must be submitted before the service execution. Perishable items or already used tokens are non-refundable.
            </li>
            <li>
              Refunds, once approved, may take 7-15 business days to process depending on the payment method.
            </li>
          </ul>

          <h2 className="text-xl font-bold text-orange-500 mt-8 mb-3">
            6. User Rights
          </h2>
          <ul className="list-disc list-outside space-y-2 pl-5 mt-4">
            <li>Access and review your personal data.</li>
            <li>Request corrections or updates to inaccurate information.</li>
            <li>Opt-out of communications or unsubscribe from notifications.</li>
            <li>Request deletion of your personal data under applicable laws.</li>
          </ul>

          <h2 className="text-xl font-bold text-orange-500 mt-8 mb-3">
            7. Terms of Use
          </h2>
          <ul className="list-disc list-outside space-y-2 pl-5 mt-4">
            <li>
              Users must provide accurate and complete information during registration.
            </li>
            <li>
              All services are provided as-is; MealEX is not liable for incorrect use or misuse.
            </li>
            <li>
              Unauthorized access or usage may result in suspension or legal action.
            </li>
            <li>
              Users agree that any disputes will be governed by the laws of India, with courts in Indore/Madhya Pradesh having exclusive jurisdiction.
            </li>
          </ul>

          <h2 className="text-xl font-bold text-orange-500 mt-8 mb-3">
            8. Changes to This Policy
          </h2>
          <p className="mb-4">
            We may update this policy occasionally. The "Last Updated" date will reflect any changes.
          </p>

          <h2 className="text-xl font-bold text-orange-500 mt-8 mb-3">
            9. Contact Us
          </h2>
          <address className="not-italic bg-gray-50 p-4 rounded-lg border border-gray-200">
            <strong>MealEX Support Team</strong>
            <br />
            Email:{" "}
            <a
              href="mailto:support@mealex.in"
              className="font-medium text-orange-500 hover:underline"
            >
              support@mealex.in
            </a>
            <br />
            Address: Compunic Private Limited, 198, Somani Nagar, 60 Ft. Airport Road, Indore-452005
          </address>

          {/* Footer */}
          <div className="mt-10 border-t border-gray-200 pt-6 flex flex-col sm:flex-row justify-between items-center">
            <div className="mb-4 sm:mb-0">
              <img src={mealexLogo} alt="MealEX Logo" className="h-12" />
            </div>

            <div className="flex flex-col sm:flex-row gap-6 text-orange-500 font-medium">
              <div>
                <h3 className="font-bold mb-1">Reach Us</h3>
                <div>support@mealex.in</div>
              </div>
              <div>
                <h3 className="font-bold mb-1">Follow Us</h3>
                <div className="flex gap-3 mt-1">
                  <a href="https://www.instagram.com/icompunic.in/" target="_blank"><FaInstagram size={20} /></a>
                  <a href="https://www.linkedin.com/company/compunic-pvt-ltd/posts/?feedView=all" target="_blank"><FaLinkedin size={20} /></a>
                  <a href="https://www.facebook.com/profile.php?id=61578668565768" target="_blank"><FaFacebook size={20} /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
