import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Customers from '../pages/Customers';


import '../styles/index.css';
import LandingPage from '../pages/landingPage';
import OtpVerification from '../pages/OtpVerification';
import UserAccess from '../pages/UserAccess';
import ResetOtp from '../pages/resetOtp';
import MinimalDashboard from '../pages/MinimalDashboard';
import MessDetailsForm from '../pages/MessDetailsForm';
import VerifyMessOtp from '../pages/VerifyMessOtp';
import LoginRegister from '../pages/loginRegister';
import { useState } from 'react';
import MessVerificationStatus from '../pages/MessVerificationStatus';
import OwnerDashboard from '../pages/ownerDashboard';
import OwnerPlans from '../pages/OwnerPlans';
import CreatePlan from '../pages/CreatePlan';
import EditPlan from '../pages/EditPlan';
import '../styles/index.css';
import CustomerProfileOwner from '../pages/CustomerProfileforOwner';
import CustomerProfile from '../pages/CustomerProfile';
import CustomersPlan from '../pages/CustomerPlan';
import MessProfile from '../pages/MessProfile';
import Notifications from '../pages/Notifications';
import CustomerHistory from '../pages/CustomerHistory';
import PlanVerification from '../pages/PlanVerification';
import PlanHistory from '../pages/PlanHistory';
import SwitchRole from '../pages/SwitchRole';
// import AccountHistory from '../pages/AccountHistory.jsx';

// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

import '../styles/index.css';
import Orders from '../pages/Orders';
import UseTokens from '../pages/UseTokens';
import AddCustomers from '../pages/AddCustomers';
import History from '../pages/History';
import CustomerMinimalDashboard from '../pages/CustomerMinimalDashboard ';
import CustomerMessDetails from '../pages/CustomerMessDetails';
import CustomerTransactionHistory from '../pages/CustomerTransactionHistory';
import YourMess from '../pages/YourMess';
import CustomersTokens from '../pages/CustomersTokens';
import CustomerOrders from '../pages/CustomerOrders';
import CustomerDashboard from '../pages/CustomerDashboard';
import CustomerNotifications from '../pages/CustomerNotifications';
import SwitchMess from '../pages/SwitchMess';
import SwitchRoleCustomer from '../pages/SwitchRoleCustomer';
import CustomerActivePLans from '../pages/CustomerActivePlans';
import CreateLinkedAccount from '../pages/CreateLinkedAccount';
import KYC from '../pages/KYC';
import Stakeholder from '../pages/stakeholder';
import PlanotpVerification from '../pages/planotpverification';
import OwnerKYCGuide from '../pages/OwnerKycGuide';
import LinkedAccountDetails from '../pages/LinkAccountDetails';
import { PrivacyPolicy } from '../pages/PrivacyPolicy';
import DeactivateAccount from '../pages/DeactivateAccount';

function RouteComponent() {

   const [auth, setAuth] = useState(false);

    return(
      <Routes>

         <Route path="/login" element={<LoginRegister setAuth={setAuth} />} />

                 <Route path="/otp-verification" element={<OtpVerification />} />
                 <Route path="/user-access" element={<UserAccess />} />
                  <Route path="/reset-otp" element={<ResetOtp />} />
        <Route path="/" element={<LandingPage />} />

        {/* Protected Routes */}

        <Route path="/minimal-dashboard"  element={<MinimalDashboard />} />
                <Route path="/customer-minimal-dashboard"  element={<CustomerMinimalDashboard />} />

        <Route path="/mess-details"  element={<MessDetailsForm />} />
        <Route path="/verify-mess-otp" element={<VerifyMessOtp />} />
        {/* <Route path='/verification-status' element={<MessVerificationStatus/>}/> */}
        <Route path='/owner-dashboard' element={<OwnerDashboard />} />
       <Route path='/plans' element={<OwnerPlans />} />
        <Route path='/add-plan' element={<CreatePlan />} />
        <Route path="/edit-plan" element={<EditPlan />} />
<Route path="/owner/mess/id/:messId" element={<MessVerificationStatus setAuth={setAuth} />} />
<Route path="/orders" element={<Orders />} />
<Route path="/customers" element={<Customers />} />
<Route path="/owner-customer-profile" element={<CustomerProfileOwner />} />
<Route path="/customer-profile" element={<CustomerProfile />} />

<Route path="/customer-profile/plans" element={<CustomersPlan />} />
<Route path="/plan-verification" element={<PlanVerification />} />

<Route path="/customer-profile/history" element={<CustomerHistory />} />
<Route path="/customer/use-tokens" element={<UseTokens />} />
<Route path="/mess-profile" element={<MessProfile />} />
<Route path="/notifications" element={<Notifications />} />
<Route path="/add-customer" element={<AddCustomers />} />
<Route path="/history" element={<History />} />
 <Route path="/owner/history/plans" element={<PlanHistory />} />
  {/* <Route path="/owner/history/account" element={<AccountHistory />} /> */}
  <Route path="/cust/my-mess" element={<YourMess />} />
  <Route path="/customer/mess-details" element={<CustomerMessDetails />} />
    <Route path="/customer-history" element={<CustomerTransactionHistory />} />
    <Route path="/using-plans" element={<CustomersTokens />} />
    <Route path="/login/customers-dashboard" element={<CustomerDashboard />} />
        <Route path="/customers-orders" element={<CustomerOrders />} />
        <Route path="/customer-notifications" element={<CustomerNotifications />} />
        <Route path="/switch-mess" element={<SwitchMess />} />
        <Route path="/switch-role" element={<SwitchRole />} />
        <Route path="/switch-role-customer" element={<SwitchRoleCustomer />} />
        <Route path="/customer-activeplans" element={<CustomerActivePLans />} />
        <Route path="/linking-account" element={<CreateLinkedAccount />} />
        <Route path="/Mess-KYC" element={<KYC />} />
        <Route path="/create-stakeholder" element={<Stakeholder />} />
        <Route path="/plan-otp-verification" element={<PlanotpVerification />} />
        <Route path="/kyc-info" element={<OwnerKYCGuide/>} />
        <Route path="/linked-account-details" element={<LinkedAccountDetails />} />
        <Route path="/privacy-policies" element={<PrivacyPolicy/>} />
        <Route path="/deactivate" element={<DeactivateAccount/>} />



      </Routes>
    )
}

export default RouteComponent;





// // src/routes/routes.jsx
// import { Routes, Route, Navigate } from 'react-router-dom'
// import { publicRoutes } from './publicRoutes'
// import { ownerRoutes } from './ownerRoutes'
// import { customerRoutes } from './customerRoutes'
// import ProtectedRoute from './ProtectedRoute'

// function RouteComponent() {
//   return (
//     <Routes>
//       {publicRoutes.map((r, i) => (
//         <Route key={`pub-${i}`} path={r.path} element={r.element} />
//       ))}

//       {ownerRoutes.map((r, i) => (
//         <Route
//           key={`own-${i}`}
//           path={r.path}
//           element={
//             <ProtectedRoute allowedRoles={['owner']}>
//               {r.element}
//             </ProtectedRoute>
//           }
//         />
//       ))}

//       {customerRoutes.map((r, i) => (
//         <Route
//           key={`cus-${i}`}
//           path={r.path}
//           element={
//             <ProtectedRoute allowedRoles={['customer']}>
//               {r.element}
//             </ProtectedRoute>
//           }
//         />
//       ))}

//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   )
// }

// export default RouteComponent
