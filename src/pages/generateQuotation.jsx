import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiGet } from "../services/api";
import "../styles/generateChallan.css";
import { useReactToPrint } from "react-to-print";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toWords } from "number-to-words";
import { FaDownload } from "react-icons/fa6";
import { IoMdPrint } from "react-icons/io";
import { FaFilePdf } from "react-icons/fa6";
import {Loader} from "../layouts/Loader"
import { FaEdit } from "react-icons/fa";
export function GenerateQuotationn() {
  const [loader,setLoader]=useState(true);
  const [bussinessData, setBussinessData] = useState(null);
  const [data, setData] = useState(null);
  const [date, setDate] = useState(new Date());
  const [challanProduct, setChallanProduct] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const location = useLocation();
  const contentRef = useRef();
  const handleDownloadPrint = useReactToPrint({ contentRef });
  useEffect(() => {
    try{
      const dt=new Date;
    setDate(dt.toLocaleDateString());
    console.log(location.state.data);
    const number = location.state?.data[0]?.mobile_no; // Use optional chaining
    const id = location.state?.data[0]?.quotation_id; // Use optional chaining
    console.log(number);
    console.log(id);
    console.log(location.state.data);
    setData([location.state.data[0]]);

    const fetchProductQuotation = async () => {
      const res = await apiGet(`/quotation/${id}`);
      console.log(res);
      setChallanProduct(res);
      var qty = 0;
      for (var i of res) {
        qty = qty + parseInt(i.quantity);
      }
      setQuantity(qty);
      // Clear existing product rows before setting new ones
    };

    fetchProductQuotation();
    const fetchBusiness = async () => {
      const res = await apiGet(`/businessprofile`);
      console.log(res);
      setBussinessData(res);
      // Clear existing product rows before setting new ones
    };

    fetchBusiness();
    fetchAmountToWord(location.state?.data[0]?.total_amount);
    }
    catch(err){
      console.log(err);
    }
    finally{
      setLoader(false);
    }
  }, [location.state]);
 
  const [amount, setAmount] = useState('');
    const [amountWords, setAmountWords] = useState('');
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
              console.log(result.toUpperCase() + " " + word.toUpperCase() + " RUPEES ONLY/-");
            }
            

  }


  // const handleDownloadPDF = async () => {
  //   if (!contentRef.current || !data || !bussinessData) return;

  //   const canvas = await html2canvas(contentRef.current, {
  //     scale: 2,
  //     useCORS: true,
  //   });

  //   const imgData = canvas.toDataURL("image/png");
  //   const pdf = new jsPDF("p", "mm", "a4");

  //   const pdfWidth = pdf.internal.pageSize.getWidth();
  //   const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  //   pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  //   pdf.save("challan.pdf");
  // };

  // Check if challanPreview has data before rendering

  // return(
  //     <>
  //     div
  //     </>
  // )
  // return(
  //         <>
  //         <button onClick={handlePrintInvoice}>Print Invoice</button>
  //         {
  //             data!=null&&bussinessData!=null
  //             ?
  //             (
  //                 <div ref={contentRef} className="genearte-invoice-body" style={{height:"200%"}}>
  //                  <div>
  //                  <div className="content-header">
  //                      <div className="left-content-header">
  //                          <div className="brand-logo">
  //                          {/* <h2 className="text-gray-700">Bill<span className="text-green-600">●</span>365</h2> */}
  //                          <img src={data[0].logo} className="logo-adjust" alt="" />
  //                          </div>
  //                          <div className="content">
  //                              <p>{bussinessData[0].business_name}</p>

  //                              <p>{bussinessData[0].address}</p>

  //                              <p>Madhya Pradesh</p>

  //                          </div>
  //                      </div>
  //                      <div className="right-content-header">
  //                          <br />
  //                          <span className="">Ph.{bussinessData[0].mobile_no}</span>
  //                          <br />
  //                          <span className="">Er.{bussinessData[0].name}</span>
  //                      </div>
  //                  </div>
  //                  <p className="hr" />
  //                  <p className="section-align">All systems comes here</p>
  //                  <p className="hr"/>
  //                  <div className="border-content">
  //                      <div className="content-heading">
  //                          <p ><span className="fw-bolder margin-all">GSTIN: </span></p>
  //                          <p className="tax-invoice-color">TAX INVOICE</p>
  //                          <p className="margin-right-all">original for recipient</p>
  //                      </div>
  //                      <div className="customer-detail">
  //                          <div className="customer-detail-content">
  //                              <div className="customer-detail-align">
  //                                   <div className="customer-detail-head"><span>Customer Detail</span></div>
  //                                  <dl className="customer-detail-list margin-all">
  //                                  <dt>M/s</dt>
  //                                  <dd>{data[0].customername}</dd>
  //                                  <dt>Address</dt>
  //                                  <dd>{data[0].billingaddress}</dd>
  //                                  <dt>PHONE</dt>
  //                                  <dd>{data[0].customername}</dd>
  //                                  <dt>GSTIN</dt>
  //                                  <dd>{data[0].gst}</dd>
  //                                  <dt>Place of <br />supply</dt>
  //                                  <dd>{data[0].shippingaddress}</dd>
  //                              </dl>
  //                              </div>
  //                              <dl className="right-details-customer margin-all">
  //                                  <div className="div-1">
  //                                  <dt>Invoice No.</dt>
  //                                  <dd>{data[0].challan_id}</dd>
  //                                  <dt>Due Date</dt>
  //                                  <dd>{data[0].due_date}</dd>
  //                                  </div>
  //                                  <div className="div-2">
  //                                  <dt>Invoice Date</dt>
  //                                  <dd>{data[0].sales_challan_date}</dd>
  //                                  </div>
  //                              </dl>
  //                          </div>
  //                      </div>
  //                      <div className="add-border-bottom"><br /></div>
  //                      <div className="table-data-starts">
  //                          <table className="table-body">
  //                              <thead>
  //                                  <tr>
  //                                      <th rowSpan="2">Sr.No.</th>
  //                                      <th rowSpan="2">Name of Product / Services</th>
  //                                      <th rowSpan="2">HSN/SAC</th>
  //                                      <th rowSpan="2">Qty</th>
  //                                      <th rowSpan="2">Rate</th>
  //                                      <th rowSpan="2">Taxable Value</th>
  //                                     <th colSpan="2">IGST</th>
  //                                      <th rowSpan="2">Total</th>
  //                                  </tr>
  //                                  <tr>
  //                                     <th>%</th>
  //                                     <th>Amount</th>
  //                                  </tr>
  //                              </thead>
  //                              <tbody>
  //                                  {
  //                                      data.map((data,index)=>
  //                                             challanProduct.map((product,index)=>

  //                                          <tr>
  //                                                  <td>{index+1}</td>
  //                                                  <td>{product.productname}</td>
  //                                                  <td>{product.hsncode}</td>
  //                                                  <td>{product.quantity}</td>
  //                                                  <td>{product.unitprice}</td>
  //                                                  <td>{product.unit_price}</td>
  //                                                 <td>{parseInt(product.tax_rate)+"%"}</td>
  //                                                 <td>{(product.tax_rate*product.unit_price)/100}</td>
  //                                                 <td>{product.total_price}</td>
  //                                                  </tr>
  //                                           ) )
  //                                  }
  //                              </tbody>
  //                              <tfoot>
  //                                 <tr>
  //                                     <td colSpan={3} className="text-end">Total</td>
  //                                     <td>{}</td>
  //                                     <td></td>
  //                                     <td>{}</td>
  //                                     <td></td><td>{}</td>
  //                                     <td className="">{}</td>
  //                                 </tr>
  //                              </tfoot>
  //                          </table>
  //                      </div>
  //                      <div className="footer-part">
  //                         <div className="left-footer-adjust">
  //                         <div className="amount-adjust"><p>Total in Words</p>
  //                              <p>{}</p>
  //                         </div>
  //                         <div className="bank-detail">
  //                             <p>Bank Details</p>
  //                             <dl>
  //                                 <dt>Name</dt>
  //                                 <dd>ICICI</dd>
  //                                 <dt>Branch</dt>
  //                                 <dd>Indore</dd>
  //                                 <dt>IFSC</dt>
  //                                 <dd>ICIC045F</dd>
  //                                 <dt>UPI ID</dt>
  //                                 <dd>ifox@icici</dd>
  //                             </dl>
  //                         </div>
  //                         <div className="terms-condition">
  //                             <p>Terms and Condition</p>
  //                             <p className=""> Subject to our home Ahmedabad. <br />
  // Our Responsibility Ceases as soon as goods leaves our Premises.
  // <br />
  // Goods once sold will not taken back.
  // <br />
  // Delivery Ex-Premises.</p>
  //                         </div>
  //                         </div>
  //                         <div className="right-fotter-align">
  //                             <div>
  //                                 <div>
  //                                     <dl className="dlClass">
  //                                         <div className="right-dl-align">
  //                                         <dt>Taxable Amount</dt>
  //                                         <dd>{}</dd>
  //                                         </div>
  //                                         <div className="right-dl-align">
  //                                         <dt>Add: IGST</dt>
  //                                         <dd>coming..</dd>
  //                                         </div>
  //                                         <div className="right-dl-align">
  //                                         <dt>Total Tax</dt>
  //                                         <dd>{}</dd>
  //                                         </div>

  //                                         <div className="right-dl-align">
  //                                         <dt>Total amount after tax</dt>
  //                                         <dd>{"₹"}</dd>
  //                                         </div>
  //                                         <div className="right-dl-align">
  //                                         <dt></dt>
  //                                         <dd>(E & O.E)</dd>
  //                                         </div>
  //                                     </dl>
  //                                 </div>
  //                                 <div className="certified-right">
  //                                     <p> Certified that the particulars given above are true and correct.
  //                                         <br />
  //                                     </p>
  //                                     <p>For Compunic Pvt.Ltd</p>
  //                                 </div>
  //                                 <div className="signature">Authorized Signature</div>
  //                             </div>
  //                         </div>
  //                      </div>
  //                  </div>
  //                 </div>
  //                 </div>
  // ):(
  //     <div>Loading....</div>
  // )
  // }
  //      </>

  //      )
  

// const handleDownloadPDF = async () => {
//   if (!contentRef.current || !data || !bussinessData) return;

//   const element = contentRef.current;

//   // Convert HTML to canvas at high resolution
//   const canvas = await html2canvas(element, {
//     scale: 3, // High quality
//     useCORS: true,
//   });

//   const imgData = canvas.toDataURL("image/png");

//   const pdf = new jsPDF("p", "mm", "a4");
//   const pageWidth = pdf.internal.pageSize.getWidth();
//   const pageHeight = pdf.internal.pageSize.getHeight();

//   const topMargin = 10; // mm
//   const bottomMargin = 10; // mm
//   const usableHeight = pageHeight - topMargin - bottomMargin;

//   // Full image dimensions in mm
//   const imgWidth = pageWidth;
//   const imgHeight = (canvas.height * pageWidth) / canvas.width;

//   const totalPages = Math.ceil(imgHeight / usableHeight);
//   let yOffset = 0;

//   for (let i = 0; i < totalPages; i++) {
//     if (i > 0) pdf.addPage();

//     const sliceHeight = (usableHeight * canvas.width) / pageWidth;

//     const sliceCanvas = document.createElement("canvas");
//     sliceCanvas.width = canvas.width;
//     sliceCanvas.height = sliceHeight;

//     const ctx = sliceCanvas.getContext("2d");
//     ctx.drawImage(
//       canvas,
//       0,
//       yOffset,
//       canvas.width,
//       sliceHeight,
//       0,
//       0,
//       canvas.width,
//       sliceHeight
//     );

//     const sliceImgData = sliceCanvas.toDataURL("image/png");
//     const sliceImgHeight = (sliceHeight * pageWidth) / canvas.width;

//     pdf.addImage(
//       sliceImgData,
//       "PNG",
//       0,
//       topMargin,
//       imgWidth,
//       sliceImgHeight
//     );

//     // Page number
//     pdf.setFontSize(10);
//     pdf.text(`${i + 1}/${totalPages}`, pageWidth / 2, pageHeight - 5, { align: "center" });

//     yOffset += sliceHeight;
//   }

//   pdf.save("challan.pdf");
// };


const handleDownloadPDF = async () => {
  if (!contentRef.current || !data || !bussinessData) return;

  const element = contentRef.current;

  // Step 1: Capture full canvas at high quality
  const canvas = await html2canvas(element, {
    scale: 4, // Very high quality (adjust 3–5 as needed)
    useCORS: true,
  });

  const imgData = canvas.toDataURL("image/png");

  // Step 2: Setup PDF
  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();  // 210mm
  const pageHeight = pdf.internal.pageSize.getHeight(); // 297mm

  // Step 3: Define margins
  const topMargin = 10;    // mm
  const bottomMargin = 22; // mm
  const usableHeight = pageHeight - topMargin - bottomMargin;

  // Step 4: Calculate image size in mm
  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  const totalPages = Math.ceil(imgHeight / usableHeight);

  let yOffset = 0;

  for (let page = 0; page < totalPages; page++) {
    if (page !== 0) pdf.addPage();

    // Height of slice in canvas pixels
    const sliceCanvasHeight = (usableHeight * canvas.width) / imgWidth;

    const sliceCanvas = document.createElement("canvas");
    sliceCanvas.width = canvas.width;
    sliceCanvas.height = sliceCanvasHeight;

    const ctx = sliceCanvas.getContext("2d");
    ctx.drawImage(
      canvas,
      0,
      yOffset,
      canvas.width,
      sliceCanvasHeight,
      0,
      0,
      canvas.width,
      sliceCanvasHeight
    );

    const sliceImg = sliceCanvas.toDataURL("image/png");
    const sliceImgHeight = (sliceCanvasHeight * imgWidth) / canvas.width;

    pdf.addImage(
      sliceImg,
      "PNG",
      0,
      topMargin,
      imgWidth,
      sliceImgHeight,
      undefined,
      "FAST" // use "FAST" to disable internal compression
    );

    // Add page number
    pdf.setFontSize(10);
    pdf.text(`${page + 1}/${totalPages}-${data[0].quotation_prefix}`, pageWidth / 2, pageHeight - 5, {
      align: "center",
    });

    yOffset += sliceCanvasHeight;
  }

  // Step 5: Save PDF
  pdf.save("quotation.pdf");
};
const navigate=useNavigate();
function handleEdit(e) {
  const quotationId=location.state?.quotation_id;
  console.log(quotationId);
  console.log(quotationId);   
      //   alert(JSON.stringify(invoiceId));
      navigate("/quotation-edit", { state: { data: location.state?.data[0] } });
  }

  return (
    <>
      {data != null && bussinessData != null ? (
        <div className="mt-2">
          <div className="flex justify-center">
      <div className=" bg-white w-4xl">
      <h3 className="text-center p-3 d-inline-block">Preview for Quotation</h3>
      <div className="float-end">
      <button className="" onClick={handleDownloadPrint}><IoMdPrint className="iconSize"/></button>
      <button className="" onClick={handleDownloadPDF}><FaDownload className="iconSize"/></button>
      <button className="" onClick={(e)=>handleEdit(e)}><FaEdit className="iconSize"/></button>
      </div>
      </div>
      </div>
        <div ref={contentRef}
          className="mx-auto w-4xl p-5"
          style={{backgroundColor:"white"}}
        >
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
            {
                data[0].logo!=null?(
                  <div className=" mr-4 flex items-center rounded-full justify-center">
                <img
                  className="w-16 h-16 text-white font-bold text-xl"
                  src={data[0].logo}
                  alt=""
                /> 
                {/* hi1 */}
              </div>
                ):(<></>)
              }
              <div className="" style={{color:"#364153"}}>
                <div id="company-name" style={{ color: " #000000" }}>
                  {bussinessData[0].business_name} ™
                </div>
                <div id="company-address">{bussinessData[0].address}</div>
                <div className="text-sm" style={{color:"#364153"}}>
                  Indore, Madhya Pradesh, 452006
                </div>
                <div id="company-gst-number-content">
                  <span>GSTIN : </span>
                  <span id="company-gst-number">{bussinessData[0].gst}</span>
                </div>
                <div id="company-mobile-number-content">
                  <span>Mobile :</span>&nbsp;
                  <span id="company-mobile-number">
                    {bussinessData[0].mobile_no}
                  </span>
                </div>
                <div id="company-mobile-number-content">
                  <span>Email :</span>&nbsp;
                  <span id="company-mobile-number">
                    {bussinessData[0].business_profile_email}
                  </span>
                </div>
                <div id="company-pan-number-content">
                  <span>PAN Number :</span>&nbsp;
                  <span id="company-pan-number">{bussinessData[0].pan_no}</span>
                </div>
              </div>
            </div>
            <div id="invoice-details-meta" class="invoice_details" data-subsection-id="1">
                    <div id="invoice-main-details">
                      <div class="page-header-type">
                        <div class="page-header-type-value">QUOTATION</div>
                        <div class="page-header-sub-type">Original for Recipient</div>
                      </div>
                      <div id="invoice-number-container">
                        <div id="invoice-number-label">QUOTATION NO.</div>
                        <div class="middle-colon">:</div>
                        <div id="invoice-number" class="bold">{data[0].quotation_prefix}</div>
                      </div>
                      <div id="invoice-date-container">
                        <div id="invoice-date-label">DATE</div>
                        <div class="middle-colon">:</div>
                        <div id="invoice-date" class="bold">{date}</div>
                      </div>
                      
                      <section id="invoice-addn-fields-container"></section>
                    </div>
                  </div>
          </div>

          <div className="grid grid-cols-2 gap-20 mb-6">
            <div>
              <div
                id="title-bill-to"
                className="title-bill-ship-to"
                style={{ backgroundColor: "#E2E2E2", color: "#000000" }}
              >
                BILL TO
              </div>
              <div className="text-sm" style={{color:"#364153"}}>
                Customer Name : {data[0].customername}
              </div>
              <div className="text-sm" style={{color:"#364153"}}>
                Customer Billing Address : {data[0].billingaddress}
              </div>
              <div className="text-sm  mb-1" style={{color:"#364153"}}>
                GSTIN : {data[0].gst}
              </div>
              <div className="text-sm  mb-1" style={{color:"#364153"}}>
                Contact Number : {data[0].mobile_no}
              </div>
            </div>
            <div>
              <div
                id="title-bill-to"
                className="title-bill-ship-to"
                style={{ backgroundColor: "#E2E2E2", color: "#000000" }}
              >
                SHIP TO
              </div>
              <div className="text-sm" style={{color:"#364153"}}>
                Customer Name : {data[0].customername}
              </div>
              <div className="text-sm" style={{color:"#364153"}}>
                Customer Shipping Address : {data[0].shippingaddress}
              </div>
              <div className="text-sm  mb-1" style={{color:"#364153"}}>
                GSTIN : {data[0].gst}
              </div>
              <div className="text-sm  mb-1" style={{color:"#364153"}}>
                Contact Number : {data[0].mobile_no}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <table className="min-w-full border-collapse" style={{border:"1px solid #d1d5dc"}}>
              <thead>
                <tr>
                  <th
                    scope="col"
                    class="items-table-header items-serial-number-header"
                    style={{ backgroundColor: "#E2E2E2" }}
                  >
                    S.NO.
                  </th>
                  <th
                    scope="col"
                    class="items-table-header items-type-header"
                    style={{ backgroundColor: "#E2E2E2" }}
                  >
                    ITEMS/SERVICES
                  </th>
                  <th
                    scope="col"
                    class="items-table-header items-hsn-header items-hsn-column"
                    style={{ backgroundColor: "#E2E2E2" }}
                  >
                    HSN/SAC
                  </th>

                  <th
                    scope="col"
                    class="items-table-header items-qty-column"
                    style={{ backgroundColor: "#E2E2E2" }}
                  >
                    QTY.
                  </th>

                  <th
                    scope="col"
                    class="items-table-header items-rate-header items-rate-column"
                    style={{ backgroundColor: "#E2E2E2" }}
                  >
                    RATE
                  </th>

                  <th
                    scope="col"
                    class="items-table-header tax-column"
                    style={{ backgroundColor: "#E2E2E2" }}
                  >
                    TAX
                  </th>

                  <th
                    scope="col"
                    class="items-table-header"
                    style={{ backgroundColor: "#E2E2E2" }}
                  >
                    AMOUNT
                  </th>
                </tr>
              </thead>
              <tbody className="border">
                {data.map((data, index) =>
                  challanProduct.map((product, index) => (
                    <tr>
                      <td className="border p-1">{index + 1}</td>
                      <td className="border p-1">{product.productname}</td>
                      <td className="border p-1">{product.hsncode}</td>
                      <td className="border p-1">{product.quantity}pcs</td>
                      <td className="border p-1">{product.unitprice}</td>
                      <td className="border p-1">
                        {parseInt(product.calculatedgst)}{" "}
                        <span className="" style={{ fontSize: "13px" }}>
                          ({product.gstrate}%)
                        </span>
                      </td>
                      <td className="border p-1">{product.total}</td>
                    </tr>
                  ))
                )}
              </tbody>
              <tfoot>
                <tr style={{ backgroundColor: "#E2E2E2" }}>
                  <td></td>
                  <td className="font-medium pr-1.5">Sub Total</td>
                  <td></td>
                  <td className="font-medium pr-1.5">{quantity}</td>
                  <td></td>
                  <td className="font-medium pr-1.5">
                    ₹{parseFloat(data[0].cgst) + parseFloat(data[0].sgst)}
                  </td>
                  <td className="font-medium pr-1.5">
                    ₹{data[0].total_amount}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="flex justify-between mb-1">
          <div className="w-1/2 mt-3">
                <div id="bank-details" class="misc-details bank_details" data-subsection-id="6">
                      <div id="bank-details-label">BANK DETAILS</div>
                      <div class="bank-details-info">
                        <div class="bank-details-info-label">Name:</div>
                        <div id="bank-details-name" class="bank-details-value">{data[0].ifsccode} </div>
                      </div>
                      <div class="bank-details-info">
                        <div class="bank-details-info-label">IFSC Code:</div>
                        <div id="bank-details-ifsc" class="bank-details-value">BARB0MGRIND</div>
                      </div>
                      <div class="bank-details-info">
                        <div class="bank-details-info-label">Account No:</div>
                        <div id="bank-details-account" class="bank-details-value">42710400000548</div>
                      </div>
                      <div class="bank-details-info">
                        <div class="bank-details-info-label">Bank:</div>
                        <div id="bank-details-bank-name" class="bank-details-value">Bank of Baroda,MG ROAD, INDORE,MP</div>
                      </div>
                    </div>
                </div>
            <div className="w-1/2 flex flex-col items-end">
              <div className="flex justify-between w-64">
                <span className="text-sm " style={{color:"#364153"}}>TAXABLE AMOUNT</span>
                <span className="text-sm " style={{color:"#364153"}}>₹ {data[0].taxable_amount}</span>
              </div>
              <div className="flex justify-between w-64">
                <span className="text-sm" style={{color:"#364153"}}>CGST @</span>
                <span className="text-sm " style={{color:"#364153"}}>₹ {data[0].cgst}</span>
              </div>
              <div className="flex justify-between w-64">
                <span className="text-sm " style={{color:"#364153"}}>SGST @</span>
                <span className="text-sm " style={{color:"#364153"}}>₹ {data[0].sgst}</span>
              </div>
              <div className="flex justify-between w-64 mt-2">
                <span className="text-lg text-invoice-total">
                  TOTAL AMOUNT
                </span>
                <span className=" text-invoice-total text-right">
                  ₹ {data[0].total_amount}
                </span>
              </div>
              <div className="flex justify-between w-64 mt-2">
                <span className="text-sm " style={{color:"#364153"}}>Received Amount</span>
                <span className="text-sm " style={{color:"#364153"}}>₹ 0</span>
              </div>
            </div>
          </div>
          <div className="mt-5">
                <div className="text-sm font-italic " style={{color:"#364153"}}>
                  Total Amount (in words): {amountWords}
                </div>
              </div>
                <div className="flex justify-between mb-4">
                <div className="w-1/2">
                <div className="mt-6">
                    <div>
            <div className="font-serif text-lg text-invoice-signature mb-2">
              <div className="border border-b-black" style={{width:"200px",height:"100px"}}>

              </div>
              Receiver's Signature
            </div>
            </div>
          </div>
                </div>
                <div className="w-1/2">
                <div className="text-right mt-6">
                    <div>
            <div className="font-serif text-lg text-invoice-signature mb-2">
              <img src={data[0].signature_box} alt="" style={{width:"200px",height:"100px"}}/> 
              <br /> 
              Authorised Signature
            </div>
            </div>
          </div>
                </div>
                </div>
                <div>
                <div className="">
              <div id="tnc-label">TERMS AND CONDITIONS</div>
              <div id="tnc-value">
                Goods once sold will not be taken back. All Warranty &amp;
                replacement material will be replaced or repair as per
                manufacturers policy from their service center. We are not
                responsible for any warranty on any product under any
                circumstances of respective Manufacturer. Replacement should be
                done at the source only. Payment should be made within 15 Days
              </div>
            </div>
                </div>
        </div>
        </div>
      ):(<Loader/>)}
    </>
  );
}
