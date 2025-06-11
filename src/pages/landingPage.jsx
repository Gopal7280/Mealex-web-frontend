import React, { useRef, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { IoCheckmarkCircle, IoCheckmarkCircleOutline } from 'react-icons/io5';
import {
  FaFileInvoiceDollar,
  FaCheckCircle,
  FaFileInvoice,
  FaBoxes,
  FaRupeeSign,
  FaMobileAlt,
  FaChartLine,
  FaHandshake,
  FaStar,
  FaStarHalfAlt,
  FaArrowRight,
  FaChevronDown,
  FaQrcode,
} from 'react-icons/fa';
import image from '../assets/img/image.png';
import logo3 from '../assets/img/logo3.jpg';
import featuredInvoice from '../assets/img/localhost_5173_invoices (1).png';
import featuredImgDashboard from '../assets/img/localhost_5173_invoices.png';
import featuredImgCustomer from '../assets/img/localhost_5173_display.png';
import { useFormik } from 'formik';
import { values } from 'lodash';
import { ButtonComponent } from '../components/Button';

const logoUrl = 'https://via.placeholder.com/140x40?text=Bill365+Logo';
const featuredImgUrl = 'https://via.placeholder.com/500x300?text=Feature+Image';
const heroImgUrl =
  'https://cdni.iconscout.com/illustration/premium/thumb/business-growth-chart-5208201-4350545.png';
const Header = () => {
  const navigate = useNavigate();

  const handleNavigate = path => {
    navigate(path);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-300">
      <div className="container mx-auto px-6 py-2 sm:flex justify-between items-center">
        <img src={image} alt="Logo" className="w-36 object-contain" />
        <div className=" gap-2 flex items-center">
          <button
            onClick={() => handleNavigate('/login')}
            className="border-2 border-yellow-500 bg-yellow-500 text-yellow-100 px-4 py-2 rounded hover:bg-yellow-600 hover:border-yellow-600 transition"
            type="button"
          >
            Log In
          </button>
          <button
            onClick={() => navigate('/login',{state:"register"})}
            className="border-2 border-yellow-500 text-yellow-500 px-4 py-2 rounded hover:text-yellow-600 hover:border-yellow-600 transition"
            type="button"
          >
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
};

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white">
      <section className="container bg-white mx-auto px-6 py-12 flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-1/2">
          <img
            src={
              'https://cdni.iconscout.com/illustration/premium/thumb/business-growth-chart-5208201-4350545.png'
            }
            alt="Customer List"
            className="w-full rounded-lg bg-white"
          />
        </div>
        <div className="md:w-1/2 space-y-6">
          <span className="text-5xl text-blue-900">
            Everything You Need to Bill Smarter and Grow Faster.
          </span>
          <p className="text-gray-400 text-lg mt-2">
            Gain full control over your billing operations, minimize manual
            errors, and scale confidently with features built for Indian
            businesses.
          </p>
          <button
            onClick={() => navigate('/login',{state:"register"})}
            className="bg-yellow-500 text-yellow-100 px-6 py-3 rounded hover:bg-yellow-600 transition"
            type="button"
          >
            Start Your 365 Days Trial Now
          </button>
        </div>
      </section>
    </div>
  );
};

const FeatureItem = ({ icon: Icon, title, title1 }) => (
  <div className="flex items-center space-x-3 mb-4">
    <Icon className="text-blue-600 text-xl flex-shrink-0" />
    <span className="text-5xl font-semibold text-blue-900">
      <h5>{title}</h5>
    </span>
  </div>
);

const FeatureSection = ({
  title,
  title1,
  description,
  features,
  imageLeft = true,
  imageLeft1 = true,
  imageLeft2 = true,
}) => (
  <div className="bg-white" id="features">
    <section className="container mx-auto px-6 py-12 flex flex-col md:flex-row items-center gap-10">
      {imageLeft && (
        <div className="md:w-1/2 p-16">
          <div
            className="relative flex justify-center items-center py-8 bg-center bg-contain bg-no-repeat"
            style={{
              backgroundImage: `url('/src/assets/img/img-wraper-bg.png')`,
            }}
          >
            <img
              src={featuredInvoice}
              alt="Feature Visual"
              className="rounded-lg shadow-lg object-contain"
            />
          </div>
        </div>
      )}
      {imageLeft2 && (
        <div className="md:w-1/2 p-16">
          <div
            className="relative flex justify-center items-center py-8 bg-center bg-contain bg-no-repeat"
            style={{
              backgroundImage: `url('/src/assets/img/img-wraper-bg.png')`,
            }}
          >
            <img
              src={featuredImgDashboard}
              alt="Feature Visual"
              className="rounded-lg shadow-lg object-contain"
            />
          </div>
        </div>
      )}

      <div className="md:w-1/2 space-y-6">
        <span className="text-3xl font-bold text-blue-900">
          <h2>{title}</h2>
        </span>
        <span className="text-3xl font-bold text-blue-900">
          <h2>{title1}</h2>
        </span>
        <p className="text-gray-400 text-lg">{description}</p>
        <div>
          {features.map(({ icon, title }, idx) => (
            <FeatureItem key={idx} icon={icon} title={title} title1={title1} />
          ))}
        </div>
      </div>

      {imageLeft1 && (
        <div className="md:w-1/2 p-16">
          <div
            className="relative flex justify-center items-center py-8 bg-center bg-contain bg-no-repeat"
            style={{
              backgroundImage: `url('/src/assets/img/img-wraper-bg.png')`,
            }}
          >
            <img
              src={featuredImgCustomer}
              alt="Feature Visual"
              className="rounded-lg shadow-lg object-contain"
            />
          </div>
        </div>
      )}
    </section>
  </div>
);

const FAQItem = ({ question, answer }) => (
  <div className="mt-2 pb-4">
    <span className="text-xl font-semibold text-blue-900">
      <h3>{question}</h3>
    </span>
    <p className="text-gray-400">{answer}</p>
  </div>
);

const FAQSection = () => {
  const faqs = [
    {
      question: 'What is Bill365?',
      answer:
        'Bill365 is a simple GST billing and invoicing software designed to help businesses create professional invoices, manage payments, and track expenses easily.',
    },
    {
      question: 'Is Bill365 free to use?',
      answer:
        'Yes, Bill365 offers a free plan with essential features. You can also upgrade to premium plans for additional tools like advanced reports, inventory management, and team access.',
    },
    {
      question: 'Who can use Bill365?',
      answer:
        'Bill365 is perfect for small businesses, freelancers, retailers, service providers, and anyone who needs easy invoicing, expense tracking, and GST filing support.',
    },
    {
      question: 'Do I need to install any software?',
      answer:
        'No installation needed. Bill365 is a cloud-based platform — you can access it through your web browser anytime, anywhere.',
    },
    {
      question: 'Can I customize my invoices?',
      answer:
        'Absolutely. Bill365 allows you to customize invoice templates with your company logo, terms, conditions, and personalized notes.',
    },
    {
      question: 'Is my data secure with Bill365?',
      answer:
        '100%. We use industry-standard encryption and security practices to keep your business data safe and private at all times.',
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept major credit cards, debit cards, UPI, and net banking for payments in India.',
    },
    {
      question: 'How do I get support if needed?',
      answer:
        'You can easily reach out through our in-app chat support, email us, or explore detailed help articles and video tutorials from our support center.',
    },
  ];

  return (
    <div className="bg-white border-b border-gray-300" id="faq">
      <section className="bg-white py-12">
        <div className="container mx-auto px-6">
          <span className="font-bold text-blue-900 text-center">
            <h2>Frequently Asked Questions</h2>
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {faqs.map(({ question, answer }, idx) => (
              <FAQItem key={idx} question={question} answer={answer} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const RefundAndCancellation = ({ visibleRefund, setVisibleRefund }) => {
  return (
    <>
      <Dialog
        header="Refund and Cancellation Policy"
        visible={visibleRefund}
        style={{ width: '50vw' }}
        onHide={() => {
          if (!visibleRefund) return;
          setVisibleRefund(false);
        }}
      >
        <div className="min-h-screen bg-gray-50 flex items-center justify-center mt-2 font-sans">
          <div className="p-2">
            <p className="text-gray-500 text-xs sm:text-sm mb-8">
              Last Updated: June 7, 2025
            </p>

            <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-4">
              This Refund and Cancellation Policy ("
              <span className="font-semibold">Policy</span>") governs the terms
              under which users may cancel their subscriptions to the BILL365
              platform and the conditions for any potential refunds. This Policy
              is an integral part of our Terms and Conditions of Use and Privacy
              Policy. By subscribing to or using BILL365, you agree to this
              Policy.
            </p>
            <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-6">
              BILL365 is provided by Compunic Private Limited ("
              <span className="font-semibold">we</span>," "
              <span className="font-semibold">us</span>," or "
              <span className="font-semibold">our</span>"), located at{' '}
              <a
                href="https://bill365.in"
                className="text-indigo-600 hover:underline"
              >
                bill365.in
              </a>{' '}
              ("<span className="font-semibold">BILL365</span>" or the "
              <span className="font-semibold">Service</span>").
            </p>

            {/* Section 1: Introduction and Purpose */}
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 mt-6">
              1. Introduction and Purpose
            </h3>
            <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-6">
              This Policy outlines the guidelines for cancellation of paid
              subscriptions to BILL365 and clarifies our stance on refunds for
              services rendered. We aim to provide clear and transparent terms
              for our users.
            </p>

            {/* Section 2: Scope */}
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
              2. Scope
            </h3>
            <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-6">
              This Policy applies to all paid subscription plans offered by
              BILL365. For details regarding the free tier, please refer to our
              Terms and Conditions of Use.
            </p>

            {/* Section 3: Cancellation by User */}
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
              3. Cancellation by User
            </h3>
            <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-4">
              You may cancel your paid subscription to BILL365 at any time.
            </p>
            <ul className="list-disc list-inside text-gray-700 text-xs sm:text-sm leading-relaxed mb-6 space-y-2">
              <li>
                <span className="font-semibold">How to Cancel:</span> You can
                cancel your subscription by logging into your BILL365 account
                and navigating to your Account Settings or Subscription
                Management section. Follow the prompts to initiate the
                cancellation process. If you encounter any difficulties, please
                contact our support team.
              </li>
              <li>
                <span className="font-semibold">
                  Effective Date of Cancellation:
                </span>{' '}
                Your subscription will remain active until the end of your
                current billing cycle (e.g., month or year for which you have
                already paid). No further charges will be applied from the next
                billing cycle onwards. You will continue to have access to the
                paid features of BILL365 until the end of the current billing
                period.
              </li>
            </ul>

            {/* Section 4: Refund Eligibility */}
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
              4. Refund Eligibility
            </h3>
            <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-4">
              Please note that all amounts paid for the subscription of BILL365
              as an application are strictly non-refundable.
            </p>
            <ul className="list-disc list-inside text-gray-700 text-xs sm:text-sm leading-relaxed mb-6 space-y-2">
              <li>
                <span className="font-semibold">
                  No Refunds for Service Rendered:
                </span>{' '}
                Given the nature of our digital service, which provides
                immediate access to features upon subscription, we do not offer
                refunds for any partial or unused subscription periods, whether
                you cancel mid-cycle or do not fully utilize the service.
              </li>
              <li>
                <span className="font-semibold">No Pro-rata Refunds:</span> We
                do not provide pro-rata refunds for cancellations made before
                the end of a billing period.
              </li>
              <li>
                <span className="font-semibold">Exceptions (Rare):</span>{' '}
                Refunds will only be considered in extremely rare circumstances,
                such as:
                <ul className="list-circle list-inside ml-4 mt-2 space-y-1">
                  <li>Duplicate charges due to a system error on our part.</li>
                  <li>
                    As explicitly required by Indian law where this non-refund
                    policy may not apply (e.g., proven service unavailability
                    for an extended, unreasonable period due to our fault).
                  </li>
                  <li>
                    Any such exceptions will be determined solely at our
                    discretion and on a case-by-case basis.
                  </li>
                </ul>
              </li>
            </ul>

            {/* Section 5: Cancellation by Compunic Private Limited */}
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
              5. Cancellation by Compunic Private Limited
            </h3>
            <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-6">
              We reserve the right to suspend or terminate your access to
              BILL365 immediately, without prior notice or liability, in
              accordance with our Terms and Conditions of Use. This may occur,
              for example, if you breach these Terms or for reasons related to
              service integrity or security. In such cases, no refund will be
              provided for any unused portion of your subscription.
            </p>

            {/* Section 6: Process for Cancellation/Refund Request */}
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
              6. Process for Cancellation/Refund Request
            </h3>
            <ul className="list-disc list-inside text-gray-700 text-xs sm:text-sm leading-relaxed mb-6 space-y-2">
              <li>
                <span className="font-semibold">Cancellation:</span> As
                mentioned in Section 3, you can cancel your subscription
                directly through your account settings.
              </li>
              <li>
                <span className="font-semibold">
                  Refund Request (for eligible exceptions only):
                </span>{' '}
                If you believe you qualify for a refund under the rare
                exceptions mentioned in Section 4, you must submit a written
                refund request to our Grievance Officer within seven (7) days of
                the eligible event or transaction. Your request must include:
                <ul className="list-circle list-inside ml-4 mt-2 space-y-1">
                  <li>Your full name and registered email address.</li>
                  <li>Your BILL365 account ID.</li>
                  <li>Details of the subscription payment.</li>
                  <li>
                    A clear explanation of why you believe you are eligible for
                    a refund, including any relevant dates or circumstances.
                  </li>
                </ul>
              </li>
            </ul>
            <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-6">
              We will review your request and communicate our decision within a
              reasonable timeframe.
            </p>

            {/* Section 7: Changes to This Policy */}
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
              7. Changes to This Policy
            </h3>
            <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-4">
              We reserve the right to modify or replace this Refund and
              Cancellation Policy at any time. We will notify you of any changes
              by posting the updated Policy on this page and updating the "
              <span className="font-semibold">Last Updated</span>" date.
            </p>
            <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-6">
              Your continued use of the Service after any modifications to this
              Policy will constitute your acknowledgment of the modifications
              and your consent to abide and be bound by the modified Policy.
            </p>

            {/* Section 8: Contact Us */}
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
              8. Contact Us
            </h3>
            <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-2">
              If you have any questions about this Refund and Cancellation
              Policy, or if you wish to submit a refund request, please contact
              our Grievance Officer:
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
          </div>
        </div>
      </Dialog>
    </>
  );
};
const AboutUs= ()=>{
  return(
    <div className='w-10/12 m-auto' id="about">
    <div className='flex justify-center'>
    <section class="bg-white text-gray-400 p-8 rounded-lg mb-12 transform hover:scale-102 transition-transform duration-300">
            <h2 class="text-3xl md:text-4xl font-bold !text-blue-900 mb-6 text-center ">About Us</h2>
            <p class="text-lg leading-relaxed mb-4 text-justify">
                Compunic Private Limited embarked on its journey in June 2022, initially focusing on providing robust hardware and network solutions. With a strong foundation in IT infrastructure and a team of seasoned professionals, we quickly identified a significant need in the market for high-quality, cost-effective software development services, particularly in areas that streamline business operations.
            </p>
            <p class="text-lg leading-relaxed text-justify">
                Leveraging our deep expertise in information technology and a profound understanding of business processes, we ventured into software solutions. <strong class="text-blue-800">BILL365</strong> emerged as a testament to this evolution – a product meticulously crafted to address the universal pain points of invoicing, payment collection, and expense tracking. We are proud to have grown at a tremendous pace, bringing together young, qualified business graduates and engineers from renowned universities to build impactful solutions for various sectors, including Government, Banking, MNCs, Large Corporates, Telecom, and Media.
            </p>
        </section>
        </div>
        </div>
  )
}
const ContactUs=()=>{
   const toast = useRef(null);
  const [addCategory, setAddCategory] = useState(''); // State to manage the new category name
  const [businessCategory, setBusinessCategory] = useState(''); // State to manage the new category name
  const [visible,setVisible]=useState(false);
  const formik=useFormik({
    initialValues:{
      userName:"",
      email:"",
      phoneNumber:"",
      businessType:"",
    },
    onSubmit:(values)=>{
      values.businessType=businessCategory;
      console.log(values);
       const showSuccess = () => {
        toast.current.show({severity:'success', summary: 'Success', detail:'Our Executive will Connect You', life: 3000});
    }
    showSuccess();
    }
  });
  function handleProductCategoryAdd(e) {
    const newCategory = document.getElementById('newCategory').value;
    // formik.values.product_category=newCategory;
    setAddCategory(newCategory);
    setBusinessCategory(newCategory);
    // console.log(formik.values.product_category);
    setVisible(false);
  }
  function handleCategoryChange(e) {
    setAddCategory('');
    if (e.target.value == 'other') {
      setVisible(true);
      return;
    }
    console.log(e.target.value);
    setBusinessCategory(e.target.value);
  }
  return(
    // <section id="contactUS" className=" bg-white">
    //   <Toast ref={toast} />
    //   <Dialog
    //               header="Add Category"
    //               visible={visible}
    //               onHide={() => {
    //                 if (!visible) return;
    //                 setVisible(false);
    //               }}
    //               style={{ width: '50vw' }}
    //               breakpoints={{ '960px': '75vw', '641px': '100vw' }}
    //             >
    //               <dl>
    //                 <dt className="mb-2 mt-2">Category Name</dt>
    //                 <dd>
    //                   <input
    //                     id="newCategory"
    //                     type="text"
    //                     className="p-[0.76rem] w-full border-1 border-[#d1d5db] rounded-[6px]"
    //                     placeholder="Enter Product category"
    //                   />
    //                 </dd>
    //               </dl>
    //               <ButtonComponent
    //                 onClick={e => handleProductCategoryAdd(e)}
    //                 label="Add"
    //                 type="submit"
    //                 className="bg-[#3A5B76] text-white px-8 py-2 rounded hover:bg-[#2E4A63]"
    //               ></ButtonComponent>
    //             </Dialog>
    //     <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    //       <h3 className="text-3xl font-bold mb-6 text-center">Contact Us</h3>
    //       <p className="text-xl text-gray-600 mb-8 text-center">Schedule a personalized demo with our product expert</p>
    //       <div className="bg-white rounded-xl shadow-md p-8 max-w-2xl mx-auto">
    //         <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    //           <div>
    //             <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 text-left">Your Name</label>
    //             <input onChange={formik.handleChange} name="userName" type="text" id="name" placeholder='enter your name' className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" />
    //           </div>
    //           <div>
    //             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 text-left">Email Address</label>
    //             <input onChange={formik.handleChange} type="email" name="email" id="email" placeholder='enter your email' className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" />
    //           </div>
    //           <div>
    //             <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1 text-left">Phone Number</label>
    //             <input onChange={formik.handleChange} type="tel" id="phone" name="phoneNumber" placeholder='enter your phone no' className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring -primary focus:border-primary" />
    //           </div>
    //           <div>
    //             <label htmlFor="business" className="block text-sm font-medium text-gray-700 mb-1 text-left">Business Type</label>
    //             <select onChange={handleCategoryChange} id="business" name="nusinessType" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary">
    //               <option value="retail">Retail</option>
    //               <option value="wholesale">Wholesale</option>
    //               <option value="manufacturing">Manufacturing</option>
    //               <option value="services">Services</option>
    //               <option
    //                       value="other"
    //                       className="bg-[#3A5B76] text-white"
    //                     >
    //                       {addCategory == '' ? 'add category' : addCategory}
    //                     </option>
    //             </select>
    //           </div>
    //           <div className="sm:col-span-2">
    //             <button type="submit" className="w-full bg-yellow-500 text-white font-medium py-3 hover:bg-secondary transition !rounded-lg">Schedule Demo</button>
    //           </div>
    //         </form>
    //       </div>
    //     </div>
    //   </section>
    <>
    <div id="contactUS" className='py-16 bg-white flex justify-center'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <h2 className='sm:text-center'>Contact Us</h2>
      <h6 className='sm:text-center  !text-gray-400'>If you have any questions about this Refund and Cancellation Policy, <br></br> or if you wish to submit a refund request, please contact our Grievance Officer:</h6>
      {/* If you have any questions about this Refund and Cancellation Policy, or if you wish to submit a refund request, please contact our Grievance Officer: */}
      <p className='sm:ml-14'>Grievance Officer: <br></br>
Data Privacy Team
<br></br>
Email:{' '}
<a href="mailTo: privacy@bill365.in">privacy@bill365.in</a>
<br />
Address: Compunic Private Limited, 198, Somani Nagar, 60 Ft. Airport Road Indore-452005</p>
</div>
</div>
    </>
  )
}
const Footer = () => {
  const [visible, setVisible] = useState(false);
  const [visiblePrivacy, setVisiblePrivacy] = useState(false);
  const [visibleRefund, setVisibleRefund] = useState(false);
  const navigate = useNavigate();
  return (
    <footer className="bg-white border-t border-gray-200 py-8 ">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-8 md:space-y-0">
          <div>
            <img
              src={image}
              alt="Bill365 Logo"
              className="w-36 object-contain"
            />
            <h6>
              198, Somani Nagar, 60 Ft. <br /> Airport Road Indore-452005
            </h6>
          </div>

          <div className="flex flex-col sm:flex-row gap-12 text-blue-900 text-sm">
            <div>
              <h4 className="font-semibold mb-3">Product</h4>
              <p className="space-y-1 items-start md:items-center text-blue-900">
                <p>
                  <a
                    href="#features"
                    className="text-blue-900 hover:text-blue-200 "
                  >
                    Features
                  </a>
                </p>
                <p>
                  <a href="#pricing" className="hover:text-blue-900">
                    Pricing
                  </a>
                </p>
                <p>
                  <a href="#faq" className="hover:text-blue-900">
                    FAQs
                  </a>
                </p>
                <p>
                  <a
                    onClick={() => navigate('/login', { state: 'register' })}
                    className="hover:text-blue-900 cursor-pointer"
                  >
                    Get Started
                  </a>
                </p>
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <p className="space-y-1">
                <p>
                  <a
                    href="#about"
                    className="text-blue-900 hover:text-blue-600"
                  >
                    About Us
                  </a>
                </p>
                <p>
                  <a
                    onClick={e => setVisible(true)}
                    className="hover:text-blue-600 cursor-pointer"
                  >
                    Terms & Conditions
                  </a>
                  {visible && (
                    <TermsAndCondition
                      visible={visible}
                      setVisible={setVisible}
                    />
                  )}
                </p>
                <p>
                  <a
                    onClick={e => setVisiblePrivacy(true)}
                    className="hover:text-blue-600 cursor-pointer"
                  >
                    Privacy Policy
                  </a>
                  {visiblePrivacy && (
                    <PrivacyPolicy
                      visiblePrivacy={visiblePrivacy}
                      setVisiblePrivacy={setVisiblePrivacy}
                    />
                  )}
                </p>
                <p>
                  <a
                    onClick={e => setVisibleRefund(true)}
                    className="hover:text-blue-600 cursor-pointer"
                  >
                    Refund and Cancellation
                  </a>
                  {visibleRefund && (
                    <RefundAndCancellation
                      visibleRefund={visibleRefund}
                      setVisibleRefund={setVisibleRefund}
                    />
                  )}
                </p>
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <p className="space-y-1">
                <p>
                  <a href="#contactUS" className="hover:text-blue-600">
                    Contact Us
                  </a>
                </p>
                <p>
                  <a href="#" className="hover:text-blue-600">
                    Help Center
                  </a>
                </p>
                <p>
                  <a href="#" className="hover:text-blue-600">
                    Video Tutorials
                  </a>
                </p>
                <p>
                  <a
                    href="mailto:support@bill365.app"
                    className="hover:text-blue-600"
                  >
                    Email Support
                  </a>
                </p>
              </p>
            </div>
          </div>
        </div>
        <p className="text-center text-gray-400 mt-8 text-sm">
          &copy; 2025 Bill365. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

const Pricing = () => {
  const navigate = useNavigate();
  return (
    <section id="pricing" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            No hidden fees. Cancel anytime. 14-day free trial with all features.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Basic Plan */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <h4 className="font-semibold text-lg mb-1">Freemium</h4>
              <p className="text-gray-600 text-sm mb-4">
                For small businesses and startups
              </p>
              <div className="mb-6">
                <span className="text-4xl font-bold">₹0.00</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 text-sm text-gray-600 mb-8">
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                  <span>20 invoices/month</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                  <span>Inventory management</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                  <span>Basic reports</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                  <span>Email support</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <FaCheckCircle className="text-gray-400 mt-1 mr-2" />
                  <span>No e-invoicing</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <FaCheckCircle className="text-gray-400 mt-1 mr-2" />
                  <span>No GSTR reports</span>
                </li>
              </ul>

              <a
                onClick={e => navigate('/login', { state: 'register' })}
                className="block w-full bg-yellow-400 text-black text-center font-medium py-3 rounded-lg hover:bg-gray-300 transition"
              >
                Start Free Trial
              </a>
            </div>
          </div>

          {/* Pro Plan (Featured) */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-primary relative">
            <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 transform translate-x-2 -translate-y-2 rotate-12">
              MOST POPULAR
            </div>
            <div className="p-6">
              <h4 className="font-semibold text-lg mb-1">Professional</h4>
              <p className="text-gray-600 text-sm mb-4">
                For growing businesses
              </p>
              <div className="mb-6">
                <span className="text-4xl font-bold">₹99</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 text-sm text-gray-600 mb-8">
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                  <span>Unlimited GST invoices</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                  <span>Advanced inventory</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                  <span>E-in voicing (10/month)</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                  <span>GSTR-1, 3B reports</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                  <span>Priority email support</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <FaCheckCircle className="text-gray-400 mt-1 mr-2" />
                  <span>No GSTR-9</span>
                </li>
              </ul>
              <a
                onClick={e => navigate('/login', { state: 'register' })}
                className="block w-full bg-primary text-white text-center font-medium py-3 rounded-lg hover:bg-secondary transition"
              >
                Start Free Trial
              </a>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <h4 className="font-semibold text-lg mb-1">Enterprise</h4>
              <p className="text-gray-600 text-sm mb-4">
                For large businesses & corporations
              </p>
              <div className="mb-6">
                <span className="text-4xl font-bold">₹199</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 text-sm text-gray-600 mb-8">
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                  <span>Unlimited everything</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                  <span>Unlimited e-invoicing</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                  <span>All GSTR reports</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                  <span>Multi-user access</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                  <span>Dedicated account manager</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                  <span>24/7 phone support</span>
                </li>
              </ul>
              <a
                onClick={e => navigate('/login', { state: 'register' })}
                className="block w-full bg-yellow-400 text-black text-center font-medium py-3 rounded-lg hover:bg-gray-300 transition"
              >
                Start Free Trial
              </a>
            </div>
          </div>
        </div>

        {/* <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Looking for annual billing? Save up to 20%
            </p>
            <a href="#" className="text-primary font-medium hover:underline">
              Compare all plans →
            </a>
          </div> */}
      </div>
    </section>
  );
};
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
const TermsAndCondition = ({ visible, setVisible }) => {
  return (
    <Dialog
      header="Terms and Conditions of Use for bill365.in"
      className=""
      visible={visible}
      style={{ width: '60vw' }}
      onHide={() => {
        if (!visible) return;
        setVisible(false);
      }}
    >
      <div className="min-h-screen p-2 bg-gray-50 flex items-center justify-center mt-2 font-sans">
        <div className="">
          <p className="text-gray-500 text-xs sm:text-sm mb-8">
            Last Updated: June 7, 2025
          </p>
          <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-4">
            These Terms and Conditions of Use ("
            <span className="font-semibold">Terms</span>") govern your access to
            and use of the BILL365 platform and services provided by Compunic
            Private Limited ("<span className="font-semibold">we</span>," "
            <span className="font-semibold">us</span>," or "
            <span className="font-semibold">our</span>"), located at
            <a
              href="https://bill365.in"
              className="text-indigo-600 hover:underline"
            >
              {' '}
              bill365.in
            </a>{' '}
            ("<span className="font-semibold">BILL365</span>" or the "
            <span className="font-semibold">Service</span>").
          </p>
          <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-6">
            By accessing or using BILL365, you signify that you have read,
            understood, and agree to be bound by these Terms, as well as our
            Privacy Policy. If you do not agree with these Terms, you must not
            use BILL365.
          </p>

          {/* Section 1: Definitions */}
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 mt-6">
            1. Definitions
          </h3>
          <ul className="list-disc list-inside text-gray-700 text-xs sm:text-sm leading-relaxed mb-6 space-y-2">
            <li>
              "<span className="font-semibold">Service</span>" or "
              <span className="font-semibold">BILL365</span>" refers to the
              online invoicing, expense tracking, and financial management
              platform provided by Compunic Private Limited through the website{' '}
              <a
                href="https://bill365.in"
                className="text-indigo-600 hover:underline"
              >
                bill365.in
              </a>
              .
            </li>
            <li>
              "<span className="font-semibold">User</span>", "
              <span className="font-semibold">You</span>", "
              <span className="font-semibold">Your</span>" refers to any
              individual or entity accessing or using the Service.
            </li>
            <li>
              "<span className="font-semibold">Account</span>" refers to the
              registered user account on BILL365.
            </li>
            <li>
              "<span className="font-semibold">Content</span>" refers to all
              information, data, text, software, music, sound, photographs,
              graphics, video, messages, or other materials generated, provided,
              or made otherwise accessible on or through the Service.
            </li>
            <li>
              "<span className="font-semibold">User Content</span>" refers to
              any Content uploaded, submitted, or otherwise transmitted by You
              through the Service, including but not limited to invoice details,
              customer information, expense records, and other financial data.
            </li>
            <li>
              "
              <span className="font-semibold">
                Intellectual Property Rights
              </span>
              " means copyrights, patents, trademarks, trade secrets, and any
              other proprietary rights protected under the laws of India or any
              other jurisdiction.
            </li>
          </ul>

          {/* Section 2: Eligibility */}
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
            2. Eligibility
          </h3>
          <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-4">
            To use BILL365, you must:
          </p>
          <ul className="list-disc list-inside text-gray-700 text-xs sm:text-sm leading-relaxed mb-6 space-y-2">
            <li>
              Be at least 18 years of age and have the legal capacity to enter
              into a binding contract.
            </li>
            <li>Agree to these Terms.</li>
            <li>
              Provide true, accurate, and complete information during
              registration and throughout your use of the Service.
            </li>
          </ul>
          <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-6">
            If you are using the Service on behalf of a company or other legal
            entity, you represent that you have the authority to bind such
            entity to these Terms.
          </p>

          {/* Section 3: Account Registration and Security */}
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
            3. Account Registration and Security
          </h3>
          <ul className="list-disc list-inside text-gray-700 text-xs sm:text-sm leading-relaxed mb-6 space-y-2">
            <li>
              <span className="font-semibold">Account Creation:</span> To access
              certain features of the Service, you must register for an Account
              by providing your email address, creating a password, and
              providing accurate business information.
            </li>
            <li>
              <span className="font-semibold">Account Responsibility:</span> You
              are solely responsible for maintaining the confidentiality of your
              Account login information (username and password) and for all
              activities that occur under your Account, whether or not you have
              authorized such activities.
            </li>
            <li>
              <span className="font-semibold">
                Notification of Unauthorized Use:
              </span>{' '}
              You must immediately notify us of any unauthorized use of your
              Account or any other breach of security.
            </li>
            <li>
              <span className="font-semibold">Data Accuracy:</span> You agree to
              keep your Account information accurate, complete, and current at
              all times. Failure to do so may result in the suspension or
              termination of your Account.
            </li>
            <li>
              <span className="font-semibold">No Sharing:</span> You may not
              share your Account credentials with any third party.
            </li>
          </ul>

          {/* Section 4: Use of the Service */}
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
            4. Use of the Service
          </h3>
          <ul className="list-disc list-inside text-gray-700 text-xs sm:text-sm leading-relaxed mb-6 space-y-2">
            <li>
              <span className="font-semibold">Permitted Use:</span> You may use
              BILL365 solely for your internal business purposes related to
              invoicing, expense tracking, and financial management.
            </li>
            <li>
              <span className="font-semibold">Prohibited Conduct:</span> You
              agree not to:
              <ul className="list-circle list-inside ml-4 mt-2 space-y-1">
                <li>
                  Use the Service for any illegal, unauthorized, or unlawful
                  purpose.
                </li>
                <li>
                  Impersonate any person or entity, or falsely state or
                  otherwise misrepresent your affiliation with a person or
                  entity.
                </li>
                <li>
                  Upload, post, transmit, or otherwise make available any
                  Content that is harmful, threatening, abusive, harassing,
                  tortious, defamatory, vulgar, obscene, libellous, invasive of
                  another's privacy, hateful, or racially, ethnically, or
                  otherwise objectionable.
                </li>
                <li>
                  Upload or transmit any viruses, malware, or other malicious
                  code.
                </li>
                <li>
                  Attempt to gain unauthorized access to any portion or feature
                  of the Service, or any other systems or networks connected to
                  the Service.
                </li>
                <li>
                  Interfere with or disrupt the integrity or performance of the
                  Service or the data contained therein.
                </li>
                <li>
                  Engage in any activity that could damage, disable, overburden,
                  or impair any of our servers or the networks connected to any
                  of our servers.
                </li>
                <li>
                  Use any robot, spider, scraper, or other automated means to
                  access the Service for any purpose without our express written
                  permission.
                </li>
                <li>
                  Reproduce, duplicate, copy, sell, resell, or exploit any
                  portion of the Service, use of the Service, or access to the
                  Service without our express written permission.
                </li>
              </ul>
            </li>
          </ul>

          {/* Section 5: Subscription, Fees, and Payments */}
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
            5. Subscription, Fees, and Payments
          </h3>
          <ul className="list-disc list-inside text-gray-700 text-xs sm:text-sm leading-relaxed mb-6 space-y-2">
            <li>
              <span className="font-semibold">Freemium Model:</span> BILL365
              offers a freemium model, allowing access to basic features for
              free. Advanced features may require a paid subscription.
            </li>
            <li>
              <span className="font-semibold">Subscription Plans:</span> Details
              regarding subscription plans, pricing, features included, and
              billing cycles (e.g., monthly, annually) are available on our
              website. We reserve the right to change our subscription plans and
              pricing at any time. Any changes will be communicated to you in
              advance.
            </li>
            <li>
              <span className="font-semibold">Payment:</span> All fees are
              payable in advance according to the chosen billing cycle. Payments
              will be processed through secure third-party payment gateways. You
              agree to provide valid and current payment information.
            </li>
            <li>
              <span className="font-semibold">Automatic Renewal:</span> Unless
              otherwise specified, subscriptions may automatically renew at the
              end of each billing cycle. You can manage your subscription and
              turn off auto-renewal through your Account settings.
            </li>
            <li>
              <span className="font-semibold">Refunds:</span> All amounts paid
              for the subscription of BILL365 are strictly non-refundable. Our
              refund policy will be clearly stated on our website. Generally,
              fees paid are non-refundable, especially for services rendered,
              unless explicitly stated otherwise or required by law.
            </li>
            <li>
              <span className="font-semibold">Taxes:</span> All fees are
              exclusive of applicable taxes, levies, cesses, and duties, which
              shall be borne by you as per prevailing Indian laws.
            </li>
          </ul>

          {/* Section 6: Intellectual Property Rights */}
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
            6. Intellectual Property Rights
          </h3>
          <ul className="list-disc list-inside text-gray-700 text-xs sm:text-sm leading-relaxed mb-6 space-y-2">
            <li>
              <span className="font-semibold">Our Intellectual Property:</span>{' '}
              All Intellectual Property Rights in and to BILL365, including its
              software, design, features, functionality, trademarks, logos, and
              Content (excluding User Content), are and will remain the
              exclusive property of Compunic Private Limited and its licensors.
            </li>
            <li>
              <span className="font-semibold">License to Use:</span> We grant
              you a limited, non-exclusive, non-transferable, revocable license
              to use the Service solely for your internal business purposes in
              accordance with these Terms.
            </li>
            <li>
              <span className="font-semibold">User Content Ownership:</span> You
              retain all ownership rights to your User Content. By submitting
              User Content, you grant us a worldwide, non-exclusive,
              royalty-free, transferable license to use, reproduce, distribute,
              prepare derivative works of, display, and perform your User
              Content solely for the purpose of operating, improving, and
              providing the Service to you.
            </li>
          </ul>

          {/* Section 7: User Content */}
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
            7. User Content
          </h3>
          <ul className="list-disc list-inside text-gray-700 text-xs sm:text-sm leading-relaxed mb-6 space-y-2">
            <li>
              <span className="font-semibold">
                Responsibility for User Content:
              </span>{' '}
              You are solely responsible for the accuracy, legality,
              reliability, and appropriateness of your User Content. You
              represent and warrant that you have all necessary rights to your
              User Content and that it does not infringe upon the rights of any
              third party.
            </li>
            <li>
              <span className="font-semibold">Prohibited User Content:</span>{' '}
              You agree not to upload, store, or process any User Content that:
              <ul className="list-circle list-inside ml-4 mt-2 space-y-1">
                <li>Is illegal, harmful, or promotes illegal activities.</li>
                <li>
                  Infringes upon the Intellectual Property Rights or privacy
                  rights of others.
                </li>
                <li>Contains viruses or any other harmful code.</li>
              </ul>
            </li>
            <li>
              <span className="font-semibold">Data Deletion:</span> Upon
              termination of your Account or as required by law, we will follow
              our data retention policy for the deletion of your User Content.
            </li>
          </ul>

          {/* Section 8: Disclaimers of Warranties */}
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
            8. Disclaimers of Warranties
          </h3>
          <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-4">
            <span className="font-semibold">
              THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS,
              WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO
              THE FULLEST EXTENT PERMISSIBLE PURSUANT TO APPLICABLE INDIAN LAW,
              COMPUNIC PRIVATE LIMITED DISCLAIMS ALL WARRANTIES, EXPRESS OR
              IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
              NON-INFRINGEMENT, AND ACCURACY.
            </span>
          </p>
          <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-6">
            <span className="font-semibold">
              WE DO NOT WARRANT THAT: (I) THE SERVICE WILL FUNCTION
              UNINTERRUPTED, SECURELY, OR BE AVAILABLE AT ANY PARTICULAR TIME OR
              LOCATION; (II) ANY ERRORS OR DEFECTS WILL BE CORRECTED; (III) THE
              SERVICE IS FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS; OR (IV)
              THE RESULTS OF USING THE SERVICE WILL MEET YOUR REQUIREMENTS.
            </span>
          </p>

          {/* Section 9: Limitation of Liability */}
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
            9. Limitation of Liability
          </h3>
          <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-4">
            <span className="font-semibold">
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE INDIAN LAW, IN NO
              EVENT SHALL COMPUNIC PRIVATE LIMITED, ITS AFFILIATES, DIRECTORS,
              EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
              SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT
              LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER
              INTANGIBLE LOSSES, RESULTING FROM (I) YOUR ACCESS TO OR USE OF OR
              INABILITY TO ACCESS OR USE THE SERVICE; (II) ANY CONDUCT OR
              CONTENT OF ANY THIRD PARTY ON THE SERVICE; (III) ANY CONTENT
              OBTAINED FROM THE SERVICE; AND (IV) UNAUTHORIZED ACCESS, USE, OR
              ALTERATION OF YOUR TRANSMISSIONS OR CONTENT, WHETHER BASED ON
              WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), OR ANY OTHER
              LEGAL THEORY, WHETHER OR NOT WE HAVE BEEN INFORMED OF THE
              POSSIBILITY OF SUCH DAMAGE, AND EVEN IF A REMEDY SET FORTH HEREIN
              IS FOUND TO HAVE FAILED OF ITS ESSENTIAL PURPOSE.
            </span>
          </p>
          <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-6">
            <span className="font-semibold">
              OUR TOTAL AGGREGATE LIABILITY TO YOU FOR ALL CLAIMS ARISING OUT OF
              OR RELATING TO THESE TERMS OR YOUR USE OF THE SERVICE, REGARDLESS
              OF THE FORM OF ACTION, WILL NOT EXCEED THE AMOUNT YOU HAVE PAID TO
              US FOR THE SERVICE IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.
            </span>
          </p>

          {/* Section 10: Indemnification */}
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
            10. Indemnification
          </h3>
          <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-4">
            You agree to defend, indemnify, and hold harmless Compunic Private
            Limited, its affiliates, licensors, and their respective officers,
            directors, employees, and agents from and against any claims,
            liabilities, damages, losses, and expenses, including, without
            limitation, reasonable legal and accounting fees, arising out of or
            in any way connected with:
          </p>
          <ul className="list-disc list-inside text-gray-700 text-xs sm:text-sm leading-relaxed mb-6 space-y-2">
            <li>Your access to or use of the Service.</li>
            <li>Your violation of these Terms.</li>
            <li>
              Your User Content, including any claim that your User Content
              infringes, misappropriates, or violates the Intellectual Property
              Rights or privacy rights of a third party.
            </li>
          </ul>

          {/* Section 11: Termination */}
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
            11. Termination
          </h3>
          <ul className="list-disc list-inside text-gray-700 text-xs sm:text-sm leading-relaxed mb-6 space-y-2">
            <li>
              <span className="font-semibold">By You:</span> You may terminate
              your Account at any time by contacting our support team or through
              your Account settings. Termination will be effective upon the
              completion of the current billing cycle for paid subscriptions.
            </li>
            <li>
              <span className="font-semibold">By Us:</span> We may suspend or
              terminate your Account and access to the Service immediately,
              without prior notice or liability, if you breach these Terms. We
              may also terminate or suspend your Account if we discontinue the
              Service.
            </li>
            <li>
              <span className="font-semibold">Effect of Termination:</span> Upon
              termination, your right to use the Service will immediately cease.
              All provisions of these Terms which by their nature should survive
              termination shall survive termination, including, without
              limitation, ownership provisions, warranty disclaimers, indemnity,
              and limitations of liability.
            </li>
          </ul>

          {/* Section 12: Governing Law and Jurisdiction */}
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
            12. Governing Law and Jurisdiction
          </h3>
          <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-4">
            These Terms shall be governed and construed in accordance with the
            laws of India, without regard to its conflict of law provisions.
          </p>
          <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-6">
            Any dispute, controversy, or claim arising out of or relating to
            these Terms or the breach, termination, or invalidity thereof, shall
            be subject to the exclusive jurisdiction of the courts located in
            Indore, Madhya Pradesh, India.
          </p>

          {/* Section 13: Changes to These Terms */}
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
            13. Changes to These Terms
          </h3>
          <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-4">
            We reserve the right, at our sole discretion, to modify or replace
            these Terms at any time. If a revision is material, we will provide
            at least 30 days' notice prior to any new terms taking effect. What
            constitutes a material change will be determined at our sole
            discretion.
          </p>
          <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-6">
            By continuing to access or use our Service after those revisions
            become effective, you agree to be bound by the revised terms. If you
            do not agree to the new terms, please stop using the Service.
          </p>

          {/* Section 14: Severability */}
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
            14. Severability
          </h3>
          <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-6">
            If any provision of these Terms is held to be invalid or
            unenforceable by a court, the remaining provisions of these Terms
            will remain in effect.
          </p>

          {/* Section 15: Entire Agreement */}
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
            15. Entire Agreement
          </h3>
          <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-6">
            These Terms, together with our Privacy Policy, constitute the entire
            agreement between you and Compunic Private Limited regarding the
            Service and supersede all prior and contemporaneous understandings,
            agreements, representations, and warranties, both written and oral,
            regarding the Service.
          </p>

          {/* Section 16: Contact Us */}
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
            16. Contact Us
          </h3>
          <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-2">
            If you have any questions about these Terms, please contact us:
          </p>
          <address className="not-italic text-gray-700 text-xs sm:text-sm leading-relaxed">
            <p className="mb-1">
              <span className="font-semibold">Compunic Private Limited</span>
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
            <p>Address: 198, Somani Nagar, 60 Ft. Airport Road Indore-452005</p>
          </address>
        </div>
      </div>
    </Dialog>
  );
};
const LandingPage = () => {
  const navigate = useNavigate();
  const streamlineFeatures = [
    { icon: IoCheckmarkCircleOutline, title: 'Streamline task management' },
    {
      icon: IoCheckmarkCircleOutline,
      title: 'Build a solid plan your team will trust',
    },
    { icon: IoCheckmarkCircleOutline, title: 'Simplify focus and execution' },
  ];

  const workflowFeatures = [
    { icon: IoCheckmarkCircleOutline, title: 'Invoice Creation' },
    { icon: IoCheckmarkCircleOutline, title: 'Payment Tracking & Reminders' },
    { icon: IoCheckmarkCircleOutline, title: 'Automated Billing Reports' },
  ];

  const automationFeatures = [
    { icon: IoCheckmarkCircleOutline, title: 'Auto assign' },
    { icon: IoCheckmarkCircleOutline, title: 'Notify team members' },
    { icon: IoCheckmarkCircleOutline, title: 'Integrating apps' },
  ];
  const [visible, setVisible] = useState(false);
  return (
    <div className="bg-white text-blue-900 min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <FeatureSection
          title={`Innovative. Fast. Retail Billing.  `}
          title1="Generate Invoices in Seconds."
          description="Bill365 is your hassle-free invoicing solution, designed to simplify retail management and drive success in India."
          features={streamlineFeatures}
          imageLeft={true}
          imageLeft1={false}
          imageLeft2={false}
        />
        <FeatureSection
          title="Choose Your Billing Workflow or Customize Your Own."
          description="Streamline your business with Bill365 by selecting a predefined workflow or creating a custom one that fits your specific needs."
          features={workflowFeatures}
          imageLeft={false}
          imageLeft1={true}
          imageLeft2={false}
        />
        <FeatureSection
          title="Automating routine work. Save time."
          description="Bill365 takes the hassle out of your daily billing routine by automating key tasks, giving you more time to focus on growing your business."
          features={automationFeatures}
          imageLeft={false}
          imageLeft1={false}
          imageLeft2={true}
        />
        <Pricing />
        <AboutUs/>
        <ContactUs/>
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
