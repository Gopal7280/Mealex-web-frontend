// import {
//   Routes,
//   Route,
//   Navigate,
// } from 'react-router-dom';
// import Customers from '../pages/Customers';


// import '../styles/index.css';
// import LandingPage from '../pages/landingPage';
// import OtpVerification from '../pages/OtpVerification';
// import UserAccess from '../pages/UserAccess';
// import ResetOtp from '../pages/resetOtp';
// import MinimalDashboard from '../pages/MinimalDashboard';
// import MessDetailsForm from '../pages/MessDetailsForm';
// import VerifyMessOtp from '../pages/VerifyMessOtp';
// import LoginRegister from '../pages/LoginRegister';
// import ProtectedRoute from "../routes/ProtectedRoute";

// import { useState } from 'react';
// import MessVerificationStatus from '../pages/MessVerificationStatus';
// import OwnerDashboard from '../pages/ownerDashboard';
// import OwnerPlans from '../pages/OwnerPlans';
// import CreatePlan from '../pages/CreatePlan';
// import EditPlan from '../pages/EditPlan';
// import '../styles/index.css';
// import CustomerProfileOwner from '../pages/CustomerProfileforOwner';
// import CustomerProfile from '../pages/CustomerProfile';
// import CustomersPlan from '../pages/CustomerPlan';
// import MessProfile from '../pages/MessProfile';
// import Notifications from '../pages/Notifications';
// import CustomerHistory from '../pages/CustomerHistory';
// import PlanVerification from '../pages/PlanVerification';
// import PlanHistory from '../pages/PlanHistory';
// import SwitchRole from '../pages/SwitchRole';
// // import AccountHistory from '../pages/AccountHistory.jsx';

// // import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

// import '../styles/index.css';
// import Orders from '../pages/Orders';
// import UseTokens from '../pages/UseTokens';
// import AddCustomers from '../pages/AddCustomers';
// import History from '../pages/History';
// import CustomerMinimalDashboard from '../pages/CustomerMinimalDashboard ';
// import CustomerMessDetails from '../pages/CustomerMessDetails';
// import CustomerTransactionHistory from '../pages/CustomerTransactionHistory';
// import YourMess from '../pages/YourMess';
// import CustomersTokens from '../pages/CustomersTokens';
// import CustomerOrders from '../pages/CustomerOrders';
// import CustomerDashboard from '../pages/CustomerDashboard';
// import CustomerNotifications from '../pages/CustomerNotifications';
// import SwitchMess from '../pages/SwitchMess';
// import SwitchRoleCustomer from '../pages/SwitchRoleCustomer';
// import CustomerActivePLans from '../pages/CustomerActivePlans';
// import CreateLinkedAccount from '../pages/CreateLinkedAccount';
// import KYC from '../pages/KYC';
// import Stakeholder from '../pages/stakeholder';
// import PlanotpVerification from '../pages/planotpverification';
// import OwnerKYCGuide from '../pages/OwnerKycGuide';
// import LinkedAccountDetails from '../pages/LinkAccountDetails';
// import { PrivacyPolicy } from '../pages/PrivacyPolicy';
// import DeletedAccount from '../pages/DeletedAccount';
// import CashPaymentPage from '../pages/CashPaymentPage';
// import PurchasedPlans from '../pages/PurchasedPlans';
// import CustomerPlansRequests from '../pages/CustomerPlansRequests';
// import OwnerPaymentSetup from '../pages/OwnerPaymentSetup';

// function RouteComponent() {

//    const [auth, setAuth] = useState(false);

//     return(
//       <Routes>
// {/* public Routes */}
// <Route path="/" element={<LandingPage />} />
// <Route path="/login" element={<LoginRegister setAuth={setAuth} />} />
// <Route path="/otp-verification" element={<OtpVerification />} />
// <Route path="/user-access" element={<UserAccess />} />
// <Route path="/reset-otp" element={<ResetOtp />} />
// <Route path="/privacy-policies" element={<PrivacyPolicy/>} />
// <Route path="/delete-account" element={<DeletedAccount />} />


//         {/* Protected Routes */}
// {/*owner Routes */}
//         <Route path="/minimal-dashboard"  element={<MinimalDashboard />} />
//         <Route path="/mess-details"  element={<MessDetailsForm />} />
//         <Route path="/verify-mess-otp" element={<VerifyMessOtp />} />
//          <Route path='/owner-dashboard' element={<OwnerDashboard />} />
//        <Route path='/plans' element={<OwnerPlans />} />
//         <Route path='/add-plan' element={<CreatePlan />} />
//         <Route path="/edit-plan" element={<EditPlan />} />
// <Route path="/owner/mess/id/:messId" element={<MessVerificationStatus setAuth={setAuth} />} />
// <Route path="/orders" element={<Orders />} />
// <Route path="/customers" element={<Customers />} />
// <Route path="/owner-customer-profile" element={<CustomerProfileOwner />} />
// <Route path="/customer/use-tokens" element={<UseTokens />} />
// <Route path="/plan-verification" element={<PlanVerification />} />
// <Route path="/customer-profile/plans" element={<CustomersPlan />} />
// <Route path="/customer-profile/history" element={<CustomerHistory />} />
// <Route path="/mess-profile" element={<MessProfile />} />
// <Route path="/notifications" element={<Notifications />} />
// <Route path="/add-customer" element={<AddCustomers />} />
// <Route path="/history" element={<History />} />
// <Route path="/owner/history/plans" element={<PlanHistory />} />
// <Route path="/owner/purchased-plans" element={<PurchasedPlans />} />
// <Route path="/switch-mess" element={<SwitchMess />} />
// <Route path="/switch-role" element={<SwitchRole />} />
// <Route path="/Mess-KYC" element={<KYC />} />
// <Route path="/kyc-info" element={<OwnerKYCGuide/>} />
// <Route path="/linked-account-details" element={<LinkedAccountDetails />} />
// <Route path="/owner/mess/payment-info" element={<OwnerPaymentSetup />} />
//    <Route path="/linking-account" element={<CreateLinkedAccount />} />
//         <Route path="/create-stakeholder" element={<Stakeholder />} />

//   {/* <Route path="/owner/history/account" element={<AccountHistory />} /> */}


//   {/* Customer Routes */}
//   <Route path="/cust/my-mess" element={<YourMess />} />
//   <Route path="/customer/mess-details" element={<CustomerMessDetails />} />
//     <Route path="/customer-history" element={<CustomerTransactionHistory />} />
//     <Route path="/using-plans" element={<CustomersTokens />} />
//     <Route path="/login/customers-dashboard" element={<CustomerDashboard />} />
//         <Route path="/customers-orders" element={<CustomerOrders />} />
//         <Route path="/customer-notifications" element={<CustomerNotifications />} />
//         <Route path="/switch-role-customer" element={<SwitchRoleCustomer />} />
//         <Route path="/customer-activeplans" element={<CustomerActivePLans />} />
//         <Route path="/customer-minimal-dashboard"  element={<CustomerMinimalDashboard />} />
//         <Route path="/customer-profile" element={<CustomerProfile />} />
//         <Route path="/plan-otp-verification" element={<PlanotpVerification />} /> 
//         <Route path="/customer/cash-payment/:planId" element={<CashPaymentPage />} />
//         <Route path="/customer/plans-requests" element={<CustomerPlansRequests />} />
      


//       </Routes>
//     )
// }

// export default RouteComponent;






//protected routing



import {
  Routes,
  Route,
} from 'react-router-dom';
import { useState } from 'react';
import ProtectedRoute from "../routes/ProtectedRoute";
import Customers from '../pages/Customers';
import LandingPage from '../pages/landingPage';
import OtpVerification from '../pages/OtpVerification';
import UserAccess from '../pages/UserAccess';
import ResetOtp from '../pages/resetOtp';
import MinimalDashboard from '../pages/MinimalDashboard';
import MessDetailsForm from '../pages/MessDetailsForm';
import VerifyMessOtp from '../pages/VerifyMessOtp';
import LoginRegister from '../pages/LoginRegister';
import MessVerificationStatus from '../pages/MessVerificationStatus';
import OwnerDashboard from '../pages/ownerDashboard';
import OwnerPlans from '../pages/OwnerPlans';
import CreatePlan from '../pages/CreatePlan';
import EditPlan from '../pages/EditPlan';
import CustomerProfileOwner from '../pages/CustomerProfileforOwner';
import CustomerProfile from '../pages/CustomerProfile';
import CustomersPlan from '../pages/CustomerPlan';
import MessProfile from '../pages/MessProfile';
import Notifications from '../pages/Notifications';
import CustomerHistory from '../pages/CustomerHistory';
import PlanVerification from '../pages/PlanVerification';
import PlanHistory from '../pages/PlanHistory';
import SwitchRole from '../pages/SwitchRole';
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
import DeletedAccount from '../pages/DeletedAccount';
import CashPaymentPage from '../pages/CashPaymentPage';
import PurchasedPlans from '../pages/PurchasedPlans';
import CustomerPlansRequests from '../pages/CustomerPlansRequests';
import OwnerPaymentSetup from '../pages/OwnerPaymentSetup';
import NotFoundPage from '../pages/NotFoundPage';
import OrderHistory from '../pages/OrderHistory';

function RouteComponent({setUserRole }) {
  const [auth, setAuth] = useState(false);

  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
<Route path="/login" element={<LoginRegister setAuth={setAuth} setUserRole={setUserRole} />} />
      <Route path="/otp-verification" element={<OtpVerification />} />
<Route path="/user-access" element={<UserAccess setUserRole={setUserRole} />} />
      <Route path="/reset-otp" element={<ResetOtp />} />
      <Route path="/privacy-policies" element={<PrivacyPolicy />} />
      <Route path="/delete-account" element={<DeletedAccount />} />
      <Route path="/*" element={<NotFoundPage />} />

      {/* Owner Routes */}
      <Route path="/minimal-dashboard" element={
        <ProtectedRoute allowedRoles={['owner', 'both']}>
          <MinimalDashboard />
        </ProtectedRoute>
      } />
      <Route path="/mess-details" element={
        <ProtectedRoute allowedRoles={['owner', 'both']}>
          <MessDetailsForm />
        </ProtectedRoute>
      } />
      <Route path="/verify-mess-otp" element={
        <ProtectedRoute allowedRoles={['owner', 'both']}>
          <VerifyMessOtp />
        </ProtectedRoute>
      } />
      <Route path="/owner-dashboard" element={
        <ProtectedRoute allowedRoles={['owner', 'both']}>
          <OwnerDashboard />
        </ProtectedRoute>
      } />
      <Route path="/plans" element={
        <ProtectedRoute allowedRoles={['owner', 'both']}>
          <OwnerPlans />
        </ProtectedRoute>
      } />
      <Route path="/add-plan" element={
        <ProtectedRoute allowedRoles={['owner', 'both']}>
          <CreatePlan />
        </ProtectedRoute>
      } />
      <Route path="/edit-plan" element={
        <ProtectedRoute allowedRoles={['owner', 'both']}>
          <EditPlan />
        </ProtectedRoute>
      } />
      <Route path="/own/mess/id/:messId" element={
        <ProtectedRoute allowedRoles={['owner', 'both']}>
          <MessVerificationStatus setAuth={setAuth} />
        </ProtectedRoute>
      } />
      <Route path="/orders" element={
        <ProtectedRoute allowedRoles={['owner', 'both']}>
          <Orders />
        </ProtectedRoute>
      } />
      <Route path="/customers" element={
        <ProtectedRoute allowedRoles={['owner', 'both']}>
          <Customers />
        </ProtectedRoute>
      } />
      <Route path="/owner-customer-profile" element={
        <ProtectedRoute allowedRoles={['owner', 'both']}>
          <CustomerProfileOwner />
        </ProtectedRoute>
      } />
      <Route path="/cust/use-tokens" element={
        <ProtectedRoute allowedRoles={['owner', 'both']}>
          <UseTokens />
        </ProtectedRoute>
      } />
      <Route path="/plan-verification" element={
        <ProtectedRoute allowedRoles={['owner', 'both']}>
          <PlanVerification />
        </ProtectedRoute>
      } />
          <Route path="/plan-otp-verification" element={
          <ProtectedRoute allowedRoles={['owner', 'both']}>
            <PlanotpVerification />
          </ProtectedRoute>
        } />
      <Route path="/customer-profile/plans" element={
        <ProtectedRoute allowedRoles={['owner', 'both']}>
          <CustomersPlan />
        </ProtectedRoute>
      } />
      <Route path="/customer-profile/history" element={
        <ProtectedRoute allowedRoles={['owner', 'both']}>
          <CustomerHistory />
        </ProtectedRoute>
      } />
      <Route path="/mess-profile" element={
        <ProtectedRoute allowedRoles={['owner', 'both']}>
          <MessProfile />
        </ProtectedRoute>
      } />
      <Route path="/notifications" element={
        <ProtectedRoute allowedRoles={['owner', 'both']}>
          <Notifications />
        </ProtectedRoute>
      } />
      <Route path="/add-customer" element={
        <ProtectedRoute allowedRoles={['owner', 'both']}>
          <AddCustomers />
        </ProtectedRoute>
      } />
      <Route path="/history" element={
        <ProtectedRoute allowedRoles={['owner', 'both']}>
          <History />
        </ProtectedRoute>
      } />
      <Route path="/own/history/plans" element={
        <ProtectedRoute allowedRoles={['owner', 'both']}>
          <PlanHistory />
        </ProtectedRoute>
      } />
         <Route path="/own/history/orders" element={
        <ProtectedRoute allowedRoles={['owner', 'both']}>
          <OrderHistory />
        </ProtectedRoute>
      } />
      <Route path="/own/purchased-plans" element={
        <ProtectedRoute allowedRoles={['owner', 'both']}>
          <PurchasedPlans />
        </ProtectedRoute>
      } />
      <Route path="/switch-mess" element={
        <ProtectedRoute allowedRoles={['owner', 'both']}>
          <SwitchMess />
        </ProtectedRoute>
      } />
      <Route path="/switch-role" element={
        <ProtectedRoute allowedRoles={['owner', 'both']}>
          <SwitchRole />
        </ProtectedRoute>
      } />
      <Route path="/Mess-KYC" element={
        <ProtectedRoute allowedRoles={['owner', 'both']}>
          <KYC />
        </ProtectedRoute>
      } />
      <Route path="/kyc-info" element={
        <ProtectedRoute allowedRoles={['owner', 'both']}>
          <OwnerKYCGuide />
        </ProtectedRoute>
      } />
      <Route path="/linked-account-details" element={
        <ProtectedRoute allowedRoles={['owner', 'both']}>
          <LinkedAccountDetails />
        </ProtectedRoute>
      } />
      <Route path="/own/mess/payment-info" element={
        <ProtectedRoute allowedRoles={['owner', 'both']}>
          <OwnerPaymentSetup />
        </ProtectedRoute>
      } />
      <Route path="/linking-account" element={
        <ProtectedRoute allowedRoles={['owner', 'both']}>
          <CreateLinkedAccount />
        </ProtectedRoute>
      } />
      <Route path="/create-stakeholder" element={
        <ProtectedRoute allowedRoles={['owner', 'both']}>
          <Stakeholder />
        </ProtectedRoute>
      } />

      {/* Customer Routes */}
      <Route path="/cust/my-mess" element={
        <ProtectedRoute allowedRoles={['customer', 'both']}>
          <YourMess />
        </ProtectedRoute>
      } />
      <Route path="/cust/mess-details" element={
        <ProtectedRoute allowedRoles={['customer', 'both']}>
          <CustomerMessDetails />
        </ProtectedRoute>
      } />
      <Route path="/customer-history" element={
        <ProtectedRoute allowedRoles={['customer', 'both']}>
          <CustomerTransactionHistory />
        </ProtectedRoute>
      } />
      <Route path="/using-plans" element={
        <ProtectedRoute allowedRoles={['customer', 'both']}>
          <CustomersTokens />
        </ProtectedRoute>
      } />
      <Route path="/login/customers-dashboard" element={
        <ProtectedRoute allowedRoles={['customer', 'both']}>
          <CustomerDashboard />
        </ProtectedRoute>
      } />
      <Route path="/customers-orders" element={
        <ProtectedRoute allowedRoles={['customer', 'both']}>
          <CustomerOrders />
        </ProtectedRoute>
      } />
      <Route path="/customer-notifications" element={
        <ProtectedRoute allowedRoles={['customer', 'both']}>
          <CustomerNotifications />
        </ProtectedRoute>
      } />
      <Route path="/switch-role-customer" element={
        <ProtectedRoute allowedRoles={['customer', 'both']}>
          <SwitchRoleCustomer />
        </ProtectedRoute>
      } />
      <Route path="/customer-activeplans" element={
        <ProtectedRoute allowedRoles={['customer', 'both']}>
          <CustomerActivePLans />
        </ProtectedRoute>
      } />
      <Route path="/customer-minimal-dashboard" element={
        <ProtectedRoute allowedRoles={['customer', 'both']}>
          <CustomerMinimalDashboard />
        </ProtectedRoute>
      } />
      <Route path="/customer-profile" element={
        <ProtectedRoute allowedRoles={['customer', 'both']}>
          <CustomerProfile />
        </ProtectedRoute>
      } />
    
      <Route path="/customer/cash-payment/:planId" element={
        <ProtectedRoute allowedRoles={['customer', 'both']}>
          <CashPaymentPage />
        </ProtectedRoute>
      } />
      <Route path="/cust/plans-requests" element={
        <ProtectedRoute allowedRoles={['customer', 'both']}>
          <CustomerPlansRequests />
        </ProtectedRoute>
      } />

    </Routes>
  );
}

export default RouteComponent;
