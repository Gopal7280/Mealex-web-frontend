import React, { useState, useEffect } from "react";
// import Sidebar from "../container/Sidebar";
import Sidebar from "../layouts/Sidebar"; // Make sure Sidebar is correctly imported
import "../styles/Products.css"
import axios from "axios";
import { data, NavLink, useNavigate } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { Preview, ModeEdit, DeleteForever,CloudUpload } from "@mui/icons-material";
import { ButtonComponent } from "../components/Button";
import { apiDelete, apiGet } from "../services/api";
import { TableComponent } from "../components/Table";
import { SearchComponent } from "../components/SerachBar";
import { Toast } from "primereact/toast";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Dialog } from 'primereact/dialog';
import { BulkActions } from "../components/bulkActions";
import {Loader} from "../layouts/Loader"
import { Skeleton } from 'primereact/skeleton';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
const columns=[
  {
    Product_name: "",
    Product_type: "",
    Product_unit: "",
    Category: "",
    selling_price: "",
    purchase_price: "",
    Product_hsn_code: "",
    gst_rate: "",
    product_description: "",
  },
];
const items = Array.from({ length: 5 }, (v, i) => i);
const fileName="product_add";
const dialogName="product's"
const Products = () => {
  const column = [
    "UID",
    "Product Name",
    "HSNCode",
    "ProductUnit",
    "ProductRate",
    "GSTRate",
    "QRCode",
  ];
  const [selectedAction, setSelectedAction] = useState(null);
  const [loader,setLoader]=useState(true);
  const actions = [{ name: "Download" }, { name: "Upload" }];
  const [excelData, setExcelData] = useState([]);
  const [search, setSearch] = useState("");
  const toast = useRef(null);
  const [productList, setProductList] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const [uplaod,setUpload]=useState(true);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await apiGet("/products");
        console.log(res);
        setProductList(res);
        setTotal(res.length);
      } catch (err) {
        console.log(err);
        toast.current.show({
          severity: "info",
          summary: "Error",
          detail: "No Products available please add products",
          life: 1500,
        });
      } finally {
        setLoader(false); // This now works properly
      }
    };
  
    fetchProduct(); // call async function
  }, []);
  
  
  // Filter products based on search input
  const filteredProducts = productList.filter((product) =>
    ` ${product.product_name} ${product.product_number} ${product.product_hsn_code}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );
  const tableData = filteredProducts.map((value) => ({
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
        console.log("i am match");
        navigate("/product_detail_edit", { state: { data: i } });
      }
    }
  };
  const handlePreview = (e, product_id) => {
    // alert(product_id);
    for (var i of filteredProducts) {
      if (i.product_number == product_id) {
        console.log(i);
        console.log("i am match");
        navigate("/product_detail_display", { state: { data: i } });
      }
    }
  };
  const handledelete = (e, product_id) => {
    const ans=confirm("Are you sure want to delete Product");
        console.log(ans);
        if(ans==true)
        {
          for (var i of filteredProducts) {
            if (i.product_number == product_id) {
              console.log(i);
              console.log("i am match");
              const deleteProduct = async () => {
                const res = await apiDelete(`products/${i.product_id}`);
                // alert(res);
              };
              deleteProduct();
              window.location.reload();
            }
          }
        }
        else{
          alert("Product not deleted");
        }
    // alert(product_id);
  };
  function handleClick(e,row) {
    console.log("clicked");
    console.log(row);
    handlePreview(e,row.product_id);
  }
  return (
    <>
    {
      loader?(<div className="">
        {/* <a href="/add-product">
            <button className="add-customer-button">Add Product</button>
          </a> */}
        <div className="max-w-7xl mt-3 mx-auto  bg-white p-5 responsive-head shadow-lg rounded-lg">
        <Skeleton width="100%" height="50px" className="mb-2"></Skeleton>
          {/* <TableComponent column={column} data={tableData}/> */}
  
          <div className="card">
            <DataTable value={items} className="p-datatable-striped">
                <Column field="code" header="UID" style={{ width: '25%' }} body={<Skeleton />}></Column>
                <Column field="name" header="Product Name" style={{ width: '25%' }} body={<Skeleton />}></Column>
                <Column field="category" header="HSNCode" style={{ width: '25%' }} body={<Skeleton />}></Column>
                <Column field="quantity" header="ProductUnit" style={{ width: '25%' }} body={<Skeleton />}></Column>
                <Column field="quantity" header="ProductRate" style={{ width: '25%' }} body={<Skeleton />}></Column>
                <Column field="quantity" header="GSTRate" style={{ width: '25%' }} body={<Skeleton />}></Column>
                <Column field="quantity" header="QRCode" style={{ width: '25%' }} body={<Skeleton />}></Column>
                <Column field="quantity" header="Action" style={{ width: '25%' }} body={<Skeleton />}></Column>
            </DataTable>
        </div>
        </div>
      </div>):(
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
          <SearchComponent onChange={(e) => setSearch(e.target.value)} />
          <div className="flex space-x-3">
            {/* <button
              onClick={handleDownload}
              className="disabled:opacity-80 disabled:bg-gray-400  bg-[#3A5B76] text-white me-3 px-4 py-2 rounded hover:bg-[#2D465B]"
            >
              Bulk Upload
            </button> */}
            <div className="bulk-action-align">
           <BulkActions columns={columns} fileName={fileName} dialogName={dialogName}/>
           </div>
           <div className="button-align">
            <ButtonComponent
              onClick={() =>
                navigate("/add-product", {
                  state: { data: "FromProduct" },
                })
              }
              className="bg-[#3A5B76] text-white px-4 py-2 rounded hover:bg-[#2D465B]"
              label="Add Product"
              value="addProduct"
            ></ButtonComponent>
            </div>
          </div>
        </div>
        {/* <TableComponent column={column} data={tableData}/> */}

        <TableComponent
        onClickRow={handleClick}
          column={column}
          data={tableData}
          name="product"
          fullData={filteredProducts}
          pageSize={3} // Number of rows per page
          generateQr="true"
          actions={(row) => (
            <div className="text-center">
              {/* <button
                className="text-[#3A5B76] dark:!text-white"
                onClick={(e) => handlePreview(e, row.product_id)}
              >
                <Preview />
              </button> */}
              {/* <button
                className="text-[#3A5B76] dark:!text-white"
                onClick={(e) => handleEdit(e, row.product_id)}
              >
                <ModeEdit />
              </button> */}
              <button
                className="text-red-500"
                onClick={(e) => handledelete(e, row.product_id)}
              >
                <DeleteForever />
              </button>
            </div>
          )}
        />
      </div>
    </div>
      )
    }
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
