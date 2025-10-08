

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import cdash from "../assets/cdashboard.png";
// import odash from "../assets/odashboard.png";
// // import mealx from '../assets/mealx.png';
// import logo from '../assets/mealx.png';



// export default function LandingPage() {
//   const navigate = useNavigate();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   // Smooth scroll
//   const scrollToSection = (id) => {
//     const el = document.getElementById(id);
//     if (el) {
//       el.scrollIntoView({ behavior: "smooth" });
//       setIsMobileMenuOpen(false);
//     }
//   };

//   const NavLinks = () => (
//     <>
//       <button onClick={() => scrollToSection("about")} className="hover:text-orange-600 transition">About</button>
//       <button onClick={() => scrollToSection("features")} className="hover:text-orange-600 transition">Features</button>
//       <button onClick={() => scrollToSection("owners")} className="hover:text-orange-600 transition">Mess Owners</button>
//       <button onClick={() => scrollToSection("customers")} className="hover:text-orange-600 transition">Customers</button>
//       <button onClick={() => scrollToSection("how-it-works")} className="hover:text-orange-600 transition">How It Works</button>
//       <button onClick={() => scrollToSection("faq")} className="hover:text-orange-600 transition">FAQ</button>
//       <button onClick={() => scrollToSection("contact")} className="hover:text-orange-600 transition">Contact</button>
//     </>
//   );

//   const Pill = ({ children }) => (
//     <span className="text-xs px-2 py-1 rounded-full border bg-white/70">{children}</span>
//   );

//   return (
//     <div className="font-sans bg-white text-gray-800 scroll-smooth">
//       {/* Navbar */}
//       <header className="flex justify-between items-center px-6 md:px-8 py-4 md:py-6 shadow-md sticky top-0 z-50 bg-white">
//         <h1 className="text-3xl font-extrabold tracking-tight text-blue-900">
//           <span className="text-orange-500">MEAL</span>EX
//         </h1>

//         {/* Desktop nav */}
//         <nav className="hidden md:flex items-center gap-6 font-medium">
//           <NavLinks />
//           <div className="h-6 w-px bg-gray-200 mx-2" />
//           <button
//             onClick={() => navigate("/login")}
//             className="py-2.5 px-4 bg-[#3A5B76] text-white rounded-lg hover:bg-[#2E4A5D] transition"
//           >
//             Login
//           </button>
//           <button
//             onClick={() => navigate("/login", { state: "register" })}
//             className="py-2.5 px-4 border border-[#3A5B76] text-[#3A5B76] rounded-lg hover:bg-[#f1f5f9] transition"
//           >
//             Sign Up
//           </button>
//         </nav>

//         {/* Mobile nav */}
//         <div className="md:hidden flex items-center gap-3">
//           <button
//             onClick={() => navigate("/login")}
//             className="bg-[#3A5B76] text-white text-sm font-medium px-3.5 py-2 rounded-lg hover:bg-[#2E4A5D] transition"
//           >
//             Login
//           </button>
//           <button
//             onClick={() => navigate("/login", { state: "register" })}
//             className="border border-[#3A5B76] text-[#3A5B76] text-sm font-medium px-3.5 py-2 rounded-lg hover:bg-[#f1f5f9] transition"
//           >
//             Sign Up
//           </button>
//           <button
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             className="text-gray-800 text-2xl p-2 rounded-md hover:bg-gray-100 transition"
//             aria-label="Toggle Menu"
//           >
//             ☰
//           </button>
//         </div>

//         {/* Mobile Drawer */}
//         {isMobileMenuOpen && (
//           <div className="fixed inset-y-0 right-0 w-72 bg-white shadow-xl z-50 flex flex-col pt-20 px-6 md:hidden">
//             <button
//               onClick={() => setIsMobileMenuOpen(false)}
//               className="absolute top-4 right-4 text-gray-800 text-3xl p-2 rounded-md hover:bg-gray-100 transition"
//               aria-label="Close Menu"
//             >
//               &times;
//             </button>
//             <nav className="flex flex-col gap-5 font-medium text-lg">
//               <NavLinks />
//             </nav>
//           </div>
//         )}
//       </header>

//       {/* Hero */}
//       <section className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 md:px-10 py-16 md:py-20 bg-gradient-to-br from-orange-50 to-green-100">
//         <div className="lg:w-1/2 text-center lg:text-left mt-10 lg:mt-0">
//           <h2 className="text-5xl md:text-6xl font-extrabold text-green-900 mb-5 leading-tight">
//             Bharat ke rang, <span className="text-orange-600">thali ke sang.</span>
//           </h2>
//           <p className="text-lg md:text-xl mb-8 text-gray-700 max-w-xl mx-auto lg:mx-0">
//             Meal app to manage, redeem & track meals for customers and providers.
//           </p>

//           <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3">
//             <button
//               onClick={() => navigate("/login", { state: "register" })}
//               className="px-6 py-3 rounded-lg shadow-lg bg-blue-900 text-white hover:bg-blue-800 transition"
//             >
//               Get Started (Free)
//             </button>
//             <button
//               onClick={() => scrollToSection("owners")}
//               className="px-6 py-3 rounded-lg shadow-lg bg-orange-500 text-white hover:bg-orange-400 transition"
//             >
//               For Mess Owners
//             </button>
//           </div>

//           <div className="mt-4 flex items-center justify-center lg:justify-start gap-2 text-sm text-gray-600">
//             {/* <Pill>Web-first</Pill>
//             <Pill>Secure</Pill>
//             <Pill>Made in India</Pill> */}
//           </div>
//         </div>

//         <div className="lg:w-1/2 mb-10 lg:mb-0 flex justify-center">
//           <img
//             src={odash} // 🔁 replace with your hero image
//             alt="mealex web experience"
//             className="w-full max-w-xl rounded-xl shadow-2xl"
//           />
//         </div>
//       </section>
//       {/* App Install */}
// <section id="app" className="bg-gradient-to-r from-blue-900 to-green-700 py-20 px-6 text-center text-white">
//   <h3 className="text-4xl md:text-5xl font-bold mb-6">MealEX App is Here 🎉</h3>
//   <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
//     Prefer mobile? Install the MealEX app and enjoy the same seamless experience on the go.
//   </p>
//   <div className="flex flex-col sm:flex-row justify-center gap-4">
//     <a href="https://play.google.com/store" target="_blank" rel="noreferrer">
//       <img src="/assets/google-play-badge.png" alt="Google Play" className="h-14" />
//     </a>
//     <a href="https://apps.apple.com" target="_blank" rel="noreferrer">
//       <img src="/assets/app-store-badge.png" alt="App Store" className="h-14" />
//     </a>
//   </div>
//   <div className="mt-10 flex justify-center">
//     <img src={logo} alt="MealEX App Preview" className="max-w-sm rounded-2xl shadow-2xl" />
//   </div>
// </section>

// {/* Why MealEX */}
// <section className="bg-white py-20 px-6">
//   <div className="max-w-5xl mx-auto text-center">
//     <h3 className="text-4xl md:text-5xl font-bold mb-6 text-orange-600">Why Choose MealEX?</h3>
//     <p className="text-lg text-gray-700 mb-12">
//       Compare traditional mess management with the MealEX way.
//     </p>
//     <div className="grid md:grid-cols-2 gap-8">
//       <div className="bg-red-50 p-8 rounded-xl shadow-md">
//         <h4 className="font-bold text-red-600 text-2xl mb-4">Without MealEX</h4>
//         <ul className="text-gray-700 space-y-3">
//           <li>📒 Manual ledger & cash handling</li>
//           <li>📞 Customers call daily for updates</li>
//           <li>🤝 Settlements delayed, no transparency</li>
//         </ul>
//       </div>
//       <div className="bg-green-50 p-8 rounded-xl shadow-md">
//         <h4 className="font-bold text-green-600 text-2xl mb-4">With MealEX</h4>
//         <ul className="text-gray-700 space-y-3">
//           <li>💻 Dashboard for plans, tokens & customers</li>
//           <li>📱 Customers self-manage via web & app</li>
//           <li>⚡ Fast payouts & secure tracking</li>
//         </ul>
//       </div>
//     </div>
//   </div>
// </section>

//       {/* About */}
//       <section id="about" className="bg-white py-16 px-6">
//         <div className="max-w-5xl mx-auto text-center">
//           <h3 className="text-4xl md:text-5xl font-bold mb-6 text-blue-900">
//             About <span className="text-orange-500">MEAL</span>EX
//           </h3>
//           <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
//             <strong>mealex</strong> is a web-first platform to modernize Indian messes and
//             tiffin services. We help owners build a digital presence, streamline
//             KYC & bank onboarding, and (soon) accept secure online payments.
//             Customers can easily find and subscribe to messes near them.
//           </p>
//         </div>
//       </section>

//       <hr className="my-12 border-gray-200" />

//       {/* Features (web-only wording) */}
//       <section id="features" className="bg-gray-50 py-16 px-6">
//         <div className="max-w-6xl mx-auto text-center">
//           <h3 className="text-4xl md:text-5xl font-bold mb-10 text-green-800">
//             Key Features
//           </h3>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[
//               {
//                 icon: "📍",
//                 title: "Mess Discovery",
//                 description:
//                   "Search and explore verified messes & tiffin services nearby with clear details and menus.",
//               },
//               {
//                 icon: "📝",
//                 title: "Simple Subscriptions",
//                 description:
//                   "Subscribe to a mess plan on the web. Transparent pricing and flexible durations.",
//               },
//               {
//                 icon: "✅",
//                 title: "Owner KYC Onboarding",
//                 description:
//                   "Guided, paperless KYC & bank setup for mess owners to start settlements quickly.",
//               },
//               {
//                 icon: "🔐",
//                 title: "Secure Payouts",
//                 description:
//                   "Bank details & settlements handled with industry-grade security.",
//               },
//               {
//                 icon: "📊",
//                 title: "Owner Dashboard",
//                 description:
//                   "Manage plans, customers, and settlements from a clean web dashboard.",
//               },
//               {
//                 icon: "⚡",
//                 title: "Online Payments",
//                 description:
//                   "Seamless online payments for subscriptions.",
//                 // badge: "Coming Soon",
//               },
//             ].map((f, i) => (
//               <div
//                 key={i}
//                 className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center text-center hover:shadow-xl transition"
//               >
//                 <div className="text-4xl mb-3">{f.icon}</div>
//                 <h4 className="text-2xl font-semibold text-blue-900 mb-2 flex items-center gap-2">
//                   {f.title}
//                   {f.badge && (
//                     <span className="text-[10px] uppercase tracking-wide bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
//                       {f.badge}
//                     </span>
//                   )}
//                 </h4>
//                 <p className="text-gray-700 text-base">{f.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <hr className="my-12 border-gray-200" />

//       {/* How It Works */}
//       <section id="how-it-works" className="bg-white py-16 px-6">
//         <div className="max-w-6xl mx-auto text-center">
//           <h3 className="text-4xl md:text-5xl font-bold mb-10 text-blue-900">
//             How mealex Works
//           </h3>

//           {/* Owner flow */}
//           <div className="mb-16">
//             <h4 className="text-3xl font-bold text-green-800 mb-6">For Mess Owners</h4>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//               {[
//                 { step: 1, title: "Register", desc: "Create your owner account on mealex." },
//                 { step: 2, title: "Complete KYC", desc: "Finish web-based KYC & add bank details." },
//                 { step: 3, title: "Publish Plans", desc: "Create subscription plans & go live." },
//                 { step: 4, title: "Manage & Settle", desc: "Track subscriptions, settlements & growth." },
//               ].map((s) => (
//                 <CardStep key={s.step} {...s} />
//               ))}
//             </div>
//           </div>

//           {/* Customer flow */}
//           <div>
//             <h4 className="text-3xl font-bold text-orange-600 mb-6">For Customers</h4>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//               {[
//                 { step: 1, title: "Explore", desc: "Find messes near you with transparent info." },
//                 { step: 2, title: "Choose a Plan", desc: "Pick what fits your routine & budget." },
//                 { step: 3, title: "Subscribe Online", desc: "Pay securely (online payments coming soon)." },
//                 { step: 4, title: "Enjoy Your Meals", desc: "Simple, reliable, and organized dining." },
//               ].map((s) => (
//                 <CardStep key={s.step} {...s} theme="customer" />
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       <hr className="my-12 border-gray-200" />

//       {/* Owners */}
//       <section id="owners" className="bg-white py-16 px-6">
//         <div className="max-w-5xl mx-auto text-center md:text-left grid md:grid-cols-2 gap-10 items-center">
//           <div>
//             <h3 className="text-4xl md:text-5xl font-bold mb-4 text-orange-600">
//               For Mess Owners
//             </h3>
//             <p className="text-lg text-gray-700 mb-6">
//               Bring your mess online with mealex. Publish plans, onboard customers,
//               and manage settlements — all on the web.
//             </p>
//             <ul className="list-disc pl-5 text-gray-700 space-y-2">
//               <li>Fast, guided KYC & bank setup</li>
//               <li>Plan & pricing management</li>
//               <li>Customer & subscription tracking</li>
//               <li>Settlement visibility</li>
//             </ul>
//             <div className="flex gap-3 mt-6">
//               <button
//                 onClick={() => navigate("/login", { state: "register" })}
//                 className="bg-green-700 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition font-semibold"
//               >
//                 Get Early Access
//               </button>
//               <button
//                 onClick={() => scrollToSection("contact")}
//                 className="border border-green-700 text-green-700 px-6 py-3 rounded-lg hover:bg-green-50 transition font-semibold"
//               >
//                 Talk to Us
//               </button>
//             </div>
//           </div>
//           <div className="flex justify-center">
//             <img
//               src={odash} // 🔁 replace image
//               alt="mealex owner dashboard preview"
//               className="rounded-xl shadow-lg w-full max-w-lg"
//             />
//           </div>
//         </div>
//       </section>

//       <hr className="my-12 border-gray-200" />

//       {/* Customers */}
//       <section id="customers" className="bg-gray-50 py-16 px-6">
//         <div className="max-w-5xl mx-auto text-center md:text-left grid md:grid-cols-2 gap-10 items-center">
//           <div className="flex justify-center order-2 md:order-1">
//             <img
//               src={cdash} // 🔁 replace image
//               alt="mealex customer journey"
//               className="rounded-xl shadow-lg w-full max-w-lg"
//             />
//           </div>
//           <div className="order-1 md:order-2">
//             <h3 className="text-4xl md:text-5xl font-bold mb-4 text-blue-800">
//               For Customers
//             </h3>
//             <p className="text-lg text-gray-700 mb-6">
//               Discover trusted messes around you and subscribe on the web. No
//               app, no hassle — just great meals.
//             </p>
//             <ul className="list-disc pl-5 text-gray-700 space-y-2">
//               <li>Find verified messes nearby</li>
//               <li>Transparent plan information</li>
//               <li>Secure subscription flow</li>
//               <li>Clear communication from owners</li>
//             </ul>
//             <button
//               onClick={() => navigate("/login")}
//               className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-orange-400 transition font-semibold"
//             >
//               Explore on Web
//             </button>
//           </div>
//         </div>
//       </section>

//       <hr className="my-12 border-gray-200" />


//       {/* FAQ (kept similar) */}
//       <section id="faq" className="bg-white py-16 px-6">
//         <div className="max-w-4xl mx-auto">
//           <h3 className="text-4xl md:text-5xl font-bold mb-10 text-center text-blue-900">
//             Frequently Asked Questions
//           </h3>
//           <div className="space-y-6">
//             {[
//               {
//                 q: "mealex mess owners ke liye kaise kaam karta hai?",
//                 a: "mealex aapko web par digital presence, guided KYC, plan publishing aur customer subscriptions manage karne mein madad karta hai.",
//               },
//               {
//                 q: "Kya online payments available hain?",
//                 a: "Online payments jald aa rahe hain. Tab tak aap sign-ups collect karke customers ko onboard kar sakte hain.",
//               },
//               {
//                 q: "Regional language support?",
//                 a: "Haan, multi-language support roadmap mein hai. Rollout ke saath hum announce karenge.",
//               },
//               {
//                 q: "Data security kaisi hai?",
//                 a: "Bank & KYC details industry-standard practices se handle ki jati hain. Security aur privacy hamari priority hai.",
//               },
//             ].map((f, i) => (
//               <FAQItem key={i} question={f.q} answer={f.a} />
//             ))}
//           </div>
//         </div>
//       </section>

//       <hr className="my-12 border-gray-200" />

//       {/* Contact */}
//       <section id="contact" className="bg-gray-50 py-16 px-6">
//         <div className="max-w-4xl mx-auto text-center">
//           <h3 className="text-4xl md:text-5xl font-bold mb-8 text-green-800">
//             Get in Touch
//           </h3>
//         </div>

//         <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100">
//           <form className="space-y-6">
//             <div>
//               <label className="block text-left text-gray-700 text-lg font-medium mb-2">Your Name</label>
//               <input
//                 type="text"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//                 placeholder="Enter your name"
//               />
//             </div>
//             <div>
//               <label className="block text-left text-gray-700 text-lg font-medium mb-2">Your Email</label>
//               <input
//                 type="email"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//                 placeholder="Enter your email"
//               />
//             </div>
//             <div>
//               <label className="block text-left text-gray-700 text-lg font-medium mb-2">Your Message</label>
//               <textarea
//                 rows="5"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//                 placeholder="Tell us about your needs..."
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-blue-800 transition shadow-md"
//             >
//               Send Message
//             </button>
//           </form>
//           <div className="mt-8 text-gray-600 text-left">
//             <p className="mb-2 flex items-center gap-2">
//               <span>☎️</span> Phone: +91 98765 43210
//             </p>
//             <p className="flex items-center gap-2">
//               <span>✉️</span> Email: info@mealex.in
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-blue-900 text-white py-12 px-6">
//         <div className="max-w-6xl mx-auto text-center md:flex md:justify-between md:items-center">
//           <div className="mb-6 md:mb-0">
//             <h3 className="text-3xl font-bold text-white mb-2">
//               <span className="text-orange-500">MEA</span>LEX
//             </h3>
//             <p className="text-gray-300">&copy; {new Date().getFullYear()} mealex. All rights reserved.</p>
//           </div>

//           <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-lg mb-6 md:mb-0">
//             <button onClick={() => scrollToSection("about")} className="hover:text-orange-400 transition">About</button>
//             <button onClick={() => scrollToSection("features")} className="hover:text-orange-400 transition">Features</button>
//             <button onClick={() => scrollToSection("faq")} className="hover:text-orange-400 transition">FAQ</button>
//             <button onClick={() => scrollToSection("contact")} className="hover:text-orange-400 transition">Contact</button>
//             <button               onClick={() => navigate("/privacy-policies")}
// className="hover:text-orange-400 transition">Privacy Policy</button>



//           </div>

//           <div className="flex justify-center md:justify-end space-x-6 text-2xl">
//             <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-orange-400 transition">ⓕ</a>
//             <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-orange-400 transition">𝕏</a>
//             <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-orange-400 transition">in</a>
//             <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-orange-400 transition">◎</a>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

// /* —————— Small UI Components —————— */

// function FAQItem({ question, answer }) {
//   const [isOpen, setIsOpen] = useState(false);
//   return (
//     <div className="border border-gray-200 rounded-lg shadow-sm bg-white">
//       <button
//         className="flex justify-between items-center w-full p-6 text-left font-semibold text-lg text-gray-800"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <span>{question}</span>
//         <span
//           className={`text-blue-600 text-2xl transform transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
//         >
//           ▼
//         </span>
//       </button>
//       {isOpen && <p className="px-6 pb-6 text-gray-600 leading-relaxed">{answer}</p>}
//     </div>
//   );
// }

// function CardStep({ step, title, desc, theme = "owner" }) {
//   const isOwner = theme === "owner";
//   return (
//     <div className="bg-gray-50 p-6 rounded-xl shadow-md border border-gray-100 text-center hover:shadow-lg transition">
//       <div
//         className={`${
//           isOwner ? "bg-orange-500" : "bg-green-500"
//         } text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold mb-4 mx-auto`}
//       >
//         {step}
//       </div>
//       <h5 className="text-xl font-semibold text-blue-900 mb-2">{title}</h5>
//       <p className="text-gray-700 text-sm">{desc}</p>
//     </div>
//   );
// }

// function ReviewCard({ name, comment, rating }) {
//   return (
//     <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center text-center hover:shadow-xl transition">
//       <div className="flex text-yellow-400 text-xl mb-4">
//         {Array.from({ length: rating }).map((_, i) => (
//           <span key={i}>★</span>
//         ))}
//         {Array.from({ length: 5 - rating }).map((_, i) => (
//           <span key={i} className="text-gray-300">
//             ★
//           </span>
//         ))}
//       </div>
//       <p className="italic text-gray-700 mb-4">"{comment}"</p>
//       <p className="font-semibold text-blue-900">- {name}</p>
//     </div>
//   );
// }



// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import logo from "../assets/mealx.png";
// // import cdash from "../assets/cdashboard.png";
// // import odash from "../assets/odashboard.png";

// // export default function LandingPage() {
// //   const navigate = useNavigate();
// //   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

// //   const scrollToSection = (id) => {
// //     const el = document.getElementById(id);
// //     if (el) {
// //       el.scrollIntoView({ behavior: "smooth" });
// //       setIsMobileMenuOpen(false);
// //     }
// //   };

// //   const NavLinks = () => (
// //     <>
// //       <button onClick={() => scrollToSection("features")} className="hover:text-orange-600 transition">Features</button>
// //       <button onClick={() => scrollToSection("long-description")} className="hover:text-orange-600 transition">About MealEx</button>
// //       <button onClick={() => scrollToSection("faq")} className="hover:text-orange-600 transition">FAQ</button>
// //       <button onClick={() => scrollToSection("contact")} className="hover:text-orange-600 transition">Contact</button>
// //     </>
// //   );

// //   return (
// //     <div className="font-sans bg-white text-gray-800 scroll-smooth">
// //       {/* Navbar */}
// //       <header className="flex justify-between items-center px-6 md:px-8 py-4 md:py-6 shadow-md sticky top-0 z-50 bg-white">
// //         <img src={logo} alt="MealEx Logo" className="h-12" />

// //         <nav className="hidden md:flex items-center gap-6 font-medium">
// //           <NavLinks />
// //           <button
// //             onClick={() => navigate("/login")}
// //             className="py-2.5 px-4 bg-[#3A5B76] text-white rounded-lg hover:bg-[#2E4A5D] transition"
// //           >
// //             Login
// //           </button>
// //           <button
// //             onClick={() => navigate("/login", { state: "register" })}
// //             className="py-2.5 px-4 border border-[#3A5B76] text-[#3A5B76] rounded-lg hover:bg-[#f1f5f9] transition"
// //           >
// //             Sign Up
// //           </button>
// //         </nav>

// //         <div className="md:hidden flex items-center gap-3">
// //           <button
// //             onClick={() => navigate("/login")}
// //             className="bg-[#3A5B76] text-white text-sm font-medium px-3.5 py-2 rounded-lg hover:bg-[#2E4A5D] transition"
// //           >
// //             Login
// //           </button>
// //           <button
// //             onClick={() => navigate("/login", { state: "register" })}
// //             className="border border-[#3A5B76] text-[#3A5B76] text-sm font-medium px-3.5 py-2 rounded-lg hover:bg-[#f1f5f9] transition"
// //           >
// //             Sign Up
// //           </button>
// //           <button
// //             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
// //             className="text-gray-800 text-2xl p-2 rounded-md hover:bg-gray-100 transition"
// //             aria-label="Toggle Menu"
// //           >
// //             ☰
// //           </button>
// //         </div>

// //         {isMobileMenuOpen && (
// //           <div className="fixed inset-y-0 right-0 w-72 bg-white shadow-xl z-50 flex flex-col pt-20 px-6 md:hidden">
// //             <button
// //               onClick={() => setIsMobileMenuOpen(false)}
// //               className="absolute top-4 right-4 text-gray-800 text-3xl p-2 rounded-md hover:bg-gray-100 transition"
// //               aria-label="Close Menu"
// //             >
// //               &times;
// //             </button>
// //             <nav className="flex flex-col gap-5 font-medium text-lg">
// //               <NavLinks />
// //             </nav>
// //           </div>
// //         )}
// //       </header>

// //       {/* Hero Section */}
// //       <section className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 md:px-10 py-16 md:py-20 bg-gradient-to-br from-orange-50 to-green-100">
// //         <div className="lg:w-1/2 text-center lg:text-left mt-10 lg:mt-0">
// //           <h2 className="text-5xl md:text-6xl font-extrabold text-green-900 mb-5 leading-tight">
// //             MealEx
// //           </h2>
// //           <p className="text-lg md:text-xl mb-8 text-gray-700 max-w-xl mx-auto lg:mx-0">
// //             Meal app to manage, redeem & track meals for customers and providers
// //           </p>
// //           <a
// //             href="https://play.google.com/store/apps/details?id=com.mealex&hl=en"
// //             target="_blank"
// //             rel="noreferrer"
// //             className="inline-block px-6 py-3 rounded-lg shadow-lg bg-green-700 text-white hover:bg-green-600 transition font-semibold"
// //           >
// //             Install from Play Store
// //           </a>
// //         </div>

// //         <div className="lg:w-1/2 mb-10 lg:mb-0 flex justify-center">
// //           <img
// //             src={odash}
// //             alt="MealEx App Preview"
// //             className="w-full max-w-xl rounded-xl shadow-2xl"
// //           />
// //         </div>
// //       </section>

// //       {/* Long Description */}
// //       <section id="long-description" className="bg-white py-16 px-6">
// //         <div className="max-w-5xl mx-auto space-y-10">
// //           <p className="text-gray-700 whitespace-pre-line">{`MealEx is a smart digital meal app designed for both customers and providers. Whether you’re a student dining at a mess or hostel canteen, a professional depending on a tiffin service, or a provider managing multiple messes, MealEx makes meal management simple, cashless, and transparent.`}</p>

// //           <h3 className="text-3xl font-bold text-green-800">For Customers</h3>
// //           <p className="text-gray-700 whitespace-pre-line">{`With MealEx, dining becomes simple, flexible, and cashless:
// // • Search mess halls, tiffin services, or canteens in your area
// // • View meal plans from different providers with clear pricing and details
// // • Buy tokens and plans online securely through the app
// // • Track your active plans and remaining tokens in one place
// // • Get notifications before your plan or tokens expire, so you never miss a meal
// // • Redeem tokens via the app instantly – no cash, no paper slips

// // MealEx gives customers choice, convenience, and peace of mind, ensuring every meal is easy to buy, easy to track, and impossible to miss.`}</p>

// //           <h3 className="text-3xl font-bold text-orange-600">For Providers</h3>
// //           <p className="text-gray-700 whitespace-pre-line">{`MealEx isn’t just for diners — it empowers mess owners, tiffin services, and canteen operators to grow their business with ease:
// // • List your meal plans online so customers in your area can easily discover and subscribe
// // • Receive payments digitally — no cash handling, no manual records
// // • Accept and redeem tokens instantly via the app, reducing errors and fraud
// // • Track redemptions, sales, and balances in real time
// // • Manage multiple mess locations or branches together in one app
// // • Use the same app as customers with the same login — no separate provider app needed
// // • Gain insights into customer demand to plan meals and reduce waste
// // • Send reminders or promotions to customers to boost engagement and renewals

// // MealEx gives providers a digital storefront + multi-mess management dashboard, all inside the same app customers use — making it simple to manage, serve, and grow.`}</p>

// //           <h3 className="text-3xl font-bold text-blue-900">Why MealEx?</h3>
// //           <p className="text-gray-700 whitespace-pre-line">{`• Cashless: Fully digital tokens, no paper or manual hassles
// // • Transparent: Real-time tracking for both customers and providers
// // • Simple: Easy for students, employees, and food vendors alike
// // • Scalable: Works for hostel mess halls, corporate canteens, and local tiffin services`}</p>

// //           <h3 className="text-3xl font-bold text-green-800">Who Can Use MealEx?</h3>
// //           <p className="text-gray-700 whitespace-pre-line">{`• Students in colleges, hostels, and universities
// // • Professionals relying on tiffin or canteen services
// // • Mess owners, tiffin providers, and canteen operators managing single or multiple outlets`}</p>

// //           <h3 className="text-3xl font-bold text-orange-600">The MealEx Promise</h3>
// //           <p className="text-gray-700 whitespace-pre-line">{`MealEx is more than an app — it’s a digital dining ecosystem. By offering low commission fees and transparent reporting, it helps providers grow while giving customers a seamless dining experience.

// // MealEx: Bharat ke rang, thali ke sang.
// // Dining, Simplified for All.`}</p>
// //         </div>
// //       </section>

// //       {/* Footer */}
// //       <footer className="bg-blue-900 text-white py-12 px-6 text-center">
// //         <p>&copy; {new Date().getFullYear()} MealEx. All rights reserved.</p>
// //       </footer>
// //     </div>
// //   );
// // }

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import cdash from "../assets/cdashboard.png";
// import odash from "../assets/odashboard.png";
// import logo from "../assets/mealx.png";

// export default function LandingPage() {
//   const navigate = useNavigate();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const scrollToSection = (id) => {
//     const el = document.getElementById(id);
//     if (el) {
//       el.scrollIntoView({ behavior: "smooth" });
//       setIsMobileMenuOpen(false);
//     }
//   };

//   const NavLinks = () => (
//     <>
//       <button onClick={() => scrollToSection("about")} className="hover:text-orange-600 transition">About</button>
//       <button onClick={() => scrollToSection("features")} className="hover:text-orange-600 transition">Features</button>
//       <button onClick={() => scrollToSection("owners")} className="hover:text-orange-600 transition">Mess Owners</button>
//       <button onClick={() => scrollToSection("customers")} className="hover:text-orange-600 transition">Customers</button>
//       <button onClick={() => scrollToSection("how-it-works")} className="hover:text-orange-600 transition">How It Works</button>
//       <button onClick={() => scrollToSection("faq")} className="hover:text-orange-600 transition">FAQ</button>
//       <button onClick={() => scrollToSection("contact")} className="hover:text-orange-600 transition">Contact</button>
//     </>
//   );

//   return (
//     <div className="font-sans bg-white text-gray-800 scroll-smooth">
//       <header className="flex justify-between items-center px-6 md:px-8 py-4 md:py-6 shadow-md sticky top-0 z-50 bg-white">
//         <div className="flex items-center gap-3">
//           <img src={logo} alt="MealEx Logo" className="h-10" />
          
//         </div>

//         <nav className="hidden md:flex items-center gap-6 font-medium">
//           <NavLinks />
//           <div className="h-6 w-px bg-gray-200 mx-2" />
//           <button onClick={() => navigate("/login")} className="py-2.5 px-4 bg-[#3A5B76] text-white rounded-lg hover:bg-[#2E4A5D] transition">Login</button>
//           <button onClick={() => navigate("/login", { state: "register" })} className="py-2.5 px-4 border border-[#3A5B76] text-[#3A5B76] rounded-lg hover:bg-[#f1f5f9] transition">Sign Up</button>
//         </nav>

//         <div className="md:hidden flex items-center gap-3">
//           <button onClick={() => navigate("/login")} className="bg-[#3A5B76] text-white text-sm font-medium px-3.5 py-2 rounded-lg hover:bg-[#2E4A5D] transition">Login</button>
//           <button onClick={() => navigate("/login", { state: "register" })} className="border border-[#3A5B76] text-[#3A5B76] text-sm font-medium px-3.5 py-2 rounded-lg hover:bg-[#f1f5f9] transition">Sign Up</button>
//           <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-800 text-2xl p-2 rounded-md hover:bg-gray-100 transition" aria-label="Toggle Menu">☰</button>
//         </div>

//         {isMobileMenuOpen && (
//           <div className="fixed inset-y-0 right-0 w-72 bg-white shadow-xl z-50 flex flex-col pt-20 px-6 md:hidden">
//             <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-4 right-4 text-gray-800 text-3xl p-2 rounded-md hover:bg-gray-100 transition" aria-label="Close Menu">&times;</button>
//             <nav className="flex flex-col gap-5 font-medium text-lg">
//               <NavLinks />
//             </nav>
//           </div>
//         )}
//       </header>

//       <section className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 md:px-10 py-16 md:py-20 bg-gradient-to-br from-orange-50 to-green-100">
//         <div className="lg:w-1/2 text-center lg:text-left mt-10 lg:mt-0">
//           {/* <h2 className="text-5xl md:text-6xl font-extrabold text-green-900 mb-5 leading-tight">MealEx</h2> */}
//                     <img src={logo} alt="MealEx Logo" className="h-10 mb-5 " />

//           <p className="text-lg md:text-xl mb-6 text-gray-700 max-w-xl mx-auto lg:mx-0">Meal app to manage, redeem & track meals for customers and providers</p>
//           <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3">
//             <a href="https://play.google.com/store/apps/details?id=com.mealex&hl=en" target="_blank" rel="noreferrer" className="inline-block px-6 py-3 rounded-lg shadow-lg bg-green-700 text-white hover:bg-green-600 transition font-semibold">Install from Play Store</a>
//             <button onClick={() => navigate("/login", { state: "register" })} className="px-6 py-3 rounded-lg shadow-lg bg-blue-900 text-white hover:bg-blue-800 transition">Get Started (Free)</button>
//           </div>
//         </div>
//         <div className="lg:w-1/2 mb-10 lg:mb-0 flex justify-center">
//           <img src={odash} alt="MealEx App Preview" className="w-full max-w-xl rounded-xl shadow-2xl" />
//         </div>
//       </section>

//       <section id="long-description" className="bg-white py-16 px-6">
//         <div className="max-w-5xl mx-auto space-y-10">
//           <p className="text-gray-700 whitespace-pre-line">{`MealEx is a smart digital meal app designed for both customers and providers. Whether you’re a student dining at a mess or hostel canteen, a professional depending on a tiffin service, or a provider managing multiple messes, MealEx makes meal management simple, cashless, and transparent.`}</p>

//           <h3 className="text-3xl font-bold text-green-800">For Customers</h3>
//           <p className="text-gray-700 whitespace-pre-line">{`With MealEx, dining becomes simple, flexible, and cashless:
// • Search mess halls, tiffin services, or canteens in your area
// • View meal plans from different providers with clear pricing and details
// • Buy tokens and plans online securely through the app
// • Track your active plans and remaining tokens in one place
// • Get notifications before your plan or tokens expire, so you never miss a meal
// • Redeem tokens via the app instantly – no cash, no paper slips

// MealEx gives customers choice, convenience, and peace of mind, ensuring every meal is easy to buy, easy to track, and impossible to miss.`}</p>

//           <h3 className="text-3xl font-bold text-orange-600">For Providers</h3>
//           <p className="text-gray-700 whitespace-pre-line">{`MealEx isn’t just for diners — it empowers mess owners, tiffin services, and canteen operators to grow their business with ease:
// • List your meal plans online so customers in your area can easily discover and subscribe
// • Receive payments digitally — no cash handling, no manual records
// • Accept and redeem tokens instantly via the app, reducing errors and fraud
// • Track redemptions, sales, and balances in real time
// • Manage multiple mess locations or branches together in one app
// • Use the same app as customers with the same login — no separate provider app needed
// • Gain insights into customer demand to plan meals and reduce waste
// • Send reminders or promotions to customers to boost engagement and renewals

// MealEx gives providers a digital storefront + multi-mess management dashboard, all inside the same app customers use — making it simple to manage, serve, and grow.`}</p>

//           <h3 className="text-3xl font-bold text-blue-900">Why MealEx?</h3>
//           <p className="text-gray-700 whitespace-pre-line">{`• Cashless: Fully digital tokens, no paper or manual hassles
// • Transparent: Real-time tracking for both customers and providers
// • Simple: Easy for students, employees, and food vendors alike
// • Scalable: Works for hostel mess halls, corporate canteens, and local tiffin services`}</p>

//           <h3 className="text-3xl font-bold text-green-800">Who Can Use MealEx?</h3>
//           <p className="text-gray-700 whitespace-pre-line">{`• Students in colleges, hostels, and universities
// • Professionals relying on tiffin or canteen services
// • Mess owners, tiffin providers, and canteen operators managing single or multiple outlets`}</p>

//           <h3 className="text-3xl font-bold text-orange-600">The MealEx Promise</h3>
//           <p className="text-gray-700 whitespace-pre-line">{`MealEx is more than an app — it’s a digital dining ecosystem. By offering low commission fees and transparent reporting, it helps providers grow while giving customers a seamless dining experience.

// MealEx: Bharat ke rang, thali ke sang.
// Dining, Simplified for All.`}</p>
//         </div>
//       </section>

//       <section className="bg-white py-20 px-6">
//         <div className="max-w-5xl mx-auto text-center">
//           <h3 className="text-4xl md:text-5xl font-bold mb-6 text-orange-600">Why Choose MealEX?</h3>
//           <p className="text-lg text-gray-700 mb-12">Compare traditional mess management with the MealEX way.</p>
//           <div className="grid md:grid-cols-2 gap-8">
//             <div className="bg-red-50 p-8 rounded-xl shadow-md">
//               <h4 className="font-bold text-red-600 text-2xl mb-4">Without MealEX</h4>
//               <ul className="text-gray-700 space-y-3">
//                 <li>📒 Manual ledger & cash handling</li>
//                 <li>📞 Customers call daily for updates</li>
//                 <li>🤝 Settlements delayed, no transparency</li>
//               </ul>
//             </div>
//             <div className="bg-green-50 p-8 rounded-xl shadow-md">
//               <h4 className="font-bold text-green-600 text-2xl mb-4">With MealEX</h4>
//               <ul className="text-gray-700 space-y-3">
//                 <li>💻 Dashboard for plans, tokens & customers</li>
//                 <li>📱 Customers self-manage via web & app</li>
//                 <li>⚡ Fast payouts & secure tracking</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </section>


// this is also good 


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import cdash from "../assets/cdashboard.png";
// import odash from "../assets/odashboard.png";
// import logo from "../assets/mealx.png";

// export default function LandingPage() {
//   const navigate = useNavigate();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const scrollToSection = (id) => {
//     const el = document.getElementById(id);
//     if (el) {
//       el.scrollIntoView({ behavior: "smooth" });
//       setIsMobileMenuOpen(false);
//     }
//   };

//   const NavLinks = () => (
//     <>
//       <button onClick={() => scrollToSection("about")} className="hover:text-orange-600 transition">About</button>
//       <button onClick={() => scrollToSection("features")} className="hover:text-orange-600 transition">Features</button>
//       <button onClick={() => scrollToSection("owners")} className="hover:text-orange-600 transition">Mess Owners</button>
//       <button onClick={() => scrollToSection("customers")} className="hover:text-orange-600 transition">Customers</button>
//       <button onClick={() => scrollToSection("how-it-works")} className="hover:text-orange-600 transition">How It Works</button>
//       <button onClick={() => scrollToSection("faq")} className="hover:text-orange-600 transition">FAQ</button>
//       <button onClick={() => scrollToSection("contact")} className="hover:text-orange-600 transition">Contact</button>
//     </>
//   );

//   return (
//     <div className="font-sans bg-white text-gray-800 scroll-smooth">
//       {/* Header */}
//       <header className="flex justify-between items-center px-6 md:px-8 py-4 md:py-6 shadow-md sticky top-0 z-50 bg-white">
//         <div className="flex items-center gap-3">
//           <img src={logo} alt="MealEx Logo" className="h-10" />
//         </div>

//         <nav className="hidden md:flex items-center gap-6 font-medium">
//           <NavLinks />
//           <div className="h-6 w-px bg-gray-200 mx-2" />
//           <button onClick={() => navigate("/login")} className="py-2.5 px-4 bg-[#3A5B76] text-white rounded-lg hover:bg-[#2E4A5D] transition">Login</button>
//           <button onClick={() => navigate("/login", { state: "register" })} className="py-2.5 px-4 border border-[#3A5B76] text-[#3A5B76] rounded-lg hover:bg-[#f1f5f9] transition">Sign Up</button>
//         </nav>

//         {/* Mobile menu */}
//         <div className="md:hidden flex items-center gap-3">
//           <button onClick={() => navigate("/login")} className="bg-[#3A5B76] text-white text-sm font-medium px-3.5 py-2 rounded-lg hover:bg-[#2E4A5D] transition">Login</button>
//           <button onClick={() => navigate("/login", { state: "register" })} className="border border-[#3A5B76] text-[#3A5B76] text-sm font-medium px-3.5 py-2 rounded-lg hover:bg-[#f1f5f9] transition">Sign Up</button>
//           <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-800 text-2xl p-2 rounded-md hover:bg-gray-100 transition" aria-label="Toggle Menu">☰</button>
//         </div>

//         {isMobileMenuOpen && (
//           <div className="fixed inset-y-0 right-0 w-72 bg-white shadow-xl z-50 flex flex-col pt-20 px-6 md:hidden">
//             <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-4 right-4 text-gray-800 text-3xl p-2 rounded-md hover:bg-gray-100 transition" aria-label="Close Menu">&times;</button>
//             <nav className="flex flex-col gap-5 font-medium text-lg">
//               <NavLinks />
//             </nav>
//           </div>
//         )}
//       </header>

//       {/* Hero */}
//       <section className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 md:px-10 py-16 md:py-20 bg-gradient-to-br from-orange-50 to-green-100">
//         <div className="lg:w-1/2 text-center lg:text-left mt-10 lg:mt-0">
//           <img src={logo} alt="MealEx Logo" className="h-10 mb-5 " />
//           <p className="text-base text-gray-600 max-w-2xl mx-auto mb-6">
//   MealEx is a smart digital meal app designed for both customers and providers. 
//   Whether you’re a student dining at a mess or hostel canteen, a professional 
//   depending on a tiffin service, or a provider managing multiple messes, MealEx 
//   makes meal management simple, cashless, and transparent.
// </p>

//           <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3">
//             <a href="https://play.google.com/store/apps/details?id=com.mealex&hl=en" target="_blank" rel="noreferrer" className="inline-block px-6 py-3 rounded-lg shadow-lg bg-green-700 text-white hover:bg-green-600 transition font-semibold">
//               Install from Play Store
//             </a>
//             <button onClick={() => navigate("/login", { state: "register" })} className="px-6 py-3 rounded-lg shadow-lg bg-blue-900 text-white hover:bg-blue-800 transition">
//               Get Started (Free)
//             </button>
//           </div>
//         </div>
//         <div className="lg:w-1/2 mb-10 lg:mb-0 flex justify-center">
//           <img src={odash} alt="MealEx App Preview" className="w-full max-w-xl rounded-xl shadow-2xl" />
//         </div>
//       </section>


// {/* 
//       Why MealEx
//       <section className="bg-white py-20 px-6">
//         <div className="max-w-5xl mx-auto text-center">
//           <h3 className="text-4xl md:text-5xl font-bold mb-6 text-blue-900">Why MealEx?</h3>
//           <p className="text-lg text-gray-700 mb-12">Why choose MealEx over traditional mess management?</p>
//           <div className="grid md:grid-cols-2 gap-8">
//             <div className="bg-red-50 p-8 rounded-xl shadow-md">
//               <h4 className="font-bold text-red-600 text-2xl mb-4">Without MealEx</h4>
//               <ul className="text-gray-700 space-y-3">
//                 <li>📒 Manual ledger & cash handling</li>
//                 <li>📞 Customers call daily for updates</li>
//                 <li>🤝 Settlements delayed, no transparency</li>
//               </ul>
//             </div>
//             <div className="bg-green-50 p-8 rounded-xl shadow-md">
//               <h4 className="font-bold text-green-600 text-2xl mb-4">With MealEx</h4>
//               <ul className="text-gray-700 space-y-3">
//                 <li>💻 Dashboard for plans, tokens & customers</li>
//                 <li>📱 Customers self-manage via app</li>
//                 <li>⚡ Fast payouts & secure tracking</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </section> */}
//         <section className="bg-white py-20 px-6">
//         <div className="max-w-5xl mx-auto text-center">
//           <h3 className="text-4xl md:text-5xl font-bold mb-6 text-blue-900">Why MealEx?</h3>
//           <p className="text-lg text-gray-700 mb-12">Why choose MealEx over traditional mess management?</p>
//           <div className="grid md:grid-cols-2 gap-8 mb-12">
//             <div className="bg-red-50 p-8 rounded-xl shadow-md">
//               <h4 className="font-bold text-red-600 text-2xl mb-4">Without MealEx</h4>
//               <ul className="text-gray-700 space-y-3">
//                 <li>📒 Manual ledger & cash handling</li>
//                 <li>📞 Customers call daily for updates</li>
//                 <li>🤝 Settlements delayed, no transparency</li>
//               </ul>
//             </div>
//             <div className="bg-green-50 p-8 rounded-xl shadow-md">
//               <h4 className="font-bold text-green-600 text-2xl mb-4">With MealEx</h4>
//               <ul className="text-gray-700 space-y-3">
//                 <li>💻 Dashboard for plans, tokens & customers</li>
//                 <li>📱 Customers self-manage via app</li>
//                 <li>⚡ Fast payouts & secure tracking</li>
//               </ul>
//             </div>
//           </div>
//           {/* Extra bullets from your description */}
//           <ul className="grid md:grid-cols-4 gap-6 text-lg font-medium text-gray-700">
//             <li>💳 <strong>Cashless:</strong> Fully digital tokens, no paper hassles</li>
//             <li>📊 <strong>Transparent:</strong> Real-time tracking for all</li>
//             <li>✅ <strong>Simple:</strong> Easy for students, employees & vendors</li>
//             <li>📈 <strong>Scalable:</strong> Works for mess halls, canteens, tiffin services</li>
//           </ul>
//         </div>
//       </section>

//       {/* Who Can Use */}
//       <section className="bg-gray-50 py-16 px-6">
//         <div className="max-w-5xl mx-auto text-center">
//           <h3 className="text-4xl md:text-5xl font-bold mb-6 text-green-800">Who Can Use MealEx?</h3>
//           <ul className="text-lg text-gray-700 space-y-3 max-w-3xl mx-auto">
//             <li>• Students in colleges, hostels, and universities</li>
//             <li>• Professionals relying on tiffin or canteen services</li>
//             <li>• Mess owners & canteen operators managing outlets</li>
//           </ul>
//         </div>
//       </section>

//       {/* Promise */}
//       <section className="bg-white py-16 px-6">
//         <div className="max-w-5xl mx-auto text-center">
//           <h3 className="text-4xl md:text-5xl font-bold mb-6 text-orange-600">The MealEx Promise</h3>
//           <p className="text-lg text-gray-700 max-w-3xl mx-auto">
//             MealEx is more than an app — it’s a digital dining ecosystem. By offering low commission fees and transparent reporting, it helps providers grow while giving customers a seamless dining experience.  
//             <br /><br />
//             <strong>MealEx: Bharat ke rang, thali ke sang.</strong><br />
//             Dining, Simplified for All.
//           </p>
//         </div>
//       </section>

//       <section id="about" className="bg-white py-16 px-6">
//         <div className="max-w-5xl mx-auto text-center">
//           <h3 className="text-4xl md:text-5xl font-bold mb-6 text-blue-900">About <span className="text-orange-500">MEAL</span>EX</h3>
//           <p className="text-lg md:text-xl text-gray-700 leading-relaxed">mealex is a web-first platform to modernize Indian messes and tiffin services. We help owners build a digital presence, streamline KYC & bank onboarding, and (soon) accept secure online payments. Customers can easily find and subscribe to messes near them.</p>
//         </div>
//       </section>

//       <hr className="my-12 border-gray-200" />

//       <section id="features" className="bg-gray-50 py-16 px-6">
//         <div className="max-w-6xl mx-auto text-center">
//           <h3 className="text-4xl md:text-5xl font-bold mb-10 text-green-800">Key Features</h3>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[
//               { icon: "📍", title: "Mess Discovery", description: "Search and explore verified messes & tiffin services nearby with clear details and menus." },
//               { icon: "📝", title: "Simple Subscriptions", description: "Subscribe to a mess plan on the web. Transparent pricing and flexible durations." },
//               { icon: "✅", title: "Owner KYC Onboarding", description: "Guided, paperless KYC & bank setup for mess owners to start settlements quickly." },
//               { icon: "🔐", title: "Secure Payouts", description: "Bank details & settlements handled with industry-grade security." },
//               { icon: "📊", title: "Owner Dashboard", description: "Manage plans, customers, and settlements from a clean web dashboard." },
//               { icon: "⚡", title: "Online Payments", description: "Seamless online payments for subscriptions." },
//             ].map((f, i) => (
//               <div key={i} className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center text-center hover:shadow-xl transition">
//                 <div className="text-4xl mb-3">{f.icon}</div>
//                 <h4 className="text-2xl font-semibold text-blue-900 mb-2 flex items-center gap-2">{f.title}</h4>
//                 <p className="text-gray-700 text-base">{f.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <hr className="my-12 border-gray-200" />

//       <section id="how-it-works" className="bg-white py-16 px-6">
//         <div className="max-w-6xl mx-auto text-center">
//           <h3 className="text-4xl md:text-5xl font-bold mb-10 text-blue-900">How mealex Works</h3>

//           <div className="mb-16">
//             <h4 className="text-3xl font-bold text-green-800 mb-6">For Mess Owners</h4>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//               {[ { step: 1, title: "Register", desc: "Create your owner account on mealex." }, { step: 2, title: "Complete KYC", desc: "Finish web-based KYC & add bank details." }, { step: 3, title: "Publish Plans", desc: "Create subscription plans & go live." }, { step: 4, title: "Manage & Settle", desc: "Track subscriptions, settlements & growth." } ].map((s) => (
//                 <CardStep key={s.step} {...s} />
//               ))}
//             </div>
//           </div>

//           <div>
//             <h4 className="text-3xl font-bold text-orange-600 mb-6">For Customers</h4>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//               {[ { step: 1, title: "Explore", desc: "Find messes near you with transparent info." }, { step: 2, title: "Choose a Plan", desc: "Pick what fits your routine & budget." }, { step: 3, title: "Subscribe Online", desc: "Pay securely (online payments coming soon)." }, { step: 4, title: "Enjoy Your Meals", desc: "Simple, reliable, and organized dining." } ].map((s) => (
//                 <CardStep key={s.step} {...s} theme="customer" />
//               ))}
//             </div>
//           </div>
//                 {/* For Owners */}
//       <section id="owners" className="bg-white py-16 px-6">
//         <div className="max-w-5xl mx-auto text-center md:text-left grid md:grid-cols-2 gap-10 items-center">
//           <div>
//             <h3 className="text-4xl md:text-5xl font-bold mb-4 text-orange-600">For Mess Owners</h3>
//             <p className="text-lg text-gray-700 mb-6">
//               MealEx empowers mess owners, tiffin services, and canteen operators to grow their business with ease:
//             </p>
//             <ul className="list-disc pl-5 text-gray-700 space-y-2">
//               <li>List meal plans online so customers can easily subscribe</li>
//               <li>Receive digital payments — no cash handling</li>
//               <li>Accept & redeem tokens instantly via app</li>
//               <li>Track redemptions, sales & balances in real time</li>
//               <li>Manage multiple mess locations in one app</li>
//               <li>Gain insights to reduce waste & plan better</li>
//               <li>Send reminders/promotions to boost renewals</li>
//             </ul>
//             <div className="flex gap-3 mt-6">
//               <button onClick={() => navigate("/login", { state: "register" })} className="bg-green-700 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition font-semibold">Get Early Access</button>
//               <button onClick={() => scrollToSection("contact")} className="border border-green-700 text-green-700 px-6 py-3 rounded-lg hover:bg-green-50 transition font-semibold">Talk to Us</button>
//             </div>
//           </div>
//           <div className="flex justify-center">
//             <img src={odash} alt="mealex owner dashboard preview" className="rounded-xl shadow-lg w-full max-w-lg" />
//           </div>
//         </div>
//       </section>

//       {/* For Customers */}
//       <section id="customers" className="bg-gray-50 py-16 px-6">
//         <div className="max-w-5xl mx-auto text-center md:text-left grid md:grid-cols-2 gap-10 items-center">
//           <div className="flex justify-center order-2 md:order-1">
//             <img src={cdash} alt="mealex customer journey" className="rounded-xl shadow-lg w-full max-w-lg" />
//           </div>
//           <div className="order-1 md:order-2">
//             <h3 className="text-4xl md:text-5xl font-bold mb-4 text-blue-800">For Customers</h3>
//             <p className="text-lg text-gray-700 mb-6">
//               With MealEx, dining becomes simple, flexible, and cashless:
//             </p>
//             <ul className="list-disc pl-5 text-gray-700 space-y-2">
//               <li>Search mess halls, tiffin services, or canteens nearby</li>
//               <li>View meal plans with clear pricing & details</li>
//               <li>Buy tokens/plans online securely</li>
//               <li>Track active plans & remaining tokens easily</li>
//               <li>Get notifications before expiry</li>
//               <li>Redeem tokens instantly — no cash, no slips</li>
//             </ul>
//             <button onClick={() => navigate("/login")} className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-orange-400 transition font-semibold">Explore on Web</button>
//           </div>
//         </div>
//       </section>
//         </div>
//       </section>

//       <hr className="my-12 border-gray-200" />

//       {/* <section id="owners" className="bg-white py-16 px-6">
//         <div className="max-w-5xl mx-auto text-center md:text-left grid md:grid-cols-2 gap-10 items-center">
//           <div>
//             <h3 className="text-4xl md:text-5xl font-bold mb-4 text-orange-600">For Mess Owners</h3>
//             <p className="text-lg text-gray-700 mb-6">Bring your mess online with mealex. Publish plans, onboard customers, and manage settlements — all on the web.</p>
//             <ul className="list-disc pl-5 text-gray-700 space-y-2">
//               <li>Fast, guided KYC & bank setup</li>
//               <li>Plan & pricing management</li>
//               <li>Customer & subscription tracking</li>
//               <li>Settlement visibility</li>
//             </ul>
//             <div className="flex gap-3 mt-6">
//               <button onClick={() => navigate("/login", { state: "register" })} className="bg-green-700 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition font-semibold">Get Early Access</button>
//               <button onClick={() => scrollToSection("contact")} className="border border-green-700 text-green-700 px-6 py-3 rounded-lg hover:bg-green-50 transition font-semibold">Talk to Us</button>
//             </div>
//           </div>
//           <div className="flex justify-center">
//             <img src={odash} alt="mealex owner dashboard preview" className="rounded-xl shadow-lg w-full max-w-lg" />
//           </div>
//         </div>
//       </section>

//       <hr className="my-12 border-gray-200" />

//       <section id="customers" className="bg-gray-50 py-16 px-6">
//         <div className="max-w-5xl mx-auto text-center md:text-left grid md:grid-cols-2 gap-10 items-center">
//           <div className="flex justify-center order-2 md:order-1">
//             <img src={cdash} alt="mealex customer journey" className="rounded-xl shadow-lg w-full max-w-lg" />
//           </div>
//           <div className="order-1 md:order-2">
//             <h3 className="text-4xl md:text-5xl font-bold mb-4 text-blue-800">For Customers</h3>
//             <p className="text-lg text-gray-700 mb-6">Discover trusted messes around you and subscribe on the web. No app, no hassle — just great meals.</p>
//             <ul className="list-disc pl-5 text-gray-700 space-y-2">
//               <li>Find verified messes nearby</li>
//               <li>Transparent plan information</li>
//               <li>Secure subscription flow</li>
//               <li>Clear communication from owners</li>
//             </ul>
//             <button onClick={() => navigate("/login")} className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-orange-400 transition font-semibold">Explore on Web</button>
//           </div>
//         </div>
//       </section> */}

//       <hr className="my-12 border-gray-200" />

//       <section id="faq" className="bg-white py-16 px-6">
//         <div className="max-w-4xl mx-auto">
//           <h3 className="text-4xl md:text-5xl font-bold mb-10 text-center text-blue-900">Frequently Asked Questions</h3>
//           <div className="space-y-6">
//             {[ { q: "mealex mess owners ke liye kaise kaam karta hai?", a: "mealex aapko web par digital presence, guided KYC, plan publishing aur customer subscriptions manage karne mein madad karta hai." }, { q: "Kya online payments available hain?", a: "Online payments jald aa rahe hain. Tab tak aap sign-ups collect karke customers ko onboard kar sakte hain." }, { q: "Regional language support?", a: "Haan, multi-language support roadmap mein hai. Rollout ke saath hum announce karenge." }, { q: "Data security kaisi hai?", a: "Bank & KYC details industry-standard practices se handle ki jati hain. Security aur privacy hamari priority hai." } ].map((f, i) => (
//               <FAQItem key={i} question={f.q} answer={f.a} />
//             ))}
//           </div>
//         </div>
//       </section>

//       <hr className="my-12 border-gray-200" />

//       <section id="contact" className="bg-gray-50 py-16 px-6">
//         <div className="max-w-4xl mx-auto text-center">
//           <h3 className="text-4xl md:text-5xl font-bold mb-8 text-green-800">Get in Touch</h3>
//         </div>

//         <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100">
//           <form className="space-y-6">
//             <div>
//               <label className="block text-left text-gray-700 text-lg font-medium mb-2">Your Name</label>
//               <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" placeholder="Enter your name" />
//             </div>
//             <div>
//               <label className="block text-left text-gray-700 text-lg font-medium mb-2">Your Email</label>
//               <input type="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" placeholder="Enter your email" />
//             </div>
//             <div>
//               <label className="block text-left text-gray-700 text-lg font-medium mb-2">Your Message</label>
//               <textarea rows="5" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" placeholder="Tell us about your needs..." />
//             </div>
//             <button type="submit" className="w-full bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-blue-800 transition shadow-md">Send Message</button>
//           </form>
//           <div className="mt-8 text-gray-600 text-left">
//             <p className="mb-2 flex items-center gap-2"><span>☎️</span> Phone: +91 98765 43210</p>
//             <p className="flex items-center gap-2"><span>✉️</span> Email: info@mealex.in</p>
//           </div>
//         </div>
//       </section>

//       <footer className="bg-blue-900 text-white py-12 px-6">
//         <div className="max-w-6xl mx-auto text-center md:flex md:justify-between md:items-center">
//           <div className="mb-6 md:mb-0">
//             <h3 className="text-3xl font-bold text-white mb-2"><span className="text-orange-500">MEA</span>LEX</h3>
//             <p className="text-gray-300">&copy; {new Date().getFullYear()} mealex. All rights reserved.</p>
//           </div>

//           <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-lg mb-6 md:mb-0">
//             <button onClick={() => scrollToSection("about")} className="hover:text-orange-400 transition">About</button>
//             <button onClick={() => scrollToSection("features")} className="hover:text-orange-400 transition">Features</button>
//             <button onClick={() => scrollToSection("faq")} className="hover:text-orange-400 transition">FAQ</button>
//             <button onClick={() => scrollToSection("contact")} className="hover:text-orange-400 transition">Contact</button>
//             <button onClick={() => navigate("/privacy-policies")} className="hover:text-orange-400 transition">Privacy Policy</button>
//           </div>

//           <div className="flex justify-center md:justify-end space-x-6 text-2xl">
//             <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-orange-400 transition">ⓕ</a>
//             <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-orange-400 transition">𝕏</a>
//             <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-orange-400 transition">in</a>
//             <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-orange-400 transition">◎</a>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

// function FAQItem({ question, answer }) {
//   const [isOpen, setIsOpen] = useState(false);
//   return (
//     <div className="border border-gray-200 rounded-lg shadow-sm bg-white">
//       <button className="flex justify-between items-center w-full p-6 text-left font-semibold text-lg text-gray-800" onClick={() => setIsOpen(!isOpen)}>
//         <span>{question}</span>
//         <span className={`text-blue-600 text-2xl transform transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}>▼</span>
//       </button>
//       {isOpen && <p className="px-6 pb-6 text-gray-600 leading-relaxed">{answer}</p>}
//     </div>
//   );
// }

// function CardStep({ step, title, desc, theme = "owner" }) {
//   const isOwner = theme === "owner";
//   return (
//     <div className="bg-gray-50 p-6 rounded-xl shadow-md border border-gray-100 text-center hover:shadow-lg transition">
//       <div className={`${isOwner ? "bg-orange-500" : "bg-green-500"} text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold mb-4 mx-auto`}>{step}</div>
//       <h5 className="text-xl font-semibold text-blue-900 mb-2">{title}</h5>
//       <p className="text-gray-700 text-sm">{desc}</p>
//     </div>
//   );
// }

// function ReviewCard({ name, comment, rating }) {
//   return (
//     <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center text-center hover:shadow-xl transition">
//       <div className="flex text-yellow-400 text-xl mb-4">
//         {Array.from({ length: rating }).map((_, i) => (
//           <span key={i}>★</span>
//         ))}
//         {Array.from({ length: 5 - rating }).map((_, i) => (
//           <span key={i} className="text-gray-300">★</span>
//         ))}
//       </div>
//       <p className="italic text-gray-700 mb-4">"{comment}"</p>
//       <p className="font-semibold text-blue-900">- {name}</p>
//     </div>
//   );
// }


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import cdash from "../assets/cdashboard.png";
// import odash from "../assets/odashboard.png";
// import logo from "../assets/mealx.png";

// export default function LandingPage() {
//   const navigate = useNavigate();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const scrollToSection = (id) => {
//     const el = document.getElementById(id);
//     if (el) {
//       el.scrollIntoView({ behavior: "smooth" });
//       setIsMobileMenuOpen(false);
//     }
//   };

//   const NavLinks = () => (
//     <>
//       <button onClick={() => scrollToSection("about")} className="hover:text-orange-600 transition">About</button>
//       <button onClick={() => scrollToSection("features")} className="hover:text-orange-600 transition">Features</button>
//       <button onClick={() => scrollToSection("owners")} className="hover:text-orange-600 transition">Mess Owners</button>
//       <button onClick={() => scrollToSection("customers")} className="hover:text-orange-600 transition">Customers</button>
//       <button onClick={() => scrollToSection("how-it-works")} className="hover:text-orange-600 transition">How It Works</button>
//       <button onClick={() => scrollToSection("faq")} className="hover:text-orange-600 transition">FAQ</button>
//       <button onClick={() => scrollToSection("contact")} className="hover:text-orange-600 transition">Contact</button>
//     </>
//   );

//   return (
//     <div className="font-sans bg-white text-gray-800 scroll-smooth">

//       {/* HEADER */}
//       <header className="flex justify-between items-center px-6 md:px-8 py-4 md:py-6 shadow-md sticky top-0 z-50 bg-white">
//         <div className="flex items-center gap-3">
//           <img src={logo} alt="MealEx Logo" className="h-10" />
//         </div>

//         <nav className="hidden md:flex items-center gap-6 font-medium">
//           <NavLinks />
//           <div className="h-6 w-px bg-gray-200 mx-2" />
//           <button onClick={() => navigate("/login")} className="py-2.5 px-4 bg-[#3A5B76] text-white rounded-lg hover:bg-[#2E4A5D] transition">Login</button>
//           <button onClick={() => navigate("/login", { state: "register" })} className="py-2.5 px-4 border border-[#3A5B76] text-[#3A5B76] rounded-lg hover:bg-[#f1f5f9] transition">Sign Up</button>
//         </nav>

//         {/* Mobile Menu */}
//         <div className="md:hidden flex items-center gap-3">
//           <button onClick={() => navigate("/login")} className="bg-[#3A5B76] text-white text-sm font-medium px-3.5 py-2 rounded-lg hover:bg-[#2E4A5D] transition">Login</button>
//           <button onClick={() => navigate("/login", { state: "register" })} className="border border-[#3A5B76] text-[#3A5B76] text-sm font-medium px-3.5 py-2 rounded-lg hover:bg-[#f1f5f9] transition">Sign Up</button>
//           <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-800 text-2xl p-2 rounded-md hover:bg-gray-100 transition" aria-label="Toggle Menu">☰</button>
//         </div>

//         {isMobileMenuOpen && (
//           <div className="fixed inset-y-0 right-0 w-72 bg-white shadow-xl z-50 flex flex-col pt-20 px-6 md:hidden">
//             <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-4 right-4 text-gray-800 text-3xl p-2 rounded-md hover:bg-gray-100 transition" aria-label="Close Menu">&times;</button>
//             <nav className="flex flex-col gap-5 font-medium text-lg">
//               <NavLinks />
//             </nav>
//           </div>
//         )}
//       </header>

//       {/* HERO */}
//       <section className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 md:px-10 py-16 md:py-20 bg-gradient-to-br from-orange-50 to-green-100">
//         <div className="lg:w-1/2 text-center lg:text-left mt-10 lg:mt-0">
//           <img src={logo} alt="MealEx Logo" className="h-10 mb-5 " />
//           <p className="text-lg md:text-xl mb-6 text-gray-700 max-w-xl mx-auto lg:mx-0">Meal app to manage, redeem & track meals for customers and providers</p>
//           <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3">
//             <a href="https://play.google.com/store/apps/details?id=com.mealex&hl=en" target="_blank" rel="noreferrer" className="inline-block px-6 py-3 rounded-lg shadow-lg bg-green-700 text-white hover:bg-green-600 transition font-semibold">Install from Play Store</a>
//             <button onClick={() => navigate("/login", { state: "register" })} className="px-6 py-3 rounded-lg shadow-lg bg-blue-900 text-white hover:bg-blue-800 transition">Get Started (Free)</button>
//           </div>
//         </div>
//         <div className="lg:w-1/2 mb-10 lg:mb-0 flex justify-center">
//           <img src={odash} alt="MealEx App Preview" className="w-full max-w-xl rounded-xl shadow-2xl" />
//         </div>
//       </section>

//       {/* WHY MEALEX */}
//       <section className="bg-white py-20 px-6">
//         <div className="max-w-5xl mx-auto text-center">
//           <h3 className="text-4xl md:text-5xl font-bold mb-6 text-orange-600">Why Choose MealEX?</h3>
//           <p className="text-lg text-gray-700 mb-12">Compare traditional mess management with the MealEX way.</p>
//           <div className="grid md:grid-cols-2 gap-8">
//             <div className="bg-red-50 p-8 rounded-xl shadow-md">
//               <h4 className="font-bold text-red-600 text-2xl mb-4">Without MealEX</h4>
//               <ul className="text-gray-700 space-y-3">
//                 <li>📒 Manual ledger & cash handling</li>
//                 <li>📞 Customers call daily for updates</li>
//                 <li>🤝 Settlements delayed, no transparency</li>
//               </ul>
//             </div>
//             <div className="bg-green-50 p-8 rounded-xl shadow-md">
//               <h4 className="font-bold text-green-600 text-2xl mb-4">With MealEX</h4>
//               <ul className="text-gray-700 space-y-3">
//                 <li>💻 Dashboard for plans, tokens & customers</li>
//                 <li>📱 Customers self-manage via web & app</li>
//                 <li>⚡ Fast payouts & secure tracking</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* WHO CAN USE */}
//       <section id="who" className="bg-white py-16 px-6">
//         <div className="max-w-5xl mx-auto text-center">
//           <h3 className="text-4xl md:text-5xl font-bold mb-6 text-green-800">Who Can Use MealEx?</h3>
//           <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
//             • Students in colleges, hostels, and universities <br />
//             • Professionals relying on tiffin or canteen services <br />
//             • Mess owners, tiffin providers, and canteen operators managing single or multiple outlets
//           </p>
//         </div>
//       </section>

//       {/* PROMISE */}
//       <section id="promise" className="bg-white py-16 px-6">
//         <div className="max-w-5xl mx-auto text-center">
//           <h3 className="text-4xl md:text-5xl font-bold mb-6 text-orange-600">The MealEx Promise</h3>
//           <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
//             MealEx is more than an app — it’s a digital dining ecosystem. By offering low commission fees and transparent reporting, it helps providers grow while giving customers a seamless dining experience.
//             <br /><br />
//             <b>MealEx: Bharat ke rang, thali ke sang. Dining, Simplified for All.</b>
//           </p>
//         </div>
//       </section>



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import cdash from "../assets/cdashboard.png";
import odash from "../assets/odashboard.png";
import logo from "../assets/mealx.png";

export default function LandingPage() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  return (
    <div className="font-sans bg-white text-gray-800 scroll-smooth">

      {/* HEADER */}
      <header className="flex justify-between items-center px-6 md:px-8 py-4 md:py-6 shadow-md sticky top-0 z-50 bg-white">
        <div className="flex items-center gap-3">
          <img src={logo} alt="MealEx Logo" className="h-10" />
        </div>

        <nav className="hidden md:flex items-center gap-6 font-medium">
          <NavLinks />
          <div className="h-6 w-px bg-gray-200 mx-2" />
          <button onClick={() => navigate("/login")} className="py-2.5 px-4 bg-[#3A5B76] text-white rounded-lg hover:bg-[#2E4A5D] transition">Login</button>
          <button onClick={() => navigate("/login", { state: "register" })} className="py-2.5 px-4 border border-[#3A5B76] text-[#3A5B76] rounded-lg hover:bg-[#f1f5f9] transition">Sign Up</button>
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-3">
          <button onClick={() => navigate("/login")} className="bg-[#3A5B76] text-white text-sm font-medium px-3.5 py-2 rounded-lg hover:bg-[#2E4A5D] transition">Login</button>
          <button onClick={() => navigate("/login", { state: "register" })} className="border border-[#3A5B76] text-[#3A5B76] text-sm font-medium px-3.5 py-2 rounded-lg hover:bg-[#f1f5f9] transition">Sign Up</button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-800 text-2xl p-2 rounded-md hover:bg-gray-100 transition" aria-label="Toggle Menu">☰</button>
        </div>

        {isMobileMenuOpen && (
          <div className="fixed inset-y-0 right-0 w-72 bg-white shadow-xl z-50 flex flex-col pt-20 px-6 md:hidden">
            <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-4 right-4 text-gray-800 text-3xl p-2 rounded-md hover:bg-gray-100 transition" aria-label="Close Menu">&times;</button>
            <nav className="flex flex-col gap-5 font-medium text-lg">
              <NavLinks />
            </nav>
          </div>
        )}
      </header>

{/*       
      <section className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 md:px-10 py-20 bg-gradient-to-br from-orange-50 to-green-50">
  <div className="lg:w-1/2 text-center lg:text-left mt-10 lg:mt-0">
    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
      MealEx – Smart Digital Meal Management
    </h1>
    <p className="text-lg md:text-xl text-gray-700 mb-6 max-w-xl mx-auto lg:mx-0">
      Manage, redeem & track meals for customers and providers effortlessly. Seamless, cashless, and transparent.
    </p>
    <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
      <a
        href="https://play.google.com/store/apps/details?id=com.mealex&hl=en"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center justify-center px-6 py-3 rounded-lg shadow-lg bg-green-500 text-white hover:bg-green-600 transition font-semibold text-lg gap-2"
      >
        <span className="text-xl">📲</span> 
        Install on Play Store
      </a>
      <button
        onClick={() => navigate("/login", { state: "register" })}
        className="inline-flex items-center justify-center px-6 py-3 rounded-lg shadow-lg bg-orange-500 text-white hover:bg-orange-600 transition font-semibold text-lg gap-2"
      >
        <span>Get Started (Free)</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </button>
    </div>
  </div>

  <div className="lg:w-1/2 mb-10 lg:mb-0 flex justify-center relative">
    <img src={odash} alt="MealEx App Preview" className="w-full max-w-xl rounded-2xl shadow-2xl z-10" />
    <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-orange-200 rounded-full opacity-50 blur-3xl z-0"></div>
    <div className="absolute -top-10 -left-10 w-32 h-32 bg-green-200 rounded-full opacity-50 blur-3xl z-0"></div>
  </div>
</section> */}

<section className="relative overflow-hidden bg-gradient-to-br from-orange-50 to-green-50 py-24 px-6 md:px-16">
  <div className="absolute -top-16 -left-16 w-64 h-64 bg-orange-200 rounded-full opacity-30 blur-3xl animate-pulse-slow z-0"></div>
  <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-green-200 rounded-full opacity-30 blur-3xl animate-pulse-slow z-0"></div>

  <div className="relative max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12">
    
    <div className="lg:w-1/2 text-center lg:text-left space-y-6 z-10">
      <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
        MealEx – <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-green-500">Smart Digital Meals</span>
      </h1>
      <p className="text-lg md:text-xl text-gray-700 max-w-md mx-auto lg:mx-0">
        Effortlessly manage, redeem & track meals for customers and providers. Seamless, cashless, and transparent experience.
      </p>

      <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mt-6">
        <a
          href="https://play.google.com/store/apps/details?id=com.mealex&hl=en"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold text-lg shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300"
        >
          <span className="text-2xl">📲</span>
          Install on Play Store
        </a>
        <button
          onClick={() => navigate("/login", { state: "register" })}
          className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-lg shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300"
        >
          Get Started (Free)
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>

      <div className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start">
        {[
          { title: "Cashless", color: "bg-green-100 text-green-700" },
          { title: "Transparent", color: "bg-blue-100 text-blue-700" },
          { title: "Simple", color: "bg-orange-100 text-orange-700" },
          { title: "Scalable", color: "bg-red-100 text-red-700" }
        ].map((f, i) => (
          <span key={i} className={`px-4 py-2 rounded-full font-semibold ${f.color} shadow-sm`}>
            {f.title}
          </span>
        ))}
      </div>
    </div>

    <div className="lg:w-1/2 relative flex justify-center">
      <div className="relative z-10">
        <img src={odash} alt="MealEx App Preview" className="rounded-3xl shadow-2xl w-full max-w-lg transform hover:scale-105 transition-transform duration-500" />
      </div>
      {/* <div className="absolute -top-10 -right-10 bg-white p-4 rounded-xl shadow-lg w-40 text-center animate-float">
        <span className="block text-green-500 text-3xl mb-2">✅</span>
        <p className="text-gray-700 text-sm font-semibold">Instant Token Redemption</p>
      </div>
      <div className="absolute -bottom-10 -left-10 bg-white p-4 rounded-xl shadow-lg w-40 text-center animate-float delay-200">
        <span className="block text-orange-500 text-3xl mb-2">📊</span>
        <p className="text-gray-700 text-sm font-semibold">Real-time Tracking</p>
      </div> */}
    </div>
    
  </div>
</section>



      {/* FULL LONG DESCRIPTION */}
      <section id="full-description" className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-4xl md:text-5xl font-bold mb-6 text-blue-900">MealEx is a Smart Digital Meal App</h3>
          <p className="text-lg md:text-xl text-gray-700 mb-10 leading-relaxed">
            MealEx is a smart digital meal app designed for both customers and providers. Whether you’re a student dining at a mess or hostel canteen, a professional depending on a tiffin service, or a provider managing multiple messes, MealEx makes meal management simple, cashless, and transparent.
          </p>
{/* 
          <div className="grid md:grid-cols-2 gap-10 mb-16 text-left">
            <div>
              <h4 className="text-3xl font-bold text-green-800 mb-4">For Customers</h4>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>Search mess halls, tiffin services, or canteens in your area</li>
                <li>View meal plans from different providers with clear pricing and details</li>
                <li>Buy tokens and plans online securely through the app</li>
                <li>Track your active plans and remaining tokens in one place</li>
                <li>Get notifications before your plan or tokens expire, so you never miss a meal</li>
                <li>Redeem tokens via the app instantly – no cash, no paper slips</li>
              </ul>
              <p className="mt-2 text-gray-700 italic">MealEx gives customers choice, convenience, and peace of mind, ensuring every meal is easy to buy, easy to track, and impossible to miss.</p>
            </div>

            <div>
              <h4 className="text-3xl font-bold text-orange-600 mb-4">For Providers</h4>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>List your meal plans online so customers in your area can easily discover and subscribe</li>
                <li>Receive payments digitally — no cash handling, no manual records</li>
                <li>Accept and redeem tokens instantly via the app, reducing errors and fraud</li>
                <li>Track redemptions, sales, and balances in real time</li>
                <li>Manage multiple mess locations or branches together in one app</li>
                <li>Use the same app as customers with the same login — no separate provider app needed</li>
                <li>Gain insights into customer demand to plan meals and reduce waste</li>
                <li>Send reminders or promotions to customers to boost engagement and renewals</li>
              </ul>
              <p className="mt-2 text-gray-700 italic">MealEx gives providers a digital storefront + multi-mess management dashboard, all inside the same app customers use — making it simple to manage, serve, and grow.</p>
            </div>
          </div> */}
          {/* OWNERS */}
<section id="owners" className="bg-white py-16 px-6">
  <div className="max-w-5xl mx-auto text-center md:text-left grid md:grid-cols-2 gap-10 items-center">
    <div>
      <h3 className="text-4xl md:text-5xl font-bold mb-4 text-orange-600">For Mess Owners</h3>
      <p className="text-lg text-gray-700 mb-6">
        List your meal plans online so customers in your area can easily discover and subscribe. Receive payments digitally, track redemptions, sales, and balances in real time, and manage multiple mess locations together in one app.
      </p>
      <ul className="list-disc pl-5 text-gray-700 space-y-2">
        <li>Fast, guided KYC & bank setup</li>
        <li>Plan & pricing management</li>
        <li>Customer & subscription tracking</li>
        <li>Settlement visibility</li>
        <li>Gain insights into customer demand to plan meals and reduce waste</li>
        <li>Send reminders or promotions to customers to boost engagement and renewals</li>
      </ul>
      <div className="flex gap-3 mt-6">
        <button onClick={() => navigate("/login", { state: "register" })} className="bg-green-700 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition font-semibold">Get Early Access</button>
        <button onClick={() => scrollToSection("contact")} className="border border-green-700 text-green-700 px-6 py-3 rounded-lg hover:bg-green-50 transition font-semibold">Talk to Us</button>
      </div>
    </div>
    <div className="flex justify-center">
      <img src={odash} alt="mealex owner dashboard preview" className="rounded-xl shadow-lg w-full max-w-lg" />
    </div>
  </div>
</section>

{/* CUSTOMERS */}
<section id="customers" className="bg-gray-50 py-16 px-6">
  <div className="max-w-5xl mx-auto text-center md:text-left grid md:grid-cols-2 gap-10 items-center">
    <div className="flex justify-center order-2 md:order-1">
      <img src={cdash} alt="mealex customer journey" className="rounded-xl shadow-lg w-full max-w-lg" />
    </div>
    <div className="order-1 md:order-2">
      <h3 className="text-4xl md:text-5xl font-bold mb-4 text-blue-800">For Customers</h3>
      <p className="text-lg text-gray-700 mb-6">
        Search mess halls, tiffin services, or canteens in your area. View meal plans with clear pricing and details. Buy tokens online securely and track your active plans and remaining tokens in one place. Redeem tokens via the app instantly.
      </p>
      <ul className="list-disc pl-5 text-gray-700 space-y-2">
        <li>Find verified messes nearby</li>
        <li>Transparent plan information</li>
        <li>Secure subscription flow</li>
        <li>Track active plans and remaining tokens</li>
        <li>Get notifications before plans or tokens expire</li>
        <li>Redeem tokens instantly – no cash, no slips</li>
      </ul>
      <button onClick={() => navigate("/login")} className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-orange-400 transition font-semibold">Explore on Web</button>
    </div>
  </div>
</section>


      <hr className="my-12 border-gray-200" />


          <div className="grid md:grid-cols-4 gap-6 mb-16 text-center">
            <div className="bg-green-50 p-6 rounded-xl shadow-md">
              <h5 className="font-bold text-green-700 text-xl mb-2">Cashless</h5>
              <p className="text-gray-700">Fully digital tokens, no paper or manual hassles</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl shadow-md">
              <h5 className="font-bold text-blue-700 text-xl mb-2">Transparent</h5>
              <p className="text-gray-700">Real-time tracking for both customers and providers</p>
            </div>
            <div className="bg-orange-50 p-6 rounded-xl shadow-md">
              <h5 className="font-bold text-orange-700 text-xl mb-2">Simple</h5>
              <p className="text-gray-700">Easy for students, employees, and food vendors alike</p>
            </div>
            <div className="bg-red-50 p-6 rounded-xl shadow-md">
              <h5 className="font-bold text-red-700 text-xl mb-2">Scalable</h5>
              <p className="text-gray-700">Works for hostel mess halls, corporate canteens, and local tiffin services</p>
            </div>
          </div>

          <div>
            <h4 className="text-3xl font-bold text-orange-600 mb-4">The MealEx Promise</h4>
            <p className="text-gray-700 leading-relaxed">
              MealEx is more than an app — it’s a digital dining ecosystem. By offering low commission fees and transparent reporting, it helps providers grow while giving customers a seamless dining experience.
              <br /><br />
              <b>MealEx: Bharat ke rang, thali ke sang. Dining, Simplified for All.</b>
            </p>
          </div>
        </div>
      </section>

  


      {/* ABOUT */}
      <section id="about" className="bg-white py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-4xl md:text-5xl font-bold mb-6 text-blue-900">About <span className="text-orange-500">MEAL</span>EX</h3>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">mealex is a web-first platform to modernize Indian messes and tiffin services. We help owners build a digital presence, streamline KYC & bank onboarding, and (soon) accept secure online payments. Customers can easily find and subscribe to messes near them.</p>
        </div>
      </section>

      <hr className="my-12 border-gray-200" />

      {/* FEATURES */}
      <section id="features" className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-4xl md:text-5xl font-bold mb-10 text-green-800">Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[ 
              { icon: "📍", title: "Mess Discovery", description: "Search and explore verified messes & tiffin services nearby with clear details and menus." },
              { icon: "📝", title: "Simple Subscriptions", description: "Subscribe to a mess plan on the web. Transparent pricing and flexible durations." },
              { icon: "✅", title: "Owner KYC Onboarding", description: "Guided, paperless KYC & bank setup for mess owners to start settlements quickly." },
              { icon: "🔐", title: "Secure Payouts", description: "Bank details & settlements handled with industry-grade security." },
              { icon: "📊", title: "Owner Dashboard", description: "Manage plans, customers, and settlements from a clean web dashboard." },
              { icon: "⚡", title: "Online Payments", description: "Seamless online payments for subscriptions." },
            ].map((f, i) => (
              <div key={i} className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center text-center hover:shadow-xl transition">
                <div className="text-4xl mb-3">{f.icon}</div>
                <h4 className="text-2xl font-semibold text-blue-900 mb-2">{f.title}</h4>
                <p className="text-gray-700 text-base">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="my-12 border-gray-200" />


      <hr className="my-12 border-gray-200" />

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-4xl md:text-5xl font-bold mb-10 text-blue-900">How MealEx Works</h3>
          <div className="mb-16">
            <h4 className="text-3xl font-bold text-green-800 mb-6">For Mess Owners</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[ 
                { step: 1, title: "Register", desc: "Create your owner account on mealex." },
                { step: 2, title: "Complete KYC", desc: "Finish web-based KYC & add bank details." },
                { step: 3, title: "Publish Plans", desc: "Create subscription plans & go live." },
                { step: 4, title: "Manage & Settle", desc: "Track subscriptions, settlements & growth." }
              ].map((s) => (
                <CardStep key={s.step} {...s} />
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-3xl font-bold text-orange-600 mb-6">For Customers</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[ 
                { step: 1, title: "Explore", desc: "Find messes near you with transparent info." },
                { step: 2, title: "Choose a Plan", desc: "Pick what fits your routine & budget." },
                { step: 3, title: "Subscribe Online", desc: "Pay securely (online payments coming soon)." },
                { step: 4, title: "Enjoy Your Meals", desc: "Simple, reliable, and organized dining." }
              ].map((s) => (
                <CardStep key={s.step} {...s} theme="customer" />
              ))}
            </div>
          </div>
        </div>
      </section>

      <hr className="my-12 border-gray-200" />

      {/* FAQ */}

      <section id="faq" className="bg-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-4xl md:text-5xl font-bold mb-10 text-center text-blue-900">Frequently Asked Questions</h3>
          <div className="space-y-6">
            {[ { q: "mealex mess owners ke liye kaise kaam karta hai?", a: "mealex aapko web par digital presence, guided KYC, plan publishing aur customer subscriptions manage karne mein madad karta hai." }, { q: "Kya online payments available hain?", a: "Online payments jald aa rahe hain. Tab tak aap sign-ups collect karke customers ko onboard kar sakte hain." }, { q: "Regional language support?", a: "Haan, multi-language support roadmap mein hai. Rollout ke saath hum announce karenge." }, { q: "Data security kaisi hai?", a: "Bank & KYC details industry-standard practices se handle ki jati hain. Security aur privacy hamari priority hai." } ].map((f, i) => (
              <FAQItem key={i} question={f.q} answer={f.a} />
            ))}
          </div>
        </div>
      </section>

      <hr className="my-12 border-gray-200" />

      <section id="contact" className="bg-gray-50 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl md:text-5xl font-bold mb-8 text-green-800">Get in Touch</h3>
        </div>

        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          <form className="space-y-6">
            <div>
              <label className="block text-left text-gray-700 text-lg font-medium mb-2">Your Name</label>
              <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" placeholder="Enter your name" />
            </div>
            <div>
              <label className="block text-left text-gray-700 text-lg font-medium mb-2">Your Email</label>
              <input type="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" placeholder="Enter your email" />
            </div>
            <div>
              <label className="block text-left text-gray-700 text-lg font-medium mb-2">Your Message</label>
              <textarea rows="5" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" placeholder="Tell us about your needs..." />
            </div>
            <button type="submit" className="w-full bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-blue-800 transition shadow-md">Send Message</button>
          </form>
          <div className="mt-8 text-gray-600 text-left">
            <p className="mb-2 flex items-center gap-2"><span>☎️</span> Phone: +91 98765 43210</p>
            <p className="flex items-center gap-2"><span>✉️</span> Email: info@mealex.in</p>
          </div>
        </div>
      </section>

      <footer className="bg-blue-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto text-center md:flex md:justify-between md:items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-3xl font-bold text-white mb-2"><span className="text-orange-500">MEA</span>LEX</h3>
            <p className="text-gray-300">&copy; {new Date().getFullYear()} mealex. All rights reserved.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-lg mb-6 md:mb-0">
            <button onClick={() => scrollToSection("about")} className="hover:text-orange-400 transition">About</button>
            <button onClick={() => scrollToSection("features")} className="hover:text-orange-400 transition">Features</button>
            <button onClick={() => scrollToSection("faq")} className="hover:text-orange-400 transition">FAQ</button>
            <button onClick={() => scrollToSection("contact")} className="hover:text-orange-400 transition">Contact</button>
            <button onClick={() => navigate("/privacy-policies")} className="hover:text-orange-400 transition">Privacy Policy</button>
          </div>

          <div className="flex justify-center md:justify-end space-x-6 text-2xl">
            <a href="https://www.facebook.com/profile.php?id=61578668565768" target="_blank" rel="noreferrer" className="hover:text-orange-400 transition">ⓕ</a>
            {/* <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-orange-400 transition">𝕏</a> */}
            <a href="https://www.linkedin.com/company/compunic-pvt-ltd/posts/?feedView=all" target="_blank" rel="noreferrer" className="hover:text-orange-400 transition">in</a>
            <a href="https://www.instagram.com/icompunic.in/" target="_blank" rel="noreferrer" className="hover:text-orange-400 transition">◎</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-lg shadow-sm bg-white">
      <button className="flex justify-between items-center w-full p-6 text-left font-semibold text-lg text-gray-800" onClick={() => setIsOpen(!isOpen)}>
        <span>{question}</span>
        <span className={`text-blue-600 text-2xl transform transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}>▼</span>
      </button>
      {isOpen && <p className="px-6 pb-6 text-gray-600 leading-relaxed">{answer}</p>}
    </div>
  );
}

function CardStep({ step, title, desc, theme = "owner" }) {
  const isOwner = theme === "owner";
  return (
    <div className="bg-gray-50 p-6 rounded-xl shadow-md border border-gray-100 text-center hover:shadow-lg transition">
      <div className={`${isOwner ? "bg-orange-500" : "bg-green-500"} text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold mb-4 mx-auto`}>{step}</div>
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
          <span key={i} className="text-gray-300">★</span>
        ))}
      </div>
      <p className="italic text-gray-700 mb-4">"{comment}"</p>
      <p className="font-semibold text-blue-900">- {name}</p>
    </div>
  );
}