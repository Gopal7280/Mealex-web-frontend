import React from 'react';
import ExcelJS from 'exceljs';
import saveAs from 'file-saver';
import { useNavigate } from 'react-router-dom';

const detailedData = [
  {
    invoiceNumber: 'INV001',
    invoiceDate: '2025-05-01',
    customerName: 'ABC Traders',
    customerGSTIN: '27AAAAA0000A1Z5',
    placeOfSupply: 'Maharashtra',
    supplyType: 'B2B',
    hsnCode: '9983',
    description: 'Consulting Service',
    quantity: 1,
    unit: 'Nos',
    ratePerUnit: 5000,
    taxableValue: 4237.29,
    discount: 0,
    cgstRate: '9%',
    cgstAmount: 381.36,
    sgstRate: '9%',
    sgstAmount: 381.36,
    igstRate: '',
    igstAmount: '',
    cessRate: '',
    cessAmount: '',
    totalValue: 5000,
    rcm: 'No',
    ewayBillNumber: '',
    ewayBillDate: '',
    shippingAddress: 'Mumbai, Maharashtra',
    billingAddress: 'Mumbai, Maharashtra',
    paymentStatus: 'Paid',
    creditDebitNote: ''
  },
  {
    invoiceNumber: 'INV002',
    invoiceDate: '2025-05-02',
    customerName: 'XYZ Enterprises',
    customerGSTIN: '29BBBBB1111B2Z6',
    placeOfSupply: 'Karnataka',
    supplyType: 'B2C Large',
    hsnCode: '8528',
    description: 'Electronics Item',
    quantity: 10,
    unit: 'Pieces',
    ratePerUnit: 820,
    taxableValue: 7321.43,
    discount: 100,
    cgstRate: '',
    cgstAmount: '',
    sgstRate: '',
    sgstAmount: '',
    igstRate: '12%',
    igstAmount: 878.57,
    cessRate: '2%',
    cessAmount: 100,
    totalValue: 8200,
    rcm: 'Yes',
    ewayBillNumber: 'EWB123456789',
    ewayBillDate: '2025-05-03',
    shippingAddress: 'Bangalore, Karnataka',
    billingAddress: 'Bangalore, Karnataka',
    paymentStatus: 'Partially Paid',
    creditDebitNote: 'CDN002'
  }
];

const SalesReportGSTIN = () => {
  const navigate=useNavigate();
  const exportExcel = async (data, name) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(name);

    worksheet.columns = [
      { header: 'Invoice Number', key: 'invoiceNumber', width: 15 },
      { header: 'Invoice Date', key: 'invoiceDate', width: 15 },
      { header: 'Customer Name', key: 'customerName', width: 25 },
      { header: 'Customer GSTIN', key: 'customerGSTIN', width: 25 },
      { header: 'Place of Supply', key: 'placeOfSupply', width: 20 },
      { header: 'Type of Supply', key: 'supplyType', width: 20 },
      { header: 'HSN/SAC Code', key: 'hsnCode', width: 15 },
      { header: 'Description', key: 'description', width: 25 },
      { header: 'Quantity', key: 'quantity', width: 10 },
      { header: 'Unit', key: 'unit', width: 10 },
      { header: 'Rate/Unit', key: 'ratePerUnit', width: 15 },
      { header: 'Taxable Value', key: 'taxableValue', width: 15 },
      { header: 'Discount', key: 'discount', width: 10 },
      { header: 'CGST Rate', key: 'cgstRate', width: 10 },
      { header: 'CGST Amount', key: 'cgstAmount', width: 15 },
      { header: 'SGST Rate', key: 'sgstRate', width: 10 },
      { header: 'SGST Amount', key: 'sgstAmount', width: 15 },
      { header: 'IGST Rate', key: 'igstRate', width: 10 },
      { header: 'IGST Amount', key: 'igstAmount', width: 15 },
      { header: 'Cess Rate', key: 'cessRate', width: 10 },
      { header: 'Cess Amount', key: 'cessAmount', width: 15 },
      { header: 'Total Invoice Value', key: 'totalValue', width: 20 },
      { header: 'RCM Applicable', key: 'rcm', width: 15 },
      { header: 'E-Way Bill Number', key: 'ewayBillNumber', width: 20 },
      { header: 'E-Way Bill Date', key: 'ewayBillDate', width: 15 },
      { header: 'Shipping Address', key: 'shippingAddress', width: 30 },
      { header: 'Billing Address', key: 'billingAddress', width: 30 },
      { header: 'Payment Status', key: 'paymentStatus', width: 20 },
      { header: 'Linked Credit/Debit Note', key: 'creditDebitNote', width: 25 }
    ];

    data.forEach(row => worksheet.addRow(row));

    worksheet.getRow(1).eachCell(cell => {
      cell.font = { bold: true };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFC000' }
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, `${name}-report.xlsx`);
  };

return (
 <div className="min-h-screen bg-gray-100 font-sans p-4 sm:p-6">
  <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
    {/* Heading + Button */}
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
      <h2 className="text-lg sm:text-xl font-semibold text-[#3A5B76]">
        GSTR-1 Detailed Report
      </h2>
      <div>
        <button
        onClick={() => exportExcel(detailedData, 'SalesReportGSTIN')}
        className="bg-[#3A5B76] hover:bg-[#2E4A5E] text-white font-semibold px-6 py-2 shadow-md transition-all duration-200"
      >
        Export as Excel
      </button>
        <button
        onClick={() => navigate("/reports")}
        className="bg-[#3A5B76] ms-2 hover:bg-[#2E4A5E] text-white font-semibold px-6 py-2 shadow-md transition-all duration-200"
      >
        Move To Report's Dashboard
      </button>
      </div>
    </div>

    {/* Scrollable Table Container */}
    <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
      <table className="w-full table-auto border border-collapse border-gray-300 text-xs sm:text-sm min-w-[1200px]">
        <thead>
          <tr>
            {Object.keys(detailedData[0]).map((key, i) => (
              <th
                key={i}
                className="border px-1 sm:px-2 py-1 capitalize sticky top-0 bg-[#3a5b7636] z-10"
              >
                {key.replace(/([A-Z])/g, ' $1')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {detailedData.map((item, index) => (
            <tr key={index} className="hover:bg-gray-100">
              {Object.values(item).map((value, idx) => (
                <td key={idx} className="border px-1 sm:px-2 py-1">{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>

);
};
export default SalesReportGSTIN;