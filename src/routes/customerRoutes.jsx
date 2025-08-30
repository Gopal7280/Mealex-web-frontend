// src/routes/customerRoutes.jsx
import CustomerMinimalDashboard from '../pages/CustomerMinimalDashboard '
import CustomerProfile from '../pages/CustomerProfile'
import CustomersPlan from '../pages/CustomerPlan'
import CustomerHistory from '../pages/CustomerHistory'
import UseTokens from '../pages/UseTokens'
import YourMess from '../pages/YourMess'
import CustomerMessDetails from '../pages/CustomerMessDetails'
import PlansOfCustomers from '../pages/PlansOfCustomers'
import CustomerTransactionHistory from '../pages/CustomerTransactionHistory'
import CustomersTokens from '../pages/CustomersTokens'
import CustomerDashboard from '../pages/CustomerDashboard'
import CustomerOrders from '../pages/CustomerOrders'
import CustomerNotifications from '../pages/CustomerNotifications'

export const customerRoutes = [
  { path: '/customer-minimal-dashboard', element: <CustomerMinimalDashboard /> },
  { path: '/customer-profile', element: <CustomerProfile /> },
  { path: '/customer-profile/plans', element: <CustomersPlan /> },
  { path: '/customer-profile/history', element: <CustomerHistory /> },
  { path: '/customer/use-tokens', element: <UseTokens /> },
  { path: '/customer/your-mess', element: <YourMess /> },
  { path: '/customer/mess-details', element: <CustomerMessDetails /> },
  { path: '/customer-plans', element: <PlansOfCustomers /> },
  { path: '/customer-history', element: <CustomerTransactionHistory /> },
  { path: '/customer/tokens', element: <CustomersTokens /> },
  { path: '/login/customers-dashboard', element: <CustomerDashboard /> },
  { path: '/customers-orders', element: <CustomerOrders /> },
  { path: '/customer-notifications', element: <CustomerNotifications /> }
]
