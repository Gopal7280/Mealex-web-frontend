

import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { apiPost } from '../services/api';
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
const LoginRegister = ({ setAuth }) => {
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
        console.log('✅ Facebook SDK initialized');
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
  //     const response = await apiPost('/login', { identifier: normalizedIdentifier, password });
  // console.log(response)
  //     const JWT = response.data.token;
  //     storage.setItem('identifier', response.data.identifier);
  //     storage.setItem('token', JWT);
  //     setToken(JWT);
  //     setAuth(true);
  //           await initFCM(); // <-- yaha call karna hai


  //     if (response.data.isOwner && response.data.isCustomer) {
  //       navigate('/minimal-dashboard');
  //       storage.setItem('roles', 'both');
  //     } else if (response.data.isCustomer) {
  //       storage.setItem('role', 'customer');
  //       navigate('customers-dashboard');
  //       toast.success('🎉 Logged In As Customer!');
  //     } else if (response.data.isOwner ) {
  //       navigate('/minimal-dashboard');
  //       toast.success('🎉 Logged In As Owner!');
  //     } else {
  //       navigate('/user-access');
  //     }
  //   } catch (err) {
  //     setError(err.response?.data?.message || 'Login failed. Try again!');
  //   } finally {
  //     setLoader(false);
  //   }
  // };

const handleLogin = async e => {
  e.preventDefault();
  setError('');

  const normalizedIdentifier = identifier.includes('@') ? identifier.toLowerCase() : identifier;

  try {
    setLoader(true);
    const response = await apiPost('/login', { identifier: normalizedIdentifier, password });
    console.log(response);

    const JWT = response.data.token;
    storage.setItem('identifier', response.data.identifier);
    storage.setItem('token', JWT);
    setToken(JWT);
    setAuth(true);

    // ✅ FCM setup turant login ke baad
    await setupNotifications(JWT);

    if (response.data.isOwner && response.data.isCustomer) {
      navigate('/minimal-dashboard');
      storage.setItem('roles', 'both');
    } else if (response.data.isCustomer) {
      storage.setItem('role', 'customer');
      navigate('customers-dashboard');
      toast.success('🎉 Logged In As Customer!');
    } else if (response.data.isOwner) {
      navigate('/minimal-dashboard');
      toast.success('🎉 Logged In As Owner!');
    } else {
      navigate('/user-access');
    }
  } catch (err) {
    setError(err.response?.data?.message || 'Login failed. Try again!');
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
      const res = await apiPost('/register', {
        identifier: normalizedIdentifier,
        password,
        confirmPassword
      });
      console.log(res)

      const data = res.data;
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

  const handleGoogleSuccess = async credentialResponse => {
    try {
      const idToken = credentialResponse.credential;
      const res = await apiPost('/google-auth', { idToken });

      if (res.success) {
        navigate('/user-access');
      } else {
        console.error('Google Sign-in failed:', res.message);
      }
    } catch (err) {
      console.error('Google Sign-in error:', err);
    }
  };

  const forgotPassword = async () => {
    if (!modalIdentifier) {
      setError('Please enter email or phone number');
      return;
    }
    try {
      const res = await apiPost('/forget-password', { identifier: modalIdentifier });
      const { requestId, identifierType, context } = res.data;

      setVisible(false); 
      navigate('/reset-otp', { state: { identifier: modalIdentifier, identifierType, requestId, context } });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    }
  };

  return (
    <div className="flex min-h-screen bg-white relative px-4 sm:px-6 lg:px-8">
      <img src={handdrawn} alt="Top Decoration" className="absolute top-0 md:right-0 w-24 sm:w-28 md:w-36 h-auto object-contain z-10" />
      <img src={handdrawnn} alt="Bottom Decoration" className="absolute bottom-0 md:left-0 w-24 sm:w-28 md:w-36 h-auto object-contain z-10" />

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
