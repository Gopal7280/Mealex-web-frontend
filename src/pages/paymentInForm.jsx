//This Component is used to create a payment in form where user can enter the payment details and submit it.

import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ErrorMessage, useFormik } from 'formik';
import { debounce, set } from 'lodash';
import '../styles/layoutFix.css';
import { Dropdown } from 'primereact/dropdown';
import Sidebar from '../layouts/Sidebar';
import { Preview, ModeEdit, DeleteForever, Close } from '@mui/icons-material';
import { Toast } from 'primereact/toast';
import { Loader } from '../layouts/Loader';
import { Calendar } from 'primereact/calendar';
import {
  apiReuestLoadCountry,
  apiReuestLoadDataUsingZipCode,
  apiReuestLoadState,
} from '../services/apiServicesOnline';
import axios from 'axios';
import { InputComponent } from '../components/Input';
import { ButtonComponent } from '../components/Button';
import { apiGet, apiPost } from '../services/api';
import * as yup from 'yup';
export function PaymentInForm() {
  const [loader, setLoader] = useState(false); // State to manage the loading state
  const [party, setParty] = useState(''); // State to manage the party name
  const toast = useRef(null); // Reference for the toast component
  const [locations, setLocationS] = useState(''); // State to manage the location data
  const location = useLocation(); // Get the current location object from React Router
  useEffect(() => {
    // Function to fetch business profile data
    // If no business profile exists, redirect to the profile form
    const fetchBussiness = async () => {
      try {
        const res = await apiGet('/businessprofile');
        if (res.length === 0) {
          navigate('/profile_form');
        }
      } catch (err) {
        console.log('working');
        console.log(err);
      }
    };
    fetchBussiness();
    console.log(location.state?.data);
    setLocationS(location.state?.data);
  }, []);

  const navigate = useNavigate(); // Hook to programmatically navigate to different routes
  const [state, setState] = useState([{}]); // State to manage the state data
  const [payment_type, setPayment_type] = useState(''); // State to manage the payment type
  const [customField, setCustomField] = useState(['']); // State to manage custom fields
  const [zip, setZip] = useState(''); // State to manage the zip code
  const [date, setDate] = useState(''); // State to manage the payment date
  const [selectedCompanyName, setSelectedCompanyName] = useState(null); // State to manage the selected company name
  const [selectedPaymentType, setSelectedPaymentType] = useState(null); // State to manage the selected payment type
  const [paymentTypes, setPaymentTypes] = useState(null);   // State to manage the payment types
  const [companyName, setCompanyName] = useState(null); // State to manage the company names
  const [moreData, setMoreData] = useState([]); // State to manage additional data related to the selected company
  const [invoiceId, setInvoiceId] = useState([]); // State to manage the selected invoice ID  
  const [invoicePre, setInvoicePre] = useState([]); // State to manage the selected invoice prefix
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null); // State to manage the selected invoice ID from the dropdown
  const [invoiceTotal, setInvoiceTotal] = useState(); // State to manage the total amount of the selected invoice
  const [total, setTotal] = useState(0); // State to manage the total amount to be paid
  const [recieptNoPrefix, setRecieptNoPrefix] = useState(''); // State to manage the receipt number prefix
  useEffect(() => {
    try {
      // Fetching customer data and payment types from the API
      const fetchCustomer = async () => {
        const res = await apiGet('/customers');
        console.log(res);
        const companyNamee = res.map(item => ({
          name: `${item.customer_name}_${item.customer_email}_${item.customer_phone}`,
        }));
        const paymentType = [
          { name: 'CASH' },
          { name: 'CHEQUE' },
          { name: 'ONLINE' },
          { name: 'BANK' },
          { name: 'TDS' },
          { name: 'Bad Debts / Kasar' },
        ];
        setCompanyName(companyNamee);
        setPaymentTypes(paymentType);
      };
      fetchCustomer();
      // Fetching the receipt number prefix from the API
      const prefixGet = async () => {
        const res = await apiGet('/payment/payment_in/prefix');
        console.log(res);
        setRecieptNoPrefix(res.payment_in_prefix);
      };
      prefixGet();
    } catch (err) {
      console.log(err);
    }
  }, []);

  // Formik setup for handling form submission
  const formik = useFormik({
    initialValues: {
      paymentPrefix: '',
      companyName: '',
      paymentDate: '',
      paymentType: '',
      paidAmount: '',
      invoiceId: '',
      invoicePrefix: '',
      totalAmount: '',
      reference: '',
    },
    onSubmit: values => {
      values.totalAmount = total;
      values.paymentPrefix = recieptNoPrefix == '' ? 0 : recieptNoPrefix;
      values.invoiceId = invoicePre;
      values.invoicePrefix = invoiceId;
      values.paymentType = selectedPaymentType;
      values.companyName = selectedCompanyName;
      values.paymentDate = date;
      console.log(values);
      const addPayment = async () => {
        setLoader(true);
        try {
          const res = await apiPost('/payment/payment_in', values);
          console.log(res);
          navigate('/paymentIn');
        } catch (err) {
          console.error('Payment In Error:', err);
        } finally {
          setLoader(false);
        }
      };

      addPayment();
    },
  });

  function handlePartyChange(e) {
    setParty(e);
  }
  function handleCustomField() {
    setCustomField(prevCustomField => [...prevCustomField, '']);
  }
  function handleCustomFieldChange(index, value) {
    const updatedFields = [...customField];
    updatedFields[index] = value;
    setCustomField(updatedFields);
  }
  // Function to handle the change in zip code
  function handleCompanyChange(e, name) {
    setSelectedCompanyName(name);
    var spl = name.name.split('_');
    console.log(spl[0].trim());
    try {
      const fetchOtherDetails = async () => {
        const res = await apiGet('/customers');
        for (var i of res) {
          if (i.customer_name == spl[0]) {
            setMoreData(i);
            const res = await apiGet(
              `/invoices/getallinvoice/${i.customer_id}`
            );
            console.log(res);
            const InvoiceId = res.data.map(item => ({
              name: `${item.invoice_prefix}`,
              id: `${item.invoice_id}`,
            }));
            const InvoiceTotal = res.data.map(item => ({
              totalAmount: `${item.invoice_payment_remaining}`,
              invoiceIdd: `${item.invoice_prefix}`,
            }));
            console.log(res.data);
            setInvoiceTotal(InvoiceTotal);
            setSelectedInvoiceId(InvoiceId);
            console.log('executed');
          }
        }
      };
      fetchOtherDetails();
    } catch (err) {
      console.log(err);
    }
  }
  // Function to handle the change in payment type
  function handlePaymentType(e, name) {
    setSelectedPaymentType(name.name);
  }
  // Function to handle the change in invoice ID
  function handleInvoiceChange(e, name) {
    console.log(name);
    setInvoiceId(name.name);
    setInvoicePre(name.id);
    for (var i of invoiceTotal) {
      if (i.invoiceIdd == name.name) {
        console.log(i.totalAmount);
        setTotal(i.totalAmount);
      }
    }
  }
  return (
    <div>
      {loader ? (
        <Loader /> // Show loader while data is being fetched or submitted
      ) : (
        <div className="over max-w-6xl mx-auto bg-white p-8 shadow-lg rounded-md">
          <h1 className="text-2xl font-bold text-center mb-6">
            Payment Received
          </h1>
            {/* // navilink to close the form and go back to paymentIn page */}
          <NavLink to="/paymentIn" className="text-white text-decoration-none">
            <ButtonComponent
              type="button"
              className=" bg-[#3A5B76] float-end px-2 py-1 text-white font-bold rounded hover:bg-[#2E4A62]"
              value="close"
              children={<Close />}
            />
          </NavLink>

          {/* // Form to enter payment details */}
          <form id="paymentInForm" onSubmit={formik.handleSubmit}>
            <div className="">
              <div>
                <Toast ref={toast} />
                <div>
                  <InputComponent
                    htmlFor="receiptNo"
                    classNameLabel="block text-gray-600"
                    labelInput="Receipt No:"
                    type="text"
                    value={recieptNoPrefix != '' ? recieptNoPrefix : ''}
                    name="recieptNo"
                    onChange={formik.handleChange}
                    classNameInput="w-full p-2 border rounded mt-1"
                    placeholder=""
                  />
                  {/* <span>{formik.errors.customer_name}</span> */}
                </div>
                <label
                  htmlFor="companyName"
                  className="block text-gray-600 mt-4"
                >
                  Company Name:
                </label>
                <div className="">
                  <Dropdown
                    onChange={e => handleCompanyChange(e, e.value)}
                    value={selectedCompanyName}
                    options={companyName}
                    optionLabel="name"
                    editable
                    placeholder="Select a Company name"
                    className="w-full mt-1 md:w-14rem"
                  />
                </div>
                <div>
                  <div>
                    <label
                      htmlFor="invoiceId"
                      className="block text-gray-600 mt-4"
                    >
                      Invoice Id:
                    </label>
                  </div>
                  <Dropdown
                    onChange={e => handleInvoiceChange(e, e.value)}
                    value={invoiceId}
                    options={selectedInvoiceId}
                    optionLabel="name"
                    editable
                    placeholder="Select a Invoice id"
                    className="w-full mt-1 md:w-14rem"
                  />
                </div>
                <div>
                  <InputComponent
                    htmlFor="amount"
                    classNameLabel="block text-gray-600 mt-4"
                    labelInput="Total Amount :"
                    type="number"
                    id="amount"
                    value={total}
                    onChange={formik.handleChange}
                    name="totalAmount"
                    classNameInput="w-full p-2 border rounded mt-1"
                    placeholder="Enter your amount"
                    readOnly
                  />
                </div>
                <div>
                  <InputComponent
                    htmlFor="amount"
                    classNameLabel="block text-gray-600 mt-4"
                    labelInput="Receiving Amount :"
                    type="number"
                    min="0"
                    step="any"
                    id="amount"
                    onChange={formik.handleChange}
                    name="paidAmount"
                    classNameInput="w-full p-2 border rounded mt-1"
                    placeholder="Enter your amount"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="date" className="block text-gray-600 mt-4">
                    Payment Date
                  </label>
                  <div>
                    <Calendar
                      placeholder="mm-dd-yyy"
                      className="mt-1"
                      value={date}
                      onChange={e => setDate(e.value)}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="paymentType"
                    className="block text-gray-600 mt-4"
                  >
                    Payment Type:
                  </label>
                  <Dropdown
                    onChange={e => handlePaymentType(e, e.value)}
                    value={selectedPaymentType}
                    options={paymentTypes}
                    optionLabel="name"
                    editable
                    placeholder="Select Payment type"
                    className="w-full mt-1 md:w-14rem"
                  />
                </div>
                <div>
                  <InputComponent
                    htmlFor="reference"
                    classNameLabel="block text-gray-600 mt-4"
                    labelInput="Reference :"
                    type="text"
                    id="reference"
                    onChange={formik.handleChange}
                    name="reference"
                    classNameInput="w-full p-2 border rounded mt-1"
                    placeholder="Enter your reference"
                  />
                </div>
                {/* <span>{formik.errors.opening_value}</span> */}
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
      )}
    </div>
  );
}
