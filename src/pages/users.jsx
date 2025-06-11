// Description: This file contains the Users component which displays a list of users with options to add, edit, and delete users. It also includes search functionality and a dialog for adding new users.
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
import { User } from 'lucide-react';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { initial } from 'lodash';
import { useFormik } from 'formik';
function Users() {
  const [visible, setVisible] = useState(false); // State to control the visibility of the dialog
  const items = Array.from({ length: 5 }, (v, i) => i); // Create an array of 5 items for the skeleton loader
  const column = ['S.No', 'Name', 'Contact', 'Email', 'User Role']; // Define the columns for the table
  const [users, setUsers] = useState([]); // State to hold the list of users
  const [search, setSearch] = useState(''); // Search state
  const navigate = useNavigate(); // Hook to navigate between routes
  const printRef = useRef(); // Reference for printing
  const [loader, setLoader] = useState(false); // Loader state to control loading spinner
  const [load, setLoad] = useState(false); // State to trigger re-fetching of data
  const toast = useRef(null); // Reference for the toast notifications
  const [total, setTotal] = useState(0); // State to hold the total number of users
  const [categoryType, setCategoryType] = useState(''); // State to hold the selected user category
  useEffect(() => {
    // Check if the business profile exists, if not redirect to profile form
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
    // Fetch users from the API
    // This function fetches the list of users from the API and updates the state
    const fecthUsers = async () => {
      setLoader(false); // Start loading
      try {
        const res = await apiGet('/user/all');
        console.log(res.data);
        setUsers(res.data);
        setTotal(res.data.length);
        console.log('customer_response', res);

        if (res.length === 0) {
          toast.current.show({
            severity: 'info',
            summary: 'Info',
            detail: 'No Users available. Please add a users.',
            life: 2000,
          });
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.current.show({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to fetch users.',
          life: 2000,
        });
      } finally {
        setLoader(true); // Stop loading
      }
    };

    fecthUsers();
  }, [load]);

  // Filter customers based on search input
  const filteredUsers = users.filter(customer =>
    `${customer.employee_mobile_no} ${customer.employee_name} ${customer.employee_role} ${customer.employee_email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );
  // Map the filtered users to the format required for the table
  // Each object in the array represents a row in the table
  const dataTable = filteredUsers.map(value => ({
    sNo: value.employee_number,
    name: value.employee_name,
    mobileNo: value.employee_mobile_no,
    employeEmail: value.employee_email,
    employeRole: value.employee_role,
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
  // const handleEdit = (e, contact) => {
  //   // alert(contact);
  //   for (var i of filteredUsers) {
  //     if (i.employee_mobile_no == contact) {
  //       console.log(i);
  //       console.log("i am match");
  //       navigate("/customer_detail_edit", { state: { data: i } });
  //     }
  //   }
  // };
  // const handlePreview = (e, contact) => {
  //   // alert(contact);
  //   for (var i of filteredCustomers) {
  //     if (i.mobile_no == contact) {
  //       console.log(i);
  //       console.log("i am match");
  //       navigate("/customer-detail-display", { state: { data: i } });
  //     }
  //   }
  // };
  // const handledelete = async (e, contact) => {
  //   const ans=confirm("Are you sure want to delete Customer");
  //       console.log(ans);
  //       if(ans==true)
  //       {
  //         const customer = filteredCustomers.find((i) => i.mobile_no === contact);
  //         if (!customer) return;

  //         try {
  //           await apiDelete(`customers/${customer.customer_id}`);
  //           setCustomers((prev) =>
  //             prev.filter((cust) => cust.customer_id !== customer.customer_id)
  //           );
  //           setTotal((prev) => prev - 1);
  //           toast.current.show({
  //             severity: "success",
  //             summary: "Deleted",
  //             detail: "Customer deleted successfully",
  //             life: 2000,
  //           });
  //         } catch (error) {
  //           console.error("Delete failed:", error);
  //           toast.current.show({
  //             severity: "error",
  //             summary: "Error",
  //             detail: "Failed to delete customer.",
  //             life: 2000,
  //           });
  //         }
  //       }
  //       else{
  //         alert("Customer not deleted");
  //       }
  // };

  const categories = [
    { name: 'Delivery Challan', key: 'dc' },
    { name: 'Create Party Access', key: 'cp' },
    { name: 'Add Product Access', key: 'ap' },
    { name: 'Access to invoice,challan,quotation', key: 'ac' },
    { name: 'Purchase Access', key: 'pa' },
    { name: 'PaymentIn Payment Out Access', key: 'p' },
    { name: 'Reports Access', key: 'ra' },
  ];
  // State to hold the selected categories for user access privileges
  // This state is used to manage which categories are checked in the UI
  const [selectedCategories, setSelectedCategories] = useState([]);

  const onCategoryChange = e => {
    let _selectedCategories = [...selectedCategories];

    if (e.checked) _selectedCategories.push(e.value);
    else
      _selectedCategories = _selectedCategories.filter(
        category => category.key !== e.value.key
      );

    setSelectedCategories(_selectedCategories);
  };
  // Function to handle the change in user category selection
  // This function updates the categoryType state based on the selected value
  function handleUserCategory(e) {
    console.log(e.target.value);
    setCategoryType(e.target.value);
  }
  // Formik setup for handling form submission
  const formik = useFormik({
    initialValues: {
      userName: '',
      mobileNo: '',
      email: '',
      password: '',
      userCategory: '',
    },
    onSubmit: values => {
      setLoader(true);
      setVisible(false);
      values.userCategory = categoryType;
      console.log(values);
      const addUser = async () => {
        try {
          const res = await apiPost('/user', values);
          setVisible(false);
          setLoad(!load);
        } catch (err) {
          console.log(err);
        } finally {
          setLoader(true);
        }
      };
      addUser();
    },
  });
  return (
    <div>
      {loader ? (
        <div className="gop">
          <div className="max-w-7xl mt-3 mx-auto bg-white p-5 shadow-lg responsive-head rounded-lg">
            <div className="flex justify-between items-center responsive-header mb-4">
              <h2 className="text-xl font-semibold">
                <Toast ref={toast} />
                User's Details
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
                <div className="button-align">
                  <ButtonComponent
                    onClick={() => setVisible(true)}
                    className="bg-[#3A5B76] text-white px-4 py-2 rounded hover:bg-[#2D465B]"
                    label="Add user"
                    value="addUser"
                  ></ButtonComponent>
                  {/* //dialog for adding a new user */}
                  <Dialog
                    header="Add user"
                    visible={visible}
                    className="sm:w-1/2"
                    onHide={() => {
                      if (!visible) return;
                      setVisible(false);
                    }}
                  >
                    <form onSubmit={formik.handleSubmit}>
                      <div className="lg:grid grid-cols-2 gap-6 md:block mt-3">
                        <div className="flex flex-column gap-2">
                          <label htmlFor="username">Username</label>
                          <InputText
                            id="username"
                            name="userName"
                            onChange={formik.handleChange}
                            placeholder="enter username"
                            aria-describedby="username-help"
                          />
                        </div>
                        <div className="flex flex-column gap-2">
                          <label htmlFor="username">Mobile no</label>
                          <InputText
                            id="username"
                            name="mobileNo"
                            onChange={formik.handleChange}
                            placeholder="enter mobile no"
                            aria-describedby="username-help"
                          />
                        </div>
                        <div className="flex flex-column gap-2">
                          <label htmlFor="username">Email</label>
                          <InputText
                            id="username"
                            name="email"
                            onChange={formik.handleChange}
                            placeholder="enter email"
                            aria-describedby="username-help"
                          />
                        </div>
                        <div className="flex flex-column gap-2">
                          <label htmlFor="username">Password</label>
                          <InputText
                            id="username"
                            name="password"
                            onChange={formik.handleChange}
                            placeholder="enter password"
                            aria-describedby="username-help"
                          />
                        </div>
                        <div className="flex flex-column gap-2">
                          <label htmlFor="username">User Category</label>
                          <select
                            onChange={handleUserCategory}
                            className="w-80 p-2 border border-gray-300 hover:bg-gray-200"
                            name=""
                            id=""
                          >
                            <option value="none">select</option>
                            <option value="partner">Partner</option>
                            <option value="accountant">Accountant</option>
                            <option value="stockManager">Stock Manager</option>
                            <option value="salesPerson">Sales Person</option>
                            <option value="deliveryBoy">Delivery Boy</option>
                          </select>
                        </div>
                        {/* <div className="flex justify-content-center">
                <p>Access Privilage's</p>
            <div className="flex flex-column gap-3">
                {categories.map((category) => {
                    return (
                        <div key={category.key} className="flex align-items-center">
                            <Checkbox inputId={category.key} name="category" value={category} onChange={onCategoryChange} checked={selectedCategories.some((item) => item.key === category.key)} />
                            <label htmlFor={category.key} className="ml-2">
                                {category.name}
                            </label>
                        </div>
                    );
                })}
            </div>
        </div> */}
                      </div>
                      <div className="mt-10 float-end p-2">
                        <ButtonComponent
                          value="Submit"
                          type="submit"
                          label="Save"
                          className="px-20 py-3 bg-[#3A5B76] text-white font-bold rounded hover:bg-[#2E4A62]"
                        ></ButtonComponent>
                      </div>
                    </form>
                  </Dialog>
                </div>
              </div>
            </div>
            {/* <TableComponent column={column} data={dataTable}></TableComponent> */}

            <TableComponent
              name="User's"
              column={column}
              data={dataTable}
              pageSize={5} // Number of rows per page
              // actions={(row) => (
              //   <div className="flex gap-2">
              //     <button
              //       className="text-[#3A5B76]"
              //       onClick={(e) => handlePreview(e, row.Contact)}
              //     >
              //       <Preview />
              //     </button>
              //     <button
              //       className="text-[#3A5B76]"
              //       onClick={(e) => handleEdit(e, row.Contact)}
              //     >
              //       <ModeEdit />
              //     </button>
              //     <button
              //       className="text-red-500"
              //       onClick={(e) => handledelete(e, row.Contact)}
              //     >
              //       <DeleteForever />
              //     </button>
              //   </div>
              // )}
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
        <div className="gop">
          <div className="max-w-7xl mt-3 mx-auto bg-white p-5 shadow-lg responsive-head rounded-lg">
            <Skeleton width="100%" height="50px" className="mb-2"></Skeleton>
            {/* <TableComponent column={column} data={dataTable}></TableComponent> */}

            <div className="card">
              <DataTable value={items} className="p-datatable-striped">
                <Column
                  field="code"
                  header="S.No"
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
                  header="Contact"
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
                  header="User Role"
                  style={{ width: '25%' }}
                  body={<Skeleton />}
                ></Column>
                {/* <Column
                  field="quantity"
                  header="Actions"
                  style={{ width: '25%' }}
                  body={<Skeleton />}
                ></Column> */}
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

export default Users;
