//mera code with phone functionality 

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { apiPost } from '../services/api';
import storage from '../utils/storage';
import customer from '../assets/customer.png';
import owner from '../assets/owner.png';
import { toast } from 'react-hot-toast';

const UserAccess = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [role, setRole] = useState('');
  const [otp, setOtp] = useState('');
  const [emailToken, setEmailToken] = useState('');
  const [phoneToken, setPhoneToken] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [showEmailOtpBox, setShowEmailOtpBox] = useState(false);
  const [showPhoneOtpBox, setShowPhoneOtpBox] = useState(false);
  const [otpContext, setOtpContext] = useState('');
  const [verificationRequestId, setVerificationRequestId] = useState('');
  const [activeOtpType, setActiveOtpType] = useState('');
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [verifyingCheckbox, setVerifyingCheckbox] = useState(false);
    const [submitting, setSubmitting] = useState(false); // ✅ new state


  const location = useLocation();
  const navigate = useNavigate();

  const previousIdentifier = location.state?.identifier || storage.getItem('identifier')?.replace(/"/g, '') || '';
  const identifierType = previousIdentifier.includes('@') ? 'email' : 'phone';

  // const sendOtp = async (type) => {
  //   const identifier = type === 'email' ? email : phone;

  //   if (type === 'phone' && (!/^\d{10}$/.test(phone))) {
  //     alert('Please enter a valid 10-digit phone number.');
  //     return;
  //   }
  //   if (type === 'email' && !/^[\w.-]+@[\w.-]+\.\w{2,}$/.test(email)) {
  //     alert('Please enter a valid email address.');
  //     return;
  //   }

  //   const token = storage.getItem('token');
  //   try {
  //     const res = await apiPost('/user/communication', { identifier }, {
  //       headers: { Authorization: `Bearer ${token}` }
  //     });
  //     setVerificationRequestId(res.data.requestId);
  //     setOtpContext(res.data.context);
  //     setActiveOtpType(type);
  //     if (type === 'email') setShowEmailOtpBox(true);
  //     else setShowPhoneOtpBox(true);
  //     alert(`OTP sent to ${type}`);
  //   } catch (err) {
  //     const errorMsg = err?.response?.data?.message || `Failed to send ${type} OTP`;
  //     alert(errorMsg);
  //   }
  // };

  const sendOtp = async (type) => {
  const identifier = type === 'email' ? email : phone;

  if (type === 'phone' && (!/^\d{10}$/.test(phone))) {
    alert('Please enter a valid 10-digit phone number.');
    return;
  }
  if (type === 'email' && !/^[\w.-]+@[\w.-]+\.\w{2,}$/.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  const token = storage.getItem('token');
  try {
    const res = await apiPost('/user/communication', { identifier }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    // ✅ agar direct token mila to OTP ki zaroorat nahi
    if (res.identifierToken) {
      if (type === 'email') {
        setIsEmailVerified(true);
        setEmailToken(res.identifierToken);
        setShowEmailOtpBox(false); 
        storage.setItem('emailToken', res.identifierToken);
        toast.success('Email already verified ✅');
      } else {
        setIsPhoneVerified(true);
        setPhoneToken(res.identifierToken);
        setShowPhoneOtpBox(false); 
        storage.setItem('phoneToken', res.identifierToken);
        toast.success('Phone already verified ✅');
      }
      return;
    }

    // ⚡ agar token nahi mila → OTP flow
    setVerificationRequestId(res.requestId);
    setOtpContext(res.context);
    setActiveOtpType(type);

    if (type === 'email') setShowEmailOtpBox(true);
    else setShowPhoneOtpBox(true);

    toast.success(`OTP sent to ${type}`);
  } catch (err) {
    const errorMsg = err?.response?.message || `Failed to send ${type} OTP`;
    toast.error(errorMsg);
  }
};

  const verifyOtp = async () => {
    const identifier = activeOtpType === 'email' ? email : phone;
    const token = storage.getItem('token');
    try {
      const res = await apiPost('/user/verify/otp', {
        identifier,
        requestId: verificationRequestId,
        otp,
        context: otpContext || `${activeOtpType}-verify`,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.success) {
        const returnedToken = res.identifierToken;
        if (activeOtpType === 'email') {
          setIsEmailVerified(true);
          setEmailToken(returnedToken);
          setShowEmailOtpBox(false);
        } else {
          setIsPhoneVerified(true);
          setPhoneToken(returnedToken);
          setShowPhoneOtpBox(false);
        }
        toast.success(`${activeOtpType} verified successfully`);
      } else {
        toast.error('Invalid OTP');
      }
    } catch {
      toast.error('OTP verification failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName  || !city || !pincode || !role) {
      alert('Please complete all fields.');
      return;
    }

    if (!isEmailVerified && !isPhoneVerified) {
      alert('Please verify email or phone before submitting.');
      return;
    }

    const payload = {
      name: firstName,
      lastName,
      phone,
      email,
      city,
      pincode,
      role: role.toLowerCase(),
      ...(isEmailVerified && emailToken && { emailToken }),
      ...(isPhoneVerified && phoneToken && { phoneToken }),
    };

    try {
      setSubmitting(true); // ✅ disable button + show loading
      const token = storage.getItem('token');
      await apiPost('/user/profile', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
    
     toast.success('Profile created successfully!');
      navigate(role === 'Owner' ? '/minimal-dashboard' : '/login/customers-dashboard');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Something went wrong.');
 } finally {
      setSubmitting(false); // ✅ re-enable button
    }  };

  return (
    <form onSubmit={handleSubmit} className="w-full mx-auto p-16 bg-white rounded-2xl space-y-8">
      {/* <h2 className="text-3xl font-bold  text-orange-500 underline"> ← Create User Profile</h2> */}
     <div  
     onClick={() => navigate(-1)}
     className="flex text-3xl font-bold cursor-pointer text-orange-500 gap-2">
       ←   
      <span className="underline"> Create User Profile</span></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 text-sm  font-medium">First Name*</label>
          <input type="text" className="w-full px-4 py-3 bg-gray-100 border-2 rounded-xl" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder='Enter First Name' required />
        </div>

        <div>
          <label className="block mb-2 text-sm  font-medium">Last Name*</label>
          <input type="text" className="w-full px-4 py-3 bg-gray-100 border-2 rounded-xl" value={lastName} onChange={e => setLastName(e.target.value)} placeholder='Enter last Name' required />
        </div>


<div>
  <label className="block mb-2 text-sm font-medium">Phone*</label>

  <div className="flex items-center w-full px-4 py-3 bg-gray-100 border-2 rounded-xl">
   
    <input
  type="tel"
  className="flex-grow bg-transparent outline-none text-sm"
  placeholder="Enter Phone Number"
  value={phone}
  disabled={isPhoneVerified && phone === previousIdentifier}
  onChange={(e) => {
    const val = e.target.value;
    setPhone(val);
    setIsPhoneVerified(false);
    setPhoneToken('');
    setCheckboxChecked(false);
  }}
  required={!isEmailVerified} // only required if email is not verified
  
/>

    <button
      type="button"
      onClick={() => sendOtp('phone')}
      disabled={isPhoneVerified}
      className={`ml-2 text-sm text-black ${isPhoneVerified ? 'cursor-not-allowed' : 'hover:text-orange-600'}`}
    >
      {isPhoneVerified ? '✅' : 'Verify'}
    </button>
  </div>

  {showPhoneOtpBox && activeOtpType === 'phone' && (
    <div className="mt-2">
      <label className="block mb-2 text-sm font-medium">Enter Phone OTP</label>
      <input type="text" className="w-full px-4 py-2 border rounded mb-2" value={otp} onChange={(e) => setOtp(e.target.value)} />
      <button type="button" onClick={verifyOtp} className="text-white px-3 py-1 rounded-xl hover:bg-green-600 bg-green-500">
        Submit OTP
      </button>
    </div>
  )}

  {previousIdentifier && identifierType === 'phone' && !isPhoneVerified && (
    <div className="flex items-center gap-2 mt-2">
      <input
        type="checkbox"
        id="use-previous-phone"
        checked={checkboxChecked}
        disabled={isPhoneVerified || verifyingCheckbox}
        onChange={async (e) => {
          const checked = e.target.checked;
          setCheckboxChecked(checked);
          if (!checked) {
            setPhone('');
            return;
          }

          const token = storage.getItem('token');
          try {
            const res = await apiPost('/user/communication', {
              identifier: previousIdentifier
            }, {
              headers: { Authorization: `Bearer ${token}` }
            });

            const identifierToken = res.identifierToken;
            setPhone(previousIdentifier);
            setPhoneToken(identifierToken);
            setIsPhoneVerified(true);
            storage.setItem('phoneToken', identifierToken);

            toast.success('Phone verified successfully');
          } catch {
            toast.error('Checkbox phone verification failed');
            setCheckboxChecked(false);
          }
        }}
      />
      <label htmlFor="use-previous-phone" className="text-sm font-bold">
        Use previously verified phone: {previousIdentifier}
      </label>
      {isPhoneVerified && <span className="">✅</span>}
    </div>
  )}
</div>



        {/* Email */}
<div>
  <label className="block mb-2 text-sm font-medium">Email*</label>

  <div className="flex items-center w-full px-4 py-3 bg-gray-100 border-2 rounded-xl">
   
    <input
  type="email"
  className="flex-grow bg-transparent outline-none text-sm"
  placeholder="Enter Email Address"
  value={email}
  disabled={isEmailVerified && email === previousIdentifier}
  onChange={(e) => {
    const val = e.target.value;
    setEmail(val);
    setIsEmailVerified(false);
    setEmailToken('');
    setCheckboxChecked(false);
  }}
  required={!isPhoneVerified} // only required if phone is not verified
/>

    
    <button
      type="button"
      onClick={() => sendOtp('email')}
      disabled={isEmailVerified}
      className={`ml-2 text-sm text-black ${isEmailVerified ? 'cursor-not-allowed' : 'hover:text-orange-600'}`}
    >
      {isEmailVerified ? '✅' : 'Verify'}
    </button>
  </div>

  {showEmailOtpBox && activeOtpType === 'email' && (
    <div className="mt-2">
      <label className="block mb-2 text-sm font-medium">Enter Email OTP</label>
      <input type="text" className="w-full px-4 py-2 border rounded mb-2" value={otp} onChange={(e) => setOtp(e.target.value)} />
      <button type="button" onClick={verifyOtp} className="text-white px-3 py-1 rounded-xl hover:bg-green-600 bg-green-500">
        Submit OTP
      </button>
    </div>
  )}

  {previousIdentifier && identifierType === 'email' && !isEmailVerified && (
    <div className="flex items-center gap-2 mt-2">
      <input
        type="checkbox"
        id="use-previous-email"
        checked={checkboxChecked}
        disabled={isEmailVerified || verifyingCheckbox}
        onChange={async (e) => {
          const checked = e.target.checked;
          setCheckboxChecked(checked);
          if (!checked) {
            setEmail('');
            return;
          }

          const token = storage.getItem('token');
          try {
            const res = await apiPost('/user/communication', {
              identifier: previousIdentifier
            }, {
              headers: { Authorization: `Bearer ${token}` }
            });

            const identifierToken = res.identifierToken;
            setEmail(previousIdentifier);
            setEmailToken(identifierToken);
            setIsEmailVerified(true);
            storage.setItem('emailToken', identifierToken);

            toast.success('Email verified successfully');
          } catch {
            toast.error('Checkbox email verification failed');
            setCheckboxChecked(false);
          }
        }}
      />
      <label htmlFor="use-previous-email" className="text-sm font-bold">
        Use previously verified email: {previousIdentifier}
      </label>
      {isEmailVerified && <span className="">✅</span>}
    </div>
  )}
</div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 text-sm  font-medium">City*</label>
          <input type="text" className="w-full px-4 py-3 bg-gray-100 border-2  rounded-xl" value={city} onChange={e => setCity(e.target.value)} placeholder='Enter city ' required />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">Pincode*</label>
          <input type="text" className="w-full px-4 py-3 bg-gray-100 border-2  rounded-xl" value={pincode} onChange={e => setPincode(e.target.value)}   placeholder='Enter Pincode' required />
        </div>

        <div>
          <label className="block mb-2 text-sm  font-medium">Role*</label>
          <div className="flex justify-between gap-4 mb-6">
            {['Customer', 'Owner'].map((r) => (
              <div
                key={r}
                onClick={() => setRole(r)}
                className={`flex-1 p-4 text-center border-2 rounded-xl  cursor-pointer transition ${role === r ? 'bg-orange-300 text-black' : 'bg-white text-black'}`}
              >
                <div className="font-semibold text-lg mb-2 ">{r}</div>
                <div className="flex justify-center">
                  <img
                    src={r === 'Owner' ? owner : customer}
                    alt={`${r} illustration`}
                    className="w-20 h-20 object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center">
   <button
          type="submit"
          disabled={submitting}
          className={`w-1/3 font-semibold py-3 rounded-xl transition text-white ${
            submitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-orange-500 hover:bg-orange-600 cursor-pointer'
          }`}
        >
          {submitting ? 'Submitting...' : 'Submit Details'}
        </button>        <button className="mt-2 text-sm text-orange-500 underline hover:text-orange-600 transition">Email Or Phone Needs To Be verified Before Submission</button>
      </div>
    </form>
  );
};

export default UserAccess;
