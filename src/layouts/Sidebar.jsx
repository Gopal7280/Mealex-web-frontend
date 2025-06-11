import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import myimage from '../assets/Logo2.png';
import { CiSettings } from 'react-icons/ci';
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { ProgressSpinner } from 'primereact/progressspinner';
//
//
import imgLogo from '../assets/Bill365Logo.jpg';
import { IoMdLogOut } from 'react-icons/io';
import { IoStorefrontSharp } from 'react-icons/io5';
import { PiStorefrontThin } from 'react-icons/pi';
//
import '../styles/sidebar.css';
import { Skeleton } from 'primereact/skeleton';
import { Dropdown } from 'primereact/dropdown';
import { apiGet } from '../services/api';
import { Toast } from 'primereact/toast';
import { Sidebar as KeyShortcut } from 'primereact/sidebar';
import { FaRegKeyboard } from 'react-icons/fa6';
import { OwnerSideBar } from './ownerSideBar/ownerSidebar';
import { DeliveryBoySidebar } from './deliveryBoySidebar/deliveryBoySidebar';
import { SalesPersonSidebar } from './salesPersonSidebar/salesPersonSidebar';
import { StockManagerSidebar } from './stockManager/stockManager';
const Sidebar = ({ setRefresh }) => {
  const [loader, setLoader] = useState(false);
  const [userName,setUserName]=useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const timeoutRef = useRef(null); // <== Ref for timeout
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const dropdownRefs = useRef([]); // Store references to dropdowns
  const sidebarRef = useRef();
  // Toggle dropdown visibility
  const toggleDropdown = index => {
    console.log('drop');
    setDropdownOpen(dropdownOpen === index ? null : index); // Toggle dropdown visibility
  };

  useEffect(() => {
    // Function to handle clicks outside the sidebar and dropdowns
    const handleClickOutside = event => {
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

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen, sidebarOpen]);

  const [selectedCity, setSelectedCity] = useState(null);
  const toast = useRef(null);
  const disabledTrue = true;
  const [visibleRight, setVisibleRight] = useState(false);
  const [business_name, setBusinessName] = useState('');
  const [userRole, setUserRole] = useState('owner');
  const navigate = useNavigate();
  const [count,setCount]=useState(0);
  useEffect(() => {
    console.log('working with use');
    var name="";
     // Fetch user role and business profile on component mount and when refresh changes
    const fetchUserRole = async () => {
      try {
        const res = await apiGet('/user');
        console.log(res.data);
        if(res.data.length)
        {
          name=res.data[0].employee_name;
          setUserName(res.data[0].employee_name);
        }
        console.log(res.data[0].employee_role);
        setUserRole(res.data[0].employee_role);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserRole();

    const fetchBussinessProfile = async () => {
      try {
        const res = await apiGet('/businessprofile');
        console.log(res);
        timeoutRef.current = setTimeout(() => {
          if (res.length == 0) {
            setCount(1);
            toast.current.show({
              severity: 'info',
              summary: 'info',
              detail: 'New User? Redirecting to bussiness profile form',
              life: 3000,
            });
            timeoutRef.current = setTimeout(() => {
              navigate('/profile_form');
            }, 1000);
          } else {
            setCount(0);
            setBusinessName(res);
            if(name==""){
          setUserName(res[0].vendor_name);
        }
          }
        }, 1000);
      } catch (err) {
        console.log('no bussiness Profile');
      }
    };
    fetchBussinessProfile();
  }, [setRefresh]);
  const cities = [
    { name: 'Create Invoice', code: 'CI' },
    { name: 'Create Challan', code: 'CC' },
    { name: 'Create Quotation', code: 'CQ' },
    { name: 'Create Purchase', code: 'CP' },
  ];
  function handleChange(e) {
    console.log(e.target.value.code);
     // Navigate to different create forms based on dropdown selection, after checking business profile existence
    const fetchBussiness = async () => {
      try {
        const res = await apiGet('/businessprofile');
        if (res.length === 0) {
          navigate('/profile_form');
        } else {
          if (e.target.value.code == 'CI') {
            navigate('/add-invoice');
          }
          if (e.target.value.code == 'CC') {
            navigate('/add-challan');
          }
          if (e.target.value.code == 'CQ') {
            navigate('/add-quotation');
          }
          if (e.target.value.code == 'CP') {
            navigate('/purchaseForm');
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchBussiness();
  }
   // Check if a business profile exists, and navigate to create or update form accordingly
  function handleBussinessCheck(e) {
    const fetchBussiness = async () => {
      const res = await apiGet('/businessprofile');
      console.log(res.length);
      if (res.length != 0) {
        toast.current.show({
          severity: 'success',
          summary: 'Info',
          detail: 'Bussiness Profile already exist redirecting update',
          life: 700,
        });
        setTimeout(() => {
          navigate('/bussiness-profile');
        }, 700);
      } else {
        navigate('/profile_form');
      }
    };
    fetchBussiness();
  }
  const isActive = path => location.pathname === path;
  function handleSideClose(name) {
    setDropdownOpen(null);
    setSidebarOpen(false);
  }
  function handleCheckClick(e, nav) {
    setLoader(true);
    setDropdownOpen(null);
    setSidebarOpen(false);
    navigate(`/${nav}`);
    
  }
   const [anchorEl, setAnchorEl] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
     // Manages dark mode state and persists it in localStorage
  const [dark, setDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  const [isdark, setIsdark] = useState(false);
  useEffect(() => {
     // Apply or remove dark mode class based on state
    const root = document.documentElement;
    if (dark) {
      setIsdark(true);
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      setIsdark(false);
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);
   // Clear timeout and remove user data from localStorage, then redirect to login
  function handleLogout(){
    {
                  if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                    timeoutRef.current = null;
                  }
                  localStorage.removeItem("token");
                  localStorage.removeItem("isAuthenticated");
                  localStorage.removeItem("mkddr");
                  navigate("/login");
                  window.location.reload();
                }
  }
  function toggleDarkMode() {}
   // Handles opening the user detail menu
   const handleUserDetailClick = event => {
    setAnchorEl(event.currentTarget);
  };
  // Handles closing the user detail menu and performing actions based on the selected path
  const handleUserDetailClose = path => {
    setAnchorEl(null);
    if (path=="theme") {
      // handleNavigate(path);
      setDark(prev => !prev)
    }
    if(path=="logout")
    {
      handleLogout();
    }
    if(path=="keyBoardShortcut")
    {
      setVisibleRight(true);
    }
  };
  const handleNavigate = path => {
    setDrawerOpen(false); // Close the drawer when navigating
    navigate(path);
  };
//

//  const location = useLocation();
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [purchaseShow, setPurchaseShow] = useState(null);
//   const [settingShow, setSettingShow] = useState(null);
//   const [reportsAndExpense, setReportsAndExpense] = useState(null);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [salesOpen, setSalesOpen] = useState(false);

//   const handleNavigate = (path) => {
//     setDrawerOpen(false); // Close the drawer when navigating
//     navigate(path);
//   };

//   const handleUserDetailClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//    const handleSettingClick = (event) => {
//     setSettingShow(event.currentTarget);
//   };
//   const handleReportsAndExpenseClick = (event) => {
//     setReportsAndExpense(event.currentTarget);
//   };

//   const handleUserDetailClose = (path) => {
//     setAnchorEl(null);
//     if (path) {
//       handleNavigate(path);
//     }
//   };
//   const handleSettingClose = (path) => {
//     setSettingShow(null);
//     if (path) {
//       handleNavigate(path);
//     }
//   };
//   const handlePurchaseClose = (path) => {
//     setPurchaseShow(null);
//     if (path) {
//       handleNavigate(path);
//     }
//   };
//   const handleReportsAndExpenseClose = (path) => {
//     setReportsAndExpense(null);
//     if (path) {
//       handleNavigate(path);
//     }
//   };
//   const handlePurchaseClick = (event) => {
//     setPurchaseShow(event.currentTarget);
//   };

//   const isActive = (path) => location.pathname === path;



  return (
    <div className="font-roboto bg-gray-200">
      <Toast ref={toast} />
      <div className="flex h-14 items-center dark:bg-gray-800 justify-between gap-8 px-4 sm:px-6 bg-[#3A5B76] w-screen p-6">
        <div>
          {/* here it is for logo */}
          {business_name.length > 0 ? (
            <>
              {business_name[0].vendor_logo != null ? (
                <img
                  src={business_name[0].vendor_logo}
                  alt="Logo Preview"
                  className="sm:w-20 sm:h-10 h-5 w-10 object-contain"
                />
              ) : (
                <span className="font-bold text-5xl rounded text-white">
                  {business_name[0].vendor_business_legal_name
                    .substring(0, 1)
                    .toUpperCase()}
                </span>
              )}
            </>
          ) : (
            <div className=''>
            <Skeleton className='top-4' width="10rem" height="3rem"></Skeleton>
            </div>
          )}
          <span className="text-white text-2xl ms-1 font-bold">
            {business_name.length > 0
              ? business_name[0].vendor_business_legal_name.toUpperCase()
              : ''}
          </span>
        </div>
        {
          userName!=""?(
            <div className='me-7'>
              <Button
          sx={{
            backgroundColor:"white",
            color: '#3a5b76',
            fontWeight:"bold",
            // borderBottom:
            //   isActive(`/invoices`) ||
            //   isActive(`/quotation`) ||
            //   isActive(`/deliverychallan-table`) ||
            //   isActive(`/inventory`) ||
            //   isActive(`/paymentIn`) ||
            //   anchorEl
            //     ? '3px solid #3a5b76'
            //     : 'none',
            border:'1px solid white',
            borderRadius: '10px',
            px: 3,
          }}
          onClick={handleUserDetailClick}
        >
          {userName+""+"▼"}
        </Button>
         {/* User detail menu */}
        <Menu
          id="user-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => handleUserDetailClose()}
        >
          {
            !isdark ?(
              <MenuItem onClick={() => handleUserDetailClose("theme")}>
             Switch To Dark Mode
          </MenuItem>
            ):(
              <MenuItem onClick={() => handleUserDetailClose("theme")}>
             Switch To Light Mode
          </MenuItem>
            )
          }
          <MenuItem
          sx={{
            
          }}
          onClick={() => handleUserDetailClose('keyBoardShortcut')}>
             Key Board Shortcut's
          </MenuItem>
          <Button
            fullWidth
            color='black'
            sx={{
              px:2,
              justifyContent:"left",
            }}
            onClick={() => {
              // Add your logout logic here
              handleUserDetailClose("logout");
            }}
          >
            Logout
          </Button>
        </Menu>
        </div>
          ):(
            <></>
          )
        }
        {/* <button
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
        </button> */}
            {/* {userRole == 'owner' ||
            userRole == 'partner' ||
            userRole == 'salesPerson' ? (
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
            ) : (
              <div className="justify-content p-1">
                <Dropdown
                  disabled
                  value={selectedCity}
                  onChange={handleChange}
                  options={cities}
                  optionLabel="name"
                  placeholder="Create +"
                  className="disabled:opacity-70 disabled:text-gray-200 w-full md:w-14rem"
                />
              </div>
            )} */}
            {/* Shortcut Icon */}
            {/* <div className="justify-content p-1">
              <button type="button" onClick={() => setVisibleRight(true)}>
                <svg
                  className="absolute right-48 bg-white rounded-full top-2.5 w-9 p-2 text-gray-700"
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
            </div> */}
             {/* Keyboard shortcut sidebar */}
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
            {/* {!isdark ? (
              <div className="justify-content p-1">
                <button onClick={() => setDark(prev => !prev)}>
                  <svg
                    className="absolute right-36 bg-white rounded-full top-2.5 w-9 p-2 text-gray-700"
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
                <button onClick={() => setDark(prev => !prev)}>
                  <svg
                    className="absolute right-36 bg-white rounded-full top-2.5 w-9 p-2 text-yellow-500 dark:bg-gray-800 dark:!text-gray-800"
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
            )} */}

            {/* Notification Icon */}
            {/* <form className="justify-content p-1">
              <button>
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
                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
                  />
                </svg>
              </button>
            </form> */}
            {/* Shortcut icon */}
            {/* <form className="justify-content p-1">
              <button>
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
                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
                  />
                </svg>
              </button>
            </form> */}
            {/* Profile Icon */}
            {/* <form className="justify-content p-1">
              <button type="button" onClick={e => handleBussinessCheck(e)}>
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
            </form> */}

            {/* Logout Icon */}
            {/* <form className="justify-content p-1">
              <button
                type="button"
                onClick={(e) => handleLogout(e)}
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
            </form> */}
          </div>
      <div className='bg-white'>
             {/* Render sidebar based on user role */}
            {
              (userRole=="owner" || userRole=="partner") && (
                <OwnerSideBar data={business_name}/>
              )
            }
            {
              userRole=="deliveryBoy" && (
                <DeliveryBoySidebar data={business_name}/>
              )
            }
            {
              userRole=="salesPerson" && (
                <SalesPersonSidebar data={business_name}/>
              )
            }
             {
              userRole=="stockManager" && (
                <StockManagerSidebar data={business_name}/>
              )
            }
    </div>
    </div>
  );
};

export default Sidebar;