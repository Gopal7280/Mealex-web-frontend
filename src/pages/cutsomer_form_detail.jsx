import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { debounce } from "lodash";
import { Preview, ModeEdit, DeleteForever,Close } from "@mui/icons-material";
import axios from "axios";
import "../styles/layoutFix.css"
import Sidebar from '../layouts/Sidebar';
import { InputComponent } from "../components/Input";
import { ButtonComponent } from "../components/Button";
import { FaDownload } from "react-icons/fa6";
import { toWords } from "number-to-words";
import { IoMdPrint } from "react-icons/io";
import { FaFilePdf } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
export default function CustomerFormDetailDisplay({
  onCustomerAdded,
  editCustomer,
  onCancelEdit,
}) {
  const location = useLocation();
  const navigate=useNavigate();
  const [data, setData] = useState({});
  useEffect(() => {
    console.log(location.state.data);
    setData(location.state.data);
    console.log(data);
    console.log("execute");
  }, []);
  function handleClick() {
    console.log(data);
  }
  function handleEdit(e) {
      //   alert(JSON.stringify(invoiceId));
      navigate("/customer_detail_edit", { state: { data: location.state?.data } });
  }
  return (
    <div>
    <div className="over max-w-6xl mx-auto bg-white p-8 shadow-lg rounded-md">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold text-center mb-6">
      View Details
      </h1>
      <div className="flex justify-between">
        <button className="" onClick={(e)=>handleEdit(e)}><FaEdit className="iconSize"/></button>
        <NavLink to="/display" className="text-white text-decoration-none mt-3">
      <ButtonComponent
              type="button"
              className=" bg-[#3A5B76] px-2 py-1 text-white font-bold rounded hover:bg-[#2E4A62]"
              value="close"
              children={<Close/>}
            />
        </NavLink>
      </div>
      </div>

      <form id="customerForm" className="mt-6">
        <div className="sm:grid grid-cols-2 gap-6 block">
          <div>
            <InputComponent
            readOnly
              labelInput="Customer Name"
              type="text"
              placeholder="Enter Product Name"
              value={data.customer_name}
            ></InputComponent>
          </div>
          <div>
            <InputComponent
            readOnly
              labelInput="Party Type"
              type="text"
              value={data.customer_party_type}
            ></InputComponent>
          </div>
          <div>
            <InputComponent
            readOnly
              labelInput="Email Id"
              type="text"
              value={data.customer_email}
            ></InputComponent>
          </div>
          <div>
            <InputComponent
            readOnly
              labelInput="Mobile No."
              type="text"
              value={data.customer_phone}
            ></InputComponent>
          </div>
          <div>
            <InputComponent
            readOnly
              labelInput="GSTIN No."
              type="text"
              value={data.customer_gstin}
            ></InputComponent>
          </div>
          <div>
            <InputComponent
            readOnly
              labelInput="Pan No."
              type="text"
              value={data.customer_pan}
            ></InputComponent>
          </div>
          <div>
            <InputComponent
            readOnly
              labelInput="Customer Category"
              type="text"
              value={data.customer_category}
            ></InputComponent>
          </div>
          <div>
            <InputComponent
            readOnly
              labelInput="Customer Type."
              type="text"
              value={data.customer_type}
            ></InputComponent>
          </div>      
          <div>
            <InputComponent
            readOnly
              labelInput="Opening Value"
              type="text"
              value={data.customer_opening_value}
            ></InputComponent>
          </div>
          <div>
            <InputComponent
            readOnly
              labelInput="Contact Person"
              type="text"
              value={data.customer_contact_persone}
            ></InputComponent>
          </div>
        </div>
        <div className="mt-4 border border-1 p-3"><h5>Billing Address</h5>
        <div>
          <label
                htmlFor="billing_address"
                className="block text-gray-600 mt-4"
              >
                Street Address:
              </label>
              <textarea
              readOnly
                id="billing_address"
                name="billing_address"
                value={data.billing_street_address}
                className="w-full p-2 border rounded mt-1"
                placeholder="Enter Billing Address"
              ></textarea>
          </div>
        <div className="sm:grid grid-cols-2 gap-6 block">
          <div>
            <InputComponent
            readOnly
              labelInput="Country"
              type="text"
              value={data.billing_country}
            ></InputComponent>
          </div>
          <div>
            <InputComponent
            readOnly
              labelInput="State"
              type="text"
              value={data.billing_state}
            ></InputComponent>
          </div>
          <div>
            <InputComponent
            readOnly
              labelInput="City"
              type="text"
              value={data.billing_city}
            ></InputComponent>
          </div>
          <div>
            <InputComponent
            readOnly
              labelInput="zip/PinCode"
              type="text"
              value={data.billing_pincode}
            ></InputComponent>
          </div>
        </div>
        </div>
         <div className="mt-4 border border-1 p-3"><h5>Shipping Address</h5>
        <div>
          <label
                htmlFor="shipping_address"
                className="block text-gray-600 mt-4"
              >
                Street Address:
              </label>
              <textarea
              readOnly
                id="billing_address"
                name="billing_address"
                value={data.shipping_street_address}
                className="w-full p-2 border rounded mt-1"
                placeholder="Enter Billing Address"
              ></textarea>
          </div>
        <div className="sm:grid grid-cols-2 gap-6 block">
          <div>
            <InputComponent
            readOnly
              labelInput="Country"
              type="text"
              value={data.shipping_country}
            ></InputComponent>
          </div>
          <div>
            <InputComponent
            readOnly
              labelInput="State"
              type="text"
              value={data.shipping_state}
            ></InputComponent>
          </div>
          <div>
            <InputComponent
            readOnly
              labelInput="City"
              type="text"
              value={data.shipping_city}
            ></InputComponent>
          </div>
          <div>
            <InputComponent
            readOnly
              labelInput="zip/PinCode"
              type="text"
              value={data.shipping_pincode}
            ></InputComponent>
          </div>
        </div>
        </div>
        <div>
          <label
                htmlFor=""
                className="block text-gray-600 mt-4"
              >
                Notes:
              </label>
              <textarea  
              readOnly
                value={data.customer_notes}
                className="w-full p-2 border rounded mt-1"
                
              ></textarea>
          </div>
          <h3 class="text-xl font-bold">Personal Information</h3>
          <div className="grid grid-cols-2 gap-6">
          <div>
            <InputComponent
            readOnly
              labelInput="Birth Date"
              type="text"
              value={data.customer_birthdate}
            ></InputComponent>
          </div>
          <div>
            <InputComponent
            readOnly
              labelInput="Anniversary"
              type="text"
              value={data.customer_anniversary}
            ></InputComponent>
          </div>
          </div>
          <div>
          <label
                htmlFor=""
                className="block text-gray-600 mt-4"
              >
                Personal notes:
              </label>
              <textarea 
              readOnly 
                value={data.customer_personalnotes}
                className="w-full p-2 border rounded mt-1"
                
              ></textarea>
          </div>
      </form>
    </div>
    </div>
  );
}
