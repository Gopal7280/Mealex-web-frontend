import React from 'react';
import { FaFileInvoiceDollar, FaCheckCircle, FaFileInvoice, FaBoxes, FaRupeeSign, FaMobileAlt, FaChartLine, FaHandshake, FaStar, FaStarHalfAlt, FaArrowRight, FaChevronDown, FaQrcode } from 'react-icons/fa';
import { MdOutlineAttachMoney } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import imgLogo from "../assets/Bill365Logo.jpg";

const LandingPage = () => {
    const navigate=useNavigate();
  return (
    <div className="bg-gray-50 text-gray-800 font-sans">
      {/* Navbar */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <FaFileInvoiceDollar className="text-2xl text-indigo mr-2" />
            <img src={imgLogo} width="100px" alt="" />
          </div>
          <nav className="hidden md:flex text-black space-x-8">
            <a href="#features" className="font-medium text-black hover:text-primary transition">Features</a>
            <a href="#pricing" className="font-medium text-black hover:text-primary transition">Pricing</a>
            <a href="#gst" className="font-medium text-black hover:text-primary transition">GST Tools</a>
            <a href="#testimonials" className="font-medium text-black hover:text-primary transition">Testimonials</a>
            <a href="#contact" className="font-medium text-black hover:text-primary transition">Contact</a>
          </nav>
          <div className="flex items-center space-x-4">
            <button onClick={()=>navigate("/login")} className='bg-[#3A5B76] text-white px-4 py-2 me-2 rounded hover:bg-[#2D465B]'>Login</button>
            <a href="#pricing" className="bg-primary text-white px-4 py-2 rounded-md shadow-sm hover:bg-secondary transition text-sm font-medium">Get Started</a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r text-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl text-black md:text-5xl font-bold mb-6 leading-tight">Complete GST Billing Solution for Indian Businesses</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">Automate invoicing, inventory, accounting & tax compliance with India's most trusted cloud billing software.</p>
          <div className="sm:flex sm:flex-col sm:flex-row sm:justify-center gap-4  sm:ml-40">
          <button onClick={()=>navigate("/login")} className='bg-[#214a6d] text-white font-semibold px-8 py-3 shadow-lg hover:bg-gray-100 transition transform hover:scale-105 ' style={{borderRadius:"10px"}}>Start 365-Day Free Trial</button>
            <a href="#demo" className="block bg-transparent border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-indigo-800 transition">Watch Demo</a>
          </div>
          <div className="mt-12 flex justify-center">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20 max-w-4xl">
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <div className="flex items-center">
                  <FaCheckCircle className="mr-2 text-green-300" />
                  <span>100% GST Compliance</span>
                </div>
                <div className="flex items-center">
                  <FaCheckCircle className="mr-2 text-green-300" />
                  <span>Multi-Device Access</span>
                </div>
                <div className="flex items-center">
                  <FaCheckCircle className="mr-2 text-green-300" />
                  <span>Data Security Certified</span>
                </div>
                <div className="flex items-center">
                  <FaCheckCircle className="mr-2 text-green-300" />
                  <span>Available in 8 Indian Languages</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Trusted By */}
      <section className="py-10 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 mb-6">Trusted by 50,000+ businesses across India</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-center">
            <img src="https://th.bing.com/th/id/OIP.8R12LQfde1LgpaliyMglLwHaEN?cb=iwc1&rs=1&pid=ImgDetMain" alt="Reliance" className="h-12 object-contain opacity-70 grayscale" />
            <img src="https://th.bing.com/th/id/OIP.nCMUgywSrQ4Oe-zSGD4LXQHaHa?cb=iwc1&rs=1&pid=ImgDetMain" alt="Tata" className="h-12 object-contain opacity-70 grayscale" />
            <img src="https://th.bing.com/th/id/OIP.Hq59g1Y5z8AWkWUsnnQSvAHaGA?w=201&h=180&c=7&r=0&o=5&cb=iwc1&dpr=1.3&pid=1.7" alt="Mahindra" className="h-12 object-contain opacity-70 grayscale" />
            <img src="https://th.bing.com/th/id/OIP.T0QTMVmw1gjDzzU5k7yvxwHaHa?w=200&h=200&c=7&r=0&o=5&cb=iwc1&dpr=1.3&pid=1.7" alt="Infosys" className="h-12 object-contain opacity-70 grayscale" />
            <img src="https://th.bing.com/th/id/OIP.ckaHsUxZQgfH2SNa6C3omAAAAA?w=259&h=180&c=7&r=0&o=5&cb=iwc1&dpr=1.3&pid=1.7" alt="Wipro" className="h-12 object-contain opacity-70 grayscale" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features for Your Business</h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">Everything you need to manage billing, inventory, taxes and accounting in one place</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition border-t-4 border-primary">
            <div className="text-primary text-3xl mb-4">
              <FaFileInvoice />
            </div>
            <h4 className="font-semibold text-xl mb-3">Smart GST Invoicing</h4>
            <p className="text-gray-600 mb-4">Generate GST-compliant invoices with automatic tax calculations for all Indian states. Supports HSN/SAC codes, reverse charge, and e-invoicing.</p>
            <ul className="text-sm space-y-2 text-gray-600">
              <li className="flex items-start">
                <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                <span>Auto-populate GST rates based on product category</span>
              </li>
              <li className="flex items-start">
                <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                <span>Generate e-invoices with IRN/QR codes</span>
              </li>
              <li className="flex items-start">
                <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                <span>Export to GST portal in JSON format</span>
              </li>
            </ul>
          </div>
          
          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition border-t-4 border-accent">
            <div className="text-accent text-3xl mb-4">
              <FaBoxes />
            </div>
            <h4 className="font-semibold text-xl mb-3">Advanced Inventory</h4>
            <p className="text-gray-600 mb-4">Manage stock levels, variants, batches and expiry dates across multiple locations with real-time tracking.</p>
            <ul className="text-sm space-y-2 text-gray-600">
              <li className="flex items-start">
                <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                <span>Barcode scanning support</span>
              </li>
              <li className="flex items-start">
                <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                <span>Low stock alerts</span>
              </li>
              <li className="flex items-start">
                <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                <span>Inventory valuation reports</span>
              </ li>
            </ul>
          </div>
          
          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition border-t-4 border-gst">
            <div className="text-gst text-3xl mb-4">
              <FaRupeeSign />
            </div>
            <h4 className="font-semibold text-xl mb-3">Accounting & Tax</h4>
            <p className="text-gray-600 mb-4">Automated accounting with GST, TDS, TCS compliance. Generate GSTR-1, GSTR-3B, GSTR-9 reports with one click.</p>
            <ul className="text-sm space-y-2 text-gray-600">
              <li className="flex items-start">
                <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                <span>Automatic ledger posting</span>
              </li>
              <li className="flex items-start">
                <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                <span>Bank reconciliation</span>
              </li>
              <li className="flex items-start">
                <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                <span>Financial statements (P&L, Balance Sheet)</span>
              </li>
            </ul>
          </div>
          
          {/* Feature 4 */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition border-t-4 border-yellow-500">
            <div className="text-yellow-500 text-3xl mb-4">
              <FaMobileAlt />
            </div>
            <h4 className="font-semibold text-xl mb-3">Mobile & Offline Access</h4>
            <p className="text-gray-600 mb-4">Manage your business on the go with our mobile apps. Works even without internet connection.</p>
            <ul className="text-sm space-y-2 text-gray-600">
              <li className="flex items-start">
                <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                <span>Android & iOS apps available</span>
              </li>
              <li className="flex items-start">
                <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                <span>Offline mode with auto-sync</span>
              </li>
              <li className="flex items-start">
                <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                <span>Barcode scanning from mobile camera</span>
              </li>
            </ul>
          </div>
          
          {/* Feature 5 */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition border-t-4 border-purple-500">
            <div className="text-purple-500 text-3xl mb-4">
              <FaChartLine />
            </div>
            <h4 className="font-semibold text-xl mb-3">Business Analytics</h4>
            <p className="text-gray-600 mb-4">Powerful dashboards and reports to help you understand your business performance.</p>
            <ul className="text-sm space-y-2 text-gray-600">
              <li className="flex items-start">
                <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                <span>Real-time sales analytics</span>
              </li>
              <li className="flex items-start">
                <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                <span>Customer purchase patterns</span>
              </li>
              <li className="flex items-start">
                <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                <span>Export to Excel/PDF</span>
              </li>
            </ul>
          </div>
          
          {/* Feature 6 */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition border-t-4 border-pink-500">
            <div className="text-pink-500 text-3xl mb-4">
              <FaHandshake />
            </div>
            <h4 className="font-semibold text-xl mb-3">Integrations</h4>
            <p className="text-gray-600 mb-4">Connect with other business tools you already use.</p>
            <ul className="text-sm space-y-2 text-gray-600">
              <li className="flex items-start">
                <FaCheckCircle className="text-green-500 mt-1 mr-2" />
 <span>Payment gateways (Razorpay, Paytm)</span>
              </li>
              <li className="flex items-start">
                <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                <span>E-commerce (Amazon, Flipkart)</span>
              </li>
              <li className="flex items-start">
                <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                <span>Accounting (Tally, QuickBooks)</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* GST Section */}
      <section id="gst" className="py-16 bg-gradient-to-r from-gst to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Complete GST Compliance Solution</h3>
            <p className="text-xl max-w-3xl mx-auto">Everything you need to stay compliant with India's GST regulations</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-white/20">
              <div className="text-3xl mb-4">
                <FaQrcode />
              </div>
              <h4 className="font-semibold text-xl mb-3">GSTR Reports</h4>
              <p className="mb-4">Generate accurate GSTR-1, GSTR-3B, GSTR-9 reports with reconciliation tools.</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <FaCheckCircle className="mt-1 mr-2" />
                  <span>Auto-calculate tax liabilities</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="mt-1 mr-2" />
                  <span>Identify mismatches with 2A/2B</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="mt-1 mr-2" />
                  <span>Export in GST portal format</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-white/20">
              <div className="text-3xl mb-4">
                <FaQrcode />
              </div>
              <h4 className="font-semibold text-xl mb-3">E-Invoicing</h4>
              <p className="mb-4">Generate IRN and QR codes as per GST e-invoicing requirements.</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <FaCheckCircle className="mt-1 mr-2" />
                  <span>Auto-generate IRN from invoice</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="mt-1 mr-2" />
                  <span>Print QR code on invoices</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="mt-1 mr-2" />
                  <span>Bulk e-invoice generation</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-white/20">
              <div className="text-3xl mb-4">
                <MdOutlineAttachMoney />
              </div>
              <h4 className="font-semibold text-xl mb-3">Tax Payments</h4>
              <p className="mb-4">Calculate and track GST, TDS, TCS payments with due date reminders.</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <FaCheckCircle className="mt-1 mr-2" />
                  <span>Auto-calculate tax liability</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="mt-1 mr-2" />
                  <span>Payment due date alerts</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="mt-1 mr-2" />
                  <span>Challan generation for GST portal</span> </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <a href="#" className="inline-block bg-white text-gst font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition">Explore All GST Features →</a>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">No hidden fees. Cancel anytime. 14-day free trial with all features.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Basic Plan */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h4 className="font-semibold text-lg mb-1">Starter</h4>
                <p className="text-gray-600 text-sm mb-4">For small businesses and startups</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">₹499</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <ul className="space-y-3 text-sm text-gray-600 mb-8">
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                    <span>100 GST invoices/month</span>
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
                <a href="#" className="block w-full bg-gray-200 text-gray-800 text-center font-medium py-3 rounded-lg hover:bg-gray-300 transition">Start Free Trial</a>
              </div>
            </div>
            
            {/* Pro Plan (Featured) */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-primary relative">
              <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 transform translate-x-2 -translate-y-2 rotate-12">MOST POPULAR</div>
              <div className="p-6">
                <h4 className="font-semibold text-lg mb-1">Professional</h4>
                <p className="text-gray-600 text-sm mb-4">For growing businesses</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">₹999</span>
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
                    <span>E-in voicing (100/month)</span>
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
                <a href="#" className="block w-full bg-primary text-white text-center font-medium py-3 rounded-lg hover:bg-secondary transition">Start Free Trial</a>
              </div>
            </div>
            
            {/* Enterprise Plan */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h4 className="font-semibold text-lg mb-1">Enterprise</h4>
                <p className="text-gray-600 text-sm mb-4">For large businesses & corporations</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">₹1,999</span>
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
                <a href="#" className="block w-full bg-gray-200 text-gray-800 text-center font-medium py-3 rounded-lg hover:bg-gray-300 transition">Start Free Trial</a>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Looking for annual billing? Save up to 20%</p>
            <a href="#" className="text-primary font-medium hover:underline">Compare all plans →</a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Businesses Across India</h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Join 50,000+ businesses who simplified their billing with Bill365</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <div className="flex items-center mb-4">
                <img src="https://randomuser.me/api/portraits/women/42.jpg" alt="Anjali Sharma" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h5 className="font-semibold">Anjali Sharma</h5>
                  <p className="text-sm text-gray-600">Retail Store Owner, Delhi</p>
                </div>
              </div>
              <div className="text-yellow-400 mb-3">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <p className="text-gray-700 italic">"Bill365 has made GST compliance so simple for my small shop. The automatic tax calculations save me hours every month. The mobile app lets me create invoices even when I'm not in the shop."</p>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <div className="flex items-center mb-4">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Ramesh Verma" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h5 className="font-semibold">Ramesh Verma</h5>
                  <p className="text-sm text-gray-600">Wholesale Distributor, Mumbai</p>
                </div>
              </div>
              <div className="text-yellow-400 mb-3">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <p className="text-gray-700 italic">"The inventory management with barcode scanning has transformed our warehouse operations. We can now track stock levels in real-time across our 3 locations. The GSTR reports are accurate and save us from last-minute hassles."</p>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <div className="flex items-center mb-4">
                <img src="https://randomuser.me/api/portraits/men/65.jpg" alt="Arjun Patel" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h5 className="font-semibold">Arjun Patel</h5>
                  <p className="text-sm text-gray-600">CA, Patel & Associates</p>
                </div>
              </div>
              <div className="text-yellow-400 mb-3">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalfAlt />
              </div>
              <p className="text-gray-700 italic">"As a Chartered Accountant, I recommend Bill365 to all my clients. The software ensures 100% GST compliance and the reconciliation tools make audit work much easier. The TDS/TCS features are particularly helpful."</p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <a href="#" className="inline-flex items-center text-primary font-medium hover:underline">
              Read more customer stories
              <FaArrowRight className="ml-2" />
            </a>
          </div>
        </div>
      </section>

      {/* Demo CTA */}
      <section id="demo" className="py-16 bg-indigo-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold mb-6">See Bill365 in Action</h3>
          <p className="text-xl text-gray-600 mb-8">Schedule a personalized demo with our product expert</p>
          <div className="bg-white rounded-xl shadow-md p-8 max-w-2xl mx-auto">
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 text-left">Your Name</label>
                <input type="text" id="name" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 text-left">Email Address</label>
                <input type="email" id="email" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1 text-left">Phone Number</label>
                <input type="tel" id="phone" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring -primary focus:border-primary" />
              </div>
              <div>
                <label htmlFor="business" className="block text-sm font-medium text-gray-700 mb-1 text-left">Business Type</label>
                <select id="business" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary">
                  <option>Retail</option>
                  <option>Wholesale</option>
                  <option>Manufacturing</option>
                  <option>Services</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <button type="submit" className="w-full bg-primary text-white font-medium py-3 rounded-lg hover:bg-secondary transition">Schedule Demo</button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h3>
          
          <div className="space-y-4">
            {/* FAQ Item 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <button className="flex justify-between items-center w-full text-left">
                <h4 className="font-medium text-lg">Is Bill365 compliant with the latest GST rules?</h4>
                <FaChevronDown className="text-primary" />
              </button>
              <div className="mt-3 text-gray-600">
                <p>Yes, Bill365 is fully compliant with all GST regulations including e-invoicing, HSN/SAC codes, reverse charge mechanism, and the latest GST return formats. Our team of tax experts continuously updates the software whenever there are changes in GST rules.</p>
              </div>
            </div>
            
            {/* FAQ Item 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <button className="flex justify-between items-center w-full text-left">
                <h4 className="font-medium text-lg">Can I access Bill365 on mobile?</h4>
                <FaChevronDown className="text-primary" />
              </button>
              <div className="mt-3 text-gray-600">
                <p>Absolutely! Bill365 offers fully functional Android and iOS apps that let you create invoices, manage inventory, view reports and more. The apps work offline and sync data automatically when you're back online.</p>
              </div>
            </div>
            
            {/* FAQ Item 3 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <button className="flex justify-between items-center w-full text-left">
                <h4 className="font-medium text-lg">How secure is my data with Bill365?</h4>
                <FaChevronDown className="text-primary" />
              </button>
              <div className="mt-3 text-gray-600">
                <p>Data security is our top priority. All your data is encrypted both in transit and at rest. We use bank-grade 256-bit SSL encryption and store data in secure AWS data centers located in India with daily backups. We are also ISO 27001 certified for information security.</p>
              </div>
            </div>
            
            {/* FAQ Item 4 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <button className="flex justify-between items-center w-full text-left">
                <h4 className="font-medium text-lg">Can I import data from my existing software?</h4>
                <FaChevronDown className="text-primary" />
              </button>
              <div className="mt-3 text-gray-600">
                <p>Yes, Bill365 allows you to import data from various formats, making it easy to transition from your existing software. Our support team can assist you with the import process to ensure a smooth transition.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
