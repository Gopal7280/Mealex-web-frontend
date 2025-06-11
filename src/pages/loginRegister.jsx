import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import { apiGet, apiPost } from '../services/api';
import { setToken } from '../services/authService';
import imgLogo from '../assets/Bill365Logo.jpg';
import emailjs from '@emailjs/browser';
import { Loader } from '../layouts/Loader';
import { Skeleton } from 'primereact/skeleton';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
const PrivacyPolicy = ({ visiblePrivacy, setVisiblePrivacy }) => {
  return (
    <Dialog
      header="Privacy Policy"
      visible={visiblePrivacy}
      style={{ width: '50vw' }}
      onHide={() => {
        if (!visiblePrivacy) return;
        setVisiblePrivacy(false);
      }}
    >
      <div className="min-h-screen bg-gray-50 flex items-center justify-center mt-2 font-sans">
        <div className="">
          <p className="text-gray-500 text-xs sm:text-sm mb-8 p-2">
            Last Updated: June 7, 2025
          </p>

          <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-4">
            This Privacy Policy describes how Compunic Private Limited ("
            <span className="font-semibold">we</span>," "
            <span className="font-semibold">us</span>," or "
            <span className="font-semibold">our</span>"), operating the BILL365
            platform at{' '}
            <a
              href="https://bill365.in"
              className="text-indigo-600 hover:underline"
            >
              bill365.in
            </a>
            ("<span className="font-semibold">BILL365</span>" or the "
            <span className="font-semibold">Service</span>"), collects, uses,
            processes, stores, and discloses your personal data in compliance
            with the Digital Personal Data Protection Act, 2023 (DPDP Act) of
            India and other applicable Indian laws.
          </p>
          <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-6">
            Your privacy is paramount to us, and we are committed to protecting
            your personal data. By accessing or using BILL365, you agree to the
            collection and use of information in accordance with this policy. If
            you do not agree with the terms of this Privacy Policy, please do
            not use BILL365.
          </p>

          {/* Section 1: Definitions */}
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 mt-6">
            1. Definitions
          </h3>
          <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-4">
            For the purpose of this Privacy Policy:
          </p>
          <ul className="list-disc list-inside text-gray-700 text-xs sm:text-sm leading-relaxed mb-6 space-y-2">
            <li>
              "<span className="font-semibold">Personal Data</span>" (or "
              <span className="font-semibold">Personal Information</span>")
              means any data about an individual who is identifiable by or in
              relation to such data. This includes information that can directly
              or indirectly identify you.
            </li>
            <li>
              "
              <span className="font-semibold">
                Sensitive Personal Data or Information (SPDI)
              </span>
              " refers to personal information consisting of information
              relating to: (i) password; (ii) financial information such as bank
              account or credit card or debit card or other payment instrument
              details; (iii) physical, physiological and mental health
              condition; (iv) sexual orientation; (v) medical records and
              history; (vi) biometric information; (vii) any detail relating to
              the above clauses as provided to body corporate for providing
              service; and (viii) any of the information received under above
              clauses by body corporate for processing, stored or processed
              under lawful contract or otherwise.
            </li>
            <li>
              "<span className="font-semibold">Data Principal</span>" refers to
              the individual to whom the personal data relates. In this policy,
              "you" are the Data Principal.
            </li>
            <li>
              "<span className="font-semibold">Data Fiduciary</span>" means any
              person who alone or in conjunction with other persons determines
              the purpose and means of processing of personal data. Compunic
              Private Limited is the Data Fiduciary for BILL365.
            </li>
            <li>
              "<span className="font-semibold">Data Processor</span>" means any
              person who processes personal data on behalf of a Data Fiduciary.
            </li>
            <li>
              "<span className="font-semibold">Processing</span>" refers to any
              operation or set of operations performed on personal data, whether
              or not by automated means, such as collection, recording,
              organisation, structuring, storage, adaptation or alteration,
              retrieval, consultation, use, disclosure by transmission,
              dissemination or otherwise making available, alignment or
              combination, restriction, erasure or destruction.
            </li>
          </ul>

          {/* Section 2: Information We Collect */}
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
            2. Information We Collect
          </h3>
          <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-4">
            We collect various types of information from and about you when you
            use BILL365, including:
          </p>
          <h3 className="text-md sm:text-lg font-semibold text-gray-800 mb-2">
            2.1. Information You Provide Directly
          </h3>
          <ul className="list-disc list-inside text-gray-700 text-xs sm:text-sm leading-relaxed mb-6 space-y-2">
            <li>
              <span className="font-semibold">Account and Profile Data:</span>{' '}
              When you register for an account, we collect your name, email
              address, phone number, company name, address, GSTIN (if
              applicable), and other business-related information necessary for
              invoicing.
            </li>
            <li>
              <span className="font-semibold">
                Financial and Transaction Data:
              </span>{' '}
              Information related to your invoices, payments, expenses, bank
              account details (if you link them for transaction processing),
              credit/debit card information (processed by secure third-party
              payment gateways, not stored directly by us), and other financial
              records you input into BILL365.
            </li>
            <li>
              <span className="font-semibold">Communication Data:</span> When
              you contact us for support, send us feedback, or communicate with
              us through the platform, we collect the content of your
              communications.
            </li>
          </ul>

          <h3 className="text-md sm:text-lg font-semibold text-gray-800 mb-2">
            2.2. Information Collected Automatically
          </h3>
          <ul className="list-disc list-inside text-gray-700 text-xs sm:text-sm leading-relaxed mb-6 space-y-2">
            <li>
              <span className="font-semibold">Usage Data:</span> Information
              about how you access and use BILL365, including the pages you
              visit, features you use, time spent on the Service, and your
              interactions with our features.
            </li>
            <li>
              <span className="font-semibold">Device and Technical Data:</span>{' '}
              Your Internet Protocol (IP) address, browser type and version,
              operating system, device identifiers, and other technical
              information.
            </li>
            <li>
              <span className="font-semibold">
                Cookies and Tracking Technologies:
              </span>{' '}
              We use cookies, web beacons, and similar technologies to track
              activity on our Service and hold certain information.
              <ul className="list-circle list-inside ml-4 mt-2 space-y-1">
                <li>
                  Cookies are small data files placed on your device. You can
                  instruct your browser to refuse all cookies or to indicate
                  when a cookie is being sent. However, if you do not accept
                  cookies, you may not be able to use some portions of our
                  Service.
                </li>
                <li>
                  We use essential cookies for the operation of the Service,
                  analytical cookies to understand usage patterns, and
                  functional cookies to remember your preferences.
                </li>
              </ul>
            </li>
          </ul>

          <h3 className="text-md sm:text-lg font-semibold text-gray-800 mb-2">
            2.3. Information from Third Parties
          </h3>
          <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-6">
            We may receive information from third-party service providers (e.g.,
            payment gateways, analytics providers) in connection with your use
            of BILL365, provided you have consented to such sharing or it is
            necessary for providing the Service.
          </p>

          {/* Section 3: Purpose of Collection and Lawful Basis for Processing */}
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
            3. Purpose of Collection and Lawful Basis for Processing
          </h3>
          <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-4">
            We collect and process your personal data for the following
            specified, explicit, and legitimate purposes:
          </p>
          <ul className="list-disc list-inside text-gray-700 text-xs sm:text-sm leading-relaxed mb-6 space-y-2">
            <li>
              <span className="font-semibold">
                To Provide and Maintain the Service:
              </span>{' '}
              To operate BILL365, manage your account, provide invoicing and
              expense tracking functionalities, process payments, and ensure the
              Service is available and performs correctly. This is necessary for
              the performance of the contract with you.
            </li>
            <li>
              <span className="font-semibold">
                To Improve and Personalize the Service:
              </span>{' '}
              To understand how users interact with BILL365, fix errors, develop
              new features, and enhance user experience. This is based on our
              legitimate interests in improving our product.
            </li>
            <li>
              <span className="font-semibold">To Communicate with You:</span> To
              send you service-related notifications, updates, security alerts,
              and support messages. This is necessary for the performance of the
              contract or based on our legitimate interests in customer support.
            </li>
            <li>
              <span className="font-semibold">
                For Marketing and Promotional Purposes:
              </span>{' '}
              To send you information about new features, offers, and promotions
              that may be of interest to you, based on your consent. You can
              opt-out of marketing communications at any time.
            </li>
            <li>
              <span className="font-semibold">
                To Ensure Security and Prevent Fraud:
              </span>{' '}
              To detect, prevent, and address technical issues, security
              incidents, and fraudulent activities. This is based on our
              legitimate interests in protecting our Service and users, and for
              compliance with legal obligations.
            </li>
            <li>
              <span className="font-semibold">
                To Comply with Legal Obligations:
              </span>{' '}
              To meet our legal, regulatory, and compliance requirements under
              Indian law, including tax and financial reporting obligations.
            </li>
            <li>
              <span className="font-semibold">For Analytics and Research:</span>{' '}
              To perform data analysis, conduct research, and gather statistical
              information to understand market trends and service usage. This is
              based on your consent or our legitimate interests in business
              development.
            </li>
          </ul>
          <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-6">
            We will only process your personal data when we have a lawful basis
            to do so, primarily your explicit consent or where processing is
            necessary for the performance of a contract, compliance with a legal
            obligation, or our legitimate interests.
          </p>

          {/* Section 4: Disclosure and Sharing of Your Information */}
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
            4. Disclosure and Sharing of Your Information
          </h3>
          <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-4">
            We do not sell your personal data. We may share your information
            only in the following circumstances and for the purposes described
            below, ensuring that such sharing is compliant with applicable laws
            and that third parties maintain adequate data protection standards:
          </p>
          <ul className="list-disc list-inside text-gray-700 text-xs sm:text-sm leading-relaxed mb-6 space-y-2">
            <li>
              <span className="font-semibold">With Your Consent:</span> We may
              share your information with third parties when you give us
              explicit consent to do so.
            </li>
            <li>
              <span className="font-semibold">Service Providers:</span> We
              engage trusted third-party companies and individuals to facilitate
              our Service, provide the Service on our behalf, perform
              Service-related services, or assist us in analyzing how our
              Service is used. These third parties include:
              <ul className="list-circle list-inside ml-4 mt-2 space-y-1">
                <li>
                  Payment gateway providers (for processing transactions).
                </li>
                <li>Cloud hosting providers (for data storage).</li>
                <li>Analytics providers (for understanding user behavior).</li>
                <li>Customer support platforms.</li>
                <li>
                  They are obligated to protect your information and use it only
                  for the purposes for which they were engaged.
                </li>
              </ul>
            </li>
            <li>
              <span className="font-semibold">Affiliates:</span> We may share
              your information with our parent company, Compunic Private
              Limited, and its affiliates, who are bound by this Privacy Policy
              and adhere to similar data protection standards.
            </li>
            <li>
              <span className="font-semibold">Business Transfers:</span> In
              connection with, or during negotiations of, any merger, sale of
              company assets, financing, or acquisition of all or a portion of
              our business by another company, your personal data may be
              transferred. We will notify you before your Personal Data is
              transferred and becomes subject to a different Privacy Policy.
            </li>
            <li>
              <span className="font-semibold">
                Legal Compliance and Protection:
              </span>{' '}
              We may disclose your information if required to do so by law or in
              the good faith belief that such action is necessary to:
              <ul className="list-circle list-inside ml-4 mt-2 space-y-1">
                <li>
                  Comply with a legal obligation or respond to valid requests by
                  public authorities (e.g., a court or government agency).
                </li>
                <li>
                  Protect and defend the rights or property of Compunic Private
                  Limited.
                </li>
                <li>
                  Prevent or investigate possible wrongdoing in connection with
                  the Service.
                </li>
                <li>
                  Protect the personal safety of users of the Service or the
                  public.
                </li>
                <li>Protect against legal liability.</li>
              </ul>
            </li>
          </ul>

          {/* Section 5: Data Security */}
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
            5. Data Security
          </h3>
          <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-4">
            We implement robust security measures, including electronic and
            physical safeguards, to protect your personal data from unauthorized
            access, alteration, disclosure, or destruction. These measures
            include:
          </p>
          <ul className="list-disc list-inside text-gray-700 text-xs sm:text-sm leading-relaxed mb-6 space-y-2">
            <li>
              <span className="font-semibold">Encryption:</span> Data is
              encrypted both in transit and at rest where appropriate.
            </li>
            <li>
              <span className="font-semibold">Access Controls:</span> Strict
              access controls and authentication mechanisms are in place to
              limit access to your personal data to authorized personnel only.
            </li>
            <li>
              <span className="font-semibold">Regular Security Audits:</span> We
              regularly review and update our security practices to adapt to
              evolving threats.
            </li>
            <li>
              <span className="font-semibold">Employee Training:</span> Our
              employees are trained on data protection and privacy best
              practices.
            </li>
          </ul>
          <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-6">
            While we strive to use commercially acceptable means to protect your
            Personal Data, no method of transmission over the Internet or method
            of electronic storage is 100% secure. Therefore, we cannot guarantee
            its absolute security.
          </p>

          {/* Section 6: Data Retention */}
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
            6. Data Retention
          </h3>
          <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-6">
            We retain your personal data only for as long as necessary to
            fulfill the purposes for which it was collected, including for the
            purposes of satisfying any legal, accounting, or reporting
            requirements. When we no longer need to process your personal data
            for these purposes, we will either delete or anonymize it. If
            deletion is not possible (e.g., because your personal data has been
            stored in backup archives), we will securely store your personal
            data and isolate it from any further processing until deletion is
            possible.
          </p>

          {/* Section 7: Your Rights as a Data Principal */}
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
            7. Your Rights as a Data Principal
          </h3>
          <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-4">
            Under the Digital Personal Data Protection Act, 2023, you have the
            following rights concerning your personal data:
          </p>
          <ul className="list-disc list-inside text-gray-700 text-xs sm:text-sm leading-relaxed mb-6 space-y-2">
            <li>
              <span className="font-semibold">
                Right to Access Information:
              </span>{' '}
              You have the right to obtain information about your personal data
              being processed, including a summary of your personal data and the
              processing activities.
            </li>
            <li>
              <span className="font-semibold">
                Right to Correction and Erasure:
              </span>{' '}
              You have the right to request correction of inaccurate or
              incomplete personal data and erasure of personal data that is no
              longer necessary for the purpose for which it was collected.
            </li>
            <li>
              <span className="font-semibold">
                Right to Grievance Redressal:
              </span>{' '}
              You have the right to a readily available and effective means of
              grievance redressal in respect of any act or omission of the Data
              Fiduciary regarding your rights.
            </li>
            <li>
              <span className="font-semibold">Right to Nominate:</span> You have
              the right to nominate any individual who shall, in the event of
              your death or incapacity, exercise your rights under the DPDP Act.
            </li>
            <li>
              <span className="font-semibold">Right to Withdraw Consent:</span>{' '}
              You have the right to withdraw your consent at any time, without
              detriment. Withdrawal of consent will not affect the lawfulness of
              processing based on consent before its withdrawal.
            </li>
          </ul>
          <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-6">
            To exercise any of these rights, please contact our Grievance
            Officer using the contact details provided below. We will respond to
            your request in accordance with applicable law.
          </p>

          {/* Section 8: Children's Privacy */}
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
            8. Children's Privacy
          </h3>
          <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-4">
            BILL365 is not intended for use by individuals under the age of 18
            ("<span className="font-semibold">Children</span>"). We do not
            knowingly collect personal data from Children. If you are a parent
            or guardian and you are aware that your Children have provided us
            with Personal Data, please contact us. If we become aware that we
            have collected Personal Data from Children without verification of
            parental consent, we take steps to remove that information from our
            servers.
          </p>
          <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-6">
            We do not engage in tracking, behavioral monitoring, or targeted
            advertising directed at Children.
          </p>

          {/* Section 9: International Data Transfers */}
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
            9. International Data Transfers
          </h3>
          <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-6">
            Your information, including Personal Data, may be stored and
            processed at facilities located outside of India. We ensure that any
            such transfer complies with the DPDP Act and is only made to
            countries that have been notified by the Indian Government as having
            adequate data protection standards. We will take all steps
            reasonably necessary to ensure that your data is treated securely
            and in accordance with this Privacy Policy and no transfer of your
            Personal Data will take place to an organization or a country unless
            there are adequate controls in place including the security of your
            data and other personal information.
          </p>

          {/* Section 10: Changes to This Privacy Policy */}
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
            10. Changes to This Privacy Policy
          </h3>
          <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-4">
            We may update our Privacy Policy from time to time to reflect
            changes in our practices or applicable laws. We will notify you of
            any changes by posting the new Privacy Policy on this page and
            updating the "<span className="font-semibold">Last Updated</span>"
            date. We encourage you to review this Privacy Policy periodically
            for any changes. Your continued use of the Service after any
            modifications to this Privacy Policy will constitute your
            acknowledgment of the modifications and your consent to abide and be
            bound by the modified Privacy Policy.
          </p>

          {/* Section 11: Grievance Redressal and Contact Us */}
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
            11. Grievance Redressal and Contact Us
          </h3>
          <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-2">
            If you have any questions, concerns, or complaints regarding this
            Privacy Policy or our data practices, or if you wish to exercise
            your rights as a Data Principal, please contact our designated
            Grievance Officer:
          </p>
          <address className="not-italic text-gray-700 text-xs sm:text-sm leading-relaxed">
            <p className="mb-1">
              <span className="font-semibold">Grievance Officer:</span> Data
              Privacy Team
            </p>
            <p className="mb-1">
              Email:{' '}
              <a
                href="mailto:privacy@bill365.in"
                className="text-indigo-600 hover:underline"
              >
                privacy@bill365.in
              </a>
            </p>
            <p>
              Address: Compunic Private Limited, 198, Somani Nagar, 60 Ft.
              Airport Road Indore-452005
            </p>
          </address>
          <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mt-4">
            We will address your concerns and strive to resolve any issues in a
            timely and efficient manner as per the provisions of the DPDP Act.
          </p>
        </div>
      </div>
    </Dialog>
  );
};
const LoginRegister = ({ setAuth, setUserRoleRoutes }) => {
  const [loader, setLoader] = useState(false);
  const toast = useRef(null);
  const [formType, setFormType] = useState('login');
  const [email, setEmail] = useState('');
  const [username, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const [visiblePrivacy,setVisiblePrivacy]=useState(false);
  useEffect(() => {
    console.log(location.state);
    if (location.state == 'register') {
      setFormType('register');
    }
  }, location.state);

  // Handles the login functionality
  const handleLogin = async e => {
    e.preventDefault();
    setError('');
    try {
      setLoader(true);
      const response = await apiPost('/auth/login', { email, password });
      console.log(response.data.token);
      console.log(response.data);
      console.log('i am response');
      if (response.data.token) {
        axios.defaults.headers.common['Authorization'] =
          'Bearer ' + response.data.token;
        setToken(response.data.token);
        setAuth(true);
        if (response) {
          // Fetches the user role and sets the routes accordingly
          const fetchUserRole = async () => {
            try {
              const res = await apiGet('/user');
              console.log(res.data);
              console.log(typeof setUserRoleRoutes);
              console.log(res.data[0].employee_role);
              setUserRoleRoutes(res.data[0].employee_role);
            } catch (err) {
              console.log(err);
              setUserRoleRoutes('owner');
            }
          };
          fetchUserRole();
        }
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.message || 'Login failed. Try again!');
    } finally {
      setLoader(false);
    }
  };

  // Handles the registration functionality
  const handleRegister = async e => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    console.log(email);
    // [Warning]: the sendEmail function is used for sending a welcome email after registration, consider to extract this function as a utility function because it's used in multiple places
    const sendEmail = async () => {
      const templateParams = {
        to_name: 'Bill365', // Must match variable in your template
        email: email, // Optional, if used in your template
        message: 'Welcome to our app! Let us know if you have any questions.', // Match variable name in template
      };
      emailjs
        .send(
          'service_s4es4n8', // Replace with your actual Service ID
          'template_31jd2hh', // Replace with your actual Template ID
          templateParams,
          '-1wolPEfuWi750zxX' // Replace with your actual Public Key
        )
        .then(response => {
          console.log('SUCCESS!', response.status, response.text);
          console.log('Welcome email sent successfully!');
        })
        .catch(error => {
          console.error('FAILED...', error);
          console.log('Failed to send welcome email.');
        });
    };
    sendEmail();
    try {
      setLoader(true);
      const response = await apiPost('/auth/signUp', {
        username,
        email,
        password,
      });
      console.log(response);
      const response1 = await apiPost('/auth/login', { email, password });
      if (response1.data.token != undefined && response) {
        setToken(response1.data.token);
        axios.defaults.headers.common['Authorization'] =
          'Bearer ' + response1.data.token;
        setAuth(true);
        navigate('/dashboard');
      } else {
        console.log('no token found');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed!');
    } finally {
      setLoader(false);
    }
  };

  // Handles the forgot password functionality
  function forgotPassword(e) {
    console.log('clicked');
    const sendEmail = async () => {
      const templateParams = {
        to_name: 'Bill365', // Must match variable in your template
        email: email, // Optional, if used in your template
        message: 'Welcome to our app! Let us know if you have any questions.', // Match variable name in template
      };
      emailjs
        .send(
          'service_s4es4n8', // Replace with your actual Service ID
          'template_04c3v8a', // Replace with your actual Template ID
          templateParams,
          '-1wolPEfuWi750zxX' // Replace with your actual Public Key
        )
        .then(response => {
          console.log('SUCCESS!', response.status, response.text);
          console.log('password reset link sent successfully!');
          //Toast to show some detail
          const showSuccess = () => {
            toast.current.show({
              severity: 'success',
              summary: 'Success',
              detail: 'Please check your email a rest link is been sent',
              life: 3000,
            });
          };
          showSuccess();
        })
        .catch(error => {
          console.error('FAILED...', error);
          console.log('Failed to send welcome reset link.');
          //Toast to show some detail
          const showSuccess = () => {
            toast.current.show({
              severity: 'error',
              summary: 'Error',
              detail: 'Error sending email please try again later',
              life: 3000,
            });
          };
          showSuccess();
        });
    };
    sendEmail();
    setVisible(false);
  }

  // Opens the reset password popup
  function resetPasswordPopUp() {
    console.log('clicked');
    setVisible(true);
  }
  return (
    <>
      {loader ? (
        <div className="bg-white">
          <div className="flex-1 p-6">
            <Skeleton className="mb-4" width="100%" height="10vh"></Skeleton>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <Skeleton width="100%" height="150px"></Skeleton>
              <Skeleton width="100%" height="150px"></Skeleton>
              <Skeleton width="100%" height="150px"></Skeleton>
              <Skeleton width="100%" height="150px"></Skeleton>
            </div>

            {/* Charts */}
            <Skeleton width="100%" height="100vh"></Skeleton>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <Toast ref={toast} />
          {/* Dialog for forgot password */}
          <Dialog
            header="enter your email here"
            visible={visible}
            style={{ width: '50vw' }}
            onHide={() => {
              if (!visible) return;
              setVisible(false);
            }}
          >
            <input
              type="email"
              placeholder="Enter your Email"
              className="w-full px-4 py-2 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <button
              onClick={forgotPassword}
              style={{ borderRadius: '8px' }}
              className="w-full bg-[#3A5B76] text-white py-2  mt-4 hover:bg-[#2E4A5D] transition"
            >
              send reset link
            </button>
          </Dialog>
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            {/* <h2 className="text-center text-2xl font-semibold text-gray-700 mb-5">Bill<span className="text-green-600">●</span>365</h2> */}
            <img src={imgLogo} alt="" />
            <div className="flex bg-gray-200 p-1 rounded-full mt-6">
              <button
                className={`w-1/2 py-2 font-semibold focus:outline-none ${formType === 'login' ? 'bg-[#3A5B76] text-white' : 'bg-white text-gray-700'}`}
                style={{ borderRadius: '20px' }}
                onClick={() => setFormType('login')}
              >
                Login
              </button>
              <button
                className={`w-1/2 py-2 font-semibold focus:outline-none ${formType === 'register' ? 'bg-[#3A5B76] text-white' : 'bg-white text-gray-700'}`}
                style={{ borderRadius: '20px' }}
                onClick={() => setFormType('register')}
              >
                Register
              </button>
            </div>

            {error && <p className="text-red-500 text-center mt-2">{error}</p>}

            {formType === 'login' ? (
              <form onSubmit={handleLogin} className="mt-5">
                <label className="block text-sm font-semibold text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your Email"
                  className="w-full px-4 py-2 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-400"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <label className="block mt-3 text-sm font-semibold text-gray-600">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Enter your Password"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                  <span
                    onClick={() => {
                      const input = document.querySelector(
                        'input[type="password"]'
                      );
                      input.type =
                        input.type === 'password' ? 'text' : 'password';
                    }}
                    className="absolute right-3 top-3 cursor-pointer text-gray-500"
                  >
                    <i className="fas fa-eye"></i>
                  </span>
                </div>
                <div className="flex justify-between items-center mt-3">
                  {/* <label className="flex items-center">
                                <input type="checkbox" className="mr-1" /> Remember me
                            </label> */}
                  <button
                    type="button"
                    onClick={resetPasswordPopUp}
                    className="text-blue-500 text-sm"
                  >
                    Forgot Password?
                  </button>
                </div>
                <button
                  style={{ borderRadius: '8px' }}
                  className="w-full bg-[#3A5B76] text-white py-2  mt-4 hover:bg-[#2E4A5D] transition"
                >
                  Login
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="mt-5">
                <label className="block text-sm font-semibold text-gray-600">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Enter your User name"
                  className="w-full px-4 py-2 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-400"
                  value={username}
                  onChange={e => setName(e.target.value)}
                  required
                />
                <label className="block mt-3 text-sm font-semibold text-gray-600">
                  Email ID
                </label>
                <input
                  type="email"
                  placeholder="Enter your Email"
                  className="w-full px-4 py-2 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-400"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <label className="block mt-3 text-sm font-semibold text-gray-600">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Enter your Password"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                  <span
                    onClick={() => {
                      const input = document.querySelector(
                        'input[type="password"]'
                      );
                      input.type =
                        input.type === 'password' ? 'text' : 'password';
                    }}
                    className="absolute right-3 top-3 cursor-pointer text-gray-500"
                  >
                    <i className="fas fa-eye"></i>
                  </span>
                </div>
                <label className="block mt-3 text-sm font-semibold text-gray-600">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Confirm your Password"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                  />
                  <span
                    onClick={() => {
                      const input = document.querySelector(
                        'input[type="password"]'
                      );
                      input.type =
                        input.type === 'password' ? 'text' : 'password';
                    }}
                    className="absolute right-3 top-3 cursor-pointer text-gray-500"
                  >
                    <i className="fas fa-eye"></i>
                  </span>
                </div>
                <button
                  style={{ borderRadius: '8px' }}
                  className="w-full bg-[#3A5B76] text-white py-2 mt-4 hover:bg-[#2E4A5D] transition"
                >
                  Register
                </button>
              </form>
            )}

            <p className="text-xs text-gray-500 text-center mt-4">
              By logging in, you agree to Bill 365's{' '}
              <a onClick={(e)=>setVisiblePrivacy(true)} className="text-blue-500">
                Terms & Conditions
              </a>{' '}
              and{' '}
              <a onClick={(e)=>setVisiblePrivacy(true)} className="text-blue-500">
                Privacy Policy
              </a>
              .
              {
                visiblePrivacy && (
                  <PrivacyPolicy visiblePrivacy={visiblePrivacy} setVisiblePrivacy={setVisiblePrivacy}/>
                )
              }
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginRegister;
