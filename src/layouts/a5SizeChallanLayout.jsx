import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import "../styles/generateInvoice.css"; // Ensure your CSS file is imported
import { Preview, ModeEdit, DeleteForever,Close } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { ButtonComponent } from "../components/Button";
export function ChallanSampleA5() {
  const contentRef = useRef();
  const handlePrintInvoice = useReactToPrint({ contentRef });

  // Hardcoded values for preview
  const businessData = {
    business_name: "Sample Business Name",
    address: "123 Sample Street, Sample City",
    mobile_no: "+91 9876543210",
    gst: "123456789",
    pan_no: "ABCDE1234F",
    business_profile_email: "sample@example.com",
  };

  const data = {
    logo: "https://via.placeholder.com/150", // Placeholder logo
    customername: "Customer Name",
    billingaddress: "456 Customer Street, Customer City",
    gst: "987654321",
    shippingaddress: "789 Shipping Street, Shipping City",
    Invoice_id: "CHL25-26/APR24",
    due_date: "01/01/2023",
    sales_Invoice_date: "01/01/2023",
    taxable_amount: "1000",
    cgst: "90",
    sgst: "90",
    total_amount: "1180",
    signature_box: "https://via.placeholder.com/100", // Placeholder signature
  };

  const InvoiceProduct = [
    {
      productname: "Sample Product",
      hsncode: "1234",
      quantity: 10,
      unitprice: 100,
      calculatedgst: 18,
      gstrate: 18,
      total: 1180,
    },
  ];

  const date = "01/01/2023"; // Hardcoded date

  return (
    <>
    
      <div ref={contentRef} className="mx-auto w-3xl bg-white p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <div className="mr-4 flex items-center rounded-full justify-center">
              {/* <img
                className="w-16 h-16 text-white font-bold text-xl"
                src={data.logo}
                alt=""
              /> */}
            </div>
            <div className="text-gray-700">
              <div id="company-name" style={{ color: "#000000" }}>
                {businessData.business_name} ™
              </div>
              <div id="company-address">{businessData.address}</div>
              <div className="text-sm text-gray-700">
                Indore, Madhya Pradesh, 452006
              </div>
              <div id="company-gst-number-content">
                <span>GSTIN : </span>
                <span id="company-gst-number">{businessData.gst}</span>
              </div>
              <div id="company-mobile-number-content">
                <span>Mobile :</span>&nbsp;
                <span id="company-mobile-number">
                  {businessData.mobile_no}
                </span>
              </div>
              <div id="company-email-number-content">
                <span>Email :</span>&nbsp;
                <span id="company-mobile-number">
                  {businessData.business_profile_email}
                </span>
              </div>
              <div id="company-pan-number-content">
                <span>PAN Number :</span>&nbsp;
                <span id="company-pan-number">{businessData.pan_no}</span>
              </div>
            </div>
          </div>
          <div id="invoice-details-meta" className="invoice_details" data-subsection-id="1">
            <div id="invoice-main-details">
              <div className="page-header-type">
                <div className="page-header-type-value">CHALLAN</div>
                <div className="page-header-sub-type">Original for Recipient</div>
              </div>
              <div id="invoice-number-container">
                <div id="invoice-number-label">Challan No.</div>
                <div className="middle-colon">:</div>
                <div id="invoice-number" className="bold">{data.Invoice_id}</div>
              </div>
              <div id="invoice-date-container">
                <div id="invoice-date-label">Challan Date</div>
                <div className="middle-colon">:</div>
                <div id="invoice-date" className="bold">{date}</div>
              </div>
            </div>
          </div>
        </ div>

        <div className="grid grid-cols-2 gap-20 mb-6">
          <div>
            <div
              id="title-bill-to"
              className="title-bill-ship-to"
              style={{ backgroundColor: "#E2E2E2", color: "#000000" }}
            >
              BILL TO
            </div>
            <div className="text-sm font-bold text-gray-700">
              {data.billingaddress}
            </div>
            <div className="text-sm text-gray-700 mb-1">
              GSTIN : {data.gst}
            </div>
            <div className="text-sm text-gray-700 mb-1">
              STATE : Madhya Pradesh
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
            <div className="text-sm font-bold text-gray-700">
              {data.shippingaddress}
            </div>
            <div className="text-sm text-gray-700 mb-1">
              GSTIN : {data.gst}
            </div>
            <div className="text-sm text-gray-700 mb-1">
              STATE : Madhya Pradesh
            </div>
          </div>
        </div>

        <div className="mb-6">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="items-table-header items-serial-number-header"
                  style={{ backgroundColor: "#E2E2E2" }}
                >
                  S.NO.
                </th>
                <th
                  scope="col"
                  className="items-table-header items-type-header"
                  style={{ backgroundColor: "#E2E2E2" }}
                >
                  ITEMS/SERVICES
                </th>
                <th
                  scope="col"
                  className="items-table-header items-hsn-header items-hsn-column"
                  style={{ backgroundColor: "#E2E2E2" }}
                >
                  HSN/SAC
                </th>
                <th
                  scope="col"
                  className="items-table-header items-qty-column"
                  style={{ backgroundColor: "#E2E2E2" }}
                >
                  QTY.
                </th>
                <th
                  scope="col"
                  className="items-table-header items-rate-header items-rate-column"
                  style={{ backgroundColor: "#E2E2E2" }}
                >
                  RATE
                </th>
                <th
                  scope="col"
                  className="items-table-header tax-column"
                  style={{ backgroundColor: "#E2E2E2" }}
                >
                  TAX
                </th>
                <th
                  scope="col"
                  className="items-table-header"
                  style={{ backgroundColor: "#E2E2E2" }}
                >
                  AMOUNT
                </th>
              </tr>
            </thead>
            <tbody className="border">
              <tr>
                <td className="border p-1">1</td>
                <td className="border p-1">{InvoiceProduct[0].productname}</td>
                <td className="border p-1">{InvoiceProduct[0].hsncode}</td>
                <td className="border p-1">{InvoiceProduct[0].quantity} pcs</td>
                <td className="border p-1">{InvoiceProduct[0].unitprice}</td>
                <td className="border p-1">
                  {InvoiceProduct[0].calculatedgst} <span className="" style={{ fontSize: "13px" }}>({InvoiceProduct[0].gstrate}%)</span>
                </td>
                <td className="border p-1">{InvoiceProduct[0].total}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr style={{ backgroundColor: "#E2E2E2" }}>
                <td></td>
                <td className="font-medium pr-1.5">Sub Total</td>
                <td></td>
                <td className="font-medium pr-1.5">10</td>
                <td></td>
                <td className="font-medium pr-1.5">₹{parseFloat(data.cgst) + parseFloat(data.sgst)}</td>
                <td className="font-medium pr-1.5">₹{data.total_amount}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="flex justify-between mb-1">
          <div className="w-1/2">
            <div id="tnc-label">TERMS AND CONDITIONS</div>
            <div id="tnc-value">
              Goods once sold will not be taken back. All Warranty &amp; replacement material will be replaced or repaired as per manufacturers policy from their service center. We are not responsible for any warranty on any product under any circumstances of respective Manufacturer. Replacement should be done at the source only. Payment should be made within 15 Days.
            </div>
          </div>
          <div className="w-1/2 flex flex-col items-end">
            <div className="flex justify-between w-64">
              <span className="text-sm text-gray-700">TAXABLE AMOUNT</span>
              <span className="text-sm text-gray-700">₹ {data.taxable_amount}</span>
            </div>
            <div className="flex justify-between w-64">
              <span className="text-sm text-gray-700">CGST @</span>
              <span className="text-sm text-gray-700">₹ {data.cgst}</span>
            </div>
            <div className="flex justify-between w-64">
              <span className="text-sm text-gray-700">SGST @</span>
              <span className="text-sm text-gray-700">₹ {data.sgst}</span>
            </div>
            <div className="flex justify-between w-64 mt-2">
              <span className="text-lg font-bold text-invoice-total">TOTAL AMOUNT</span>
              <span className="text-invoice-total text-right">₹ {data.total_amount}</span>
            </div>
            <div className="flex justify-between w-64 mt-2">
              <span className="text-sm text-gray-700">Remaining Amount</span>
              <span className="text-sm text-gray-700">₹ 0</span>
            </div>
            <div className="mt-2">
              <div className="text-sm font-italic text-gray-600">
                Total Amount (in words): One Thousand One Hundred Eighty Rupees
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between mb-4">
          <div className="w-1/2">
            <div id="bank-details" className="misc-details bank_details" data-subsection-id="6">
              <div id="bank-details-label">BANK DETAILS</div>
              <div className="bank-details-info">
                <div className="bank-details-info-label">Name:</div>
                <div id="bank-details-name" className="bank-details-value">Sample Bank</div>
              </div>
              <div className="bank-details-info">
                <div className="bank-details-info-label">IFSC Code:</div>
                <div id="bank-details-ifsc" className="bank-details-value">SAMPLE1234</div>
              </div>
              <div className="bank-details-info">
                <div className="bank-details-info-label">Account No:</div>
                <div id="bank-details-account" className="bank-details-value">123456789012</div>
              </div>
              <div className="bank-details-info">
                <div className="bank-details-info-label">Bank:</div>
                <div id="bank-details-bank-name" className="bank-details-value">Sample Bank, Sample Branch</div>
              </div>
            </div>
          </div>
          <div className="w-1/2">
            <div className="text-right mt-6">
              <div>
                <div className="font-serif text-lg text-invoice-signature mb-2">
                  {/* <img src={data.signature_box} alt="" style={{ width: "100px", height: "100px" }} /> */}
                  <br />
                  Authorised Signature
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}