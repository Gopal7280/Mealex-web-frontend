// This code is part of a React application that allows users to edit customer details.
// It includes features like loading country and state data, handling form submissions, and managing UI states.
import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { debounce, values } from "lodash";
import { Preview, ModeEdit, DeleteForever, Close } from "@mui/icons-material";
import axios from "axios";
import "../styles/layoutFix.css";
import Sidebar from "../layouts/Sidebar";
import { InputComponent } from "../components/Input";
import { ButtonComponent } from "../components/Button";
import { apiPut } from "../services/api";
import {
  apiReuestLoadCountry,
  apiReuestLoadDataUsingZipCode,
  apiReuestLoadState,
} from "../services/apiServicesOnline";
import { config } from "../config/app";
import { Loader } from "../layouts/Loader";

export default function Customer_detail_edit({
  onCustomerAdded,
  editCustomer,
  onCancelEdit,
}) {
  const [party, setParty] = useState(""); // State to manage the party type
  const [loader,setLoader]=useState(false); // State to manage the loading state  
  const [isEdit, setIsEdit] = useState(false); // State to manage the edit mode
  const location = useLocation(); // Get the current location from React Router
  const [data, setData] = useState({}); // State to hold customer data
  const navigate = useNavigate(); // Hook to programmatically navigate  
  const [country, setCountry] = useState([{}]); // State to hold country data
  const [count, setCount] = useState(0); // State to manage the count of selected countries
  const [count1, setCount1] = useState(0); // State to manage the count of selected countries for shipping  
  const [country1, setCountry1] = useState([{}]); // State to hold country data for shipping
  const [iso2Country, setIso2Country] = useState(""); // State to hold ISO2 code of the selected country
  const [iso2Country1, setIso2Country1] = useState(""); // State to hold ISO2 code of the selected country for shipping
  const [iso2State, setIso2State] = useState(""); // State to hold ISO2 code of the selected state
  const [iso2State1, setIso2State1] = useState(""); // State to hold ISO2 code of the selected state for shipping
  const [style1, setStyle1] = useState({ display: "none" }); // State to manage the display style of the billing address
  const [style2, setStyle2] = useState({ display: "inline-block" }); // State to manage the display style of the billing address when a country is selected
  const [style3, setStyle3] = useState({ display: "none" }); /// State to manage the display style of the shipping address
  const [style4, setStyle4] = useState({ display: "inline-block" }); // State to manage the display style of the shipping address when a country is selected

  // Function to handle the form submission
  const formik = useFormik({
    initialValues: {
      customer_name: "",
      party_type: "",
      email: "",
      mobile_no: "",
      tax_id: "",
      pan_no: "",
      customer_category: "",
      customer_type: "",
      streetBillingAddress: "",
      streetShippingAddress: "",
      opening_value: "",
      billingCountry: "",
      is_active: false,
      billingState: "",
      billingCity: "",
      billingZip_code: "",
      shippingState: "",
      shippingCity: "",
      shippingZip_code: "",
      shippingCountry: "",
      notes: "",
      birth_date: data.customer_birthdate,
      anniversary_date: data.customer_anniversary,
      personal_notes: "",
      customer_id: "",
      billingId: "",
      shippingId: "",
      customerContactPerson: "",
    },
    onSubmit: (values) => {
      // Handle form submission
      values.billingId = data.billing_address_id;
      values.shippingId = data.shipping_address_id;
      values.billingZip_code = zip;
      values.shippingZip_code = zip1;
      if (isshipCheck) {
        values.streetShippingAddress = shipCheck;
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
      } else {
        if (names1.cityName === "") {
          if (zipData1.country != "") {
            values.shippingCountry = zipData1.country;
            values.shippingState = zipData1.state;
            values.shippingCity = zipData1.city;
            console.log("i am working");
          }
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
      values.customer_id = location.state.data.customer_id;
      // alert(values.customer_id);
      // alert(JSON.stringify(values));
      if (values.customerContactPerson == "") {
        values.customerContactPerson = data.customer_contact_persone;
      }
      if (values.customer_name == "") {
        values.customer_name = data.customer_name;
      }
      if (values.party_type == "") {
        values.party_type = data.customer_party_type;
      }
      if (values.email == "") {
        values.email = data.customer_email;
      }
      if (values.mobile_no == "") {
        values.mobile_no = data.customer_phone;
      }
      if (values.tax_id == "") {
        values.tax_id = data.customer_gstin;
      }
      if (values.pan_no == "") {
        values.pan_no = data.customer_pan;
      }
      if (values.customer_category == "") {
        values.customer_category = data.customer_category;
      }
      if (values.customer_type == "") {
        values.customer_type = data.customer_type;
      }
      if (values.streetBillingAddress == "") {
        values.streetBillingAddress = data.billing_street_address;
      }
      if (values.streetShippingAddress == "") {
        values.streetShippingAddress = data.shipping_street_address;
      }
      if (values.opening_value == "") {
        values.opening_value = data.customer_opening_value;
      }
      if (values.billingCountry == '' || values.billingCountry == undefined) {
        values.billingCountry = data.billing_country;
      }
      if (values.shippingCountry == undefined) {
        console.log("working with");
        values.shippingCountry = data.shipping_country;
      }
      if (values.billingState == undefined || values.billingState == '') {
        values.billingState = data.billing_state;
      }
      if (values.shippingState == undefined || values.shippingState == '') {
        values.shippingState = data.shipping_state;
      }
      if (values.billingCity == undefined || values.billingCity == '') {
        values.billingCity = data.billing_city;
      }
      if (values.shippingCity == undefined || values.shippingCity == '') {
        values.shippingCity = data.shipping_city;
      }
      if (values.billingZip_code == "" || values.billingZip_code == undefined) {
        values.billingZip_code = data.billing_pincode;
      }
      if (
        values.shippingZip_code == "" ||
        values.shippingZip_code == undefined
      ) {
        values.shippingZip_code = data.shipping_pincode;
      }
      if (values.notes == "") {
        values.notes = data.customer_notes;
      }
      if (values.birth_date == "" || values.birth_date==undefined) {
        values.birth_date = data.customer_birthdate;
      }
      if (values.anniversary_date == "" || values.anniversary_date==undefined) {
        values.anniversary_date = data.customer_anniversary;
      }
      if (values.personal_notes == "") {
        values.personal_notes = data.customer_personalnotes;
      }
      console.log(values);
      // alert(JSON.stringify(values));

      // Function to edit customer details  
      // This function sends a PUT request to update the customer details
      const editdetail = async () => {
        setLoader(true);
        try{
          const res = await apiPut("/customers", values);
        // alert(JSON.stringify(values));
        navigate("/display");
        }
        catch(err)
        {
          console.log(err);
        }
        finally{
          setLoader(false);
        }
      };
      editdetail();
    },
  });
  useEffect(() => {
    // Function to fetch the initial state data when the component mounts
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
        const response = await axios(config); // Fetching states for India
        setCountry("India"); // Setting the country to India  
        setCountry1("India"); // Setting the country for shipping to India
        setState(response.data); // Setting the state data for billing address
        setState1(response.data); // Setting the state data for shipping address
        setIso2Country("In"); // Setting the ISO2 code for billing address
        setIso2Country1("In"); // Setting the ISO2 code for shipping address  
       setNames({
          countryName: 'India',
          stateName:
            location.state.data.billing_state == null ? 'Select' : location.state.data.billing_state,
          cityName:
            location.state.data.billing_city == null ? 'Select' : location.state.data.billing_city,
        }); // Setting the names for billing address
        setNames1({
          countryName: 'India',
          stateName:
            location.state.data.shipping_state == null ? 'Select' : location.state.data.shipping_state,
          cityName:
            location.state.data.shipping_state == null ? 'Select' : location.state.data.shipping_state,
        }); // Setting the names for shipping address
        setZipdata({
          country: 'India',
          state: location.state.data.billing_state == null ? 'Select' : location.state.data.billing_state,
          city: location.state.data.billing_city == null ? 'Select' : location.state.data.billing_city,
        }); // Setting the zip data for billing address
        setZip(location.state.data.billing_pincode); // Setting the zip code for billing address
        setZip1(location.state.data.shipping_pincode); // Setting the zip code for shipping address
      } catch (err) {
        console.log(err);
      }
    };
    getState();
    console.log(location.state.data);
    setData(location.state.data); // Setting the initial data from the location state
    setNames({
      countryName: location.state.data.country,
      stateName: location.state.data.state,
      cityName: location.state.data.city,
    }); // Setting the names for billing address from the initial data
    setZip(location.state.data.zip_code); // Setting the zip code for billing address from the initial data
    console.log(data);
    console.log("execute");
  }, []);
  const [names, setNames] = useState({
    countryName: "",
    stateName: "",
    cityName: "",
  }); // State to hold names for billing address
  const [names1, setNames1] = useState({
    countryName: "",
    stateName: "",
    cityName: "",
  }); // State to hold names for shipping address 
  const [state, setState] = useState([{}]); // State to hold state data for billing address 
  const [state1, setState1] = useState([{}]); // State to hold state data for shipping address  
  function handleCountryChange(e, name) {
    if (name == "billing") {
      setCount(1);
      if (e.target.value === "select") {
        setCount(0);
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
    if (name == "shipping") {
      setCount1(1);
      if (e.target.value === "select") {
        setCount1(0);
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
  const [city, setCity] = useState([{}]); // State to hold city data for billing address  
  const [city1, setCity1] = useState([{}]); // State to hold city data for shipping address 

  // Function to handle state change when a country is selected
  function handleStateChange(e, name) {
    if (name == "billing") {
      setCount(1);
      if (e.target.value === "select") {
        setCount(0);
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
    if (name == "shipping") {
      setCount1(1);
      if (e.target.value === "select") {
        setCount1(0);
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
  // Function to handle city change when a state is selected  
  function handleCityChange(e, name) {
    if (name == "billing") {
      setNames({ ...names, cityName: e.target.value });
    }
    if (name == "shipping") {
      setNames1({ ...names1, cityName: e.target.value });
    }
  }
  const [zipData, setZipdata] = useState([
    {
      country: "",
      state: "",
      city: "",
    },
  ]); // State to hold zip data for billing address
  const [zipData1, setZipdata1] = useState([
    {
      country: "",
      state: "",
      city: "",
    },
  ]); // State to hold zip data for shipping address
  const [zip, setZip] = useState(""); // State to hold zip code for billing address
  const [zip1, setZip1] = useState(""); // State to hold zip code for shipping address
  // Function to handle debounced API requests for fetching zip code data
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
  // Function to handle debounced API requests for fetching zip code data for shipping address
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
  const [shipCheck, setShipCheck] = useState(""); // State to hold the shipping address when the checkbox is checked  
  const [isshipCheck, setisShipCheck] = useState(""); // State to manage whether the shipping address is checked
  const [style5, setStyle5] = useState("none"); // State to manage the display style of the shipping address when the checkbox is checked
  // Function to handle checkbox check event for shipping address
  function handleCheckBoxCheck(e) {
    var bill = document.getElementById("billing_address").value;
    if (e.target.checked) {
      console.log("checked");
      setShipCheck(bill);
      setisShipCheck(true);
      setStyle3({ display: "inline-block" });
      setStyle4({ display: "none" });
    } else {
      setShipCheck("");
      setisShipCheck(false);
      setStyle3({ display: "none" });
      setStyle4({ display: "inline-block" });
    }
  }
  // Function to handle zip code change event for billing and shipping addresses  
  function handleZipCodeChange(e, name) {
    if (name == "billing") {
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
    if (name == "shipping") {
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
  function handleClick() {
    console.log(data);
  }

  // Function to handle field change event to set the edit mode
  function handleFieldChange(e) {
    setIsEdit(true);
  }
  function handlePartyChange(e) {
    setParty(e);
  }
  return (
      <>
      {
        loader?(
          <Loader/> // Display the loader while data is being fetched or processed
        ):(
          <div className="">
      <div className="over max-w-6xl mx-auto bg-white p-8 shadow-lg rounded-md">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold text-center mb-6">Update Details</h1>

        <NavLink to="/display" className="text-white text-decoration-none">
          <ButtonComponent
            type="button"
            className=" bg-[#3A5B76]  px-2 py-1 text-white font-bold rounded hover:bg-[#2E4A62]"
            value="close"
            children={<Close />}
          />
        </NavLink>
        </div>
        <form onSubmit={formik.handleSubmit} id="customerForm" className="mt-6">
          <div className="grid grid-cols-2 gap-6 max-sm:block">
            <div>
              <InputComponent
                onChange={formik.handleChange}
                name="customer_name"
                onFocus={handleFieldChange}
                labelInput="Customer Name"
                type="text"
                placeholder="Enter Product Name"
                {...(isEdit ? {} : { value: data.customer_name })}
              ></InputComponent>
            </div>
            {/* <div>
            <InputComponent
              onChange={formik.handleChange}
              name="party_type"
              onFocus={handleFieldChange}
              labelInput="Party Type"
              type="text"
              // value={data.party}
              {...(isEdit ? {} : { value: data.party })}
            ></InputComponent>
          </div> */}
            <div>
              <label className="block text-gray-600">Party Type</label>
              <select
                onChange={formik.handleChange}
                {...(isEdit ? {} : { value: data.customer_party_type })}
                name="party_type"
                className="w-full p-2 border rounded mt-1"
                value={formik.values.party_type}
              >
                <option disabled value="">
                  {data.customer_party_type != ""
                    ? data.customer_party_type
                    : "select"}
                </option>
                <option>Customer</option>
                <option>Vendor/Supplier</option>
              </select>
            </div>
            <div>
              <InputComponent
                onChange={formik.handleChange}
                name="email"
                onFocus={handleFieldChange}
                labelInput="Email Id"
                type="text"
                // value={data.email}
                {...(isEdit ? {} : { value: data.customer_email })}
              ></InputComponent>
            </div>
            <div>
              <InputComponent
                onChange={formik.handleChange}
                name="mobile_no"
                onFocus={handleFieldChange}
                labelInput="Mobile No."
                type="text"
                readOnly
                // value={data.mobile_no}
                {...(isEdit ? {} : { value: data.customer_phone })}
              ></InputComponent>
            </div>
            <div>
              <InputComponent
                onChange={formik.handleChange}
                name="tax_id"
                onFocus={handleFieldChange}
                labelInput="GSTIN No."
                type="text"
                // value={data.tax_id}
                {...(isEdit ? {} : { value: data.customer_gstin })}
              ></InputComponent>
            </div>
            <div>
              <InputComponent
                onChange={formik.handleChange}
                name="pan_no"
                onFocus={handleFieldChange}
                labelInput="Pan No."
                type="text"
                // value={data.pan_number}
                {...(isEdit ? {} : { value: data.customer_pan })}
              ></InputComponent>
            </div>
            {/* <div>
            <InputComponent
              onChange={formik.handleChange}
              name="customer_category"
              onFocus={handleFieldChange}
              labelInput="Customer Category"
              type="text"
              // value={data.customer_category}
              {...(isEdit ? {} : { value: data.customer_category })}
            ></InputComponent>
          </div> */}
            <div>
              <label className="block text-gray-600">Customer Category</label>
              <select
                onChange={formik.handleChange}
                {...(isEdit ? {} : { value: data.customer_category })}
                name="customer_category"
                className="w-full p-2 border rounded mt-1"
                value={formik.values.customer_category}
              >
                <option disabled value="">
                  {data.customer_category != ""
                    ? data.customer_category
                    : "select"}
                </option>
                <option>Proprietor</option>
                <option>Partner</option>
                <option>LLP</option>
                <option>Pvt.Ltd</option>
                <option>HUF</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-600">Customer Type</label>
              <select
                onChange={formik.handleChange}
                {...(isEdit ? {} : { value: data.customer_type })}
                name="customer_type"
                className="w-full p-2 border rounded mt-1"
                value={formik.values.customer_type}
              >
                <option disabled value="">
                  {data.customer_type != "" ? data.customer_type : "select"}
                </option>
                <option>Retail</option>
                <option>WholeSale</option>
              </select>
            </div>
            <div>
              <InputComponent
                onChange={formik.handleChange}
                name="opening_value"
                labelInput="Opening Value"
                type="text"
                // value={data.opening_value}
                onFocus={handleFieldChange}
                {...(isEdit ? {} : { value: data.customer_opening_value })}
              ></InputComponent>
            </div>
            <div>
              <InputComponent
                onChange={formik.handleChange}
                name="customerContactPerson"
                labelInput="Contact Person"
                type="text"
                // value={data.opening_value}
                onFocus={handleFieldChange}
                {...(isEdit ? {} : { value: data.customer_contact_persone })}
              ></InputComponent>
            </div>
          </div>
          <div className="mt-4 border border-1 p-3">
            <h5>Billing Address</h5>
            <div>
              <label
                htmlFor="billing_address"
                className="block text-gray-600 mt-4"
              >
                Street Address:
              </label>
              <textarea
                onChange={formik.handleChange}
                id="billing_address"
                name="streetBillingAddress"
                // value={data.billing_address}
                onFocus={handleFieldChange}
                {...(isEdit ? {} : { value: data.billing_street_address })}
                className="w-full p-2 border rounded mt-1"
                placeholder="Enter Street Address"
              ></textarea>
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
                  onChange={(e) => handleStateChange(e, "billing")}
                >
                  <option
                    readOnly
                    value={count == 0 ? data.billing_state : "Select"}
                  >
                    {count == 0 ? data.billing_state : "Select"}
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
                  onChange={(e) => handleCityChange(e, "billing")}
                  name="billingCity"
                >
                  <option
                    readOnly
                    value={count == 0 ? data.billing_city : "Select"}
                  >
                    {count == 0 ? data.billing_city : "Select"}
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
                  {...(isEdit ? {} : { value: data.billing_pincode })}
                  onChange={(e) => handleZipCodeChange(e, "billing")}
                  classNameInput="w-full p-2 text-sm transition duration-300 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 hover:bg-gray-100"
                  placeholder="Enter Zip/Pincode"
                />
              </div>
            </div>
          </div>
          {/* <div className="mt-4 flex items-center">
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
          </div> */}
          {/* <div>
              <label htmlFor="" className="block text-gray-600 mt-4">
                Shipping Address:
              </label>
              <textarea
                onChange={formik.handleChange}
                name="shipping_address"
                // value={data.shipping_address}
                onFocus={handleFieldChange}
                {...(isEdit ? {} : { value: data.shipping_address })}
                className="w-full p-2 border rounded mt-1"
                placeholder="Enter Billing Address"
              ></textarea>
            </div> */}
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
          <div className="mt-4 border border-1 p-3">
            <h5>Shipping Address</h5>
            <div>
              <label
                htmlFor="shipping_address"
                className="block text-gray-600 mt-4"
              >
                Street Address:
              </label>
              <textarea
                id="shipping_address"
                name="streetShippingAddress"
                onChange={formik.handleChange}
                onFocus={handleFieldChange}
                {...(isEdit
                  ? shipCheck != ""
                    ? { value: shipCheck }
                    : {}
                  : { value: data.shipping_street_address })}
                className="w-full p-2 border rounded mt-1"
                placeholder="Enter Street Address"
              ></textarea>
              {/* <span>{formik.errors.shipping_address}</span> */}
            </div>
            {isshipCheck == true ? (
                    <div className="grid grid-cols-2 gap-6 mt-6">
                      <div>
                        <InputComponent
                          htmlFor="country"
                          classNameLabel="text-sm font-semibold text-gray-700"
                          labelInput="Country:"
                          style={style3}
                          type="text"
                          name="shippingCountry"
                          {...(names.cityName != ''
                            ? { value: names.countryName }
                            : { value: zipData.country })}
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
                          {...(names.cityName != ''
                            ? { value: names.stateName }
                            : { value: zipData.state })}
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
                          {...(names.cityName != ''
                            ? { value: names.cityName }
                            : { value: zipData.city })}
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
                          {...(zip != '' ? { value: zip } : { value: zip })}
                          name="shippingZip_code"
                          // onChange={(e)=>handleZipCodeChange(e,"shipping")}
                          classNameInput="w-full p-2 text-sm transition duration-300 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 hover:bg-gray-100"
                          placeholder="Enter Zip/Pincode"
                        />
                      </div>
                    </div>
                  ) : (
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
                          readOnly
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
                          onChange={e => handleStateChange(e, 'shipping')}
                        >
                          <option
                            readOnly
                            value={
                              count1 == 0 ? data.shipping_state : 'Select'
                            }
                          >
                            {count1 == 0 ? data.shipping_state : 'Select'}
                          </option>
                          {state1.map(values => (
                            <option
                              value={values.iso2 + '.' + values.name}
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
                          onChange={e => handleCityChange(e, 'shipping')}
                          name="shippingCity"
                        >
                          <option
                            readOnly
                            value={
                              count1 == 0 ? data.shipping_city : 'Select'
                            }
                          >
                            {count1 == 0 ? data.shipping_city : 'Select'}
                          </option>
                          {city1.map(values => (
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
                          onFocus={handleFieldChange}
                          {...(isEdit ? {} : { value: data.shipping_pincode })}
                          onChange={e => handleZipCodeChange(e, 'shipping')}
                          classNameInput="w-full p-2 text-sm transition duration-300 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 hover:bg-gray-100"
                          placeholder="Enter Zip/Pincode"
                        />
                      </div>
                    </div>
                  )}
          </div>
          <label htmlFor="" className="block text-gray-600 mt-4">
            Notes:
          </label>
          <textarea
            onChange={formik.handleChange}
            name="notes"
            // value={data.notes}
            onFocus={handleFieldChange}
            {...(isEdit ? {} : { value: data.customer_notes })}
            className="w-full p-2 border rounded mt-1"
          ></textarea>
          <h3 class="text-xl font-bold">Personal Information</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <InputComponent
                onChange={formik.handleChange}
                name="birth_date"
                labelInput="Birth Date"
                
                // value={data.date_of_birth}
                onFocus={handleFieldChange}
                {...(isEdit ? {type:"date"} : { value: data.customer_birthdate,type:"date" })}
              ></InputComponent>
            </div>
            <div>
              <InputComponent
                onChange={formik.handleChange}
                name="anniversary_date"
                labelInput="Anniversary"
                
                // value={data.anniversary_date}
                onFocus={handleFieldChange}
                {...(isEdit ? {type:"date"} : { value: data.customer_anniversary,type:"date" })}
              ></InputComponent>
            </div>
          </div>
          <div>
            <label htmlFor="" className="block text-gray-600 mt-4">
              Personal notes:
            </label>
            <textarea
              onChange={formik.handleChange}
              name="personal_notes"
              // value={data.personal_notes}
              onFocus={handleFieldChange}
              {...(isEdit ? {} : { value: data.customer_personalnotes })}
              className="w-full p-2 border rounded mt-1"
            ></textarea>
          </div>
          <div className="mt-10 text-end">
            <ButtonComponent
              value="Submit"
              label="Update"
              type="submit"
              className="px-20 py-3 bg-[#3A5B76] text-white font-bold rounded hover:bg-[#2E4A62]"
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
