
import { useEffect, useRef, useState } from "react";
import { apiGet, apiPost } from "../services/api";
// import "../styles/generateChallan.css";
import { useReactToPrint } from "react-to-print";
import html2canvas from "html2canvas";
import { ProgressSpinner } from 'primereact/progressspinner';
import jsPDF from "jspdf";
import { FaDownload } from "react-icons/fa6";
import { toWords } from "number-to-words";
import { IoMdPrint } from "react-icons/io";
import { FaFilePdf } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { Loader } from "../layouts/Loader";
import { useLocation, useNavigate } from "react-router-dom";
export function GeneratePurchase() {
  const [loader, setLoader] = useState(true);
  const [bussinessData, setBussinessData] = useState(null);
  const [data, setData] = useState(null);
  const [date, setDate] = useState(new Date());
  const [purchaseProduct, setChallanProduct] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const location = useLocation();
  const contentRef = useRef();
  const navigate = useNavigate();
  const handleDownloadPrint = useReactToPrint({ contentRef });
  const purchaseData = {
    invoiceNumber: 'INV-2025-001',
    invoiceDate: 'May 24, 2025',
    dueDate: 'June 24, 2025',
    from: {
      name: 'BILL365 Solutions Pvt. Ltd.',
      address: '123 Digital Avenue, Tech City',
      city: 'Bengaluru, Karnataka',
      zip: '560001',
      gstin: '29ABCDE1234F1Z5',
      email: 'info@bill365.in',
      phone: '+91 98765 43210',
    },
    to: {
      name: 'Innovate Tech Services',
      address: '456 Business Park, Cyber Hub',
      city: 'Gurugram, Haryana',
      zip: '122002',
      gstin: '06FGHIJ5678K2Z9',
      email: 'accounts@innovatetech.com',
    },
    items: [
      { description: 'Software Development Services (Phase 1)', hsnSac: '998313', quantity: 1, unitPrice: 75000, gstRate: 18 },
      { description: 'UI/UX Design Consultation (10 hours)', hsnSac: '998314', quantity: 10, unitPrice: 2500, gstRate: 18 },
      { description: 'Monthly Cloud Hosting Subscription', hsnSac: '998315', quantity: 1, unitPrice: 5000, gstRate: 18 },
    ],
    paymentDetails: {
      bankName: 'State Bank of India',
      accountNumber: 'XXXX XXXX 1234',
      ifscCode: 'SBIN0001234',
      upiId: 'bill365@sbi',
    },
    notes: 'Thank you for your business! We appreciate your prompt payment.',
    terms: 'Payment is due within 30 days of the purchase date. Late payments may incur a 2% monthly interest charge.',
  };
  useEffect(() => {
    try {
      const dt = new Date();
      setDate(dt.toLocaleDateString());
      console.log(location.state.data);
      const number = location.state?.data[0]?.mobile_no; // Use optional chaining
      const id = location.state?.data[0]?.purchase_id; // Use optional chaining
      console.log(number);
      console.log(id);
      console.log(location.state.data);
      setData([location.state.data[0]]);

      const fetchProductPurchase = async () => {
        const res = await apiGet(`/purchase/${id}`);
        console.log(res);
        setChallanProduct(res.data);
        var qty = 0;
        for (var i of res.data) {
          qty = qty + parseInt(i.quantity);
        }
        setQuantity(qty);
        // Clear existing product rows before setting new ones
      };

      fetchProductPurchase();
      const fetchBusiness = async () => {
        const res = await apiGet(`/businessprofile`);
        console.log(res);
        setBussinessData(res);
        // Clear existing product rows before setting new ones
      };

      fetchBusiness();
      fetchAmountToWord(location.state?.data[0]?.total_amount);
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  }, [location.state]);

  const [amount, setAmount] = useState("");
  const [amountWords, setAmountWords] = useState("");
  function fetchAmountToWord(totall) {
    console.log(totall);
    console.log("i am totall");
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
      console.log(
        result.toUpperCase() + " " + word.toUpperCase() + " RUPEES ONLY/-"
      );
    }
  }
  // Helper function to format currency (moved outside for reusability)
  function handleEdit(e) {
  const purchaseId=location.state?.purchase_id;
  console.log(purchaseId);
  console.log(purchaseId);
      //   alert(JSON.stringify(invoiceId));
      navigate("/purchaseEdit", { state: { data: location.state?.data[0] } });
  }
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
    pdf.text(`${page + 1}/${totalPages}-${data[0].challan_prefix}`, pageWidth / 2, pageHeight - 5, {
      align: "center",
    });

    yOffset += sliceCanvasHeight;
  }

  // Step 5: Save PDF
  pdf.save("purchase.pdf");
};
const [download,setDownload]=useState(false);
function handlePdf(){
  const generatePdfData={
    purchaseData:data[0],
    vendorData:bussinessData[0],
    quantity:quantity,
    amountInWords:amountWords,
    product:purchaseProduct
  }
  console.log(generatePdfData);
  const pdf = async () => {
    setDownload(true);
  try {
    const res = await apiPost('/hardcopy/purchase',generatePdfData);
    console.log(res);
    const data = await res.data;

    if (!data || !data.pdfBase64) {
      throw new Error('Invalid PDF response');
    }

    // Convert comma-separated string to Uint8Array
    const byteArray = data.pdfBase64.split(',').map(Number);
    const uint8Array = new Uint8Array(byteArray);

    // Create blob and download
    const blob = new Blob([uint8Array], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'purchase.pdf';
    a.click();
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error('Download error:', err);
    setDownload(false);
    handleDownloadPDF();
  }
  finally{
    setDownload(false);
  }
};
pdf();
}
  return (
    <>
      {data != null && bussinessData != null ? (
        <div className="flex justify-center mt-2">
          <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 w-full max-w-7xl mb-12">
            <h2 className="text-2xl font-bold text-[#314158] mb-6 border-b border-[#cad5e2] pb-2">
          <div className="flex justify-between">
            <div></div>
            <div className="">
<button className="" onClick={handleDownloadPrint}><IoMdPrint className="!text-[#3A5B76] mr-3"/></button>
{!download?(
                  <button className="" onClick={handlePdf}>
                    <FaDownload className="!text-[#3A5B76] mr-3" />
                  </button>
                  ):(
                  <button className="me-2">
                    <ProgressSpinner
                      style={{ width: '30px', height: '30px' }}
                      strokeWidth="8"
                      fill="var(--surface-ground)"
                      animationDuration=".5s"
                    />
                  </button>
                  )}
<button className="" onClick={(e)=>handleEdit(e)}><FaEdit className="!text-[#3A5B76] mr-3"/></button>
</div>
</div>
            </h2>
            <div className="p-4" ref={contentRef}>
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8">
              <div className="flex items-start sm:items-end">
                <div className="m-auto">
                  {data[0].logo != null ? (
                    <img
                      src={data[0].logo}
                      className="w-[100px] h-[125px] object-contain rounded-2xl mr-3"
                      alt=""
                    />
                  ) : (
                    <>
                      <h1 className="!font-bold mr-3">
                        {data[0].business_name!=null?data[0].business_name.substring(0, 1).toUpperCase():""}
                      </h1>
                    </>
                  )}
                </div>
                <div className="">
                  <h3 className="!text-2xl !font-bold" style={{color:"#FF7F50"}}>
                    {bussinessData[0].vendor_business_legal_name.toUpperCase()}{" "}
                    ™
                  </h3>
                  {/* <p className="text-sm text-slate-600">{purchaseData.from.address}, {purchaseData.from.city} - {purchaseData.from.zip}</p> */}
                  <p className="!text-sm !text-[#314158]">
                    {bussinessData[0].gstin==null  || bussinessData[0].gstin==undefined  ?"": "GSTIN" +":"+bussinessData[0].vendor_gstin}
                  </p>
                  <p className="!text-sm !text-[#314158]">
                     Email:{" "}
                    {bussinessData[0].vendor_email}
                  </p>
                  <p className="!text-sm !text-[#314158]">
                    Phone:{" "}
                    {bussinessData[0].vendor_phone}
                  </p>
                </div>
              </div>
              <div className="mt-6 sm:mt-0 text-left sm:text-right">
                <h4 className="text-sm text-slate-600">Purchase Number:</h4>
                <h4 className="!text-lg !font-bold !text-[#314158]">
                  {data[0].purchase_prefix}
                </h4>
                <p className="text-sm text-[#314158]">Purchase Date: {date}</p>
                {/* <p className="text-sm text-[#314158]">
                  Due Date: {data[0].due_date}
                </p> */}
              </div>
            </div>

            {/* Bill To Section */}
            <div className="mb-8 p-4 bg-[#f8fafc] rounded-md border bg-[#e2e8f0]">
              <p className="text-sm text-[#314158] font-semibold mb-1">
                BILL TO:
              </p>
              <h3 className="text-xl font-semibold text-[#1d293d]">{data[0].customername}</h3>
      <p className="text-sm text-[#45556c]">{data[0].billingaddress != "  null null null"
                ? data[0].billingaddress
                   : ""}</p>
      {/* <p className="text-sm text-[#45556c]">{data[0].gst != "" ? "GSTIN" + "-" + data[0].gst : ""}{" "}</p> */}
             <p className="text-sm text-[#45556c]">Mobile No: {data[0].mobile_no}</p>
            </div>

            {/* Items Table */}
            <div className="overflow-x-auto mb-8">
              <table className="min-w-full bg-white border border-[#cad5e2] rounded-md">
                <thead>
                  <tr className="bg-[#20B2AA] text-white text-left text-sm font-semibold">
                    <th className="py-3 px-4 border-b border-[#cad5e2] rounded-tl-md">
                      S.NO.
                    </th>
                    <th className="py-3 px-4 border-b border-[#cad5e2] rounded-tl-md">
                      ITEMS/SERVICES
                    </th>
                    <th className="py-3 px-4 border-b border-[#cad5e2]">
                      HSN/SAC
                    </th>
                    <th className="py-3 px-4 text-right border-b border-[#cad5e2]">
                      Qty
                    </th>
                    <th className="py-3 px-4 text-right border-b border-[#cad5e2]">
                      Unit Price
                    </th>
                    <th className="py-3 px-4 text-right border-b border-[#cad5e2]">
                      GST (%)
                    </th>
                    <th className="py-3 px-4 text-right border-b border-[#cad5e2] rounded-tr-md">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((data, index) =>
                    purchaseProduct.map((product, index) => (
                      <tr className="!border-b !border-[#e2e8f0] !last:border-b-0">
                        <td className="py-3 px-4 text-sm text-[#314158]">
                          {index + 1}
                        </td>
                        <td className="py-3 px-4 text-sm text-[#314158]">
                          {product.productname}
                        </td>
                        <td className="py-3 px-4 text-sm text-[#314158] text-right">
                          {product.hsncode}
                        </td>
                        <td className="py-3 px-4 text-sm text-[#314158] text-right">
                          {product.quantity}pcs
                        </td>
                        <td className="py-3 px-4 text-sm text-[#314158] text-right">
                          {product.unitprice}
                        </td>
                        <td className="py-3 px-4 text-sm text-[#314158] text-right">
                          {parseInt(product.calculatedgst)}{" "}
                          <span className="" style={{ fontSize: "13px" }}>
                            ({product.gstrate}%)
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-[#314158] text-right">
                          {product.total}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Totals Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <div>
        {/* <h4 className="font-semibold text-slate-800 mb-2 text-md">Payment Details:</h4>
        <div className="p-4 bg-slate-50 rounded-md border border-slate-200">
          <p className="text-sm text-slate-600">Bank Name: {data[0].bankbranch}</p>
          <p className="text-sm text-slate-600">Account No: {data[0].accountnumber}</p>
          <p className="text-sm text-slate-600">IFSC Code: {data[0].accountholder}</p>
          <p className="text-sm text-slate-600">UPI ID: {data[0].bankifsc}</p>
        </div> */}
      </div>
      <div className="flex flex-col items-end mt-10">
        <div className="w-full max-w-xs">
          <div className="flex justify-between py-2 border-b border-[#e2e8f0]">
            <span className="text-[#314158] text-sm">Subtotal:</span>
            <span className="font-semibold text-[#1d293d] text-sm">₹ {data[0].taxable_amount}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-[#e2e8f0]">
            <span className="text-[#314158] text-sm">Total GST:</span>
            <span className="font-semibold text-[#1d293d] text-sm"> ₹ {parseFloat(data[0].cgst) + parseFloat(data[0].sgst)}</span>
          </div>
          <div className="flex justify-between py-3 bg-[#FFD700] text-[#1d293d] rounded-b-md px-4">
            <span className="font-bold text-lg">Grand Total:</span>
            <span className="font-bold text-lg">{data[0].total_amount}</span>
          </div>
        </div>
      </div>
    </div>
            <div className="flex justify-between mb-4">
              <div className="w-1/2">
                <div className="mt-6">
                  <div>
                    <div className="font-serif text-lg text-purchase-signature mb-2">
                      <div
                        className="border border-black"
      style={{ width: "200px", height: "100px" }}
                      ></div>
                      Receiver's Signature
                    </div>
                  </div>
                </div>
              </div>{" "}
              <div className="w-1/2">
                <div className="text-right mt-6">
                  {
                    data[0].signature_box!=null?(
                      <div>
                    <div className="font-serif text-lg text-purchase-signature mb-2">
                      <img
                        src={data[0].signature_box}
                        alt=""
                        style={{ width: "200px", height: "100px" }}
                      />
                      <br />
                      Authorized Signature
                    </div>
                  </div>
                    ):(
                      <div className="w-full flex justify-end mt-6">
  <div className="text-center">
    <div
      className="border border-black"
      style={{ width: "200px", height: "100px" }}
    ></div>
    <p className="mt-2 text-lg font-serif">Authorized Signature</p>
  </div>
</div>

                    )
                  }
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
                  circumstances of respective Manufacturer. Replacement should
                  be done at the source only. Payment should be made within 15
                  Days{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

