import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoginRegister from '../pages/loginRegister';
import CustomerForm from '../pages/customerForm';
import CustomerProfile from '../pages/customerProfile';
import CustomerDisplay from '../pages/customerDisplay';
import EditCustomer from '../pages/editCustomer';
import Dashboard from '../pages/Dashboard';
import Invoices from '../pages/Invoices';
import Payments from '../pages/Payments';
import Products from '../pages/Products';
import Reports from '../pages/Reports';
import Settings, {
  AuthorizedSignatureChallan,
  AuthorizedSignatureInvoice,
  BankAccountSettingChallan,
  BankAccountSettingInvoicentact,
  PrefixSettingChallan,
  PrefixSettingInvoice,
  ThemeSettingChallan,
  ThemeSettingInvoice,
} from '../pages/Settings';
import ProductForm from '../pages/ProductForm';
import Sidebar from '../layouts/Sidebar';
import InvoiceForm from '../pages/InvoiceForm'; // InvoiceForm import karo
import '../styles/index.css';
import { Challan } from '../pages/challan';
import { ChallanForm } from '../pages/challan_form';
import PublicRoutes from './publicRoute';
import ProtectedRoute from './protectedRoute';
import '../styles/index.css';
import { GenerateInvoice } from '../pages/generateInvoice';
import { GenerateBillComponent } from '../pages/generateBill';
import CustomerFormDetailDisplay from '../pages/cutsomer_form_detail';
import Customer_detail_edit from '../pages/Customer_edit';
import { Product_detail } from '../pages/product_detail';
import { Product_edit } from '../pages/product_edit';
import { QuotationFrom } from '../pages/QuotationForm';
import { ChallanPreview } from '../pages/challan_preview';
import { ChallanEdit } from '../pages/challan_edit';
import { Bussiness_profile } from '../pages/bussiness_profile';
import { Bussiness_profile_from } from '../pages/bussiness_profile_form';
import { Quotation_edit } from '../pages/quotation_edit';
import PurchaseTable from '../pages/purchaseTable';
import DeliveryChallanTable from '../pages/deliveryChallan_table';
import QuotationTable from '../pages/quotation';
import { QuotationPreview } from '../pages/quotation_preview';
import { InvoicePreview } from '../pages/invoice_preview';
import { InvoiceEdit } from '../pages/invoice_edit';
import { GenerateChallan } from '../pages/generate_challan';
import { InvoiceSampleA4 } from '../layouts/a4SizeInvoiceLayout';
import { PurchaseForm } from '../pages/purchaseForm';
import { GenerateQuotationn } from '../pages/generateQuotation';
import { PurchasePreview } from '../pages/purchasePreview';
import { PurchaseEdit } from '../pages/purchaseEdit';
import { PaymentIn } from '../pages/paymentIn';
import { PaymentInForm } from '../pages/paymentInForm';
import { PaymentOutForm } from '../pages/paymentOutForm';
import { PaymentOut } from '../pages/paymentOut';
import HotkeyManager from '../components/hotKeyManager';
import LandingPage from '../pages/landingPage';
import Users from '../pages/users';
import { UserForm } from '../pages/userForm';
import { GeneratePurchase } from '../pages/generatePurchase';
import SalesReportGSTIN from '../pages/reports/salesReport';
import GstPurchaseReport from '../pages/reports/purchaseReport';
import { ExpenseManager } from '../pages/expenseTracker/expenseManager';
import SalesReport1 from '../pages/reports/salesReport1';
import { Inventory } from '../pages/inventory/inventory';
import NoRouteMatch from '../layouts/noRouteFound';
import { apiGet } from '../services/api';
import { BankAccountSetting } from '../pages/settings/bankAccountSetting';
import { InvoiceSetting } from '../pages/settings/invoiceSetting';
import { ChallanSetting } from '../pages/settings/challanSetting';
export function OwnerRoutes({setIsAuthenticated,isAuthenticated,isRefresh,setIsRefresh,setUserRoleRoutes}){
    return(
        <Router>
      <HotkeyManager />
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={<PublicRoutes setUserRoleRoutes={setUserRoleRoutes} setAuth={setIsAuthenticated}></PublicRoutes>}
        />
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="*" element={<LandingPage/>} /> */}

        {/* Protected Routes */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<Dashboard />}
            />
          }
        />
        <Route
          path="/sidebar"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<Sidebar />}
            />
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<CustomerForm />}
            />
          }
        />
        <Route
          path="/add-product"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<ProductForm />}
            />
          }
        />
        <Route
          path="/display"
          element={
            <ProtectedRoute
              setRefresh={isRefresh}
              isAuthenticated={isAuthenticated}
              element={<CustomerDisplay />}
            />
          }
        />
        <Route
          path="/profile/:id"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<CustomerProfile />}
            />
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<EditCustomer />}
            />
          }
        />
        <Route
          path="/invoices"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<Invoices />}
            />
          }
        />
        <Route
          path="/add-invoice"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<InvoiceForm />}
            />
          }
        />
        <Route
          path="/challan"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<Challan />}
            />
          }
        />
        <Route
          path="/add-challan"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<ChallanForm />}
            />
          }
        />
        <Route
          path="/payments"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<Payments />}
            />
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<Products />}
            />
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<Reports />}
            />
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<Settings />}
            />
          }
        />
        <Route
          path="/generate-invoice"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<GenerateInvoice />}
            />
          }
        />
        <Route
          path="/generate-bill"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<GenerateBillComponent />}
            />
          }
        />
        <Route
          path="/customer-detail-display"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<CustomerFormDetailDisplay />}
            />
          }
        />
        <Route
          path="/customer_detail_edit"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<Customer_detail_edit />}
            />
          }
        />
        <Route
          path="/product_detail_display"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<Product_detail />}
            />
          }
        />
        <Route
          path="/product_detail_edit"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<Product_edit />}
            />
          }
        />
        <Route
          path="/quotation"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<QuotationTable />}
            />
          }
        />
        <Route
          path="/add-quotation"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<QuotationFrom />}
            />
          }
        />
        <Route
          path="/challan-preview"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<ChallanPreview />}
            />
          }
        />
        <Route
          path="/challan-edit"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<ChallanEdit />}
            />
          }
        />
        <Route
          path="/quotation-edit"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<Quotation_edit />}
            />
          }
        />
        <Route
          path="/bussiness-profile"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<Bussiness_profile setRefresh={setIsRefresh} />}
            />
          }
        />
        <Route
          path="/profile_form"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<Bussiness_profile_from setRefresh={setIsRefresh} />}
            />
          }
        />
        <Route
          path="/purchase-table"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<PurchaseTable />}
            />
          }
        />
        <Route
          path="/deliverychallan-table"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<DeliveryChallanTable />}
            />
          }
        />
        <Route
          path="/quotation-preview"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<QuotationPreview />}
            />
          }
        />
        <Route
          path="/invoice-preview"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<InvoicePreview />}
            />
          }
        />
        <Route
          path="/invoice-edit"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<InvoiceEdit />}
            />
          }
        />
        <Route
          path="/generate-challan"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<GenerateChallan />}
            />
          }
        />
        <Route
          path="/invoiceSampleA4"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<InvoiceSampleA4 />}
            />
          }
        />
        <Route
          path="/purchaseForm"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<PurchaseForm />}
            />
          }
        />
        <Route
          path="/generate-quotation"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<GenerateQuotationn />}
            />
          }
        />
        <Route
          path="/purchasePreview"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<PurchasePreview />}
            />
          }
        />
        <Route
          path="/purchaseEdit"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<PurchaseEdit />}
            />
          }
        />
        <Route
          path="/generate-purchase"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<GeneratePurchase />}
            />
          }
        />
        <Route
          path="/paymentIn"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<PaymentIn />}
            />
          }
        />
        <Route
          path="/paymentInForm"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<PaymentInForm />}
            />
          }
        />
        <Route
          path="/paymentOutForm"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<PaymentOutForm />}
            />
          }
        />
        <Route
          path="/paymentOut"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<PaymentOut />}
            />
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<Users />}
            />
          }
        />
        <Route
          path="/userForm"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<UserForm />}
            />
          }
        />
        <Route
          path="/settings/invoice"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<InvoiceSetting />}
            />
          }
        />
        <Route
          path="/settings/challan"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<ChallanSetting />}
            />
          }
        />
        <Route
          path="/settings/themeInvoice"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<ThemeSettingInvoice />}
            />
          }
        />
        <Route
          path="/settings/themeChallan"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<ThemeSettingChallan />}
            />
          }
        />
        <Route
          path="/settings/bankAccountSetting"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<BankAccountSetting />}
            />
          }
        />
        <Route
          path="/settings/bankAccountChallan"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<BankAccountSettingChallan />}
            />
          }
        />
        <Route
          path="/settings/authorizedSignatureInvoice"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<AuthorizedSignatureInvoice />}
            />
          }
        />
        <Route
          path="/settings/authorizedSignatureChallan"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<AuthorizedSignatureChallan />}
            />
          }
        />
        <Route
          path="/salesReport"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<SalesReportGSTIN />}
            />
          }
        />
        <Route
          path="/salesReport1"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<SalesReport1 />}
            />
          }
        />
        <Route
          path="/gstPurchaseReport"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<GstPurchaseReport />}
            />
          }
        />
        <Route
          path="/expenseManager"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<ExpenseManager />}
            />
          }
        />
        <Route
          path="/inventory"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<Inventory />}
            />
          }
        />
        <Route
          path="*"
          element={<NoRouteMatch/>}
        />
      </Routes>
    </Router>
    )
}