import React from 'react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { useNavigate } from 'react-router-dom';

// Sample data structure with the new fields
const detailedData = [
  {
    supplierInvoiceNumber: 'INV1001',
    supplierInvoiceDate: '2025-05-01',
    supplierName: 'Tech Supplies Pvt Ltd',
    supplierGSTIN: '27AAAAA0000A1Z5',
    supplierStatePlace: 'Maharashtra - Pune',
    hsnSac: '85176290',
    description: 'Router',
    qty: 10,
    uom: 'Nos',
    ratePerUnit: 1500,
    taxableValue: 15000,
    cgstRateAmount: '9% - 1350',
    sgstUtgstRateAmount: '9% - 1350',
    igstRateAmount: '0% - 0',
    cessRateAmount: '0% - 0',
    totalInvoiceValue: 15000,
    itcEligibility: 'Eligible',
    rcmApplicability: 'No',
    ewayBillNumberDate: 'EW12345 / 2025-05-01',
    paymentStatus: 'Paid',
    linkedCreditDebitNoteNumber: ''
  },
  // ... more rows
];

const GstPurchaseReport = () => {
    const navigate=useNavigate();
  const exportExcel = async (data) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('GSTR2 Purchase');

    worksheet.columns = [
      { header: 'Supplier Invoice Number', key: 'supplierInvoiceNumber', width: 20 },
      { header: 'Supplier Invoice Date', key: 'supplierInvoiceDate', width: 18 },
      { header: 'Supplier Name (Trade Name)', key: 'supplierName', width: 25 },
      { header: 'Supplier GSTIN', key: 'supplierGSTIN', width: 20 },
      { header: 'Supplier State & Place of Supply', key: 'supplierStatePlace', width: 25 },
      { header: 'HSN/SAC Code', key: 'hsnSac', width: 15 },
      { header: 'Description of Goods/Services', key: 'description', width: 30 },
      { header: 'Quantity', key: 'qty', width: 10 },
      { header: 'Unit of Measurement', key: 'uom', width: 15 },
      { header: 'Rate per Unit', key: 'ratePerUnit', width: 15 },
      { header: 'Taxable Value', key: 'taxableValue', width: 15 },
      { header: 'CGST Rate & Amount', key: 'cgstRateAmount', width: 20 },
      { header: 'SGST/UTGST Rate & Amount', key: 'sgstUtgstRateAmount', width: 25 },
      { header: 'IGST Rate & Amount', key: 'igstRateAmount', width: 20 },
      { header: 'Cess Rate & Amount', key: 'cessRateAmount', width: 20 },
      { header: 'Total Invoice Value', key: 'totalInvoiceValue', width: 18 },
      { header: 'ITC Eligibility', key: 'itcEligibility', width: 15 },
      { header: 'RCM Applicability', key: 'rcmApplicability', width: 15 },
      { header: 'E-Way Bill Number & Date', key: 'ewayBillNumberDate', width: 25 },
      { header: 'Payment Status', key: 'paymentStatus', width: 15 },
      { header: 'Linked Credit/Debit Note Number', key: 'linkedCreditDebitNoteNumber', width: 25 }
    ];

    data.forEach(row => worksheet.addRow(row));

    // Style header
    worksheet.getRow(1).eachCell(cell => {
      cell.font = { bold: true };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFF00' } };
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    });

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(
      new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }),
      'GSTR2-Purchase-HSN.xlsx'
    );
  };

  const headers = [
    'Supplier Invoice Number','Supplier Invoice Date','Supplier Name (Trade Name)',
    'Supplier GSTIN','Supplier State & Place of Supply','HSN/SAC Code',
    'Description of Goods/Services','Quantity','Unit of Measurement','Rate per Unit',
    'Taxable Value','CGST Rate & Amount','SGST/UTGST Rate & Amount','IGST Rate & Amount',
    'Cess Rate & Amount','Total Invoice Value','ITC Eligibility','RCM Applicability',
    'E-Way Bill Number & Date','Payment Status','Linked Credit/Debit Note Number'
  ];

  return (
    <div className="min-h-screen bg-gray-100 font-sans p-4 sm:p-6">
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
          <h1 className="text-lg sm:text-xl font-semibold text-[#3A5B76]">GSTR-2 Purchase HSN</h1>
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
        <div className='overflow-x-auto max-h-[500px] overflow-y-auto'>
        <table className="w-full table-auto border border-collapse border-gray-300 text-xs sm:text-sm min-w-[1200px]">
          <thead>
            <tr className="bg-[#3a5b7636] text-left">
              {headers.map((h, i) => <th key={i} className="border px-2 py-1">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {detailedData.map((item, i) => (
              <tr key={i} className={i % 2 ? 'bg-gray-50' : ''}>
                {Object.keys(item).map((key, j) => <td key={j} className="border px-2 py-1">{item[key]}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
};

export default GstPurchaseReport;