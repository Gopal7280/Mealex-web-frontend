// Bussiness_profile.jsx
// This is component for updating business profile details.
// same functionality as the previous code bussiness profile creation form but with a update fields.
import { useEffect, useState } from 'react';
import { Loader } from '../layouts/Loader';
import Sidebar from '../layouts/Sidebar';
import { SearchComponent } from '../components/SerachBar';
import { NavLink, useNavigate } from 'react-router-dom';
import { ButtonComponent } from '../components/Button';
import { apiGet, apiPut } from '../services/api';
import { useFormik } from 'formik';
import { Preview, ModeEdit, DeleteForever, Close } from '@mui/icons-material';
import { InputComponent } from '../components/Input';
import axios from 'axios';
import {
  apiReuestLoadCountry,
  apiReuestLoadState,
} from '../services/apiServicesOnline';
import { debounce } from 'lodash';
import { config } from '../config/app';
import { NAME_REGEX } from '../utils/regularExpression';
export function Bussiness_profile({ setRefresh }) {
  const [search, setSearch] = useState(''); // Search state
  const [logoPreview, setLogoPreview] = useState(null);
  const [signature, setSignature] = useState(null);
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();
  const [pan_no, setPan_no] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gstIn, setGstIn] = useState('');
    const [status, setStatus] = useState(true);
  const [error, setError] = useState('');
  const maxSizeInMB = 2; // Limit size to 2MB
  const [country, setCountry] = useState([{}]);
  const [count, setCount] = useState(0);
  const [count1, setCount1] = useState(0);
  const [country1, setCountry1] = useState([{}]);
  const [iso2Country, setIso2Country] = useState('');
  const [iso2Country1, setIso2Country1] = useState('');
  const [iso2State, setIso2State] = useState('');
  const [iso2State1, setIso2State1] = useState('');
  const [style1, setStyle1] = useState({ display: 'none' });
  const [style2, setStyle2] = useState({ display: 'inline-block' });
  const [style3, setStyle3] = useState({ display: 'none' });
  const [style4, setStyle4] = useState({ display: 'inline-block' });
  useEffect(() => {
    setLoader(true);
    const getState = async () => {
      try {
        const config = {
          method: 'get',
          url: `https://api.countrystatecity.in/v1/countries/In/states`,
          headers: {
            'X-CSCAPI-KEY':
              'NEMzaW5KOW1yVjhoalBQSmhKRzRBb1U1ZFZWVXh6Z0pZWFI5TXdMMg==',
          },
        };
        const response = await axios(config);
        setCountry('India');
        setCountry1('India');
        setState(response.data);
        setState1(response.data);
        setIso2Country('In');
        setIso2Country1('In');
        setNames({ ...names, countryName: 'India' });
        setNames1({ ...names, countryName: 'India' });
      } catch (err) {
        console.log(err);
      }
    };
    getState();
    const bussinessProfle = async () => {
      try {
        const res = await apiGet('/businessprofile');
        console.log(res);
        setData(res);
        setLogoPreview(res[0].vendor_logo);
        setSignature(res[0].vendor_signature_box);
        setNames({
          countryName: 'India',
          stateName:
            res[0].billing_state == null ? 'Select' : res[0].billing_state,
          cityName:
            res[0].billing_city == null ? 'Select' : res[0].billing_city,
        });
        setNames1({
          countryName: 'India',
          stateName:
            res[0].shipping_state == null ? 'Select' : res[0].shipping_state,
          cityName:
            res[0].shipping_state == null ? 'Select' : res[0].shipping_state,
        });
        setZipdata({
          country: 'India',
          state: res[0].billing_state == null ? 'Select' : res[0].billing_state,
          city: res[0].billing_city == null ? 'Select' : res[0].billing_city,
        });
        setZip(res[0].billing_pincode);
        setZip1(res[0].shipping_pincode);
      } catch (err) {
        console.log(err);
      } finally {
        setLoader(false);
      }
    };
    bussinessProfle();
  }, []);
  const [names, setNames] = useState({
    countryName: '',
    stateName: '',
    cityName: '',
  });
  const [names1, setNames1] = useState({
    countryName: '',
    stateName: '',
    cityName: '',
  });
  const [state, setState] = useState([{}]);
  const [state1, setState1] = useState([{}]);
  function handleCountryChange(e, name) {
    if (name == 'billing') {
      setCount(1);
      if (e.target.value === 'select') {
        setCount(0);
        setNames({ countryName: '', stateName: '', cityName: '' });
        setState([{}]);
        setCity([{}]);
      }
      const [iso, name] = e.target.value.split('.');
      const getState = async () => {
        try {
          const config = {
            method: 'get',
            url: `https://api.countrystatecity.in/v1/countries/${iso}/states`,
            headers: {
              'X-CSCAPI-KEY':
                'NEMzaW5KOW1yVjhoalBQSmhKRzRBb1U1ZFZWVXh6Z0pZWFI5TXdMMg==',
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
    if (name == 'shipping') {
      setCount1(1);
      if (e.target.value === 'select') {
        setCount1(0);
        setNames1({ countryName: '', stateName: '', cityName: '' });
        setState1([{}]);
        setCity1([{}]);
      }
      const [iso, name] = e.target.value.split('.');
      const getState = async () => {
        try {
          const config = {
            method: 'get',
            url: `https://api.countrystatecity.in/v1/countries/${iso}/states`,
            headers: {
              'X-CSCAPI-KEY':
                'NEMzaW5KOW1yVjhoalBQSmhKRzRBb1U1ZFZWVXh6Z0pZWFI5TXdMMg==',
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
  function handleStateChange(e, name) {
    if (name == 'billing') {
      setCount(1);
      if (e.target.value === 'select') {
        setCount(0);
        setNames({ countryName: '', stateName: '', cityName: '' });
        setState([{}]);
        setCity([{}]);
      }
      const [iso, name] = e.target.value.split('.');
      setIso2State(iso);
      const getCity = async () => {
        try {
          const url = `https://api.countrystatecity.in/v1/countries/${iso2Country}/states/${iso}/cities`;
          const headers = {
            'X-CSCAPI-KEY':
              'NEMzaW5KOW1yVjhoalBQSmhKRzRBb1U1ZFZWVXh6Z0pZWFI5TXdMMg==',
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
    if (name == 'shipping') {
      setCount1(1);
      if (e.target.value === 'select') {
        setCount1(0);
        setNames({ countryName: '', stateName: '', cityName: '' });
        setState([{}]);
        setCity([{}]);
      }
      const [iso, name] = e.target.value.split('.');
      setIso2State1(iso);
      const getCity = async () => {
        try {
          const url = `https://api.countrystatecity.in/v1/countries/${iso2Country1}/states/${iso}/cities`;
          const headers = {
            'X-CSCAPI-KEY':
              'NEMzaW5KOW1yVjhoalBQSmhKRzRBb1U1ZFZWVXh6Z0pZWFI5TXdMMg==',
          };
          const response = await apiReuestLoadCountry(url, headers);
          setCity1(response.data);
          setNames1({ ...names1, stateName: name });
        } catch (err) {
          console.log(err);
        }
      };
      getCity();
    }
  }
  function handleCityChange(e, name) {
    if (name == 'billing') {
      setNames({ ...names, cityName: e.target.value });
    }
    if (name == 'shipping') {
      setNames1({ ...names1, cityName: e.target.value });
    }
  }
  const [zipData, setZipdata] = useState([
    {
      country: '',
      state: '',
      city: '',
    },
  ]);
  const [zipData1, setZipdata1] = useState([
    {
      country: '',
      state: '',
      city: '',
    },
  ]);
  const [zip, setZip] = useState('');
  const [zip1, setZip1] = useState('');
  const handleDebounce = debounce(value => {
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
        console.error('Error fetching pincode data:', error);
      }
    };
    fetchUsingZipCode();
  }, 700);
  const handleDebounce1 = debounce(value => {
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
        console.error('Error fetching pincode data:', error);
      }
    };
    fetchUsingZipCode();
  }, 700);
  const [shipCheck, setShipCheck] = useState('');
  const [isshipCheck, setisShipCheck] = useState('');
  const [style5, setStyle5] = useState('none');
  function handleCheckBoxCheck(e) {
    var bill = document.getElementById('billing_address').value;
    if (e.target.checked) {
      console.log('checked');
      setShipCheck(bill);
      setisShipCheck(true);
      setStyle3({ display: 'inline-block' });
      setStyle4({ display: 'none' });
    } else {
      setShipCheck('');
      setisShipCheck(false);
      setStyle3({ display: 'none' });
      setStyle4({ display: 'inline-block' });
    }
  }
  function handleZipCodeChange(e, name) {
    if (name == 'billing') {
      handleDebounce(e.target.value);
      setZip(e.target.value);
      if (e.target.value === '') {
        setStyle1({ display: 'none' });
        setStyle2({ display: 'inline-block' });
        setZipdata({ country: '', state: '', city: '' });
        console.log('i am working');
      } else {
        if (names.cityName != '') {
          setStyle1({ display: 'none' });
          setStyle2({ display: 'inline-block' });
          setZipdata({ country: '', state: '', city: '' });
        } else {
          setStyle1({ display: 'inline-block' });
          setStyle2({ display: 'none' });
        }
      }
    }
    if (name == 'shipping') {
      handleDebounce1(e.target.value);
      setZip1(e.target.value);
      if (e.target.value === '') {
        setStyle3({ display: 'none' });
        setStyle4({ display: 'inline-block' });
        setZipdata1({ country: '', state: '', city: '' });
        console.log('i am working');
      } else {
        if (names1.cityName != '') {
          setStyle3({ display: 'none' });
          setStyle4({ display: 'inline-block' });
          setZipdata1({ country: '', state: '', city: '' });
        } else {
          setStyle3({ display: 'inline-block' });
          setStyle4({ display: 'none' });
        }
      }
    }
  }
  const formik = useFormik({
    initialValues: {
      name: '',
      billingId: '',
      shippingId: '',
      businessName: '',
      phone: '',
      email: '',
      pan: '',
      gst: '',
      businessType: '',
      businessCategory: '',
      openingValue: '',
      streetBillingAddress: '',
      streetShippingAddress: '',
      billingState: '',
      billingCity: '',
      billingZip_code: '',
      shippingState: '',
      shippingCity: '',
      shippingZip_code: '',
      shippingCountry: '',
      billingCountry: '',
      notes: '',
      birthdate: '',
      anniversary: '',
      personalNotes: '',
      logo: '',
      signatureBox: '',
      businessId: '',
    },
    onSubmit: values => {
      // setLoader(true);
      values.billingId = data[0].billing_address_id;
      values.shippingId = data[0].shipping_address_id;
      values.billingZip_code = zip;
      values.shippingZip_code = zip1;
      if (isshipCheck) {
        values.streetShippingAddress = shipCheck;
        if (names.cityName === '') {
          values.shippingCountry = zipData.country;
          values.shippingState = zipData.state;
          values.shippingCity = zipData.city;
          values.shippingZip_code = zip;
          console.log('i am working');
        } else {
          values.shippingCountry = names.countryName;
          values.shippingState = names.stateName;
          values.shippingCity = names.cityName;
          values.shippingZip_code = zip;
          console.log('working');
        }
      } else {
        if (names1.cityName === '') {
          values.shippingCountry = zipData1.country;
          values.shippingState = zipData1.state;
          values.shippingCity = zipData1.city;
          console.log('i am working');
        } else {
          values.shippingCountry = names1.countryName;
          values.shippingState = names1.stateName;
          values.shippingCity = names1.cityName;
          console.log('working');
        }
      }
      if (names.cityName === '') {
        values.billingCountry = zipData.country;
        values.billingState = zipData.state;
        values.billingCity = zipData.city;
        console.log('i am working');
      } else {
        values.billingCountry = names.countryName;
        values.billingState = names.stateName;
        values.billingCity = names.cityName;
        console.log('working');
      }
      if (values.billingCountry == '' || values.billingCountry == undefined) {
        values.billingCountry = data[0].billing_country;
      }
      if (
        values.shippingCountry == undefined ||
        values.shippingCountry == undefined
      ) {
        console.log('working with');
        values.shippingCountry = data[0].shipping_country;
      }
      if (values.billingState == undefined || values.billingState == '') {
        values.billingState = data[0].billing_state;
      }
      if (values.shippingState == undefined || values.shippingState == '') {
        values.shippingState = data[0].shipping_state;
      }
      if (values.billingCity == undefined || values.billingCity == '') {
        values.billingCity = data[0].billing_city;
      }
      if (values.shippingCity == undefined || values.shippingCity == '') {
        values.shippingCity = data[0].shipping_city;
      }
      if (values.billingZip_code == '' || values.billingZip_code == undefined) {
        values.billingZip_code = data[0].billing_pincode;
      }
      if (
        values.shippingZip_code == '' ||
        values.shippingZip_code == undefined
      ) {
        values.shippingZip_code = data[0].shipping_pincode;
      }
      values.businessId = data[0].vendor_id;
      if (values.name == '') {
        values.name = data[0].vendor_name;
      }
      if (values.businessName == '') {
        values.businessName = data[0].vendor_business_legal_name;
      }
      if (phoneNumber == '') {
        values.phone = data[0].vendor_phone;
      }
      if(phoneNumber!='')
      {
        values.phone=phoneNumber;
      }
      if (values.email == '') {
        values.email = data[0].vendor_email;
      }
      if (pan_no == '') {
        values.pan = data[0].vendor_pan;
      }
      if(pan_no!="")
      {
        values.pan=pan_no;
      }
      if (gstIn == '') {
        values.gst = data[0].vendor_gstin;
      }
      if(gstIn !='')
      {
        values.gst=gstIn;
      }
      if (values.businessType == '') {
        values.businessType = data[0].vendor_industry_type;
      }
      if (values.businessCategory == '') {
        values.businessCategory = data[0].vendor_business_category;
      }
      if (values.openingValue == '') {
        values.openingValue = data[0].vendor_opening_value;
      }
      if (values.notes == '') {
        values.notes = data[0].vendor_notes;
      }
      if (values.personalNotes == '') {
        values.personalNotes = data[0].vendor_personalnotes;
      }
      if (values.birthdate == '') {
        values.birthdate = data[0].vendor_birthdate;
      }
      if (values.anniversary == '') {
        values.anniversary = data[0].vendor_anniversary;
      }
      if(values.streetBillingAddress=="")
      {
        values.streetBillingAddress=data[0].billing_street_address;
      }if(values.streetShippingAddress=="")
      {
          values.streetShippingAddress=data[0].shipping_street_address
      }
      values.signatureBox = signature;
      values.logo = logoPreview;
      console.log(values);
      const updateBusinessProfile = async () => {
        setLoader(true);
        try {
          const res = await apiPut('/businessprofile', values);
          // alert(res);
          setRefresh(true);
          navigate('/display');
        } catch (err) {
          console.log(err);
        } finally {
          setLoader(false);
        }
      };
      updateBusinessProfile();
    },
  });
  function handleEdit() {
    console.log('edit');
    setEdit(true);
  }
  const handleLogoChange = event => {
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      const fileSizeInMB = file.size / (1024 * 1024); // Convert bytes to MB

      if (fileSizeInMB > maxSizeInMB) {
        setError(`File size should be less than ${maxSizeInMB} MB`);
        alert('file size too long for logo');
        event.target.value = ''; // Clear the input
      } else {
        const reader = new FileReader();
        reader.onload = e => {
          // console.log(e.target.result);
          setLogoPreview(e.target.result);
          // localStorage.setItem("image", e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };
  const handleSignatureChange = event => {
    const file = event.target.files[0];
    if (file) {
      const fileSizeInMB = file.size / (1024 * 1024); // Convert bytes to MB

      if (fileSizeInMB > maxSizeInMB) {
        setError(`File size should be less than ${maxSizeInMB} MB`);
        alert('file size too long for signature');
        event.target.value = ''; // Clear the input
      } else {
        setError('');
        const reader = new FileReader();
        reader.onload = e => {
          console.log(e.target.result);
          setSignature(e.target.result);
          localStorage.setItem('imageSign', e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };
  function handleCheckCred(e, name) {
    if(name=="name")
    {
      if (!NAME_REGEX.test(e.target.value)) {
        if (e.target.value == '') {
          setError({
            name:'',
            panNo: error.panNo,
            gstinNo: error.gstinNo,
            phone_Number: error.phone_Number,
          });
          formik.values.name='';
          setStatus(true);
        } else {
          setError({
            name:
              'Invalid name. Only letters and spaces are allowed, and it must be 2-50 characters long.',
              panNo:error.panNo,
            gstinNo: error.gstinNo,
            phone_Number: error.phone_Number,
          });
          formik.values.name=e.target.value;
          setStatus(false);
        }
      } else {
        formik.values.name=e.target.value;
        console.log('2');
        setError({
          name:'',
          panNo: error.panNo,
          gstinNo: error.gstinNo,
          phone_Number: error.phone_Number,
        });
        setStatus(true);
      }
    }
    if (name == 'pan') {
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
      if (!panRegex.test(e.target.value.toUpperCase())) {
        if (e.target.value == '') {
          setError({
            ...error,
            panNo: '',
            gstinNo: error.gstinNo,
            phone_Number: error.phone_Number,
          });
          setPan_no('');
          setStatus(true);
        } else {
          setError({
            ...error,
            panNo:
              'Invalid PAN format. Expected: 5 letters, 4 numbers, 1 letter',
            gstinNo: error.gstinNo,
            phone_Number: error.phone_Number,
          });
          setPan_no('false');
          setStatus(false);
        }
      } else {
        setPan_no(e.target.value.toUpperCase());
        console.log('2');
        setError({
          ...error,
          panNo: '',
          gstinNo: error.gstinNo,
          phone_Number: error.phone_Number,
        });
        setStatus(true);
      }
    }
    if (name == 'number') {
      const panRegex = /^[0-9]{10}$/;
      if (!panRegex.test(e.target.value)) {
        if (e.target.value == '') {
          setError({
            ...error,
            panNo: error.panNo,
            gstinNo: error.gstinNo,
            phone_Number: '',
          });
          setPhoneNumber('');
          setStatus(true);
        } else {
          setError({
            ...error,
            panNo: error.panNo,
            gstinNo: error.gstinNo,
            phone_Number: 'Invalid Mobile no format. Expected: 10 numbers',
          });
          setPhoneNumber('false');
          setStatus(false);
        }
      } else {
        setPhoneNumber(e.target.value);
        console.log('2');
        setError({
          ...error,
          panNo: error.panNo,
          gstinNo: error.gstinNo,
          phone_Number: '',
        });
        setStatus(true);
      }
    }
    if (name == 'gstin') {
      const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9]{1}[A-Z]{2}$/;
      if (!gstRegex.test(e.target.value.toUpperCase())) {
        if (e.target.value == '') {
          setError({
            ...error,
            panNo: error.panNo,
            gstinNo: '',
            phone_Number: error.phone_Number,
          });
          setGstIn('');
          setStatus(true);
        } else {
          setError({
            ...error,
            panNo: error.panNo,
            gstinNo:
              'Invalid GSTIN format. Expected: 2 numbers, 5 letters, 4 numbers, 1 letter , 1 number , 2 letters',
            phone_Number: error.phone_Number,
          });
          setGstIn('false');
          setStatus(false);
        }
      } else {
        setGstIn(e.target.value.toUpperCase());
        console.log('2');
        setError({
          ...error,
          panNo: error.panNo,
          gstinNo: '',
          phone_Number: error.phone_Number,
        });
        setStatus(true);
      }
    }
    console.log(e.target.value);
  }
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className="">
          {data.length ? (
            <div className="over max-w-6xl mx-auto bg-white p-8 shadow-lg rounded-md">
              <h1 className="text-2xl font-bold text-center mb-6 inline-block">
                Update Profile Details
              </h1>
              <NavLink
                to="/dashboard"
                className="text-white text-decoration-none"
              >
                <ButtonComponent
                  type="button"
                  className=" bg-[#3A5B76] float-end px-2 py-1 text-white font-bold rounded hover:bg-[#2E4A62]"
                  value="close"
                  children={<Close />}
                />
              </NavLink>
              <form onSubmit={formik.handleSubmit} className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <InputComponent
                      required
                      labelName="name"
                      labelInput="Name"
                      type="text"
                      onFocus={handleEdit}
                      name="name"
                      placeholder="Name"
                      {...(edit ? {} : { value: data[0].vendor_name })}
                      classNameInput="w-full p-2 border rounded mt-1"
                      onChange={(e)=>handleCheckCred(e,"name")}
                    />
                    <span className="text-red-500">
                    {error.name != '' ? error.name : ''}
                  </span>
                  </div>
                  <div>
                    <InputComponent
                      required
                      onFocus={handleEdit}
                      labelName="business_name"
                      labelInput="Bussiness Name"
                      type="text"
                      name="businessName"
                      placeholder="Bussiness name"
                      classNameInput="w-full p-2 border rounded mt-1"
                      onChange={formik.handleChange}
                      {...(edit
                        ? {}
                        : { value: data[0].vendor_business_legal_name })}
                    />
                  </div>
                  <div>
                    <InputComponent
                      required
                      onFocus={handleEdit}
                      labelName="phone"
                      labelInput="Phone No."
                      type="text"
                      name="phone"
                      placeholder="Enter Phone Number"
                      classNameInput="w-full p-2 border rounded mt-1"
                      onChange={e => handleCheckCred(e, 'number')}
                      {...(edit ? {} : { value: data[0].vendor_phone })}
                    />
                    <span className="text-red-500">
                    {error.phone_Number != '' ? error.phone_Number : ''}
                  </span>
                  </div>
                  <div>
                    <InputComponent
                      required
                      onFocus={handleEdit}
                      labelName="email"
                      labelInput="Email"
                      type="email"
                      name="email"
                      placeholder="Enter Email Id"
                      classNameInput="w-full p-2 border rounded mt-1"
                      onChange={formik.handleChange}
                      {...(edit ? {} : { value: data[0].vendor_email })}
                    />
                  </div>
                  <div>
                    <InputComponent
                      required
                      onFocus={handleEdit}
                      labelName="pan"
                      labelInput="Pan No."
                      type="text"
                      name="pan"
                      onChange={e => handleCheckCred(e, 'pan')}
                      placeholder="Enter Pan No."
                      classNameInput="w-full p-2 border rounded mt-1 text-transform: uppercase"
                      {...(edit ? {} : { value: data[0].vendor_pan })}
                    />
                    <span className="text-red-500">
                    {error.panNo != '' ? error.panNo : ''}
                  </span>
                  </div>
                  <div>
                    <InputComponent
                      onFocus={handleEdit}
                      labelName="gst"
                      labelInput="GST"
                      type="text"
                      name="gst"
                      placeholder="Enter GST"
                      classNameInput="w-full p-2 border rounded mt-1 text-transform: uppercase"
                      onChange={e => handleCheckCred(e, 'gstin')}
                      {...(edit ? {} : { value: data[0].vendor_gstin })}
                    />
                                      <span className="text-red-500">
                    {error.gstinNo != '' ? error.gstinNo : ''}
                  </span>
                  </div>
                  <div>
                    <label className="block text-gray-600">Business Type</label>
                    <select
                      onChange={formik.handleChange}
                      {...(edit ? {} : { value: data[0].vendor_industry_type })}
                      name="businessType"
                      className="w-full p-2 border rounded mt-1"
                    >
                      <option disabled value="">
                        {data[0].vendor_industry_type != ''
                          ? data[0].vendor_industry_type
                          : 'select'}
                      </option>
                      <option>Proprietor</option>
                      <option>Partner</option>
                      <option>LLP</option>
                      <option>Pvt.Ltd</option>
                      <option>HUF</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-600">
                      Business Category
                    </label>
                    <select
                      name="businessCategory"
                      onChange={formik.handleChange}
                      {...(edit ? {} : { value: data[0].vendor_business_category })}
                      className="w-full p-2 border rounded mt-1"
                    >
                      <option disabled value="">
                        {data[0].vendor_business_category != ''
                          ? data[0].vendor_business_category
                          : 'select'}
                      </option>
                      <option>Retail</option>
                      <option>Wholesale</option>
                      <option>IT Field</option>
                      <option>Service Industry</option>
                    </select>
                  </div>
                  <div>
                    <InputComponent
                      onFocus={handleEdit}
                      labelName="openingValue"
                      labelInput="Opening Value"
                      type="number"
                      min="0"
                      name="openingValue"
                      placeholder="Enter Opening Value"
                      classNameInput="w-full p-2 border rounded mt-1"
                      onChange={formik.handleChange}
                      {...(edit ? {} : { value: data[0].vendor_opening_value })}
                    />
                  </div>
                </div>
                <div className="mt-4 border border-1 p-3">
                  <h5>Address 1</h5>
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
                      onFocus={handleEdit}
                      {...(edit
                        ? {}
                        : { value: data[0].billing_street_address })}
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
                        onChange={e => handleStateChange(e, 'billing')}
                      >
                        <option
                          readOnly
                          value={count == 0 ? data[0].billing_state : 'Select'}
                        >
                          {count == 0 ? data[0].billing_state : 'Select'}
                        </option>
                        {state.map(values => (
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
                        onChange={e => handleCityChange(e, 'billing')}
                        name="billingCity"
                      >
                        <option
                          readOnly
                          value={count == 0 ? data[0].billing_city : 'Select'}
                        >
                          {count == 0 ? data[0].billing_city : 'Select'}
                        </option>
                        {city.map(values => (
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
                        {...(edit ? {} : { value: data[0].billing_pincode })}
                        onChange={e => handleZipCodeChange(e, 'billing')}
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
                <div className="mt-4 border border-1 p-3">
                  <h5>Address 2</h5>
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
                      onFocus={handleEdit}
                      {...(edit
                        ? shipCheck != ''
                          ? { value: shipCheck }
                          : {}
                        : { value: data[0].shipping_street_address })}
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
                              count1 == 0 ? data[0].shipping_state : 'Select'
                            }
                          >
                            {count1 == 0 ? data[0].shipping_state : 'Select'}
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
                              count1 == 0 ? data[0].shipping_city : 'Select'
                            }
                          >
                            {count1 == 0 ? data[0].shipping_city : 'Select'}
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
                          onFocus={handleEdit}
                          {...(edit ? {} : { value: data[0].shipping_pincode })}
                          onChange={e => handleZipCodeChange(e, 'shipping')}
                          classNameInput="w-full p-2 text-sm transition duration-300 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 hover:bg-gray-100"
                          placeholder="Enter Zip/Pincode"
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-6">
                  <label className="block text-gray-600">Business Logo</label>
                  <div>
                    <input
                      type="file"
                      id="logoUpload"
                      accept="image/*"
                      className="p-1 border rounded mt-1"
                      onChange={handleLogoChange}
                    />
                    {logoPreview && (
                      <img
                        src={logoPreview}
                        alt="Logo Preview"
                        className="w-24 h-24 object-contain ms-2 rounded mt-2"
                      />
                    )}
                  </div>
                </div>
                <div className="mt-6">
                  <label className="block text-gray-600">
                    Signature Upload
                  </label>
                  <div>
                    <input
                      type="file"
                      id="logoUpload"
                      accept="image/*"
                      className="p-1 border rounded mt-1"
                      onChange={handleSignatureChange}
                    />
                    {signature && (
                      <img
                        src={signature}
                        alt="Logo Preview"
                        className="w-24 h-24 object-contain ms-2 rounded mt-2"
                      />
                    )}
                  </div>
                </div>
                {/* <div className="mt-6">
                                   <label className="block text-gray-600">Custom Fields</label>
                                   <div id="custom-fields">
                                       {customFields.map((field, index) => (
                                           <InputComponent
                                               disabled
                                               required
                                               key={index}
                                               labelName={`customField${index}`}
                                               labelInput={`Custom Field ${index + 1}`}
                                               type="text"
                                               name={`customField${index}`}
                                               placeholder="Enter Custom Field"
                                               classNameInput="w-full p-2 border rounded mt-2"
                                               onChange={(e) => handleCustomFieldChange(index, e.target.value)}
                                               value={field}
                                           />
                                       ))}
                                   </div>
                                   <button disabled onClick={addCustomField} type="button" className="disabled:opacity-80 disabled:bg-gray-400 mt-4 px-10 py-3 bg-[#3A5B76] text-white font-bold rounded hover:bg-[#2E4A62]">
                                       + Add Field
                                   </button>
                               </div> */}

                <div className="mt-6">
                  <label className="block text-gray-600">Notes</label>
                  <textarea
                    name="notes"
                    onFocus={handleEdit}
                    className="w-full p-2 border rounded mt-1"
                    placeholder="Enter Notes"
                    onChange={formik.handleChange}
                    {...(edit ? {} : { value: data[0].vendor_notes })}
                  ></textarea>
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-bold">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {data[0].vendor_birthdate == '' ? (
                      <div>
                        <InputComponent
                          onFocus={handleEdit}
                          labelName="birthdate"
                          labelInput="Birthdate"
                          type="date"
                          name="birthdate"
                          classNameInput="w-full p-2 border rounded mt-1"
                          onChange={formik.handleChange}
                        />
                      </div>
                    ) : (
                      <div>
                        <InputComponent
                          
                          onFocus={handleEdit}
                          labelName="birthdate"
                          labelInput="Birthdate"
                          type="text"
                          name="birthdate"
                          classNameInput="w-full p-2 border rounded mt-1"
                          onChange={formik.handleChange}
                          {...(edit ? {type:'date'} : { value: data[0].vendor_birthdate })}
                        />
                      </div>
                    )}
                    {data[0].vendor_anniversary == '' ? (
                      <div>
                        <InputComponent
                          onFocus={handleEdit}
                          labelName="anniversary"
                          labelInput="Anniversary"
                          type="date"
                          name="anniversary"
                          classNameInput="w-full p-2 border rounded mt-1"
                          onChange={formik.handleChange}
                        />
                      </div>
                    ) : (
                      <div>
                        <InputComponent
                          
                          onFocus={handleEdit}
                          labelName="anniversary"
                          labelInput="Anniversary"
                          type="text"
                          name="anniversary"
                          classNameInput="w-full p-2 border rounded mt-1"
                          onChange={formik.handleChange}
                          {...(edit ? {type:'date'} : { value: data[0].vendor_anniversary })}
                        />
                      </div>
                    )}
                  </div>
                  <div className="mt-4">
                    <label className="block text-gray-600">
                      Personal Notes
                    </label>
                    <textarea
                      name="personalNotes"
                      className="w-full p-2 border rounded mt-1"
                      placeholder="Enter Personal Notes"
                      onChange={formik.handleChange}
                      {...(edit ? {} : { value: data[0].vendor_personalnotes })}
                    ></textarea>
                  </div>
                </div>

                <div className="mt-10 text-end">
                                <ButtonComponent
                                  {...(status ? {} : { disabled: true })}
                                  value="Submit"
                                  type="submit"
                                  label="Save"
                                  className="disabled:opacity-80 disabled:bg-gray-400 px-20 py-3 bg-[#3A5B76] text-white font-bold rounded hover:bg-[#2E4A62]"
                                ></ButtonComponent>
                              </div>
              </form>
            </div>
          ) : (
            <Loader />
          )}
        </div>
      )}
    </>
  );
}
