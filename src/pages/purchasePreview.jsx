import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Preview, ModeEdit, DeleteForever,Close } from "@mui/icons-material";
import { ButtonComponent } from '../components/Button';
import { InputComponent } from '../components/Input';
import { apiGet } from '../services/api';
import { Loader } from '../layouts/Loader';
import { toWords } from 'number-to-words';
import "../styles/layoutFix.css"
import Sidebar from '../layouts/Sidebar';

export function PurchasePreview() {
  const [purchasePreview, setpurchasePreview] = useState([]);
  const [purchaseProduct,setpurchaseProduct]=useState([]);
  const location = useLocation();
  const [quantity, setQuantity] = useState(0);
  const [taxable_rate, setTaxable_rate] = useState(0);
  const [gst_amount, set_gst_amount] = useState(0);
  const [total_amount, set_Total_amount] = useState(0);
  const [amount_to_words, setAmountWords] = useState("");

  useEffect(() => {
    const number = location.state?.data?.mobile_no; // Use optional chaining
    console.log(number);
    const id = location.state?.data?.purchase_id; // Use optional chaining
    console.log(id);
    console.log(location.state.data);
    setpurchasePreview([location.state.data]);
    const fetchInvoiceProduct=async ()=>{
      const res=await apiGet(`/purchase/${id}`)
      console.log(res);
      setpurchaseProduct(res.data);
    }
    fetchInvoiceProduct();
  }, [location.state]);

  // Check if challanPreview has data before rendering
  if (!purchasePreview.length) {
    return <Loader />;
  }

  // Assuming the first element contains the necessary data
  const purchaseData = purchasePreview[0];
  function handleChallanToInvoice(){
    console.log(location.state.data);
  }
  function fetchAmountToWord(totall){
                  console.log(totall);
                  console.log("i am totall")
                  let result = ""; // Initialize result as an empty string
                        const units = ["", " lakh", " crore"]; // Units for Indian numbering system
                        if (totall >= 10000000) {
                          // Check if num is 10 million or more
                          console.log("working");
                          const crores = Math.floor(totall / 10000000); // crores = 1
                          result += toWords(crores) + units[2]; // result = "1 crore"
                          totall %= 10000000; // num = 5000000
                          setAmountWords(result.toUpperCase() + " RUPEES ONLY/-");
                        }
                  
                        // Handle lakhs
                        if (totall >= 100000) {
                          // Check if num is 100,000 or more
                          const lakhs = Math.floor(totall / 100000); // lakhs = 5
                          result += (result ? " " : "") + toWords(lakhs) + units[1]; // result = "1 crore 5 lakh"
                          totall %= 100000; // num = 0
                          setAmountWords(result.toUpperCase() + " RUPEES ONLY/-");
                          console.log("totall remaining" + totall);
                        }
                        // Handle thousands and below
                        if (totall > 0) {
                          // Check if num is greater than 0
                          const word = toWords(parseFloat(totall, 10));
                          setAmountWords(
                            result.toUpperCase() + " " + word.toUpperCase() + " RUPEES ONLY/-"
                          );
                        }
                  
              }

  return (
    <div>
    <div className="over sm:flex sm:justify-center block"
        style={{ overflow: "scroll", height: "99vh" }}>
      <div className="py-6">
        <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-md">
          <h2 className="mb-6 text-3xl font-semibold text-center text-gray-800 d-inline-block">
          View Details
          </h2>

          <NavLink to="/purchase-table" className="text-white text-decoration-none">
          <ButtonComponent
              type="button"
              className=" bg-[#3A5B76] float-end px-2 py-1 text-white font-bold rounded hover:bg-[#2E4A62]"
              value="close"
              children={<Close/>}
            />
          </NavLink>
          <form className="">
            <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
              <div>
                <InputComponent
                  labelName="purchaseDate"
                  classNameLabel="block mb-2 font-semibold text-gray-700"
                  labelInput="Purchase Date:"
                  type="text"
                //   name="challanDate"
                  placeholder="date.month.year"
                  readOnly
                  value={purchaseData?.purchase_date || ''} // Use optional chaining
                  required
                  classNameInput="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                />
              </div>
              <div>
                <InputComponent
                  
                  classNameLabel="block mb-2 font-semibold text-gray-700"
                  labelInput="Purchase Due Date:"
                  type="text"
                  
                  placeholder="date.month.year"
                  readOnly
                  value={purchaseData?.due_date || ''} // Use optional chaining
                  required
                  classNameInput="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                />
              </div>
              <div>
                <InputComponent
                  
                  classNameLabel="block mb-2 font-semibold text-gray-700"
                  labelInput="Purchase Prefix:"
                  type="text"
                  readOnly
                  value={purchaseData?.purchase_prefix || ''} // Use optional chaining
                  required
                  classNameInput="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                />
              </div>
              <div>
                <InputComponent
                 
                  classNameLabel="block mb-2 font-semibold text-gray-700"
                  labelInput="Payment terms:"
                  type="text"
                  readOnly
                  value={purchaseData?.payment_terms || ''} // Use optional chaining
                  required
                  classNameInput="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                />
              </div>
              <div>
                <InputComponent
                  labelName="customerName"
                  classNameLabel="block mb-2 font-semibold text-gray-700"
                  labelInput="Customer Name"
                  value={purchaseData?.customername || ''} // Use optional chaining
                  type="text"
                  name="customerName"
                  placeholder="Enter Customer name"
                  required
                  classNameInput="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">


              {/* <div>
                <InputComponent
                  labelName="reference"
                  classNameLabel="block mb-2 font-semibold text-gray-700"
                  labelInput="Reference"
                  type="text"
                  value={challanData?.reference || ''} // Use optional chaining
                  name="references"
                  placeholder="Enter Reference details"
                  required
                  classNameInput="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                />
              </div> */}
            </div>
            <div className="mb-6 overflow-x-auto">
              <table className="min-w-full border-collapse table-auto">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="w-10 p-3 text-gray-700">S.No.</th>
                    <th className="p-3 text-left text-gray-700 w-30">Product</th>
                    <th className="w-20 p-3 text-gray-700">HSN Code</th>
                    <th className="w-20 p-3 text-gray-700">GST Rate</th>
                    <th className="w-20 p-3 text-gray-700">Unit Price</th>
                    <th className="w-20 p-3 text-gray-700">Qty</th>
                    <th className="w-20 p-3 text-gray-700">Gst Amount</th>
                    <th className="w-20 p-3 text-gray-700">Discount (%)</th>
                    <th className="w-20 p-3 text-gray-700">Taxable Amount</th>
                    <th className="w-20 p-3 text-gray-700">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {purchaseProduct.map((row, index) => (
                    <tr key={row.id}>
                      <td>
                        <InputComponent
                          type="number"
                          name="sNo"
                          value={index + 1}
                          readOnly
                          classNameInput="w-full p-2 border border-gray-300 rounded-md hover:bg-gray-200"
                        />
                      </td>
                      <td>
                        <InputComponent
                          type="text"
                          name="product_name"
                          value={row.productname}
                          readOnly
                          classNameInput="w-full p-2 border border-gray-300 rounded-md hover:bg-gray-200"
                        />
                      </td>
                      <td>
                        <InputComponent
                          type="text"
                          name="HSNCode"
                          value={row.hsncode}
                          readOnly
                          classNameInput="w-full p-2 border border-gray-300 rounded-md hover:bg-gray-200"
                        />
                      </td>
                      <td>
                        <InputComponent
                          type="text"
                          name="GSTRate"
                          value={row.gstrate}
                          readOnly
                          classNameInput="w-full p-2 border border-gray-300 rounded-md hover:bg-gray-200"
                        />
                      </td>
                      <td>
                        <InputComponent
                          type="number"
                          name="unitPrice"
                          value={row.unitprice}
                          readOnly
                          classNameInput="w-full p-2 border border-gray-300 rounded-md hover:bg-gray-200"
                        />
                      </td>
                      <td>
                        <InputComponent
                          type="number"
                          name="quantity"
                          value={row.quantity}
                          readOnly
                          classNameInput="w-full p-2 border border-gray-300 rounded-md hover:bg-gray-200"
                          placeholder="Quantity"
                        />
                      </td>
                      <td>
                        <InputComponent
                          type="number"
                          name="GST"
                          value={row.calculatedgst}
                          readOnly
                          classNameInput="w-full p-2 border border-gray-300 rounded-md hover:bg-gray-200"
                        />
                      </td>
                      <td>
                        <InputComponent
                          type="text"
                          name="Discount"
                          value={row.discount_amount!="0.00"?(row.discount_amount+"rs"):(row.discount_amount_per.substring(0,2)+"%")}
                          classNameInput="w-full p-2 border border-gray-300 rounded-md hover:bg-gray-200"
                          placeholder="Discount"
                        />
                      </td>
                      <td>
                        <InputComponent
                          type="number"
                          name="GST"
                          value={row.taxableamount}
                          readOnly
                          classNameInput="w-full p-2 border border-gray-300 rounded-md hover:bg-gray-200"
                        />
                      </td>
                      <td>
                        <InputComponent
                          type="number"
                          name="totalPrice"
                          value={row.total}
                          readOnly
                          classNameInput="w-full p-2 border border-gray-300 rounded-md hover:bg-gray-200"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
              <div>
                <InputComponent
                  labelName="subTotal"
                  classNameLabel="block mb-2 font-semibold text-gray-700"
                  labelInput="Taxable Amount:"
                  type="number"
                  name="subTotal"
                  readOnly
                  value={purchaseData?.taxable_amount || ''} // Use optional chaining
                  classNameInput="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                />
              </div>
              <div>
                <InputComponent
                  labelName="totalAmount"
                  classNameLabel="block mb-2 font-semibold text-gray-700"
                  labelInput="Total Amount:"
                  type="number"
                  name="totalAmount"
                  readOnly
                  value={purchaseData?.total_amount || ''} // Use optional chaining
                  classNameInput="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                />
              </div>
            </div>

            {/* <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-1">
              <div>
                <InputComponent
                  labelName="Amountinwords"
                  classNameLabel="block mb-2 font-semibold text-gray-700"
                  labelInput="Amount in Words:"
                  type="text"
                  name="Amountinwords"
                  readOnly
                  value={amount_to_words}
                  classNameInput="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                />
              </div>
            </div> */}

            <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
              {
                purchaseData.notes?(
                  <div>
                <label htmlFor="challanNotes" className="block mb-2 font-semibold text-gray-700">
                  Notes:
                </label>
                <textarea
                  
                  value={purchaseData?.notes || ''} // Use optional chaining
                  
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                  placeholder="Any additional notes..."
                />
              </div>
                ):("")
              }
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
}