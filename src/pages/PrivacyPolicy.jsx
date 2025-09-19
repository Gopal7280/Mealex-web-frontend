// // src/PrivacyPolicy.jsx

// import React from 'react';

// // This is the modified, compliant Privacy Policy component for your "Coming Soon" app.
// // It clearly states that NO user data is collected by this version of the app.
// export function PrivacyPolicy() {
//   return (
//     <div className="bg-white py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-3xl mx-auto">
//         <div className="prose prose-blue text-gray-700 mx-auto">
//           {/* Main Title */}
//           <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
//             Privacy Policy
//           </h1>

//           {/* Last Updated Date */}
//           <p className="text-gray-500 text-sm mb-6">
//             Last Updated: September 3, 2025
//           </p>

//           {/* Introduction */}
//           <p className="mb-4">
//             This Privacy Policy describes the practices of <strong>Compunic Private Limited</strong> ("we", "us", "our") regarding the "MealEx (Coming Soon)" mobile application (the "App").
//           </p>
//           <p className="mb-6">
//             This policy is written in compliance with the Digital Personal Data Protection Act, 2023 (DPDP Act) of India.
//           </p>

//           {/* Section 1: Data Collection */}
//           <h2 className="text-xl font-bold text-gray-800 mt-8 mb-3">
//             1. Data Collection and Usage
//           </h2>
//           <p className="font-semibold text-gray-800">
//             This version of the App is for informational purposes only and does not collect, store, or share any personal data from its users.
//           </p>
//           <ul className="list-disc list-outside space-y-2 pl-5 mt-4">
//             <li>
//               <strong>No Account Creation:</strong> You do not need to create an account to use the App.
//             </li>
//             <li>
//               <strong>No Personal Information:</strong> We do not ask for, access, or collect any personally identifiable information such as your name, email address, phone number, or financial details through this App.
//             </li>
//             <li>
//               <strong>No Usage Data:</strong> The App does not use analytics tools to track your interaction with the App.
//             </li>
//           </ul>

//           {/* Section 2: Links */}
//           <h2 className="text-xl font-bold text-gray-800 mt-8 mb-3">
//             2. Links to Other Sites
//           </h2>
//           <p className="mb-4">
//             The App contains a link to our full-featured website,{" "}
//             <a href="https://mealex.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
//               https://mealex.in
//             </a>. If you click on this link, you will be directed to our website. Please be aware that our website is governed by its own separate Privacy Policy, which describes the data practices for the full web service. We have no control over and assume no responsibility for the content or privacy practices of our website.
//           </p>

//           {/* Section 3: Security */}
//           <h2 className="text-xl font-bold text-gray-800 mt-8 mb-3">
//             3. Data Security
//           </h2>
//           <p className="mb-4">
//             As we do not collect any personal data through this App, there is no personal data to be secured in the context of your App usage.
//           </p>

//           {/* Section 4: Changes */}
//           <h2 className="text-xl font-bold text-gray-800 mt-8 mb-3">
//             4. Changes to This Privacy Policy
//           </h2>
//           <p className="mb-4">
//             We may update our Privacy Policy in the future, especially upon the release of the full-featured version of the mealex application. We will notify you of any changes by posting the new Privacy Policy on this page.
//           </p>
          
//           {/* Section 5: Rights */}
//           <h2 className="text-xl font-bold text-gray-800 mt-8 mb-3">
//             5. Your Rights
//           </h2>
//           <p className="mb-4">
//              Under the DPDP Act, you have rights regarding your personal data. However, as this App does not collect any personal data, these rights are not applicable to your use of this specific "Coming Soon" version of the App.
//           </p>

//           {/* Section 6: Contact */}
//           <h2 className="text-xl font-bold text-gray-800 mt-8 mb-3">
//             6. Contact Us / Grievance Officer
//           </h2>
//           <p className="mb-4">
//             If you have any questions about this Privacy Policy, please contact our Grievance Officer:
//           </p>
//           <address className="not-italic bg-gray-50 p-4 rounded-lg border border-gray-200">
//             <strong>Data Privacy Team</strong>
//             <br />
//             Email:{" "}
//             <a
//               href="mailto:compuniclimited@gmail.com"
//               className="font-medium text-blue-600 no-underline hover:underline"
//             >
//               compuniclimited@gmail.com
//             </a>
//             <br />
//             Address: Compunic Private Limited, 198, Somani Nagar, 60 Ft. Airport Road Indore-452005
//           </address>
//         </div>
//       </div>
//     </div>
//   );
// }


// src/PrivacyPolicy.jsx

import React from 'react';

export function PrivacyPolicy() {
  return (
    <div className="bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="prose prose-blue text-gray-700 mx-auto">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
            Privacy Policy
          </h1>

          <p className="text-gray-500 text-sm mb-6">
            Last Updated: September 18, 2025
          </p>

          <p className="mb-4">
            This Privacy Policy describes the practices of <strong>Compunic Private Limited</strong> ("we", "us", "our") regarding the <strong>MealEX</strong> web application (the "App").
          </p>
          <p className="mb-6">
            This policy is written in compliance with the Digital Personal Data Protection Act, 2023 (DPDP Act) of India.
          </p>

          {/* Section 1: Data Collection */}
          <h2 className="text-xl font-bold text-gray-800 mt-8 mb-3">
            1. Data Collection and Usage
          </h2>
          <p className="mb-4">
            To deliver our services, we collect and process certain personal and transactional data when you interact with the App.
          </p>
          <ul className="list-disc list-outside space-y-2 pl-5 mt-4">
            <li>
              <strong>Account Information:</strong> When you sign up using Google, Facebook, or email, we collect basic profile details (such as your name, email address, and profile photo).
            </li>
            <li>
              <strong>Mess and Customer Profiles:</strong> Customers and mess owners provide additional information (such as mess name, contact details, location, and food preferences) to use the services.
            </li>
            <li>
              <strong>Plans and Payments:</strong> We collect subscription details, payment confirmations (via Razorpay or other methods), and transaction records to process plan purchases.
            </li>
            <li>
              <strong>Usage Data:</strong> We collect logs related to your plan usage, token consumption, and order activity to provide you with accurate dashboards and services.
            </li>
            <li>
              <strong>Communication Data:</strong> We use WebSockets and notifications to update you about orders, plan activations, and service changes in real time.
            </li>
          </ul>

          {/* Section 2: Links */}
          <h2 className="text-xl font-bold text-gray-800 mt-8 mb-3">
            2. Links to Other Sites
          </h2>
          <p className="mb-4">
            The App may contain links to our official website,{" "}
            <a
              href="https://mealex.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              https://mealex.in
            </a>. If you click on these links, you will be directed to our website. Please be aware that our website may have its own separate Privacy Policy. We have no control over and assume no responsibility for the content or privacy practices of those sites.
          </p>

          {/* Section 3: Security */}
          <h2 className="text-xl font-bold text-gray-800 mt-8 mb-3">
            3. Data Security
          </h2>
          <p className="mb-4">
            We implement reasonable technical and organizational measures to protect your personal data, including encrypted token-based authentication, secure payment gateways, and controlled access to sensitive data.
          </p>

          {/* Section 4: Changes */}
          <h2 className="text-xl font-bold text-gray-800 mt-8 mb-3">
            4. Changes to This Privacy Policy
          </h2>
          <p className="mb-4">
            We may update this Privacy Policy from time to time to reflect changes in our services or legal requirements. Updates will be posted on this page with a revised "Last Updated" date.
          </p>

          {/* Section 5: Rights */}
          <h2 className="text-xl font-bold text-gray-800 mt-8 mb-3">
            5. Your Rights
          </h2>
          <p className="mb-4">
            Under the DPDP Act, you have rights regarding your personal data, including the right to access, correct, and request deletion of your data. To exercise these rights, please contact us using the details below.
          </p>

          {/* Section 6: Contact */}
          <h2 className="text-xl font-bold text-gray-800 mt-8 mb-3">
            6. Contact Us / Grievance Officer 
          </h2>
          <p className="mb-4">
            If you have any questions or concerns about this Privacy Policy, please contact our Grievance Officer:
            
          </p>
          <address className="not-italic bg-gray-50 p-4 rounded-lg border border-gray-200">
            <strong>Data Privacy Team</strong>
            <br />
            Email:{" "}
            <a
              href="mailto:support@mealex.in"
              className="font-medium text-blue-600 no-underline hover:underline"
            >
              support@mealex.in
            </a>
            <br />
            Address: Compunic Private Limited, 198, Somani Nagar, 60 Ft. Airport Road Indore-452005
          </address>
        </div>
      </div>
    </div>
  );
}




