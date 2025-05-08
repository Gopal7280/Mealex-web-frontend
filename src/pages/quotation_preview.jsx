import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Preview, ModeEdit, DeleteForever,Close } from "@mui/icons-material";
import { ButtonComponent } from '../components/Button';
import { InputComponent } from '../components/Input';
import { apiGet, apiPost } from '../services/api';
import { Loader } from '../layouts/Loader';
import { toWords } from 'number-to-words';
import "../styles/layoutFix.css"
import Sidebar from '../layouts/Sidebar';
export function QuotationPreview() {
  const [quotationPreview, setQuotationPreview] = useState([]);
  const [quotationProduct,setQuotationProduct]=useState([]);
  const location = useLocation();
  const [quantity, setQuantity] = useState(0);
  const [taxable_rate, setTaxable_rate] = useState(0);
  const [gst_amount, set_gst_amount] = useState(0);
  const [total_amount, set_Total_amount] = useState(0);
  const [amount_to_words, setAmountWords] = useState("");
  const navigate=useNavigate();

  useEffect(() => {
    const number = location.state?.data?.mobile_no; // Use optional chaining
    console.log(number);
    const id = location.state?.data?.quotation_id; // Use optional chaining
    console.log(id);
    console.log(location.state.data);
    setQuotationPreview([location.state.data]);
    const fetchProductQuotation=async ()=>{
      const res=await apiGet(`/quotation/${id}`)
      console.log(res);
      console.log("product");
      setQuotationProduct(res);
    }
    fetchProductQuotation();
  }, [location.state]);

  // Check if challanPreview has data before rendering
  if (!quotationPreview.length) {
    return <Loader />;
  }

  // Assuming the first element contains the necessary data
  const quotationData = quotationPreview[0];
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
              function handleQuotationToInvoice(){
                console.log(location.state.data.quotation_id);
                const quotationId=location.state.data.quotation_id;
                const convert=async ()=>{
                  const res=await apiPost(`/invoices/convert/quotation/invoice/${quotationId}`);
                  // alert(res);
                  navigate("/quotation");
                }
                convert();
              }

  return (
    <div>
    <div className="over sm:flex sm:justify-center block" style={{ overflow: "scroll", height: "99vh" }}>
      <div className="py-6">
        <div className="w-screen max-w-4xl p-8 bg-white rounded-lg shadow-md">
          <h2 className="mb-6 text-3xl font-semibold text-center text-gray-800 d-inline-block">
          View Details
          </h2>

          <NavLink to="/quotation" className="text-white text-decoration-none">
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
                  labelName="Quotation"
                  classNameLabel="block mb-2 font-semibold text-gray-700"
                  labelInput="Quotation Date:"
                  type="text"
                  name="Quotation"
                  placeholder="date.month.year"
                  readOnly
                  value={quotationData?.sales_quotation_date || ''} // Use optional chaining
                  required
                  classNameInput="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                />
              </div>
              <div>
                <InputComponent
                  labelName="CustomerNumber"
                  classNameLabel="block mb-2 font-semibold text-gray-700"
                  labelInput="Customer Contact_Number"
                  type=""
                  name="customerNumber"
                  placeholder="Enter Customer number"
                  required
                  value={quotationData?.mobile_no || ''} // Use optional chaining
                  readOnly
                  classNameInput="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                />
              </div>
              <div>
                <InputComponent
                  labelName="quotation_prefix"
                  classNameLabel="block mb-2 font-semibold text-gray-700"
                  labelInput="Quotation Prefix"
                  type=""
                  name="quotation_prefix"
                  placeholder="null"
                  required
                  value={quotationData?.quotation_prefix || ''} // Use optional chaining
                  readOnly
                  classNameInput="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                />
              </div>
              <div>
                <InputComponent
                  labelName="paymentTerms"
                  classNameLabel="block mb-2 font-semibold text-gray-700"
                  labelInput="Payment Terms"
                  type=""
                  name="paymentTerms"
                  placeholder="null"
                  required
                  value={quotationData?.payment_terms || ''} // Use optional chaining
                  readOnly
                  classNameInput="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
              <div>
                <InputComponent
                  labelName="customerName"
                  classNameLabel="block mb-2 font-semibold text-gray-700"
                  labelInput="Customer Name"
                  value={quotationData?.customername || ''} // Use optional chaining
                  type="text"
                  name="customerName"
                  placeholder="Enter Customer name"
                  required
                  classNameInput="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                />
              </div>

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
            <div>
              <label htmlFor="billing_address" className="block mb-2 font-semibold text-gray-700">
                Additional Information's:
              </label>
              <textarea
                name="billing-address"
                readOnly
                rows="3"
                value={`Billing Address: ${quotationData?.billingaddress || ''}\nShipping Address: ${quotationData?.shippingaddress || ''}`}
                className="w-full p-3 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
              />
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
                  {quotationProduct.map((row, index) => (
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
                  value={quotationData?.taxable_amount || ''} // Use optional chaining
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
                  value={quotationData?.total_amount || ''} // Use optional chaining
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
                quotationData.notes?(
                  <div>
                <label htmlFor="challanNotes" className="block mb-2 font-semibold text-gray-700">
                  Notes:
                </label>
                <textarea
                  id="invoiceNotes"
                  value={quotationData?.notes || ''} // Use optional chaining
                  name="challanNotes"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                  placeholder="Any additional notes..."
                />
              </div>
                ):("")
              }

{
                quotationData.signature_box==null?(<></>):(
                  <div>
                <label htmlFor="signature_box" className="block mb-2 font-semibold text-gray-700">
                  Signature Box:
                </label>
                <img src={quotationData.signature_box} alt="Logo Preview" className="w-full h-40 object-cover border rounded" />
              </div>
                )
              }
            </div>
             <div className="mt-10 text-end">
                                         <ButtonComponent
                                         onClick={handleQuotationToInvoice}
                                           value="convert_quotation"
                                           type="button"
                                           label="Convert Quotation to Invoice"
                                           className="px-20 py-3 bg-[#3A5B76] text-white font-bold rounded hover:bg-[#2E4A62]"
                                         ></ButtonComponent>
                                       </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
}