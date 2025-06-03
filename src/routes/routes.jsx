// App.js
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
import { OwnerRoutes } from './ownerRoutes';
import { DeliveryBoyRoutes } from './deliveryBoyRoutes';
import { StockManagerRoutes } from './stockManagerRoutes';
import { SalesPersonRoutes } from './salesPersonRoutes';

function RouteComponent() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );
  const [isRefresh, setIsRefresh] = useState(false);
  const [userRoleRoutes, setUserRoleRoutes] = useState(localStorage.getItem("mkddr"));  //mkddr named for user Roles
  const newRole={
    owner:"Zp4N8x3Lk7Tv",
    salesPerson:"B9Qr6MtP2XaF",
    stockManager:"J3xWp4Yn7XqZ",
    deliveryBoy:"L8Tx2VaF6Qr9M",
    partner:"P7Xk9Mz2Fa4JQ",
  }
  // const [userRoleRoutes, setUserRoleRoutes] = useState("owner");  //mkddr named for user Roles
  useEffect(() => {
    console.log(userRoleRoutes);
    console.log("executing");
    if(userRoleRoutes=="owner" || userRoleRoutes==null || userRoleRoutes==newRole.owner)
    {
      localStorage.setItem('mkddr',newRole.owner);
    }
    if(userRoleRoutes=="salesPerson" || userRoleRoutes==newRole.salesPerson)
    {
      localStorage.setItem('mkddr',newRole.salesPerson);
    }
    if(userRoleRoutes=="stockManager" || userRoleRoutes==newRole.stockManager)
    {
      localStorage.setItem('mkddr',newRole.stockManager);
    }
    if(userRoleRoutes=="deliveryBoy" || userRoleRoutes==newRole.deliveryBoy)
    {
      localStorage.setItem('mkddr',newRole.deliveryBoy);
    }
    if(userRoleRoutes=="partner" || userRoleRoutes==newRole.partner)
    {
      localStorage.setItem('mkddr',newRole.partner);
    }
    // localStorage.setItem('mkddr',userRoleRoutes==null?"owner":userRoleRoutes);
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated,userRoleRoutes]);

  return (
    <>
      {
        // setIsAuthenticated,isAuthenticated,isRefresh,setIsRefresh
        (userRoleRoutes == 'owner' || userRoleRoutes=="Zp4N8x3Lk7Tv") && (
          <OwnerRoutes
          setUserRoleRoutes={setUserRoleRoutes}
            setIsAuthenticated={setIsAuthenticated}
            isAuthenticated={isAuthenticated}
            isRefresh={isRefresh}
            setIsRefresh={setIsRefresh}
          />
        )
      }
      {
        // setIsAuthenticated,isAuthenticated,isRefresh,setIsRefresh
        (userRoleRoutes == null) && (
          <OwnerRoutes
          setUserRoleRoutes={setUserRoleRoutes}
            setIsAuthenticated={setIsAuthenticated}
            isAuthenticated={isAuthenticated}
            isRefresh={isRefresh}
            setIsRefresh={setIsRefresh}
          />
        )
      }
      {
        // setIsAuthenticated,isAuthenticated,isRefresh,setIsRefresh
        (userRoleRoutes == 'partner' || userRoleRoutes=="P7Xk9Mz2Fa4JQ") && (
          <OwnerRoutes
            setIsAuthenticated={setIsAuthenticated}
            isAuthenticated={isAuthenticated}
            isRefresh={isRefresh}
            setIsRefresh={setIsRefresh}
          />
        )
      }
      {
        // setIsAuthenticated,isAuthenticated,isRefresh,setIsRefresh
        (userRoleRoutes == 'deliveryBoy' || userRoleRoutes== "L8Tx2VaF6Qr9M") && (
          <DeliveryBoyRoutes
            setIsAuthenticated={setIsAuthenticated}
            isAuthenticated={isAuthenticated}
            isRefresh={isRefresh}
            setIsRefresh={setIsRefresh}
          />
        )
      }
      {
        // setIsAuthenticated,isAuthenticated,isRefresh,setIsRefresh
        (userRoleRoutes == 'stockManager' || userRoleRoutes=="J3xWp4Yn7XqZ") && (
          <StockManagerRoutes
            setIsAuthenticated={setIsAuthenticated}
            isAuthenticated={isAuthenticated}
            isRefresh={isRefresh}
            setIsRefresh={setIsRefresh}
          />
        )
      }
      {
        // setIsAuthenticated,isAuthenticated,isRefresh,setIsRefresh
        (userRoleRoutes == 'salesPerson' || userRoleRoutes == "B9Qr6MtP2XaF") && (
          <SalesPersonRoutes
          setUserRoleRoutes={setUserRoleRoutes}
            setIsAuthenticated={setIsAuthenticated}
            isAuthenticated={isAuthenticated}
            isRefresh={isRefresh}
            setIsRefresh={setIsRefresh}
          />
        )
      }
      
    </>
  );
}

export default RouteComponent;
