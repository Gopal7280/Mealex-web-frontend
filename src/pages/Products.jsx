// File: src/pages/Products.jsx
// This file is part of the Bill365 project.
import React, { useState, useEffect } from 'react';
// import Sidebar from "../container/Sidebar";
import Sidebar from '../layouts/Sidebar'; // Make sure Sidebar is correctly imported
import '../styles/Products.css';
import axios from 'axios';
import { data, NavLink, useNavigate } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';
import {
  Preview,
  ModeEdit,
  DeleteForever,
  CloudUpload,
} from '@mui/icons-material';
import { ButtonComponent } from '../components/Button';
import { apiDelete, apiGet } from '../services/api';
import { TableComponent } from '../components/Table';
import { SearchComponent } from '../components/SerachBar';
import { Toast } from 'primereact/toast';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Dialog } from 'primereact/dialog';
import { BulkActions } from '../components/bulkActions';
import { Loader } from '../layouts/Loader';
import { Skeleton } from 'primereact/skeleton';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
const columns = [
  {
    item_name: '',
    item_hsn_sac: '',
    item_gst_rate: '',
    item_unit_of_measure: '',
    item_description: '',
    item_category: '',
    item_type: '',
    item_selling_price: '',
    item_purchase_price: '',
  },
];
const items = Array.from({ length: 5 }, (v, i) => i);
const fileName = 'product_add';
const dialogName = "product's";
const Products = () => {
  const column = [
    'UID',
    'Product Name',
    'HSN Code',
    'Product Unit',
    'Product Rate',
    'GST Rate',
    'QR Code',
  ];
  const [selectedAction, setSelectedAction] = useState(null); // State to hold selected action
  const [loader, setLoader] = useState(true); // State to control loading state
  const actions = [{ name: 'Download' }, { name: 'Upload' }]; // Actions for the dropdown
  const [excelData, setExcelData] = useState([]); // State to hold Excel data
  const [search, setSearch] = useState(''); // State for search input
  const toast = useRef(null); // Reference for toast notifications
  const [productList, setProductList] = useState([]); // State to hold product list
  const [total, setTotal] = useState(0); // State to hold total number of products
  const navigate = useNavigate(); // Hook for navigation
  const [uplaod, setUpload] = useState(true); // State to control upload button visibility
  const [visible, setVisible] = useState(false); // State to control dialog visibility

  useEffect(() => {
    // Check if the user has a business profile
    // If not, redirect to the profile form
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
    // Fetch product data from the API
    // This function fetches product data and updates the state
    const fetchProduct = async () => {
      try {
        const res = await apiGet('/products');
        console.log(res);
        setProductList(res);
        setTotal(res.length);
      } catch (err) {
        console.log(err);
        toast.current.show({
          severity: 'info',
          summary: 'Error',
          detail: 'No Products available please add products',
          life: 1500,
        });
      } finally {
        setLoader(false); // This now works properly
      }
    };

    fetchProduct(); // call async function
  }, []);

  // Filter products based on search input
  const filteredProducts = productList.filter(product =>
    ` ${product.product_name} ${product.product_number} ${product.product_hsn_code}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );
  // Prepare table data from filtered products
  // This maps the filtered products to the format required for the table
  // Each product is transformed into an object with specific fields
  const tableData = filteredProducts.map(value => ({
    product_id: value.product_number,
    product_name: value.product_name,
    product_hsn_code: value.product_hsn_code,
    unit_price: value.product_unit,
    purchase_price: value.purchase_price,
    tax_rate: value.gst_rate,
  }));
  const handleEdit = (e, product_id) => {
    // alert(product_id);
    for (var i of filteredProducts) {
      if (i.product_number == product_id) {
        console.log(i);
        console.log('i am match');
        navigate('/product_detail_edit', { state: { data: i } });
      }
    }
  };
  // Function to handle preview of product details
  // This function navigates to the product detail display page with the selected product data
  const handlePreview = (e, product_id) => {
    // alert(product_id);
    for (var i of filteredProducts) {
      if (i.product_number == product_id) {
        console.log(i);
        console.log('i am match');
        navigate('/product_detail_display', { state: { data: i } });
      }
    }
  };
  function handleClick(e, row) {
    // This function handles the click event on a row in the table
    // It logs the clicked row and calls the handlePreview function with the product_id
    console.log('clicked');
    console.log(row);
    handlePreview(e, row.product_id);
  }
  return (
    <>
      {loader ? (
        // If loader is true, show the skeleton loader
        <div className="">
          {/* <a href="/add-product">
            <button className="add-customer-button">Add Product</button>
          </a> */}
          <div className="max-w-7xl mt-3 mx-auto  bg-white p-5 responsive-head shadow-lg rounded-lg">
            <Skeleton width="100%" height="50px" className="mb-2"></Skeleton>
            {/* <TableComponent column={column} data={tableData}/> */}

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
                  header="Product Name"
                  style={{ width: '25%' }}
                  body={<Skeleton />}
                ></Column>
                <Column
                  field="category"
                  header="HSN Code"
                  style={{ width: '25%' }}
                  body={<Skeleton />}
                ></Column>
                <Column
                  field="quantity"
                  header="Product Unit"
                  style={{ width: '25%' }}
                  body={<Skeleton />}
                ></Column>
                <Column
                  field="quantity"
                  header="Product Rate"
                  style={{ width: '25%' }}
                  body={<Skeleton />}
                ></Column>
                <Column
                  field="quantity"
                  header="GST Rate"
                  style={{ width: '25%' }}
                  body={<Skeleton />}
                ></Column>
                <Column
                  field="quantity"
                  header="QR Code"
                  style={{ width: '25%' }}
                  body={<Skeleton />}
                ></Column>
              </DataTable>
            </div>
          </div>
        </div>
      ) : (
        <div className="">
          {/* <a href="/add-product">
          <button className="add-customer-button">Add Product</button>
        </a> */}
          <div className="max-w-7xl mt-3 mx-auto dark:!bg-gray-800 bg-white p-5 responsive-head shadow-lg rounded-lg">
            <div className="flex justify-between items-center mb-4 responsive-header">
              <Toast ref={toast} />
              <h2 className="text-xl font-semibold dark:!text-white">
                Product's
                <span className="bg-gray-400 ms-2 total-align dark:!text-white text-white px-3 py-1 rounded-full text-sm">
                  Total {total}
                </span>
              </h2>
              {/* <input
          type="text"
          placeholder="Search customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        /> */}

              {/* Search and action buttons */}
              <SearchComponent onChange={e => setSearch(e.target.value)} />

              {/* Dropdown for actions */}
              <div className="flex space-x-3">
                {/* <button
              onClick={handleDownload}
              className="disabled:opacity-80 disabled:bg-gray-400  bg-[#3A5B76] text-white me-3 px-4 py-2 rounded hover:bg-[#2D465B]"
            >
              Bulk Upload
            </button> */}
                <div className="bulk-action-align">
                  <BulkActions
                    columns={columns}
                    fileName={fileName}
                    dialogName={dialogName}
                  />
                </div>

                {/* button to navigate to add product form */}
                <div className="button-align">
                  <ButtonComponent
                    onClick={() =>
                      navigate('/add-product', {
                        state: { data: 'FromProduct' },
                      })
                    }
                    className="bg-[#3A5B76] text-white px-4 py-[13px] rounded hover:bg-[#2D465B]"
                    label="Add Product"
                    value="addProduct"
                  ></ButtonComponent>
                </div>
              </div>
            </div>
            {/* <TableComponent column={column} data={tableData}/> */}
            
             {/* Table component to display products */}
            <TableComponent
              onClickRow={handleClick}
              column={column}
              data={tableData}
              name="product"
              fullData={filteredProducts}
              pageSize={5} // Number of rows per page
              generateQr="true"
             
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Products;

// import React, { useState } from "react";
// import Sidebar from "../container/Sidebar";
// import "./Products.css"; // Import the CSS file

// const Products = () => {
//   const [search, setSearch] = useState("");

//   // Static product data
//   const productList = [
//     {
//       id: 1,
//       product_name: "Laptop",
//       product_id: "P001",
//       product_code: "LP100",
//       hsn_sac_code: "84713010",
//       product_description: "High-performance laptop",
//       product_type: "Electronics",
//       unit_price: "$1000",
//       tax_rate: "18%",
//       currency: "USD",
//     },
//     {
//       id: 2,
//       product_name: "Smartphone",
//       product_id: "P002",
//       product_code: "SP200",
//       hsn_sac_code: "85171290",
//       product_description: "Latest 5G smartphone",
//       product_type: "Electronics",
//       unit_price: "$700",
//       tax_rate: "18%",
//       currency: "USD",
//     },
//     {
//       id: 3,
//       product_name: "Office Chair",
//       product_id: "P003",
//       product_code: "OC300",
//       hsn_sac_code: "94013000",
//       product_description: "Ergonomic office chair",
//       product_type: "Furniture",
//       unit_price: "$150",
//       tax_rate: "12%",
//       currency: "USD",
//     },
//     {
//       id: 4,
//       product_name: "Bluetooth Speaker",
//       product_id: "P004",
//       product_code: "BS400",
//       hsn_sac_code: "85182200",
//       product_description: "Portable wireless speaker",
//       product_type: "Electronics",
//       unit_price: "$50",
//       tax_rate: "18%",
//       currency: "USD",
//     },
//   ];

//   // Filter products based on search input
//   const filteredProducts = productList.filter((product) =>
//     `${product.product_name} ${product.product_id} ${product.product_code} ${product.product_description}`
//       .toLowerCase()
//       .includes(search.toLowerCase())
//   );

//   return (
//     <div className="gop">
//       <Sidebar />
//       <div className="header-topper">
//         <h1 className="gopa">Products</h1>
//         <input
//           type="text"
//           placeholder="Search products..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="search-bar"
//         />
//         <a href="/add-product">
//           <button className="add-customer-button">Add Product</button>
//         </a>
//       </div>

//       <table className="customer-table">
//         <thead>
//           <tr>
//             <th>Product Name</th>
//             <th>Product ID</th>
//             <th>Product Code</th>
//             <th>HSN/SAC Code</th>
//             <th>Description</th>
//             <th>Type</th>
//             <th>Unit Price</th>
//             <th>Tax Rate</th>
//             <th>Currency</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredProducts.length > 0 ? (
//             filteredProducts.map((product) => (
//               <tr key={product.id}>
//                 <td>{product.product_name}</td>
//                 <td>{product.product_id}</td>
//                 <td>{product.product_code}</td>
//                 <td>{product.hsn_sac_code}</td>
//                 <td>{product.product_description}</td>
//                 <td>{product.product_type}</td>
//                 <td>{product.unit_price}</td>
//                 <td>{product.tax_rate}</td>
//                 <td>{product.currency}</td>
//                 <td>
//                   <button id="btn">Edit</button>
//                   <button id="buton">Delete</button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="10">No products found</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Products;
