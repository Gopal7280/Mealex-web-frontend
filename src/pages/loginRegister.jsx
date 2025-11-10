

import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { apiPost ,apiGet} from '../services/api';
import { setToken } from '../services/authService';
import mealx from '../assets/mealx.png';
import handdrawn from '../assets/handdrawnu.png';
import handdrawnn from '../assets/handdrawnn.png';
import { setupNotifications } from '../App';
import { GoogleLogin } from '@react-oauth/google';
import { Dialog } from 'primereact/dialog';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import storage from '../utils/storage'; // adjust the path as needed
import { toast } from 'react-hot-toast';
// import { initFCM } from firebase.js' // ✅ new
import { initFCM } from '../firebase';


// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
const LoginRegister = ({ setAuth,setUserRole  }) => {
  const [formType, setFormType] = useState('login');
  const [identifier, setIdentifier] = useState('');
  const [modalIdentifier, setModalIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loader, setLoader] = useState(false);
  const [visible, setVisible] = useState(false); // <-- modal state
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    digit: false,
    specialChar: false,
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state === 'register') {
      setFormType('register');
    }

    const loadFacebookSDK = () => {
      // Initialize after SDK is loaded
      window.fbAsyncInit = function () {
        window.FB.init({
          appId: '1872168373633528',
          cookie: true,
          xfbml: false,
          version: 'v18.0',
        });
      };

      // Inject Facebook SDK script dynamically
      if (!document.getElementById('facebook-jssdk')) {
        const script = document.createElement('script');
        script.id = 'facebook-jssdk';
        script.src = 'https://connect.facebook.net/en_US/sdk.js';
        document.body.appendChild(script);
      }
    };

    loadFacebookSDK();
  }, [location.state]);

  const validatePassword = pwd => {
    setPasswordValidations({
      length: pwd.length >= 8,
      lowercase: /[a-z]/.test(pwd),
      uppercase: /[A-Z]/.test(pwd),
      digit: /\d/.test(pwd),
      specialChar: /[\W_]/.test(pwd),
    });
  };


// const handleLogin = async e => {
//   e.preventDefault();
//   setError('');

//   const normalizedIdentifier = identifier.includes('@') ? identifier.toLowerCase() : identifier;

//   try {
//     setLoader(true);
//     const data = await apiPost('/login', { identifier: normalizedIdentifier, password });
//     console.log('Login response data:', data); // ✅ log entire response

//     const JWT = data.token; // ✅ correct
//     storage.setItem('identifier', data.identifier);
//     storage.setItem('token', JWT);
//     setToken(JWT);
//     setAuth(true); // ✅ triggers UI update

//     await setupNotifications(JWT);

//     if (data.isOwner && data.isCustomer) {
//   navigate('/minimal-dashboard', { state: { customerId: data.id } });
//       storage.setItem('customerId', data.id); // simple customer
//         setUserRole('both'); // ✅ <--- add this
//       storage.setItem('roles', 'both');
//     } else if (data.isCustomer) {
//       storage.setItem('role', 'customer');
//       storage.setItem('customerId', data.id); // simple customer
//         setUserRole('customer'); // ✅ <--- add this
//       navigate('customers-dashboard');
//       toast.success('🎉 Logged In As Customer!');
//     } else if (data.isOwner) {
//       storage.setItem('role', 'owner');
//         setUserRole('owner'); // ✅ <--- add this
//       navigate('/minimal-dashboard');
//       toast.success('🎉 Logged In As Owner!');
//     } else {
//   navigate('/user-access', { 
//     state: { 
//       customerId: data.id  // ✅ PASS ID HERE
//     } 
//   });
//     }
//   } catch (err) {
//     setError(err.response?.data?.message || 'Login failed. Try again!');
//   } finally {
//     setLoader(false);
//   }
// };


const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  const normalizedIdentifier = identifier.includes("@")
    ? identifier.toLowerCase()
    : identifier;

  try {
    setLoader(true);
    const data = await apiPost("/login", {
      identifier: normalizedIdentifier,
      password,
    });
  console.log("Login response data:", data); // ✅ log entire response
    const JWT = data.token;
    storage.setItem("identifier", data.identifier);
    storage.setItem("token", JWT);
    console.log("Storing Customer ID:", data.id); // ✅ log ID before storing
    storage.setItem("customerId", data.id); 
    setToken(JWT);
    setAuth(true);
   console.log("Customer ID stored:", data.id); // ✅ confirm ID storage
    await setupNotifications(JWT);

    // ✅ CASE 1: OWNER + CUSTOMER
    if (data.isOwner && data.isCustomer) {
      console.log("User is both Owner and Customer");
      storage.setItem("roles", "both");
      setUserRole("both");
 console.log("Checking for messes for Owner...");
      // ✅ CHECK IF OWNER HAS ANY MESS
      const res = await apiGet("/owner/mess/all");
      console.log("Messes response for Owner:", res);
      const messes = res?.data || [];
 
      if (messes.length > 0) {
        console.log("Messes found for Owner:", messes);
        // ✅ Mess exists → Go to Minimal Dashboard
        navigate("/minimal-dashboard", { state: { customerId: data.id } });
      } else {
        // ❌ No Mess → Go to Customer Dashboard directly
        navigate("/login/customers-dashboard");
        toast.success("✔ Logged in as Customer");
      }

    // ✅ CASE 2: ONLY CUSTOMER
    } else if (data.isCustomer) {
      storage.setItem("role", "customer");
      setUserRole("customer");
      navigate("customers-dashboard");
      toast.success("🎉 Logged In As Customer!");

    // ✅ CASE 3: ONLY OWNER
    } else if (data.isOwner) {
      storage.setItem("role", "owner");
      setUserRole("owner");
      navigate("/minimal-dashboard");
      toast.success("🎉 Logged In As Owner!");
    }

    // OPTIONAL CASE: NO ROLE ASSIGNED
    else {
      navigate("/user-access", {
        state: { customerId: data.id },
      });
    }
  } catch (err) {
    setError(err.response?.data?.message || "Login failed. Try again!");
  } finally {
    setLoader(false);
  }
};


const handleRegister = async e => {
  e.preventDefault();
  if (!identifier || !password || !confirmPassword) {
    setErrorMsg('Please fill all fields correctly.');
    return;
  }
  if (password !== confirmPassword) {
    setError('Passwords do not match!');
    return;
  }

  const normalizedIdentifier = identifier.includes('@') ? identifier.toLowerCase() : identifier;

  try {
    setLoader(true);
    // ✅ new apiPost returns data directly, not response.data
    const data = await apiPost('/register', {
      identifier: normalizedIdentifier,
      password,
      confirmPassword
    });
    console.log('Registration response data:', data); // ✅ log entire response
    if (data.success && data.requestId) {
      navigate('/otp-verification', {
        state: {
          identifier: data.identifier,
          identifierType: data.identifierType,
          requestId: data.requestId,
          context: data.context || 'registration',
        },
      });
    } else {
      setErrorMsg(data.message || 'Registration failed. Try again.');
    }
  } catch (err) {
    setErrorMsg(err.response?.data?.message || 'Network error. Please try again.');
  } finally {
    setLoader(false);
  }
};


  
// const handleGoogleSuccess = async (credentialResponse) => {
//   try {
//     const idToken = credentialResponse.credential;
//     const res = await apiPost('/google-auth', { idToken });
//    console.log('Google Auth response:', res);
//     if (res.success) {
//       // Store token & identifier
//       const { token, identifier, identifierType, isOwner, isCustomer } = res;

//       storage.setItem('token', token);
//       storage.setItem('identifier', identifier);
//       setToken(token);

    

//       // Navigate based on role, same as handleLogin
//       if (isOwner && isCustomer) {
//         storage.setItem('roles', 'both');
//         storage.setItem('customerId', res.id); // simple customer
//         setUserRole('both'); // ✅ <--- add this

//   navigate('/minimal-dashboard', { state: { customerId: res.id } });
//       } else if (isCustomer) {
//         storage.setItem('role', 'customer');
//         storage.setItem('customerId', res.id); // simple customer
//           setUserRole('customer'); // ✅ <--- add this

//         navigate('customers-dashboard');
//         toast.success('🎉 Logged In As Customer!');
//       } else if (isOwner) {
//         storage.setItem('role', 'owner');
//           setUserRole('owner'); // ✅ <--- add this

//         navigate('/minimal-dashboard');
//         toast.success('🎉 Logged In As Owner!');
//       } else {
//                 storage.setItem('customerId', res.id); // simple customer
//         navigate('/user-access', {
//           state: { identifier, identifierType, token ,customerId: res.id}
//         });
//       }
//     } else {
//       toast.error(res.message || 'Google Sign-In failed');
//     }
//   } catch (err) {
//     console.error('Google login error:', err);
//     toast.error('Something went wrong with Google Sign-In');
//   }
// };


const handleGoogleSuccess = async (credentialResponse) => {
  try {
    const idToken = credentialResponse.credential;
    const res = await apiPost('/google-auth', { idToken });
    console.log('Google Auth response:', res);

    if (res.success) {
      const { token, identifier, identifierType, isOwner, isCustomer, id } = res;

      storage.setItem('token', token);
      storage.setItem('identifier', identifier);
      storage.setItem('customerId', id);
      setToken(token);
      await setupNotifications(token);

      // ✅ CASE 1: OWNER + CUSTOMER
      if (isOwner && isCustomer) {
        console.log('User is both Owner and Customer');
        storage.setItem('roles', 'both');
        setUserRole('both');

        // ✅ Check if owner has any messes
        console.log('Checking messes for owner...');
        const messRes = await apiGet('/owner/mess/all');
        const messes = messRes?.data || [];

        if (messes.length > 0) {
          console.log('Messes found for Owner:', messes);
          navigate('/minimal-dashboard', { state: { customerId: id } });
        } else {
          console.log('No mess found for owner — redirecting to Customer Dashboard');
          navigate('/login/customers-dashboard');
          toast.success('✔ Logged in as Customer ');
        }
      }

      // ✅ CASE 2: ONLY CUSTOMER
      else if (isCustomer) {
        storage.setItem('role', 'customer');
        setUserRole('customer');
        navigate('customers-dashboard');
        toast.success('🎉 Logged In As Customer!');
      }

      // ✅ CASE 3: ONLY OWNER
      else if (isOwner) {
        storage.setItem('role', 'owner');
        setUserRole('owner');
        navigate('/minimal-dashboard');
        toast.success('🎉 Logged In As Owner!');
      }

      // ✅ CASE 4: NO ROLE ASSIGNED
      else {
        navigate('/user-access', {
          state: { identifier, identifierType, token, customerId: id },
        });
      }
    } else {
      toast.error(res.message || 'Google Sign-In failed');
    }
  } catch (err) {
    console.error('Google login error:', err);
    toast.error('Something went wrong with Google Sign-In');
  }
};



  const forgotPassword = async () => {
    if (!modalIdentifier) {
      setError('Please enter email or phone number');
      return;
    }
    try {
      const res = await apiPost('/forget-password', { identifier: modalIdentifier });
      console.log('Forgot password response:', res);
      const { requestId, identifierType, context } = res;
      toast.success('OTP sent successfully to your ' + identifierType);

      setVisible(false); 
      navigate('/reset-otp', { state: { identifier: modalIdentifier, identifierType, requestId, context } });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    }
  };

  return (
    <div className="flex min-h-screen bg-white relative px-4 sm:px-6 lg:px-8">
      {/* <img src={handdrawn} alt="Top Decoration" className="absolute top-0 md:right-0 w-24 sm:w-28 md:w-36 h-auto object-contain z-10" />
      <img src={handdrawnn} alt="Bottom Decoration" className="absolute bottom-0 md:left-0 w-24 sm:w-28 md:w-36 h-auto object-contain z-10" /> */}

      <img
  src={handdrawn}
  alt="Top Decoration"
  className="hidden md:block absolute top-0 md:right-0 w-24 sm:w-28 md:w-36 h-auto object-contain z-10"
/>

<img
  src={handdrawnn}
  alt="Bottom Decoration"
  className="hidden md:block absolute bottom-0 md:left-0 w-24 sm:w-28 md:w-36 h-auto object-contain z-10"
/>


      <div className="flex flex-col justify-center items-center w-full max-w-md mx-auto py-8">
        <img src={mealx} alt="MealX Logo" className="w-24 sm:w-28 md:w-32 mb-6" />


        <div className="flex justify-center space-x-10 w-full mb-6">
          <button
            className={`relative pb-1 text-lg font-semibold cursor-pointer ${formType === 'login' ? 'text-black' : 'text-gray-400'}`}
            onClick={() => setFormType('login')}
          >
            Login
            {formType === 'login' && <div className="absolute bottom-0 left-0 w-full h-1 bg-orange-500 rounded-full"></div>}
          </button>
          <button
            className={`relative pb-1 text-lg font-semibold cursor-pointer ${formType === 'register' ? 'text-black' : 'text-gray-400'}`}
            onClick={() => setFormType('register')}
          >
            Register
            {formType === 'register' && <div className="absolute bottom-0 left-0 w-full h-1 bg-orange-500 rounded-full"></div>}
          </button>
        </div>

        {errorMsg && <p className="text-red-500 text-sm mb-2">{errorMsg}</p>}
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <form
          onSubmit={formType === 'login' ? handleLogin : handleRegister}
          className="w-full space-y-3"
        >
          <input
            type="text"
            placeholder="Enter Email or phone"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={identifier}
            onChange={e => setIdentifier(e.target.value)}
            required
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter Password"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={password}
              onChange={e => {
                setPassword(e.target.value);
                validatePassword(e.target.value);
                setIsPasswordMatch(e.target.value === confirmPassword);
              }}
              required
            />
            <span
              className="absolute top-3 right-4 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {formType === 'register' && (
            <>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                  value={confirmPassword}
                  onChange={e => {
                    setConfirmPassword(e.target.value);
                    setIsPasswordMatch(password === e.target.value);
                  }}
                  required
                />
                <span
                  className="absolute top-3 right-4 cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <div className="text-xs text-gray-600">
                <p
                  className={
                    passwordValidations.length &&
                    passwordValidations.lowercase &&
                    passwordValidations.uppercase &&
                    passwordValidations.digit &&
                    passwordValidations.specialChar
                      ? 'text-green-600'
                      : 'text-red-500'
                  }
                >
                  • Minimum 8 characters. Must include lowercase, uppercase, number & special character.
                </p>

                {isPasswordMatch && password.length > 0 && (
                  <div className="text-green-600 text-sm mt-1">✔️ Passwords match</div>
                )}
              </div>
            </>
          )}

          {formType === 'login' && (
            <div className="text-sm text-right">
              <button
                type="button"
                onClick={() => setVisible(true)}
                className="text-gray-500 hover:text-orange-500 cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>
          )}

<div className="text-center text-sm text-gray-500 mb-4">
  By logging in, you agree to MealEX's{' '}
  <span
    className="text-orange-500 cursor-pointer hover:underline"
    onClick={() => navigate('/privacy-policies')}
  >
    Terms & Conditions
  </span>{' '}
  and{' '}
  <span
    className="text-orange-500 cursor-pointer hover:underline"
    onClick={() => navigate('/privacy-policies')}
  >
    Privacy Policy
  </span>
  .
</div>


          <button
            type="submit"
            disabled={loader}
            className={`w-full font-semibold py-3 rounded-xl transition cursor-pointer
              ${loader
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-orange-500 text-white hover:bg-orange-600'
              }`}
          >
            {loader ? (
              <div className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>{formType === 'login' ? 'Logging in...' : 'Registering...'}</span>
              </div>
            ) : (
              formType === 'login' ? 'Login' : 'Register'
            )}
          </button>
        </form>

        <div className="flex items-center justify-center w-full my-4">
          <div className="border-t w-full border-gray-200" />
          <span className="px-4 text-gray-400 text-sm">OR</span>
          <div className="border-t w-full border-gray-200" />
        </div>
         <div className="space-y-3 justify-center flex w-full">
          <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => console.log('Login Failed')} />
        </div> 
{/* <div className="space-y-3 justify-center flex w-full">
  <GoogleLogin
    onSuccess={handleGoogleSuccess}
    onError={() => console.log('Google Login Failed')}
    useOneTap
    render={renderProps => (
      <button
        onClick={renderProps.onClick}
        disabled={renderProps.disabled}
        className="w-full bg-white border-2 border-gray-300 text-gray-700 font-semibold py-3 rounded-xl shadow-sm hover:bg-gray-50 transition cursor-pointer flex items-center justify-center gap-3"
        style={{fontSize: "16px"}}
      >
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="" className="w-5 h-5" />
        Continue with Google
      </button>
    )}
  />
</div> */}
{/* <div className="w-full h-12">
  <GoogleLogin
    onSuccess={handleGoogleSuccess}
    onError={() => console.log("Login Failed")}
    theme="outline"
    size="large"
    width="100%"
    text="continue_with"
    shape="pill"
  />
</div>
<div className="w-full">
  <GoogleLogin
    onSuccess={handleGoogleSuccess}
    onError={() => console.log("Login Failed")}
    theme="outline"
    size="large"
    width="100%"
    text="continue_with" // makes button look like a real secondary CTA
  />
</div> */}


        <Dialog
          header="Reset Password"
          visible={visible}
          style={{ width: '90%', maxWidth: '420px', borderRadius: '30px' }}
          modal
          dismissableMask
          maskClassName="bg-black/50 backdrop-blur-sm backdrop-brightness-75 border-md"
          onHide={() => setVisible(false)}
        >
          
          <div className="space-y-4 p-4 border-2 border-gray-200 rounded-lg shadow-md bg-white">
            <input
              type="text"
              placeholder="Enter Email or Phone"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={modalIdentifier}
              onChange={(e) => setModalIdentifier(e.target.value)}
            />
            
            <button
              onClick={forgotPassword}
              className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 font-semibold transition cursor-pointer"
            >
              Submit
            </button>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default LoginRegister;
