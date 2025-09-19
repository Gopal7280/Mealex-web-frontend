// src/routes/publicRoutes.jsx
import LandingPage from '../pages/landingPage'
import LoginRegister from '../pages/loginRegister'
import OtpVerification from '../pages/OtpVerification'
import UserAccess from '../pages/UserAccess'
import ResetOtp from '../pages/resetOtp'
export const publicRoutes = [

    //    const [auth, setAuth] = useState(false);

  { path: '/', element: <LandingPage setAuth={setAuth} /> },
  { path: '/login', element: <LoginRegister /> },
  { path: '/otp-verification', element: <OtpVerification /> },
  { path: '/user-access', element: <UserAccess /> },
  { path: '/reset-otp', element: <ResetOtp /> },
]
