// // import React, { useState } from 'react';
// // import { useLocation, useNavigate } from 'react-router-dom';
// // import { apiPost } from '../services/api';

// // const ResetOtp = () => {
// //   const [otp, setOtp] = useState('');
// //   const [newPassword, setNewPassword] = useState('');
// //   const [confirmNewPassword, setConfirmNewPassword] = useState('');
// //   const [error, setError] = useState('');
// //    const [passwordValidations, setPasswordValidations] = useState({
// //     length: false,
// //     lowercase: false,
// //     uppercase: false,
// //     digit: false,
// //     specialChar: false,
// //   });
// //   const location = useLocation();
// //   const navigate = useNavigate();

// //   const { identifier, requestId, context } = location.state || {};

// //   const handleReset = async () => {
// //     if (otp.length !== 6 || newPassword.length < 6 || newPassword !== confirmNewPassword) {
// //       setError('Please check OTP and passwords');
// //       return;
// //     }

// //     try {
// //       const res = await apiPost('/otp', {
// //         identifier,
// //         otp,
// //         requestId,
// //         newPassword,
// //         confirmNewPassword,
// //         context
// //       });
// //       navigate('/login'); // or home/dashboard
// //     } catch (err) {
// //       setError(err.response?.data?.message || 'Reset failed');
// //     }
// //   };

// //    const validatePassword = pwd => {
// //     setPasswordValidations({
// //       length: pwd.length >= 8,
// //       lowercase: /[a-z]/.test(pwd),
// //       uppercase: /[A-Z]/.test(pwd),
// //       digit: /\d/.test(pwd),
// //       specialChar: /[\W_]/.test(pwd),
// //     });
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
// //       <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
// //         <h2 className="text-xl font-bold mb-4">Reset Password</h2>
// //         <input
// //           type="text"
// //           maxLength={6}
// //           placeholder="Enter OTP"
// //           value={otp}
// //           onChange={e => setOtp(e.target.value)}
// //           className="w-full mb-3 border px-3 py-2 rounded"
// //         />
// //         <input
// //           type="password"
// //           placeholder="New Password"
// //           value={newPassword}
// //           onChange={e => 
// //             setNewPassword(e.target.value)}
            
// //           className="w-full mb-3 border px-3 py-2 rounded"
// //         />
// //         <input
// //           type="password"
// //           placeholder="Confirm New Password"
// //           value={confirmNewPassword}
// //           onChange={e => setConfirmNewPassword(e.target.value)}
// //           className="w-full mb-3 border px-3 py-2 rounded"
// //         />
// //         <p
// //   className={
// //     passwordValidations.length &&
// //     passwordValidations.lowercase &&
// //     passwordValidations.uppercase &&
// //     passwordValidations.digit &&
// //     passwordValidations.specialChar
// //       ? 'text-green-600'
// //       : 'text-red-500'
// //   }
// // >
// //   • Minimum 8 characters. Must include lowercase, uppercase, number & special character.
// // </p>
// //         {error && <p className="text-red-500 mb-3">{error}</p>}
// //         <button
// //           onClick={handleReset}
// //           className="w-full bg-orange-600 text-white py-2 rounded"
// //         >
// //           Reset Password
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ResetOtp;




// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { apiPost } from '../services/api';

// const ResetOtp = () => {
//   const [otp, setOtp] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmNewPassword, setConfirmNewPassword] = useState('');
//   const [error, setError] = useState('');
//     const [isPasswordMatch, setIsPasswordMatch] = useState(false);

//   const [passwordValidations, setPasswordValidations] = useState({
//     length: false,
//     lowercase: false,
//     uppercase: false,
//     digit: false,
//     specialChar: false,
//   });

//   const location = useLocation();
//   const navigate = useNavigate();

//   const { identifier, requestId, context } = location.state || {};

//   const handleReset = async () => {
//     if (
//       otp.length !== 6 ||
//       !(
//         passwordValidations.length &&
//         passwordValidations.lowercase &&
//         passwordValidations.uppercase &&
//         passwordValidations.digit &&
//         passwordValidations.specialChar
//       ) ||
//       newPassword !== confirmNewPassword
//     ) {
//       setError('Please check OTP and passwords');
//       return;
//     }

//     try {
//       await apiPost('/forget-password/otp', {
//         identifier,
//         otp,
//         requestId,
//         newPassword,
//         confirmNewPassword,
//         context,
//       });
//       navigate('/login');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Reset failed');
//     }
//   };

//   const validatePassword = (pwd) => {
//     setPasswordValidations({
//       length: pwd.length >= 8,
//       lowercase: /[a-z]/.test(pwd),
//       uppercase: /[A-Z]/.test(pwd),
//       digit: /\d/.test(pwd),
//       specialChar: /[\W_]/.test(pwd),
//     });
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
//       <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
//         <h2 className="text-xl font-bold mb-4">Reset Password</h2>

//         <input
//           type="text"
//           maxLength={6}
//           placeholder="Enter OTP"
//           value={otp}
//           onChange={(e) => setOtp(e.target.value)}
//           className="w-full mb-3 border px-3 py-2 rounded"
//         />

//         <input
//           type="password"
//           placeholder="New Password"
//           value={newPassword}
//           onChange={(e) => {
//             setNewPassword(e.target.value);
//             validatePassword(e.target.value);
//           setIsPasswordMatch(e.target.value === confirmPassword);

//           }}
//           className="w-full mb-3 border px-3 py-2 rounded"
//         />

//         <input
//           type="password"
//           placeholder="Confirm New Password"
//           value={confirmNewPassword}
//           onChange={(e) => {
//             setConfirmNewPassword(e.target.value)}
//           }
//           className="w-full mb-3 border px-3 py-2 rounded"
//         />

//         {/* Password Validation UI */}
//         {/* <div className="text-sm mb-3 space-y-1">
//           <p
//             className={
//               passwordValidations.length ? 'text-green-600' : 'text-red-500'
//             }
//           >
//             • Minimum 8 characters
//           </p>
//           <p
//             className={
//               passwordValidations.lowercase ? 'text-green-600' : 'text-red-500'
//             }
//           >
//             • At least one lowercase letter
//           </p>
//           <p
//             className={
//               passwordValidations.uppercase ? 'text-green-600' : 'text-red-500'
//             }
//           >
//             • At least one uppercase letter
//           </p>
//           <p
//             className={
//               passwordValidations.digit ? 'text-green-600' : 'text-red-500'
//             }
//           >
//             • At least one number
//           </p>
//           <p
//             className={
//               passwordValidations.specialChar
//                 ? 'text-green-600'
//                 : 'text-red-500'
//             }
//           >
//             • At least one special character
//           </p>
//           <p
//             className={
//               confirmNewPassword && newPassword === confirmNewPassword
//                 ? 'text-green-600'
//                 : 'text-red-500'
//             }
//           >
//             • Passwords must match
//           </p>
//         </div> */}
//                     <p
//   className={
//     passwordValidations.length &&
//     passwordValidations.lowercase &&
//     passwordValidations.uppercase &&
//     passwordValidations.digit &&
//     passwordValidations.specialChar
//       ? 'text-green-600'
//       : 'text-red-500'
//   }
// >
//   • Minimum 8 characters. Must include lowercase, uppercase, number & special character.
// </p>

//         {error && <p className="text-red-500 mb-3">{error}</p>}

//         <button
//           onClick={handleReset}
//           className="w-full bg-orange-600 text-white py-2 rounded"
//         >
//           Reset Password
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ResetOtp;

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { apiPost } from '../services/api';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ResetOtp = () => {
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    digit: false,
    specialChar: false,
  });

  const location = useLocation();
  const navigate = useNavigate();
  const { identifier, requestId, context } = location.state || {};

  const handleReset = async () => {
    if (
      otp.length !== 6 ||
      !(
        passwordValidations.length &&
        passwordValidations.lowercase &&
        passwordValidations.uppercase &&
        passwordValidations.digit &&
        passwordValidations.specialChar
      ) ||
      newPassword !== confirmNewPassword
    ) {
      setError('Please check OTP and passwords');
      return;
    }

    try {
      const res= await apiPost('/forget-password/otp', {
        identifier,
        otp,
        requestId,
        newPassword,
        confirmNewPassword,
        context,
      }); 
      
      console.log('Password reset response:', res);
      toast.success('Password reset successful! Please log in.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Reset failed');
    }
  };

  const validatePassword = pwd => {
    setPasswordValidations({
      length: pwd.length >= 8,
      lowercase: /[a-z]/.test(pwd),
      uppercase: /[A-Z]/.test(pwd),
      digit: /\d/.test(pwd),
      specialChar: /[\W_]/.test(pwd),
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Reset Password</h2>

        <input
          type="text"
          maxLength={6}
          placeholder="Enter OTP"
          value={otp}
          onChange={e => setOtp(e.target.value)}
          className="w-full mb-3 border px-3 py-2 rounded"
        />

        {/* New Password with show/hide */}
        <div className="relative mb-3">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="New Password"
            value={newPassword}
            onChange={e => {
              setNewPassword(e.target.value);
              validatePassword(e.target.value);
              setIsPasswordMatch(e.target.value === confirmNewPassword);
            }}
            className="w-full border px-3 py-2 rounded"
          />
          <span
            className="absolute top-3 right-4 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Confirm Password with show/hide */}
        <div className="relative mb-3">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm New Password"
            value={confirmNewPassword}
            onChange={e => {
              setConfirmNewPassword(e.target.value);
              setIsPasswordMatch(newPassword === e.target.value);
            }}
            className="w-full border px-3 py-2 rounded"
          />
          <span
            className="absolute top-3 right-4 cursor-pointer"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Validation + Match Check */}
        <p
          className={
            passwordValidations.length &&
            passwordValidations.lowercase &&
            passwordValidations.uppercase &&
            passwordValidations.digit &&
            passwordValidations.specialChar
              ? 'text-green-600 text-sm'
              : 'text-red-500 text-sm'
          }
        >
          • Minimum 8 characters. Must include lowercase, uppercase, number & special character.
        </p>

        {isPasswordMatch && newPassword.length > 0 && (
          <div className="text-green-600 text-sm mt-1">✔️ Passwords match</div>
        )}

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <button
          onClick={handleReset}
          className="w-full bg-orange-600 cursor-pointer text-white py-2 rounded"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ResetOtp;
