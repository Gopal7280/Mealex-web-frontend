import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { toWords } from "number-to-words";
import "../styles/layoutFix.css";
import Sidebar from "../layouts/Sidebar";
import { Preview, ModeEdit, DeleteForever, Close } from "@mui/icons-material";
import "../../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import { useFormik } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import { debounce, delay, update } from "lodash";
import { data } from "jquery";
import { InputComponent } from "../components/Input";
import { ButtonComponent } from "../components/Button";
import { apiGet, apiPost } from "../services/api";
import {Loader} from "../layouts/Loader"
// import { useDebounce } from "../hooks/useDebounce";
export default function InvoiceForm({ onInvoiceAdded }) {
  // const [customers, setCustomers] = useState([]);
  //hi
  // const [dd, setdd] = useState(new Date());
  // const [month, setMonth] = useState(new Date());
  // const [datee, setDatee] = useState(new Date());
  // const [year, setYear] = useState(new Date());
  // const [dt, setDt] = useState("");
  // const [show, setShow] = useState("");
  // const [count, setCount] = useState(0);
  // const [products, setProducts] = useState([{}]);
  // const [getdebounce,setGetDebounce]=useState("")
  // // const getMe=useDebounce(getdebounce,1000);
  // useEffect(() => {
  //   setdd(dd.getMonth() + 1 + "/" + dd.getFullYear());
  //   setMonth(month.getMonth() + 1);
  //   setDatee(datee.getDate());
  //   setYear(year.getFullYear());
  //   setDt(
  //     datee.getDate() + "/" + (month.getMonth() + 1) + "/" + year.getFullYear()
  //   );
  //   const fetchCustomers = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       // const res = await axios.get(
  //       //   "http://localhost:5003/api/productdetail/productName",
  //       //   {
  //       //     headers: {
  //       //       Authorization: `Bearer ${token}`,
  //       //     },
  //       //   }
  //       // );
  //       // const res=await apiRequestProductdetails("productdetail/productName",token)
  //       const res=await apiGet("/products/productName");
  //       setProducts(res);
  //     } catch (error) {
  //       console.error("Error fetching customers:", error);
  //     }

  //   };
  //   fetchCustomers();
  // }, [onInvoiceAdded]);

  // const handleKeyUp = (e) => {
  //   const value = e.target.value;
  //   console.log(value);

  //   // Allow only digits and dots
  //   if (!/^[\d.]*$/.test(value)) {
  //     return;
  //   }

  //   setDt(value);
  // };

  // const handleDateBlur = () => {
  //   const parts = dt.split(".");

  //   // Ensure we have the correct number of parts
  //   if (parts.length === 1 && parts[0].length <= 2) {
  //     // Format as DD.MM
  //     setDt(`${parts[0]}/${month}/${year}`);
  //   } else if (
  //     parts.length === 2 &&
  //     parts[0].length <= 2 &&
  //     parts[1].length <= 2
  //   ) {
  //     // Format as DD.MM.YYYY
  //     setDt(`${parts[0]}/${parts[1]}/${year}`);
  //   } else if (
  //     parts.length === 3 &&
  //     parts[0].length <= 2 &&
  //     parts[1].length <= 2 &&
  //     parts[2].length <= 2
  //   ) {
  //     // Format as DD.MM.YYYY
  //     setDt(`${parts[0]}/${parts[1]}/20${parts[2]}`);
  //   } else if (
  //     parts.length === 3 &&
  //     parts[0].length <= 2 &&
  //     parts[1].length <= 2 &&
  //     parts[2].length <= 4
  //   ) {
  //     // Format as DD.MM.YYYY
  //     setDt(`${parts[0]}/${parts[1]}/${parts[2]}`);
  //   }
  // };
  // function handleFoucus() {
  //   setDt("");
  // }
  // function increaseCount() {
  //   console.log("count" + count);
  //   setCount(count + 1);
  // }
  // const [name, setName] = useState("");
  // const [email, setemail] = useState("");
  // const [billing, setBilling] = useState("");
  // const [productdt, setProductdt] = useState([{}]);
  // const [product_hsn, setProduct_hsn] = useState("");
  // const [unitPrice, setUnitPrice] = useState("");
  // const [gst, setGst_rate] = useState("");
  // const [gstRate, setGstRate] = useState(0);
  // const [currency, setCurrency] = useState("");

  // const handleDebounce = debounce((value) => {
  //   // console.log("i will run");
  //   const fetchCustomersDetails = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       // const res = await axios.get(
  //       //   `http://localhost:5003/api/invoices/${value}`,
  //       //   {
  //       //     headers: {
  //       //       Authorization: `Bearer ${token}`,
  //       //     },
  //       //   }
  //       // );
  //       // const res=await apiReuestCustomerdetail("invoices",value,token)
  //       const res=await apiGet(`/customers/invoices/${value}`)
  //       console.log(res);
  //       const getName =res[0].customer_name;
  //       const getEmail = res[0].email;
  //       const getBilling =
  //         res[0].billing_address +
  //         " " +
  //         res[0].zip_code +
  //         " "
  //       console.log(getName);
  //       console.log(getEmail);
  //       console.log(getBilling);
  //       setName(getName);
  //       setemail(getEmail);
  //       setBilling(getBilling);
  //       setProducts(res);
  //       handleProductdt();
  //     } catch (error) {
  //       console.error("Error fetching customers:", error);
  //       setemail("");
  //       setName("");
  //       setBilling("");
  //       handleProductdt();
  //     }
  //   };
  //   fetchCustomersDetails();
  // }, 900);
  // function handleTimer(value) {
  //   handleDebounce(value);
  // }
  // function handleApiCall(e) {
  //   // setGetDebounce(e.target.value);
  //   // console.log(getMe);
  //   handleTimer(e.target.value);
  //   // console.log(e.target.value);
  // }
  // function handleProductdt() {
  //   const fetchCustomersProduct = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       // const res = await axios.get(
  //       //   "http://localhost:5003/api/productdetail/productName",
  //       //   {
  //       //     headers: {
  //       //       Authorization: `Bearer ${token}`,
  //       //     },
  //       //   }
  //       // );
  //       // const res=await apiRequestProductdetails("productdetail/productName",token);
  //       const res=await apiGet("products/productName");
  //       setProducts(res);
  //     } catch (error) {
  //       console.error("Error fetching customers:", error);
  //     }
  //   };
  //   fetchCustomersProduct();
  // }

  // const [productRows, setProductRows] = useState([
  //   {
  //     id: Date.now(),
  //     productName: "",
  //     hsnCode: "",
  //     gstRate: "",
  //     gstCalculate: "",
  //     unitPrice: "",
  //     quantity: "",
  //     total: "",
  //   },
  // ]);
  // const handleProductChange = async (index, productName) => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     // const res = await axios.get(
  //     //   `http://localhost:5003/api/productdetail/all/${productName}`,
  //     //   {
  //     //     headers: {
  //     //       Authorization: `Bearer ${token}`,
  //     //     },
  //     //   }
  //     // );
  //     // const res=await apiRequestProductdetailsForParticular(`productdetail/all/${productName}`,token)
  //     const res=await apiGet(`products/detail/${productName}`);
  //     const productDetail = res[0];
  //     const updatedRows = [...productRows];
  //     var rate = 100;
  //     rate =
  //       parseInt(res[0].gst_rate) * parseFloat(res[0].purchase_price);
  //     console.log(rate);
  //     rate = rate / 100;
  //     console.log("gstRate" + rate);
  //     updatedRows[index] = {
  //       ...updatedRows[index],
  //       productName: productDetail.product_name,
  //       hsnCode: productDetail.product_hsn_code,
  //       gstRate: productDetail.gst_rate,
  //       gstCalculate: rate + parseFloat(res[0].purchase_price),
  //       unitPrice: productDetail.purchase_price,
  //       total: productDetail.purchase_price * updatedRows[index].quantity, // Update total based on quantity
  //     };
  //     setProductRows(updatedRows);
  //   } catch (error) {
  //     console.error("Error fetching product details:", error);
  //   }
  // };

  // const [total, setTotal] = useState(0);
  // const [addTotal, setAddTotal] = useState(0);
  // const [subTotal, setSubTotal] = useState(0);
  // const [AmountWords, setAmountWords] = useState("");
  // const handleQuantityChange = (index, quantity, getNotify) => {
  //   var subTotalll = 0;
  //   if (getNotify == "qtyChange") {
  //     const updatedRows = [...productRows];
  //     updatedRows[index].quantity = quantity;
  //     updatedRows[index].total = updatedRows[index].gstCalculate * quantity; // Update total based on quantity
  //     setProductRows(updatedRows);
  //     setAddTotal(0);
  //     setSubTotal(0);
  //     var totall = 0;
  //     var subTotall = 0;
  //     var num = 0;
  //     for (var i of productRows) {
  //       subTotall = subTotall + parseFloat(i.unitPrice);
  //       totall = totall + parseFloat(i.total);
  //       // setAddTotal(addTotal+totall);
  //       if (productRows.length - 2 == num) {
  //         subTotalll = subTotall;
  //       }
  //       console.log(subTotalll);
  //       num++;
  //     }
  //     console.log(totall + "i ");
  //     setAddTotal(totall.toFixed(2));
  //     setSubTotal(subTotall);
  //     // const word=toWords(parseFloat(totall,10));
  //     // setAmountWords(word.toUpperCase());
  //     // Handle crores
  //     let result = ""; // Initialize result as an empty string
  //     const units = ["", " lakh", " crore"];
  //     // Units for Indian numbering system

  //     if (totall >= 10000000) {
  //       // Check if num is 10 million or more
  //       console.log("working");
  //       const crores = Math.floor(totall / 10000000); // crores = 1
  //       result += toWords(crores) + units[2]; // result = "1 crore"
  //       totall %= 10000000; // num = 5000000
  //       setAmountWords(result.toUpperCase() + " RUPEES ONLY/-");
  //       console.log("add" + totall);
  //     }

  //     // Handle lakhs
  //     if (totall >= 100000) {
  //       // Check if num is 100,000 or more
  //       const lakhs = Math.floor(totall / 100000); // lakhs = 5
  //       result += (result ? " " : "") + toWords(lakhs) + units[1]; // result = "1 crore 5 lakh"
  //       totall %= 100000; // num = 0
  //       setAmountWords(result.toUpperCase() + " RUPEES ONLY/-");
  //       console.log("add" + totall);
  //     }
  //     // Handle thousands and below
  //     if (totall >= 0) {
  //       // Check if num is greater than 0
  //       console.log("working>0" + totall);
  //       const word = toWords(parseFloat(totall, 10));
  //       setAmountWords(
  //         result.toUpperCase() + " " + word.toUpperCase() + " RUPEES ONLY/-"
  //       );
  //     }
  //     console.log(result.trim()); // Output: "1 crore 5 lakh"
  //   } else if (getNotify == "remove") {
  //     const updatedRows = [...productRows];
  //     console.log(productRows[index]);
  //     updatedRows[index].quantity = 0;
  //     updatedRows[index].total = updatedRows[index].gstCalculate * 0; // Update total based on quantity
  //     setProductRows(updatedRows);
  //     setAddTotal(0);
  //     setSubTotal(0);
  //     var totall = 0;
  //     var subTotall = 0;
  //     // console.log(i);
  //     subTotall = subTotal - parseFloat(productRows[index].unitPrice);
  //     for (var i of productRows) {
  //       totall = totall + parseFloat(i.total);
  //     }
  //     // setAddTotal(addTotal+totall);
  //     console.log(totall + "i ");
  //     setAddTotal(totall.toFixed(2));
  //     console.log(subTotall);
  //     setSubTotal(subTotall);
  //     let result = ""; // Initialize result as an empty string
  //     const units = ["", " lakh", " crore"]; // Units for Indian numbering system
  //     if (totall >= 10000000) {
  //       // Check if num is 10 million or more
  //       console.log("working");
  //       const crores = Math.floor(totall / 10000000); // crores = 1
  //       result += toWords(crores) + units[2]; // result = "1 crore"
  //       totall %= 10000000; // num = 5000000
  //       setAmountWords(result.toUpperCase() + " RUPEES ONLY/-");
  //     }

  //     // Handle lakhs
  //     if (totall >= 100000) {
  //       // Check if num is 100,000 or more
  //       const lakhs = Math.floor(totall / 100000); // lakhs = 5
  //       result += (result ? " " : "") + toWords(lakhs) + units[1]; // result = "1 crore 5 lakh"
  //       totall %= 100000; // num = 0
  //       setAmountWords(result.toUpperCase() + " RUPEES ONLY/-");
  //       console.log("totall remaining" + totall);
  //     }
  //     // Handle thousands and below
  //     if (totall > 0) {
  //       // Check if num is greater than 0
  //       const word = toWords(parseFloat(totall, 10));
  //       setAmountWords(
  //         result.toUpperCase() + " " + word.toUpperCase() + " RUPEES ONLY/-"
  //       );
  //     }
  //     if (index == 0) {
  //       setAmountWords("zero");
  //     }

  //     console.log(result.trim()); // Output: "1 crore 5 lakh"
  //   }
  // };
  // const [alter, setAlter] = useState(0);

  // const handleAddProductRow = () => {
  //   setProductRows([
  //     ...productRows,
  //     {
  //       id: Date.now(),
  //       productName: "",
  //       hsnCode: "",
  //       gstRate: "",
  //       unitPrice: "",
  //       quantity: "",
  //       total: "",
  //     },
  //   ]);
  // };
  // const navigate=useNavigate();
  // const formik = useFormik({
  //   initialValues: {
  //     invoiceDate: "",
  //     customerNumber: "",
  //     // customerName: "",
  //     // customerEmail: "",
  //     billing_address: "",
  //     references: "",
  //     shipping_address: "",
  //     // "sNo": 0,
  //     // "productName": "",
  //     // "HSNCode": 0,
  //     // "GSTRate": 0,
  //     // "unitPrice": 0,
  //     // "quantity": 0,
  //     // "GST": 0,
  //     // "Discount": 0,
  //     // "totalPrice": 0,
  //     subTotal: 0,
  //     totalAmount: 0,
  //     // Amountinwords: "",
  //     invoiceNotes: "",
  //     signature_box: "",
  //     productdetail: [{}],
  //   },
  //   onSubmit: (values) => {
  //     values.invoiceDate = dt;
  //     // values.customerName = name;
  //     values.billing_address = billing;
  //     values.sNo = 1;
  //     values.shipping_address = ship;
  //     values.productdetail = productRows;
  //     values.subTotal = subTotal;
  //     values.totalAmount = addTotal;
  //     // alert(JSON.stringify(values.productdetail));
  //     // alert(JSON.stringify(values));
  //     // values.invoiceDate = dt;
  //     // alert(values.invoiceDate);
  //     // console.log(productRows);
  //     // const handleProductChange = async (index, productName) => {
  //     //   try {
  //     //     const token = localStorage.getItem("token");
  //     //     const res = await axios.get(
  //     //       `http://localhost:5003/api/productdetail/all/${productName}`,
  //     //       {
  //     //         headers: {
  //     //           Authorization: `Bearer ${token}`,
  //     //         },
  //     //       }
  //     //     );

  //     const addInvoiceData = async () => {
  //       try {
  //         const token = localStorage.getItem("token");
  //         // const res = await axios.post(
  //         //   `http://localhost:5003/api/invoices/submit`,
  //         //   values,
  //         //   {
  //         //     headers: {
  //         //       Authorization: `Bearer ${token}`,
  //         //     },
  //         //   }
  //         // );
  //         // const res=await apiPostInvoiceData("invoices/submit",values,token)
  //         const res=await apiPost("/invoices",values)
  //         alert(JSON.stringify(values));
  //         navigate("/generate-invoice",{state:{data:values}})

  //       } catch (err) {
  //         console.log(err);
  //       }
  //     };
  //     addInvoiceData();
  //   },
  // });
  // const [ship, setShip] = useState("");
  // function handleCheck(e) {
  //   if (e.target.checked) {
  //     console.log("checked");
  //     console.log(billing);
  //     setShip(billing);
  //   } else {
  //     setShip("");
  //   }
  // }
  // return (
  //   <div
  //     className="flex justify-center"
  //     style={{ overflow: "scroll", height: "99vh" }}
  //   >
  //     <div className="py-6">
  //       <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-md ">
  //         <h2 className="mb-6 text-3xl font-semibold text-center text-gray-800 d-inline-block">
  //           Invoice Form
  //         </h2>

  //         <NavLink to="/invoices" className="text-white text-decoration-none">
  //           <ButtonComponent
  //             type="button"
  //             className="btn btn-primary float-end"
  //             value="close"
  //             label="Close"
  //           ></ButtonComponent>
  //         </NavLink>
  //         <form className="" onSubmit={formik.handleSubmit}>
  //           <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
  //             <div>
  //               <InputComponent
  //                 labelName="InvoiceDate"
  //                 classNameLabel="block mb-2 font-semibold text-gray-700"
  //                 labelInput="Invoice Date:"
  //                 onBlur={handleDateBlur}
  //                 onChange={handleKeyUp}
  //                 onFocus={handleFoucus}
  //                 type="text"
  //                 name="invoiceDate"
  //                 placeholder="date.month.year"
  //                 value={dt}
  //                 required
  //                 classNameInput="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
  //               ></InputComponent>
  //             </div>
  //             <div>
  //               <InputComponent
  //                 labelName="customerNumber"
  //                 classNameLabel="block mb-2 font-semibold text-gray-700"
  //                 labelInput="Customer Contact_Number"
  //                 onChange={formik.handleChange}
  //                 type="number"
  //                 onKeyUp={handleApiCall}
  //                 name="customerNumber"
  //                 placeholder="Enter Customer number"
  //                 required
  //                 classNameInput="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
  //               ></InputComponent>
  //             </div>
  //           </div>

  //           <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
  //             <div>
  //               <InputComponent
  //                 labelName="customerName"
  //                 classNameLabel="block mb-2 font-semibold text-gray-700"
  //                 labelInput="Customer Name"
  //                 {...(name != "" ? { value: name } : {})}
  //                 onChange={formik.handleChange}
  //                 type="text"
  //                 name="customerName"
  //                 placeholder="Enter Customer name"
  //                 required
  //                 classNameInput="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
  //               ></InputComponent>
  //             </div>

  //             <div>
  //               <InputComponent
  //                 labelName="refrence"
  //                 classNameLabel="block mb-2 font-semibold text-gray-700"
  //                 labelInput="Reference"
  //                 onChange={formik.handleChange}
  //                 type="text"
  //                 name="references"
  //                 placeholder="Enter Reference details"
  //                 required
  //                 classNameInput="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
  //               ></InputComponent>
  //             </div>
  //           </div>
  //           <div>
  //             <label
  //               htmlFor="billing_address"
  //               className="block mb-2 font-semibold text-gray-700"
  //             >
  //               Additional Information's:
  //             </label>
  //             <textarea
  //               name="billing-address"
  //               readOnly
  //               value={
  //                 "Customer Email:" +
  //                 email +
  //                 "\n" +
  //                 "billing_address:" +
  //                 billing
  //               }
  //               className="w-full p-3 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
  //               id=""
  //             ></textarea>
  //             <div className="">
  //               <label
  //                 htmlFor="shipping_address"
  //                 className="block mb-2 font-semibold text-gray-700"
  //               >
  //                 Shipping Address:
  //               </label>
  //               <span className="text-primary">
  //                 What Shipping address to be same?{" "}
  //               </span>
  //               <input
  //                 onChange={handleCheck}
  //                 type="checkbox"
  //                 className="mb-3 form-check-input bg-primary"
  //               />
  //               <textarea
  //                 name="shipping_adddress"
  //                 onChange={formik.handleChange}
  //                 required
  //                 {...(ship != "" ? { value: ship } : {})}
  //                 className="mb-4 form-control"
  //                 id=""
  //               ></textarea>
  //             </div>
  //           </div>
  //           <div className="mb-6 overflow-x-auto">
  //             <table className="min-w-full border-collapse table-auto">
  //               <thead className="bg-gray-100">
  //                 <tr>
  //                   <th className="w-10 p-3 text-gray-700">S.No.</th>
  //                   <th className="p-3 text-left text-gray-700 w-30">
  //                     Product
  //                   </th>
  //                   <th className="w-20 p-3 text-gray-700">HSN Code</th>
  //                   <th className="w-20 p-3 text-gray-700">GST Rate</th>

  //                   <th className="w-20 p-3 text-gray-700">Unit Price</th>
  //                   <th className="w-20 p-3 text-gray-700">Qty</th>
  //                   <th className="w-20 p-3 text-gray-700">GST</th>
  //                   <th className="w-20 p-3 text-gray-700">Discount (%)</th>
  //                   <th className="w-20 p-3 text-gray-700">Total</th>
  //                   <th className="p-3 text-left text-gray-700"></th>
  //                 </tr>
  //               </thead>
  //               <tbody>
  //                 {productRows.map((row, index) => (
  //                   <tr key={row.id}>
  //                     <td>
  //                       <InputComponent
  //                         onChange={formik.handleChange}
  //                         type="number"
  //                         name="sNo"
  //                         value={index + 1}
  //                         readOnly
  //                         classNameInput="w-full p-2 border border-gray-300 rounded-md hover:bg-gray-200"
  //                       ></InputComponent>
  //                     </td>
  //                     <td>
  //                       <select
  //                         name="productdetail"
  //                         className="form-select"
  //                         onChange={(e) =>
  //                           handleProductChange(index, e.target.value)
  //                         }
  //                         value={row.productName}
  //                       >
  //                         <option value="">Select</option>
  //                         {products.map((product) => (
  //                           <option
  //                             key={product.product_name}
  //                             value={product.product_name}
  //                           >
  //                             {product.product_name}
  //                           </option>
  //                         ))}
  //                       </select>
  //                     </td>
  //                     <td>
  //                       <InputComponent
  //                         onChange={formik.handleChange}
  //                         type="text"
  //                         name="HSNCode"
  //                         value={row.hsnCode}
  //                         min="0"
  //                         classNameInput="w-full p-2 border border-gray-300 rounded-md hover:bg-gray-200"
  //                       ></InputComponent>
  //                     </td>
  //                     <td>
  // <InputComponent
  //   onChange={formik.handleChange}
  //   type="number"
  //   name="GSTRate"
  //   min="0"
  //   readOnly
  //   value={row.gstCalculate}
  //   classNameInput="w-full p-2 border border-gray-300 rounded-md hover:bg-gray-200"
  // ></InputComponent>
  //                     </td>
  //                     <td>
  //                       <InputComponent
  //                         onChange={formik.handleChange}
  //                         type="number"
  //                         name="unitPrice"
  //                         value={row.unitPrice}
  //                         min="0"
  //                         readOnly
  //                         classNameInput="w-full p-2 border border-gray-300 rounded-md hover:bg-gray-200"
  //                       ></InputComponent>
  //                     </td>
  //                     <td>
  //                       <InputComponent
  //                         onChange={formik.handleChange}
  //                         type="number"
  //                         name="quantity"
  //                         onBlur={(e) =>
  //                           handleQuantityChange(
  //                             index,
  //                             e.target.value,
  //                             "qtyChange"
  //                           )
  //                         }
  //                         classNameInput="w-full p-2 border border-gray-300 rounded-md hover:bg-gray-200"
  //                         placeholder="Quantity"
  //                       ></InputComponent>
  //                     </td>
  //                     <td>
  //                       <InputComponent
  //                         onChange={formik.handleChange}
  //                         type="number"
  //                         name="GST"
  //                         min="0"
  //                         readOnly
  //                         value={row.gstRate}
  //                         classNameInput="w-full p-2 border border-gray-300 rounded-md hover:bg-gray-200"
  //                         placeholder="GST"
  //                       ></InputComponent>
  //                     </td>
  //                     <td>
  //                       <InputComponent
  //                         onChange={formik.handleChange}
  //                         type="number"
  //                         name="Discount"
  //                         min="0"
  //                         value="0"
  //                         classNameInput="w-full p-2 border border-gray-300 rounded-md hover:bg-gray-200"
  //                         placeholder="Discount"
  //                       ></InputComponent>
  //                     </td>
  //                     <td>
  //                       <InputComponent
  //                         onChange={formik.handleChange}
  //                         type="number"
  //                         name="totalPrice"
  //                         value={row.total}
  //                         readOnly
  //                         classNameInput="w-full p-2 border border-gray-300 rounded-md hover:bg-gray-200"
  //                       ></InputComponent>
  //                     </td>
  //                     <td>
  // <ButtonComponent
  //   type="button"
  //   className="p-2 text-white bg-red-500 rounded hover:bg-red-600"
  //   value="remove"
  //   children={<span><DeleteForever/></span>}
  //   onClick={() => {
  //     const updatedRows = productRows.filter(
  //       (_, i) => i !== index
  //     );
  //     console.log(index);
  //     const qtyGet = productRows[index].quantity;
  //     console.log(qtyGet);
  //     handleQuantityChange(index, qtyGet, "remove");
  //     setProductRows(updatedRows);
  //   }}
  // ></ButtonComponent>
  //                     </td>
  //                   </tr>
  //                 ))}
  //               </tbody>
  //             </table>
  //             <ButtonComponent
  //               type="button"
  //               value="button"
  //               label="Add Product"
  //               onClick={handleAddProductRow}
  //               className="mt-4 px-4 py-2 bg-[#3A5B76] rounded text-white hover:bg-opacity-80"
  //             ></ButtonComponent>
  //           </div>

  //           <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
  //             <div>
  // <InputComponent
  //   labelName="subTotal"
  //   classNameLabel="block mb-2 font-semibold text-gray-700"
  //   labelInput="Subtotal:"
  //   onChange={formik.handleChange}
  //   type="number"
  //   name="subTotal"
  //   placeholder="Subtotal"
  //   readOnly
  //   value={subTotal}
  //   classNameInput="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
  // ></InputComponent>
  //             </div>
  //             <div>
  //               <InputComponent
  //                 labelName="totalAmount"
  //                 classNameLabel="block mb-2 font-semibold text-gray-700"
  //                 labelInput="Total Amount:"
  //                 onChange={formik.handleChange}
  //                 type="number"
  //                 name="totalAmount"
  //                 placeholder="Total Amount"
  //                 readOnly
  //                 value={addTotal}
  //                 classNameInput="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
  //               ></InputComponent>
  //             </div>
  //           </div>

  //           <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-1">
  //             <div>
  //               <InputComponent
  //                 labelName="Amountinwords"
  //                 classNameLabel="block mb-2 font-semibold text-gray-700"
  //                 labelInput="Amount in Words:"
  //                 onChange={formik.handleChange}
  //                 type="text"
  //                 name="Amountinwords"
  //                 placeholder="Amount in words display"
  //                 readOnly
  //                 value={AmountWords}
  //                 classNameInput="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
  //               ></InputComponent>
  //             </div>
  //           </div>

  //           <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
  //             <div>
  //               <label
  //                 htmlFor="invoiceNotes"
  //                 className="block mb-2 font-semibold text-gray-700"
  //               >
  //                 Notes:
  //               </label>
  //               <textarea
  //                 id="invoiceNotes"
  //                 name="invoiceNotes"
  //                 className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
  //                 placeholder="Any additional notes..."
  //                 onChange={formik.handleChange}
  //               ></textarea>
  //             </div>

  //             <div>
  //               <label
  //                 htmlFor="signature_box"
  //                 className="block mb-2 font-semibold text-gray-700"
  //               >
  //                 Signature Box:
  //               </label>
  //               <textarea
  //                 id="signature_box"
  //                 name="signature_box"
  //                 className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
  //                 onChange={formik.handleChange}
  //               ></textarea>
  //             </div>
  //           </div>

  //           <div className="flex justify-end">
  //             <ButtonComponent
  //               type="submit"
  //               value="submit"
  //               label="Generate Invoice"
  //               className="mt-4 px-4 py-2 bg-[#3A5B76] rounded text-white hover:bg-opacity-80"
  //             ></ButtonComponent>
  //           </div>
  //         </form>
  //       </div>
  //     </div>
  //   </div>
  // );
  const [products, setProducts] = useState([]); 
  const [disp1, setdisp1] = useState(true);
  const [disp2, setdisp2] = useState(false);
  const [businessprofile, setBusinessProfile] = useState([]);
  const [date, setDate] = useState(new Date());
  const [customer, setCustomer] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const dropdownRef = useRef(null);
  const [total, setTotal] = useState(0);
  const [amountReceipt, setAmountReceipt] = useState(0);
  const [paymentTerms, setPaymentTerms] = useState("");
  const [dueDate, setDueDate] = useState();
  const [invoicePrefix, setInvoicePrefix] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [TaxAmount, setTaxAmount] = useState([]);
  const [productDescription, setProductDescription] = useState(["null"]);
  const [disabl,setdisabl]=useState([]);
  const [loader,setLoader]=useState(true);
  const [nameLetter,setNameLetter]=useState("");
  const [productAmount, setProductAmount] = useState([
    {
      amount: "0",
      per: "0",
    },
  ]);
  useEffect(() => {
    setLoader(true); // Show loader when effect starts
    const dt = new Date();
    setDate(dt.toLocaleDateString());
    
    const getBussinessProfile = async () => {
      try {
        const responseb = await apiGet("/businessprofile");
        console.log(responseb);
        setBusinessProfile(responseb);
        if(responseb[0].logo==null){
            var name=responseb[0].business_name
            console.log(name.substring(0,1));
        }
      } catch (error) {
        console.error("Error fetching business profile:", error);
      }
    };
  
    const invoicePrefixSet = async () => {
      try {
        const res = await apiGet("/invoices/invoicenumber/prefix");
        console.log(res);
        setInvoicePrefix(res.invoice_prefix);
        setInvoiceNumber(res.invoice_number);
        setDueDate(res.due_date);
        setPaymentTerms(res.paymentTerms);
      } catch (error) {
        console.error("Error fetching invoice prefix:", error);
      }
    };
  
    const fetchProduct = async () => {
      try {
        const res = await apiGet("/products/productName");
        setProducts(res);
        console.log("Product data fetched");
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  
    const fetchCustomers = async () => {
      try {
        const res1 = await apiGet("/customers");
        setCustomer(res1);
        console.log(res1);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
  
    // Execute the API calls
    getBussinessProfile();
    invoicePrefixSet();
    fetchProduct();
    fetchCustomers();
  
    // Set the loader to false once all API calls are done
    setLoader(false);
  
  }, []); // Empty dependency array, ensures this effect runs only once after component mount
  
  function handleDueDate(e) {
    setDueDate(e.target.value);
    if (e.target.value == "") {
      setdisp1(false);
      setdisp2(true);
    }
  }
  const handleAddProductRow = () => {
    setProductRows([
      ...productRows,
      {
        id: "",
        productName: "",
        hsnCode: "",
        gstRate: "",
        unitPrice: "",
        quantity: "",
        total: "",
        discount_amount: 0,
        taxable_amount: 0,
      },
    ]);
    const updateMe=[...disabl];
    setdisabl([...disabl,1]);
    setTaxAmount([...TaxAmount, 0]);
    setProductDescription([...productDescription, "null"]);
    setProductAmount([
      ...productAmount,
      {
        amount: "",
        per: "",
      },
    ]);
  };
  const [productRows, setProductRows] = useState([
    {
      id: "",
      productName: "",
      hsnCode: "",
      gstRate: "",
      gstCalculate: "",
      unitPrice: "",
      quantity: "",
      total: "",
      discount_amount: 0,
      discount_amountPer: "0_%",
      productDescription: "",
      taxable_amount: 0,
    },
  ]);
  const handleProductChange = async (index, productName) => {
    setCount(0);
    const updateMe=[...disabl];
    updateMe[index]=0;
    setdisabl(updateMe);
    try {
      const token = localStorage.getItem("token");
      if(productName=="addProduct")
        {
          navigate("/add-product",{state:{data:"FromInvoice"}})
        }
      const res = await apiGet(`products/detail/${productName}`);
      const productDetail = res[0];
      const updatedRows = [...productRows];
      var rate = 100;
      rate = parseInt(res[0].gst_rate) * parseFloat(res[0].selling_price);
      console.log(res);
      rate = rate / 100;
      console.log("gstRate" + rate);
      var calculateTax = 0;
      var calculateGst = 0;
      if (res[0].selling_status == "withGstSelling") {
        console.log("yes");
        console.log(res);
        calculateGst = 1 + parseFloat(res[0].gst_rate / 100);
        calculateTax = parseFloat(res[0].selling_price) / calculateGst;
        calculateTax = calculateTax.toFixed(2);
        calculateGst = 0;
        res[0].gst_rate = 0;
      }
      if (res[0].selling_status == "withoutGstSelling") {
        console.log("no");
        console.log(res);
        calculateGst = (res[0].selling_price * res[0].gst_rate) / 100;
        calculateTax = res[0].selling_price;
        calculateTax = calculateTax.toFixed(2);
        console.log(calculateGst);
      }
      updatedRows[index].quantity="1"
      const updateTax = [...TaxAmount];
      const updateGst = [...gstRateS];
      updateGst[index] = parseFloat(res[0].gst_rate);
      updateTax[index] = calculateGst;
      updatedRows[index] = {
        ...updatedRows[index],
        id: productDetail.product_id,
        productName: productDetail.product_name,
        hsnCode: productDetail.product_hsn_code,
        gstRate: productDetail.gst_rate,
        gstCalculate: rate + parseFloat(res[0].selling_price),
        unitPrice: calculateTax,
        quantity: updatedRows[index].quantity,
        total:calculateGst + calculateTax * parseFloat(updatedRows[index].quantity), // Update total based on quantity
        discount_amount: "0",
        discount_amountPer: "0%",
        taxable_amount: calculateTax * parseFloat(updatedRows[index].quantity),
        productDescription: "",
      };
      console.log(res[0].gst_rate);
      // ////////////////////////////////////////////////
      const update = [...productAmount];
      update[index].amount = 0;
      update[index].per = 0;
      var taxableamount=0;
      var totalAmount=0;
      for (let row of updatedRows) {
        totalAmount += parseFloat(row.total);
         taxableamount += parseFloat(row.taxable_amount);
      }
      const gstSum = parseFloat(
        updateTax.reduce((acc, val) => acc + parseFloat(val || 0), 0).toFixed(2)
      );
      setGstSu((parseFloat(gstSum)));
      setAddTotal(totalAmount.toFixed(2));
      setTaxableAmount((parseFloat(taxableamount)).toFixed(2));
      setProductAmount(update);
      setGstRateS(updateGst);
      setProductRows(updatedRows);
      setTaxAmount(updateTax);
      console.log(updateTax);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };
  const [addTotal, setAddTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [qty, setQty] = useState(0);
  var qtyy = 0;
  const [AmountWords, setAmountWords] = useState("");
  // const handleQuantityChange = (index, quantity, getNotify) => {
  //   var subTotalll = 0;
  //   if (getNotify == "qtyChange") {
  //     const updatedRows = [...productRows];
  //     updatedRows[index].quantity = quantity;
  //     updatedRows[index].total = updatedRows[index].gstCalculate * quantity; // Update total based on quantity
  //     setProductRows(updatedRows);
  //     setAddTotal(0);
  //     setSubTotal(0);
  //     var totall = 0;
  //     var subTotall = 0;
  //     var num = 0;
  //     for (var i of productRows) {
  //       subTotall = subTotall + parseFloat(i.unitPrice);
  //       totall = totall + parseFloat(i.total);
  //       qtyy = qtyy + parseInt(i.quantity);
  //       // setAddTotal(addTotal+totall);
  //       if (productRows.length - 2 == num) {
  //         subTotalll = subTotall;
  //       }
  //       console.log(subTotalll);
  //       num++;
  //     }
  //     console.log(totall + "i ");
  //     setAddTotal(totall.toFixed(2));
  //     setSubTotal(subTotall);
  //     setQty(qtyy);
  //     // const word=toWords(parseFloat(totall,10));
  //     // setAmountWords(word.toUpperCase());
  //     // Handle crores
  //     let result = ""; // Initialize result as an empty string
  //     const units = ["", " lakh", " crore"];
  //     // Units for Indian numbering system

  //     if (totall >= 10000000) {
  //       // Check if num is 10 million or more
  //       console.log("working");
  //       const crores = Math.floor(totall / 10000000); // crores = 1
  //       result += toWords(crores) + units[2]; // result = "1 crore"
  //       totall %= 10000000; // num = 5000000
  //       setAmountWords(result.toUpperCase() + " RUPEES ONLY/-");
  //       console.log("add" + totall);
  //     }

  //     // Handle lakhs
  //     if (totall >= 100000) {
  //       // Check if num is 100,000 or more
  //       const lakhs = Math.floor(totall / 100000); // lakhs = 5
  //       result += (result ? " " : "") + toWords(lakhs) + units[1]; // result = "1 crore 5 lakh"
  //       totall %= 100000; // num = 0
  //       setAmountWords(result.toUpperCase() + " RUPEES ONLY/-");
  //       console.log("add" + totall);
  //     }
  //     // Handle thousands and below
  //     if (totall >= 0) {
  //       // Check if num is greater than 0
  //       console.log("working>0" + totall);
  //       const word = toWords(parseFloat(totall, 10));
  //       setAmountWords(
  //         result.toUpperCase() + " " + word.toUpperCase() + " RUPEES ONLY/-"
  //       );
  //     }
  //     console.log(result.trim()); // Output: "1 crore 5 lakh"
  //   } else if (getNotify == "remove") {
  //     const updatedRows = [...productRows];
  //     console.log(productRows[index]);
  //     updatedRows[index].quantity = 0;
  //     updatedRows[index].total = updatedRows[index].gstCalculate * 0; // Update total based on quantity
  //     setProductRows(updatedRows);
  //     setAddTotal(0);
  //     setSubTotal(0);
  //     var totall = 0;
  //     var subTotall = 0;
  //     // console.log(i);
  //     subTotall = subTotal - parseFloat(productRows[index].unitPrice);
  //     for (var i of productRows) {
  //       totall = totall + parseFloat(i.total);
  //       qtyy = qtyy + parseInt(i.quantity);
  //     }
  //     // setAddTotal(addTotal+totall);
  //     console.log(totall + "i ");
  //     setAddTotal(totall.toFixed(2));
  //     console.log(subTotall);
  //     setSubTotal(subTotall);
  //     setQty(qtyy);
  //     let result = ""; // Initialize result as an empty string
  //     const units = ["", " lakh", " crore"]; // Units for Indian numbering system
  //     if (totall >= 10000000) {
  //       // Check if num is 10 million or more
  //       console.log("working");
  //       const crores = Math.floor(totall / 10000000); // crores = 1
  //       result += toWords(crores) + units[2]; // result = "1 crore"
  //       totall %= 10000000; // num = 5000000
  //       setAmountWords(result.toUpperCase() + " RUPEES ONLY/-");
  //     }

  //     // Handle lakhs
  //     if (totall >= 100000) {
  //       // Check if num is 100,000 or more
  //       const lakhs = Math.floor(totall / 100000); // lakhs = 5
  //       result += (result ? " " : "") + toWords(lakhs) + units[1]; // result = "1 crore 5 lakh"
  //       totall %= 100000; // num = 0
  //       setAmountWords(result.toUpperCase() + " RUPEES ONLY/-");
  //       console.log("totall remaining" + totall);
  //     }
  //     // Handle thousands and below
  //     if (totall > 0) {
  //       // Check if num is greater than 0
  //       const word = toWords(parseFloat(totall, 10));
  //       setAmountWords(
  //         result.toUpperCase() + " " + word.toUpperCase() + " RUPEES ONLY/-"
  //       );
  //     }
  //     if (index == 0) {
  //       setAmountWords("zero");
  //     }

  //     console.log(result.trim()); // Output: "1 crore 5 lakh"
  //   }
  // };
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      tax_amount: "",
      businessDetail: [{}],
      partyDetail: [{}],
      bankDetails: "",
      invoice_prefix: "",
      invoice_number:"",
      sales_invoice_date: "",
      payment_terms: "",
      due_date: "",
      total_amount: "",
      add_notes: "",
      taxable_amount: "",
      sgstAmount: "",
      cgstAmount: "",
      perTaxAmount: [],
      // //////////////////////////////////////
      productdetail: [{}],
      product_Description: [],
    },
    onSubmit: (values) => {
      values.businessDetail = businessprofile;
      values.sgstAmount = gstAmount / 2;
      values.cgstAmount = gstAmount / 2;
      values.perTaxAmount = TaxAmount;
      values.taxable_amount = taxableAmount;
      values.bankDetails = bankDetails;
      values.payment_terms = paymentTerms;
      values.sales_invoice_date = date;
      values.add_notes = notes;
      values.total_amount = addTotal;
      values.due_date = dueDate;
      values.tax_amount=gstSu
        // values.gstRateS=gstRateS
      values.partyDetail = [
        selectedCustomer.customer_id,
        selectedCustomer.customer_name,
        selectedCustomer.billing_address,
        selectedCustomer.shipping_address,
      ];
      values.productdetail = productRows;
      values.product_Description = productDescription;
      values.invoice_prefix = invoicePrefix;
      values.invoice_number=invoiceNumber;
      // alert(JSON.stringify(values));
      const postInvoice = async () => {
        setLoader(true); // 🟢 Show loader before API call
        try {
          const res = await apiPost("/invoices", values);
          navigate("/invoices"); // On success
        } catch (error) {
          console.error("Failed to post invoice:", error);
        } finally {
          setLoader(false); // 🔴 Hide loader after success/fail
        }
      };
    
      postInvoice();
      console.log(values);
    },
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [display, setDisplay] = useState({ display: "block" });
  const [display1, setDisplay1] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const filteredCustomers = customer.filter((customer) =>
    customer.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (customer) => {
    setSelectedCustomer(customer);
    setIsDropdownOpen(false);
    setSearchTerm(""); // Clear search term
  };

  const handleShow = () => {
    setIsDropdownOpen(true);
    setDisplay1(false);
  };

  const handleChangeParty = () => {
    setSelectedCustomer(null);
    setIsDropdownOpen(true);
    setDisplay1(false);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);
  var gstSum = 0;
  const [gstSu, setGstSu] = useState(0);
  const [gstRateS, setGstRateS] = useState([]);
  const [showRupee, setShowRupee] = useState(false);
  const [showPer, setPer] = useState(false);
  const [taxableAmount, setTaxableAmount] = useState(0);
  const [gstAmount, setGstAmount] = useState(0);
  const [count,setCount]=useState(0);
  const [gstAmountPer, setGstAmountPer] = useState(0);
  // function handleChange(e, item, index, quantity, getNotify) {
  //   // Create copies of the current state
  //   let updatedRows = [...productRows];
  //   let updatedTax = [...TaxAmount];
  //   let totalAmount = 0;
  //   let taxableamount=0;
  //   let gstSumAmount = 0;

  //   // Handle GST change
  //   if (getNotify === "gstChange") {
  //     let gstSumPer=0;
  //     // Ensure discount_amountPer is defined and is a string
  //     const discountAmountPer = updatedRows[index].discount_amountPer;
  //     updatedRows[index].discount_amountPer=updatedRows[index].discount_amountPer+"_%";
  //     console.log(updatedRows[index].discount_amountPer);
  //     if (discountAmountPer !== "0_%" && discountAmountPer !== "0") {
  //         console.log("working");
  //         const spl=updatedRows[index].discount_amountPer.split("_");
  //         const spl1=spl[0];
  //         updatedRows[index].discount_amountPer=spl1;
  //         // console.log(spl1);
  //         const term = e.target.value.split("_");
  //     const gstRate = parseFloat(term[1]);

  //     // console.log(gstRate);
  //     const a1=((updatedRows[index].quantity*updatedRows[index].unitPrice));
  //     const a2=(((updatedRows[index].quantity*updatedRows[index].unitPrice)*spl1)/100);
  //     const discount=a1-a2;
  //     updatedRows[index].taxable_amount=discount;
  //     console.log(discount);
  //     const discount_amount=((a1)-discount);
  //     console.log(discount_amount);
  //     const tax_amount = ((discount) * gstRate) / 100;
  //     console.log(tax_amount);
  //     updatedRows[index].total = tax_amount + discount;
  //     console.log(updatedRows[index].total);
  //     updatedRows[index].gstRate = term[1];
  //     updatedTax[index] = tax_amount;
  //     for (let row of updatedRows) {
  //       totalAmount += parseFloat(row.total);
  //       taxableamount+=parseFloat(row.taxable_amount);
  //     }
  //     for (var j=0;j<updatedRows.length;j++) {
  //       if(updatedRows[j].gstRate==term[1])
  //       {
  //         gstSumPer+=1;
  //       }
  //     }
  //     console.log(gstSumPer);
  //     console.log("sum");
  //     for(var i=0;i<updatedTax.length;i++)
  //     {
  //       gstSumAmount+=parseFloat(updatedTax[i]);
  //     }
  //     console.log(updatedTax);

  //     // Calculate the total GST amount
  //     gstSum = updatedTax.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  //     // Update state
  //     console.log(gstSumAmount);
  //     setGstAmount(gstSumAmount);
  //     setGstAmountPer(gstSumPer);
  //     setTaxableAmount(taxableamount);
  //     setGstRateS([...gstRateS, term[1]]);
  //     setProductRows(updatedRows);
  //     setTaxAmount(updatedTax);
  //     setAddTotal(totalAmount.toFixed(2));
  //     setGstSu(gstSum);
  //     // const discount_amount=((updatedRows[index].quantity * updatedRows[index].unitPrice)-updatedRows[index].discount_amount);
  //     }
  //       else{
  //         const term = e.target.value.split("_");
  //     const gstRate = parseFloat(term[1]);
  //     console.log(updatedRows[index].discount_amount);

  //     const discount_amount=((updatedRows[index].quantity * updatedRows[index].unitPrice)-updatedRows[index].discount_amount);
  //     // setTaxableAmount(discount_amount);
  //     updatedRows[index].taxable_amount=discount_amount;
  //     console.log(discount_amount);
  //     const tax_amount = (((item.quantity * item.unitPrice)-updatedRows[index].discount_amount) * gstRate) / 100;
  //     // Update the total for the current row
  //     updatedRows[index].total = tax_amount + discount_amount;
  //     updatedRows[index].gstRate = term[1];
  //     updatedTax[index] = tax_amount;

  //     // Calculate the total amount for all rows
  //     for (let row of updatedRows) {
  //       totalAmount += parseFloat(row.total);
  //       taxableamount+=parseFloat(row.taxable_amount);
  //     }
  //     for (var j=0;j<updatedRows.length;j++) {
  //       if(updatedRows[j].gstRate==term[1])
  //       {
  //         gstSumPer+=1;
  //       }
  //     }
  //     console.log(gstSumPer);
  //     console.log("sum");
  //     for(var i=0;i<updatedTax.length;i++)
  //       {
  //         gstSumAmount+=parseFloat(updatedTax[i]);
  //       }

  //     // Calculate the total GST amount
  //     gstSum = updatedTax.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  //     // Update state
  //     setGstAmount(gstSumAmount);
  //     setGstAmountPer(gstSumPer);
  //     setTaxableAmount(taxableamount);
  //     setGstRateS([...gstRateS, term[1]]);
  //     setProductRows(updatedRows);
  //     setTaxAmount(updatedTax);
  //     setAddTotal(totalAmount.toFixed(2));
  //     setGstSu(gstSum);
  //       }
  //   }

  //   // Handle quantity change
  //   if (getNotify === "qtyChange") {
  //     // Update the quantity for the current row
  //     if(updatedRows[index].discount_amountPer!="0_%"){
  //       if(updatedRows[index].discount_amountPer!="0")
  //       {
  //         const updateDiscountAmount=[...productAmount];
  //         console.log("working discount per");
  //       const currentGstRate = gstRateS[index]? parseFloat(updatedRows[index].gstRate) : 0;
  //       updatedRows[index].discount_amountPer=updatedRows[index].discount_amountPer+"_%";
  //       console.log(quantity);
  //       updateDiscountAmount[index].amount=(parseFloat(updateDiscountAmount[index].per)*(quantity)*(updatedRows[index].unitPrice))/100;
  //       console.log(updateDiscountAmount);
  //       const spl=updatedRows[index].discount_amountPer.split("_");
  //       const spl1=spl[0];
  //       console.log(spl1);
  //       console.log("spl")
  //       updatedRows[index].discount_amountPer=spl1;
  //           updatedRows[index].quantity = quantity;
  //           console.log(updatedRows[index].quantity);
  //           const a1=((updatedRows[index].quantity*updatedRows[index].unitPrice));
  //           const a2=(((updatedRows[index].quantity*updatedRows[index].unitPrice)*spl1)/100);
  //           const discount=a1-a2;
  //           updatedRows[index].taxable_amount=discount;
  //           const tax_amount = ((discount) * currentGstRate) / 100;
  //           updatedRows[index].total = tax_amount + discount;
  //     console.log(updatedRows[index].total);
  //     updatedTax[index] = tax_amount;

  //     // Recalculate the total for the current row
  //     updatedRows[index].total = discount + tax_amount;

  //     // Calculate the total amount for all rows
  //     totalAmount = 0; // Reset totalAmount before recalculating
  //     for (let row of updatedRows) {
  //       totalAmount += parseFloat(row.total);
  //       taxableamount+=parseFloat(row.taxable_amount);
  //     }
  //     for(var i=0;i<updatedTax.length;i++)
  //       {
  //         gstSumAmount+=parseFloat(updatedTax[i]);
  //       }

  //     // Calculate the total GST amount
  //     gstSum = updatedTax.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  //     // Update state
  //     setGstAmount(gstSumAmount);
  //     setTaxableAmount(taxableamount);
  //     setProductRows(updatedRows);
  //     setTaxAmount(updatedTax);
  //     setAddTotal(totalAmount.toFixed(2));
  //     setGstSu(gstSum);
  //     }
  //     else{
  //       console.log("else block executingg");
  //       updatedRows[index].quantity = quantity;
  //       const updateDiscountAmount=[...productAmount];
  //       console.log(updatedRows[index].quantity);
  //      if(updatedRows[index].discount_amountPer=="0")
  //      {
  //       updatedRows[index].discount_amountPer=updatedRows[index].discount_amountPer+"_%";
  //       const spl=updatedRows[index].discount_amountPer.split("_");
  //       const spl1=spl[0];
  //       console.log(spl1);
  //       console.log("spl")
  //       updatedRows[index].discount_amountPer=spl1;
  //      }
  //     // Get the current GST rate for the row
  //     const currentGstRate = gstRateS[index]? parseFloat(updatedRows[index].gstRate) : 0;
  //     const discount_amount=((quantity * updatedRows[index].unitPrice)-updatedRows[index].discount_amount);
  //     updateDiscountAmount[index].per=((updateDiscountAmount[index].amount)/(quantity*updatedRows[index].unitPrice))*100;
  //     updateDiscountAmount[index].amount=(updatedRows[index].discount_amount);
  //     console.log(updateDiscountAmount);
  //     // setTaxableAmount(discount_amount);
  //     updatedRows[index].taxable_amount=discount_amount;
  //     // Recalculate the tax amount based on the new quantity
  //     const tax_amount = (((quantity * updatedRows[index].unitPrice)-updatedRows[index].discount_amount) * currentGstRate) / 100;
  //     updatedTax[index] = tax_amount;

  //     // Recalculate the total for the current row
  //     updatedRows[index].total = discount_amount + tax_amount;

  //     // Calculate the total amount for all rows
  //     totalAmount = 0; // Reset totalAmount before recalculating
  //     for (let row of updatedRows) {
  //       totalAmount += parseFloat(row.total);
  //       taxableamount+=parseFloat(row.taxable_amount);
  //     }
  //     for(var i=0;i<updatedTax.length;i++)
  //       {
  //         gstSumAmount+=parseFloat(updatedTax[i]);
  //       }

  //     // Calculate the total GST amount
  //     gstSum = updatedTax.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  //     // Update state
  //     setGstAmount(gstSumAmount);
  //     setTaxableAmount(taxableamount);
  //     setProductAmount(updateDiscountAmount);
  //     setProductRows(updatedRows);
  //     setTaxAmount(updatedTax);
  //     setAddTotal(totalAmount.toFixed(2));
  //     setGstSu(gstSum);
  //     }
  //   }
  //   else{
  //     console.log("else block executing");
  //     const updateDiscountAmount=[...productAmount];
  //     updatedRows[index].quantity = quantity;
  //     console.log(updatedRows[index].quantity);
  //     if(updatedRows[index].discount_amountPer=="0_%")
  //     {
  //       updatedRows[index].discount_amountPer=updatedRows[index].discount_amountPer+"_%";
  //       const spl=updatedRows[index].discount_amountPer.split("_");
  //       const spl1=spl[0];
  //       console.log(spl1);
  //       console.log("spl")
  //       updatedRows[index].discount_amountPer=spl1;
  //     }
  //     if(updatedRows[index].discount_amount=="")
  //     {
  //       updatedRows[index].discount_amount="0";
  //       updateDiscountAmount[index].amount="0"
  //     }
  //   // Get the current GST rate for the row
  //   const currentGstRate = gstRateS[index]? parseFloat(updatedRows[index].gstRate) : 0;
  //   const discount_amount=((quantity * updatedRows[index].unitPrice)-updatedRows[index].discount_amount);
  //   updateDiscountAmount[index].per=((updateDiscountAmount[index].amount)/(quantity*updatedRows[index].unitPrice)*100);
  //   console.log(updateDiscountAmount);
  //   // setTaxableAmount(discount_amount);
  //   updatedRows[index].taxable_amount=discount_amount;
  //   // Recalculate the tax amount based on the new quantity
  //   const tax_amount = (((quantity * updatedRows[index].unitPrice)-updatedRows[index].discount_amount) * currentGstRate) / 100;
  //   updatedTax[index] = tax_amount;

  //   // Recalculate the total for the current row
  //   updatedRows[index].total = discount_amount + tax_amount;

  //   // Calculate the total amount for all rows
  //   totalAmount = 0; // Reset totalAmount before recalculating
  //   for (let row of updatedRows) {
  //     totalAmount += parseFloat(row.total);
  //     taxableamount+=parseFloat(row.taxable_amount);
  //   }
  //   for(var i=0;i<updatedTax.length;i++)
  //     {
  //       gstSumAmount+=parseFloat(updatedTax[i]);
  //     }

  //   // Calculate the total GST amount
  //   gstSum = updatedTax.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  //   // Update state
  //   setGstAmount(gstSumAmount);
  //   setTaxableAmount(taxableamount);
  //   setProductRows(updatedRows);
  //   setTaxAmount(updatedTax);
  //   setAddTotal(totalAmount.toFixed(2));
  //   setGstSu(gstSum);
  //   }
  //   }

  //   // Handle row removal
  //   if (getNotify === "remove") {
  //     const updatedRows = [...productRows];
  //     const updatedTax = [...TaxAmount];

  //     // Log the index and the row being removed for debugging
  //     console.log("Deleting row at index:", index);
  //     console.log("Row details before deletion:", updatedRows[index]);

  //     // Remove the row and corresponding tax amount
  //     updatedRows.splice(index, 1);
  //     updatedTax.splice(index, 1);
  //     console.log("Updated rows after deletion:", updatedRows);

  //     // Calculate the total amount for all remaining rows
  //     let totalAmount = 0; // Reset totalAmount before recalculating
  //     let taxableAmount = 0; // Reset taxableAmount before recalculating

  //     for (let row of updatedRows) {
  //         totalAmount += parseFloat(row.total) || 0; // Ensure to handle NaN
  //         taxableAmount += parseFloat(row.taxable_amount) || 0; // Ensure to handle NaN
  //     }

  //     // Calculate GST sum from the updated tax array
  //     const gstSum = updatedTax.reduce((accumulator, currentValue) => accumulator + (parseFloat(currentValue) || 0), 0);

  //     // Update state with the new values
  //     setTaxableAmount(taxableAmount);
  //     setGstSu(gstSum);
  //     setProductRows(updatedRows); // This will not immediately reflect in productRows
  //     setTaxAmount(updatedTax);
  //     setAddTotal(totalAmount.toFixed(2)); // Format totalAmount to two decimal places

  //     // Log the updated state (this will not show the updated state immediately)
  //     console.log("Product rows after update (may not reflect immediately):", productRows);
  // }

  // // To see the updated productRows, you can use a useEffect hook
  //   if(getNotify=="discount")
  //   {
  //     if(e.target.name=="rupe")
  //     {
  //       const updateDiscountAmount=[...productAmount];
  //       setShowRupee(true);
  //       setPer(false);
  //     // const term = e.target.value.split("_");
  //     // const gstRate = parseFloat(term[1]);
  //     updatedRows[index].discount_amountPer="0"
  //     const discount_amount=(e.target.value!=isNaN)?e.target.value:0;
  //     updatedRows[index].discount_amount=parseFloat(discount_amount);
  //     updateDiscountAmount[index].per=(discount_amount/(item.quantity*item.unitPrice))*100;
  //     updateDiscountAmount[index].amount=discount_amount;
  //     console.log(updateDiscountAmount);
  //     console.log("calculating");
  //     const disamount=(item.quantity*item.unitPrice)-discount_amount;
  //     // setTaxableAmount(disamount);
  //     updatedRows[index].taxable_amount=disamount;
  //     console.log(disamount);
  //     console.log(gstRateS);
  //     const currentGstRate = gstRateS[index]? parseFloat(updatedRows[index].gstRate) : 0;
  //     const tax_amount = (disamount * currentGstRate) / 100;
  //     console.log(currentGstRate);
  //     console.log(tax_amount);

  //     // Update the total for the current row
  //     updatedRows[index].total = tax_amount + disamount;
  //     updatedTax[index] = tax_amount;
  //     // updatedRows[index].gstRate = term[1];

  //     // Calculate the total amount for all rows
  //     for (let row of updatedRows) {
  //       totalAmount += parseFloat(row.total);
  //       taxableamount+=parseFloat(row.taxable_amount);
  //     }
  //     for(var i=0;i<updatedTax.length;i++)
  //       {
  //         gstSumAmount+=parseFloat(updatedTax[i]);
  //       }

  //     // // Calculate the total GST amount
  //     gstSum = updatedTax.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  //     // // Update state
  //     // setGstRateS([...gstRateS, term[1]]);
  //     setProductAmount(updateDiscountAmount);
  //     setGstAmount(gstSumAmount);
  //     setTaxableAmount(taxableamount);
  //     setProductRows(updatedRows);
  //     setTaxAmount(updatedTax);
  //     setAddTotal(totalAmount.toFixed(2));
  //     setGstSu(gstSum);
  //   }
  //   if(e.target.name=="per")
  //   {   setPer(true);
  //       setShowRupee(false);
  //       const add=e.target.value+"_%"
  //       const spli=add.split("_");
  //       const spl1=spli[0];
  //       const updateDiscountAmount=[...productAmount];
  //     const discount_amount=spl1;
  //     if(e.target.value=="")
  //     {
  //       updatedRows[index].discount_amountPer="0_%";
  //       updateDiscountAmount[index].amount="0";
  //     }
  //     else{
  //     updatedRows[index].discount_amountPer=spl1;
  //     updateDiscountAmount[index].amount=(spl1*item.quantity*item.unitPrice)/100;
  //     updateDiscountAmount[index].per=(spl1);
  //     console.log(updateDiscountAmount);
  //     updatedRows[index].discount_amount="0";
  //     }
  //     console.log(updatedRows[index].discount_amountPer);
  //     const disamount=((item.quantity*item.unitPrice)-(((item.quantity*item.unitPrice)*discount_amount)/100));
  //     updatedRows[index].taxable_amount=disamount;
  //     // updatedRows[index].discount_amount=disamount;
  //     console.log(disamount);
  //     console.log(gstRateS);
  //     const currentGstRate = gstRateS[index]? parseFloat(updatedRows[index].gstRate) : 0;
  //     const tax_amount = (disamount * currentGstRate) / 100;
  //     console.log(currentGstRate);
  //     console.log(tax_amount);

  //     // Update the total for the current row
  //     updatedRows[index].total = tax_amount + disamount;
  //     updatedTax[index] = tax_amount;
  //     // updatedRows[index].gstRate = term[1];

  //     // Calculate the total amount for all rows
  //     for (let row of updatedRows) {
  //       totalAmount += parseFloat(row.total);
  //       taxableamount+=parseFloat(row.taxable_amount);
  //     }
  //     for(var i=0;i<updatedTax.length;i++)
  //       {
  //         gstSumAmount+=parseFloat(updatedTax[i]);
  //       }

  //     // // Calculate the total GST amount
  //     gstSum = updatedTax.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  //     // // Update state
  //     // setGstRateS([...gstRateS, term[1]]);
  //     setGstAmount(gstSumAmount);
  //     setProductAmount(updateDiscountAmount);
  //     setTaxableAmount(taxableamount);
  //     setProductRows(updatedRows);
  //     setTaxAmount(updatedTax);
  //     setAddTotal(totalAmount.toFixed(2));
  //     setGstSu(gstSum);
  //   }
  // }
  // }

  function handleChange(e, item, index, quantity, getNotify) {
    // Create copies of the current state
    let updatedRows = [...productRows];
    let updatedTax = [...TaxAmount];
    let totalAmount = 0;
    let taxableamount = 0;
    let gstSumAmount = 0;
    // Handle GST change
    if (getNotify === "gstChange") {
      setCount(1);
      let gstSumPer = 0;
      // Ensure discount_amountPer is defined and is a string
      const discountAmountPer = updatedRows[index].discount_amountPer;
      updatedRows[index].discount_amountPer =
        updatedRows[index].discount_amountPer + "_%";
      console.log(updatedRows[index].discount_amountPer);
      if (discountAmountPer !== "0_%" && discountAmountPer !== "0") {
        console.log("working");
        const spl = updatedRows[index].discount_amountPer.split("_");
        const spl1 = spl[0];
        updatedRows[index].discount_amountPer = spl1;
        // console.log(spl1);
        const term = e.target.value.split("_");
        const gstRate = parseFloat(term[1]);

        // console.log(gstRate);
        const a1 =
          parseFloat(updatedRows[index].quantity) *
          parseFloat(updatedRows[index].unitPrice);
        console.log(a1);
        const a2 =
          (parseFloat(updatedRows[index].quantity) *
            parseFloat(updatedRows[index].unitPrice) *
            parseFloat(spl1)) /
          100;
        console.log(a2);
        const discount = a1 - a2;
        updatedRows[index].taxable_amount = (parseFloat(discount)).toFixed(2);
        console.log(discount);
        const discount_amount = a1 - discount;
        console.log(discount_amount);
        const tax_amount = (discount * gstRate) / 100;
        console.log(tax_amount);
        updatedRows[index].total = (parseFloat(tax_amount + discount)).toFixed(2);
        console.log(updatedRows[index].total);
        updatedRows[index].gstRate = term[1];
        updatedTax[index] = (parseFloat(tax_amount)).toFixed(2);
        for (let row of updatedRows) {
          totalAmount += parseFloat(row.total);
           taxableamount += parseFloat(row.taxable_amount);
        }
        for (var j = 0; j < updatedRows.length; j++) {
          if (updatedRows[j].gstRate == term[1]) {
            gstSumPer += 1;
          }
        }
        console.log(gstSumPer);
        console.log("sum");
        for (var i = 0; i < updatedTax.length; i++) {
          gstSumAmount += parseFloat(updatedTax[i]);
        }
        console.log(updatedTax);

        // Calculate the total GST amount
        const gstSum = parseFloat(
          updatedTax.reduce((acc, val) => acc + parseFloat(val || 0), 0).toFixed(2)
        );
        const gstR=[...gstRateS];
        gstR[index]=term[1];

        // Update state
        console.log(gstSumAmount);
        setGstAmount((parseFloat(gstSumAmount)).toFixed(2));
        setGstAmountPer((parseFloat(gstSumPer)).toFixed(2));
        setTaxableAmount((parseFloat(taxableamount)).toFixed(2));
        setGstRateS((parseFloat(gstR)).toFixed(2));
        setProductRows(updatedRows);
        setTaxAmount(updatedTax);
        setAddTotal(totalAmount.toFixed(2));
        setGstSu((parseFloat(gstSum)));
        // const discount_amount=((updatedRows[index].quantity * updatedRows[index].unitPrice)-updatedRows[index].discount_amount);
      } else {
        const term = e.target.value.split("_");
        const gstRate = parseFloat(term[1]);
        console.log(updatedRows[index].discount_amount);

        const discount_amount =
          updatedRows[index].quantity * updatedRows[index].unitPrice -
          updatedRows[index].discount_amount;
        // setTaxableAmount(discount_amount);
        updatedRows[index].taxable_amount = (parseFloat(discount_amount)).toFixed(2);
        console.log(discount_amount);
        const tax_amount =
          ((item.quantity * item.unitPrice -
            updatedRows[index].discount_amount) *
            gstRate) /
          100;
        // Update the total for the current row
        updatedRows[index].total = (parseFloat(tax_amount + discount_amount)).toFixed(2)
        updatedRows[index].gstRate = term[1];
        updatedTax[index] = (parseFloat(tax_amount)).toFixed(2);

        // Calculate the total amount for all rows
        for (let row of updatedRows) {
          totalAmount += parseFloat(row.total);
           taxableamount += parseFloat(row.taxable_amount);
        }
        for (var j = 0; j < updatedRows.length; j++) {
          if (updatedRows[j].gstRate == term[1]) {
            gstSumPer += 1;
          }
        }
        console.log(gstSumPer);
        console.log("sum");
        for (var i = 0; i < updatedTax.length; i++) {
          gstSumAmount += parseFloat(updatedTax[i]);
        }

        // Calculate the total GST amount
        const gstSum = parseFloat(
  updatedTax.reduce((acc, val) => acc + parseFloat(val || 0), 0).toFixed(2)
);
        const gstR=[...gstRateS];
        gstR[index]=term[1];
        // Update state
        // setGstAmount(gstSumAmount);
        // setGstAmountPer(gstSumPer);
        // setTaxableAmount(taxableamount);
        // setGstRateS(gstR);
        // setProductRows(updatedRows);
        // setTaxAmount(updatedTax);
        // setAddTotal(totalAmount.toFixed(2));
        // setGstSu(gstSum);
        setGstAmount((parseFloat(gstSumAmount)).toFixed(2));
        setGstAmountPer((parseFloat(gstSumPer)).toFixed(2));
        setTaxableAmount((parseFloat(taxableamount)).toFixed(2));
        setGstRateS((parseFloat(gstR)).toFixed(2));
        setProductRows(updatedRows);
        setTaxAmount(updatedTax);
        setAddTotal(totalAmount.toFixed(2));
        setGstSu((parseFloat(gstSum)));
      }
    }

    // Handle quantity change
    if (getNotify === "qtyChange") {
      // Update the quantity for the current row
      if (updatedRows[index].discount_amountPer != "0_%") {
        if (updatedRows[index].discount_amountPer != "0") {
          const updateDiscountAmount = [...productAmount];
          console.log("working discount per");
          const currentGstRate = gstRateS[index]
            ? parseFloat(updatedRows[index].gstRate)
            : 0;
          updatedRows[index].discount_amountPer =
            updatedRows[index].discount_amountPer + "_%";
          console.log(quantity);
          quantity=quantity==""?0:quantity;
          updateDiscountAmount[index].amount =
            (parseFloat(updateDiscountAmount[index].per) *
              quantity *
              updatedRows[index].unitPrice) /
            100;
          console.log(updateDiscountAmount);
          const spl = updatedRows[index].discount_amountPer.split("_");
          const spl1 = spl[0];
          console.log(spl1);
          console.log("spl");
          updatedRows[index].discount_amountPer = spl1;
          updatedRows[index].quantity = quantity;
          console.log(updatedRows[index].quantity);
          const a1 =
            parseFloat(updatedRows[index].quantity) *
            parseFloat(updatedRows[index].unitPrice);
          console.log(a1);
          const a2 =
            (parseFloat(updatedRows[index].quantity) *
              parseFloat(updatedRows[index].unitPrice) *
              parseFloat(spl1)) /
            100;
          console.log(a2);
          const discount = a1 - a2;
          updatedRows[index].taxable_amount = (parseFloat(discount)).toFixed(2)
          const tax_amount = (discount * currentGstRate) / 100;
          updatedRows[index].total = (parseFloat(tax_amount + discount)).toFixed(2)
          console.log(updatedRows[index].total);
          updatedTax[index] = (parseFloat(tax_amount)).toFixed(2);

          // Recalculate the total for the current row
          updatedRows[index].total = (parseFloat(tax_amount + discount)).toFixed(2)

          // Calculate the total amount for all rows
          totalAmount = 0; // Reset totalAmount before recalculating
          for (let row of updatedRows) {
            totalAmount += parseFloat(row.total);
            taxableamount += parseFloat(row.taxable_amount);
          }
          console.log(taxableamount);
          for (var i = 0; i < updatedTax.length; i++) {
            gstSumAmount += parseFloat(updatedTax[i]);
          }

          // Calculate the total GST amount
         const gstSum = parseFloat(
  updatedTax.reduce((acc, val) => acc + parseFloat(val || 0), 0).toFixed(2)
);

          // Update state
          // setGstAmount(gstSumAmount);
          // setTaxableAmount(taxableamount);
          // setProductRows(updatedRows);
          // setTaxAmount(updatedTax);
          // setAddTotal(totalAmount.toFixed(2));
          // setGstSu(gstSum);
          setGstAmount((parseFloat(gstSumAmount)).toFixed(2));
          setTaxableAmount((parseFloat(taxableamount)).toFixed(2));
          setProductRows(updatedRows);
          setTaxAmount(updatedTax);
          setAddTotal(totalAmount.toFixed(2));
          setGstSu((parseFloat(gstSum)));
        } else {
          console.log("else block executingg");
          updatedRows[index].quantity = quantity;
          const updateDiscountAmount = [...productAmount];
          console.log(updatedRows[index].quantity);
          if (updatedRows[index].discount_amountPer == "0") {
            updatedRows[index].discount_amountPer =
              updatedRows[index].discount_amountPer + "_%";
            const spl = updatedRows[index].discount_amountPer.split("_");
            const spl1 = spl[0];
            console.log(spl1);
            console.log("spl");
            updatedRows[index].discount_amountPer = spl1;
          }
          // Get the current GST rate for the row
          const currentGstRate = gstRateS[index]
            ? parseFloat(updatedRows[index].gstRate)
            : 0;
          const discount_amount =
            quantity * updatedRows[index].unitPrice -
            updatedRows[index].discount_amount;
          updateDiscountAmount[index].per =
            ((parseFloat(updateDiscountAmount[index].amount)).toFixed(2) /
              (quantity * (parseFloat(updatedRows[index].unitPrice))).toFixed(2)) *
            100;
          updateDiscountAmount[index].amount =
            (parseFloat(updatedRows[index].discount_amount)).toFixed(2);
          console.log(updateDiscountAmount);
          // setTaxableAmount(discount_amount);
          updatedRows[index].taxable_amount = (parseFloat(discount_amount)).toFixed(2);
          // Recalculate the tax amount based on the new quantity
          const tax_amount =
            ((quantity * updatedRows[index].unitPrice -
              updatedRows[index].discount_amount) *
              currentGstRate) /
            100;
          updatedTax[index] = (parseFloat(tax_amount)).toFixed(2);

          // Recalculate the total for the current row
          updatedRows[index].total = (parseFloat(tax_amount + discount_amount)).toFixed(2)

          // Calculate the total amount for all rows
          totalAmount = 0; // Reset totalAmount before recalculating
          for (let row of updatedRows) {
            totalAmount += parseFloat(row.total);
             taxableamount += parseFloat(row.taxable_amount);
          }
          for (var i = 0; i < updatedTax.length; i++) {
            gstSumAmount += parseFloat(updatedTax[i]);
          }

          // Calculate the total GST amount
          const gstSum = parseFloat(
  updatedTax.reduce((acc, val) => acc + parseFloat(val || 0), 0).toFixed(2)
);

          // Update state
          // setGstAmount(gstSumAmount);
          // setTaxableAmount(taxableamount);
          // setProductAmount(updateDiscountAmount);
          // setProductRows(updatedRows);
          // setTaxAmount(updatedTax);
          // setAddTotal(totalAmount.toFixed(2));
          // setGstSu(gstSum);
          setGstAmount((parseFloat(gstSumAmount)).toFixed(2));
          setTaxableAmount((parseFloat(taxableamount)).toFixed(2));
          setProductAmount(updateDiscountAmount);
          setProductRows(updatedRows);
          setTaxAmount(updatedTax);
          setAddTotal(totalAmount.toFixed(2));
          setGstSu((parseFloat(gstSum)));
        }
      } else {
        console.log("else block executing");
        const updateDiscountAmount = [...productAmount];
        updatedRows[index].quantity = quantity;
        console.log(updatedRows[index].quantity);
        if (updatedRows[index].discount_amountPer == "0_%") {
          updatedRows[index].discount_amountPer =
            updatedRows[index].discount_amountPer + "_%";
          const spl = updatedRows[index].discount_amountPer.split("_");
          const spl1 = spl[0];
          console.log(spl1);
          console.log("spl");
          updatedRows[index].discount_amountPer = spl1;
        }
        if (updatedRows[index].discount_amount == "") {
          updatedRows[index].discount_amount = "0";
          updateDiscountAmount[index].amount = "0";
        }
        // Get the current GST rate for the row
        const currentGstRate = gstRateS[index]
          ? parseFloat(updatedRows[index].gstRate)
          : 0;
        const discount_amount =
          quantity * updatedRows[index].unitPrice -
          updatedRows[index].discount_amount;
        // updateDiscountAmount[index].per =
        //   (updateDiscountAmount[index].amount /
        //     (quantity * updatedRows[index].unitPrice)) *
        //   100;
        updateDiscountAmount[index].per =
        ((parseFloat(updateDiscountAmount[index].amount)).toFixed(2) /
          (quantity * (parseFloat(updatedRows[index].unitPrice))).toFixed(2)) *
        100;
        console.log(updateDiscountAmount);
        // setTaxableAmount(discount_amount);
        updatedRows[index].taxable_amount = (parseFloat(discount_amount)).toFixed(2);
        // Recalculate the tax amount based on the new quantity
        const tax_amount =
          ((quantity * updatedRows[index].unitPrice -
            updatedRows[index].discount_amount) *
            currentGstRate) /
          100;
          updatedTax[index] = (parseFloat(tax_amount)).toFixed(2);

        // Recalculate the total for the current row
        updatedRows[index].total = (parseFloat(tax_amount + discount_amount)).toFixed(2)

        // Calculate the total amount for all rows
        totalAmount = 0; // Reset totalAmount before recalculating
        for (let row of updatedRows) {
          totalAmount += parseFloat(row.total);
           taxableamount += parseFloat(row.taxable_amount);
        }
        for (var i = 0; i < updatedTax.length; i++) {
          gstSumAmount += parseFloat(updatedTax[i]);
        }

        // Calculate the total GST amount
        const gstSum = parseFloat(
  updatedTax.reduce((acc, val) => acc + parseFloat(val || 0), 0).toFixed(2)
);

        // Update state
        // setGstAmount(gstSumAmount);
        // setTaxableAmount(taxableamount);
        // setProductRows(updatedRows);
        // setTaxAmount(updatedTax);
        // setAddTotal(totalAmount.toFixed(2));
        // setGstSu(gstSum);
        setGstAmount((parseFloat(gstSumAmount)).toFixed(2));
        setTaxableAmount((parseFloat(taxableamount)).toFixed(2));
        setProductRows(updatedRows);
        setTaxAmount(updatedTax);
        setAddTotal(totalAmount.toFixed(2));
        setGstSu((parseFloat(gstSum)));
      }
    }

    // Handle row removal
    if (getNotify === "remove") {
      const updatedRows = [...productRows];
      const updatedTax = [...TaxAmount];

      // Log the index and the row being removed for debugging
      console.log("Deleting row at index:", index);
      console.log("Row details before deletion:", updatedRows[index]);

      // Remove the row and corresponding tax amount
      updatedRows.splice(index, 1);
      updatedTax.splice(index, 1);
      console.log("Updated rows after deletion:", updatedRows);

      // Calculate the total amount for all remaining rows
      let totalAmount = 0; // Reset totalAmount before recalculating
      let taxableAmount = 0; // Reset taxableAmount before recalculating

      for (let row of updatedRows) {
        totalAmount += parseFloat(row.total) || 0; // Ensure to handle NaN
        taxableAmount += (parseFloat(row.taxable_amount)).toFixed(2) || 0; // Ensure to handle NaN
      }

      // Calculate GST sum from the updated tax array
      const gstSum = updatedTax.reduce(
        (accumulator, currentValue) =>
          accumulator + (parseFloat(currentValue) || 0),
        0
      );

      // Update state with the new values
      setTaxableAmount(taxableAmount);
      setGstSu(gstSum);
      setProductRows(updatedRows); // This will not immediately reflect in productRows
      setTaxAmount(updatedTax);
      setAddTotal(totalAmount.toFixed(2)); // Format totalAmount to two decimal places

      // Log the updated state (this will not show the updated state immediately)
      console.log(
        "Product rows after update (may not reflect immediately):",
        productRows
      );
    }

    // To see the updated productRows, you can use a useEffect hook
    if (getNotify == "discount") {
      if (e.target.name == "rupe") {
        
        const updateDiscountAmount = [...productAmount];
        setShowRupee(true);
        setPer(false);
        // const term = e.target.value.split("_");
        // const gstRate = parseFloat(term[1]);
        updatedRows[index].discount_amountPer = "0";
        console.log(e.target.value);
        console.log("i am rupe")
        const discount_amoun = e.target.value != isNaN ? e.target.value : 0;
        const discount_amount=discount_amoun==""?0:discount_amoun
        console.log(discount_amount);
        updatedRows[index].discount_amount = (parseFloat(discount_amount)).toFixed(2);
        updateDiscountAmount[index].per =
          (parseFloat((discount_amount / (item.quantity * item.unitPrice)) * 100)).toFixed(2);
        updateDiscountAmount[index].amount = (parseFloat(discount_amount)).toFixed(2);
        console.log(updateDiscountAmount);
        console.log("calculating");
        const disamount = item.quantity * item.unitPrice - discount_amount;
        // setTaxableAmount(disamount);
        updatedRows[index].taxable_amount = (parseFloat(disamount)).toFixed(2);
        console.log(disamount);
        console.log(gstRateS);
        const currentGstRate = gstRateS[index]
          ? parseFloat(updatedRows[index].gstRate)
          : 0;
        const tax_amount = (disamount * currentGstRate) / 100;
        console.log(currentGstRate);
        console.log(tax_amount);

        // Update the total for the current row
        updatedRows[index].total = (parseFloat(tax_amount + disamount)).toFixed(2)
        updatedTax[index] = (parseFloat(tax_amount)).toFixed(2);
        // updatedRows[index].gstRate = term[1];

        // Calculate the total amount for all rows
        for (let row of updatedRows) {
          totalAmount += parseFloat(row.total);
           taxableamount += parseFloat(row.taxable_amount);
        }
        for (var i = 0; i < updatedTax.length; i++) {
          gstSumAmount += parseFloat(updatedTax[i]);
        }

        // // Calculate the total GST amount
       const gstSum = parseFloat(
  updatedTax.reduce((acc, val) => acc + parseFloat(val || 0), 0).toFixed(2)
);

        // // Update state
        // setGstRateS([...gstRateS, term[1]]);
        // setProductAmount(updateDiscountAmount);
        // setGstAmount(gstSumAmount);
        // setTaxableAmount(taxableamount);
        // setProductRows(updatedRows);
        // setTaxAmount(updatedTax);
        // setAddTotal(totalAmount.toFixed(2));
        // setGstSu(gstSum);
        setGstAmount((parseFloat(gstSumAmount)).toFixed(2));
        setProductAmount(updateDiscountAmount);
        setTaxableAmount((parseFloat(taxableamount)).toFixed(2));
        setProductRows(updatedRows);
        setTaxAmount(updatedTax);
        setAddTotal(totalAmount.toFixed(2));
        setGstSu((parseFloat(gstSum)));
      }
      if (e.target.name == "per") {
        setPer(true);
        setShowRupee(false);
        const add = e.target.value + "_%";
        console.log(add);
        const spli = add.split("_");
        const spl1 = spli[0];
        const updateDiscountAmount = [...productAmount];
        const discount_amount = spl1;
        if (e.target.value == "") {
          updatedRows[index].discount_amountPer = "0_%";
          updateDiscountAmount[index].amount = "0";
        } else {
          updatedRows[index].discount_amountPer = (parseFloat(spl1)).toFixed(2);
          updateDiscountAmount[index].amount =
            (parseFloat((spl1 * item.quantity * item.unitPrice) / 100)).toFixed(2);
          updateDiscountAmount[index].per = (parseFloat(spl1)).toFixed(2);
          console.log(updateDiscountAmount);
          updatedRows[index].discount_amount = "0";
        }
        console.log(updatedRows[index].discount_amountPer);
        const disamount =
          item.quantity * item.unitPrice -
          (item.quantity * item.unitPrice * discount_amount) / 100;
        updatedRows[index].taxable_amount = (parseFloat(disamount)).toFixed(2);
        // updatedRows[index].discount_amount=disamount;
        console.log(disamount);
        console.log(gstRateS);
        const currentGstRate = gstRateS[index]
          ? parseFloat(updatedRows[index].gstRate)
          : 0;
        const tax_amount = (disamount * currentGstRate) / 100;
        console.log(currentGstRate);
        console.log(tax_amount);

        // Update the total for the current row
        updatedRows[index].total = (parseFloat(tax_amount + disamount)).toFixed(2)
        updatedTax[index] = (parseFloat(tax_amount)).toFixed(2);
        // updatedRows[index].gstRate = term[1];

        // Calculate the total amount for all rows
        for (let row of updatedRows) {
          totalAmount += parseFloat(row.total);
           taxableamount += parseFloat(row.taxable_amount);
        }
        for (var i = 0; i < updatedTax.length; i++) {
          gstSumAmount += parseFloat(updatedTax[i]);
        }

        // // Calculate the total GST amount
        const gstSum = parseFloat(
  updatedTax.reduce((acc, val) => acc + parseFloat(val || 0), 0).toFixed(2)
);

        // // Update state
        // setGstRateS([...gstRateS, term[1]]);
        // setGstAmount(gstSumAmount);
        // setProductAmount(updateDiscountAmount);
        // setTaxableAmount(taxableamount);
        // setProductRows(updatedRows);
        // setTaxAmount(updatedTax);
        // setAddTotal(totalAmount.toFixed(2));
        // setGstSu(gstSum);
        setGstAmount((parseFloat(gstSumAmount)).toFixed(2));
        setProductAmount(updateDiscountAmount);
        setTaxableAmount((parseFloat(taxableamount)).toFixed(2));
        setProductRows(updatedRows);
        setTaxAmount(updatedTax);
        setAddTotal(totalAmount.toFixed(2));
        setGstSu((parseFloat(gstSum)));
      }
    }
    if (getNotify == "unitchange") {
      console.log(e.target.value);
      console.log("unit Price working");
      if (updatedRows[index].discount_amountPer != "0_%") {
        if (updatedRows[index].discount_amountPer != "0") {
          const updateDiscountAmount = [...productAmount];
          console.log("working discount per");
          updatedRows[index].unitPrice = e.target.value;
          const currentGstRate = gstRateS[index]
            ? parseFloat(updatedRows[index].gstRate)
            : 0;
          updatedRows[index].discount_amountPer =
            updatedRows[index].discount_amountPer + "_%";
          console.log(quantity);
          updateDiscountAmount[index].amount =
            (parseFloat((parseFloat(updateDiscountAmount[index].per) *
              updatedRows[index].quantity *
              updatedRows[index].unitPrice) /
            100)).toFixed(2);
          console.log(updateDiscountAmount);
          const spl = updatedRows[index].discount_amountPer.split("_");
          const spl1 = spl[0];
          console.log(spl1);
          console.log("spl");
          updatedRows[index].discount_amountPer = (parseFloat(spl1)).toFixed(2);
          console.log(updatedRows[index].unitPrice);
          const a1 =
            parseFloat(updatedRows[index].quantity) *
            parseFloat(updatedRows[index].unitPrice);
          console.log(a1);
          const a2 =
            (parseFloat(updatedRows[index].quantity) *
              parseFloat(updatedRows[index].unitPrice) *
              parseFloat(spl1)) /
            100;
          console.log(a2);
          const discount = a1 - a2;
          updatedRows[index].taxable_amount = (parseFloat(discount)).toFixed(2)
          const tax_amount = (discount * currentGstRate) / 100;
          updatedRows[index].total = (parseFloat(tax_amount + discount)).toFixed(2)
          console.log(updatedRows[index].total);
          updatedTax[index] = (parseFloat(tax_amount)).toFixed(2);

          // Recalculate the total for the current row
          updatedRows[index].total = (parseFloat(tax_amount + discount)).toFixed(2)

          // Calculate the total amount for all rows
          totalAmount = 0; // Reset totalAmount before recalculating
          for (let row of updatedRows) {
            totalAmount += parseFloat(row.total);
             taxableamount += parseFloat(row.taxable_amount);
          }
          for (var i = 0; i < updatedTax.length; i++) {
            gstSumAmount += parseFloat(updatedTax[i]);
          }

          // Calculate the total GST amount
          const gstSum = parseFloat(
  updatedTax.reduce((acc, val) => acc + parseFloat(val || 0), 0).toFixed(2)
);

          // Update state
          // setGstAmount(gstSumAmount);
          // setTaxableAmount(taxableamount);
          // setProductRows(updatedRows);
          // setTaxAmount(updatedTax);
          // setAddTotal(totalAmount.toFixed(2));
          // setGstSu(gstSum);
          setGstAmount((parseFloat(gstSumAmount)).toFixed(2));
          setTaxableAmount((parseFloat(taxableamount)).toFixed(2));
          setProductRows(updatedRows);
          setTaxAmount(updatedTax);
          setAddTotal(totalAmount.toFixed(2));
          setGstSu((parseFloat(gstSum)));
        } else {
          console.log("else block executingg");
          const quantity = parseFloat(updatedRows[index].quantity);
          updatedRows[index].unitPrice = e.target.value;
          const updateDiscountAmount = [...productAmount];
          console.log(updatedRows[index].unitPrice);
          if (updatedRows[index].discount_amountPer == "0") {
            updatedRows[index].discount_amountPer =
              updatedRows[index].discount_amountPer + "_%";
            const spl = updatedRows[index].discount_amountPer.split("_");
            const spl1 = spl[0];
            console.log(spl1);
            console.log("spl");
            updatedRows[index].discount_amountPer = spl1;
          }
          // Get the current GST rate for the row
          const currentGstRate = gstRateS[index]
            ? parseFloat(updatedRows[index].gstRate)
            : 0;
          const discount_amount =
            quantity * updatedRows[index].unitPrice -
            updatedRows[index].discount_amount;
          updateDiscountAmount[index].per =
            (parseFloat(updateDiscountAmount[index].amount /
              (quantity * updatedRows[index].unitPrice)) *
            100).toFixed(2);
          updateDiscountAmount[index].amount =
            (parseFloat(updatedRows[index].discount_amount)).toFixed(2);
          console.log(updateDiscountAmount);
          // setTaxableAmount(discount_amount);
          updatedRows[index].taxable_amount = (parseFloat(discount_amount)).toFixed(2);
          // Recalculate the tax amount based on the new quantity
          const tax_amount =
            ((quantity * updatedRows[index].unitPrice -
              updatedRows[index].discount_amount) *
              currentGstRate) /
            100;
            updatedTax[index] = (parseFloat(tax_amount)).toFixed(2);

          // Recalculate the total for the current row
          updatedRows[index].total = (parseFloat(tax_amount + discount_amount)).toFixed(2)

          // Calculate the total amount for all rows
          totalAmount = 0; // Reset totalAmount before recalculating
          for (let row of updatedRows) {
            totalAmount += parseFloat(row.total);
             taxableamount += parseFloat(row.taxable_amount);
          }
          for (var i = 0; i < updatedTax.length; i++) {
            gstSumAmount += parseFloat(updatedTax[i]);
          }

          // Calculate the total GST amount
         const gstSum = parseFloat(
  updatedTax.reduce((acc, val) => acc + parseFloat(val || 0), 0).toFixed(2)
);

          // Update state
          // setGstAmount(gstSumAmount);
          // setTaxableAmount(taxableamount);
          // setProductAmount(updateDiscountAmount);
          // setProductRows(updatedRows);
          // setTaxAmount(updatedTax);
          // setAddTotal(totalAmount.toFixed(2));
          // setGstSu(gstSum);
          setGstAmount((parseFloat(gstSumAmount)).toFixed(2));
          setProductAmount(updateDiscountAmount);
          setTaxableAmount((parseFloat(taxableamount)).toFixed(2));
          setProductRows(updatedRows);
          setTaxAmount(updatedTax);
          setAddTotal(totalAmount.toFixed(2));
          setGstSu((parseFloat(gstSum)));
        }
      } else {
        console.log("else block executing");
        const updateDiscountAmount = [...productAmount];
        const quantity = parseFloat(updatedRows[index].quantity);
        updatedRows[index].unitPrice = e.target.value;
        console.log(updatedRows[index].unitPrice);
        if (updatedRows[index].discount_amountPer == "0_%") {
          updatedRows[index].discount_amountPer =
            updatedRows[index].discount_amountPer + "_%";
          const spl = updatedRows[index].discount_amountPer.split("_");
          const spl1 = spl[0];
          console.log(spl1);
          console.log("spl");
          updatedRows[index].discount_amountPer = spl1;
        }
        if (updatedRows[index].discount_amount == "") {
          updatedRows[index].discount_amount = "0";
          updateDiscountAmount[index].amount = "0";
        }
        // Get the current GST rate for the row
        const currentGstRate = gstRateS[index]
          ? parseFloat(updatedRows[index].gstRate)
          : 0;
        const discount_amount =
          quantity * updatedRows[index].unitPrice -
          updatedRows[index].discount_amount;
        updateDiscountAmount[index].per =
          ((parseFloat(updateDiscountAmount[index].amount /
            (quantity * updatedRows[index].unitPrice)) *
          100)).toFixed(2);
        console.log(updateDiscountAmount);
        // setTaxableAmount(discount_amount);
        updatedRows[index].taxable_amount = (parseFloat(discount_amount)).toFixed(2);
        // Recalculate the tax amount based on the new quantity
        const tax_amount =
          ((quantity * updatedRows[index].unitPrice -
            updatedRows[index].discount_amount) *
            currentGstRate) /
          100;
          updatedTax[index] = (parseFloat(tax_amount)).toFixed(2);

        // Recalculate the total for the current row
        updatedRows[index].total = (parseFloat(tax_amount + discount_amount)).toFixed(2)

        // Calculate the total amount for all rows
        totalAmount = 0; // Reset totalAmount before recalculating
        for (let row of updatedRows) {
          totalAmount += parseFloat(row.total);
           taxableamount += parseFloat(row.taxable_amount);
        }
        for (var i = 0; i < updatedTax.length; i++) {
          gstSumAmount += parseFloat(updatedTax[i]);
        }

        // Calculate the total GST amount
        const gstSum = parseFloat(
          updatedTax.reduce((acc, val) => acc + parseFloat(val || 0), 0).toFixed(2)
        );

        // Update state
        // setGstAmount(gstSumAmount);
        // setTaxableAmount(taxableamount);
        // setProductRows(updatedRows);
        // setTaxAmount(updatedTax);
        // setAddTotal(totalAmount.toFixed(2));
        // setGstSu(gstSum);
        setGstAmount((parseFloat(gstSumAmount)).toFixed(2));
        setTaxableAmount((parseFloat(taxableamount)).toFixed(2));
        setProductRows(updatedRows);
        setTaxAmount(updatedTax);
        setAddTotal(totalAmount.toFixed(2));
        setGstSu((parseFloat(gstSum)));
      }
    }
  }
  useEffect(() => {
    console.log("Updated productRows:", productRows);
  }, [productRows]);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState("");

  const toggleNotes = () => {
    setShowNotes((prevShowNotes) => !prevShowNotes);
  };

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bankDetails, setBankDetails] = useState({
    accountNumber: "427557535633",
    ifscCode: "BARB0MGRIND",
    bankBranch: "Bank of Baroda, MG ROAD, INDORE, MP",
    accountHolder: "Computer Mechanic",
  });

  const [accountNumber, setAccountNumber] = useState(bankDetails.accountNumber);
  const [ifscCode, setIfscCode] = useState(bankDetails.ifscCode);
  const [bankBranch, setBankBranch] = useState(bankDetails.bankBranch);
  const [accountHolder, setAccountHolder] = useState(bankDetails.accountHolder);

  const handleUpdate = () => {
    setBankDetails({
      accountNumber,
      ifscCode,
      bankBranch,
      accountHolder,
    });
    setIsModalOpen(false);
  };
  const [round, setRound] = useState(false);
  function handleRoundChange(e) {
    if (e.target.checked) {
      console.log("round");
      var originalValue=addTotal;
      var roundValue=Math.round(addTotal);
      console.log(originalValue);
      console.log(roundValue);
      var roundedofValue=roundValue-originalValue;
      setAddTotal(roundValue);
      setRound(roundedofValue.toFixed(2));
    } else {
      console.log("not");
    }
  }
  const handleDeleteRow = (index) => {
    // Create copies of the current state to avoid direct mutation
    const updatedRows = [...productRows];
    const updateddisp=[...disabl];
    const updatedTax = [...TaxAmount];
    const updatedProductAmount = [...productAmount];

    // Log the index and the row being removed for debugging
    console.log("Deleting row at index:", index);
    if(updatedRows.length==1)
    {
      console.log("worked");
      setdisabl([1]);
    }
    console.log("Row details before deletion:", updatedRows[index]);
    for (var k = 0; k < updatedRows.length; k++) {
      if (updatedRows[k].quantity == "") {
        updatedRows[k].quantity = "0";
      }
    }

    // Remove the row and corresponding tax amount
    if (index >= 0 && index < updatedRows.length) {
      updatedRows.splice(index, 1);
      updateddisp.splice(index,1);
      updatedTax.splice(index, 1);
      updatedProductAmount.splice(index, 1);
    } else {
      console.error("Index out of bounds:", index);
    }

    // Calculate the total amount for all remaining rows
    let totalAmount = 0; // Reset totalAmount before recalculating
    let taxableAmount = 0; // Reset taxableAmount before recalculating
    let gstSumAmount = 0;

    for (let row of updatedRows) {
      totalAmount += parseFloat(row.total) || 0; // Ensure to handle NaN
      taxableAmount += parseFloat(row.taxable_amount) || 0; // Ensure to handle NaN
    }
    for (var i = 0; i < updatedTax.length; i++) {
      gstSumAmount += parseFloat(updatedTax[i]) || 0;
    }
    if (!updatedRows.length) {
      console.log(gstAmountPer);
      setGstAmountPer(gstAmountPer + 1);
    } else {
      setGstAmountPer(gstAmountPer - 1);
    }
    // Calculate GST sum from the updated tax array
    const gstSum = parseFloat(
      updatedTax.reduce((acc, val) => acc + parseFloat(val || 0), 0).toFixed(2)
    );

    // Update state with the new values
    setdisabl(updateddisp);
    setProductAmount(updatedProductAmount);
    setGstAmount(gstSumAmount);
    setTaxableAmount(taxableAmount);
    setGstSu(gstSum);
    setProductRows(updatedRows);
    setTaxAmount(updatedTax);
    setAddTotal(totalAmount.toFixed(2)); // Format totalAmount to two decimal places
  };
  // function handleFocus(e,index,name){
  //     if(name=="qty")
  //     {
  //       console.log("working me");
  //     const updatedRows=[...productRows];
  //     updatedRows[index].quantity="";
  //     setProductRows(updatedRows);
  //     }
  //     if(name=="rupe")
  //     {
  //       console.log("working");
  //     const updatedRows=[...productRows];
  //     updatedRows[index].discount_amount="";
  //     setProductRows(updatedRows);
  //     }
  //     if(name=="proD")
  //     {
  //       console.log("working");
  //     const updatedRows=[...productRows];
  //     updatedRows[index].productDescription="";
  //     setProductRows(updatedRows);
  //     }
  //     if(name=="dis")
  //     {
  //       console.log("working");
  //     const updatedRows=[...productRows];
  //     updatedRows[index].discount_amountPer="0_%";
  //     setProductRows(updatedRows);
  //     }
  // }

  function handleFocus(e, index, name) {
    if (name == "qty") {
      console.log("working");
      const updatedRows = [...productRows];
      updatedRows[index].quantity = "";
      setProductRows(updatedRows);
    }
    if (name == "rupe") {
      console.log("working");
      const updatedRows = [...productRows];
      updatedRows[index].discount_amount = "";
      setProductRows(updatedRows);
    }
    if (name == "proD") {
      console.log("working");
      const updatedRows = [...productRows];
      updatedRows[index].productDescription = "";
      setProductRows(updatedRows);
    }
    if (name == "dis") {
      console.log("working");
      const updatedRows = [...productRows];
      updatedRows[index].discount_amountPer = "0_%";
      setProductRows(updatedRows);
    }
    if (name == "unitChange") {
      console.log("working");
      const updatedRows = [...productRows];
      updatedRows[index].unitPrice = "";
      console.log(e.target.value);
      setProductRows(updatedRows);
    }
  }
  function handleDescriptionAdd(e, index) {
    const updateDescription = [...productRows];
    updateDescription[index].productDescription = e.target.value;
    setProductRows(updateDescription);
    console.log(updateDescription);
  }
  return (
    <>
    {
      loader?(<>
      <Loader/>
      </>):(
        <div>
      <div className="over bg-gray-100 p-4 max-w-7xl mx-auto bg-white">
        <h2 className="text-center">Invoice</h2>
        <form onSubmit={formik.handleSubmit}>
          {/* Invoice Section */}
          <div className="bg-white rounded-lg">
            <div className="sm:grid block grid-cols-2 mt-2 border p-6 sm:flex justify-center items-center bg-gray-50 text-gray-500 text-lg font-medium cursor-pointer">
              <div className="border p-6 h-90 bg-gray-50 text-gray-500 text-lg font-medium cursor-pointer">
                <div className="flex justify-between">
                  <div>
                    {businessprofile.length > 0 ? (
                      <>
                      { businessprofile[0].logo!=null?(
                        <img
                        src={businessprofile[0].logo}
                        alt="Logo Preview"
                        className="w-20 h-20 object-cover border rounded"
                      />):(<div className="font-bold text-5xl rounded">
                            {(businessprofile[0].business_name).substring(0,1).toUpperCase()}
                      </div>)
                      }
                      </>
                    ) : (
                      ""
                    )}
                    <h6>
                      {businessprofile.length > 0
                        ? businessprofile[0].business_name
                        : ""}
                    </h6>
                  </div>
                  <div>
                    <h6>
                      {businessprofile.length > 0
                        ? businessprofile[0].mobile_no
                        : ""}
                    </h6>
                    <h6>
                      {businessprofile.length > 0
                        ? businessprofile[0].pan_no
                        : ""}
                    </h6>
                    <h6>
                      {businessprofile.length > 0 ? businessprofile[0].gst : ""}
                    </h6>
                  </div>
                </div>
                <h6>
                  {businessprofile.length > 0 ? businessprofile[0].address : ""}
                </h6>
                <h2 className="fs-5 font-semibold mb-1 p-1">Bill To:</h2>
                <div className="relative">
                  <div className="relative" style={display}>
                    {selectedCustomer ? (
                      <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                          <div className="flex flex-col">
                            <div className="font-bold">Party Name:</div>
                            <div>{selectedCustomer.customer_name}</div>
                          </div>
                          <button
                            onClick={handleChangeParty}
                            className="ml-4 bg-[#3A5B76] text-white sm:px-4 sm:py-2 px-1 py-1 rounded hover:bg-[#2D465B]"
                          >
                            Change Party
                          </button>
                        </div>
                        <div className="flex justify-between">
                          <div className="flex flex-col">
                            <div className="font-bold">Billing Address:</div>
                            <div>{selectedCustomer.billing_address}</div>
                          </div>
                          <div className="flex flex-col">
                            <div className="font-bold">Shipping Address:</div>
                            <div>{selectedCustomer.shipping_address}</div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                                                {
                                                  filteredCustomers.length>0?(
                                                    <div
                                                  onClick={handleShow}
                                                  className="flex justify-center items-center border border-gray-400 p-4 rounded-md cursor-pointer hover:bg-gray-100"
                                              >
                                                  <ButtonComponent
                                                      className="w-full text-left border-dashed border-2 rounded-md px-4 py-2"
                                                      label="Add Party"
                                                  />
                                              </div>
                                                  ):(
                                                    <button type="button" className="px-20 py-3 bg-[#3A5B76] text-white font-bold rounded hover:bg-[#2E4A62]" onClick={()=>navigate("/home",{state:{data:"FromInvoice"}})}>Create Party</button>
                                                  )
                                                }
                                              </div>
                    )}
                    {isDropdownOpen && (
                      <div
                        ref={dropdownRef}
                        className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1"
                      >
                        <InputComponent
                          labelName="search-customers"
                          labelInput="Search Customers"
                          type="text"
                          name="search"
                          placeholder="Search Customers"
                          classNameInput="p-2 border border-gray-300 rounded-md w-full"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          autoFocus
                        />
                        {filteredCustomers.length > 0 ? (
                          <ul className="max-h-60 overflow-y-auto">
                            {filteredCustomers.map((customer) => (
                              <li
                                key={customer.id}
                                onClick={() => handleSelect(customer)}
                                className="p-2 hover:bg-gray-200 cursor-pointer"
                              >
                                {customer.customer_name},{customer.mobile_no}
                                <br />
                                {customer.billing_address}
                                <br />
                              </li>
                            ))}
                            <button
                              type="button"
                              className="px-20 py-3 bg-[#3A5B76] text-white font-bold rounded hover:bg-[#2E4A62]"
                              onClick={() =>
                                navigate("/home", {
                                  state: { data: "FromInvoice" },
                                })
                              }
                            >
                              Create Party
                            </button>
                          </ul>
                        ) : (
                          <div className="p-2 text-gray-500">
                            No customers found
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="block sm:grid grid-cols-3 gap-4 border p-6 sm:h-90 h-max sm:flex justify-center items-center bg-gray-50 text-gray-500 text-lg font-medium cursor-pointer">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Invoice Prefix:
                  </label>
                  <InputComponent
                    type="text"
                    name="invoice_prefix"
                    value={invoicePrefix}
                    readOnly
                    classNameInput="w-full border p-2 rounded-lg text-gray-700 bg-gray-50 mt-2"
                    onChange={formik.handleChange} // This will not trigger since readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Invoice Number:
                  </label>
                  <InputComponent
                    type="text"
                    name="invoice_number"
                    value={invoiceNumber}
                    readOnly
                    classNameInput="w-full border p-2 rounded-lg text-gray-700 bg-gray-50 mt-2"
                    onChange={formik.handleChange} // This will not trigger since readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Sales Invoice Date:
                  </label>
                  <InputComponent
                    type="text"
                    name="sales_invoice_date"
                    value={date}
                    readOnly
                    classNameInput="w-full border p-2 rounded-lg text-gray-700 bg-gray-50 mt-2"
                    onChange={formik.handleChange} // This will not trigger since readOnly
                  />
                </div>
                <div className="sm:w-96 sm:outline-3 outline-0 outline-gray-400 outline-offset-4 outline-dashed rounded-md">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2 px-2">
                    <div className="w-42">
                      <label
                        htmlFor="payment_terms"
                        className="w-full text-gray-600 font-semibold mb-1"
                      >
                        Payment Terms:
                      </label>
                      <InputComponent
                        type="number"
                        name="payment_terms"
                        id="payment_terms"
                        value="7"
                        readOnly
                        classNameInput="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#3A5B76] hover:bg-gray-100"
                        onChange={(e) => setPaymentTerms(e.target.value)} // This will not trigger since readOnly
                        placeholder="In Days"
                      />
                    </div>
                    <div className="w-42">
                      <label
                        htmlFor="due_date"
                        className="w-full text-gray-600 font-semibold mb-1"
                      >
                        Due Date:
                      </label>
                      <InputComponent
                        type="text"
                        name="due_date"
                        id="due_date"
                        value={dueDate}
                        readOnly
                        classNameInput="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#3A5B76] hover:bg-gray-100"
                        onChange={handleDueDate} // This will work as intended
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Items and Billing */}
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300">
              <thead className="bg-gray-200 text-[#2D465B]">
                <tr>
                  <th className=" border">S.No</th>
                  <th className="p-2 border">Item/ Services</th>
                  <th className="p-2 border">HSN Code</th>
                  <th className="p-2 border">QTY</th>
                  <th className="p-2 border">Price/ Item</th>
                  <th className="p-2 border">Discount</th>
                  <th className="p-2 border">TAX</th>
                  <th className="p-2 border">Taxable amt</th>
                  <th className="p-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {productRows.map((product, index) => (
                  <React.Fragment key={index}>
                    <tr>
                      <td className="w-10">
                        <InputComponent
                          onChange={formik.handleChange}
                          type="number"
                          name="sNo"
                          value={index + 1}
                          readOnly
                          classNameInput="w-10 p-2 border border-gray-300 rounded-md hover:bg-gray-200"
                        />
                      </td>
                      <td className="w-80">
                        <select
                          disabled={disabl!=null && disabl[index]==0}
                          className="w-80 p-2 border border-gray-300 hover:bg-gray-200"
                          name="productdetail"
                          onChange={(e) =>
                            handleProductChange(index, e.target.value)
                          }
                          value={product.productName}
                        >
                          <option value="">Select</option>
                          {products.map((product) => (
                            <option
                              key={product.product_name}
                              value={product.product_name}
                            >
                              {product.product_name}
                            </option>
                          ))}
                          <option value="addProduct" className="bg-[#2D465B] text-white">Add Product</option>
                        </select>
                      </td>
                      <td className="w-30">
                        <InputComponent
                          onChange={formik.handleChange}
                          type="text"
                          name="HSNCode"
                          value={product.hsnCode}
                          min="0"
                          classNameInput="w-full p-2 border border-gray-300 rounded-md hover:bg-gray-200"
                        />
                      </td>
                      <td className="w-20">
                        <InputComponent
                          onChange={formik.handleChange}
                          type="number"
                          min="0"
                          name="quantity"
                          onFocus={(e) => handleFocus(e, index, "qty")}
                          {...(product.quantity != ""
                            ? { value: product.quantity }
                            : {})}
                          onBlur={(e) =>
                            handleChange(
                              e,
                              product,
                              index,
                              e.target.value,
                              "qtyChange"
                            )
                          }
                          classNameInput="w-20 p-2 border border-gray-300 rounded-md hover:bg-gray-200"
                          placeholder="Quantity"
                        />
                      </td>
                      <td className="w-40">
                        <InputComponent
                          type="number"
                          step="any"
                          name="unitPrice"
                          onFocus={(e) => handleFocus(e, index, "unitChange")}
                          {...(product.unitPrice != ""
                            ? { value: product.unitPrice }
                            : {})}
                          onBlur={(e) =>
                            handleChange(
                              e,
                              product,
                              index,
                              e.target.value,
                              "unitchange"
                            )
                          }
                          min="0"
                          classNameInput="w-40 p-2 border border-gray-300 rounded-md hover:bg-gray-200"
                        />
                      </td>
                      <td className="w-30">
                        <InputComponent
                          type="number"
                          name="rupe"
                          step="any"
                          min="0"
                          onFocus={(e) => handleFocus(e, index, "rupe")}
                          {...(product.discount_amount != ""
                            ? { value: productAmount[index].amount }
                            : {})}
                          onBlur={(e) =>
                            handleChange(e, product, index, 0, "discount")
                          }
                          placeholder="₹"
                          classNameInput="w-30 p-2 border border-gray-300  hover:bg-gray-200"
                        />
                      </td>
                      <td className="w-40">
                        <select
                          onChange={(e) =>
                            handleChange(e, product, index, 0, "gstChange")
                          }
                          // value={product.gstRate}
                          className="w-40 border d-inline-block border-gray-300 rounded-md p-2"
                        >
                          <option className="bg-gray" readOnly value={"gst_"}>{count==0?product.gstRate:(productRows.length?product.gstRate:"")}</option>
                          <option value="gst_0">0%</option>
                          <option value="gst_0.1">0.1%</option>
                          <option value="gst_0.25">0.25%</option>
                          <option value="gst_1.5">1.5%</option>
                          <option value="gst_3">3%</option>
                          <option value="gst_5">5%</option>
                          <option value="gst_6">6%</option>
                          <option value="gst_12">12%</option>
                          <option value="gst_13.8">13.8%</option>
                          <option value="gst_18">18%</option>
                          <option value="gst_28">GST @ 28%</option>
                        </select>
                      </td>
                      <td className="w-40">
                        <InputComponent
                          onChange={formik.handleChange}
                          type="number"
                          step="any"
                          name="taxableAmount"
                          value={product.taxable_amount}
                          min="0"
                          readOnly
                          classNameInput="w-40 p-2 border border-gray-300 rounded-md hover:bg-gray-200"
                        />
                      </td>
                      <td>
                        <ButtonComponent
                          type="button"
                          className="p-1 m-auto w-100 text-white bg-red-500 rounded hover:bg-red-600"
                          value="remove"
                          onClick={() => handleDeleteRow(index)}
                        >
                          <DeleteForever />
                        </ButtonComponent>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td colSpan={4}>
                        <textarea
                          onFocus={(e) => handleFocus(e, index, "proD")}
                          {...(product.productDescription != ""
                            ? { value: product.productDescription }
                            : {})}
                          onBlur={(e) => handleDescriptionAdd(e, index)}
                          name="productDescription"
                          placeholder="Enter product description"
                          className="bg-white w-full border border-gray-300 hover:bg-gray-200"
                          id=""
                        ></textarea>
                      </td>
                      <td className="w-30">
                        <InputComponent
                          onBlur={(e) =>
                            handleChange(e, product, index, 0, "discount")
                          }
                          type="number"
                          step="any"
                          min="0"
                          max="100"
                          name="per"
                          placeholder="%"
                          onFocus={(e) => handleFocus(e, index, "dis")}
                          {...(product.discount_amountPer != "0_%"
                            ? { value: productAmount[index].per }
                            : {})}
                          classNameInput="w-30 mb-2 p-2 border border-gray-300 rounded-md hover:bg-gray-200"
                        />
                      </td>
                      <td className="w-40">
                        {TaxAmount[index] !== "NaN" ? (
                          <div>
                            <input
                              className="w-40 mb-2 p-2 border border-gray-300 rounded-md hover:bg-gray-200"
                              // value={"Rs." + TaxAmount[index]}
                              value={TaxAmount[index]!=undefined?("₹" + TaxAmount[index]):("₹ 0.00")}
                            ></input>
                          </div>
                        ) : (
                          <span className="w-40">0.00</span>
                        )}
                      </td>
                      <td></td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
            <div className="relative w-full p-1 grid grid-cols-1 md:grid-cols-2 gap-1">
              <button
                type="button"
                className="mt-3 px-2 border rounded border-[#3A5B76] text-[#3A5B76] font-semibold rounded hover:bg-[#2E4A62] hover:text-white"
                onClick={handleAddProductRow}
              >
                +ADD ITEM
              </button>
              <div>
                <button
                  type="button"
                  className="w-full p-3 mt-3 border rounded border-[#3A5B76] text-[#3A5B76] font-semibold rounded hover:bg-[#2E4A62] hover:text-white"
                >
                  Scan Barcode
                </button>
              </div>
            </div>
          </div>

          {/* Subtotal and Total */}
          <div className="p-1">
            <div className="grid grid-cols-4 gap-4 border border-gray-300 pt-4">
              <div className="text-center font-semibold">Sub Total</div>
              {/* <div
            className="text-center font-semibold"
            name="totalQty"
            onChange={formik.handleChange}
          >
            QTY: {qty}
          </div> */}
              {gstSu != "NaN" ? (
                <div
                  className="text-center font-semibold"
                  name="subTotal"
                  onChange={formik.handleChange}
                >
                  ₹Tax Amount {gstSu.toFixed(2)}
                </div>
              ) : (
                <div
                  className="text-center font-semibold"
                  name="subTotal"
                  onChange={formik.handleChange}
                >
                  ₹Tax Amount {0.0}
                </div>
              )}
              <div
                className="text-center font-semibold"
                name="totalAmount"
                onChange={formik.handleChange}
              >
                Total Amount:₹{addTotal}
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="sm:grid grid-cols-2 px-6  sm:flex justify-center items-center bg-white text-gray-500 text-lg font-medium cursor-pointer">
            <div className="border p-6 bg-gray-50">
              <ButtonComponent
                onClick={toggleNotes}
                type="button"
                className="mt-3 block text-[#3A5B76] font-semibold hover:text-[#2E4A62]"
              >
                + Add Notes
              </ButtonComponent>

              {showNotes && (
                <div id="notesContainer" className="mt-4">
                  <label
                    htmlFor="invoiceNotes"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Notes
                  </label>
                  <textarea
                    id="invoiceNotes"
                    rows="4"
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter any special instructions or notes here..."
                    value={notes}
                    onChange={handleNotesChange}
                  />
                </div>
              )}

              <div className="mt-4 sm:block hidden">
                <h2 className="text-xl font-semibold mb-2">
                  Terms and Conditions
                </h2>
                <p className="text-sm bg-gray-200 p-2">
                  Goods once sold will not be taken back. All warranty &
                  replacement material will be handled per manufacturer's
                  policy. We are not responsible for warranty. Replacement is
                  from the source. Payment due within 15 days.
                </p>
              </div>
            </div>

            <div className="m-4">
              <div>
                <ButtonComponent
                  type="button"
                  className="mt-3 text-[#3A5B76] font-semibold rounded hover:text-[#2E4A62]"
                >
                  + Add Additional Charges
                </ButtonComponent>
                <div className="flex justify-between mt-3">
                  <button
                    type="button"
                    className=" text-[#3A5B76] font-semibold rounded hover:text-[#2E4A62]"
                  >
                    + Taxable Amount
                  </button>
                  <div>₹{taxableAmount}</div>
                </div>
                <div className="mt-1.5">
                  {/* {productRows.map((item, index) => (
                <div key={index} className="">
                    <div className="flex justify-between">
                        <div className="font-medium">SGST@{item.gstRate / 2}</div>
                        <div className="" >₹{TaxAmount.length>0?TaxAmount[index]/2:0}</div>
                    </div>
                    <div className="flex justify-between">
                        <div className="font-medium">CGST@{item.gstRate / 2}</div>
                        <div>₹{TaxAmount.length>0?TaxAmount[index]/2:0}</div>
                    </div>
                </div>
            ))} */}
                  <div className="">
                    <div className="flex justify-between">
                      <div className="font-medium">
                        SGST@
                        {gstAmountPer == productRows.length
                          ? productRows[0].gstRate + "%"
                          : ""}
                      </div>
                      <div className="">₹{(gstAmount / 2).toFixed(2)}</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="font-medium">
                        CGST@
                        {gstAmountPer == productRows.length
                          ? productRows[0].gstRate + "%"
                          : ""}
                      </div>
                      <div>₹{(gstAmount / 2).toFixed(2)}</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* tcs */}
              {/* <div className="flex items-center space-x-2 mt-4 col-span-2">
                <input type="checkbox" className="h-4 w-4 cursor-pointer" />
                <label className="text-sm text-gray-700">Apply TCS</label>
              </div> */}
            </div>
          </div>

          {/* Bank Details */}
          <div className="block sm:grid grid-cols-2 px-6 h-max sm:flex justify-center items-center bg-white text-gray-500 text-lg font-medium cursor-pointer">
            <div>
              <div className="border p-6 h-60 bg-gray-50 text-gray-500 text-lg font-medium cursor-pointer">
                <h2 className="text-xl font-semibold mb-2">Bank Details</h2>
                <div className="mt-1 p-2">
                  <p className="text-sm">
                    Account Number: 
                  </p>
                  <p className="text-sm">
                    Account Holder's Name: 
                  </p>
                  <p className="text-sm">IFSC CODE: </p>
                  <p className="text-sm">
                    Branch Name: 
                  </p>
                </div>
                {/* <ButtonComponent
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="mt-1 p-1 text-sm text-[#3A5B76] border rounded border-[#3A5B76] hover:text-white hover:bg-[#2E4A62]"
                >
                  Change Bank Account
                </ButtonComponent> */}
                {/* <ButtonComponent
                  type="button"
                  className="mt-1 p-1 text-sm text-[#3A5B76] border rounded border-[#3A5B76] hover:text-white hover:bg-[#2E4A62]"
                >
                  Remove Bank Account
                </ButtonComponent> */}
              </div>

              {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white p-6 rounded shadow-lg w-50">
                    <h2 className="text-xl font-semibold mb-4">
                      Update Bank Details
                    </h2>
                    <InputComponent
                      type="text"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      placeholder="Account Number"
                      className="border p-2 mb-2 w-full"
                    />
                    <InputComponent
                      type="text"
                      value={ifscCode}
                      onChange={(e) => setIfscCode(e.target.value)}
                      placeholder="IFSC CODE"
                      className="border p-2 mb-2 w-full"
                    />
                    <InputComponent
                      type="text"
                      value={bankBranch}
                      onChange={(e) => setBankBranch(e.target.value)}
                      placeholder="Bank and Branch Name"
                      className="border p-2 mb-2 w-full"
                    />
                    <InputComponent
                      type="text"
                      value={accountHolder}
                      onChange={(e) => setAccountHolder(e.target.value)}
                      placeholder="Account Holder's Name"
                      className="border p-2 mb-4 w-full"
                    />
                    <ButtonComponent
                      onClick={handleUpdate}
                      className="bg-blue-500 text-white p-2 rounded"
                    >
                      Save Changes
                    </ButtonComponent>
                    <ButtonComponent
                      onClick={() => setIsModalOpen(false)}
                      className="ml-2 p-2 rounded border"
                    >
                      Cancel
                    </ButtonComponent>
                  </div>
                </div>
              )}
            </div>

            <div className="block sm:grid grid-cols-2 gap-4 border p-6 h-max sm:flex justify-center items-center bg-gray-50 text-gray-500 text-lg font-medium cursor-pointer">
              
              <div>
                <label className="text-xl text-gray-700">Total Amount:</label>
              </div>
              <div>
                <InputComponent
                  type="number"
                  className="w-full p-2 bg-white border rounded-lg border-gray-300"
                  value={addTotal}
                  readOnly
                />
              </div>
              <div className="block sm:flex sm:items-center sm:space-x-2 sm:mt-4">
                <input
                  type="checkbox"
                  onChange={handleRoundChange}
                  className="h-max w-4"
                />
                <label className="text-sm text-gray-700">Auto Round Off:</label>
              </div>
              <div>
                <InputComponent
                  type="number"
                  className="w-full p-1 bg-white border border-gray-300"
                  value={round}
                  readOnly
                />
              </div>
              <div>
                <label className="text-xl text-gray-700">Amount Receipt:</label>
              </div>
              <div>
                <InputComponent
                  type="number"
                  className="w-full p-2 bg-white border rounded-lg border-gray-300"
                  value={amountReceipt}
                  onChange={(e) =>
                    setAmountReceipt(parseFloat(e.target.value) || 0)
                  }
                />
              </div>
            </div>
          </div>

          {/* Balance Amount */}
          {/* <div className="grid grid-cols-2 px-4 w-full bg-white text-gray-500 text-lg font-medium cursor-pointer">
            <div>
              <label className="text-xl text-gray-700 p-2">
                Balance Amount:
              </label>
            </div>
            <div>
              <input
                type="number"
                className="w-96 p-2 bg-white border rounded-lg border-gray-300"
                value={(total - amountReceipt).toFixed(2)}
                readOnly
              />
            </div>
          </div> */}
          {/* Authorised Signatory */}
          <div className="block sm:grid grid-cols-2 px-6 h-80 sm:flex justify-center items-center bg-white text-gray-500 text-lg font-medium cursor-pointer">
            <div className="border sm:p-6 p-0 sm:h-60 h-0 bg-gray-50 text-gray-500 text-lg font-medium cursor-pointer">
              <h2 className="text-xl font-semibold mb-2"></h2>
            </div>
            <div className="border p-6 sm:h-60 h-max  bg-gray-50 text-gray-500 text-lg font-medium cursor-pointer">
              <h2 className="text-xl font-semibold mb-2">
              Authorized signatory
              </h2>
              {
                (businessprofile.length>0 && businessprofile[0].signature_box!=null)?(
                  <img
                src={
                  businessprofile.length > 0
                    ? businessprofile[0].signature_box
                    : ""
                }
                alt="Logo Preview"
                className="w-full h-40 object-cover border rounded"
              />
                ):(<div className="w-100 h-40 border-1 border-black"></div>)
              }
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
      )
    }
    </>
  );
}
