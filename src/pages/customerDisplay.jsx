// Description: This file contains the CustomerDisplay component which displays a list of customers, allows searching, and provides options to add, edit, preview, and delete customers.

import React, { useEffect, useState, useRef } from 'react';
import { data, NavLink, useNavigate } from 'react-router-dom';
import '../styles/customerDisplay.css'; // Import the CSS file
import Sidebar from '../layouts/Sidebar'; // Make sure Sidebar is correctly imported
import axios from 'axios';
import '../styles/Products.css';
import { Toast } from 'primereact/toast';
import { ButtonComponent } from '../components/Button';
import { apiDelete, apiGet, apiPost } from '../services/api';
import { TableComponent } from '../components/Table';
import '../styles/layoutFix.css';
import {
  Preview,
  ModeEdit,
  DeleteForever,
  CloudUpload,
} from '@mui/icons-material';
import { SearchComponent } from '../components/SerachBar';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { BulkActions } from '../components/bulkActions';
import { config } from '../config/app.js';
import { Loader } from '../layouts/Loader';
import { Skeleton } from 'primereact/skeleton';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
function CustomerDisplay({ customerListUpdated }) {
  const items = Array.from({ length: 5 }, (v, i) => i); // Create an array of 5 items for the skeleton loader
  const column = ['UID', 'Name', 'Address', 'Email', 'Contact']; // Define the columns for the table
  const [customers, setCustomers] = useState([]); // State to hold customer data
  const [search, setSearch] = useState(''); // Search state
  const navigate = useNavigate(); // Navigate to another page
  const printRef = useRef(); // Reference for printing
  const [loader, setLoader] = useState(false); // Loader state
  const toast = useRef(null); // Reference for toast notifications
  const [total, setTotal] = useState(0); // State to hold total number of customers
  const columns = [
    {
      customer_name: '',
      customer_email: '',
      customer_phone: '',
      customer_type: '',
      customer_party_type: '',
      customer_category: '',
      // customer_contact_persone: '',
      customer_contact_person: '',
      customer_pan: '',
      customer_gstin: '',
      customer_notes: '',
      customer_personalnotes: '',
      customer_opening_value: '',
      customer_birthdate: '',
      customer_anniversary: '',
      billing_street_address: '',
      billing_city: '',
      billing_state: '',
      billing_country: '',
      billing_pincode: '',
      shipping_street_address: '',
      shipping_city: '',
      shipping_state: '',
      shipping_country: '',
      shipping_pincode: '',
    },
  ]; //this defines the columns for the bulk upload dialog
  const fileName = 'customer_add'; // Name of the file for bulk upload
  const dialogName = "customer's"; // Name of the dialog for bulk upload
  useEffect(() => {
    // Check if business profile exists, if not redirect to profile form
    const fetchBussiness = async () => {
      try {
        const res = await apiGet('/businessprofile');
        if (res.length === 0) {
          navigate('/profile_form');
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchBussiness();
    // Fetch customers from the API
    // This function fetches the customer data from the API and updates the state
    const fetchCustomers = async () => {
      setLoader(false); // Start loading
      try {
        const res = await apiGet('/customers');
        setCustomers(res);
        setTotal(res.length);
        console.log('customer_response', res);

        if (res.length === 0) {
          toast.current.show({
            severity: 'info',
            summary: 'Info',
            detail: 'No customers available. Please add a customer.',
            life: 2000,
          });
        }
      } catch (error) {
        console.error('Error fetching customers:', error);
        toast.current.show({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to fetch customers.',
          life: 2000,
        });
      } finally {
        setLoader(true); // Stop loading
      }
    };

    fetchCustomers();
  }, []);

  // Filter customers based on search input
  const filteredCustomers = customers.filter(customer =>
    `${customer.customer_number} ${customer.customer_name} ${customer.customer_phone} ${customer.customer_email} ${customer.billing_address}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );
  // Map filtered customers to the format required for the table
  // This maps the filtered customer data to the format required for the table
  const dataTable = filteredCustomers.map(value => ({
    sNo: value.customer_number,
    name: value.customer_name,
    Address:
      value.billing_city==null?"- - - -":(value.billing_street_address +
      ' ' +
      value.billing_city +
      ' ' +
      value.billing_state +
      ' ' +
      ' ' +
      value.billing_country),
    Email: value.customer_email,
    Contact: value.customer_phone,
  }));
  const deleteCustomer = async id => {
    console.log(id);
    // alert(id);
    if (!window.confirm('Are you sure you want to delete this customer?'))
      return;

    try {
      const response = await fetch(`${config.apiBaseUrl}/customers/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // alert("Customer deleted successfully");
        // fetchCustomers();
      } else {
        // alert("Error deleting customer");
      }
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };
  const handleEdit = (e, contact) => {
    // alert(contact);
    for (var i of filteredCustomers) {
      if (i.customer_number == contact) {
        console.log(i);
        console.log('i am match');
        navigate('/customer_detail_edit', { state: { data: i } });
      }
    }
  };
  // Function to handle preview of customer details
  // This function navigates to the customer detail display page with the selected customer's data
  const handlePreview = (e, contact) => {
    // alert(contact);
    for (var i of filteredCustomers) {
      if (i.customer_number == contact) {
        console.log(i);
        console.log('i am match');
        navigate('/customer-detail-display', { state: { data: i } }); // Navigate to the customer detail display page
      }
    }
  };

  // Function to handle click on a row in the table
  // This function handles the click event on a row in the table and navigates to the customer detail display page
  function handleClick(e, row) {
    console.log('clicked');
    console.log(row);
    handlePreview(e, row.sNo);
  }
  return (
    <div>
      {loader ? (
        <div className="gop">
          <div className="max-w-7xl mt-3 mx-auto bg-white p-5 shadow-lg responsive-head rounded-lg">
            <div className="flex justify-between items-center responsive-header mb-4">
              <h2 className="text-xl font-semibold">
                <Toast ref={toast} />
                Customer's Details
                <span className="bg-gray-400 ms-2 text-white px-3 py-1 rounded-full text-sm">
                  Total {total}
                </span>
              </h2>
              {/* <form className="relative">
                <input 
                       placeholder="Search customers..."
                      //  value={search}
                       onChange={(e) => setSearch(e.target.value)}
                        className="w-full p-1.5 pl-9 rounded-full border bg-gray-200 border-gray-300"
                    />
                    <svg 
                        className="absolute left-3 top-2.5 h-5 w-5 text-gray-700" 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M21 21l-4.35-4.35M16 10a6 6 0 11-12 0 6 6 0 0112 0z"
                        />
                    </svg>
                    </form> */}
              <SearchComponent onChange={e => setSearch(e.target.value)} />
              <div className="flex space-x-3">
                {/* <button
                  disabled
                  className="disabled:opacity-80 disabled:bg-gray-400 bg-[#3A5B76] text-white me-3 px-4 py-2 rounded hover:bg-[#2D465B]"
                >
                  Bulk Upload
                </button> */}
                <div className="bulk-action-align">
                  <BulkActions
                    dialogName={dialogName}
                    columns={columns}
                    fileName={fileName}
                  />
                </div>
                <div className="button-align">
                  <ButtonComponent
                    onClick={() =>
                      navigate('/home', {
                        state: { data: 'FromCustomer' },
                      })
                    }
                    className="bg-[#3A5B76] text-white px-4 py-[13px] rounded hover:bg-[#2D465B]"
                    label="Add Customer's"
                    value="addProduct"
                  ></ButtonComponent>
                </div>
              </div>
            </div>
            {/* <TableComponent column={column} data={dataTable}></TableComponent> */}

            <TableComponent
              onClickRow={handleClick}
              name="customer"
              column={column}
              data={dataTable}
              pageSize={5} // Number of rows per page
            />

            {/* <TableComponent
  column={column}
  data={dataTable}
  pageSize={3} // Number of rows per page
  actions={(row) => (
    <div className="flex gap-2">
      <button onClick={() => alert(`Edit ${row.Name}`)}>Edit</button>
      <button onClick={() => alert(`Delete ${row.Name}`)}>Delete</button>
    </div>
  )}
/> */}
          </div>
        </div>
      ) : (
        //This part displays a skeleton loader while the data is being fetched
        <div className="gop">
          <div className="max-w-7xl mt-3 mx-auto bg-white p-5 shadow-lg responsive-head rounded-lg">
            <Skeleton width="100%" height="50px" className="mb-2"></Skeleton>
            {/* <TableComponent column={column} data={dataTable}></TableComponent> */}

            <div className="card">
              <DataTable value={items} className="p-datatable-striped">
                <Column
                  field="code"
                  header="UID"
                  style={{ width: '25%' }}
                  body={<Skeleton />}
                ></Column>
                <Column
                  field="name"
                  header="Name"
                  style={{ width: '25%' }}
                  body={<Skeleton />}
                ></Column>
                <Column
                  field="category"
                  header="Address"
                  style={{ width: '25%' }}
                  body={<Skeleton />}
                ></Column>
                <Column
                  field="quantity"
                  header="Email"
                  style={{ width: '25%' }}
                  body={<Skeleton />}
                ></Column>
                <Column
                  field="quantity"
                  header="Contact"
                  style={{ width: '25%' }}
                  body={<Skeleton />}
                ></Column>
              </DataTable>
            </div>

            {/* <TableComponent
  column={column}
  data={dataTable}
  pageSize={3} // Number of rows per page
  actions={(row) => (
    <div className="flex gap-2">
      <button onClick={() => alert(`Edit ${row.Name}`)}>Edit</button>
      <button onClick={() => alert(`Delete ${row.Name}`)}>Delete</button>
    </div>
  )}
/> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomerDisplay;
