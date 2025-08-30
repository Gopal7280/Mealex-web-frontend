// src/routes/ownerRoutes.jsx
import MinimalDashboard from '../pages/MinimalDashboard'
import OwnerDashboard from '../pages/ownerDashboard'
import OwnerPlans from '../pages/OwnerPlans'
import CreatePlan from '../pages/CreatePlan'
import EditPlan from '../pages/EditPlan'
import MessVerificationStatus from '../pages/MessVerificationStatus'
import Orders from '../pages/Orders'
import Customers from '../pages/Customers'
import CustomerProfileOwner from '../pages/CustomerProfileforOwner'
import MessProfile from '../pages/MessProfile'
import Notifications from '../pages/Notifications'
import History from '../pages/History'
import PlanHistory from '../pages/PlanHistory'
import PlanVerification from '../pages/PlanVerification'
import AddCustomers from '../pages/AddCustomers'
import VerifyMessOtp from '../pages/VerifyMessOtp'
import MessDetailsForm from '../pages/MessDetailsForm'


export const ownerRoutes = [
  { path: '/minimal-dashboard', element: <MinimalDashboard /> },
  { path: '/owner-dashboard', element: <OwnerDashboard /> },
  { path: '/plans', element: <OwnerPlans /> },
  { path: '/add-plan', element: <CreatePlan /> },
  { path: '/edit-plan', element: <EditPlan /> },
  { path: '/owner/mess/id/:messId', element: <MessVerificationStatus /> },
  { path: '/orders', element: <Orders /> },
  { path: '/customers', element: <Customers /> },
  { path: '/owner-customer-profile', element: <CustomerProfileOwner /> },
  { path: '/mess-profile', element: <MessProfile /> },
    { path: '/verify-mess-otp', element: <VerifyMessOtp /> },
      { path: '/mess-details', element: <MessDetailsForm /> },


  { path: '/notifications', element: <Notifications /> },
  { path: '/history', element: <History /> },
  { path: '/owner/history/plans', element: <PlanHistory /> },
  { path: '/plan-verification', element: <PlanVerification /> },
  { path: '/add-customer', element: <AddCustomers /> }
]
