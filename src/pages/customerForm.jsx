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
  const [loader,setLoader]=useState(true);
  const [country, setCountry] = useState([{}]);
  const [iso2Country, setIso2Country] = useState("");
  const [iso2State, setIso2State] = useState("");
  const [style1, setStyle1] = useState({ display: "none" });
  const [style2, setStyle2] = useState({ display: "inline-block" });
  const [party, setParty] = useState("");
  const toast = useRef(null);
  const [locations,setLocationS]=useState("")
  const location=useLocation();
  useEffect(() => {
    const getCountry = async () => {
      const url = "https://api.countrystatecity.in/v1/countries";
      const headers = {
        "X-CSCAPI-KEY":
          "NEMzaW5KOW1yVjhoalBQSmhKRzRBb1U1ZFZWVXh6Z0pZWFI5TXdMMg==",
      };
      const response = await apiReuestLoadCountry(url, headers);
      setCountry(response.data);
    };
    getCountry();
    console.log(location.state?.data);
    var locationUn="";
    if(location.state?.data==undefined){
      locationUn="direct";
    }
    setLocationS(location.state?.data);
  }, []);

  const navigate = useNavigate();
  const [names, setNames] = useState({
    countryName: "",
    stateName: "",
    cityName: "",
  });
  const [state, setState] = useState([{}]);

  function handleCountryChange(e) {
    if (e.target.value === "select") {
      setNames({ countryName: "", stateName: "", cityName: "" });
      setState([{}]);
      setCity([{}]);
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
        setState(response.data);
        setIso2Country(iso);
        setNames({ ...names, countryName: name });
      } catch (err) {
        console.log(err);
      }
    };
    getState();
  }

  const [city, setCity] = useState([{}]);
  function handleStateChange(e) {
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

  function handleCityChange(e) {
    setNames({ ...names, cityName: e.target.value });
  }
  const [customer_type, setCustomer_type] = useState("");
  const [customField, setCustomField] = useState([""]);
  const [zipData, setZipdata] = useState([
    {
      country: "",
      state: "",
      city: "",
    },
  ]);
  const [zip, setZip] = useState("");
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
      billing_address: "",
      shipping_address: "",
      opening_value: "",
      party: "",
      city: "",
      state: "",
      zip_code: "",
      //   fax: "",
      country: "",
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
    },
    onSubmit: (values) => {
      if (shipCheck != "") {
        values.shipping_address = shipCheck;
      }
      const keyValuePairs = customField.map(field => {
        const [key, value] = field.split("/").map(item => item.trim());
        return { key, value };
      });
      values.customField = keyValuePairs;
      values.party = party;
      values.customer_type = customer_type;
      values.zip_code = zip;
      if (names.cityName === "") {
        values.country = zipData.country;
        values.state = zipData.state;
        values.city = zipData.city;
        console.log("i am working");
      } else {
        values.country = names.countryName;
        values.state = names.stateName;
        values.city = names.cityName;
        console.log("working");
      }
      // alert(JSON.stringify(values));
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
      };
      addCustomersData();
      // alert(JSON.stringify(values));
    },
    validationSchema:Yup.object({
      mobile_no:Yup.string().required("mobile no required").matches(/^\d{10}$/, 'Mobile number must be exactly 10 digits'),
    })
  });

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

  function handleZipCodeChange(e) {
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
  const [shipCheck, setShipCheck] = useState("");
  function handleCheckBoxCheck(e) {
    var bill = document.getElementById("billing_address").value;
    if (e.target.checked) {
      console.log("checked");
      setShipCheck(bill);
    } else {
      setShipCheck("");
    }
  }
  return (
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
                onChange={formik.handleChange}
                name="tax_id"
                classNameInput="w-full p-2 border rounded mt-1"
                placeholder="Enter GSTN"
              />
              {/* <span>{formik.errors.tax_id}</span> */}
            </div>
            <div>
              <InputComponent
                htmlFor="customer_category"
                classNameLabel="block text-gray-600 mt-4"
                labelInput="Customer category:"
                type="text"
                id="customer_category"
                onChange={formik.handleChange}
                name="customer_category"
                classNameInput="w-full p-2 border rounded mt-1"
                placeholder="Enter Customer Category"
              />
            </div>
            <div>
              <label
                htmlFor="billing_address"
                className="block text-gray-600 mt-4"
              >
                Billing Address:
              </label>
              <textarea
                id="billing_address"
                name="billing_address"
                onChange={formik.handleChange}
                className="w-full p-2 border rounded mt-1"
                placeholder="Enter Billing Address"
              ></textarea>
              {/* <span>{formik.errors.billing_address}</span> */}
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
                  <span> Vendor</span>
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
                type="number"
                min="0"
                id="mobile"
                onChange={formik.handleChange}
                name="mobile_no"
                classNameInput="w-full p-2 border rounded mt-1"
                placeholder="Enter Phone Number"
                
              />
              <span className="text-red-500">{formik.errors.mobile_no}</span>
            </div>
            <div>
              <InputComponent
                htmlFor="pan_no"
                classNameLabel="block text-gray-600 mt-4"
                labelInput="Pan No:"
                type="text"
                id="pan_no"
                onChange={formik.handleChange}
                name="pan_no"
                classNameInput="w-full p-2 border rounded mt-1"
                placeholder="Enter Pan Number"
              />
              <span>{formik.errors.pan_no}</span>
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
              <label
                htmlFor="shipping_address"
                className="block text-gray-600 mt-4"
              >
                Shipping Address:
              </label>
              <textarea
                id="shipping_address"
                name="shipping_address"
                onChange={formik.handleChange}
                {...(shipCheck != "" ? { value: shipCheck } : {})}
                className="w-full p-2 border rounded mt-1"
                placeholder="Enter Shipping Address"
              ></textarea>
              {/* <span>{formik.errors.shipping_address}</span> */}
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-6 mt-6">
          <div>
            <InputComponent
              htmlFor="country"
              classNameLabel="text-sm font-semibold text-gray-700"
              labelInput="Country:"
              style={style1}
              type="text"
              name="country"
              value={zipData.country}
              onChange={formik.handleChange}
              classNameInput="w-full p-2 text-sm transition duration-300 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 hover:bg-gray-100"
              placeholder="Enter Country Name"
            />
            <select
              style={style2}
              name="country"
              className="form-select"
              onChange={handleCountryChange}
            >
              <option readOnly value="select">
                Select
              </option>
              {country.map((values) => (
                <option
                  value={values.iso2 + "." + values.name}
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
              htmlFor="state"
              classNameLabel="text-sm font-semibold text-gray-700"
              labelInput="State:"
              type="text"
              style={style1}
              value={zipData.state}
              name="state"
              onChange={formik.handleChange}
              classNameInput="w-full p-2 text-sm transition duration-300 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 hover:bg-gray-100"
              placeholder="Enter State Name"
            />
            <select
              name="state"
              style={style2}
              className="form-select"
              onChange={handleStateChange}
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
              id="city"
              value={zipData.city}
              onChange={formik.handleChange}
              classNameInput="w-full p-2 text-sm transition duration-300 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 hover:bg-gray-100"
              placeholder="Enter City Name"
            />
            <select
              style={style2}
              className="form-select"
              onChange={handleCityChange}
              name="city"
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
              name="zip_code"
              onChange={handleZipCodeChange}
              classNameInput="w-full p-2 text-sm transition duration-300 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 hover:bg-gray-100"
              placeholder="Enter Zip/Pincode"
            />
          </div>
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
            value="Submit"
            type="submit"
            label="Save"
            className="px-20 py-3 bg-[#3A5B76] text-white font-bold rounded hover:bg-[#2E4A62]"
          ></ButtonComponent>
        </div>
      </form>
    </div>
    </div>
  );
}
