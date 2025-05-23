import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiGet } from "../services/api";
import "../styles/generateChallan.css";
import {Loader} from "../layouts/Loader"
import { useReactToPrint } from "react-to-print";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { IoMdPrint } from "react-icons/io";
import { FaFilePdf } from "react-icons/fa6";
import { FaDownload } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { toWords } from "number-to-words";
export function GeneratePurchase() {
  const [bussinessData, setBussinessData] = useState(null);
  const [data, setData] = useState(null);
  const [date, setDate] = useState(new Date());
  const [purchaseProduct, setpurchaseProduct] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const location = useLocation();
  const contentRef = useRef();
  const handlePrintInvoice = useReactToPrint({ contentRef });
  const navigate=useNavigate();
  useEffect(() => {
    const dt=new Date;
    setDate(dt.toLocaleDateString());
    console.log(location.state.data);
    const number = location.state?.data[0]?.mobile_no; // Use optional chaining
    const id = location.state?.data[0]?.purchase_id; // Use optional chaining
    console.log(number);
    console.log(id);
    console.log(location.state.data);
    setData([location.state.data[0]]);

    const fetchProductpurchase = async () => {
      const res = await apiGet(`/purchase/${id}`);
      console.log(res.data);
      setpurchaseProduct(res.data);
      var qty = 0;
      for (var i of res.data) {
        qty = qty + parseInt(i.quantity);
      }
      console.log(qty);
      setQuantity(qty);
      // Clear existing product rows before setting new ones
    };

    fetchProductpurchase();
    const fetchBusiness = async () => {
      const res = await apiGet(`/businessprofile`);
      console.log(res);
      setBussinessData(res);
      // Clear existing product rows before setting new ones
    };

    fetchBusiness();
    fetchAmountToWord(location.state?.data[0]?.total_amount);
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
  const handleDownloadPrint = useReactToPrint({ contentRef });

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
  const bottomMargin = 10; // mm
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
    pdf.text(`${page + 1}/${totalPages}-${data[0].purchase_prefix}`, pageWidth / 2, pageHeight - 5, {
      align: "center",
    });

    yOffset += sliceCanvasHeight;
  }

  // Step 5: Save PDF
  pdf.save("purchase.pdf");
};
function handleEdit(e) {
  const purchaseId=location.state?.purchase_id;
  console.log(purchaseId);
  console.log(purchaseId);   
      //   alert(JSON.stringify(invoiceId));
      navigate("/purchaseEdit", { state: { data: location.state?.data[0] } });
  }

  return (
    <>
      {data != null && bussinessData != null ? (
        <div className="mt-2 w-full bg-white">
        <div className="flex justify-center">
        <div className=" bg-white w-4xl">
        <h3 className="text-center p-3 d-inline-block">Preview for Purchase</h3>
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
              {/* <div className=" mr-4 flex items-center rounded-full justify-center">
                <img
                  className="w-16 h-16 text-white font-bold text-xl"
                  src={data[0].logo}
                  alt=""
                />
              </div> */}
              <div className="" style={{color:"#364153"}}>
                <div id="company-name" style={{ color: " #000000" }}>
                  {bussinessData[0].vendor_business_legal_name} ™
                </div>
                <div id="company-address">{bussinessData[0].address}</div>
                <div className="text-sm" style={{color:"#364153"}}>
                  Indore, Madhya Pradesh, 452006
                </div>
                <div id="company-gst-number-content">
                  <span>GSTIN : </span>
                  <span id="company-gst-number">{bussinessData[0].vendor_gstin}</span>
                </div>
                <div id="company-mobile-number-content">
                  <span>Mobile :</span>&nbsp;
                  <span id="company-mobile-number">
                    {bussinessData[0].vendor_phone}
                  </span>
                </div>
                <div id="company-mobile-number-content">
                  <span>Email :</span>&nbsp;
                  <span id="company-mobile-number">
                    {bussinessData[0].vendor_email}
                  </span>
                </div>
                <div id="company-pan-number-content">
                  <span>PAN Number :</span>&nbsp;
                  <span id="company-pan-number">{bussinessData[0].vendor_pan}</span>
                </div>
              </div>
            </div>
            <div id="invoice-details-meta" class="invoice_details" data-subsection-id="1">
                    <div id="invoice-main-details">
                      <div class="page-header-type">
                        <div class="page-header-type-value">PURCHASE INVOICE</div>
                        <div class="page-header-sub-type">Original for Recipient</div>
                      </div>
                      <div id="invoice-number-container">
                        <div id="invoice-number-label">Purchase No.</div>
                        <div class="middle-colon">:</div>
                        <div id="invoice-number" class="bold">{data[0].purchase_number}</div>
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
                  purchaseProduct.map((product, index) => (
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
              {/* <div className="flex justify-between w-64 mt-2">
                <span className="text-sm " style={{color:"#364153"}}>Received Amount</span>
                <span className="text-sm " style={{color:"#364153"}}>₹ 0</span>
              </div> */}
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
              Receiver's Signature for 
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
              Authorised Signature for 
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
      ) : (
        <div><Loader/></div>
      )}
    </>
  );
}
