import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import myimage from "../assets/Logo2.png";
//
import imgLogo from "../assets/Bill365Logo.jpg";
import { IoMdLogOut } from "react-icons/io";
import { IoStorefrontSharp } from "react-icons/io5";
import { PiStorefrontThin } from "react-icons/pi";
//
import "../styles/sidebar.css";
import { Dropdown } from "primereact/dropdown";
import { apiGet } from "../services/api";
import { Toast } from "primereact/toast";
import { Sidebar as KeyShortcut } from "primereact/sidebar";
import { FaRegKeyboard } from "react-icons/fa6";
const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const timeoutRef = useRef(null); // <== Ref for timeout
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const dropdownRefs = useRef([]); // Store references to dropdowns
  const sidebarRef = useRef();
  // Toggle dropdown visibility
  const toggleDropdown = (index) => {
    console.log("drop");
    setDropdownOpen(dropdownOpen === index ? null : index); // Toggle dropdown visibility
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickY = event.clientY;
      const isClickInsideSidebar =
        sidebarRef.current && sidebarRef.current.contains(event.target);
      const isClickInsideDropdown = dropdownRefs.current.some(
        (ref, index) =>
          ref && ref.contains(event.target) && dropdownOpen === index
      );

      // Only close dropdown if click is at or above 200px from top and outside sidebar
      if (clickY >= 300 && !isClickInsideSidebar) {
        setDropdownOpen(null);
      }

      // Close sidebar if click is outside sidebar
      if (!isClickInsideSidebar && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen, sidebarOpen]);

  const [selectedCity, setSelectedCity] = useState(null);
  const toast = useRef(null);
  const disabledTrue = true;
  const [visibleRight, setVisibleRight] = useState(false);
  const [business_name, setBusinessName] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    console.log("working with use");
    const fetchBussinessProfile = async () => {
      try {
        const res = await apiGet("/businessprofile");
        console.log(res);
        timeoutRef.current = setTimeout(() => {
          if (res.length == 0) {
            toast.current.show({
              severity: "info",
              summary: "info",
              detail: "New User? Redirecting to bussiness profile form",
              life: 3000,
            });
            timeoutRef.current = setTimeout(() => {
              navigate("/profile_form");
            }, 3000);
          } else {
            setBusinessName(res);
          }
        }, 3000);
      } catch (err) {
        console.log("no bussiness Profile");
      }
    };
    fetchBussinessProfile();
  }, []);
  const cities = [
    { name: "Create Invoice", code: "CI" },
    { name: "Create Challan", code: "CC" },
    { name: "Create Quotation", code: "CQ" },
    { name: "Create Purchase", code: "CP" },
  ];
  function handleChange(e) {
    console.log(e.target.value.code);
    const fetchBussiness = async () => {
      try {
        const res = await apiGet("/businessprofile");
        if (res.length === 0) {
          navigate("/profile_form");
        } else {
          if (e.target.value.code == "CI") {
            navigate("/add-invoice");
          }
          if (e.target.value.code == "CC") {
            navigate("/add-challan");
          }
          if (e.target.value.code == "CQ") {
            navigate("/add-quotation");
          }
          if (e.target.value.code == "CP") {
            navigate("/purchaseForm");
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchBussiness();
  }
  function handleBussinessCheck(e) {
    const fetchBussiness = async () => {
      const res = await apiGet("/businessprofile");
      console.log(res.length);
      if (res.length != 0) {
        toast.current.show({
          severity: "success",
          summary: "Info",
          detail: "Bussiness Profile already exist redirecting update",
          life: 700,
        });
        setTimeout(() => {
          navigate("/bussiness-profile");
        }, 700);
      } else {
        navigate("/profile_form");
      }
    };
    fetchBussiness();
  }
  function handleSideClose(name) {
    setDropdownOpen(null);
    setSidebarOpen(false);
  }
  function handleCheckClick(e, nav) {
    setDropdownOpen(null);
    setSidebarOpen(false);
    const fetchBussiness = async () => {
      try {
        const res = await apiGet("/businessprofile");
        if (res.length === 0) {
          navigate("/profile_form");
        } else {
          navigate(`/${nav}`);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchBussiness();
  }
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const [isdark, setIsdark] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      setIsdark(true);
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setIsdark(false);
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);
  function toggleDarkMode() {}
  return (
    <div className="font-roboto bg-gray-200">
      <Toast ref={toast} />
      <div className="flex h-14 items-center dark:bg-gray-800 justify-between gap-8 px-4 sm:px-6 bg-[#3A5B76] w-screen p-6">
        <div>
          {business_name.length > 0 ? (
            <>
              {business_name[0].logo != null ? (
                <img
                  src={business_name[0].logo}
                  alt="Logo Preview"
                  className="w-20 h-10 object-contain"
                />
              ) : (
                <span className="font-bold text-5xl rounded text-white">
                  {business_name[0].business_name.substring(0, 1).toUpperCase()}
                </span>
              )}
            </>
          ) : (
            ""
          )}
          <span className="text-white text-2xl ms-1 font-bold">
            {business_name.length > 0
              ? business_name[0].business_name.toUpperCase()
              : ""}
          </span>
        </div>
        <button
          id="menu-toggle"
          className="hidden text-white focus:outline-none"
        >
          <svg
            className="w-8 h-8"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        <div className="flex items-center gap-40 max-md:hidden">
          <div className="flex items-center gap-10 max-md:hidden">
            <div className="justify-content p-1">
              <Dropdown
                value={selectedCity}
                onChange={handleChange}
                options={cities}
                optionLabel="name"
                placeholder="Create +"
                className="w-full md:w-14rem"
              />
            </div>
            {/* Shortcut Icon */}
            <div className="justify-content p-1">
              <button type="button" onClick={() => setVisibleRight(true)}>
                <svg
                  className="absolute right-60 bg-white rounded-full top-2.5 w-9 p-2 text-gray-700"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <rect
                    x="2"
                    y="6"
                    width="20"
                    height="12"
                    rx="2"
                    stroke-width="2"
                  />
                  <line x1="4" y1="10" x2="20" y2="10" stroke-width="2" />
                  <line x1="4" y1="14" x2="20" y2="14" stroke-width="2" />
                  <line x1="6" y1="8" x2="6" y2="12" stroke-width="2" />
                  <line x1="10" y1="8" x2="10" y2="12" stroke-width="2" />
                  <line x1="14" y1="8" x2="14" y2="12" stroke-width="2" />
                  <line x1="18" y1="8" x2="18" y2="12" stroke-width="2" />
                </svg>
              </button>
            </div>
            <KeyShortcut
              visible={visibleRight}
              position="right"
              onHide={() => setVisibleRight(false)}
            >
              <h2>Keyboard Shortcuts</h2>
              <div>
                <dl>
                  <hr />
                  <div className="flex justify-between">
                    <dt className="">Dashboard</dt>
                    <dd>
                      <span>
                        <FaRegKeyboard className="keyIcon" />
                      </span>
                      alt+d
                    </dd>
                  </div>
                  <hr />
                  <div className="flex justify-between">
                    <dt>Customer's</dt>
                    <dd>
                      <span>
                        <FaRegKeyboard className="keyIcon" />
                      </span>
                      alt+u
                    </dd>
                  </div>
                  <hr />
                  <div className="flex justify-between">
                    <dt>Product's</dt>
                    <dd>
                      <span>
                        <FaRegKeyboard className="keyIcon" />
                      </span>
                      alt+p
                    </dd>
                  </div>
                  <hr />
                  <div className="flex justify-between">
                    <dt>Invoice's</dt>
                    <dd>
                      <span>
                        <FaRegKeyboard className="keyIcon" />
                      </span>
                      alt+i
                    </dd>
                  </div>
                  <hr />
                  <div className="flex justify-between">
                    <dt>Delivery-challan's</dt>
                    <dd>
                      <span>
                        <FaRegKeyboard className="keyIcon" />
                      </span>
                      alt+c
                    </dd>
                  </div>
                  <hr />
                  <div className="flex justify-between">
                    <dt>Quotation's</dt>
                    <dd className="">
                      <span>
                        <FaRegKeyboard className="keyIcon" />
                      </span>
                      alt+q
                    </dd>
                  </div>
                  <hr />
                </dl>
              </div>
            </KeyShortcut>
            {/* Theme Icon */}
            {!isdark ? (
              <div className="justify-content p-1">
                <button onClick={() => setDark((prev) => !prev)}>
                  <svg
                    className="absolute right-48 bg-white rounded-full top-2.5 w-9 p-2 text-gray-700"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="justify-content p-1">
                <button onClick={() => setDark((prev) => !prev)}>
                  <svg
                    className="absolute right-48 bg-white rounded-full top-2.5 w-9 p-2 text-yellow-500 dark:bg-gray-800 dark:!text-gray-800"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3v1.5M12 19.5V21M4.22 4.22l1.06 1.06M17.72 17.72l1.06 1.06M1.5 12H3M21 12h1.5M4.22 19.78l1.06-1.06M17.72 6.28l1.06-1.06M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z"
                    />
                  </svg>
                </button>
              </div>
            )}

            {/* Notification Icon */}
            <form className="justify-content p-1">
              <button>
                <svg
                  className="absolute right-36 bg-white rounded-full top-2.5 w-9 p-2 text-gray-700"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
                  />
                </svg>
              </button>
            </form>
            {/* Shortcut icon */}
            <form className="justify-content p-1">
              <button>
                <svg
                  className="absolute right-36 bg-white rounded-full top-2.5 w-9 p-2 text-gray-700"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
                  />
                </svg>
              </button>
            </form>
            {/* Profile Icon */}
            <form className="justify-content p-1">
              <button type="button" onClick={(e) => handleBussinessCheck(e)}>
                <svg
                  className="absolute right-24 bg-white rounded-full top-2.5 w-9 p-2 text-gray-700"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 11c2.485 0 4.5-2.015 4.5-4.5S14.485 2 12 2 7.5 4.015 7.5 6.5 9.515 11 12 11zm0 2c-3.866 0-7 3.134-7 7h14c0-3.866-3.134-7-7-7z"
                  />
                </svg>
              </button>
            </form>

            {/* Logout Icon */}
            <form className="justify-content p-1">
              <button
                type="button"
                onClick={() => {
                  if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                    timeoutRef.current = null;
                  }
                  navigate("/login"); // Manually navigate after clearing timeout
                }}
              >
                <svg
                  className="absolute right-12 bg-blue-50 rounded-full top-2.5 w-9 p-2 text-gray-700 hover:bg-red-600 hover:text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="bgSetSideBar">
        {/* <div className="">
          <Menubar
            model={[
              {
                label: "Dashboard",
                icon: "pi pi-fw pi-home",
                command: () => navigate("/dashboard"),
              },
              {
                label: "Products",
                icon: "pi pi-fw pi-list",
                items: [
                  {
                    label: "Add Product",
                    icon: "pi pi-fw pi-plus",
                    command: () => navigate("/add-product"),
                  },
                  {
                    label: "Product List",
                    icon: "pi pi-fw pi-list",
                    command: () => navigate("/products"),
                  },
                ],
              },
              {
                label: "Customer's",
                icon: "pi pi-fw pi-users",
                items: [
                  {
                    label: "Add Customer",
                    icon: "pi pi-fw pi-user-plus",
                    command: () => navigate("/home"),
                  },
                  {
                    label: "Customer List",
                    icon: "pi pi-fw pi-user",
                    command: () => navigate("/display"),
                  },
                ],
              },
              {
                label: "₹ Sales",
                icon: "", // Add appropriate icon if needed
                items: [
                  {
                    label: "Invoices",
                    icon: "pi pi-fw pi-file",
                    command: () => navigate("/invoices"),
                  },
                  {
                    label: "Delivery Challan",
                    icon: "pi pi-fw pi-truck",
                    command: () => navigate("/deliverychallan-table"),
                  },
                  {
                    label: "Quotations",
                    icon: "pi pi-fw pi-file",
                    command: () => navigate("/quotation"),
                  },
                  {
                    label: "Payment In List",
                    icon: "pi pi-fw pi-money-bill",
                    command: () => navigate("/paymentIn"),
                  },
                ],
              },
              {
                label: "Users",
                disabled: true, // Assuming disabledTrue is true
                icon: "pi pi-fw pi-user",
                items: [
                  {
                    label: "Add User",
                    icon: "pi pi-fw pi-user-plus",
                    // command: () => navigate('/users/add'), // Uncomment and add URL if needed
                  },
                  {
                    label: "Delete User",
                    icon: "pi pi-fw pi-user-minus",
                    // command: () => navigate('/users/delete'), // Uncomment and add URL if needed
                  },
                  {
                    label: "Show User",
                    icon: "pi pi-fw pi-eye",
                    // command: () => navigate('/users/show'), // Uncomment and add URL if needed
                  },
                ],
              },
              {
                label: "Purchase",
                icon: "pi pi-fw pi-shopping-cart",
                items: [
                  {
                    label: "Purchase List",
                    icon: "pi pi-fw pi-file",
                    command: () => navigate("/purchase-table"),
                  },
                  {
                    label: "Purchase Form",
                    icon: "pi pi-fw pi-arrow-left",
                    command: () => navigate("/purchaseForm"),
                  },
                  {
                    label: "Payment Out List",
                    icon: "pi pi-fw pi-money-bill",
                    command: () => navigate("/paymentOut"),
                  },
                ],
              },
              {
                label: "Reports",
                disabled: true, // Assuming disabledTrue is true
                icon: "pi pi-fw pi-chart-bar",
                items: [
                  {
                    label: "Sales Report",
                    icon: "pi pi-fw pi-file",
                    // command: () => navigate('/reports/sales'), // Uncomment and add URL if needed
                  },
                  {
                    label: "Party wise Sales",
                    icon: "pi pi-fw pi-file",
                    // command: () => navigate('/reports/party'), // Uncomment and add URL if needed
                  },
                  {
                    label: "Day Book",
                    icon: "pi pi-fw pi-file",
                    // command: () => navigate('/reports/daybook'), // Uncomment and add URL if needed
                  },
                ],
              },
              {
                label: "Settings",
                disabled: true, // Assuming disabledTrue is true
                icon: "pi pi-fw pi-cog",
                command: () => navigate("/settings"),
              },
            ]}
          />
        </div> */}
        <div>
          {/* Navbar */}
          <nav className=" bg-white px-4 py-3 shadow-md flex justify-between items-center">
            <button
              className="md:hidden text-2xl"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="text-2xl">☰</span>
            </button>

            <div className="hidden md:flex space-x-6 items-center">
              <NavLink
                to="/dashboard"
                className="text-decoration-none text-black hover:bg-gray-300 p-2 rounded-2xl"
              >
                <span className="pi pi-fw pi-home  d-inline-block"></span>
                <span className="text-black">Dashboard</span>
              </NavLink>

              {/* Products Dropdown */}
              <div
                className="relative"
                ref={(el) => (dropdownRefs.current[0] = el)}
              >
                <button
                  style={{ borderRadius: "16px" }}
                  onClick={(e) => handleCheckClick(e, "products")}
                  className="text-decoration-none text-black hover:bg-gray-300 p-2"
                >
                  <span className="pi pi-fw pi-list  d-inline-block"></span>
                  <span className="text-black">Products</span>
                </button>
              </div>

              {/* Customer's Dropdown */}
              <div
                className="relative"
                ref={(el) => (dropdownRefs.current[0] = el)}
              >
                <button
                  style={{ borderRadius: "16px" }}
                  onClick={(e) => handleCheckClick(e, "display")}
                  className="text-decoration-none text-black hover:bg-gray-300 p-2"
                >
                  <span className="pi pi-fw pi-users d-inline-block"></span>
                  <span className="text-black">Customer's</span>
                </button>
              </div>

              {/* ₹ Sales Dropdown */}
              {/* ₹ Sales Dropdown */}
              <div
                className="relative"
                ref={(el) => (dropdownRefs.current[2] = el)}
              >
                <button
                  onClick={() => toggleDropdown(2)}
                  className="text-decoration-none text-black hover:bg-gray-300 p-2 rounded-2xl"
                  style={{ borderRadius: "16px" }}
                >
                  <span>₹ Sales ▼</span>
                </button>
                {dropdownOpen === 2 && (
                  <div className="absolute left-0 mt-2 w-52 bg-white border rounded shadow-lg z-50">
                    <button
                      onClick={(e) => handleCheckClick(e, "invoices")}
                      className="block px-4 py-2 hover:bg-gray-100 text-black"
                    >
                      <span className="pi pi-fw pi-file d-inline-block"></span>
                      <span>Invoice's</span>
                    </button>
                    <button
                      onClick={(e) =>
                        handleCheckClick(e, "deliverychallan-table")
                      }
                      className="block px-4 py-2 hover:bg-gray-100 text-black"
                    >
                      <span className="pi pi-fw pi-truck d-inline-block"></span>
                      <span>Delivery Challan</span>
                    </button>
                    <button
                      onClick={(e) => handleCheckClick(e, "quotation")}
                      className="block px-4 py-2 hover:bg-gray-100 text-black"
                    >
                      <span className="pi pi-fw pi-file d-inline-block"></span>
                      <span>Quotation's</span>
                    </button>
                    <button
                      onClick={(e) => handleCheckClick(e, "paymentIn")}
                      className="block px-4 py-2 hover:bg-gray-100 text-black"
                    >
                      <span className="pi pi-fw pi-money-bill d-inline-block"></span>
                      <span>Payment In list</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Purchase Dropdown */}
              <div
                className="relative"
                ref={(el) => (dropdownRefs.current[3] = el)}
              >
                <button
                  onClick={() => toggleDropdown(3)}
                  className="text-decoration-none text-black hover:bg-gray-300 p-2 rounded-2xl"
                  style={{ borderRadius: "16px" }}
                >
                  <span>Purchase ▼</span>
                </button>
                {dropdownOpen === 3 && (
                  <div className="absolute left-0 mt-2 w-52 bg-white border rounded shadow-lg z-50">
                    <button
                      onClick={(e) => handleCheckClick(e, "purchase-table")}
                      className="block px-4 py-2 hover:bg-gray-100 text-black"
                    >
                      <span className="pi pi-fw pi-file d-inline-block"></span>
                      <span>Purchase List</span>
                    </button>
                    <button
                      onClick={(e) => handleCheckClick(e, "purchaseForm")}
                      className="block px-4 py-2 hover:bg-gray-100 text-black"
                    >
                      <span className="pi pi-fw pi-arrow-left d-inline-block"></span>
                      <span>Purchase Form</span>
                    </button>
                    <button
                      onClick={(e) => handleCheckClick(e, "paymentOut")}
                      className="block px-4 py-2 hover:bg-gray-100 text-black"
                    >
                      <span className="pi pi-fw pi-money-bill d-inline-block"></span>
                      <span>Payment Out List</span>
                    </button>
                  </div>
                )}
              </div>
              <div
                className="relative"
                ref={(el) => (dropdownRefs.current[0] = el)}
              >
                <NavLink
                  to="#"
                  className=" text-decoration-none text-black hover:bg-gray-300 p-2 rounded-2xl"
                >
                  <span className="pi pi-fw pi-users text-black opacity-50  d-inline-block"></span>
                  <span className="text-black opacity-50">Users</span>
                </NavLink>
              </div>
            </div>
          </nav>

          {/* Offcanvas Sidebar */}
          <div
            className={`fixed overflow-scroll top-0 left-0 w-64 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
            ref={sidebarRef}
          >
            <div className="p-2 border-b flex justify-between items-center">
              <h2 className="text-lg font-bold">
                <img className="w-20" src={imgLogo} alt="" />
              </h2>
              <button
                className="text-4xl"
                onClick={() => setSidebarOpen(false)}
              >
                <span className="text-4xl">×</span>
              </button>
            </div>
            <nav className="flex flex-col p-4 space-y-4">
              <NavLink
                onClick={(e) => handleBussinessCheck(e)}
                className="text-decoration-none text-black hover:bg-gray-300 p-2 rounded-2xl"
              >
                <span className="inline-block mr-1">
                  <PiStorefrontThin />
                </span>
                <span className="text-black">
                  {business_name.length
                    ? business_name[0].business_name.toUpperCase()
                    : ""}
                </span>
              </NavLink>
              <NavLink
                to="/dashboard"
                onClick={() => setSidebarOpen(false)}
                className="text-decoration-none text-black hover:bg-gray-300 p-2 rounded-2xl"
              >
                <span className="pi pi-fw pi-home  d-inline-block"></span>
                <span className="text-black">Dashboard</span>
              </NavLink>

              {/* Products Dropdown */}
              <div
                className="relative"
                ref={(el) => (dropdownRefs.current[0] = el)}
              >
                <button
                  onClick={(e) => handleCheckClick(e, "products")}
                  className="text-decoration-none text-black hover:bg-gray-300 p-2 rounded-2xl"
                >
                  <span className="pi pi-fw pi-list  d-inline-block"></span>
                  <span className="text-black">Products</span>
                </button>
              </div>

              {/* Customer's Dropdown */}
              <div
                className="relative"
                ref={(el) => (dropdownRefs.current[0] = el)}
              >
                <button
                  onClick={(e) => handleCheckClick(e, "display")}
                  className="text-decoration-none text-black hover:bg-gray-300 p-2 rounded-2xl"
                >
                  <span className="pi pi-fw pi-users d-inline-block"></span>
                  <span className="text-black">Customer's</span>
                </button>
              </div>

              {/* ₹ Sales Dropdown */}
              {/* ₹ Sales Dropdown */}
              <div
                className="relative"
                ref={(el) => (dropdownRefs.current[2] = el)}
              >
                <button
                  onClick={() => toggleDropdown(2)}
                  className="text-decoration-none text-black hover:bg-gray-300 p-2 rounded-2xl"
                  style={{ borderRadius: "16px" }}
                >
                  <span>₹ Sales ▼</span>
                </button>
                {dropdownOpen === 2 && (
                  <div className="absolute left-0 mt-2 w-52 bg-white border rounded shadow-lg z-50">
                    <button
                      onClick={(e) => handleCheckClick(e, "invoices")}
                      className="block px-4 py-2 hover:bg-gray-100 text-black"
                    >
                      <span className="pi pi-fw pi-file d-inline-block"></span>
                      <span>Invoice's</span>
                    </button>
                    <button
                      className="block px-4 py-2 hover:bg-gray-100 text-black"
                      onClick={(e) =>
                        handleCheckClick(e, "deliverychallan-table")
                      }
                    >
                      <span className="pi pi-fw pi-truck d-inline-block"></span>
                      <span>Delivery Challan</span>
                    </button>
                    <button
                      onClick={(e) => handleCheckClick(e, "quotation")}
                      className="block px-4 py-2 hover:bg-gray-100 text-black"
                    >
                      <span className="pi pi-fw pi-file d-inline-block"></span>
                      <span>Quotation's</span>
                    </button>
                    <button
                      onClick={(e) => handleCheckClick(e, "paymentIn")}
                      className="block px-4 py-2 hover:bg-gray-100 text-black"
                    >
                      <span className="pi pi-fw pi-money-bill d-inline-block"></span>
                      <span>Payment In list</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Purchase Dropdown */}
              <div
                className="relative"
                ref={(el) => (dropdownRefs.current[3] = el)}
              >
                <button
                  onClick={() => toggleDropdown(3)}
                  className="text-decoration-none text-black hover:bg-gray-300 p-2 rounded-2xl"
                  style={{ borderRadius: "16px" }}
                >
                  <span>Purchase ▼</span>
                </button>
                {dropdownOpen === 3 && (
                  <div className="absolute left-0 mt-2 w-52 bg-white border rounded shadow-lg z-50">
                    <button
                      onClick={(e) => handleCheckClick(e, "purchase-table")}
                      className="block px-4 py-2 hover:bg-gray-100 text-black"
                    >
                      <span className="pi pi-fw pi-file d-inline-block"></span>
                      <span>Purchase List</span>
                    </button>
                    <button
                      onClick={(e) => handleCheckClick(e, "purchaseForm")}
                      className="block px-4 py-2 hover:bg-gray-100 text-black"
                    >
                      <span className="pi pi-fw pi-arrow-left d-inline-block"></span>
                      <span>Purchase Form</span>
                    </button>
                    <button
                      to="/paymentOut"
                      className="block px-4 py-2 hover:bg-gray-100 text-black"
                      onClick={(e) => handleCheckClick(e, "paymentOut")}
                    >
                      <span className="pi pi-fw pi-money-bill d-inline-block"></span>
                      <span>Payment Out List</span>
                    </button>
                  </div>
                )}
              </div>

              <div
                className="relative"
                ref={(el) => (dropdownRefs.current[0] = el)}
              >
                <button
                  onClick={(e) => handleCheckClick(e, "users")}
                  className="text-decoration-none text-black hover:bg-gray-300 p-2 rounded-2xl"
                >
                  <span className="pi pi-fw pi-users  d-inline-block"></span>
                  <span className="text-black">Users</span>
                </button>
              </div>
              {/* <div
                className="relative"
                ref={(el) => (dropdownRefs.current[4] = el)}
              >
                <button
                  onClick={() => toggleDropdown(4)}
                  className="text-decoration-none text-black hover:bg-gray-300 p-2 rounded-2xl"
                  style={{ borderRadius: "16px" }}
                >
                  <span>Setting's ▼</span>
                </button>
                {dropdownOpen === 4 && (
                  <div>
                  <div className="absolute left-0 mt-2 w-52 bg-white border rounded shadow-lg z-50">
                    <h6 className="p-2">Invoice setting</h6>
                    <hr className="mb-1" />
                    <NavLink
                      to="/settings/prefixInvoice"
                      className="block px-4 py-2 hover:bg-gray-100 text-black"
                      onClick={() => handleSideClose(null)} // Close dropdown on click
                    >
                      
                      <span>- Prefix Invoice</span>
                    </NavLink>
                    <NavLink
                      to="/settings/themeInvoice"
                      className="block px-4 py-2 hover:bg-gray-100 text-black"
                      onClick={() => handleSideClose(null)} // Close dropdown on click
                    >
                      
                      <span>- Theme Invoice</span>
                    </NavLink>
                    <NavLink
                      to="/settings/bankAccountInvoice"
                      className="block px-4 py-2 hover:bg-gray-100 text-black"
                      onClick={() => handleSideClose(null)} // Close dropdown on click
                    >
                      
                      <span>- Bank Account Invoice</span>
                    </NavLink>
                    <NavLink
                      to="/settings/authorizedSignatureInvoice"
                      className="block px-4 py-2 hover:bg-gray-100 text-black"
                      onClick={() => handleSideClose(null)} // Close dropdown on click
                    >
                      <span>- Authorized Signature Invoice</span>
                    </NavLink>
                   <h6 className="p-2">Challan setting</h6>
                   <hr className="mb-1" />
                   <NavLink
                     to="/settings/prefixChallan"
                     className="block px-4 py-2 hover:bg-gray-100 text-black"
                     onClick={() => handleSideClose(null)} // Close dropdown on click
                   >
                     
                     <span>- Prefix Challan</span>
                   </NavLink>
                   <NavLink
                     to="/settings/themeChallan"
                     className="block px-4 py-2 hover:bg-gray-100 text-black"
                     onClick={() => handleSideClose(null)} // Close dropdown on click
                   >
                     
                     <span>- Theme Challan</span>
                   </NavLink>
                   <NavLink
                     to="/settings/bankAccountChallan"
                     className="block px-4 py-2 hover:bg-gray-100 text-black"
                     onClick={() => handleSideClose(null)} // Close dropdown on click
                   >
                     
                     <span>- Bank Account Challan</span>
                   </NavLink>
                   <NavLink
                     to="/settings/authorizedSignatureChallan"
                     className="block px-4 py-2 hover:bg-gray-100 text-black"
                     onClick={() => handleSideClose(null)} // Close dropdown on click
                   >
                     <span>- Authorized Signature Challan</span>
                   </NavLink>
                 </div>
                 </div>
                )}
              </div> */}
              <div
                className="relative"
                ref={(el) => (dropdownRefs.current[0] = el)}
              >
                <button
                  onClick={() => {
                    if (timeoutRef.current) {
                      clearTimeout(timeoutRef.current);
                      timeoutRef.current = null;
                    }
                    navigate("/login"); // Manually navigate after clearing timeout
                  }}
                  className="text-decoration-none text-black hover:bg-gray-300 p-2 rounded-2xl"
                >
                  <span className="inline-block">
                    <IoMdLogOut className="inline-block mr-1" />
                    Logout
                  </span>
                </button>
              </div>
            </nav>
          </div>

          {/* Overlay Background */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black opacity-30 z-40"
              onClick={() => setSidebarOpen(false)}
            ></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
