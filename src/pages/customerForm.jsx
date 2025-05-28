import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ErrorMessage, useFormik } from "formik";
import { debounce } from "lodash";
import * as Yup from "yup";
import "../styles/layoutFix.css"
import Sidebar from '../layouts/Sidebar';
import { Preview, ModeEdit, DeleteForever,Close } from "@mui/icons-material";
import { Toast } from 'primereact/toast';
import {Loader} from "../layouts/Loader"
import {
  apiReuestLoadCountry,
  apiReuestLoadDataUsingZipCode,
  apiReuestLoadState,
} from "../services/apiServicesOnline";
import axios from "axios";
import { InputComponent } from "../components/Input";
import { ButtonComponent } from "../components/Button";
import { apiPost } from "../services/api";
import * as yup from "yup";
import { config } from "../config/app.js";

export default function CustomerForm({
  onCustomerAdded,
  editCustomer,
  onCancelEdit,
}) {
  const [loader,setLoader]=useState(false);
  const [country, setCountry] = useState([{}]);
    const [country1, setCountry1] = useState([{}]);
    const [iso2Country, setIso2Country] = useState("");
    const [iso2Country1, setIso2Country1] = useState("");
    const [iso2State, setIso2State] = useState("");
    const [iso2State1, setIso2State1] = useState("");
    const [style1, setStyle1] = useState({ display: "none" });
    const [style2, setStyle2] = useState({ display: "inline-block" });
    const [style3, setStyle3] = useState({ display: "none" });
    const [style4, setStyle4] = useState({ display: "inline-block" });
  const [party, setParty] = useState("");
  const toast = useRef(null);
  const [locations,setLocationS]=useState("")
  const location=useLocation();
  const [pan_no,setPan_no]=useState("");
  const [phoneNumber,setPhoneNumber]=useState("");
  const [gstIn,setGstIn]=useState("");
  const [status,setStatus]=useState(true);
  
  useEffect(() => {
       const getState = async () => {
      try {
        const config = {
          method: "get",
          url: `https://api.countrystatecity.in/v1/countries/In/states`,
          headers: {
            "X-CSCAPI-KEY":
              "NEMzaW5KOW1yVjhoalBQSmhKRzRBb1U1ZFZWVXh6Z0pZWFI5TXdMMg==",
          },
        };
        const response = await axios(config);
        setCountry("India");
        setCountry1("India");
        setState(response.data);
        setState1(response.data);
        setIso2Country("In");
        setIso2Country1("In");
        setNames({ ...names, countryName: "India" });
        setNames1({ ...names, countryName: "India" });
      } catch (err) {
        console.log(err);
      }
    };
    getState();
    console.log(location.state?.data);
    var locationUn="";
    if(location.state?.data==undefined){
      locationUn="direct";
    }
    setLocationS(location.state?.data);
  }, []);
  const [names, setNames] = useState({
    countryName: "",
    stateName: "",
    cityName: "",
  });
   const [names1, setNames1] = useState({
    countryName: "",
    stateName: "",
    cityName: "",
  });
   const [state, setState] = useState([{}]);
   const [state1, setState1] = useState([{}]);
   function handleCountryChange(e,name) {
    if(name=="billing")
    {
         if (e.target.value === "select") {
      setNames({ countryName: "", stateName: "", cityName: "" });
      setState([{}]);
      setCity([{}]);
    }
    const iso="In";
    const name="India";
    const getState = async () => {
      try {
        const config = {
          method: "get",
          url: `https://api.countrystatecity.in/v1/countries/${iso}/states`,
          headers: {
            "X-CSCAPI-KEY":
              "NEMzaW5KOW1yVjhoalBQSmhKRzRBb1U1ZFZWVXh6Z0pZWFI5TXdMMg==",
          },
        };
        const response = await axios(config);
        setState(response.data);
        setIso2Country(iso);
        setNames({ ...names, countryName: name });
      } catch (err) {
        console.log(err);
      }
    };
    getState();
    }
    if(name=="shipping")
    {
         if (e.target.value === "select") {
      setNames1({ countryName: "", stateName: "", cityName: "" });
      setState1([{}]);
      setCity1([{}]);
    }
    const [iso, name] = e.target.value.split(".");
    const getState = async () => {
      try {
        const config = {
          method: "get",
          url: `https://api.countrystatecity.in/v1/countries/${iso}/states`,
          headers: {
            "X-CSCAPI-KEY":
              "NEMzaW5KOW1yVjhoalBQSmhKRzRBb1U1ZFZWVXh6Z0pZWFI5TXdMMg==",
          },
        };
        const response = await axios(config);
        setState1(response.data);
        setIso2Country1(iso);
        setNames1({ ...names1, countryName: name });
      } catch (err) {
        console.log(err);
      }
    };
    getState();
    }
  }
   const [city, setCity] = useState([{}]);
   const [city1, setCity1] = useState([{}]);
   function handleStateChange(e,name) {
    if(name=="billing")
    {
      if (e.target.value === "select") {
      setNames({ countryName: "", stateName: "", cityName: "" });
      setState([{}]);
      setCity([{}]);
    }
      const [iso, name] = e.target.value.split(".");
    setIso2State(iso);
    const getCity = async () => {
      try {
        const url = `https://api.countrystatecity.in/v1/countries/${iso2Country}/states/${iso}/cities`;
        const headers = {
          "X-CSCAPI-KEY":
            "NEMzaW5KOW1yVjhoalBQSmhKRzRBb1U1ZFZWVXh6Z0pZWFI5TXdMMg==",
        };
        const response = await apiReuestLoadState(url, headers);
        setCity(response.data);
        setNames({ ...names, stateName: name });
      } catch (err) {
        console.log(err);
      }
    };
    getCity();
    }
    if(name=="shipping")
    {
      if (e.target.value === "select") {
      setNames({ countryName: "", stateName: "", cityName: "" });
      setState([{}]);
      setCity([{}]);
    }
      const [iso, name] = e.target.value.split(".");
    setIso2State1(iso);
    const getCity = async () => {
      try {
        const url = `https://api.countrystatecity.in/v1/countries/${iso2Country1}/states/${iso}/cities`;
        const headers = {
          "X-CSCAPI-KEY":
            "NEMzaW5KOW1yVjhoalBQSmhKRzRBb1U1ZFZWVXh6Z0pZWFI5TXdMMg==",
        };
        const response = await apiReuestLoadState(url, headers);
        setCity1(response.data);
        setNames1({ ...names1, stateName: name });
      } catch (err) {
        console.log(err);
      }
    };
    getCity();
    }
  }
  function handleCityChange(e,name) {
    if(name=="billing")
    {
      setNames({ ...names, cityName: e.target.value });
    }
    if(name=="shipping"){
      setNames1({ ...names1, cityName: e.target.value });
    }
  }
  const [zipData, setZipdata] = useState([
    {
      country: "",
      state: "",
      city: "",
    },
  ]);
  const [zipData1, setZipdata1] = useState([
    {
      country: "",
      state: "",
      city: "",
    },
  ]);
  const [zip, setZip] = useState("");
  const [zip1, setZip1] = useState("");
  const handleDebounce = debounce((value) => {
    const fetchUsingZipCode = async () => {
      try {
        const res = await axios.get(`${config.apiBaseUrl}/pincode/${value}`);
        console.log(res.data);
        setZipdata({
          country: res.data[0].PostOffice[0].Country,
          state: res.data[0].PostOffice[0].State,
          city: res.data[0].PostOffice[0].Block,
        });
      } catch (error) {
        console.error("Error fetching pincode data:", error);
      }
    };
    fetchUsingZipCode();
  }, 700);
  const handleDebounce1 = debounce((value) => {
    const fetchUsingZipCode = async () => {
      try {
        const res = await axios.get(`${config.apiBaseUrl}/pincode/${value}`);
        console.log(res.data);
        setZipdata1({
          country: res.data[0].PostOffice[0].Country,
          state: res.data[0].PostOffice[0].State,
          city: res.data[0].PostOffice[0].Block,
        });
      } catch (error) {
        console.error("Error fetching pincode data:", error);
      }
    };
    fetchUsingZipCode();
  }, 700);
const [shipCheck, setShipCheck] = useState("");
const [isshipCheck, setisShipCheck] = useState("");
const [style5,setStyle5]=useState("none");
function handleCheckBoxCheck(e) {
    var bill = document.getElementById("billing_address").value;
    if (e.target.checked) {
      console.log("checked");
      setShipCheck(bill);
      setisShipCheck(true);
      setStyle3({display:"inline-block"});
      setStyle4({display:"none"});
    } else {
      setShipCheck("");
      setisShipCheck(false);
      setStyle3({display:"none"});
      setStyle4({display:"inline-block"});
    }
  }
 function handleZipCodeChange(e,name) {
    if(name=="billing")
    {
      handleDebounce(e.target.value);
      setZip(e.target.value);
    if (e.target.value === "") {
      setStyle1({ display: "none" });
      setStyle2({ display: "inline-block" });
      setZipdata({ country: "", state: "", city: "" });
      console.log("i am working");
    } else {
      if (names.cityName != "") {
        setStyle1({ display: "none" });
        setStyle2({ display: "inline-block" });
        setZipdata({ country: "", state: "", city: "" });
      } else {
        setStyle1({ display: "inline-block" });
        setStyle2({ display: "none" });
      }
    }
    }
    if(name=="shipping")
    {
      handleDebounce1(e.target.value);
    setZip1(e.target.value);
    if (e.target.value === "") {
      setStyle3({ display: "none" });
      setStyle4({ display: "inline-block" });
      setZipdata1({ country: "", state: "", city: "" });
      console.log("i am working");
    } else {
      if (names1.cityName != "") {
        setStyle3({ display: "none" });
        setStyle4({ display: "inline-block" });
        setZipdata1({ country: "", state: "", city: "" });
      } else {
        setStyle3({ display: "inline-block" });
        setStyle4({ display: "none" });
      }
    }
    }
  }
  const navigate = useNavigate();
  const [customer_type, setCustomer_type] = useState("");
  const [customField, setCustomField] = useState([""]);
  const formik = useFormik({
    initialValues: {
      //   customer_id: "",
      customer_name: "",
      // company_name: "",
      customer_category: "",
      email: "",
      mobile_no: "",
      pan_no: "",
      customer_type: "",
      streetBilling_address: "",
      streetShipping_address: "",
      opening_value: "",
      party: "",
      billingCity: "",
      billingState: "",
      billingZip_code: "",
      //   fax: "",
      billingCountry: "",
      shippingCity: "",
      shippingState: "",
      shippingZip_code: "",
      //   fax: "",
      shippingCountry: "",
      tax_id: "",
      //   currency: "",
      //   language: "",
      is_active: false,
      //   billing_address1: "",
      //   billing_address2: "",
      //   billing_city: "",
      //   billing_state: "",
      //   billing_zip: "",
      //   billing_country: "",
      notes: "",
      birth_date: "",
      anniversary_date: "",
      personal_notes: "",
      customField: [],
      customerContactPerson:"",
    },
    onSubmit: (values) => {
      // setLoader(true);
      values.billingZip_code = zip;
       values.shippingZip_code=zip1;
      if (isshipCheck) {
        values.streetShipping_address = shipCheck;
        if (names.cityName === "") {
        values.shippingCountry = zipData.country;
        values.shippingState = zipData.state;
        values.shippingCity = zipData.city;
        values.shippingZip_code = zip;
        console.log("i am working");
      } else {
        values.shippingCountry = names.countryName;
        values.shippingState = names.stateName;
        values.shippingCity = names.cityName;
        values.shippingZip_code = zip;
        console.log("working");
      }
      }
      else{
         if (names1.cityName === "") {
        values.shippingCountry = zipData1.country;
        values.shippingState = zipData1.state;
        values.shippingCity = zipData1.city;
        console.log("i am working");
      } else {
        values.shippingCountry = names1.countryName;
        values.shippingState = names1.stateName;
        values.shippingCity = names1.cityName;
        console.log("working");
      }
      }
      if (names.cityName === "") {
        values.billingCountry = zipData.country;
        values.billingState = zipData.state;
        values.billingCity = zipData.city;
        console.log("i am working");
      } else {
        values.billingCountry = names.countryName;
        values.billingState = names.stateName;
        values.billingCity = names.cityName;
        console.log("working");
      }
      const keyValuePairs = customField.map(field => {
        const [key, value] = field.split("/").map(item => item.trim());
        return { key, value };
      });
      values.customField = keyValuePairs;
      values.party = party;
      values.customer_type = customer_type;
      values.pan_no=pan_no;
      values.tax_id=gstIn;
      values.mobile_no=phoneNumber;
      // alert(JSON.stringify(values));
      console.log(values);
      const addCustomersData = async () => {
        try {
          const token = localStorage.getItem("token");
          const res = await apiPost("/customers", values);
          // alert(JSON.stringify(values));
          if(location.state?.data==="FromInvoice"){
            navigate("/add-invoice");
          }
          if(location.state?.data==="FromCustomer"){
            navigate("/display");
          }
          if(location.state?.data=="FromPurchase"){
            navigate("/purchaseForm");
          }
          if(location.state?.data=="FromChallanTo"){
            console.log("working");
            navigate("/add-challan");
          }
          if(location.state?.data=="FromQuotation"){
            navigate("/add-quotation");
          } 
          if(location.state?.data==undefined){
            navigate("/display");
          }
          // else{
          //   if(location.state?.data=="FromChallanTo"){
          //     console.log("working");
          //     navigate("/add-challan");
          //   }
          //   else{
          //       navigate("/display");
          //     }
          //   }
          }
         catch (err) {
          console.log(err);
          toast.current.show({severity:'error', summary: 'Error', detail:'Please enter all fields', life: 1500});
        }
        finally{
          setLoader(false);
        }
      };
      addCustomersData();
      // alert(JSON.stringify(values));
    },
  });
  function handlePartyChange(e) {
    setParty(e);
  }
  function handleCustomField() {
    setCustomField((prevCustomField) => [...prevCustomField,""]);
  }
  function handleCustomFieldChange(index, value) {
    const updatedFields = [...customField];
    updatedFields[index] = value;
    setCustomField(updatedFields);
  }
  const [error,setError]=useState({
    panNo:"",
    gstinNo:"",
    phone_Number:"",
  })
  function handleCheck(e,name){
    if(name=="pan")
    {
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
      if (!panRegex.test(e.target.value.toUpperCase())) {
        if(e.target.value=="")
        {
          setError({
            panNo:'',
            gstinNo:error.gstinNo,
            phone_Number:error.phone_Number
          });
          setPan_no("");
          setStatus(true);
        }
        else
        {
        setError({
          panNo:'Invalid PAN format. Expected: 5 letters, 4 numbers, 1 letter',
          gstinNo:error.gstinNo,
          phone_Number:error.phone_Number
        });
        setPan_no("false");
        setStatus(false);
      }
      } else {
        setPan_no(e.target.value.toUpperCase());
        console.log("2")
        setError({
          panNo:"",
          gstinNo:error.gstinNo,
          phone_Number:error.phone_Number
        });
        setStatus(true);
      }
    }
    if(name=="number")
      {
        const panRegex = /^[0-9]{10}$/;
        if (!panRegex.test(e.target.value)) {
          if(e.target.value=="")
          {
            setError({
              panNo:error.panNo,
              gstinNo:error.gstinNo,
              phone_Number:""
            });
            setPhoneNumber("");
            setStatus(true);
          }
          else
          {
          setError({
            panNo:error.panNo,
            gstinNo:error.gstinNo,
            phone_Number:"Invalid Mobile no format. Expected: 10 numbers"
          });
          setPhoneNumber("false");
          setStatus(false);
        }
        } else {
          setPhoneNumber(e.target.value);
          console.log("2")
          setError({
            panNo:error.panNo,
            gstinNo:error.gstinNo,
            phone_Number:""
          });
          setStatus(true);
        }
      }
    if(name=="gstin")
      {
        const gstRegex= /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9]{1}[A-Z]{2}$/;
        if (!gstRegex.test(e.target.value.toUpperCase())) {
          if(e.target.value=="")
          {
            setError({
              panNo:error.panNo,
              gstinNo:'',
              phone_Number:error.phone_Number
            });
            setGstIn("");
            setStatus(true);
          }
          else
          {
          setError({
            panNo:error.panNo,
            gstinNo:"Invalid GSTIN format. Expected: 2 numbers, 5 letters, 4 numbers, 1 letter , 1 number , 2 letters",
            phone_Number:error.phone_Number
          });
          setGstIn("false");
          setStatus(false);
        }
        } else {
          setGstIn(e.target.value.toUpperCase());
          console.log("2")
          setError({
            panNo:error.panNo,
            gstinNo:"",
            phone_Number:error.phone_Number
          });
          setStatus(true);
        }
      }
      console.log(e.target.value);
    }
  return (
    <>
    {
      loader?(
        <Loader/>
      ):(
        <div>
    <div className="over max-w-6xl mx-auto bg-white p-8 shadow-lg rounded-md">
      <h1 className="text-2xl font-bold text-center mb-6">
        Customer/Party
      </h1>
        <NavLink to="/display" className="text-white text-decoration-none">
        <ButtonComponent
              type="button"
              className=" bg-[#3A5B76] float-end px-2 py-1 text-white font-bold rounded hover:bg-[#2E4A62]"
              value="close"
              children={<Close/>}
            />
        </NavLink>
      <form id="customerForm" onSubmit={formik.handleSubmit}>
        <div className="lg:grid grid-cols-2 gap-6 md:block">
          <div className="">
          <Toast ref={toast} />
            <div>
              <InputComponent
                required
                htmlFor="Customer-name"
                classNameLabel="block text-gray-600"
                labelInput="Customer-Name:"
                type="text"
                name="customer_name"
                onChange={formik.handleChange}
                classNameInput="w-full p-2 border rounded mt-1"
                placeholder="Customer Name"
              />
              {/* <span>{formik.errors.customer_name}</span> */}
            </div>
            <div>
              <InputComponent
                htmlFor="Email"
                classNameLabel="block text-gray-600 mt-4"
                labelInput="Email:"
                type="email"
                onChange={formik.handleChange}
                name="email"
                classNameInput="w-full p-2 border rounded mt-1"
                placeholder="Enter Email Id"
              />
              {/* <span>{formik.errors.email}</span> */}
            </div>
            <div>
              <InputComponent
                htmlFor="tax_id"
                classNameLabel="block text-gray-600 mt-4"
                labelInput="GSTN:"
                type="text"
                id="tax_id"
                onChange={(e)=>handleCheck(e,"gstin")}
                name="tax_id"
                classNameInput="w-full p-2 border rounded mt-1 text-transform: uppercase"
                placeholder="Enter GSTN"
              />
              <span className="text-red-500">{error.gstinNo!=""?(error.gstinNo):("")}</span>
            </div>
            <div>
              <label className="block text-gray-600 mt-4">Customer Category</label>
              <select
                onChange={formik.handleChange}
                name="customer_category"
                className="w-full p-2 border rounded mt-1"
                value={formik.values.customer_category}
              >
                <option value="none">Select</option>
                <option>Proprietor</option>
                <option>Partner</option>
                <option>LLP</option>
                <option>Pvt.Ltd</option>
                <option>HUF</option>
              </select>
            </div>
            <div>
              <InputComponent
                htmlFor="opening value"
                classNameLabel="block text-gray-600 mt-4"
                labelInput="Opening Value"
                type="number"
                min="0"
                id="opening_value"
                onChange={formik.handleChange}
                name="opening_value"
                classNameInput="w-full p-2 border rounded mt-1"
                placeholder="Enter Opening Value"
              />
              {/* <span>{formik.errors.opening_value}</span> */}
            </div>
          </div>
          <div>
            <div>
              <label className="block text-gray-600">Party Type</label>
              <div className="flex space-x-4 mt-1">
                <label>
                  <input
                    type="radio"
                    onChange={() => handlePartyChange("vendor")}
                    name="party"
                    className="mr-2"
                  ></input>
                  <span> Vendor/Supplier</span>
                </label>
                <label>
                  <input
                    type="radio"
                    onChange={() => handlePartyChange("customer")}
                    name="party"
                    className="mr-2"
                  ></input>
                  <span> Customer</span>
                </label>
              </div>
            </div>
            <div className="" style={{ marginTop: "18px" }}>
              <InputComponent
                htmlFor="mobile"
                classNameLabel="block text-gray-600 mt-4"
                labelInput="Mobile:"
                type="text"
                min="0"
                id="mobile"
                onChange={(e)=>handleCheck(e,"number")}
                name="mobile_no"
                required
                classNameInput="w-full p-2 border rounded mt-1"
                placeholder="Enter Phone Number"
                
              />
              <span className="text-red-500">{error.phone_Number!=""?(error.phone_Number):("")}</span>
            </div>
            <div>
              <InputComponent
                htmlFor="pan_no"
                classNameLabel="block text-gray-600 mt-4"
                labelInput="Pan No:"
                type="text"
                id="pan_no"
                onChange={(e)=>handleCheck(e,"pan")}
                name="pan_no"
                
                classNameInput="w-full p-2 border rounded mt-1 text-transform: uppercase"
                placeholder="Enter Pan Number"
              />
              <span className="text-red-500">{error.panNo!=""?(error.panNo):("")}</span>
            </div>
            <div>
              <label className="block text-gray-600 mt-4">Customer Type</label>
              <select
                name="customer_type"
                onChange={(e) => setCustomer_type(e.target.value)}
                className="w-full p-2 border rounded mt-1"
              >
                <option readOnly value="customerType">
                  Customer Type
                </option>
                <option value="retail">Retail</option>
                <option value="wholeSale">Wholesale</option>
              </select>
            </div>
            <div>
              <InputComponent
                htmlFor="Contact Person"
                classNameLabel="block text-gray-600 mt-4"
                labelInput="Contact Person" 
                type="text"
                id="customerContactPerson"
                onChange={formik.handleChange}
                name="customerContactPerson"
                classNameInput="w-full p-2 border rounded mt-1"
                placeholder="Enter contact person name"
              />
              {/* <span>{formik.errors.opening_value}</span> */}
            </div>
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
                id="billing_address"
                name="streetBilling_address"
                onChange={formik.handleChange}
                className="w-full p-2 border rounded mt-1"
                placeholder="Enter Street Address"
              ></textarea>
              {/* <span>{formik.errors.billing_address}</span> */}
            </div>
            <div class="grid grid-cols-2 gap-6 mt-6">
                      <div>
                        <InputComponent
                          htmlFor="country"
                          classNameLabel="text-sm font-semibold text-gray-700"
                          labelInput="Country:"
                          style={style1}
                          type="text"
                          name="billingCountry"
                          value={zipData.country}
                          onChange={formik.handleChange}
                          classNameInput="w-full p-2 text-sm transition duration-300 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 hover:bg-gray-100"
                          placeholder="Enter Country Name"
                        />
                         <InputComponent
                          htmlFor="country"
                          readOnly
                          classNameLabel="text-sm font-semibold text-gray-700"
                          labelInput=""
                          style={style2}
                          type="text"
                          name="billingCountry"
                          value={country}
                          onChange={formik.handleChange}
                          classNameInput="w-full p-2 text-sm transition duration-300 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 hover:bg-gray-100"
                          placeholder="Enter Country Name"
                        />
                      </div>
                      <div>
                        <InputComponent
                          htmlFor="state"
                          classNameLabel="text-sm font-semibold text-gray-700"
                          labelInput="State:"
                          type="text"
                          style={style1}
                          value={zipData.state}
                          name="billingState"
                          onChange={formik.handleChange}
                          classNameInput="w-full p-2 text-sm transition duration-300 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 hover:bg-gray-100"
                          placeholder="Enter State Name"
                        />
                        <select
                          name="billingState"
                          style={style2}
                          className="form-select"
                          onChange={(e)=>handleStateChange(e,"billing")}
                        >
                          <option readOnly value="select">
                            Select
                          </option>
                          {state.map((values) => (
                            <option
                              value={values.iso2 + "." + values.name}
                              className=" form-text"
                              key={values.id}
                            >
                              {values.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <InputComponent
                          htmlFor="city"
                          classNameLabel="text-sm font-semibold text-gray-700"
                          labelInput="City:"
                          style={style1}
                          type="text"
                          id="billingCity"
                          value={zipData.city}
                          onChange={formik.handleChange}
                          classNameInput="w-full p-2 text-sm transition duration-300 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 hover:bg-gray-100"
                          placeholder="Enter City Name"
                        />
                        <select
                          style={style2}
                          className="form-select"
                          onChange={(e)=>handleCityChange(e,"billing")}
                          name="billingCity"
                        >
                          <option readOnly value="select">
                            Select
                          </option>
                          {city.map((values) => (
                            <option
                              value={values.name}
                              className="form-text"
                              key={values.id}
                            >
                              {values.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <InputComponent
                          htmlFor="zip"
                          classNameLabel="text-sm font-semibold text-gray-700"
                          labelInput="Zip/Pincode:"
                          type="number"
                          min="0"
                          name="billingZip_code"
                          onChange={(e)=>handleZipCodeChange(e,"billing")}
                          classNameInput="w-full p-2 text-sm transition duration-300 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 hover:bg-gray-100"
                          placeholder="Enter Zip/Pincode"
                        />
                      </div>
                    </div>
         </div>
             <div className="mt-4 flex items-center">
              <InputComponent
                labelInput="want Shipping Address to be same? Check"
                classNameLabel="me-2"
                onChange={handleCheckBoxCheck}
                type="checkbox"
                id="sameShip"
                // onChange={formik.handleChange}
                name="want Shipping Address to be same? Check"
                classNameInput="mr-2 mt-1"

              />
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
                id="shipping_address"
                name="streetShipping_address"
                onChange={formik.handleChange}
                {...(shipCheck != "" ? { value: shipCheck } : {})}
                className="w-full p-2 border rounded mt-1"
                placeholder="Enter Street Address"
              ></textarea>
              {/* <span>{formik.errors.shipping_address}</span> */}
            </div>
            {
                            isshipCheck==true?(
                              <div class="grid grid-cols-2 gap-6 mt-6">
                      <div>
                        <InputComponent
                          htmlFor="country"
                          classNameLabel="text-sm font-semibold text-gray-700"
                          labelInput="Country:"
                          style={style3}
                          type="text"
                          name="shippingCountry"
                          {
                            ...(names.cityName != ""?{value:names.countryName}:{value:zipData.country})
                          }
                          onChange={formik.handleChange}
                          classNameInput="w-full p-2 text-sm transition duration-300 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 hover:bg-gray-100"
                          placeholder="Enter Country Name"
                        />
                        
                      </div>
                      <div>
                        <InputComponent
                          htmlFor="state"
                          classNameLabel="text-sm font-semibold text-gray-700"
                          labelInput="State:"
                          type="text"
                          style={style3}
                         {
                            ...(names.cityName != ""?{value:names.stateName}:{value:zipData.state})
                          }
                          name="shippingState"
                          onChange={formik.handleChange}
                          classNameInput="w-full p-2 text-sm transition duration-300 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 hover:bg-gray-100"
                          placeholder="Enter State Name"
                        />
                        
                      </div>
                      <div>
                        <InputComponent
                          htmlFor="city"
                          classNameLabel="text-sm font-semibold text-gray-700"
                          labelInput="City:"
                          style={style3}
                          type="text"
                          id="shippingCity"
                          {
                            ...(names.cityName != ""?{value:names.cityName}:{value:zipData.city})
                          }
                          onChange={formik.handleChange}
                          classNameInput="w-full p-2 text-sm transition duration-300 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 hover:bg-gray-100"
                          placeholder="Enter City Name"
                        />
                      
                      </div>
                      <div>
                        <InputComponent
                          htmlFor="zip"
                          classNameLabel="text-sm font-semibold text-gray-700"
                          labelInput="Zip/Pincode:"
                          type="number"
                          min="0"
                          {...(zip!=""?{value:zip}:{value:zip})}
                          name="shippingZip_code"
                          // onChange={(e)=>handleZipCodeChange(e,"shipping")}
                          classNameInput="w-full p-2 text-sm transition duration-300 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 hover:bg-gray-100"
                          placeholder="Enter Zip/Pincode"
                        />
                      </div>
                    </div>
                            ):(
                              <div class="grid grid-cols-2 gap-6 mt-6">
                      <div>
                        <InputComponent
                          htmlFor="country"
                          classNameLabel="text-sm font-semibold text-gray-700"
                          labelInput="Country:"
                          style={style3}
                          type="text"
                          name="shippingCountry"
                          value={zipData1.country}
                          onChange={formik.handleChange}
                          classNameInput="w-full p-2 text-sm transition duration-300 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 hover:bg-gray-100"
                          placeholder="Enter Country Name"
                        />
                        <InputComponent
                          htmlFor="country"
                          classNameLabel="text-sm font-semibold text-gray-700"
                          labelInput=""
                          style={style4}
                          type="text"
                          name="shippingCountry"
                          value={country1}
                          onChange={formik.handleChange}
                          classNameInput="w-full p-2 text-sm transition duration-300 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 hover:bg-gray-100"
                          placeholder="Enter Country Name"
                        />
                      </div>
                      <div>
                        <InputComponent
                          htmlFor="state"
                          classNameLabel="text-sm font-semibold text-gray-700"
                          labelInput="State:"
                          type="text"
                          style={style3}
                          value={zipData1.state}
                          name="shippingState"
                          onChange={formik.handleChange}
                          classNameInput="w-full p-2 text-sm transition duration-300 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 hover:bg-gray-100"
                          placeholder="Enter State Name"
                        />
                        <select
                          name="shippingState"
                          style={style4}
                          className="form-select"
                          onChange={(e)=>handleStateChange(e,"shipping")}
                        >
                          <option readOnly value="select">
                            Select
                          </option>
                          {state1.map((values) => (
                            <option
                              value={values.iso2 + "." + values.name}
                              className=" form-text"
                              key={values.id}
                            >
                              {values.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <InputComponent
                          htmlFor="city"
                          classNameLabel="text-sm font-semibold text-gray-700"
                          labelInput="City:"
                          style={style3}
                          type="text"
                          id="shippingCity"
                          value={zipData1.city}
                          onChange={formik.handleChange}
                          classNameInput="w-full p-2 text-sm transition duration-300 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 hover:bg-gray-100"
                          placeholder="Enter City Name"
                        />
                        <select
                          style={style4}
                          className="form-select"
                          onChange={(e)=>handleCityChange(e,"shipping")}
                          name="shippingCity"
                        >
                          <option readOnly value="select">
                            Select
                          </option>
                          {city1.map((values) => (
                            <option
                              value={values.name}
                              className="form-text"
                              key={values.id}
                            >
                              {values.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <InputComponent
                          htmlFor="zip"
                          classNameLabel="text-sm font-semibold text-gray-700"
                          labelInput="Zip/Pincode:"
                          type="number"
                          min="0"
                          name="shippingZip_code"
                          onChange={(e)=>handleZipCodeChange(e,"shipping")}
                          classNameInput="w-full p-2 text-sm transition duration-300 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 hover:bg-gray-100"
                          placeholder="Enter Zip/Pincode"
                        />
                      </div>
                    </div>
                            )
                          }
            </div>
        <div className="mt-6">
          <label className="block text-gray-600">Custom Fields</label>
          {customField.map((field, index) => (
            <input
              key={index}
              type="text"
              disabled
              value={"coming soon.."}
              onChange={(e) => handleCustomFieldChange(index, e.target.value)}
              className=" w-full p-2 border rounded mt-1"
              placeholder="Enter custom field detail"
            />
          ))}
          <button
            onClick={handleCustomField}
            type="button"
            disabled
            className="disabled:opacity-80 disabled:bg-gray-400  mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            + Add Field
          </button>
        </div>
        <div className="mt-6">
          <label className="block text-gray-600">Notes</label>
          <textarea
            
            onChange={formik.handleChange}
            name="notes"
            className="w-full p-2 border rounded mt-1"
            placeholder="Enter Notes"
          ></textarea>
        </div>
        <div class="mt-6">
          <h3 class="text-xl font-bold">Personal Information</h3>
          <div class="grid grid-cols-2 gap-6">
            <div>
              <InputComponent
                
                htmlFor="birth_date"
                classNameLabel="block text-gray-600"
                labelInput="Birthdate"
                type="date"
                onChange={formik.handleChange}
                name="birth_date"
                classNameInput="w-full p-2 border rounded mt-1"
              />
            </div>
            <div>
              <InputComponent
                
                htmlFor="anniversary_date"
                onChange={formik.handleChange}
                classNameLabel="block text-gray-600"
                labelInput="Anniversary"
                type="date"
                name="anniversary_date"
                classNameInput="w-full p-2 border rounded mt-1"
              />
            </div>
          </div>
          <div class="mt-4">
            <div>
              <label className="block text-gray-600">Personal Notes</label>
              <textarea
                
                onChange={formik.handleChange}
                name="personal_notes"
                className="w-full p-2 border rounded mt-1"
                placeholder="Enter Personal Notes"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="mt-10 text-end">
          <ButtonComponent
            {...(status)?{}:{disabled:true}}
            value="Submit"
            type="submit"
            label="Save"
            className="disabled:opacity-80 disabled:bg-gray-400 px-20 py-3 bg-[#3A5B76] text-white font-bold rounded hover:bg-[#2E4A62]"
          ></ButtonComponent>
        </div>
      </form>
    </div>
    </div>
      )
    }
    </>
  );
}
