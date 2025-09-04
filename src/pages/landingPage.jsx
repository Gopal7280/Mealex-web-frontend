


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// export default function LandingPage() {
//   const navigate = useNavigate();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   // Smooth scroll handler
//   const scrollToSection = (id) => {
//     const element = document.getElementById(id);
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth' });
//       setIsMobileMenuOpen(false); // Close mobile menu after clicking
//     }
//   };

//   return (
//     <div className="font-sans bg-white text-gray-800 scroll-smooth">
//       {/* Navbar */}
//       <header className="flex justify-between items-center px-6 md:px-8 py-4 md:py-6 shadow-md sticky top-0 z-50 bg-white">
//         <h1 className="text-3xl font-bold text-blue-900">
//           <span className="text-orange-500">MEAL</span>X
//         </h1>
//         <nav className="hidden md:flex space-x-6 font-medium">
//           <a href="#about" onClick={() => scrollToSection('about')} className="hover:text-orange-600 transition duration-300">About</a>
//           <a href="#features" onClick={() => scrollToSection('features')} className="hover:text-orange-600 transition duration-300">Features</a>
//           <a href="#owners" onClick={() => scrollToSection('owners')} className="hover:text-orange-600 transition duration-300">Mess Owners</a>
//           <a href="#customers" onClick={() => scrollToSection('customers')} className="hover:text-orange-600 transition duration-300">Customers</a>
//           <a href="#how-it-works" onClick={() => scrollToSection('how-it-works')} className="hover:text-orange-600 transition duration-300">How It Works</a>
//           <a href="#pricing" onClick={() => scrollToSection('pricing')} className="hover:text-orange-600 transition duration-300">Pricing</a>
//           <a href="#faq" onClick={() => scrollToSection('faq')} className="hover:text-orange-600 transition duration-300">FAQ</a>
//           <a href="#contact" onClick={() => scrollToSection('contact')} className="hover:text-orange-600 transition duration-300">Contact</a>
          
//                <button
//             onClick={() => navigate('/login')}
//             className="w-full py-3 bg-[#3A5B76] text-white text-lg font-medium rounded-lg hover:bg-[#2E4A5D] transition"
//           >
//             Login
//           </button>
//           <button
//             onClick={e => navigate('/login', { state: 'register' })}
//             className="w-full py-3 border border-[#3A5B76] text-[#3A5B76] text-lg font-medium rounded-lg hover:bg-[#f1f5f9] transition"
//           >
//             Sign Up
//           </button>
          
//         </nav>
// <div className="md:hidden flex items-center space-x-3">


//   <button
//     onClick={() => navigate('/login')}
//     className="bg-[#249d2c] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#70cc84] transition"
//   >
//     Login
//   </button>

//   <button
//     onClick={() => navigate('/login', { state: 'register' })}
//     className="border border-[#56763a] text-[#92d435] text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#f1f5f9] transition"
//   >
//     Sign Up
//   </button>
//     <button
//     onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//     className="text-gray-800 text-2xl p-2 rounded-md hover:bg-yellow-200 transition"
//   >
//     ☰
//   </button>
// </div>


//         {/* Mobile Menu */}
//         {isMobileMenuOpen && (
//           <div className="fixed inset-y-0 right-0 w-64 bg-white shadow-xl z-50 flex flex-col pt-20 px-6 md:hidden">
//             <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-4 right-4 text-gray-800 text-3xl p-2 rounded-md hover:bg-gray-100 transition">
//               &times;
//             </button>
//             <nav className="flex flex-col space-y-6 font-medium text-lg">
//               <a href="#about" onClick={() => scrollToSection('about')} className="hover:text-orange-600 transition duration-300">About</a>
//               <a href="#features" onClick={() => scrollToSection('features')} className="hover:text-orange-600 transition duration-300">Features</a>
//               <a href="#owners" onClick={() => scrollToSection('owners')} className="hover:text-orange-600 transition duration-300">Mess Owners</a>
//               <a href="#customers" onClick={() => scrollToSection('customers')} className="hover:text-orange-600 transition duration-300">Customers</a>
//               <a href="#how-it-works" onClick={() => scrollToSection('how-it-works')} className="hover:text-orange-600 transition duration-300">How It Works</a>
//               <a href="#pricing" onClick={() => scrollToSection('pricing')} className="hover:text-orange-600 transition duration-300">Pricing</a>
//               <a href="#faq" onClick={() => scrollToSection('faq')} className="hover:text-orange-600 transition duration-300">Contact</a>
             
//             </nav>
//           </div>
          
//         )}
//       </header>

//       {/* Hero Section */}
//       <section className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 md:px-10 py-20 bg-gradient-to-br from-orange-50 to-green-100 min-h-[80vh]">
//         <div className="lg:w-1/2 text-center lg:text-left mt-10 lg:mt-0">
//           <h2
//             className="text-5xl md:text-6xl font-extrabold text-green-900 mb-6 leading-tight"
//           >
//             <span className="text-orange-600">Bharat ke rang,</span> thali ke sang.
//           </h2>
//           <p
//             className="text-lg md:text-xl mb-8 text-gray-700 max-w-lg mx-auto lg:mx-0"
//           >
//             Empowering messes and tiffin services across India with intelligent, AI-driven meal management. From daily tiffins to institutional messes, **MealX** is your digital thali companion.
//           </p>
//           <div
//             className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-8"
//           >
//             <button className="flex items-center justify-center gap-2 bg-blue-900 text-white px-6 py-3 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 transform hover:bg-blue-800">
//               <span>&#xF179;</span> Get on Google Play
//             </button>
//             <button className="flex items-center justify-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 transform hover:bg-orange-400">
//               <span>&#xF178;</span> Download on App Store
//             </button>
//           </div>
//           <p
//             className="italic text-base text-gray-600"
//           >
//             “Simplifying thali management for over 10,000+ users and counting – experience the future of dining.”
//           </p>
//         </div>

//         <div
//           className="lg:w-1/2 mb-10 lg:mb-0 flex justify-center perspective-1000"
//         >
//           <img
//             src="https://placehold.co/600x400/FFDDC1/FF8C00?text=MealX+App+Screenshot"
//             alt="MealX App Screenshot"
//             className="w-full max-w-xl rounded-xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500"
//           />
//         </div>
//       </section>

   
//       <section id="about" className="bg-white py-20 px-6">
//         <div
//           className="max-w-5xl mx-auto text-center"
//         >
//           <h3 className="text-4xl md:text-5xl font-bold mb-8 flex justify-center items-center gap-4 text-blue-900">
//             <span className="text-orange-500">&#x1F6C8;</span> About <span className="text-green-800">MealX</span>
//           </h3>
//           <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
//             **MealX** is more than just a meal management system; it's a revolutionary, AI-driven, cloud-based platform meticulously crafted to modernize and optimize the Indian meal distribution system. We empower various food service providers, from bustling **college messes** and efficient **corporate cafeterias** to personalized **daily tiffin services**, to manage their operations with unprecedented efficiency. Our platform offers features like **flexible thali pricing**, **real-time consumption analytics**, and **seamless digital token management**, ensuring operational excellence and enhanced satisfaction for both providers and consumers. MealX adapts to your unique needs, transforming traditional meal systems into smart, data-driven experiences.
//           </p>
//         </div>
//       </section>

//       <hr className="my-12 border-gray-200" />

//       {/* Features Section */}
//       <section id="features" className="bg-gray-50 py-20 px-6">
//         <div
//           className="max-w-6xl mx-auto text-center"
//         >
//           <h3 className="text-4xl md:text-5xl font-bold mb-12 flex justify-center items-center gap-4 text-green-800">
//             <span className="text-blue-600">&#x1F680;</span> Key Features
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[
//               { icon: '📋', title: "Digital Token Management", description: "Issue, track, and manage digital meal tokens effortlessly, eliminating paper waste, manual errors, and long queues." },
//               { icon: '📱', title: "Offline QR Redemption", description: "Ensure seamless meal redemption via QR codes, guaranteeing uninterrupted service even without an active internet connection." },
//               { icon: '📈', title: "Real-time Analytics", description: "Gain invaluable insights into meal consumption patterns, identify peak hours, and discover popular dishes for smarter planning and inventory management." },
//               { icon: '₹', title: "Flexible Pricing Models", description: "Set up dynamic pricing, create various subscription plans, and offer attractive discounts or loyalty programs effortlessly to attract and retain customers." },
//               { icon: '👨‍💼', title: "Intuitive Mess Owner Dashboard", description: "A powerful, comprehensive, and intuitive dashboard providing complete control over your mess operations, from menu planning to financial reporting." },
//               { icon: '👥', title: "Enhanced Customer App Experience", description: "An easy-to-use, feature-rich mobile app for customers to manage their tokens, view daily menus, track their usage, and receive timely notifications." }
//             ].map((feature, index) => (
//               <div
//                 key={index}
//                 className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center text-center hover:scale-105 hover:shadow-xl transition-transform duration-300"
//               >
//                 <span className={`text-4xl ${feature.icon === '📋' ? 'text-orange-500' : feature.icon === '📱' ? 'text-green-600' : feature.icon === '📈' ? 'text-blue-700' : feature.icon === '₹' ? 'text-purple-600' : feature.icon === '👨‍💼' ? 'text-red-500' : 'text-yellow-500'} mb-4`}>{feature.icon}</span>
//                 <h4 className="text-2xl font-semibold text-blue-900 mb-3">{feature.title}</h4>
//                 <p className="text-gray-700 text-base">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <hr className="my-12 border-gray-200" />

//       {/* How It Works Section */}
//       <section id="how-it-works" className="bg-white py-20 px-6">
//         <div
//           className="max-w-6xl mx-auto text-center"
//         >
//           <h3 className="text-4xl md:text-5xl font-bold mb-12 flex justify-center items-center gap-4 text-blue-900">
//             <span className="text-orange-500">&#x2699;&#xFE0F;</span> How MealX Works
//           </h3>

//           {/* Mess Owner Flow */}
//           <div className="mb-16">
//             <h4 className="text-3xl font-bold text-green-800 mb-8 flex justify-center items-center gap-2">
//               For Mess Owners <span className="text-orange-600">&#x1F468;&#x200D;&#x1F4BC;</span>
//             </h4>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//               {[
//                 { step: 1, title: "Register & Setup", description: "Sign up for MealX and easily configure your mess details, menu, and pricing plans on our intuitive dashboard." },
//                 { step: 2, title: "Issue Digital Tokens", description: "Create and distribute digital meal tokens to your customers. Tokens can be managed per meal, per week, or as a custom subscription." },
//                 { step: 3, title: "Scan & Redeem", description: "Customers present their unique QR code for a meal. Your staff instantly scans it using the MealX app for quick and secure redemption, even offline." },
//                 { step: 4, title: "Track & Analyze", description: "Monitor real-time consumption data, generate detailed reports on meal patterns, revenue, and inventory to make informed decisions." }
//               ].map((item, index) => (
//                 <div
//                   key={index}
//                   className="bg-gray-50 p-6 rounded-xl shadow-md border border-gray-100 flex flex-col items-center text-center hover:scale-105 hover:shadow-lg transition-transform duration-300"
//                 >
//                   <div className="bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold mb-4">
//                     {item.step}
//                   </div>
//                   <h5 className="text-xl font-semibold text-blue-900 mb-2">{item.title}</h5>
//                   <p className="text-gray-700 text-sm">{item.description}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Customer Flow */}
//           <div>
//             <h4 className="text-3xl font-bold text-orange-600 mb-8 flex justify-center items-center gap-2">
//               For Customers <span className="text-blue-800">&#x1F465;</span>
//             </h4>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//               {[
//                 { step: 1, title: "Download & Subscribe", description: "Download the MealX app from the App Store or Google Play. Choose your preferred mess or tiffin service and subscribe to a meal plan." },
//                 { step: 2, title: "Receive Digital Tokens", description: "Your digital meal tokens are instantly available in your app, linked to your chosen plan. No more physical coupons!" },
//                 { step: 3, title: "Scan at Counter", description: "Simply open your app and present your unique QR code at the meal counter. Get your meal quickly and efficiently." },
//                 { step: 4, title: "Manage & Track", description: "View your remaining tokens, check daily menus, track your meal history, and receive timely notifications about your subscription." }
//               ].map((item, index) => (
//                 <div
//                   key={index}
//                   className="bg-gray-50 p-6 rounded-xl shadow-md border border-gray-100 flex flex-col items-center text-center hover:scale-105 hover:shadow-lg transition-transform duration-300"
//                 >
//                   <div className="bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold mb-4">
//                     {item.step}
//                   </div>
//                   <h5 className="text-xl font-semibold text-blue-900 mb-2">{item.title}</h5>
//                   <p className="text-gray-700 text-sm">{item.description}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       <hr className="my-12 border-gray-200" />

//       {/* Why Choose Us Section */}
//       <section id="why-choose-us" className="bg-gray-50 py-20 px-6">
//         <div
//           className="max-w-6xl mx-auto text-center"
//         >
//           <h3 className="text-4xl md:text-5xl font-bold mb-12 flex justify-center items-center gap-4 text-orange-600">
//             <span className="text-green-600">&#x1F4A1;</span> Why Choose MealX?
//           </h3>
//           <p className="text-lg md:text-xl text-gray-700 mb-12 max-w-3xl mx-auto">
//             MealX isn't just another management tool; it's your strategic partner in transforming meal services. Here’s why we stand out:
//           </p>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[
//               { icon: '✅', title: "AI-Powered Efficiency", description: "Leverage artificial intelligence to predict demand, optimize inventory, and minimize food waste, saving you money and resources." },
//               { icon: '🤝', title: "Customer-Centric Design", description: "Our intuitive app ensures a delightful experience for your customers, leading to higher satisfaction and loyalty." },
//               { icon: '💰', title: "Cost Savings", description: "Reduce operational costs associated with manual tracking, printing coupons, and managing physical records." },
//               { icon: '📞', title: "Dedicated Support", description: "Benefit from our 24/7 customer support, ready to assist you at every step, ensuring smooth operations." },
//               { icon: '⏰', title: "Time-Saving Automation", description: "Automate repetitive tasks like token issuance, redemption, and reporting, freeing up your valuable time." },
//               { icon: '🗓️', title: "Scalable for Growth", description: "Whether you're a small tiffin service or a large institutional mess, MealX scales seamlessly with your business as you grow." }
//             ].map((benefit, index) => (
//               <div
//                 key={index}
//                 className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center text-center hover:scale-105 hover:shadow-xl transition-transform duration-300"
//               >
//                 <span className={`text-4xl ${benefit.icon === '✅' ? 'text-green-500' : benefit.icon === '🤝' ? 'text-blue-500' : benefit.icon === '💰' ? 'text-yellow-500' : benefit.icon === '📞' ? 'text-orange-500' : benefit.icon === '⏰' ? 'text-purple-500' : 'text-red-500'} mb-4`}>{benefit.icon}</span>
//                 <h4 className="text-2xl font-semibold text-blue-900 mb-3">{benefit.title}</h4>
//                 <p className="text-gray-700 text-base">{benefit.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <hr className="my-12 border-gray-200" />

//       {/* Mess Owners Section */}
//       <section id="owners" className="bg-white py-20 px-6">
//         <div
//           className="max-w-5xl mx-auto text-center"
//         >
//           <h3 className="text-4xl md:text-5xl font-bold mb-8 flex justify-center items-center gap-4 text-orange-600">
//             <span>&#x1F468;&#x200D;&#x1F4BC;</span> For Mess Owners
//           </h3>
//           <p className="text-lg md:text-xl text-gray-700 mb-10 leading-relaxed">
//             **MealX** transforms your mess operations with powerful, intuitive tools. Say goodbye to manual record-keeping and embrace digital efficiency.
//           </p>
//           <div className="grid md:grid-cols-2 gap-10 items-center">
//             <div className="text-left">
//               <h4 className="text-3xl font-semibold text-blue-900 mb-4">Streamline Your Operations</h4>
//               <ul className="list-disc list-inside text-gray-700 text-lg space-y-3">
//                 <li>Create and manage digital thali tokens effortlessly.</li>
//                 <li>Track meal consumption in real-time with comprehensive reports.</li>
//                 <li>Optimize inventory and reduce food wastage with data insights.</li>
//                 <li>Manage multiple outlets from a single, centralized dashboard.</li>
//                 <li>Automate billing and payment processing for faster transactions.</li>
//                 <li>Ensure hygiene and reduce contact with paperless solutions.</li>
//               </ul>
//               <button className="mt-8 bg-green-700 text-white px-8 py-4 rounded-lg shadow-md hover:scale-105 transition-all duration-300 transform hover:bg-green-600 text-lg font-semibold">
//                 Learn More for Owners
//               </button>
//             </div>
//             <div>
//               <img src="https://placehold.co/600x400/CCE5FF/004080?text=Mess+Dashboard+Screenshot" alt="Mess Owner Dashboard" className="rounded-xl shadow-lg w-full" />
//             </div>
//           </div>
//         </div>
//       </section>

//       <hr className="my-12 border-gray-200" />

//       {/* Customers Section */}
//       <section id="customers" className="bg-gray-50 py-20 px-6">
//         <div
//           className="max-w-5xl mx-auto text-center"
//         >
//           <h3 className="text-4xl md:text-5xl font-bold mb-8 flex justify-center items-center gap-4 text-blue-800">
//             <span>&#x1F465;</span> For Customers
//           </h3>
//           <p className="text-lg md:text-xl text-gray-700 mb-10 leading-relaxed">
//             Enjoy a hassle-free dining experience with **MealX**. Your digital thali is just a tap away!
//           </p>
//           <div className="grid md:grid-cols-2 gap-10 items-center">
//             <div>
//               <img src="https://placehold.co/600x400/D4EDDA/155724?text=Customer+App+Screenshot" alt="Customer App" className="rounded-xl shadow-lg w-full" />
//             </div>
//             <div className="text-left">
//               <h4 className="text-3xl font-semibold text-green-800 mb-4">Dine Smarter, Not Harder</h4>
//               <ul className="list-disc list-inside text-gray-700 text-lg space-y-3">
//                 <li>Redeem meals quickly with offline QR scanning.</li>
//                 <li>View daily menus and upcoming meal schedules.</li>
//                 <li>Get timely notifications for token expiry and meal timings.</li>
//                 <li>Easy access to your meal history and usage.</li>
//                 <li>Enjoy a paperless, hygienic, and convenient dining experience.</li>
//                 <li>Seamless payment and subscription management within the app.</li>
//               </ul>
//               <button className="mt-8 bg-orange-500 text-white px-8 py-4 rounded-lg shadow-md hover:scale-105 transition-all duration-300 transform hover:bg-orange-400 text-lg font-semibold">
//                 Download the App
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       <hr className="my-12 border-gray-200" />
// {/* 
//       Pricing Section
//       <section id="pricing" className="bg-white py-20 px-6">
//         <div
//           className="max-w-6xl mx-auto text-center"
//         >
//           <h3 className="text-4xl md:text-5xl font-bold mb-12 flex justify-center items-center gap-4 text-purple-700">
//             <span>&#x20B9;</span> Flexible Pricing
//           </h3>
//           <p className="text-lg md:text-xl text-gray-700 mb-12 max-w-3xl mx-auto">
//             Choose a plan that best fits your mess or tiffin service needs. Our flexible pricing ensures you pay for what you use, with scalable options for all sizes.
//           </p>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8"> */}
//             {/* Pricing Card 1
//             <div
//               className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl shadow-xl border-t-4 border-blue-600 flex flex-col justify-between hover:scale-105 hover:shadow-2xl transition-transform duration-300"
//             >
//               <div>
//                 <h4 className="text-3xl font-bold text-blue-800 mb-4">Basic Plan</h4>
//                 <p className="text-gray-600 mb-6">Ideal for small tiffin services & mini-messes.</p>
//                 <p className="text-5xl font-extrabold text-blue-900 mb-6">
//                   ₹999<span className="text-lg font-medium text-gray-600">/month</span>
//                 </p>
//                 <ul className="text-left text-gray-700 space-y-3 mb-8">
//                   <li className="flex items-center gap-2"><span>✅</span> Digital Token Management (Up to 100 users)</li>
//                   <li className="flex items-center gap-2"><span>📱</span> Offline QR Redemption</li>
//                   <li className="flex items-center gap-2"><span>👨‍💼</span> Basic Mess Owner Dashboard</li>
//                   <li className="flex items-center gap-2"><span>📞</span> Email Support</li>
//                   <li className="flex items-center gap-2 text-gray-400 line-through"><span>📈</span> Advanced Analytics</li>
//                   <li className="flex items-center gap-2 text-gray-400 line-through"><span>💡</span> AI-powered Insights</li>
//                 </ul>
//               </div>
//               <button className="w-full bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300">
//                 Choose Basic
//               </button>
//             </div> */}

//             {/* Pricing Card 2 (Recommended) */}
//             {/* <div
//               className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-xl shadow-2xl border-t-4 border-orange-600 flex flex-col justify-between relative scale-105"
//             >
//               <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-600 text-white text-sm font-bold px-4 py-1 rounded-full shadow-md">Recommended</div>
//               <div>
//                 <h4 className="text-3xl font-bold text-orange-800 mb-4">Pro Plan</h4>
//                 <p className="text-gray-600 mb-6">Best for medium-sized messes & growing tiffin services.</p>
//                 <p className="text-5xl font-extrabold text-orange-900 mb-6">
//                   ₹2499<span className="text-lg font-medium text-gray-600">/month</span>
//                 </p>
//                 <ul className="text-left text-gray-700 space-y-3 mb-8">
//                   <li className="flex items-center gap-2"><span>✅</span> All Basic features (Up to 500 users)</li>
//                   <li className="flex items-center gap-2"><span>📈</span> Advanced Analytics</li>
//                   <li className="flex items-center gap-2"><span>💡</span> AI-powered Demand Prediction</li>
//                   <li className="flex items-center gap-2"><span>📞</span> Priority Chat & Email Support</li>
//                   <li className="flex items-center gap-2"><span>👥</span> Multiple Staff Accounts</li>
//                   <li className="flex items-center gap-2 text-gray-400 line-through"><span>🧑‍💻</span> Dedicated Account Manager</li>
//                 </ul>
//               </div>
//               <button className="w-full bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-500 transition duration-300">
//                 Choose Pro
//               </button>
//             </div> */}

//             {/* Pricing Card 3 */}
//             {/* <div
//               className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl shadow-xl border-t-4 border-green-600 flex flex-col justify-between hover:scale-105 hover:shadow-2xl transition-transform duration-300"
//             >
//               <div>
//                 <h4 className="text-3xl font-bold text-green-800 mb-4">Enterprise Plan</h4>
//                 <p className="text-gray-600 mb-6">For large institutions & multiple-branch operations.</p>
//                 <p className="text-5xl font-extrabold text-green-900 mb-6">
//                   Custom<span className="text-lg font-medium text-gray-600">/month</span>
//                 </p>
//                 <ul className="text-left text-gray-700 space-y-3 mb-8">
//                   <li className="flex items-center gap-2"><span>✅</span> All Pro features (Unlimited users)</li>
//                   <li className="flex items-center gap-2"><span>🧑‍💻</span> Dedicated Account Manager</li>
//                   <li className="flex items-center gap-2"><span>⚙️</span> Custom Integrations</li>
//                   <li className="flex items-center gap-2"><span>🔒</span> Advanced Security & Compliance</li>
//                   <li className="flex items-center gap-2"><span>📈</span> On-site Training & Setup</li>
//                   <li className="flex items-center gap-2"><span>📞</span> 24/7 Premium Support</li>
//                 </ul>
//               </div>
//               <button className="w-full bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition duration-300">
//                 Contact for Quote
//               </button>
//             </div>
//           </div>
//         </div> */}
//       {/* </section> */}

//       <hr className="my-12 border-gray-200" />

//       {/* Testimonials/Reviews Section */}
//       <section id="reviews" className="bg-gray-50 py-20 px-6">
//         <div
//           className="max-w-6xl mx-auto text-center"
//         >
//           <h3 className="text-4xl md:text-5xl font-bold mb-12 flex justify-center items-center gap-4 text-green-800">
//             <span className="text-orange-500">&#x2B50;&#xFE0F;</span> What Our Users Say
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
//             {[
//               {
//                 name: 'Amit R. (Mess Owner, Delhi)',
//                 comment: 'MealX ne hamari mess ki working streamline kar di. QR system bohot easy aur effective hai! Inventory management aur daily reports ne mera bohot time bachaya hai. Highly recommended for any mess looking to modernize.',
//                 rating: 5
//               },
//               {
//                 name: 'Priya S. (Student, Pune)',
//                 comment: 'Customer side ka tracking and expiry notification feature is very helpful! Ab thali kab expire hogi, pata chal jata hai, aur line mein khada nahi rehna padta. The app is super user-friendly!',
//                 rating: 4
//               },
//               {
//                 name: 'Ravi K. (Cafeteria Manager, Bengaluru)',
//                 comment: 'Easy to use and scalable. Best for college messes and corporate cafeterias. The analytics dashboard gives us great insights into peak hours and popular meals, helping us plan better.',
//                 rating: 5
//               },
//               {
//                 name: 'Deepak V. (Tiffin Service, Mumbai)',
//                 comment: 'My tiffin business has grown significantly with MealX. Managing subscriptions and payments is so much simpler now. It’s been a game-changer for our daily operations and customer satisfaction.',
//                 rating: 5
//               }
//             ].map((review, index) => (
//               <div
//                 key={index}
//                 className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center text-center hover:scale-105 hover:shadow-xl transition-transform duration-300"
//               >
//                 <div className="flex text-yellow-400 text-xl mb-4">
//                   {Array(review.rating).fill().map((_, i) => <span key={i}>&#9733;</span>)}
//                   {Array(5 - review.rating).fill().map((_, i) => <span key={i} className="text-gray-300">&#9733;</span>)}
//                 </div>
//                 <p className="italic text-gray-700 mb-4">"{review.comment}"</p>
//                 <p className="font-semibold text-blue-900">- {review.name}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <hr className="my-12 border-gray-200" />

//       {/* FAQ Section */}
//       <section id="faq" className="bg-white py-20 px-6">
//         <div
//           className="max-w-4xl mx-auto"
//         >
//           <h3 className="text-4xl md:text-5xl font-bold mb-12 text-center flex justify-center items-center gap-4 text-blue-900">
//             <span className="text-orange-500">&#x2753;</span> Frequently Asked Questions
//           </h3>
//           <div className="space-y-6">
//             {[
//               {
//                 question: 'How does MealX work for mess owners?',
//                 answer: 'MealX provides a comprehensive dashboard for mess owners to effortlessly create and manage digital thali tokens, track real-time consumption, and generate insightful reports on student and customer meal patterns. This streamlines operations, reduces wastage, and improves financial oversight.'
//               },
//               {
//                 question: 'Can customers redeem thalis without internet?',
//                 answer: 'Absolutely! Our robust system supports offline QR scanning and token redemption. This ensures seamless access and uninterrupted service for your customers, even in areas with low or no internet connectivity, providing a truly reliable solution.'
//               },
//               {
//                 question: 'Is MealX available in regional languages?',
//                 answer: 'Yes, MealX is designed for inclusivity across India. The platform supports multiple regional languages, including Hindi, Marathi, Bengali, Tamil, Telugu, and Kannada, allowing for a personalized and accessible experience for a diverse audience.'
//               },
//               {
//                 question: 'What kind of support does MealX offer?',
//                 answer: 'We offer dedicated 24/7 customer support via chat, email, and phone. Our team is committed to assisting you with setup, training, and any operational queries, ensuring a smooth and successful experience with MealX from day one.'
//               },
//               {
//                 question: 'How secure is my data with MealX?',
//                 answer: 'Data security is our top priority. MealX uses industry-standard encryption protocols and robust cloud infrastructure to protect all your sensitive information, ensuring privacy and compliance with data protection regulations.'
//               }
//             ].map((item, index) => (
//               <FAQItem key={index} question={item.question} answer={item.answer} />
//             ))}
//           </div>
//         </div>
//       </section>

//       <hr className="my-12 border-gray-200" />

//       {/* Contact Section */}
//       <section id="contact" className="bg-gray-50 py-20 px-6">
//         <div
//           className="max-w-4xl mx-auto text-center"
//         >
//           <h3 className="text-4xl md:text-5xl font-bold mb-12 flex justify-center items-center gap-4 text-green-800">
//             <span className="text-orange-500">&#x2709;&#xFE0F;</span> Get in Touch
//           </h3>
//           <p className="text-lg md:text-xl text-gray-700 mb-10">
//             Have questions or want to learn more about how MealX can revolutionize your meal service? Reach out to us!
//           </p>
//           <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
//             <form className="space-y-6">
//               <div>
//                 <label htmlFor="name" className="block text-left text-gray-700 text-lg font-medium mb-2">Your Name</label>
//                 <input
//                   type="text"
//                   id="name"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
//                   placeholder="Enter your name"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="email" className="block text-left text-gray-700 text-lg font-medium mb-2">Your Email</label>
//                 <input
//                   type="email"
//                   id="email"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
//                   placeholder="Enter your email"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="message" className="block text-left text-gray-700 text-lg font-medium mb-2">Your Message</label>
//                 <textarea
//                   id="message"
//                   rows="5"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
//                   placeholder="Tell us about your needs..."
//                 ></textarea>
//               </div>
//               <button
//                 type="submit"
//                 className="w-full bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-blue-800 transition duration-300 shadow-md"
//               >
//                 Send Message
//               </button>
//             </form>
//             <div className="mt-8 text-gray-600 text-left">
//               <p className="mb-2 flex items-center justify-center md:justify-start gap-2">
//                 <span>&#x260E;&#xFE0F;</span> Phone: +91 98765 43210
//               </p>
//               <p className="flex items-center justify-center md:justify-start gap-2">
//                 <span>&#x1F4E7;</span> Email: info@mealx.in
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-blue-900 text-white py-12 px-6">
//         <div className="max-w-6xl mx-auto text-center md:flex md:justify-between md:items-center">
//           <div className="mb-6 md:mb-0">
//             <h3 className="text-3xl font-bold text-white mb-2">
//               <span className="text-orange-500">MEAL</span>X
//             </h3>
//             <p className="text-gray-300">&copy; 2025 MealX. All rights reserved.</p>
//           </div>
//           <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-lg mb-6 md:mb-0">
//             <a href="#about" onClick={() => scrollToSection('about')} className="hover:text-orange-400 transition duration-300">About</a>
//             <a href="#features" onClick={() => scrollToSection('features')} className="hover:text-orange-400 transition duration-300">Features</a>
//             <a href="#pricing" onClick={() => scrollToSection('pricing')} className="hover:text-orange-400 transition duration-300">Pricing</a>
//             <a href="#faq" onClick={() => scrollToSection('faq')} className="hover:text-orange-400 transition duration-300">FAQ</a>
//             <a href="#contact" onClick={() => scrollToSection('contact')} className="hover:text-orange-400 transition duration-300">Contact</a>
//           </div>
//           <div className="flex justify-center md:justify-end space-x-6 text-2xl">
//             <a href="https://facebook.com/mealx" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition duration-300">
//               &#xF09A;
//             </a>
//             <a href="https://twitter.com/mealx" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition duration-300">
//               &#xF099;
//             </a>
//             <a href="https://linkedin.com/company/mealx" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition duration-300">
//               &#xF0E1;
//             </a>
//             <a href="https://instagram.com/mealx" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition duration-300">
//               &#xF16D;
//             </a>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

// // Reusable FAQ Item Component
// function FAQItem({ question, answer }) {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div
//       className="border border-gray-200 rounded-lg shadow-sm bg-white"
//     >
//       <button
//         className="flex justify-between items-center w-full p-6 text-left font-semibold text-lg text-gray-800 focus:outline-none"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <span>{question}</span>
//         <span
//           className={`text-blue-600 text-2xl transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
//         >
//           &#9660;
//         </span>
//       </button>
//       {isOpen && (
//         <div
//           className="overflow-hidden"
//         >
//           <p className="px-6 pb-6 text-gray-600 leading-relaxed">{answer}</p>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import cdash from "../assets/cdashboard.png";
import odash from "../assets/odashboard.png";
// import heroImg from "../assets/hero-illustration.webp";



/**
 * Landing page for "mealex" (web-only, no app-store CTAs).
 * - Responsive, sticky navbar, smooth-scroll sections
 * - Clean “Coming Soon” badges for not-yet-live features
 * - Owners & Customers sections tuned for website usage
 * - Keeps FAQs, Testimonials, Contact
 * 
 * 🔁 Replace placeholder images:
 *  - Hero: /assets/hero-illustration.webp
 *  - Owners: /assets/owners-dashboard.webp
 *  - Customers: /assets/customers-journey.webp
 */

export default function LandingPage() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Smooth scroll
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const NavLinks = () => (
    <>
      <button onClick={() => scrollToSection("about")} className="hover:text-orange-600 transition">About</button>
      <button onClick={() => scrollToSection("features")} className="hover:text-orange-600 transition">Features</button>
      <button onClick={() => scrollToSection("owners")} className="hover:text-orange-600 transition">Mess Owners</button>
      <button onClick={() => scrollToSection("customers")} className="hover:text-orange-600 transition">Customers</button>
      <button onClick={() => scrollToSection("how-it-works")} className="hover:text-orange-600 transition">How It Works</button>
      <button onClick={() => scrollToSection("faq")} className="hover:text-orange-600 transition">FAQ</button>
      <button onClick={() => scrollToSection("contact")} className="hover:text-orange-600 transition">Contact</button>
    </>
  );

  const Pill = ({ children }) => (
    <span className="text-xs px-2 py-1 rounded-full border bg-white/70">{children}</span>
  );

  return (
    <div className="font-sans bg-white text-gray-800 scroll-smooth">
      {/* Navbar */}
      <header className="flex justify-between items-center px-6 md:px-8 py-4 md:py-6 shadow-md sticky top-0 z-50 bg-white">
        <h1 className="text-3xl font-extrabold tracking-tight text-blue-900">
          <span className="text-orange-500">MEAL</span>EX
        </h1>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 font-medium">
          <NavLinks />
          <div className="h-6 w-px bg-gray-200 mx-2" />
          <button
            onClick={() => navigate("/login")}
            className="py-2.5 px-4 bg-[#3A5B76] text-white rounded-lg hover:bg-[#2E4A5D] transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/login", { state: "register" })}
            className="py-2.5 px-4 border border-[#3A5B76] text-[#3A5B76] rounded-lg hover:bg-[#f1f5f9] transition"
          >
            Sign Up
          </button>
        </nav>

        {/* Mobile nav */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={() => navigate("/login")}
            className="bg-[#3A5B76] text-white text-sm font-medium px-3.5 py-2 rounded-lg hover:bg-[#2E4A5D] transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/login", { state: "register" })}
            className="border border-[#3A5B76] text-[#3A5B76] text-sm font-medium px-3.5 py-2 rounded-lg hover:bg-[#f1f5f9] transition"
          >
            Sign Up
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-800 text-2xl p-2 rounded-md hover:bg-gray-100 transition"
            aria-label="Toggle Menu"
          >
            ☰
          </button>
        </div>

        {/* Mobile Drawer */}
        {isMobileMenuOpen && (
          <div className="fixed inset-y-0 right-0 w-72 bg-white shadow-xl z-50 flex flex-col pt-20 px-6 md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-4 right-4 text-gray-800 text-3xl p-2 rounded-md hover:bg-gray-100 transition"
              aria-label="Close Menu"
            >
              &times;
            </button>
            <nav className="flex flex-col gap-5 font-medium text-lg">
              <NavLinks />
            </nav>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 md:px-10 py-16 md:py-20 bg-gradient-to-br from-orange-50 to-green-100">
        <div className="lg:w-1/2 text-center lg:text-left mt-10 lg:mt-0">
          <h2 className="text-5xl md:text-6xl font-extrabold text-green-900 mb-5 leading-tight">
            Bharat ke rang, <span className="text-orange-600">thali ke sang.</span>
          </h2>
          <p className="text-lg md:text-xl mb-8 text-gray-700 max-w-xl mx-auto lg:mx-0">
            <strong>mealex</strong> helps messes and tiffin services run smarter on the web —
            discover messes, manage subscriptions, and simplify KYC & payouts
            for owners. No app needed (for now).
          </p>

          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3">
            <button
              onClick={() => navigate("/login", { state: "register" })}
              className="px-6 py-3 rounded-lg shadow-lg bg-blue-900 text-white hover:bg-blue-800 transition"
            >
              Get Started (Free)
            </button>
            <button
              onClick={() => scrollToSection("owners")}
              className="px-6 py-3 rounded-lg shadow-lg bg-orange-500 text-white hover:bg-orange-400 transition"
            >
              For Mess Owners
            </button>
          </div>

          <div className="mt-4 flex items-center justify-center lg:justify-start gap-2 text-sm text-gray-600">
            <Pill>Web-first</Pill>
            <Pill>Secure</Pill>
            <Pill>Made in India</Pill>
          </div>
        </div>

        <div className="lg:w-1/2 mb-10 lg:mb-0 flex justify-center">
          <img
            src={odash} // 🔁 replace with your hero image
            alt="mealex web experience"
            className="w-full max-w-xl rounded-xl shadow-2xl"
          />
        </div>
      </section>

      {/* About */}
      <section id="about" className="bg-white py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-4xl md:text-5xl font-bold mb-6 text-blue-900">
            About <span className="text-orange-500">MEAL</span>EX
          </h3>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            <strong>mealex</strong> is a web-first platform to modernize Indian messes and
            tiffin services. We help owners build a digital presence, streamline
            KYC & bank onboarding, and (soon) accept secure online payments.
            Customers can easily find and subscribe to messes near them.
          </p>
        </div>
      </section>

      <hr className="my-12 border-gray-200" />

      {/* Features (web-only wording) */}
      <section id="features" className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-4xl md:text-5xl font-bold mb-10 text-green-800">
            Key Features
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "📍",
                title: "Mess Discovery",
                description:
                  "Search and explore verified messes & tiffin services nearby with clear details and menus.",
              },
              {
                icon: "📝",
                title: "Simple Subscriptions",
                description:
                  "Subscribe to a mess plan on the web. Transparent pricing and flexible durations.",
              },
              {
                icon: "✅",
                title: "Owner KYC Onboarding",
                description:
                  "Guided, paperless KYC & bank setup for mess owners to start settlements quickly.",
              },
              {
                icon: "🔐",
                title: "Secure Payouts",
                description:
                  "Bank details & settlements handled with industry-grade security.",
              },
              {
                icon: "📊",
                title: "Owner Dashboard",
                description:
                  "Manage plans, customers, and settlements from a clean web dashboard.",
              },
              {
                icon: "⚡",
                title: "Online Payments",
                description:
                  "Seamless online payments for subscriptions.",
                // badge: "Coming Soon",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center text-center hover:shadow-xl transition"
              >
                <div className="text-4xl mb-3">{f.icon}</div>
                <h4 className="text-2xl font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  {f.title}
                  {f.badge && (
                    <span className="text-[10px] uppercase tracking-wide bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
                      {f.badge}
                    </span>
                  )}
                </h4>
                <p className="text-gray-700 text-base">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="my-12 border-gray-200" />

      {/* How It Works */}
      <section id="how-it-works" className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-4xl md:text-5xl font-bold mb-10 text-blue-900">
            How mealex Works
          </h3>

          {/* Owner flow */}
          <div className="mb-16">
            <h4 className="text-3xl font-bold text-green-800 mb-6">For Mess Owners</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: 1, title: "Register", desc: "Create your owner account on mealex." },
                { step: 2, title: "Complete KYC", desc: "Finish web-based KYC & add bank details." },
                { step: 3, title: "Publish Plans", desc: "Create subscription plans & go live." },
                { step: 4, title: "Manage & Settle", desc: "Track subscriptions, settlements & growth." },
              ].map((s) => (
                <CardStep key={s.step} {...s} />
              ))}
            </div>
          </div>

          {/* Customer flow */}
          <div>
            <h4 className="text-3xl font-bold text-orange-600 mb-6">For Customers</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: 1, title: "Explore", desc: "Find messes near you with transparent info." },
                { step: 2, title: "Choose a Plan", desc: "Pick what fits your routine & budget." },
                { step: 3, title: "Subscribe Online", desc: "Pay securely (online payments coming soon)." },
                { step: 4, title: "Enjoy Your Meals", desc: "Simple, reliable, and organized dining." },
              ].map((s) => (
                <CardStep key={s.step} {...s} theme="customer" />
              ))}
            </div>
          </div>
        </div>
      </section>

      <hr className="my-12 border-gray-200" />

      {/* Owners */}
      <section id="owners" className="bg-white py-16 px-6">
        <div className="max-w-5xl mx-auto text-center md:text-left grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="text-4xl md:text-5xl font-bold mb-4 text-orange-600">
              For Mess Owners
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Bring your mess online with mealex. Publish plans, onboard customers,
              and manage settlements — all on the web.
            </p>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>Fast, guided KYC & bank setup</li>
              <li>Plan & pricing management</li>
              <li>Customer & subscription tracking</li>
              <li>Settlement visibility</li>
            </ul>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => navigate("/login", { state: "register" })}
                className="bg-green-700 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition font-semibold"
              >
                Get Early Access
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="border border-green-700 text-green-700 px-6 py-3 rounded-lg hover:bg-green-50 transition font-semibold"
              >
                Talk to Us
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <img
              src={odash} // 🔁 replace image
              alt="mealex owner dashboard preview"
              className="rounded-xl shadow-lg w-full max-w-lg"
            />
          </div>
        </div>
      </section>

      <hr className="my-12 border-gray-200" />

      {/* Customers */}
      <section id="customers" className="bg-gray-50 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center md:text-left grid md:grid-cols-2 gap-10 items-center">
          <div className="flex justify-center order-2 md:order-1">
            <img
              src={cdash} // 🔁 replace image
              alt="mealex customer journey"
              className="rounded-xl shadow-lg w-full max-w-lg"
            />
          </div>
          <div className="order-1 md:order-2">
            <h3 className="text-4xl md:text-5xl font-bold mb-4 text-blue-800">
              For Customers
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Discover trusted messes around you and subscribe on the web. No
              app, no hassle — just great meals.
            </p>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>Find verified messes nearby</li>
              <li>Transparent plan information</li>
              <li>Secure subscription flow</li>
              <li>Clear communication from owners</li>
            </ul>
            <button
              onClick={() => navigate("/login")}
              className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-orange-400 transition font-semibold"
            >
              Explore on Web
            </button>
          </div>
        </div>
      </section>

      <hr className="my-12 border-gray-200" />

      {/* Reviews */}
      <section id="reviews" className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-4xl md:text-5xl font-bold mb-10 text-green-800">
            What Our Users Say
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "Amit R. (Mess Owner, Delhi)",
                comment:
                  "mealex ne hamari mess ki operations streamline kar di. KYC flow aur settlements setup bohot smooth rahe.",
                rating: 5,
              },
              {
                name: "Priya S. (Student, Pune)",
                comment:
                  "Subscription choose karna aur mess compare karna easy ho gaya. Web par sab clear dikh jata hai.",
                rating: 4,
              },
              {
                name: "Ravi K. (Cafeteria Manager, Bengaluru)",
                comment:
                  "Dashboard simple aur powerful — plans aur customers manage karne mein kaafi madad mili.",
                rating: 5,
              },
              {
                name: "Deepak V. (Tiffin Service, Mumbai)",
                comment:
                  "mealex ke through online presence build ki aur subscriptions badhe. Web-first approach pasand aayi.",
                rating: 5,
              },
            ].map((r, i) => (
              <ReviewCard key={i} {...r} />
            ))}
          </div>
        </div>
      </section>

      <hr className="my-12 border-gray-200" />

      {/* FAQ (kept similar) */}
      <section id="faq" className="bg-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-4xl md:text-5xl font-bold mb-10 text-center text-blue-900">
            Frequently Asked Questions
          </h3>
          <div className="space-y-6">
            {[
              {
                q: "mealex mess owners ke liye kaise kaam karta hai?",
                a: "mealex aapko web par digital presence, guided KYC, plan publishing aur customer subscriptions manage karne mein madad karta hai.",
              },
              {
                q: "Kya online payments available hain?",
                a: "Online payments jald aa rahe hain. Tab tak aap sign-ups collect karke customers ko onboard kar sakte hain.",
              },
              {
                q: "Regional language support?",
                a: "Haan, multi-language support roadmap mein hai. Rollout ke saath hum announce karenge.",
              },
              {
                q: "Data security kaisi hai?",
                a: "Bank & KYC details industry-standard practices se handle ki jati hain. Security aur privacy hamari priority hai.",
              },
            ].map((f, i) => (
              <FAQItem key={i} question={f.q} answer={f.a} />
            ))}
          </div>
        </div>
      </section>

      <hr className="my-12 border-gray-200" />

      {/* Contact */}
      <section id="contact" className="bg-gray-50 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl md:text-5xl font-bold mb-8 text-green-800">
            Get in Touch
          </h3>
        </div>

        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          <form className="space-y-6">
            <div>
              <label className="block text-left text-gray-700 text-lg font-medium mb-2">Your Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-left text-gray-700 text-lg font-medium mb-2">Your Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-left text-gray-700 text-lg font-medium mb-2">Your Message</label>
              <textarea
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Tell us about your needs..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-blue-800 transition shadow-md"
            >
              Send Message
            </button>
          </form>
          <div className="mt-8 text-gray-600 text-left">
            <p className="mb-2 flex items-center gap-2">
              <span>☎️</span> Phone: +91 98765 43210
            </p>
            <p className="flex items-center gap-2">
              <span>✉️</span> Email: info@mealex.in
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto text-center md:flex md:justify-between md:items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-3xl font-bold text-white mb-2">
              <span className="text-orange-500">MEA</span>LEX
            </h3>
            <p className="text-gray-300">&copy; {new Date().getFullYear()} mealex. All rights reserved.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-lg mb-6 md:mb-0">
            <button onClick={() => scrollToSection("about")} className="hover:text-orange-400 transition">About</button>
            <button onClick={() => scrollToSection("features")} className="hover:text-orange-400 transition">Features</button>
            <button onClick={() => scrollToSection("faq")} className="hover:text-orange-400 transition">FAQ</button>
            <button onClick={() => scrollToSection("contact")} className="hover:text-orange-400 transition">Contact</button>
          </div>

          <div className="flex justify-center md:justify-end space-x-6 text-2xl">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-orange-400 transition">ⓕ</a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-orange-400 transition">𝕏</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-orange-400 transition">in</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-orange-400 transition">◎</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* —————— Small UI Components —————— */

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-lg shadow-sm bg-white">
      <button
        className="flex justify-between items-center w-full p-6 text-left font-semibold text-lg text-gray-800"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        <span
          className={`text-blue-600 text-2xl transform transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
        >
          ▼
        </span>
      </button>
      {isOpen && <p className="px-6 pb-6 text-gray-600 leading-relaxed">{answer}</p>}
    </div>
  );
}

function CardStep({ step, title, desc, theme = "owner" }) {
  const isOwner = theme === "owner";
  return (
    <div className="bg-gray-50 p-6 rounded-xl shadow-md border border-gray-100 text-center hover:shadow-lg transition">
      <div
        className={`${
          isOwner ? "bg-orange-500" : "bg-green-500"
        } text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold mb-4 mx-auto`}
      >
        {step}
      </div>
      <h5 className="text-xl font-semibold text-blue-900 mb-2">{title}</h5>
      <p className="text-gray-700 text-sm">{desc}</p>
    </div>
  );
}

function ReviewCard({ name, comment, rating }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center text-center hover:shadow-xl transition">
      <div className="flex text-yellow-400 text-xl mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <span key={i}>★</span>
        ))}
        {Array.from({ length: 5 - rating }).map((_, i) => (
          <span key={i} className="text-gray-300">
            ★
          </span>
        ))}
      </div>
      <p className="italic text-gray-700 mb-4">"{comment}"</p>
      <p className="font-semibold text-blue-900">- {name}</p>
    </div>
  );
}
