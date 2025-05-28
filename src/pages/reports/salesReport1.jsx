import React, { useEffect, useState } from 'react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { useNavigate } from 'react-router-dom';
import { apiGet, apiPost } from "../../services/api";
import RangeSelect from '../../components/dateRangeSelection';
import DateRangePicker from '../../components/datePickerRange';
// Sample invoice data with minimal fields

const SalesReport1 = () => {
  const [detailedData, setDetailedData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchSalesReport = async () => {
      try {
        const res = await apiGet("/reports/customer");
        console.log(res.data);
        setDetailedData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSalesReport();
  }, []);
  const exportExcel = async (data, name) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(name);

    worksheet.columns = [
      { header: 'Invoice Date', key: 'invoiceDate', width: 15 },
      { header: 'Invoice No.', key: 'invoiceNumber', width: 15 },
      { header: 'Part Name', key: 'partyName', width: 25 },
      { header: 'Contact No.', key: 'contactNo', width: 20 },
      { header: 'Status', key: 'status', width: 15 }
    ];

    data.forEach(row => worksheet.addRow(row));

    worksheet.getRow(1).eachCell(cell => {
      cell.font = { bold: true };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFC000' } };
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, `${name}.xlsx`);
  };

  const headers = [
    'Invoice Date',
    'Invoice No.',
    'Part Name',
    'Contact No.',
    'Status'
  ];
  const handleRange = (e) => {
      setStartDate("");
      setEndDate("");
      console.log("Selected range:", e.target.value);
      if(e.target.value=="today"){
        const getTodayReport=async ()=>{
          try{
            const res=await apiGet("/reports/customer/today");
          console.log(res);
          setDetailedData(res.data);
          }
          catch(err)
          {
            console.log(err);
            if(err.response.data.message=="Reports not available")
            {
              setDetailedData([]);
            }
          }
        }
        getTodayReport();
      }
      if(e.target.value=="yesterday"){
        const getYesterdayReport=async ()=>{
          try{
            const res=await apiGet("/reports/customer/yesterday");
          console.log(res);
          setDetailedData(res.data);
          }
          catch(err)
          {
            console.log(err);
            if(err.response.data.message=="Reports not available")
            {
              setDetailedData([]);
            }
          }
        }
        getYesterdayReport();
      }
      if(e.target.value=="last7Days"){
        const getLast7Days=async ()=>{
          try{
            const res=await apiGet("/reports/customer/last7days");
          console.log(res);
          setDetailedData(res.data);
          }
          catch(err)
          {
            console.log(err);
            if(err.response.data.message=="Reports not available")
            {
              setDetailedData([]);
            }
          }
        }
        getLast7Days();
      }
      if(e.target.value=="last30Days"){
        const get30Days=async ()=>{
          try{
            const res=await apiGet("/reports/customer/last30days");
          console.log(res);
          setDetailedData(res.data);
          }
          catch(err)
          {
            console.log(err);
            if(err.response.data.message=="Reports not available")
            {
              setDetailedData([]);
            }
          }
        }
        get30Days();
      }
      if(e.target.value=="thisWeek"){
        const getThisWeek=async ()=>{
          try{
            const res=await apiGet("/reports/customer/thisweek");
          // console.log(res);
          console.log(res.data);
          setDetailedData(res.data);
          }
          catch(err)
          {
            console.log(err);
            if(err.response.data.message=="Reports not available")
            {
              setDetailedData([]);
            }
          }
        }
        getThisWeek();
      }
      if(e.target.value=="thisMonth"){
        const thisMonth=async ()=>{
          try{
            const res=await apiGet("/reports/customer/thismonth");
          console.log(res);
          setDetailedData(res.data);
          }
          catch(err)
          {
            console.log(err);
            if(err.response.data.message=="Reports not available")
            {
              setDetailedData([]);
            }
          }
        }
        thisMonth();
      }
      if(e.target.value=="lastWeek"){
        const getLastWeek=async ()=>{
          try{
            const res=await apiGet("/reports/customer/lastweek");
          setDetailedData(res.data);
          }
          catch(err)
          {
            console.log(err.response.data);
            if(err.response.data.message=="Reports not available")
            {
              setDetailedData([]);
            }
          }
        }
        getLastWeek();
      }
      if(e.target.value=="lastMonth"){
        const lastMonth=async ()=>{
          try{
            const res=await apiGet("/reports/customer/lastmonth");
          console.log(res);
          setDetailedData(res.data);
          }
          catch(err)
          {
            console.log(err);
            if(err.response.data.message=="Reports not available")
            {
              setDetailedData([]);
            }
          }
        }
        lastMonth();
      }
    };
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
  
    const handleShow = () => {
      const dates={
        startDate:startDate,
        endDate:endDate,
      }
      console.log(dates);
      const getDataBetweenRange=async ()=>{
        try{
            const res=await apiPost("/reports/customer/salesbetweendates",dates);
            console.log(res.data);
            setDetailedData(res.data.data);
        }
        catch(err)
        {
          if(err.response.data.message=="Reports not available")
            {
              setDetailedData([]);
            }
          console.log(err)
        }
      }
      getDataBetweenRange();
      console.log("Start Date:", startDate);
      console.log("End Date:", endDate);
    };
  return (
    <div className="min-h-screen bg-gray-100 font-sans p-4 sm:p-6">
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md overflow-x-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
          <h2 className="text-lg sm:text-xl font-semibold text-[#3A5B76]">Sales Report</h2>
          <div className="flex flex-col sm:flex-row gap-2">
            <div>
              <div className="inline-block">
              <RangeSelect onChange={handleRange} />
            </div>
            <button
              onClick={() => exportExcel(detailedData, 'salesreport2')}
              className="bg-[#3A5B76] hover:bg-[#2E4A5E] text-white font-semibold px-6 py-2 shadow-md transition-all duration-200"
            >
              Export as Excel
            </button>
            <button
              onClick={() => navigate('/reports')}
              className="bg-[#3A5B76] hover:bg-[#2E4A5E] ms-2 text-white font-semibold px-6 py-2 shadow-md transition-all duration-200"
            >
              Go to  Report Dashboard
            </button>
            </div>
          </div>
        </div>
        <div>
           <div>
          <DateRangePicker
          startDate={startDate}
          endDate={endDate}
            onStartDateChange={(e) => setStartDate(e.target.value)}
            onEndDateChange={(e) => setEndDate(e.target.value)}
            onShow={handleShow}
          />
        </div>
        </div>
        {
          detailedData.length?(
            <table className="w-full table-auto border border-collapse border-gray-300 text-sm min-w-[600px]">
          <thead>
            <tr className="bg-blue-100 text-left">
              {headers.map((h, i) => (
                <th key={i} className="border px-2 py-1">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {detailedData.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-100">
                <td className="border px-2 py-1">{item.invoiceDate}</td>
                <td className="border px-2 py-1">{item.invoiceNumber}</td>
                <td className="border px-2 py-1">{item.partyName}</td>
                <td className="border px-2 py-1">{item.contactNo}</td>
                <td className="border px-2 py-1">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
          ):(
            <h3 className="text-center mt-4">No Reports available for selected Time Range</h3>
          )
        }
      </div>
    </div>
  );
};

export default SalesReport1;