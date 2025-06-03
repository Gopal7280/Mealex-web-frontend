// ProtectedRoutes.js
import { Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import CustomerForm from "../pages/customerForm";
import ProductForm from "../pages/ProductForm";
import CustomerDisplay from "../pages/customerDisplay";
import CustomerProfile from "../pages/customerProfile";
import EditCustomer from "../pages/editCustomer";
import Invoices from "../pages/Invoices";
import InvoiceForm from "../pages/InvoiceForm";
import Payments from "../pages/Payments";
import Products from "../pages/Products";
import Reports from "../pages/Reports";
import Settings from "../pages/Settings";
import { Challan } from "../pages/challan";
import { ChallanForm } from "../pages/challan_form";
import Sidebar from "../layouts/Sidebar";

const ProtectedRoute = ({ setUserRoleRoutes,isAuthenticated,element,...rest }) => {
    if(rest.setRefresh)
    {
        console.log(rest.setRefresh);
        return isAuthenticated?<><Sidebar setUserRoleRoutes={setUserRoleRoutes} setRefresh={true} />{element}</>:<Navigate to="/"></Navigate>;
    }
    else{
         return isAuthenticated?<><Sidebar setUserRoleRoutes={setUserRoleRoutes}/>{element}</>:<Navigate to="/"></Navigate>;
    }
};

export default ProtectedRoute; 